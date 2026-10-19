/* 3학년 수학 · 똑같이 나누면 몇 개씩일까? (m3-05) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const cookie = (cls) => `<g class="${cls}"><circle r="13" fill="${C.a}" stroke="${C.c}" stroke-width="3"/><circle cx="-4" cy="-3" r="2.2" fill="${C.c}"/><circle cx="4" cy="3" r="2.2" fill="${C.c}"/></g>`;

  /* 0: 쿠키 12개 → 접시 3개 */
  const PL = [100, 240, 380];
  const start = k => [62 + k * 32, 66];
  const dest = k => { const p = k % 3, s = Math.floor(k / 3); return [PL[p] - 18 + (s % 2) * 36, 160 + Math.floor(s / 2) * 30]; };

  /* 1: 배열 */
  const arr = (x0, y0, sp, cls, rr = 8) => { let o = ''; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) o += `<circle class="${cls}" cx="${x0 + c * sp}" cy="${y0 + r * sp}" r="${rr}" fill="${C.ink}"/>`; return o; };

  /* 2: 구슬 29개, 4개씩 */
  const GX = i => 36 + i * 54;

  /* 3: 75 ÷ 3 세로 나눗셈 */
  const DX = [226, 262];

  Object.assign(DIAG, {
    'm3-05:0': {
      alt: '쿠키 12개를 접시 3개에 하나씩 번갈아 나누어 담으면 한 접시에 4개씩이 되어 12÷3=4이고, 12는 나누어지는 수, 3은 나누는 수, 4는 몫인 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${PL.map((x, i) => `<ellipse cx="${x}" cy="178" rx="62" ry="42" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="3"/>
          ${T(x, 120, `${i + 1}번`, { s: 18, f: C.sub, w: 700 })}`).join('')}
        ${Array.from({ length: 12 }, (_, k) => cookie('ck ck' + k)).join('')}
        <g class="eq">
          ${T(110, 262, '12', { s: 30, f: C.ink })}${T(166, 262, '÷', { s: 30 })}${T(222, 262, '3', { s: 30, f: C.d })}${T(278, 262, '=', { s: 30 })}${T(334, 262, '4', { s: 30, f: C.c })}
          ${T(110, 300, '나누어지는 수', { s: 18, f: C.sub, w: 700 })}${T(222, 300, '나누는 수', { s: 18, f: C.d, w: 700 })}${T(334, 300, '몫', { s: 20, f: C.c, w: 800 })}
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          for (let k = 0; k < 12; k++) {
            const m = dgEase(dgP(e, 600 + k * 330, 500));
            const [x0, y0] = start(k), [x1, y1] = dest(k);
            q('.ck' + k).setAttribute('transform', `translate(${x0 + (x1 - x0) * m},${y0 + (y1 - y0) * m})`);
          }
          q('.eq').setAttribute('opacity', dgP(e, 5000, 600));
        });
      }
    },

    'm3-05:1': {
      alt: '4개씩 3줄인 점 배열로 곱셈식 4×3=12를 만들고, 3묶음으로 나누면 12÷3=4, 4묶음으로 나누면 12÷4=3이라는 나눗셈식 두 개가 나오는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${arr(120, 46, 24, 'd0')}
        ${T(222, 80, '4 × 3 = 12', { s: 28, a: 'start' })}
        <g class="br" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M178 116 L126 160 m4 -14 l-4 14 l14 -3"/><path d="M302 116 L354 160 m-4 -14 l4 14 l-14 -3"/>
        </g>
        <g class="p0">
          ${[0, 1, 2].map(r => `<rect x="76" y="${170 + r * 26}" width="104" height="22" rx="11" fill="${C.b}" stroke="${C.d}" stroke-width="2"/>`).join('')}
          ${arr(92, 181, 24, 'd1', 7)}
          ${T(128, 278, '3묶음 → 4개씩', { s: 18, f: C.d, w: 700 })}
          ${T(128, 314, '12 ÷ 3 = 4', { s: 26, f: C.d })}
        </g>
        <g class="p1">
          ${[0, 1, 2, 3].map(c => `<rect x="${306 + c * 24}" y="168" width="20" height="74" rx="10" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>`).join('')}
          ${arr(316, 181, 24, 'd2', 7)}
          ${T(352, 278, '4묶음 → 3개씩', { s: 18, f: C.c, w: 700 })}
          ${T(352, 314, '12 ÷ 4 = 3', { s: 26, f: C.c })}
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.br').setAttribute('opacity', dgP(e, 900, 500));
          [0, 1].forEach(i => {
            const f = dgEase(dgP(e, 1600 + i * 1600, 700));
            q('.p' + i).setAttribute('opacity', f);
            q('.p' + i).setAttribute('transform', `translate(0,${-16 * (1 - f)})`);
          });
        });
      }
    },

    'm3-05:2': {
      alt: '구슬 29개를 4개씩 묶으면 7묶음(28개)이 되고 1개가 남아 29÷4=7…1이며, 4×7+1=29로 확인하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${Array.from({ length: 7 }, (_, g) => `<rect class="gr gr${g}" x="${GX(g) - 23}" y="62" width="46" height="46" rx="12" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>`).join('')}
        ${Array.from({ length: 29 }, (_, k) => { const g = Math.floor(k / 4), s = k % 4; const x = g < 7 ? GX(g) - 10 + (s % 2) * 20 : GX(7); const y = g < 7 ? 75 + Math.floor(s / 2) * 20 : 85; return `<circle cx="${x}" cy="${y}" r="7.5" fill="${g < 7 ? C.ink : C.c}"/>`; }).join('')}
        ${Array.from({ length: 7 }, (_, g) => T(GX(g), 140, (g + 1) * 4, { s: 18, f: C.d, w: 700, c: 'cn cn' + g })).join('')}
        <g class="rest"><circle cx="${GX(7)}" cy="85" r="16" fill="none" stroke="${C.c}" stroke-width="3"/>${T(GX(7) - 6, 140, '남음', { s: 18, f: C.c, w: 800 })}</g>
        <g class="eq">${T(240, 212, `29 ÷ 4 = 7 … <tspan fill="${C.c}">1</tspan>`, { s: 30 })}</g>
        <g class="ck">${T(240, 270, '4 × 7 + 1 = 29', { s: 24, f: C.r })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          for (let g = 0; g < 7; g++) {
            const st = 500 + g * 500;
            q('.gr' + g).setAttribute('opacity', dgP(e, st, 300));
            q('.cn' + g).setAttribute('opacity', e >= st && (g === 6 || e < st + 500 || e >= 4400) ? 1 : 0);
          }
          q('.rest').setAttribute('opacity', dgP(e, 4200, 400));
          q('.eq').setAttribute('opacity', dgP(e, 4600, 500));
          q('.ck').setAttribute('opacity', dgP(e, 5400, 500));
        });
      }
    },

    'm3-05:3': {
      alt: '75÷3 세로 나눗셈: 7÷3의 몫 2를 십의 자리에 쓰고 6을 빼서 1이 남고, 5를 내려 15를 만든 뒤 15÷3=5를 일의 자리에 써서 몫 25가 되는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <rect class="hl" x="${DX[0] - 24}" y="34" width="48" height="292" rx="14" fill="${C.b}" opacity="0"/>
        ${T(DX[0], 66, '2', { s: 32, f: C.c, c: 's1' })}${T(DX[1], 66, '5', { s: 32, f: C.c, c: 's3' })}
        <path d="M194 82 H290 M194 82 Q208 104 194 128" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        ${T(168, 118, '3', { s: 32, f: C.d })}
        ${T(DX[0], 118, '7', { s: 32 })}${T(DX[1], 118, '5', { s: 32 })}
        <g class="s1b">${T(DX[0], 162, '6', { s: 32 })}<line x1="${DX[0] - 24}" y1="176" x2="${DX[1] + 20}" y2="176" stroke="${C.ink}" stroke-width="3"/></g>
        ${T(DX[0], 212, '1', { s: 32, c: 's2' })}
        <g class="s2b">${T(DX[1], 212, '5', { s: 32, f: C.d })}
          <path d="M${DX[1] + 22} 110 C${DX[1] + 40} 140, ${DX[1] + 40} 170, ${DX[1] + 22} 194 m-2 -12 l2 12 l11 -6" fill="none" stroke="${C.d}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="s3b">${T(DX[0], 256, '1', { s: 32 })}${T(DX[1], 256, '5', { s: 32 })}<line x1="${DX[0] - 24}" y1="270" x2="${DX[1] + 20}" y2="270" stroke="${C.ink}" stroke-width="3"/>
          ${T(DX[1], 306, '0', { s: 32 })}</g>
        <g class="n1">${T(318, 118, '7÷3=2…1', { s: 20, f: C.c, a: 'start' })}</g>
        <g class="n2">${T(318, 212, '10+5=15', { s: 20, f: C.d, a: 'start' })}</g>
        <g class="n3">${T(318, 256, '15÷3=5', { s: 20, f: C.c, a: 'start' })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          const on = (c, t) => q(c).setAttribute('opacity', dgP(e, t, 400));
          on('.n1', 700); on('.s1', 1100); on('.s1b', 1700); on('.s2', 2300);
          on('.n2', 3100); on('.s2b', 3300);
          on('.n3', 4500); on('.s3', 4900); on('.s3b', 5500);
          const hl = q('.hl');
          if (e >= 700 && e < 3000) { hl.setAttribute('x', DX[0] - 24); hl.setAttribute('opacity', 0.5); }
          else if (e >= 4500 && e < 6400) { hl.setAttribute('x', DX[1] - 24); hl.setAttribute('opacity', 0.5); }
          else hl.setAttribute('opacity', 0);
        });
      }
    },
  });
})();
