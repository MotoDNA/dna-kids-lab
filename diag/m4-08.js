/* 4학년 수학 · 수직과 평행으로 사각형을 알아볼까? (m4-08) */
(() => {
  const C = DG_C, R = Math.PI / 180;
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const L = (x1, y1, x2, y2, col, w = 4, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const P = a => a.map(p => p.map(v => +v.toFixed(1)).join(' ')).join(' L');

  /* 2: 사다리꼴 / 평행사변형(65°) */
  const TZ = [[20, 230], [210, 230], [165, 139], [62, 139]];
  const pg = (x, y, b, s, a) => { const dx = s * Math.cos(a * R), dy = s * Math.sin(a * R); return [[x, y], [x + b, y], [x + b + dx, y - dy], [x + dx, y - dy]]; };
  const PG = pg(258, 230, 150, 100, 65);
  const AN = [
    { v: PG[0], d: 32.5, t: '65°' }, { v: PG[1], d: 122.5, t: '115°' },
    { v: PG[2], d: 212.5, t: '65°' }, { v: PG[3], d: 302.5, t: '115°' },
  ];
  const at = (v, d, r) => [v[0] + r * Math.cos(d * R), v[1] - r * Math.sin(d * R)];

  /* 3: 마름모 */
  const rh = th => pg(110, 240, 130, 130, th);
  const rhSvg = th => {
    const p = rh(th), c = [(p[0][0] + p[2][0]) / 2, (p[0][1] + p[2][1]) / 2];
    let s = `<path d="M${P(p)} Z" fill="${C.b}" fill-opacity=".45" stroke="none"/>`;
    for (let i = 0; i < 4; i++) {
      const a = p[i], b = p[(i + 1) % 4], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const vx = b[0] - a[0], vy = b[1] - a[1], len = Math.hypot(vx, vy), ux = vx / len, uy = vy / len;
      let nx = -uy, ny = ux; if ((m[0] - c[0]) * nx + (m[1] - c[1]) * ny < 0) { nx = -nx; ny = -ny; }
      s += `<g class="sd sd${i}">${L(a[0], a[1], b[0], b[1], C.c, 6)}
        ${L(m[0] - nx * 9, m[1] - ny * 9, m[0] + nx * 9, m[1] + ny * 9, C.ink, 3)}
        ${T(m[0] + nx * 20, m[1] + ny * 22 + 7, '7 cm', { fill: C.c, fs: 20, a: nx > 0.3 ? 'start' : nx < -0.3 ? 'end' : 'middle' })}</g>`;
    }
    return s;
  };

  /* 4: 평행사변형 8 cm, 5 cm */
  const Q = pg(60, 220, 230, 140, 60);
  const lab4 = {
    b: [175, 252], t: [(Q[2][0] + Q[3][0]) / 2, Q[3][1] - 14],
    l: [(Q[0][0] + Q[3][0]) / 2 - 26, (Q[0][1] + Q[3][1]) / 2 + 12], r: [(Q[1][0] + Q[2][0]) / 2 + 26, (Q[1][1] + Q[2][1]) / 2 + 12],
  };

  Object.assign(DIAG, {
    'm4-08:0': {
      alt: '삼각자의 직각 부분을 직선 나에 대고 직선 가를 그으면 두 직선이 90°로 만나 서로 수직이 되고, 직선 가는 직선 나에 대한 수선이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${L(30, 220, 450, 220, C.ink, 5)}
        ${T(452, 252, '나', { fs: 22, fw: 800 })}
        <g class="sq3"><path d="M0 0 L0 -150 L95 0 Z" fill="${C.b}" fill-opacity=".55" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M14 -40 L14 -14 L40 -14 Z" fill="#fff" stroke="${C.d}" stroke-width="2"/></g>
        <line class="ga" x1="200" y1="270" x2="200" y2="270" stroke="${C.c}" stroke-width="5" stroke-linecap="round"/>
        <g class="fin">
          <path d="M184 220 v-16 h16" fill="none" stroke="${C.ink}" stroke-width="2.5"/>
          ${T(200, 40, '가', { fs: 22, fw: 800, fill: C.c })}
          ${T(150, 196, '90°', { fs: 20, fw: 800 })}
          ${T(345, 120, '서로 수직', { fs: 26, fw: 800, fill: C.d })}
          ${T(345, 158, '가는 나의 수선', { fs: 20, fill: C.c })}
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const m = dgEase(dgP(e, 300, 1300));
          q('.sq3').setAttribute('transform', `translate(${60 + 140 * m},220)`);
          q('.sq3').setAttribute('opacity', e > 4200 ? 0.35 : 1);
          const g = dgEase(dgP(e, 1900, 1300));
          q('.ga').setAttribute('y2', 270 - 215 * g); q('.ga').setAttribute('opacity', g > 0 ? 1 : 0);
          op(el, '.fin', e > 3300 ? 1 : 0);
        });
      }
    },

    'm4-08:1': {
      alt: '평행선 사이에 수선을 세 군데 그어 재면 모두 3 cm로 같고, 비스듬히 그은 선분은 3 cm보다 더 긴 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <line class="pl" x1="30" y1="80" x2="450" y2="80" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        <line class="pl" x1="30" y1="200" x2="450" y2="200" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        ${[70, 165, 260].map((x, i) => `<g class="v v${i}">
          <line class="vl" x1="${x}" y1="200" x2="${x}" y2="80" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
          <path d="M${x + 14} 200 v-14 h-14" fill="none" stroke="${C.d}" stroke-width="2.5"/>
          ${T(x + 12, 147, '3 cm', { a: 'start', fill: C.d, fs: 20, fw: 800 })}</g>`).join('')}
        <g class="sl"><line x1="330" y1="200" x2="400" y2="80" stroke="${C.c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="9 8"/>
          ${T(382, 152, '더 길어요', { a: 'start', fill: C.c, fs: 18 })}</g>
        ${T(240, 250, '평행선 사이의 거리 = 3 cm', { cls: 'fin', fs: 22, fw: 800 })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const a = dgEase(dgP(e, 0, 800));
          el.querySelectorAll('.pl').forEach(l => l.setAttribute('x2', 30 + 420 * a));
          [0, 1, 2].forEach(i => {
            const g = q('.v' + i), f = dgEase(dgP(e, 1000 + i * 800, 600));
            g.setAttribute('opacity', f > 0 ? 1 : 0);
            g.querySelector('.vl').setAttribute('y2', 200 - 120 * f);
            g.querySelectorAll('text,path').forEach(n => n.setAttribute('opacity', f >= 1 ? 1 : 0));
          });
          op(el, '.sl', e > 3700 ? 1 : 0);
          op(el, '.fin', e > 4500 ? 1 : 0);
        });
      }
    },

    'm4-08:2': {
      alt: '사다리꼴은 평행한 변이 한 쌍, 평행사변형은 평행한 변이 두 쌍이고, 평행사변형에서 마주 보는 각은 65°와 65°, 115°와 115°로 같으며 이웃한 두 각의 합은 180°인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M${P(TZ)} Z" fill="${C.a}" fill-opacity=".4" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${P(PG)} Z" fill="${C.b}" fill-opacity=".4" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <g class="t1">${L(...TZ[0], ...TZ[1], C.c, 6)}${L(...TZ[2], ...TZ[3], C.c, 6)}</g>
        <g class="p1">${L(...PG[0], ...PG[1], C.c, 6)}${L(...PG[2], ...PG[3], C.c, 6)}</g>
        <g class="p2">${L(...PG[1], ...PG[2], C.d, 6)}${L(...PG[3], ...PG[0], C.d, 6)}</g>
        ${T(115, 105, '사다리꼴', { fs: 22, fw: 800 })}
        ${T(355, 105, '평행사변형', { fs: 22, fw: 800 })}
        ${T(115, 270, '평행 1쌍', { cls: 't1', fill: C.c })}
        ${T(355, 270, '평행 2쌍', { cls: 'p2', fill: C.d })}
        ${AN.map((n, i) => { const [x, y] = at(n.v, n.d, i % 2 ? 36 : 48); return T(x, y + 7, n.t, { cls: 'an an' + i, fs: 18, fw: 800, fill: i % 2 ? C.ink : C.r }); }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5600, e => {
          op(el, '.t1', e > 600 ? 1 : 0);
          op(el, '.p1', e > 1700 ? 1 : 0);
          op(el, '.p2', e > 2700 ? 1 : 0);
          [0, 2, 1, 3].forEach((i, k) => op(el, '.an' + i, e > 3700 + k * 450 ? 1 : 0));
        });
      }
    },

    'm4-08:3': {
      alt: '길이가 7 cm로 모두 같은 막대 네 개로 만든 정사각형을 비스듬히 기울이면 마름모가 되고, 네 변의 길이의 합은 7 × 4 = 28(cm)인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="rh">${rhSvg(90)}</g>
        ${T(400, 140, '7 × 4', { cls: 'eq', fs: 24, fw: 800 })}
        ${T(400, 176, '= 28(cm)', { cls: 'eq', fs: 24, fw: 800, fill: C.c })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          const th = 90 - 30 * dgEase(dgP(e, 2300, 1400));
          q('.rh').innerHTML = rhSvg(th);
          [0, 1, 2, 3].forEach(i => op(el, '.sd' + i, e > 200 + i * 450 ? 1 : 0));
          q('.rh path').setAttribute('opacity', e > 1900 ? 1 : 0);
          op(el, '.eq', e > 4300 ? 1 : 0);
        });
      }
    },

    'm4-08:4': {
      alt: '두 변이 8 cm, 5 cm인 평행사변형에서 마주 보는 변의 길이가 같으므로 맞은편 변도 8 cm, 5 cm가 되어 네 변의 합이 8 + 5 + 8 + 5 = 26(cm)인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M${P(Q)} Z" fill="${C.b}" fill-opacity=".4" stroke="none"/>
        ${L(...Q[0], ...Q[1], C.d, 5)}${L(...Q[3], ...Q[0], C.r, 5)}
        <g class="cp">${L(...Q[2], ...Q[3], C.d, 5)}${L(...Q[1], ...Q[2], C.r, 5)}</g>
        ${T(...lab4.b, '8 cm', { fill: C.d, fw: 800 })}
        ${T(...lab4.l, '5 cm', { a: 'end', fill: C.r, fw: 800 })}
        ${T(...lab4.t, '8 cm', { cls: 'ct', fill: C.d, fw: 800 })}
        ${T(...lab4.r, '5 cm', { cls: 'cr', a: 'start', fill: C.r, fw: 800 })}
        ${T(240, 290, '8 + 5 + 8 + 5 = 26(cm)', { cls: 'eq', fs: 24, fw: 800 })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          const a = dgEase(dgP(e, 900, 1300)), b = dgEase(dgP(e, 2300, 1300));
          q('.ct').setAttribute('transform', `translate(${(lab4.b[0] - lab4.t[0]) * (1 - a)},${(lab4.b[1] + 26 - lab4.t[1]) * (1 - a)})`);
          q('.cr').setAttribute('transform', `translate(${(lab4.l[0] - 44 - lab4.r[0]) * (1 - b)},${(lab4.l[1] + 28 - lab4.r[1]) * (1 - b)})`);
          q('.ct').setAttribute('opacity', e > 800 ? 1 : 0);
          q('.cr').setAttribute('opacity', e > 2200 ? 1 : 0);
          op(el, '.cp', e > 3700 ? 1 : 0);
          op(el, '.eq', e > 4100 ? 1 : 0);
        });
      }
    },
  });
})();
