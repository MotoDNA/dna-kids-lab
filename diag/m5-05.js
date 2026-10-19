/* 5학년 수학 · 소수끼리 곱하면 소수점은 어디로 갈까? (m5-05) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));

  /* 0: 수직선 0 ~ 1.5 */
  const nx = v => 40 + v * 280;
  /* 3: 소수점 이동 */
  const DX = 34, DC = c => 210 + c * DX, BX = b => DC(b) + DX / 2; // b번째 칸 오른쪽 경계
  const ROWS = [
    { lab: '× 10', to: 1, res: '32.5', lead: false, trail: false },
    { lab: '× 100', to: 2, res: '325', lead: false, trail: false, end: true },
    { lab: '× 1000', to: 3, res: '3250', lead: false, trail: true, end: true },
    { lab: '× 0.1', to: -1, res: '0.325', lead: true, trail: false },
  ];
  const RY = i => 70 + i * 62;

  Object.assign(DIAG, {
    'm5-05:0': {
      alt: '수직선에서 0부터 0.3씩 4번 뛰어 세면 0.3, 0.6, 0.9, 1.2에 닿아 0.3 × 4 = 1.2이고, 0.1이 12개인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        <line x1="24" y1="150" x2="464" y2="150" stroke="${C.ink}" stroke-width="3"/>
        ${Array.from({ length: 16 }, (_, k) => `<line class="tk${k}" x1="${nx(k / 10)}" y1="${k % 10 ? 143 : 136}" x2="${nx(k / 10)}" y2="${k % 10 ? 157 : 164}" stroke="${k > 0 && k <= 12 ? C.c : C.ink}" stroke-width="${k % 10 ? 2 : 3}"/>`).join('')}
        ${T(nx(0), 190, '0', { fs: 20, fw: 700, fill: C.sub })}${T(nx(1), 190, '1', { fs: 20, fw: 700, fill: C.sub })}
        ${[1, 2, 3, 4].map(k => `<path class="j j${k}" d="M${nx(.3 * k - .3)} 140 Q${(nx(.3 * k - .3) + nx(.3 * k)) / 2} 70 ${nx(.3 * k)} 140" fill="none" stroke="${C.d}" stroke-width="3.5" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>
          ${T((nx(.3 * k - .3) + nx(.3 * k)) / 2, 92, '0.3', { cls: 'jl' + k, fs: 18, fw: 800, fill: C.d })}
          <circle class="m${k}" cx="${nx(.3 * k)}" cy="150" r="7" fill="${k === 4 ? C.c : C.d}"/>`).join('')}
        ${T(nx(1.2), 190, '1.2', { cls: 'm4', fs: 24, fw: 800, fill: C.c })}
        ${T(240, 234, '0.3 × 4 = 1.2', { cls: 'ft', a: 'end', fs: 22, fw: 800 })}
        ${T(262, 234, '(0.1이 12개)', { cls: 'ft2', a: 'start', fs: 20, fw: 700, fill: C.c })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          [1, 2, 3, 4].forEach(k => {
            const f = dgEase(dgP(e, 300 + (k - 1) * 800, 650));
            q('.j' + k).setAttribute('stroke-dashoffset', 1 - f);
            op(el, '.jl' + k, f > .5 ? 1 : 0);
            op(el, '.m' + k, f >= 1 ? 1 : 0);
          });
          op(el, '.ft', e > 3600 ? 1 : 0);
          for (let k = 1; k <= 12; k++) q('.tk' + k).setAttribute('stroke', e > 4200 + k * 60 ? C.c : C.ink);
          op(el, '.ft2', e > 5000 ? 1 : 0);
        });
      }
    },

    'm5-05:1': {
      alt: '길이 6m 막대를 10칸으로 나누어 그중 7칸을 색칠하면 6의 0.7배인 4.2m가 되어, 1보다 작은 수를 곱하면 처음 수 6보다 작아지는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <path d="M60 64 v-12 H420 v12" fill="none" stroke="${C.ink}" stroke-width="2.5"/>
        ${T(240, 40, '6m', { fs: 24, fw: 800 })}
        <rect x="60" y="76" width="360" height="50" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
        ${Array.from({ length: 10 }, (_, i) => `<rect class="c c${i}" x="${60 + i * 36}" y="76" width="36" height="50" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>`).join('')}
        ${Array.from({ length: 9 }, (_, i) => `<line x1="${96 + i * 36}" y1="76" x2="${96 + i * 36}" y2="126" stroke="${C.sub}" stroke-width="1.5"/>`).join('')}
        <rect x="60" y="76" width="360" height="50" fill="none" stroke="${C.ink}" stroke-width="3"/>
        <g class="br"><path d="M60 138 v12 H312 v-12" fill="none" stroke="${C.c}" stroke-width="2.5"/>
          ${T(186, 178, '0.7배 = 4.2m', { fs: 22, fw: 800, fill: C.c })}</g>
        ${T(240, 238, '6 × 0.7 = 4.2', { cls: 'eq', a: 'end', fs: 24, fw: 800 })}
        ${T(258, 238, '6보다 작아요', { cls: 'eq2', a: 'start', fs: 20, fw: 800, fill: C.d })}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          for (let i = 0; i < 10; i++) op(el, '.c' + i, i < 7 && e > 800 + i * 300 ? 1 : 0);
          op(el, '.br', e > 3100 ? 1 : 0);
          op(el, '.eq', e > 3800 ? 1 : 0);
          op(el, '.eq2', e > 4500 ? 1 : 0);
        });
      }
    },

    'm5-05:2': {
      alt: '가로와 세로가 1인 정사각형을 10칸씩 나눈 모눈에서 가로 0.4(4칸), 세로 0.6(6칸)을 색칠하면 24칸이라 0.4 × 0.6 = 0.24이고, 1.5 × 2.3은 15 × 23 = 345에 소수 두 자리를 만들어 3.45인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${Array.from({ length: 100 }, (_, k) => { const c = k % 10, r = Math.floor(k / 10); return `<rect class="${c < 4 && r < 6 ? 'g g' + (r * 4 + c) : ''}" x="${54 + c * 19}" y="${54 + r * 19}" width="19" height="19" fill="#fff" stroke="#c7c7cc" stroke-width="1"/>`; }).join('')}
        <rect x="54" y="54" width="190" height="190" fill="none" stroke="${C.sub}" stroke-width="2.5"/>
        <path d="M54 44 v-8 H130 v8" fill="none" stroke="${C.c}" stroke-width="2.5"/>${T(92, 28, '0.4', { fs: 20, fw: 800, fill: C.c })}
        <path d="M44 54 h-8 V168 h8" fill="none" stroke="${C.d}" stroke-width="2.5"/>${T(30, 117, '0.6', { a: 'end', fs: 20, fw: 800, fill: C.d })}
        ${T(149, 280, '0.4 × 0.6 = 0.24', { cls: 'eq', fs: 22, fw: 800 })}
        ${T(272, 84, '1.5 × 2.3', { cls: 's s0', a: 'start', fs: 22, fw: 800 })}
        ${T(272, 132, '① 15 × 23 = 345', { cls: 's s1', a: 'start', fs: 20, fw: 700 })}
        ${T(272, 172, '② 1 + 1 = 2자리', { cls: 's s2', a: 'start', fs: 20, fw: 700 })}
        ${T(272, 212, '③ 3.45', { cls: 's s3', a: 'start', fs: 22, fw: 800, fill: C.c })}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          const n = Math.round(24 * dgP(e, 300, 2400));
          qa('.g').forEach(r => { const k = +r.getAttribute('class').split(' ')[1].slice(1); r.setAttribute('fill', k < n ? C.a : '#fff'); });
          op(el, '.eq', e > 3000 ? 1 : 0);
          [0, 1, 2, 3].forEach(i => op(el, '.s' + i, e > 3600 + i * 650 ? 1 : 0));
        });
      }
    },

    'm5-05:3': {
      alt: '3.25에 10, 100, 1000을 곱하면 0의 개수만큼 소수점이 오른쪽으로 옮겨 가 32.5, 325, 3250이 되고, 0.1을 곱하면 소수점이 왼쪽으로 한 칸 옮겨 가 0.325가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${ROWS.map((r, i) => `<g>
          ${T(12, RY(i) + 10, '3.25 ' + r.lab, { a: 'start', fs: 20, fw: 800, fill: r.to > 0 ? C.c : C.d })}
          ${r.lead ? T(DC(-1), RY(i) + 11, '0', { cls: 'ex' + i, fs: 32, fw: 800, fill: C.d }) : ''}
          ${['3', '2', '5'].map((d, c) => T(DC(c), RY(i) + 11, d, { fs: 32, fw: 800 })).join('')}
          ${r.trail ? T(DC(3), RY(i) + 11, '0', { cls: 'ex' + i, fs: 32, fw: 800, fill: C.c }) : ''}
          <path class="ar${i}" d="" fill="none" stroke="${r.to > 0 ? C.c : C.d}" stroke-width="2.5" stroke-linecap="round"/>
          <circle class="pt${i}" cx="${BX(0)}" cy="${RY(i) + 9}" r="4.5" fill="${C.ink}"/>
          ${T(470, RY(i) + 10, '= ' + r.res, { cls: 'rs' + i, a: 'end', fs: 22, fw: 800, fill: r.to > 0 ? C.c : C.d })}
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          ROWS.forEach((r, i) => {
            const st = 300 + i * 1500, f = dgEase(dgP(e, st, 900)), x0 = BX(0), x1 = BX(r.to), x = x0 + (x1 - x0) * f;
            const y = RY(i) + 9 - 30 * Math.sin(Math.PI * ((f * Math.abs(r.to)) % 1));
            const p = q('.pt' + i); p.setAttribute('cx', x); p.setAttribute('cy', f >= 1 ? RY(i) + 9 : y);
            p.setAttribute('opacity', f >= 1 && r.end ? 0 : 1);
            // 지나간 길을 칸마다 호로 표시
            let d = '';
            const steps = Math.abs(r.to), dir = Math.sign(r.to), done = f * steps;
            for (let s = 0; s < steps; s++) {
              const a = BX(s * dir), b = BX((s + 1) * dir), part = Math.min(1, Math.max(0, done - s));
              if (part <= 0) continue;
              const bx = a + (b - a) * part, ym = RY(i) - 44;
              d += `M${a} ${RY(i) - 18} Q${(a + bx) / 2} ${ym} ${bx} ${RY(i) - 18 - (part < 1 ? 12 * Math.sin(Math.PI * part) : 0)} `;
            }
            q('.ar' + i).setAttribute('d', d);
            op(el, '.ex' + i, f > .6 ? 1 : 0);
            op(el, '.rs' + i, f >= 1 ? 1 : 0);
          });
        });
      }
    },
  });
})();
