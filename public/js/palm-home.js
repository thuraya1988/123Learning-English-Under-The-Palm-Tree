/*!
 * زرُّ العودة إلى الموقع الرئيسيّ — تحت ظلّ النخلة
 *
 * الألعابُ على النطاق الفرعيّ play.under-palm-tree.com، والموقعُ
 * الرئيسيُّ www.under-palm-tree.com. ومن يفتح لعبةً ينبغي أن يجد بابًا
 * يعود منه إلى الموقع، وأن تُحسَب زيارتُه للموقع حين يعود.
 *
 * للإضافة إلى أيّ صفحة، سطرٌ واحد قبل ‎</body>‎:
 *
 *     <script src="public/js/palm-home.js" defer></script>
 *
 * ومن مجلّدٍ أعمق يُصحَّح المسار: ‎../public/js/palm-home.js‎ وهكذا.
 *
 * ويقبل ضبطًا اختياريًّا على الوسم نفسِه:
 *   data-label="الموقع"       نصُّ الزرّ
 *   data-pos="tr|tl|br|bl"     زاويتُه (الافتراضيّ أعلى اليسار)
 *   data-hide-on="#riddle.on"  يختفي متى ظهر هذا العنصر (نوافذُ الأسئلة)
 *
 * ═══ عن حساب الزيارة ═══
 * الرابطُ يَحسب زيارةً حين يُضغَط، ويحمل وسوم utm فتعرف إحصاءاتُ موقعك
 * أنّ الزائر جاء من لعبةٍ بعينها. أمّا أن يُحسَب مجرّدُ فتحِ اللعبة
 * زيارةً للموقع فلا يكون برابط، بل بأن يعمل وسمُ إحصاءاتِ موقعك على
 * صفحة اللعبة نفسِها. فإن أعطيتِني معرّفَ القياس (مثل G-XXXXXXX) ضعيه
 * في السطر التالي وحدَه، فيُرسِل كلُّ فتحٍ صفحةً إلى حسابك:
 */
(function () {
  'use strict';
  var MEASUREMENT_ID = '';          /* ← ضعي معرّف القياس هنا إن أردتِ */
  var HOME = 'https://www.under-palm-tree.com/';

  if (window.__palmHome) return;
  window.__palmHome = true;

  var me = document.currentScript;
  var d = me ? me.dataset : {};
  var label = d.label || 'الموقع الرئيسيّ';
  var pos = d.pos || 'tl';
  var hideOn = d.hideOn || '';

  /* اسمُ الصفحة يُرسَل مع الرابط، فتعرف الإحصاءاتُ من أيّ لعبةٍ جاء */
  var page = (location.pathname.split('/').pop() || 'index').replace(/\.html?$/i, '') || 'index';
  var href = HOME + '?utm_source=play&utm_medium=game&utm_campaign=' +
             encodeURIComponent(page);

  var css = document.createElement('style');
  css.textContent =
    '.palm-home{position:fixed;z-index:2147483000;display:inline-flex;align-items:center;gap:.45em;' +
    'padding:7px 14px;border-radius:999px;text-decoration:none;white-space:nowrap;' +
    "font-family:'Almarai','Amiri',system-ui,sans-serif;font-size:12.5px;font-weight:700;" +
    'color:#eae7e3;background:rgba(54,3,4,.86);border:1px solid rgba(200,179,154,.55);' +
    'box-shadow:0 6px 20px rgba(0,0,0,.45);backdrop-filter:blur(6px);' +
    'transition:background .2s,transform .2s,opacity .2s;opacity:.92}' +
    '.palm-home:hover{background:rgba(132,104,71,.95);transform:translateY(-1px);opacity:1}' +
    '.palm-home img{width:17px;height:17px;object-fit:contain}' +
    '.palm-home.tl{top:12px;left:12px}.palm-home.tr{top:12px;right:12px}' +
    '.palm-home.bl{bottom:12px;left:12px}.palm-home.br{bottom:12px;right:12px}' +
    '.palm-home.gone{opacity:0;pointer-events:none}' +
    '@media(max-width:520px){.palm-home{font-size:11.5px;padding:6px 11px}}';
  document.head.appendChild(css);

  /* مسارُ الشعار يُشتقّ من مسار هذا الملفّ، فيصحّ من أيّ عمق */
  var logo = '';
  try {
    var src = me && me.src;
    if (src) logo = src.replace(/\/js\/palm-home\.js.*$/, '/Website-icons-logo/logo-without-circle-glass.png');
  } catch (e) {}

  function build() {
    if (document.querySelector('.palm-home')) return;
    var a = document.createElement('a');
    a.className = 'palm-home ' + pos;
    a.href = href;
    a.title = 'العودة إلى www.under-palm-tree.com';
    a.setAttribute('aria-label', 'العودة إلى الموقع الرئيسيّ');
    a.innerHTML = (logo ? '<img src="' + logo + '" alt="">' : '🌴') +
                  '<span>↩ ' + label + '</span>';
    document.body.appendChild(a);

    /* النوافذُ المنبثقة تغطّي الزرّ أو يغطّيها، فيختفي ما دامت مفتوحة */
    if (hideOn) {
      var check = function () {
        try { a.classList.toggle('gone', !!document.querySelector(hideOn)); } catch (e) {}
      };
      check();
      new MutationObserver(check).observe(document.documentElement,
        { subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    }
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', build);
  else build();

  /* وسمُ الإحصاءات — لا يعمل إلّا إذا وُضع المعرّف أعلاه */
  if (MEASUREMENT_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { page_title: document.title, page_path: '/play/' + page });
  }
})();
