/* 4학년 수학 · 삼각형은 어떻게 나눌 수 있을까? (m4-04) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const R = Math.PI / 180, f1 = v => +v.toFixed(1);
  // 밑변 A(x0,y0)–B(x0+L,y0), 밑각 α(A), β(B) → 꼭짓점 C
  const tri = (x0, y0, L, al, be) => {
    const b = L * Math.sin(be * R) / Math.sin((al + be) * R);
    return [[x0, y0], [x0 + L, y0], [f1(x0 + b * Math.cos(al * R)), f1(y0 - b * Math.sin(al * R))]];
  };
  const poly = (P, o = '') => `<path ${o} d="M${P.map(p => p.join(' ')).join(' L')} Z" stroke-linejoin="round"/>`;
  const unit = (V, P) => { const dx = P[0] - V[0], dy = P[1] - V[1], l = Math.hypot(dx, dy); return [dx / l, dy / l]; };
  const arcAt = (V, P1, P2, r) => {
    const u = unit(V, P1), w = unit(V, P2), cr = u[0] * w[1] - u[1] * w[0];
    return `M${f1(V[0] + u[0] * r)} ${f1(V[1] + u[1] * r)} A${r} ${r} 0 0 ${cr > 0 ? 1 : 0} ${f1(V[0] + w[0] * r)} ${f1(V[1] + w[1] * r)}`;
  };
  const sqAt = (V, P1, P2, s) => { const u = unit(V, P1), w = unit(V, P2); return `M${f1(V[0] + u[0] * s)} ${f1(V[1] + u[1] * s)} L${f1(V[0] + (u[0] + w[0]) * s)} ${f1(V[1] + (u[1] + w[1]) * s)} L${f1(V[0] + w[0] * s)} ${f1(V[1] + w[1] * s)}`; };
  // 변 가운데 눈금(같은 변 표시)
  const tick = (P, Q, n = 1, col = C.r) => {
    const mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2, u = unit(P, Q), nx = -u[1], ny = u[0];
    let o = '';
    for (let k = 0; k < n; k++) { const off = (k - (n - 1) / 2) * 7; const cx = mx + u[0] * off, cy = my + u[1] * off; o += `<line x1="${f1(cx - nx * 9)}" y1="${f1(cy - ny * 9)}" x2="${f1(cx + nx * 9)}" y2="${f1(cy + ny * 9)}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`; }
    return o;
  };
  const sideLab = (P, Q, s, out = 1, d = 22) => { const mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2, u = unit(P, Q); return T(f1(mx + u[1] * d * out), f1(my - u[0] * d * out + 7), s, { s: 18, f: C.sub, w: 700 }); };

  /* 0 */
  const I0 = [[46, 176], [124, 176], [85, f1(176 - Math.sqrt(130 * 130 - 39 * 39))]];
  const E0 = [[188, 176], [292, 176], [240, f1(176 - 104 * Math.sqrt(3) / 2)]];
  const S0 = tri(338, 176, 124, 48, 72);

  /* 1: 40°, 70°, 70° 접기 */
  const FA = [175, 226], FB = [305, 226], FC = [240, f1(226 - 65 * Math.tan(70 * R))];

  /* 2: 정삼각형 */
  const QA = [140, 236], QB = [340, 236], QC = [240, f1(236 - 100 * Math.sqrt(3))];

  /* 3 */
  const K3 = [
    { P: tri(20, 176, 130, 60, 50), big: 70, n: '예각삼각형', all: '70° 60° 50°', col: C.r },
    { P: tri(175, 176, 130, 35, 55), big: 90, n: '직각삼각형', all: '90° 35° 55°', col: C.d },
    { P: tri(330, 176, 130, 40, 30), big: 110, n: '둔각삼각형', all: '110° 40° 30°', col: C.c },
  ];

  /* 4 */
  const W1 = tri(24, 150, 192, 30, 30), W2 = tri(270, 150, 160, 45, 45);

  Object.assign(DIAG, {
    'm4-04:0': {
      alt: '변의 길이가 5cm, 5cm, 3cm로 두 변이 같은 이등변삼각형, 세 변이 모두 4cm인 정삼각형, 세 변의 길이가 모두 다른 삼각형을 비교하고, 정삼각형도 이등변삼각형이라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <g class="t0">${poly(I0, `fill="${C.b}" stroke="${C.ink}" stroke-width="3.5"`)}
          ${sideLab(I0[0], I0[1], '3cm', -1)}${sideLab(I0[1], I0[2], '5cm', -1, 32)}${sideLab(I0[2], I0[0], '5cm', -1, 32)}
          <g class="k0">${tick(I0[1], I0[2])}${tick(I0[2], I0[0])}</g>
          ${T(85, 234, '이등변삼각형', { s: 20, f: C.d })}${T(85, 258, '두 변이 같아요', { s: 18, f: C.sub, w: 700 })}</g>
        <g class="t1">${poly(E0, `fill="${C.a}" stroke="${C.ink}" stroke-width="3.5"`)}
          ${sideLab(E0[0], E0[1], '4cm', -1)}${sideLab(E0[1], E0[2], '4cm', -1, 32)}${sideLab(E0[2], E0[0], '4cm', -1, 32)}
          <g class="k1">${tick(E0[0], E0[1], 2, C.c)}${tick(E0[1], E0[2], 2, C.c)}${tick(E0[2], E0[0], 2, C.c)}</g>
          ${T(240, 234, '정삼각형', { s: 20, f: C.c })}${T(240, 258, '세 변이 같아요', { s: 18, f: C.sub, w: 700 })}</g>
        <g class="t2">${poly(S0, `fill="#f5f5f7" stroke="${C.ink}" stroke-width="3.5"`)}
          ${T(400, 234, '세 변이 달라요', { s: 20, f: C.ink })}${T(400, 258, '둘 다 아니에요', { s: 18, f: C.sub, w: 700 })}</g>
        <g class="nb"><rect x="110" y="274" width="260" height="32" rx="15" fill="${C.a}" fill-opacity=".6"/>${T(240, 296, '정삼각형도 이등변삼각형!', { s: 18, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [0, 1, 2].forEach(i => {
            q('.t' + i).setAttribute('opacity', dgP(e, 300 + i * 1300, 500));
            if (i < 2) q('.k' + i).setAttribute('opacity', e >= 900 + i * 1300 ? 1 : 0);
          });
          q('.nb').setAttribute('opacity', dgP(e, 4500, 500));
        });
      }
    },

    'm4-04:1': {
      alt: '길이가 같은 두 변 사이의 각이 40°인 이등변삼각형을 반으로 접으면 밑의 두 각이 꼭 맞게 포개지고, 그래서 두 밑각은 (180°−40°)÷2=70°씩인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${poly([FA, FB, FC], `fill="${C.b}" fill-opacity=".45" stroke="${C.ink}" stroke-width="3.5"`)}
        <path d="${arcAt(FA, FB, FC, 30)}" fill="none" stroke="${C.c}" stroke-width="4"/>
        <path class="ar2" d="${arcAt(FB, FA, FC, 30)}" fill="none" stroke="${C.c}" stroke-width="4"/>
        <path d="${arcAt(FC, FA, FB, 30)}" fill="none" stroke="${C.d}" stroke-width="3" class="ap"/>
        ${tick(FA, FC)}${tick(FB, FC)}
        <line class="ax" x1="240" y1="${FC[1] - 6}" x2="240" y2="236" stroke="${C.sub}" stroke-width="2.5" stroke-dasharray="6 6"/>
        <g class="half">${poly([FC, FB, [240, 226]], `fill="${C.b}" stroke="${C.d}" stroke-width="3"`)}<path d="${arcAt(FB, FA, FC, 30)}" fill="none" stroke="${C.c}" stroke-width="4"/></g>
        <g class="lb">
          ${T(240, FC[1] - 12, '40°', { s: 20, f: C.d })}
          ${T(FA[0] - 10, FA[1] + 2, '70°', { s: 22, f: C.c, a: 'end' })}${T(FB[0] + 10, FB[1] + 2, '70°', { s: 22, f: C.c, a: 'start' })}
        </g>
        <g class="eq">${T(240, 286, '(180° − 40°) ÷ 2 = 70°', { s: 22, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6800, e => {
          // 접기(1 → −1) → 잠시 멈춤 → 펴기(−1 → 1)
          const fold = dgEase(dgP(e, 700, 1400)), un = dgEase(dgP(e, 3000, 1200));
          const sx = 1 - 2 * fold + 2 * un;
          q('.half').setAttribute('transform', `translate(240,0) scale(${sx.toFixed(3)},1) translate(-240,0)`);
          q('.half').setAttribute('opacity', e >= 500 && e < 4300 ? 1 : 0);
          q('.ax').setAttribute('opacity', e >= 400 && e < 4400 ? 1 : 0);
          q('.lb').setAttribute('opacity', dgP(e, 4400, 500));
          q('.eq').setAttribute('opacity', dgP(e, 5400, 600));
        });
      }
    },

    'm4-04:2': {
      alt: '세 변의 길이가 같은 정삼각형의 세 각이 모두 같고, 세 각의 합 180°를 3으로 나누어 한 각이 60°인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${poly([QA, QB, QC], `fill="${C.a}" fill-opacity=".5" stroke="${C.ink}" stroke-width="4"`)}
        ${tick(QA, QB, 2, C.c)}${tick(QB, QC, 2, C.c)}${tick(QC, QA, 2, C.c)}
        ${[[QA, QB, QC], [QB, QC, QA], [QC, QA, QB]].map(([V, P1, P2], i) => { const u = unit(V, P1), w = unit(V, P2); const bx = u[0] + w[0], by = u[1] + w[1], l = Math.hypot(bx, by);
          return `<g class="g${i}"><path d="M${V[0]} ${V[1]} ${arcAt(V, P1, P2, 38).replace('M', 'L')} Z" fill="${C.c}" fill-opacity=".3" stroke="${C.c}" stroke-width="3"/>
          ${T(f1(V[0] + bx / l * 64), f1(V[1] + by / l * 64 + 7), '60°', { s: 20, f: C.c })}</g>`; }).join('')}
        <g class="eq">${T(240, 284, '180° ÷ 3 = 60°', { s: 24, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          [0, 1, 2].forEach(i => q('.g' + i).setAttribute('opacity', dgP(e, 400 + i * 900, 500)));
          q('.eq').setAttribute('opacity', dgP(e, 3500, 600));
        });
      }
    },

    'm4-04:3': {
      alt: '세 각이 70°, 60°, 50°인 예각삼각형, 90°, 35°, 55°인 직각삼각형, 110°, 40°, 30°인 둔각삼각형을 가장 큰 각으로 구분하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${K3.map((k, i) => { const [A, B, Cc] = k.P, cx = (A[0] + B[0]) / 2; return `<g class="k${i}">
          ${poly(k.P, `fill="#f5f5f7" stroke="${C.ink}" stroke-width="3.5"`)}
          <g class="m${i}">${k.big === 90 ? `<path d="${sqAt(Cc, A, B, 16)}" fill="none" stroke="${k.col}" stroke-width="3.5"/>` : `<path d="M${Cc.join(' ')} ${arcAt(Cc, A, B, 26).replace('M', 'L')} Z" fill="${k.col}" fill-opacity=".3" stroke="${k.col}" stroke-width="3"/>`}
          ${T(Cc[0], Cc[1] - 14, k.big + '°', { s: 22, f: k.col })}</g>
          ${T(cx, 218, k.n, { s: 20, f: k.col })}${T(cx, 246, k.all, { s: 18, f: C.sub, w: 700 })}</g>`; }).join('')}
        <g class="nt">${T(240, 288, '가장 큰 각 하나만 보면 돼요', { s: 18, f: C.ink, w: 700 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          K3.forEach((k, i) => {
            q('.k' + i).setAttribute('opacity', dgP(e, 300 + i * 1400, 500));
            q('.m' + i).setAttribute('opacity', dgP(e, 1000 + i * 1400, 400));
          });
          q('.nt').setAttribute('opacity', dgP(e, 4700, 500));
        });
      }
    },

    'm4-04:4': {
      alt: '각이 30°, 30°, 120°인 삼각형은 두 각이 같아 이등변삼각형이면서 120°가 둔각이라 둔각삼각형이고, 45°, 45°, 90°인 삼각형은 이등변삼각형이면서 직각삼각형인 것을 두 기준으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[[W1, ['30°', '30°', '120°'], C.c], [W2, ['45°', '45°', '90°'], C.d]].map(([P, L, col], i) => { const [A, B, Cc] = P; return `<g>
          ${poly(P, `fill="#f5f5f7" stroke="${C.ink}" stroke-width="3.5"`)}
          ${tick(A, Cc, 1, C.r)}${tick(B, Cc, 1, C.r)}
          ${T(A[0] + 14, A[1] + 24, L[0], { s: 18, f: C.sub, w: 700 })}${T(B[0] - 14, B[1] + 24, L[1], { s: 18, f: C.sub, w: 700 })}<path d="${arcAt(A, B, Cc, 26)}" fill="none" stroke="${C.sub}" stroke-width="2.5"/><path d="${arcAt(B, A, Cc, 26)}" fill="none" stroke="${C.sub}" stroke-width="2.5"/>
          <g class="bg${i}">${i === 1 ? `<path d="${sqAt(Cc, A, B, 16)}" fill="none" stroke="${col}" stroke-width="3.5"/>` : `<path d="${arcAt(Cc, A, B, 22)}" fill="none" stroke="${col}" stroke-width="3.5"/>`}
          ${T(Cc[0], Cc[1] - 14, L[2], { s: 22, f: col })}</g></g>`; }).join('')}
        ${T(240, 222, '변', { s: 18, f: C.sub, w: 700 })}${T(240, 274, '각', { s: 18, f: C.sub, w: 700 })}
        ${[['이등변삼각형', C.r, 120, 'p0'], ['둔각삼각형', C.c, 120, 'q0'], ['이등변삼각형', C.r, 350, 'p1'], ['직각삼각형', C.d, 350, 'q1']].map(([s, col, x, c], k) => `<g class="${c}">
          <rect x="${x - 88}" y="${k % 2 ? 250 : 198}" width="176" height="36" rx="18" fill="#fff" stroke="${col}" stroke-width="3"/>${T(x, k % 2 ? 275 : 223, s, { s: 20, f: col })}</g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.p0').setAttribute('opacity', dgP(e, 600, 400)); q('.p1').setAttribute('opacity', dgP(e, 1100, 400));
          q('.bg0').setAttribute('opacity', dgP(e, 2200, 400)); q('.bg1').setAttribute('opacity', dgP(e, 2200, 400));
          q('.q0').setAttribute('opacity', dgP(e, 2900, 400)); q('.q1').setAttribute('opacity', dgP(e, 3500, 400));
        });
      }
    },
  });
})();
