/* 2학년 국어 · 어른께는 어떻게 인사하고 말할까? (k1-18) */
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

  /* 0: 때에 맞는 인사말 — 상황 아이콘 + 말풍선 */
  const ico = {
    meet: (x, y) => `${face(x - 12, y, 13, 1, C.c, C.a)}${face(x + 14, y + 4, 11, 1, C.d, C.b)}`,
    meal: (x, y) => `<path d="M${x - 22} ${y - 2} H${x + 22} A22 20 0 0 1 ${x - 22} ${y - 2} Z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M${x - 8} ${y - 10} q-4 -6 0 -12 M${x + 6} ${y - 10} q-4 -6 0 -12" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round"/>`,
    moon: (x, y) => `<path d="M${x + 6} ${y - 21} A21 21 0 1 0 ${x + 14} ${y + 16} A16 16 0 1 1 ${x + 6} ${y - 21} Z" fill="#fff3c4" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>`,
    bag: (x, y) => `<rect x="${x - 17}" y="${y - 16}" width="34" height="38" rx="9" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>
      <path d="M${x - 9} ${y - 16} V${y - 22} Q${x - 9} ${y - 28} ${x} ${y - 28} Q${x + 9} ${y - 28} ${x + 9} ${y - 22} V${y - 16}" fill="none" stroke="${C.d}" stroke-width="3"/>
      <rect x="${x - 10}" y="${y + 2}" width="20" height="11" rx="3" fill="#fff" stroke="${C.d}" stroke-width="2.5"/>`,
  };
  const G0 = [
    { i: 'meet', s: '만날 때', b: '안녕하세요.' },
    { i: 'meal', s: '밥 먹기 전', b: '잘 먹겠습니다.' },
    { i: 'moon', s: '자기 전', b: '안녕히 주무세요.' },
    { i: 'bag', s: '학교 갈 때', b: '다녀오겠습니다.' },
  ];

  Object.assign(DIAG, {
    'k1-18:0': {
      alt: '만날 때는 안녕하세요, 밥 먹기 전에는 잘 먹겠습니다, 자기 전에는 안녕히 주무세요, 학교 갈 때는 다녀오겠습니다라고 인사하는 것을 상황 그림과 말풍선으로 보여 주는 그림',
      svg: SV(334, G0.map((r, i) => { const y = 72 + i * 70; return `
        ${g(300 + i * 1100, `<circle cx="44" cy="${y}" r="30" fill="${BG}"/>${ico[r.i](44, y + 2)}
          ${tx(88, y + 7, r.s, { a: 'start', fs: 20, c: C.sub })}`)}
        ${g(800 + i * 1100, bubble(334, y, r.b, { side: 'l', fs: 22, w: 216, s: [C.c, C.d, PU, C.r][i] }), { dx: -20 })}`; }).join('')),
      play: play(5200),
    },

    'k1-18:1': {
      alt: '문을 나서 떠나는 사람에게 남는 사람은 안녕히 가세요라고 하고, 떠나는 사람은 남는 사람에게 안녕히 계세요라고 하는 그림',
      svg: SV(318, `<g transform="translate(0,18)">
        <rect x="196" y="120" width="70" height="140" rx="6" fill="${BG}" stroke="${C.sub}" stroke-width="3"/>
        <path d="M196 120 L232 132 V270 L196 260 Z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="224" cy="200" r="3.5" fill="${C.c}"/>
        <line x1="10" y1="262" x2="470" y2="262" stroke="${LG}" stroke-width="3"/>
        ${person(110, 260, 1, C.d, C.b)}
        ${tx(110, 292, '남는 사람', { fs: 20, c: C.d, w: 800 })}
        <g data-t="300" data-d="1600" data-dx="-120">${person(370, 260, 1, C.c, C.a)}
          ${tx(370, 292, '가는 사람', { fs: 20, c: C.c, w: 800 })}</g>
        ${g(1800, arrow(406, 218, 446, 218, C.c, 4))}
        ${g(2200, bubble(110, 60, '안녕히 가세요.', { fs: 22, s: C.d, tx: 110 }) + tx(110, 112, '→ 가는 사람에게', { fs: 18, c: C.sub }), { dy: 10 })}
        ${g(3600, bubble(370, 60, '안녕히 계세요.', { fs: 22, s: C.c, tx: 370 }) + tx(370, 112, '→ 남는 사람에게', { fs: 18, c: C.sub }), { dy: 10 })}
      </g>`),
      play: play(4400),
    },

    'k1-18:2': {
      alt: '선물을 받아 고마울 때는 고맙습니다, 컵을 엎질러 잘못했을 때는 죄송합니다라고 말하는 것을 보여 주는 그림',
      svg: SV(280, `
        ${g(200, `<rect x="74" y="86" width="92" height="70" rx="8" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>
          <rect x="66" y="70" width="108" height="22" rx="6" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>
          <path d="M120 70 V156" stroke="${RED}" stroke-width="6"/>
          <path d="M120 70 q-26 -26 -30 -4 q2 8 30 4 q28 4 30 -4 q-4 -22 -30 4" fill="#ffe0de" stroke="${RED}" stroke-width="3" stroke-linejoin="round"/>
          ${tx(120, 190, '고마울 때', { fs: 20, c: C.sub })}`)}
        ${g(1000, bubble(120, 240, '고맙습니다.', { fs: 24, s: C.d, side: 'n', tx: 120 }), { dy: 12 })}
        <line x1="240" y1="60" x2="240" y2="260" stroke="${LG}" stroke-width="2"/>
        ${g(2000, `<path d="M318 132 L366 120 L366 166 L318 156 Z" fill="#fff" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <ellipse cx="366" cy="143" rx="6" ry="23" fill="${C.b}" stroke="${C.sub}" stroke-width="3"/>
          <path d="M366 160 q24 -2 50 2 q16 6 -4 9 q-30 4 -52 -2 Z" fill="${C.b}" stroke="${C.d}" stroke-width="2.5" stroke-linejoin="round"/>
          ${tx(360, 190, '잘못했을 때', { fs: 20, c: C.sub })}`)}
        ${g(2800, bubble(360, 240, '죄송합니다.', { fs: 24, s: C.c, tx: 360 }), { dy: 12 })}
      `),
      play: play(3600),
    },

    'k1-18:3': {
      alt: '어른께는 밥 대신 진지, 집 대신 댁이라는 높이는 낱말을 쓰고, 말끝에 -요를 붙여 할머니, 진지 드세요라고 말하는 그림',
      svg: SV(308, `<g transform="translate(0,18)">
        ${[['밥', '진지'], ['집', '댁']].map(([a, b], i) => { const x = 120 + i * 240; return `
          ${g(200 + i * 1300, card(x - 60, 70, a, { fs: 26, w: 72, h: 56, f: BG }))}
          ${g(700 + i * 1300, arrow(x - 18, 70, x + 14, 70, C.sub, 3.5))}
          ${g(900 + i * 1300, card(x + 60, 70, b, { fs: 26, w: 84, h: 56, f: C.b, s: C.d, c: C.d }), { dx: -24 })}`; }).join('')}
        ${g(400, tx(120, 132, '보통 말 → 높임 말', { fs: 18, c: C.sub }))}
        <line x1="20" y1="158" x2="460" y2="158" stroke="${LG}" stroke-width="2"/>
        ${g(3000, `<text x="240" y="214" text-anchor="middle" font-size="30" font-weight="800" fill="${C.ink}">할머니, <tspan fill="${C.d}">진지</tspan> 드세<tspan fill="${C.c}">요</tspan>.</text>`, { dy: 10 })}
        ${g(3800, `${tx(205, 260, '높이는 낱말', { fs: 18, c: C.d, w: 800 })}${tx(345, 260, '말끝 -요', { fs: 18, c: C.c, w: 800 })}
          <path d="M205 236 V226 M332 236 V226" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round"/>`)}
      </g>`),
      play: play(4600),
    },
  });
})();
