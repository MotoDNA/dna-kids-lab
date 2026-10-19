/* 5학년 중국어 · 중국어로 나를 소개해 볼까요? (c5-01) */
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
    const draw = (s, f) => qa(s).forEach(n => { n.setAttribute('stroke-dashoffset', 1 - f); n.setAttribute('opacity', f > 0 ? 1 : 0); });
    return { qa, op, rise, slide, draw };
  };
  const BL = (x, y, w, z, p, g, st = {}) => `${p ? T(x + w / 2, y - 10, p, { s: 20, c: st.pc || C.d, w: 800 }) : ''}
    ${R(x, y, w, 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${st.ko ? T(x + w / 2, y + 39, z, { s: 22, w: 800, c: st.zc || C.ink }) : Z(x + w / 2, y + 43 - (34 - (st.zs || 34)) * 0.36, z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + 86, g, { s: 18, c: C.sub }) : ''}`;

  /* 0: 성조 곡선 (5단계 높이: 5→y64, 1→y150) */
  const lv = n => 150 - (n - 1) * 21.5;
  const TONES = [
    { s: 'ā', t: '평평하게', d: (x0, x1) => `M${x0} ${lv(5)} L${x1} ${lv(5)}` },
    { s: 'á', t: '쭉 올려', d: (x0, x1) => `M${x0} ${lv(3)} L${x1} ${lv(5)}` },
    { s: 'ǎ', t: '내렸다 올려', d: (x0, x1) => `M${x0} ${lv(2.2)} Q${(x0 + x1) / 2 - 6} ${lv(0.2)} ${x1} ${lv(4)}` },
    { s: 'à', t: '뚝 떨어져', d: (x0, x1) => `M${x0} ${lv(5)} L${x1} ${lv(1)}` },
  ];

  /* 1: 우리말 순서 vs 중국어 순서 */
  const XS = [96, 226, 356], BW = 104;
  const COL = [C.d, C.c, C.r];
  const KO = [['나는', 0], ['학생', 2], ['이에요', 1]];
  const ZW = [['我', 'wǒ', '나'], ['是', 'shì', '~이다'], ['学生', 'xuésheng', '학생']];

  Object.assign(DIAG, {
    'c5-01:0': {
      alt: '성조 네 가지의 높낮이 선: ā는 높고 평평하게, á는 쭉 올리고, ǎ는 내렸다가 올리고, à는 뚝 떨어뜨려 읽으며, 你好(nǐ hǎo)는 너(你)와 좋다(好)가 합쳐진 인사라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 326" class="dg-svg" role="img"><g transform="translate(0,10)">
        ${TONES.map((t, i) => { const x = 10 + i * 116; return `<g>
          ${R(x, 44, 112, 124, { f: '#f5f5f7', st: 'none', sw: 0 })}
          ${[1, 2, 3, 4, 5].map(n => `<line x1="${x + 8}" x2="${x + 104}" y1="${lv(n)}" y2="${lv(n)}" stroke="#e5e5ea" stroke-width="1.5"/>`).join('')}
          <path class="t${i}" d="${t.d(x + 20, x + 92)}" fill="none" stroke="${C.d}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"/>
          <g class="l${i}">${T(x + 56, 206, t.s, { s: 34, c: C.d, w: 800 })}${T(x + 56, 236, t.t, { s: 18, c: C.sub })}</g></g>`; }).join('')}
        <g class="nh">${R(64, 256, 352, 52, { f: C.a, st: 'none', sw: 0, r: 26 })}
          ${Z(92, 292, '你', 28)}${T(126, 290, 'nǐ', { s: 20, c: C.c, w: 800 })}${T(156, 290, '너', { s: 18, c: C.sub })}
          ${T(184, 290, '+', { s: 22, c: C.sub, w: 800 })}
          ${Z(212, 292, '好', 28)}${T(252, 290, 'hǎo', { s: 20, c: C.c, w: 800 })}${T(294, 290, '좋다', { s: 18, c: C.sub })}
          ${T(328, 290, '→', { s: 22, c: C.sub, w: 800 })}${T(376, 291, '안녕!', { s: 22, w: 800 })}</g>
      </g></svg>`,
      play(el) {
        const { op, draw, rise } = FX(el);
        dgAnim(el, 6400, e => {
          TONES.forEach((t, i) => {
            const st = 200 + i * 1250;
            draw('.t' + i, dgEase(dgP(e, st, 800)));
            op('.l' + i, dgP(e, st + 200, 400));
          });
          rise('.nh', dgEase(dgP(e, 5400, 600)));
        });
      }
    },

    'c5-01:1': {
      alt: '우리말은 나는-학생-이에요 순서지만 중국어는 我(나)-是(이다)-学生(학생) 순서로 말한다는 것을, 같은 뜻끼리 선으로 이어 보여 주는 그림',
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

    'c5-01:2': {
      alt: '你叫什么名字?(이름이 뭐야?)의 什么名字 자리에 이름을 넣어 我叫敏浩(나는 민호라고 해)라고 대답하고, 我是敏浩라고 해도 같은 뜻이라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 362" class="dg-svg" role="img">
        <g class="lb">${T(14, 104, 'A', { s: 20, c: C.sub, w: 800, a: 'start' })}${T(14, 252, 'B', { s: 20, c: C.sub, w: 800, a: 'start' })}</g>
        <g class="q0">${BL(40, 64, 70, '你', 'nǐ', '너는')}</g>
        <g class="q1">${BL(120, 64, 70, '叫', 'jiào', '부르다')}</g>
        <g class="q2">${BL(200, 64, 190, '什么名字', 'shénme míngzi', '무엇 + 이름', { f: C.a, st: C.c, sw: 2.5 })}</g>
        <path class="ar" d="M295 160 v22 m-9 -9 l9 9 l9 -9" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="a0">${BL(40, 212, 70, '我', 'wǒ', '나는')}</g>
        <g class="a1">${BL(120, 212, 70, '叫', 'jiào', '부르다')}</g>
        <g class="a2">${BL(200, 212, 190, '敏浩', 'Mǐnhào', '민호', { f: C.c, st: 'none', sw: 0, zc: '#fff', pc: C.c })}</g>
        <g class="sh">${R(40, 316, 400, 42, { f: C.b, st: 'none', sw: 0, r: 21 })}
          ${T(60, 344, '또는', { s: 18, c: C.sub, a: 'start' })}${Z(108, 346, '我是敏浩', 26, C.ink, 'start')}${T(222, 344, 'wǒ shì Mǐnhào', { s: 18, c: C.d, w: 800, a: 'start' })}${T(424, 344, '같은 뜻', { s: 18, w: 800, a: 'end' })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 6000, e => {
          op('.lb', 1);
          [0, 1, 2].forEach(i => rise('.q' + i, dgEase(dgP(e, 200 + i * 500, 450))));
          [0, 1].forEach(i => rise('.a' + i, dgEase(dgP(e, 2000 + i * 500, 450))));
          op('.ar', dgP(e, 3100, 400));
          rise('.a2', dgEase(dgP(e, 3500, 600)), -20);
          rise('.sh', dgEase(dgP(e, 4800, 500)));
        });
      }
    },

    'c5-01:3': {
      alt: '你是中国人 끝에 吗(ma)를 붙이면 너는 중국 사람이니? 라는 묻는 말이 되고, 不(bù)는 4성인 是(shì) 앞에서 bú로 올려 읽어 不是(bú shì, 아니다)가 된다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <g class="s">${BL(30, 54, 240, '你是中国人', 'nǐ shì Zhōngguórén', '너는 중국 사람')}</g>
        <g class="m">${T(286, 94, '+', { s: 26, c: C.sub, w: 800 })}${BL(302, 54, 70, '吗', 'ma', '~이니?', { f: C.a, st: C.c, sw: 2.5, pc: C.c })}
          ${T(400, 100, '?', { s: 44, c: C.c, w: 800 })}</g>
        <line x1="20" y1="166" x2="460" y2="166" stroke="#e5e5ea" stroke-width="2"/>
        <g class="b">
          <text class="pb" x="130" y="204" text-anchor="middle" font-size="22" font-weight="800" fill="${C.c}">bú</text>
          ${R(90, 214, 80, 60, { f: C.a, st: C.c, sw: 2.5 })}${Z(130, 257, '不', 34)}
          ${T(230, 204, 'shì', { s: 22, c: C.d, w: 800 })}
          ${R(190, 214, 80, 60, { f: '#fff', st: C.d, sw: 2.5 })}${Z(230, 257, '是', 34)}
          ${R(90, 280, 180, 44, { f: '#f5f5f7', st: 'none', sw: 0, r: 10 })}
          <path class="tb" d="M110 312 L150 288" fill="none" stroke="${C.c}" stroke-width="5" stroke-linecap="round"/>
          <path d="M210 288 L250 316" fill="none" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
          ${T(290, 252, '=', { s: 26, c: C.sub, w: 800 })}
          ${T(310, 252, '아니에요', { s: 22, w: 800, a: 'start' })}
        </g>
        <g class="nt">${T(370, 300, '4성 앞에서', { s: 18, c: C.c })}${T(370, 322, 'bù → bú', { s: 18, c: C.c, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { qa, op, rise, slide } = FX(el);
        dgAnim(el, 6400, e => {
          rise('.s', dgEase(dgP(e, 200, 500)));
          slide('.m', dgEase(dgP(e, 1100, 600)), -30);
          rise('.b', dgEase(dgP(e, 2600, 500)));
          const f = dgEase(dgP(e, 3800, 900));
          // 4성(뚝) → 2성(올림)
          const y0 = 288 + 24 * f, y1 = 316 - 28 * f;
          qa('.tb').forEach(n => n.setAttribute('d', `M110 ${y0.toFixed(1)} L150 ${y1.toFixed(1)}`));
          qa('.pb').forEach(n => { n.textContent = f >= 0.5 ? 'bú' : 'bù'; });
          op('.nt', dgP(e, 4800, 500));
        });
      }
    },
  });
})();
