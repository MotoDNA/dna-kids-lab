/* 5학년 중국어 · 중국어로 몇 살인지 물어볼까요? (c5-02) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"', RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.k ? ` class="${o.k}"` : ''}${o.zh ? ' ' + ZH : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const Z = (x, y, s, sz = 40, c = C.ink, a) => T(x, y, s, { s: sz, c, w: 600, zh: 1, a });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.f || '#f5f5f7'}" stroke="${o.st || '#d2d2d7'}" stroke-width="${o.sw || 2}"/>`;
  const FX = el => {
    const qa = s => [...el.querySelectorAll(s)];
    const op = (s, v) => qa(s).forEach(n => n.setAttribute('opacity', v));
    const rise = (s, f, d = 14) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${d * (1 - f)})`); });
    return { qa, op, rise };
  };
  const BL = (x, y, w, z, p, g, st = {}) => `${p ? T(x + w / 2, y - 10, p, { s: 20, c: st.pc || C.d, w: 800 }) : ''}
    ${R(x, y, w, 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${Z(x + w / 2, y + 43 - (34 - (st.zs || 34)) * 0.36, z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + 86, g, { s: 18, c: C.sub }) : ''}`;

  /* 0: 1~10 */
  const N = [['一', 'yī'], ['二', 'èr'], ['三', 'sān'], ['四', 'sì'], ['五', 'wǔ'], ['六', 'liù'], ['七', 'qī'], ['八', 'bā'], ['九', 'jiǔ'], ['十', 'shí']];

  /* 1: 십 막대 + 낱개 */
  const P1 = [
    { t: '十', o: '一', p: 'shíyī', n: 11, f: '10+1', tens: 1, ones: 1, tf: 1 },
    { t: '二十', o: '', p: 'èrshí', n: 20, f: '2×10', tens: 2, ones: 0 },
    { t: '二十', o: '五', p: 'èrshíwǔ', n: 25, f: '2×10+5', tens: 2, ones: 5 },
  ];
  const blocks = (x, y, tens, ones) => {
    let s = '';
    for (let i = 0; i < tens; i++) {
      s += `<rect x="${x + i * 20}" y="${y}" width="14" height="66" rx="2" fill="${C.b}" stroke="${C.d}" stroke-width="2"/>`;
      for (let k = 1; k < 10; k++) s += `<line x1="${x + i * 20}" x2="${x + i * 20 + 14}" y1="${y + k * 6.6}" y2="${y + k * 6.6}" stroke="${C.d}" stroke-width="1"/>`;
    }
    const ox = x + tens * 20 + 8;
    for (let j = 0; j < ones; j++) s += `<rect x="${ox}" y="${y + 66 - 13 * (j + 1) + 1}" width="12" height="12" rx="2" fill="${C.a}" stroke="${C.c}" stroke-width="2"/>`;
    return s;
  };

  Object.assign(DIAG, {
    'c5-02:0': {
      alt: '중국어 숫자 1부터 10까지: 一 yī, 二 èr, 三 sān, 四 sì, 五 wǔ, 六 liù, 七 qī, 八 bā, 九 jiǔ, 十 shí를 카드로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 298" class="dg-svg" role="img"><g transform="translate(0,14)">
        ${N.map((n, i) => { const x = 14 + (i % 5) * 92, y = 40 + Math.floor(i / 5) * 122; return `<g class="n${i}">
          ${R(x, y, 84, 112, { f: i < 5 ? '#eef5ff' : '#fff4e6', st: 'none', sw: 0 })}
          ${T(x + 42, y + 26, i + 1, { s: 20, c: C.sub, w: 800 })}
          ${Z(x + 42, y + 72, n[0], 40)}
          ${T(x + 42, y + 100, n[1], { s: 22, c: i < 5 ? C.d : C.c, w: 800 })}</g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 5000, e => N.forEach((n, i) => rise('.n' + i, dgEase(dgP(e, 200 + i * 420, 400)))));
      }
    },

    'c5-02:1': {
      alt: '十一(shíyī)은 10+1로 11, 二十(èrshí)은 2×10으로 20, 二十五(èrshíwǔ)는 2×10+5로 25이고, 이렇게 九十九(jiǔshíjiǔ) 99까지 말할 수 있다는 것을 십 막대와 낱개 블록으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 356" class="dg-svg" role="img">
        ${P1.map((p, i) => { const y = 40 + i * 92; return `<g class="r${i}">
          ${R(12, y, 456, 82, { f: '#fafafa', st: 'none', sw: 0 })}
          ${T(28, y + 44, `<tspan fill="#0071e3">${p.t}</tspan><tspan fill="#ff9500">${p.o}</tspan>`, { s: 36, w: 600, zh: 1, a: 'start' })}
          ${T(28, y + 72, p.p, { s: 20, c: C.sub, w: 800, a: 'start' })}
          ${T(170, y + 46, '=', { s: 26, c: C.sub, w: 800 })}
          ${T(220, y + 46, `<tspan fill="#0071e3">${String(p.n)[0]}</tspan><tspan fill="#ff9500">${String(p.n)[1]}</tspan>`, { s: 34, w: 800 })}
          ${T(220, y + 72, p.f, { s: 18, c: C.sub })}
          <g class="bk${i}">${blocks(300, y + 8, p.tens, p.ones)}</g></g>`; }).join('')}
        <g class="last">${R(60, 316, 360, 38, { f: C.b, st: 'none', sw: 0, r: 19 })}
          ${Z(150, 343, '九十九', 26)}${T(250, 342, 'jiǔshíjiǔ', { s: 20, c: C.d, w: 800 })}${T(350, 342, '= 99', { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise, op } = FX(el);
        dgAnim(el, 6400, e => {
          P1.forEach((p, i) => {
            const st = 200 + i * 1700;
            rise('.r' + i, dgEase(dgP(e, st, 500)));
            op('.bk' + i, dgP(e, st + 700, 500));
          });
          rise('.last', dgEase(dgP(e, 5400, 500)));
        });
      }
    },

    'c5-02:2': {
      alt: '你几岁?(너 몇 살이야?)의 几(몇) 자리에 숫자를 넣어 我十二岁(나는 열두 살이야)라고 대답하고, 두 살은 二岁가 아니라 两岁(liǎng suì)라고 한다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 356" class="dg-svg" role="img">
        <g class="lb">${T(14, 104, 'A', { s: 20, c: C.sub, w: 800, a: 'start' })}${T(14, 252, 'B', { s: 20, c: C.sub, w: 800, a: 'start' })}</g>
        <g class="q0">${BL(50, 64, 80, '你', 'nǐ', '너')}</g>
        <g class="q1">${BL(146, 64, 120, '几', 'jǐ', '몇', { f: C.a, st: C.c, sw: 2.5 })}</g>
        <g class="q2">${BL(282, 64, 80, '岁', 'suì', '살')}</g>
        <path class="ar" d="M206 160 v22 m-9 -9 l9 9 l9 -9" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="a0">${BL(50, 212, 80, '我', 'wǒ', '나')}</g>
        <g class="a1">${BL(146, 212, 120, '十二', 'shí\'èr', '열둘', { f: C.c, st: 'none', sw: 0, zc: '#fff', pc: C.c })}</g>
        <g class="a2">${BL(282, 212, 80, '岁', 'suì', '살')}</g>
        <g class="nt">${R(40, 312, 400, 40, { f: '#f5f5f7', st: 'none', sw: 0, r: 20 })}
          ${T(62, 339, '두 살', { s: 20, w: 800, a: 'start' })}
          ${Z(170, 341, '二岁', 26, C.sub)}<line x1="140" y1="331" x2="200" y2="331" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
          ${T(222, 339, '→', { s: 20, c: C.sub, w: 800 })}
          ${Z(276, 341, '两岁', 26, C.d)}${T(372, 339, 'liǎng suì', { s: 20, c: C.d, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 6000, e => {
          op('.lb', 1);
          [0, 1, 2].forEach(i => rise('.q' + i, dgEase(dgP(e, 200 + i * 450, 450))));
          [0, 2].forEach((i, n) => rise('.a' + i, dgEase(dgP(e, 1900 + n * 450, 450))));
          op('.ar', dgP(e, 2900, 400));
          rise('.a1', dgEase(dgP(e, 3300, 600)), -20);
          rise('.nt', dgEase(dgP(e, 4700, 500)));
        });
      }
    },

    'c5-02:3': {
      alt: '我十二岁，你呢?(나는 열두 살이야, 너는?)라는 말에 我와 十二岁 사이에 也(~도)를 넣어 我也十二岁(나도 열두 살이야)라고 대답하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        <g class="qa">${R(20, 40, 400, 82, { f: C.b, st: 'none', sw: 0, r: 20 })}
          ${Z(40, 80, '我十二岁，', 28, C.ink, 'start')}${Z(296, 80, '你呢？', 28, C.d, 'start')}
          ${T(40, 108, '나는 열두 살이야.', { s: 18, c: C.sub, a: 'start' })}${T(296, 108, '너는?', { s: 18, c: C.d, w: 800, a: 'start' })}</g>
        <g class="b0">${BL(60, 186, 80, '我', 'wǒ', '나')}</g>
        <g class="b2">${BL(270, 186, 150, '十二岁', 'shí\'èr suì', '열두 살')}</g>
        <g class="b1">${BL(156, 186, 98, '也', 'yě', '~도', { f: C.c, st: 'none', sw: 0, zc: '#fff', pc: C.c })}</g>
        <g class="tr">${T(240, 312, '나도 열두 살이야!', { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { qa, op, rise } = FX(el);
        dgAnim(el, 5600, e => {
          rise('.qa', dgEase(dgP(e, 200, 500)));
          const g = dgEase(dgP(e, 1400, 600));
          op('.b0', g); op('.b2', g);
          // 也가 들어갈 자리가 벌어짐
          const w = dgEase(dgP(e, 2400, 600));
          qa('.b0').forEach(n => n.setAttribute('transform', `translate(${50 * (1 - w)},0)`));
          qa('.b2').forEach(n => n.setAttribute('transform', `translate(${-60 * (1 - w)},0)`));
          const f = dgEase(dgP(e, 3000, 700));
          qa('.b1').forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${-60 * (1 - f)})`); });
          op('.tr', dgP(e, 4300, 500));
        });
      }
    },
  });
})();
