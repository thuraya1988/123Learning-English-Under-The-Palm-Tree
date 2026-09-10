import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2.4.3";

const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"content-type,x-staff-session","Access-Control-Allow-Methods":"POST,OPTIONS","Content-Type":"application/json; charset=utf-8"};
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:cors});
const clean=(v:unknown,max=1000)=>String(v??"").trim().slice(0,max);
const norm=(v:unknown)=>clean(v,220).replace(/^أ\.\s*/,"").replace(/[إأآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/ـ/g,"").replace(/[ًٌٍَُِّْ]/g,"").replace(/\s+/g," ").toLowerCase();
const pinOk=(v:string)=>/^\d{6,12}$/.test(v);
const omDays=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
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
    db.from("multaqa_employee_profiles").select("display_title,subject,photo_url,welcome_name,bio_line").eq("employee_id",e.employee_id).maybeSingle(),
    db.from("multaqa_welcome_messages").select("message").eq("active",true).in("audience",["all",e.access_group||e.kind]).limit(250)
  ]);
  const list=w||[],msg=(list[Math.floor(Math.random()*Math.max(list.length,1))]?.message||"مرحبًا {name}، يومك مليء بالإنجاز").replace("{name}",p?.welcome_name||e.short_name);
  return {...e,profile:p||{},welcome_message:msg};
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
async function candidatesFor(db:any,absent:any,date:string,period:number,used:Set<string>){
  const day=dayFor(date),[{data:emps},{data:schedules},{data:recent},{data:today}]=await Promise.all([
    db.from("multaqa_employees").select("employee_id,full_name,short_name,role").eq("kind","teacher"),
    db.from("multaqa_teacher_schedules").select("full_name,schedule"),
    db.from("multaqa_substitute_assignments").select("replacement_employee_id").gte("coverage_date",new Date(Date.now()-30*86400000).toISOString().slice(0,10)).neq("status","cancelled"),
    db.from("multaqa_substitute_assignments").select("replacement_employee_id,period").eq("coverage_date",date).neq("status","cancelled")
  ]);
  const byName=new Map((schedules||[]).map((x:any)=>[norm(x.full_name),x.schedule||{}]));const counts=new Map<string,number>();
  for(const x of recent||[])if(x.replacement_employee_id)counts.set(x.replacement_employee_id,(counts.get(x.replacement_employee_id)||0)+1);
  return (emps||[]).filter((e:any)=>e.employee_id!==absent.employee_id).map((e:any)=>{
    const s:any=byName.get(norm(e.full_name))||{},slots:any[]=s[day]||[],i=period-1;
    if(clean(slots[i]))return null;
    if((today||[]).some((x:any)=>x.replacement_employee_id===e.employee_id&&x.period===period))return null;
    const busy=(j:number)=>j>=0&&j<7&&(clean(slots[j])||(today||[]).some((x:any)=>x.replacement_employee_id===e.employee_id&&x.period===j+1));
    const before=busy(i-1),after=busy(i+1),before2=busy(i-2),after2=busy(i+2);
    if((before&&after)||(before&&before2)||(after&&after2))return null;
    const daily=slots.filter(x=>clean(x)).length+(today||[]).filter((x:any)=>x.replacement_employee_id===e.employee_id).length;
    const score=(counts.get(e.employee_id)||0)*100+daily*8+(before||after?30:0)+(used.has(e.employee_id)?500:0);
    return {...e,score,reason:`احتياط آخر 30 يومًا: ${counts.get(e.employee_id)||0} • حصص اليوم: ${daily}`};
  }).filter(Boolean).sort((a:any,b:any)=>a.score-b.score);
}
async function allocateAbsence(db:any,absent:any,date:string,sourceType:string,sourceId:string,by:string){
  const day=dayFor(date),{data:row}=await db.from("multaqa_teacher_schedules").select("schedule").eq("full_name",absent.full_name).maybeSingle();const slots:any[]=row?.schedule?.[day]||[],used=new Set<string>(),out:any[]=[];
  for(let i=0;i<7;i++){
    const lesson=clean(slots[i],500);if(!lesson)continue;const parts=lesson.split("•").map(x=>x.trim()),subject=parts[0]||"",classLabel=parts[1]||lesson;
    const list:any[]=await candidatesFor(db,absent,date,i+1,used);const pick=list[0]||null;if(pick)used.add(pick.employee_id);
    const payload={coverage_date:date,day_name:day,period:i+1,class_label:classLabel,subject,absent_employee_id:absent.employee_id,replacement_employee_id:pick?.employee_id||null,source_type:sourceType,source_id:sourceId,status:pick?"assigned":"proposed",fairness_score:pick?.score??null,reason_summary:pick?.reason||"لا توجد معلمة متاحة دون تعارض",assigned_by_employee_id:by};
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
    const {data:schedule}=await db.from("multaqa_teacher_schedules").select("full_name,page,schedule").eq("full_name",target.full_name).maybeSingle();
    if(!schedule)return json({ok:false,error:"not_found"},404);
    return json({ok:true,employee:{employee_id:target.employee_id,full_name:target.full_name,short_name:target.short_name},schedule});
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
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const type=clean(body.activity_type,30),title=clean(body.title,220),id=clean(body.id,80);if(!title||!["broadcast","scouts_guides","safety","mothers_council","school_health"].includes(type))return json({ok:false,error:"invalid_input"},400);
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
    const [{data:employees},{data:classRows},{data:buses}]=await Promise.all([
      db.from("multaqa_employees").select("employee_id,full_name,short_name,role,kind,access_group").order("full_name"),
      db.from("multaqa_class_schedules").select("class_label").order("page"),
      db.from("multaqa_bus_routes").select("*").eq("active",true).order("trip_order")
    ]);
    return json({ok:true,employees:employees||[],classes:(classRows||[]).map((x:any)=>classCode(x.class_label)),buses:buses||[]});
  }
  if(action==="coverage"){
    let q=db.from("multaqa_substitute_assignments").select("*").order("coverage_date",{ascending:false}).order("period").limit(250);
    if(!elevated(e))q=q.eq("replacement_employee_id",e.employee_id);
    const {data}=await q;return json({ok:true,items:data||[]});
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
    const date=clean(body.date,10)||muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("teachers,admins,slots").eq("day_name",day).maybeSingle();const names=[...(d?.teachers||[]),...(d?.admins||[])];const {data:emps}=await db.from("multaqa_employees").select("employee_id,full_name,short_name");const resolved=names.map((n:string)=>(emps||[]).find((x:any)=>norm(x.short_name)===norm(n)||norm(x.full_name)===norm(n))).filter(Boolean);const isSupervisor=(d?.admins||[]).some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name))||elevated(e);const {data:checks}=await db.from("multaqa_duty_attendance").select("*").eq("duty_date",date);return json({ok:true,date,day,slots:d?.slots||{},members:resolved,checks:checks||[],is_supervisor:isSupervisor});
  }
  if(action==="confirm_duty"){
    const date=clean(body.date,10)||muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("admins").eq("day_name",day).maybeSingle();const allowed=elevated(e)||(d?.admins||[]).some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name));if(!allowed)return json({ok:false,error:"forbidden"},403);const target=await resolveEmployee(db,clean(body.employee_name,220)),status=clean(body.status,20),stars=Math.max(0,Math.min(5,Number(body.stars)||0));if(!target||!["present","absent","late","excused"].includes(status))return json({ok:false,error:"invalid_input"},400);await db.from("multaqa_duty_attendance").upsert({duty_date:date,duty_day:day,employee_id:target.employee_id,status,stars,note:clean(body.note,500)||null,confirmed_by_employee_id:e.employee_id,confirmed_at:new Date().toISOString()},{onConflict:"duty_date,employee_id"});return json({ok:true});
  }
  if(action==="report_class"){
    const date=muscatDate(),day=dayFor(date),{data:d}=await db.from("multaqa_duty").select("teachers,admins").eq("day_name",day).maybeSingle();const onDuty=[...(d?.teachers||[]),...(d?.admins||[])].some((n:string)=>norm(n)===norm(e.short_name)||norm(n)===norm(e.full_name));if(!onDuty&&!elevated(e))return json({ok:false,error:"not_on_duty"},403);const status=clean(body.status,20),classLabel=clean(body.class_label,100);if(!classLabel||!["organized","no_teacher","problem"].includes(status))return json({ok:false,error:"invalid_input"},400);const {data}=await db.from("multaqa_class_observations").insert({class_label:classLabel,period:Number(body.period)||null,status,note:clean(body.note,800)||null,reported_by_employee_id:e.employee_id}).select().single();return json({ok:true,item:data});
  }
  if(action==="save_excellence"){
    if(!elevated(e))return json({ok:false,error:"forbidden"},403);const type=clean(body.type,20),reasons=Array.isArray(body.reasons)?body.reasons.map((x:any)=>clean(x,100)).filter(Boolean).slice(0,15):[];if(type==="teacher"){const target=await resolveEmployee(db,clean(body.employee_name,220));if(!target)return json({ok:false,error:"not_found"},404);await db.from("multaqa_teacher_excellence").upsert({employee_id:target.employee_id,award_date:clean(body.date,10)||muscatDate(),period_label:clean(body.period_label,30)||"daily",reasons,note:clean(body.note,800)||null,selected_by_employee_id:e.employee_id},{onConflict:"employee_id,award_date,period_label"})}else{const cls=clean(body.class_label,100);if(!cls)return json({ok:false,error:"invalid_input"},400);await db.from("multaqa_class_excellence").upsert({class_label:cls,award_date:clean(body.date,10)||muscatDate(),period_label:clean(body.period_label,30)||"daily",reasons,note:clean(body.note,800)||null,selected_by_employee_id:e.employee_id},{onConflict:"class_label,award_date,period_label"})}return json({ok:true});
  }
  if(action==="student_case"){
    const sid=clean(body.student_school_id,30);const {data:s}=await db.from("multaqa_students").select("school_id,serial,name,class_name,guardian_phone,area").eq("school_id",sid).maybeSingle();if(!s)return json({ok:false,error:"not_found"},404);const [{data:c},{data:n},{data:t},{data:f},{data:p},{data:files}]=await Promise.all([db.from("multaqa_student_cases").select("*").eq("student_school_id",sid).maybeSingle(),db.from("multaqa_student_case_notes").select("id,employee_id,subject_label,note,visibility,created_at").eq("student_school_id",sid).order("created_at",{ascending:false}),db.from("multaqa_student_talents").select("*").eq("student_school_id",sid),caseTeam(e)?db.from("multaqa_case_followups").select("*").eq("student_school_id",sid).order("follow_up_date",{ascending:false}):Promise.resolve({data:[]}),caseTeam(e)?db.from("multaqa_case_plans").select("*").eq("student_school_id",sid).order("created_at",{ascending:false}):Promise.resolve({data:[]}),caseTeam(e)?db.from("multaqa_case_files").select("*").eq("student_school_id",sid).order("created_at",{ascending:false}):Promise.resolve({data:[]})]);const safeCase=caseTeam(e)?c:(c?{academic_level:c.academic_level,indicators:c.indicators,follow_up_issue:c.confidential?null:c.follow_up_issue}:null);const notes=caseTeam(e)?(n||[]):(n||[]).filter((x:any)=>x.visibility==="all_teachers"||x.employee_id===e.employee_id);const secureFiles=await Promise.all((files||[]).map(async(x:any)=>{const {data:u}=await db.storage.from("student-case-files").createSignedUrl(x.storage_path,900);return {...x,url:u?.signedUrl||null}}));return json({ok:true,student:{school_id:s.school_id,serial:s.serial,name:s.name,class_name:s.class_name,area:caseTeam(e)?s.area:null,guardian_phone:caseTeam(e)?s.guardian_phone:null},case:safeCase,notes,talents:t||[],followups:f||[],plans:p||[],files:secureFiles});
  }
  if(action==="save_student_case"){
    if(!caseTeam(e))return json({ok:false,error:"forbidden"},403);const sid=clean(body.student_school_id,30);const row={student_school_id:sid,residence:clean(body.residence,200)||null,contact_phone:clean(body.contact_phone,30)||null,social_status:clean(body.social_status,900)||null,living_standard:clean(body.living_standard,100)||null,family_status:clean(body.family_status,700)||null,health_status:clean(body.health_status,900)||null,psychological_notes:clean(body.psychological_notes,1200)||null,cognitive_notes:clean(body.cognitive_notes,1200)||null,administrative_notes:clean(body.administrative_notes,1200)||null,support_needs:clean(body.support_needs,1200)||null,follow_up_issue:clean(body.follow_up_issue,1600)||null,follow_up_status:["open","monitoring","stable","closed"].includes(clean(body.follow_up_status,20))?clean(body.follow_up_status,20):"open",next_follow_up_date:clean(body.next_follow_up_date,10)||null,academic_level:clean(body.academic_level,20)||null,indicators:Array.isArray(body.indicators)?body.indicators.map((x:any)=>clean(x,100)).filter(Boolean).slice(0,20):[],confidential:body.confidential!==false,assigned_to_employee_id:clean(body.assigned_to_employee_id,30)||null,updated_by_employee_id:e.employee_id,updated_at:new Date().toISOString()};const {error}=await db.from("multaqa_student_cases").upsert(row);if(error)return json({ok:false,error:"save_failed"},500);return json({ok:true});
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
