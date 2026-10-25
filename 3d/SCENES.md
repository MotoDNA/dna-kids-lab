# 입체 그림책 3D 장면 만드는 규칙

DNA Kids Lab 단원 페이지에서 "🧊 3D로 보기"를 누르면 펼친 책 위로 연필 선 느낌의 3D 그림이 솟아오르고,
3~5단계로 개념을 보여 준다. 공통 틀은 `3d/popup3d.js`, 장면 하나는 `3d/scenes/<id>.js` 파일 하나.
보기 예: `3d/scenes/net.js`(수학), `3d/scenes/lever.js`(과학) — 반드시 먼저 읽고 같은 방식으로 만든다.

## 장면 파일 형식
```js
POP3D.register('<id>', {
  title: '창 제목 (짧게)', kicker: '과학 6학년 · 전기의 이용', pageTitle: '왼쪽 페이지 큰 제목', pageNo: 30,
  pageLines: ['왼쪽 페이지 본문 줄 (한 줄 18자 안팎, 4~6줄)'], caption: '그림 2. 오른쪽 페이지 아래 그림 설명',
  steps: [ { name: '단계 짧은 이름(10자 안팎)', title: '단계 제목', body: '1~2문장 설명', f: '식이나 핵심 (선택)', cam: { pos:[x,y,z], target:[x,y,z] } /* 선택: 이 단계에서 카메라 이동 */ } ],
  build(K) { /* 아래 */ return { root, set(step){}, update(dt, t){}, cam: { pos:[...], target:[...] } }; }
});
```
- `root`: THREE.Group. 오른쪽 페이지 위(대략 x -2.8~3, z -3.6~3.6, 페이지 윗면 높이 K.PAGE_Y=0.32)에 놓는다. 보통 `root.position.set(0.1, K.PAGE_Y + 약간, 0.2)`. 조금 넘쳐도 되지만 화면 안에 다 들어오게 카메라를 잡는다.
- `set(step)`: 단계가 바뀔 때 목표 상태만 바꾼다(즉시 바꾸지 말고 update 에서 부드럽게). `K.RM`(움직임 줄이기)이 true 면 바로 목표 상태로.
- `update(dt, t)`: 매 프레임. `K.damp(cur, target, dt, speed)`, `K.ease(t)` 사용.
- `cam`: 처음 카메라. 기본 FOV 36(폭 520px 미만이면 48)이라 휴대폰에서도 다 보이게 넉넉히.

## K 도구
`K.THREE`, `K.sketch(mesh)` (검은 연필 모서리 두 겹), `K.paper(color, opacity)` (종이 느낌 재질, 기본 0.92), `K.label(text, size, color, bg)` (항상 위에 보이는 둥근 글자표, 한글 Jua 글꼴), `K.line(points, color, opacity)`, `K.arrow(fromVec3, toVec3, color)`, `K.canvas(w,h,draw)`+`K.tex(canvas)` (글자·눈금 텍스처), `K.INK` (선 재질), `K.ease`, `K.back`, `K.damp`, `K.lerp`, `K.RM`.

## 그림 스타일
- 종이 공작처럼: 파스텔 면(노랑 0xf6d35b, 파랑 0x8fbfe8, 분홍 0xf3a9c0, 초록 0x9fd6a5, 주황 0xf7b267, 보라 0xc7b3ea, 판지 0xc9a06b, 연한 판지 0xe8cfa0) + `K.sketch` 모서리.
- 빛·전기·바람처럼 보이지 않는 것은 색 선·화살표·빛나는 재질(MeshBasicMaterial, 노랑 0xffd24a 등)로 보여 준다. 움직임(흐르는 점, 회전, 깜빡임)으로 개념을 드러낸다.
- 글자표(label)는 꼭 필요한 이름·숫자만. 한 화면에 6개 이하.
- 가볍게: 메시 300개 이하, 다각형 수 적게(구 segments 16~24), 큰 텍스처 금지(2048×256 이하), 그림자 끄기. 오래된 태블릿에서도 돌아야 한다.

## 내용
- 단원 원문은 `/home/claude/site/seo/lessons.json`(slug, content.sections[i].heading/paras)에 있다. 해당 섹션 내용과 용어를 그대로 따르고, 초등 교과서 수준을 넘지 않는다. 과학·수학적으로 틀린 것이 하나도 없게 (개수, 방향, 크기 비율, 순서).
- 단계 3~5개. 해요체, 짧은 문장. 첫 단계는 무엇을 보는지, 마지막 단계는 정리.
- 실제 비율이 너무 커서 못 그리는 것(태양계 거리 등)은 단계 글에 "실제와 비율이 다르다"고 밝힌다.

## 확인 (필수)
- 서버: `cd /home/claude/dna-kids-lab && python3 -m http.server 8777` 가 이미 떠 있을 수 있다(`curl -s localhost:8777` 로 확인, 없으면 setsid nohup 으로 띄움).
- `cd /home/claude/qa && node t_3dscene.js <id> /tmp/claude-0/s3d_<id>` → 단계별 스크린샷과 오류 목록. 오류 0개, 모든 단계 스크린샷을 Read 로 열어 내용과 화면을 확인하고 고친다(장면이 화면 밖으로 나가거나, 글자표가 겹치거나, 너무 작으면 고침).
- 휴대폰 크기도 한 번: t_3dscene.js 를 복사해 viewport 390×844 로 바꿔 1장 확인.

## 하지 말 것
- popup3d.js, index.html, 다른 사람 장면 파일 수정 금지. git commit/push·배포 금지.
- 외부 이미지·모델 파일 불러오기 금지(모두 코드로 그림).

## 보고
만든 장면 id, 연결할 단원 slug와 섹션 번호(0부터), 단계 이름들, 확인한 것, 남은 걱정거리.
