-- Keep the official weekly duty roster aligned with the approved replacements.
-- Idempotent: names are replaced only while a superseded assignment is present.

update public.multaqa_duty
set
  teachers = array_replace(
    array_replace(teachers, 'الزهراء الرشدية', 'بدريه الجابريه'),
    'تميمة الحضرمية',
    'كوثر المفرجية'
  ),
  slots = jsonb_set(
    jsonb_set(slots, '{morning,1}', '"بدريه الجابريه"'::jsonb, false),
    '{buses,1}',
    '"كوثر المفرجية"'::jsonb,
    false
  )
where day_name = 'الأحد'
  and (
    'الزهراء الرشدية' = any(teachers)
    or 'تميمة الحضرمية' = any(teachers)
  );

update public.multaqa_duty
set
  teachers = array_replace(teachers, 'بدرية الجابرية', 'الزهراء الراشدية'),
  slots = jsonb_set(slots, '{morning,1}', '"الزهراء الراشدية"'::jsonb, false)
where day_name = 'الاثنين'
  and 'بدرية الجابرية' = any(teachers);
