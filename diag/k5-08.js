/* 5학년 국어 · "나는 어제 숙제를 할 것이다"는 왜 어색할까? (k5-08) */
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

  const PUR = '#af52de', PURF = '#ecdcf7';
  /* 0: 문장 성분 조각 */
  const PART = [
    { w: '동생이', n: '주어', q: '누가', col: C.d, f: C.b, dx: 40, dy: -30 },
    { w: '사과를', n: '목적어', q: '무엇을', col: C.c, f: C.a, dx: -30, dy: 34 },
    { w: '맛있게', n: '부사어', q: '어떻게', col: PUR, f: PURF, dx: 30, dy: -34 },
    { w: '먹는다', n: '서술어', q: '어찌하다', col: C.r, f: GRNF, dx: -40, dy: 30 },
  ];
  /* 4: 짝꿍 말 — 오른쪽 카드는 섞인 자리에서 제자리로 */
  const PAIR = [['결코', '~지 않다'], ['만약', '~면'], ['비록', '~지만'], ['왜냐하면', '~기 때문이다'], ['아마', '~ㄹ 것이다']];
  const SHUF = [2, 4, 0, 1, 3];
  const sent = (x, y, html, s = 22) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="700" fill="${C.ink}">${html}</text>`;
  const sp = (s, col, w = 800) => `<tspan fill="${col}" font-weight="${w}">${s}</tspan>`;

  Object.assign(DIAG, {
    'k5-08:0': {
      alt: '문장 동생이 사과를 맛있게 먹는다를 조각으로 나누면 동생이는 주어(누가), 사과를은 목적어(무엇을), 맛있게는 부사어(어떻게), 먹는다는 서술어(어찌하다)인 그림',
      svg: svg(260, PART.map((p, i) => { const x = 12 + i * 116, t = 200 + i * 500; return `
        ${G({ t, d: 700, dx: p.dx, dy: p.dy }, `${B(x, 70, 108, 60, { f: p.f, st: p.col, sw: 3, rx: 12 })}${T(x + 54, 108, p.w, { s: 24, w: 800 })}`)}
        ${G({ t: 2500 + i * 400, d: 400, dy: -10 }, `${B(x + 14, 148, 80, 38, { f: p.col, rx: 19 })}${T(x + 54, 174, p.n, { s: 20, w: 800, f: '#fff' })}${T(x + 54, 218, p.q, { s: 18, f: C.sub, w: 700 })}`)}`; }).join('')),
      play: seq(4400)
    },

    'k5-08:1': {
      alt: '내 꿈은 멋진 요리사가 되고 싶다에서 주어 꿈은과 서술어 되고 싶다만 떼어 읽으면 어색해요. 내 꿈은 요리사가 되는 것이다, 또는 나는 요리사가 되고 싶다로 고친 그림',
      svg: svg(280, `
        ${G({ t: 200, d: 400 }, `${B(20, 50, 52, 46, { f: SOFT })}${T(46, 81, '내', { s: 22 })}
          ${B(80, 50, 76, 46, { f: C.b, st: C.d, sw: 3 })}${T(118, 81, '꿈은', { s: 22, w: 800, f: C.d })}
          <g class="mid">${B(164, 50, 150, 46, { f: SOFT })}${T(239, 81, '멋진 요리사가', { s: 22 })}</g>
          ${B(322, 50, 138, 46, { f: REDF, st: RED, sw: 3 })}${T(391, 81, '되고 싶다', { s: 22, w: 800, f: RED })}`)}
        <path d="M118 100 Q118 132 160 132 H350 Q391 132 391 100" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="7 6" data-t="1500" data-d="800" data-draw="1"/>
        ${NO(255, 132, { t: 2300, d: 300 })}
        ${G({ t: 3000, d: 500, dy: 10 }, `${OK(36, 186)}${sent(62, 194, `내 ${sp('꿈은', C.d)} 멋진 요리사가 ${sp('되는 것이다', C.r)}.`)}`)}
        ${G({ t: 3800, d: 500, dy: 10 }, `${OK(36, 240)}${sent(62, 248, `${sp('나는', C.d)} 멋진 요리사가 ${sp('되고 싶다', C.r)}.`)}`)}
      `),
      play: seq(4600, (el, e) => el.querySelector('.mid').setAttribute('opacity', 1 - .6 * dgP(e, 1100, 400)))
    },

    'k5-08:2': {
      alt: '시간을 나타내는 말과 서술어의 호응: 어제는 ~었다/~았다(갔다), 지금은 ~ㄴ다/~는다(간다), 내일은 ~ㄹ 것이다(갈 것이다). 나는 어제 할머니 댁에 갈 것이다를 갔다로 고치는 그림',
      svg: svg(300, `
        ${ARR(24, 100, 458, 100, { f: LINE, sw: 4, h: 12 })}
        ${[['어제', '~었다·~았다', '갔다', C.d], ['지금', '~ㄴ다·~는다', '간다', C.r], ['내일', '~ㄹ 것이다', '갈 것이다', C.c]].map(([w, k, ex, col], i) => { const x = 90 + i * 150; return G({ t: 300 + i * 900, d: 500, dy: 10 },
          `${T(x, 76, w, { s: 22, w: 800, f: col })}<circle cx="${x}" cy="100" r="9" fill="${col}"/>${B(x - 68, 116, 136, 36, { f: SOFT, rx: 18 })}${T(x, 140, k, { s: 18, w: 700 })}${T(x, 184, ex, { s: 22, w: 800, f: col })}`); }).join('')}
        ${G({ t: 3200, d: 400 }, `${B(14, 214, 452, 62, { f: '#fff', st: LINE, sw: 2, rx: 14 })}${sent(30, 253, `나는 ${sp('어제', C.d)} 할머니 댁에`)}`)}
        ${G({ t: 3400, d: 300, o: 4300 }, `${B(296, 224, 156, 42, { f: REDF, rx: 21 })}${T(374, 253, '갈 것이다', { s: 22, w: 800, f: RED })}`)}
        ${G({ t: 4700, d: 400, dy: -12 }, `${B(296, 224, 156, 42, { f: C.b, rx: 21 })}${T(374, 253, '갔다', { s: 22, w: 800, f: C.d })}`)}
      `),
      play: seq(5400)
    },

    'k5-08:3': {
      alt: '높임 표현의 호응: 할아버지가 방에서 잔다를 할아버지께서 방에서 주무신다로 고치고, 먹다는 드시다, 자다는 주무시다, 있다는 계시다로 바꾸어 쓰는 그림',
      svg: svg(290, `
        ${G({ t: 200, d: 400 }, `${B(20, 46, 440, 60, { f: REDF, rx: 16 })}${NO(436, 64, { r: 13 })}${sent(40, 85, `할아버지${sp('가', RED)} 방에서 ${sp('잔다', RED)}.`, 24)}`)}
        ${ARR(240, 112, 240, 132, { f: C.ink, t: 1000, d: 300 })}
        ${G({ t: 1300, d: 500, dy: 10 }, `${B(20, 138, 440, 60, { f: GRNF, rx: 16 })}${OK(436, 156, { r: 13 })}${sent(40, 177, `할아버지${sp('께서', '#1e7a3a')} 방에서 ${sp('주무신다', '#1e7a3a')}.`, 24)}`)}
        ${[['먹다', '드시다'], ['자다', '주무시다'], ['있다', '계시다']].map(([a, b], i) => G({ t: 2400 + i * 500, d: 400, dy: 10 },
          `${B(14 + i * 154, 220, 144, 46, { f: SOFT, rx: 23 })}${T(86 + i * 154, 250, `${a} → <tspan fill="#1e7a3a" font-weight="800">${b}</tspan>`, { s: 18, w: 700 })}`)).join('')}
      `),
      play: seq(4000)
    },

    'k5-08:4': {
      alt: '짝을 이루는 말: 결코는 ~지 않다, 만약은 ~면, 비록은 ~지만, 왜냐하면은 ~기 때문이다, 아마는 ~ㄹ 것이다와 짝을 이루는 그림',
      svg: svg(310, PAIR.map(([a, b], i) => { const y = 46 + i * 52, t = 1000 + i * 600; return `
        ${G({ t: 200, d: 400 }, `${B(30, y, 140, 42, { f: C.b, rx: 21 })}${T(100, y + 28, a, { s: 20, w: 800, f: C.d })}`)}
        <g class="rc" data-off="${(SHUF[i] - i) * 52}" data-st="${t}">${(`${B(270, y, 180, 42, { f: C.a, rx: 21 })}${T(360, y + 28, b, { s: 20, w: 800, f: '#c25e00' })}`)}</g>
        ${L(176, y + 21, 264, y + 21, { f: C.c, sw: 3, t: t + 600, d: 400, draw: 1 })}`; }).join('')),
      play: seq(4400, (el, e) => el.querySelectorAll('.rc').forEach(g => {
        const p = dgEase(dgP(e, +g.dataset.st, 600));
        g.setAttribute('opacity', dgP(e, 200, 400)); g.setAttribute('transform', `translate(0,${(+g.dataset.off * (1 - p)).toFixed(1)})`);
      }))
    },
  });
})();
