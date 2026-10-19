/* 3학년 중국어 · 병음의 뒷소리 '운모'는 어떻게 읽을까? (c3-03) */
(() => {
  const C = DG_C, RED = '#ff3b30', ZH = 'lang="zh-CN"';
  const LIP = '#ff3b30';

  /* 0: 성모 + 운모 */
  const S0 = [
    { h: '妈', a: 'm', b: 'ā', wa: 60, wb: 64, y: 96 },
    { h: '狗', a: 'g', b: 'ǒu', wa: 60, wb: 92, y: 226 },
  ];
  const GAP = 44, CX = 270;

  /* 1: 기본 운모 여섯 */
  const V1 = [
    { v: 'a', k: '아', rx: 22, ry: 20 },
    { v: 'o', k: '오어', rx: 13, ry: 13 },
    { v: 'e', k: '으어', rx: 18, ry: 9 },
    { v: 'i', k: '이', rx: 25, ry: 5 },
    { v: 'u', k: '우', rx: 7, ry: 8 },
    { v: 'ü', k: '위', rx: 9, ry: 9 },
  ];
  const cell = i => ({ x: 82 + (i % 3) * 158, y: 82 + Math.floor(i / 3) * 112 });

  /* 2: 두 소리 운모 */
  const D2 = [
    { a: 'a', b: 'i', k: '아이', h: '爱', py: 'ài', m: '사랑하다' },
    { a: 'e', b: 'i', k: '에이', h: '黑', py: 'hēi', m: '검다' },
    { a: 'a', b: 'o', k: '아오', h: '猫', py: 'māo', m: '고양이' },
    { a: 'o', b: 'u', k: '어우', h: '狗', py: 'gǒu', m: '개' },
  ];

  /* 3: 입 옆모습 (왼쪽이 입술) */
  const PAL = 'M30 66 Q40 62 46 60 Q52 54 62 50 Q110 34 150 44 Q170 50 180 64';
  const mouth = (tongue, dot, lab) => `
    <path d="${PAL} L196 64 L196 14 L64 14 Q30 16 30 66 Z" fill="#eef0f3"/>
    <path d="M196 14 V150" stroke="#d2d2d7" stroke-width="4" stroke-linecap="round"/>
    <path d="${tongue}" fill="#ffc9c4" stroke="${LIP}" stroke-width="3" stroke-linejoin="round"/>
    <path d="${PAL}" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <rect x="27" y="66" width="10" height="16" rx="3" fill="#fff" stroke="${C.sub}" stroke-width="2"/>
    <rect x="27" y="98" width="10" height="14" rx="3" fill="#fff" stroke="${C.sub}" stroke-width="2"/>
    <ellipse cx="16" cy="64" rx="12" ry="9" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
    <ellipse cx="16" cy="116" rx="12" ry="9" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
    <circle class="dot" cx="${dot[0]}" cy="${dot[1]}" r="9" fill="none" stroke="${C.d}" stroke-width="4"/>`;
  const T_N = 'M40 116 C34 100 40 80 48 66 C52 58 58 58 64 64 C76 74 90 80 112 84 C140 88 168 86 182 100 C188 112 188 132 186 150 L56 150 Q42 140 40 116 Z';
  const T_NG = 'M40 116 C38 106 44 100 54 100 C84 98 120 88 146 66 C156 56 172 54 180 66 C188 82 188 124 186 150 L56 150 Q42 140 40 116 Z';

  Object.assign(DIAG, {
    'c3-03:0': {
      alt: '병음 카드 mā가 성모 m과 운모 ā로, gǒu가 성모 g와 운모 ǒu로 나뉘고, 성조 표시는 운모 위에 붙는다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${S0.map((s, i) => { const tot = s.wa + s.wb; return `
          <text ${ZH} x="46" y="${s.y + 14}" text-anchor="middle" fill="${C.ink}" font-size="40" font-weight="600">${s.h}</text>
          <g class="l${i}"><rect x="${CX - tot / 2}" y="${s.y - 30}" width="${s.wa}" height="60" rx="14" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>
            <text x="${CX - tot / 2 + s.wa / 2}" y="${s.y + 13}" text-anchor="middle" fill="${C.ink}" font-size="38" font-weight="800">${s.a}</text></g>
          <g class="r${i}"><rect x="${CX - tot / 2 + s.wa}" y="${s.y - 30}" width="${s.wb}" height="60" rx="14" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
            <text x="${CX - tot / 2 + s.wa + s.wb / 2}" y="${s.y + 13}" text-anchor="middle" fill="${C.ink}" font-size="38" font-weight="800">${s.b}</text></g>
          <g class="lb${i}"><text x="${CX - tot / 2 + s.wa / 2 - GAP / 2}" y="${s.y + 58}" text-anchor="middle" fill="${C.d}" font-size="20" font-weight="800">성모</text>
            <text x="${CX - tot / 2 + s.wa + s.wb / 2 + GAP / 2}" y="${s.y + 58}" text-anchor="middle" fill="${C.c}" font-size="20" font-weight="800">운모</text>
            <text x="${CX - tot / 2 + s.wa}" y="${s.y + 10}" text-anchor="middle" fill="${C.sub}" font-size="26" font-weight="800">+</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          S0.forEach((s, i) => {
            const st = 300 + i * 2000;
            q('.l' + i).setAttribute('opacity', dgP(e, st, 400)); q('.r' + i).setAttribute('opacity', dgP(e, st, 400));
            const f = dgEase(dgP(e, st + 700, 700));
            q('.l' + i).setAttribute('transform', `translate(${-GAP / 2 * f},0)`);
            q('.r' + i).setAttribute('transform', `translate(${GAP / 2 * f},0)`);
            q('.lb' + i).setAttribute('opacity', dgP(e, st + 1300, 400));
          });
        });
      }
    },

    'c3-03:1': {
      alt: '기본 운모 여섯 개와 입 모양: a(아) 크게 벌린 입, o(오어) 둥근 입, e(으어) 살짝 벌린 입, i(이) 옆으로 벌린 입, u(우) 앞으로 내민 입, ü(위) 동그랗게 모은 입. 혼자 쓸 때는 yi, wu, yu로 써요',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        ${V1.map((m, i) => { const c = cell(i); return `<g class="c${i}">
          <circle cx="${c.x - 34}" cy="${c.y}" r="36" fill="${C.a}" fill-opacity=".55"/>
          <circle cx="${c.x - 46}" cy="${c.y - 13}" r="3.5" fill="${C.ink}"/><circle cx="${c.x - 22}" cy="${c.y - 13}" r="3.5" fill="${C.ink}"/>
          <ellipse class="m${i}" cx="${c.x - 34}" cy="${c.y + 14}" rx="${m.rx}" ry="${m.ry}" fill="${C.ink}" stroke="${LIP}" stroke-width="4"/>
          <text x="${c.x + 30}" y="${c.y + 6}" text-anchor="middle" fill="${C.d}" font-size="40" font-weight="800">${m.v}</text>
          <text x="${c.x + 30}" y="${c.y + 36}" text-anchor="middle" fill="${C.sub}" font-size="20" font-weight="700">${m.k}</text>
        </g>`; }).join('')}
        <g class="yw"><rect x="16" y="268" width="448" height="58" rx="16" fill="#f5f5f7"/>
          <text x="32" y="303" fill="${C.sub}" font-size="18" font-weight="700">혼자 쓸 때</text>
          <text x="136" y="304" fill="${C.ink}" font-size="22" font-weight="800">i→<tspan fill="${C.d}">y</tspan>i</text>
          <text x="232" y="304" fill="${C.ink}" font-size="22" font-weight="800">u→<tspan fill="${C.d}">w</tspan>u</text>
          <text x="334" y="304" fill="${C.ink}" font-size="22" font-weight="800">ü→<tspan fill="${C.d}">y</tspan>u</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          V1.forEach((m, i) => {
            const st = 200 + i * 800, f = dgEase(dgP(e, st, 600));
            q('.c' + i).setAttribute('opacity', e >= st ? 1 : 0);
            q('.m' + i).setAttribute('rx', 16 + (m.rx - 16) * f);
            q('.m' + i).setAttribute('ry', 1.5 + (m.ry - 1.5) * f);
          });
          q('.yw').setAttribute('opacity', dgP(e, 5200, 600));
        });
      }
    },

    'c3-03:2': {
      alt: '두 소리가 합쳐진 운모: 앞소리를 크게, 뒷소리를 살짝 붙여 ai(아이, 爱 ài), ei(에이, 黑 hēi), ao(아오, 猫 māo), ou(어우, 狗 gǒu)로 미끄러지듯 읽는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${D2.map((d, i) => { const x = 8 + i * 118, cx = x + 55; return `<g class="d${i}">
          <rect x="${x}" y="48" width="110" height="250" rx="18" fill="#f5f5f7"/>
          <text x="${cx - 6}" y="112" text-anchor="end" fill="${C.d}" font-size="46" font-weight="800">${d.a}</text>
          <text class="b${i}" x="${cx + 2}" y="112" fill="${C.d}" font-size="30" font-weight="800" fill-opacity=".75">${d.b}</text>
          <path class="g${i}" d="M${cx - 26} 128 Q${cx} 146 ${cx + 22} 124" pathLength="100" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>
          <text class="k${i}" x="${cx}" y="174" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">${d.k}</text>
          <g class="x${i}"><line x1="${x + 16}" y1="194" x2="${x + 94}" y2="194" stroke="#e5e5ea" stroke-width="2"/>
            <text ${ZH} x="${cx}" y="240" text-anchor="middle" fill="${C.ink}" font-size="36" font-weight="600">${d.h}</text>
            <text x="${cx}" y="274" text-anchor="middle" fill="${C.d}" font-size="20" font-weight="800">${d.py}</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          D2.forEach((d, i) => {
            const st = 200 + i * 1300;
            q('.d' + i).setAttribute('opacity', e >= st ? 1 : 0);
            const f = dgEase(dgP(e, st + 300, 600));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(${-12 * (1 - f)},0)`);
            q('.g' + i).setAttribute('stroke-dasharray', `${100 * f} 200`);
            q('.k' + i).setAttribute('opacity', dgP(e, st + 800, 400));
            q('.x' + i).setAttribute('opacity', dgP(e, st + 1000, 400));
          });
        });
      }
    },

    'c3-03:3': {
      alt: '입 옆모습 그림 두 개: n으로 끝날 때는 혀끝이 윗잇몸에 닿고(sān 三, mén 门), ng로 끝날 때는 혀 뒤쪽이 올라가요(táng 糖)',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${[{ x: 16, t: T_N, dot: [54, 57], h: '-n', s: '안 · 언', lab: '혀끝 → 윗잇몸', ex: [['三', 'sān'], ['门', 'mén']] },
           { x: 252, t: T_NG, dot: [166, 54], h: '-ng', s: '앙 · 엉', lab: '혀 뒤쪽 ↑', ex: [['糖', 'táng']] }].map((p, i) => `<g class="p${i}">
          <text x="${p.x + 4}" y="58" fill="${C.d}" font-size="26" font-weight="800">${p.h} <tspan fill="${C.sub}" font-size="20">${p.s}</tspan></text>
          <g transform="translate(${p.x},64)"><g class="tg${i}">${mouth(p.t, p.dot)}</g></g>
          <text class="lb${i}" x="${p.x + 104}" y="246" text-anchor="middle" fill="${C.d}" font-size="20" font-weight="800">${p.lab}</text>
          <g class="ex${i}">${p.ex.map(([h, py], k) => `<text ${ZH} x="${p.x + 20 + k * 104}" y="304" fill="${C.ink}" font-size="32" font-weight="600">${h}</text>
            <text x="${p.x + 60 + k * 104}" y="301" fill="${C.ink}" font-size="22" font-weight="800">${py}</text>`).join('')}</g>
        </g>`).join('')}
        <line x1="240" y1="40" x2="240" y2="316" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          [0, 1].forEach(i => {
            const st = 200 + i * 2600;
            q('.p' + i).setAttribute('opacity', dgP(e, st, 500));
            const d = q('.p' + i + ' .dot'), f = dgEase(dgP(e, st + 800, 500));
            d.setAttribute('opacity', f); d.setAttribute('r', 4 + 5 * f);
            q('.lb' + i).setAttribute('opacity', dgP(e, st + 1100, 400));
            q('.ex' + i).setAttribute('opacity', dgP(e, st + 1600, 500));
          });
        });
      }
    },
  });
})();
