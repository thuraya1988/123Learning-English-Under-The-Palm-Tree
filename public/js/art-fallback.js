/*!
 * Art fallback — Under The Palm Tree
 *
 * Several games decorate their menus with pictures hosted on a temporary
 * image service (image.qwenlm.ai). That host is not ours and will not last;
 * when it goes, every one of those pages shows a torn-image icon in the
 * middle of its title screen.
 *
 * This draws a replacement instead: a palm-tree scene generated in the page
 * itself, coloured from the element it is standing in for, so a missing
 * picture reads as artwork rather than as breakage. Nothing is downloaded.
 *
 * Include it anywhere; it watches <img> errors and checks background images
 * that point at a host we do not control.
 */
(function () {
  if (window.__palmArtFallback) return;
  window.__palmArtFallback = true;

  var PALETTES = [
    ['#0f2027', '#2c5364', '#f4d06f'],   // night sea
    ['#3a1c71', '#d76d77', '#ffaf7b'],   // sunset
    ['#134e5e', '#71b280', '#f3f9a7'],   // oasis
    ['#42275a', '#734b6d', '#e8c24a'],   // dusk
    ['#1a2a6c', '#b21f1f', '#fdbb2d']    // desert fire
  ];

  function pick(seed) {
    var n = 0;
    for (var i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) >>> 0;
    return PALETTES[n % PALETTES.length];
  }

  function scene(seed, w, h) {
    var p = pick(seed || 'palm');
    var W = Math.max(320, Math.round(w || 640));
    var H = Math.max(180, Math.round(h || 360));
    var horizon = Math.round(H * 0.72);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '">' +
      '<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + p[0] + '"/>' +
      '<stop offset="1" stop-color="' + p[1] + '"/></linearGradient></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#s)"/>' +
      '<circle cx="' + Math.round(W * 0.76) + '" cy="' + Math.round(H * 0.26) +
        '" r="' + Math.round(H * 0.11) + '" fill="' + p[2] + '" opacity=".92"/>' +
      '<rect y="' + horizon + '" width="' + W + '" height="' + (H - horizon) +
        '" fill="#000" opacity=".28"/>';
    // three palms of different heights along the horizon
    [0.18, 0.34, 0.86].forEach(function (fx, i) {
      var x = Math.round(W * fx);
      var top = horizon - Math.round(H * (0.30 + i * 0.06));
      svg += '<path d="M' + x + ' ' + horizon + ' Q' + (x + 6) + ' ' +
             ((horizon + top) / 2) + ' ' + (x + 2) + ' ' + top +
             '" stroke="#000" stroke-opacity=".55" stroke-width="' +
             Math.max(3, Math.round(H * 0.012)) + '" fill="none" stroke-linecap="round"/>';
      for (var a = -2; a <= 2; a++) {
        var ex = x + 2 + a * Math.round(H * 0.05);
        var ey = top + Math.abs(a) * Math.round(H * 0.022) - Math.round(H * 0.02);
        svg += '<path d="M' + (x + 2) + ' ' + top + ' Q' + ((x + 2 + ex) / 2) + ' ' +
               (top - Math.round(H * 0.05)) + ' ' + ex + ' ' + ey +
               '" stroke="#000" stroke-opacity=".5" stroke-width="' +
               Math.max(2, Math.round(H * 0.009)) + '" fill="none" stroke-linecap="round"/>';
      }
    });
    svg += '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function foreign(url) {
    return /^https?:\/\//.test(url) && url.indexOf(location.host) === -1;
  }

  function fixImg(img) {
    // Some menus re-assign src as they build, overwriting the replacement. So
    // the guard is "am I already showing generated art?", not "have I ever
    // touched this element" — otherwise one re-assignment leaves it broken
    // and a one-shot flag stops us fixing it again.
    if ((img.getAttribute('src') || '').lastIndexOf('data:image/svg+xml', 0) === 0) return;
    img.dataset.palmFallback = '1';
    var r = img.getBoundingClientRect();
    var w = r.width || img.width || img.offsetWidth || 640;
    var h = r.height || img.height || img.offsetHeight || Math.round(w * 0.56);
    img.removeAttribute('srcset');
    img.src = scene(img.id || img.alt || img.className || 'palm', w, h);
  }

  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG') fixImg(t);
  }, true);

  // An image that already failed before this file loaded never fires its
  // error event at us, so sweep what is on the page too — twice, since some
  // menus build their art after first paint.
  function sweepImages() {
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.complete && im.naturalWidth === 0 && im.getAttribute('src')) fixImg(im);
    }
  }

  // Background images cannot report failure, so probe the ones we do not host.
  function checkBackgrounds() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var bg;
      try { bg = getComputedStyle(el).backgroundImage; } catch (e) { continue; }
      if (!bg || bg === 'none') continue;
      var m = bg.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
      if (!m || !foreign(m[1]) || el.dataset.palmFallback) continue;
      (function (el, url) {
        el.dataset.palmFallback = '1';
        var probe = new Image();
        probe.onerror = function () {
          var r = el.getBoundingClientRect();
          el.style.backgroundImage =
            "url('" + scene(el.id || el.className || url, r.width, r.height) + "')";
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
        };
        probe.src = url;
      })(el, m[1]);
    }
  }

  function run() { sweepImages(); checkBackgrounds(); }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', run);
  else run();
  [400, 1200, 2500, 4000, 6000].forEach(function (t) { setTimeout(run, t); });
})();
