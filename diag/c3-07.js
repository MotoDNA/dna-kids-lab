/* 4학년 중국어 · 우리 가족을 중국어로 어떻게 부를까? (c3-07) */
(() => {
  const C = DG_C, ZH = 'lang="zh-CN"';
  const T = (x, y, s, o = {}) => `<text${o.k ? ` class="${o.k}"` : ''}${o.zh ? ' ' + ZH : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const Z = (x, y, s, sz = 40, c = C.ink) => T(x, y, s, { s: sz, c, w: 600, zh: 1 });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.f || '#f5f5f7'}" stroke="${o.st || '#d2d2d7'}" stroke-width="${o.sw || 2}"/>`;
  const FX = el => {
    const qa = s => [...el.querySelectorAll(s)];
    const op = (s, v) => qa(s).forEach(n => n.setAttribute('opacity', v));
    const rise = (s, f, d = 14) => qa(s).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', `translate(0,${d * (1 - f)})`); });
    const draw = (s, f) => qa(s).forEach(n => { n.setAttribute('stroke-dashoffset', 1 - f); n.setAttribute('opacity', f > 0 ? 1 : 0); });
    return { qa, op, rise, draw };
  };

  /* 0: 爸爸 · 妈妈 — 첫 글자는 성조대로, 두 번째 글자는 가볍게(경성) */
  const P0 = [
    { cx: 125, z: '爸', p1: 'bà', p2: 'ba', m: '아빠', tone: 'M-22 0 L22 46' },
    { cx: 355, z: '妈', p1: 'mā', p2: 'ma', m: '엄마', tone: 'M-22 2 L22 2' },
  ];

  /* 1: 형제자매 2×2 */
  const P1 = [
    { z: '哥哥', p: 'gēge', m: '형·오빠', col: C.d, r: 0, c: 0 },
    { z: '姐姐', p: 'jiějie', m: '누나·언니', col: C.c, r: 0, c: 1 },
    { z: '弟弟', p: 'dìdi', m: '남동생', col: C.d, r: 1, c: 0 },
    { z: '妹妹', p: 'mèimei', m: '여동생', col: C.c, r: 1, c: 1 },
  ];

  /* 2: 할아버지·할머니 */
  const P2 = [
    { x: 66, z: '爷爷', p: 'yéye', m: '할아버지' },
    { x: 170, z: '奶奶', p: 'nǎinai', m: '할머니' },
    { x: 310, z: '<tspan fill="#ff9500">外</tspan>公', p: 'wàigōng', m: '외할아버지' },
    { x: 414, z: '<tspan fill="#ff9500">外</tspan>婆', p: 'wàipó', m: '외할머니' },
  ];

  /* 3: 문장 블록 */
  const S3 = [
    { y: 56, w: [['这', 'zhè', '이 사람'], ['是', 'shì', '~이다'], ['我', 'wǒ', '나(의)'], ['妈妈', 'māma', '엄마']], k: '이분은 우리 엄마예요' },
    { y: 222, w: [['我', 'wǒ', '나'], ['爱', 'ài', '사랑하다'], ['爸爸', 'bàba', '아빠']], k: '나는 아빠를 사랑해요' },
  ];
  const bw = z => (z.length > 1 ? 104 : 72);

  Object.assign(DIAG, {
    'c3-07:0': {
      alt: '爸爸(bàba)와 妈妈(māma)에서 첫 글자는 4성 bà, 1성 mā로 읽고, 두 번째 글자는 짧고 가볍게(경성) 읽는다는 것을 성조 선과 점으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${P0.map((p, i) => `<g>
          <g class="a${i}">${T(p.cx - 44, 70, p.p1, { s: 26, c: C.d, w: 800 })}${Z(p.cx - 44, 142, p.z, 62)}</g>
          <g class="b${i}">${T(p.cx + 44, 74, p.p2, { s: 22, c: C.sub, w: 700 })}${Z(p.cx + 44, 140, p.z, 44, C.sub)}</g>
          ${R(p.cx - 92, 160, 184, 64, { f: '#fff', st: '#e5e5ea' })}
          <path class="t${i}" transform="translate(${p.cx - 44},170)" d="${p.tone}" fill="none" stroke="${C.d}" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1"/>
          <circle class="d${i}" cx="${p.cx + 44}" cy="206" r="7" fill="${C.sub}"/>
          ${T(p.cx, 256, p.m, { s: 24, w: 800, k: 'm' + i })}
        </g>`).join('')}
        <g class="nt">${T(240, 292, '<tspan fill="#6e6e73">●</tspan> = 짧고 가볍게(경성)', { s: 18, c: C.sub })}</g>
      </svg>`,
      play(el) {
        const { op, rise, draw } = FX(el);
        dgAnim(el, 6200, e => {
          P0.forEach((p, i) => {
            const st = 300 + i * 2500;
            rise('.a' + i, dgEase(dgP(e, st, 500)));
            draw('.t' + i, dgEase(dgP(e, st + 500, 700)));
            rise('.b' + i, dgEase(dgP(e, st + 1300, 400)), 6);
            op('.d' + i, dgP(e, st + 1300, 300));
            op('.m' + i, dgP(e, st + 1800, 400));
          });
          op('.nt', dgP(e, 5400, 500));
        });
      }
    },

    'c3-07:1': {
      alt: '나보다 나이 많은 남자 형제는 哥哥(gēge), 여자 형제는 姐姐(jiějie), 어린 남자 형제는 弟弟(dìdi), 어린 여자 형제는 妹妹(mèimei)라고 부르는 것을 네 칸 표로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,30)">
        ${T(178, 30, '남자', { s: 20, c: C.d, w: 800 })}${T(376, 30, '여자', { s: 20, c: C.c, w: 800 })}
        ${T(42, 96, '나보다', { s: 18, c: C.sub })}${T(42, 120, '많아요', { s: 18, c: C.sub })}
        ${T(42, 202, '나보다', { s: 18, c: C.sub })}${T(42, 226, '어려요', { s: 18, c: C.sub })}
        ${P1.map((p, i) => { const x = 84 + p.c * 198, y = 46 + p.r * 106, hr = p.r ? 13 : 19; return `<g class="c${i}">
          ${R(x, y, 188, 98, { f: p.col === C.d ? '#eef5ff' : '#fff4e6', st: 'none', sw: 0 })}
          <circle cx="${x + 30}" cy="${y + 50 - (p.r ? 6 : 14)}" r="${hr}" fill="#fff" stroke="${p.col}" stroke-width="4"/>
          <path d="M${x + 30 - hr} ${y + 90} q${hr} ${-(p.r ? 26 : 40)} ${hr * 2} 0" fill="${p.col}" opacity=".8"/>
          ${Z(x + 118, y + 44, p.z, 36)}
          ${T(x + 118, y + 68, p.p, { s: 20, c: p.col, w: 800 })}
          ${T(x + 118, y + 90, p.m, { s: 18, c: C.sub })}
        </g>`; }).join('')}
        <g class="nt">${T(278, 286, '내가 남자든 여자든 똑같아요', { s: 18, c: C.ink })}</g>
      </g></svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5200, e => {
          P1.forEach((p, i) => rise('.c' + i, dgEase(dgP(e, 300 + i * 900, 500))));
          op('.nt', dgP(e, 4200, 500));
        });
      }
    },

    'c3-07:2': {
      alt: '아빠의 부모님은 爷爷(yéye), 奶奶(nǎinai), 엄마의 부모님은 外公(wàigōng), 外婆(wàipó)라고 부르고, 外(wài)는 바깥이라는 뜻이라 우리말 외할아버지·외할머니와 비슷하다는 것을 가계도로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 352" class="dg-svg" role="img"><g transform="translate(0,12)">
        <g fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round">
          <path class="l0" d="M118 140 V176"/><path class="l1" d="M362 140 V176"/>
          <path class="l0" d="M66 140 H170"/><path class="l1" d="M310 140 H414"/>
          <path class="l2" d="M118 236 V258 H362 V236 M240 258 V272"/>
        </g>
        ${P2.map((p, i) => `<g class="g${i < 2 ? 0 : 1}">
          ${R(p.x - 50, 44, 100, 96, { f: i < 2 ? '#eef5ff' : '#fff4e6', st: 'none', sw: 0 })}
          ${Z(p.x, 82, p.z, 30)}
          ${T(p.x, 106, p.p, { s: 18, c: i < 2 ? C.d : C.c, w: 800 })}
          ${T(p.x, 130, p.m, { s: 18, c: C.sub, w: 700 })}
        </g>`).join('')}
        <g class="g0">${R(68, 176, 100, 60, { f: '#fff', st: C.d, sw: 2.5 })}${Z(118, 214, '爸爸', 26)}</g>
        <g class="g1">${R(312, 176, 100, 60, { f: '#fff', st: C.c, sw: 2.5 })}${Z(362, 214, '妈妈', 26)}</g>
        <g class="g2">${R(206, 272, 68, 52, { f: C.ink, st: 'none', sw: 0 })}${T(240, 306, '나', { s: 22, c: '#fff', w: 800 })}</g>
        <g class="wai">${R(318, 274, 150, 50, { f: C.a, st: 'none', sw: 0 })}
          ${Z(352, 308, '外', 28, C.c)}${T(372, 307, '= 바깥', { s: 20, c: C.ink, w: 800, a: 'start' })}</g>
      </g></svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5600, e => {
          rise('.g2', dgEase(dgP(e, 200, 500)));
          op('.l2', dgP(e, 600, 400));
          rise('.g0', dgEase(dgP(e, 1000, 600)));
          op('.l0', dgP(e, 1300, 400));
          rise('.g1', dgEase(dgP(e, 2400, 600)));
          op('.l1', dgP(e, 2700, 400));
          rise('.wai', dgEase(dgP(e, 3800, 600)));
        });
      }
    },

    'c3-07:3': {
      alt: '这是我妈妈(이분은 우리 엄마예요)와 我爱爸爸(나는 아빠를 사랑해요)를 글자 블록과 뜻으로 나누어 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 354" class="dg-svg" role="img">
        ${S3.map((s, r) => { const tot = s.w.reduce((a, w) => a + bw(w[0]), 0) + (s.w.length - 1) * 10; let x = 240 - tot / 2; return s.w.map((w, i) => { const W = bw(w[0]), g = `<g class="w${r}_${i}">
            ${T(x + W / 2, s.y - 10, w[1], { s: 20, c: C.d, w: 800 })}
            ${R(x, s.y, W, 64, { f: '#fff', st: i === s.w.length - 1 ? C.c : '#d2d2d7', sw: 2.5 })}
            ${Z(x + W / 2, s.y + 45, w[0], 36)}
            ${T(x + W / 2, s.y + 90, w[2], { s: 18, c: C.sub })}</g>`; x += W + 10; return g; }).join('') + `<g class="k${r}">${T(240, s.y + 120, s.k, { s: 20, c: C.ink, w: 800 })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const { rise, op } = FX(el);
        dgAnim(el, 6400, e => {
          let t = 300;
          S3.forEach((s, r) => {
            s.w.forEach((w, i) => { rise(`.w${r}_${i}`, dgEase(dgP(e, t, 450))); t += 550; });
            op('.k' + r, dgP(e, t, 500)); t += 1000;
          });
        });
      }
    },
  });
})();
