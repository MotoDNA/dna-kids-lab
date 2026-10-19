/* 5학년 수학 · 나누어떨어지는 수에는 어떤 규칙이 있을까? (m5-03) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));

  /* 0: 사탕 12개를 n명에게 */
  const N0 = [1, 2, 3, 4, 6, 12];
  const LAY = { 1: [6, 2, 'all'], 2: [6, 2, 'row'], 3: [4, 3, 'row'], 4: [3, 4, 'row'], 6: [6, 2, 'col'], 12: [6, 2, 'one'] };
  const panel = (n, idx) => {
    const cx = 80 + (idx % 3) * 160, top = 28 + Math.floor(idx / 3) * 130, m = 12 / n, g = 15;
    const [cols, rows, mode] = LAY[n], w = cols * g, h = rows * g, x0 = cx - w / 2 + g / 2, y0 = top + (62 - h) / 2 + g / 2;
    const R = (x, y, ww, hh) => `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="6" fill="none" stroke="${C.d}" stroke-width="2"/>`;
    let s = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += `<circle cx="${x0 + c * g}" cy="${y0 + r * g}" r="5.5" fill="${C.c}"/>`;
    if (mode === 'all') s += R(x0 - g / 2 - 1, y0 - g / 2 - 1, w + 2, h + 2);
    if (mode === 'row') for (let r = 0; r < rows; r++) s += R(x0 - g / 2, y0 + r * g - g / 2 + 1, w, g - 2);
    if (mode === 'col') for (let c = 0; c < cols; c++) s += R(x0 + c * g - g / 2 + 1, y0 - g / 2, g - 2, h);
    if (mode === 'one') for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += R(x0 + c * g - g / 2 + 1, y0 + r * g - g / 2 + 1, g - 2, g - 2);
    return `<g class="p p${idx}">${s}${T(cx, top + 92, `${n}명 → ${m}개씩`, { fs: 18, fw: 700 })}</g>`;
  };

  /* 1: 수직선 0~20 */
  const nx = v => 30 + v * 21;

  /* 2: 벤 다이어그램 */
  const V18 = [[100, 130, '9'], [96, 185, '18']], V24 = [[385, 112, '4'], [400, 157, '8'], [385, 202, '12'], [350, 238, '24']], VC = [[218, 124, '1'], [262, 124, '2'], [218, 172, '3']];

  /* 3: 거꾸로 나눗셈 */
  const LX = 150, CX1 = 230, CX2 = 300, RY = [78, 136, 194];

  Object.assign(DIAG, {
    'm5-03:0': {
      alt: '사탕 12개를 1명, 2명, 3명, 4명, 6명, 12명에게 나누면 12개씩, 6개씩, 4개씩, 3개씩, 2개씩, 1개씩 남김없이 나누어떨어지므로 1, 2, 3, 4, 6, 12가 12의 약수인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${N0.map(panel).join('')}
        ${T(240, 290, '12의 약수: 1, 2, 3, 4, 6, 12', { cls: 'ft', fs: 22, fw: 800, fill: C.d })}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          N0.forEach((n, i) => op(el, '.p' + i, e > 200 + i * 650 ? 1 : 0));
          op(el, '.ft', e > 4300 ? 1 : 0);
        });
      }
    },

    'm5-03:1': {
      alt: '수직선 위에서 0부터 4씩 뛰어 세면 4, 8, 12, 16, 20에 닿고, 이 수들이 4의 배수이며 4 × 3 = 12인 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <line x1="20" y1="150" x2="465" y2="150" stroke="${C.ink}" stroke-width="3"/>
        ${Array.from({ length: 21 }, (_, v) => `<line x1="${nx(v)}" y1="${v % 4 ? 143 : 138}" x2="${nx(v)}" y2="${v % 4 ? 157 : 162}" stroke="${C.ink}" stroke-width="${v % 4 ? 1.5 : 3}"/>`).join('')}
        ${T(nx(0), 186, '0', { fs: 20, fw: 700, fill: C.sub })}
        ${[1, 2, 3, 4, 5].map(k => `<path class="j j${k}" d="M${nx(4 * k - 4)} 140 Q${(nx(4 * k - 4) + nx(4 * k)) / 2} 76 ${nx(4 * k)} 140" fill="none" stroke="${C.d}" stroke-width="3.5" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>
          ${T((nx(4 * k - 4) + nx(4 * k)) / 2, 98, '+4', { cls: 'jl jl' + k, fs: 18, fw: 700, fill: C.d })}
          <circle class="m m${k}" cx="${nx(4 * k)}" cy="150" r="8" fill="${C.c}"/>
          ${T(nx(4 * k), 186, 4 * k, { cls: 'm m' + k, fs: 22, fw: 800, fill: C.c })}`).join('')}
        ${T(20, 236, '4의 배수: 4, 8, 12, 16, …', { cls: 'ft', a: 'start', fs: 22, fw: 800, fill: C.c })}
        ${T(465, 236, '4 × 3 = 12', { cls: 'ft2', a: 'end', fs: 20, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [1, 2, 3, 4, 5].forEach(k => {
            const st = 300 + (k - 1) * 800, f = dgEase(dgP(e, st, 600));
            q('.j' + k).setAttribute('stroke-dashoffset', 1 - f);
            op(el, '.jl' + k, f > .5 ? 1 : 0);
            op(el, '.m' + k, f >= 1 ? 1 : 0);
          });
          op(el, '.ft', e > 4400 ? 1 : 0);
          op(el, '.ft2', e > 5000 ? 1 : 0);
        });
      }
    },

    'm5-03:2': {
      alt: '18의 약수와 24의 약수를 두 원에 넣으면 겹치는 부분에 공약수 1, 2, 3, 6이 들어가고, 그중 가장 큰 6이 최대공약수인 그림',
      svg: `<svg viewBox="0 0 480 306" class="dg-svg" role="img">
        <circle cx="170" cy="160" r="112" fill="${C.a}" fill-opacity=".35" stroke="${C.c}" stroke-width="3"/>
        <circle cx="310" cy="160" r="112" fill="${C.b}" fill-opacity=".35" stroke="${C.d}" stroke-width="3"/>
        ${T(140, 34, '18의 약수', { cls: 'h', fs: 20, fw: 800, fill: C.c })}
        ${T(340, 34, '24의 약수', { cls: 'h', fs: 20, fw: 800, fill: C.d })}
        ${V18.map(([x, y, t]) => T(x, y, t, { cls: 'a', fs: 26, fw: 800 })).join('')}
        ${V24.map(([x, y, t]) => T(x, y, t, { cls: 'b', fs: 26, fw: 800 })).join('')}
        ${VC.map(([x, y, t]) => T(x, y, t, { cls: 'c', fs: 26, fw: 800 })).join('')}
        <circle class="g" cx="262" cy="163" r="22" fill="#fff" stroke="${C.r}" stroke-width="4"/>
        ${T(262, 172, '6', { cls: 'c', fs: 26, fw: 800, fill: C.r })}
        ${T(240, 214, '공약수', { cls: 'c', fs: 18, fw: 700, fill: C.sub })}
        ${T(240, 300, '최대공약수 = 6', { cls: 'g', fs: 22, fw: 800, fill: C.r })}
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          op(el, '.h', e > 100 ? 1 : 0);
          op(el, '.a', e > 700 ? 1 : 0);
          op(el, '.b', e > 1600 ? 1 : 0);
          op(el, '.c', e > 2600 ? 1 : 0);
          op(el, '.g', e > 3700 ? 1 : 0);
        });
      }
    },

    'm5-03:3': {
      alt: '18과 24를 2로 나누면 9와 12, 다시 3으로 나누면 3과 4가 되어 멈추는 거꾸로 된 나눗셈. 왼쪽 수를 곱한 2 × 3 = 6이 최대공약수, 왼쪽 수와 아래 수를 모두 곱한 2 × 3 × 3 × 4 = 72가 최소공배수인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[0, 1].map(r => `<path class="r${r}" d="M${LX + 18} ${RY[r] - 34} V${RY[r] + 14} H${CX2 + 36}" fill="none" stroke="${C.ink}" stroke-width="3"/>`).join('')}
        ${T(LX, RY[0], '2', { cls: 'r0 dv', fs: 30, fw: 800, fill: C.d })}${T(CX1, RY[0], '18', { fs: 30, fw: 800 })}${T(CX2, RY[0], '24', { fs: 30, fw: 800 })}
        ${T(LX, RY[1], '3', { cls: 'r1 dv', fs: 30, fw: 800, fill: C.d })}${T(CX1, RY[1], '9', { cls: 'r0', fs: 30, fw: 800 })}${T(CX2, RY[1], '12', { cls: 'r0', fs: 30, fw: 800 })}
        ${T(CX1, RY[2], '3', { cls: 'r1', fs: 30, fw: 800, fill: C.c })}${T(CX2, RY[2], '4', { cls: 'r1', fs: 30, fw: 800, fill: C.c })}
        <rect class="gh" x="${LX - 22}" y="${RY[0] - 34}" width="44" height="${RY[1] - RY[0] + 48}" rx="12" fill="none" stroke="${C.d}" stroke-width="3"/>
        <path class="lh" d="M${LX - 26} ${RY[0] - 38} V${RY[2] + 18} H${CX2 + 30}" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        ${T(400, 104, '더 이상', { cls: 'st', fs: 18, fw: 700, fill: C.sub })}${T(400, 128, '못 나눠요', { cls: 'st', fs: 18, fw: 700, fill: C.sub })}
        <path class="st" d="M360 150 Q345 175 ${CX2 + 26} 186" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round"/>
        ${T(240, 250, '최대공약수 2 × 3 = 6', { cls: 'gh', fs: 22, fw: 800, fill: C.d })}
        ${T(240, 286, '최소공배수 2 × 3 × 3 × 4 = 72', { cls: 'lh', fs: 22, fw: 800, fill: C.c })}
      </svg>`,
      play(el) {
        dgAnim(el, 6400, e => {
          op(el, '.r0', e > 600 ? 1 : 0);
          op(el, '.r1', e > 1800 ? 1 : 0);
          op(el, '.st', e > 2900 ? 1 : 0);
          op(el, '.gh', e > 3800 ? 1 : 0);
          op(el, '.lh', e > 5000 ? 1 : 0);
        });
      }
    },
  });
})();
