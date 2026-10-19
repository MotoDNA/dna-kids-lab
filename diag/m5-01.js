/* 5학년 수학 · 상자 모양에는 어떤 비밀이 있을까? (m5-01) */
(() => {
  const C = DG_C, GF = '#d6efdc';
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const f1 = v => +v.toFixed(1);
  /* 직육면체 겨냥도 꼭짓점: A B C D(앞면, 왼아래부터 반시계), a b c d(뒷면) */
  const box = (x, y, w, h, vx, vy) => {
    const A = [x, y], B = [x + w, y], Cc = [x + w, y - h], D = [x, y - h];
    const m = p => [f1(p[0] + vx), f1(p[1] + vy)];
    return { A, B, C: Cc, D, a: m(A), b: m(B), c: m(Cc), d: m(D) };
  };
  const PL = ps => 'M' + ps.map(p => p.join(' ')).join(' L') + ' Z';
  const faces = (k, fF, fT, fR, cls = '') => `<path class="${cls}" d="${PL([k.A, k.B, k.C, k.D])}" fill="${fF}"/><path class="${cls}" d="${PL([k.D, k.C, k.c, k.d])}" fill="${fT}"/><path class="${cls}" d="${PL([k.B, k.b, k.c, k.C])}" fill="${fR}"/>`;
  const VIS = ['AB', 'BC', 'CD', 'DA', 'Bb', 'Cc', 'Dd', 'bc', 'cd'], HID = ['Aa', 'ab', 'ad'];
  const E = (k, n, col, w = 3.5, extra = '') => { const p = k[n[0]], q = k[n[1]]; return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`; };
  const edges = (k, col = C.ink, cls = '') => VIS.map(n => E(k, n, col, 3.5, cls ? `class="${cls}"` : '')).join('') + HID.map(n => E(k, n, C.sub, 2.5, `stroke-dasharray="6 6"${cls ? ` class="${cls}"` : ''}`)).join('');

  /* 0 */
  const K0a = box(30, 200, 170, 80, 42, -35), K0b = box(300, 200, 95, 95, 57, -47.5);
  /* 1 */
  const K1 = box(50, 236, 200, 110, 60, -50);
  /* 2 */
  const K2 = box(24, 222, 130, 80, 48, -40);
  const NA = 66, NB = 44, NH = 36, NX = 290, NY = 70;
  const NET = [
    [NX + NB, NY, NA, NB, C.b, C.d, 0], [NX + NB, NY + NB, NA, NH, C.a, C.c, 1], [NX + NB, NY + NB + NH, NA, NB, C.b, C.d, 0],
    [NX + NB, NY + 2 * NB + NH, NA, NH, C.a, C.c, 1], [NX, NY + NB, NB, NH, GF, C.r, 2], [NX + NB + NA, NY + NB, NB, NH, GF, C.r, 2],
  ];
  /* 3: 4 × 3 × 2 */
  const K3 = box(66, 232, 160, 80, 60, -48);
  const G3 = [
    { e: ['AB', 'CD', 'ab', 'cd'], col: C.c, lab: '4cm × 4개' },
    { e: ['Aa', 'Bb', 'Cc', 'Dd'], col: C.d, lab: '3cm × 4개' },
    { e: ['DA', 'BC', 'ad', 'bc'], col: C.r, lab: '2cm × 4개' },
  ];

  Object.assign(DIAG, {
    'm5-01:0': {
      alt: '직사각형 6개로 둘러싸인 과자 상자 모양의 직육면체와 정사각형 6개로 둘러싸인 주사위 모양의 정육면체를 나란히 놓은 그림. 정육면체도 직육면체예요',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <g class="s0">${faces(K0a, '#ffe9cc', C.a, '#ffc98a')}${edges(K0a)}</g>
        <g class="s1">${faces(K0b, '#e3f0ff', C.b, '#9ccaff')}${edges(K0b)}</g>
        <g class="l0">${T(135, 240, '직육면체', { fs: 22, fw: 800, fill: C.c })}${T(135, 268, '직사각형 6개', { fs: 18, fw: 700, fill: C.sub })}</g>
        <g class="l1">${T(375, 240, '정육면체', { fs: 22, fw: 800, fill: C.d })}${T(375, 268, '정사각형 6개', { fs: 18, fw: 700, fill: C.sub })}</g>
        ${T(240, 302, '정육면체도 직육면체예요', { cls: 'nt', fs: 20, fw: 800 })}
      </svg>`,
      play(el) {
        dgAnim(el, 4800, e => {
          const a = dgEase(dgP(e, 200, 700)), b = dgEase(dgP(e, 1500, 700));
          el.querySelector('.s0').setAttribute('opacity', a); el.querySelector('.s1').setAttribute('opacity', b);
          op(el, '.l0', e > 900 ? 1 : 0); op(el, '.l1', e > 2200 ? 1 : 0);
          op(el, '.nt', e > 3500 ? 1 : 0);
        });
      }
    },

    'm5-01:1': {
      alt: '직육면체에서 선분으로 둘러싸인 면, 면과 면이 만나는 모서리, 모서리와 모서리가 만나는 꼭짓점을 표시하고 면 6개, 모서리 12개, 꼭짓점 8개, 평행한 면 3쌍임을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${faces(K1, '#f5f5f7', '#ececf0', '#e3e3e8')}
        <path class="f" d="${PL([K1.A, K1.B, K1.C, K1.D])}" fill="${C.a}"/>
        ${edges(K1)}
        <g class="m">${E(K1, 'AB', C.d, 7)}</g>
        <circle class="v" cx="${K1.c[0]}" cy="${K1.c[1]}" r="9" fill="${C.r}" stroke="#fff" stroke-width="2"/>
        ${T(190, 226, '면', { cls: 'f', fs: 26, fw: 800, fill: C.c })}
        ${T(150, 268, '모서리', { cls: 'm', fs: 22, fw: 800, fill: C.d })}
        ${T(K1.c[0] + 16, K1.c[1] - 8, '꼭짓점', { cls: 'v', a: 'start', fs: 22, fw: 800, fill: C.r })}
        ${[['면', '6개', C.c], ['모서리', '12개', C.d], ['꼭짓점', '8개', C.r]].map(([a, b, c], i) => `<g class="n n${i}">${T(352, 146 + i * 38, a, { a: 'start', fs: 20, fw: 700, fill: c })}${T(470, 146 + i * 38, b, { a: 'end', fs: 22, fw: 800, fill: c })}</g>`).join('')}
        ${T(470, 262, '평행한 면 3쌍', { cls: 'n n3', a: 'end', fs: 18, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        dgAnim(el, 6000, e => {
          op(el, '.f', e > 300 ? 1 : 0);
          op(el, '.m', e > 1400 ? 1 : 0);
          op(el, '.v', e > 2500 ? 1 : 0);
          [0, 1, 2, 3].forEach(i => op(el, '.n' + i, e > 3600 + i * 500 ? 1 : 0));
        });
      }
    },

    'm5-01:2': {
      alt: '직육면체 겨냥도는 보이는 모서리 9개를 실선, 보이지 않는 모서리 3개를 점선으로 그리고, 전개도는 모서리를 잘라 펼친 그림으로 마주 보는 면 3쌍이 같은 색(모양과 크기가 같음)인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${T(110, 48, '겨냥도', { fs: 22, fw: 800 })}
        ${T(NX + NB + NA / 2, 48, '전개도', { fs: 22, fw: 800 })}
        ${faces(K2, '#f5f5f7', '#ececf0', '#e3e3e8')}
        ${VIS.map((n, i) => E(K2, n, C.ink, 3.5, `class="ve ve${i}" pathLength="1" stroke-dasharray="1 1"`)).join('')}
        ${HID.map((n, i) => E(K2, n, C.c, 3, `class="he he${i}" stroke-dasharray="6 6"`)).join('')}
        <g class="cap">${T(24, 262, '실선 9개', { a: 'start', fs: 20, fw: 800 })}${T(112, 262, '+ 점선 3개', { a: 'start', fs: 20, fw: 800, fill: C.c })}
          ${T(110, 290, '= 모서리 12개', { fs: 18, fw: 700, fill: C.sub })}</g>
        ${NET.map(([x, y, w, h, f, s, k], i) => `<rect class="nf nf${k}" x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="${s}" stroke-width="2.5"/>`).join('')}
        ${T(NX + NB + NA / 2, 270, '마주 보는 면은 같아요', { cls: 'nc', fs: 18, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          VIS.forEach((n, i) => q('.ve' + i).setAttribute('stroke-dashoffset', 1 - dgP(e, 200 + i * 220, 220)));
          HID.forEach((n, i) => op(el, '.he' + i, e > 2400 + i * 300 ? 1 : 0));
          op(el, '.cap', e > 3300 ? 1 : 0);
          [0, 1, 2].forEach(k => op(el, '.nf' + k, e > 3900 + k * 600 ? 1 : 0));
          op(el, '.nc', e > 5700 ? 1 : 0);
        });
      }
    },

    'm5-01:3': {
      alt: '가로 4cm, 세로 3cm, 높이 2cm인 직육면체에서 길이가 같은 모서리 4개씩을 같은 색으로 칠해 (4 + 3 + 2) × 4 = 36cm를 구하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${faces(K3, '#f7f7f9', '#f0f0f3', '#eaeaee')}
        ${edges(K3, '#c7c7cc')}
        ${G3.map((g, i) => `<g class="g g${i}">${g.e.map(n => E(K3, n, g.col, HID.includes(n) ? 3 : 5, HID.includes(n) ? 'stroke-dasharray="6 6"' : '')).join('')}</g>`).join('')}
        ${T(146, 260, '4cm', { cls: 'g g0', fs: 20, fw: 800, fill: C.c })}
        ${T(K3.B[0] + 36, K3.B[1] - 14, '3cm', { cls: 'g g1', a: 'start', fs: 20, fw: 800, fill: C.d })}
        ${T(56, 198, '2cm', { cls: 'g g2', a: 'end', fs: 20, fw: 800, fill: C.r })}
        ${G3.map((g, i) => T(470, 120 + i * 40, g.lab, { cls: 'g g' + i, a: 'end', fs: 22, fw: 800, fill: g.col })).join('')}
        ${T(240, 292, '(4 + 3 + 2) × 4 = 36(cm)', { cls: 'eq', fs: 24, fw: 800 })}
      </svg>`,
      play(el) {
        dgAnim(el, 5400, e => {
          [0, 1, 2].forEach(i => op(el, '.g' + i, e > 300 + i * 1200 ? 1 : 0));
          op(el, '.eq', e > 4100 ? 1 : 0);
        });
      }
    },
  });
})();
