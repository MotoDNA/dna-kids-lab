# DNA Kids Lab (디엔에이 키즈랩)

집에 있는 재활용품으로 하는 초등 3~6학년 과학·수학·영어 활동 사이트.

- 화면: `index.html` 한 파일 (GitHub Pages)
- 데이터: Supabase 프로젝트 `ttukttaklab` (activities, topics, kits 표)
- 사진: `assets/img/`, 인쇄용 도안: `assets/pdf/`

## 활동 추가·수정
Supabase 대시보드 → Table Editor → `activities` 표에서 한 줄을 추가하거나 고치면 사이트에 바로 반영돼요.
- `content` 칸: 페이지 본문(준비물, 순서, 설명 등)을 담은 JSON
- `published`를 끄면 사이트에서 숨겨져요
- 진도표 주제는 `topics` 표, 키트 정보는 `kits` 표
