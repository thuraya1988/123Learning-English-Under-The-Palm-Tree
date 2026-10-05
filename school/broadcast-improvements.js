(function(){
 'use strict';
 var draftId=null,uploadSession=null,busy=false,pendingRecording=null,items=new Map();
 var originalRender=window.renderBroadcasts,originalCard=window.broadcastCard;
 window.broadcastCard=function(x){
  items.set(x.id,x);
  var actions=x.can_delete?'<button onclick="'+(x.deleted_at?'restoreBroadcast':'deleteBroadcast')+'(\''+esc(x.id)+'\')">'+(x.deleted_at?'↩ استعادة الإذاعة':'🗑 حذف الإذاعة')+'</button>':'';
  if(x.can_delete&&!x.deleted_at)actions+='<button onclick="editBroadcastAttachment(\''+esc(x.id)+'\')">📎 '+(x.video_url?'تغيير المرفق':'إرفاق فيديو أو صورة')+'</button>';
  return originalCard(x).replace('</article>',actions+'</article>');
 };
 window.renderBroadcasts=async function(){
  if(busy)return;
  items.clear();await originalRender();draftId=null;uploadSession=null;
  S('staffPane').insertAdjacentHTML('afterbegin','<button onclick="showDeletedBroadcasts()">🗑 الإذاعات المحذوفة / الاستعادة</button>');
  S('broadcastCameraState').insertAdjacentHTML('afterend','<p>اختاري المرفق ثم اضغطي «حفظ الإذاعة والمرفق». الحد الأقصى ٢٥٠ MB. عند انقطاع الرفع أبقي الصفحة مفتوحة واضغطي حفظ لإعادة المحاولة.</p>');
  S('broadcastSaveState').setAttribute('role','status');S('broadcastSaveState').setAttribute('aria-live','polite');
 };
 window.editBroadcastAttachment=async function(id){
  if(busy)return;
  var item=items.get(id);if(!item||!item.can_delete)return;
  try{
   await window.renderBroadcasts();draftId=item.id;
   [['broadcastTitle',item.title],['broadcastTeacher',item.teacher_name],['broadcastDate',item.broadcast_date],['broadcastParticipants',(item.participants||[]).join('\n')],['broadcastStatus',item.event_status],['broadcastRating',item.rating||''],['broadcastEvaluation',item.evaluation_note||'']].forEach(function(p){S(p[0]).value=p[1]||''});
   S('broadcastSaveState').textContent='اختاري المرفق ثم احفظي. سيُضاف إلى هذه الإذاعة نفسها.';
   S('broadcastVideoPick').focus();S('broadcastTitle').scrollIntoView({behavior:'smooth',block:'center'});
  }catch(e){toast(staffError(e))}
 };
 window.showDeletedBroadcasts=async function(){if(busy)return;try{var d=await staffApi('broadcasts',{deleted:true});S('staffPane').innerHTML='<h2>الإذاعات المحذوفة</h2><button onclick="renderBroadcasts()">العودة للإذاعات</button><div class="broadcast-list">'+((d.items||[]).map(window.broadcastCard).join('')||'<p>لا توجد إذاعات محذوفة.</p>')+'</div>'}catch(e){toast(staffError(e))}};
 window.deleteBroadcast=async function(id){if(busy||!confirm('حذف هذه الإذاعة من السجل؟ يمكنك استعادتها من الإذاعات المحذوفة.'))return;try{await staffApi('delete_broadcast',{id:id});toast('تم حذف الإذاعة. يمكنك استعادتها من الإذاعات المحذوفة.');await window.renderBroadcasts()}catch(e){toast(staffError(e))}};
 window.restoreBroadcast=async function(id){if(busy)return;try{await staffApi('restore_broadcast',{id:id});toast('تمت استعادة الإذاعة');await window.showDeletedBroadcasts()}catch(e){toast(staffError(e))}};
 function mimeFor(file){
  var type=String(file.type||'').split(';')[0].trim().toLowerCase();
  if(type==='video/x-m4v')type='video/mp4';if(type==='image/jpg')type='image/jpeg';
  if(!type||type==='application/octet-stream')type=({mp4:'video/mp4',m4v:'video/mp4',mov:'video/quicktime',webm:'video/webm',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp'})[String(file.name||'').split('.').pop().toLowerCase()];
  return ['video/mp4','video/webm','video/quicktime','image/jpeg','image/png','image/webp'].includes(type)?type:null;
 }
 var originalPick=window.useBroadcastFile;
 window.useBroadcastFile=function(input){
  if(busy)return;var file=input.files&&input.files[0];if(!file)return;
  var type=mimeFor(file);if(!type){input.value='';return toast('اختاري MP4 أو MOV أو WebM أو صورة JPG/PNG/WebP.')}
  if(!file.size){input.value='';return toast('الملف فارغ. اختاري ملفًا آخر.')}
  if(file.size>250*1024*1024){input.value='';return toast('حجم الملف يجب ألا يتجاوز ٢٥٠ MB')}
  var normalized=type===file.type?file:new File([file],file.name,{type:type,lastModified:file.lastModified});
  originalPick({files:[normalized],value:''});uploadSession=null;
  input.value='';S('broadcastSaveState').textContent='المرفق جاهز. اضغطي «حفظ الإذاعة والمرفق» لإتمام الرفع.';
 };
 var originalStart=window.startBroadcastRecording;
 window.startBroadcastRecording=async function(){
  if(busy)return;await originalStart();
  var recorder=broadcastRecorder;if(!recorder||recorder.state==='inactive')return;
  broadcastVideoFile=null;uploadSession=null;
  pendingRecording=new Promise(function(resolve,reject){
   recorder.addEventListener('stop',function(){pendingRecording=null;resolve()},{once:true});
   recorder.addEventListener('error',function(){reject(Object.assign(new Error('recording_failed'),{code:'recording_failed'}))},{once:true});
  });
  // Saving waits for the recorder's final dataavailable and onstop callbacks.
  pendingRecording.catch(function(){});
 };
 function failure(status,reason){return Object.assign(new Error('upload_failed'),{code:'upload_failed',status:status,reason:reason||''})}
 function uploadMessage(e){
  if(e.code==='upload_incomplete')return 'لم يكتمل المرفق بعد. أبقي الصفحة مفتوحة واضغطي حفظ لإكمال الرفع.';
  if(e.code==='recording_failed')return 'تعذر تجهيز التسجيل. أوقفي التسجيل ثم اختاري المقطع من الاستوديو.';
  if(e.code!=='upload_failed')return staffError(e);
  if(e.status===413)return 'حجم المرفق أكبر من الحد المسموح. اختاري مقطعًا أقصر (حتى ٢٥٠ MB).';
  if(e.status===401||e.status===403)return 'انتهت صلاحية رابط الرفع. اضغطي حفظ لإعادة المحاولة.';
  if(e.status===415)return 'صيغة المرفق غير مدعومة. اختاري MP4 أو MOV أو WebM.';
  return 'توقف رفع المرفق. بيانات الإذاعة محفوظة؛ أبقي الصفحة مفتوحة واضغطي حفظ لإكمال الرفع دون تكرار الإذاعة.';
 }
 async function request(url,options){
  var controller=new AbortController(),timer=setTimeout(function(){controller.abort()},120000);
  try{return await fetch(url,Object.assign({},options,{signal:controller.signal}))}catch(e){throw failure(0)}finally{clearTimeout(timer)}
 }
 async function check(response){if(!response.ok){var detail='';try{detail=await response.text()}catch(e){}throw failure(response.status,detail)}}
 function standardUpload(file,session,state){
  return new Promise(function(resolve,reject){
   var xhr=new XMLHttpRequest(),form=new FormData();form.append('cacheControl','3600');form.append('',file,file.name);
   xhr.open('PUT',session.signed_url);xhr.timeout=120000;
   xhr.upload.onprogress=function(e){if(e.lengthComputable)state.textContent='جاري رفع المرفق: '+Math.min(99,Math.floor(e.loaded/e.total*100))+'٪ — أبقي الصفحة مفتوحة'};
   xhr.onload=function(){if(xhr.status>=200&&xhr.status<300)resolve();else reject(failure(xhr.status,xhr.responseText))};
   xhr.onerror=xhr.ontimeout=xhr.onabort=function(){reject(failure(0))};xhr.send(form);
  });
 }
 function signedEndpoint(session){
  var url=new URL(session.resumable_url);url.pathname=url.pathname.replace(/\/$/,'');
  if(url.pathname.endsWith('/upload/resumable'))url.pathname+='/sign';
  return url.href;
 }
 async function upload(file,session,mime,state){
  state.textContent='جاري رفع المرفق: ٠٪ — أبقي الصفحة مفتوحة';
  if(file.size<=6*1024*1024){await standardUpload(file,session,state);state.textContent='اكتمل رفع المرفق: ١٠٠٪';return}
  var endpoint=signedEndpoint(session),token=session.token||new URL(session.signed_url).searchParams.get('token');
  if(!token)throw failure(403);
  var headers={'Tus-Resumable':'1.0.0','x-signature':token};
  if(!session.location){
   var metadata={bucketName:'school-broadcasts',objectName:session.path,contentType:mime,cacheControl:'3600'};
   var created=await request(endpoint,{method:'POST',headers:Object.assign({},headers,{'Upload-Length':String(file.size),'Upload-Metadata':Object.entries(metadata).map(function(x){return x[0]+' '+btoa(x[1])}).join(',')})});
   // Older Storage servers can still accept the signed standard upload.
   if([404,405,501].includes(created.status)){await standardUpload(file,session,state);return}
   await check(created);var location=created.headers.get('Location');if(!location)throw failure(0);
   session.location=new URL(location,endpoint).href;
   if(new URL(session.location).origin!==new URL(endpoint).origin)throw failure(0);
  }
  var head=await request(session.location,{method:'HEAD',headers:headers});
  if(!head.ok){if([404,410].includes(head.status))session.location=null;await check(head)}
  var offset=Number(head.headers.get('Upload-Offset'));if(!Number.isInteger(offset)||offset<0||offset>file.size)throw failure(0);
  var failures=0;
  while(offset<file.size){
   state.textContent='جاري رفع المرفق: '+Math.floor(offset/file.size*100)+'٪ — أبقي الصفحة مفتوحة';
   try{
    var end=Math.min(file.size,offset+6*1024*1024);
    var part=await request(session.location,{method:'PATCH',headers:Object.assign({},headers,{'Content-Type':'application/offset+octet-stream','Upload-Offset':String(offset)}),body:file.slice(offset,end)});
    await check(part);var next=Number(part.headers.get('Upload-Offset'));if(next!==end)throw failure(0);
    offset=next;failures=0;
   }catch(e){
    if(e.status&&e.status!==409&&e.status!==429&&e.status<500)throw e;if(++failures>3)throw e;
    await new Promise(function(resolve){setTimeout(resolve,failures*1500)});
    var recovered=await request(session.location,{method:'HEAD',headers:headers});await check(recovered);
    offset=Number(recovered.headers.get('Upload-Offset'));if(!Number.isInteger(offset)||offset<0||offset>file.size)throw failure(0);
   }
  }
  state.textContent='اكتمل رفع المرفق: ١٠٠٪';
 }
 window.saveBroadcast=async function(statusOverride){
  if(busy)return;var payload=broadcastPayload(statusOverride),state=S('broadcastSaveState');
  if(payload.title.length<2)return toast('اكتبي عنوان الإذاعة أولًا');
  busy=true;var saved=false;
  var controls=Array.from(document.querySelectorAll('.broadcast-layout input,.broadcast-layout select,.broadcast-layout textarea,.camera-actions button,.broadcast-save,.broadcast-live-btn,[data-staff-tab]'));
  var disabled=controls.map(function(c){return c.disabled});controls.forEach(function(c){c.disabled=true});
  try{
   if(pendingRecording){state.textContent='جاري تجهيز التسجيل للحفظ…';var recording=pendingRecording;window.stopBroadcastRecording();await recording}
   var file=broadcastVideoFile,mime=file?mimeFor(file):null;
   if(file&&(!mime||!file.size||file.size>250*1024*1024))throw Object.assign(new Error('invalid_input'),{code:'invalid_input'});
   state.textContent='جاري حفظ الإذاعة…';if(draftId)payload.id=draftId;
   var data=await staffApi('save_broadcast',payload);draftId=data.item.id;
   if(file){
    if(!uploadSession||uploadSession.file!==file){var prepared=await staffApi('prepare_broadcast_upload',{id:draftId,mime_type:mime});uploadSession=Object.assign(prepared,{file:file})}
    if(!uploadSession.uploaded){await upload(file,uploadSession,mime,state);uploadSession.uploaded=true}
    state.textContent='جاري تثبيت المرفق في سجل الإذاعة…';
    await staffApi('complete_broadcast_video',{id:draftId,path:uploadSession.path,file_size:file.size});
   }
   stopBroadcastCamera(true);saved=true;
  }catch(e){
   if(e.status===401||e.status===403)uploadSession=null;
   if(e.code==='upload_incomplete'&&uploadSession){uploadSession.uploaded=false;uploadSession.location=null}
   state.textContent=uploadMessage(e);toast(uploadMessage(e));
  }finally{
   busy=false;controls.forEach(function(c,i){c.disabled=disabled[i]});
   if(broadcastRecorder&&broadcastRecorder.state==='inactive'){S('broadcastRecordBtn').disabled=false;S('broadcastStopBtn').disabled=true}
  }
  if(saved){
   toast('✅ تم حفظ الإذاعة'+(broadcastVideoFile?' والمرفق':''));
   try{await window.renderBroadcasts()}catch(e){state.textContent='تم الحفظ. تعذر تحديث السجل الآن؛ افتحي قسم الإذاعة مرة أخرى.'}
  }
 };
 window.startLiveBroadcast=function(){if(busy)return;S('broadcastStatus').value='live';return window.saveBroadcast('live')};
})();
