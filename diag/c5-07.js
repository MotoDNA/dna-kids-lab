/* 6학년 중국어 · 이거 얼마예요? 중국어로 물건 사기 (c5-07) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"', RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.k ? ` class="${o.k}"` : ''}${o.zh ? ' ' + ZH : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const Z = (x, y, s, sz = 40, c = C.ink, a) => T(x, y, s, { s: sz, c, w: 600, zh: 1, a });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.f || '#f5f5f7'}" stroke="${o.st || '#d2d2d7'}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="6 5"' : ''}/>`;
  const FX = el => {
    const qa = s => [...el.querySelectorAll(s)];
    const op = (s, v) => qa(s).forEach(n => n.setAttribute('opacity', v));
    const rise = (s, f, d = 14) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${d * (1 - f)})`); });
    const slide = (s, f, d = 20) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(${-d * (1 - f)},0)`); });
    const draw = (s, f) => qa(s).forEach(n => { n.setAttribute('stroke-dashoffset', 1 - f); n.setAttribute('opacity', f > 0 ? 1 : 0); });
    return { qa, op, rise, slide, draw };
  };
  const BL = (x, y, w, z, p, g, st = {}) => `${p ? T(x + w / 2, y - 10, p, { s: 20, c: st.pc || C.d, w: 800 }) : ''}
    ${R(x, y, w, st.h || 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2, dash: st.dash })}
    ${Z(x + w / 2, y + (st.h || 60) / 2 + 0.37 * (st.zs || 34), z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + (st.h || 60) + 26, g, { s: 18, c: st.gc || C.sub }) : ''}`;

  /* 판다 열쇠고리 (0,0 중심, 반지름 r) */
  const toy = r => `<circle cx="${-r * .7}" cy="${-r * .7}" r="${r * .38}" fill="${C.ink}"/><circle cx="${r * .7}" cy="${-r * .7}" r="${r * .38}" fill="${C.ink}"/>
    <circle r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="3"/><circle cx="${-r * .38}" cy="${-r * .05}" r="${r * .24}" fill="${C.ink}"/><circle cx="${r * .38}" cy="${-r * .05}" r="${r * .24}" fill="${C.ink}"/><ellipse cy="${r * .4}" rx="${r * .16}" ry="${r * .11}" fill="${C.ink}"/>`;
  const tag = (x, y, w, h) => `<path d="M${x + 18} ${y} H${x + w - 8} a8 8 0 0 1 8 8 V${y + h - 8} a8 8 0 0 1 -8 8 H${x + 18} L${x} ${y + h / 2} Z" fill="#fff" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/><circle cx="${x + 16}" cy="${y + h / 2}" r="4" fill="${C.c}"/>`;
  const pencil = `<g transform="rotate(-35)"><rect x="-8" y="-38" width="16" height="58" fill="${C.a}" stroke="${C.c}" stroke-width="3"/><path d="M-8 20 L0 38 L8 20 Z" fill="#f5e6d0" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/><rect x="-8" y="-46" width="16" height="10" rx="3" fill="#ff8fa3" stroke="${C.c}" stroke-width="3"/></g>`;
  const note = `<rect x="-28" y="-36" width="56" height="72" rx="6" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>${[-24, -10, 4, 18].map(y => `<circle cx="-28" cy="${y}" r="4" fill="#fff" stroke="${C.d}" stroke-width="2.5"/>`).join('')}<line x1="-12" y1="-14" x2="18" y2="-14" stroke="${C.d}" stroke-width="3"/><line x1="-12" y1="0" x2="18" y2="0" stroke="${C.d}" stroke-width="3"/>`;
  const bill = (x, y, n, col, f) => `<rect x="${x}" y="${y}" width="74" height="40" rx="6" fill="${f}" stroke="${col}" stroke-width="2.5"/><rect x="${x + 6}" y="${y + 6}" width="62" height="28" rx="4" fill="none" stroke="${col}" stroke-width="1.5"/>${T(x + 37, y + 28, n, { s: 20, c: col, w: 800 })}`;

  Object.assign(DIAG, {
    'c5-07:0': {
      alt: '가까이 있는 물건은 这个(zhège, 이것), 멀리 있는 물건은 那个(nàge, 저것)라고 하고, 这个의 소리는 우리말 저거와 비슷하지만 뜻은 이것이라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <line x1="12" y1="170" x2="468" y2="170" stroke="#e5e5ea" stroke-width="3" stroke-linecap="round"/>
        <g fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="48" cy="82" r="18" fill="${C.a}" stroke="${C.c}"/><path d="M48 100 V136 M48 136 L36 168 M48 136 L60 168" stroke="${C.c}"/>
          <path class="arm" d="M48 110 L80 102" stroke="${C.c}"/></g>
        <g class="n"><path d="M96 112 H134" fill="none" stroke="${C.d}" stroke-width="3" stroke-dasharray="5 5"/>
          <g transform="translate(168,128)">${toy(26)}</g>
          ${Z(168, 214, '这个', 30, C.d)}${T(168, 240, 'zhège', { s: 20, c: C.d, w: 800 })}${T(168, 264, '이것 (가까이)', { s: 18, c: C.ink, w: 800 })}</g>
        <g class="f"><path d="M96 98 Q240 40 372 124" fill="none" stroke="${C.c}" stroke-width="3" stroke-dasharray="5 5"/>
          <g transform="translate(392,146)">${toy(15)}</g>
          ${Z(392, 214, '那个', 30, C.c)}${T(392, 240, 'nàge', { s: 20, c: C.c, w: 800 })}${T(392, 264, '저것 (멀리)', { s: 18, c: C.ink, w: 800 })}</g>
        <g class="w">${R(40, 280, 400, 44, { f: '#fff4e6', st: 'none', sw: 0, r: 22 })}
          ${Z(102, 310, '这个', 24, C.d)}${T(260, 308, '소리는 \'저거\', 뜻은 <tspan fill="#0071e3">이것</tspan>!', { s: 18, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise, op } = FX(el);
        dgAnim(el, 5400, e => {
          rise('.n', dgEase(dgP(e, 300, 600)));
          rise('.f', dgEase(dgP(e, 1800, 600)));
          rise('.w', dgEase(dgP(e, 3600, 600)));
        });
      }
    },

    'c5-07:1': {
      alt: '중국 돈 단위 元(yuán)을 말할 때는 块(kuài)라고 해서 十五块는 15위안이고 끝의 钱은 빼도 되며, 2위안은 两块, 100위안은 一百块라고 하는 것을 지폐 그림과 함께 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <g class="u">${R(60, 40, 350, 50, { f: '#f5f5f7', st: 'none', sw: 0, r: 25 })}
          ${Z(96, 75, '元', 28)}${T(146, 73, 'yuán', { s: 20, c: C.sub, w: 800 })}
          ${T(204, 73, '=', { s: 22, c: C.sub, w: 800 })}
          ${Z(242, 75, '块', 28, C.c)}${T(284, 73, 'kuài', { s: 20, c: C.c, w: 800 })}${T(326, 73, '말할 때', { s: 18, c: C.sub, a: 'start' })}</g>
        <g class="b0">${BL(22, 140, 100, '十五', 'shíwǔ', '15')}</g>
        <g class="b1">${BL(130, 140, 74, '块', 'kuài', '위안', { f: C.a, st: C.c, sw: 2.5, pc: C.c })}</g>
        <g class="b2">${BL(212, 140, 74, '钱', 'qián', '빼도 OK', { f: '#fff', st: '#aeaeb2', dash: 1, zc: '#aeaeb2', pc: '#aeaeb2' })}</g>
        <g class="m">${bill(304, 132, '10', C.r, '#e3f4e7')}${bill(392, 132, '5', '#af52de', '#f1e4fa')}${T(386, 204, '= 15위안', { s: 20, w: 800 })}</g>
        <g class="c0">${R(16, 238, 214, 80, { f: C.b, st: 'none', sw: 0, r: 18 })}${Z(76, 276, '两块', 28)}${T(178, 274, '2위안', { s: 20, w: 800 })}${T(123, 306, 'liǎng kuài', { s: 18, c: C.d, w: 800 })}</g>
        <g class="c1">${R(250, 238, 214, 80, { f: C.b, st: 'none', sw: 0, r: 18 })}${Z(312, 276, '一百块', 28)}${T(420, 274, '100위안', { s: 20, w: 800 })}${T(357, 306, 'yìbǎi kuài', { s: 18, c: C.d, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise, op } = FX(el);
        dgAnim(el, 6000, e => {
          rise('.u', dgEase(dgP(e, 200, 500)));
          [0, 1, 2].forEach(i => rise('.b' + i, dgEase(dgP(e, 1100 + i * 600, 450))));
          rise('.m', dgEase(dgP(e, 3000, 500)));
          rise('.c0', dgEase(dgP(e, 4000, 500)));
          rise('.c1', dgEase(dgP(e, 4600, 500)));
        });
      }
    },

    'c5-07:2': {
      alt: '30위안(三十块) 가격표를 보고 太贵了!(tài guì le, 너무 비싸요!)라고 말한 뒤 便宜一点儿吧(piányi yìdiǎnr ba, 조금 싸게 해 주세요)라고 부탁하고, 太~了는 너무 ~하다, 便宜는 싸다라는 뜻임을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g class="t">${tag(12, 64, 150, 96)}${Z(96, 108, '三十块', 28)}${T(96, 142, '30위안', { s: 20, c: C.c, w: 800 })}</g>
        <g class="s0">${R(178, 40, 290, 92, { f: C.b, st: 'none', sw: 0, r: 20 })}
          ${Z(254, 82, '<tspan fill="#ff9500">太</tspan>贵<tspan fill="#ff9500">了</tspan>！', 30)}${T(400, 80, 'tài guì le', { s: 18, c: C.d, w: 800 })}
          ${T(323, 116, '너무 비싸요!', { s: 18, c: C.ink, w: 800 })}</g>
        <g class="s1">${R(178, 146, 290, 92, { f: '#e3f4e7', st: 'none', sw: 0, r: 20 })}
          ${Z(323, 186, '<tspan fill="#34a853">便宜</tspan>一点儿吧。', 28)}${T(323, 212, 'piányi yìdiǎnr ba', { s: 18, c: C.r, w: 800 })}
          ${T(323, 232, '조금 싸게 해 주세요', { s: 18, c: C.ink, w: 800 })}</g>
        <g class="g0">${R(12, 258, 218, 50, { f: C.a, st: 'none', sw: 0, r: 25 })}${Z(70, 292, '太~了', 24, C.c)}${T(170, 290, '너무 ~하다', { s: 18, w: 800 })}</g>
        <g class="g1">${R(250, 258, 218, 50, { f: '#e3f4e7', st: 'none', sw: 0, r: 25 })}${Z(296, 292, '便宜', 24, C.r)}${T(372, 290, 'piányi 싸다', { s: 18, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise, slide } = FX(el);
        dgAnim(el, 6000, e => {
          rise('.t', dgEase(dgP(e, 200, 500)));
          slide('.s0', dgEase(dgP(e, 1100, 500)), -20);
          slide('.s1', dgEase(dgP(e, 2400, 500)), -20);
          rise('.g0', dgEase(dgP(e, 3800, 500)));
          rise('.g1', dgEase(dgP(e, 4500, 500)));
        });
      }
    },

    'c5-07:3': {
      alt: '연필 五块(5위안)와 공책 八块(8위안)를 더하면 一共十三块(모두 13위안)이고, 一共多少钱?(모두 얼마예요?)라고 묻고 我买这个(이거 살게요)라고 말하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g class="p0"><g transform="translate(66,92)">${pencil}</g>${Z(66, 174, '五块', 28)}${T(66, 200, '5위안', { s: 18, c: C.sub })}</g>
        ${T(132, 126, '+', { s: 30, c: C.sub, w: 800, k: 'p1' })}
        <g class="p1"><g transform="translate(200,92)">${note}</g>${Z(200, 174, '八块', 28)}${T(200, 200, '8위안', { s: 18, c: C.sub })}</g>
        ${T(266, 126, '=', { s: 30, c: C.sub, w: 800, k: 'sum' })}
        <g class="sum">${R(290, 56, 176, 124, { f: C.c, st: 'none', sw: 0, r: 18 })}
          ${Z(378, 100, '一共', 28, '#fff')}${Z(378, 140, '十三块', 30, '#fff')}${T(378, 168, '모두 13위안', { s: 18, c: '#fff', w: 800 })}</g>
        <g class="q">${R(12, 226, 222, 84, { f: C.b, st: 'none', sw: 0, r: 18 })}${Z(123, 262, '一共多少钱？', 24)}${T(123, 292, '모두 얼마예요?', { s: 18, c: C.d, w: 800 })}</g>
        <g class="bu">${R(246, 226, 222, 84, { f: '#f5f5f7', st: 'none', sw: 0, r: 18 })}${Z(357, 262, '我<tspan fill="#ff9500">买</tspan>这个。', 24)}${T(357, 292, '이거 살게요 (买 mǎi)', { s: 18, c: C.ink, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise, op } = FX(el);
        dgAnim(el, 5600, e => {
          rise('.p0', dgEase(dgP(e, 200, 500)));
          rise('.p1', dgEase(dgP(e, 1000, 500)));
          rise('.sum', dgEase(dgP(e, 2000, 600)));
          rise('.q', dgEase(dgP(e, 3400, 500)));
          rise('.bu', dgEase(dgP(e, 4200, 500)));
        });
      }
    },
  });
})();
