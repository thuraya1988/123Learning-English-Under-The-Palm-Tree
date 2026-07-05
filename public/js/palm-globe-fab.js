/*!
 * Story World floating icon — Under The Palm Tree
 *
 * A small floating 🌍 button that follows the visitor on every page and
 * opens the Story World Globe. Positioned bottom-left (the sound controls
 * own bottom-right); on the museum pages, which show a joystick bottom-left
 * on mobile, it moves to the top-left instead.
 *
 * Opt out per page: <script>window.PALM_GLOBE_FAB_DISABLED = true;</script>
 */
(function () {
  if (window.__palmGlobeFab) return;
  window.__palmGlobeFab = true;
  if (window.PALM_GLOBE_FAB_DISABLED) return;
  // Don't show the button on the globe itself.
  if (location.pathname.indexOf('/globe') !== -1) return;

  var GLOBE_URL = 'https://play.under-palm-tree.com/globe/';

  function boot() {
    if (document.querySelector('.palm-globe-fab')) return;

    var onMuseum = !!document.getElementById('joy');
    // Stack above the sound buttons when they exist (they own bottom:14px right).
    var hasSfx = !!window.__palmSfxInstalled;
    var pos = onMuseum
      ? 'bottom:16px;right:16px;'
      : hasSfx
        ? 'bottom:66px;right:14px;'
        : 'bottom:16px;right:16px;';

    var btn = document.createElement('a');
    btn.className = 'palm-globe-fab';
    btn.href = GLOBE_URL;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.setAttribute('aria-label', 'Story World Globe');
    btn.innerHTML =
      '<span class="pgf-label">Story World · عالم القصة</span>' +
      '<span class="pgf-earth" aria-hidden="true"></span>';

    var css = document.createElement('style');
    css.textContent =
      '.palm-globe-fab{position:fixed;' +
      pos +
      'z-index:99998;display:flex;align-items:center;gap:0;height:44px;' +
      'background:rgba(74,53,32,.92);border:1px solid rgba(201,170,128,.55);' +
      'border-radius:999px;padding:0 10px;text-decoration:none;cursor:pointer;' +
      'box-shadow:0 6px 18px rgba(0,0,0,.28);backdrop-filter:blur(8px);' +
      '-webkit-backdrop-filter:blur(8px);transition:box-shadow .3s,transform .3s;' +
      'font-family:"Almarai",system-ui,-apple-system,sans-serif;}' +
      '.palm-globe-fab:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(0,0,0,.36);}' +
      '.pgf-earth{width:32px;height:32px;border-radius:50%;flex-shrink:0;' +
      'background:#1c4e8a url(https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg) repeat-x;' +
      'background-size:auto 100%;' +
      'animation:pgfRotate 16s linear infinite;' +
      'box-shadow:inset -8px -5px 10px rgba(0,0,0,.6),' +
      'inset 5px 4px 8px rgba(255,255,255,.28),' +
      '0 0 10px rgba(120,180,255,.45);}' +
      '@keyframes pgfRotate{from{background-position-x:0}to{background-position-x:-64px}}' +
      '.pgf-label{max-width:0;overflow:hidden;white-space:nowrap;color:#F5EDD8;' +
      'font-size:12px;font-weight:700;letter-spacing:.02em;' +
      'transition:max-width .35s ease,padding .35s ease;padding:0;}' +
      '.palm-globe-fab:hover .pgf-label{max-width:220px;padding:0 8px 0 6px;}' +
      '@media(max-width:600px){.palm-globe-fab{height:42px}}';

    document.head.appendChild(css);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
