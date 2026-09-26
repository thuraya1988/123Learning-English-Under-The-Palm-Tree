(()=>{
'use strict';

const SCHEDULE_SOURCE='schedule-import-2026.json?v=20260921-official-names';
const SCHOOL_DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'];
const PERIOD_LABELS=[
 ['١','12:20 م – 12:55 م',740,775],['٢','12:55 م – 1:30 م',775,810],
 ['٣','1:30 م – 2:05 م',810,845],['٤','2:05 م – 2:40 م',845,880],
 ['٥','3:00 م – 3:35 م',900,935],['٦','3:35 م – 4:10 م',935,970],
 ['٧','4:10 م – 4:45 م',970,1005]
];
const SUBJECT_META={
 'اللغة العربية':['📖','arabic'],'اللغة الإنجليزية':['🔤','english'],'اللغة الانجليزية':['🔤','english'],
 'الرياضيات':['➗','math'],'العلوم':['🔬','science'],'التربية الإسلامية':['🌙','islamic'],
 'التربية الاسلامية':['🌙','islamic'],'الدراسات الاجتماعية':['🗺️','social'],
 'الهوية والمواطنة':['🇴🇲','identity'],'تقنية المعلومات':['💻','it'],
 'التربية البدنية والصحية':['🏃','sport'],'الفنون البصرية':['🎨','art'],'الفنون الموسيقية':['🎵','music']
};
const state={data:null,type:'classes',query:'',grade:'all',mode:'week',day:0,selected:0,dark:false};
let reminderTimer=null,schedulePromise=null,fillRequestId=0;

const byId=id=>document.getElementById(id);
const safe=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const normalize=value=>String(value||'').trim().replace(/[إأآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').toLowerCase();

async function scheduleData(){
 if(state.data)return state.data;
 if(!schedulePromise){
  schedulePromise=fetch(SCHEDULE_SOURCE,{cache:'no-cache'}).then(response=>{
   if(!response.ok)throw new Error('schedule_load_failed');
   return response.json();
  }).then(data=>(state.data=data)).finally(()=>{schedulePromise=null});
 }
 return schedulePromise;
}

function rows(){return state.type==='classes'?(state.data?.classes||[]):(state.data?.teachers||[])}
function rowName(row){return state.type==='classes'?row.class_label:row.full_name_hint}
function gradeName(label){return ['الأول','الثاني','الثالث','الرابع','الخامس','السادس'].find(x=>String(label).includes(x))||''}
function parseLesson(value){
 const parts=String(value||'').split(/\s+—\s+/);
 return {subject:parts[0]||'',person:parts.slice(1).join(' — ')||''};
}
function subjectMeta(subject){return SUBJECT_META[subject]||['📚','other']}

function muscatNow(){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Muscat',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
 const get=t=>parts.find(x=>x.type===t)?.value||'';
 const dayMap={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
 const minutes=(+get('hour'))*60+(+get('minute'));
 return {day:dayMap[get('weekday')]??-1,minutes};
}
function currentPeriod(){
 const now=muscatNow();
 const period=PERIOD_LABELS.findIndex(x=>now.minutes>=x[2]&&now.minutes<x[3]);
 return {day:now.day,period};
}

function installControls(){
 const pane=byId('opsSchedules'),base=pane?.querySelector('.ops-controls');
 if(!pane||!base||byId('interactiveScheduleTools'))return;
 base.insertAdjacentHTML('afterend',`<div class="interactive-schedule-tools" id="interactiveScheduleTools">
  <label class="schedule-search"><span>بحث</span><input id="scheduleSearch" type="search" placeholder="ابحثي عن صف أو معلمة…" autocomplete="off"></label>
  <div class="schedule-actions" role="group" aria-label="طريقة عرض الجدول">
   <button type="button" data-view="week" class="active">أسبوعي</button><button type="button" data-view="day">يومي</button>
   <button type="button" data-action="theme" aria-label="تغيير لون الجدول">◐</button><button type="button" data-action="print">🖨️ طباعة</button>
  </div>
 </div><div class="schedule-filter-chips" id="scheduleFilterChips"></div><div class="schedule-day-tabs" id="scheduleDayTabs"></div>`);
 byId('scheduleSearch').addEventListener('input',event=>{state.query=event.target.value;refreshOptions()});
 byId('interactiveScheduleTools').addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.view){state.mode=button.dataset.view;document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view===state.mode));renderPublicSchedule();return}
  if(button.dataset.action==='theme'){state.dark=!state.dark;pane.classList.toggle('schedule-dark',state.dark)}
  if(button.dataset.action==='print')window.print();
 });
 byId('scheduleFilterChips').addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;state.grade=b.dataset.grade||'all';refreshOptions()});
 byId('scheduleDayTabs').addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;state.day=Number(b.dataset.day)||0;renderPublicSchedule()});
}

function renderFilters(){
 const box=byId('scheduleFilterChips');if(!box)return;
 if(state.type!=='classes'){box.innerHTML='<span class="schedule-count">جداول المعلمات الرسمية</span>';return}
 const grades=['all','الأول','الثاني','الثالث','الرابع','الخامس','السادس'];
 box.innerHTML=grades.map(g=>`<button type="button" data-grade="${g}" class="${state.grade===g?'active':''}">${g==='all'?'كل الصفوف':g}</button>`).join('');
}
function renderDayTabs(){
 const box=byId('scheduleDayTabs');if(!box)return;
 box.hidden=state.mode!=='day';
 box.innerHTML=SCHOOL_DAYS.map((day,index)=>`<button type="button" data-day="${index}" class="${state.day===index?'active':''}">${day}</button>`).join('');
}

function filteredRows(){
 const q=normalize(state.query);
 return rows().map((row,index)=>({row,index})).filter(item=>{
  const gradeOk=state.type!=='classes'||state.grade==='all'||gradeName(item.row.class_label)===state.grade;
  return gradeOk&&(!q||normalize(rowName(item.row)).includes(q));
 });
}
function refreshOptions(preferred){
 const select=byId('scheduleItem');if(!select)return;
 renderFilters();
 const available=filteredRows();
 select.innerHTML=available.map(item=>`<option value="${item.index}">${safe(rowName(item.row))}</option>`).join('');
 if(preferred){const found=available.find(x=>normalize(rowName(x.row))===normalize(preferred));if(found)select.value=String(found.index)}
 if(!available.length){byId('scheduleTextView').innerHTML='<div class="schedule-empty">لا توجد نتيجة مطابقة.</div>';return}
 state.selected=Number(select.value||available[0].index);renderPublicSchedule();
}

function lessonCell(value,dayIndex,periodIndex,label){
 const now=currentPeriod(),lesson=parseLesson(value),meta=subjectMeta(lesson.subject),active=now.day===dayIndex&&now.period===periodIndex;
 if(!value)return `<button class="schedule-cell free ${active?'is-now':''}" data-day="${dayIndex}" data-period="${periodIndex}" data-label="${safe(label)}"><span class="lesson-subject">—</span><small>حصة متاحة</small></button>`;
 return `<button class="schedule-cell subject-${meta[1]} ${active?'is-now':''}" data-day="${dayIndex}" data-period="${periodIndex}" data-label="${safe(label)}" data-value="${safe(value)}"><span class="lesson-icon">${meta[0]}</span><span class="lesson-subject">${safe(lesson.subject)}</span><small>${safe(lesson.person)}</small>${active?'<em>الآن</em>':''}</button>`;
}
function scheduleSummary(schedule,label){
 const now=currentPeriod(),value=now.day>=0&&now.day<5&&now.period>=0?(schedule[SCHOOL_DAYS[now.day]]||[])[now.period]:null;
 const next=value?parseLesson(value):null;
 return `<div class="schedule-identity"><div><small>${state.type==='classes'?'جدول الصف':'جدول المعلمة'}</small><h3>${safe(label)}</h3></div><div class="schedule-now ${value?'busy':'free'}"><span>${value?'الحصة الحالية':'الآن'}</span><b>${value?safe(next.subject):'لا توجد حصة جارية'}</b>${value?`<small>${safe(next.person)}</small>`:''}</div></div>`;
}
function weeklyMarkup(schedule,label){
 return `<div class="schedule-table-wrap"><table class="interactive-schedule-table"><thead><tr><th>الحصة</th>${SCHOOL_DAYS.map(day=>`<th>${day}</th>`).join('')}</tr></thead><tbody>${PERIOD_LABELS.map((period,p)=>`<tr><th><b>${period[0]}</b><small>${period[1]}</small></th>${SCHOOL_DAYS.map((day,d)=>`<td>${lessonCell((schedule[day]||[])[p],d,p,label)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function dailyMarkup(schedule,label){
 const day=SCHOOL_DAYS[state.day];
 return `<div class="schedule-daily"><h4>${day}</h4>${PERIOD_LABELS.map((period,p)=>`<div class="schedule-daily-row"><div class="daily-time"><b>الحصة ${period[0]}</b><small>${period[1]}</small></div>${lessonCell((schedule[day]||[])[p],state.day,p,label)}</div>`).join('')}</div>`;
}
function interactiveMarkup(schedule,label){return scheduleSummary(schedule,label)+(state.mode==='week'?weeklyMarkup(schedule,label):dailyMarkup(schedule,label))}

function bindLessonClicks(root,schedule){
 if(!root)return;
 root.onclick=event=>{const cell=event.target.closest('.schedule-cell');if(!cell)return;openLessonDetails(schedule,cell)};
}
function openLessonDetails(schedule,cell){
 const dayIndex=Number(cell.dataset.day),periodIndex=Number(cell.dataset.period),value=(schedule[SCHOOL_DAYS[dayIndex]]||[])[periodIndex],lesson=parseLesson(value);
 let modal=byId('interactiveScheduleDetail');
 if(!modal){modal=document.createElement('div');modal.id='interactiveScheduleDetail';modal.className='schedule-detail-overlay';document.body.appendChild(modal)}
 modal.innerHTML=`<div class="schedule-detail" role="dialog" aria-modal="true" aria-labelledby="scheduleDetailTitle"><button type="button" class="schedule-detail-close" aria-label="إغلاق">×</button><span class="schedule-detail-kicker">${SCHOOL_DAYS[dayIndex]} • الحصة ${PERIOD_LABELS[periodIndex][0]}</span><h3 id="scheduleDetailTitle">${value?safe(lesson.subject):'حصة متاحة'}</h3><p>${value?safe(lesson.person):'لا توجد مادة مسجلة في هذه الحصة.'}</p><div class="schedule-detail-time">⏰ ${PERIOD_LABELS[periodIndex][1]}</div>${value?`<button type="button" class="schedule-reminder-button" data-reminder>🔔 تذكير أثناء فتح الصفحة</button>`:''}</div>`;
 modal.classList.add('open');
 modal.querySelector('.schedule-detail-close').onclick=()=>modal.classList.remove('open');
 modal.onclick=event=>{if(event.target===modal)modal.classList.remove('open')};
 modal.querySelector('[data-reminder]')?.addEventListener('click',()=>saveReminder({day:dayIndex,period:periodIndex,label:cell.dataset.label,value}));
}

function readReminders(){
 try{const value=JSON.parse(localStorage.getItem('multaqa_schedule_reminders')||'[]');return Array.isArray(value)?value:[]}catch{return []}
}
function writeReminders(reminders){localStorage.setItem('multaqa_schedule_reminders',JSON.stringify(reminders))}
function reminderStamp(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Muscat',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
async function saveReminder(reminder){
 const reminders=readReminders().filter(x=>!(x.day===reminder.day&&x.period===reminder.period&&x.label===reminder.label));
 const now=currentPeriod();if(now.day===reminder.day&&now.period===reminder.period)reminder.last=reminderStamp();
 reminders.push(reminder);writeReminders(reminders);
 if('Notification'in window&&Notification.permission==='default')await Notification.requestPermission();
 if(typeof toast==='function')toast('🔔 تم حفظ التذكير أثناء فتح الصفحة');
 startReminderClock();
}
function startReminderClock(){
 if(reminderTimer)return;
 reminderTimer=setInterval(()=>{
  const now=currentPeriod();if(now.period<0||now.day<0||now.day>4)return;
  const reminders=readReminders(),stamp=reminderStamp();
  reminders.filter(x=>x.day===now.day&&x.period===now.period&&x.last!==stamp).forEach(item=>{
   item.last=stamp;try{new Audio('assets/notify-chime.mp3').play().catch(()=>{})}catch{}
   const lesson=parseLesson(item.value);if('Notification'in window&&Notification.permission==='granted')try{new Notification('بدأت الحصة',{body:`${lesson.subject} — ${item.label}`,icon:'school-logo.png'})}catch{}
   if(typeof toast==='function')toast(`🔔 بدأت ${lesson.subject} — ${item.label}`);
  });
  writeReminders(reminders);
 },30000);
}

async function renderPublicSchedule(){
 renderDayTabs();
 const select=byId('scheduleItem'),index=Number(select?.value||0),row=rows()[index];if(!row)return;
 state.selected=index;
 const root=byId('scheduleTextView');root.innerHTML=interactiveMarkup(row.schedule||{},rowName(row));bindLessonClicks(root,row.schedule||{});
}

window.fillScheduleOptions=async preferred=>{
 const requestId=++fillRequestId;
 try{
  installControls();await scheduleData();if(requestId!==fillRequestId)return;
  state.type=byId('scheduleType')?.value||'classes';state.grade='all';state.query='';if(byId('scheduleSearch'))byId('scheduleSearch').value='';refreshOptions(preferred);
 }catch{if(requestId===fillRequestId&&byId('scheduleTextView'))byId('scheduleTextView').innerHTML='<div class="schedule-empty">تعذر تحميل الجداول الجديدة. أعيدي المحاولة.</div>'}
};
window.renderSchedulePage=renderPublicSchedule;

if(typeof window.renderSecureSchedule==='function'){
 window.renderSecureSchedule=async()=>{
  const chosen=secureAdmin()?S('adminScheduleTeacher')?.value||'':'';
  const d=await staffApi('teacher_schedule',chosen?{employee_name:chosen}:{}),row=d.schedule||{},schedule=row.schedule||{};
  const picker=secureAdmin()?'<label class="schedule-picker">عرض جدول معلمة<select id="adminScheduleTeacher" onchange="renderSecureSchedule()"><option value="">جدولي</option>'+secureDirectory.employees.filter(x=>x.kind==='teacher').map(x=>'<option '+(chosen===x.full_name?'selected':'')+'>'+esc(x.full_name)+'</option>').join('')+'</select></label>':'';
  const importCard=secureAdmin()?'<section class="staff-card schedule-import-card"><h3>📥 استيراد جدول العام الدراسي الجديد</h3><p class="staff-help">يستورد جدول جميع الصفوف والمعلمات من الملف الرسمي (٣١ صفًا و٦٤ جدول معلمة)، ويستبدل الجدول الحالي لأي صف أو معلمة موجودة في الملف.</p><button class="staff-primary" onclick="importOfficialSchedule()">استيراد الجدول الآن</button><div id="scheduleImportResult"></div></section>':'';
  const pane=S('staffPane');pane.innerHTML='<div class="today-title"><div><small>الجدول الأسبوعي الرسمي'+(row.page?' • صفحة '+row.page:'')+'</small><h2>📚 جدول '+esc(d.employee.short_name||d.employee.full_name)+'</h2></div>'+picker+'</div><div id="secureInteractiveSchedule" class="secure-interactive-schedule"></div>'+importCard;
  const root=S('secureInteractiveSchedule');root.innerHTML=weeklyMarkup(schedule,d.employee.short_name||d.employee.full_name);bindLessonClicks(root,schedule);
 };
}

startReminderClock();
})();
