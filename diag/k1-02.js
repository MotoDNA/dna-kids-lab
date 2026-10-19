/* 1학년 국어 · 짧은 줄이 두 개면 어떤 소리가 날까? (k1-02) */
(() => {
  const W = 14; // 획 굵기
  const ln = (cls, x1, y1, x2, y2, col) => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${W}" stroke-linecap="round"/>`;

  /* 0·1: 짧은 줄 하나 → 둘. dir: 서 있는 모음은 dx(±1), 누운 모음은 dy(±1) */
  const P0 = [
    { a: 'ㅏ', as: '아', b: 'ㅑ', bs: '야', v: 1, d: 1 },
    { a: 'ㅓ', as: '어', b: 'ㅕ', bs: '여', v: 1, d: -1 },
  ];
  const P1 = [
    { a: 'ㅗ', as: '오', b: 'ㅛ', bs: '요', v: 0, d: -1 },
    { a: 'ㅜ', as: '우', b: 'ㅠ', bs: '유', v: 0, d: 1 },
  ];
  // 한 모음 그리기: cx,cy 중심. two=짧은 줄 두 개
  const vowel = (p, cx, cy, pre, two) => {
    if (p.v) { // 세로 막대
      const L = 42 * p.d;
      return ln(pre + 'bar', cx, cy - 52, cx, cy + 52, DG_C.d) +
        (two ? ln(pre + 's1', cx, cy, cx + L, cy, DG_C.c) + ln(pre + 's2', cx, cy + 18, cx + L, cy + 18, DG_C.r)
          : ln(pre + 's1', cx, cy, cx + L, cy, DG_C.c));
    }
    const L = 42 * p.d;
    return ln(pre + 'bar', cx - 40, cy, cx + 40, cy, DG_C.d) +
      (two ? ln(pre + 's1', cx, cy, cx, cy + L, DG_C.c) + ln(pre + 's2', cx + 20, cy, cx + 20, cy + L, DG_C.r)
        : ln(pre + 's1', cx, cy, cx, cy + L, DG_C.c));
  };
  // 왼쪽(원래 모음) 중심, 오른쪽(새 모음) 중심
  const POS = (p, i) => {
    const base = i * 240;
    return p.v ? { ax: base + 52 + (p.d < 0 ? 30 : 0), bx: base + 172 + (p.d < 0 ? 30 : 0), ar: base + 128 }
      : { ax: base + 52, bx: base + 186, ar: base + 119 };
  };
  const pairSvg = (P, cy, h) => `<svg viewBox="0 0 480 ${h}" class="dg-svg" role="img">
      ${P.map((p, i) => { const o = POS(p, i); return `<g class="pr${i}">
        <g class="a${i}">${vowel(p, o.ax, cy, 'a' + i, false)}</g>
        <path class="ar${i}" d="M${o.ar - 12} ${cy} h22 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="b${i}">${vowel(p, o.bx, cy, 'b' + i, true)}</g>
        <g class="lb${i}">
          <text x="${o.ax}" y="${cy + 102}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${p.a} <tspan fill="${DG_C.sub}" font-size="22" font-weight="700">${p.as}</tspan></text>
          <text x="${o.bx}" y="${cy + 102}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${p.b} <tspan fill="${DG_C.r}" font-size="22" font-weight="800">${p.bs}</tspan></text>
        </g></g>`; }).join('')}
      <line x1="240" y1="${cy - 60}" x2="240" y2="${cy + 110}" stroke="#e5e5ea" stroke-width="2"/>
    </svg>`;
  const pairPlay = (el, P) => {
    const q = s => el.querySelector(s);
    dgAnim(el, 6400, e => {
      P.forEach((p, i) => {
        const st = 200 + i * 3000;
        q('.a' + i).setAttribute('opacity', dgP(e, st, 500));
        q('.ar' + i).setAttribute('opacity', e > st + 700 ? 1 : 0);
        q('.b' + i).setAttribute('opacity', e > st + 900 ? 1 : 0);
        const o = POS(p, i), L = 42 * p.d;
        // 원래 짧은 줄이 옆으로 비켜나고(0→1), 새 줄이 자람(0→1)
        const mv = dgEase(dgP(e, st + 1100, 500)), gr = dgEase(dgP(e, st + 1700, 600));
        const s1 = q('.b' + i + 's1'), s2 = q('.b' + i + 's2');
        if (p.v) {
          const cy = +q('.b' + i + 'bar').getAttribute('y1') + 52, y = cy - 18 * mv;
          s1.setAttribute('y1', y); s1.setAttribute('y2', y);
          s2.setAttribute('x2', o.bx + L * Math.max(gr, .001));
        } else {
          const x = o.bx - 20 * mv;
          s1.setAttribute('x1', x); s1.setAttribute('x2', x);
          const cy = +q('.b' + i + 'bar').getAttribute('y1');
          s2.setAttribute('y2', cy + L * Math.max(gr, .001));
        }
        s2.setAttribute('opacity', gr > 0 ? 1 : 0);
        q('.lb' + i).setAttribute('opacity', e > st + 2400 ? 1 : 0);
      });
    });
  };

  /* 2: 이 + 아 → 야 */
  const P2 = [['이', '아', '야'], ['이', '어', '여'], ['이', '오', '요'], ['이', '우', '유']];
  const tile = (x, y, t, col) => `<rect x="${x}" y="${y}" width="50" height="50" rx="12" fill="${col}"/><text x="${x + 25}" y="${y + 36}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${t}</text>`;

  /* 3: 모음 열 개 */
  const V10 = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
  const NEW = { 'ㅑ': 1, 'ㅕ': 1, 'ㅛ': 1, 'ㅠ': 1 };
  const WORDS = [['여우', 'ㅕ'], ['우유', 'ㅠ'], ['요요', 'ㅛ'], ['아야', 'ㅑ']];

  Object.assign(DIAG, {
    'k1-02:0': {
      alt: 'ㅏ의 짧은 줄 옆에 짧은 줄 하나를 더 그으면 ㅑ(야), ㅓ에 하나 더 그으면 ㅕ(여)가 되는 그림',
      svg: pairSvg(P0, 108, 250),
      play(el) { pairPlay(el, P0); }
    },
    'k1-02:1': {
      alt: 'ㅗ에 짧은 줄 하나를 더하면 ㅛ(요), ㅜ에 하나 더하면 ㅠ(유)가 되는 그림',
      svg: pairSvg(P1, 112, 254),
      play(el) { pairPlay(el, P1); }
    },
    'k1-02:2': {
      alt: '이와 아를 빨리 이어 말하면 야, 이와 어는 여, 이와 오는 요, 이와 우는 유가 되는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${P2.map((p, k) => { const x = 12 + (k % 2) * 244, y = 60 + Math.floor(k / 2) * 100; return `<g>
          <g class="t${k}">${tile(x, y, p[0], DG_C.b)}
            <text x="${x + 64}" y="${y + 34}" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>
            ${tile(x + 78, y, p[1], DG_C.a)}</g>
          <path class="br${k}" d="M${x + 22} ${y + 60} q 58 22 116 0" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>
          <path class="ar${k}" d="M${x + 140} ${y + 25} h22 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text class="r${k}" x="${x + 196}" y="${y + 38}" text-anchor="middle" fill="${DG_C.r}" font-size="36" font-weight="800">${p[2]}</text>
        </g>`; }).join('')}
        <text class="hint" x="12" y="34" fill="${DG_C.c}" font-size="20" font-weight="700">빨리 이어 말하면</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          q('.hint').setAttribute('opacity', e > 200 ? 1 : 0);
          P2.forEach((p, k) => {
            const st = 300 + k * 1450;
            q('.t' + k).setAttribute('opacity', dgP(e, st, 400));
            q('.br' + k).setAttribute('opacity', e > st + 500 ? 1 : 0);
            q('.ar' + k).setAttribute('opacity', e > st + 800 ? 1 : 0);
            const f = dgEase(dgP(e, st + 900, 500));
            const r = q('.r' + k); r.setAttribute('opacity', f);
            r.setAttribute('font-size', 24 + 12 * f);
          });
        });
      }
    },
    'k1-02:3': {
      alt: '모음 열 개 ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ를 차례로 놓고, 새로 배운 ㅑ ㅕ ㅛ ㅠ가 들어간 낱말 여우, 우유, 요요, 아야를 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${V10.map((v, i) => `<g class="v${i}">
          <rect x="${21 + i * 44}" y="56" width="40" height="52" rx="10" fill="${NEW[v] ? DG_C.a : '#f5f5f7'}"/>
          <text x="${41 + i * 44}" y="94" text-anchor="middle" fill="${NEW[v] ? DG_C.c : DG_C.d}" font-size="28" font-weight="800">${v}</text></g>`).join('')}
        <text class="cap" x="240" y="140" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">모음 열 개</text>
        ${WORDS.map((w, i) => { const x = 60 + i * 120; return `<g class="w${i}">
          <rect x="${x - 50}" y="160" width="100" height="54" rx="14" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
          <text x="${x}" y="198" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${w[0]}</text>
          <text x="${x}" y="240" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">${w[1]}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          V10.forEach((v, i) => q('.v' + i).setAttribute('opacity', dgP(e, 200 + i * 280, 300)));
          q('.cap').setAttribute('opacity', e > 3000 ? 1 : 0);
          WORDS.forEach((w, i) => q('.w' + i).setAttribute('opacity', dgP(e, 3300 + i * 650, 400)));
        });
      }
    },
  });
})();
