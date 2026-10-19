/* 4학년 국어 · 내 생각을 어떻게 말해야 친구들이 고개를 끄덕일까? (k3-07) */
(() => {
  const C = DG_C, RED = '#ff3b30', PU = '#af52de', LG = '#e5e5ea', BG = '#f5f5f7', GN = '#d6efdc';
  // 글자 폭 어림(한글 1em)
  const tw = (s, fs = 20) => [...String(s)].reduce((w, ch) => w + fs * (/[가-힣]/.test(ch) ? .865 : /[ㄱ-ㅣ]/.test(ch) ? .95 : ch === ' ' ? .23 : /[.,'‘’:;]/.test(ch) ? .28 : /[!]/.test(ch) ? .31 : /[()\[\]]/.test(ch) ? .39 : /[-]/.test(ch) ? .45 : /[“”]/.test(ch) ? .49 : /[?]/.test(ch) ? .54 : /[0-9]/.test(ch) ? .47 : /[a-z]/.test(ch) ? .56 : ch === '→' ? .92 : ch === '○' ? 1 : .66), 0);
  const tx = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.fs || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const box = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || '#fff'}" stroke="${o.s || '#d2d2d7'}" stroke-width="${o.sw ?? 2}"${o.da ? ` stroke-dasharray="${o.da}"` : ''}/>`;
  // 글자 카드 (가운데 cx, cy)
  const card = (cx, cy, s, o = {}) => { const fs = o.fs || 20, w = o.w || tw(o.m || s, fs) + (o.px ?? 28), h = o.h || fs + 22; return box(cx - w / 2, cy - h / 2, w, h, o) + tx(cx, cy + fs * .36, s, { fs, c: o.c, w: o.fw || 800 }); };
  const cw = (s, fs = 20, px = 28) => tw(s, fs) + px;
  // 등장 묶음: t 에 나타남, dx/dy 만큼 떨어진 곳에서 미끄러져 옴
  const g = (t, inner, o = {}) => `<g data-t="${t}"${o.d ? ` data-d="${o.d}"` : ''}${o.dx ? ` data-dx="${o.dx}"` : ''}${o.dy ? ` data-dy="${o.dy}"` : ''}${o.o ? ` data-o="${o.o}"` : ''}>${inner}</g>`;
  const arrow = (x1, y1, x2, y2, col = C.sub, sw = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 10, p = k => `${(x2 - L * Math.cos(a + k)).toFixed(1)} ${(y2 - L * Math.sin(a + k)).toFixed(1)}`; return `<path d="M${x1} ${y1} L${x2} ${y2} M${p(.55)} L${x2} ${y2} L${p(-.55)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const ok = (cx, cy, r = 11, col = C.r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="3.5"/>`;
  const no = (cx, cy, r = 9, col = RED) => `<path d="M${cx - r} ${cy - r} L${cx + r} ${cy + r} M${cx + r} ${cy - r} L${cx - r} ${cy + r}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;
  const chk = (cx, cy, col = C.r, k = 1) => `<path d="M${cx - 9 * k} ${cy} l${6 * k} ${7 * k} l${12 * k} ${-14 * k}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  // 얼굴: mood 1 웃음, 0 보통, -1 찡그림
  const face = (cx, cy, r, mood, col = C.c, fill = C.a) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <circle cx="${cx - r * .35}" cy="${cy - r * .2}" r="${Math.max(2.2, r * .09)}" fill="${C.ink}"/><circle cx="${cx + r * .35}" cy="${cy - r * .2}" r="${Math.max(2.2, r * .09)}" fill="${C.ink}"/>
    <path d="M${cx - r * .4} ${cy + r * .32 - mood * r * .08} Q${cx} ${cy + r * .32 + mood * r * .3} ${cx + r * .4} ${cy + r * .32 - mood * r * .08}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
  // 사람(아주 단순): 발바닥 by, 크기 k
  const person = (cx, by, k = 1, col = C.d, fill = C.b) => `<circle cx="${cx}" cy="${by - 78 * k}" r="${15 * k}" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <path d="M${cx - 20 * k} ${by} V${by - 40 * k} Q${cx - 20 * k} ${by - 58 * k} ${cx} ${by - 58 * k} Q${cx + 20 * k} ${by - 58 * k} ${cx + 20 * k} ${by - 40 * k} V${by} Z" fill="${fill}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/>`;
  // 말풍선: 꼬리 아래(tx 위치) 또는 side:'l'/'r'
  const bubble = (cx, cy, s, o = {}) => {
    const fs = o.fs || 22, w = o.w || tw(s, fs) + 32, h = fs + 24, x0 = cx - w / 2, y0 = cy - h / 2, x1 = cx + w / 2, y1 = cy + h / 2, r = 14, t = o.tx ?? cx;
    let d;
    if (o.side === 'l') d = `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${cy + 8} L${x0 - 13} ${cy} L${x0} ${cy - 8} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
    else if (o.side === 'r') d = `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${cy - 8} L${x1 + 13} ${cy} L${x1} ${cy + 8} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
    else d = `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${t + 9} L${t} ${y1 + 13} L${t - 9} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
    return `<path d="${d}" fill="${o.f || '#fff'}" stroke="${o.s || C.d}" stroke-width="2.5" stroke-linejoin="round"/>` + tx(cx, cy + fs * .36, s, { fs, c: o.c || C.ink, w: 800 });
  };
  const play = total => function (el) {
    const qa = s => [...el.querySelectorAll(s)];
    dgAnim(el, total, e => qa('[data-t]').forEach(n => {
      const f = dgEase(dgP(e, +n.dataset.t, +(n.dataset.d || 500)));
      const out = n.dataset.o ? 1 - dgP(e, +n.dataset.o, 400) : 1;
      n.setAttribute('opacity', Math.min(1, f * 1.5) * out);
      if (n.dataset.dx || n.dataset.dy) n.setAttribute('transform', `translate(${((1 - f) * (n.dataset.dx || 0)).toFixed(1)},${((1 - f) * (n.dataset.dy || 0)).toFixed(1)})`);
    }));
  };
  const SV = (h, inner) => `<svg viewBox="0 0 480 ${h}" class="dg-svg" role="img">${inner}</svg>`;

  const at = (x0, before, part, fs) => ({ x: x0 + tw(before, fs), w: tw(part, fs) });
  const hl = (p, y, fs, col, pad = 3) => `<rect x="${p.x - pad}" y="${y - fs * .95}" width="${p.w + pad * 2}" height="${fs * 1.3}" rx="7" fill="${col}"/>`;
  const pill = (cx, cy, s, col, fs = 18) => card(cx, cy, s, { fs, f: col, s: col, c: '#fff', h: fs + 14 });
  const lines = (cx, y, arr, fs = 18, c = C.ink) => arr.map((s, i) => tx(cx, y + i * (fs + 8), s, { fs, c })).join('');

  Object.assign(DIAG, {
    'k3-07:0': (() => {
      const F = 20, X = 24;
      const e1 = at(X, '복도에서는 걸어 다녀', '야 합니다', F), e2 = at(X, '더 두', '면 좋겠습니다', F);
      return {
        alt: '복도에서는 걸어 다녀야 합니다와 우리 반 학급 문고에 만화책을 더 두면 좋겠습니다처럼 의견을 나타내는 문장은 ~해야 한다, ~하면 좋겠다, ~라고 생각한다로 끝나는 것을 보여 주는 그림',
        svg: SV(290, `
          ${g(200, `${pill(X + 28, 40, '의견', C.d)}${hl(e1, 92, F, '#ffe2bf')}${tx(X, 92, '복도에서는 걸어 다녀야 합니다.', { a: 'start', fs: F })}`)}
          ${g(1300, `${pill(X + 28, 140, '의견', C.d)}${tx(X, 190, '우리 반 학급 문고에 만화책을', { a: 'start', fs: F })}${hl(e2, 218, F, GN)}${tx(X, 218, '더 두면 좋겠습니다.', { a: 'start', fs: F })}`)}
          ${g(2600, `${card(84, 266, '~해야 한다', { fs: 18, f: '#ffe2bf', s: C.c, c: C.c, h: 36 })}${card(232, 266, '~하면 좋겠다', { fs: 18, f: GN, s: C.r, c: C.r, h: 36 })}${card(392, 266, '~라고 생각한다', { fs: 18, f: '#fff', s: C.sub, c: C.sub, h: 36 })}`, { dy: 10 })}
        `),
        play: play(4000),
      };
    })(),

    'k3-07:1': {
      alt: '의견 복도에서는 걸어 다녀야 합니다를 왜냐하면으로 이어진 두 까닭, 뛰다가 친구와 부딪쳐 다칠 수 있어요와 뛰는 소리가 다른 반 수업에 방해가 돼요가 받쳐 주는 그림',
      svg: SV(300, `
        ${g(200, `${box(40, 38, 330, 54, { f: C.b, s: C.d, rx: 14 })}${tx(205, 72, '복도에서는 걸어 다녀야 합니다.', { fs: 20, w: 800 })}${pill(205, 38, '의견', C.d)}`)}
        ${g(1100, `<path d="M205 92 V120 M120 120 H360 M120 120 V150 M360 120 V150" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linecap="round"/>
          ${card(240, 120, '왜냐하면', { fs: 18, f: '#fff', s: '#fff', c: C.sub, h: 30, px: 12 })}`)}
        ${g(1700, `${box(20, 150, 200, 86, { f: C.a, s: C.c, rx: 14 })}${pill(120, 150, '까닭 1', C.c)}${lines(120, 188, ['뛰다가 친구와 부딪쳐', '다칠 수 있어요'])}`, { dy: 14 })}
        ${g(2600, `${box(260, 150, 200, 86, { f: C.a, s: C.c, rx: 14 })}${pill(360, 150, '까닭 2', C.c)}${lines(360, 188, ['뛰는 소리가 다른 반', '수업에 방해가 돼요'])}`, { dy: 14 })}
        ${g(3500, tx(240, 278, '까닭이 두세 가지면 더 믿음이 가요', { fs: 18, c: C.ink, w: 800 }))}
      `),
      play: play(4100),
    },

    'k3-07:2': {
      alt: '의견 급식을 남기지 말아야 합니다에 음식물 쓰레기가 줄어 환경을 지킬 수 있다는 까닭은 관련이 있어 알맞고, 급식실이 1층에 있다는 까닭은 의견과 관계없어 알맞지 않은 것을 보여 주는 그림',
      svg: SV(300, `
        ${g(200, `${box(70, 38, 340, 54, { f: C.b, s: C.d, rx: 14 })}${tx(240, 72, '급식을 남기지 말아야 합니다.', { fs: 20, w: 800 })}${pill(240, 38, '의견', C.d)}`)}
        ${g(1100, `<path d="M180 92 L120 160" stroke="${C.r}" stroke-width="4" stroke-linecap="round"/>
          ${box(20, 160, 200, 86, { f: GN, s: C.r, rx: 14 })}${lines(120, 196, ['음식물 쓰레기가 줄어', '환경을 지킬 수 있어요'])}
          ${ok(120, 274, 11, C.r)}${tx(140, 281, '알맞아요', { a: 'start', fs: 18, c: C.r, w: 800 })}`, { dy: 12 })}
        ${g(2400, `<path d="M300 92 L360 160" stroke="${RED}" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 8"/>
          ${box(260, 160, 200, 86, { f: '#fff0ef', s: RED, rx: 14 })}${lines(360, 196, ['급식실이 1층에', '있어요'])}
          ${no(330, 274, 8)}${tx(348, 281, '관계없어요', { a: 'start', fs: 18, c: RED, w: 800 })}`, { dy: 12 })}
      `),
      play: play(3200),
    },

    'k3-07:3': {
      alt: '의견이 드러나는 글의 짜임: 처음에는 문제 상황과 의견, 가운데에는 첫째, 둘째 까닭, 끝에는 의견을 다시 강조하는 세 칸 그림',
      svg: SV(330, `
        ${[
          { y: 46, h: 76, n: '처음', col: C.d, f: '#eef5ff', r: '문제 상황 + 의견', ex: ['교실에서는 조용히 이야기해야 합니다.'] },
          { y: 132, h: 100, n: '가운데', col: C.c, f: '#fff4e6', r: '까닭', ex: ['첫째, 책을 읽는 친구에게 방해가 됩니다.', '둘째, 큰 소리는 귀 건강에 좋지 않습니다.'] },
          { y: 242, h: 76, n: '끝', col: C.r, f: '#eaf6ed', r: '의견 다시 강조', ex: ['모두가 편안한 교실을 위해 조용히 이야기합시다.'] },
        ].map((b, i) => g(300 + i * 1200, `${box(16, b.y, 448, b.h, { f: b.f, s: b.f, rx: 14 })}
          ${card(62, b.y + b.h / 2, b.n, { fs: 20, w: 76, h: 40, f: b.col, s: b.col, c: '#fff' })}
          ${tx(118, b.y + 30, b.r, { a: 'start', fs: 20, c: b.col, w: 800 })}
          ${b.ex.map((s, j) => tx(118, b.y + 58 + j * 26, s, { a: 'start', fs: 18, c: C.sub, w: 600 })).join('')}`, { dx: -16 })).join('')}
      `),
      play: play(3400),
    },
  });
})();
