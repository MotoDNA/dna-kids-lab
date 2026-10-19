/* 4학년 국어 · 왜 그런 일이 일어났을까? (k3-06) */
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

  const CB = '#eef5ff', CO = '#fff4e6';
  const pill = (cx, cy, s, col) => card(cx, cy, s, { fs: 18, f: col, s: col, c: '#fff', h: 32 });
  // 블록: [글자, 종류] 종류 c=원인, r=결과, k=이어 주는 말
  const blk = (x, y, s, k) => { const w = tw(s, 18) + 22, f = k === 'c' ? CB : k === 'r' ? CO : '#fff', st = k === 'c' ? C.d : k === 'r' ? C.c : C.sub;
    return { w, svg: `<rect x="${x}" y="${y - 21}" width="${w}" height="42" rx="10" fill="${f}" stroke="${st}" stroke-width="${k === 'k' ? 2.5 : 2}"${k === 'k' ? '' : ''}/>${tx(x + w / 2, y + 6, s, { fs: 18, c: k === 'k' ? C.ink : C.ink, w: k === 'k' ? 800 : 700 })}` }; };
  const row = (y, parts, t) => { let x = 0; const items = parts.map(([s, k]) => { const b = blk(x, y, s, k); x += b.w + 8; return b; }); const off = (480 - (x - 8)) / 2;
    return g(t, `<g transform="translate(${off},0)">${items.map(b => b.svg).join('')}</g>`, { dx: -14 }); };

  Object.assign(DIAG, {
    'k3-06:0': {
      alt: '원인인 밤새 눈이 많이 내렸어요가 먼저 일어나고, 그 때문에 결과인 길이 미끄러워졌어요가 뒤에 일어나는 것을 화살표로 보여 주는 그림',
      svg: SV(312, `<g transform="translate(0,12)">
        ${g(200, `${box(20, 44, 190, 170, { f: CB, s: C.d, rx: 16 })}${pill(115, 44, '원인', C.d)}
          <path d="M80 104 a16 16 0 0 1 22 -18 a22 22 0 0 1 40 4 a14 14 0 0 1 8 26 H86 a12 12 0 0 1 -6 -12 Z" fill="#fff" stroke="${C.d}" stroke-width="2.5" stroke-linejoin="round"/>
          ${[[90, 132], [112, 140], [134, 130], [100, 152], [124, 156], [146, 148]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="${C.d}" stroke-width="2"/>`).join('')}
          ${tx(115, 184, '밤새 눈이 많이', { fs: 18 })}${tx(115, 206, '내렸어요.', { fs: 18 })}`)}
        ${g(1200, arrow(218, 129, 262, 129, C.ink, 4), { dx: -20 })}
        ${g(1700, `${box(270, 44, 190, 170, { f: CO, s: C.c, rx: 16 })}${pill(365, 44, '결과', C.c)}
          <path d="M300 146 H430" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"/>
          <path d="M306 140 Q340 130 368 140 Q396 150 424 140" fill="none" stroke="${C.b}" stroke-width="6" stroke-linecap="round"/>
          <path d="M352 116 l8 -8 M368 112 l0 -12 M384 116 l-8 -8" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/>
          ${tx(365, 184, '길이', { fs: 18 })}${tx(365, 206, '미끄러워졌어요.', { fs: 18 })}`, { dx: -20 })}
        ${g(2700, `${arrow(30, 254, 450, 254, '#c7c7cc', 3)}${tx(115, 284, '먼저', { fs: 20, c: C.d, w: 800 })}${tx(365, 284, '나중', { fs: 20, c: C.c, w: 800 })}`)}
      </g>`),
      play: play(3400),
    },

    'k3-06:1': {
      alt: '그래서, -아서/-어서 뒤에는 결과 소풍이 미루어졌어요가 오고, 왜냐하면 뒤에는 원인 비가 왔기 때문이에요가 오는 것을 색 블록으로 보여 주는 그림',
      svg: SV(290, `
        <rect x="24" y="22" width="18" height="18" rx="4" fill="${CB}" stroke="${C.d}" stroke-width="2"/>${tx(50, 38, '원인', { a: 'start', fs: 18, c: C.d, w: 800 })}
        <rect x="104" y="22" width="18" height="18" rx="4" fill="${CO}" stroke="${C.c}" stroke-width="2"/>${tx(130, 38, '결과', { a: 'start', fs: 18, c: C.c, w: 800 })}
        ${row(92, [['비가 왔어요.', 'c'], ['그래서', 'k'], ['소풍이 미루어졌어요.', 'r']], 300)}
        ${row(162, [['비가 와서', 'c'], ['소풍이 미루어졌어요.', 'r']], 1500)}
        ${row(232, [['소풍이 미루어졌어요.', 'r'], ['왜냐하면', 'k'], ['비가 왔기 때문이에요.', 'c']], 2700)}
        ${g(3600, `${tx(24, 282, '왜냐하면 뒤에는 원인이 와요', { a: 'start', fs: 18, c: C.d, w: 800 })}`)}
      `),
      play: play(4200),
    },

    'k3-06:2': {
      alt: '결과인 화분의 식물이 시들었어요를 보고 왜 그렇게 되었을까 물어서 원인인 일주일 동안 물을 주지 않았어요를 찾는 그림',
      svg: SV(312, `<g transform="translate(0,12)">
        ${g(200, `${box(20, 44, 190, 196, { f: CO, s: C.c, rx: 16 })}${pill(115, 44, '결과', C.c)}
          <path d="M92 150 H138 L132 182 H98 Z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M115 150 V118 Q115 98 100 106" fill="none" stroke="${C.r}" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M100 106 q-14 2 -18 18 q12 -2 18 -18 Z" fill="${GN}" stroke="${C.r}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M115 128 q14 4 16 22 q-12 -6 -16 -22 Z" fill="${GN}" stroke="${C.r}" stroke-width="2.5" stroke-linejoin="round"/>
          ${tx(115, 210, '화분의 식물이', { fs: 18 })}${tx(115, 232, '시들었어요.', { fs: 18 })}`)}
        ${g(1300, `${arrow(218, 142, 262, 142, C.ink, 4)}${card(240, 108, '왜?', { fs: 22, f: '#fff', s: '#fff', c: RED, h: 34, px: 10 })}`, { dx: -16 })}
        ${g(2300, `${box(270, 44, 190, 196, { f: CB, s: C.d, rx: 16 })}${pill(365, 44, '원인', C.d)}
          <g transform="translate(0,-14)"><rect x="338" y="112" width="52" height="50" rx="8" fill="#fff" stroke="${C.d}" stroke-width="3"/>
          <path d="M388 150 L420 116" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/><path d="M414 110 l12 12" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
          <path d="M340 122 Q318 136 340 152" fill="none" stroke="${C.d}" stroke-width="3.5"/></g>
          ${tx(365, 186, '빈 물뿌리개', { fs: 18, c: C.sub })}
          ${tx(365, 210, '일주일 동안 물을', { fs: 18 })}${tx(365, 232, '주지 않았어요.', { fs: 18 })}`, { dx: -16 })}
        ${g(3200, tx(240, 284, '“왜 그렇게 되었을까?” → 답이 원인', { fs: 20, c: C.ink, w: 800 }))}
      </g>`),
      play: play(3800),
    },

    'k3-06:3': {
      alt: '원인과 결과를 두 칸 표로 정리하여 이를 잘 닦지 않아요는 충치가 생겨요로, 운동을 꾸준히 해요는 몸이 튼튼해져요로 화살표로 잇는 그림',
      svg: SV(250, `
        ${g(200, `${card(115, 50, '원인', { fs: 20, w: 190, h: 40, f: C.d, s: C.d, c: '#fff' })}${card(365, 50, '결과', { fs: 20, w: 190, h: 40, f: C.c, s: C.c, c: '#fff' })}`)}
        ${[['이를 잘 닦지 않아요.', '충치가 생겨요.'], ['운동을 꾸준히 해요.', '몸이 튼튼해져요.']].map(([a, b], i) => { const y = 122 + i * 76, t = 700 + i * 1500; return `
          ${g(t, card(115, y, a, { fs: 20, w: 190, h: 56, f: CB, s: C.b }))}
          ${g(t + 500, arrow(216, y, 264, y, C.ink, 3.5), { dx: -16 })}
          ${g(t + 800, card(365, y, b, { fs: 20, w: 190, h: 56, f: CO, s: C.a }))}`; }).join('')}
      `),
      play: play(3800),
    },
  });
})();
