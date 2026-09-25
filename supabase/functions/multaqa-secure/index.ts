import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2.4.3";
import webpush from "npm:web-push@3.6.7";

const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"content-type,x-staff-session","Access-Control-Allow-Methods":"POST,OPTIONS","Content-Type":"application/json; charset=utf-8"};
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:cors});
const clean=(v:unknown,max=1000)=>String(v??"").trim().slice(0,max);
const norm=(v:unknown)=>clean(v,220).replace(/^أ\.\s*/,"").replace(/[إأآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/ـ/g,"").replace(/[ًٌٍَُِّْ]/g,"").replace(/\s+/g," ").toLowerCase();
const pinOk=(v:string)=>/^\d{6,12}$/.test(v);
const omDays=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const RESOURCES=[{key:"resources_room",label:"غرفة المصادر"},{key:"lab",label:"المختبر"},{key:"activities_hall",label:"قاعة الأنشطة"},{key:"projector",label:"جهاز العرض"}];
const RESOURCE_OWNERS:Record<string,string>={resources_room:"أصيلة الوهيبية"};
const BADGES:Record<string,string>={star_week:"🌟 نجمة الأسبوع",reading:"📚 قارئة متميزة",teamwork:"🤝 روح التعاون",creativity:"🎨 إبداع",academic:"🧮 تفوق دراسي",behavior:"🕌 سلوك مثالي",helper:"🤲 يد العون",attendance:"✅ التزام الحضور"};
const gradeWords=["","الأول","الثاني","الثالث","الرابع","الخامس","السادس"];
const classCode=(label:string)=>{const t=clean(label,100),g=gradeWords.findIndex((x,i)=>i>0&&t.includes(x)),s=t.match(/[\/\\]\s*(\d+)/)?.[1];return g&&s?g+"/"+s:t};
const scheduleLabel=(code:string)=>{const m=clean(code,30).match(/^([1-6])\s*\/\s*(\d+)$/);return m?gradeWords[+m[1]]+" / "+m[2]:code};
const muscatDate=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Muscat",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
const dayFor=(d:string)=>omDays[new Date(`${d}T12:00:00+04:00`).getDay()];
const sha=async(v:string)=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(v)))).map(x=>x.toString(16).padStart(2,"0")).join("");
const randomToken=()=>{const a=new Uint8Array(32);crypto.getRandomValues(a);return btoa(String.fromCharCode(...a)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")};
const randomPin=()=>String(100000+Math.floor(Math.random()*900000));

async function resolveEmployee(db:any,input:string){
  const q=norm(input);if(!q)return null;
  const {data}=await db.from("multaqa_employees").select("employee_id,full_name,short_name,role,kind,access_group,teacher_page");
  const rows=data||[];let m=rows.filter((e:any)=>norm(e.short_name)===q||norm(e.full_name)===q);if(m.length===1)return m[0];
  const p=clean(input,220).replace(/^أ\.\s*/,"").split(/\s+/).filter(Boolean);if(p.length<2)return null;
  const f=norm(p[0]),l=norm(p[p.length-1]);m=rows.filter((e:any)=>{const t=clean(e.full_name,220).split(/\s+/).filter(Boolean).map(norm);return t[0]===f&&t[t.length-1]===l});return m.length===1?m[0]:null;
}
async function getSession(db:any,req:Request){
  const token=clean(req.headers.get("x-staff-session"),300);if(!token)return null;
  const tokenHash=await sha(token);const {data:s}=await db.from("multaqa_staff_sessions").select("id,employee_id,expires_at,revoked_at").eq("token_hash",tokenHash).maybeSingle();
  if(!s||s.revoked_at||new Date(s.expires_at)<=new Date())return null;
  const {data:e}=await db.from("multaqa_employees").select("employee_id,full_name,short_name,role,kind,access_group,teacher_page").eq("employee_id",s.employee_id).maybeSingle();if(!e)return null;
  await db.from("multaqa_staff_sessions").update({last_seen_at:new Date().toISOString()}).eq("id",s.id);
  return {session:s,employee:e,token};
}
const elevated=(e:any)=>["admin","management"].includes(e?.access_group);
const caseTeam=(e:any)=>["admin","management","social"].includes(e?.access_group);
async function profile(db:any,e:any){
  const [{data:p},{data:w}]=await Promise.all([
    db.from("multaqa_employee_profiles").select("display_title,subject,photo_url,welcome_name,bio_line,work_email,phone,contact_phone,class_labels,achievements").eq("employee_id",e.employee_id).maybeSingle(),
    db.from("multaqa_welcome_messages").select("message").eq("active",true).in("audience",["all",e.access_group||e.kind]).limit(250)
  ]);
  const list=w||[],msg=(list[Math.floor(Math.random()*Math.max(list.length,1))]?.message||"مرحبًا {name}، يومك مليء بالإنجاز").replace("{name}",p?.welcome_name||e.short_name);
  let photo_url=p?.photo_url||null;
  if(photo_url&&photo_url.startsWith("profiles/")){const {data:u}=await db.storage.from("teacher-profile-photos").createSignedUrl(photo_url,3600);photo_url=u?.signedUrl||null}
  return {...e,profile:{...(p||{}),photo_url},welcome_message:msg};
}
async function login(db:any,body:any,req:Request){
  const name=clean(body.name,220),pin=clean(body.pin,20);if(!name||!pinOk(pin))return json({ok:false,error:"invalid_login"},400);
  const e=await resolveEmployee(db,name);if(!e)return json({ok:false,error:"invalid_login"},401);
  const {data:c}=await db.from("multaqa_staff_credentials").select("pin_hash,must_change_pin,failed_attempts,locked_until").eq("employee_id",e.employee_id).maybeSingle();
  if(!c)return json({ok:false,error:"pin_not_issued"},403);
  if(c.locked_until&&new Date(c.locked_until)>new Date())return json({ok:false,error:"temporarily_locked"},429);
  if(!bcrypt.compareSync(pin,c.pin_hash)){
    const n=(c.failed_attempts||0)+1,lock=n>=5?new Date(Date.now()+15*60*1000).toISOString():null;
    await db.from("multaqa_staff_credentials").update({failed_attempts:n>=5?0:n,locked_until:lock,updated_at:new Date().toISOString()}).eq("employee_id",e.employee_id);
    return json({ok:false,error:lock?"temporarily_locked":"invalid_login"},401);
  }
  const token=randomToken(),tokenHash=await sha(token),expires=new Date(Date.now()+12*60*60*1000).toISOString();
  await db.from("multaqa_staff_sessions").insert({employee_id:e.employee_id,token_hash:tokenHash,expires_at:expires,user_agent:clean(req.headers.get("user-agent"),500)});
  await db.from("multaqa_staff_credentials").update({failed_attempts:0,locked_until:null,last_login_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("employee_id",e.employee_id);
  return json({ok:true,token,expires_at:expires,must_change_pin:c.must_change_pin,employee:await profile(db,e)});
}
let vapidReady=false;
async function prepareWebPush(db:any){
  if(vapidReady)return true;
  const {data}=await db.from("multaqa_push_config").select("public_key,private_key,subject").eq("singleton",true).maybeSingle();
  if(!data?.public_key||!data?.private_key)return false;
  webpush.setVapidDetails(data.subject||"mailto:notifications@under-palm-tree.com",data.public_key,data.private_key);vapidReady=true;return true;
}
async function pushToNames(db:any,names:string[],title:string,body:string,url="/school/",kind="general"){
  if(!(await prepareWebPush(db)))return 0;
  const wanted=new Set(names.map(norm).filter(Boolean));if(!wanted.size)return 0;
  const {data:subs}=await db.from("multaqa_push_subscriptions").select("id,employee_name,endpoint,p256dh,auth").eq("enabled",true);let sent=0;
  for(const s of subs||[]){
    if(!wanted.has(norm(s.employee_name)))continue;
    try{
      await webpush.sendNotification({endpoint:s.endpoint,keys:{p256dh:s.p256dh,auth:s.auth}},JSON.stringify({title,body,url,kind}),{TTL:86400});sent++;
      await db.from("multaqa_notification_log").insert({employee_name:s.employee_name,title,body,url,kind,success:true});
    }catch(err:any){
      const code=err?.statusCode||0;if(code===404||code===410)await db.from("multaqa_push_subscriptions").update({enabled:false,updated_at:new Date().toISOString()}).eq("id",s.id);
      await db.from("multaqa_notification_log").insert({employee_name:s.employee_name,title,body,url,kind,success:false});
    }
  }return sent;
}

async function candidatesFor(db:any,absent:any,date:string,period:number,used:Set<string>=new Set(),excludeAssignmentId=0){
  const day=dayFor(date),[{data:emps},{data:schedules},{data:recent},{data:today}]=await Promise.all([
    db.from("multaqa_employees").select("employee_id,full_name,short_name,role").eq("kind","teacher"),
    db.from("multaqa_teacher_schedules").select("full_name,schedule"),
    db.from("multaqa_substitute_assignments").select("id,replacement_employee_id").gte("coverage_date",new Date(Date.now()-30*86400000).toISOString().slice(0,10)).neq("status","cancelled"),
    db.from("multaqa_substitute_assignments").select("id,replacement_employee_id,period").eq("coverage_date",date).neq("status","cancelled")
  ]);
  const activeRecent=(recent||[]).filter((x:any)=>Number(x.id)!==excludeAssignmentId),activeToday=(today||[]).filter((x:any)=>Number(x.id)!==excludeAssignmentId);
  const byName=new Map((schedules||[]).map((x:any)=>[norm(x.full_name),x.schedule||{}]));const counts=new Map<string,number>();
  for(const x of activeRecent)if(x.replacement_employee_id)counts.set(x.replacement_employee_id,(counts.get(x.replacement_employee_id)||0)+1);
  return (emps||[]).filter((e:any)=>e.employee_id!==absent.employee_id).map((e:any)=>{
    const s:any=byName.get(norm(e.full_name))||{},slots:any[]=s[day]||[],i=period-1;
    if(clean(slots[i]))return null;
    if(activeToday.some((x:any)=>x.replacement_employee_id===e.employee_id&&x.period===period))return null;
    const busy=(j:number)=>j>=0&&j<7&&(clean(slots[j])||activeToday.some((x:any)=>x.replacement_employee_id===e.employee_id&&x.period===j+1));
    const before=busy(i-1),after=busy(i+1),before2=busy(i-2),after2=busy(i+2);
    const daily=slots.filter(x=>clean(x)).length+activeToday.filter((x:any)=>x.replacement_employee_id===e.employee_id).length;
    if(daily>=5||(before&&after)||(before&&before2)||(after&&after2))return null;
    const score=(counts.get(e.employee_id)||0)*100+daily*8+(before||after?30:0)+(used.has(e.employee_id)?500:0);
    return {...e,score,reason:`احتياط آخر 30 يومًا: ${counts.get(e.employee_id)||0} • حصص اليوم: ${daily}`};
  }).filter(Boolean).sort((a:any,b:any)=>a.score-b.score);
}
async function allocateAbsence(db:any,absent:any,date:string,sourceType:string,sourceId:string,by:string){
  const day=dayFor(date),{data:row}=await db.from("multaqa_teacher_schedules").select("schedule").eq("full_name",absent.full_name).maybeSingle();const slots:any[]=row?.schedule?.[day]||[],used=new Set<string>(),out:any[]=[];
  for(let i=0;i<7;i++){
    const lesson=clean(slots[i],500);if(!lesson)continue;const parts=lesson.split("•").map(x=>x.trim()),subject=parts[0]||"",classLabel=parts[1]||lesson;
    const list:any[]=await candidatesFor(db,absent,date,i+1,used);const pick=list[0]||null;if(pick)used.add(pick.employee_id);
    const payload={coverage_date:date,day_name:day,period:i+1,class_label:classLabel,subject,absent_employee_id:absent.employee_id,replacement_employee_id:pick?.employee_id||null,source_type:sourceType,source_id:sourceId,status:pick?"assigned":"proposed",fairness_score:pick?.score??null,reason_summary:pick?.reason||"لا توجد معلمة متاحة دون تعارض",assigned_by_employee_id:by,notified_at:null,reminder_sent_at:null,completed_at:null,achievement_recorded_at:null};
    const {data}=await db.from("multaqa_substitute_assignments").upsert(payload,{onConflict:"coverage_date,period,class_label"}).select().single();out.push({...data,replacement_name:pick?.short_name||null});
  }return out;
}

Deno.serve(async(req)=>{
  if(req.method==="OPTIONS")return new Response("ok",{headers:cors});if(req.method!=="POST")return json({ok:false,error:"method_not_allowed"},405);
  let body:any={};try{body=await req.json()}catch{return json({ok:false,error:"invalid_json"},400)}
  const db=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false}});const action=clean(body.action,60);
  if(action==="login")return login(db,body,req);
  const auth=await getSession(db,req);if(!auth)return json({ok:false,error:"session_required"},401);const e=auth.employee;
  if(action==="me")return json({ok:true,employee:await profile(db,e)});
  if(action==="logout"){await db.from("multaqa_staff_sessions").update({revoked_at:new Date().toISOString()}).eq("id",auth.session.id);return json({ok:true})}
  if(action==="change_pin"){
    const pin=clean(body.pin,20);if(!pinOk(pin))return json({ok:false,error:"weak_pin"},400);
    await db.from("multaqa_staff_credentials").update({pin_hash:bcrypt.hashSync(pin,12),must_change_pin:false,pin_changed_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("employee_id",e.employee_id);return json({ok:true});
  }
  if(action==="issue_pin"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const target=await resolveEmployee(db,clean(body.employee_name,220));if(!target)return json({ok:false,error:"not_found"},404);const pin=pinOk(clean(body.pin,20))?clean(body.pin,20):randomPin();
    await db.from("multaqa_staff_credentials").upsert({employee_id:target.employee_id,pin_hash:bcrypt.hashSync(pin,12),must_change_pin:true,failed_attempts:0,locked_until:null,updated_at:new Date().toISOString()});return json({ok:true,employee_name:target.short_name,temporary_pin:pin});
  }
  if(action==="dashboard"){
    const date=clean(body.date,10)||muscatDate();const [{data:sa},{data:ta},{data:pr},{data:cv},{data:ob},{data:da},{count:students},{count:staff}]=await Promise.all([
      db.from("multaqa_student_attendance").select("status,class_name").eq("attendance_date",date),
      db.from("multaqa_teacher_attendance").select("status").eq("attendance_date",date),
      db.from("multaqa_teacher_permissions").select("status").eq("permission_date",date),
      db.from("multaqa_substitute_assignments").select("status").eq("coverage_date",date),
      db.from("multaqa_class_observations").select("status,resolved").gte("observed_at",`${date}T00:00:00+04:00`).lt("observed_at",`${date}T23:59:59+04:00`),
      db.from("multaqa_duty_attendance").select("status").eq("duty_date",date),
      db.from("multaqa_students").select("school_id",{count:"exact",head:true}),db.from("multaqa_employees").select("employee_id",{count:"exact",head:true})
    ]);
    const count=(a:any[],s:string)=>a.filter(x=>x.status===s).length;
    return json({ok:true,date,students_total:students||0,staff_total:staff||0,students:{present:count(sa||[],"present"),absent:count(sa||[],"absent"),late:count(sa||[],"late"),excused:count(sa||[],"excused")},teachers:{present:count(ta||[],"present"),absent:count(ta||[],"absent"),late:count(ta||[],"late")},permissions:{pending:count(pr||[],"pending"),approved:count(pr||[],"approved")},coverage:{needed:(cv||[]).filter(x=>!x.status||x.status==="proposed").length,assigned:count(cv||[],"assigned")},observations:{no_teacher:count((ob||[]).filter(x=>!x.resolved),"no_teacher"),problem:count((ob||[]).filter(x=>!x.resolved),"problem")},duty:{confirmed:(da||[]).length,absent:count(da||[],"absent")}});
  }
  if(action==="teacher_schedule"){
    let target=e;
    if(elevated(e)&&clean(body.employee_name,220)){
      const found=await resolveEmployee(db,clean(body.employee_name,220));
      if(!found)return json({ok:false,error:"not_found"},404);
      target=found;
    }
    const today=muscatDate(),untilDate=new Date(`${today}T12:00:00+04:00`);untilDate.setUTCDate(untilDate.getUTCDate()+14);const until=untilDate.toISOString().slice(0,10);
    const [{data:schedule},{data:coverage}]=await Promise.all([
      db.from("multaqa_teacher_schedules").select("full_name,page,schedule").eq("full_name",target.full_name).maybeSingle(),
      db.from("multaqa_substitute_assignments").select("id,coverage_date,day_name,period,class_label,subject,status,notified_at,reminder_sent_at").eq("replacement_employee_id",target.employee_id).gte("coverage_date",today).lte("coverage_date",until).in("status",["assigned","accepted"]).order("coverage_date").order("period")
    ]);
    if(!schedule)return json({ok:false,error:"not_found"},404);
    return json({ok:true,employee:{employee_id:target.employee_id,full_name:target.full_name,short_name:target.short_name},schedule,coverage:coverage||[]});
  }
  if(action==="duty_week"){
    const {data}=await db.from("multaqa_duty").select("day_name,teachers,admins,slots");
    const order:any={"الأحد":1,"الاثنين":2,"الثلاثاء":3,"الأربعاء":4,"الخميس":5};
    return json({ok:true,days:(data||[]).sort((a:any,b:any)=>(order[a.day_name]||99)-(order[b.day_name]||99)),is_admin:elevated(e)});
  }
  if(action==="broadcasts"){
    const {data:rows}=await db.from("multaqa_broadcasts").select("*").order("broadcast_date",{ascending:false}).order("created_at",{ascending:false}).limit(100);
    const {data:emps}=await db.from("multaqa_employees").select("employee_id,short_name,full_name");
    const names=new Map((emps||[]).map((x:any)=>[x.employee_id,x.short_name||x.full_name]));
    const items=await Promise.all((rows||[]).map(async(x:any)=>{
      let video_url=null;
      if(x.video_path){const {data:signed}=await db.storage.from("school-broadcasts").createSignedUrl(x.video_path,3600);video_url=signed?.signedUrl||null}
      return {...x,teacher_name:names.get(x.teacher_employee_id)||"—",video_url};
    }));
    return json({ok:true,items});
  }
  if(action==="save_broadcast"){
    const id=clean(body.id,80),title=clean(body.title,220),date=clean(body.broadcast_date,10)||muscatDate(),status=clean(body.event_status,20)||"planned";
    if(title.length<2||!["planned","live","completed","cancelled"].includes(status))return json({ok:false,error:"invalid_input"},400);
    const teacher=clean(body.teacher_name,220)?await resolveEmployee(db,clean(body.teacher_name,220)):e;
    if(!teacher)return json({ok:false,error:"not_found"},404);
    const participants=(Array.isArray(body.participants)?body.participants:[]).map((x:any)=>clean(x,160)).filter(Boolean).slice(0,80);
    const row:any={broadcast_date:date,title,teacher_employee_id:teacher.employee_id,participants,event_status:status,rating:Math.max(1,Math.min(5,Number(body.rating)||0))||null,evaluation_note:clean(body.evaluation_note,1600)||null,updated_at:new Date().toISOString()};
    if(id){
      const {data:old}=await db.from("multaqa_broadcasts").select("created_by_employee_id").eq("id",id).maybeSingle();
      if(!old)return json({ok:false,error:"not_found"},404);if(!elevated(e)&&old.created_by_employee_id!==e.employee_id)return json({ok:false,error:"forbidden"},403);
      const {data,error}=await db.from("multaqa_broadcasts").update(row).eq("id",id).select().single();if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,item:data});
    }
    const {data,error}=await db.from("multaqa_broadcasts").insert({...row,created_by_employee_id:e.employee_id}).select().single();if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,item:data});
  }
  if(action==="prepare_broadcast_upload"){
    const id=clean(body.id,80),mime=clean(body.mime_type,80);const {data:item}=await db.from("multaqa_broadcasts").select("created_by_employee_id").eq("id",id).maybeSingle();
    if(!item)return json({ok:false,error:"not_found"},404);if(!elevated(e)&&item.created_by_employee_id!==e.employee_id)return json({ok:false,error:"forbidden"},403);
    const ext=mime.includes("mp4")?"mp4":mime.includes("quicktime")?"mov":"webm",path=`broadcasts/${id}/${crypto.randomUUID()}.${ext}`;
    const {data:signed,error}=await db.storage.from("school-broadcasts").createSignedUploadUrl(path);if(error||!signed)return json({ok:false,error:"upload_failed"},500);
    return json({ok:true,path,token:signed.token,signed_url:signed.signedUrl});
  }
  if(action==="complete_broadcast_video"){
    const id=clean(body.id,80),path=clean(body.path,700);if(!path.startsWith(`broadcasts/${id}/`))return json({ok:false,error:"invalid_input"},400);
    const {data:item}=await db.from("multaqa_broadcasts").select("created_by_employee_id").eq("id",id).maybeSingle();if(!item)return json({ok:false,error:"not_found"},404);if(!elevated(e)&&item.created_by_employee_id!==e.employee_id)return json({ok:false,error:"forbidden"},403);
    const {error}=await db.from("multaqa_broadcasts").update({video_path:path,updated_at:new Date().toISOString()}).eq("id",id);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="activities"){
    const [{data:items},{data:links},{data:tasks},{data:achievements},{data:emps}]=await Promise.all([
      db.from("multaqa_school_activities").select("*").order("activity_date",{ascending:false}).limit(150),
      db.from("multaqa_activity_responsibles").select("activity_id,employee_id"),
      db.from("multaqa_activity_tasks").select("*").order("created_at",{ascending:false}),
      db.from("multaqa_activity_achievements").select("*").order("achievement_date",{ascending:false}),
      db.from("multaqa_employees").select("employee_id,short_name,full_name")
    ]);const names=new Map((emps||[]).map((x:any)=>[x.employee_id,x.short_name||x.full_name]));
    return json({ok:true,items:(items||[]).map((x:any)=>({...x,responsibles:(links||[]).filter((r:any)=>r.activity_id===x.id).map((r:any)=>({employee_id:r.employee_id,name:names.get(r.employee_id)||r.employee_id})),tasks:(tasks||[]).filter((r:any)=>r.activity_id===x.id).map((r:any)=>({...r,assignee_names:(r.assigned_to_employee_ids||[]).map((id:string)=>names.get(id)||id)})),achievements:(achievements||[]).filter((r:any)=>r.activity_id===x.id)}))});
  }
  if(action==="save_activity"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const type=clean(body.activity_type,30),title=clean(body.title,220),id=clean(body.id,80);if(!title||!["broadcast","scouts_guides","safety","mothers_council","school_health","quran_group","music"].includes(type))return json({ok:false,error:"invalid_input"},400);
    const row:any={activity_type:type,title,activity_date:clean(body.activity_date,10)||muscatDate(),status:["planned","active","completed","cancelled"].includes(clean(body.status,20))?clean(body.status,20):"planned",description:clean(body.description,1800)||null,members:(Array.isArray(body.members)?body.members:[]).map((x:any)=>clean(x,160)).filter(Boolean).slice(0,100),updated_at:new Date().toISOString()};
    const {data:item,error}=id?await db.from("multaqa_school_activities").update(row).eq("id",id).select().single():await db.from("multaqa_school_activities").insert({...row,created_by_employee_id:e.employee_id}).select().single();if(error||!item)return json({ok:false,error:"save_failed"},500);
    const responsibleIds=(Array.isArray(body.responsible_employee_ids)?body.responsible_employee_ids:[]).map((x:any)=>clean(x,30)).filter(Boolean).slice(0,20);await db.from("multaqa_activity_responsibles").delete().eq("activity_id",item.id);if(responsibleIds.length)await db.from("multaqa_activity_responsibles").insert(responsibleIds.map((employee_id:string)=>({activity_id:item.id,employee_id})));return json({ok:true,item});
  }
  if(action==="save_activity_task"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const activityId=clean(body.activity_id,80),title=clean(body.title,220);if(!activityId||!title)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_activity_tasks").insert({activity_id:activityId,title,details:clean(body.details,1500)||null,assigned_to_employee_ids:(Array.isArray(body.assigned_to_employee_ids)?body.assigned_to_employee_ids:[]).map((x:any)=>clean(x,30)).filter(Boolean).slice(0,20),due_date:clean(body.due_date,10)||null,priority:["normal","important","urgent"].includes(clean(body.priority,20))?clean(body.priority,20):"normal",created_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="complete_activity_task"){
    const id=Number(body.id),status=clean(body.status,20);if(!id||!["pending","in_progress","completed"].includes(status))return json({ok:false,error:"invalid_input"},400);const {data:t}=await db.from("multaqa_activity_tasks").select("assigned_to_employee_ids").eq("id",id).maybeSingle();if(!t||(!elevated(e)&&!(t.assigned_to_employee_ids||[]).includes(e.employee_id)))return json({ok:false,error:"forbidden"},403);await db.from("multaqa_activity_tasks").update({status,updated_at:new Date().toISOString()}).eq("id",id);return json({ok:true});
  }
  if(action==="save_activity_achievement"){
    const activityId=clean(body.activity_id,80),title=clean(body.title,220);if(!activityId||!title)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_activity_achievements").insert({activity_id:activityId,title,details:clean(body.details,1600)||null,achievement_date:clean(body.achievement_date,10)||muscatDate(),recorded_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="gifted_students"){
    const [{data:items},{data:students},{data:parts},{data:emps}]=await Promise.all([db.from("multaqa_gifted_students").select("*").order("updated_at",{ascending:false}),db.from("multaqa_students").select("school_id,serial,name,class_name"),db.from("multaqa_gifted_participations").select("*").order("participation_date",{ascending:false}),db.from("multaqa_employees").select("employee_id,short_name,full_name")]);const sm=new Map((students||[]).map((x:any)=>[x.school_id,x])),em=new Map((emps||[]).map((x:any)=>[x.employee_id,x.short_name||x.full_name]));return json({ok:true,items:(items||[]).map((x:any)=>({...x,student:sm.get(x.student_school_id)||null,supervisor_name:x.supervisor_employee_id?em.get(x.supervisor_employee_id)||null:null,participations:(parts||[]).filter((p:any)=>p.student_school_id===x.student_school_id)}))});
  }
  if(action==="save_gifted_student"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),category=clean(body.talent_category,160);const {data:s}=await db.from("multaqa_students").select("school_id").eq("school_id",sid).maybeSingle();if(!s||!category)return json({ok:false,error:s?"invalid_input":"not_found"},400);const row={student_school_id:sid,talent_category:category,talent_description:clean(body.talent_description,1400)||null,level:clean(body.level,100)||null,support_plan:clean(body.support_plan,1800)||null,supervisor_employee_id:clean(body.supervisor_employee_id,30)||null,status:["nominated","active","paused","graduated"].includes(clean(body.status,20))?clean(body.status,20):"active",recorded_by_employee_id:e.employee_id,updated_at:new Date().toISOString()};const {error}=await db.from("multaqa_gifted_students").upsert(row);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="save_gifted_participation"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),title=clean(body.title,220);if(!sid||!title)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_gifted_participations").insert({student_school_id:sid,title,participation_type:clean(body.participation_type,100)||null,participation_date:clean(body.participation_date,10)||muscatDate(),result:clean(body.result,500)||null,note:clean(body.note,1200)||null,recorded_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="directory"){
    const [{data:employees},{data:classRows},{data:buses},{data:advisors}]=await Promise.all([
      db.from("multaqa_employees").select("employee_id,full_name,short_name,role,kind,access_group").order("full_name"),
      db.from("multaqa_class_schedules").select("class_label").order("page"),
      db.from("multaqa_bus_routes").select("*").eq("active",true).order("trip_order"),
      db.from("multaqa_class_advisors").select("class_code,class_label,advisor_name,employee_id").eq("active",true).order("class_code")
    ]);
    return json({ok:true,employees:employees||[],classes:(classRows||[]).map((x:any)=>classCode(x.class_label)),buses:buses||[],class_advisors:advisors||[]});
  }
  if(action==="teacher_profiles"){
    let q=db.from("multaqa_employees").select("employee_id,full_name,short_name,role,kind,access_group").eq("kind","teacher").order("full_name");
    if(!elevated(e))q=q.eq("employee_id",e.employee_id);
    const {data:employees}=await q;const ids=(employees||[]).map((x:any)=>x.employee_id);
    const [{data:profiles},{data:projects}]=await Promise.all([
      ids.length?db.from("multaqa_employee_profiles").select("employee_id,display_title,subject,photo_url,welcome_name,bio_line,work_email,phone,contact_phone,class_labels,achievements").in("employee_id",ids):Promise.resolve({data:[]}),
      ids.length?db.from("multaqa_teacher_projects").select("*").in("employee_id",ids).order("created_at",{ascending:false}):Promise.resolve({data:[]})
    ]);
    const pm=new Map((profiles||[]).map((x:any)=>[x.employee_id,x]));
    const items=await Promise.all((employees||[]).map(async(x:any)=>{const p:any=pm.get(x.employee_id)||{};let photo_url=p.photo_url||null;if(photo_url&&photo_url.startsWith("profiles/")){const {data:u}=await db.storage.from("teacher-profile-photos").createSignedUrl(photo_url,3600);photo_url=u?.signedUrl||null}return{...x,profile:{...p,photo_url},projects:(projects||[]).filter((v:any)=>v.employee_id===x.employee_id)}}));
    return json({ok:true,items});
  }
  if(action==="save_teacher_profile"){
    const targetId=elevated(e)?clean(body.employee_id,30)||e.employee_id:e.employee_id;
    const {data:target}=await db.from("multaqa_employees").select("employee_id,kind").eq("employee_id",targetId).maybeSingle();
    if(!target||target.kind!=="teacher")return json({ok:false,error:"not_found"},404);
    const email=clean(body.work_email,220);if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({ok:false,error:"invalid_input"},400);
    const row={employee_id:targetId,display_title:clean(body.display_title,160)||null,subject:clean(body.subject,180)||null,work_email:email||null,phone:clean(body.phone,30)||null,contact_phone:clean(body.contact_phone,30)||null,bio_line:clean(body.bio_line,600)||null,class_labels:(Array.isArray(body.class_labels)?body.class_labels:[]).map((x:any)=>clean(x,100)).filter(Boolean).slice(0,40),achievements:(Array.isArray(body.achievements)?body.achievements:[]).map((x:any)=>clean(x,300)).filter(Boolean).slice(0,80)};
    const {error}=await db.from("multaqa_employee_profiles").upsert(row);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="save_teacher_project"){
    const targetId=elevated(e)?clean(body.employee_id,30)||e.employee_id:e.employee_id,title=clean(body.title,220);
    if(!title)return json({ok:false,error:"invalid_input"},400);const type=["school","students","initiative"].includes(clean(body.project_type,30))?clean(body.project_type,30):"school";
    const {error}=await db.from("multaqa_teacher_projects").insert({employee_id:targetId,title,project_type:type,description:clean(body.description,1800)||null,status:["planned","active","completed","paused"].includes(clean(body.status,20))?clean(body.status,20):"active",start_date:clean(body.start_date,10)||null,end_date:clean(body.end_date,10)||null,achievements:clean(body.achievements,1800)||null,created_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="prepare_teacher_photo_upload"){
    const targetId=elevated(e)?clean(body.employee_id,30)||e.employee_id:e.employee_id,mime=clean(body.mime_type,120),allowed:any={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"};
    if(!targetId||!allowed[mime])return json({ok:false,error:"invalid_input"},400);const path=`profiles/${targetId}/${crypto.randomUUID()}.${allowed[mime]}`;const {data:signed,error}=await db.storage.from("teacher-profile-photos").createSignedUploadUrl(path);if(error||!signed)return json({ok:false,error:"upload_failed"},500);return json({ok:true,path,signed_url:signed.signedUrl});
  }
  if(action==="complete_teacher_photo"){
    const targetId=elevated(e)?clean(body.employee_id,30)||e.employee_id:e.employee_id,path=clean(body.path,700);if(!path.startsWith(`profiles/${targetId}/`))return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_employee_profiles").upsert({employee_id:targetId,photo_url:path});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="student_support_lists"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);
    const [{data:cases},{data:students}]=await Promise.all([db.from("multaqa_student_cases").select("student_school_id,financial_support,academic_category,support_priority,support_program,support_note,living_standard,academic_level,follow_up_status,updated_at"),db.from("multaqa_students").select("school_id,name,class_name,serial")]);
    const sm=new Map((students||[]).map((x:any)=>[x.school_id,x]));const items=(cases||[]).map((x:any)=>({...x,student:sm.get(x.student_school_id)||null})).filter((x:any)=>x.student);
    return json({ok:true,financial:items.filter((x:any)=>x.financial_support||["محدود","يحتاج دعم"].includes(x.living_standard)),low:items.filter((x:any)=>x.academic_category==="low"||x.academic_level==="support"),distinguished:items.filter((x:any)=>x.academic_category==="distinguished"||x.academic_level==="advanced")});
  }
  if(action==="classify_student_support"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),category=clean(body.academic_category,30);if(!sid||!['','low','average','distinguished'].includes(category))return json({ok:false,error:"invalid_input"},400);
    const {data:s}=await db.from("multaqa_students").select("school_id").eq("school_id",sid).maybeSingle();if(!s)return json({ok:false,error:"not_found"},404);
    const {error}=await db.from("multaqa_student_cases").upsert({student_school_id:sid,financial_support:body.financial_support===true,academic_category:category||null,support_priority:clean(body.support_priority,40)||null,support_program:clean(body.support_program,1200)||null,support_note:clean(body.support_note,1600)||null,updated_by_employee_id:e.employee_id,updated_at:new Date().toISOString()});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="broadcast_schedule"){
    const {data:items}=await db.from("multaqa_broadcast_schedule").select("*").order("schedule_date").limit(180);return json({ok:true,items:items||[]});
  }
  if(action==="save_broadcast_schedule"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const date=clean(body.schedule_date,10),cls=clean(body.class_label,100);if(!date||!cls)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_broadcast_schedule").upsert({schedule_date:date,day_name:clean(body.day_name,30)||null,class_label:cls,title:clean(body.title,220)||null,responsible_employee_ids:(Array.isArray(body.responsible_employee_ids)?body.responsible_employee_ids:[]).map((x:any)=>clean(x,30)).filter(Boolean).slice(0,20),notes:clean(body.notes,1000)||null,created_by_employee_id:e.employee_id,updated_at:new Date().toISOString()},{onConflict:"schedule_date,class_label"});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="mothers_council"){
    const {data:item}=await db.from("multaqa_mothers_council").select("*").eq("id","current").maybeSingle();return json({ok:true,item:item||null});
  }
  if(action==="save_mothers_council"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const row={id:"current",council_name:clean(body.council_name,220)||"مجلس الأمهات",president_name:clean(body.president_name,220)||null,president_phone:clean(body.president_phone,30)||null,president_email:clean(body.president_email,220)||null,vice_name:clean(body.vice_name,220)||null,vice_phone:clean(body.vice_phone,30)||null,chair_name:clean(body.chair_name,220)||null,members:(Array.isArray(body.members)?body.members:[]).map((x:any)=>clean(x,220)).filter(Boolean).slice(0,120),laws:clean(body.laws,4000)||null,tasks:clean(body.tasks,4000)||null,events:(Array.isArray(body.events)?body.events:[]).map((x:any)=>clean(x,400)).filter(Boolean).slice(0,120),updated_by_employee_id:e.employee_id,updated_at:new Date().toISOString()};const {error}=await db.from("multaqa_mothers_council").upsert(row);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="class_mentors"){
    const {data:items}=await db.from("multaqa_class_advisors").select("class_code,class_label,advisor_name,employee_id,source_note,updated_at").eq("active",true).order("class_code");
    return json({ok:true,items:(items||[]).map((x:any)=>({...x,class_label:x.class_code,employee_name:x.advisor_name,academic_year:"2026/2027",responsibilities:"متابعة شؤون الفصل والطالبات والتواصل مع الأسرة.",notes:x.source_note||""}))});
  }
  if(action==="save_class_mentor"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const cls=classCode(clean(body.class_label,100)),employeeId=clean(body.employee_id,30);if(!cls||!employeeId)return json({ok:false,error:"invalid_input"},400);
    const {data:target}=await db.from("multaqa_employees").select("employee_id,full_name,short_name,kind").eq("employee_id",employeeId).maybeSingle();if(!target||target.kind!=="teacher")return json({ok:false,error:"not_found"},404);
    const {error}=await db.from("multaqa_class_advisors").upsert({class_code:cls,class_label:scheduleLabel(cls),advisor_name:target.short_name||target.full_name,employee_id:employeeId,active:true,source_note:clean(body.notes,1200)||"تحديث من مركز التشغيل",updated_at:new Date().toISOString()},{onConflict:"class_code"});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="import_schedules"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const classes=Array.isArray(body.classes)?body.classes:[],teachers=Array.isArray(body.teachers)?body.teachers:[];
    const result:any={classes:{ok:0,failed:[] as string[]},teachers:{ok:0,failed:[] as string[]}};
    for(let i=0;i<classes.length;i++){
      const c=classes[i],label=clean(c?.class_label,60),schedule=c?.schedule;
      if(!label||!schedule||typeof schedule!=="object"){result.classes.failed.push(label||"?");continue}
      const {data:old}=await db.from("multaqa_class_schedules").select("page").eq("class_label",label).maybeSingle();
      const page=Number.isInteger(old?.page)?old.page:i;
      const {error}=await db.from("multaqa_class_schedules").upsert({class_label:label,page,schedule},{onConflict:"class_label"});
      if(error)result.classes.failed.push(label+": "+error.message);else result.classes.ok++;
    }
    for(let i=0;i<teachers.length;i++){
      const t=teachers[i],hint=clean(t?.full_name_hint,220),schedule=t?.schedule;
      if(!hint||!schedule||typeof schedule!=="object"){result.teachers.failed.push(hint||"?");continue}
      const target=await resolveEmployee(db,hint);
      if(!target){result.teachers.failed.push(hint+" (لم يتم التعرّف على الموظفة)");continue}
      const {data:old}=await db.from("multaqa_teacher_schedules").select("page").eq("full_name",target.full_name).maybeSingle();
      const page=Number.isInteger(old?.page)?old.page:(Number.isInteger(target.teacher_page)?target.teacher_page:i);
      const {error}=await db.from("multaqa_teacher_schedules").upsert({full_name:target.full_name,page,schedule},{onConflict:"full_name"});
      if(error)result.teachers.failed.push(hint+": "+error.message);else result.teachers.ok++;
    }
    return json({ok:true,...result});
  }
  if(action==="test_push"){
    const sent=await pushToNames(db,[e.short_name||e.full_name],"اختبار إشعارات ملتقى المعارف","إذا وصل هذا الإشعار فتنبيهات الخلفية تعمل حتى مع إغلاق الرابط.","/school/","test");return json({ok:true,sent});
  }
  if(action==="calendar_events"){
    let q=db.from("multaqa_calendar_events").select("*").order("event_date",{ascending:true}).limit(300);if(!elevated(e))q=q.eq("published",true);const {data,error}=await q;if(error)return json({ok:false,error:"server_error"},500);return json({ok:true,items:data||[],can_manage:elevated(e)});
  }
  if(action==="save_important_announcement"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const title=clean(body.title,220),message=clean(body.body,1600),eventDate=clean(body.event_date,10)||null;if(title.length<2)return json({ok:false,error:"invalid_input"},400);
    await db.from("multaqa_content").update({published:false,updated_at:new Date().toISOString()}).eq("content_type","announcement").eq("published",true);
    const row={id:Date.now(),content_type:"announcement",title,body:message,media_url:clean(body.media_url,1000)||null,event_date:eventDate,test_name:clean(body.test_name,220)||title,subject:clean(body.subject,160)||null,day_name:clean(body.day_name,60)||null,published:true,sort_order:0,updated_at:new Date().toISOString()};const {data,error}=await db.from("multaqa_content").insert(row).select().single();if(error)return json({ok:false,error:"save_failed"},500);
    let sent=0;if(body.send_push===true){const {data:emps}=await db.from("multaqa_employees").select("short_name,full_name");sent=await pushToNames(db,(emps||[]).map((x:any)=>x.short_name||x.full_name),"📣 إعلان هام",message||title,"/school/","important_announcement")}
    return json({ok:true,item:data,push_sent:sent});
  }
  if(action==="award_badge"){
    const studentId=clean(body.student_school_id,30),studentName=clean(body.student_name,200),className=clean(body.class_name,60),badgeKey=clean(body.badge_key,40);
    const label=BADGES[badgeKey];if(!studentId||!studentName||!className||!label)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_student_badges").insert({student_school_id:studentId,student_name:studentName,class_name:className,badge_key:badgeKey,badge_label:label,note:clean(body.note,300)||null,awarded_by_employee_id:e.employee_id});
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="class_badges"){
    const className=clean(body.class_name,60);if(!className)return json({ok:false,error:"invalid_input"},400);
    const {data}=await db.from("multaqa_student_badges").select("id,student_school_id,student_name,badge_key,badge_label,note,awarded_at").eq("class_name",className).order("awarded_at",{ascending:false}).limit(200);
    return json({ok:true,items:data||[],badges:BADGES});
  }
  if(action==="create_book_loan"){
    const studentId=clean(body.student_school_id,30),studentName=clean(body.student_name,200),className=clean(body.class_name,60),bookTitle=clean(body.book_title,200),dueAt=clean(body.due_at,10);
    if(!studentId||!studentName||!className||!bookTitle||!dueAt)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_book_loans").insert({student_school_id:studentId,student_name:studentName,class_name:className,book_title:bookTitle,due_at:dueAt,borrowed_by_employee_id:e.employee_id});
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="return_book_loan"){
    const id=clean(body.id,60);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_book_loans").update({returned_at:new Date().toISOString()}).eq("id",id).is("returned_at",null);
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="book_loans"){
    const className=clean(body.class_name,60);let q=db.from("multaqa_book_loans").select("id,student_school_id,student_name,class_name,book_title,borrowed_at,due_at,returned_at").order("borrowed_at",{ascending:false}).limit(200);
    if(className)q=q.eq("class_name",className);const {data}=await q;return json({ok:true,items:data||[]});
  }
  if(action==="save_meeting_slots"){
    const slots=(Array.isArray(body.slots)?body.slots:[]).map((s:any)=>({employee_id:e.employee_id,slot_date:clean(s?.slot_date,10),slot_time:clean(s?.slot_time,10),status:"open"})).filter((s:any)=>s.slot_date&&s.slot_time).slice(0,40);
    if(!slots.length)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_meeting_slots").upsert(slots,{onConflict:"employee_id,slot_date,slot_time",ignoreDuplicates:true});
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,created:slots.length});
  }
  if(action==="my_meeting_slots"){
    const targetId=elevated(e)&&clean(body.employee_id,30)?clean(body.employee_id,30):e.employee_id;
    const today=muscatDate();
    const {data}=await db.from("multaqa_meeting_slots").select("id,slot_date,slot_time,status,booked_student_name,booked_guardian_phone,note").eq("employee_id",targetId).gte("slot_date",today).neq("status","cancelled").order("slot_date").order("slot_time");
    return json({ok:true,items:data||[]});
  }
  if(action==="cancel_meeting_slot"){
    const id=clean(body.id,60);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {data:row}=await db.from("multaqa_meeting_slots").select("employee_id").eq("id",id).maybeSingle();if(!row)return json({ok:false,error:"not_found"},404);
    if(row.employee_id!==e.employee_id&&!elevated(e))return json({ok:false,error:"forbidden"},403);
    await db.from("multaqa_meeting_slots").update({status:"cancelled"}).eq("id",id);return json({ok:true});
  }
  if(action==="save_homework"){
    const className=clean(body.class_name,60),subject=clean(body.subject,80)||null,description=clean(body.description,1000),homeworkDate=clean(body.homework_date,10)||muscatDate();
    if(!className||!description)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_homework").insert({class_name:className,subject,description,homework_date:homeworkDate,created_by_employee_id:e.employee_id});
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="delete_homework"){
    const id=clean(body.id,60);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {data:row}=await db.from("multaqa_homework").select("created_by_employee_id").eq("id",id).maybeSingle();if(!row)return json({ok:false,error:"not_found"},404);
    if(row.created_by_employee_id!==e.employee_id&&!elevated(e))return json({ok:false,error:"forbidden"},403);
    await db.from("multaqa_homework").delete().eq("id",id);return json({ok:true});
  }
  if(action==="class_homework"){
    const className=clean(body.class_name,60);if(!className)return json({ok:false,error:"invalid_input"},400);
    const since=new Date(Date.now()-14*86400000).toISOString().slice(0,10);
    const {data}=await db.from("multaqa_homework").select("id,subject,description,homework_date,created_by_employee_id").eq("class_name",className).gte("homework_date",since).order("homework_date",{ascending:false});
    return json({ok:true,items:data||[]});
  }
  if(action==="prepare_lost_item_upload"){
    const mime=clean(body.mime_type,120),allowed:any={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"};
    if(!allowed[mime])return json({ok:false,error:"invalid_input"},400);
    const path=`items/${crypto.randomUUID()}.${allowed[mime]}`;
    const {data:signed,error}=await db.storage.from("lost-found-photos").createSignedUploadUrl(path);if(error||!signed)return json({ok:false,error:"upload_failed"},500);
    return json({ok:true,path,signed_url:signed.signedUrl});
  }
  if(action==="report_lost_item"){
    const itemDesc=clean(body.item_desc,300),location=clean(body.found_location,200)||null,photoPath=clean(body.photo_path,700)||null;
    if(!itemDesc)return json({ok:false,error:"invalid_input"},400);if(photoPath&&!photoPath.startsWith("items/"))return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_lost_found").insert({item_desc:itemDesc,found_location:location,photo_path:photoPath,created_by_employee_id:e.employee_id});
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="claim_lost_item"){
    const id=clean(body.id,60),claimedBy=clean(body.claimed_by,200);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_lost_found").update({status:"claimed",claimed_by:claimedBy||null,claimed_at:new Date().toISOString()}).eq("id",id);
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="lost_items"){
    const status=clean(body.status,20)||"open";
    const {data}=await db.from("multaqa_lost_found").select("id,item_desc,found_location,photo_path,status,claimed_by,claimed_at,created_at").eq("status",status).order("created_at",{ascending:false}).limit(200);
    const items=await Promise.all((data||[]).map(async(x:any)=>{let photo_url=null;if(x.photo_path){const {data:u}=await db.storage.from("lost-found-photos").createSignedUrl(x.photo_path,3600);photo_url=u?.signedUrl||null}return{...x,photo_url}}));
    return json({ok:true,items});
  }
  if(action==="create_poll"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const question=clean(body.question,300),options=(Array.isArray(body.options)?body.options:[]).map((x:any)=>clean(x,120)).filter(Boolean).slice(0,6);
    if(question.length<2||options.length<2)return json({ok:false,error:"invalid_input"},400);
    await db.from("multaqa_polls").update({active:false,closed_at:new Date().toISOString()}).eq("active",true);
    const {data,error}=await db.from("multaqa_polls").insert({question,options,created_by_employee_id:e.employee_id}).select().single();
    if(error)return json({ok:false,error:"save_failed"},500);
    let sent=0;if(body.send_push===true){const {data:emps}=await db.from("multaqa_employees").select("short_name,full_name");sent=await pushToNames(db,(emps||[]).map((x:any)=>x.short_name||x.full_name),"🗳️ استطلاع رأي جديد",question,"/school/","poll")}
    return json({ok:true,item:data,push_sent:sent});
  }
  if(action==="active_poll"){
    const {data:poll}=await db.from("multaqa_polls").select("*").eq("active",true).order("created_at",{ascending:false}).limit(1).maybeSingle();
    if(!poll)return json({ok:true,poll:null});
    const {data:votes}=await db.from("multaqa_poll_votes").select("employee_id,option_index").eq("poll_id",poll.id);
    const counts=(poll.options||[]).map((_:any,i:number)=>(votes||[]).filter((v:any)=>v.option_index===i).length);
    const mine=(votes||[]).find((v:any)=>v.employee_id===e.employee_id);
    const {count:total}=await db.from("multaqa_employees").select("employee_id",{count:"exact",head:true});
    return json({ok:true,poll,counts,total_votes:(votes||[]).length,total_employees:total||0,my_vote:mine?mine.option_index:null,can_manage:elevated(e)});
  }
  if(action==="vote_poll"){
    const pollId=clean(body.poll_id,60),optionIndex=Number(body.option_index);
    const {data:poll}=await db.from("multaqa_polls").select("id,options,active").eq("id",pollId).maybeSingle();
    if(!poll||!poll.active)return json({ok:false,error:"not_found"},404);
    if(!(optionIndex>=0&&optionIndex<(poll.options||[]).length))return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_poll_votes").upsert({poll_id:pollId,employee_id:e.employee_id,option_index:optionIndex,voted_at:new Date().toISOString()});
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="close_poll"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=clean(body.id,60);if(!id)return json({ok:false,error:"invalid_input"},400);
    await db.from("multaqa_polls").update({active:false,closed_at:new Date().toISOString()}).eq("id",id);return json({ok:true});
  }
  if(action==="poll_history"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const {data:polls}=await db.from("multaqa_polls").select("*").order("created_at",{ascending:false}).limit(10);
    const items=await Promise.all((polls||[]).map(async(p:any)=>{const {data:votes}=await db.from("multaqa_poll_votes").select("option_index").eq("poll_id",p.id);const counts=(p.options||[]).map((_:any,i:number)=>(votes||[]).filter((v:any)=>v.option_index===i).length);return {...p,counts,total_votes:(votes||[]).length}}));
    return json({ok:true,items});
  }
  if(action==="save_news"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const title=clean(body.title,220),message=clean(body.body,1600);if(title.length<2)return json({ok:false,error:"invalid_input"},400);
    const row={id:Date.now(),content_type:"news",title,body:message,media_url:clean(body.media_url,1000)||null,event_date:clean(body.event_date,10)||null,published:true,sort_order:Date.now(),updated_at:new Date().toISOString()};
    const {data,error}=await db.from("multaqa_content").insert(row).select().single();if(error)return json({ok:false,error:"save_failed"},500);
    let sent=0;if(body.send_push===true){const {data:emps}=await db.from("multaqa_employees").select("short_name,full_name");sent=await pushToNames(db,(emps||[]).map((x:any)=>x.short_name||x.full_name),"📰 "+title,message||title,"/school/","news")}
    return json({ok:true,item:data,push_sent:sent});
  }
  if(action==="delete_news"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=Number(body.id);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {error}=await db.from("multaqa_content").delete().eq("id",id).eq("content_type","news");if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="emergency_status"){
    const {data}=await db.from("multaqa_emergency_alerts").select("*").eq("active",true).order("started_at",{ascending:false}).limit(1).maybeSingle();return json({ok:true,alert:data||null,can_manage:elevated(e)});
  }
  if(action==="start_emergency_alert"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const title=clean(body.title,180),message=clean(body.body,1000),repeat=[5,10,15,30].includes(Number(body.repeat_minutes))?Number(body.repeat_minutes):5;if(title.length<2||message.length<2)return json({ok:false,error:"invalid_input"},400);
    const now=new Date().toISOString();await db.from("multaqa_emergency_alerts").update({active:false,stopped_at:now,updated_at:now}).eq("active",true);
    const {data:alert,error}=await db.from("multaqa_emergency_alerts").insert({title,body:message,severity:"emergency",repeat_minutes:repeat,active:true,started_at:now,last_sent_at:now,created_by_name:e.short_name||e.full_name,updated_at:now}).select().single();if(error)return json({ok:false,error:"save_failed"},500);
    const {data:emps}=await db.from("multaqa_employees").select("short_name,full_name");const sent=await pushToNames(db,(emps||[]).map((x:any)=>x.short_name||x.full_name),"🚨 "+title,message,"/school/","emergency");return json({ok:true,alert,push_sent:sent});
  }
  if(action==="stop_emergency_alert"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const now=new Date().toISOString(),id=Number(body.id)||0;let q=db.from("multaqa_emergency_alerts").update({active:false,stopped_at:now,updated_at:now}).eq("active",true);if(id)q=q.eq("id",id);const {error}=await q;if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="save_calendar_event"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=clean(body.id,80),title=clean(body.title,220),eventDate=clean(body.event_date,10),eventTime=clean(body.event_time,8)||null,reminderDays=Math.max(0,Math.min(30,Number(body.reminder_days)??1)),audience=clean(body.audience,20)||"all";if(title.length<2||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(eventDate)||!["all","teachers","management"].includes(audience))return json({ok:false,error:"invalid_input"},400);const row={title,event_date:eventDate,event_time:eventTime,details:clean(body.details,1600)||null,reminder_days:reminderDays,audience,published:body.published!==false,reminder_sent_at:null,updated_at:new Date().toISOString()};let result:any;if(id)result=await db.from("multaqa_calendar_events").update(row).eq("id",id).select().single();else result=await db.from("multaqa_calendar_events").insert(row).select().single();if(result.error)return json({ok:false,error:"save_failed"},500);return json({ok:true,item:result.data});
  }
  if(action==="delete_calendar_event"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=clean(body.id,80);if(!id)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_calendar_events").delete().eq("id",id);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="coverage"){
    let q=db.from("multaqa_substitute_assignments").select("*").order("coverage_date",{ascending:false}).order("period").limit(250);
    if(!elevated(e))q=q.eq("replacement_employee_id",e.employee_id);
    const {data}=await q;return json({ok:true,items:data||[]});
  }
  if(action==="publish_coverage"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const date=clean(body.date,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return json({ok:false,error:"invalid_input"},400);
    const {data:items,error}=await db.from("multaqa_substitute_assignments").select("id,period,class_label,subject,replacement_employee_id").eq("coverage_date",date).in("status",["assigned","accepted"]).not("replacement_employee_id","is",null).order("period");
    if(error)return json({ok:false,error:"save_failed"},500);if(!(items||[]).length)return json({ok:false,error:"no_coverage"},404);
    const ids=[...new Set((items||[]).map((x:any)=>x.replacement_employee_id))],{data:emps}=await db.from("multaqa_employees").select("employee_id,full_name,short_name").in("employee_id",ids),names=new Map((emps||[]).map((x:any)=>[x.employee_id,x.short_name||x.full_name]));let sent=0;
    for(const employeeId of ids){const rows=(items||[]).filter((x:any)=>x.replacement_employee_id===employeeId),name=names.get(employeeId);if(!name)continue;const details=rows.map((x:any)=>`الحصة ${x.period} — ${x.class_label}${x.subject?" • "+x.subject:""}`).join(" | ");sent+=await pushToNames(db,[name],`📚 جدول احتياط ${dayFor(date)}`,`${date} • ${details}`,"/school/?open=schedule","coverage_published")}
    const now=new Date().toISOString(),assignmentIds=(items||[]).map((x:any)=>x.id);await db.from("multaqa_substitute_assignments").update({notified_at:now,reminder_sent_at:null,completed_at:null,achievement_recorded_at:null,updated_at:now}).in("id",assignmentIds);
    return json({ok:true,date,assignments:(items||[]).length,teachers:ids.length,sent_devices:sent});
  }
  if(action==="coverage_candidates"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=Number(body.id);if(!Number.isInteger(id)||id<1)return json({ok:false,error:"invalid_input"},400);
    const {data:item}=await db.from("multaqa_substitute_assignments").select("*").eq("id",id).maybeSingle();if(!item)return json({ok:false,error:"not_found"},404);
    const {data:absent}=await db.from("multaqa_employees").select("employee_id,full_name").eq("employee_id",item.absent_employee_id).maybeSingle();if(!absent)return json({ok:false,error:"not_found"},404);
    const candidates:any[]=await candidatesFor(db,absent,item.coverage_date,item.period,new Set(),id);
    return json({ok:true,item,candidates:candidates.map((x:any)=>({employee_id:x.employee_id,full_name:x.full_name,short_name:x.short_name,score:x.score,reason:x.reason}))});
  }
  if(action==="save_coverage_assignment"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=Number(body.id),replacementId=clean(body.replacement_employee_id,30);if(!Number.isInteger(id)||id<1||!replacementId)return json({ok:false,error:"invalid_input"},400);
    const {data:item}=await db.from("multaqa_substitute_assignments").select("*").eq("id",id).maybeSingle();if(!item)return json({ok:false,error:"not_found"},404);
    const [{data:absent},{data:target}]=await Promise.all([db.from("multaqa_employees").select("employee_id,full_name").eq("employee_id",item.absent_employee_id).maybeSingle(),db.from("multaqa_employees").select("employee_id,full_name,short_name,kind").eq("employee_id",replacementId).maybeSingle()]);
    if(!absent||!target||target.kind!=="teacher")return json({ok:false,error:"not_found"},404);
    const candidates:any[]=await candidatesFor(db,absent,item.coverage_date,item.period,new Set(),id),pick=candidates.find((x:any)=>x.employee_id===replacementId);if(!pick)return json({ok:false,error:"coverage_conflict"},409);
    const {data,error}=await db.from("multaqa_substitute_assignments").update({replacement_employee_id:replacementId,status:"assigned",fairness_score:pick.score,reason_summary:`توزيع يدوي بواسطة ${e.short_name||e.full_name} • ${pick.reason}`,assigned_by_employee_id:e.employee_id,notified_at:null,reminder_sent_at:null,completed_at:null,achievement_recorded_at:null,updated_at:new Date().toISOString()}).eq("id",id).select().single();
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,item:data,replacement_name:target.short_name||target.full_name});
  }
  if(action==="auto_reassign_coverage"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=Number(body.id);if(!Number.isInteger(id)||id<1)return json({ok:false,error:"invalid_input"},400);
    const {data:item}=await db.from("multaqa_substitute_assignments").select("*").eq("id",id).maybeSingle();if(!item)return json({ok:false,error:"not_found"},404);
    const {data:absent}=await db.from("multaqa_employees").select("employee_id,full_name").eq("employee_id",item.absent_employee_id).maybeSingle();if(!absent)return json({ok:false,error:"not_found"},404);
    const candidates:any[]=await candidatesFor(db,absent,item.coverage_date,item.period,new Set(),id),pick=candidates[0]||null;
    const {data,error}=await db.from("multaqa_substitute_assignments").update({replacement_employee_id:pick?.employee_id||null,status:pick?"assigned":"proposed",fairness_score:pick?.score??null,reason_summary:pick?`توزيع إلكتروني محدّث • ${pick.reason}`:"لا توجد معلمة متاحة دون تعارض",assigned_by_employee_id:e.employee_id,notified_at:null,reminder_sent_at:null,completed_at:null,achievement_recorded_at:null,updated_at:new Date().toISOString()}).eq("id",id).select().single();
    if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,item:data,replacement_name:pick?.short_name||pick?.full_name||null});
  }
  if(action==="search_students"){
    const query=clean(body.query,100),className=clean(body.class_name,100);let q=db.from("multaqa_students").select("school_id,serial,name,class_name").order("class_name").order("serial").limit(80);
    if(className)q=q.eq("class_name",className);if(query)q=q.ilike("name",`%${query.replace(/[%_]/g,"")} %`.replace(" %","%"));
    const {data}=await q;return json({ok:true,students:data||[]});
  }
  if(action==="excellence"){
    const date=clean(body.date,10)||muscatDate();const [{data:teachers},{data:classes}]=await Promise.all([
      db.from("multaqa_teacher_excellence").select("*").eq("award_date",date),
      db.from("multaqa_class_excellence").select("*").eq("award_date",date)
    ]);return json({ok:true,teachers:teachers||[],classes:classes||[]});
  }
  if(action==="save_bus"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=Number(body.id)||null,row={route_name:clean(body.route_name,150),trip_order:Number(body.trip_order)||1,departure_label:clean(body.departure_label,150)||null,destination:clean(body.destination,200)||null,driver_name:clean(body.driver_name,200)||null,driver_phone:clean(body.driver_phone,30)||null,departure_time:clean(body.departure_time,8)||null,note:clean(body.note,800)||null,active:true,updated_at:new Date().toISOString()};if(!row.route_name)return json({ok:false,error:"invalid_input"},400);const q=id?db.from("multaqa_bus_routes").update(row).eq("id",id):db.from("multaqa_bus_routes").insert(row);const {error}=await q;if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="analytics"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const from=clean(body.from,10)||muscatDate(),to=clean(body.to,10)||from;
    const [{data:students},{data:teachers},{data:permissions},{data:duties},{data:observations},{data:activities},{data:activityTasks},{data:gifted},{data:followups}]=await Promise.all([
      db.from("multaqa_student_attendance").select("attendance_date,class_name,status,excuse_category").gte("attendance_date",from).lte("attendance_date",to),
      db.from("multaqa_teacher_attendance").select("attendance_date,status,reason_category").gte("attendance_date",from).lte("attendance_date",to),
      db.from("multaqa_teacher_permissions").select("permission_date,status,reason_category,from_period,to_period,leave_time,expected_return_time,actual_return_time").gte("permission_date",from).lte("permission_date",to),
      db.from("multaqa_duty_attendance").select("duty_date,status,stars").gte("duty_date",from).lte("duty_date",to),
      db.from("multaqa_class_observations").select("observed_at,class_label,status,resolved").gte("observed_at",`${from}T00:00:00+04:00`).lte("observed_at",`${to}T23:59:59+04:00`),
      db.from("multaqa_school_activities").select("activity_date,activity_type,status").gte("activity_date",from).lte("activity_date",to),
      db.from("multaqa_activity_tasks").select("status,priority,due_date").gte("created_at",`${from}T00:00:00+04:00`).lte("created_at",`${to}T23:59:59+04:00`),
      db.from("multaqa_gifted_students").select("status,talent_category"),
      db.from("multaqa_case_followups").select("follow_up_date,follow_up_type").gte("follow_up_date",from).lte("follow_up_date",to)
    ]);
    const tally=(a:any[],key:string)=>a.reduce((m:any,x:any)=>{const k=x[key]||"unspecified";m[k]=(m[k]||0)+1;return m},{});
    return json({ok:true,from,to,students:{total:(students||[]).length,status:tally(students||[],"status"),reasons:tally((students||[]).filter((x:any)=>x.excuse_category),"excuse_category"),classes:tally((students||[]).filter((x:any)=>x.status==="absent"),"class_name")},teachers:{total:(teachers||[]).length,status:tally(teachers||[],"status"),reasons:tally((teachers||[]).filter((x:any)=>x.reason_category),"reason_category")},permissions:{total:(permissions||[]).length,status:tally(permissions||[],"status"),reasons:tally(permissions||[],"reason_category")},duty:{total:(duties||[]).length,status:tally(duties||[],"status")},observations:{total:(observations||[]).length,status:tally(observations||[],"status")},activities:{total:(activities||[]).length,types:tally(activities||[],"activity_type"),status:tally(activities||[],"status")},activity_tasks:{total:(activityTasks||[]).length,status:tally(activityTasks||[],"status"),priority:tally(activityTasks||[],"priority")},gifted:{total:(gifted||[]).length,talents:tally(gifted||[],"talent_category")},case_followups:{total:(followups||[]).length,types:tally(followups||[],"follow_up_type")}});
  }
  if(action==="class_roster"){
    const className=clean(body.class_name,100);const date=clean(body.date,10)||muscatDate(),period=Number(body.period||0);if(!className)return json({ok:false,error:"invalid_input"},400);
    const [{data:students},{data:attendance},{data:schedule}]=await Promise.all([db.from("multaqa_students").select("school_id,serial,name,class_name").eq("class_name",className).order("serial"),db.from("multaqa_student_attendance").select("student_school_id,status,excuse_category,reason,late_at,note").eq("class_name",className).eq("attendance_date",date).eq("period",period),db.from("multaqa_class_schedules").select("schedule").eq("class_label",scheduleLabel(className)).maybeSingle()]);
    return json({ok:true,students:students||[],attendance:attendance||[],schedule:schedule?.schedule||{}});
  }
  if(action==="save_student_attendance"){
    const className=clean(body.class_name,100),date=clean(body.date,10)||muscatDate(),period=Number(body.period||0),items=Array.isArray(body.items)?body.items.slice(0,60):[];if(!className||period<0||period>7)return json({ok:false,error:"invalid_input"},400);
    const allowed=new Set(["present","absent","late","excused","permission"]),rows=items.filter((x:any)=>allowed.has(x.status)).map((x:any)=>({student_school_id:clean(x.student_school_id,30),class_name:className,attendance_date:date,period,status:x.status,excuse_category:clean(x.excuse_category,40)||null,reason:clean(x.reason,500)||null,late_at:clean(x.late_at,8)||null,note:clean(x.note,800)||null,recorded_by_employee_id:e.employee_id,updated_at:new Date().toISOString()}));
    if(rows.length){const {error}=await db.from("multaqa_student_attendance").upsert(rows,{onConflict:"student_school_id,attendance_date,period"});if(error)return json({ok:false,error:"save_failed"},500)}return json({ok:true,saved:rows.length});
  }
  if(action==="request_permission"){
    const type=clean(body.permission_type,30),category=clean(body.reason_category,40),reason=clean(body.reason,1000);if(!["returning","end_of_day","periods"].includes(type)||!reason)return json({ok:false,error:"invalid_input"},400);
    const {data:manager}=await db.from("multaqa_employees").select("employee_id").eq("access_group","management").order("employee_id").limit(1).maybeSingle();const payload={employee_id:e.employee_id,permission_date:clean(body.permission_date,10)||muscatDate(),permission_type:type,from_period:Number(body.from_period)||null,to_period:Number(body.to_period)||null,leave_time:clean(body.leave_time,8)||null,expected_return_time:clean(body.expected_return_time,8)||null,reason_category:category||"other",reason,note:clean(body.note,1000)||null,directed_to_employee_id:manager?.employee_id||null};const {data,error}=await db.from("multaqa_teacher_permissions").insert(payload).select().single();if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true,permission:data});
  }
  if(action==="permissions"){
    let q=db.from("multaqa_teacher_permissions").select("*").order("created_at",{ascending:false}).limit(200);if(!elevated(e))q=q.eq("employee_id",e.employee_id);const {data}=await q;return json({ok:true,items:data||[]});
  }
  if(action==="decide_permission"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const id=clean(body.id,80),status=clean(body.status,20);if(!["approved","rejected"].includes(status))return json({ok:false,error:"invalid_input"},400);
    const {data:p}=await db.from("multaqa_teacher_permissions").select("*").eq("id",id).maybeSingle();if(!p)return json({ok:false,error:"not_found"},404);await db.from("multaqa_teacher_permissions").update({status,decision_note:clean(body.note,800)||null,decided_by_employee_id:e.employee_id,decided_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",id);
    let coverage:any[]=[];if(status==="approved"){const {data:absent}=await db.from("multaqa_employees").select("employee_id,full_name,short_name").eq("employee_id",p.employee_id).single();coverage=await allocateAbsence(db,absent,p.permission_date,"permission",p.id,e.employee_id)}return json({ok:true,coverage});
  }
  if(action==="record_teacher_attendance"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const target=await resolveEmployee(db,clean(body.employee_name,220)),status=clean(body.status,30),date=clean(body.date,10)||muscatDate();if(!target||!["present","late","absent","partial_permission","full_exit","official_task","leave"].includes(status))return json({ok:false,error:"invalid_input"},400);
    await db.from("multaqa_teacher_attendance").upsert({employee_id:target.employee_id,attendance_date:date,status,late_at:clean(body.late_at,8)||null,reason_category:clean(body.reason_category,40)||null,reason:clean(body.reason,500)||null,note:clean(body.note,800)||null,recorded_by_employee_id:e.employee_id,updated_at:new Date().toISOString()},{onConflict:"employee_id,attendance_date"});let coverage:any[]=[];if(status==="absent")coverage=await allocateAbsence(db,target,date,"absence",`${target.employee_id}:${date}`,e.employee_id);return json({ok:true,coverage});
  }
  if(action==="duty_today"){
    const date=clean(body.date,10)||muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("teachers,admins,slots").eq("day_name",day).maybeSingle();const teachers=d?.teachers||[],admins=d?.admins||[],names=[...teachers,...admins];const {data:emps}=await db.from("multaqa_employees").select("employee_id,full_name,short_name");const resolved=names.map((n:string)=>(emps||[]).find((x:any)=>norm(x.short_name)===norm(n)||norm(x.full_name)===norm(n))).filter(Boolean);const isSupervisor=admins.some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name))||elevated(e),onDutyTeacher=teachers.some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name));const {data:checks}=await db.from("multaqa_duty_attendance").select("*").eq("duty_date",date);return json({ok:true,date,day,slots:d?.slots||{},teachers,admins,members:resolved,checks:checks||[],is_supervisor:isSupervisor,can_edit_roles:onDutyTeacher||isSupervisor});
  }
  if(action==="save_duty_admins"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const day=clean(body.day_name,20);if(!["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس"].includes(day))return json({ok:false,error:"invalid_input"},400);
    const admins=(Array.isArray(body.admins)?body.admins:[]).map((n:unknown)=>clean(n,120)).filter(Boolean).slice(0,5);
    const {error}=await db.from("multaqa_duty").update({admins}).eq("day_name",day);if(error)return json({ok:false,error:"save_failed"},500);
    return json({ok:true,day_name:day,admins});
  }
  if(action==="save_duty_roles"){
    const date=clean(body.date,10)||muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("teachers,admins,slots").eq("day_name",day).maybeSingle();if(!d)return json({ok:false,error:"not_found"},404);
    const teachers:string[]=d.teachers||[],admins:string[]=d.admins||[],allowed=elevated(e)||teachers.some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name))||admins.some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name));if(!allowed)return json({ok:false,error:"not_on_duty"},403);
    const keys=["morning","shade","coop","between","cars","buses","reserve"],assignments=Array.isArray(body.assignments)?body.assignments:[];if(assignments.length!==teachers.length)return json({ok:false,error:"invalid_input"},400);
    const canonical=new Map(teachers.map((n:string)=>[norm(n),n])),seen=new Set<string>(),slots:any={morning:[],shade:[],coop:[],between:[],cars:[],buses:[],reserve:[]};
    for(const a of assignments){const name=canonical.get(norm(a?.name)),slot=clean(a?.slot,20);if(!name||!keys.includes(slot)||seen.has(norm(name)))return json({ok:false,error:"invalid_input"},400);seen.add(norm(name));slots[slot].push(name)}
    const oldSlots:any=d.slots||{};for(const key of keys)if(slots[key].length!==(Array.isArray(oldSlots[key])?oldSlots[key].length:0))return json({ok:false,error:"duty_capacity"},409);
    const {error}=await db.from("multaqa_duty").update({slots}).eq("day_name",day);if(error)return json({ok:false,error:"save_failed"},500);const roleNames:any={morning:"الطابور الصباحي",shade:"المظلة",coop:"التعاونية",between:"بين الفصول",cars:"السيارات الخاصة",buses:"الحافلات",reserve:"الاحتياط"},oldRole=new Map<string,string>(),newRole=new Map<string,string>();for(const key of keys){for(const n of oldSlots[key]||[])oldRole.set(norm(n),key);for(const n of slots[key]||[])newRole.set(norm(n),key)}for(const name of teachers){const before=oldRole.get(norm(name)),after=newRole.get(norm(name));if(before!==after)await pushToNames(db,[name],"تم تغيير دور مناوبتك",`مناوبة ${day}: ${roleNames[after||""]||after}`,"/school/","duty")}return json({ok:true,day,slots});
  }
    if(action==="confirm_duty"){
    const date=clean(body.date,10)||muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("admins").eq("day_name",day).maybeSingle();const allowed=elevated(e)||(d?.admins||[]).some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name));if(!allowed)return json({ok:false,error:"forbidden"},403);const target=await resolveEmployee(db,clean(body.employee_name,220)),status=clean(body.status,20),stars=Math.max(0,Math.min(5,Number(body.stars)||0));if(!target||!["present","absent","late","excused"].includes(status))return json({ok:false,error:"invalid_input"},400);await db.from("multaqa_duty_attendance").upsert({duty_date:date,duty_day:day,employee_id:target.employee_id,status,stars,note:clean(body.note,500)||null,confirmed_by_employee_id:e.employee_id,confirmed_at:new Date().toISOString()},{onConflict:"duty_date,employee_id"});return json({ok:true});
  }
  if(action==="report_class"){
    const date=muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("teachers,admins").eq("day_name",day).maybeSingle();const onDuty=[...(d?.teachers||[]),...(d?.admins||[])].some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name));if(!onDuty&&!elevated(e))return json({ok:false,error:"not_on_duty"},403);const status=clean(body.status,20),classLabel=clean(body.class_label,100),period=Number(body.period)||null;if(!classLabel||!["organized","no_teacher","problem"].includes(status))return json({ok:false,error:"invalid_input"},400);
    let notifiedTeacher="",notifiedEmployeeId:string|null=null,sent=0;
    if(status==="no_teacher"&&period&&period>=1&&period<=7){
      const dbLabel=scheduleLabel(classLabel),{data:sched}=await db.from("multaqa_class_schedules").select("schedule").eq("class_label",dbLabel).maybeSingle();const lesson=clean(sched?.schedule?.[day]?.[period-1],500);let targetName=lesson.includes("—")?clean(lesson.split("—").pop(),220):"";
      const labels=[classLabel,dbLabel,classCode(classLabel)];const {data:coverage}=await db.from("multaqa_substitute_assignments").select("replacement_employee_id,class_label").eq("coverage_date",date).eq("period",period).eq("status","assigned").in("class_label",labels).limit(1).maybeSingle();
      if(coverage?.replacement_employee_id){const {data:replacement}=await db.from("multaqa_employees").select("employee_id,short_name,full_name").eq("employee_id",coverage.replacement_employee_id).maybeSingle();if(replacement){notifiedEmployeeId=replacement.employee_id;targetName=replacement.short_name||replacement.full_name||targetName}}
      else if(targetName){const resolved=await resolveEmployee(db,targetName);if(resolved){notifiedEmployeeId=resolved.employee_id;targetName=resolved.short_name||resolved.full_name||targetName}}
      if(targetName&&notifiedEmployeeId){notifiedTeacher=targetName;sent=await pushToNames(db,[targetName],"🚨 صف بدون معلمة",`الصف ${classLabel} • الحصة ${period}. يرجى التوجه إلى الصف الآن.`,"/school/","class_alert")}
    }
    const {data}=await db.from("multaqa_class_observations").insert({class_label:classLabel,period,status,note:clean(body.note,800)||null,reported_by_employee_id:e.employee_id,notified_employee_id:notifiedEmployeeId}).select().single();
    return json({ok:true,item:data,notified_teacher:notifiedTeacher,push_sent:sent});
  }
  if(action==="import_teacher_phones"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const rows=Array.isArray(body.phones)?body.phones:[];const result:any={ok:0,failed:[] as string[]};
    for(const r of rows){
      const nameHint=clean(r?.name,220);let digits=String(r?.phone??"").replace(/[٠-٩]/g,(c:string)=>"٠١٢٣٤٥٦٧٨٩".indexOf(c).toString()).replace(/\D/g,"");
      if(digits.startsWith("00"))digits=digits.slice(2);if(digits.length===8)digits="968"+digits;
      if(!nameHint||digits.length<11){result.failed.push((nameHint||"?")+": رقم أو اسم غير صالح");continue}
      const target=await resolveEmployee(db,nameHint);
      if(!target){result.failed.push(nameHint+" (لم يتم التعرّف على الاسم)");continue}
      const {error}=await db.from("multaqa_employee_profiles").upsert({employee_id:target.employee_id,contact_phone:digits});
      if(error)result.failed.push(nameHint+": "+error.message);else result.ok++;
    }
    return json({ok:true,...result});
  }
  if(action==="resource_bookings"){
    const from=clean(body.from,10)||muscatDate(),to=clean(body.to,10)||from;
    const {data}=await db.from("multaqa_resource_bookings").select("id,resource_key,resource_label,booking_date,period,note,booked_by_employee_id").gte("booking_date",from).lte("booking_date",to).order("booking_date").order("period");
    const ids=[...new Set((data||[]).map((x:any)=>x.booked_by_employee_id))];
    const {data:emps}=ids.length?await db.from("multaqa_employees").select("employee_id,short_name,full_name").in("employee_id",ids):{data:[]};
    const nameOf=(id:string)=>{const x=(emps||[]).find((v:any)=>v.employee_id===id);return x?.short_name||x?.full_name||"—"};
    const items=(data||[]).map((x:any)=>({...x,booked_by_name:nameOf(x.booked_by_employee_id)}));
    return json({ok:true,resources:RESOURCES,items});
  }
  if(action==="create_resource_booking"){
    const resourceKey=clean(body.resource_key,40),resource=RESOURCES.find(r=>r.key===resourceKey);
    if(!resource)return json({ok:false,error:"invalid_input"},400);
    const date=clean(body.booking_date,10),period=Number(body.period);
    if(!date||!period||period<1||period>7)return json({ok:false,error:"invalid_input"},400);
    const note=clean(body.note,300)||null,owner=RESOURCE_OWNERS[resourceKey]||null;
    const {error}=await db.from("multaqa_resource_bookings").insert({resource_key:resourceKey,resource_label:resource.label,booking_date:date,period,note,booked_by_employee_id:e.employee_id,notified_to:owner});
    if(error){if(String((error as any).code)==="23505")return json({ok:false,error:"already_booked"},409);return json({ok:false,error:"save_failed"},500);}
    let sent=0;
    if(owner&&norm(owner)!==norm(e.short_name)&&norm(owner)!==norm(e.full_name))sent=await pushToNames(db,[owner],"📅 حجز جديد: "+resource.label,`${e.short_name||e.full_name} حجزت ${resource.label} يوم ${date} — الحصة ${period}${note?" • "+note:""}`,"/school/","resource_booking");
    return json({ok:true,notified:!!owner,push_sent:sent});
  }
  if(action==="cancel_resource_booking"){
    const id=clean(body.id,60);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {data:row}=await db.from("multaqa_resource_bookings").select("id,booked_by_employee_id").eq("id",id).maybeSingle();if(!row)return json({ok:false,error:"not_found"},404);
    if(row.booked_by_employee_id!==e.employee_id&&!elevated(e))return json({ok:false,error:"forbidden"},403);
    await db.from("multaqa_resource_bookings").delete().eq("id",id);return json({ok:true});
  }
  if(action==="send_staff_message"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const names=(Array.isArray(body.employee_names)?body.employee_names:[]).map((x:any)=>clean(x,220)).filter(Boolean).slice(0,120);
    const title=clean(body.title,120),message=clean(body.message,900);
    if(!names.length||!title||!message)return json({ok:false,error:"invalid_input"},400);
    const sent=await pushToNames(db,names,title,message,"/school/","staff_message");
    return json({ok:true,sent,total:names.length});
  }
  if(action==="recent_staff_messages"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);
    const {data}=await db.from("multaqa_notification_log").select("employee_name,title,body,success,created_at").eq("kind","staff_message").order("created_at",{ascending:false}).limit(60);
    return json({ok:true,items:data||[]});
  }
  if(action==="my_class_alerts"){
    const since=`${muscatDate()}T00:00:00+04:00`;
    const {data}=await db.from("multaqa_class_observations").select("id,class_label,period,note,created_at").eq("notified_employee_id",e.employee_id).eq("status","no_teacher").is("acknowledged_at",null).gte("created_at",since).order("created_at",{ascending:false});
    return json({ok:true,items:data||[]});
  }
  if(action==="ack_class_alert"){
    const id=clean(body.id,60);if(!id)return json({ok:false,error:"invalid_input"},400);
    const {data:row}=await db.from("multaqa_class_observations").select("id,notified_employee_id,acknowledged_at").eq("id",id).maybeSingle();if(!row)return json({ok:false,error:"not_found"},404);
    if(row.notified_employee_id!==e.employee_id&&!elevated(e))return json({ok:false,error:"forbidden"},403);
    if(!row.acknowledged_at)await db.from("multaqa_class_observations").update({acknowledged_at:new Date().toISOString(),acknowledged_by_employee_id:e.employee_id}).eq("id",id);
    return json({ok:true});
  }
  if(action==="save_excellence"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const type=clean(body.type,20),reasons=Array.isArray(body.reasons)?body.reasons.map((x:any)=>clean(x,100)).filter(Boolean).slice(0,15):[];if(type==="teacher"){const target=await resolveEmployee(db,clean(body.employee_name,220));if(!target)return json({ok:false,error:"not_found"},404);await db.from("multaqa_teacher_excellence").upsert({employee_id:target.employee_id,award_date:clean(body.date,10)||muscatDate(),period_label:clean(body.period_label,30)||"daily",reasons,note:clean(body.note,800)||null,selected_by_employee_id:e.employee_id},{onConflict:"employee_id,award_date,period_label"})}else{const cls=clean(body.class_label,100);if(!cls)return json({ok:false,error:"invalid_input"},400);await db.from("multaqa_class_excellence").upsert({class_label:cls,award_date:clean(body.date,10)||muscatDate(),period_label:clean(body.period_label,30)||"daily",reasons,note:clean(body.note,800)||null,selected_by_employee_id:e.employee_id},{onConflict:"class_label,award_date,period_label"})}return json({ok:true});
  }
  if(action==="student_case"){
    const sid=clean(body.student_school_id,30);const {data:s}=await db.from("multaqa_students").select("school_id,serial,name,class_name,guardian_phone,area").eq("school_id",sid).maybeSingle();if(!s)return json({ok:false,error:"not_found"},404);const [{data:c},{data:n},{data:t},{data:f},{data:p},{data:files}]=await Promise.all([db.from("multaqa_student_cases").select("*").eq("student_school_id",sid).maybeSingle(),db.from("multaqa_student_case_notes").select("id,employee_id,subject_label,note,visibility,created_at").eq("student_school_id",sid).order("created_at",{ascending:false}),db.from("multaqa_student_talents").select("*").eq("student_school_id",sid),caseTeam(e)?db.from("multaqa_case_followups").select("*").eq("student_school_id",sid).order("follow_up_date",{ascending:false}):Promise.resolve({data:[]}),caseTeam(e)?db.from("multaqa_case_plans").select("*").eq("student_school_id",sid).order("created_at",{ascending:false}):Promise.resolve({data:[]}),caseTeam(e)?db.from("multaqa_case_files").select("*").eq("student_school_id",sid).order("created_at",{ascending:false}):Promise.resolve({data:[]})]);const safeCase=caseTeam(e)?c:(c?{academic_level:c.academic_level,indicators:c.indicators,follow_up_issue:c.confidential?null:c.follow_up_issue}:null);const notes=caseTeam(e)?(n||[]):(n||[]).filter((x:any)=>x.visibility==="all_teachers"||x.employee_id===e.employee_id);const secureFiles=await Promise.all((files||[]).map(async(x:any)=>{const {data:u}=await db.storage.from("student-case-files").createSignedUrl(x.storage_path,900);return {...x,url:u?.signedUrl||null}}));return json({ok:true,student:{school_id:s.school_id,serial:s.serial,name:s.name,class_name:s.class_name,area:caseTeam(e)?s.area:null,guardian_phone:caseTeam(e)?s.guardian_phone:null},case:safeCase,notes,talents:t||[],followups:f||[],plans:p||[],files:secureFiles});
  }
  if(action==="save_student_case"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),academicCategory=clean(body.academic_category,30);const row={student_school_id:sid,residence:clean(body.residence,200)||null,contact_phone:clean(body.contact_phone,30)||null,social_status:clean(body.social_status,900)||null,living_standard:clean(body.living_standard,100)||null,family_status:clean(body.family_status,700)||null,health_status:clean(body.health_status,900)||null,psychological_notes:clean(body.psychological_notes,1200)||null,cognitive_notes:clean(body.cognitive_notes,1200)||null,administrative_notes:clean(body.administrative_notes,1200)||null,support_needs:clean(body.support_needs,1200)||null,follow_up_issue:clean(body.follow_up_issue,1600)||null,follow_up_status:["open","monitoring","stable","closed"].includes(clean(body.follow_up_status,20))?clean(body.follow_up_status,20):"open",next_follow_up_date:clean(body.next_follow_up_date,10)||null,academic_level:clean(body.academic_level,20)||null,financial_support:body.financial_support===true,academic_category:["low","average","distinguished"].includes(academicCategory)?academicCategory:null,support_priority:clean(body.support_priority,40)||null,support_program:clean(body.support_program,1200)||null,support_note:clean(body.support_note,1600)||null,indicators:Array.isArray(body.indicators)?body.indicators.map((x:any)=>clean(x,100)).filter(Boolean).slice(0,20):[],confidential:body.confidential!==false,assigned_to_employee_id:clean(body.assigned_to_employee_id,30)||null,updated_by_employee_id:e.employee_id,updated_at:new Date().toISOString()};const {error}=await db.from("multaqa_student_cases").upsert(row);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="add_case_followup"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),summary=clean(body.summary,1800);if(!sid||!summary)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_case_followups").insert({student_school_id:sid,follow_up_date:clean(body.follow_up_date,10)||muscatDate(),follow_up_type:clean(body.follow_up_type,80)||"meeting",summary,outcome:clean(body.outcome,1400)||null,next_step:clean(body.next_step,1400)||null,next_follow_up_date:clean(body.next_follow_up_date,10)||null,created_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="save_case_plan"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),title=clean(body.title,220),goals=clean(body.goals,1800),actions=clean(body.actions,1800);if(!sid||!title||!goals||!actions)return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_case_plans").insert({student_school_id:sid,title,goals,actions,responsible_parties:clean(body.responsible_parties,1000)||null,start_date:clean(body.start_date,10)||muscatDate(),review_date:clean(body.review_date,10)||null,status:"active",created_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="prepare_case_file_upload"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),mime=clean(body.mime_type,120);const allowed:any={"application/pdf":"pdf","image/jpeg":"jpg","image/png":"png","application/msword":"doc","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"docx"};if(!sid||!allowed[mime])return json({ok:false,error:"invalid_input"},400);const path=`cases/${sid}/${crypto.randomUUID()}.${allowed[mime]}`;const {data:signed,error}=await db.storage.from("student-case-files").createSignedUploadUrl(path);if(error||!signed)return json({ok:false,error:"upload_failed"},500);return json({ok:true,path,token:signed.token,signed_url:signed.signedUrl});
  }
  if(action==="complete_case_file_upload"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30),path=clean(body.path,700),title=clean(body.title,220);if(!sid||!title||!path.startsWith(`cases/${sid}/`))return json({ok:false,error:"invalid_input"},400);const {error}=await db.from("multaqa_case_files").insert({student_school_id:sid,title,storage_path:path,mime_type:clean(body.mime_type,120)||null,file_size:Math.max(0,Number(body.file_size)||0)||null,uploaded_by_employee_id:e.employee_id});if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
  }
  if(action==="add_case_note"){
    const sid=clean(body.student_school_id,30),note=clean(body.note,1600);if(!sid||!note)return json({ok:false,error:"invalid_input"},400);let visibility=clean(body.visibility,30)||"case_team";if(!caseTeam(e)&&visibility!=="all_teachers")visibility="all_teachers";await db.from("multaqa_student_case_notes").insert({student_school_id:sid,employee_id:e.employee_id,subject_label:clean(body.subject_label,100)||e.role,note,visibility});return json({ok:true});
  }
  if(action==="add_talent"){
    const sid=clean(body.student_school_id,30),category=clean(body.talent_category,100);if(!sid||!category)return json({ok:false,error:"invalid_input"},400);await db.from("multaqa_student_talents").insert({student_school_id:sid,talent_category:category,talent_description:clean(body.talent_description,1000)||null,evidence_url:clean(body.evidence_url,1000)||null,recorded_by_employee_id:e.employee_id});return json({ok:true});
  }
  return json({ok:false,error:"unknown_action"},400);
});
