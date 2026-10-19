/* 3학년 국어 · ‘먹었다’는 왜 국어사전에 없을까? (k3-04) */
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

  const CONS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split(''), DBL = 'ㄲㄸㅃㅆㅉ';
  const VOW = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split(''), CMP = 'ㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ';
  const cell = (cx, cy, ch, hi, t) => g(t, `<rect x="${cx - 19}" y="${cy - 21}" width="38" height="42" rx="9" fill="${hi ? C.a : '#eef5ff'}" stroke="${hi ? C.c : C.b}" stroke-width="2"/>
    ${tx(cx, cy + 9, ch, { fs: 24, c: hi ? C.c : C.d, w: 800 })}`, { d: 300 });
  const grid = (arr, hiSet, y0, per, t0) => arr.map((ch, i) => { const r = Math.floor(i / per), k = i % per, n = Math.min(per, arr.length - r * per);
    return cell(240 + (k - (n - 1) / 2) * 42, y0 + r * 50, ch, hiSet.includes(ch), t0 + i * 90); }).join('');

  /* 3 */
  const FORMS = ['먹었다', '먹고', '먹어서', '먹으니'];

  Object.assign(DIAG, {
    'k3-04:0': {
      alt: '글자 각을 첫 자음자 ㄱ, 모음자 ㅏ, 받침 ㄱ으로 나누어 이 순서대로 비교하고, 받침이 없는 가가 받침 있는 각보다 먼저 나오는 것을 보여 주는 그림',
      svg: SV(310, `
        ${box(30, 54, 130, 150, { f: BG, s: BG, rx: 18 })}
        ${tx(95, 156, '각', { fs: 80, w: 800 })}
        ${[['ㄱ', '① 첫 자음자', C.d], ['ㅏ', '② 모음자', C.c], ['ㄱ', '③ 받침', C.r]].map(([j, s, c], i) => { const y = 66 + i * 64, t = 500 + i * 1000; return g(t, `
          ${arrow(168, 129, 214, y, '#c7c7cc', 2.5)}
          <rect x="222" y="${y - 25}" width="50" height="50" rx="12" fill="#fff" stroke="${c}" stroke-width="3"/>
          ${tx(247, y + 10, j, { fs: 28, c, w: 800 })}
          ${tx(288, y + 8, s, { a: 'start', fs: 22, c, w: 800 })}`, { dx: -20 }); }).join('')}
        <line x1="20" y1="232" x2="460" y2="232" stroke="${LG}" stroke-width="2"/>
        ${g(3600, `${card(70, 274, '가', { fs: 26, w: 56, h: 50, f: '#fff', s: C.d })}${arrow(106, 274, 136, 274, C.sub, 3)}${card(170, 274, '각', { fs: 26, w: 56, h: 50, f: '#fff', s: C.d })}
          ${tx(216, 282, '받침 없는 글자가 먼저', { a: 'start', fs: 20, c: C.sub })}`)}
      `),
      play: play(4400),
    },

    'k3-04:1': {
      alt: '국어사전의 자음자 순서 ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ와 모음자 순서 ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ를 보여 주고, 된소리와 합쳐진 모음자를 주황색으로 표시한 그림',
      svg: SV(340, `
        ${tx(24, 38, '자음자', { a: 'start', fs: 20, c: C.ink, w: 800 })}
        ${grid(CONS, DBL, 72, 10, 200)}
        ${tx(24, 172, '모음자', { a: 'start', fs: 20, c: C.ink, w: 800 })}
        ${grid(VOW, CMP, 212, 11, 2100)}
        ${g(4300, `<rect x="24" y="300" width="18" height="18" rx="4" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>
          ${tx(50, 316, '된소리 · 두 모음이 합쳐진 모음자', { a: 'start', fs: 18, c: C.c, w: 800 })}`)}
      `),
      play: play(4900),
    },

    'k3-04:2': {
      alt: '나무, 가방, 누나 카드를 첫 자음자 ㄱ이 앞이므로 가방을 맨 앞에, ㄴ이 같은 나무와 누나는 모음자 ㅏ가 ㅜ보다 앞이므로 나무를 먼저 놓아 가방, 나무, 누나 순서로 세우고, 받침은 가, 각, 간 순서임을 보여 주는 그림',
      svg: SV(340, `
        ${[['나무', 90], ['가방', 240], ['누나', 390]].map(([s, x]) => box(x - 50, 46, 100, 48, { f: '#fff', s: '#d2d2d7', da: '6 5', rx: 12 }) + tx(x, 78, s, { fs: 22, c: '#c7c7cc' })).join('')}
        ${tx(24, 30, '처음', { a: 'start', fs: 18, c: C.sub })}
        ${[['가방', 90, 150, '①'], ['나무', 240, -150, '②'], ['누나', 390, 0, '③']].map(([s, x, dx, n], i) => g(600 + i * 900, `${card(x, 150, s, { fs: 24, w: 100, h: 52, f: C.b, s: C.d })}
          ${tx(x - 62, 158, n, { fs: 20, c: C.d, w: 800 })}`, { dx, dy: -80, d: 800 })).join('')}
        ${g(3400, `${tx(90, 206, 'ㄱ', { fs: 22, c: C.c, w: 800 })}
          <text x="240" y="206" text-anchor="middle" font-size="22" font-weight="800" fill="${C.sub}">ㄴ <tspan fill="${C.c}">ㅏ</tspan></text>
          <text x="390" y="206" text-anchor="middle" font-size="22" font-weight="800" fill="${C.sub}">ㄴ <tspan fill="${C.c}">ㅜ</tspan></text>`)}
        <line x1="20" y1="232" x2="460" y2="232" stroke="${LG}" stroke-width="2"/>
        ${[['가', '받침 없음'], ['각', 'ㄱ'], ['간', 'ㄴ']].map(([s, l], i) => { const x = 90 + i * 150; return g(4200 + i * 400, `${card(x, 274, s, { fs: 26, w: 56, h: 50, f: '#fff', s: C.d })}
          ${tx(x, 324, l, { fs: 18, c: C.sub })}${i < 2 ? arrow(x + 40, 274, x + 108, 274, C.sub, 3) : ''}`); }).join('')}
      `),
      play: play(5400),
    },

    'k3-04:3': {
      alt: '먹었다, 먹고, 먹어서, 먹으니에서 바뀌지 않는 부분 먹-에 -다를 붙여 기본형 먹다로 찾는 그림과, 읽다, 작다, 뛰다의 예',
      svg: SV(352, `
        ${FORMS.map((f, i) => { const x = 66 + i * 116, w = tw(f, 24) + 31; return g(200 + i * 400, `
          ${box(x - w / 2, 48, w, 50, { f: BG, s: BG })}
          <text x="${x - w / 2 + 12}" y="82" font-size="24" font-weight="700" fill="${C.sub}"><tspan fill="${C.d}" font-weight="800">먹</tspan><tspan dx="7">${f.slice(1)}</tspan></text>`, { dy: 10 }); }).join('')}
        ${g(2000, FORMS.map((f, i) => { const x = 66 + i * 116, w = tw(f, 24) + 31, cx = x - w / 2 + 12 + tw('먹', 24) / 2; return `<rect x="${cx - 14}" y="${74 - 17}" width="28" height="34" rx="8" fill="none" stroke="${C.d}" stroke-width="3"/>
          <path d="M${cx} 106 L160 144" stroke="${C.b}" stroke-width="3"/>`; }).join(''))}
        ${g(2900, `${card(160, 172, '먹-', { fs: 26, w: 80, h: 52, f: C.b, s: C.d, c: C.d })}${tx(222, 181, '+', { fs: 26, c: C.sub })}
          ${card(270, 172, '-다', { fs: 26, w: 70, h: 52, f: C.a, s: C.c, c: C.c })}${tx(326, 181, '=', { fs: 26, c: C.sub })}
          ${card(394, 172, '먹다', { fs: 28, w: 96, h: 56, f: '#fff', s: C.ink, sw: 3 })}${tx(394, 222, '기본형', { fs: 18, c: C.ink })}`, { dy: 14 })}
        <line x1="20" y1="242" x2="460" y2="242" stroke="${LG}" stroke-width="2"/>
        ${[['읽고, 읽어서, 읽으니', '읽다'], ['작아서, 작고, 작으니', '작다'], ['뛰었다, 뛰고', '뛰다']].map(([a, b], i) => { const y = 274 + i * 32; return g(3900 + i * 400, `
          ${tx(250, y, a, { a: 'end', fs: 20, c: C.sub })}${arrow(262, y - 7, 290, y - 7, C.sub, 2.5)}${tx(300, y, b, { a: 'start', fs: 20, c: C.d, w: 800 })}`); }).join('')}
      `),
      play: play(5200),
    },
  });
})();
