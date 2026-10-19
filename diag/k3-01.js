/* 4학년 국어 · 처음 보는 낱말, 뜻을 어떻게 알아낼까? (k3-01) */
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

  // 왼쪽 정렬 문장에서 부분 위치 구하기
  const at = (x0, before, part, fs) => ({ x: x0 + tw(before, fs), w: tw(part, fs) });
  const hl = (p, y, fs, col, pad = 4) => `<rect x="${p.x - pad}" y="${y - fs * .95}" width="${p.w + pad * 2}" height="${fs * 1.3}" rx="7" fill="${col}"/>`;

  /* 0 */
  const F0 = 24, X0 = 30;
  const c1 = at(X0, '동생은 ', '배가 고파서', F0), wd = at(X0, '밥을 ', '허겁지겁', F0), c2 = at(X0, '숟가락이 ', '쉴 틈이 없었어요', F0);
  /* 1 */
  const S1 = '할머니 댁 마당은 아주', F1 = 24, sx = 24 + tw(S1, F1) + 12 + 74;

  Object.assign(DIAG, {
    'k3-01:0': {
      alt: '동생은 배가 고파서 밥을 허겁지겁 먹었어요. 숟가락이 쉴 틈이 없었어요. 라는 문장에서 배가 고파서, 쉴 틈이 없었어요 라는 단서를 찾아 허겁지겁이 아주 급하게 서두르는 모양이라고 짐작하는 그림',
      svg: SV(300, `
        ${g(1400, hl(c1, 80, F0, GN))}
        ${g(2200, hl(c2, 176, F0, GN))}
        ${g(400, `<rect x="${wd.x - 6}" y="${128 - F0 * .98}" width="${wd.w + 12}" height="${F0 * 1.36}" rx="8" fill="#fff" stroke="${C.c}" stroke-width="3"/>`)}
        ${tx(X0, 80, '동생은 배가 고파서', { a: 'start', fs: F0 })}
        <text x="${X0}" y="128" font-size="${F0}" font-weight="700" fill="${C.ink}">밥을 <tspan fill="${C.c}" font-weight="800">허겁지겁</tspan> 먹었어요.</text>
        ${tx(X0, 176, '숟가락이 쉴 틈이 없었어요.', { a: 'start', fs: F0 })}
        ${g(400, tx(392, 128, '무슨 뜻?', { fs: 18, c: C.c }))}
        ${g(1600, card(c1.x + c1.w + 50, 72, '단서', { fs: 18, f: C.r, s: C.r, c: '#fff', h: 32 }))}
        ${g(2400, card(c2.x + c2.w + 50, 168, '단서', { fs: 18, f: C.r, s: C.r, c: '#fff', h: 32 }))}
        <line x1="20" y1="206" x2="460" y2="206" stroke="${LG}" stroke-width="2"/>
        ${g(3300, `${card(80, 254, '허겁지겁', { fs: 20, c: C.c, s: C.c })}${arrow(138, 254, 166, 254, C.sub, 3.5)}
          ${card(318, 254, '아주 급하게 서두르는 모양', { fs: 20, f: C.b, s: C.d })}`, { dx: -20 })}
      `),
      play: play(4200),
    },

    'k3-01:1': {
      alt: '할머니 댁 마당은 아주 널찍했어요 에서 널찍했어요 자리에 넓었어요를 넣어 읽어도 자연스러우므로 널찍하다는 꽤 넓다는 뜻임을 보여 주는 그림',
      svg: SV(310, `
        ${tx(24, 72, S1, { a: 'start', fs: F1 })}
        ${card(sx, 64, '널찍했어요.', { fs: F1, w: 148, h: 48, c: C.c, s: C.c })}
        ${g(700, `${arrow(sx, 96, sx, 132, C.sub, 3.5)}${tx(sx - 18, 120, '바꾸어 넣기', { a: 'end', fs: 18, c: C.sub })}`)}
        ${tx(24, 178, S1, { a: 'start', fs: F1 })}
        <rect x="${sx - 74}" y="146" width="148" height="48" rx="12" fill="none" stroke="#c7c7cc" stroke-width="2" stroke-dasharray="6 5"/>
        ${g(1200, card(sx, 170, '넓었어요.', { fs: F1, w: 148, h: 48, f: C.b, s: C.d, c: C.d }), { dy: -40, d: 800 })}
        ${g(2300, `${chk(sx - 54, 222, C.r, 1)}${tx(sx - 36, 230, '자연스러워요', { a: 'start', fs: 20, c: C.r, w: 800 })}`)}
        <line x1="20" y1="252" x2="460" y2="252" stroke="${LG}" stroke-width="2"/>
        ${g(3200, `<text x="240" y="290" text-anchor="middle" font-size="24" font-weight="800" fill="${C.ink}"><tspan fill="${C.c}">널찍하다</tspan> = <tspan fill="${C.d}">꽤 넓다</tspan></text>`, { dy: 10 })}
      `),
      play: play(4000),
    },

    'k3-01:2': {
      alt: '맨발을 맨과 발로 나누면 맨-은 다른 것이 없는 이라는 뜻이라 신을 신지 않은 발임을 알 수 있고, 책가방은 책과 가방, 눈사람은 눈과 사람으로 나누어 뜻을 짐작하는 그림',
      svg: SV(330, `
        ${card(64, 66, '맨발', { fs: 28, w: 96, h: 56, f: BG })}
        ${g(400, arrow(122, 66, 154, 66, C.sub, 3.5))}
        ${g(600, card(206, 66, '맨', { fs: 28, w: 60, h: 56, f: C.a, s: C.c, c: C.c }), { dx: -80 })}
        ${g(800, tx(256, 76, '+', { fs: 26, c: C.sub }))}
        ${g(900, card(306, 66, '발', { fs: 28, w: 60, h: 56, f: C.b, s: C.d, c: C.d }), { dx: -150 })}
        ${g(1700, `<text x="190" y="126" text-anchor="middle" font-size="20" font-weight="700" fill="${C.c}">맨- : 다른 것이 없는</text>`)}
        ${g(2500, tx(240, 166, '→ 양말이나 신을 신지 않은 발', { fs: 20, c: C.ink }))}
        <line x1="20" y1="192" x2="460" y2="192" stroke="${LG}" stroke-width="2"/>
        ${[['책가방', '책', '가방', '책을 넣는 가방'], ['눈사람', '눈', '사람', '눈으로 만든 사람 모양']].map((r, i) => { const y = 232 + i * 64, t = 3200 + i * 1100; return g(t, `
          ${card(54, y, r[0], { fs: 20, w: 84, h: 44, f: BG })}
          ${tx(108, y + 8, '=', { fs: 22, c: C.sub })}
          ${card(140, y, r[1], { fs: 20, w: 46, h: 44, f: C.a, s: C.c })}
          ${tx(172, y + 7, '+', { fs: 22, c: C.sub })}
          ${card(212, y, r[2], { fs: 20, w: 64, h: 44, f: C.b, s: C.d })}
          ${arrow(252, y, 274, y, C.sub, 3)}
          ${tx(282, y + 7, r[3], { a: 'start', fs: 18, c: C.ink })}`, { dx: -16 }); }).join('')}
      `),
      play: play(4800),
    },

    'k3-01:3': {
      alt: '허겁지겁의 뜻을 급하게 서두르는 모양이라고 짐작한 것과 국어사전의 뜻 조급한 마음으로 몹시 허둥거리는 모양을 비교해 보니 비슷한 그림',
      svg: SV(300, `
        ${tx(30, 44, '허겁지겁', { a: 'start', fs: 22, c: C.ink, w: 800 })}
        ${g(300, `${card(64, 96, '짐작', { fs: 20, w: 72, h: 38, f: C.c, s: C.c, c: '#fff' })}
          ${box(112, 70, 348, 52, { f: C.a, s: C.c, rx: 12 })}
          ${tx(130, 104, '급하게 서두르는 모양', { a: 'start', fs: 22 })}`, { dx: -20 })}
        ${g(1400, `${card(64, 178, '사전', { fs: 20, w: 72, h: 38, f: C.d, s: C.d, c: '#fff' })}
          ${box(112, 144, 348, 86, { f: '#eef5ff', s: C.d, rx: 12 })}
          ${tx(130, 178, '조급한 마음으로 몹시', { a: 'start', fs: 22 })}
          ${tx(130, 212, '허둥거리는 모양', { a: 'start', fs: 22 })}`, { dx: -20 })}
        ${g(2600, [at(130, '', '급하게', 22), at(130, '급하게 ', '서두르는', 22)].map(p => hl(p, 104, 22, GN, 3)).join('') + [at(130, '', '조급한', 22)].map(p => hl(p, 178, 22, GN, 3)).join('') + [at(130, '', '허둥거리는', 22)].map(p => hl(p, 212, 22, GN, 3)).join(''))}
        ${g(2600, tx(130, 104, '급하게 서두르는 모양', { a: 'start', fs: 22 }) + tx(130, 178, '조급한 마음으로 몹시', { a: 'start', fs: 22 }) + tx(130, 212, '허둥거리는 모양', { a: 'start', fs: 22 }))}
        ${g(3400, `${chk(176, 264, C.r, 1.2)}${tx(196, 272, '뜻이 비슷해요!', { a: 'start', fs: 22, c: C.r, w: 800 })}`, { dy: 8 })}
      `),
      play: play(4200),
    },
  });
})();
