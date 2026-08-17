/*!
 * زرّ «قائمة الألعاب» العائم — تحت شجرة النخلة
 *
 * زرّ صغير يرافق الزائرين في كلّ صفحة لعبة أو عالم، يعيدهم إلى قائمة
 * الألعاب. موضعه أسفل اليسار فوق زرّ عالم القصة مباشرةً (زرّ الكرة
 * الأرضية يملك أسفل اليمين، والصوت يملك أسفل اليمين أيضًا في بعض
 * الصفحات)، وينتقل إلى أعلى اليسار في صفحات المتحف التي فيها عصا
 * تحكّم أسفل اليسار.
 *
 * إلغاؤه في صفحة بعينها:
 *   <script>window.PALM_GAMES_FAB_DISABLED = true;</script>
 *
 * تحديد مسار مختلف (للصفحات داخل مجلدات فرعية):
 *   <script>window.PALM_GAMES_FAB_HREF = '../games-skills.html';</script>
 */
(function () {
  if (window.__palmGamesFab) return;
  window.__palmGamesFab = true;
  if (window.PALM_GAMES_FAB_DISABLED) return;

  /* لا يظهر داخل قائمة الألعاب نفسها */
  if (/games-skills\.html$/.test(location.pathname)) return;

  var HREF = window.PALM_GAMES_FAB_HREF || 'games-skills.html';

  function boot() {
    if (document.querySelector('.palm-games-fab')) return;

    /* زرّ عالم القصة يملك أسفل اليمين، والصوت كذلك — فنأخذ أسفل اليسار.
       وفي صفحات المتحف عصا التحكّم أسفل اليسار، فننتقل إلى أعلى اليسار. */
    var onMuseum = !!document.getElementById('joy');
    var pos = onMuseum ? 'top:16px;left:16px;' : 'bottom:16px;left:16px;';

    var css = document.createElement('style');
    css.textContent =
      '.palm-games-fab{position:fixed;' + pos +
      'z-index:99997;display:flex;flex-direction:row-reverse;align-items:center;gap:0;' +
      'text-decoration:none;font-family:"Cairo",system-ui,sans-serif;' +
      '-webkit-tap-highlight-color:transparent;}' +
      '.pgm-btn{width:56px;height:56px;border-radius:50%;flex-shrink:0;' +
      'display:flex;align-items:center;justify-content:center;font-size:26px;' +
      'background:radial-gradient(circle at 35% 30%,#F5EDD8,#C9AA80 60%,#8C6A3F);' +
      'border:2px solid rgba(255,255,255,.5);' +
      'box-shadow:0 6px 22px rgba(74,53,32,.45);' +
      'transition:transform .25s ease,box-shadow .25s ease;}' +
      '.palm-games-fab:hover .pgm-btn{transform:translateY(-2px) scale(1.06);' +
      'box-shadow:0 10px 28px rgba(74,53,32,.55);}' +
      '.palm-games-fab:active .pgm-btn{transform:scale(.94);}' +
      '.pgm-label{max-width:0;overflow:hidden;white-space:nowrap;color:#F5EDD8;' +
      'font-weight:700;font-size:14px;background:rgba(74,53,32,.92);' +
      'border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(8px);' +
      'border-radius:999px;height:34px;line-height:32px;' +
      'transition:max-width .35s ease,padding .35s ease,margin .35s ease;padding:0;margin:0;}' +
      '.palm-games-fab:hover .pgm-label{max-width:230px;padding:0 14px;margin-left:10px;}' +
      '@media(max-width:600px){.pgm-btn{width:48px;height:48px;font-size:22px;}}';
    document.head.appendChild(css);

    var a = document.createElement('a');
    a.className = 'palm-games-fab';
    a.href = HREF;
    a.setAttribute('aria-label', 'قائمة الألعاب — Games list');
    a.title = 'قائمة الألعاب';
    a.innerHTML = '<span class="pgm-label">🎮 قائمة الألعاب</span>' +
                  '<span class="pgm-btn">🎮</span>';
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    /* ننتظر لحظة حتى يُركّب زرّ عالم القصة أوّلًا فنقف فوقه */
    setTimeout(boot, 60);
  }
})();
