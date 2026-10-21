-- 전문가 검토에서 남은 학년·범위 결정 반영 (2026-10-21, 초이 결정: 교육과정에 맞게 옮기기 / 수학은 '미리 보기' 표시 / 기타는 정리)

-- 1) 실험·활동: 교육과정 학년에 맞게 옮기기
update public.activities set band = '3~4', grade = 4, semester = 2 where slug = 'shadow-theater';        -- 빛과 그림자
update public.activities set band = '3~4', grade = 4, semester = 1 where slug = 'marker-chromatography'; -- 혼합물의 분리
update public.activities set band = '5~6', grade = 5, semester = 1 where slug = 'star-projector';        -- 태양계와 별
update public.activities set band = '5~6', grade = 6, semester = 1 where slug = 'moon-phase-calendar';   -- 지구와 달의 운동
update public.activities set band = '5~6', grade = 5, semester = 2 where slug = 'bottle-terrarium';      -- 생물과 환경
update public.activities set band = '1~2', grade = 2, semester = 2 where slug = 'egg-tray-arrays';       -- 곱셈구구

-- 2) 단원 학년·학기
update public.lessons set band = '5~6', grade = 5, semester = 2 where slug = 's5-09';   -- 생물과 환경
update public.lessons set semester = 2 where slug = 'm4-04';                            -- 삼각형은 4학년 2학기
update public.lessons set grade = 1, semester = 2 where slug in ('k1-13','k1-14','k1-15','k1-17','k1-18'); -- 예문이 1학년 기준

-- 3) 수학: 다음 학기·학년 내용에 '미리 보기' 표시 (본문은 그대로)
update public.lessons set content = jsonb_set(jsonb_set(content, '{sections,2,preview}', '"1학년 2학기 미리 보기"'), '{sections,3,preview}', '"2학년 미리 보기"') where slug = 'm1-02';
update public.lessons set content = jsonb_set(content, '{sections,3,preview}', '"1학년 2학기 미리 보기"') where slug = 'm1-03';
update public.lessons set content = jsonb_set(content, '{sections,3,preview}', '"2학년 미리 보기"') where slug = 'm1-04';
update public.lessons set content = jsonb_set(content, '{sections,3,preview}', '"2학년 2학기 미리 보기"') where slug = 'm1-08';
update public.lessons set content = jsonb_set(jsonb_set(content, '{sections,2,preview}', '"3학년 2학기 미리 보기"'), '{sections,3,preview}', '"3학년 2학기 미리 보기"') where slug = 'm3-01';
update public.lessons set content = jsonb_set(jsonb_set(content, '{sections,2,preview}', '"4학년 미리 보기"'), '{sections,3,preview}', '"4학년 미리 보기"') where slug = 'm3-03';
update public.lessons set content = jsonb_set(jsonb_set(content, '{sections,2,preview}', '"3학년 2학기 미리 보기"'), '{sections,3,preview}', '"3학년 2학기 미리 보기"') where slug = 'm3-05';

-- 4) 없는 '우리 집 실험 자랑' 게시판 문장 고치기
update public.activities
   set content = replace(content::text, '나중에 ''우리 집 실험 자랑'' 게시판에 올릴 수 있어요.', '가족에게 보여 주며 설명하면 배운 내용을 더 오래 기억해요.')::jsonb
 where slug = 'earth-poster';

-- 5) 5학년 비유: 교과서 표현('비유하는 표현')을 앞세우고 직유법·은유법은 덧붙이는 말로
update public.lessons
   set content = jsonb_set(jsonb_set(content,
         '{sections,1,heading}', '"''~처럼'', ''~같이''로 빗대기 (직유법)"'),
         '{sections,2,heading}', '"''A는 B이다''로 빗대기 (은유법)"')
 where slug = 'k5-01';
