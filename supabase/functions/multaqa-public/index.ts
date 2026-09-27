import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const cors={
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Content-Type":"application/json; charset=utf-8"
};
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:cors});
const clean=(v:unknown,max=500)=>String(v??"").trim().slice(0,max);
const digits=(v:unknown)=>clean(v,40).replace(/\D/g,"");
const phoneOk=(v:string)=>/^\d{8}$/.test(v);
const idOk=(v:string)=>/^\d{8,20}$/.test(v);
const norm=(v:unknown)=>clean(v,220).replace(/^أ\.\s*/,"").replace(/[إأآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/ـ/g,"").replace(/[ًٌٍَُِّْ]/g,"").replace(/\s+/g," ").toLowerCase();
const shortName=(v:string)=>{const t=clean(v,220).replace(/^أ\.\s*/,"").split(/\s+/).filter(Boolean);return t.length>1?`${t[0]} ${t[t.length-1]}`:(t[0]||v)};
const omDays=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const teacherScheduleName=(e:any)=>e?.short_name||e?.full_name||"";
const DUTY_SLOT_INFO:Record<string,{label:string,time:string,count:number,note:string}>={
 morning:{label:"المناوبة الصباحية — استقبال الطلبة",time:"10:45",count:3,note:"استقبال الطلبة"},
 entry1:{label:"نقطة الدخول ح١",time:"11:50",count:1,note:"منع التداخل مع طلاب المدرسة الصباحية والالتزام بالطابور"},
 entry2:{label:"نقطة الدخول ح٢",time:"11:50",count:1,note:"منع التداخل مع طلاب المدرسة الصباحية والالتزام بالطابور"},
 coop:{label:"فسحة الجمعية",time:"14:40",count:2,note:"تنظيم الطلبة عند الشـراء"},
 shade:{label:"فسحة المظلة",time:"14:40",count:2,note:"تنظيم الطلبة والحث على النظافة"},
 corridors:{label:"فسحة الممرات",time:"14:40",count:1,note:"التأكد من خلو الفصول ومتابعة الممرات العلوية خصوصًا"},
 buses:{label:"المسائية — الحافلات",time:"16:40",count:2,note:"الوصول قبل الموعد بخمس دقائق"},
 cars:{label:"المسائية — السيارات الخاصة",time:"16:40",count:1,note:"لا يخرج الطالب إلا مع تصريح"}
};
const DUTY_SLOT_KEYS=["morning","entry1","entry2","coop","shade","corridors","buses","cars"];
const DUTY_PERIODS=[{period:1,start:"12:20",alert:"12:15",minute:735},{period:2,start:"12:55",alert:"12:50",minute:770},{period:3,start:"13:30",alert:"13:25",minute:805},{period:4,start:"14:05",alert:"14:00",minute:840},{period:5,start:"15:00",alert:"14:55",minute:895},{period:6,start:"15:35",alert:"15:30",minute:930},{period:7,start:"16:10",alert:"16:05",minute:965}];
const muscatNow=()=>new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Muscat"}));
const dayName=()=>omDays[muscatNow().getDay()];
let vapidReady=false;
async function pushConfig(db:any){const {data}=await db.from("multaqa_push_config").select("public_key,private_key,subject,scheduler_secret").eq("singleton",true).maybeSingle();return data||null}
async function prepareWebPush(db:any){if(vapidReady)return true;const c=await pushConfig(db);if(!c?.public_key||!c?.private_key)return false;webpush.setVapidDetails(c.subject||"mailto:notifications@under-palm-tree.com",c.public_key,c.private_key);vapidReady=true;return true}

async function resolveEmployee(db:any,input:string){
  const q=norm(input); if(!q) return null;
  const {data}=await db.from("multaqa_employees").select("employee_id,full_name,short_name,role,kind,access_group,teacher_page");
  const rows=data||[];
  const aliases:Record<string,string>={[norm("تىهانى اسماعيل")]:"T015",[norm("تهاني حجازي")]:"T015",[norm("رزان السوطية")]:"T021",[norm("زينب الحبسية")]:"T024",[norm("سلامه الحارثية")]:"T032",[norm("لمياء حسانين")]:"T047"};
  const aliasId=aliases[q];if(aliasId){const a=rows.find((e:any)=>e.employee_id===aliasId);if(a)return a}
  let m=rows.filter((e:any)=>norm(e.short_name)===q||norm(e.full_name)===q);
  if(m.length===1)return m[0];
  const p=clean(input,220).replace(/^أ\.\s*/,"").split(/\s+/).filter(Boolean); if(p.length<2)return null;
  const f=norm(p[0]),l=norm(p[p.length-1]);
  m=rows.filter((e:any)=>{const t=clean(e.full_name,220).split(/\s+/).filter(Boolean).map(norm);return t[0]===f&&t[t.length-1]===l});
  return m.length===1?m[0]:null;
}
async function dutyRow(db:any,day:string){const {data}=await db.from("multaqa_duty").select("day_name,teachers,admins,slots").eq("day_name",day).maybeSingle();return data||null}
function onDuty(emp:any,d:any){if(!emp||!d)return false;const names=[emp.full_name,emp.short_name].map(norm);return [...(d.teachers||[]),...(d.admins||[])].some((x:any)=>names.includes(norm(x))||names.some(n=>norm(x).includes(n)||n.includes(norm(x))))}
function employeeForDutyName(name:string,emps:any[]){const q=norm(name);let found=emps.filter((e:any)=>norm(e.short_name)===q||norm(e.full_name)===q);if(found.length===1)return found[0];const parts=clean(name,220).split(/\s+/).filter(Boolean);if(parts.length<2)return null;const first=norm(parts[0]),last=norm(parts[parts.length-1]);found=emps.filter((e:any)=>{const words=clean(e.full_name||e.short_name,220).split(/\s+/).filter(Boolean);return norm(words[0])===first&&norm(words[words.length-1])===last});return found.length===1?found[0]:null}
async function dutyBetweenAssignments(db:any,day:string,slots:any,date:string){
 const [{data:emps},{data:schedules},{data:attendance},{data:permissions},{data:coverage}]=await Promise.all([
  db.from("multaqa_employees").select("employee_id,full_name,short_name,kind").eq("kind","teacher"),
  db.from("multaqa_teacher_schedules").select("full_name,schedule"),
  db.from("multaqa_teacher_attendance").select("employee_id,status").eq("attendance_date",date).in("status",["absent","full_exit","official_task","leave"]),
  db.from("multaqa_teacher_permissions").select("employee_id,from_period,to_period").eq("permission_date",date).eq("status","approved"),
  db.from("multaqa_substitute_assignments").select("replacement_employee_id,period").eq("coverage_date",date).in("status",["assigned","accepted"])
 ]);
 const teachers=emps||[],scheduleByName=new Map((schedules||[]).map((x:any)=>[norm(x.full_name),x.schedule||{}])),namesFor=(keys:string[])=>keys.flatMap(k=>Array.isArray(slots?.[k])?slots[k]:[]);
 const excludedIds=new Set(namesFor(["morning","buses","cars"]).map((n:string)=>employeeForDutyName(n,teachers)?.employee_id).filter(Boolean)),preferredIds=new Set(namesFor(["entry1","entry2","coop","shade","corridors"]).map((n:string)=>employeeForDutyName(n,teachers)?.employee_id).filter(Boolean)),unavailableIds=new Set((attendance||[]).map((x:any)=>x.employee_id)),used=new Map<string,number>();
 const rows=teachers.map((e:any)=>{const schedule:any=scheduleByName.get(norm(teacherScheduleName(e)))||scheduleByName.get(norm(e.short_name))||scheduleByName.get(norm(e.full_name));if(!schedule||excludedIds.has(e.employee_id)||unavailableIds.has(e.employee_id))return null;const todaySlots:any[]=schedule[day]||[],daily=todaySlots.filter((x:any)=>clean(x,500)).length;return{employee_id:e.employee_id,name:e.short_name||e.full_name,schedule:todaySlots,daily,preferred:preferredIds.has(e.employee_id)}}).filter(Boolean);
 return DUTY_PERIODS.map((period:any)=>{const free=(rows as any[]).filter((x:any)=>!clean(x.schedule[period.period-1],500)&&!(permissions||[]).some((q:any)=>q.employee_id===x.employee_id&&period.period>=Number(q.from_period||1)&&period.period<=Number(q.to_period||7))&&!(coverage||[]).some((q:any)=>q.replacement_employee_id===x.employee_id&&Number(q.period)===period.period));free.sort((x:any,y:any)=>{const xs=(used.get(x.employee_id)||0)*10000+(x.preferred?0:1000)+x.daily*10,ys=(used.get(y.employee_id)||0)*10000+(y.preferred?0:1000)+y.daily*10;return xs-ys||norm(x.name).localeCompare(norm(y.name),"ar")});const pick=free[0]||null;if(pick)used.set(pick.employee_id,(used.get(pick.employee_id)||0)+1);return{...period,employee_id:pick?.employee_id||null,teacher_name:pick?.name||null}});
}
async function pushTo(db:any,names:string[],title:string,body:string,url="/school/",kind="general"){
  if(!(await prepareWebPush(db)))return 0;
  const wanted=new Set(names.map(norm).filter(Boolean)); wanted.add(norm("ثرياء الناعبية"));
  const {data:subs}=await db.from("multaqa_push_subscriptions").select("id,employee_name,endpoint,p256dh,auth").eq("enabled",true);
  let sent=0;
  for(const s of subs||[]){
    if(!wanted.has(norm(s.employee_name)))continue;
    try{
      await webpush.sendNotification({endpoint:s.endpoint,keys:{p256dh:s.p256dh,auth:s.auth}},JSON.stringify({title,body,url,kind}),{TTL:86400});
      sent++;
      await db.from("multaqa_notification_log").insert({employee_name:s.employee_name,title,body,url,kind,success:true});
    }catch(e:any){
      const code=e?.statusCode||0;
      if(code===404||code===410)await db.from("multaqa_push_subscriptions").update({enabled:false,updated_at:new Date().toISOString()}).eq("id",s.id);
      await db.from("multaqa_notification_log").insert({employee_name:s.employee_name,title,body,url,kind,success:false});
    }
  }
  return sent;
}

Deno.serve(async(req)=>{
  if(req.method==="OPTIONS") return new Response("ok",{headers:cors});
  if(req.method!=="POST") return json({ok:false,error:"method_not_allowed"},405);
  let body:any={}; try{body=await req.json()}catch{return json({ok:false,error:"invalid_json"},400)}
  const action=clean(body.action,50);
  const url=Deno.env.get("SUPABASE_URL")!;
  const key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const db=createClient(url,key,{auth:{persistSession:false}});

  if(action==="identify_employee"){
    const emp=await resolveEmployee(db,clean(body.name,220));
    if(!emp)return json({ok:false,error:"not_found"},404);
    return json({ok:true,employee:{full_name:emp.full_name,short_name:emp.short_name,role:emp.role,kind:emp.kind,teacher_page:emp.teacher_page}});
  }
  if(action==="teacher_names"){
    const {data,error}=await db.from("multaqa_employees").select("full_name,short_name").eq("kind","teacher").order("full_name");
    if(error)return json({ok:false,error:"server_error"},500); return json({ok:true,teachers:data||[]});
  }
  if(action==="class_names"){
    const {data,error}=await db.from("multaqa_class_schedules").select("class_label,page").order("page");
    if(error)return json({ok:false,error:"server_error"},500); return json({ok:true,classes:data||[]});
  }
  if(action==="teacher_schedule"){
    const emp=await resolveEmployee(db,clean(body.name,220)); if(!emp||emp.kind!=="teacher")return json({ok:false,error:"not_found"},404);
    const q=Number.isInteger(emp.teacher_page)
      ? db.from("multaqa_teacher_schedules").select("full_name,page,schedule").eq("page",emp.teacher_page).maybeSingle()
      : db.from("multaqa_teacher_schedules").select("full_name,page,schedule").in("full_name",[...new Set([teacherScheduleName(emp),emp.short_name,emp.full_name].map((x:any)=>clean(x,220)).filter(Boolean))]).limit(1).maybeSingle();
    const {data,error}=await q;
    if(error)return json({ok:false,error:"server_error"},500); if(!data)return json({ok:false,error:"not_found"},404); return json({ok:true,...data});
  }
  if(action==="class_schedule"){
    const label=clean(body.class_label,80); const {data,error}=await db.from("multaqa_class_schedules").select("class_label,page,schedule").eq("class_label",label).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500); if(!data)return json({ok:false,error:"not_found"},404); return json({ok:true,...data});
  }
  if(action==="duty_for_name"){
    const emp=await resolveEmployee(db,clean(body.name,220)); if(!emp)return json({ok:false,error:"not_found"},404);
    const {data,error}=await db.from("multaqa_duty").select("day_name,teachers,admins,slots"); if(error)return json({ok:false,error:"server_error"},500);
    const matches=(data||[]).filter((d:any)=>onDuty(emp,d)).map((d:any)=>({day_name:d.day_name,is_admin:(d.admins||[]).some((x:any)=>norm(x)===norm(emp.short_name)||norm(x)===norm(emp.full_name)),roles:DUTY_SLOT_KEYS.filter(k=>(d.slots?.[k]||[]).some((n:string)=>norm(n)===norm(emp.short_name)||norm(n)===norm(emp.full_name)))}));
    return json({ok:true,employee:emp.short_name,today:dayName(),matches});
  }
  if(action==="duty_schedule"){
    const requested=clean(body.day_name,20),day=omDays.slice(0,5).includes(requested)?requested:dayName(),d=await dutyRow(db,day);if(!d)return json({ok:false,error:"not_found"},404);
    const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()),between=day===dayName()?await dutyBetweenAssignments(db,day,d.slots||{},today):[];
    return json({ok:true,day:{...d,between_periods:between},slot_info:DUTY_SLOT_INFO,slot_keys:DUTY_SLOT_KEYS});
  }
  if(action==="content"){
    const type=clean(body.content_type,40); let q=db.from("multaqa_content").select("id,content_type,title,body,media_url,event_date,test_name,subject,day_name,sort_order,created_at").eq("published",true).order("sort_order").order("created_at",{ascending:false});
    if(type&&type!=="all")q=q.eq("content_type",type); const {data,error}=await q; if(error)return json({ok:false,error:"server_error"},500);
    const items=await Promise.all((data||[]).map(async(x:any)=>{
      if(x.content_type==="gallery"&&x.media_url&&!/^https?:\/\//.test(x.media_url)){
        const {data:u}=await db.storage.from("gallery-art").createSignedUrl(x.media_url,3600);
        return {...x,media_url:u?.signedUrl||null};
      }
      if(x.content_type==="news"&&x.media_url&&!/^https?:\/\//.test(x.media_url)){
        const path=String(x.media_url),ext=(path.split(".").pop()||"").toLowerCase(),media_kind=ext==="pdf"?"pdf":["mp4","webm","mov"].includes(ext)?"video":"image";
        const {data:u}=await db.storage.from("school-content-media").createSignedUrl(path,3600);
        return {...x,media_url:u?.signedUrl||null,media_kind};
      }
      if(x.content_type==="news"&&x.media_url){
        const path=String(x.media_url).split("?")[0],ext=(path.split(".").pop()||"").toLowerCase(),media_kind=ext==="pdf"?"pdf":["mp4","webm","mov"].includes(ext)?"video":"image";
        return {...x,media_kind};
      }
      return x;
    }));
    return json({ok:true,items});
  }
  if(action==="calendar_events"){
    const {data,error}=await db.from("multaqa_calendar_events").select("id,title,event_date,event_time,details,reminder_days,audience,source_kind").eq("published",true).order("event_date",{ascending:true}).limit(300);if(error)return json({ok:false,error:"server_error"},500);return json({ok:true,items:data||[]});
  }
  if(action==="active_emergency"){
    const {data,error}=await db.from("multaqa_emergency_alerts").select("id,title,body,severity,repeat_minutes,started_at").eq("active",true).order("started_at",{ascending:false}).limit(1).maybeSingle();if(error)return json({ok:false,error:"server_error"},500);return json({ok:true,alert:data||null});
  }
  if(action==="verify_student"){
    const schoolId=digits(body.school_id),phone=digits(body.guardian_phone),studentName=clean(body.student_name,220);
    if(!idOk(schoolId))return json({ok:false,error:"invalid_input"},400);
    const {data,error}=await db.from("multaqa_students").select("school_id,name,class_name,guardian_phone").eq("school_id",schoolId).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500); if(!data)return json({ok:false,error:"not_found"},404);
    const saved=digits(data.guardian_phone); const verified=saved?phoneOk(phone)&&phone===saved:studentName&&norm(studentName)===norm(data.name);
    if(!verified)return json({ok:false,error:"verification_failed"},403);
    return json({ok:true,student:{school_id:data.school_id,name:data.name,class_name:data.class_name}});
  }
  if(action==="weekly_report"){
    const schoolId=digits(body.school_id),phone=digits(body.guardian_phone),studentName=clean(body.student_name,220);
    if(!idOk(schoolId))return json({ok:false,error:"invalid_input"},400);
    const {data:student,error}=await db.from("multaqa_students").select("school_id,name,class_name,guardian_phone").eq("school_id",schoolId).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500);if(!student)return json({ok:false,error:"not_found"},404);
    const saved=digits(student.guardian_phone),verified=saved?phoneOk(phone)&&phone===saved:studentName&&norm(studentName)===norm(student.name);
    if(!verified)return json({ok:false,error:"verification_failed"},403);
    const since=new Date(Date.now()-7*86400000).toISOString().slice(0,10);
    const [{data:att},{data:badges},{data:homework}]=await Promise.all([
      db.from("multaqa_student_attendance").select("attendance_date,status").eq("student_school_id",schoolId).eq("period",0).gte("attendance_date",since).order("attendance_date"),
      db.from("multaqa_student_badges").select("badge_label,note,awarded_at").eq("student_school_id",schoolId).gte("awarded_at",since+"T00:00:00").order("awarded_at",{ascending:false}),
      db.from("multaqa_homework").select("subject,description,homework_date").eq("class_name",student.class_name).gte("homework_date",since).order("homework_date",{ascending:false})
    ]);
    const counts:Record<string,number>={present:0,absent:0,late:0,excused:0,permission:0};
    (att||[]).forEach((x:any)=>{if(counts[x.status]!=null)counts[x.status]++});
    return json({ok:true,student:{name:student.name,class_name:student.class_name},from:since,attendance:{days:att||[],counts},badges:badges||[],homework:homework||[]});
  }
  if(action==="resource_diary_public"){
    const resourceKey=clean(body.resource_key,40);if(!resourceKey)return json({ok:false,error:"invalid_input"},400);
    const {data,error}=await db.from("multaqa_resource_diary").select("id,caption,photo_path,media_url,created_at").eq("resource_key",resourceKey).order("created_at",{ascending:false}).limit(30);
    if(error)return json({ok:false,error:"server_error"},500);
    const items=await Promise.all((data||[]).map(async(x:any)=>{let photo_url=null;if(x.photo_path){const {data:u}=await db.storage.from("resource-diary-media").createSignedUrl(x.photo_path,3600);photo_url=u?.signedUrl||null}return{id:x.id,caption:x.caption,photo_url,media_url:x.media_url,created_at:x.created_at}}));
    return json({ok:true,items});
  }
  if(action==="honor_board"){
    const now=muscatNow(),since=new Date(now.getFullYear(),now.getMonth(),1).toISOString().slice(0,10);
    const {data,error}=await db.from("multaqa_student_badges").select("student_name,class_name").gte("awarded_at",since+"T00:00:00");
    if(error)return json({ok:false,error:"server_error"},500);
    const counts=new Map<string,{student_name:string,class_name:string,count:number}>();
    (data||[]).forEach((x:any)=>{const key=x.student_name+"|"+x.class_name,row=counts.get(key)||{student_name:x.student_name,class_name:x.class_name,count:0};row.count++;counts.set(key,row)});
    const items=[...counts.values()].sort((a,b)=>b.count-a.count).slice(0,15);
    return json({ok:true,items,month_label:new Intl.DateTimeFormat("ar-OM",{month:"long",year:"numeric",timeZone:"Asia/Muscat"}).format(now)});
  }
  if(action==="science_challenges"){
    const kind=clean(body.kind,10)==="lab"?"lab":"quiz",schoolId=digits(body.student_school_id);
    let q=db.from("multaqa_science_challenges").select("id,kind,level,title,subject,tools,materials,steps,sort_order").eq("published",true).eq("kind",kind).order("level").order("sort_order");
    const {data,error}=await q;if(error)return json({ok:false,error:"server_error"},500);
    let items=data||[];
    if(kind==="quiz"){
      let unlocked=1;
      if(idOk(schoolId)){
        const {data:passes}=await db.from("multaqa_science_attempts").select("challenge_id,passed").eq("student_school_id",schoolId).eq("passed",true);
        const passedIds=new Set((passes||[]).map((x:any)=>x.challenge_id));
        const levels=([...new Set(items.map((x:any)=>x.level))] as number[]).sort((a:number,b:number)=>a-b);
        for(const lv of levels){const chIds=items.filter((x:any)=>x.level===lv).map((x:any)=>x.id);if(chIds.some((id:number)=>passedIds.has(id)))unlocked=lv+1;else break}
      }
      items=items.map((x:any)=>({...x,locked:x.level>unlocked}));
    }
    return json({ok:true,items});
  }
  if(action==="science_challenge"){
    const id=Number(body.id);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {data,error}=await db.from("multaqa_science_challenges").select("id,kind,level,title,subject,tools,materials,steps,questions").eq("id",id).eq("published",true).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500);if(!data)return json({ok:false,error:"not_found"},404);
    const questions=(Array.isArray(data.questions)?data.questions:[]).map((x:any)=>({q:x.q,choices:x.choices}));
    return json({ok:true,item:{...data,questions}});
  }
  if(action==="submit_science_attempt"){
    const id=Number(body.challenge_id),schoolId=digits(body.student_school_id),studentName=clean(body.student_name,220),className=clean(body.class_name,60);
    const answers=Array.isArray(body.answers)?body.answers:[];
    if(!id||!idOk(schoolId)||!studentName)return json({ok:false,error:"invalid_input"},400);
    const {data:ch,error}=await db.from("multaqa_science_challenges").select("id,questions").eq("id",id).eq("published",true).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500);if(!ch)return json({ok:false,error:"not_found"},404);
    const questions=Array.isArray(ch.questions)?ch.questions:[];
    let score=0;questions.forEach((q:any,i:number)=>{if(Number(answers[i])===Number(q.correct))score++});
    const total=questions.length,passed=total>0&&score/total>=0.7;
    const {error:insErr}=await db.from("multaqa_science_attempts").insert({id:Date.now(),challenge_id:id,student_school_id:schoolId,student_name:studentName,class_name:className||null,score,total,passed});
    if(insErr)return json({ok:false,error:"save_failed"},500);
    return json({ok:true,score,total,passed});
  }
  if(action==="bus_status"){
    const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat"}).format(new Date());
    const [{data:arrivals,error},{data:buses}]=await Promise.all([
      db.from("multaqa_bus_arrivals").select("route_name,arrived_at").eq("arrival_date",today),
      db.from("multaqa_buses").select("route_name,departure_label")
    ]);
    if(error)return json({ok:false,error:"server_error"},500);
    const arrivedMap=new Map((arrivals||[]).map((x:any)=>[x.route_name,x.arrived_at]));
    const items=(buses||[]).map((b:any)=>({route_name:b.route_name,departure_label:b.departure_label,arrived_at:arrivedMap.get(b.route_name)||null}));
    return json({ok:true,items});
  }
  if(action==="lost_items"){
    const {data,error}=await db.from("multaqa_lost_found").select("id,item_desc,found_location,photo_path,created_at").eq("status","open").order("created_at",{ascending:false}).limit(100);
    if(error)return json({ok:false,error:"server_error"},500);
    const items=await Promise.all((data||[]).map(async(x:any)=>{let photo_url=null;if(x.photo_path){const {data:u}=await db.storage.from("lost-found-photos").createSignedUrl(x.photo_path,3600);photo_url=u?.signedUrl||null}return{id:x.id,item_desc:x.item_desc,found_location:x.found_location,created_at:x.created_at,photo_url}}));
    return json({ok:true,items});
  }
  if(action==="teacher_meeting_slots"){
    const emp=await resolveEmployee(db,clean(body.teacher_name,220));if(!emp||emp.kind!=="teacher")return json({ok:false,error:"not_found"},404);
    const {data:full}=await db.from("multaqa_employees").select("employee_id").eq("full_name",emp.full_name).maybeSingle();if(!full)return json({ok:false,error:"not_found"},404);
    const {data,error}=await db.from("multaqa_meeting_slots").select("id,slot_date,slot_time").eq("employee_id",full.employee_id).eq("status","open").gte("slot_date",new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat"}).format(new Date())).order("slot_date").order("slot_time").limit(60);
    if(error)return json({ok:false,error:"server_error"},500);return json({ok:true,teacher:emp.short_name,items:data||[]});
  }
  if(action==="book_meeting_slot"){
    const slotId=clean(body.slot_id,60),schoolId=digits(body.school_id),phone=digits(body.guardian_phone),studentName=clean(body.student_name,220);
    if(!slotId||!idOk(schoolId))return json({ok:false,error:"invalid_input"},400);
    const {data:student,error:se}=await db.from("multaqa_students").select("school_id,name,class_name,guardian_phone").eq("school_id",schoolId).maybeSingle();
    if(se)return json({ok:false,error:"server_error"},500);if(!student)return json({ok:false,error:"not_found"},404);
    const saved=digits(student.guardian_phone),verified=saved?phoneOk(phone)&&phone===saved:studentName&&norm(studentName)===norm(student.name);
    if(!verified)return json({ok:false,error:"verification_failed"},403);
    const {data:slot}=await db.from("multaqa_meeting_slots").select("id,employee_id,slot_date,slot_time,status").eq("id",slotId).maybeSingle();
    if(!slot)return json({ok:false,error:"not_found"},404);if(slot.status!=="open")return json({ok:false,error:"already_booked"},409);
    const {data:updated,error:ue}=await db.from("multaqa_meeting_slots").update({status:"booked",booked_student_school_id:student.school_id,booked_student_name:student.name,booked_guardian_phone:phone||saved}).eq("id",slotId).eq("status","open").select("id").maybeSingle();
    if(ue)return json({ok:false,error:"server_error"},500);if(!updated)return json({ok:false,error:"already_booked"},409);
    const {data:teacher}=await db.from("multaqa_employees").select("short_name,full_name").eq("employee_id",slot.employee_id).maybeSingle();
    if(teacher)await pushTo(db,[teacher.short_name||teacher.full_name],"📅 حجز موعد اجتماع",`ولي أمر ${student.name} (${student.class_name}) حجز موعدًا يوم ${slot.slot_date} الساعة ${slot.slot_time}`,"/school/","meeting_booked");
    return json({ok:true,slot_date:slot.slot_date,slot_time:slot.slot_time});
  }
  if(action==="submit_request"){
    const serviceId=clean(body.service_id,50),serviceTitle=clean(body.service_title,100),targetGroup=clean(body.target_group,50);
    const schoolId=digits(body.school_id),phone=digits(body.guardian_phone),studentName=clean(body.student_name,220);
    const reason=clean(body.reason,240),details=clean(body.details,1500),category=clean(body.category,80)||null,teacherName=clean(body.teacher_name,220)||null,requestDate=clean(body.request_date,20)||null;
    if(!serviceId||!serviceTitle||!targetGroup||!idOk(schoolId)||reason.length<2||details.length<4)return json({ok:false,error:"invalid_input"},400);
    const {data:student,error:se}=await db.from("multaqa_students").select("school_id,name,class_name,guardian_phone").eq("school_id",schoolId).maybeSingle(); if(se)return json({ok:false,error:"server_error"},500); if(!student)return json({ok:false,error:"student_verification_failed"},403);
    const saved=digits(student.guardian_phone); if(saved?(phone!==saved):(norm(studentName)!==norm(student.name)))return json({ok:false,error:"student_verification_failed"},403);
    const targetMap:any={data:["أنيسه السيابيه","فاطمة البطاشيه"],resources:["أصيلة الوهيبيه"],social:["فخرية العامرية"],management:["بهيه الراشديه","سعاد الرواحيه","فتحية الهدابيه"],lab:["عبير المسلمية"],teacher:teacherName?[teacherName]:[]};
    const targets=targetMap[targetGroup]||targetMap.management;
    const trackingCode="DQ"+crypto.randomUUID().replace(/-/g,"").slice(0,8).toUpperCase();
    const payload={tracking_code:trackingCode,service_id:serviceId,service_title:serviceTitle,target_group:targetGroup,target_names:targets,student_school_id:student.school_id,student_name:student.name,class_name:student.class_name,guardian_phone:phone||saved,reason,details,category,teacher_name:teacherName,request_date:requestDate||null,sensitive:["social","complaint"].includes(serviceId),status:"pending"};
    const {error}=await db.from("multaqa_web_requests").insert(payload); if(error)return json({ok:false,error:"server_error"},500);
    await pushTo(db,targets,"طلب جديد من ولي أمر",`${serviceTitle} — ${student.name} — الصف ${student.class_name}`,"/school/","parent_request");
    return json({ok:true,tracking_code:trackingCode,student_name:student.name,class_name:student.class_name,target_names:targets,status:"pending"});
  }
  if(action==="track_request"){
    const code=clean(body.tracking_code,24).toUpperCase().replace(/[^A-Z0-9]/g,""),phone=digits(body.guardian_phone);
    if(!/^DQ[A-Z0-9]{6,16}$/.test(code)||!phoneOk(phone))return json({ok:false,error:"invalid_input"},400);
    const {data,error}=await db.from("multaqa_web_requests").select("tracking_code,service_title,status,student_name,class_name,target_names,request_date,created_at").eq("tracking_code",code).eq("guardian_phone",phone).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500); if(!data)return json({ok:false,error:"not_found"},404); return json({ok:true,request:data});
  }
  if(action==="staff_requests"){
    const emp=await resolveEmployee(db,clean(body.employee_name,220)); if(!emp)return json({ok:false,error:"not_found"},404);
    const {data,error}=await db.from("multaqa_web_requests").select("tracking_code,service_title,status,student_name,student_school_id,class_name,target_names,guardian_phone,reason,details,category,teacher_name,request_date,created_at,sensitive").order("created_at",{ascending:false}).limit(250);
    if(error)return json({ok:false,error:"server_error"},500); const owner=norm(emp.short_name)===norm("ثرياء الناعبية"); const arr=owner?(data||[]):(data||[]).filter((r:any)=>(r.target_names||[]).some((x:any)=>norm(x)===norm(emp.short_name)||norm(x)===norm(emp.full_name)||norm(x).includes(norm(emp.short_name)))); return json({ok:true,requests:arr});
  }
  if(action==="update_request_status"){
    const emp=await resolveEmployee(db,clean(body.employee_name,220)),code=clean(body.tracking_code,24).toUpperCase(),status=clean(body.status,20); if(!emp||!["pending","processing","done"].includes(status))return json({ok:false,error:"invalid_input"},400);
    const {data:r}=await db.from("multaqa_web_requests").select("target_names").eq("tracking_code",code).maybeSingle(); if(!r)return json({ok:false,error:"not_found"},404); const owner=norm(emp.short_name)===norm("ثرياء الناعبية"); const allowed=owner||(r.target_names||[]).some((x:any)=>norm(x)===norm(emp.short_name)||norm(x).includes(norm(emp.short_name))); if(!allowed)return json({ok:false,error:"forbidden"},403);
    const {error}=await db.from("multaqa_web_requests").update({status,updated_at:new Date().toISOString()}).eq("tracking_code",code); if(error)return json({ok:false,error:"server_error"},500); return json({ok:true});
  }
  if(action==="register_push"){
    const emp=await resolveEmployee(db,clean(body.employee_name,220)); const sub=body.subscription||{}; if(!emp||!sub.endpoint||!sub.keys?.p256dh||!sub.keys?.auth)return json({ok:false,error:"invalid_input"},400);
    const row={employee_name:emp.short_name,endpoint:clean(sub.endpoint,1000),p256dh:clean(sub.keys.p256dh,300),auth:clean(sub.keys.auth,300),user_agent:clean(body.user_agent,500),enabled:true,updated_at:new Date().toISOString()};
    const {error}=await db.from("multaqa_push_subscriptions").upsert(row,{onConflict:"endpoint"}); if(error)return json({ok:false,error:"server_error"},500); const cfg=await pushConfig(db);return json({ok:true,vapid_public_key:cfg?.public_key||""});
  }
  if(action==="duty_track"){
    const emp=await resolveEmployee(db,clean(body.employee_name,220)); if(!emp)return json({ok:false,error:"not_found"},404); const day=dayName(); const d=await dutyRow(db,day); if(!onDuty(emp,d))return json({ok:false,error:"not_on_duty_today"},403);
    const eventType=clean(body.event_type,20); if(!["start","round","issue","end"].includes(eventType))return json({ok:false,error:"invalid_event"},400); const classLabel=clean(body.class_label,80)||null,roundStatus=clean(body.round_status,80)||null,note=clean(body.note,1200)||null; if(eventType==="round"&&!classLabel)return json({ok:false,error:"class_required"},400);
    const {data,error}=await db.from("multaqa_duty_tracking").insert({employee_name:emp.short_name,duty_day:day,event_type:eventType,class_label:classLabel,round_status:roundStatus,note}).select("id,employee_name,duty_day,event_type,class_label,round_status,note,occurred_at").single(); if(error)return json({ok:false,error:"server_error"},500); return json({ok:true,event:data});
  }
  if(action==="duty_history"){
    const emp=await resolveEmployee(db,clean(body.employee_name,220)); if(!emp)return json({ok:false,error:"not_found"},404);
    const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()),from=`${today}T00:00:00+04:00`,next=new Date(`${today}T00:00:00+04:00`);next.setDate(next.getDate()+1);const to=next.toISOString();
    const [{data,error},{data:evaluation}]=await Promise.all([
      db.from("multaqa_duty_tracking").select("id,duty_day,event_type,class_label,round_status,note,occurred_at").eq("employee_name",emp.short_name).order("occurred_at",{ascending:false}).limit(60),
      db.from("multaqa_duty_evaluations").select("attendance_status,effectiveness,reason,updated_at").eq("employee_name",emp.short_name).eq("duty_date",today).maybeSingle()
    ]);
    if(error)return json({ok:false,error:"server_error"},500);const events=data||[],fromMs=new Date(from).getTime(),toMs=new Date(to).getTime(),ended_today=events.some((x:any)=>{const t=new Date(x.occurred_at).getTime();return x.event_type==="end"&&t>=fromMs&&t<toMs});
    return json({ok:true,events,ended_today,evaluation:evaluation||null});
  }
  if(action==="save_duty_evaluation"){
    const emp=await resolveEmployee(db,clean(body.employee_name,220));if(!emp)return json({ok:false,error:"not_found"},404);
    const day=dayName(),d=await dutyRow(db,day);if(!onDuty(emp,d))return json({ok:false,error:"not_on_duty_today"},403);
    const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()),from=`${today}T00:00:00+04:00`,next=new Date(`${today}T00:00:00+04:00`);next.setDate(next.getDate()+1);
    const {data:ended}=await db.from("multaqa_duty_tracking").select("id").eq("employee_name",emp.short_name).eq("event_type","end").gte("occurred_at",from).lt("occurred_at",next.toISOString()).limit(1);
    if(!(ended||[]).length)return json({ok:false,error:"duty_not_ended"},409);
    const attendance=clean(body.attendance_status,20),effectiveness=attendance==="absent"?"inactive":clean(body.effectiveness,20),reason=clean(body.reason,1200);
    if(!["committed","late","absent"].includes(attendance)||!["active","inactive"].includes(effectiveness))return json({ok:false,error:"invalid_input"},400);
    if((attendance!=="committed"||effectiveness==="inactive")&&!reason)return json({ok:false,error:"reason_required"},400);
    const {data:existing}=await db.from("multaqa_duty_evaluations").select("evaluation_source").eq("duty_date",today).eq("employee_name",emp.short_name).maybeSingle();
    if(existing?.evaluation_source==="supervisor")return json({ok:false,error:"evaluation_locked_by_supervisor"},409);
    const row={duty_date:today,employee_name:emp.short_name,attendance_status:attendance,effectiveness,reason:reason||null,evaluation_source:"self",updated_at:new Date().toISOString()};
    const {data,error}=await db.from("multaqa_duty_evaluations").upsert(row,{onConflict:"duty_date,employee_name"}).select("attendance_status,effectiveness,reason,updated_at").single();
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,evaluation:data});
  }
  if(action==="scheduled_push"){
    const secret=clean(body.secret,100),cfg=await pushConfig(db); if(!cfg?.scheduler_secret||secret!==cfg.scheduler_secret)return json({ok:false,error:"forbidden"},403);
    const now=muscatNow(),day=dayName(),today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()); const hh=now.getHours(),mm=now.getMinutes(); let sent=0;
    const minuteNow=hh*60+mm;
    if(!["الجمعة","السبت"].includes(day)){const d=await dutyRow(db,day);if(d){
      const staticAlerts=[
       {minute:645,key:"morning",title:"🦺 تبدأ المناوبة الصباحية",body:"الساعة 10:45 — الرجاء البدء باستقبال الطلبة."},
       {minute:710,key:"entry1",title:"🚪 نقطة الدخول ح١",body:"الساعة 11:50 — حث الطلبة على عدم التداخل مع طلاب المدرسة الصباحية والالتزام بالوقوف في الطابور."},
       {minute:710,key:"entry2",title:"🚪 نقطة الدخول ح٢",body:"الساعة 11:50 — حث الطلبة على عدم التداخل مع طلاب المدرسة الصباحية والالتزام بالوقوف في الطابور."},
       {minute:880,key:"coop",title:"🛍️ مناوبة فسحة الجمعية",body:"الساعة 2:40 — تنظيم الطلبة عند الشراء."},
       {minute:880,key:"shade",title:"🧹 مناوبة فسحة المظلة",body:"الساعة 2:40 — تنظيم الطلبة والحث على النظافة أمر ضروري."},
       {minute:880,key:"corridors",title:"🏫 مناوبة فسحة الممرات",body:"الساعة 2:40 — التأكد من خلو الفصول من الطلبة ومتابعة الممرات كاملة، وخصوصًا الممرات العلوية."},
       {minute:995,key:"buses",title:"🚌 المناوبة المسائية — الحافلات",body:"موعد المناوبة 4:40 — الرجاء الوصول الآن قبل الموعد بخمس دقائق."},
       {minute:995,key:"cars",title:"🚗 المناوبة المسائية — السيارات الخاصة",body:"موعد المناوبة 4:40 — الرجاء الوصول الآن، ولا يخرج أي طالب دون تصريح."}
      ];
      for(const alert of staticAlerts.filter(x=>x.minute===minuteNow)){const names=Array.isArray(d.slots?.[alert.key])?d.slots[alert.key]:[];if(names.length)sent+=await pushTo(db,names,alert.title,alert.body,"/school/?open=duty","duty_"+alert.key)}
      const period=DUTY_PERIODS.find(x=>x.minute===minuteNow);if(period){const assignments=await dutyBetweenAssignments(db,day,d.slots||{},today),current=assignments.find((x:any)=>x.period===period.period);if(current?.teacher_name)sent+=await pushTo(db,[current.teacher_name],`🔄 مناوبة ما بين الفصول — الحصة ${period.period}`,`تبدأ الحصة ${period.period} الساعة ${period.start}. الرجاء متابعة الممرات والفصول ومنع تداخل الطلبة.`,"/school/?open=duty","duty_between")}
    }}
    if(hh>=8){
      const {data:events}=await db.from("multaqa_calendar_events").select("*").eq("published",true).is("reminder_sent_at",null);const {data:emps}=await db.from("multaqa_employees").select("full_name,short_name,kind,access_group");
      for(const ev of events||[]){const due=new Date(`${ev.event_date}T12:00:00+04:00`);due.setDate(due.getDate()-Number(ev.reminder_days||0));const dueDate=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(due);if(dueDate!==today)continue;const names=(emps||[]).filter((x:any)=>ev.audience==="all"||(ev.audience==="teachers"&&x.kind==="teacher")||(ev.audience==="management"&&["admin","management"].includes(x.access_group))).map((x:any)=>x.short_name||x.full_name);const days=Number(ev.reminder_days||0),title=days===0?"📅 موعد اليوم":days===1?"⏰ تذكير لموعد الغد":`⏰ تذكير قبل ${days} أيام`;const count=await pushTo(db,names,title,`${ev.title} — ${ev.event_date}${ev.event_time?" • "+String(ev.event_time).slice(0,5):""}`,"/school/","calendar_event");sent+=count;if(count>0)await db.from("multaqa_calendar_events").update({reminder_sent_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",ev.id)}
    }
    if(hh>=6&&hh<=12){
      const {data:coverage}=await db.from("multaqa_substitute_assignments").select("id,period,class_label,subject,replacement_employee_id").eq("coverage_date",today).in("status",["assigned","accepted"]).not("replacement_employee_id","is",null).not("notified_at","is",null).is("reminder_sent_at",null).order("period");
      const employeeIds=[...new Set((coverage||[]).map((x:any)=>x.replacement_employee_id))];
      if(employeeIds.length){const {data:emps}=await db.from("multaqa_employees").select("employee_id,full_name,short_name").in("employee_id",employeeIds),names=new Map((emps||[]).map((x:any)=>[x.employee_id,x.short_name||x.full_name]));for(const employeeId of employeeIds){const rows=(coverage||[]).filter((x:any)=>x.replacement_employee_id===employeeId),name=names.get(employeeId);if(!name)continue;const details=rows.map((x:any)=>`الحصة ${x.period} — ${x.class_label}${x.subject?" • "+x.subject:""}`).join(" | ");sent+=await pushTo(db,[name],"🔔 تذكير بحصص الاحتياط اليوم",details,"/school/?open=schedule","coverage_reminder")}await db.from("multaqa_substitute_assignments").update({reminder_sent_at:new Date().toISOString(),updated_at:new Date().toISOString()}).in("id",(coverage||[]).map((x:any)=>x.id))}
    }
    if(hh>=18){
      const {data:done}=await db.from("multaqa_substitute_assignments").select("id,period,class_label,subject,replacement_employee_id").eq("coverage_date",today).in("status",["assigned","accepted"]).not("replacement_employee_id","is",null).not("notified_at","is",null).is("achievement_recorded_at",null).order("period");
      const employeeIds=[...new Set((done||[]).map((x:any)=>x.replacement_employee_id))],dateLabel=new Intl.DateTimeFormat("ar-OM",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Muscat"}).format(new Date(`${today}T12:00:00+04:00`)),stamp=new Date().toISOString();
      for(const employeeId of employeeIds){const rows=(done||[]).filter((x:any)=>x.replacement_employee_id===employeeId),{data:profile}=await db.from("multaqa_employee_profiles").select("achievements").eq("employee_id",employeeId).maybeSingle(),lessonText=rows.map((x:any)=>`الحصة ${x.period} (${x.class_label})`).join("، "),entry=`تغطية حصص احتياط — ${dateLabel}: ${lessonText}`,achievements=Array.isArray(profile?.achievements)?profile.achievements:[];if(!achievements.includes(entry))await db.from("multaqa_employee_profiles").upsert({employee_id:employeeId,achievements:[...achievements,entry],updated_at:stamp},{onConflict:"employee_id"})}
      if((done||[]).length)await db.from("multaqa_substitute_assignments").update({status:"completed",completed_at:stamp,achievement_recorded_at:stamp,updated_at:stamp}).in("id",(done||[]).map((x:any)=>x.id));
    }
    if(hh===8&&mm>=10&&mm<=20){
      const tomorrow=new Date(`${today}T12:00:00+04:00`);tomorrow.setDate(tomorrow.getDate()+1);const tomorrowStr=tomorrow.toISOString().slice(0,10);
      const {data:tasks}=await db.from("multaqa_meeting_tasks").select("id,task,due_date,assignee_employee_id,assignee_name").eq("due_date",tomorrowStr).eq("done",false).is("reminder_sent_at",null);
      for(const t of tasks||[]){
        if(!t.assignee_employee_id||!t.assignee_name)continue;
        const count=await pushTo(db,[t.assignee_name],"⏰ تذكير بمهمة من الاجتماع",`مهمة: ${t.task} — موعدها غدًا`,"/school/","meeting_task");
        if(count>0){sent+=count;await db.from("multaqa_meeting_tasks").update({reminder_sent_at:new Date().toISOString()}).eq("id",t.id)}
      }
    }
    if(hh===15&&mm<=5){
      const cutoff=new Date(Date.now()-20*3600*1000).toISOString();
      const {data:pending}=await db.from("multaqa_web_requests").select("tracking_code,service_title,target_names,student_name,class_name,created_at,reminder_sent_at,status").eq("status","pending").lt("created_at",cutoff).or(`reminder_sent_at.is.null,reminder_sent_at.lt.${cutoff}`);
      for(const r of pending||[]){
        const names=(r.target_names||[]) as string[];if(!names.length)continue;
        const count=await pushTo(db,names,"⏳ طلب بانتظار الرد",`${r.service_title} — ${r.student_name} (${r.class_name}) لم يُرد عليه بعد.`,"/school/","pending_request");
        if(count>0){sent+=count;await db.from("multaqa_web_requests").update({reminder_sent_at:new Date().toISOString()}).eq("tracking_code",r.tracking_code)}
      }
    }
    const {data:alert}=await db.from("multaqa_emergency_alerts").select("*").eq("active",true).order("started_at",{ascending:false}).limit(1).maybeSingle();
    if(alert){const last=alert.last_sent_at?new Date(alert.last_sent_at).getTime():0,due=Date.now()-last>=Number(alert.repeat_minutes||5)*60000;if(due){const {data:allEmps}=await db.from("multaqa_employees").select("short_name,full_name");const count=await pushTo(db,(allEmps||[]).map((x:any)=>x.short_name||x.full_name),"🚨 "+alert.title,alert.body,"/school/","emergency");sent+=count;if(count>0)await db.from("multaqa_emergency_alerts").update({last_sent_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",alert.id).eq("active",true)}}
    return json({ok:true,sent});
  }
  return json({ok:false,error:"unknown_action"},400);
});