/*!
 * Story World floating icon — Under The Palm Tree
 *
 * A small floating 🌍 button that follows the visitor on every page and
 * opens the Interactive World hub (Black Hole portal → Globe, Silk Road,
 * Ocean, and the novel's 3D world). Positioned bottom-left (the sound
 * controls own bottom-right); on the museum pages, which show a joystick
 * bottom-left on mobile, it moves to the top-left instead.
 *
 * Opt out per page: <script>window.PALM_GLOBE_FAB_DISABLED = true;</script>
 */
(function () {
  if (window.__palmGlobeFab) return;
  window.__palmGlobeFab = true;
  if (window.PALM_GLOBE_FAB_DISABLED) return;
  // Don't show the button on the world hub or any of the experiences it links to.
  var onWorldPage = ['/globe', '/experiences/world', '/experiments/gargantua',
    '/experiments/silk-atlas', '/experiments/open-sea'].some(function (p) {
    return location.pathname.indexOf(p) !== -1;
  });
  if (onWorldPage) return;

  var GLOBE_URL = 'https://play.under-palm-tree.com/experiences/world/';

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
      // Bare floating planet — no pill, no background.
      '.palm-globe-fab{position:fixed;' +
      pos +
      'z-index:99998;display:flex;align-items:center;gap:0;' +
      'background:none;border:none;padding:0;text-decoration:none;cursor:pointer;' +
      'transition:transform .3s;' +
      'font-family:"Almarai",system-ui,-apple-system,sans-serif;}' +
      '.palm-globe-fab:hover{transform:translateY(-3px) scale(1.06);}' +
      // Big shaded sphere with the earth texture panning around it.
      '.pgf-earth{width:56px;height:56px;border-radius:50%;flex-shrink:0;' +
      'background:#1c4e8a url(https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg) repeat-x;' +
      'background-size:auto 100%;' +
      'animation:pgfRotate 18s linear infinite,pgfGlow 3.2s ease-in-out infinite;}' +
      '@keyframes pgfRotate{from{background-position-x:0}to{background-position-x:-112px}}' +
      // Breathing atmosphere glow + sphere shading.
      '@keyframes pgfGlow{' +
      '0%,100%{box-shadow:inset -12px -8px 16px rgba(0,0,0,.62),' +
      'inset 7px 6px 12px rgba(255,255,255,.3),' +
      '0 0 14px rgba(110,180,255,.55),0 0 34px rgba(90,160,255,.32);}' +
      '50%{box-shadow:inset -12px -8px 16px rgba(0,0,0,.62),' +
      'inset 7px 6px 12px rgba(255,255,255,.3),' +
      '0 0 22px rgba(130,195,255,.85),0 0 52px rgba(100,170,255,.5);}}' +
      // Hover label: its own little pill to the left of the planet.
      '.pgf-label{max-width:0;overflow:hidden;white-space:nowrap;color:#F5EDD8;' +
      'font-size:12px;font-weight:700;letter-spacing:.02em;' +
      'background:rgba(74,53,32,.92);border:1px solid rgba(201,170,128,.55);' +
      'border-radius:999px;height:34px;line-height:32px;' +
      'transition:max-width .35s ease,padding .35s ease,margin .35s ease;padding:0;margin:0;}' +
      '.palm-globe-fab:hover .pgf-label{max-width:230px;padding:0 14px;margin-right:10px;}' +
      '@media(max-width:600px){.pgf-earth{width:48px;height:48px;animation:pgfRotateM 18s linear infinite,pgfGlow 3.2s ease-in-out infinite;}}' +
      '@keyframes pgfRotateM{from{background-position-x:0}to{background-position-x:-96px}}';

    document.head.appendChild(css);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
