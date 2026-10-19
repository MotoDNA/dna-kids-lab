/* 4학년 국어 · 감기가 ‘낫다’일까, ‘낳다’일까? (k3-05) */
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
  const line = (x, y, parts, fs = 22, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" font-size="${fs}" font-weight="${o.w || 700}" fill="${o.c || C.ink}">${parts.map(([s, c]) => c ? `<tspan fill="${c}" font-weight="800">${s}</tspan>` : s).join('')}</text>`;
  const strike = (p, y, fs) => `<line x1="${p.x - 2}" y1="${y - fs * .32}" x2="${p.x + p.w + 2}" y2="${y - fs * .32}" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>`;

  const W0 = [
    { w: '낫다', s: '[낟따]', m: '병이 없어지다', e: '감기가 다 나았어요.', c: C.d },
    { w: '낮다', s: '[낟따]', m: '높지 않다', e: '담장이 낮아요.', c: C.r },
    { w: '낳다', s: '[나타]', m: '아기·알을 내놓다', e: '닭이 알을 낳았어요.', c: C.c },
  ];
  const W1 = [
    [[['가'], ['르치', C.d], ['다']], '지식을 알려 주다', [['가'], ['리키', C.c], ['다']], '손가락으로 집어 보이다'],
    [[['잃', C.d], ['어버리다']], '물건이 없어지다', [['잊', C.c], ['어버리다']], '기억하지 못하다'],
    [[['맞'], ['히', C.d], ['다']], '정답을 골라내다', [['맞'], ['추', C.c], ['다']], '제자리에 끼우다'],
  ];

  Object.assign(DIAG, {
    'k3-05:0': {
      alt: '낫다와 낮다는 둘 다 낟따로 소리 나고 낳다는 나타로 소리 나지만, 낫다는 병이 없어지다, 낮다는 높지 않다, 낳다는 아기나 알을 내놓다라는 뜻으로 서로 다른 것을 예문과 함께 보여 주는 그림',
      svg: SV(310, `
        ${W0.map((r, i) => { const y = 80 + i * 84, t = 300 + i * 1100; return `
          ${g(t, `${card(56, y, r.w, { fs: 26, w: 88, h: 54, f: '#fff', s: r.c, c: r.c, sw: 3 })}`)}
          ${g(t + 300, tx(150, y + 8, r.s, { fs: 22, c: i < 2 ? PU : C.sub, w: 800 }))}
          ${g(t + 600, `${tx(206, y - 2, r.m, { a: 'start', fs: 20, c: C.ink, w: 800 })}${tx(206, y + 26, r.e, { a: 'start', fs: 18, c: C.sub, w: 600 })}`, { dx: -14 })}`; }).join('')}
        ${g(3700, `<rect x="114" y="50" width="72" height="144" rx="14" fill="none" stroke="${PU}" stroke-width="2.5" stroke-dasharray="6 5"/>
          ${tx(150, 36, '소리가 같아요', { fs: 18, c: PU, w: 800 })}`)}
      `),
      play: play(4300),
    },

    'k3-05:1': {
      alt: '가르치다는 지식을 알려 주다, 가리키다는 손가락으로 집어 보이다, 잃어버리다는 물건이 없어지다, 잊어버리다는 기억하지 못하다, 맞히다는 정답을 골라내다, 맞추다는 제자리에 끼우다라는 뜻으로 짝지어 비교하는 그림',
      svg: SV(300, `
        <line x1="240" y1="40" x2="240" y2="280" stroke="${LG}" stroke-width="2"/>
        ${W1.map((r, i) => { const y = 64 + i * 86, t = 300 + i * 1300; return `
          ${g(t, `${line(125, y, r[0], 26, { a: 'middle' })}${tx(125, y + 30, r[1], { fs: 18, c: C.sub })}`, { dy: 8 })}
          ${g(t + 600, `${line(355, y, r[2], 26, { a: 'middle' })}${tx(355, y + 30, r[3], { fs: 18, c: C.sub })}`, { dy: 8 })}`; }).join('')}
      `),
      play: play(3800),
    },

    'k3-05:2': (() => {
      const F = 22, X = 40, s1 = '밥을 안 먹었어요.', s2 = '밥을 먹지 않았어요.';
      const a1 = at(X, '밥을 ', '안', F), a2 = at(X, '밥을 먹지 ', '않', F);
      return {
        alt: '안은 아니를 줄인 말로 빼도 밥을 먹었어요처럼 문장이 되지만, 않은 아니하를 줄인 말로 빼면 밥을 먹지 았어요처럼 어색해지는 것을 보여 주는 그림',
        svg: SV(310, `
          ${card(100, 40, '안 = 아니', { fs: 22, f: '#eef5ff', s: C.d, c: C.d })}
          ${card(300, 40, '않 = 아니하', { fs: 22, f: '#fff4e6', s: C.c, c: C.c })}
          ${g(300, `${hl(a1, 112, F, C.b)}${tx(X, 112, s1, { a: 'start', fs: F })}`)}
          ${g(1300, `${tx(X, 154, '빼 보면', { a: 'start', fs: 18, c: C.sub })}${line(X + 76, 154, [['밥을 먹었어요.']], F)}${chk(X + 76 + tw('밥을 먹었어요.', F) + 22, 146, C.r)}
            ${tx(X + 76 + tw('밥을 먹었어요.', F) + 40, 154, '문장이 돼요', { a: 'start', fs: 18, c: C.r, w: 800 })}`, { dx: -14 })}
          <line x1="20" y1="184" x2="460" y2="184" stroke="${LG}" stroke-width="2"/>
          ${g(2600, `${hl(a2, 226, F, C.a)}${tx(X, 226, s2, { a: 'start', fs: F })}`)}
          ${g(3600, `${tx(X, 268, '빼 보면', { a: 'start', fs: 18, c: C.sub })}${line(X + 76, 268, [['밥을 먹지 '], ['았어요', RED], ['.']], F)}${no(X + 76 + tw('밥을 먹지 았어요.', F) + 20, 261, 8)}
            ${tx(X + 76 + tw('밥을 먹지 았어요.', F) + 38, 268, '어색해요', { a: 'start', fs: 18, c: RED, w: 800 })}`, { dx: -14 })}
        `),
        play: play(4400),
      };
    })(),

    'k3-05:3': (() => {
      const PR = [['몇일', '며칠'], ['금새', '금세'], ['설겆이', '설거지'], ['어떻해', '어떡해']];
      const F = 22;
      return {
        alt: '몇일은 며칠, 금새는 금세, 설겆이는 설거지, 어떻해는 어떡해로 바르게 쓰고, 되와 돼가 헷갈리면 하와 해를 넣어 안 해요가 어울리면 돼, 하고가 어울리면 되를 쓰는 그림',
        svg: SV(330, `
          ${PR.map(([a, b], i) => { const cx = 120 + (i % 2) * 230, y = 52 + Math.floor(i / 2) * 52, wa = tw(a, F), wb = tw(b, F), x0 = cx - (wa + wb + 40) / 2;
            return g(200 + i * 600, `${tx(x0, y, a, { a: 'start', fs: F, c: C.sub, w: 600 })}${strike({ x: x0, w: wa }, y, F)}
              ${arrow(x0 + wa + 8, y - 7, x0 + wa + 30, y - 7, '#c7c7cc', 2.5)}${tx(x0 + wa + 40, y, b, { a: 'start', fs: F, c: C.r, w: 800 })}`, { dy: 8 }); }).join('')}
          <line x1="20" y1="130" x2="460" y2="130" stroke="${LG}" stroke-width="2"/>
          ${g(2800, `${tx(24, 170, '되 · 돼 헷갈리면', { a: 'start', fs: 20, c: C.ink, w: 800 })}
            ${card(268, 162, '하 → 되', { fs: 22, f: '#eef5ff', s: C.d, c: C.d })}${card(386, 162, '해 → 돼', { fs: 22, f: '#fff4e6', s: C.c, c: C.c })}`)}
          ${g(3600, `${line(24, 230, [['그러면 안 '], ['돼', C.c], ['요.']], F)}${tx(250, 230, '← 안 해요', { a: 'start', fs: 20, c: C.c, w: 800 })}${ok(372, 223, 10, C.c)}`, { dx: -14 })}
          ${g(4400, `${line(24, 286, [['의사가 '], ['되', C.d], ['고 싶어요.']], F)}${tx(250, 286, '← 하고', { a: 'start', fs: 20, c: C.d, w: 800 })}${ok(334, 279, 10, C.d)}`, { dx: -14 })}
        `),
        play: play(5000),
      };
    })(),
  });
})();
