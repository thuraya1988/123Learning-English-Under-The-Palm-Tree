const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {stripTypeScriptTypes}=require('node:module');
const root=process.argv[2]||'.';
const read=p=>fs.readFileSync(fs.existsSync(root+'/'+p)?root+'/'+p:root+'/'+p.replace(/^supabase\/(.+)\.ts$/,'supabase/functions/$1/index.ts'),'utf8');
let checks=0;
const pass=label=>{checks++;console.log('PASS '+label)};

function edge(name,options={}){
 let handler;const calls=[],writes=[],background=[];
 const employee=options.employee||{employee_id:'fixture-teacher',kind:'teacher',short_name:'Fixture teacher',full_name:'Fixture teacher',role:'Teacher',access_group:'viewer'};
 function query(table){
  const chain=[];const q=new Proxy({}, {get(_,method){if(method==='then')return (resolve,reject)=>{calls.push({table,chain});let result;
   if(table==='multaqa_staff_sessions')result={data:{id:'fixture-session',employee_id:employee.employee_id,expires_at:'2999-01-01',revoked_at:null}};
   else if(table==='multaqa_employees'&&chain.some(x=>x[0]==='maybeSingle'))result={data:employee};
   else result=options.respond?.(table,chain)||{data:[],error:null,count:0};
   const write=chain.find(x=>['insert','upsert','update','delete'].includes(x[0]));if(write)writes.push({table,operation:write[0],payload:write[1]});
   return Promise.resolve(result).then(resolve,reject);
  };return(...args)=>{chain.push([method,...args]);return q}}});return q;
 }
 const db={from:query,storage:{from:bucket=>({
  createSignedUrl:async path=>({data:{signedUrl:'https://fixture.invalid/'+path}}),
  createSignedUploadUrl:async path=>({data:{signedUrl:'https://fixture.invalid/upload/'+path}}),
  list:async()=>options.storageResult||{data:[{name:'fixture.pdf',metadata:{size:100,mimetype:'application/pdf'}}]},
 })}};
 const context={Request,Response,TextEncoder,crypto,btoa,console,createClient:()=>db,bcrypt:{},webpush:{},EdgeRuntime:{waitUntil:p=>background.push(p)},Deno:{env:{get:()=>''},serve:f=>handler=f}};
 vm.createContext(context);vm.runInContext(stripTypeScriptTypes(read('supabase/'+name+'.ts')).replace(/^import .*;\s*$/mg,''),context);
 return {calls,writes,background,async run(action,p={},auth=true){const r=await handler(new Request('https://fixture.invalid/api',{method:'POST',headers:{'Content-Type':'application/json',...(auth?{'x-staff-session':'isolated-fixture-token'}:{})},body:JSON.stringify({action,...p})}));return {status:r.status,data:await r.json()}}};
}

(async()=>{
 const frontend=read('school/secure-platform.js');
 const context={AbortController,setTimeout,clearTimeout,staffToken:'',SECURE_API:'https://fixture.invalid',fetch:async()=>({ok:false,json:async()=>({ok:false,error:'save_failed'})})};
 vm.createContext(context);
 const api=frontend.slice(frontend.indexOf('async function staffApi('),frontend.indexOf('function staffError('));
 const feature=frontend.slice(frontend.indexOf('async function featureApi('),frontend.indexOf('const POSTHOG_KEY='));
 vm.runInContext(api+'\n'+feature,context);
 for(const action of ['save_teacher_profile','save_teacher_project','save_broadcast_schedule','save_mothers_council','classify_student_support'])await assert.rejects(context.featureApi(action,{}),e=>e.code==='save_failed');
 pass('Failed saves propagate errors instead of reporting local-only success');
 context.fetch=async()=>({ok:false,json:async()=>({ok:false,error:'invalid_input'})});await assert.rejects(context.featureApi('save_teacher_profile'),e=>e.code==='invalid_input');
 context.fetch=async()=>({ok:true,json:async()=>{throw new Error('bad json')}});await assert.rejects(context.staffApi('teacher_profiles'),e=>e.code==='request_failed');
 context.fetch=async()=>({ok:true,json:async()=>({ok:true,saved:1})});assert.equal((await context.featureApi('save_teacher_profile')).saved,1);pass('Validation, malformed responses, and successful saves are handled');

 const routes=[],html={simpleModuleTitle:{},simpleModuleBody:{}};const ui={window:null,$:id=>html[id],SIMPLE:{search:['Search']},esc:String,openById:id=>routes.push(id),openStaffModule:t=>routes.push(t),openOps:t=>routes.push(t),openSchoolContent:t=>routes.push(t),openGroupsPortal:()=>routes.push('groups'),location:{}};ui.window=ui;vm.createContext(ui);
 const content=read('school/app-content.js');vm.runInContext(content.slice(content.indexOf('window.openSimpleModule='),content.lastIndexOf('loadContent();')),ui);
 for(const [key,target] of Object.entries({radio:'broadcast',reports:'attendance_reports',attendance:'attendance',buses:'buses',staff:'staff',assembly:'duty',tests:'announcement',excellence:'groups'})){ui.openSimpleModule(key);assert.equal(routes.pop(),target)}
 ui.openSimpleModule('search');assert.match(html.simpleModuleBody.innerHTML,/openStudents/);assert.match(html.simpleModuleBody.innerHTML,/openClassSchedules/);pass('Homepage shortcuts reach their actual modules');

 const basic=edge('multaqa-secure');for(const action of ['chat_list','chat_send','chat_attach_init','chat_delete','broadcasts','student_support_lists'])assert.equal((await basic.run(action,{},false)).status,401);assert.equal(basic.writes.length,0);pass('Protected operations require a session before accessing records');
 const message={id:123,employee_id:'fixture-teacher',author_name:'Fixture teacher',body:'Fixture',created_at:'2026-10-05T10:00:00Z'};
 const chat=edge('multaqa-secure',{respond:(table,chain)=>table==='multaqa_staff_messages'?{data:chain.some(x=>x[0]==='insert')?{...message,...chain.find(x=>x[0]==='insert')[1]}:chain.some(x=>x[0]==='not')?[]:[message]}:null});
 let result=await chat.run('chat_list');assert.equal(result.status,200);assert.equal(result.data.messages[0].can_delete,true);assert.equal(result.data.limits['video/mp4'],100);assert.equal((await chat.run('chat_list',{since:'invalid'})).status,400);
 result=await chat.run('chat_send',{body:'Fixture only'});assert.equal(result.status,200);assert.equal(result.data.message.employee_id,'fixture-teacher');assert.equal(result.data.message.body,'Fixture only');pass('Chat list and text send work against isolated fixtures');
 assert.equal((await chat.run('chat_attach_init',{mime:'application/octet-stream',size:100})).data.error,'type_not_allowed');
 assert.equal((await chat.run('chat_attach_init',{mime:'image/jpeg',size:11*1024*1024})).data.error,'too_large');
 result=await chat.run('chat_attach_init',{mime:'application/pdf',size:100});assert.equal(result.status,200);assert.match(result.data.path,/^chat\/fixture-teacher\//);
 assert.equal((await chat.run('chat_send',{file_path:'chat/other/fixture.pdf',file_mime:'application/pdf',file_size:100})).status,400);
 assert.equal((await chat.run('chat_send',{file_path:'chat/fixture-teacher/fixture.pdf',file_mime:'application/pdf',file_size:101})).data.error,'upload_failed');
 const missing=edge('multaqa-secure',{storageResult:{data:[]}});assert.equal((await missing.run('chat_send',{file_path:'chat/fixture-teacher/fixture.pdf',file_mime:'application/pdf',file_size:100})).data.error,'upload_failed');
 result=await chat.run('chat_send',{file_path:'chat/fixture-teacher/fixture.pdf',file_mime:'application/pdf',file_size:100,file_name:'fixture.pdf'});assert.equal(result.status,200);assert.match(result.data.message.file_url,/fixture.invalid/);pass('Chat attachments enforce type, size, owner, and completed upload');
 const foreign={employee_id:'other-teacher',deleted_at:null};
 const owner=edge('multaqa-secure',{respond:t=>t==='multaqa_staff_messages'?{data:foreign}:null});assert.equal((await owner.run('chat_delete',{id:123})).status,403);assert.equal(owner.writes.filter(x=>x.table==='multaqa_staff_messages').length,0);
 const admin=edge('multaqa-secure',{employee:{employee_id:'fixture-admin',kind:'admin'},respond:t=>t==='multaqa_staff_messages'?{data:foreign}:null});assert.equal((await admin.run('chat_delete',{id:123})).status,200);assert.ok(admin.writes.some(x=>x.table==='multaqa_staff_messages'&&x.operation==='update'&&x.payload.deleted_at));
 const supervisor=edge('multaqa-secure',{employee:{employee_id:'fixture-supervisor',kind:'supervisor'}});assert.equal((await supervisor.run('chat_list')).status,403);pass('Chat deletion respects ownership and existing role boundaries');

 const alerts=edge('multaqa-secure',{employee:{employee_id:'fixture-admin',kind:'admin'}});assert.equal((await alerts.run('my_class_alerts')).status,200);assert.equal((await alerts.run('recent_staff_messages')).status,200);
 let c=alerts.calls.find(x=>x.table==='multaqa_class_observations');assert.ok(c.chain.some(x=>x[0]==='gte'&&x[1]==='observed_at'));assert.ok(c.chain.some(x=>x[0]==='select'&&x[1].includes('created_at:observed_at')));
 c=alerts.calls.find(x=>x.table==='multaqa_notification_log');assert.ok(c.chain.some(x=>x[0]==='order'&&x[1]==='sent_at'));
 const badRead=edge('multaqa-secure',{respond:t=>t==='multaqa_class_observations'?{error:{message:'fixture failure'}}:null});assert.equal((await badRead.run('my_class_alerts')).status,500);pass('Class alerts and message history use the actual timestamp columns');

 const pub=edge('multaqa-public',{respond:(t,chain)=>t==='multaqa_bus_routes'?{data:[{route_name:'Fixture bus',departure_label:'Fixture departure'}],count:19}:t==='multaqa_students'?{count:938}:t==='multaqa_class_schedules'?{count:31}:t==='multaqa_teacher_schedules'?{count:64}:t==='multaqa_employees'?{count:chain.some(x=>x[0]==='eq'&&x[2]==='admin')?9:72}:null});
 result=await pub.run('bus_status');assert.equal(result.status,200);assert.equal(result.data.items[0].route_name,'Fixture bus');assert.ok(pub.calls.some(x=>x.table==='multaqa_bus_routes'));assert.ok(!pub.calls.some(x=>x.table==='multaqa_buses'));
 result=await pub.run('school_stats');assert.equal(result.status,200);assert.deepEqual(result.data.stats,{students:938,classes:31,teachers:72,admins:9,buses:19,teacher_schedules:64});
 const busFailure=edge('multaqa-public',{respond:t=>t==='multaqa_bus_routes'?{error:{message:'fixture failure'}}:null});assert.equal((await busFailure.run('bus_status')).status,500);assert.equal((await busFailure.run('school_stats')).status,500);pass('Public buses and school statistics query actual data and propagate errors');
 const dutyDays=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'];
 for(const day of dutyDays){
  const slots={morning:['Fixture one'],entry1:['Fixture two'],entry2:[],coop:[],shade:[],corridors:[],buses:[],cars:[]};
  const fixture={day_name:day,teachers:['Fixture supervisor','Fixture one','Fixture two'],admins:['Different admin'],supervisor_name:'Fixture supervisor',slots};
  const assignments=[{name:'Fixture one',slot:'entry1'},{name:'Fixture two',slot:'morning'}];
  const duty=edge('multaqa-secure',{employee:{employee_id:'fixture-admin',kind:'admin'},respond:(table,chain)=>{
   if(table==='multaqa_duty'){const update=chain.find(x=>x[0]==='update');return {data:update?{day_name:day,...update[1]}:fixture}}
   if(table==='multaqa_push_config')return new Promise(()=>{});
   return null;
  }});
  const response=await Promise.race([duty.run('save_duty_roles',{day_name:day,assignments}),new Promise(resolve=>setTimeout(()=>resolve({status:'timeout'}),500))]);
  assert.equal(response.status,200);assert.deepEqual(response.data.slots.morning,['Fixture two']);assert.equal(response.data.notifications_pending,true);assert.equal(duty.background.length,1);
  const stored=duty.writes.find(x=>x.table==='multaqa_duty');assert.equal(stored.operation,'update');assert.deepEqual(JSON.parse(JSON.stringify(stored.payload.slots)),response.data.slots);
  const invalid=await duty.run('save_duty_roles',{day_name:day,assignments:[{name:'Fixture one',slot:'morning'},{name:'Fixture two',slot:'morning'}]});assert.equal(invalid.status,409);
 }
 pass('All administrators can save duty swaps for every school day without waiting for slow notifications');
 const fixtureDuty={day_name:'الأحد',teachers:['Fixture supervisor','Fixture one','Fixture two'],admins:[],supervisor_name:'Fixture supervisor',slots:{morning:['Fixture one'],entry1:['Fixture two']}};
 const notAllowed=edge('multaqa-secure',{respond:t=>t==='multaqa_duty'?{data:fixtureDuty}:null});assert.equal((await notAllowed.run('save_duty_roles',{day_name:'الأحد',assignments:[]})).status,403);
 const noRow=edge('multaqa-secure',{employee:{employee_id:'fixture-admin',kind:'admin'},respond:(t,c)=>t==='multaqa_duty'?{data:c.some(x=>x[0]==='update')?null:fixtureDuty}:null});assert.equal((await noRow.run('save_duty_roles',{day_name:'الأحد',assignments:[{name:'Fixture one',slot:'entry1'},{name:'Fixture two',slot:'morning'}]})).status,500);assert.equal(noRow.background.length,0);
 pass('Duty saves reject unauthorized edits, changed site capacities, and updates that did not persist');
 assert.match(read('school/aref/index.html'),/publicApi\('class_names'\)/);assert.match(read('school/aref/index.html'),/KEYS=\['multaqa_staff_session'/);assert.match(read('school/staff-chat/index.html'),/SESSION_KEYS=\['multaqa_staff_session'/);pass('Aref class queries and shared login keys are consistent');
 console.log(checks+' feature regression groups passed; no live records or messages were written.');
})().catch(e=>{console.error(e);process.exitCode=1});
