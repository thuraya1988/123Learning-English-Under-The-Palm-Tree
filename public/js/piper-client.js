/*!
 * Piper TTS client shim — Under The Palm Tree
 *
 * The games all call `fetch('/api/tts', ...)` expecting a WAV blob back.
 * This deployment is a Next.js static export, so /api/tts has no server.
 * This shim intercepts those calls and routes them to a Piper inference
 * server (Hugging Face Space) instead. On any failure the caller's existing
 * speechSynthesis fallback still runs.
 *
 * Voices used (matching the .onnx files in public/tts-voices/):
 *   English : en_GB-alan-low      (British)
 *   Arabic  : ar_JO-kareem-medium (Jordanian)
 *
 * Override the Space URL from any page before this script loads, e.g.:
 *   <script>window.PIPER_BASE = "https://my-space.hf.space";</script>
 */
(function () {
  var DEFAULT_BASE = "https://thursday88-piper-tts.hf.space";
  var BASE = (window.PIPER_BASE || DEFAULT_BASE).replace(/\/+$/, "");
  var VOICE_EN = "en_GB-alan-low";
  var VOICE_AR = "ar_JO-kareem-medium";

  // Hint endpoints some games look up on window; keep them aligned.
  if (!window.PIPER_TTS_ENDPOINT) window.PIPER_TTS_ENDPOINT = BASE + "/synthesize";
  if (!window.__piperEndpoint)   window.__piperEndpoint   = BASE + "/synthesize";

  var nativeFetch = window.fetch.bind(window);

  function isApiTtsUrl(u) {
    if (!u) return false;
    if (typeof u !== "string") u = u.url || "";
    return /\/api\/tts(?:[\/?#]|$)/.test(u);
  }

  function pickVoice(body) {
    var v = (body.voice || "").toString().toLowerCase();
    if (v.indexOf("ar") === 0 || v.indexOf("kareem") !== -1) return VOICE_AR;
    if (body.lang === "ar" || body.language === "ar") return VOICE_AR;
    return VOICE_EN;
  }

  function synth(text, voice) {
    return nativeFetch(BASE + "/synthesize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, voice: voice }),
    });
  }

  // Rough duration estimate so we can queue the Arabic clip after the English
  // one finishes when the caller only knows about a single response blob.
  function estimateMs(text) {
    var len = (text || "").trim().length;
    return Math.max(1500, Math.round(len * 65) + 300);
  }

  function handleTTS(init) {
    var body = {};
    try { body = init && init.body ? JSON.parse(init.body) : {}; } catch (e) {}

    // Bilingual shape: synth EN, play AR as a queued follow-up.
    if (body.text_en && body.text_ar) {
      return synth(body.text_en, VOICE_EN).then(function (enRes) {
        if (!enRes || !enRes.ok) return enRes;
        // Fire AR synth in parallel; queue its playback after EN finishes.
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
    if (!text) {
      return Promise.resolve(new Response("No text", { status: 400 }));
    }
    return synth(text, pickVoice(body));
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

  // Friendly direct helper for new code that wants to skip the /api/tts shim.
  window.piperSay = function (text, langOrVoice) {
    var voice = VOICE_EN;
    if (langOrVoice === "ar" || /ar/i.test(langOrVoice || "")) voice = VOICE_AR;
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
