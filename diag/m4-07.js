/* 4학년 수학 · 분모가 같은 분수, 어떻게 더하고 뺄까? (m4-07) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  // 분수: (x, y)=가로줄 가운데
  const F = (x, y, n, d, s = 24, f = C.ink) => `${T(x, y - 6, n, { s, f })}<line x1="${x - s * 0.55}" y1="${y}" x2="${x + s * 0.55}" y2="${y}" stroke="${f}" stroke-width="2.5" stroke-linecap="round"/>${T(x, y + s * 0.95, d, { s, f })}`;
  // 대분수: 자연수 w 다음에 분수
  const M = (x, y, w, n, d, s = 24, f = C.ink) => `${T(x - s * 0.45, y + s * 0.42, w, { s: s * 1.25, f })}${F(x + s * 0.5, y, n, d, s, f)}`;
  const OP = (x, y, s, sz = 26, f = C.ink) => T(x, y + sz * 0.36, s, { s: sz, f });
  const R = Math.PI / 180;
  const sec = (cx, cy, r, a0, a1) => { const p = a => [(cx + r * Math.sin(a * R)).toFixed(2), (cy - r * Math.cos(a * R)).toFixed(2)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`; };

  /* 0 */
  const C0 = i => 40 + i * 50;

  /* 1: 원 두 개 */
  const A1 = [110, 112], B1 = [300, 112], R1 = 64;

  /* 2: 5칸 막대 */
  const CW = 13, BWd = CW * 5, BG = 9, X2 = 112;
  const bar2 = (i, y, full, cls, fill, st) => { const x = X2 + i * (BWd + BG); let o = `<rect x="${x}" y="${y}" width="${BWd}" height="34" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>`; for (let k = 0; k < 5; k++) o += `<rect class="${cls}${k < full ? '' : ' em'}" x="${x + k * CW}" y="${y}" width="${CW}" height="34" fill="${k < full ? fill : 'none'}" stroke="${k < full ? st : '#d2d2d7'}" stroke-width="2"/>`; return o; };

  /* 3: 7칸 */
  const C3 = i => 30 + i * 60;

  /* 4: 3 − 1과 2/5 */
  const W4 = 120, G4 = 16, X4 = i => 44 + i * (W4 + G4);

  Object.assign(DIAG, {
    'm4-07:0': {
      alt: '8칸으로 나눈 막대에서 1/8이 3개(3/8)와 1/8이 2개(2/8)를 합치면 1/8이 5개인 5/8이 되고, 분모 8은 그대로인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${Array.from({ length: 8 }, (_, i) => `<rect class="c c${i}" x="${C0(i)}" y="60" width="50" height="64" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`).join('')}
        ${T(240, 160, '', { c: 'cnt', s: 20, f: C.sub })}
        <g class="e1">${F(110, 214, 3, 8, 26, C.c)}</g>
        <g class="e2">${OP(170, 214, '+')}${F(230, 214, 2, 8, 26, C.d)}</g>
        <g class="e3">${OP(290, 214, '=')}${F(350, 214, 5, 8, 26, C.ink)}</g>
        <g class="nt">${T(240, 282, '분모 8은 그대로, 분자끼리 3 + 2', { s: 18, f: C.sub, w: 700 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          for (let i = 0; i < 8; i++) {
            const t = i < 3 ? 400 + i * 350 : i < 5 ? 1900 + (i - 3) * 350 : 1e9;
            q('.c' + i).setAttribute('fill', e >= t ? (i < 3 ? C.a : C.b) : '#fff');
          }
          const n = e >= 2600 ? 5 : e >= 1900 ? 3 + Math.min(2, Math.floor((e - 1900) / 350) + 1) : e >= 400 ? Math.min(3, Math.floor((e - 400) / 350) + 1) : 0;
          q('.cnt').textContent = n ? `1/8이 ${n}개` : '';
          q('.e1').setAttribute('opacity', dgP(e, 1300, 400));
          q('.e2').setAttribute('opacity', dgP(e, 2600, 400));
          q('.e3').setAttribute('opacity', dgP(e, 3400, 400));
          q('.nt').setAttribute('opacity', dgP(e, 4300, 500));
        });
      }
    },

    'm4-07:1': {
      alt: '6조각으로 나눈 원에서 4/6와 5/6를 더하면 9/6가 되는데, 6/6는 원 한 개(1)를 다 채우므로 9/6는 1과 3/6인 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${[A1, B1].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="${R1}" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`).join('')}
        ${[0, 1, 2, 3].map(k => `<path d="${sec(A1[0], A1[1], R1, k * 60, k * 60 + 60)}" fill="${C.a}" stroke="${C.c}" stroke-width="2.5" stroke-linejoin="round"/>`).join('')}
        ${[0, 1, 2].map(k => `<path d="${sec(B1[0], B1[1], R1, k * 60, k * 60 + 60)}" fill="${C.b}" stroke="${C.d}" stroke-width="2.5" stroke-linejoin="round"/>`).join('')}
        ${[3, 4].map(k => `<g class="mv mv${k}"><path d="${sec(0, 0, R1, k * 60, k * 60 + 60)}" fill="${C.b}" stroke="${C.d}" stroke-width="2.5" stroke-linejoin="round"/></g>`).join('')}
        ${[A1, B1].map(([cx, cy]) => Array.from({ length: 6 }, (_, k) => `<line x1="${cx}" y1="${cy}" x2="${(cx + R1 * Math.sin(k * 60 * R)).toFixed(1)}" y2="${(cy - R1 * Math.cos(k * 60 * R)).toFixed(1)}" stroke="#d2d2d7" stroke-width="1.5"/>`).join('')).join('')}
        <g class="l0">${F(A1[0], 206, 4, 6, 22, C.c)}${F(B1[0], 206, 5, 6, 22, C.d)}${OP(205, 206, '+', 24)}</g>
        <g class="l1">${F(A1[0] - 22, 206, 6, 6, 22, C.ink)}${T(A1[0] + 2, 214, '= 1', { s: 24, f: C.ink, a: 'start' })}${F(B1[0], 206, 3, 6, 22, C.d)}</g>
        <g class="eq">${F(80, 274, 4, 6, 22)}${OP(118, 274, '+', 24)}${F(156, 274, 5, 6, 22)}${OP(194, 274, '=', 24)}${F(232, 274, 9, 6, 22)}${OP(270, 274, '=', 24)}${M(318, 274, 1, 3, 6, 22, C.c)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          [3, 4].forEach((k, i) => {
            const m = dgEase(dgP(e, 1600 + i * 900, 1100));
            const x = B1[0] + (A1[0] - B1[0]) * m, y = B1[1] - 40 * Math.sin(Math.PI * m);
            q('.mv' + k).setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${60 * m})`);
          });
          q('.l0').setAttribute('opacity', e < 1500 ? dgP(e, 300, 400) : 0);
          q('.l1').setAttribute('opacity', dgP(e, 3800, 500));
          q('.eq').setAttribute('opacity', dgP(e, 4600, 600));
        });
      }
    },

    'm4-07:2': {
      alt: '1과 2/5 + 2와 4/5를 5칸 막대로 나타내어 자연수끼리 1+2=3, 분수끼리 2/5+4/5=6/5=1과 1/5을 모으면 4와 1/5이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="ra">${M(56, 56, 1, 2, 5, 22)}${bar2(0, 46, 5, 'w', C.b, C.d)}${bar2(1, 46, 2, 'p', C.a, C.c)}</g>
        <g class="rb">${OP(14, 120, '+', 26)}${M(56, 120, 2, 4, 5, 22)}${bar2(0, 110, 5, 'w', C.b, C.d)}${bar2(1, 110, 5, 'w', C.b, C.d)}${bar2(2, 110, 4, 'p', C.a, C.c)}</g>
        <line x1="10" y1="164" x2="470" y2="164" stroke="${C.ink}" stroke-width="3"/>
        <g class="w3">${[0, 1, 2].map(i => bar2(i, 186, 5, 'w', C.b, C.d)).join('')}${T(X2 + (3 * (BWd + BG) - BG) / 2, 250, '자연수 1 + 2 = 3', { s: 18, f: C.d, w: 800 })}</g>
        ${bar2(3, 186, 0, 'x', '', '')}${bar2(4, 186, 0, 'x', '', '')}
        ${Array.from({ length: 6 }, (_, k) => { const b = k < 5 ? 3 : 4, j = k < 5 ? k : 0; return `<rect class="f f${k}" x="${X2 + b * (BWd + BG) + j * CW}" y="186" width="${CW}" height="34" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>`; }).join('')}
        <g class="fn">${T(X2 + 3 * (BWd + BG) + (2 * BWd + BG) / 2, 250, '분수 6/5 = 1과 1/5', { s: 18, f: C.c, w: 800 })}</g>
        <g class="rs">${M(56, 196, 4, 1, 5, 22, C.ink)}${T(240, 290, '1과 2/5 + 2와 4/5 = 4와 1/5', { s: 20, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          q('.ra').setAttribute('opacity', dgP(e, 200, 400));
          q('.rb').setAttribute('opacity', dgP(e, 900, 400));
          q('.w3').setAttribute('opacity', dgP(e, 2000, 500));
          for (let k = 0; k < 6; k++) q('.f' + k).setAttribute('opacity', dgP(e, 3200 + k * 300, 200));
          q('.fn').setAttribute('opacity', dgP(e, 5100, 400));
          q('.rs').setAttribute('opacity', dgP(e, 5800, 500));
        });
      }
    },

    'm4-07:3': {
      alt: '7칸으로 나눈 띠에서 6칸(6/7) 가운데 2칸(2/7)을 잘라 내면 4칸이 남아 6/7−2/7=4/7이 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${Array.from({ length: 7 }, (_, i) => `<rect x="${C3(i)}" y="70" width="60" height="60" fill="${i < 6 ? '#fff' : '#fff'}" stroke="${i < 6 ? '#d2d2d7' : C.ink}" stroke-width="2.5" ${i === 4 || i === 5 ? 'stroke-dasharray="6 5"' : ''}/>`).join('')}
        ${Array.from({ length: 6 }, (_, i) => `<g class="p p${i}"><rect x="${C3(i)}" y="70" width="60" height="60" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/></g>`).join('')}
        <rect x="${C3(0)}" y="70" width="420" height="60" fill="none" stroke="${C.ink}" stroke-width="3"/>
        <g class="cut"><path d="M${C3(4)} 54 v92" stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="4 4"/></g>
        ${T(240, 172, '', { c: 'cnt', s: 20, f: C.sub })}
        <g class="eq">${F(130, 220, 6, 7, 26, C.c)}${OP(190, 220, '−')}${F(250, 220, 2, 7, 26, C.sub)}${OP(310, 220, '=')}${F(370, 220, 4, 7, 26, C.ink)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          for (let i = 0; i < 6; i++) q('.p' + i).setAttribute('opacity', dgP(e, 200 + i * 150, 200));
          q('.cut').setAttribute('opacity', e >= 1500 && e < 2500 ? 1 : 0);
          [4, 5].forEach(i => {
            const m = dgEase(dgP(e, 2200, 1000));
            const g = q('.p' + i);
            g.setAttribute('transform', `translate(${20 * m},${-50 * m})`);
            g.setAttribute('opacity', e < 2200 ? dgP(e, 200 + i * 150, 200) : 1 - m);
          });
          q('.cnt').textContent = e < 1300 ? '' : e < 3300 ? '1/7이 6개에서 2개 빼기' : '1/7이 4개';
          q('.eq').setAttribute('opacity', dgP(e, 3600, 600));
        });
      }
    },

    'm4-07:4': {
      alt: '3에서 1과 2/5를 뺄 때 마지막 1을 5/5로 바꿔 3을 2와 5/5로 만들고, 1과 2/5를 빼면 1과 3/5이 남는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[0, 1, 2].map(i => `<rect class="${i === 2 ? 'last' : 'wb wb' + i}" x="${X4(i)}" y="60" width="${W4}" height="56" rx="4" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>`).join('')}
        <g class="split">${Array.from({ length: 5 }, (_, k) => `<rect class="s s${k}" x="${X4(2) + k * 24}" y="60" width="24" height="56" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>`).join('')}</g>
        <g class="x1"><line x1="${X4(0) + 10}" y1="108" x2="${X4(0) + W4 - 10}" y2="68" stroke="#ff3b30" stroke-width="4" stroke-linecap="round"/>
          ${[0, 1].map(k => `<line x1="${X4(2) + k * 24 + 4}" y1="108" x2="${X4(2) + k * 24 + 20}" y2="68" stroke="#ff3b30" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>
        <g class="t0">${T(240, 40, '3', { s: 26 })}</g>
        <g class="t1">${T(X4(2) + W4 / 2, 146, '1 = 5/5', { s: 20, f: C.c })}</g>
        <g class="e1">${OP(140, 200, '3', 28)}${OP(180, 200, '=', 26)}${M(236, 200, 2, 5, 5, 24, C.c)}</g>
        <g class="e2">${M(84, 262, 2, 5, 5, 22)}${OP(132, 262, '−', 24)}${M(184, 262, 1, 2, 5, 22, '#ff3b30')}${OP(232, 262, '=', 24)}${M(282, 262, 1, 3, 5, 22, C.d)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6600, e => {
          q('.t0').setAttribute('opacity', e < 1200 ? 1 : 0);
          const sp = dgEase(dgP(e, 1000, 700));
          q('.split').setAttribute('opacity', sp);
          q('.last').setAttribute('opacity', 1 - sp);
          q('.t1').setAttribute('opacity', dgP(e, 1500, 400));
          q('.e1').setAttribute('opacity', dgP(e, 2200, 500));
          const x = dgP(e, 3300, 500);
          q('.x1').setAttribute('opacity', x);
          const fade = 1 - 0.7 * dgP(e, 4000, 600);
          q('.wb0').setAttribute('opacity', fade); q('.s0').setAttribute('opacity', fade); q('.s1').setAttribute('opacity', fade);
          q('.e2').setAttribute('opacity', dgP(e, 4800, 600));
        });
      }
    },
  });
})();
