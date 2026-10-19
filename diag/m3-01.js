/* 3학년 수학 · 피자를 똑같이 나누면 어떤 수가 될까? (m3-01) */
(() => {
  const RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  // 세로 분수: (x, 가로선 y)
  const frac = (x, y, n, d, s = 30, cn = DG_C.ink, cd = DG_C.ink, cls = '') => `<g class="${cls}">${T(x, y - s * 0.28, n, { s, w: 800, f: cn })}
    <line x1="${x - s * 0.55}" y1="${y}" x2="${x + s * 0.55}" y2="${y}" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round"/>${T(x, y + s * 1.02, d, { s, w: 800, f: cd })}</g>`;
  const R = Math.PI / 180;
  const pt = (cx, cy, r, deg) => [+(cx + r * Math.sin(deg * R)).toFixed(2), +(cy - r * Math.cos(deg * R)).toFixed(2)];
  const wedge = (cx, cy, r, a0, a1) => { const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1); return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
  const show = (el, s, on) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', on ? 1 : 0));

  /* 0 */
  const P1 = [100, 128], P2 = [370, 128], PR = 78;

  /* 2: 1/4 조각 7개 */
  const QR = 48;
  const quarter = `M0 0 L0 ${-QR} A${QR} ${QR} 0 0 1 ${QR} 0 Z`;
  const ROWX = i => 22 + i * 62;
  const FIN = [[110, 200, 0], [110, 200, 90], [110, 200, 180], [110, 200, 270], [262, 200, 0], [262, 200, 90], [262, 200, 180]];

  /* 3: 사탕 12개 */
  const candy = `<path d="M-13 0 L-21 -8 L-21 8 Z M13 0 L21 -8 L21 8 Z" fill="${DG_C.c}"/><ellipse rx="14" ry="11" fill="${DG_C.c}"/><path d="M-5 -7 q5 7 0 14 M3 -8 q5 8 0 16" stroke="#fff" stroke-width="2" fill="none"/>`;
  const GX = [96, 240, 384];
  const startPos = i => [70 + (i % 6) * 68, 62 + Math.floor(i / 6) * 40];
  const endPos = i => { const g = Math.floor(i / 4), k = i % 4; return [GX[g] + (k % 2 ? 24 : -24), 120 + (k < 2 ? -18 : 18)]; };

  /* 4: 막대 */
  const BX = 110, BW = 320, BH = 30;
  const bar = (y, n, k, col, fill, cls) => {
    let s = `<rect x="${BX}" y="${y - BH / 2}" width="${BW}" height="${BH}" rx="4" fill="#fff" stroke="${DG_C.ink}" stroke-width="2.5"/>`;
    for (let i = 0; i < k; i++) s += `<rect class="${cls}f${i}" x="${BX + (BW / n) * i}" y="${y - BH / 2}" width="${BW / n}" height="${BH}" fill="${fill}"/>`;
    for (let i = 1; i < n; i++) s += `<line x1="${BX + (BW / n) * i}" y1="${y - BH / 2}" x2="${BX + (BW / n) * i}" y2="${y + BH / 2}" stroke="${DG_C.ink}" stroke-width="2"/>`;
    return s + `<rect x="${BX}" y="${y - BH / 2}" width="${BW}" height="${BH}" rx="4" fill="none" stroke="${col}" stroke-width="3"/>`;
  };

  Object.assign(DIAG, {
    'm3-01:0': {
      alt: '피자를 똑같이 4조각으로 나눈 것 중 1조각은 1/4(4분의 1)이고, 크기가 다르게 4조각으로 나누면 분수로 말할 수 없는 것을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <circle cx="${P1[0]}" cy="${P1[1]}" r="${PR}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>
        <path class="s1" d="${wedge(P1[0], P1[1], PR, 0, 90)}" fill="${DG_C.c}" stroke="${DG_C.c}" stroke-width="4" stroke-linejoin="round"/>
        <g class="c1" stroke="${DG_C.ink}" stroke-width="3.5" stroke-linecap="round"><line x1="${P1[0]}" y1="${P1[1] - PR}" x2="${P1[0]}" y2="${P1[1] + PR}"/><line x1="${P1[0] - PR}" y1="${P1[1]}" x2="${P1[0] + PR}" y2="${P1[1]}"/></g>
        <circle cx="${P2[0]}" cy="${P2[1]}" r="${PR}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>
        <g class="c2" stroke="${DG_C.ink}" stroke-width="3.5" stroke-linecap="round"><line x1="${P2[0] + 34}" y1="${P2[1] - Math.sqrt(PR * PR - 34 * 34)}" x2="${P2[0] + 34}" y2="${P2[1] + Math.sqrt(PR * PR - 34 * 34)}"/><line x1="${P2[0] - PR + 4}" y1="${P2[1] - 28}" x2="${P2[0] + 34}" y2="${P2[1] - 28}"/></g>
        <g class="l1">${frac(64, 252, '1', '4', 30, DG_C.c, DG_C.d)}${T(140, 256, '4분의 1', { s: 20, w: 800 })}</g>
        <g class="l2">${T(370, 246, '크기가 달라요', { s: 20, w: 800, f: RED })}${T(370, 278, '분수가 아니에요', { s: 18, f: RED })}</g>
        <g class="x2"><line x1="${P2[0] - 28}" y1="${P2[1] - 28}" x2="${P2[0] + 28}" y2="${P2[1] + 28}" stroke="${RED}" stroke-width="7" stroke-linecap="round"/><line x1="${P2[0] + 28}" y1="${P2[1] - 28}" x2="${P2[0] - 28}" y2="${P2[1] + 28}" stroke="${RED}" stroke-width="7" stroke-linecap="round"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.c1').setAttribute('opacity', dgP(e, 300, 500));
          show(el, '.s1', e > 1200); show(el, '.l1', e > 1800);
          q('.c2').setAttribute('opacity', dgP(e, 2800, 500));
          show(el, '.x2', e > 3900); show(el, '.l2', e > 4300);
        });
      }
    },

    'm3-01:1': {
      alt: '막대를 똑같이 5칸으로 나누고 3칸을 색칠하면 3/5이고, 가로선 아래의 5는 나눈 칸 수인 분모, 위의 3은 색칠한 칸 수인 분자라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 230" class="dg-svg" role="img">
        <rect x="24" y="76" width="300" height="60" rx="6" fill="#fff"/>
        ${[0, 1, 2].map(i => `<rect class="f${i}" x="${24 + i * 60}" y="76" width="60" height="60" fill="${DG_C.a}"/>`).join('')}
        ${[1, 2, 3, 4].map(i => `<line class="dv" x1="${24 + i * 60}" y1="76" x2="${24 + i * 60}" y2="136" stroke="${DG_C.ink}" stroke-width="2.5"/>`).join('')}
        <rect x="24" y="76" width="300" height="60" rx="6" fill="none" stroke="${DG_C.ink}" stroke-width="3.5"/>
        <g class="bt"><path d="M26 64 v-8 h176 v8" fill="none" stroke="${DG_C.c}" stroke-width="3"/>${T(114, 44, '색칠한 칸 3', { s: 20, w: 800, f: DG_C.c })}</g>
        <g class="bb"><path d="M26 148 v8 h296 v-8" fill="none" stroke="${DG_C.d}" stroke-width="3"/>${T(174, 186, '똑같이 나눈 칸 5', { s: 20, w: 800, f: DG_C.d })}</g>
        <g class="fr">${frac(384, 118, '3', '5', 46, DG_C.c, DG_C.d)}</g>
        <g class="nn">${T(424, 112, '분자', { a: 'start', s: 20, w: 800, f: DG_C.c })}</g>
        <g class="nd">${T(424, 160, '분모', { a: 'start', s: 20, w: 800, f: DG_C.d })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5600, e => {
          show(el, '.dv', e > 300);
          for (let i = 0; i < 3; i++) show(el, '.f' + i, e > 1000 + i * 400);
          show(el, '.bb', e > 2400); show(el, '.bt', e > 2800);
          show(el, '.fr', e > 3500); show(el, '.nd', e > 4100); show(el, '.nn', e > 4600);
        });
      }
    },

    'm3-01:2': {
      alt: '1/4 조각 7개 중 4개가 모이면 원 하나(1)가 되고 3개가 남아, 가분수 7/4는 대분수 1과 3/4인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="lb0">${T(212, 132, '1/4 조각이 7개', { s: 18, f: DG_C.sub })}</g>
        <circle class="g1" cx="110" cy="200" r="${QR}" fill="none" stroke="#d2d2d7" stroke-width="2.5" stroke-dasharray="5 5"/>
        ${FIN.map((_, i) => `<path class="q${i}" d="${quarter}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>`).join('')}
        <g class="lb1">${T(110, 284, '4개 → 1', { s: 20, w: 800, f: DG_C.d })}</g>
        <g class="lb2">${T(262, 284, '3개 → 3/4', { s: 20, w: 800, f: DG_C.c })}</g>
        <g class="eq">${frac(352, 194, '7', '4', 28)}${T(388, 204, '=', { s: 28, w: 800 })}${T(420, 210, '1', { s: 40, w: 800, f: DG_C.d })}${frac(452, 194, '3', '4', 28, DG_C.c, DG_C.c)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          FIN.forEach((f, i) => {
            q('.q' + i).setAttribute('opacity', dgP(e, 100 + i * 150, 300));
            const m = dgEase(dgP(e, 1600 + i * 330, 800));
            const x = ROWX(i) + (f[0] - ROWX(i)) * m, y = 104 + (f[1] - 104) * m, r = f[2] * m;
            q('.q' + i).setAttribute('transform', `translate(${x},${y}) rotate(${r})`);
            const done = i < 4 ? e > 1600 + 3 * 330 + 800 : false;
            q('.q' + i).setAttribute('fill', done ? DG_C.b : DG_C.a);
            q('.q' + i).setAttribute('stroke', done ? DG_C.d : DG_C.c);
          });
          show(el, '.lb0', e > 1000 && e < 1700);
          show(el, '.g1', e > 1500);
          show(el, '.lb1', e > 3400); show(el, '.lb2', e > 4500);
          show(el, '.eq', e > 5300);
        });
      }
    },

    'm3-01:3': {
      alt: '사탕 12개를 똑같이 3묶음으로 나누면 한 묶음에 4개라서 12의 1/3은 4이고, 그런 묶음 2개에 동그라미를 쳐서 12의 2/3는 8인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${GX.map((x, g) => `<rect class="gb${g}" x="${x - 62}" y="78" width="124" height="84" rx="20" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-dasharray="6 6"/>`).join('')}
        ${[0, 1].map(g => `<rect class="hl${g}" x="${GX[g] - 62}" y="78" width="124" height="84" rx="20" fill="${DG_C.a}" fill-opacity=".35" stroke="${DG_C.c}" stroke-width="4"/>`).join('')}
        ${Array.from({ length: 12 }, (_, i) => `<g class="cd${i}">${candy}</g>`).join('')}
        ${GX.map((x, g) => T(x, 192, '4개', { s: 20, w: 800, f: DG_C.sub, c: 'gn' + g })).join('')}
        <g class="e1">${T(240, 238, '12의 1/3 = 4', { s: 22, w: 800, f: DG_C.d })}</g>
        <g class="e2">${T(240, 278, '12의 2/3 = 4 + 4 = 8', { s: 24, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          const m = dgEase(dgP(e, 800, 1400));
          for (let i = 0; i < 12; i++) {
            const [x0, y0] = startPos(i), [x1, y1] = endPos(i);
            q('.cd' + i).setAttribute('transform', `translate(${x0 + (x1 - x0) * m},${y0 + (y1 - y0) * m}) scale(.82)`);
          }
          [0, 1, 2].forEach(g => { show(el, '.gb' + g, e > 2300); show(el, '.gn' + g, e > 2600); });
          show(el, '.hl0', e > 3300); show(el, '.e1', e > 3500);
          show(el, '.hl1', e > 4600); show(el, '.e2', e > 5200);
        });
      }
    },

    'm3-01:4': {
      alt: '똑같이 7칸으로 나눈 막대에서 2칸보다 5칸이 길어 5/7이 2/7보다 크고, 같은 길이 막대를 3칸과 5칸으로 나누면 한 칸이 3칸 쪽이 더 커서 1/3이 1/5보다 큰 것을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${T(24, 70, '2/7', { a: 'start', s: 24, w: 800 })}${bar(62, 7, 2, DG_C.ink, DG_C.b, 'a')}
        ${T(24, 112, '5/7', { a: 'start', s: 24, w: 800 })}${bar(104, 7, 5, DG_C.ink, DG_C.b, 'b')}
        <g class="r1">${T(270, 152, '분모가 같으면 2/7 < 5/7', { s: 20, w: 800, f: DG_C.d })}</g>
        <line x1="20" y1="172" x2="460" y2="172" stroke="#e5e5ea" stroke-width="2"/>
        ${T(24, 210, '1/3', { a: 'start', s: 24, w: 800 })}${bar(202, 3, 1, DG_C.ink, DG_C.a, 'c')}
        ${T(24, 252, '1/5', { a: 'start', s: 24, w: 800 })}${bar(244, 5, 1, DG_C.ink, DG_C.a, 'd')}
        <line class="gd" x1="${BX + BW / 3}" y1="186" x2="${BX + BW / 3}" y2="262" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="6 5"/>
        <g class="r2">${T(270, 292, '한 칸이 더 큰 1/3 > 1/5', { s: 20, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 6400, e => {
          for (let i = 0; i < 2; i++) show(el, '.af' + i, e > 300 + i * 300);
          for (let i = 0; i < 5; i++) show(el, '.bf' + i, e > 1000 + i * 300);
          show(el, '.r1', e > 2700);
          show(el, '.cf0', e > 3400); show(el, '.df0', e > 4100);
          show(el, '.gd', e > 4800); show(el, '.r2', e > 5400);
        });
      }
    },
  });
})();
