/* وحدة المناسبات والفعاليات — تقويم + تنبيهات صوتية — مدرسة ملتقى المعارف للتعليم الأساسي (١-٦) */
(()=>{
const EV_MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const EV_DOWS=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const EV_KEY='multaqa_events_settings_v1';
const pad2=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const hexA=(h,a)=>{try{const n=parseInt(h.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`}catch(_){return h}};
const escEv=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $e=id=>document.getElementById(id);

let today0=new Date();today0=new Date(today0.getFullYear(),today0.getMonth(),today0.getDate());
const CYCLE=(today0.getMonth()+1>=9)?today0.getFullYear():today0.getFullYear()-1;
const CYCLE_START=new Date(CYCLE,8,1), CYCLE_END=new Date(CYCLE+1,7,31,23,59,59);
const fmtDate=d=>`${EV_DOWS[d.getDay()]} ${d.getDate()} ${EV_MONTHS[d.getMonth()]} ${d.getFullYear()}م`;
const fmtShort=d=>`${d.getDate()} ${EV_MONTHS[d.getMonth()]}`;
const diffDays=d=>Math.round((new Date(d.getFullYear(),d.getMonth(),d.getDate())-today0)/86400000);

let EV_ALL=[];
function buildEvents(){
  EV_ALL=(typeof EVENTS_RAW!=='undefined'?EVENTS_RAW:[]).map(ev=>{
    let s;
    if(ev.hijri){const off=Math.round((CYCLE-2024)*354.37);s=new Date(ev.d[1]>=9?2024:2025,ev.d[1]-1,ev.d[0]);s.setDate(s.getDate()+off);}
    else s=new Date(ev.d[1]>=9?CYCLE:CYCLE+1,ev.d[1]-1,ev.d[0]);
    let en;
    if(ev.end){en=new Date(s.getFullYear(),ev.end[1]-1,ev.end[0]);if(en<s)en=new Date(s.getFullYear()+1,ev.end[1]-1,ev.end[0]);}
    else en=new Date(s);
    return {...ev,startDate:s,endDate:en,dateText:ev.dt||(ev.hijri?`${fmtShort(s)} (${ev.hj})`:fmtShort(s))};
  }).sort((a,b)=>a.startDate-b.startDate);
}
buildEvents();

let evState={enabled:false,dayBefore:true,sameDay:true,time:'08:00',muted:{},fired:[]};
function loadEvState(){try{const s=JSON.parse(localStorage.getItem(EV_KEY));if(s)evState={...evState,...s,muted:s.muted||{}}}catch(_){}}
function saveEvState(){try{localStorage.setItem(EV_KEY,JSON.stringify(evState))}catch(_){}}
loadEvState();
const isMuted=id=>!!evState.muted[id];
window.toggleEventMute=id=>{evState.muted[id]=!evState.muted[id];saveEvState();renderEventsPane()};

function notifyEvent(ev,kind){
  const key=`${ev.id}::${kind}::${ymd(ev.startDate)}`;
  if(evState.fired.includes(key))return;
  evState.fired.push(key);if(evState.fired.length>400)evState.fired=evState.fired.slice(-300);saveEvState();
  const title=kind==='pre'?`⏰ غدًا: ${ev.n}`:`🎉 اليوم: ${ev.n}`;
  const body=`${fmtDate(ev.startDate)} — ${ev.def.slice(0,110)}…`;
  window.playMultaqaAlertSound&&window.playMultaqaAlertSound();
  if('Notification' in window&&Notification.permission==='granted'&&'serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(reg=>reg.showNotification(title,{body,dir:'rtl',lang:'ar',icon:'school-logo.png',badge:'school-logo.png',tag:'multaqa-event-'+key,renotify:true,data:{url:'./'}})).catch(()=>{});
  }
  if(typeof window.notifyLocal==='function'&&!('Notification' in window)) window.notifyLocal(title);
  if(typeof toast==='function') toast(title);
  renderEvAlertZone();
}
function checkEventReminders(){
  if(!evState.enabled)return;
  const now=new Date(),[h,m]=(evState.time||'08:00').split(':').map(Number);
  EV_ALL.forEach(ev=>{
    if(ev.monthOnly||isMuted(ev.id))return;
    const ds=new Date(ev.startDate);ds.setHours(0,0,0,0);
    const de=new Date(ev.endDate);de.setHours(23,59,59,999);
    const pre=new Date(ev.startDate);pre.setDate(pre.getDate()-1);pre.setHours(h||8,m||0,0,0);
    if(evState.dayBefore&&now>=pre&&now<ds)notifyEvent(ev,'pre');
    if(evState.sameDay&&now>=ds&&now<=de)notifyEvent(ev,'day');
  });
}
setInterval(checkEventReminders,30000);
setTimeout(checkEventReminders,3000);

function eventsOn(date){const t=new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime();
 return EV_ALL.filter(e=>{if(e.monthOnly)return false;
  const s=new Date(e.startDate.getFullYear(),e.startDate.getMonth(),e.startDate.getDate()).getTime();
  const en=new Date(e.endDate.getFullYear(),e.endDate.getMonth(),e.endDate.getDate()).getTime();
  return t>=s&&t<=en;});}
const monthOnlyIn=(y,m)=>EV_ALL.filter(e=>e.monthOnly&&e.startDate.getFullYear()===y&&e.startDate.getMonth()+1===m);
const upcoming=n=>EV_ALL.filter(e=>e.endDate>=today0&&!e.monthOnly).sort((a,b)=>a.startDate-b.startDate).slice(0,n);

let evView={y:today0.getFullYear(),m:today0.getMonth()+1};
if(today0<CYCLE_START||today0>CYCLE_END)evView={y:CYCLE,m:9};
let evSelectedDay=(today0>=CYCLE_START&&today0<=CYCLE_END)?new Date(today0):new Date(CYCLE,8,1);
let evActiveCat='all',evQuery='';

function renderEvAlertZone(){
  const zone=$e('evAlertZone');if(!zone)return;
  const tmr=new Date(today0);tmr.setDate(tmr.getDate()+1);
  const tod=eventsOn(today0).filter(e=>!isMuted(e.id)),tom=eventsOn(tmr).filter(e=>!isMuted(e.id));
  let html='';
  if(tom.length)html+=`<div class="ev-banner">⏰ <b>غدًا:</b> ${tom.map(e=>e.icon+' '+escEv(e.n)).join(' • ')}</div>`;
  if(tod.length)html+=`<div class="ev-banner today">🎉 <b>اليوم:</b> ${tod.map(e=>e.icon+' '+escEv(e.n)).join(' • ')}</div>`;
  zone.innerHTML=html;
}

function renderEvSettings(){
  const box=$e('evSettingsCard');if(!box)return;
  const p=('Notification' in window)?Notification.permission:'denied';
  const nOn=EV_ALL.filter(e=>!e.monthOnly&&!isMuted(e.id)).length;
  box.innerHTML=`
   <div class="ev-set-row">
    <div class="ev-set-l"><strong>🔔 تفعيل تنبيهات المناسبات</strong><span>إشعار قبل كل مناسبة بيوم، وإشعار آخر في يومها</span></div>
    <label class="ev-switch"><input type="checkbox" id="evSwEnabled" ${evState.enabled?'checked':''}><span></span></label>
   </div>
   <div class="ev-set-row">
    <div class="ev-set-l"><strong>⏰ وقت التنبيه</strong><span>الساعة التي يصلك فيها الإشعار</span></div>
    <input type="time" id="evTime" value="${escEv(evState.time)}">
   </div>
   <div class="ev-set-row">
    <div class="ev-set-l"><strong>📱 إشعارات الجهاز</strong><span>${p==='granted'?'مفعّلة — ستصلك التنبيهات فوق كل النوافذ':(p==='denied'?'مرفوضة من المتصفح — ستظهر التنبيهات داخل الصفحة فقط':'اسمحي للمتصفح لإرسال إشعارات النظام')}</span></div>
    <button class="ops-btn ${p==='granted'?'soft':''}" id="evBtnPerm" ${p==='granted'?'disabled':''}>${p==='granted'?'✓ مفعّلة':'تفعيل'}</button>
   </div>
   <div class="ev-set-row">
    <div class="ev-set-l"><strong>🔊 اختبار الصوت والتنبيه</strong><span>${nOn} مناسبة مفعّل تنبيهها حاليًا</span></div>
    <button class="ops-btn soft" id="evBtnTest">اختبار</button>
   </div>`;
  $e('evSwEnabled').onchange=function(){evState.enabled=this.checked;saveEvState();if(evState.enabled&&'Notification' in window&&Notification.permission==='default')reqEvPerm();toast(evState.enabled?'🔔 تم تفعيل تنبيهات المناسبات':'🔕 تم إيقاف تنبيهات المناسبات')};
  $e('evTime').onchange=function(){evState.time=this.value||'08:00';saveEvState();toast('⏰ سيصلك التنبيه الساعة '+evState.time)};
  $e('evBtnPerm').onclick=reqEvPerm;
  $e('evBtnTest').onclick=function(){window.playMultaqaAlertSound&&window.playMultaqaAlertSound();if('Notification' in window&&Notification.permission==='granted'&&'serviceWorker' in navigator){navigator.serviceWorker.ready.then(reg=>reg.showNotification('🔔 اختبار تنبيه المناسبات',{body:'هكذا سيصلك تنبيه المناسبات مع الصوت.',dir:'rtl',lang:'ar',icon:'school-logo.png',badge:'school-logo.png',tag:'multaqa-event-test',renotify:true})).catch(()=>{})}toast('🔔 هذا اختبار لصوت وتنبيه المناسبات')};
}
function reqEvPerm(){
  if(!('Notification' in window)){toast('المتصفح لا يدعم إشعارات النظام — ستعمل التنبيهات داخل الصفحة');return}
  Notification.requestPermission().then(p=>{renderEvSettings();if(p==='granted'){window.playMultaqaAlertSound&&window.playMultaqaAlertSound();toast('✅ تم تفعيل إشعارات المناسبات بنجاح')}else toast('لم يُسمح بالإشعارات — ستظهر التنبيهات داخل الصفحة فقط')});
}

function renderEvNext(){
  const box=$e('evNextCard');if(!box)return;
  const nx=upcoming(1)[0];
  if(!nx){box.innerHTML='<div class="ev-next-empty">لا توجد مناسبات قادمة حاليًا</div>';return}
  const dd=diffDays(nx.startDate);
  box.innerHTML=`<div class="ev-next-lbl">الفعالية القادمة</div><h4>${nx.icon} ${escEv(nx.n)}</h4><div class="ev-next-date">${fmtDate(nx.startDate)} • ${escEv(nx.dateText)}</div><div class="ev-next-count">${dd===0?'🎉 اليوم':dd===1?'⏰ غدًا':'⏳ بعد '+dd+' يومًا'}</div>`;
}

function dayCell(d,y,m,out){
  let yy=y,mm=m;if(mm<1){mm=12;yy--}if(mm>12){mm=1;yy++}
  const date=new Date(yy,mm-1,d),evs=eventsOn(date);
  const isT=ymd(date)===ymd(today0),isS=evSelectedDay&&ymd(date)===ymd(evSelectedDay);
  const col=evs.length?(EVENT_CATS[evs[0].c]?EVENT_CATS[evs[0].c].c:'#888'):'#8a7462';
  let inner=`<div class="ev-dn">${d}${isT?'<em>اليوم</em>':''}</div>`;
  evs.slice(0,2).forEach(e=>{const cc=EVENT_CATS[e.c]?EVENT_CATS[e.c].c:'#888';
    inner+=`<span class="ev-chip" style="background:${hexA(cc,.16)};color:${cc}" data-evid="${e.id}">${e.icon} ${escEv(e.n)}</span>`;});
  if(evs.length>2)inner+=`<span class="ev-more">+${evs.length-2} أخرى</span>`;
  return `<div class="ev-day ${out?'out':''} ${isT?'today':''} ${isS?'sel':''} ${evs.length?'has':''}" style="--evdc:${col}" data-day="${ymd(date)}">${inner}</div>`;
}
function renderEvCal(){
  const y=evView.y,m=evView.m;
  $e('evCalTitle').textContent=`${EV_MONTHS[m-1]} ${y}`;
  $e('evCalSub').textContent=`العام الدراسي ${CYCLE}/${CYCLE+1}`;
  $e('evDow').innerHTML=EV_DOWS.map((d,i)=>`<div class="ev-dow-h ${i===5||i===6?'we':''}">${d}</div>`).join('');
  const first=new Date(y,m-1,1),lead=first.getDay(),dim=new Date(y,m,0).getDate(),pdim=new Date(y,m-1,0).getDate();
  let html='';
  for(let i=lead-1;i>=0;i--)html+=dayCell(pdim-i,y,m-1,true);
  for(let d=1;d<=dim;d++)html+=dayCell(d,y,m,false);
  const trail=(7-((lead+dim)%7))%7;
  for(let d=1;d<=trail;d++)html+=dayCell(d,y,m+1,true);
  $e('evCalGrid').innerHTML=html;
  $e('evCalGrid').querySelectorAll('[data-day]').forEach(el=>el.onclick=()=>{const[yy,mm,dd]=el.dataset.day.split('-').map(Number);evSelectedDay=new Date(yy,mm-1,dd);renderEvCal();renderEvSide()});
  $e('evCalGrid').querySelectorAll('[data-evid]').forEach(el=>el.addEventListener('click',ev=>{ev.stopPropagation();openEventCard(el.dataset.evid)}));
  const mo=monthOnlyIn(y,m);
  $e('evRibbon').innerHTML=mo.map(e=>`<div class="ev-mchip" data-evid="${e.id}"><span style="background:${EVENT_CATS[e.c]?EVENT_CATS[e.c].c:'#888'}"></span>${e.icon} ${escEv(e.n)} <small>طوال الشهر</small></div>`).join('');
  $e('evRibbon').querySelectorAll('[data-evid]').forEach(el=>el.onclick=()=>openEventCard(el.dataset.evid));
  $e('evLegend').innerHTML=Object.entries(EVENT_CATS).map(([k,v])=>`<span class="ev-lg" data-cat="${k}"><i style="background:${v.c}"></i>${k}</span>`).join('');
  $e('evLegend').querySelectorAll('[data-cat]').forEach(el=>el.onclick=()=>{evActiveCat=(evActiveCat===el.dataset.cat?'all':el.dataset.cat);renderEvGrid()});
}
function renderEvSide(){
  const list=evSelectedDay?eventsOn(evSelectedDay):upcoming(6);
  $e('evSideTitle').innerHTML=`${evSelectedDay?'🗓️ فعاليات '+fmtShort(evSelectedDay):'⏳ القادم قريبًا'} <span class="ev-cnt">${list.length}</span>`;
  $e('evSideList').innerHTML=list.length?list.map(e=>{const cc=EVENT_CATS[e.c]?EVENT_CATS[e.c].c:'#888';
    return `<div class="ev-item" data-evid="${e.id}"><div class="ev-item-date" style="background:linear-gradient(140deg,${cc},${hexA(cc,.7)})"><b>${e.startDate.getDate()}</b><span>${EV_MONTHS[e.startDate.getMonth()]}</span></div><div class="ev-item-inf"><strong>${e.icon} ${escEv(e.n)}</strong><small>${escEv(e.dateText)} • ${e.c}</small></div></div>`;}).join('')
    :`<div class="ev-empty">لا توجد فعاليات في هذا اليوم</div>`;
  $e('evSideList').querySelectorAll('[data-evid]').forEach(el=>el.onclick=()=>openEventCard(el.dataset.evid));
  const up=upcoming(5);$e('evUpCnt').textContent=up.length;
  $e('evUpList').innerHTML=up.length?up.map(e=>{const cc=EVENT_CATS[e.c]?EVENT_CATS[e.c].c:'#888',dd=diffDays(e.startDate);
    return `<div class="ev-item" data-evid="${e.id}"><div class="ev-item-date" style="background:linear-gradient(140deg,${cc},${hexA(cc,.7)})"><b>${e.startDate.getDate()}</b><span>${EV_MONTHS[e.startDate.getMonth()]}</span></div><div class="ev-item-inf"><strong>${e.icon} ${escEv(e.n)}</strong><small>${dd===0?'اليوم 🎉':'بعد '+dd+' يوم'}</small></div></div>`;}).join('')
    :`<div class="ev-empty">لا توجد فعاليات قادمة</div>`;
  $e('evUpList').querySelectorAll('[data-evid]').forEach(el=>el.onclick=()=>openEventCard(el.dataset.evid));
}
function evFiltered(){
  let r=EV_ALL.slice();
  if(evActiveCat!=='all')r=r.filter(e=>e.c===evActiveCat);
  if(evQuery.trim()){const q=evQuery.trim();r=r.filter(e=>(e.n+e.def+(e.ideas||[]).join(' ')+e.c).includes(q))}
  return r;
}
function renderEvGrid(){
  const sel=$e('evFilterCat');
  if(sel&&!sel.dataset.filled){sel.dataset.filled='1';sel.innerHTML='<option value="all">كل التصنيفات</option>'+Object.keys(EVENT_CATS).map(k=>`<option value="${k}">${k}</option>`).join('')}
  if(sel)sel.value=evActiveCat;
  const list=evFiltered();
  $e('evEventsGrid').innerHTML=list.map(e=>{
    const cc=EVENT_CATS[e.c]?EVENT_CATS[e.c].c:'#888',muted=isMuted(e.id),dd=diffDays(e.startDate);
    return `<article class="ev-card" style="--evc:${cc}">
     <div class="ev-card-bar"></div>
     <div class="ev-card-body">
      <div class="ev-card-h"><div class="ev-card-icon" style="background:${hexA(cc,.16)}">${e.icon}</div>
       <div><h5>${escEv(e.n)}</h5><span class="ev-card-date">📅 ${escEv(e.dateText)} • ${fmtDate(e.startDate)}</span></div>
       <span class="ev-cat-pill" style="background:${hexA(cc,.16)};color:${cc}">${e.c}</span></div>
      <p class="ev-card-def">${escEv(e.def)}</p>
      <div class="ev-card-stat">${e.monthOnly?'طوال الشهر':(dd<0?'انقضت':dd===0?'🎉 اليوم':dd===1?'⏰ غدًا':'⏳ بعد '+dd+' يومًا')}</div>
      <div class="ev-card-foot">
       <button class="ev-mini" data-evid="${e.id}" data-act="open">🔍 التفاصيل</button>
       <button class="ev-mini ${muted?'':'act'}" data-evid="${e.id}" data-act="mute">${muted?'🔕 التنبيه متوقف':'🔔 التنبيه مفعّل'}</button>
      </div>
     </div></article>`;
  }).join('')||'<div class="ev-empty">لا توجد نتائج مطابقة</div>';
  $e('evEventsGrid').querySelectorAll('[data-act="open"]').forEach(b=>b.onclick=()=>openEventCard(b.dataset.evid));
  $e('evEventsGrid').querySelectorAll('[data-act="mute"]').forEach(b=>b.onclick=()=>window.toggleEventMute(+b.dataset.evid));
}
$e('evSearch')&&($e('evSearch').oninput=e=>{evQuery=e.target.value;renderEvGrid()});
$e('evFilterCat')&&($e('evFilterCat').onchange=e=>{evActiveCat=e.target.value;renderEvGrid()});

function openEventCard(id){
  const e=EV_ALL.find(x=>String(x.id)===String(id));if(!e)return;
  const dd=diffDays(e.startDate),muted=isMuted(e.id);
  const body=`<div class="ev-modal-head" style="--evc:${EVENT_CATS[e.c]?EVENT_CATS[e.c].c:'#888'}"><span class="ev-modal-ic">${e.icon}</span><h3>${escEv(e.n)}</h3><div class="ev-modal-tags"><span>📅 ${fmtDate(e.startDate)}</span><span>🗓️ ${escEv(e.dateText)}</span><span>🏷️ ${e.c}</span>${e.hijri?`<span>🌙 ${escEv(e.hj)}</span>`:''}</div></div>
  <div class="ev-modal-body">
   <div class="ev-modal-sect"><b>📖 نبذة عن المناسبة</b><p>${escEv(e.def)}</p></div>
   ${e.ideas&&e.ideas.length?`<div class="ev-modal-sect"><b>💡 أفكار وأنشطة للاحتفال</b><ol>${e.ideas.map(i=>`<li>${escEv(i)}</li>`).join('')}</ol></div>`:''}
   <div class="ev-modal-sect"><b>الحالة</b><p>${e.monthOnly?'مناسبة تمتد طوال الشهر.':(dd<0?'انقضت هذه المناسبة.':dd===0?'🎉 تُقام اليوم.':'⏳ بعد '+dd+' يومًا.')}</p></div>
  </div>
  <div class="ev-modal-foot"><button class="btn btn-solid" id="evModalMute">${muted?'🔔 تفعيل التنبيه':'🔕 إيقاف التنبيه'}</button><button class="btn btn-ghost" id="evModalClose">إغلاق</button></div>`;
  if($e('simpleModuleTitle'))$e('simpleModuleTitle').textContent='مناسبة';
  if($e('simpleModuleBody')){$e('simpleModuleBody').innerHTML=body;$e('simpleModuleBody').classList.add('ev-modal-body-wrap')}
  window.openById?openById('simpleModuleModal'):document.getElementById('simpleModuleModal')?.classList.add('open');
  const mb=document.getElementById('evModalMute');if(mb)mb.onclick=()=>{window.toggleEventMute(e.id);window.closeSimpleModule&&window.closeSimpleModule();openEventCard(e.id)};
  const cb=document.getElementById('evModalClose');if(cb)cb.onclick=()=>window.closeSimpleModule&&window.closeSimpleModule();
}
window.openEventCard=openEventCard;

window.renderEventsPane=function(){
  renderEvAlertZone();
  renderEvNext();
  renderEvSettings();
  renderEvCal();
  renderEvSide();
  renderEvGrid();
};
$e('evBtnNext')&&($e('evBtnNext').onclick=()=>{evView.m++;if(evView.m>12){evView.m=1;evView.y++}renderEvCal()});
$e('evBtnPrev')&&($e('evBtnPrev').onclick=()=>{evView.m--;if(evView.m<1){evView.m=12;evView.y--}renderEvCal()});
$e('evBtnToday')&&($e('evBtnToday').onclick=()=>{evView={y:today0.getFullYear(),m:today0.getMonth()+1};evSelectedDay=new Date(today0);renderEvCal();renderEvSide()});

setTimeout(renderEvAlertZone,500);
})();
