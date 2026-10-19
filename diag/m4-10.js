/* 4학년 수학 · 변이 많아지면 어떤 도형이 될까? 다각형과 대각선 (m4-10) */
(() => {
  const C = DG_C, R = Math.PI / 180, RED = '#ff3b30', GF = '#d6efdc';
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const f1 = v => +v.toFixed(1);
  const poly = (cx, cy, r, n, a0 = 90) => Array.from({ length: n }, (_, k) => [f1(cx + r * Math.cos((a0 + k * 360 / n) * R)), f1(cy - r * Math.sin((a0 + k * 360 / n) * R))]);
  const D = pts => 'M' + pts.map(p => p.join(' ')).join(' L') + ' Z';
  const tick = (a, b, n = 1, col = C.ink) => {
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], vx = b[0] - a[0], vy = b[1] - a[1], l = Math.hypot(vx, vy), ux = vx / l, uy = vy / l;
    let s = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 6; s += `<line x1="${f1(m[0] + ux * o - uy * 8)}" y1="${f1(m[1] + uy * o + ux * 8)}" x2="${f1(m[0] + ux * o + uy * 8)}" y2="${f1(m[1] + uy * o - ux * 8)}" stroke="${col}" stroke-width="2.5"/>`; }
    return s;
  };
  const sqMark = (v, a, b, s = 13) => { // v 꼭짓점, a/b 이웃 꼭짓점 방향으로 직각 표시
    const u = p => { const dx = p[0] - v[0], dy = p[1] - v[1], l = Math.hypot(dx, dy); return [dx / l * s, dy / l * s]; };
    const [ax, ay] = u(a), [bx, by] = u(b);
    return `<path d="M${f1(v[0] + ax)} ${f1(v[1] + ay)} L${f1(v[0] + ax + bx)} ${f1(v[1] + ay + by)} L${f1(v[0] + bx)} ${f1(v[1] + by)}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
  };
  const OX = (x, y, ok) => ok ? `<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${C.d}" stroke-width="3.5"/>`
    : `<path d="M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>`;

  /* 0 */
  const P0 = [[5, '오각형'], [6, '육각형'], [8, '팔각형']].map(([n, t], i) => ({ n, t, pts: poly(80 + i * 160, 108, 56, n, n === 8 ? 67.5 : 90) }));
  const open = poly(300, 250, 34, 5).slice(0, 5);

  /* 1 */
  const SQ = [[30, 150], [130, 150], [130, 50], [30, 50]];
  const RH = (() => { const x = 172, y = 150, s = 92, dx = s * Math.cos(60 * R), dy = s * Math.sin(60 * R); return [[x, y], [x + s, y], [x + s + dx, y - dy], [x + dx, y - dy]].map(p => p.map(f1)); })();
  const RC = [[335, 145], [465, 145], [465, 65], [335, 65]];
  const arcAt = (v, a, b, r, col) => {
    const ang = p => Math.atan2(p[1] - v[1], p[0] - v[0]);
    const a1 = ang(a), a2 = ang(b);
    const p1 = [v[0] + r * Math.cos(a1), v[1] + r * Math.sin(a1)], p2 = [v[0] + r * Math.cos(a2), v[1] + r * Math.sin(a2)];
    let d = a2 - a1; while (d < 0) d += 2 * Math.PI;
    return `<path d="M${f1(p1[0])} ${f1(p1[1])} A${r} ${r} 0 0 ${d < Math.PI ? 1 : 0} ${f1(p2[0])} ${f1(p2[1])}" fill="none" stroke="${col}" stroke-width="3"/>`;
  };
  const S1 = [
    { pts: SQ, cx: 80, t: [1, 1, 1, 1], ang: 'sq', side: true, angle: true },
    { pts: RH, cx: 240, t: [1, 1, 1, 1], ang: 'rh', side: true, angle: false },
    { pts: RC, cx: 400, t: [1, 2, 1, 2], ang: 'sq', side: false, angle: true },
  ];

  /* 2 */
  const P2 = [[4, '사각형'], [5, '오각형'], [6, '육각형']].map(([n, t], i) => {
    const pts = poly(80 + i * 160, 112, 64, n, n === 4 ? 45 : 90), dg = [];
    for (let a = 0; a < n; a++) for (let b = a + 2; b < n; b++) if (!(a === 0 && b === n - 1)) dg.push([a, b]);
    return { n, t, pts, dg };
  });

  /* 3 */
  const S3 = [
    { pts: [[20, 150], [140, 150], [140, 60], [20, 60]], lab: '길이 같음', tk: [1, 1, 1, 1], perp: false },
    { pts: [[240, 160], [300, 105], [240, 50], [180, 105]], lab: '수직', tk: [1, 2, 1, 2], perp: true },
    { pts: [[350, 155], [450, 155], [450, 55], [350, 55]], lab: '길이 같고 수직', tk: [1, 1, 1, 1], perp: true },
  ];
  S3.forEach(s => { const p = s.pts; s.c = [(p[0][0] + p[2][0]) / 2, (p[0][1] + p[2][1]) / 2]; });

  /* 4: 정육각형(꼭짓점이 옆으로) 채우기 */
  const HX = i => ({ c: [80 + i * 160, 115], v: poly(80 + i * 160, 115, 64, 6, 0) });
  const pieces = [
    (h => Array.from({ length: 6 }, (_, k) => ({ p: [h.c, h.v[k], h.v[(k + 1) % 6]], f: GF, s: C.r })))(HX(0)),
    (h => [[0, 1, 2, 3], [3, 4, 5, 0]].map(ix => ({ p: ix.map(k => h.v[k]), f: C.a, s: C.c })))(HX(1)),
    (h => [[0, 1, 2], [2, 3, 4], [4, 5, 0]].map(ix => ({ p: [h.c, ...ix.map(k => h.v[k])], f: C.b, s: C.d })))(HX(2)),
  ];

  Object.assign(DIAG, {
    'm4-10:0': {
      alt: '선분으로만 둘러싸인 오각형, 육각형, 팔각형은 다각형이고, 굽은 선이 있는 원과 열려 있는 도형은 다각형이 아닌 것을 나눈 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${P0.map((p, i) => `<path class="sh${i}" d="${D(p.pts)}" pathLength="1" stroke-dasharray="1 1" fill="${C.b}" fill-opacity="0" stroke="${C.d}" stroke-width="4" stroke-linejoin="round"/>
          ${T(80 + i * 160, 196, p.t, { cls: 'nm' + i, fs: 22, fw: 800, fill: C.d })}`).join('')}
        <line x1="20" y1="214" x2="460" y2="214" stroke="#e5e5ea" stroke-width="2"/>
        <g class="no">
          <circle cx="70" cy="258" r="32" fill="none" stroke="${C.sub}" stroke-width="4"/>
          ${OX(118, 236, false)}${T(140, 266, '굽은 선', { a: 'start', fill: RED, fs: 20, fw: 800 })}
          <path d="M${open.map(p => p.join(' ')).join(' L')}" fill="none" stroke="${C.sub}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
          ${OX(348, 236, false)}${T(370, 266, '열려 있음', { a: 'start', fill: RED, fs: 20, fw: 800 })}
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          P0.forEach((p, i) => {
            const st = 200 + i * 1100, f = dgP(e, st, 900);
            q('.sh' + i).setAttribute('stroke-dashoffset', 1 - f);
            q('.sh' + i).setAttribute('fill-opacity', f >= 1 ? .45 : 0);
            op(el, '.nm' + i, f >= 1 ? 1 : 0);
          });
          op(el, '.no', e > 3900 ? 1 : 0);
        });
      }
    },

    'm4-10:1': {
      alt: '정사각형은 변의 길이와 각의 크기가 모두 같아 정다각형이지만, 마름모는 각의 크기가, 직사각형은 변의 길이가 다를 수 있어 정다각형이 아닌 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${S1.map((s, i) => { const p = s.pts; return `<g>
          <path d="${D(p)}" fill="${i ? '#f5f5f7' : C.b}" fill-opacity="${i ? 1 : .45}" stroke="${i ? C.sub : C.d}" stroke-width="3.5" stroke-linejoin="round"/>
          <g class="tk">${p.map((a, k) => tick(a, p[(k + 1) % 4], s.t[k])).join('')}</g>
          <g class="an">${s.ang === 'sq' ? p.map((v, k) => sqMark(v, p[(k + 1) % 4], p[(k + 3) % 4])).join('')
            : p.map((v, k) => arcAt(v, p[(k + 1) % 4], p[(k + 3) % 4], 16, k % 2 ? C.c : C.r)).join('')}</g>
          <g class="tk">${T(s.cx - 30, 210, '변', { fs: 20 })}${OX(s.cx + 14, 203, s.side)}</g>
          <g class="an">${T(s.cx - 30, 246, '각', { fs: 20 })}${OX(s.cx + 14, 239, s.angle)}</g>
        </g>`; }).join('')}
        <g class="vd">${T(80, 286, '정다각형', { fs: 22, fw: 800, fill: C.d })}${T(240, 286, '아니에요', { fs: 20, fill: C.sub })}${T(400, 286, '아니에요', { fs: 20, fill: C.sub })}</g>
        ${T(80, 182, '정사각형', { fs: 18, fill: C.d })}${T(240, 182, '마름모', { fs: 18, fill: C.sub })}${T(400, 182, '직사각형', { fs: 18, fill: C.sub })}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          op(el, '.tk', e > 900 ? 1 : 0);
          op(el, '.an', e > 2300 ? 1 : 0);
          op(el, '.vd', e > 3800 ? 1 : 0);
        });
      }
    },

    'm4-10:2': {
      alt: '사각형에는 대각선 2개, 오각형에는 5개, 육각형에는 9개를 차례로 긋는 그림. 한 꼭짓점에서 긋는 대각선은 주황색',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${P2.map((p, i) => `<g>
          <path d="${D(p.pts)}" fill="#f5f5f7" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
          ${p.dg.map(([a, b], k) => `<line class="d${i}_${k}" x1="${p.pts[a][0]}" y1="${p.pts[a][1]}" x2="${p.pts[b][0]}" y2="${p.pts[b][1]}" stroke="${a === 0 ? C.c : C.d}" stroke-width="3" stroke-linecap="round"/>`).join('')}
          ${p.pts.map(v => `<circle cx="${v[0]}" cy="${v[1]}" r="4" fill="${C.ink}"/>`).join('')}
          ${T(80 + i * 160, 220, p.t, { fs: 20, fw: 700, fill: C.sub })}
          ${T(80 + i * 160, 262, '0개', { cls: 'n' + i, fs: 26, fw: 800, fill: C.d })}
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7400, e => {
          P2.forEach((p, i) => {
            const st = 300 + i * 2200, step = 1800 / p.dg.length;
            let cnt = 0;
            p.dg.forEach((d, k) => {
              const f = dgEase(dgP(e, st + k * step, step * .8)), ln = q(`.d${i}_${k}`);
              const [a, b] = d;
              ln.setAttribute('x2', p.pts[a][0] + (p.pts[b][0] - p.pts[a][0]) * f);
              ln.setAttribute('y2', p.pts[a][1] + (p.pts[b][1] - p.pts[a][1]) * f);
              ln.setAttribute('opacity', f > 0 ? 1 : 0);
              if (f >= 1) cnt++;
            });
            q('.n' + i).textContent = cnt + '개';
            q('.n' + i).setAttribute('opacity', e > st ? 1 : 0);
          });
        });
      }
    },

    'm4-10:3': {
      alt: '직사각형은 두 대각선의 길이가 같고, 마름모는 두 대각선이 수직으로 만나며, 정사각형은 길이가 같고 수직으로 만나는 그림. 세 도형 모두 대각선이 서로를 반으로 나눠요',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${S3.map((s, i) => { const p = s.pts, c = s.c; return `<g>
          <path d="${D(p)}" fill="#f5f5f7" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <line class="dl" data-x="${p[0][0]}" data-y="${p[0][1]}" data-x2="${p[2][0]}" data-y2="${p[2][1]}" stroke="${C.d}" stroke-width="4" stroke-linecap="round"/>
          <line class="dl" data-x="${p[1][0]}" data-y="${p[1][1]}" data-x2="${p[3][0]}" data-y2="${p[3][1]}" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>
          <g class="tk">${p.map((v, k) => tick(v, c, s.tk[k], k % 2 ? C.c : C.d)).join('')}</g>
          ${s.perp ? `<g class="pp">${sqMark(c, p[0], p[1], 12)}</g>` : ''}
          ${T(80 + i * 160 + (i === 0 ? 0 : i === 1 ? 0 : 0), 212, s.lab, { cls: 'lb', fs: i === 2 ? 18 : 20, fw: 800, fill: C.ink })}
        </g>`; }).join('')}
        ${T(240, 268, '모두 서로를 반으로 나눠요', { cls: 'tk', fs: 20, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5400, e => {
          const f = dgEase(dgP(e, 300, 1200));
          qa('.dl').forEach(l => {
            const x = +l.dataset.x, y = +l.dataset.y;
            l.setAttribute('x1', x); l.setAttribute('y1', y);
            l.setAttribute('x2', x + (l.dataset.x2 - x) * f); l.setAttribute('y2', y + (l.dataset.y2 - y) * f);
          });
          op(el, '.tk', e > 1900 ? 1 : 0);
          op(el, '.pp', e > 3000 ? 1 : 0);
          op(el, '.lb', e > 3900 ? 1 : 0);
        });
      }
    },

    'm4-10:4': {
      alt: '정육각형 하나를 정삼각형 6개, 사다리꼴 2개, 마름모 3개로 각각 빈틈없이 채운 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${[0, 1, 2].map(i => `<path d="${D(HX(i).v)}" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-dasharray="6 6"/>`).join('')}
        ${pieces.map((ps, i) => ps.map((pc, k) => `<path class="pc pc${i}_${k}" d="${D(pc.p)}" fill="${pc.f}" stroke="${pc.s}" stroke-width="3" stroke-linejoin="round"/>`).join('')).join('')}
        ${['정삼각형 6개', '사다리꼴 2개', '마름모 3개'].map((t, i) => T(80 + i * 160, 228, t, { cls: 'lb' + i, fs: 20, fw: 800, fill: [C.r, C.c, C.d][i] })).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          let t = 300;
          pieces.forEach((ps, i) => {
            const step = 1500 / ps.length;
            ps.forEach((pc, k) => {
              const f = dgEase(dgP(e, t + k * step, step * .9));
              const n = q(`.pc${i}_${k}`);
              n.setAttribute('transform', `translate(0,${-30 * (1 - f)})`);
              n.setAttribute('opacity', f > 0 ? 1 : 0);
            });
            op(el, '.lb' + i, e > t + 1500 ? 1 : 0);
            t += 2000;
          });
        });
      }
    },
  });
})();
