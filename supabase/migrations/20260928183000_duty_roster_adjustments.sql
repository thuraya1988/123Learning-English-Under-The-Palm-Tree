-- Keep the repository fallback roster aligned with the official production duty roster.
-- Idempotent: only replaces the superseded names when they are still present.

update public.multaqa_duty
set
  teachers = array_replace(
    array_replace(teachers, 'الزهراء الرشدية', 'بدريه الجابريه'),
    'تميمة الحضرمية',
    'كوثر المفرجية'
  ),
  slots = jsonb_set(
    jsonb_set(slots, '{entry1}', '["بدريه الجابريه"]'::jsonb, true),
    '{entry2}',
    '["كوثر المفرجية"]'::jsonb,
    true
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
