/* 4학년 중국어 · 중국어로 내 이름을 소개해 볼까? (c3-10) */
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
  /* 블록 하나: 병음(위) · 상자 · 한자 · 뜻(아래) */
  const BL = (x, y, w, z, p, g, st = {}) => `${p ? T(x + w / 2, y - 10, p, { s: 20, c: st.pc || C.d, w: 800 }) : ''}
    ${R(x, y, w, 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${st.ko ? T(x + w / 2, y + 40, z, { s: 26, w: 800, c: st.zc || C.ink }) : Z(x + w / 2, y + 43 - (34 - (st.zs || 34)) * 0.36, z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + 86, g, { s: 18, c: C.sub }) : ''}`;

  /* 3: 자기소개 순서 */
  const P3 = [
    { k: '인사', z: '你好！', p: 'nǐ hǎo' },
    { k: '이름', z: '我叫王小明。', p: 'wǒ jiào Wáng Xiǎomíng' },
    { k: '나라', z: '我是中国人。', p: 'wǒ shì Zhōngguórén' },
    { k: '반가워', z: '认识你很高兴！', p: 'rènshi nǐ hěn gāoxìng' },
  ];
  const SUR = [['金', 'Jīn', '김'], ['李', 'Lǐ', '이'], ['朴', 'Piáo', '박'], ['崔', 'Cuī', '최']];

  Object.assign(DIAG, {
    'c3-10:0': {
      alt: '我(wǒ, 나) + 叫(jiào, 부르다) + 이름으로 我叫王小明(나는 왕샤오밍이라고 해요)을 만들고, 이름 자리에 한국 이름 민준을 넣어도 된다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g class="a0">${BL(80, 60, 70, '我', 'wǒ', '나')}</g>
        <g class="a1">${BL(160, 60, 70, '叫', 'jiào', '~라고 부르다')}</g>
        <g class="a2">${BL(240, 60, 160, '王小明', 'Wáng Xiǎomíng', '왕샤오밍', { f: C.a, st: C.c, sw: 2.5, pc: C.c })}</g>
        <g class="b">
          <path d="M320 178 v16 m-8 -8 l8 8 l8 -8" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${BL(80, 206, 70, '我', '', '')}${BL(160, 206, 70, '叫', '', '')}
          ${BL(240, 206, 160, '민준', '', '', { f: C.b, st: C.d, sw: 2.5, ko: 1 })}
          ${T(240, 300, '나는 민준이라고 해요', { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 5000, e => {
          [0, 1, 2].forEach(i => rise('.a' + i, dgEase(dgP(e, 200 + i * 800, 500))));
          rise('.b', dgEase(dgP(e, 3000, 700)), -16);
        });
      }
    },

    'c3-10:1': {
      alt: '你叫什么名字?(이름이 뭐야?)에서 什么名字 자리에 이름을 넣어 我叫王小明(나는 왕샤오밍이야)이라고 대답하고, 你呢?(너는?)로 되묻는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        <g class="lb">${T(14, 104, 'A', { s: 20, c: C.sub, w: 800, a: 'start' })}${T(14, 252, 'B', { s: 20, c: C.sub, w: 800, a: 'start' })}</g>
        <g class="q0">${BL(40, 64, 70, '你', 'nǐ', '너는')}</g>
        <g class="q1">${BL(120, 64, 70, '叫', 'jiào', '부르다')}</g>
        <g class="q2">${BL(200, 64, 180, '什么名字', 'shénme míngzi', '무슨 이름?', { f: C.a, st: C.c, sw: 2.5 })}</g>
        <path class="ar" d="M290 160 v22 m-9 -9 l9 9 l9 -9" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="a0">${BL(40, 212, 70, '我', 'wǒ', '나는')}</g>
        <g class="a1">${BL(120, 212, 70, '叫', 'jiào', '부르다')}</g>
        <g class="a2">${BL(200, 212, 180, '王小明', 'Wáng Xiǎomíng', '왕샤오밍', { f: C.c, st: 'none', sw: 0, zc: '#fff', pc: C.c })}</g>
        <g class="ne">${BL(390, 212, 80, '你呢', 'nǐ ne', '너는?', { f: C.b, st: C.d, sw: 2.5, zs: 28 })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 6000, e => {
          op('.lb', 1);
          [0, 1, 2].forEach(i => rise('.q' + i, dgEase(dgP(e, 200 + i * 500, 450))));
          [0, 1].forEach(i => rise('.a' + i, dgEase(dgP(e, 2000 + i * 500, 450))));
          op('.ar', dgP(e, 3100, 400));
          rise('.a2', dgEase(dgP(e, 3500, 600)), -20);
          rise('.ne', dgEase(dgP(e, 4700, 500)));
        });
      }
    },

    'c3-10:2': {
      alt: '王小明에서 王(Wáng)이 성, 小明(Xiǎomíng)이 이름이고, 우리 성 김·이·박·최는 한자로 金(Jīn), 李(Lǐ), 朴(Piáo), 崔(Cuī)라고 읽는다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g class="s">${BL(120, 60, 80, '王', 'Wáng', '', { f: C.a, st: C.c, sw: 2.5, pc: C.c })}${T(160, 148, '성', { s: 20, c: C.c, w: 800 })}</g>
        <g class="n">${BL(210, 60, 130, '小明', 'Xiǎomíng', '', { f: C.b, st: C.d, sw: 2.5 })}${T(275, 148, '이름', { s: 20, c: C.d, w: 800 })}</g>
        <g class="o">${T(400, 98, '성이', { s: 18, c: C.sub, w: 700 })}${T(400, 122, '먼저!', { s: 18, c: C.sub, w: 700 })}</g>
        <line x1="20" y1="170" x2="460" y2="170" stroke="#e5e5ea" stroke-width="2"/>
        ${SUR.map((c, i) => { const x = 24 + i * 112; return `<g class="c${i}">
          ${R(x, 186, 96, 120, { f: '#fff', st: '#d2d2d7' })}
          ${Z(x + 48, 234, c[0], 40)}${T(x + 48, 264, c[1], { s: 22, c: C.c, w: 800 })}${T(x + 48, 292, c[2], { s: 20, c: C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 5400, e => {
          rise('.s', dgEase(dgP(e, 200, 500)));
          rise('.n', dgEase(dgP(e, 900, 500)));
          rise('.o', dgEase(dgP(e, 1600, 500)));
          SUR.forEach((c, i) => rise('.c' + i, dgEase(dgP(e, 2600 + i * 600, 500))));
        });
      }
    },

    'c3-10:3': {
      alt: '자기소개는 인사(你好), 이름(我叫王小明), 나라(我是中国人), 반가워(认识你很高兴) 순서로 말한다는 것을 네 단계로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <line class="ln" x1="36" y1="66" x2="36" y2="282" stroke="#d2d2d7" stroke-width="3"/>
        ${P3.map((p, i) => { const y = 66 + i * 72; return `<g class="r${i}">
          <circle cx="36" cy="${y}" r="20" fill="${i === 3 ? C.c : C.d}"/>${T(36, y + 7, i + 1, { s: 20, c: '#fff', w: 800 })}
          ${T(68, y + 7, p.k, { s: 20, c: i === 3 ? C.c : C.d, w: 800, a: 'start' })}
          ${Z(148, y + 6, p.z, 28, C.ink, 'start')}
          ${T(150, y + 30, p.p, { s: 18, c: C.sub, w: 700, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { qa, op, slide } = FX(el);
        dgAnim(el, 5400, e => {
          const L = dgEase(dgP(e, 200, 3600));
          qa('.ln').forEach(n => n.setAttribute('y2', 66 + 216 * L));
          P3.forEach((p, i) => slide('.r' + i, dgEase(dgP(e, 200 + i * 1200, 600))));
        });
      }
    },
  });
})();
