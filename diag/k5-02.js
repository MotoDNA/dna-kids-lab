/* 5학년 국어 · 긴 글을 짧게 정리하는 비법은 무엇일까? (k5-02) */
(() => {
  /* ── 공통 도우미 (이 파일 안에서만) ── */
  const C = DG_C, RED = '#ff3b30', LINE = '#d2d2d7', SOFT = '#f5f5f7', GRNF = '#d6efdc', REDF = '#ffe0de';
  const at = o => (o.t != null ? ` data-t="${o.t}"` : '') + (o.d ? ` data-d="${o.d}"` : '') + (o.o ? ` data-o="${o.o}"` : '') +
    (o.dx ? ` data-dx="${o.dx}"` : '') + (o.dy ? ` data-dy="${o.dy}"` : '') + (o.c ? ` class="${o.c}"` : '') + (o.draw ? ' data-draw="1"' : '');
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}"${o.lang ? ` lang="${o.lang}"` : ''}${at(o)}>${s}</text>`;
  const B = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || '#fff'}" stroke="${o.st || 'none'}" stroke-width="${o.sw || 2.5}"${o.da ? ` stroke-dasharray="${o.da}"` : ''}${at(o)}/>`;
  const G = (o, inner) => `<g${at(o)}>${inner}</g>`;
  const L = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.f || C.sub}" stroke-width="${o.sw || 3}" stroke-linecap="round"${o.da ? ` stroke-dasharray="${o.da}"` : ''}${at(o)}/>`;
  const ARR = (x1, y1, x2, y2, o = {}) => {
    const col = o.f || C.sub, w = o.sw || 3.5, a = Math.atan2(y2 - y1, x2 - x1), h = o.h || 10;
    const p = s => `${(x2 - h * Math.cos(a + s)).toFixed(1)} ${(y2 - h * Math.sin(a + s)).toFixed(1)}`;
    return `<g${at(o)}><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${p(-.55)} L${x2} ${y2} L${p(.55)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  const OK = (x, y, o = {}) => G(o, `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${C.r}"/><path d="M${x - 7} ${y} l5 5 l9 -10" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`);
  const NO = (x, y, o = {}) => G(o, `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${RED}"/><path d="M${x - 6} ${y - 6} l12 12 m0 -12 l-12 12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`);
  /* data-t(시작 ms)·data-d(길이)·data-o(사라지는 시각)·data-dx/dy(미끄러져 들어옴)·data-draw(선 그리기) 를 읽어 차례로 보여 줌 */
  const seq = (total, extra) => function (el) {
    const items = [...el.querySelectorAll('[data-t]')];
    const lens = items.map(n => n.dataset.draw && n.getTotalLength ? n.getTotalLength() : 0);
    dgAnim(el, total, e => {
      items.forEach((n, i) => {
        let p = dgEase(dgP(e, +n.dataset.t, +(n.dataset.d || 500)));
        if (n.dataset.draw) { n.setAttribute('stroke-dasharray', lens[i]); n.setAttribute('stroke-dashoffset', lens[i] * (1 - p)); n.setAttribute('opacity', p > 0 ? 1 : 0); }
        else n.setAttribute('opacity', n.dataset.o ? p * (1 - dgEase(dgP(e, +n.dataset.o, 500))) : p);
        if (n.dataset.dx || n.dataset.dy) n.setAttribute('transform', `translate(${((+n.dataset.dx || 0) * (1 - p)).toFixed(1)},${((+n.dataset.dy || 0) * (1 - p)).toFixed(1)})`);
      });
      if (extra) extra(el, e);
    });
  };
  const TW = (s, f = 20) => [...s].reduce((w, ch) => w + (/[\u3131-\uD7A3]/.test(ch) ? f * .96 : ch === ' ' ? f * .28 : f * .6), 0);
  const svg = (h, inner) => `<svg viewBox="0 0 480 ${h}" class="dg-svg" role="img">${inner}</svg>`;

  /* 0: 글 구조 다섯 가지 — 각 아이콘은 (0,0) 중심, 가로 ±60 세로 ±30 안 */
  const ICON = {
    list: `${[-22, 0, 22].map(y => `<circle cx="-40" cy="${y}" r="5" fill="${C.d}"/><rect x="-28" y="${y - 7}" width="78" height="14" rx="7" fill="${C.b}"/>`).join('')}`,
    order: `${[-44, 0, 44].map((x, i) => `<rect x="${x - 15}" y="-15" width="30" height="30" rx="8" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/><text x="${x}" y="7" text-anchor="middle" font-size="18" font-weight="800" fill="${C.c}">${i + 1}</text>`).join('')}
      <path d="M-27 0 h8 m-4 -4 l4 4 l-4 4 M17 0 h8 m-4 -4 l4 4 l-4 4" fill="none" stroke="${C.c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    venn: `<circle cx="-16" cy="0" r="28" fill="${C.b}" fill-opacity=".7" stroke="${C.d}" stroke-width="3"/><circle cx="16" cy="0" r="28" fill="${C.a}" fill-opacity=".7" stroke="${C.c}" stroke-width="3"/>`,
    cause: `<rect x="-58" y="-18" width="40" height="36" rx="8" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/><rect x="18" y="-18" width="40" height="36" rx="8" fill="${GRNF}" stroke="${C.r}" stroke-width="2.5"/>
      <path d="M-12 0 h22 m-6 -6 l6 6 l-6 6" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    prob: `<circle cx="-38" cy="0" r="22" fill="${REDF}" stroke="${RED}" stroke-width="3"/><text x="-38" y="9" text-anchor="middle" font-size="26" font-weight="800" fill="${RED}">?</text>
      <circle cx="38" cy="0" r="22" fill="${GRNF}" stroke="${C.r}" stroke-width="3"/><text x="38" y="9" text-anchor="middle" font-size="26" font-weight="800" fill="${C.r}">!</text>
      <path d="M-10 0 h20 m-6 -6 l6 6 l-6 6" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  const S5 = [
    { k: 'list', n: '나열', s: '늘어놓기' }, { k: 'order', n: '순서', s: '시간·과정 차례' }, { k: 'venn', n: '비교와 대조', s: '같은 점·다른 점' },
    { k: 'cause', n: '원인과 결과', s: '까닭 → 일어난 일' }, { k: 'prob', n: '문제와 해결', s: '문제 → 해결 방법' },
  ];
  const pos5 = i => i < 3 ? { x: 82 + i * 158, y: 96 } : { x: 161 + (i - 3) * 158, y: 236 };

  /* 1: 구조별로 자주 나오는 말 */
  const SIG = [
    { n: '나열', col: C.d, f: C.b, w: ['첫째', '또한', '그리고'] },
    { n: '순서', col: C.c, f: C.a, w: ['먼저', '다음으로', '마지막으로'] },
    { n: '비교·대조', col: '#af52de', f: '#ecdcf7', w: ['둘 다', '반면에', '이와 달리'] },
    { n: '원인·결과', col: C.r, f: GRNF, w: ['왜냐하면', '그래서', '그 결과'] },
  ];

  /* 4: 종이 재활용 순서 */
  const STEP = [
    ['먼저', '물에 불려 종이 죽 만들기'], ['다음으로', '잉크·이물질 걸러 내기'],
    ['그다음', '얇게 펴서 물기 빼기'], ['마지막으로', '열로 말리면 새 종이'],
  ];

  Object.assign(DIAG, {
    'k5-02:0': {
      alt: '설명하는 글의 구조 다섯 가지: 나열(늘어놓기), 순서(시간·과정 차례), 비교와 대조(같은 점·다른 점), 원인과 결과(까닭과 일어난 일), 문제와 해결(문제와 해결 방법)을 간단한 도형 틀로 나타낸 그림',
      svg: svg(330, S5.map((p, i) => { const c = pos5(i); return G({ t: 200 + i * 800, d: 500, dy: 14 },
        `<g transform="translate(${c.x},${c.y - 20})">${ICON[p.k]}</g>${T(c.x, c.y + 42, p.n, { s: 21, w: 800 })}${T(c.x, c.y + 68, p.s, { s: 18, f: C.sub, w: 600 })}`); }).join('')),
      play: seq(4400)
    },

    'k5-02:1': {
      alt: '구조마다 자주 나오는 말: 나열은 첫째·또한·그리고, 순서는 먼저·다음으로·마지막으로, 비교와 대조는 둘 다·반면에·이와 달리, 원인과 결과는 왜냐하면·그래서·그 결과',
      svg: svg(300, SIG.map((r, i) => {
        const y = 50 + i * 62, t = 200 + i * 1100; let x = 150;
        return G({ t, d: 400, dx: -14 }, `${B(14, y, 120, 46, { f: r.col, rx: 23 })}${T(74, y + 30, r.n, { s: 20, w: 800, f: '#fff' })}`) +
          r.w.map((w, k) => { const ww = TW(w, 20) + 24, s = G({ t: t + 350 + k * 220, d: 350, dy: -10 }, `${B(x, y + 4, ww, 38, { f: r.f, rx: 19 })}${T(x + ww / 2, y + 30, w, { s: 20, w: 700, f: C.ink })}`); x += ww + 10; return s; }).join('');
      }).join('')),
      play: seq(5000)
    },

    'k5-02:2': {
      alt: '갯벌 글을 원인과 결과 틀로 정리한 그림: 갯벌을 메워 땅을 만듦(원인) → 게·조개가 살 곳을 잃음(결과) → 철새도 줄어듦',
      svg: svg(300, [['원인', '갯벌을 메워 땅을 만듦', C.d, C.b], ['결과', '게·조개가 살 곳을 잃음', C.r, GRNF], ['그래서', '철새도 줄어듦', C.r, GRNF]].map(([k, s, col, f], i) => {
        const y = 44 + i * 88, t = 200 + i * 1300;
        return `${G({ t, d: 500, dy: 12 }, `${B(20, y, 96, 56, { f: col, rx: 14 })}${T(68, y + 35, k, { s: 20, w: 800, f: '#fff' })}${B(130, y, 330, 56, { f, rx: 14 })}${T(295, y + 36, s, { s: 22, w: 800 })}`)}
          ${i < 2 ? ARR(295, y + 60, 295, y + 84, { f: C.ink, t: t + 800, d: 400 }) : ''}`;
      }).join('')),
      play: seq(4000)
    },

    'k5-02:3': {
      alt: '요약하는 방법 지우기·묶기·고르기 가운데 묶기: 축구공, 농구공, 배구공, 줄넘기를 더 큰 말인 운동 기구로 묶는 그림',
      svg: svg(300, `
        ${['① 지우기', '② 묶기', '③ 고르기'].map((s, i) => `${B(28 + i * 140, 44, 124, 40, { f: i === 1 ? C.d : SOFT, rx: 20 })}${T(90 + i * 140, 71, s, { s: 20, w: 800, f: i === 1 ? '#fff' : C.sub })}`).join('')}
        ${['축구공', '농구공', '배구공', '줄넘기'].map((s, i) => G({ t: 400 + i * 300, d: 600, dx: [-30, 20, -20, 30][i], dy: [-14, 18, -18, 14][i] },
          `${B(22 + i * 112, 112, 100, 44, { f: C.a })}${T(72 + i * 112, 141, s, { s: 20, w: 700 })}`)).join('')}
        <path d="M30 168 V180 H450 V168 M240 180 V196" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-t="2000" data-d="700" data-draw="1"/>
        ${ARR(240, 196, 240, 212, { f: C.ink, t: 2600, d: 200 })}
        ${G({ t: 2900, d: 600, dy: 12 }, `${B(150, 218, 180, 52, { f: GRNF, st: C.r, sw: 3, rx: 26 })}${T(240, 252, '운동 기구', { s: 24, w: 800, f: '#1e7a3a' })}`)}
        ${T(240, 294, '더 큰 말로 묶어요', { s: 18, f: C.sub, t: 3400, d: 400 })}
      `),
      play: seq(4200)
    },

    'k5-02:4': {
      alt: '종이를 다시 쓰는 과정을 순서 구조로 정리한 그림: 먼저 물에 불려 종이 죽 만들기, 다음으로 잉크·이물질 걸러 내기, 그다음 얇게 펴서 물기 빼기, 마지막으로 열로 말리면 새 종이',
      svg: svg(310, `
        ${L(70, 70, 70, 270, { f: LINE, sw: 4, t: 200, d: 3600, draw: 1 })}
        ${STEP.map(([k, s], i) => { const y = 46 + i * 66, t = 300 + i * 1000; return G({ t, d: 500, dx: -16 },
          `${B(14, y, 112, 46, { f: C.c, rx: 23 })}${T(70, y + 30, k, { s: 20, w: 800, f: '#fff' })}${B(140, y, 326, 46, { f: i === 3 ? GRNF : SOFT, rx: 12 })}${T(154, y + 30, s, { s: 20, w: 700, a: 'start' })}`); }).join('')}
      `),
      play: seq(4600)
    },
  });
})();
