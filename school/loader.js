(async()=>{
 const started=Date.now(),MIN_SPLASH=650;
 try{
  const parts=await Promise.all(['ui-1.html?v=20261006-duty-save-audit-1','ui-2.html?v=20261002-logo-glass-lab-1','ui-3.html?v=20261003-schedules-ui-1','ui-4.html?v=20261002-lab-tools-1'].map(x=>fetch(x).then(r=>{if(!r.ok)throw new Error(x);return r.text()})));
  const tmp=document.createElement('div');
  tmp.innerHTML=parts.join('');
  while(tmp.firstChild)document.body.appendChild(tmp.firstChild);
  for(const src of ['app-core.js?v=20261006-duty-save-audit-1','app-services.js?v=20261007-stop-alert-1','app-content.js?v=20261006-duty-save-audit-1','bell-notifications.js?v=20261007-stop-alert-1','events-data.js?v=20260912-events','events-calendar.js?v=20260927-background-reminders-2','app-extensions.js?v=20261002-sections-support-1','secure-platform.js?v=20261006-duty-save-audit-1','activity-supervision.js?v=20261004-supervisor-direction','end-of-day.js?v=20260928-wire-eod','interactive-schedules.js?v=20261004-verified-october','whatsapp-notify.js?v=20261005-first-attendance','attendance-reports.js?v=20261004-attendance-media','broadcast-improvements.js?v=20261005-broadcast-save-2','attendance-reminders.js?v=20261005-first-attendance']){
   await new Promise((ok,fail)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=fail;document.body.appendChild(s)})
  }
  const wait=Math.max(0,MIN_SPLASH-(Date.now()-started));
  setTimeout(()=>{
   const boot=document.getElementById('appBoot');
   if(!boot)return;
   boot.classList.add('boot-done');
   setTimeout(()=>boot.remove(),550);
  },wait);
 }catch(e){
  const msg=document.getElementById('appBootMsg');
  if(msg)msg.textContent='تعذر تحميل ملفات النظام. أعيدي تحديث الصفحة.';
  else{const boot=document.getElementById('appBoot');if(boot)boot.textContent='تعذر تحميل ملفات النظام. أعيدي تحديث الصفحة.'}
  console.error(e);
 }
})();


