/* 6학년 과학 · 전구에 불이 켜지려면 어떻게 연결해야 할까? (s5-05) */
(() => {
  const RED = '#ff3b30', WIRE = DG_C.ink;
  // 전지(세로): 중심 cx,cy. 위가 (+)
  const batV = (cx, cy) => `<rect x="${cx - 18}" y="${cy - 34}" width="36" height="68" rx="8" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
    <rect x="${cx - 7}" y="${cy - 42}" width="14" height="9" rx="2" fill="${DG_C.c}"/>
    <text x="${cx}" y="${cy - 8}" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">+</text>
    <text x="${cx}" y="${cy + 24}" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">−</text>`;
  // 전구: 중심 cx,cy
  const bulb = (cx, cy, cls, r = 18) => `<circle class="${cls}g" cx="${cx}" cy="${cy}" r="${r * 2}" fill="${DG_C.c}" opacity="0"/>
    <circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
    <path d="M${cx - r * .45} ${cy + 2} l${r * .2} -${r * .4} l${r * .25} ${r * .4} l${r * .25} -${r * .4} l${r * .2} ${r * .4}" fill="none" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const light = (el, cls, on, big) => {
    el.querySelector('.' + cls).setAttribute('fill', on ? '#fff3c4' : '#fff');
    const g = el.querySelector('.' + cls + 'g'); g.setAttribute('opacity', on ? (big ? .5 : .22) : 0);
  };

  /* 0: 고리 모양 회로 — 전류가 흐르는 길 (+극 → 전구 → 스위치 → −극) */
  const LOOP = [[60, 116], [60, 70], [420, 70], [420, 230], [60, 230], [60, 184]];
  const SEG = LOOP.slice(1).map((p, i) => Math.hypot(p[0] - LOOP[i][0], p[1] - LOOP[i][1]));
  const LEN = SEG.reduce((a, b) => a + b, 0);
  const at = s => { s = ((s % LEN) + LEN) % LEN; for (let i = 0; i < SEG.length; i++) { if (s <= SEG[i]) { const a = LOOP[i], b = LOOP[i + 1], t = s / SEG[i]; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; } s -= SEG[i]; } return LOOP[0]; };
  const ND = 16;

  /* 2: 클립 */
  const clip = (cls) => `<g class="${cls}"><rect x="-8" y="-16" width="16" height="32" rx="8" fill="none" stroke="${DG_C.sub}" stroke-width="2.5"/><rect x="-4" y="-10" width="8" height="22" rx="4" fill="none" stroke="${DG_C.sub}" stroke-width="2.5"/></g>`;
  const CL = [{ x0: 300, y0: 262, x1: 357, y1: 142 }, { x0: 345, y0: 262, x1: 366, y1: 172 }, { x0: 395, y0: 262, x1: 346, y1: 186 }];

  /* 3: 멀티탭 */
  const tap = (x, y, n) => `<rect x="${x}" y="${y}" width="170" height="44" rx="12" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
    ${[0, 1, 2, 3].map(k => `<rect x="${x + 14 + k * 39}" y="${y + 12}" width="26" height="20" rx="5" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>`).join('')}
    <path d="M${x} ${y + 22} C${x - 30} ${y + 22} ${x - 20} ${y + 80} ${x + 10} ${y + 86}" fill="none" stroke="${DG_C.sub}" stroke-width="4"/>`;
  const plug = (x, y, k, col) => `<rect x="${x - 11}" y="${y - 34}" width="22" height="26" rx="5" fill="${col}"/><path d="M${x} ${y - 34} C${x} ${y - 60} ${x + (k - 1.5) * 20} ${y - 60} ${x + (k - 1.5) * 26} ${y - 84}" fill="none" stroke="${col}" stroke-width="4"/>`;

  Object.assign(DIAG, {
    's5-05:0': {
      alt: '전지의 (+)극에서 나온 전선이 전구와 스위치를 지나 (−)극까지 끊어진 곳 없이 하나의 고리로 이어져, 스위치를 닫으면 전기가 흘러 전구에 불이 켜지는 전기 회로 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M60 116 V70 H218 M262 70 H420 V130 M420 170 V230 H60 V184" fill="none" stroke="${WIRE}" stroke-width="4" stroke-linejoin="round"/>
        ${Array.from({ length: ND }, (_, k) => `<circle class="dt dt${k}" r="5" fill="${DG_C.c}"/>`).join('')}
        ${batV(60, 150)}
        ${bulb(240, 70, 'b0', 22)}
        <circle cx="420" cy="130" r="5" fill="${WIRE}"/><circle cx="420" cy="170" r="5" fill="${WIRE}"/>
        <line class="sw" x1="420" y1="170" x2="420" y2="130" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="round"/>
        <text x="132" y="158" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">전지</text>
        <text x="86" y="114" fill="${DG_C.sub}" font-size="18" font-weight="700">(+)극</text>
        <text x="86" y="200" fill="${DG_C.sub}" font-size="18" font-weight="700">(−)극</text>
        <text x="240" y="132" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">전구</text>
        <text x="404" y="156" text-anchor="end" fill="${DG_C.d}" font-size="20" font-weight="800">스위치</text>
        <text x="240" y="262" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">전선</text>
        <text class="msg" x="240" y="292" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800"></text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const T = 6000;
        dgAnim(el, T, e => {
          // 처음엔 스위치가 열려 있음 → 1.6초부터 닫힘
          const c = dgEase(dgP(e, 1600, 600)), a = (1 - c) * 50 * Math.PI / 180;
          q('.sw').setAttribute('x2', 420 + 40 * Math.sin(a)); q('.sw').setAttribute('y2', 170 - 40 * Math.cos(a));
          const on = c >= 1;
          light(el, 'b0', on, true);
          const flow = on ? (e - 2200) * 0.09 : 0;
          for (let k = 0; k < ND; k++) {
            const [x, y] = at(k * LEN / ND + flow), d = q('.dt' + k);
            d.setAttribute('cx', x); d.setAttribute('cy', y); d.setAttribute('opacity', on ? 1 : 0);
          }
          q('.msg').textContent = on ? '고리로 이어져 불이 켜져요' : '스위치를 끄면 회로가 끊겨요';
          q('.msg').setAttribute('fill', on ? DG_C.c : DG_C.sub);
        });
      }
    },

    's5-05:1': {
      alt: '전구 두 개를 한 줄로 이은 직렬연결과 두 갈래로 이은 병렬연결을 비교한 그림. 병렬연결의 전구가 더 밝고, 전구 하나를 빼면 직렬연결은 나머지도 꺼지지만 병렬연결은 나머지가 계속 켜져 있다',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <path d="M34 92 V60 H92 M128 60 H200 V128 M200 164 V230 H34 V198" fill="none" stroke="${WIRE}" stroke-width="4" stroke-linejoin="round"/>
        ${batV(34, 146)}
        <g class="sa">${bulb(110, 60, 'sA')}</g>
        <path class="sAx" d="M98 48 l24 24 m0 -24 l-24 24" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
        ${bulb(200, 146, 'sB')}
        <path d="M274 92 V60 H448 V128 M448 164 V230 H274 V198 M362 60 V128 M362 164 V230" fill="none" stroke="${WIRE}" stroke-width="4" stroke-linejoin="round"/>
        ${batV(274, 146)}
        <g class="pa">${bulb(362, 146, 'pA')}</g>
        <path class="pAx" d="M350 134 l24 24 m0 -24 l-24 24" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
        ${bulb(448, 146, 'pB')}
        <line x1="240" y1="40" x2="240" y2="320" stroke="#e5e5ea" stroke-width="2"/>
        <text x="120" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">직렬연결</text>
        <text x="360" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">병렬연결</text>
        <text class="l1" x="120" y="294" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">덜 밝아요</text>
        <text class="l1" x="360" y="294" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">더 밝아요</text>
        <text class="l2" x="120" y="320" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">하나 빼면 모두 꺼짐</text>
        <text class="l2" x="360" y="320" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="800">하나 빼도 켜져 있음</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          const on = e > 800, out = e > 3600;
          light(el, 'sA', on && !out, false); light(el, 'sB', on && !out, false);
          light(el, 'pA', on && !out, true); light(el, 'pB', on, true);
          qa('.l1').forEach(t => t.setAttribute('opacity', e > 1600 ? 1 : 0));
          // 전구 하나씩 빼기
          const r = dgEase(dgP(e, 3000, 600));
          q('.sa').setAttribute('transform', `translate(0,${-30 * r})`); q('.sa').setAttribute('opacity', 1 - .75 * r);
          q('.pa').setAttribute('transform', `translate(0,${-30 * r})`); q('.pa').setAttribute('opacity', 1 - .75 * r);
          q('.sAx').setAttribute('opacity', 0); q('.pAx').setAttribute('opacity', 0);
          qa('.l2').forEach(t => t.setAttribute('opacity', e > 4400 ? 1 : 0));
        });
      }
    },

    's5-05:2': {
      alt: '쇠못에 에나멜선을 여러 번 감고 전지에 연결해 전기가 흐르면 쇠못이 자석이 되어 클립을 끌어당기는 전자석 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M150 112 h190 l16 8 l-16 8 h-190 Z" fill="#c7c7cc" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="136" y="98" width="14" height="44" rx="3" fill="#c7c7cc" stroke="${DG_C.sub}" stroke-width="2.5"/>
        ${Array.from({ length: 12 }, (_, k) => `<ellipse cx="${176 + k * 12}" cy="120" rx="6" ry="17" fill="none" stroke="#c26b1a" stroke-width="4"/>`).join('')}
        <path d="M176 137 V230 H200 M280 230 H308 V137" fill="none" stroke="#c26b1a" stroke-width="4" stroke-linejoin="round"/>
        <rect x="206" y="212" width="68" height="36" rx="8" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
        <rect x="274" y="223" width="8" height="14" rx="2" fill="${DG_C.c}"/>
        <text x="256" y="238" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">+</text>
        <text x="224" y="238" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">−</text>
        <g class="mg" fill="none" stroke="${DG_C.d}" stroke-width="2.5" stroke-dasharray="5 5">
          <ellipse cx="248" cy="120" rx="130" ry="38"/><ellipse cx="248" cy="120" rx="150" ry="56"/></g>
        ${CL.map((c, i) => clip('c' + i)).join('')}
        <text x="150" y="44" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">쇠못(철심)</text>
        <text x="236" y="44" fill="#c26b1a" font-size="20" font-weight="800">에나멜선</text>
        <text x="240" y="290" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">전지</text>
        <text class="ms" x="70" y="200" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">자석이 돼요</text>
        <text x="420" y="214" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">클립</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const on = e > 1200;
          q('.mg').setAttribute('opacity', on ? dgP(e, 1200, 600) * .9 : 0);
          CL.forEach((c, i) => {
            const f = dgEase(dgP(e, 1900 + i * 350, 700));
            const x = c.x0 + (c.x1 - c.x0) * f, y = c.y0 + (c.y1 - c.y0) * f;
            q('.c' + i).setAttribute('transform', `translate(${x},${y}) rotate(${(i - 1) * 20 * f})`);
          });
          q('.ms').setAttribute('opacity', e > 3300 ? 1 : 0);
        });
      }
    },

    's5-05:3': {
      alt: '멀티탭 하나에 플러그를 너무 많이 꽂으면 감전이나 화재가 일어날 수 있어 위험하고, 꼭 필요한 플러그만 꽂아 쓰면 안전한 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g>${tap(40, 150, 4)}${[0, 1, 2, 3].map(k => plug(67 + k * 39, 162, k, k % 2 ? DG_C.ink : DG_C.sub)).join('')}
          <path class="ht" d="M60 56 q8 -14 0 -28 M125 50 q8 -14 0 -28 M190 56 q8 -14 0 -28" fill="none" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>
          <circle class="mk0" cx="210" cy="216" r="20" fill="${RED}"/><path class="mk0" d="M202 208 l16 16 m0 -16 l-16 16" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>
        <g>${tap(290, 150, 1)}${plug(317, 162, 1.5, DG_C.ink)}
          <circle class="mk1" cx="460" cy="216" r="20" fill="${DG_C.r}"/><path class="mk1" d="M450 216 l7 7 l13 -14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
        <line x1="240" y1="40" x2="240" y2="280" stroke="#e5e5ea" stroke-width="2"/>
        <text x="125" y="262" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">너무 많이 꽂으면</text>
        <text x="125" y="286" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">불이 날 수 있어요</text>
        <text x="375" y="262" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">필요한 것만</text>
        <text x="375" y="286" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">안전해요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 4200, e => {
          q('.ht').setAttribute('opacity', dgP(e, 600, 600));
          q('.ht').setAttribute('transform', `translate(0,${10 * (1 - dgP(e, 600, 1200))})`);
          qa('.mk0').forEach(t => t.setAttribute('opacity', e > 1500 ? 1 : 0));
          qa('.mk1').forEach(t => t.setAttribute('opacity', e > 2800 ? 1 : 0));
        });
      }
    },
  });
})();
