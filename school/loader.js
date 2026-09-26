(async()=>{
 const started=Date.now(),MIN_SPLASH=650;
 try{
  const parts=await Promise.all(['ui-1.html?v=20260921-official-names','ui-2.html?v=20260927-portal-booking','ui-3.html?v=20260927-resource-diary','ui-4.html?v=20260923-emergency-coverage-2'].map(x=>fetch(x).then(r=>{if(!r.ok)throw new Error(x);return r.text()})));
  const tmp=document.createElement('div');
  tmp.innerHTML=parts.join('');
  while(tmp.firstChild)document.body.appendChild(tmp.firstChild);
  for(const src of ['app-core.js?v=20260926-meetings','app-services.js?v=20260927-resource-diary','app-content.js?v=20260925-news-push','bell-notifications.js?v=20260926-custom-sound','events-data.js?v=20260912-events','events-calendar.js?v=20260923-school-deadlines','app-extensions.js?v=20260927-portal-booking','secure-platform.js?v=20260927-portal-booking','interactive-schedules.js?v=20260926-custom-sound','whatsapp-notify.js?v=20260927-lab-owner']){
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
