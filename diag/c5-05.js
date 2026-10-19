/* 5학년 중국어 · 중국어로 '나는 ~을 좋아해!' 말해 볼까요? (c5-05) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"';
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
    ${R(x, y, w, st.h || 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${Z(x + w / 2, y + (st.h || 60) / 2 + 0.37 * (st.zs || 34), z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + (st.h || 60) + 26, g, { s: 18, c: C.sub }) : ''}`;

  /* 0: 순서 비교 */
  const XS = [96, 226, 356], BW = 104, COL = [C.d, C.c, C.r];
  const KO = [['나는', 0], ['판다를', 2], ['좋아해요', 1]];
  const ZW = [['我', 'wǒ', '나'], ['喜欢', 'xǐhuan', '좋아하다'], ['熊猫', 'xióngmāo', '판다']];

  /* 1: 활동 */
  const P1 = [
    { z: '唱歌', p: 'chàng gē', m: '노래하다' },
    { z: '看书', p: 'kàn shū', m: '책을 읽다' },
    { z: '踢足球', p: 'tī zúqiú', m: '축구를 하다' },
  ];

  /* 3: 喜欢 앞자리 */
  const P3 = [
    { s: '很', p: 'hěn', o: '熊猫', k: '나는 판다를 <tspan fill="#ff9500">아주</tspan> 좋아해요' },
    { s: '也', p: 'yě', o: '猫', k: '<tspan fill="#ff9500">나도</tspan> 고양이를 좋아해' },
    { s: '不', p: 'bù', o: '牛奶', k: '나는 우유를 좋아하지 <tspan fill="#ff9500">않아요</tspan>' },
  ];

  Object.assign(DIAG, {
    'c5-05:0': {
      alt: '우리말은 나는-판다를-좋아해요 순서지만 중국어는 我(나)-喜欢(좋아하다)-熊猫(판다) 순서로, 좋아하다가 좋아하는 것보다 앞에 온다는 것을 선으로 이어 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${T(16, 92, '우리말', { s: 18, c: C.sub, a: 'start' })}${T(16, 232, '중국어', { s: 18, c: C.sub, a: 'start' })}
        ${KO.map((k, i) => `<g class="k${i}">${R(XS[i], 60, BW, 50, { f: '#fff', st: COL[k[1]], sw: 2.5 })}${T(XS[i] + BW / 2, 93, k[0], { s: 22, w: 800 })}</g>`).join('')}
        ${KO.map((k, i) => `<path class="ln${i}" d="M${XS[i] + BW / 2} 114 C${XS[i] + BW / 2} 150 ${XS[k[1]] + BW / 2} 140 ${XS[k[1]] + BW / 2} 168" fill="none" stroke="${COL[k[1]]}" stroke-width="4" stroke-linecap="round" pathLength="1" stroke-dasharray="1"/>`).join('')}
        ${ZW.map((w, i) => `<g class="z${i}">${T(XS[i] + BW / 2, 190, w[1], { s: 20, c: COL[i], w: 800 })}${R(XS[i], 200, BW, 60, { f: '#fff', st: COL[i], sw: 2.5 })}${Z(XS[i] + BW / 2, 243, w[0], 34)}${T(XS[i] + BW / 2, 286, w[2], { s: 18, c: C.sub })}</g>`).join('')}
      </svg>`,
      play(el) {
        const { draw, rise } = FX(el);
        dgAnim(el, 6000, e => {
          KO.forEach((k, i) => rise('.k' + i, dgEase(dgP(e, 200 + i * 500, 450))));
          ZW.forEach((w, i) => rise('.z' + i, dgEase(dgP(e, 1900 + i * 500, 450))));
          [0, 2, 1].forEach((i, n) => draw('.ln' + i, dgEase(dgP(e, 3600 + n * 650, 600))));
        });
      }
    },

    'c5-05:1': {
      alt: '我喜欢(나는 ~을 좋아해) 뒤에 唱歌(노래하다), 看书(책을 읽다), 踢足球(축구를 하다) 같은 활동을 붙일 수 있다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <g class="x">${R(14, 126, 138, 94, { f: C.a, st: C.c, sw: 2.5 })}
          ${Z(83, 172, '我喜欢', 34)}${T(83, 202, 'wǒ xǐhuan', { s: 18, c: C.c, w: 800 })}
          ${T(83, 246, '나는 ~을', { s: 18, c: C.sub })}${T(83, 268, '좋아해', { s: 18, c: C.sub })}</g>
        ${P1.map((p, i) => { const cy = 84 + i * 92; return `<g class="p${i}">
          <path d="M154 173 C172 173 168 ${cy} 186 ${cy}" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round"/>
          ${R(188, cy - 38, 124, 76, { f: '#fff', st: C.r, sw: 2.5 })}
          ${Z(250, cy + 6, p.z, 30)}${T(250, cy + 30, p.p, { s: 18, c: C.r, w: 800 })}
          ${T(326, cy + 7, p.m, { s: 20, w: 800, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { rise, slide } = FX(el);
        dgAnim(el, 5000, e => {
          rise('.x', dgEase(dgP(e, 200, 500)));
          P1.forEach((p, i) => slide('.p' + i, dgEase(dgP(e, 1200 + i * 1000, 600))));
        });
      }
    },

    'c5-05:2': {
      alt: '你喜欢什么?(무엇을 좋아해?)에는 我喜欢…로 대답하고, 你喜欢狗吗?(개를 좋아하니?)에는 喜欢!(좋아해) 또는 不喜欢(bù xǐhuan, 안 좋아해)으로 대답하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="q0">${R(12, 44, 214, 76, { f: C.b, st: 'none', sw: 0, r: 18 })}${Z(119, 80, '你喜欢什么？', 26)}${T(119, 108, '무엇을 좋아해?', { s: 18, c: C.sub })}</g>
        <g class="a0"><path d="M232 82 h20 m-7 -7 l7 7 l-7 7" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${R(258, 44, 210, 76, { f: '#f5f5f7', st: 'none', sw: 0, r: 18 })}${Z(363, 80, '我喜欢熊猫。', 26)}${T(363, 108, '나는 판다를 좋아해', { s: 18, c: C.sub })}</g>
        <line x1="20" y1="138" x2="460" y2="138" stroke="#e5e5ea" stroke-width="2"/>
        <g class="q1">${R(12, 170, 214, 96, { f: C.b, st: 'none', sw: 0, r: 18 })}${Z(119, 206, '你喜欢狗吗？', 26)}${T(119, 232, 'nǐ xǐhuan gǒu ma', { s: 18, c: C.d, w: 800 })}${T(119, 256, '개를 좋아하니?', { s: 18, c: C.sub })}</g>
        <g class="ar1" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M230 204 C244 196 242 184 256 182"/><path d="M230 232 C244 240 242 252 256 254"/></g>
        <g class="y">${R(258, 152, 210, 62, { f: '#e3f4e7', st: C.r, sw: 2.5, r: 18 })}${Z(318, 192, '喜欢！', 26)}${T(410, 190, '좋아해!', { s: 18, c: C.r, w: 800 })}</g>
        <g class="n">${R(258, 224, 210, 62, { f: C.a, st: C.c, sw: 2.5, r: 18 })}${Z(318, 264, '不喜欢', 26)}${T(416, 252, 'bù xǐhuan', { s: 18, c: C.c, w: 800 })}${T(416, 274, '안 좋아해', { s: 18, c: C.ink, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, rise, slide } = FX(el);
        dgAnim(el, 6000, e => {
          rise('.q0', dgEase(dgP(e, 200, 500)));
          slide('.a0', dgEase(dgP(e, 1000, 500)));
          rise('.q1', dgEase(dgP(e, 2200, 500)));
          op('.ar1', dgP(e, 3000, 400));
          slide('.y', dgEase(dgP(e, 3400, 500)));
          slide('.n', dgEase(dgP(e, 4300, 500)));
        });
      }
    },

    'c5-05:3': {
      alt: '喜欢 바로 앞자리에 很(hěn, 아주), 也(yě, ~도), 不(bù, 안)를 넣어 我很喜欢熊猫, 我也喜欢猫, 我不喜欢牛奶를 만드는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 342" class="dg-svg" role="img">
        ${P3.map((r, i) => { const y = 50 + i * 104; return `<g class="r${i}">
          ${BL(36, y, 64, '我', '', '', { h: 54, zs: 30 })}
          ${R(110, y, 74, 54, { f: '#fff', st: '#c7c7cc', sw: 2, dash: 1 })}
          ${BL(194, y, 108, '喜欢', '', '', { h: 54, zs: 30 })}
          ${BL(312, y, 120, r.o, '', '', { h: 54, zs: 30 })}
          ${T(240, y + 76, r.k, { s: 18, c: C.ink, w: 800 })}</g>
          <g class="s${i}">${T(147, y - 7, r.p, { s: 20, c: C.c, w: 800 })}${R(110, y, 74, 54, { f: C.c, st: 'none', sw: 0 })}${Z(147, y + 38, r.s, 30, '#fff')}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { qa, op, rise } = FX(el);
        dgAnim(el, 6000, e => {
          P3.forEach((r, i) => {
            const st = 200 + i * 1800;
            op('.r' + i, dgP(e, st, 400));
            const f = dgEase(dgP(e, st + 600, 600));
            qa('.s' + i).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${-30 * (1 - f)})`); });
          });
        });
      }
    },
  });
})();
