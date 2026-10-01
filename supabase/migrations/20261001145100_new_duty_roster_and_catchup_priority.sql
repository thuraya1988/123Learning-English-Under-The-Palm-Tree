-- New daily duty roster from the approved October schedule.
-- The shaded teacher is the duty supervisor and has no fixed duty location.
-- admins = general administrative supervision for that day.

alter table public.multaqa_duty
  add column if not exists supervisor_name text;

create table if not exists public.multaqa_curriculum_catchup (
  employee_id text primary key,
  active boolean not null default true,
  activated_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.multaqa_curriculum_catchup enable row level security;

insert into public.multaqa_employees(employee_id,full_name,short_name,role,kind,access_group)
select 'A009','دلال الدغيشية','دلال الدغيشية','إدارية','admin','viewer'
where not exists (
  select 1 from public.multaqa_employees
  where short_name='دلال الدغيشية' or full_name='دلال الدغيشية'
);

insert into public.multaqa_employee_profiles(employee_id,display_title,welcome_name)
select employee_id,'إدارية • الإشراف العام للمناوبة','دلال'
from public.multaqa_employees where short_name='دلال الدغيشية'
on conflict (employee_id) do update
set display_title=excluded.display_title,updated_at=now();

update public.multaqa_duty set
 teachers=array['صبحاء العامرية','منى الصائغية','بشرى الحديديه','تهانى اسماعيل','افراح الرواحيه','اخلاص المحرزية','الزهراء الراشدية','تميمه الحضرمية','بثينه المسرورية','علياء الشحيمية','شهلاء الكاسبية','مارية البلوشي','هيام الجعفرية'],
 supervisor_name='صبحاء العامرية',
 admins=array['فاطمة البطاشيه','أنيسه السيابيه','دلال الدغيشية'],
 slots='{"morning":["بشرى الحديديه","تميمه الحضرمية","مارية البلوشي"],"entry1":["افراح الرواحيه"],"entry2":["شهلاء الكاسبية"],"coop":["اخلاص المحرزية","بثينه المسرورية"],"shade":["الزهراء الراشدية","علياء الشحيمية"],"corridors":["تهانى اسماعيل"],"buses":["هيام الجعفرية"],"cars":["منى الصائغية"]}'::jsonb
where day_name='الأحد';

update public.multaqa_duty set
 teachers=array['رقيه العامريه','بدريه الجابريه','ساره الجعفرية','ميساء الجهورية','ساره النبهانية','حفصه الستمية','سالمه الراسبية','ذهيب الجعفرية','زينب الجهضمية','سلامة الحارثي','زينب الحبسي','ذكريات القطيطية','يازيه الغيلانية','ثرياء الناعبية'],
 supervisor_name='رقيه العامريه',
 admins=array['بهيه الراشديه'],
 slots='{"morning":["بدريه الجابريه","ساره الجعفرية","ثرياء الناعبية"],"entry1":["ذهيب الجعفرية"],"entry2":["زينب الجهضمية"],"coop":["حفصه الستمية","سالمه الراسبية"],"shade":["ميساء الجهورية","ساره النبهانية"],"corridors":["يازيه الغيلانية"],"buses":["زينب الحبسي","ذكريات القطيطية"],"cars":["سلامة الحارثي"]}'::jsonb
where day_name='الاثنين';

update public.multaqa_duty set
 teachers=array['دلال الهنائيه','منى الرياميه','بلقيس الصارمية','هديه اليعربيه','اثير العامرية','ماريه الصارمية','عاتكه الوردية','سالمه الستمية','ليلى الريامية','انتصار الرواحية','منى النبهانية','ميساء الجابرية','وسن العامرية'],
 supervisor_name='دلال الهنائيه',
 admins=array['فتحية الهدابيه','فخرية العامرية'],
 slots='{"morning":["منى الرياميه","بلقيس الصارمية"],"entry1":["سالمه الستمية"],"entry2":["ليلى الريامية"],"coop":["ماريه الصارمية","عاتكه الوردية"],"shade":["هديه اليعربيه","اثير العامرية"],"corridors":["وسن العامرية"],"buses":["منى النبهانية","ميساء الجابرية"],"cars":["انتصار الرواحية"]}'::jsonb
where day_name='الثلاثاء';

update public.multaqa_duty set
 teachers=array['كاذيه الكنديه','شمساء العبرية','شريفة البروانية','امانى السيابيه','مروه الراشدية','زينب الرواحى','ايناس البهلولية','الغيد المشرفية','ريهام العريمية','عهود الضبارية','كوثر الخروصية','ايمان المنورية','رزان السوطي','هبه الرمحية'],
 supervisor_name='كاذيه الكنديه',
 admins=array['أصيلة الوهيبيه','عبير المسلمية'],
 slots='{"morning":["رزان السوطي","شمساء العبرية","شريفة البروانية"],"entry1":["الغيد المشرفية"],"entry2":["ريهام العريمية"],"coop":["زينب الرواحى","ايناس البهلولية"],"shade":["امانى السيابيه","مروه الراشدية"],"corridors":["هبه الرمحية"],"buses":["كوثر الخروصية","ايمان المنورية"],"cars":["عهود الضبارية"]}'::jsonb
where day_name='الأربعاء';

update public.multaqa_duty set
 teachers=array['شيماء السليمية','صفيه الرواحيه','مي الرحبية','سهير الرواحية','لمياء فتحي','موزه الهنائية','ساره الكاسبية','فاطمه السيابية','عاتكه العامرية','فاطمه الحضرمية','ماريه الراشدية','سمية الرواحي','هدى البريكية'],
 supervisor_name='شيماء السليمية',
 admins=array['سعاد الرواحيه'],
 slots='{"morning":["موزه الهنائية","عاتكه العامرية","سمية الرواحي"],"entry1":["فاطمه الحضرمية"],"entry2":["سهير الرواحية"],"coop":["ساره الكاسبية"],"shade":["صفيه الرواحيه","هدى البريكية"],"corridors":["ماريه الراشدية"],"buses":["مي الرحبية","لمياء فتحي"],"cars":["فاطمه السيابية"]}'::jsonb
where day_name='الخميس';
