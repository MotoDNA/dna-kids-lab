/* 4학년 중국어 · 무지개 색깔을 중국어로 말해 볼까? (c3-08) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"';
  const T = (x, y, s, o = {}) => `<text${o.k ? ` class="${o.k}"` : ''}${o.zh ? ' ' + ZH : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const Z = (x, y, s, sz = 40, c = C.ink) => T(x, y, s, { s: sz, c, w: 600, zh: 1 });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.f || '#f5f5f7'}" stroke="${o.st || '#d2d2d7'}" stroke-width="${o.sw || 2}"/>`;
  const FX = el => {
    const qa = s => [...el.querySelectorAll(s)];
    const op = (s, v) => qa(s).forEach(n => n.setAttribute('opacity', v));
    const rise = (s, f, d = 14) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${d * (1 - f)})`); });
    return { qa, op, rise };
  };
  /* 색깔 단원이라 실제 색을 씀 */
  const RED = '#ff3b30', YEL = '#ffcc00', BLU = C.d, GRN = C.r, PNK = '#ff7eb0', PUR = '#af52de', ORG = C.c, BRN = '#a2845e';

  /* 1: 사과·바나나·바다·나무 (0,0 중심) */
  const P1 = [
    { z: '红色', p: 'hóngsè', m: '빨간색', col: RED,
      g: `<circle cy="4" r="26" fill="${RED}"/><path d="M0 -20 q2 -10 8 -14" fill="none" stroke="${BRN}" stroke-width="4" stroke-linecap="round"/><ellipse cx="12" cy="-26" rx="8" ry="4" fill="${GRN}"/>` },
    { z: '黄色', p: 'huángsè', m: '노란색', col: YEL,
      g: `<path d="M-30 -14 Q-26 30 30 20 Q-10 14 -18 -18 Z" fill="${YEL}" stroke="#e0b000" stroke-width="3" stroke-linejoin="round"/><path d="M-30 -14 l-4 -8" stroke="${BRN}" stroke-width="4" stroke-linecap="round"/>` },
    { z: '蓝色', p: 'lánsè', m: '파란색', col: BLU,
      g: `<rect x="-34" y="-8" width="68" height="36" rx="8" fill="${BLU}"/><path d="M-34 -8 q8.5 -12 17 0 t17 0 t17 0 t17 0" fill="${BLU}" stroke="${BLU}" stroke-width="3"/>` },
    { z: '绿色', p: 'lǜsè', m: '초록색', col: GRN,
      g: `<rect x="-5" y="8" width="10" height="24" rx="3" fill="${BRN}"/><circle cy="-8" r="24" fill="${GRN}"/>` },
  ];

  /* 2: 白 黑 粉 紫 橙 */
  const P2 = [
    { z: '白色', p: 'báisè', m: '흰색', f: '#fff' },
    { z: '黑色', p: 'hēisè', m: '검은색', f: C.ink },
    { z: '粉色', p: 'fěnsè', m: '분홍색', f: PNK },
    { z: '紫色', p: 'zǐsè', m: '보라색', f: PUR },
    { z: '橙色', p: 'chéngsè', m: '주황색', f: ORG },
  ];
  const panda = `<g transform="translate(97,88)">
    <circle cx="-30" cy="-26" r="14" fill="${C.ink}"/><circle cx="30" cy="-26" r="14" fill="${C.ink}"/>
    <circle r="40" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
    <ellipse cx="-15" cy="-4" rx="10" ry="13" fill="${C.ink}" transform="rotate(25 -15 -4)"/><ellipse cx="15" cy="-4" rx="10" ry="13" fill="${C.ink}" transform="rotate(-25 15 -4)"/>
    <circle cx="-13" cy="-5" r="3.5" fill="#fff"/><circle cx="13" cy="-5" r="3.5" fill="#fff"/>
    <ellipse cy="14" rx="7" ry="5" fill="${C.ink}"/></g>`;
  const flower = `<g transform="translate(240,92)">${[0, 72, 144, 216, 288].map(a => `<circle cx="${(16 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(16 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="13" fill="${PNK}"/>`).join('')}<circle r="9" fill="${YEL}"/></g>`;
  const grape = `<g transform="translate(335,90)"><path d="M0 -34 v10" stroke="${BRN}" stroke-width="4" stroke-linecap="round"/>${[[-16, -14], [0, -14], [16, -14], [-8, 0], [8, 0], [0, 14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9.5" fill="${PUR}"/>`).join('')}</g>`;
  const orange = `<g transform="translate(430,94)"><circle r="26" fill="${ORG}"/><ellipse cx="8" cy="-28" rx="9" ry="4.5" fill="${GRN}"/></g>`;

  /* 3: 묻고 답하기 */
  const COLS = [{ x: 30, w: 76 }, { x: 116, w: 124 }, { x: 250, w: 200 }];
  const Q3 = [['你', 'nǐ', '너는'], ['喜欢', 'xǐhuan', '좋아해'], ['什么颜色', 'shénme yánsè', '무슨 색?']];
  const A3 = [['我', 'wǒ', '나는'], ['喜欢', 'xǐhuan', '좋아해'], ['红色', 'hóngsè', '빨간색']];

  Object.assign(DIAG, {
    'c3-08:0': {
      alt: '红(hóng, 빨강)에 色(sè, 색)를 더하면 红色(hóngsè, 빨간색)가 되고, 颜色(yánsè)는 색깔이라는 뜻임을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img"><g transform="translate(0,6)">
        <g class="a">${T(80, 80, 'hóng', { s: 22, c: RED, w: 800 })}${R(30, 92, 100, 88, { f: '#ffe5e3', st: RED, sw: 2.5 })}${Z(80, 155, '红', 54, RED)}${T(80, 210, '빨강', { s: 20, c: C.sub })}</g>
        <g class="b">${T(155, 144, '+', { s: 30, c: C.sub, w: 800 })}
          ${T(222, 80, 'sè', { s: 22, c: C.d, w: 800 })}${R(172, 92, 100, 88, { f: '#fff', st: C.ink, sw: 2.5 })}${Z(222, 155, '色', 54)}${T(222, 210, '색', { s: 20, c: C.sub })}</g>
        <g class="c">${T(296, 144, '=', { s: 30, c: C.sub, w: 800 })}
          ${T(385, 80, 'hóngsè', { s: 22, c: RED, w: 800 })}${R(318, 92, 134, 88, { f: RED, st: 'none', sw: 0 })}${Z(385, 155, '红色', 48, '#fff')}${T(385, 210, '빨간색', { s: 20, c: C.ink, w: 800 })}</g>
        <g class="d">${R(110, 234, 260, 46, { f: C.b, st: 'none', sw: 0, r: 23 })}
          ${Z(172, 267, '颜色', 26)}${T(250, 266, 'yánsè', { s: 20, c: C.d, w: 800 })}${T(318, 266, '= 색깔', { s: 20, w: 800 })}</g>
      </g></svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 4600, e => {
          rise('.a', dgEase(dgP(e, 200, 500)));
          rise('.b', dgEase(dgP(e, 1100, 500)));
          rise('.c', dgEase(dgP(e, 2100, 600)));
          rise('.d', dgEase(dgP(e, 3400, 500)));
        });
      }
    },

    'c3-08:1': {
      alt: '빨간 사과는 红色(hóngsè), 노란 바나나는 黄色(huángsè), 파란 바다는 蓝色(lánsè), 초록 나무는 绿色(lǜsè)이고, hóng과 huáng을 구별해야 한다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${P1.map((p, i) => { const x = 62 + i * 118; return `<g class="c${i}">
          ${R(x - 54, 44, 108, 196, { f: '#fff', st: '#e5e5ea' })}
          <g transform="translate(${x},96)">${p.g}</g>
          ${Z(x, 172, p.z, 34)}
          ${T(x, 200, p.p, { s: 20, c: p.col === YEL ? '#c79a00' : p.col, w: 800 })}
          ${T(x, 226, p.m, { s: 18, c: C.sub })}</g>`; }).join('')}
        <g class="cmp">${T(240, 284, '<tspan fill="#ff3b30">hóng</tspan> 훙  ≠  <tspan fill="#c79a00">huáng</tspan> 황', { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5000, e => {
          P1.forEach((p, i) => rise('.c' + i, dgEase(dgP(e, 200 + i * 900, 500))));
          op('.cmp', dgP(e, 4000, 500));
        });
      }
    },

    'c3-08:2': {
      alt: '판다의 흰색 白色(báisè)과 검은색 黑色(hēisè), 꽃의 분홍색 粉色(fěnsè), 포도의 보라색 紫色(zǐsè), 귤의 주황색 橙色(chéngsè)을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 296" class="dg-svg" role="img">
        <g class="pic0">${panda}</g><g class="pic1">${flower}</g><g class="pic2">${grape}</g><g class="pic3">${orange}</g>
        ${P2.map((p, i) => { const x = 50 + i * 95; return `<g class="c${i}">
          <rect x="${x - 40}" y="148" width="80" height="22" rx="11" fill="${p.f}" stroke="${p.f === '#fff' ? '#c7c7cc' : p.f}" stroke-width="2"/>
          ${Z(x, 214, p.z, 32)}
          ${T(x, 242, p.p, { s: 20, c: C.d, w: 800 })}
          ${T(x, 270, p.m, { s: 18, c: C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5600, e => {
          const st = [200, 200, 1700, 2900, 4100];
          rise('.pic0', dgEase(dgP(e, 200, 500)));
          [1, 2, 3].forEach(k => rise('.pic' + k, dgEase(dgP(e, st[k + 1], 500))));
          P2.forEach((p, i) => rise('.c' + i, dgEase(dgP(e, i < 2 ? 700 + i * 500 : st[i] + 300, 500))));
        });
      }
    },

    'c3-08:3': {
      alt: '你喜欢什么颜色?(너는 무슨 색을 좋아해?)라는 질문의 什么颜色 자리에 红色를 넣어 我喜欢红色(나는 빨간색을 좋아해)라고 대답하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${[[Q3, 70, 'q'], [A3, 218, 'a']].map(([row, y, k]) => row.map((w, i) => { const c = COLS[i], hot = i === 2; return `<g class="${k}${i}">
          ${T(c.x + c.w / 2, y - 10, w[1], { s: 20, c: hot && k === 'a' ? RED : C.d, w: 800 })}
          ${R(c.x, y, c.w, 58, hot ? (k === 'a' ? { f: RED, st: 'none', sw: 0 } : { f: C.a, st: C.c, sw: 2.5 }) : { f: '#fff', st: '#d2d2d7', sw: 2 })}
          ${Z(c.x + c.w / 2, y + 42, w[0], 34, hot && k === 'a' ? '#fff' : C.ink)}
          ${T(c.x + c.w / 2, y + 84, w[2], { s: 18, c: C.sub })}</g>`; }).join('')).join('')}
        <g class="ar"><path d="M350 162 v20 m-9 -9 l9 9 l9 -9" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="lb">${T(14, 112, 'A', { s: 20, c: C.sub, w: 800, a: 'start' })}${T(14, 260, 'B', { s: 20, c: C.sub, w: 800, a: 'start' })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5600, e => {
          op('.lb', 1);
          [0, 1, 2].forEach(i => rise('.q' + i, dgEase(dgP(e, 200 + i * 500, 450))));
          [0, 1].forEach(i => rise('.a' + i, dgEase(dgP(e, 2000 + i * 500, 450))));
          op('.ar', dgP(e, 3200, 400));
          rise('.a2', dgEase(dgP(e, 3700, 600)), -20);
        });
      }
    },
  });
})();
