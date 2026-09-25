-- تعيين مشرفات المناوبة لكل يوم (حق التعديل والمراقبة)
-- يتعامل مع عمود admins سواء كان text[] أو jsonb لأن الجدول غير موجود بملف ترحيل سابق في المستودع.
do $$
declare
  col_type text;
begin
  select data_type into col_type
  from information_schema.columns
  where table_name = 'multaqa_duty' and column_name = 'admins';

  if col_type = 'jsonb' then
    update multaqa_duty set admins = '["صبحاء العامرية"]'::jsonb where day_name = 'الأحد';
    update multaqa_duty set admins = '["رقية العامرية"]'::jsonb where day_name = 'الاثنين';
    update multaqa_duty set admins = '["دلال الهنائية"]'::jsonb where day_name = 'الثلاثاء';
    update multaqa_duty set admins = '["كاذية الكندية"]'::jsonb where day_name = 'الأربعاء';
    update multaqa_duty set admins = '["شيماء السليمية"]'::jsonb where day_name = 'الخميس';
  else
    update multaqa_duty set admins = array['صبحاء العامرية'] where day_name = 'الأحد';
    update multaqa_duty set admins = array['رقية العامرية'] where day_name = 'الاثنين';
    update multaqa_duty set admins = array['دلال الهنائية'] where day_name = 'الثلاثاء';
    update multaqa_duty set admins = array['كاذية الكندية'] where day_name = 'الأربعاء';
    update multaqa_duty set admins = array['شيماء السليمية'] where day_name = 'الخميس';
  end if;
end $$;
