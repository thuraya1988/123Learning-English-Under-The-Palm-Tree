(()=>{
  const PERIOD_NOTICE_BODY='تنبيه موعد الحصة — مدرسة ملتقى المعارف للتعليم الأساسي (١–٦)';
  const ALERT_SOUND_SRC='assets/alert-sound.mp3';
  let alertAudioEl=null;
  function getAlertAudio(){
    if(!alertAudioEl){ alertAudioEl=new Audio(ALERT_SOUND_SRC); alertAudioEl.preload='auto'; }
    return alertAudioEl;
  }
  window.playMultaqaAlertSound=function(){
    try{
      const a=getAlertAudio();
      a.currentTime=0;
      const p=a.play();
      if(p&&p.catch) p.catch(()=>{});
    }catch(_){}
  };
  ['click','touchstart','keydown','pointerdown'].forEach(ev=>document.addEventListener(ev,()=>{
    try{ const a=getAlertAudio(); const p=a.play(); if(p&&p.then) p.then(()=>{a.pause();a.currentTime=0;}).catch(()=>{}); }catch(_){}
  },{once:true,passive:true}));

  const originalNotify=window.notifyLocal;
  window.notifyLocal=async function(message){
    try{ if(typeof originalNotify==='function') originalNotify(message); }catch(_){ }
    window.playMultaqaAlertSound();
    if(!('Notification' in window)||Notification.permission!=='granted'||!('serviceWorker' in navigator)) return;
    try{
      const reg=await navigator.serviceWorker.ready;
      await reg.showNotification(message,{
        body:PERIOD_NOTICE_BODY,
        dir:'rtl',lang:'ar',
        icon:'school-logo.png',badge:'school-logo.png',
        tag:'multaqa-period-'+String(message).replace(/\s+/g,'-'),
        renotify:true,
        data:{url:'./'}
      });
    }catch(_){ }
  };

  const originalEnable=window.enableOpsAlerts;
  if(typeof originalEnable==='function'){
    window.enableOpsAlerts=async function(){
      localStorage.setItem('multaqa_period_notifications','1');
      const r=await originalEnable();
      const s=document.getElementById('opsAlertStatus');
      if(s) s.textContent='إشعارات الحصص مفعلة';
      return r;
    };
  }

  function relabel(){
    document.querySelectorAll('[data-pane="bell"]').forEach(b=>b.textContent='🔔 إشعارات الحصص');
    const pane=document.getElementById('opsBell');
    if(pane){
      const notes=pane.querySelectorAll('.push-note');
      notes.forEach(n=>n.textContent='بعد تفعيل الإشعارات سيظهر تنبيه عند مواعيد الحصص. على iPhone أضيفي الموقع إلى الشاشة الرئيسية ثم اسمحي بالإشعارات.');
      const cards=pane.querySelectorAll('.bell-card');
      if(cards[1]){
        const p=cards[1].querySelector('p');
        if(p) p.textContent='كل حصة 35 دقيقة، والتنبيه إشعار مرئي مع مؤثر صوتي.';
      }
      const btn=pane.querySelector('button[onclick="enableOpsAlerts()"]');
      if(btn) btn.textContent='🔔 تفعيل إشعارات الحصص';
      const test=pane.querySelector('button[onclick="testOpsAlert()"]');
      if(test) test.textContent='اختبار الإشعار';
    }
    const head=document.querySelector('#opsModal .ops-head h3');
    if(head) head.textContent='نظام الجداول والمناوبات وإشعارات الحصص';
  }
  relabel();
})();