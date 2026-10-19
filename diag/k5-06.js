/* 6학년 국어 · "발이 넓다"는 정말 발이 크다는 뜻일까? (k5-06) */
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

  const kid = (x, y, col, r = 16) => `<circle cx="${x}" cy="${y - r * .55}" r="${r * .62}" fill="${col}"/><path d="M${x - r} ${y + r * .95} a${r} ${r * 1.05} 0 0 1 ${r * 2} 0 Z" fill="${col}"/>`;
  /* 1: 몸과 관련된 관용 표현 */
  const BODY = [['귀', '귀가 얇다', '남의 말을 쉽게 믿음', C.d], ['입', '입이 무겁다', '비밀을 잘 지킴', C.r], ['눈', '눈이 높다', '좋은 것만 찾음', '#af52de'],
    ['코', '코가 납작해지다', '창피해 기가 죽음', C.c], ['손', '손을 놓다', '하던 일을 그만둠', RED]];
  /* 2: 티끌이 쌓여 산이 됨 */
  const DUST = []; for (let r = 0; r < 12; r++) for (let k = 0; k < 13 - r; k++) DUST.push([40 + k * 13 + r * 6.5, 226 - r * 11]);
  const FRIEND = [[0, 1, 2, 3, 4].map(k => [Math.cos((k * 72 - 90) * Math.PI / 180), Math.sin((k * 72 - 90) * Math.PI / 180)])][0];

  Object.assign(DIAG, {
    'k5-06:0': {
      alt: '발이 넓다는 실제로 발이 크다는 뜻이 아니라 아는 사람이 많다는 새로운 뜻으로 굳어진 관용 표현이고, 다리가 넓다로 낱말을 바꾸면 그 뜻이 사라진다는 그림',
      svg: svg(320, `
        ${G({ t: 200, d: 500, dx: -30 }, `${B(150, 46, 84, 44, { f: C.b, rx: 22 })}${T(192, 76, '발이', { s: 22, w: 800, f: C.d })}`)}
        ${G({ t: 200, d: 500, dx: 30 }, `${B(246, 46, 84, 44, { f: C.a, rx: 22 })}${T(288, 76, '넓다', { s: 22, w: 800, f: '#c25e00' })}`)}
        ${ARR(200, 96, 130, 118, { f: C.sub, sw: 3, h: 8, t: 900, d: 300 })}${ARR(280, 96, 350, 118, { f: C.sub, sw: 3, h: 8, t: 2000, d: 300 })}
        ${G({ t: 1100, d: 500 }, `${B(16, 122, 214, 136, { f: SOFT, rx: 16 })}<ellipse cx="110" cy="190" rx="30" ry="46" fill="${C.a}" stroke="${C.c}" stroke-width="3"/>
          ${[-22, -9, 4, 17].map((dx, k) => `<circle cx="${110 + dx}" cy="${138 - (k === 0 ? 0 : 2)}" r="${k === 0 ? 9 : 7}" fill="${C.a}" stroke="${C.c}" stroke-width="3"/>`).join('')}
          ${T(184, 186, '발이', { s: 18, w: 700, f: C.sub })}${T(184, 210, '크다?', { s: 18, w: 700, f: C.sub })}`)}
        ${NO(206, 140, { t: 1700, d: 300 })}
        ${G({ t: 2200, d: 500 }, `${B(250, 122, 214, 136, { f: GRNF, rx: 16 })}
          ${FRIEND.map(([cx, cy]) => `<line x1="357" y1="184" x2="${357 + cx * 48}" y2="${184 + cy * 44}" stroke="${C.r}" stroke-width="2.5"/>`).join('')}
          ${FRIEND.map(([cx, cy]) => kid(357 + cx * 48, 188 + cy * 44, C.r, 9)).join('')}${kid(357, 190, C.d, 14)}`)}
        ${OK(440, 140, { t: 2700, d: 300 })}
        ${T(357, 286, '아는 사람이 많다', { s: 20, w: 800, f: '#1e7a3a', t: 2900, d: 400 })}
        ${G({ t: 3600, d: 400 }, `<text x="123" y="286" text-anchor="middle" font-size="18" font-weight="700" fill="${C.sub}">다리가 넓다 ✕</text>${T(123, 310, '뜻이 사라져요', { s: 18, w: 700, f: C.sub })}`)}
      `),
      play: seq(4200)
    },

    'k5-06:1': {
      alt: '몸과 관련된 관용 표현: 귀가 얇다(남의 말을 쉽게 믿음), 입이 무겁다(비밀을 잘 지킴), 눈이 높다(좋은 것만 찾음), 코가 납작해지다(창피해 기가 죽음), 손을 놓다(하던 일을 그만둠)',
      svg: svg(310, BODY.map(([b, s, m, col], i) => { const y = 46 + i * 52; return G({ t: 200 + i * 700, d: 500, dx: -16 },
        `${B(14, y, 452, 44, { f: SOFT, rx: 22 })}<circle cx="38" cy="${y + 22}" r="18" fill="${col}"/>${T(38, y + 29, b, { s: 18, w: 800, f: '#fff' })}
        ${T(66, y + 29, s, { s: 20, w: 800, f: col, a: 'start' })}${T(452, y + 29, m, { s: 18, w: 700, a: 'end' })}`); }).join('')),
      play: seq(4000)
    },

    'k5-06:2': {
      alt: '속담 두 가지: 티끌 모아 태산은 작은 티끌이 쌓여 큰 산이 되듯 작은 것도 모이면 큰 것이 된다는 뜻, 가는 말이 고와야 오는 말이 곱다는 내가 좋게 말해야 남도 좋게 말한다는 뜻',
      svg: svg(310, `
        ${B(14, 46, 220, 252, { f: SOFT, rx: 18 })}${B(246, 46, 220, 252, { f: SOFT, rx: 18 })}
        ${DUST.map(([x, y], i) => `<circle class="du" data-i="${i}" cx="${x.toFixed(1)}" cy="${y}" r="5.5" fill="${i % 3 ? C.c : '#c98a3a'}"/>`).join('')}
        ${G({ t: 3000, d: 500 }, `${T(124, 262, '티끌 모아 태산', { s: 20, w: 800 })}${T(124, 286, '작은 것도 모이면 큼', { s: 18, w: 700, f: C.sub })}`)}
        ${G({ t: 300, d: 400 }, `${kid(282, 168, C.d, 16)}${kid(430, 168, C.r, 16)}`)}
        ${G({ t: 900, d: 600, dx: -40 }, `${B(306, 70, 100, 34, { f: C.b, rx: 17 })}${T(356, 94, '고운 말', { s: 18, w: 800, f: C.d })}${ARR(312, 116, 400, 116, { f: C.d, sw: 3, h: 7 })}`)}
        ${G({ t: 1900, d: 600, dx: 40 }, `${ARR(400, 196, 312, 196, { f: C.r, sw: 3, h: 7 })}${B(306, 206, 100, 34, { f: GRNF, rx: 17 })}${T(356, 230, '고운 말', { s: 18, w: 800, f: '#1e7a3a' })}`)}
        ${G({ t: 3000, d: 500 }, `${T(356, 262, '가는 말이 고와야', { s: 18, w: 800 })}${T(356, 286, '오는 말이 곱다', { s: 18, w: 800 })}`)}
      `),
      play: seq(3800, (el, e) => el.querySelectorAll('.du').forEach(c => {
        const p = dgP(e, 200 + +c.dataset.i * 30, 350), y0 = +c.getAttribute('cy');
        c.setAttribute('opacity', p > 0 ? 1 : 0); c.setAttribute('transform', `translate(0,${(-70 * (1 - p * p)).toFixed(1)})`);
      }))
    },

    'k5-06:3': {
      alt: '등잔불은 둘레를 밝히지만 바로 밑은 그림자 때문에 어두워요. 머리 위에 안경을 올려 둔 채 안경을 찾아다니는 것처럼 가까이 있는 것을 오히려 모를 때 등잔 밑이 어둡다라고 해요',
      svg: svg(320, `
        <circle class="glow" cx="120" cy="96" r="96" fill="${C.a}" opacity="0"/>
        ${G({ t: 200, d: 500 }, `<line x1="120" y1="104" x2="120" y2="228" stroke="${C.sub}" stroke-width="7"/><ellipse cx="120" cy="230" rx="44" ry="9" fill="${C.sub}"/>
          <path d="M88 102 h64 q-6 10 -32 10 q-26 0 -32 -10 Z" fill="${C.sub}"/>`)}
        <path class="flame" d="M120 70 q-12 16 -10 26 a10 10 0 0 0 20 0 q2 -10 -10 -26 Z" fill="${C.c}" opacity="0"/>
        ${G({ t: 1600, d: 500 }, `<path d="M92 112 L72 238 H168 L148 112 Z" fill="${C.ink}" fill-opacity=".28"/>`)}
        ${G({ t: 2100, d: 400 }, `${ARR(196, 200, 162, 200, { f: C.ink, sw: 3, h: 7 })}${T(204, 196, '여기가', { s: 18, w: 800, a: 'start' })}${T(204, 218, '어두워요', { s: 18, w: 800, a: 'start' })}`)}
        ${G({ t: 2700, d: 500, dx: 16 }, `${B(296, 46, 170, 182, { f: SOFT, rx: 18 })}${kid(381, 170, C.d, 30)}
          <g fill="none" stroke="${C.ink}" stroke-width="3"><circle cx="370" cy="132" r="7"/><circle cx="392" cy="132" r="7"/><path d="M377 132 h8"/></g>
          ${T(430, 104, '?', { s: 26, w: 800, f: RED })}${T(381, 220, '안경 어디 있지?', { s: 18, w: 700 })}`)}
        ${G({ t: 3500, d: 500, dy: 10 }, `${B(90, 250, 300, 44, { f: C.b, rx: 22 })}${T(240, 280, '등잔 밑이 어둡다', { s: 22, w: 800, f: C.d })}${T(240, 314, '가까이 있는 것을 오히려 몰라요', { s: 18, w: 700, f: C.sub })}`)}
      `),
      play: seq(4400, (el, e) => {
        const f = dgP(e, 700, 400), g = dgEase(dgP(e, 1000, 600));
        el.querySelector('.flame').setAttribute('opacity', f); el.querySelector('.glow').setAttribute('opacity', .55 * g);
      })
    },
  });
})();
