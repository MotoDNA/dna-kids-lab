/* 3학년 국어 · 고마운 마음, 편지로 어떻게 전할까? (k3-08) */
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

  const env = (cx, cy, col, fill) => `<rect x="${cx - 78}" y="${cy - 40}" width="156" height="80" rx="8" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <path d="M${cx - 76} ${cy - 37} L${cx} ${cy + 6} L${cx + 76} ${cy - 37}" fill="none" stroke="${col}" stroke-width="3" stroke-linejoin="round"/>`;
  const E0 = [
    { m: '고마운 마음', to: '우산을 함께 써 준 친구', c: C.r, f: GN },
    { m: '미안한 마음', to: '말다툼한 동생', c: C.d, f: C.b },
    { m: '축하하는 마음', to: '상을 받은 형', c: C.c, f: C.a },
    { m: '위로하는 마음', to: '다리를 다친 친구', c: PU, f: '#efdcf7' },
  ];
  const num = (cx, cy, n, col = C.c) => `<circle cx="${cx}" cy="${cy}" r="14" fill="${col}"/>${tx(cx, cy + 6.5, n, { fs: 18, c: '#fff', w: 800 })}`;
  const cbx = (x, y, t) => `<rect x="${x}" y="${y - 13}" width="26" height="26" rx="7" fill="#fff" stroke="#c7c7cc" stroke-width="2.5"/>${g(t, chk(x + 13, y + 1, C.r, .9), { d: 300 })}`;

  Object.assign(DIAG, {
    'k3-08:0': {
      alt: '고마운 마음은 우산을 함께 써 준 친구에게, 미안한 마음은 말다툼한 동생에게, 축하하는 마음은 상을 받은 형에게, 위로하는 마음은 다리를 다친 친구에게 전하는 편지 봉투 네 장 그림',
      svg: SV(300, E0.map((e, i) => { const cx = 120 + (i % 2) * 240, cy = 84 + Math.floor(i / 2) * 132; return g(300 + i * 800, `
        ${env(cx, cy, e.c, e.f)}${card(cx, cy + 14, e.m, { fs: 18, f: '#fff', s: e.c, c: e.c, h: 32 })}
        ${tx(cx, cy + 70, e.to + '에게', { fs: 18, c: C.sub })}`, { dy: 14 }); }).join('')),
      play: play(3600),
    },

    'k3-08:1': {
      alt: '편지지 위에 ① 받을 사람 사랑하는 할머니께, ② 첫인사, ③ 전하고 싶은 말, ④ 끝인사 할머니 건강하세요, ⑤ 쓴 날짜, ⑥ 쓴 사람 손자 지호 올림이 차례대로 놓인 편지 형식 그림',
      svg: SV(350, `
        <rect x="16" y="36" width="448" height="304" rx="14" fill="#fffdf6" stroke="#d2d2d7" stroke-width="2"/>
        ${g(200, `${num(40, 72, '1')}${tx(62, 79, '사랑하는 할머니께', { a: 'start', fs: 20, w: 800 })}${tx(450, 79, '받을 사람', { a: 'end', fs: 18, c: C.c })}`)}
        ${g(900, `${num(40, 114, '2')}${tx(62, 121, '할머니, 안녕하세요? 저 지호예요.', { a: 'start', fs: 20 })}${tx(450, 121, '첫인사', { a: 'end', fs: 18, c: C.c })}`)}
        ${g(1600, `${num(40, 172, '3')}${[0, 1, 2].map(k => `<rect x="62" y="${148 + k * 22}" width="${k === 2 ? 240 : 380}" height="10" rx="5" fill="${C.b}"/>`).join('')}
          ${card(300, 172, '전하고 싶은 말', { fs: 18, f: '#fff', s: C.d, c: C.d, h: 34 })}`)}
        ${g(2300, `${num(40, 238, '4')}${tx(62, 245, '할머니, 건강하세요.', { a: 'start', fs: 20 })}${tx(450, 245, '끝인사', { a: 'end', fs: 18, c: C.c })}`)}
        ${g(3000, `${num(262, 278, '5')}${tx(284, 285, '20○○년 5월 8일', { a: 'start', fs: 20 })}${tx(238, 285, '쓴 날짜', { a: 'end', fs: 18, c: C.c })}`)}
        ${g(3700, `${num(292, 316, '6')}${tx(314, 323, '손자 지호 올림', { a: 'start', fs: 20, w: 800 })}${tx(268, 323, '쓴 사람', { a: 'end', fs: 18, c: C.c })}`)}
      `),
      play: play(4300),
    },

    'k3-08:2': {
      alt: '서연아, 고마워라고만 쓰기보다 지난주 비 오는 날 우산을 같이 써 줘서라는 겪은 일, 정말 고마워라는 마음, 비에 젖을까 봐 걱정했는데 네 덕분에 마음이 따뜻해졌어라는 내 기분을 함께 쓰면 마음이 잘 전해지는 그림',
      svg: SV(320, `
        ${g(200, `${no(34, 46)}${tx(60, 54, '서연아, 고마워.', { a: 'start', fs: 22, c: C.sub })}${tx(250, 54, '무엇이 고마운지 몰라요', { a: 'start', fs: 18, c: RED })}`)}
        <line x1="20" y1="80" x2="460" y2="80" stroke="${LG}" stroke-width="2"/>
        ${g(1000, `${ok(34, 112)}${tx(60, 120, '서연아,', { a: 'start', fs: 22, w: 800 })}`)}
        ${[
          { y: 146, ls: ['지난주 비 오는 날', '우산을 같이 써 줘서'], n: '겪은 일', c: C.d, f: '#eef5ff' },
          { y: 214, ls: ['정말 고마워.'], n: '마음', c: C.c, f: '#fff4e6' },
          { y: 254, ls: ['비에 젖을까 봐 걱정했는데', '네 덕분에 마음이 따뜻해졌어.'], n: '내 기분', c: C.r, f: '#eaf6ed' },
        ].map((b, i) => { const h = b.ls.length * 28 + 10; return g(1700 + i * 1000, `${box(60, b.y, 316, h, { f: b.f, s: b.f, rx: 10 })}
          <rect x="60" y="${b.y}" width="6" height="${h}" rx="3" fill="${b.c}"/>
          ${b.ls.map((l, j) => tx(78, b.y + 26 + j * 28, l, { a: 'start', fs: 20 })).join('')}
          ${card(426, b.y + h / 2, b.n, { fs: 18, f: b.c, s: b.c, c: '#fff', h: 32 })}`, { dx: -14 }); }).join('')}
      `),
      play: play(4400),
    },

    'k3-08:3': {
      alt: '다 쓴 편지를 다시 읽으며 받을 사람, 첫인사, 끝인사, 날짜, 쓴 사람이 다 있는지, 겪은 일과 내 마음이 드러나는지, 높임 표현이 알맞은지 하나씩 확인하는 점검표 그림',
      svg: SV(300, `
        ${tx(30, 44, '형식', { a: 'start', fs: 20, c: C.c, w: 800 })}
        ${['받을 사람', '첫인사', '끝인사', '날짜', '쓴 사람'].map((s, i) => { const y = 82 + i * 44; return `${cbx(30, y, 500 + i * 600)}${tx(68, y + 7, s, { a: 'start', fs: 20 })}`; }).join('')}
        <line x1="200" y1="40" x2="200" y2="280" stroke="${LG}" stroke-width="2"/>
        ${tx(226, 44, '내용', { a: 'start', fs: 20, c: C.d, w: 800 })}
        ${[['겪은 일이', '드러나나요?'], ['내 마음이', '드러나나요?'], ['높임 표현은', '알맞나요?']].map((s, i) => { const y = 82 + i * 70; return `${cbx(226, y + 8, 3600 + i * 600)}${tx(264, y + 4, s[0], { a: 'start', fs: 20 })}${tx(264, y + 30, s[1], { a: 'start', fs: 20 })}`; }).join('')}
      `),
      play: play(5400),
    },
  });
})();
