const CT={announcement:'📣 الإعلان الهام',news:'📰 نشرة الأخبار',events:'🎉 الفعاليات والمناسبات',gallery:'🖼️ الجاليري',videos:'🎬 الفيديوهات',rules:'📘 قوانين المدرسة'};
let newsAdminFile=null,announcementAdminFile=null;
function newsMediaHtml(x){if(!x?.media_url)return '';const kind=x.media_kind||(/\.pdf(?:\?|$)/i.test(x.media_url)?'pdf':/\.(mp4|webm|mov)(?:\?|$)/i.test(x.media_url)?'video':'image');if(kind==='pdf')return `<a class="video-link-btn" href="${esc(x.media_url)}" target="_blank" rel="noopener">📄 فتح ملف PDF المرفق</a>`;if(kind==='video')return `<video controls playsinline style="width:100%;max-height:55vh;background:#111;border-radius:14px" src="${esc(x.media_url)}"></video>`;return `<a href="${esc(x.media_url)}" target="_blank" rel="noopener"><img src="${esc(x.media_url)}" alt="${esc(x.title||'مرفق الخبر')}" style="display:block;width:100%;height:auto;max-height:55vh;object-fit:contain;border-radius:14px"></a>`}
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
    if(contentTab==='rules'){
      const x=a[0];
      $('schoolContentBody').innerHTML=x?`<article class="content-card"><div class="body"><h4>${esc(x.title||'قوانين المدرسة')}</h4><p style="white-space:pre-line;line-height:2">${esc(x.body||'')}</p><div id="rulesReactionBox" style="margin-top:14px;padding-top:12px;border-top:1px solid #ead8c3">جاري تحميل تقييم المعلمات…</div></div></article>`:'<div class="content-empty">لم تُنشر قوانين المدرسة بعد.</div>';
      if(x)await renderRulesReactions();
      await renderRulesAdminControls(x);
      return;
    }
    $('schoolContentBody').innerHTML=a.length?a.map(x=>`<article class="content-card">${contentTab==='gallery'?`<div class="cover">${x.media_url?`<img src="${esc(x.media_url)}">`:'🖼️'}</div>`:contentTab==='videos'?'<div class="cover">🎬</div>':contentTab==='news'?newsMediaHtml(x):''}<div class="body"><h4>${esc(x.title||'')}</h4><p style="white-space:pre-line">${esc(x.body||'')}</p>${x.event_date?`<small>${esc(x.event_date)}</small>`:''}${contentTab==='videos'&&x.media_url?`<a class="video-link-btn" href="${esc(x.media_url)}" target="_blank">▶ فتح الفيديو</a>`:''}${contentTab==='news'&&typeof window.canManageEmergencyAlert==='function'&&window.canManageEmergencyAlert()?`<button class="btn btn-ghost" style="margin-top:8px" onclick="deleteNewsUI(${x.id})">🗑 حذف الخبر</button>`:''}${contentTab==='gallery'&&typeof window.canManageEmergencyAlert==='function'&&window.canManageEmergencyAlert()?`<button class="btn btn-ghost" style="margin-top:8px" onclick="deleteGalleryUI(${x.id})">🗑 حذف العمل</button>`:''}</div></article>`).join(''):'<div class="content-empty">لا يوجد محتوى منشور في هذا القسم حتى الآن.</div>';
    if(contentTab==='news')await renderNewsAdminControls();
    if(contentTab==='gallery')renderGalleryAdminNote();
  }catch(x){
    $('schoolContentBody').innerHTML=`<div class="content-empty">${err(x)}</div>`;
  }
}
function renderGalleryAdminNote(){
 const wrap=$('contentFormWrap');if(!wrap)return;
 wrap.style.display='block';
 wrap.innerHTML='<section style="border:1px solid #ead8c3;border-radius:18px;padding:16px;margin-bottom:14px;background:#fffaf3;text-align:center"><h4 style="margin:0 0 10px">🎨 غرفة الفنون الرقمية</h4><p style="margin:0 0 12px">ارسمي لوحتك في سبورة الرسم، ثم انشريها هنا في الجاليري مباشرة.</p><button class="btn btn-solid" onclick="location.href=\'art-studio/index.html\'">افتحي سبورة الرسم</button></section>';
}
window.deleteGalleryUI=async id=>{
 if(!confirm('حذف هذا العمل الفني من الجاليري؟'))return;
 try{await window.deleteGalleryAdmin(id);toast('🗑 تم حذف العمل الفني');await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حذف العمل الفني')}
};
async function renderNewsAdminControls(){
 const wrap=$('contentFormWrap');if(!wrap)return;
 if(typeof window.canPublishNews!=='function'||!window.canPublishNews()){wrap.style.display='none';return}
 newsAdminFile=null;wrap.style.display='block';
 wrap.innerHTML='<section style="border:1px solid #ead8c3;border-radius:18px;padding:16px;margin-bottom:14px;background:#fffaf3"><h4 style="margin:0 0 12px">📰 نشر خبر جديد</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px"><label>عنوان الخبر<input id="newsAdminTitle" placeholder="عنوان الخبر"></label><label>التاريخ<input id="newsAdminDate" type="date"></label><label>رابط خارجي (اختياري)<input id="newsAdminMedia" placeholder="صورة أو فيديو أو PDF"></label></div><label>نص الخبر<textarea id="newsAdminBody" rows="3" placeholder="اكتبي تفاصيل الخبر"></textarea></label><label style="display:block;margin:10px 0;font-weight:800">📎 إرفاق ملف من الجهاز (اختياري)<input id="newsAdminFile" type="file" accept=".pdf,application/pdf,image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" onchange="useNewsAdminFile(this)" style="display:block;margin-top:6px"><small id="newsAdminFileState" style="display:block;margin-top:5px;color:#6b7280">يدعم PDF، صورة، أو فيديو حتى 250 MB.</small></label><label style="display:flex;gap:8px;align-items:center;margin:10px 0"><input id="newsAdminPush" type="checkbox" checked> 🔔 إرسال إشعار فوري لجميع المعلمات</label><button class="btn btn-solid" id="newsPublishBtn" onclick="saveNewsUI()">نشر الخبر</button></section>';
}
window.useNewsAdminFile=input=>{
 const f=input.files&&input.files[0];newsAdminFile=f||null;const st=$('newsAdminFileState');if(!f){if(st)st.textContent='يدعم PDF، صورة، أو فيديو حتى 250 MB.';return}
 if(f.size>250*1024*1024){input.value='';newsAdminFile=null;if(st)st.textContent='❌ الملف أكبر من 250 MB';return toast('حجم الملف يجب ألا يتجاوز 250 MB')}
 if(st)st.textContent='✅ '+f.name+' • '+Math.max(1,Math.round(f.size/1024/1024))+' MB';
};
window.saveNewsUI=async()=>{
 const title=$('newsAdminTitle').value.trim(),body=$('newsAdminBody').value.trim(),btn=$('newsPublishBtn');if(!title)return toast('اكتبي عنوان الخبر');
 try{
  if(btn){btn.disabled=true;btn.textContent='جاري النشر…'}
  let media_url=$('newsAdminMedia').value.trim();
  if(newsAdminFile){
   if(typeof window.prepareNewsUploadAdmin!=='function')throw Object.assign(new Error('upload_failed'),{code:'upload_failed'});
   const u=await window.prepareNewsUploadAdmin({mime_type:newsAdminFile.type,file_name:newsAdminFile.name});
   const up=await fetch(u.signed_url,{method:'PUT',headers:{'Content-Type':newsAdminFile.type,'x-upsert':'false'},body:newsAdminFile});
   if(!up.ok)throw Object.assign(new Error('upload_failed'),{code:'upload_failed'});
   media_url=u.path;
  }
  const d=await window.saveNewsAdmin({title,body,event_date:$('newsAdminDate').value,media_url,send_push:$('newsAdminPush').checked});
  toast(d.push_sent?'✅ نُشر الخبر ووصل الإشعار':'✅ نُشر الخبر'+($('newsAdminPush').checked?'، ولا توجد أجهزة أخرى مفعّلة حاليًا':''));
  newsAdminFile=null;await loadContent()
 }catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر نشر الخبر')}
 finally{if(btn){btn.disabled=false;btn.textContent='نشر الخبر'}}
};
let rulesReactionState={likes:0,rating_count:0,rating_average:0,my_like:false,my_rating:null};
async function renderRulesReactions(){
 const box=$('rulesReactionBox');if(!box)return;
 if(typeof window.getContentReactionSummaries!=='function'){box.innerHTML='<small>سجلي الدخول لتقييم القوانين.</small>';return}
 try{
  const d=await window.getContentReactionSummaries('rules',['school-rules']);rulesReactionState=(d.items||{})['school-rules']||rulesReactionState;
  const r=rulesReactionState,stars=[1,2,3,4,5].map(n=>'<button class="btn btn-ghost" style="padding:5px 8px;min-width:auto;'+(Number(r.my_rating)===n?'background:#f1dbe2;border-color:#7b1e3a':'')+'" onclick="rateSchoolRules('+n+')">'+(n<=Number(r.my_rating||0)?'★':'☆')+'</button>').join('');
  box.innerHTML='<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn btn-ghost" onclick="toggleSchoolRulesLike()" style="'+(r.my_like?'background:#f1dbe2;border-color:#7b1e3a':'')+'">👍 '+(r.my_like?'أعجبني':'إعجاب')+' · '+Number(r.likes||0)+'</button><span style="font-size:12px;color:#6b7280;font-weight:700">تقييم المعلمات: '+(r.rating_count?Number(r.rating_average||0).toFixed(1)+' / 5 ('+r.rating_count+')':'لا يوجد تقييم بعد')+'</span>'+stars+'</div>';
 }catch(e){box.innerHTML='<small style="color:#6b7280">🔒 الإعجاب والتقييم متاحان للمعلمات بعد تسجيل الدخول.</small>'}
}
window.toggleSchoolRulesLike=async()=>{
 try{const r=rulesReactionState,d=await window.saveContentReaction({target_type:'rules',target_key:'school-rules',liked:!r.my_like,rating:r.my_rating||null});rulesReactionState=d.summary;await renderRulesReactions()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حفظ الإعجاب')}
};
window.rateSchoolRules=async rating=>{
 try{const r=rulesReactionState,d=await window.saveContentReaction({target_type:'rules',target_key:'school-rules',liked:!!r.my_like,rating});rulesReactionState=d.summary;await renderRulesReactions();toast('⭐ تم حفظ تقييم القوانين')}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حفظ التقييم')}
};
async function renderRulesAdminControls(current){
 const wrap=$('contentFormWrap');if(!wrap)return;
 if(typeof window.canManageEmergencyAlert!=='function'||!window.canManageEmergencyAlert()){wrap.style.display='none';return}
 wrap.style.display='block';
 wrap.innerHTML='<section style="border:1px solid #ead8c3;border-radius:18px;padding:16px;margin-bottom:14px;background:#fffaf3"><h4 style="margin:0 0 12px">📘 تعديل قوانين المدرسة</h4><label>العنوان<input id="rulesAdminTitle" value="'+esc(current?.title||'قوانين المدرسة')+'"></label><label>القوانين والتعليمات<textarea id="rulesAdminBody" rows="12" placeholder="اكتبي كل قانون في سطر مستقل">'+esc(current?.body||'')+'</textarea></label><button class="btn btn-solid" onclick="saveSchoolRulesUI()">حفظ ونشر القوانين</button></section>';
}
window.saveSchoolRulesUI=async()=>{
 const title=$('rulesAdminTitle').value.trim(),body=$('rulesAdminBody').value.trim();if(!body)return toast('اكتبي قوانين المدرسة أولًا');
 try{await window.saveSchoolRulesAdmin({title,body});toast('✅ تم حفظ ونشر قوانين المدرسة');await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حفظ القوانين')}
};
window.deleteNewsUI=async id=>{
 if(!confirm('حذف هذا الخبر؟'))return;
 try{await window.deleteNewsAdmin(id);toast('🗑 تم حذف الخبر');await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حذف الخبر')}
};
async function renderAnnouncementAdminControls(current){
 const wrap=$('contentFormWrap');if(!wrap)return;
 if(typeof window.canManageEmergencyAlert!=='function'||!window.canManageEmergencyAlert()){wrap.style.display='none';return}
 wrap.style.display='block';announcementAdminFile=null;let active=null;try{active=(await window.getEmergencyStatus()).alert}catch(_){}
 const normal='<section style="border:1px solid #ead8c3;border-radius:18px;padding:16px;margin-bottom:14px;background:#fffaf3"><h4 style="margin:0 0 12px">📣 إضافة أو تعديل إعلان هام</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px"><label>عنوان الإعلان<input id="iaAdminTitle" value="'+esc(current?.title||'')+'" placeholder="عنوان الإعلان"></label><label>الجهة أو المادة<input id="iaAdminSubject" value="'+esc(current?.subject||'')+'" placeholder="مثال: الإدارة"></label><label>التاريخ<input id="iaAdminDate" type="date" value="'+esc(current?.event_date||'')+'"></label></div><label>مرفق الإعلان (اختياري)<input id="iaAdminFile" type="file" accept=".pdf,application/pdf,image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" onchange="useAnnouncementAdminFile(this)" style="display:block;margin-top:6px"><small id="iaAdminFileState" style="display:block;margin-top:5px;color:#6b7280">اختاري صورة أو فيديو أو PDF من جهازك بدل إدخال رابط.</small></label><label>نص الإعلان<textarea id="iaAdminBody" rows="3" placeholder="اكتبي تفاصيل الإعلان">'+esc(current?.body||'')+'</textarea></label><label style="display:flex;gap:8px;align-items:center;margin:10px 0"><input id="iaAdminPush" type="checkbox" checked> إرسال إشعار فوري لجميع الأجهزة المفعّلة</label><button class="btn btn-solid" onclick="saveImportantAnnouncementUI()">حفظ ونشر الإعلان</button></section>';
 const emergency=active?'<section style="border:2px solid #a3152d;border-radius:18px;padding:16px;background:#fff0f1"><h4 style="color:#a3152d;margin:0 0 8px">🚨 التنبيه الطارئ يعمل الآن</h4><b>'+esc(active.title)+'</b><p style="white-space:pre-line">'+esc(active.body)+'</p><small>يتكرر كل '+Number(active.repeat_minutes||5)+' دقائق حتى الإيقاف.</small><div style="margin-top:12px"><button class="btn btn-solid" style="background:#a3152d" onclick="stopEmergencyAlertUI('+Number(active.id)+')">⏹ إيقاف التنبيه الطارئ</button></div></section>':'<section style="border:2px solid #a3152d;border-radius:18px;padding:16px;background:#fff8f8"><h4 style="color:#a3152d;margin:0 0 10px">🚨 تشغيل تنبيه طارئ مستمر</h4><p>يرسل إشعارًا فورًا، ثم يكرره حتى تضغطي زر الإيقاف.</p><label>عنوان التنبيه<input id="emergencyTitle" placeholder="مثال: تنبيه طارئ — اجتماع فوري"></label><label>نص التنبيه<textarea id="emergencyBody" rows="3" placeholder="اكتبي التعليمات بوضوح"></textarea></label><label>تكرار الإشعار<select id="emergencyRepeat"><option value="5">كل 5 دقائق</option><option value="10">كل 10 دقائق</option><option value="15">كل 15 دقيقة</option><option value="30">كل 30 دقيقة</option></select></label><button class="btn btn-solid" style="background:#a3152d" onclick="startEmergencyAlertUI()">🚨 تشغيل التنبيه الطارئ</button></section>';
 wrap.innerHTML=normal+emergency;
}
window.useAnnouncementAdminFile=input=>{const f=input.files&&input.files[0];announcementAdminFile=f||null;const st=$('iaAdminFileState');if(!f){if(st)st.textContent='اختاري صورة من جهازك بدل إدخال رابط.';return}if(f.size>250*1024*1024){input.value='';announcementAdminFile=null;if(st)st.textContent='❌ المرفق أكبر من 250 MB';return}if(st)st.textContent='✅ '+f.name+' • '+Math.max(1,Math.round(f.size/1024/1024))+' MB';};
window.saveImportantAnnouncementUI=async()=>{
 const date=$('iaAdminDate').value,day=date?new Intl.DateTimeFormat('ar-OM',{weekday:'long',timeZone:'Asia/Muscat'}).format(new Date(date+'T12:00:00+04:00')):'';
 try{let media_url='';if(announcementAdminFile){if(typeof window.prepareNewsUploadAdmin!=='function')throw Object.assign(new Error('upload_failed'),{code:'upload_failed'});const u=await window.prepareNewsUploadAdmin({mime_type:announcementAdminFile.type,file_name:announcementAdminFile.name});const up=await fetch(u.signed_url,{method:'PUT',headers:{'Content-Type':announcementAdminFile.type,'x-upsert':'false'},body:announcementAdminFile});if(!up.ok)throw Object.assign(new Error('upload_failed'),{code:'upload_failed'});media_url=u.path}const d=await window.saveImportantAnnouncementAdmin({title:$('iaAdminTitle').value,body:$('iaAdminBody').value,subject:$('iaAdminSubject').value,event_date:date,day_name:day,media_url,send_push:$('iaAdminPush').checked});toast(d.push_sent?'✅ نُشر الإعلان ووصل الإشعار':'✅ نُشر الإعلان'+($('iaAdminPush').checked?'، ولا توجد أجهزة مفعّلة حاليًا':' '));announcementAdminFile=null;await loadContent()}catch(e){toast(typeof staffError==='function'?staffError(e):'تعذر حفظ الإعلان')}
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
