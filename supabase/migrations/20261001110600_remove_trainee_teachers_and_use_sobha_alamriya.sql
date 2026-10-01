
begin;

update public.multaqa_class_schedules
set schedule = replace(schedule::text, '"الرياضيات — صبحاء (متدربة)"', '"الرياضيات — صبحاء العامرية"')::jsonb
where schedule::text like '%صبحاء (متدربة)%';

update public.multaqa_class_schedules
set schedule = replace(schedule::text, '"العلوم — شمساء متدربة"', '"العلوم — غير مسندة"')::jsonb
where schedule::text like '%شمساء متدربة%';

delete from public.multaqa_duty_attendance
where employee_id='T074';

delete from public.multaqa_duty_evaluations
where employee_name='شمساء متدربة';

delete from public.multaqa_teacher_schedules
where full_name in ('صبحاء (متدربة)','شمساء متدربة');

delete from public.multaqa_employees
where employee_id in ('T073','T074');

commit;
