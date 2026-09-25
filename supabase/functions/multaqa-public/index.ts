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
const muscatNow=()=>new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Muscat"}));
const dayName=()=>omDays[muscatNow().getDay()];
let vapidReady=false;
async function pushConfig(db:any){const {data}=await db.from("multaqa_push_config").select("public_key,private_key,subject,scheduler_secret").eq("singleton",true).maybeSingle();return data||null}
async function prepareWebPush(db:any){if(vapidReady)return true;const c=await pushConfig(db);if(!c?.public_key||!c?.private_key)return false;webpush.setVapidDetails(c.subject||"mailto:notifications@under-palm-tree.com",c.public_key,c.private_key);vapidReady=true;return true}

async function resolveEmployee(db:any,input:string){
  const q=norm(input); if(!q) return null;
  const {data}=await db.from("multaqa_employees").select("full_name,short_name,role,kind,teacher_page");
  const rows=data||[];
  let m=rows.filter((e:any)=>norm(e.short_name)===q||norm(e.full_name)===q);
  if(m.length===1)return m[0];
  const p=clean(input,220).replace(/^أ\.\s*/,"").split(/\s+/).filter(Boolean); if(p.length<2)return null;
  const f=norm(p[0]),l=norm(p[p.length-1]);
  m=rows.filter((e:any)=>{const t=clean(e.full_name,220).split(/\s+/).filter(Boolean).map(norm);return t[0]===f&&t[t.length-1]===l});
  return m.length===1?m[0]:null;
}
async function dutyRow(db:any,day:string){const {data}=await db.from("multaqa_duty").select("day_name,teachers,admins").eq("day_name",day).maybeSingle();return data||null}
function onDuty(emp:any,d:any){if(!emp||!d)return false;const names=[emp.full_name,emp.short_name].map(norm);return [...(d.teachers||[]),...(d.admins||[])].some((x:any)=>names.includes(norm(x))||names.some(n=>norm(x).includes(n)||n.includes(norm(x))))}
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
    const {data,error}=await db.from("multaqa_teacher_schedules").select("full_name,page,schedule").eq("full_name",emp.full_name).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500); if(!data)return json({ok:false,error:"not_found"},404); return json({ok:true,...data});
  }
  if(action==="class_schedule"){
    const label=clean(body.class_label,80); const {data,error}=await db.from("multaqa_class_schedules").select("class_label,page,schedule").eq("class_label",label).maybeSingle();
    if(error)return json({ok:false,error:"server_error"},500); if(!data)return json({ok:false,error:"not_found"},404); return json({ok:true,...data});
  }
  if(action==="duty_for_name"){
    const emp=await resolveEmployee(db,clean(body.name,220)); if(!emp)return json({ok:false,error:"not_found"},404);
    const {data,error}=await db.from("multaqa_duty").select("day_name,teachers,admins"); if(error)return json({ok:false,error:"server_error"},500);
    const matches=(data||[]).filter((d:any)=>onDuty(emp,d)).map((d:any)=>({day_name:d.day_name,is_admin:(d.admins||[]).some((x:any)=>norm(x)===norm(emp.short_name)||norm(x)===norm(emp.full_name))}));
    return json({ok:true,employee:emp.short_name,today:dayName(),matches});
  }
  if(action==="content"){
    const type=clean(body.content_type,40); let q=db.from("multaqa_content").select("id,content_type,title,body,media_url,event_date,test_name,subject,day_name,sort_order,created_at").eq("published",true).order("sort_order").order("created_at",{ascending:false});
    if(type&&type!=="all")q=q.eq("content_type",type); const {data,error}=await q; if(error)return json({ok:false,error:"server_error"},500); return json({ok:true,items:data||[]});
  }
  if(action==="calendar_events"){
    const {data,error}=await db.from("multaqa_calendar_events").select("id,title,event_date,event_time,details,reminder_days,audience").eq("published",true).order("event_date",{ascending:true}).limit(300);if(error)return json({ok:false,error:"server_error"},500);return json({ok:true,items:data||[]});
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
    const [{data:att},{data:badges}]=await Promise.all([
      db.from("multaqa_student_attendance").select("attendance_date,status").eq("student_school_id",schoolId).eq("period",0).gte("attendance_date",since).order("attendance_date"),
      db.from("multaqa_student_badges").select("badge_label,note,awarded_at").eq("student_school_id",schoolId).gte("awarded_at",since+"T00:00:00").order("awarded_at",{ascending:false})
    ]);
    const counts:Record<string,number>={present:0,absent:0,late:0,excused:0,permission:0};
    (att||[]).forEach((x:any)=>{if(counts[x.status]!=null)counts[x.status]++});
    return json({ok:true,student:{name:student.name,class_name:student.class_name},from:since,attendance:{days:att||[],counts},badges:badges||[]});
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
    const emp=await resolveEmployee(db,clean(body.employee_name,220)); if(!emp)return json({ok:false,error:"not_found"},404); const {data,error}=await db.from("multaqa_duty_tracking").select("id,duty_day,event_type,class_label,round_status,note,occurred_at").eq("employee_name",emp.short_name).order("occurred_at",{ascending:false}).limit(60); if(error)return json({ok:false,error:"server_error"},500); return json({ok:true,events:data||[]});
  }
  if(action==="scheduled_push"){
    const secret=clean(body.secret,100),cfg=await pushConfig(db); if(!cfg?.scheduler_secret||secret!==cfg.scheduler_secret)return json({ok:false,error:"forbidden"},403);
    const now=muscatNow(),day=dayName(),today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()); const hh=now.getHours(),mm=now.getMinutes(); let sent=0;
    if(!["الجمعة","السبت"].includes(day)&&hh===12&&mm>=18&&mm<=22){const d=await dutyRow(db,day); if(d)sent+=await pushTo(db,[...(d.teachers||[]),...(d.admins||[])],"مناوبة اليوم",`لديكِ مناوبة اليوم — ${day}. بدأت الحصة الأولى الساعة 12:20 م.`,"/school/","duty");}
    if(hh===8&&mm<=9){
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