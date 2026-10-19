/* 5학년 수학 · 분모가 다른 분수는 어떻게 더할까? (m5-04) */
(() => {
  const C = DG_C, RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  /* 세로 분수: (x, y)=가로줄 가운데 */
  const F = (x, y, n, d, o = {}) => {
    const fs = o.fs || 22, col = o.fill || C.ink, w = Math.max(String(n).length, String(d).length) * fs * .62 + 8;
    return `<g${o.cls ? ` class="${o.cls}"` : ''}>${T(x, y - 7, n, { fs, fw: 800, fill: col })}<line x1="${x - w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>${T(x, y + fs + 1, d, { fs, fw: 800, fill: col })}</g>`;
  };
  /* 막대: x, y, 너비, 높이, 칸 수, 색칠 칸 수 */
  const bar = (x, y, w, h, n, k, col, cls = '') => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
    for (let i = 0; i < n; i++) s += `<rect class="${cls ? cls + ' ' + cls + i : ''}" x="${x + i * w / n}" y="${y}" width="${w / n}" height="${h}" fill="${i < k ? col.f : '#fff'}" stroke="${col.s}" stroke-width="2"/>`;
    return s + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
  };
  const OR = { f: C.a, s: C.c }, BL = { f: C.b, s: C.d };

  Object.assign(DIAG, {
    'm5-04:0': {
      alt: '같은 크기의 막대를 2칸, 4칸, 6칸으로 나누어 1칸, 2칸, 3칸을 색칠하면 색칠한 길이가 모두 같아서 1/2 = 2/4 = 3/6인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[[2, 1], [4, 2], [6, 3]].map(([d, n], i) => `<g class="b b${i}">${bar(140, 40 + i * 66, 310, 42, d, n, OR)}${F(92, 61 + i * 66, n, d, { fill: C.c })}</g>`).join('')}
        <line class="dl" x1="295" y1="28" x2="295" y2="196" stroke="${C.d}" stroke-width="3" stroke-dasharray="7 6"/>
        <g class="eq">${F(160, 252, 1, 2)}${T(205, 267, '=', { fs: 26, fw: 800 })}${F(250, 252, 2, 4)}${T(295, 267, '=', { fs: 26, fw: 800 })}${F(340, 252, 3, 6)}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          [0, 1, 2].forEach(i => op(el, '.b' + i, e > 200 + i * 1000 ? 1 : 0));
          op(el, '.dl', e > 3200 ? 1 : 0);
          op(el, '.eq', e > 4000 ? 1 : 0);
        });
      }
    },

    'm5-04:1': {
      alt: '1/2 막대와 1/3 막대를 각각 6칸으로 다시 나누면 1/2은 3/6, 1/3은 2/6이 되어 두 분수의 분모가 6으로 같아지는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${bar(100, 50, 300, 46, 2, 1, OR)}
        ${bar(100, 150, 300, 46, 3, 1, BL)}
        ${F(52, 72, 1, 2, { fill: C.c, fs: 24 })}${F(52, 172, 1, 3, { fill: C.d, fs: 24 })}
        <g class="cut">${[1, 2, 3, 4, 5].map(i => `<line x1="${100 + i * 50}" y1="50" x2="${100 + i * 50}" y2="96" stroke="${C.c}" stroke-width="2.5" stroke-dasharray="5 4"/><line x1="${100 + i * 50}" y1="150" x2="${100 + i * 50}" y2="196" stroke="${C.d}" stroke-width="2.5" stroke-dasharray="5 4"/>`).join('')}</g>
        <g class="nf">${F(440, 72, 3, 6, { fill: C.c, fs: 24 })}${F(440, 172, 2, 6, { fill: C.d, fs: 24 })}</g>
        ${T(240, 256, '공통분모 6 (2와 3의 최소공배수)', { cls: 'nf', fs: 20, fw: 800 })}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 4600, e => {
          qa('.cut line').forEach((l, i) => l.setAttribute('opacity', e > 1000 + Math.floor(i / 2) * 250 ? 1 : 0));
          op(el, '.nf', e > 2800 ? 1 : 0);
        });
      }
    },

    'm5-04:2': {
      alt: '1/2 + 1/3은 통분해서 3/6 + 2/6 조각을 이어 붙이면 5/6, 3/4 − 1/6은 9/12에서 2/12를 떼어 내면 7/12인 것을 막대로 나타낸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g>${F(140, 44, 3, 6, { fill: C.c })}${T(180, 59, '+', { fs: 24, fw: 800 })}${F(220, 44, 2, 6, { fill: C.d })}${T(260, 59, '=', { fs: 24, fw: 800 })}${F(300, 44, 5, 6, { cls: 'r1' })}</g>
        ${bar(60, 92, 360, 40, 6, 0, OR)}
        ${[0, 1, 2].map(i => `<rect x="${60 + i * 60}" y="92" width="60" height="40" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>`).join('')}
        <g class="mv">${[3, 4].map(i => `<rect x="${60 + i * 60}" y="92" width="60" height="40" fill="${C.b}" stroke="${C.d}" stroke-width="2"/>`).join('')}</g>
        <rect x="60" y="92" width="360" height="40" fill="none" stroke="${C.ink}" stroke-width="3"/>
        <g>${F(140, 194, 9, 12, { fill: C.c })}${T(180, 209, '−', { fs: 24, fw: 800 })}${F(220, 194, 2, 12, { fill: RED })}${T(260, 209, '=', { fs: 24, fw: 800 })}${F(300, 194, 7, 12, { cls: 'r2' })}</g>
        ${bar(60, 242, 360, 40, 12, 7, OR)}
        <g class="rm">${[7, 8].map(i => `<rect x="${60 + i * 30}" y="242" width="30" height="40" fill="${C.a}" stroke="${RED}" stroke-width="2.5"/>`).join('')}</g>
        <rect x="60" y="242" width="360" height="40" fill="none" stroke="${C.ink}" stroke-width="3"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          const a = dgEase(dgP(e, 500, 1300));
          q('.mv').setAttribute('transform', `translate(${120 * (1 - a)},${-0})`);
          q('.mv').setAttribute('opacity', e > 300 ? 1 : 0);
          op(el, '.r1', e > 2000 ? 1 : 0);
          const b = dgEase(dgP(e, 3300, 1200));
          q('.rm').setAttribute('transform', `translate(0,${40 * b})`);
          q('.rm').setAttribute('opacity', 1 - b);
          op(el, '.r2', e > 4700 ? 1 : 0);
        });
      }
    },

    'm5-04:3': {
      alt: '2와 1/3 + 1과 3/4을 자연수 칸과 분수 칸으로 나누어 계산하는 그림: 통분하면 4/12와 9/12, 자연수끼리 3, 분수끼리 13/12 = 1과 1/12, 1을 자연수로 올려 답은 4와 1/12',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="100" y="20" width="110" height="250" rx="12" fill="#f5f5f7"/>
        <rect x="230" y="20" width="130" height="250" rx="12" fill="${C.b}" fill-opacity=".35"/>
        ${T(155, 46, '자연수', { fs: 18, fw: 700, fill: C.sub })}${T(295, 46, '분수', { fs: 18, fw: 700, fill: C.sub })}
        ${T(155, 98, '2', { fs: 30, fw: 800 })}${T(70, 156, '+', { fs: 28, fw: 800 })}${T(155, 156, '1', { fs: 30, fw: 800 })}
        ${F(295, 88, 1, 3, { cls: 'o1' })}${F(295, 146, 3, 4, { cls: 'o1' })}
        ${F(295, 88, 4, 12, { cls: 'o2', fill: C.d })}${F(295, 146, 9, 12, { cls: 'o2', fill: C.d })}
        <line x1="60" y1="186" x2="370" y2="186" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
        ${T(155, 238, '3', { cls: 's1', fs: 30, fw: 800 })}${T(155, 238, '4', { cls: 's2', fs: 30, fw: 800, fill: C.c })}
        ${F(295, 228, 13, 12, { cls: 's1', fill: C.d })}${F(295, 228, 1, 12, { cls: 's2', fill: C.d })}
        <g class="cy">${T(0, 0, '+1', { fs: 22, fw: 800, fill: C.c })}</g>
        ${['통분', '따로 더하기', '1 올리기'].map((t, i) => T(470, 98 + i * 48, t, { cls: 'n n' + i, a: 'end', fs: 18, fw: 700, fill: i === 2 ? C.c : C.sub })).join('')}
        <g class="ans">${T(410, 256, '4', { fs: 30, fw: 800, fill: C.c })}${F(442, 245, 1, 12, { fill: C.c, fs: 20 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          const sw = e > 1500;
          op(el, '.o1', sw ? 0 : 1); op(el, '.o2', sw ? 1 : 0); op(el, '.n0', sw ? 1 : 0);
          op(el, '.s1', e > 2900 && e <= 5200 ? 1 : 0); op(el, '.n1', e > 2900 ? 1 : 0);
          const m = dgEase(dgP(e, 4300, 900));
          q('.cy').setAttribute('transform', `translate(${340 - 150 * m},${226 - 12 * m})`);
          op(el, '.cy', e > 4100 && e <= 5200 ? 1 : 0); op(el, '.n2', e > 4100 ? 1 : 0);
          op(el, '.s2', e > 5200 ? 1 : 0);
          op(el, '.ans', e > 6100 ? 1 : 0);
        });
      }
    },
  });
})();
