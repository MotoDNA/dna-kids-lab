/* 3학년 국어 · 할머니께 ‘밥 먹어’라고 해도 될까? (k3-03) */
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
  // 문장 줄: parts = [[글자, 강조색|null], ...]
  const line = (x, y, parts, fs = 24, o = {}) => `<text x="${x}" y="${y}" font-size="${fs}" font-weight="${o.w || 700}" fill="${o.c || C.ink}">${parts.map(([s, c]) => c ? `<tspan fill="${c}" font-weight="800">${s}</tspan>` : s).join('')}</text>`;
  const strike = (p, y, fs) => `<line x1="${p.x - 2}" y1="${y - fs * .32}" x2="${p.x + p.w + 2}" y2="${y - fs * .32}" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>`;

  const PAIR = [['밥', '진지'], ['집', '댁'], ['나이', '연세'], ['이름', '성함'], ['생일', '생신'], ['말', '말씀'], ['먹다', '드시다'], ['자다', '주무시다'], ['있다', '계시다']];

  Object.assign(DIAG, {
    'k3-03:0': {
      alt: '친구에게는 같이 가자라고 하지만 선생님께는 같이 가요 또는 같이 가시겠어요라고 높여 말하는 것을 비교하는 그림',
      svg: SV(300, `
        ${g(200, `${person(60, 130, .8, C.r, GN)}${tx(60, 158, '친구에게', { fs: 18, c: C.sub })}`)}
        ${g(700, `${bubble(250, 86, '같이 가<tspan fill="' + C.r + '">자</tspan>.', { side: 'l', w: tw('같이 가자.', 24) + 36, fs: 24, s: C.r })}`, { dx: -16 })}
        <line x1="20" y1="180" x2="460" y2="180" stroke="${LG}" stroke-width="2"/>
        ${g(1700, `${person(60, 268, 1.05, C.d, C.b)}${tx(60, 292, '선생님께', { fs: 18, c: C.sub })}`)}
        ${g(2300, `${bubble(220, 214, '같이 가<tspan fill="' + C.c + '">요</tspan>.', { side: 'l', w: tw('같이 가요.', 24) + 36, fs: 24, s: C.d })}`, { dx: -16 })}
        ${g(3300, `${tx(320, 222, '또는', { fs: 18, c: C.sub })}${bubble(320, 262, '같이 가<tspan fill="' + C.c + '">시</tspan>겠어<tspan fill="' + C.c + '">요</tspan>?', { w: tw('같이 가시겠어요?', 22) + 32, fs: 22, s: C.d, tx: 270 })}`, { dx: -16 })}
      `),
      play: play(4000),
    },

    'k3-03:1': {
      alt: '밥은 진지, 집은 댁, 나이는 연세, 이름은 성함, 생일은 생신, 말은 말씀, 먹다는 드시다, 자다는 주무시다, 있다는 계시다로 바꾸어 쓰는 높임 낱말 짝 그림',
      svg: SV(296, `
        ${PAIR.map(([a, b], i) => { const cx = 82 + (i % 3) * 158, cy = 56 + Math.floor(i / 3) * 70, t = 300 + i * 450;
          const wa = tw(a, 20), wb = tw(b, 22), W = wa + wb + 34, x0 = cx - W / 2;
          return g(t, `<rect x="${cx - 74}" y="${cy - 27}" width="148" height="54" rx="12" fill="${i >= 6 ? '#fff4e6' : '#eef5ff'}"/>
            ${tx(x0, cy + 7, a, { a: 'start', fs: 20, c: C.sub })}
            ${arrow(x0 + wa + 6, cy, x0 + wa + 26, cy, '#c7c7cc', 2.5)}
            ${tx(x0 + wa + 34, cy + 8, b, { a: 'start', fs: 22, c: i >= 6 ? C.c : C.d, w: 800 })}`, { dy: 10 }); }).join('')}
        ${g(4500, `${tx(130, 276, '이름을 나타내는 말', { fs: 18, c: C.d })}${tx(370, 276, '행동을 나타내는 말', { fs: 18, c: C.c })}
          <rect x="34" y="262" width="12" height="12" rx="3" fill="#eef5ff" stroke="${C.d}" stroke-width="1.5"/><rect x="274" y="262" width="12" height="12" rx="3" fill="#fff4e6" stroke="${C.c}" stroke-width="1.5"/>`)}
      `),
      play: play(5200),
    },

    'k3-03:2': (() => {
      const F = 24, X = 30;
      const A1 = '할아버지가 신문을 읽는다.';
      const B1t = [['할아버지'], ['께서', C.c], [' 신문을 읽'], ['으신', C.c], ['다.']];
      const kk = at(X, '할아버지', '께서', F), ss = at(X, '할아버지께서 신문을 읽', '으신', F);
      const B2 = [['어머니'], ['께', C.c], [' 꽃을 '], ['드렸', C.c], ['어'], ['요', C.c], ['.']];
      const k2 = at(X, '어머니', '께', F), d2 = at(X, '어머니께 꽃을 ', '드렸', F), y2 = at(X, '어머니께 꽃을 드렸어', '요', F);
      const tag = (p, y, s, c = C.c, X2) => { const m = p.x + p.w / 2, x2 = X2 ?? m; return `<path d="M${m} ${y - 26} L${x2} ${y - 16}" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>${tx(x2, y + 2, s, { fs: 18, c, w: 800 })}`; };
      return {
        alt: '할아버지가 신문을 읽는다를 할아버지께서 신문을 읽으신다로, 엄마에게 꽃을 줬다를 어머니께 꽃을 드렸어요로 바꾸어 께서, -시-, 께, -요를 쓰는 그림',
        svg: SV(344, `
          ${tx(X, 52, A1, { a: 'start', fs: F, c: C.sub })}
          ${g(500, arrow(60, 66, 60, 88, C.sub, 3))}
          ${g(900, line(X, 120, B1t, F), { dy: -10 })}
          ${g(1700, tag(kk, 158, '가 → 께서'))}
          ${g(2400, tag(ss, 158, '-시-'))}
          <line x1="20" y1="184" x2="460" y2="184" stroke="${LG}" stroke-width="2"/>
          ${g(3200, tx(X, 222, '엄마에게 꽃을 줬다.', { a: 'start', fs: F, c: C.sub }))}
          ${g(3600, arrow(60, 236, 60, 258, C.sub, 3))}
          ${g(4000, line(X, 290, B2, F), { dy: -10 })}
          ${g(4700, tag(k2, 330, '에게 → 께', C.c, 76) + tag(d2, 330, '주다 → 드리다', C.c, 192) + tag(y2, 330, '-요', C.c, 300))}
        `),
        play: play(5400),
      };
    })(),

    'k3-03:3': (() => {
      const F = 22, X = 64;
      const w1 = at(X, '주문하신 음식 나오', '셨', F), r1 = at(X, '주문하신 음식 나', '왔', F);
      const w2 = at(X, '선생님, ', '나', F), r2 = at(X, '선생님, ', '저', F);
      return {
        alt: '주문하신 음식 나오셨습니다는 음식을 높인 틀린 말이라 주문하신 음식 나왔습니다로, 선생님 나도 할래요는 나를 높인 말이라 선생님 저도 할래요로 고치는 그림',
        svg: SV(320, `
          ${tx(24, 40, '물건은 높이지 않아요', { a: 'start', fs: 20, c: C.d, w: 800 })}
          ${g(300, `${no(38, 80)}${tx(X, 88, '주문하신 음식 나오셨습니다.', { a: 'start', fs: F })}`)}
          ${g(1200, strike(w1, 88, F))}
          ${g(1800, `${ok(38, 128)}${line(X, 136, [['주문하신 음식 나'], ['왔', C.r], ['습니다.']], F)}`, { dy: 10 })}
          <line x1="20" y1="166" x2="460" y2="166" stroke="${LG}" stroke-width="2"/>
          ${g(2800, tx(24, 202, '나를 낮추어요', { a: 'start', fs: 20, c: C.c, w: 800 }))}
          ${g(3100, `${no(38, 240)}${tx(X, 248, '선생님, 나도 할래요.', { a: 'start', fs: F })}`)}
          ${g(3800, strike(w2, 248, F))}
          ${g(4300, `${ok(38, 288)}${line(X, 296, [['선생님, '], ['저', C.r], ['도 할래요.']], F)}`, { dy: 10 })}
          ${g(4800, `${card(400, 268, '나 → 저', { fs: 20, f: '#fff', s: C.c, c: C.c })}${card(400, 106, '셨 → 왔', { fs: 20, f: '#fff', s: C.d, c: C.d })}`)}
        `),
        play: play(5400),
      };
    })(),
  });
})();
