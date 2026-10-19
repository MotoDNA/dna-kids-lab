/* 5학년 중국어 · 지금 몇 시예요? 중국어로 시간 말하기 (c5-04) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"', RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.k ? ` class="${o.k}"` : ''}${o.zh ? ' ' + ZH : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const Z = (x, y, s, sz = 40, c = C.ink, a) => T(x, y, s, { s: sz, c, w: 600, zh: 1, a });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.f || '#f5f5f7'}" stroke="${o.st || '#d2d2d7'}" stroke-width="${o.sw || 2}"/>`;
  const FX = el => {
    const qa = s => [...el.querySelectorAll(s)];
    const op = (s, v) => qa(s).forEach(n => n.setAttribute('opacity', v));
    const rise = (s, f, d = 14) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${d * (1 - f)})`); });
    const draw = (s, f) => qa(s).forEach(n => { n.setAttribute('stroke-dashoffset', 1 - f); n.setAttribute('opacity', f > 0 ? 1 : 0); });
    const rot = (s, deg, cx, cy) => qa(s).forEach(n => n.setAttribute('transform', `rotate(${deg.toFixed(2)} ${cx} ${cy})`));
    return { qa, op, rise, draw, rot };
  };
  const BL = (x, y, w, z, p, g, st = {}) => `${p ? T(x + w / 2, y - 10, p, { s: 20, c: st.pc || C.d, w: 800 }) : ''}
    ${R(x, y, w, 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${st.ko ? T(x + w / 2, y + 38, z, { s: 22, w: 800, c: st.zc || C.ink }) : Z(x + w / 2, y + 43 - (34 - (st.zs || 34)) * 0.36, z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + 86, g, { s: 18, c: C.sub }) : ''}`;

  /* 시계: 시침 .h<k>, 분침 .m<k> (12시 방향 기준, rotate 로 돌림) */
  const clock = (k, cx, cy, r, h, m) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="4"/>`;
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * Math.PI / 180, r0 = r - (i % 3 ? 8 : 12), r1 = r - 4;
      s += `<line x1="${(cx + r0 * Math.sin(a)).toFixed(1)}" y1="${(cy - r0 * Math.cos(a)).toFixed(1)}" x2="${(cx + r1 * Math.sin(a)).toFixed(1)}" y2="${(cy - r1 * Math.cos(a)).toFixed(1)}" stroke="${C.sub}" stroke-width="${i % 3 ? 2 : 3}" stroke-linecap="round"/>`;
    }
    [[12, 0], [3, 90], [6, 180], [9, 270]].forEach(([n, d]) => {
      const a = d * Math.PI / 180, rr = r - 26;
      s += T((cx + rr * Math.sin(a)).toFixed(1), (cy - rr * Math.cos(a) + 7).toFixed(1), n, { s: 18, c: C.sub, w: 800 });
    });
    s += `<line class="m${k}" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 14}" stroke="${C.c}" stroke-width="5" stroke-linecap="round" transform="rotate(${m} ${cx} ${cy})"/>`;
    s += `<line class="h${k}" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.5}" stroke="${C.ink}" stroke-width="7" stroke-linecap="round" transform="rotate(${h} ${cx} ${cy})"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="6" fill="${C.ink}"/>`;
    return s;
  };

  /* 3: 순서 같음 */
  const XS = [70, 210, 350], BW = 110, COL = [C.d, C.c, C.r];
  const KO = ['나는', '7시에', '일어나요'];
  const ZW = [['我', 'wǒ', '나'], ['七点', 'qī diǎn', '7시'], ['起床', 'qǐchuáng', '일어나다']];

  Object.assign(DIAG, {
    'c5-04:0': {
      alt: '시계가 3시를 가리키면 三点(sān diǎn, 3시), 2시를 가리키면 二点이 아니라 两点(liǎng diǎn, 2시)이라고 말한다는 것을 시계 두 개로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 306" class="dg-svg" role="img">
        ${clock(0, 120, 136, 80, 90, 0)}${clock(1, 360, 136, 80, 60, 0)}
        <g class="l0">${Z(120, 262, '三<tspan fill="#0071e3">点</tspan>', 34)}${T(120, 294, 'sān diǎn · 3시', { s: 20, c: C.sub, w: 800 })}</g>
        <g class="l1">${Z(330, 262, '两<tspan fill="#0071e3">点</tspan>', 34)}${T(360, 294, 'liǎng diǎn · 2시', { s: 20, c: C.sub, w: 800 })}
          <g class="x">${Z(424, 260, '二点', 24, '#aeaeb2')}<line x1="398" y1="252" x2="450" y2="252" stroke="${RED}" stroke-width="4" stroke-linecap="round"/></g></g>
      </svg>`,
      play(el) {
        const { op, rise, rot } = FX(el);
        dgAnim(el, 6400, e => {
          const a = dgEase(dgP(e, 200, 1800));
          rot('.h0', 90 * a, 120, 136); rot('.m0', 1080 * a, 120, 136);
          rise('.l0', dgEase(dgP(e, 2000, 500)));
          const b = dgEase(dgP(e, 2900, 1400));
          rot('.h1', 60 * b, 360, 136); rot('.m1', 720 * b, 360, 136);
          rise('.l1', dgEase(dgP(e, 4300, 500)));
          op('.x', dgP(e, 5200, 500));
        });
      }
    },

    'c5-04:1': {
      alt: '8시 10분은 八点十分(bā diǎn shí fēn), 3시 30분은 半(bàn)을 써서 三点半(sān diǎn bàn, 3시 반)이라고 말하는 것을 시계 두 개로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${clock(0, 120, 136, 80, 245, 60)}${clock(1, 360, 136, 80, 105, 180)}
        <g class="l0">${Z(120, 262, '八<tspan fill="#0071e3">点</tspan>十<tspan fill="#ff9500">分</tspan>', 30)}${T(120, 288, 'bā diǎn shí fēn', { s: 18, c: C.sub, w: 800 })}${T(120, 312, '8시 10분', { s: 18, c: C.ink, w: 800 })}</g>
        <g class="l1">${Z(360, 262, '三<tspan fill="#0071e3">点</tspan><tspan fill="#ff9500">半</tspan>', 30)}${T(360, 288, 'sān diǎn bàn', { s: 18, c: C.sub, w: 800 })}${T(360, 312, '3시 반 = 3시 30분', { s: 18, c: C.ink, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise, rot } = FX(el);
        dgAnim(el, 6000, e => {
          const a = dgEase(dgP(e, 300, 1600));
          rot('.h0', 240 + 5 * a, 120, 136); rot('.m0', 60 * a, 120, 136);
          rise('.l0', dgEase(dgP(e, 1900, 500)));
          const b = dgEase(dgP(e, 3000, 1800));
          rot('.h1', 90 + 15 * b, 360, 136); rot('.m1', 180 * b, 360, 136);
          rise('.l1', dgEase(dgP(e, 4700, 500)));
        });
      }
    },

    'c5-04:2': {
      alt: '하루를 早上(아침), 下午(오후), 晚上(저녁)으로 나누고, 现在(지금) + 下午(오후) + 四点(4시)처럼 때를 나타내는 말을 시간 앞에 붙여 现在下午四点(지금 오후 4시야)이라고 말하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">
        <g class="bar">
          <rect x="20" y="56" width="150" height="54" rx="12" fill="${C.a}"/>
          <rect x="174" y="56" width="150" height="54" rx="12" fill="${C.b}"/>
          <rect x="328" y="56" width="132" height="54" rx="12" fill="#e4d4f4"/>
          ${Z(95, 93, '早上', 28)}${Z(249, 93, '下午', 28)}${Z(394, 93, '晚上', 28)}
          ${T(95, 136, 'zǎoshang', { s: 18, c: C.c, w: 800 })}${T(249, 136, 'xiàwǔ', { s: 18, c: C.d, w: 800 })}${T(394, 136, 'wǎnshang', { s: 18, c: '#af52de', w: 800 })}
          ${T(95, 160, '아침', { s: 18, c: C.ink })}${T(249, 160, '오후', { s: 18, c: C.ink })}${T(394, 160, '저녁', { s: 18, c: C.ink })}</g>
        <g class="pin"><line x1="294" y1="50" x2="294" y2="116" stroke="${RED}" stroke-width="4" stroke-linecap="round"/><circle cx="294" cy="50" r="6" fill="${RED}"/></g>
        ${[['现在', 'xiànzài', '지금', {}], ['下午', 'xiàwǔ', '오후', { f: C.b, st: C.d, sw: 2.5 }], ['四点', 'sì diǎn', '4시', { f: '#ffe5e3', st: RED, sw: 2.5, pc: RED }]].map((b, i) => `<g class="b${i}">${BL(60 + i * 124, 210, 112, b[0], b[1], b[2], b[3])}</g>`).join('')}
        <g class="tr">${T(240, 324, '지금 오후 4시야', { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, rise, qa } = FX(el);
        dgAnim(el, 5600, e => {
          op('.bar', dgP(e, 100, 500));
          const p = dgEase(dgP(e, 800, 1400));
          qa('.pin').forEach(n => { n.setAttribute('opacity', p > 0 ? 1 : 0); n.setAttribute('transform', `translate(${-260 * (1 - p)},0)`); });
          [0, 1, 2].forEach(i => rise('.b' + i, dgEase(dgP(e, 2600 + i * 700, 500))));
          op('.tr', dgP(e, 4800, 500));
        });
      }
    },

    'c5-04:3': {
      alt: '우리말 나는-7시에-일어나요와 중국어 我(나)-七点(7시)-起床(일어나다)이 같은 순서로 나 → 시간 → 하는 일 차례라는 것을 선으로 이어 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 326" class="dg-svg" role="img">
        ${T(14, 90, '우리말', { s: 18, c: C.sub, a: 'start' })}${T(14, 228, '중국어', { s: 18, c: C.sub, a: 'start' })}
        ${KO.map((k, i) => `<g class="k${i}">${R(XS[i] + 6, 58, BW - 12, 50, { f: '#fff', st: COL[i], sw: 2.5 })}${T(XS[i] + BW / 2, 91, k, { s: 22, w: 800 })}</g>`).join('')}
        ${KO.map((k, i) => `<path class="ln${i}" d="M${XS[i] + BW / 2} 112 V168" fill="none" stroke="${COL[i]}" stroke-width="4" stroke-linecap="round" pathLength="1" stroke-dasharray="1"/>`).join('')}
        ${ZW.map((w, i) => `<g class="z${i}">${T(XS[i] + BW / 2, 188, w[1], { s: 20, c: COL[i], w: 800 })}${R(XS[i], 198, BW, 60, { f: '#fff', st: COL[i], sw: 2.5 })}${Z(XS[i] + BW / 2, 241, w[0], 34)}${T(XS[i] + BW / 2, 284, w[2], { s: 18, c: C.sub })}</g>`).join('')}
        <g class="ok">${T(240, 318, '나 → 시간 → 하는 일', { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, draw, rise } = FX(el);
        dgAnim(el, 5600, e => {
          KO.forEach((k, i) => rise('.k' + i, dgEase(dgP(e, 200 + i * 450, 450))));
          ZW.forEach((w, i) => rise('.z' + i, dgEase(dgP(e, 1700 + i * 450, 450))));
          KO.forEach((k, i) => draw('.ln' + i, dgEase(dgP(e, 3200 + i * 400, 500))));
          op('.ok', dgP(e, 4600, 500));
        });
      }
    },
  });
})();
