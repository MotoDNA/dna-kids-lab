/* 6학년 수학 · 상자 안의 공간은 얼마나 클까? (m5-02) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const f1 = v => +v.toFixed(1);
  const PL = ps => 'M' + ps.map(p => p.map(f1).join(' ')).join(' L') + ' Z';
  /* 쌓기나무 그리기: (i 가로, j 안쪽, k 높이) */
  const BLUE = { f: C.b, t: '#e3f0ff', r: '#9ccaff', s: C.d };
  const cubes = (X0, Y0, s, W, D, H, cls = k => '', col = BLUE, sw = 2) => {
    const vx = s * .5, vy = -s * .4, P = (i, j, k) => [X0 + i * s + j * vx, Y0 - k * s + j * vy];
    let out = '';
    for (let j = D - 1; j >= 0; j--) for (let k = 0; k < H; k++) for (let i = 0; i < W; i++) {
      const a = P(i, j, k), b = P(i + 1, j, k), c = P(i + 1, j, k + 1), d = P(i, j, k + 1);
      const b2 = P(i + 1, j + 1, k), c2 = P(i + 1, j + 1, k + 1), d2 = P(i, j + 1, k + 1);
      out += `<g class="${cls(i, j, k)}"><path d="${PL([a, b, c, d])}" fill="${col.f}"/><path d="${PL([d, c, c2, d2])}" fill="${col.t}"/><path d="${PL([b, b2, c2, c])}" fill="${col.r}"/>`
        + `<path d="${PL([a, b, c, d])} M${f1(d[0])} ${f1(d[1])} L${f1(d2[0])} ${f1(d2[1])} L${f1(c2[0])} ${f1(c2[1])} L${f1(b2[0])} ${f1(b2[1])} L${f1(b[0])} ${f1(b[1])} M${f1(c[0])} ${f1(c[1])} L${f1(c2[0])} ${f1(c2[1])}" fill="none" stroke="${col.s}" stroke-width="${sw}" stroke-linejoin="round"/></g>`;
    }
    return out;
  };
  /* 속이 찬 상자(면 3개) */
  const solid = (X0, Y0, w, d, h, ux, uy, col, stroke, sw = 2.5) => {
    const P = (x, y, z) => [X0 + x + y * ux, Y0 - z + y * uy];
    const A = P(0, 0, 0), B = P(w, 0, 0), Cc = P(w, 0, h), D = P(0, 0, h), b = P(w, d, 0), c = P(w, d, h), dd = P(0, d, h);
    return `<path d="${PL([A, B, Cc, D])}" fill="${col.f}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/><path d="${PL([D, Cc, c, dd])}" fill="${col.t}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/><path d="${PL([B, b, c, Cc])}" fill="${col.r}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  };
  const ORG = { f: C.a, t: '#ffe9cc', r: '#ffc98a' };

  /* 0: 3×2×2 = 12개 (쌓는 순서) */
  const ORD0 = [];
  for (let k = 0; k < 2; k++) for (let j = 1; j >= 0; j--) for (let i = 0; i < 3; i++) ORD0.push(`${i}_${j}_${k}`);

  Object.assign(DIAG, {
    'm5-02:0': {
      alt: '한 모서리가 1cm인 쌓기나무 하나의 부피는 1cm³이고, 이 쌓기나무 12개로 쌓은 직육면체의 부피는 12cm³인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${cubes(40, 190, 64, 1, 1, 1)}
        ${T(72, 222, '1cm', { fs: 20, fw: 800, fill: C.d })}
        ${T(142, 140, '1cm', { a: 'start', fs: 20, fw: 800, fill: C.d })}
        ${T(84, 268, '1cm³', { fs: 26, fw: 800 })}
        <line x1="190" y1="40" x2="190" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        ${cubes(236, 214, 46, 3, 2, 2, (i, j, k) => `q q${i}_${j}_${k}`)}
        ${T(340, 268, '0개', { cls: 'cnt', fs: 24, fw: 800, fill: C.d })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          let n = 0;
          ORD0.forEach((id, m) => { const on = e > 600 + m * 300; if (on) n++; q('.q' + id).setAttribute('opacity', on ? 1 : 0); });
          q('.cnt').textContent = n === 12 && e > 4600 ? '12개 → 부피 12cm³' : n + '개';
        });
      }
    },

    'm5-02:1': {
      alt: '가로 5cm, 세로 4cm, 높이 3cm인 직육면체: 바닥 한 층에 쌓기나무 5 × 4 = 20개가 깔리고, 이런 층이 3층이라 20 × 3 = 60개, 부피는 60cm³인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${cubes(60, 236, 30, 5, 4, 3, (i, j, k) => `c k${k} c${k}_${j}_${i}`)}
        ${T(135, 266, '가로 5cm', { fs: 18, fw: 800, fill: C.sub })}
        ${T(245, 222, '세로 4cm', { a: 'start', fs: 18, fw: 800, fill: C.sub })}
        ${T(52, 170, '높이', { cls: 'hl', a: 'end', fs: 18, fw: 800, fill: C.sub })}
        ${T(52, 194, '3cm', { cls: 'hl', a: 'end', fs: 18, fw: 800, fill: C.sub })}
        ${T(470, 120, '한 층: 5 × 4 = 20개', { cls: 's1', a: 'end', fs: 20, fw: 800, fill: C.d })}
        ${T(470, 160, '3층: 20 × 3 = 60개', { cls: 's2', a: 'end', fs: 20, fw: 800, fill: C.c })}
        ${T(240, 294, '부피 = 5 × 4 × 3 = 60cm³', { cls: 's3', fs: 24, fw: 800 })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6800, e => {
          for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) {
            const m = (3 - j) * 5 + i;
            q(`.c0_${j}_${i}`).setAttribute('opacity', e > 300 + m * 80 ? 1 : 0);
          }
          [1, 2].forEach(k => {
            const f = dgEase(dgP(e, 2600 + (k - 1) * 1100, 800));
            el.querySelectorAll('.k' + k).forEach(g => { g.setAttribute('opacity', f > 0 ? 1 : 0); g.setAttribute('transform', `translate(0,${-40 * (1 - f)})`); });
          });
          op(el, '.hl', e > 4500 ? 1 : 0);
          op(el, '.s1', e > 2000 ? 1 : 0);
          op(el, '.s2', e > 4600 ? 1 : 0);
          op(el, '.s3', e > 5600 ? 1 : 0);
        });
      }
    },

    'm5-02:2': {
      alt: '한 모서리가 6cm인 정육면체는 한 층에 6 × 6 = 36개, 6층이라 쌓기나무 216개로 부피가 6 × 6 × 6 = 216cm³인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${cubes(68, 244, 23, 6, 6, 6, (i, j, k) => `k${k}`, BLUE, 1.2)}
        ${T(137, 274, '6cm', { fs: 20, fw: 800, fill: C.d })}
        ${T(60, 180, '6cm', { a: 'end', fs: 20, fw: 800, fill: C.d })}
        ${T(284, 222, '6cm', { a: 'start', fs: 20, fw: 800, fill: C.d })}
        ${T(470, 110, '한 층 36개', { cls: 's1', a: 'end', fs: 20, fw: 800, fill: C.d })}
        ${T(470, 150, '6층 → 216개', { cls: 's2', a: 'end', fs: 20, fw: 800, fill: C.c })}
        ${T(470, 196, '6 × 6 × 6', { cls: 's3', a: 'end', fs: 24, fw: 800 })}
        ${T(470, 232, '= 216cm³', { cls: 's3', a: 'end', fs: 24, fw: 800, fill: C.c })}
      </svg>`,
      play(el) {
        dgAnim(el, 6000, e => {
          for (let k = 0; k < 6; k++) {
            const f = dgEase(dgP(e, 300 + k * 600, 450));
            el.querySelectorAll('.k' + k).forEach(g => { g.setAttribute('opacity', f > 0 ? 1 : 0); g.setAttribute('transform', `translate(0,${-30 * (1 - f)})`); });
          }
          op(el, '.s1', e > 800 ? 1 : 0);
          op(el, '.s2', e > 3900 ? 1 : 0);
          op(el, '.s3', e > 4800 ? 1 : 0);
        });
      }
    },

    'm5-02:3': {
      alt: '한 모서리가 1m(100cm)인 정육면체를 1cm³ 쌓기나무로 채우면 가로 100개, 세로 100개, 높이 100개로 100 × 100 × 100 = 1000000개가 들어가 1m³ = 1000000cm³인 것을 상상한 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${solid(40, 250, 150, 150, 150, .4, -.32, { f: '#f2f8ff', t: '#e8f2ff', r: '#dbeaff' }, C.d, 3)}
        <g class="fill"></g>
        ${T(115, 280, '1m', { fs: 22, fw: 800, fill: C.d })}
        ${T(30, 182, '1m', { a: 'end', fs: 22, fw: 800, fill: C.d })}
        ${T(234, 238, '1m', { a: 'start', fs: 22, fw: 800, fill: C.d })}
        ${T(470, 64, '1m = 100cm', { a: 'end', fs: 20, fw: 800, fill: C.d })}
        ${T(470, 110, '가로 100개', { cls: 'p1', a: 'end', fs: 20, fw: 700, fill: C.c })}
        ${T(470, 140, '× 세로 100개', { cls: 'p2', a: 'end', fs: 20, fw: 700, fill: C.c })}
        ${T(470, 170, '× 높이 100개', { cls: 'p3', a: 'end', fs: 20, fw: 700, fill: C.c })}
        ${T(470, 214, '1m³ = 1000000cm³', { cls: 'p4', a: 'end', fs: 22, fw: 800 })}
        ${T(470, 268, '2 × 1 × 3 = 6m³', { cls: 'p5', a: 'end', fs: 20, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        const g = el.querySelector('.fill'), u = 12;
        dgAnim(el, 7000, e => {
          const a = dgEase(dgP(e, 900, 1100)), b = dgEase(dgP(e, 2400, 1100)), c = dgEase(dgP(e, 3900, 1100));
          const w = u + (150 - u) * a, d = u + (150 - u) * b, h = u + (150 - u) * c;
          g.innerHTML = e > 300 ? solid(40, 250, w, d, h, .4, -.32, ORG, C.c, 2) : '';
          op(el, '.p1', e > 1600 ? 1 : 0); op(el, '.p2', e > 3100 ? 1 : 0); op(el, '.p3', e > 4600 ? 1 : 0);
          op(el, '.p4', e > 5400 ? 1 : 0); op(el, '.p5', e > 6200 ? 1 : 0);
        });
      }
    },
  });
})();
