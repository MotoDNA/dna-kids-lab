/* 4학년 중국어 · 고마울 때와 미안할 때 중국어로 뭐라고 할까? (c3-09) */
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
  const LITE = t => `<tspan fill="#aeaeb2" font-size="17">${t}</tspan>`;

  /* 0: 谢谢 + 사람 */
  const P0 = [
    { z: '你', p: 'nǐ', m: '너에게 고마워' },
    { z: '老师', p: 'lǎoshī', m: '선생님, 고맙습니다' },
    { z: '妈妈', p: 'māma', m: '엄마, 고마워요' },
  ];

  /* 1·2: 말하기 → 대답 두 가지 (공통 틀) */
  const talk = (A, B, note) => `<svg viewBox="0 0 480 322" class="dg-svg" role="img">
    <g class="ar" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M178 128 C196 120 196 86 212 82 m-8 -6 l8 6 l-6 8"/><path d="M178 158 C196 166 196 200 212 204 m-6 -8 l6 8 l-8 6"/></g>
    <g class="qa">${R(16, 94, 160, 96, { f: C.b, st: 'none', sw: 0, r: 20 })}
      ${Z(96, 132, A.z, 30)}${T(96, 158, A.p, { s: 20, c: C.d, w: 800 })}${T(96, 182, A.m, { s: 18, c: C.ink })}</g>
    ${B.map((b, i) => `<g class="b${i}">${R(216, 36 + i * 124, 248, 92, { f: '#fff4e6', st: 'none', sw: 0, r: 20 })}
      ${Z(340, 72 + i * 124, b.z, 30)}${T(340, 98 + i * 124, b.p, { s: 20, c: C.c, w: 800 })}${T(340, 120 + i * 124, b.m, { s: 18, c: C.ink })}</g>`).join('')}
    ${T(340, 150, '또는', { s: 18, c: C.sub, k: 'b1' })}
    <g class="nt">${note}</g>
  </svg>`;
  const talkPlay = el => {
    const { op, rise, slide } = FX(el);
    dgAnim(el, 5200, e => {
      slide('.qa', dgEase(dgP(e, 200, 500)));
      op('.ar', dgP(e, 1100, 400));
      rise('.b0', dgEase(dgP(e, 1500, 500)));
      rise('.b1', dgEase(dgP(e, 2600, 500)));
      op('.nt', dgP(e, 3800, 500));
    });
  };

  /* 3: 请 + 행동 */
  const P3 = [
    { y: 70, z: '进', p: 'jìn', g: '들어오다', r: '들어오세요!',
      ic: `<rect x="-24" y="-34" width="48" height="70" rx="4" fill="${C.a}" stroke="${C.c}" stroke-width="4"/><circle cx="13" cy="2" r="4" fill="${C.c}"/>` },
    { y: 206, z: '坐', p: 'zuò', g: '앉다', r: '앉으세요!',
      ic: `<path d="M-18 -34 V30 M-18 4 H20 V30" fill="none" stroke="${C.d}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><rect x="-20" y="-6" width="42" height="10" rx="4" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>` },
  ];

  Object.assign(DIAG, {
    'c3-09:0': {
      alt: '谢谢(xièxie) 뒤에 你, 老师, 妈妈를 붙이면 너에게 고마워, 선생님 고맙습니다, 엄마 고마워요가 된다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="x">${R(16, 118, 124, 100, { f: C.a, st: C.c, sw: 2.5 })}
          ${Z(78, 168, '谢谢', 40)}${T(78, 202, 'xiè' + LITE('xie'), { s: 22, c: C.c, w: 800 })}
          ${T(78, 246, '고마워', { s: 20, c: C.sub })}</g>
        ${P0.map((p, i) => { const cy = 76 + i * 92; return `<g class="p${i}">
          <path d="M142 168 C160 168 156 ${cy} 172 ${cy}" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round"/>
          ${R(174, cy - 36, 96, 72, { f: '#fff', st: C.d, sw: 2.5 })}
          ${Z(222, cy + 4, p.z, 30)}${T(222, cy + 28, p.p, { s: 18, c: C.d, w: 800 })}
          ${T(284, cy + 7, p.m, { s: 20, w: 800, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { rise, slide } = FX(el);
        dgAnim(el, 5000, e => {
          rise('.x', dgEase(dgP(e, 200, 500)));
          P0.forEach((p, i) => slide('.p' + i, dgEase(dgP(e, 1200 + i * 1000, 600))));
        });
      }
    },

    'c3-09:1': {
      alt: '谢谢你(고마워)라는 말에 不客气(bú kèqi, 천만에) 또는 不用谢(bú yòng xiè)로 대답하고, 이때 不는 bù가 아니라 bú로 읽는다는 것을 보여 주는 그림',
      svg: talk({ z: '谢谢你！', p: 'xièxie nǐ', m: '고마워!' },
        [{ z: '不客气！', p: 'bú kèqi', m: '천만에!' }, { z: '不用谢！', p: 'bú yòng xiè', m: '고마워할 필요 없어' }],
        `${R(96, 270, 288, 46, { f: '#f5f5f7', st: 'none', sw: 0, r: 23 })}${Z(150, 303, '不', 28)}${T(262, 302, '<tspan fill="#6e6e73">bù</tspan>  →  <tspan fill="#ff9500">bú</tspan> 로 읽어요', { s: 20, w: 800 })}`),
      play: talkPlay
    },

    'c3-09:2': {
      alt: '对不起(duìbuqǐ, 미안해)라는 말에 没关系(méi guānxi, 괜찮아) 또는 没事(méi shì)로 대답하고, 对不起의 가운데 不는 가볍게 읽는다는 것을 보여 주는 그림',
      svg: talk({ z: '对不起！', p: 'duì' + LITE('bu') + 'qǐ', m: '미안해!' },
        [{ z: '没关系！', p: 'méi guānxi', m: '괜찮아!' }, { z: '没事！', p: 'méi shì', m: '괜찮아, 별일 아니야' }],
        `${R(96, 270, 288, 46, { f: '#f5f5f7', st: 'none', sw: 0, r: 23 })}${T(240, 302, '가운데 <tspan fill="#aeaeb2">bu</tspan>는 가볍게', { s: 20, w: 800 })}`),
      play: talkPlay
    },

    'c3-09:3': {
      alt: '请(qǐng)을 행동 앞에 붙여 请进(들어오세요), 请坐(앉으세요)처럼 공손하게 권하는 말을 만드는 것을 문과 의자 그림과 함께 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        ${P3.map((p, i) => `<g>
          <g class="ic${i}" transform="translate(42,${p.y + 34})">${p.ic}</g>
          <g class="q${i}">${T(126, p.y - 10, 'qǐng', { s: 20, c: C.c, w: 800 })}${R(92, p.y, 68, 64, { f: C.a, st: C.c, sw: 2.5 })}${Z(126, p.y + 45, '请', 36)}${T(126, p.y + 90, '~하세요', { s: 18, c: C.sub })}</g>
          <g class="v${i}">${T(180, p.y + 41, '+', { s: 26, c: C.sub, w: 800 })}
            ${T(234, p.y - 10, p.p, { s: 20, c: C.d, w: 800 })}${R(200, p.y, 68, 64, { f: '#fff', st: C.d, sw: 2.5 })}${Z(234, p.y + 45, p.z, 36)}${T(234, p.y + 90, p.g, { s: 18, c: C.sub })}</g>
          <g class="r${i}">${T(290, p.y + 41, '=', { s: 26, c: C.sub, w: 800 })}${T(310, p.y + 40, p.r, { s: 22, w: 800, a: 'start' })}</g>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const { op, rise, slide } = FX(el);
        dgAnim(el, 5600, e => {
          P3.forEach((p, i) => {
            const st = 200 + i * 2500;
            op('.ic' + i, dgP(e, st, 400));
            rise('.v' + i, dgEase(dgP(e, st + 400, 500)));
            slide('.q' + i, dgEase(dgP(e, st + 1100, 500)), 30);
            rise('.r' + i, dgEase(dgP(e, st + 1800, 500)));
          });
        });
      }
    },
  });
})();
