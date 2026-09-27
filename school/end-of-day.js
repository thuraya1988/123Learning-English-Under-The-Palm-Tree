/* ختام اليوم للإدارة */
(()=>{
const q=id=>document.getElementById(id);
const dayNow=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Muscat'}).format(new Date());

function injectEndDay(){
 if(q('endOfDayModal')) return;
 document.body.insertAdjacentHTML('beforeend', `
 <div class="modal staff-center" id="endOfDayModal">
  <div class="modal-box">
   <button class="close" onclick="closeById('endOfDayModal')">✕</button>
   <div class="today-title"><div><small>رسالة الإدارة للمعلمات</small><h2>🌙 ختام اليوم المدرسي</h2><p>اكتبي خلاصة اليوم، والنظام يدمجها في رسالة واحدة ويحفظها ويرسل تنبيهًا للمعلمات.</p></div></div>
   <section class="staff-card">
    <div class="form-row">
     <label>كيف كان سير العمل اليوم؟<select id="eodRating"><option value="excellent">🟢 ممتاز</option><option value="good" selected>🟡 جيد</option><option value="needs_attention">🟠 يحتاج متابعة</option></select></label>
     <label>التاريخ<input id="eodDate" type="date"></label>
    </div>
    <label>كيف سار العمل اليوم؟<textarea id="eodSummary" rows="2"></textarea></label>
    <label>ما هي ملاحظاتك؟<textarea id="eodNotes" rows="3"></textarea></label>
    <label>هل توجد قوانين أو تعليمات جديدة للمعلمات؟<textarea id="eodRules" rows="3"></textarea></label>
    <div class="form-row">
     <label>ما الشيء الذي تريدين تغييره؟<textarea id="eodChange" rows="3"></textarea></label>
     <label>لماذا تريدين تغييره؟<textarea id="eodWhy" rows="3"></textarea></label>
    </div>
    <label>ما أكثر شيء أعجبك في مسار اليوم؟<textarea id="eodLiked" rows="3"></textarea></label>
    <label style="display:flex;gap:8px;align-items:center;margin:12px 0"><input id="eodPush" type="checkbox" checked> 🔔 إرسال إشعار فوري للمعلمات</label>
    <div class="staff-actions">
     <button class="staff-primary" id="eodSave" onclick="saveEndOfDayReview()">حفظ وإرسال التنبيه</button>
     <button class="staff-secondary" onclick="previewEndOfDayReview()">معاينة الرسالة</button>
    </div>
    <div id="eodResult"></div>
   </section>
   <section class="staff-card" id="eodPreview" hidden>
    <h3>👀 الرسالة المدمجة</h3>
    <pre id="eodText" style="white-space:pre-wrap;font-family:inherit;line-height:1.9"></pre>
    <div class="staff-actions"><button class="staff-primary" onclick="shareEndOfDayReview()">📲 مشاركة الرسالة</button><button class="staff-secondary" onclick="copyEndOfDayReview()">نسخ الرسالة</button></div>
   </section>
  </div>
 </div>`);
}

function values(){
 return {
  review_date:q('eodDate').value,
  day_rating:q('eodRating').value,
  work_summary:q('eodSummary').value.trim(),
  notes:q('eodNotes').value.trim(),
  new_rules:q('eodRules').value.trim(),
  change_request:q('eodChange').value.trim(),
  change_reason:q('eodWhy').value.trim(),
  liked_most:q('eodLiked').value.trim(),
  send_push:q('eodPush').checked
 };
}

function buildPreview(p){
 const rating={excellent:'ممتاز',good:'جيد',needs_attention:'يحتاج متابعة'}[p.day_rating]||'جيد';
 const date=p.review_date||dayNow();
 const day=new Intl.DateTimeFormat('ar-OM',{weekday:'long',timeZone:'Asia/Muscat'}).format(new Date(date+'T12:00:00+04:00'));
 const out=['🌙 ختام اليوم المدرسي — '+day+' '+date,'من الإدارة: '+(secureEmployee?.short_name||secureEmployee?.full_name||''),'📊 سير العمل اليوم: '+rating];
 [['📝 كيف سار العمل اليوم؟',p.work_summary],['📌 ملاحظات اليوم',p.notes],['⚖️ قوانين أو تعليمات جديدة',p.new_rules],['🔄 ما الذي نرغب في تغييره؟',p.change_request],['💡 لماذا نرغب في تغييره؟',p.change_reason],['💚 أكثر ما أعجبني في مسار اليوم',p.liked_most]].forEach(([a,b])=>{if(b)out.push(a+'\n'+b)});
 out.push('شكرًا لتعاونكن، ونتمنى للجميع يومًا أفضل وأكثر تنظيمًا.');
 return out.join('\n\n');
}

window.previewEndOfDayReview=()=>{
 injectEndDay();
 q('eodText').textContent=buildPreview(values());
 q('eodPreview').hidden=false;
};

window.openEndOfDayReview=async(auto=false)=>{
 injectEndDay();
 if(!staffToken||!secureEmployee){toast('سجلي الدخول أولًا');return openIdentity()}
 if(!secureAdmin()) return toast('هذا القسم للإدارة فقط');
 const date=dayNow();
 q('eodDate').value=date;
 q('eodResult').innerHTML='';
 q('eodPreview').hidden=true;
 try{
  const r=await staffApi('end_of_day_status',{date});
  if(r.item){
   const x=r.item;
   q('eodRating').value=x.day_rating||'good';
   q('eodSummary').value=x.work_summary||'';
   q('eodNotes').value=x.notes||'';
   q('eodRules').value=x.new_rules||'';
   q('eodChange').value=x.change_request||'';
   q('eodWhy').value=x.change_reason||'';
   q('eodLiked').value=x.liked_most||'';
   q('eodResult').innerHTML='<div class="issued-pin"><small>تم حفظ تقرير اليوم مسبقًا</small><b style="font-size:15px">يمكنك تعديله وإعادة الإبلاغ عند الحاجة.</b></div>';
  } else if(auto) {
   q('eodResult').innerHTML='<div class="issued-pin"><small>تذكير نهاية اليوم</small><b style="font-size:15px">اكتبي خلاصة اليوم قبل المغادرة.</b></div>';
  }
 }catch(_){}
 openById('endOfDayModal');
};

window.saveEndOfDayReview=async()=>{
 const p=values(),btn=q('eodSave');
 if(!p.work_summary&&!p.notes&&!p.new_rules&&!p.change_request&&!p.liked_most) return toast('اكتبي ملاحظة واحدة على الأقل');
 try{
  btn.disabled=true;btn.textContent='جاري الحفظ…';
  const r=await staffApi('save_end_of_day_review',p);
  q('eodText').textContent=r.message||buildPreview(p);
  q('eodPreview').hidden=false;
  q('eodResult').innerHTML='<div class="issued-pin"><small>تم حفظ ختام اليوم</small><b style="font-size:15px">🔔 وصل التنبيه إلى '+Number(r.push_sent||0)+' جهاز • 📱 '+Number(r.whatsapp_targets||0)+' رقم واتساب محفوظ</b></div>';
  toast('✅ تم حفظ ختام اليوم وإرسال التنبيه');
 }catch(e){toast(staffError(e))}
 finally{btn.disabled=false;btn.textContent='حفظ وإرسال التنبيه'}
};

window.shareEndOfDayReview=async()=>{const msg=q('eodText')?.textContent||buildPreview(values());if(navigator.share){try{await navigator.share({title:'ختام اليوم المدرسي',text:msg});return}catch(e){if(e?.name==='AbortError')return}}try{await navigator.clipboard.writeText(msg);toast('تم نسخ الرسالة؛ اختاري واتساب من المشاركة أو الصقيها في قائمة البث')}catch{toast('تعذر فتح المشاركة الآن')}};

window.copyEndOfDayReview=async()=>{
 try{await navigator.clipboard.writeText(q('eodText')?.textContent||buildPreview(values()));toast('✅ تم نسخ الرسالة')}
 catch{toast('تعذر النسخ تلقائيًا')}
};

window.maybeOpenEndOfDayReview=async()=>{
 if(!staffToken||!secureEmployee||!secureAdmin()) return;
 const now=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Muscat'}));
 if(now.getHours()*60+now.getMinutes()<1005) return;
 const date=dayNow(),key='multaqa_eod_prompt_'+date;
 if(sessionStorage.getItem(key)) return;
 try{
  const r=await staffApi('end_of_day_status',{date});
  if(!r.submitted){sessionStorage.setItem(key,'1');openEndOfDayReview(true)}
 }catch(_){}
};

injectEndDay();
setTimeout(()=>{if(staffToken&&secureEmployee)maybeOpenEndOfDayReview()},1800);
})();