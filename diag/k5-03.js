/* 6학년 국어 · "떡볶이는 맛있다"는 사실일까, 의견일까? (k5-03) */
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

  /* 0: 확인 도구 아이콘 — (0,0) 중심 */
  const TOOL = {
    map: `<path d="M-16 -12 l10 -4 l12 4 l10 -4 v26 l-10 4 l-12 -4 l-10 4 Z" fill="${C.b}" stroke="${C.d}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="2" cy="0" r="4" fill="${RED}"/>`,
    thermo: `<rect x="-5" y="-18" width="10" height="26" rx="5" fill="#fff" stroke="${RED}" stroke-width="2.5"/><circle cx="0" cy="12" r="8" fill="${RED}"/><rect x="-2" y="-6" width="4" height="16" fill="${RED}"/>`,
    count: `${[-11, 0, 11].map(x => `<circle cx="${x}" cy="-6" r="4.5" fill="${C.c}"/><path d="M${x - 6} 10 a6 7 0 0 1 12 0 Z" fill="${C.c}"/>`).join('')}`,
  };
  const FACT = [['map', '한라산은 제주도에 있다.'], ['thermo', '물은 100℃에서 끓는다.'], ['count', '우리 반 학생은 24명이다.']];
  const face = (x, y, mood, col) => `<circle cx="${x}" cy="${y}" r="26" fill="#fff" stroke="${col}" stroke-width="3.5"/><circle cx="${x - 9}" cy="${y - 6}" r="3" fill="${C.ink}"/><circle cx="${x + 9}" cy="${y - 6}" r="3" fill="${C.ink}"/>
    <path d="${mood > 0 ? `M${x - 10} ${y + 7} q10 10 20 0` : mood < 0 ? `M${x - 10} ${y + 13} q10 -9 20 0` : `M${x - 9} ${y + 10} h18`}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
  const SORT = [['①', '놀이 기구 다섯 개', 0], ['②', '10년 전에 설치됨', 0], ['③', '낡아서 보기 안 좋음', 1], ['④', '새것으로 바꿔야 함', 1]];

  Object.assign(DIAG, {
    'k5-03:0': {
      alt: '사실은 확인할 수 있는 내용: 한라산은 제주도에 있다는 지도로, 물은 100℃에서 끓는다는 온도계로, 우리 반 학생은 24명이다는 세어 보아 확인할 수 있는 그림',
      svg: svg(250, FACT.map(([k, s], i) => { const y = 46 + i * 66, t = 200 + i * 1100; return `
        ${G({ t, d: 400 }, `${B(14, y, 452, 54, { f: SOFT, rx: 14 })}<circle cx="46" cy="${y + 27}" r="22" fill="#fff"/><g transform="translate(46,${y + 27})">${TOOL[k]}</g>${T(82, y + 35, s, { s: 21, w: 700, a: 'start' })}`)}
        ${OK(436, y + 27, { t: t + 700, d: 300 })}`; }).join('')),
      play: seq(3600)
    },

    'k5-03:1': {
      alt: '한라산은 우리나라에서 가장 아름다운 산이다라는 의견에 사람마다 그렇다, 글쎄, 아니다로 생각이 달라 맞다 틀리다로 확인할 수 없고 타당한지로 판단하는 그림',
      svg: svg(300, `
        ${G({ t: 200, d: 500 }, `${B(30, 46, 420, 56, { f: C.a, rx: 28 })}<path d="M220 101 l20 16 l6 -16 Z" fill="${C.a}"/>${T(240, 82, '한라산은 가장 아름다운 산이다.', { s: 21, w: 800 })}`)}
        ${[[110, 1, '그렇다', C.r], [240, 0, '글쎄', C.c], [370, -1, '아니다', RED]].map(([x, m, s, col], i) => G({ t: 1100 + i * 500, d: 400, dy: 10 },
          `${face(x, 156, m, col)}${T(x, 210, s, { s: 20, w: 800, f: col })}`)).join('')}
        ${G({ t: 2900, d: 500 }, `${B(40, 232, 400, 50, { f: SOFT, rx: 25 })}<text x="240" y="264" text-anchor="middle" font-size="20" font-weight="700" fill="${C.ink}">맞다·틀리다 <tspan fill="${RED}" font-weight="800">✕</tspan>  →  <tspan fill="${C.d}" font-weight="800">타당한가?</tspan></text>`)}
      `),
      play: seq(3600)
    },

    'k5-03:2': {
      alt: '글의 네 문장을 나누면 ① 놀이 기구가 다섯 개 있다와 ② 미끄럼틀은 10년 전에 설치되었다는 확인할 수 있는 사실, ③ 낡아서 보기에 좋지 않다와 ④ 새것으로 바꿔야 한다는 글쓴이의 의견인 그림',
      svg: svg(250, `
        ${B(8, 46, 228, 46, { f: C.r, rx: 14 })}${T(122, 76, '사실 · 확인할 수 있음', { s: 18, w: 800, f: '#fff' })}
        ${B(244, 46, 228, 46, { f: C.c, rx: 14 })}${T(358, 76, '의견 · 생각과 주장', { s: 18, w: 800, f: '#fff' })}
        ${SORT.map(([n, s, side], i) => { const x = side ? 244 : 8, y = 106 + (i % 2) * 66, col = side ? C.c : C.r; return G({ t: 400 + i * 900, d: 700, dx: side ? -110 : 110, dy: -20 },
          `${B(x, y, 228, 54, { f: side ? C.a : GRNF, rx: 14 })}<circle cx="${x + 24}" cy="${y + 27}" r="14" fill="${col}"/>${T(x + 24, y + 33, n.replace(/[①②③④]/, m => '①②③④'.indexOf(m) + 1), { s: 18, w: 800, f: '#fff' })}${T(x + 46, y + 34, s, { s: 20, w: 700, a: 'start' })}`); }).join('')}
      `),
      play: seq(4200)
    },

    'k5-03:3': {
      alt: '학교 앞에 신호등을 설치해야 한다는 의견을 지난해 교통사고 세 번이라는 관련 있는 사실이 받치면 타당하고, 신호등 색깔이 예쁘다는 관련 없는 근거로는 타당하지 않음을 보여 주는 그림',
      svg: svg(300, `
        ${G({ t: 200, d: 500 }, `${B(14, 46, 452, 52, { f: C.b, rx: 14 })}${T(240, 79, '학교 앞에 신호등을 설치해야 한다', { s: 21, w: 800, f: C.d })}`)}
        ${G({ t: 1000, d: 600, dy: 30 }, `${B(30, 108, 190, 100, { f: GRNF, st: C.r, sw: 3, rx: 8 })}${T(125, 148, '지난해 학교 앞', { s: 20, w: 700 })}${T(125, 178, '교통사고 3번', { s: 20, w: 800 })}`)}
        ${G({ t: 2200, d: 600, dy: 30 }, `${B(260, 108, 190, 100, { f: REDF, st: RED, sw: 3, da: '8 6', rx: 8 })}${T(355, 148, '신호등 색깔이', { s: 20, w: 700 })}${T(355, 178, '예쁘다', { s: 20, w: 800 })}`)}
        ${G({ t: 1700, d: 400 }, `${OK(52, 240)}${T(76, 247, '타당해요', { s: 20, w: 800, f: '#1e7a3a', a: 'start' })}${T(125, 284, '관련 있는 사실', { s: 18, f: C.sub })}`)}
        ${G({ t: 2900, d: 400 }, `${NO(282, 240)}${T(306, 247, '타당하지 않아요', { s: 20, w: 800, f: RED, a: 'start' })}${T(355, 284, '관련 없는 까닭', { s: 18, f: C.sub })}`)}
      `),
      play: seq(3600)
    },

    'k5-03:4': {
      alt: '운동화 광고 문장을 돋보기로 살펴보면 하루에 1,000켤레가 팔렸습니다는 사실인지 확인이 필요하고, 신기만 하면 누구나 달리기가 빨라집니다는 근거 없는 의견인 그림',
      svg: svg(270, `
        ${B(14, 46, 452, 210, { f: SOFT, rx: 18 })}
        ${T(34, 92, '하루에 1,000켤레가 팔렸습니다.', { s: 21, w: 700, a: 'start' })}
        ${G({ t: 1300, d: 400, dy: -8 }, `${B(214, 106, 240, 36, { f: C.a, rx: 18 })}${T(334, 131, '사실인지 확인 필요', { s: 18, w: 800, f: '#c25e00' })}`)}
        ${T(30, 186, '신기만 하면 누구나 달리기가 빨라집니다.', { s: 20, w: 700, a: 'start' })}
        ${G({ t: 3000, d: 400, dy: -8 }, `${B(254, 200, 200, 36, { f: REDF, rx: 18 })}${T(354, 225, '근거 없는 의견', { s: 18, w: 800, f: RED })}`)}
        <g class="mag"><circle cx="0" cy="0" r="24" fill="#fff" fill-opacity=".25" stroke="${C.ink}" stroke-width="4"/><line x1="17" y1="17" x2="34" y2="34" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/></g>
      `),
      play: seq(3800, (el, e) => {
        const a = dgEase(dgP(e, 200, 1000)), b = dgEase(dgP(e, 1800, 1100)), c = dgEase(dgP(e, 3300, 400));
        const x = 60 + 230 * a + (90 - 230) * b * 1 + 0, y = 84 + 94 * b;
        const m = el.querySelector('.mag');
        m.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`); m.setAttribute('opacity', 1 - c);
      })
    },
  });
})();
