/* إشعارات واتساب — منظومة ملتقى المعارف
   يضيف أزرار إبلاغ عبر واتساب إلى: الاحتياط، المناوبة، المواعيد المهمة، الجداول (الحصص).
   لا يغيّر أي منطق في المنظومة: يقرأ البيانات التي تعرضها الشاشات ويجهّز الرسالة ويفتح واتساب. */
(()=>{
const SCHOOL='منظومة ملتقى المعارف';
const BOOK_KEY='multaqa_wa_phonebook_v1',SENT_KEY='multaqa_wa_sent_v1';
const DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const SLOT={morning:'الطابور الصباحي',shade:'المظلة',coop:'التعاونية',between:'بين الفصول',cars:'السيارات',buses:'الحافلات',reserve:'احتياط'};
const cache={};let profilePhones=null;
const h=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nm=v=>String(v||'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/\s+/g,' ').trim();
const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch{return{}}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const isAdmin=()=>{try{return typeof secureAdmin==='function'&&!!secureAdmin()}catch{return false}};
const emps=()=>{try{return secureDirectory?.employees||[]}catch{return[]}};
const empById=id=>emps().find(x=>String(x.employee_id)===String(id));
const empByName=n=>{const k=nm(n);return emps().find(x=>nm(x.short_name)===k||nm(x.full_name)===k)||emps().find(x=>k&&(nm(x.full_name).startsWith(k)||k.startsWith(nm(x.short_name))))};
const label=e=>e?(e.short_name||e.full_name):'';
const fmtDate=iso=>{if(!iso)return'';const [y,m,d]=String(iso).slice(0,10).split('-');return d&&m&&y?Number(d)+'/'+Number(m)+'/'+y:iso};
const dayOf=iso=>{const t=new Date(String(iso).slice(0,10)+'T12:00:00');return isNaN(t)?'':DAYS[t.getDay()]};
const muscatToday=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Muscat'}).format(new Date());
const nextDateFor=day=>{const i=DAYS.indexOf(day);if(i<0)return'';const t=new Date(muscatToday()+'T12:00:00');const add=(i-t.getDay()+7)%7;t.setDate(t.getDate()+add);return t.toISOString().slice(0,10)};
const note=m=>{try{toast(m)}catch{alert(m)}};

/* ——— الأرقام ——— */
function normPhone(v){let d=String(v||'').replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/\D/g,'');if(d.startsWith('00'))d=d.slice(2);if(d.length===8)d='968'+d;return d.length>=11?d:''}
async function loadProfilePhones(){if(profilePhones)return profilePhones;profilePhones={};try{const d=await staffApi('teacher_profiles');(d.items||[]).forEach(x=>{const p=normPhone(x.profile?.contact_phone||x.profile?.phone||x.contact_phone||x.phone);if(p)profilePhones[x.employee_id]=p})}catch{}return profilePhones}
async function phoneOf(emp){if(!emp)return'';const book=load(BOOK_KEY);if(book[emp.employee_id])return book[emp.employee_id];await loadProfilePhones();return profilePhones[emp.employee_id]||normPhone(emp.contact_phone||emp.phone)}
function askPhone(emp,current){const v=prompt('رقم واتساب للمعلمة '+label(emp)+'\n(٨ أرقام، مثال: 9xxxxxxx)\nاتركيه فارغًا لاختيار جهة الاتصال من واتساب مباشرة.',current?current.replace(/^968/,''):'');if(v===null)return null;const p=normPhone(v);if(v.trim()&&!p){note('الرقم غير صحيح');return null}const book=load(BOOK_KEY);if(p)book[emp.employee_id]=p;else delete book[emp.employee_id];save(BOOK_KEY,book);return p}
window.waEditPhone=async id=>{const e=empById(id);if(!e)return;const p=askPhone(e,await phoneOf(e));if(p!==null)note(p?'✅ تم حفظ رقم '+label(e):'تم مسح الرقم')};

/* ——— الإرسال ——— */
const pending={};let seq=0;
function reg(o){const k='w'+(++seq);pending[k]=o;return k}
function openWa(phone,text){const url='https://wa.me/'+(phone||'')+'?text='+encodeURIComponent(text);const w=window.open(url,'_blank');if(!w)location.href=url}
window.waSend=async(key,btn)=>{const o=pending[key];if(!o)return;let phone='';if(o.empId){const e=empById(o.empId);phone=await phoneOf(e);if(!phone&&e){const p=askPhone(e,'');if(p===null)return;phone=p}}openWa(phone,o.text);if(o.sentKey){const s=load(SENT_KEY);s[o.sentKey]=Date.now();save(SENT_KEY,s)}if(btn){btn.classList.add('wa-sent');btn.innerHTML='✅ '+(o.sentLabel||'تم الإبلاغ')}};
const wasSent=k=>!!(k&&load(SENT_KEY)[k]);
function btn(o,text,cls=''){const k=reg(o),sent=wasSent(o.sentKey);return '<button type="button" class="wa-btn '+cls+(sent?' wa-sent':'')+'" onclick="waSend(\''+k+'\',this)">'+(sent?'✅ أُرسل — إعادة':text)+'</button>'}
const editBtn=id=>'<button type="button" class="wa-edit" title="تعديل رقم واتساب" onclick="waEditPhone(\''+h(id)+'\')">✏️</button>';
const sign='\n\n— '+SCHOOL+' 🏫';

/* ——— الرسائل ——— */
const msgCoverage=(name,rows,date)=>'📢 '+SCHOOL+'\n\nالأستاذة '+name+'، تحية طيبة،\nتم إسناد '+(rows.length>1?rows.length+' حصص احتياط':'حصة احتياط')+' لديكِ يوم '+(rows[0].day_name||dayOf(date))+' بتاريخ '+fmtDate(date)+':\n'+rows.map(r=>'• الحصة '+r.period+' — الصف '+(r.class_label||'')+(r.subject?' ('+r.subject+')':'')).join('\n')+'\n\nنرجو التواجد في الموعد، وشكرًا لتعاونكِ.'+sign;
const msgDuty=(name,day,date,slot)=>'🦺 '+SCHOOL+'\n\nالأستاذة '+name+'، تذكير بالمناوبة:\n📅 يوم '+day+(date?' بتاريخ '+fmtDate(date):'')+'\n📍 الموقع: '+slot+'\n\nشكرًا لالتزامكِ.'+sign;
const msgEvent=x=>'📅 '+SCHOOL+' — موعد مهم\n\n📌 '+x.title+'\n🗓️ يوم '+dayOf(x.event_date)+' بتاريخ '+fmtDate(x.event_date)+(x.event_time?'\n⏰ الساعة '+String(x.event_time).slice(0,5):'')+(x.details?'\n📝 '+x.details:'')+sign;
const msgSchedule=(name,day,date,periods)=>'📚 '+SCHOOL+'\n\nالأستاذة '+name+'، حصصكِ يوم '+day+(date?' بتاريخ '+fmtDate(date):'')+':\n'+periods.map((p,i)=>p?'• الحصة '+(i+1)+': '+p:'').filter(Boolean).join('\n')+sign;

/* ——— تخزين استجابات الخادم لاستخدامها في الرسائل ——— */
const orig=window.staffApi;
if(typeof orig==='function')window.staffApi=async(action,p={})=>{const d=await orig(action,p);if(['coverage','duty_today','duty_week','calendar_events','teacher_schedule','resource_bookings'].includes(action))cache[action]=d;if(action==='save_teacher_profile')profilePhones=null;return d};

/* ——— الاحتياط ——— */
function enhanceCoverage(pane){
 const items=(cache.coverage?.items||[]).filter(x=>x.replacement_employee_id&&x.status!=='cancelled');if(!items.length)return;
 items.forEach(x=>{const art=pane.querySelector('#coverage-'+CSS.escape(String(x.id))+' .coverage-side');if(!art||art.querySelector('.wa-btn'))return;const e=empById(x.replacement_employee_id);art.insertAdjacentHTML('beforeend','<div class="wa-row">'+btn({empId:x.replacement_employee_id,text:msgCoverage(label(e),[x],x.coverage_date),sentKey:'cov:'+x.id+':'+x.replacement_employee_id},'📲 إبلاغ '+h(label(e))+' عبر واتساب')+editBtn(x.replacement_employee_id)+'</div>')});
 if(pane.querySelector('.wa-panel'))return;
 const today=muscatToday(),groups={};
 items.filter(x=>String(x.coverage_date)>=today).forEach(x=>{const k=x.replacement_employee_id+'|'+x.coverage_date;(groups[k]=groups[k]||[]).push(x)});
 const keys=Object.keys(groups).sort((a,b)=>a.split('|')[1].localeCompare(b.split('|')[1]));if(!keys.length)return;
 const rows=keys.map(k=>{const [id,date]=k.split('|'),list=groups[k].sort((a,b)=>a.period-b.period),e=empById(id),name=label(e)||'معلمة';return '<div class="wa-item"><div><b>'+h(name)+'</b><small>'+h(dayOf(date))+' '+h(fmtDate(date))+' • الحصص: '+list.map(r=>r.period).join('، ')+'</small></div><div class="wa-item-actions">'+btn({empId:id,text:msgCoverage(name,list,date),sentKey:'covg:'+k+':'+list.map(r=>r.id).join('-')},'📲 إرسال')+editBtn(id)+'</div></div>'}).join('');
 const list=pane.querySelector('.coverage-list');if(list)list.insertAdjacentHTML('beforebegin','<section class="staff-card wa-panel"><h3>📲 إبلاغ معلمات الاحتياط عبر واتساب</h3><p class="staff-help">رسالة واحدة لكل معلمة تجمع كل حصصها في اليوم نفسه. اضغطي «إرسال» فيفتح واتساب والرسالة جاهزة، ثم اضغطي إرسال داخل واتساب.</p>'+rows+'</section>');
}

/* ——— المناوبة ——— */
function enhanceDuty(pane){
 const w=cache.duty_week;if(!w||pane.querySelector('.wa-duty-btn'))return;
 const cards=pane.querySelectorAll('.duty-week-card');
 (w.days||[]).forEach((day,i)=>{const card=cards[i];if(!card)return;const date=nextDateFor(day.day_name),people=[];Object.entries(day.slots||{}).forEach(([slot,names])=>(names||[]).forEach(n=>{const e=empByName(n);people.push({n,e,slot:SLOT[slot]||slot})}));if(!people.length)return;
  const list=people.map(p=>'<div class="wa-item"><div><b>'+h(p.n)+'</b><small>'+h(p.slot)+'</small></div><div class="wa-item-actions">'+(p.e?btn({empId:p.e.employee_id,text:msgDuty(p.n,day.day_name,date,p.slot),sentKey:'duty:'+date+':'+p.e.employee_id+':'+p.slot},'📲 إرسال')+editBtn(p.e.employee_id):'<small class="wa-miss">لم يُعثر على الاسم في قائمة المعلمات</small>')+'</div></div>').join('');
  card.insertAdjacentHTML('beforeend','<button type="button" class="wa-btn wa-duty-btn" onclick="this.nextElementSibling.hidden=!this.nextElementSibling.hidden">📲 إبلاغ مناوبات '+h(day.day_name)+' ('+people.length+')</button><div class="wa-duty-list" hidden><small class="wa-date">'+h(fmtDate(date))+'</small>'+list+'</div>')});
}

/* ——— المواعيد المهمة (الفعاليات) ——— */
function enhanceEvents(pane){
 const items=cache.calendar_events?.items||[];const table=pane.querySelector('.staff-table');if(!table||table.querySelector('.wa-btn')||!items.length)return;
 table.querySelector('thead tr')?.insertAdjacentHTML('beforeend','<th>واتساب</th>');
 table.querySelectorAll('tbody tr').forEach((tr,i)=>{const x=items[i];if(!x)return;tr.insertAdjacentHTML('beforeend','<td>'+btn({text:msgEvent(x),sentKey:'evt:'+x.id+':'+x.event_date},'📲 مشاركة','wa-small')+'</td>')});
 table.closest('.staff-card')?.insertAdjacentHTML('afterbegin','<p class="staff-help wa-hint">زر «مشاركة» يفتح واتساب لتختاري مجموعة المعلمات أو أي جهة اتصال.</p>');
}

/* ——— الحصص (الجداول) ——— */
function enhanceSchedule(pane){
 const d=cache.teacher_schedule;if(!d?.employee||pane.querySelector('.wa-sched-btn'))return;
 const e=d.employee,schedule=d.schedule?.schedule||{},name=label(e);
 pane.querySelectorAll('.secure-day-card').forEach(card=>{const day=card.querySelector('h3')?.textContent.trim(),periods=schedule[day]||[];if(!periods.some(Boolean))return;const date=nextDateFor(day);card.insertAdjacentHTML('beforeend',btn({empId:e.employee_id,text:msgSchedule(name,day,date,periods),sentKey:'sch:'+e.employee_id+':'+date},'📲 إرسال حصص '+h(day),'wa-sched-btn'))});
}

/* ——— حجز الموارد ——— */
const RESOURCE_OWNERS={resources_room:'أصيلة الوهيبية'};
function enhanceBooking(pane){
 const items=cache.resource_bookings?.items||[];if(!items.length)return;
 const arts=pane.querySelectorAll('.request-list article');
 arts.forEach((art,i)=>{
  const x=items[i];if(!x||art.querySelector('.wa-btn'))return;
  const owner=RESOURCE_OWNERS[x.resource_key];if(!owner)return;
  const myName=secureEmployee?(secureEmployee.short_name||secureEmployee.full_name):'';
  if(myName&&nm(owner)===nm(myName))return;
  const e=empByName(owner);if(!e)return;
  const msg='📅 '+SCHOOL+'\n\nالأستاذة '+owner+'، تحية طيبة،\nتم حجز '+x.resource_label+' يوم '+fmtDate(x.booking_date)+' — الحصة '+x.period+' من قِبل '+(x.booked_by_name||'')+'.'+(x.note?'\nملاحظة: '+x.note:'')+sign;
  art.insertAdjacentHTML('beforeend','<div class="wa-row">'+btn({empId:e.employee_id,text:msg,sentKey:'book:'+x.id},'📲 إبلاغ '+h(owner)+' عبر واتساب')+editBtn(e.employee_id)+'</div>');
 });
}

/* ——— ربط بالشاشات ——— */
let timer;
function enhance(){const pane=document.getElementById('staffPane');if(!pane)return;const tab=document.querySelector('[data-staff-tab].active')?.dataset.staffTab;try{if(tab==='booking')enhanceBooking(pane);if(!isAdmin())return;if(tab==='coverage')enhanceCoverage(pane);if(tab==='duty')enhanceDuty(pane);if(tab==='events')enhanceEvents(pane);if(tab==='schedule')enhanceSchedule(pane)}catch(err){console.warn('wa-notify',err)}}
new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(enhance,120)}).observe(document.body,{childList:true,subtree:true});

const css=document.createElement('style');css.textContent=`
.wa-btn{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:12px;padding:9px 14px;background:#1f8f4e;color:#fff;font:700 14px Cairo,Tahoma,sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(16,32,60,.18);transition:transform .15s,background .15s}
.wa-btn:hover{transform:translateY(-1px);background:#177a41}
.wa-btn.wa-sent{background:#f3ecdd;color:#10203c;border:1px solid #cbb994;box-shadow:none}
.wa-btn.wa-small{padding:6px 10px;font-size:13px}
.wa-row,.wa-item-actions{display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap}
.wa-edit{border:1px solid #cbb994;background:#fbf7ef;border-radius:10px;padding:6px 8px;cursor:pointer}
.wa-panel{border:2px solid #1f8f4e!important;margin-bottom:18px}
.wa-panel h3{color:#7c1f33}
.wa-item{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 0;border-top:1px dashed #d9ccb0;flex-wrap:wrap}
.wa-item small{display:block;color:#5b6475}
.wa-item .wa-item-actions{margin-top:0}
.wa-duty-btn,.wa-sched-btn{margin-top:12px;width:100%;justify-content:center}
.wa-duty-list{margin-top:8px}
.wa-date{color:#7c1f33;font-weight:700}
.wa-miss{color:#7c1f33}
.wa-hint{margin-bottom:8px}`;
document.head.appendChild(css);
})();
