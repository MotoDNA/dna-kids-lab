/* 6학년 중국어 · 식당에서 중국어로 주문해 볼까요? (c5-06) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"';
  const T = (x, y, s, o = {}) => `<text${o.k ? ` class="${o.k}"` : ''}${o.zh ? ' ' + ZH : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const Z = (x, y, s, sz = 40, c = C.ink, a) => T(x, y, s, { s: sz, c, w: 600, zh: 1, a });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.f || '#f5f5f7'}" stroke="${o.st || '#d2d2d7'}" stroke-width="${o.sw || 2}"/>`;
  const FX = el => {
    const qa = s => [...el.querySelectorAll(s)];
    const op = (s, v) => qa(s).forEach(n => n.setAttribute('opacity', v));
    const rise = (s, f, d = 14) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${d * (1 - f)})`); });
    const slide = (s, f, d = 20) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(${-d * (1 - f)},0)`); });
    return { qa, op, rise, slide };
  };
  const BL = (x, y, w, z, p, g, st = {}) => `${p ? T(x + w / 2, y - 10, p, { s: 20, c: st.pc || C.d, w: 800 }) : ''}
    ${R(x, y, w, st.h || 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${Z(x + w / 2, y + (st.h || 60) / 2 + 0.37 * (st.zs || 34), z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + (st.h || 60) + 26, g, { s: 18, c: C.sub }) : ''}`;

  /* 음식 아이콘 (0,0 중심, 약 ±30) */
  const BRN = '#a2845e';
  const IC = {
    burger: `<path d="M-28 -4 a28 22 0 0 1 56 0 z" fill="${C.a}" stroke="${C.c}" stroke-width="3"/><rect x="-30" y="0" width="60" height="9" rx="4" fill="${BRN}"/><rect x="-30" y="9" width="60" height="5" rx="2" fill="${C.r}"/><path d="M-28 15 h56 v4 a8 8 0 0 1 -8 8 h-40 a8 8 0 0 1 -8 -8 z" fill="${C.a}" stroke="${C.c}" stroke-width="3"/>`,
    noodle: `<path d="M-14 -24 q6 12 -2 22 M-2 -26 q6 12 -2 24 M10 -24 q6 12 -2 22" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/><path d="M-32 -2 h64 a32 28 0 0 1 -64 0 z" fill="${C.b}" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/>`,
    rice: `<path d="M-24 -2 a24 20 0 0 1 48 0 z" fill="#fff" stroke="#c7c7cc" stroke-width="3"/><path d="M-32 -2 h64 a32 28 0 0 1 -64 0 z" fill="${C.b}" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/>`,
    cola: `<path d="M6 -30 l-4 14" stroke="#ff3b30" stroke-width="4" stroke-linecap="round"/><path d="M-18 -16 h36 l-5 44 h-26 z" fill="${BRN}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><rect x="-15" y="-2" width="30" height="10" fill="#fff" opacity=".85"/>`,
    water: `<path d="M-18 -24 h36 l-5 52 h-26 z" fill="#fff" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/><path d="M-16 -4 h32 l-3.2 32 h-25.6 z" fill="${C.b}"/>`,
    dumpling: `<path d="M-32 12 Q-30 -26 0 -26 Q30 -26 32 12 Q0 22 -32 12 Z" fill="#fff" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/><path d="M-14 -22 l4 10 M0 -26 v12 M14 -22 l-4 10" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/>`,
  };

  /* 1: 세는 말 */
  const P1 = [
    { ic: 'burger', n: '一', np: 'yí', m: '个', mp: 'ge', o: '汉堡', op: 'hànbǎo', k: '햄버거 한 개' },
    { ic: 'noodle', n: '一', np: 'yì', m: '碗', mp: 'wǎn', o: '面条', op: 'miàntiáo', k: '국수 한 그릇' },
    { ic: 'cola', n: '一', np: 'yì', m: '杯', mp: 'bēi', o: '可乐', op: 'kělè', k: '콜라 한 잔' },
  ];

  /* 2: 주문 대화 (A=종업원, B=나) */
  const D2 = [
    { b: 0, z: '你要什么？', k: '무엇을 드릴까요?' },
    { b: 1, z: '我要饺子。', k: '만두 주세요.' },
    { b: 0, z: '还要别的吗？', k: '다른 것도 필요하세요?' },
    { b: 1, z: '不要了，谢谢。', k: '이제 됐어요, 고마워요.' },
    { b: 0, z: '好的。', k: '알겠습니다.' },
  ];

  /* 3: 음식 이름 */
  const F3 = [
    { ic: 'dumpling', z: '饺子', p: 'jiǎozi', m: '만두' },
    { ic: 'noodle', z: '面条', p: 'miàntiáo', m: '국수' },
    { ic: 'rice', z: '米饭', p: 'mǐfàn', m: '밥' },
    { ic: 'burger', z: '汉堡', p: 'hànbǎo', m: '햄버거' },
    { ic: 'cola', z: '可乐', p: 'kělè', m: '콜라' },
    { ic: 'water', z: '水', p: 'shuǐ', m: '물' },
  ];

  Object.assign(DIAG, {
    'c5-06:0': {
      alt: '종업원을 服务员!(fúwùyuán, 저기요!)이라고 부르고, 我(나) + 要(원하다) + 饺子(만두)로 我要饺子(만두 주세요)라고 주문하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="h">${R(40, 40, 364, 56, { f: C.b, st: 'none', sw: 0, r: 28 })}
          ${Z(130, 78, '服务员！', 30)}${T(258, 76, 'fúwùyuán', { s: 20, c: C.d, w: 800 })}${T(318, 76, '저기요!', { s: 18, c: C.ink, w: 800, a: 'start' })}</g>
        <g class="b0">${BL(60, 150, 80, '我', 'wǒ', '나')}</g>
        <g class="b1">${BL(156, 150, 90, '要', 'yào', '원하다', { f: C.a, st: C.c, sw: 2.5, pc: C.c })}</g>
        <g class="b2">${BL(262, 150, 120, '饺子', 'jiǎozi', '만두')}</g>
        <g class="ic" transform="translate(428,184)">${IC.dumpling}</g>
        <g class="tr">${T(240, 284, '→ 만두 주세요', { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5200, e => {
          rise('.h', dgEase(dgP(e, 200, 500)));
          [0, 1, 2].forEach(i => rise('.b' + i, dgEase(dgP(e, 1200 + i * 650, 450))));
          op('.ic', dgP(e, 2700, 400));
          op('.tr', dgP(e, 3600, 500));
        });
      }
    },

    'c5-06:1': {
      alt: '수와 물건 사이에 세는 말을 넣어 一个汉堡(햄버거 한 개), 一碗面条(국수 한 그릇), 一杯可乐(콜라 한 잔)라고 하고, 두 개는 两个汉堡라고 하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 350" class="dg-svg" role="img">
        ${P1.map((p, i) => { const y = 58 + i * 86; return `<g class="r${i}">
          <g transform="translate(40,${y + 28})">${IC[p.ic]}</g>
          ${BL(80, y, 56, p.n, p.np, '', { zs: 30, h: 56 })}
          ${BL(144, y, 64, p.m, p.mp, '', { zs: 30, h: 56, f: C.a, st: C.c, sw: 2.5, pc: C.c })}
          ${BL(216, y, 104, p.o, p.op, '', { zs: 30, h: 56 })}
          ${T(334, y + 35, p.k, { s: 18, w: 800, a: 'start' })}</g>`; }).join('')}
        <g class="two">${R(40, 304, 400, 42, { f: C.b, st: 'none', sw: 0, r: 21 })}
          ${T(60, 332, '두 개', { s: 18, c: C.sub, a: 'start' })}${Z(176, 334, '<tspan fill="#0071e3">两</tspan>个汉堡', 26)}${T(268, 332, 'liǎng', { s: 20, c: C.d, w: 800 })}${T(420, 332, '(二 ✕)', { s: 18, c: C.sub, a: 'end' })}</g>
      </svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 5600, e => {
          P1.forEach((p, i) => rise('.r' + i, dgEase(dgP(e, 200 + i * 1300, 600))));
          rise('.two', dgEase(dgP(e, 4400, 500)));
        });
      }
    },

    'c5-06:2': {
      alt: '종업원이 你要什么?(무엇을 드릴까요?)라고 물으면 我要饺子(만두 주세요)라고 하고, 还要别的吗?(다른 것도 필요하세요?)에 不要了，谢谢(이제 됐어요, 고마워요)라고 답하면 종업원이 好的(알겠습니다)라고 하는 주문 대화 순서 그림',
      svg: `<svg viewBox="0 0 480 356" class="dg-svg" role="img">
        <g>${T(16, 26, '종업원', { s: 18, c: C.d, w: 800, a: 'start' })}${T(84, 26, '나', { s: 18, c: C.c, w: 800, a: 'start' })}</g>
        ${D2.map((d, i) => { const y = 40 + i * 63, x = d.b ? 196 : 16; return `<g class="d${i}">
          ${R(x, y, 268, 58, { f: d.b ? C.a : C.b, st: 'none', sw: 0, r: 18 })}
          ${Z(x + 18, y + 26, d.z, 22, C.ink, 'start')}
          ${T(x + 18, y + 50, d.k, { s: 18, c: d.b ? '#b25f00' : C.d, w: 700, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 6200, e => D2.forEach((d, i) => rise('.d' + i, dgEase(dgP(e, 200 + i * 1150, 500)))));
      }
    },

    'c5-06:3': {
      alt: '중국 음식 이름 饺子(jiǎozi, 만두), 面条(miàntiáo, 국수), 米饭(mǐfàn, 밥), 汉堡(hànbǎo, 햄버거), 可乐(kělè, 콜라), 水(shuǐ, 물)를 그림 카드로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 336" class="dg-svg" role="img">
        ${F3.map((f, i) => { const x = 12 + (i % 3) * 156, y = 44 + Math.floor(i / 3) * 146; return `<g class="f${i}">
          ${R(x, y, 144, 136, { f: '#fff', st: '#e5e5ea' })}
          <g transform="translate(${x + 72},${y + 38}) scale(.9)">${IC[f.ic]}</g>
          ${Z(x + 72, y + 92, f.z, 28)}
          ${T(x + 72, y + 128, `<tspan fill="#0071e3">${f.p}</tspan> ${f.m}`, { s: 18, w: 800 })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 4600, e => F3.forEach((f, i) => rise('.f' + i, dgEase(dgP(e, 200 + i * 600, 500)))));
      }
    },
  });
})();
