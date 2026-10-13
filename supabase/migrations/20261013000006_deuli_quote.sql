-- '들이' 용어를 따옴표로 표시
update public.activities set content = replace(content::text, '양을 들이라고 해요', '양을 ''들이''라고 해요')::jsonb where slug = 'carton-capacity';
update public.lessons set content = replace(content::text, '양을 들이라고 해요', '양을 ''들이''라고 해요')::jsonb where slug = 'm3-07';
