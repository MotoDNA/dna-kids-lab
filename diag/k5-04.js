/* 6학년 국어 · 생각이 다를 때, 싸우지 않고 결정하는 방법은? (k5-04) */
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
  const sent = (x, y, html, s = 20, a = 'start') => `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${s}" font-weight="700" fill="${C.ink}">${html}</text>`;
  const sp = (s, col) => `<tspan fill="${col}" font-weight="800">${s}</tspan>`;
  const PROC = [['주장', '펼치기', '찬성·반대'], ['반론', '하기', '문제점 짚기'], ['주장', '다지기', '다시 정리'], ['판정', '하기', '판정단']];

  Object.assign(DIAG, {
    'k5-04:0': {
      alt: '토의는 여러 사람이 생각을 모아 좋은 방법을 찾고, 토론은 찬성편과 반대편으로 나뉘어 어느 주장이 더 타당한지 따지는 것을 비교한 그림',
      svg: svg(280, `
        ${B(16, 46, 212, 222, { f: SOFT, rx: 18 })}${B(252, 46, 212, 222, { f: SOFT, rx: 18 })}
        ${G({ t: 200, d: 400 }, `${kid(56, 86, C.d)}${kid(188, 86, C.c)}${kid(56, 176, '#af52de')}${kid(188, 176, C.r)}`)}
        ${[[74, 100], [170, 100], [74, 166], [170, 166]].map(([x, y], i) => ARR(x, y, x + (x < 122 ? 22 : -22), y + (y < 130 ? 18 : -18), { f: C.sub, sw: 3, h: 7, t: 700 + i * 150, d: 300 })).join('')}
        ${G({ t: 1400, d: 400 }, `<circle cx="122" cy="133" r="22" fill="${GRNF}" stroke="${C.r}" stroke-width="3"/>${T(122, 142, '!', { s: 24, w: 800, f: C.r })}`)}
        ${T(122, 230, '토의', { s: 24, w: 800, f: C.r })}${T(122, 256, '생각을 모아요', { s: 18, f: C.sub })}
        ${G({ t: 2000, d: 400, dx: -20 }, `${B(266, 84, 78, 94, { f: C.b, rx: 14 })}${kid(305, 118, C.d)}${T(305, 166, '찬성', { s: 20, w: 800, f: C.d })}`)}
        ${G({ t: 2000, d: 400, dx: 20 }, `${B(372, 84, 78, 94, { f: C.a, rx: 14 })}${kid(411, 118, C.c)}${T(411, 166, '반대', { s: 20, w: 800, f: '#c25e00' })}`)}
        ${G({ t: 2600, d: 400 }, `${ARR(346, 116, 368, 116, { f: C.ink, sw: 3, h: 7 })}${ARR(370, 140, 348, 140, { f: C.ink, sw: 3, h: 7 })}`)}
        ${T(358, 230, '토론', { s: 24, w: 800, f: C.d })}${T(358, 256, '어느 쪽이 타당할까', { s: 18, f: C.sub })}
      `),
      play: seq(3200)
    },

    'k5-04:1': {
      alt: '알맞은 논제 초등학생도 학교에서 휴대 전화를 쓸 수 있어야 한다는 한 가지 내용의 해야 한다 꼴이라 찬성과 반대로 나뉘고, 나쁜 게임은 금지하고 숙제는 줄여야 한다는 편드는 말과 두 가지 내용이 섞여 알맞지 않은 그림',
      svg: svg(310, `
        ${G({ t: 200, d: 500 }, `${B(14, 46, 452, 102, { f: '#2f5b3a', rx: 12 })}${B(28, 58, 60, 30, { f: '#fff', rx: 15 })}${T(58, 80, '논제', { s: 18, w: 800, f: '#2f5b3a' })}
          ${T(240, 90, '초등학생도 학교에서 휴대 전화를', { s: 20, w: 700, f: '#fff' })}<text x="240" y="126" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">쓸 수 <tspan fill="${C.a}" font-weight="800">있어야 한다.</tspan></text>`)}
        ${G({ t: 1100, d: 400, dy: -8 }, `${B(14, 156, 222, 36, { f: C.b, rx: 10 })}${T(125, 181, '찬성', { s: 20, w: 800, f: C.d })}${B(244, 156, 222, 36, { f: C.a, rx: 10 })}${T(355, 181, '반대', { s: 20, w: 800, f: '#c25e00' })}`)}
        ${G({ t: 2000, d: 500 }, `${B(14, 208, 452, 50, { f: REDF, rx: 14 })}${NO(38, 233, { r: 13 })}${sent(60, 240, `${sp('나쁜', RED)} 게임은 ${sp('금지하고', '#c25e00')} 숙제는 ${sp('줄여야', '#c25e00')} 한다.`)}`)}
        ${G({ t: 2800, d: 400, dy: -8 }, `${B(24, 266, 170, 34, { f: '#fff', st: RED, sw: 2, rx: 17 })}${T(109, 290, '편드는 말', { s: 18, w: 800, f: RED })}`)}
        ${G({ t: 3300, d: 400, dy: -8 }, `${B(206, 266, 170, 34, { f: '#fff', st: C.c, sw: 2, rx: 17 })}${T(291, 290, '두 가지 내용', { s: 18, w: 800, f: '#c25e00' })}`)}
      `),
      play: seq(4000)
    },

    'k5-04:2': {
      alt: '토론의 절차: ① 주장 펼치기(찬성·반대) → ② 반론하기(문제점 짚기) → ③ 주장 다지기(다시 정리) → ④ 판정하기(판정단). 토론에는 사회자, 토론자, 판정단이 있어요',
      svg: svg(290, `
        ${PROC.map(([a, b, w], i) => { const x = 11 + i * 118; return `${G({ t: 200 + i * 800, d: 500, dy: 12 }, `${B(x, 46, 104, 104, { f: i === 3 ? GRNF : C.b, rx: 14 })}
          <circle cx="${x + 52}" cy="70" r="13" fill="${i === 3 ? C.r : C.d}"/>${T(x + 52, 76, i + 1, { s: 18, w: 800, f: '#fff' })}
          ${T(x + 52, 110, a, { s: 20, w: 800 })}${T(x + 52, 136, b, { s: 20, w: 800 })}${T(x + 52, 178, w, { s: 18, f: C.sub, w: 700 })}`)}
          ${i < 3 ? ARR(x + 106, 98, x + 116, 98, { f: C.ink, sw: 3, h: 6, t: 600 + i * 800, d: 300 }) : ''}`; }).join('')}
        ${[['사회자', C.sub], ['토론자', C.d], ['판정단', C.r]].map(([s, col], i) => G({ t: 3400 + i * 200, d: 400 },
          `${B(14 + i * 154, 214, 144, 56, { f: SOFT, rx: 28 })}${kid(46 + i * 154, 238, col, 13)}${T(102 + i * 154, 250, s, { s: 20, w: 800, f: col })}`)).join('')}
      `),
      play: seq(4400)
    },

    'k5-04:3': {
      alt: '찬성편 근거 교실 공기가 맑아지고 책임감을 기른다에 반대편이 방학에는 물을 못 줘 식물이 죽을 수 있다고 반론하고, 반론할 때는 사실인지, 관련 있는지, 믿을 만한지 따지는 그림',
      svg: svg(300, `
        ${G({ t: 200, d: 500, dx: -16 }, `${kid(34, 92, C.d, 18)}${T(34, 140, '찬성', { s: 18, w: 800, f: C.d })}${B(64, 46, 220, 84, { f: C.b, rx: 18 })}
          ${T(174, 80, '공기가 맑아져요', { s: 20, w: 700 })}${T(174, 112, '책임감을 길러요', { s: 20, w: 700 })}`)}
        ${G({ t: 1300, d: 500, dx: 16 }, `${kid(446, 184, C.c, 18)}${T(446, 232, '반대', { s: 18, w: 800, f: '#c25e00' })}${B(196, 140, 220, 84, { f: C.a, rx: 18 })}
          ${T(306, 174, '방학엔 물을 못 줘요', { s: 20, w: 700 })}${T(306, 206, '식물이 죽을 수 있어요', { s: 20, w: 700 })}`)}
        ${G({ t: 2200, d: 400 }, `<path d="M192 184 Q120 184 120 140" fill="none" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/><path d="M112 148 L120 136 L128 148" fill="none" stroke="${RED}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(96, 196, '반론', { s: 20, w: 800, f: RED })}`)}
        ${['사실인가?', '관련 있나?', '믿을 만한가?'].map((s, i) => G({ t: 2900 + i * 300, d: 400, dy: 8 }, `${B(14 + i * 154, 246, 144, 40, { f: SOFT, rx: 20 })}${T(86 + i * 154, 273, s, { s: 18, w: 800 })}`)).join('')}
      `),
      play: seq(4000)
    },

    'k5-04:4': {
      alt: '좋은 반론은 근거를 따져 자료가 있나요라고 묻고, 나쁜 반론은 너는 아무것도 모르잖아처럼 사람을 탓하는 것임을 비교하고, 차례 지키기·끝까지 듣기·메모하기 예절을 보여 주는 그림',
      svg: svg(290, `
        ${G({ t: 200, d: 500, dx: -16 }, `${B(14, 46, 452, 74, { f: GRNF, rx: 16 })}${OK(42, 83)}${T(70, 78, '"자료가 있나요?"', { s: 21, w: 800, a: 'start' })}${T(70, 106, '근거를 따져요', { s: 18, w: 700, f: '#1e7a3a', a: 'start' })}`)}
        ${G({ t: 1300, d: 500, dx: -16 }, `${B(14, 132, 452, 74, { f: REDF, rx: 16 })}${NO(42, 169)}${T(70, 164, '"너는 아무것도 모르잖아"', { s: 21, w: 800, a: 'start' })}${T(70, 192, '사람을 탓해요', { s: 18, w: 700, f: RED, a: 'start' })}`)}
        ${['차례 지키기', '끝까지 듣기', '메모하기'].map((s, i) => G({ t: 2400 + i * 300, d: 400, dy: 8 }, `${B(14 + i * 154, 224, 144, 42, { f: C.b, rx: 21 })}${T(86 + i * 154, 252, s, { s: 18, w: 800, f: C.d })}`)).join('')}
      `),
      play: seq(3600)
    },
  });
})();
