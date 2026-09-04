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

  // Thuraya has had more than one TTS Space over time and the old one now
  // answers 503. Rather than hard-coding a single host, try each known Space
  // and keep the first that is genuinely OUR Piper server.
  // Thuraya owns several Spaces and more than one is titled "Palm Tree TTS";
  // the pinned one is in a runtime error while another is running. We cannot
  // know which subdomain is which from here, so probe them all at once and
  // keep whichever actually answers like our Piper server.
  var CANDIDATES = (window.PIPER_BASES || [
    window.PIPER_BASE,
    // Thuraya confirmed this one is Running (huggingface.co/spaces/Thursday88/palm-tree-tts);
    // the pinned "palmtts" Space is in a runtime error, so try the live one first.
    "https://thursday88-palm-tree-tts.hf.space",
    "https://thursday88-palmtts.hf.space",
    "https://thursday88-palmtreetts.hf.space",
    "https://thursday88-palm-tree-tts-api.hf.space"
    // NOT thursday88-piper-tts-api — that is Lateefa, a chat Space. Now that
    // we know what it is we never contact it at all, not even to probe.
  ]).filter(Boolean).map(function (u) { return String(u).replace(/\/+$/, ""); });

  var BASE = CANDIDATES[0];
  var VOICE_EN = "en_GB-alan-medium";
  var VOICE_AR = "ar_JO-kareem-medium";
  var CACHE_KEY = "piperBase_v1";

  var nativeFetch = window.fetch.bind(window);

  function setBase(b) {
    BASE = b;
    window.PIPER_TTS_ENDPOINT = b + "/synthesize";
    window.__piperEndpoint = b + "/synthesize";
    window.PIPER_BASE_ACTIVE = b;
  }
  setBase(BASE);

  try {
    var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cached && cached.base && Date.now() - cached.t < 864e5 &&
        CANDIDATES.indexOf(cached.base) >= 0) setBase(cached.base);
  } catch (e) {}


  // ---------- Gradio transport ------------------------------------------
  //
  // Thuraya's live Space (Thursday88/palm-tree-tts) is a Gradio app, not the
  // FastAPI service this shim was written for — POSTing /synthesize at it
  // answers 405. Gradio publishes its own signature at /gradio_api/info, so
  // instead of hard-coding an endpoint we read that description and drive
  // whichever function takes text and returns audio.

  function gradioInfo(base) {
    var paths = ["/gradio_api/info", "/info", "/api/info"];
    var i = 0;
    function next() {
      if (i >= paths.length) return Promise.reject(new Error("no-gradio-info"));
      var url = base + paths[i++];
      var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      var to = ctrl ? setTimeout(function () { ctrl.abort(); }, 12000) : null;
      return nativeFetch(url, { cache: "no-store", signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { if (to) clearTimeout(to); if (!r.ok) throw new Error("info " + r.status); return r.json(); })
        .catch(function () { if (to) clearTimeout(to); return next(); });
    }
    return next();
  }

  function isAudio(x) {
    var s = ((x && (x.component || x.type || x.python_type && x.python_type.type)) || "") + "";
    return /audio/i.test(s) || /filepath/i.test(s) && /audio/i.test((x && x.label) || "");
  }
  function isText(x) {
    var c = ((x && x.component) || "") + "";
    var t = ((x && x.type) || "") + "";
    return /textbox|text/i.test(c) || t === "string";
  }

  // Pick the endpoint that turns text into audio.
  function pickEndpoint(info) {
    var named = (info && (info.named_endpoints || info.dependencies)) || {};
    var best = null;
    Object.keys(named).forEach(function (name) {
      var ep = named[name];
      var params = ep.parameters || ep.inputs || [];
      var rets = ep.returns || ep.outputs || [];
      if (!params.some(isText)) return;
      if (!rets.some(isAudio)) return;
      var score = /synth|tts|speak|generate|predict/i.test(name) ? 2 : 1;
      if (!best || score > best.score) best = { name: name, ep: ep, score: score };
    });
    return best;
  }

  // Build the argument list from the declared parameters: the text goes in the
  // first text field, dropdowns get a choice (preferring English / female when
  // the Space offers a voice list), everything else keeps its declared default.
  function buildArgs(ep, text, lang) {
    var params = ep.parameters || ep.inputs || [];
    var usedText = false;
    return params.map(function (p) {
      if (!usedText && isText(p)) { usedText = true; return text; }
      var choices = p.choices || (p.example_input && p.example_input.choices);
      if (choices && choices.length) {
        var want = lang === "ar" ? /ar|arab|kareem|عرب/i : /en|gb|us|female|cori|amy|alan/i;
        var fem = lang === "ar" ? null : choices.filter(function (c) { return /female|cori|amy|jenny|alba/i.test(String(c)); })[0];
        var hit = fem || choices.filter(function (c) { return want.test(String(c)); })[0];
        return hit !== undefined ? hit : choices[0];
      }
      if (p.parameter_default !== undefined) return p.parameter_default;
      if (p.example_input !== undefined) return p.example_input;
      if (/number|slider/i.test((p.component || "") + "")) return 1;
      if (/checkbox/i.test((p.component || "") + "")) return false;
      return null;
    });
  }

  function readSSE(text) {
    // The final "complete" event carries the output array.
    var out = null;
    text.split(/\n\n/).forEach(function (chunk) {
      var ev = (chunk.match(/^event:\s*(.+)$/m) || [])[1];
      var dat = (chunk.match(/^data:\s*(.+)$/m) || [])[1];
      if (!dat) return;
      if (ev === "error") throw new Error("gradio-error");
      if (ev === "complete" || out === null) {
        try { var v = JSON.parse(dat); if (Array.isArray(v)) out = v; } catch (e) {}
      }
    });
    if (!out) throw new Error("gradio-no-output");
    return out;
  }

  function audioUrlFrom(out, base) {
    var found = null;
    (function walk(v) {
      if (found || v == null) return;
      if (typeof v === "string") {
        if (/^https?:\/\//.test(v) && /\.(wav|mp3|ogg|m4a|flac)(\?|$)/i.test(v)) found = v;
        return;
      }
      if (Array.isArray(v)) return v.forEach(walk);
      if (typeof v === "object") {
        if (v.url) { found = /^https?:/.test(v.url) ? v.url : base + v.url; return; }
        if (v.path) { found = base + "/gradio_api/file=" + v.path; return; }
        if (v.name) { found = base + "/file=" + v.name; return; }
        Object.keys(v).forEach(function (k) { walk(v[k]); });
      }
    })(out);
    if (!found) throw new Error("gradio-no-audio");
    return found;
  }

  function gradioSynth(base, ep, text, lang) {
    var api = ep.name.replace(/^\//, "");
    var body = JSON.stringify({ data: buildArgs(ep.ep, text, lang) });
    return nativeFetch(base + "/gradio_api/call/" + api, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: body
    }).then(function (r) {
      if (!r.ok) throw new Error("gradio-call-" + r.status);
      return r.json();
    }).then(function (j) {
      var id = j && (j.event_id || j.hash);
      if (!id) throw new Error("gradio-no-event");
      return nativeFetch(base + "/gradio_api/call/" + api + "/" + id);
    }).then(function (r) {
      if (!r.ok) throw new Error("gradio-poll-" + r.status);
      return r.text();
    }).then(function (t) {
      return nativeFetch(audioUrlFrom(readSSE(t), base));
    }).then(function (r) {
      if (!r.ok) throw new Error("gradio-audio-" + r.status);
      return r.blob();
    });
  }

  // A Space only counts as ours if it answers like our FastAPI app does.
  // Thuraya also runs an unrelated chat Space (Lateefa); this check makes
  // sure we never fire synthesis requests at something that is not a TTS API.
  function looksLikeOurs(base) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var to = ctrl ? setTimeout(function () { ctrl.abort(); }, 9000) : null;
    return nativeFetch(base + "/", {
      cache: "no-store", signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (to) clearTimeout(to);
      if (!r.ok) throw new Error("probe " + r.status);
      return r.json();
    }).then(function (j) {
      if (!j || (!Array.isArray(j.voices) && j.status !== "ready")) throw new Error("not-piper");
      return { base: base, kind: "rest" };
    }, function (e) {
      if (to) clearTimeout(to);
      // Not our FastAPI. It may still be a Gradio TTS Space — accept it only
      // if it declares a function that takes text and gives back audio.
      return gradioInfo(base).then(function (info) {
        var ep = pickEndpoint(info);
        if (!ep) throw new Error("gradio-not-tts");
        return { base: base, kind: "gradio", ep: ep };
      });
    });
  }

  var basePromise = null, TRANSPORT = { base: null, kind: "rest", ep: null };
  function ensureBase() {
    if (window.PIPER_BASE) return Promise.resolve({ base: BASE, kind: "rest" });
    if (basePromise) return basePromise;
    // Race them: probing one after another would take a minute before the
    // first word is spoken. First valid answer wins; ties go to list order.
    basePromise = new Promise(function (resolve, reject) {
      var left = CANDIDATES.length, best = null, bestIdx = 1e9;
      CANDIDATES.forEach(function (cand, idx) {
        looksLikeOurs(cand).then(function (t) {
          if (idx < bestIdx) { best = t; bestIdx = idx; }
          resolve(best);
        }, function () {}).then(function () {
          if (--left === 0) { if (best) resolve(best); else reject(new Error("no-piper-space")); }
        });
      });
      if (!CANDIDATES.length) reject(new Error("no-candidates"));
    }).then(function (found) {
      TRANSPORT = found;
      setBase(found.base);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ base: found.base, t: Date.now() })); } catch (e) {}
      return found;
    }, function () {
      basePromise = null;      // all down — rediscover on the next attempt
      // Do NOT fall through to a default host: posting speech at a Space that
      // never identified itself is how we ended up with a confusing 405.
      throw new Error("no-tts-space");
    });
    return basePromise;
  }
  ensureBase().catch(function () {});   // discovery runs early; failure is reported per call

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

  function synthOnce(text, voice) {
    var lang = (voice === VOICE_AR || /ar/i.test(voice || "")) ? "ar" : "en";
    // Send lang only — the Space maps it to its installed voice, so the
    // client never 404s when the Space's voice files change quality tier.
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timeoutMs = Math.max(3000, Number(window.PIPER_TIMEOUT_MS) || 45000);
    var to = ctrl ? setTimeout(function () { ctrl.abort(); }, timeoutMs) : null;
    // A page may pin a specific voice (Miss Thuraya pins a female one) via
    // window.PIPER_VOICE_EN / PIPER_VOICE_AR. Pages that set neither keep the
    // old lang-only body, so the other pages on the site are unaffected.
    var payload = { text: text, lang: lang };
    var pinned = lang === "ar" ? window.PIPER_VOICE_AR : window.PIPER_VOICE_EN;
    if (pinned) payload.voice = pinned;
    return ensureBase().then(function (t) {
      if (t.kind === "gradio")
        return gradioSynth(t.base, t.ep, text, lang).then(function (blob) {
          return new Response(blob, { status: 200, headers: { "Content-Type": "audio/wav" } });
        });
      return nativeFetch(t.base + "/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl ? ctrl.signal : undefined,
      });
    }).then(function (res) {
      if (to) clearTimeout(to);
      if (!res.ok) throw new Error("piper http " + res.status);
      return res;
    }, function (err) {
      if (to) clearTimeout(to);
      throw err;
    });
  }

  // Any page can ask for audio without caring which transport won.
  window.piperSynthBlob = function (text, lang) {
    return synth(text, lang === "ar" ? VOICE_AR : VOICE_EN).then(function (r) { return r.blob(); });
  };

  // The Hugging Face Space this all runs on sleeps when idle and can take a
  // few seconds to wake up. Without a retry, that cold start looks exactly
  // like a permanent failure and every game falls back to the robotic native
  // voice for the rest of the session — this mirrors the retry the novel
  // reader already uses successfully (2 retries, 6s apart) so every page
  // wired through this shim gets the same forgiving behavior.
  function synth(text, voice, triesLeft) {
    if (triesLeft == null) {
      var configuredRetries = Number(window.PIPER_RETRIES);
      triesLeft = Number.isFinite(configuredRetries) ? Math.max(0, Math.floor(configuredRetries)) : 2;
    }
    return synthOnce(text, voice).catch(function (err) {
      if (triesLeft <= 0) throw err;
      return new Promise(function (resolve) { setTimeout(resolve, 6000); })
        .then(function () { return synth(text, voice, triesLeft - 1); });
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

    window.piperNativeSpeak = function (utter) { return nativeSpeak(utter); };
    window.piperNativeCancel = function () { return nativeCancel(); };
    window.piperNativeVoices = function () {
      try { return typeof ss.getVoices === "function" ? ss.getVoices() : []; }
      catch (e) { return []; }
    };

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
        var isAr = voice === VOICE_AR;
        // Piper's bundled voices are both male. A page whose narrator is a
        // woman (Miss Thuraya) can opt into a brighter voice by raising the
        // pitch — per language, so the games keep the voice they have.
        var feminine = isAr ? window.PIPER_FEMININE_AR : window.PIPER_FEMININE_EN;
        if (feminine) {
          audio.preservesPitch = false;
          audio.mozPreservesPitch = false;
          audio.webkitPreservesPitch = false;
          var feminineRate = Number(isAr ? window.PIPER_FEMININE_RATE
                                         : window.PIPER_FEMININE_RATE_EN) || (isAr ? 1.16 : 1.12);
          audio.playbackRate = Math.max(1.06, Math.min(1.24, feminineRate));
        } else if (utter.rate && utter.rate > 0) {
          audio.playbackRate = utter.rate;
        }
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
      if (voice === VOICE_AR && window.PIPER_FEMININE_AR) {
        audio.preservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.playbackRate = Math.max(1.08, Math.min(1.24, Number(window.PIPER_FEMININE_RATE) || 1.16));
      }
      return audio.play().then(function () { return audio; });
    });
  };
})();
