/*!
 * Piper TTS client shim — Under The Palm Tree
 *
 * Routes ALL spoken audio in the site to a Piper inference server so the
 * games, skills, and Sharpen-Your-Skills / Complex activities all sound
 * like the same professional voice. Two paths are intercepted:
 *
 *   1. fetch('/api/tts', ...)          — used by 39 game files
 *   2. window.speechSynthesis.speak()  — used by skills, complex levels,
 *                                        Sharpen activities, complete book,
 *                                        story makers, kitchen, etc.
 *
 * On any failure the original browser path runs as a fallback, so a page
 * never goes silent.
 *
 * Voices (matching the .onnx files in public/tts-voices/):
 *   English : en_GB-alan-low      (British)
 *   Arabic  : ar_JO-kareem-medium (Jordanian)
 *
 * Override the Piper Space URL from any page before this script loads:
 *   <script>window.PIPER_BASE = "https://my-space.hf.space";</script>
 *
 * Opt out per page (force native voice only):
 *   <script>window.PIPER_DISABLED = true;</script>
 */
(function () {
  if (window.__piperShimInstalled) return;
  window.__piperShimInstalled = true;
  if (window.PIPER_DISABLED) return;

  var DEFAULT_BASE = "https://thursday88-palm-tree-tts.hf.space";
  var BASE = (window.PIPER_BASE || DEFAULT_BASE).replace(/\/+$/, "");
  var VOICE_EN = "en_GB-alan-low";
  var VOICE_AR = "ar_JO-kareem-medium";

  if (!window.PIPER_TTS_ENDPOINT) window.PIPER_TTS_ENDPOINT = BASE + "/synthesize";
  if (!window.__piperEndpoint)   window.__piperEndpoint   = BASE + "/synthesize";

  var nativeFetch = window.fetch.bind(window);

  function isArabic(text) {
    return /[؀-ۿ]/.test(text || "");
  }

  function isApiTtsUrl(u) {
    if (!u) return false;
    if (typeof u !== "string") u = u.url || "";
    return /\/api\/tts(?:[\/?#]|$)/.test(u);
  }

  function pickVoiceFromBody(body) {
    var v = (body.voice || "").toString().toLowerCase();
    if (v.indexOf("ar") === 0 || v.indexOf("kareem") !== -1) return VOICE_AR;
    if (body.lang === "ar" || body.language === "ar") return VOICE_AR;
    if (isArabic(body.text || body.text_ar)) return VOICE_AR;
    return VOICE_EN;
  }

  function pickVoiceFromLang(lang, text) {
    var l = (lang || "").toString().toLowerCase();
    if (l.indexOf("ar") === 0) return VOICE_AR;
    if (isArabic(text)) return VOICE_AR;
    return VOICE_EN;
  }

  function synth(text, voice) {
    // Gradio v4 API — POST to /call/tts returns event_id, then stream the
    // result as Server-Sent Events. The Space exposes its synth function as
    // api_name="tts" taking (text, lang) and returning a wav file path.
    var lang = (voice === VOICE_AR || /ar/i.test(voice || "")) ? "ar" : "en";
    return new Promise(function (resolve) {
      nativeFetch(BASE + "/call/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [text, lang] }),
      }).then(function (r) {
        if (!r.ok) return resolve(r);
        return r.json();
      }).then(function (j) {
        if (!j || !j.event_id) return resolve(new Response("no event_id", { status: 502 }));
        return nativeFetch(BASE + "/call/tts/" + j.event_id);
      }).then(function (sse) {
        if (!sse) return;
        if (!sse.ok) return resolve(sse);
        // Read SSE stream and extract the file URL from the "complete" event.
        var reader = sse.body.getReader();
        var dec = new TextDecoder();
        var buf = "";
        function pump() {
          return reader.read().then(function (s) {
            if (s.done) return resolve(new Response("done-no-audio", { status: 502 }));
            buf += dec.decode(s.value, { stream: true });
            var lines = buf.split("\n");
            buf = lines.pop();
            for (var i = 0; i < lines.length; i++) {
              var line = lines[i].trim();
              if (!line || !line.indexOf("event:") === 0) {} // no-op
              if (line.indexOf("data:") === 0) {
                var raw = line.slice(5).trim();
                try {
                  var payload = JSON.parse(raw);
                  // payload is usually [{path, url, ...}] for an Audio output
                  var url = null;
                  if (Array.isArray(payload) && payload.length) {
                    var first = payload[0];
                    if (typeof first === "string") url = first;
                    else if (first && (first.url || first.path)) url = first.url || first.path;
                  } else if (payload && payload.url) {
                    url = payload.url;
                  }
                  if (url) {
                    // Resolve relative file refs against the Space host.
                    if (url.indexOf("http") !== 0) {
                      url = BASE + "/file=" + url.replace(/^\/+/, "");
                    }
                    return resolve(nativeFetch(url));
                  }
                } catch (e) { /* keep streaming */ }
              }
            }
            return pump();
          });
        }
        return pump();
      }).catch(function (e) {
        resolve(new Response("error: " + e, { status: 500 }));
      });
    });
  }

  // ---------- 1) fetch('/api/tts') interception --------------------------

  function estimateMs(text) {
    var len = (text || "").trim().length;
    return Math.max(1500, Math.round(len * 65) + 300);
  }

  function handleTTS(init) {
    var body = {};
    try { body = init && init.body ? JSON.parse(init.body) : {}; } catch (e) {}

    if (body.text_en && body.text_ar) {
      return synth(body.text_en, VOICE_EN).then(function (enRes) {
        if (!enRes || !enRes.ok) return enRes;
        synth(body.text_ar, VOICE_AR).then(function (arRes) {
          if (!arRes.ok) return;
          arRes.blob().then(function (arBlob) {
            var url = URL.createObjectURL(arBlob);
            setTimeout(function () {
              try { new Audio(url).play().catch(function(){}); } catch (e) {}
            }, estimateMs(body.text_en));
          });
        }).catch(function(){});
        return enRes;
      });
    }

    var text = body.text || body.text_en || body.text_ar || "";
    if (!text) return Promise.resolve(new Response("No text", { status: 400 }));
    return synth(text, pickVoiceFromBody(body));
  }

  window.fetch = function (input, init) {
    try {
      var url = typeof input === "string" ? input : (input && input.url);
      var method = (init && init.method) || (input && input.method) || "GET";
      if (isApiTtsUrl(url) && method.toUpperCase() === "POST") {
        return handleTTS(init || {});
      }
    } catch (e) {}
    return nativeFetch(input, init);
  };

  // ---------- 2) speechSynthesis.speak() interception --------------------

  var ss = window.speechSynthesis;
  if (ss && typeof ss.speak === "function") {
    var nativeSpeak  = ss.speak.bind(ss);
    var nativeCancel = ss.cancel.bind(ss);

    // Sequential audio queue so consecutive speak() calls don't overlap.
    var queue = [];
    var current = null; // {audio, utter}

    function fireOn(utter, name) {
      try {
        var cb = utter && utter["on" + name];
        if (typeof cb === "function") cb.call(utter, { type: name, charIndex: 0, elapsedTime: 0 });
      } catch (e) {}
      try {
        if (utter && typeof utter.dispatchEvent === "function") {
          utter.dispatchEvent(new Event(name));
        }
      } catch (e) {}
    }

    function fallbackNative(utter) {
      try { nativeSpeak(utter); } catch (e) {}
    }

    function playNext() {
      if (current) return;
      var item = queue.shift();
      if (!item) return;
      current = item;
      var audio = item.audio;
      audio.onended = function () {
        fireOn(item.utter, "end");
        current = null;
        playNext();
      };
      audio.onerror = function () {
        current = null;
        fallbackNative(item.utter);
        playNext();
      };
      fireOn(item.utter, "start");
      var p = audio.play();
      if (p && p.catch) {
        p.catch(function () {
          current = null;
          fallbackNative(item.utter);
          playNext();
        });
      }
    }

    ss.speak = function (utter) {
      if (!utter || !utter.text) return nativeSpeak(utter);
      var text = utter.text;
      var voice = pickVoiceFromLang(utter.lang, text);

      synth(text, voice).then(function (res) {
        if (!res.ok) throw new Error("piper " + res.status);
        return res.blob();
      }).then(function (blob) {
        var url = URL.createObjectURL(blob);
        var audio = new Audio(url);
        if (utter.rate && utter.rate > 0) audio.playbackRate = utter.rate;
        if (utter.volume != null) audio.volume = Math.max(0, Math.min(1, utter.volume));
        queue.push({ audio: audio, utter: utter });
        playNext();
      }).catch(function () {
        fallbackNative(utter);
      });
    };

    ss.cancel = function () {
      queue.length = 0;
      if (current && current.audio) {
        try { current.audio.pause(); } catch (e) {}
        current = null;
      }
      return nativeCancel();
    };
  }

  // ---------- direct helper ----------------------------------------------

  window.piperSay = function (text, langOrVoice) {
    var voice = VOICE_EN;
    if (langOrVoice === "ar" || /ar/i.test(langOrVoice || "") || isArabic(text)) voice = VOICE_AR;
    return synth(text, voice).then(function (res) {
      if (!res.ok) throw new Error("piper " + res.status);
      return res.blob();
    }).then(function (blob) {
      var url = URL.createObjectURL(blob);
      var audio = new Audio(url);
      return audio.play().then(function () { return audio; });
    });
  };
})();
