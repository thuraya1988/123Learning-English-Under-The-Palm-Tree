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

    var btn = document.createElement('a');
    btn.className = 'palm-globe-fab';
    btn.href = GLOBE_URL;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.setAttribute('aria-label', 'Story World Globe');
    btn.innerHTML =
      '<span class="pgf-emoji">🌍</span>' +
      '<span class="pgf-label">Story World · عالم القصة</span>';

    var css = document.createElement('style');
    css.textContent =
      '.palm-globe-fab{position:fixed;' +
      (onMuseum ? 'top:64px;left:14px;' : 'bottom:16px;left:16px;') +
      'z-index:99998;display:flex;align-items:center;gap:0;height:44px;' +
      'background:rgba(74,53,32,.92);border:1px solid rgba(201,170,128,.55);' +
      'border-radius:999px;padding:0 10px;text-decoration:none;cursor:pointer;' +
      'box-shadow:0 6px 18px rgba(0,0,0,.28);backdrop-filter:blur(8px);' +
      '-webkit-backdrop-filter:blur(8px);transition:box-shadow .3s,transform .3s;' +
      'font-family:"Almarai",system-ui,-apple-system,sans-serif;}' +
      '.palm-globe-fab:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(0,0,0,.36);}' +
      '.pgf-emoji{font-size:22px;line-height:1;animation:pgfSpin 14s linear infinite;display:inline-block;}' +
      '@keyframes pgfSpin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}' +
      '.pgf-label{max-width:0;overflow:hidden;white-space:nowrap;color:#F5EDD8;' +
      'font-size:12px;font-weight:700;letter-spacing:.02em;' +
      'transition:max-width .35s ease,padding .35s ease;padding:0;}' +
      '.palm-globe-fab:hover .pgf-label{max-width:220px;padding:0 6px 0 8px;}' +
      '@media(max-width:600px){.pgf-emoji{font-size:20px}.palm-globe-fab{height:40px}}';

    document.head.appendChild(css);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
