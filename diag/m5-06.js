/* 6학년 수학 · 두 수를 나눗셈으로 비교해 볼까? (m5-06) */
(() => {
  const C = DG_C, RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const F = (x, y, n, d, o = {}) => {
    const fs = o.fs || 22, col = o.fill || C.ink, w = Math.max(String(n).length, String(d).length) * fs * .62 + 8;
    return `<g${o.cls ? ` class="${o.cls}"` : ''}>${T(x, y - 7, n, { fs, fw: 800, fill: col })}<line x1="${x - w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>${T(x, y + fs + 1, d, { fs, fw: 800, fill: col })}</g>`;
  };
  const person = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/><path d="M${x - 14} ${y + 32} q0 -18 14 -18 q14 0 14 18 z" fill="${C.a}" stroke="${C.c}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const scissors = (x, y) => `<g fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round"><line x1="${x - 6}" y1="${y + 14}" x2="${x + 9}" y2="${y - 16}"/><line x1="${x + 6}" y1="${y + 14}" x2="${x - 9}" y2="${y - 16}"/><circle cx="${x - 8}" cy="${y + 21}" r="6.5" fill="${C.b}"/><circle cx="${x + 8}" cy="${y + 21}" r="6.5" fill="${C.b}"/></g>`;

  const TB = [[1, '4명', '2개', '2', '2배'], [2, '8명', '4개', '4', '2배'], [3, '12명', '6개', '6', '2배']];
  const TX = [52, 130, 205, 305, 410];

  Object.assign(DIAG, {
    'm5-06:0': {
      alt: '모둠마다 학생 4명과 가위 2개가 있을 때 모둠이 1, 2, 3개로 늘면 사람 수와 가위 수의 차이는 2, 4, 6으로 변하지만, 사람 수는 언제나 가위 수의 2배여서 4 : 2로 나타내는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="pic">${[0, 1, 2, 3].map(i => person(40 + i * 36, 34)).join('')}${scissors(196, 50)}${scissors(232, 50)}
          ${T(310, 74, '4 : 2', { cls: 'ratio', fs: 30, fw: 800 })}</g>
        ${['모둠', '사람', '가위', '차이', '몇 배'].map((h, i) => T(TX[i], 116, h, { fs: 18, fw: 700, fill: i === 3 ? C.c : i === 4 ? C.d : C.sub })).join('')}
        <line x1="20" y1="128" x2="460" y2="128" stroke="#d2d2d7" stroke-width="2"/>
        <rect class="hc" x="${TX[3] - 34}" y="134" width="68" height="128" rx="10" fill="${C.a}" fill-opacity=".5"/>
        <rect class="hb" x="${TX[4] - 40}" y="134" width="80" height="128" rx="10" fill="${C.b}" fill-opacity=".6"/>
        ${TB.map((r, k) => `<g class="row row${k}">${r.map((v, i) => T(TX[i], 164 + k * 40, v, { fs: 22, fw: i >= 3 ? 800 : 700, fill: i === 3 ? C.c : i === 4 ? C.d : C.ink })).join('')}</g>`).join('')}
        ${T(240, 292, '차이는 변해도 몇 배인지는 같아요', { cls: 'ft', fs: 20, fw: 800 })}
      </svg>`,
      play(el) {
        dgAnim(el, 5600, e => {
          op(el, '.pic', e > 100 ? 1 : 0);
          op(el, '.ratio', e > 4600 ? 1 : 0);
          TB.forEach((r, k) => op(el, '.row' + k, e > 700 + k * 800 ? 1 : 0));
          op(el, '.hc', e > 3200 ? 1 : 0);
          op(el, '.hb', e > 3700 ? 1 : 0);
          op(el, '.ft', e > 4200 ? 1 : 0);
        });
      }
    },

    'm5-06:1': {
      alt: '비 3 : 5에서 기호 : 의 왼쪽 3은 비교하는 양, 오른쪽 5는 기준량이고, 3 대 5 또는 5에 대한 3의 비라고 읽는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${T(170, 120, '3', { fs: 72, fw: 800, fill: C.c })}${T(240, 114, ':', { fs: 64, fw: 800 })}${T(310, 120, '5', { fs: 72, fw: 800, fill: C.d })}
        <g class="l1"><path d="M160 140 Q140 168 128 186" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/><path d="M122 176 l6 10 l10 -5" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(120, 214, '비교하는 양', { fs: 22, fw: 800, fill: C.c })}</g>
        <g class="l2"><path d="M320 140 Q340 168 352 186" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/><path d="M342 181 l10 5 l6 -10" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(360, 214, '기준량', { fs: 22, fw: 800, fill: C.d })}</g>
        ${T(240, 264, '3 대 5 · 5에 대한 3의 비', { cls: 'rd', fs: 20, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        dgAnim(el, 4200, e => {
          op(el, '.l1', e > 900 ? 1 : 0);
          op(el, '.l2', e > 1900 ? 1 : 0);
          op(el, '.rd', e > 3000 ? 1 : 0);
        });
      }
    },

    'm5-06:2': {
      alt: '5칸 중 3칸을 색칠한 막대로 비율 3/5 = 0.6을 나타내고, 기준량을 100으로 하면 모눈 100칸 중 60칸이라 백분율 60%인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${T(120, 50, '3 : 5', { fs: 26, fw: 800 })}
        ${[0, 1, 2, 3, 4].map(i => `<rect class="${i < 3 ? 'bp bp' + i : ''}" x="${30 + i * 36}" y="72" width="36" height="44" fill="${i < 3 ? C.a : '#fff'}" stroke="${C.c}" stroke-width="2"/>`).join('')}
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${30 + i * 36}" y="72" width="36" height="44" fill="none" stroke="${C.ink}" stroke-width="${2}"/>`).join('')}
        <g class="fr">${F(84, 166, 3, 5, { fill: C.c, fs: 24 })}${T(112, 175, '= 0.6', { a: 'start', fs: 24, fw: 800 })}</g>
        <path class="ar" d="M224 140 h28 m-8 -8 l8 8 l-8 8" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${Array.from({ length: 100 }, (_, k) => `<rect class="g" x="${282 + (k % 10) * 17}" y="${48 + Math.floor(k / 10) * 17}" width="17" height="17" fill="#fff" stroke="#c7c7cc" stroke-width="1"/>`).join('')}
        <rect x="282" y="48" width="170" height="170" fill="none" stroke="${C.sub}" stroke-width="2.5"/>
        ${T(367, 252, '60%', { cls: 'pc', fs: 28, fw: 800, fill: C.d })}
        ${T(130, 252, '0.6 × 100 = 60', { cls: 'pc', fs: 20, fw: 800 })}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          [0, 1, 2].forEach(i => op(el, '.bp' + i, e > 300 + i * 400 ? 1 : 0));
          op(el, '.fr', e > 1700 ? 1 : 0);
          op(el, '.ar', e > 2400 ? 1 : 0);
          const n = Math.round(60 * dgP(e, 2700, 2000));
          qa('.g').forEach((r, k) => r.setAttribute('fill', (k % 10) < 6 && Math.floor(k / 10) * 6 + (k % 10) < n ? C.b : '#fff'));
          op(el, '.pc', e > 4900 ? 1 : 0);
        });
      }
    },

    'm5-06:3': {
      alt: '슛 성공률은 20번 중 7번이 35%, 10번 중 4번이 40%라서 두 번째가 더 높고, 20000원짜리 물건을 25% 할인하면 할인 금액 5000원을 빼서 15000원인 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${T(16, 30, '슛 성공률', { a: 'start', fs: 18, fw: 700, fill: C.sub })}
        ${[['7 ÷ 20', .35, '35%', C.d], ['4 ÷ 10', .4, '40%', C.c]].map(([l, v, p, c], i) => `
          ${T(110, 70 + i * 44, l, { a: 'end', fs: 20, fw: 700 })}
          <rect x="122" y="${51 + i * 44}" width="270" height="26" rx="6" fill="#f5f5f7"/>
          <rect class="sb" data-w="${270 * v}" x="122" y="${51 + i * 44}" width="${270 * v}" height="26" rx="6" fill="${c}"/>
          ${T(470, 71 + i * 44, p, { cls: 'sp', a: 'end', fs: 22, fw: 800, fill: c })}`).join('')}
        ${T(122 + 270 * .4 + 12, 116, '더 높아요', { cls: 'sp', a: 'start', fs: 18, fw: 800, fill: C.c })}
        <line x1="16" y1="150" x2="464" y2="150" stroke="#e5e5ea" stroke-width="2"/>
        ${T(16, 182, '20000원의 25% 할인', { a: 'start', fs: 18, fw: 700, fill: C.sub })}
        ${[0, 1, 2].map(i => `<rect x="${40 + i * 100}" y="198" width="100" height="44" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>`).join('')}
        <rect x="40" y="198" width="400" height="44" fill="none" stroke="#c7c7cc" stroke-width="2" stroke-dasharray="6 5"/>
        <g class="cut"><rect x="340" y="198" width="100" height="44" fill="#ffe0de" stroke="${RED}" stroke-width="2.5"/>
          ${T(390, 227, '5000원', { fs: 18, fw: 800, fill: RED })}</g>
        <g class="res"><path d="M40 252 v10 H340 v-10" fill="none" stroke="${C.c}" stroke-width="2.5"/>
          ${T(190, 290, '20000 − 5000 = 15000원', { fs: 20, fw: 800, fill: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          const f = dgEase(dgP(e, 200, 1200));
          qa('.sb').forEach(b => b.setAttribute('width', b.dataset.w * f));
          op(el, '.sp', f >= 1 ? 1 : 0);
          op(el, '.cut', e > 2400 ? 1 : 0);
          const m = dgEase(dgP(e, 3500, 1000));
          q('.cut').setAttribute('transform', `translate(${0},${-6 * Math.sin(Math.PI * m) + 22 * m})`);
          op(el, '.res', e > 4700 ? 1 : 0);
        });
      }
    },
  });
})();
