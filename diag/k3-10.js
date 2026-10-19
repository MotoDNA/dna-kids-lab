/* 3학년 국어 · 시를 읽으면 왜 소리가 들리고 냄새가 날까? (k3-10) */
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
  // 감각 기관 아이콘 (가운데 0,0 · 약 ±18)
  const IC = {
    eye: c => `<path d="M-19 0 Q0 -15 19 0 Q0 15 -19 0 Z" fill="#fff" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><circle r="6.5" fill="${c}"/>`,
    ear: c => `<path d="M-8 14 Q-2 18 2 10 Q4 4 10 -2 Q16 -10 8 -16 Q-2 -22 -10 -12 Q-14 -6 -12 0" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/><path d="M-3 -6 Q0 -12 5 -8 Q7 -3 1 2" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
    nose: c => `<path d="M-2 -17 Q-4 -4 -12 6 Q-15 13 -6 13 Q-2 9 2 13 Q10 14 10 8" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    tongue: c => `<path d="M-17 -6 Q0 -2 17 -6 Q16 12 0 14 Q-16 12 -17 -6 Z" fill="#fff" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M-9 -3 Q0 0 9 -3 Q9 10 0 10 Q-9 10 -9 -3 Z" fill="#ffb3ad"/>`,
    hand: c => `<g fill="#fff" stroke="${c}" stroke-width="3" stroke-linejoin="round"><rect x="-12" y="-14" width="5.5" height="18" rx="2.75"/><rect x="-5.5" y="-18" width="5.5" height="22" rx="2.75"/><rect x="1" y="-16" width="5.5" height="20" rx="2.75"/><rect x="7.5" y="-11" width="5.5" height="15" rx="2.75"/><path d="M-12 0 H13 V8 Q13 18 0 18 Q-12 18 -12 8 Z"/><path d="M-12 6 L-20 -2" stroke-linecap="round"/></g>`,
  };
  const ico = (k, x, y, c, bg) => `<circle cx="${x}" cy="${y}" r="25" fill="${bg}"/><g transform="translate(${x},${y})">${IC[k](c)}</g>`;
  const S0 = [
    { k: 'eye', o: '눈', s: '시각', e: '빨간 단풍잎', c: RED, bg: '#ffe0de' },
    { k: 'ear', o: '귀', s: '청각', e: '졸졸 흐르는 시냇물', c: C.d, bg: '#eef5ff' },
    { k: 'nose', o: '코', s: '후각', e: '고소한 빵 냄새', c: C.c, bg: '#fff4e6' },
    { k: 'tongue', o: '혀', s: '미각', e: '새콤한 귤', c: PU, bg: '#f4e8fb' },
    { k: 'hand', o: '피부', s: '촉각', e: '보들보들한 강아지 털', c: C.r, bg: '#eaf6ed' },
  ];

  Object.assign(DIAG, {
    'k3-10:0': {
      alt: '눈으로 보는 시각(빨간 단풍잎), 귀로 듣는 청각(졸졸 흐르는 시냇물), 코로 맡는 후각(고소한 빵 냄새), 혀로 맛보는 미각(새콤한 귤), 피부로 만지는 촉각(보들보들한 강아지 털) 다섯 가지 감각 그림',
      svg: SV(316, S0.map((r, i) => { const y = 38 + i * 60; return g(200 + i * 800, `
        ${ico(r.k, 40, y, r.c, r.bg)}
        ${tx(96, y + 8, r.o, { fs: 22, c: r.c, w: 800 })}
        ${card(160, y, r.s, { fs: 20, w: 68, h: 36, f: r.c, s: r.c, c: '#fff' })}
        ${tx(206, y + 7, r.e, { a: 'start', fs: 20 })}`, { dx: -14 }); }).join('')),
      play: play(4400),
    },

    'k3-10:1': (() => {
      const F = 26, X = 40;
      const p1 = at(X, '', '시원한', F), p2 = at(X, '시원한 바람이 ', '살랑살랑', F), p3 = at(X, '내 볼을 ', '간질인다', F);
      const tag = (p, y, s, c) => `<path d="M${p.x + p.w / 2} ${y} v10" stroke="${c}" stroke-width="2.5"/>${tx(p.x + p.w / 2, y + 30, s, { fs: 18, c, w: 800 })}`;
      return {
        alt: '밋밋한 표현 바람이 분다를 시원한 바람이 살랑살랑 내 볼을 간질인다로 바꾸면 피부로 느낀 시원함과 간지러움, 흉내 내는 말 살랑살랑이 더해져 장면이 생생해지는 그림',
        svg: SV(320, `
          ${tx(X, 40, '밋밋한 표현', { a: 'start', fs: 18, c: C.sub })}
          ${tx(X, 78, '바람이 분다.', { a: 'start', fs: 24, c: C.sub })}
          ${g(700, arrow(X + 20, 96, X + 20, 122, C.sub, 3))}
          ${g(900, tx(X + 44, 116, '감각적 표현', { a: 'start', fs: 18, c: C.d, w: 800 }))}
          ${g(1500, `${hl(p1, 172, F, '#d6efdc')}`)}
          ${g(2400, `${hl(p2, 172, F, '#eef5ff')}`)}
          ${g(3300, `${hl(p3, 262, F, '#d6efdc')}`)}
          ${g(900, `${tx(X, 172, '시원한 바람이 살랑살랑', { a: 'start', fs: F, w: 800 })}${tx(X, 262, '내 볼을 간질인다.', { a: 'start', fs: F, w: 800 })}`, { dy: 10 })}
          ${g(1700, tag(p1, 182, '피부', C.r))}
          ${g(2600, tag(p2, 182, '흉내 내는 말', C.d))}
          ${g(3500, tag(p3, 272, '피부', C.r))}
        `),
        play: play(4200),
      };
    })(),

    'k3-10:2': {
      alt: '소리를 흉내 내는 말 졸졸, 똑똑, 멍멍, 바스락은 귀로 듣는 느낌을, 모양을 흉내 내는 말 반짝반짝, 뒤뚱뒤뚱, 몽글몽글, 살금살금은 눈앞에 그려지는 느낌을 주는 것을 두 무리로 나눈 그림',
      svg: SV(320, `
        ${[[['졸졸', '똑똑', '멍멍', '바스락'], 'ear', C.d, '#eef5ff', '소리 흉내', 120], [['반짝반짝', '뒤뚱뒤뚱', '몽글몽글', '살금살금'], 'eye', C.c, '#fff4e6', '모양 흉내', 360]].map(([ws, k, col, bg, lab, cx], n) => `
          ${g(200 + n * 2000, `${ico(k, cx - 52, 62, col, bg)}${tx(cx - 18, 70, lab, { a: 'start', fs: 20, c: col, w: 800 })}`)}
          ${ws.map((w, i) => g(600 + n * 2000 + i * 330, card(cx, 126 + i * 48, w, { fs: 22, w: 160, h: 40, f: bg, s: col }), { dy: 10, d: 350 })).join('')}`).join('')}
        <line x1="240" y1="100" x2="240" y2="300" stroke="${LG}" stroke-width="2"/>
      `),
      play: play(3900),
    },

    'k3-10:3': (() => {
      const F = 20, X = 40;
      const L = ['톡톡톡', '창문을 두드리는 봄비', '', '촉촉한 흙냄새가', '코끝에 살금살금', '', '연둣빛 새싹이', '고개를 쏙 내밀어요'];
      const Y = i => 98 + i * 28;
      const M = [
        { i: 0, p: at(X, '', '톡톡톡', F), k: 'ear', o: '귀', c: C.d, bg: '#eef5ff', hc: '#dcebff' },
        { i: 3, p: at(X, '', '촉촉한 흙냄새', F), k: 'nose', o: '코', c: C.c, bg: '#fff4e6', hc: C.a },
        { i: 6, p: at(X, '', '연둣빛 새싹', F), k: 'eye', o: '눈', c: C.r, bg: '#eaf6ed', hc: GN },
      ];
      return {
        alt: '시 봄비에서 톡톡톡은 귀로, 촉촉한 흙냄새는 코로, 연둣빛 새싹은 눈으로 느낀 감각적 표현임을 표시한 그림',
        svg: SV(326, `
          ${box(20, 30, 290, 284, { f: '#fffdf6', s: '#e5e5ea', rx: 14 })}
          ${tx(X, 64, '봄비', { a: 'start', fs: 22, w: 800 })}
          ${M.map((m, j) => g(500 + j * 1300, hl(m.p, Y(m.i), F, m.hc))).join('')}
          ${L.map((l, i) => l ? tx(X, Y(i), l, { a: 'start', fs: F }) : '').join('')}
          ${M.map((m, j) => g(800 + j * 1300, `<path d="M${X + tw(L[m.i], F) + 8} ${Y(m.i) - 7} H${352}" stroke="${m.c}" stroke-width="2.5" stroke-dasharray="4 4"/>
            ${ico(m.k, 384, Y(m.i) - 7, m.c, m.bg)}${tx(420, Y(m.i), m.o, { a: 'start', fs: 22, c: m.c, w: 800 })}`, { dx: -14 })).join('')}
        `),
        play: play(4200),
      };
    })(),
  });
})();
