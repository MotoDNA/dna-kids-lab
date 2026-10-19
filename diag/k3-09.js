/* 3학년 국어 · 이야기 속 인물은 지금 어떤 마음일까? (k3-09) */
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

  const pill = (cx, cy, s, col, fs = 18) => card(cx, cy, s, { fs, f: col, s: col, c: '#fff', h: fs + 14 });
  const POS = ['기쁘다', '설레다', '뿌듯하다', '반갑다', '고맙다'], NEG = ['속상하다', '서운하다', '억울하다', '걱정스럽다', '부끄럽다'];

  Object.assign(DIAG, {
    'k3-09:0': {
      alt: '준이가 한 말 에이, 또 졌잖아!와 공을 바닥에 던지고 씩씩거린 행동을 단서로 준이가 속상하고 화가 난 마음임을 짐작하는 그림',
      svg: SV(262, `
        ${g(200, `${box(16, 52, 250, 70, { f: '#eef5ff', s: C.b, rx: 14 })}${pill(56, 52, '말', C.d)}${tx(141, 98, '“에이, 또 졌잖아!”', { fs: 20, w: 800 })}`, { dx: -14 })}
        ${g(1100, `${box(16, 160, 250, 84, { f: '#eef5ff', s: C.b, rx: 14 })}${pill(60, 160, '행동', C.d)}${tx(141, 200, '공을 바닥에 던지고', { fs: 20 })}${tx(141, 228, '씩씩거렸어요', { fs: 20 })}`, { dx: -14 })}
        ${g(2100, `<path d="M272 88 Q300 88 312 130 M272 202 Q300 202 312 160" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linecap="round"/>${arrow(306, 145, 330, 145, C.sub, 3)}`)}
        ${g(2600, `${face(394, 128, 40, -1, RED, '#ffe0de')}
          <path d="M370 96 l14 6 M418 96 l-14 6" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
          ${tx(394, 202, '속상하고', { fs: 20, c: RED, w: 800 })}${tx(394, 230, '화가 난 마음', { fs: 20, c: RED, w: 800 })}`, { dx: -12 })}
      `),
      play: play(3300),
    },

    'k3-09:1': {
      alt: '이사 가는 날 단짝 친구와 헤어지게 된 상황을 보고 내가 저 인물이라면 하고 생각해 보니 슬프고 서운할 것 같다고 마음을 짐작하는 그림',
      svg: SV(320, `
        ${g(200, `${box(90, 34, 300, 74, { f: BG, s: '#d2d2d7', rx: 14 })}${pill(90, 34, '상황', C.sub)}${tx(240, 68, '이사 가는 날,', { fs: 20 })}${tx(240, 96, '단짝 친구와 헤어져요', { fs: 20 })}`, { dy: 10 })}
        ${g(1100, `${arrow(240, 114, 240, 140, C.sub, 3)}${person(180, 210, .62, C.d, C.b)}
          ${bubble(318, 168, '내가 저 인물이라면?', { fs: 20, side: 'l', s: C.d })}`, { dy: 10 })}
        ${g(2200, `${arrow(240, 216, 240, 238, C.sub, 3)}${box(90, 244, 300, 64, { f: '#eef5ff', s: C.d, rx: 14 })}${pill(90, 244, '마음', C.d)}
          ${face(142, 276, 20, -1, C.d, C.b)}${tx(176, 284, '슬프고 서운할 것 같아요', { a: 'start', fs: 20, c: C.d, w: 800 })}`, { dy: 10 })}
      `),
      play: play(3000),
    },

    'k3-09:2': {
      alt: '기분 좋은 마음을 나타내는 말 기쁘다, 설레다, 뿌듯하다, 반갑다, 고맙다와 기분이 좋지 않은 마음을 나타내는 말 속상하다, 서운하다, 억울하다, 걱정스럽다, 부끄럽다를 두 무리로 나눈 그림',
      svg: SV(336, `<g transform="translate(0,16)">
        ${[[POS, 1, C.r, GN, '기분 좋은 마음', 120], [NEG, -1, C.d, C.b, '기분이 좋지 않은 마음', 360]].map(([ws, m, col, f, lab, cx], k) => `
          ${g(200 + k * 2200, `${face(cx - 84, 44, 20, m, col, f)}${tx(cx - 56, 50, lab, { a: 'start', fs: 18, c: col, w: 800 })}`)}
          ${ws.map((w, i) => g(600 + k * 2200 + i * 320, card(cx, 102 + i * 46, w, { fs: 20, w: 150, h: 38, f: '#fff', s: col }), { dy: 10, d: 350 })).join('')}`).join('')}
        <line x1="240" y1="80" x2="240" y2="300" stroke="${LG}" stroke-width="2"/>
      </g>`),
      play: play(4600),
    },

    'k3-09:3': {
      alt: '이야기 처음에는 발표 순서를 기다리며 가슴이 두근거리는 떨림이었다가, 발표를 마치자 친구들이 손뼉을 쳐 준 까닭으로 끝에는 뿌듯함으로 마음이 바뀌는 그림',
      svg: SV(300, `
        <line x1="40" y1="240" x2="440" y2="240" stroke="${LG}" stroke-width="4" stroke-linecap="round"/>
        ${g(200, `${face(80, 100, 36, 0, PU, '#efdcf7')}<path d="M118 76 q8 8 0 16 M126 70 q12 14 0 28" fill="none" stroke="${PU}" stroke-width="2.5" stroke-linecap="round"/>
          ${tx(80, 168, '떨림', { fs: 22, c: PU, w: 800 })}${tx(80, 196, '두근두근', { fs: 18, c: C.sub })}
          <circle cx="80" cy="240" r="8" fill="${PU}"/>${tx(80, 276, '처음', { fs: 20, c: C.ink, w: 800 })}`)}
        ${g(1300, `${box(170, 70, 140, 96, { f: BG, s: '#d2d2d7', rx: 14 })}${pill(240, 70, '까닭', C.sub)}
          ${tx(240, 110, '발표를 마치자', { fs: 18 })}${tx(240, 136, '친구들이', { fs: 18 })}${tx(240, 158, '손뼉을 쳐 줌', { fs: 18 })}
          ${arrow(140, 118, 164, 118, C.sub, 3)}${arrow(316, 118, 340, 118, C.sub, 3)}`)}
        ${g(2400, `${face(400, 100, 36, 1, C.c, C.a)}
          ${tx(400, 168, '뿌듯함', { fs: 22, c: C.c, w: 800 })}
          <circle cx="400" cy="240" r="8" fill="${C.c}"/>${tx(400, 276, '끝', { fs: 20, c: C.ink, w: 800 })}`)}
        ${g(2400, `<path d="M88 240 H392" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>`, { d: 900 })}
      `),
      play: play(3400),
    },
  });
})();
