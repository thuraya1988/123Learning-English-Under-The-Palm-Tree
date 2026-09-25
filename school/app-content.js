const CT={announcement:'📣 الإعلان الهام',news:'📰 نشرة الأخبار',events:'🎉 الفعاليات والمناسبات',gallery:'🖼️ الجاليري',videos:'🎬 الفيديوهات'};
window.openSchoolContent=t=>{contentTab=t;openById('schoolContentModal');loadContent()};
window.switchSchoolContent=t=>{contentTab=t;loadContent()};
async function loadContent(){
  document.querySelectorAll('[data-content-tab]').forEach(b=>b.classList.toggle('active',b.dataset.contentTab===contentTab));
  $('contentModalTitle').textContent=CT[contentTab];
  $('contentAdminNote').textContent='المحتوى المنشور من قاعدة المدرسة.';
  $('contentFormWrap').style.display='none';$('contentFormWrap').innerHTML='';
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
      await renderAnnouncementAdminControls(x);
      return;
    }
    $('schoolContentBody').innerHTML=a.length?a.map(x=>`<article class="content-card">${contentTab==='gallery'?`<div class="cover">${x.media_url?`<img src="${esc(x.media_url)}">`:'🖼️'}</div>`:contentTab==='videos'?'<div class="cover">🎬</div>':''}<div class="body"><h4>${esc(x.title||'')}</h4><p style="white-space:pre-line">${esc(x.body||'')}</p>${x.event_date?`<small>${esc(x.event_date)}</small>`:''}${contentTab==='videos'&&x.media_url?`<a class="video-link-btn" href="${esc(x.media_url)}" target="_blank">▶ فتح الفيديو</a>`:''}${contentTab==='news'&&typeof window.canManageEmergencyAlert==='function'&&window.canManageEmergencyAlert()?`<button class="btn btn-ghost" style="margin-top:8px" onclick="deleteNewsUI(${x.id})">🗑 حذف الخبر</button>`:''}</div></article>`).join(''):'<div class="content-empty">لا يوجد محتوى منشور في هذا القسم حتى الآن.</div>';
    if(contentTab==='news')await renderNewsAdminControls();
  }catch(x){
    $('schoolContentBody').innerHTML=`<div class="content-empty">${err(x)}</div>`;
  }
}
async function renderNewsAdminControls(){
 const wrap=$('contentFormWrap');if(!wrap)return;
 if(typeof window.canManageEmergencyAlert!=='function'||!window.canManageEmergencyAlert()){wrap.style.display='none';return}
 wrap.style.display='block';
 wrap.innerHTML='<section style="border:1px solid #ead8c3;border-radius:18px;padding:16px;margin-bottom:14px;background:#fffaf3"><h4 style="margin:0 0 12px">📰 نشر خبر جديد</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px"><label>عنوان الخبر<input id="newsAdminTitle" placeholder="عنوان الخبر"></label><label>التاريخ<input id="newsAdminDate" type="date"></label><label>رابط صورة (اختياري)<input id="newsAdminMedia" placeholder="اختياري"></label></div><label>نص الخبر<textarea id="newsAdminBody" rows="3" placeholder="اكتبي تفاصيل الخبر"></textarea></label><label style="display:flex;gap:8px;align-items:center;margin:10px 0"><input id="newsAdminPush" type="checkbox" checked> إرسال إشعار فوري لجميع المعلمات</label><button class="btn btn-solid" onclick="saveNewsUI()">نشر الخبر</button></section>';
}
window.saveNewsUI=async()=>{
 const title=$('newsAdminTitle').value.trim(),body=$('newsAdminBody').value.trim();if(!title)return toast('اكتبي عنوان الخبر');
 try{const d=await window.saveNewsAdmin({title,body,event_date:$('newsAdminDate').value,media_url:$('newsAdminMedia').value,send_push:$('newsAdminPush').checked});toast(d.push_sent?'✅ نُشر الخبر ووصل الإشعار لجميع المعلمات':'✅ نُشر الخبر'+($('newsAdminPush').checked?'، ولا توجد أجهزة مفعّلة حاليًا':''));await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر نشر الخبر')}
};
window.deleteNewsUI=async id=>{
 if(!confirm('حذف هذا الخبر؟'))return;
 try{await window.deleteNewsAdmin(id);toast('🗑 تم حذف الخبر');await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حذف الخبر')}
};
async function renderAnnouncementAdminControls(current){
 const wrap=$('contentFormWrap');if(!wrap)return;
 if(typeof window.canManageEmergencyAlert!=='function'||!window.canManageEmergencyAlert()){wrap.style.display='none';return}
 wrap.style.display='block';let active=null;try{active=(await window.getEmergencyStatus()).alert}catch(_){}
 const normal='<section style="border:1px solid #ead8c3;border-radius:18px;padding:16px;margin-bottom:14px;background:#fffaf3"><h4 style="margin:0 0 12px">📣 إضافة أو تعديل إعلان هام</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px"><label>عنوان الإعلان<input id="iaAdminTitle" value="'+esc(current?.title||'')+'" placeholder="عنوان الإعلان"></label><label>الجهة أو المادة<input id="iaAdminSubject" value="'+esc(current?.subject||'')+'" placeholder="مثال: الإدارة"></label><label>التاريخ<input id="iaAdminDate" type="date" value="'+esc(current?.event_date||'')+'"></label><label>رابط صورة الإعلان<input id="iaAdminMedia" value="'+esc(current?.media_url||'')+'" placeholder="اختياري"></label></div><label>نص الإعلان<textarea id="iaAdminBody" rows="3" placeholder="اكتبي تفاصيل الإعلان">'+esc(current?.body||'')+'</textarea></label><label style="display:flex;gap:8px;align-items:center;margin:10px 0"><input id="iaAdminPush" type="checkbox" checked> إرسال إشعار فوري لجميع الأجهزة المفعّلة</label><button class="btn btn-solid" onclick="saveImportantAnnouncementUI()">حفظ ونشر الإعلان</button></section>';
 const emergency=active?'<section style="border:2px solid #a3152d;border-radius:18px;padding:16px;background:#fff0f1"><h4 style="color:#a3152d;margin:0 0 8px">🚨 التنبيه الطارئ يعمل الآن</h4><b>'+esc(active.title)+'</b><p style="white-space:pre-line">'+esc(active.body)+'</p><small>يتكرر كل '+Number(active.repeat_minutes||5)+' دقائق حتى الإيقاف.</small><div style="margin-top:12px"><button class="btn btn-solid" style="background:#a3152d" onclick="stopEmergencyAlertUI('+Number(active.id)+')">⏹ إيقاف التنبيه الطارئ</button></div></section>':'<section style="border:2px solid #a3152d;border-radius:18px;padding:16px;background:#fff8f8"><h4 style="color:#a3152d;margin:0 0 10px">🚨 تشغيل تنبيه طارئ مستمر</h4><p>يرسل إشعارًا فورًا، ثم يكرره حتى تضغطي زر الإيقاف.</p><label>عنوان التنبيه<input id="emergencyTitle" placeholder="مثال: تنبيه طارئ — اجتماع فوري"></label><label>نص التنبيه<textarea id="emergencyBody" rows="3" placeholder="اكتبي التعليمات بوضوح"></textarea></label><label>تكرار الإشعار<select id="emergencyRepeat"><option value="5">كل 5 دقائق</option><option value="10">كل 10 دقائق</option><option value="15">كل 15 دقيقة</option><option value="30">كل 30 دقيقة</option></select></label><button class="btn btn-solid" style="background:#a3152d" onclick="startEmergencyAlertUI()">🚨 تشغيل التنبيه الطارئ</button></section>';
 wrap.innerHTML=normal+emergency;
}
window.saveImportantAnnouncementUI=async()=>{
 const date=$('iaAdminDate').value,day=date?new Intl.DateTimeFormat('ar-OM',{weekday:'long',timeZone:'Asia/Muscat'}).format(new Date(date+'T12:00:00+04:00')):'';
 try{const d=await window.saveImportantAnnouncementAdmin({title:$('iaAdminTitle').value,body:$('iaAdminBody').value,subject:$('iaAdminSubject').value,event_date:date,day_name:day,media_url:$('iaAdminMedia').value,send_push:$('iaAdminPush').checked});toast(d.push_sent?'✅ نُشر الإعلان ووصل الإشعار':'✅ نُشر الإعلان'+($('iaAdminPush').checked?'، ولا توجد أجهزة مفعّلة حاليًا':' '));await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حفظ الإعلان')}
};
window.startEmergencyAlertUI=async()=>{
 const title=$('emergencyTitle').value.trim(),body=$('emergencyBody').value.trim();if(!title||!body)return toast('اكتبي عنوان التنبيه ونصه');if(!confirm('سيبدأ إرسال التنبيه لجميع الأجهزة ويتكرر حتى تضغطي إيقاف. متابعة؟'))return;
 try{const d=await window.startEmergencyAlertAdmin({title,body,repeat_minutes:Number($('emergencyRepeat').value)});toast(d.push_sent?'🚨 بدأ التنبيه الطارئ ووصل الإشعار':'🚨 بدأ التنبيه، لكن لا توجد أجهزة مفعّلة حاليًا');window.pollEmergencyAlertNow&&window.pollEmergencyAlertNow();await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر تشغيل التنبيه')}
};
window.stopEmergencyAlertUI=async id=>{
 if(!confirm('إيقاف التنبيه الطارئ ومنع أي إشعارات لاحقة؟'))return;try{await window.stopEmergencyAlertAdmin(id);toast('⏹ تم إيقاف التنبيه الطارئ');window.pollEmergencyAlertNow&&window.pollEmergencyAlertNow();await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر إيقاف التنبيه')}
};

const SIMPLE={assembly:['🛗 الطابور الصباحي','وحدة متابعة الطابور المدرسي.'],radio:['📢 الإذاعة المدرسية','مساحة تنظيم فقرات الإذاعة المدرسية.'],tests:['📝 إدارة الاختبارات','الإعلان الهام يعرض الاختبار والمادة والتاريخ واليوم.'],excellence:['🏆 لوحة التميّز','مساحة عرض إنجازات الطالبات والمعلمات عند نشرها.'],chat:['💬 محادثة مباشرة','الطلبات التشغيلية تصل عبر صندوق طلبات أولياء الأمور.'],search:['🔎 بحث شامل','استخدمي جداول الصفوف، جدول المعلمة، أو التحقق من سجل الطالب.'],reports:['🧾 تقارير وسجل عمليات','تسجيلات المناوبة وطلبات أولياء الأمور تحفظ في قاعدة المدرسة.'],attendance:['✅ الحضور والغياب','عذر الغياب والتأخر وتصحيح الحضور يوجّه إلى مدخلات البيانات.'],buses:['🚌 الحافلات والنقلات','بيانات الحافلات التفصيلية لم تُدخل بعد، لذلك لا تُعرض بيانات غير معتمدة.'],staff:['🏫 الكادر الإداري','المديرة: أ. بهيه الراشديه • المساعدتان: أ. سعاد الرواحيه، أ. فتحية الهدابيه • أ. فخرية العامرية • أ. أصيلة الوهيبيه • أ. أنيسه السيابيه • أ. فاطمة البطاشيه • أ. عبير المسلمية.']};
window.openSimpleModule=k=>{const x=SIMPLE[k];$('simpleModuleTitle').textContent=x?.[0]||'وحدة النظام';$('simpleModuleBody').innerHTML=`<div class="info">${esc(x?.[1]||'')}</div>`;openById('simpleModuleModal')};
loadContent();
