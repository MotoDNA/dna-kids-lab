# 상식 놀이터 자료 출처·라이선스

## 세계지도 `gk/world.svg`
- 경계 데이터: Natural Earth 1:50m Admin 0 Countries (공개 도메인, https://www.naturalearthdata.com/)
- 변환 패키지: world-atlas 2.0.2 (ISC, Mike Bostock) — Natural Earth를 TopoJSON으로 변환한 것
- 처리 도구: topojson-client 3.1.0 (ISC), topojson-simplify 3.0.3 (ISC, 가중치 0.05로 단순화), d3-geo 3.1.1 (ISC, Natural Earth 1 투영, 960×500에 맞춤, 좌표 소수 1자리)
- 남극 제외. 국가 코드는 ISO 3166-1 numeric → alpha-2 (i18n-iso-countries 7.14.0, MIT)
- 분쟁·미승인 지역 및 퀴즈 제외 지역(대만, 코소보, 팔레스타인, 서사하라, 이스라엘, 북한)과 코드 없는 지역(소말릴란드, 북키프로스, 시아첸 빙하 등)은 `class="x"`

## 국기 `assets/flags/<iso2>.svg`
- flag-icons 7.6.0 (MIT License, Copyright (c) 2013 Panayiotis Lipiridis), `flags/4x3/` 원본을 수정 없이 복사
- https://github.com/lipis/flag-icons

## 나라 자료 `gk/data/countries.json`
- 국가명·수도명 한글 표기: 외교부(mofa.go.kr) 국가·지역 정보 표기 기준, 국립국어원 외래어 표기법 (직접 작성)
- 영어 수도명·대륙 교차 확인: countries-list 3.4.1 (MIT), i18n-iso-countries 7.14.0 (MIT, 한국어 이름 참고용)
- 사실(fact)·인사말(greet)은 널리 알려진 일반 상식으로 직접 작성

## peaks / rivers / planets / dinos / korea / quiz (상식 놀이터 자료, 2026-10-20 확인)
- 산 높이: Britannica "7 (or 8) Summits" (에베레스트 8,849m, 데날리 6,190m, 킬리만자로 5,895m, 엘브루스 5,642m, 코지어스코 2,228m; 아콩카과는 Britannica 6,959m / 통용 6,961m → approx 표시) https://www.britannica.com/story/7-or-8-summits-the-worlds-highest-mountains-by-continent
- K2 8,611m·칸첸중가 8,586m: https://www.teachervision.com/landforms/the-worlds-14-highest-mountain-peaks
- 몽블랑 2025년 측량 4,807.47m(2023년 4,805.59m, 해마다 변동 → approx): https://www.linfodurable.fr/le-mont-blanc-mesure-480747-metres-188-metre-de-plus-quen-2023-experts-geometres-59359
- 강 길이(Britannica 요약): 나일 6,650km https://www.britannica.com/summary/Nile-River · 아마존 6,400km https://www.britannica.com/summary/Amazon-River · 메콩 4,350km https://www.britannica.com/summary/Mekong-River · 볼가 3,530km https://www.britannica.com/summary/Volga-River · 양쯔 6,300km·다뉴브 2,850km https://www.britannica.com/browse/Rivers-Canals · 미시시피 약 3,700~3,770km https://kids.britannica.com/kids/article/Mississippi-River/346177
- 한국 강 길이(자료마다 다름 → 모두 approx): 압록강 790~808km, 낙동강 약 510km(510.36km), 한강 약 494~514km https://wiki.onul.works/w/%ED%95%9C%EA%B5%AD%EC%9D%98_%EA%B0%95 , https://thewiki.kr/w/낙동강
- 행성 적도 지름·태양 거리: NASA NSSDC Planetary Fact Sheet https://nssdc.gsfc.nasa.gov/planetary/factsheet/ (AU = 거리/149.6백만 km)
- 태양 지름: NASA Sun Fact Sheet 평균 반지름 695,700km → 1,391,400km https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html
- 지질 연대: ICS International Chronostratigraphic Chart v2024/12 및 ChangeLog (트라이아스기 시작 251.902Ma, 쥐라기 시작 201.4Ma, 백악기 시작 143.1Ma[2024/12 개정, 이전 ~145.0Ma], 백악기 끝 66.0Ma) https://stratigraphy.org/ICSchart/ChronostratChart2024-12.pdf , https://stratigraphy.org/ICSchart/ChangeLog2012-2026.txt
- 시·도청 소재지: 경기도청 누리집(수원시 영통구 도청로 30, 북부청사 의정부시) https://www.gg.go.kr · 경상북도청 누리집(안동시 풍천면 도청대로 455, 동부청사 포항시) https://www.gb.go.kr · 그 밖의 시·도는 각 시·도 누리집 기준
- 라이선스: 위 자료는 사실(수치) 인용이며 문장은 직접 작성함.
