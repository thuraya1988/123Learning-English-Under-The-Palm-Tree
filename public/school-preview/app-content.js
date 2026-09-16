const CT={announcement:'📣 الإعلان الهام',news:'📰 نشرة الأخبار',events:'🎉 الفعاليات والمناسبات',gallery:'🖼️ الجاليري',videos:'🎬 الفيديوهات'};
window.openSchoolContent=t=>{contentTab=t;openById('schoolContentModal');loadContent()};
window.switchSchoolContent=t=>{contentTab=t;loadContent()};
async function loadContent(){
  document.querySelectorAll('[data-content-tab]').forEach(b=>b.classList.toggle('active',b.dataset.contentTab===contentTab));
  $('contentModalTitle').textContent=CT[contentTab];
  $('contentAdminNote').textContent='المحتوى المنشور من قاعدة المدرسة.';
  $('contentFormWrap').style.display='none';
  $('schoolContentBody').innerHTML='<div class="content-empty">جاري التحميل…</div>';
  try{
    const a=(await api('content',{content_type:contentTab})).items||[];
    if(contentTab==='announcement'){
      const x=a[0];
      if(x){
        $('importantAnnouncement').classList.add('show');
        $('iaTest').textContent=x.test_name||x.title||'—';
        $('iaSubject').textContent=x.subject||'—';
        $('iaDate').textContent=x.event_date||'—';
        $('iaDay').textContent=x.day_name||'—';
      }
      $('schoolContentBody').innerHTML=x?`<article class="content-card announcement-card">${x.media_url?`<a href="${esc(x.media_url)}" target="_blank" rel="noopener" aria-label="فتح صورة الإعلان بحجم كامل" style="display:block;background:#fff7ef;border-bottom:1px solid #ead8c3"><img src="${esc(x.media_url)}" alt="${esc(x.title||x.test_name||'صورة الإعلان')}" style="display:block;width:100%;height:auto;max-height:70vh;object-fit:contain;margin:auto"></a>`:''}<div class="body"><h4>${esc(x.title||x.test_name||'إعلان هام')}</h4>${x.body?`<p style="white-space:pre-line">${esc(x.body)}</p>`:''}<p>الجهة: ${esc(x.subject||'—')}<br>التاريخ: ${esc(x.event_date||'—')}<br>اليوم: ${esc(x.day_name||'—')}</p>${x.media_url?'<small style="display:block;color:var(--bur);font-weight:700">اضغطي على الصورة لعرضها بحجم كامل</small>':''}</div></article>`:'<div class="content-empty">لا يوجد إعلان هام منشور حاليًا.</div>';
      return;
    }
    $('schoolContentBody').innerHTML=a.length?a.map(x=>`<article class="content-card">${contentTab==='gallery'?`<div class="cover">${x.media_url?`<img src="${esc(x.media_url)}">`:'🖼️'}</div>`:contentTab==='videos'?'<div class="cover">🎬</div>':''}<div class="body"><h4>${esc(x.title||'')}</h4><p>${esc(x.body||'')}</p>${contentTab==='videos'&&x.media_url?`<a class="video-link-btn" href="${esc(x.media_url)}" target="_blank">▶ فتح الفيديو</a>`:''}</div></article>`).join(''):'<div class="content-empty">لا يوجد محتوى منشور في هذا القسم حتى الآن.</div>';
  }catch(x){
    $('schoolContentBody').innerHTML=`<div class="content-empty">${err(x)}</div>`;
  }
}
const SIMPLE={assembly:['🛗 الطابور الصباحي','وحدة متابعة الطابور المدرسي.'],radio:['📢 الإذاعة المدرسية','مساحة تنظيم فقرات الإذاعة المدرسية.'],tests:['📝 إدارة الاختبارات','الإعلان الهام يعرض الاختبار والمادة والتاريخ واليوم.'],excellence:['🏆 لوحة التميّز','مساحة عرض إنجازات الطالبات والمعلمات عند نشرها.'],chat:['💬 محادثة مباشرة','الطلبات التشغيلية تصل عبر صندوق طلبات أولياء الأمور.'],search:['🔎 بحث شامل','استخدمي جداول الصفوف، جدول المعلمة، أو التحقق من سجل الطالب.'],reports:['🧾 تقارير وسجل عمليات','تسجيلات المناوبة وطلبات أولياء الأمور تحفظ في قاعدة المدرسة.'],attendance:['✅ الحضور والغياب','عذر الغياب والتأخر وتصحيح الحضور يوجّه إلى مدخلات البيانات.'],buses:['🚌 الحافلات والنقلات','بيانات الحافلات التفصيلية لم تُدخل بعد، لذلك لا تُعرض بيانات غير معتمدة.'],staff:['🏫 الكادر الإداري','المديرة: أ. بهيه الراشديه • المساعدتان: أ. سعاد الرواحيه، أ. فتحية الهدابيه • أ. فخرية العامرية • أ. أصيلة الوهيبيه • أ. أنيسه السيابيه • أ. فاطمة البطاشيه • أ. عبير المسلمية.']};
window.openSimpleModule=k=>{const x=SIMPLE[k];$('simpleModuleTitle').textContent=x?.[0]||'وحدة النظام';$('simpleModuleBody').innerHTML=`<div class="info">${esc(x?.[1]||'')}</div>`;openById('simpleModuleModal')};
loadContent();
