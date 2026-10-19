/* 5학년 중국어 · 오늘은 몇 월 며칠, 무슨 요일일까요? (c5-03) */
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
    ${R(x, y, w, 60, { f: st.f || '#fff', st: st.st || '#d2d2d7', sw: st.sw || 2 })}
    ${Z(x + w / 2, y + 43 - (34 - (st.zs || 34)) * 0.36, z, st.zs || 34, st.zc || C.ink)}
    ${g ? T(x + w / 2, y + 86, g, { s: 18, c: C.sub }) : ''}`;

  /* 0: 5월 달력 (1일 = 첫 칸) */
  let cal = '';
  for (let i = 0; i < 35; i++) {
    const x = 24 + (i % 7) * 26, y = 104 + Math.floor(i / 7) * 26;
    cal += `<rect x="${x}" y="${y}" width="22" height="22" rx="5" fill="${i < 31 ? '#f5f5f7' : 'none'}"/>`;
  }

  /* 1: 어제 · 오늘 · 내일 */
  const P1 = [
    { z: '昨天', p: 'zuótiān', m: '어제', d: 8 },
    { z: '今天', p: 'jīntiān', m: '오늘', d: 9, on: 1 },
    { z: '明天', p: 'míngtiān', m: '내일', d: 10 },
  ];

  /* 2: 요일 */
  const W = [['一', 'yī', '월'], ['二', 'èr', '화'], ['三', 'sān', '수'], ['四', 'sì', '목'], ['五', 'wǔ', '금'], ['六', 'liù', '토'], ['天', 'tiān', '일']];

  /* 3: 생일 문장 */
  const S3 = [['我的', 'wǒ de', '나의', 92], ['生日', 'shēngrì', '생일', 92], ['是', 'shì', '~이다', 62], ['三月十号', 'sān yuè shí hào', '3월 10일', 170]];

  Object.assign(DIAG, {
    'c5-03:0': {
      alt: '숫자 뒤에 月(yuè)를 붙이면 몇 월, 号(hào)를 붙이면 며칠이 되어 5월 5일은 五月五号(wǔ yuè wǔ hào)라고 월→일 순서로 말한다는 것을 달력과 함께 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="cal">${R(14, 44, 196, 236, { f: '#fff', st: '#d2d2d7' })}
          <path d="M14 58 a14 14 0 0 1 14 -14 h168 a14 14 0 0 1 14 14 v34 h-196 z" fill="${C.d}"/>
          ${Z(112, 80, '五月', 26, '#fff')}
          ${cal}</g>
        <g class="hi"><circle cx="139" cy="115" r="17" fill="${C.c}"/>${T(139, 122, '5', { s: 20, c: '#fff', w: 800 })}</g>
        <g class="m">${Z(232, 92, '五月', 32, C.ink, 'start')}${T(304, 90, 'wǔ yuè', { s: 20, c: C.d, w: 800, a: 'start' })}${T(468, 90, '= 5월', { s: 22, w: 800, a: 'end' })}</g>
        <g class="d">${Z(232, 156, '五号', 32, C.ink, 'start')}${T(304, 154, 'wǔ hào', { s: 20, c: C.c, w: 800, a: 'start' })}${T(468, 154, '= 5일', { s: 22, w: 800, a: 'end' })}</g>
        <g class="all">${R(226, 196, 244, 84, { f: C.a, st: 'none', sw: 0, r: 18 })}
          ${Z(348, 236, '<tspan fill="#0071e3">五月</tspan><tspan fill="#ff9500">五号</tspan>', 32)}
          ${T(348, 266, '월 → 일 순서', { s: 18, c: C.ink })}</g>
      </svg>`,
      play(el) {
        const { op, rise, slide } = FX(el);
        dgAnim(el, 5600, e => {
          op('.cal', dgP(e, 100, 400));
          slide('.m', dgEase(dgP(e, 700, 500)));
          const h = dgEase(dgP(e, 1900, 500));
          op('.hi', h);
          slide('.d', dgEase(dgP(e, 2300, 500)));
          rise('.all', dgEase(dgP(e, 3800, 600)));
        });
      }
    },

    'c5-03:1': {
      alt: '10월 8일·9일·10일 달력 종이에 昨天(zuótiān, 어제), 今天(jīntiān, 오늘), 明天(míngtiān, 내일)을 붙이고, 今天几月几号?(오늘은 몇 월 며칠?)에 今天十月九号(오늘은 10월 9일)라고 대답하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 352" class="dg-svg" role="img">
        ${P1.map((p, i) => { const x = 30 + i * 150, col = p.on ? C.d : '#aeaeb2'; return `<g class="p${i}">
          ${R(x, 44, 120, 124, { f: '#fff', st: col, sw: p.on ? 3 : 2 })}
          <path d="M${x} 58 a14 14 0 0 1 14 -14 h92 a14 14 0 0 1 14 14 v20 h-120 z" fill="${col}"/>
          ${T(x + 60, 72, '10월', { s: 18, c: '#fff', w: 800 })}
          ${T(x + 60, 142, p.d, { s: 48, c: p.on ? C.d : C.ink, w: 800 })}
          ${Z(x + 60, 204, p.z, 28, p.on ? C.d : C.ink)}
          ${T(x + 60, 228, p.p, { s: 18, c: C.sub, w: 800 })}
          ${T(x + 60, 252, p.m, { s: 18, c: C.ink, w: 800 })}</g>`; }).join('')}
        <g class="q">${R(12, 276, 220, 66, { f: C.b, st: 'none', sw: 0, r: 18 })}${Z(122, 308, '今天几月几号？', 24)}${T(122, 332, '오늘은 몇 월 며칠?', { s: 18, c: C.sub })}</g>
        <g class="a">${R(248, 276, 220, 66, { f: C.a, st: 'none', sw: 0, r: 18 })}${Z(358, 308, '今天十月九号。', 24)}${T(358, 332, '오늘은 10월 9일', { s: 18, c: C.sub })}</g>
      </svg>`,
      play(el) {
        const { rise, slide } = FX(el);
        dgAnim(el, 5400, e => {
          [1, 0, 2].forEach((i, n) => rise('.p' + i, dgEase(dgP(e, 200 + n * 900, 500))));
          rise('.q', dgEase(dgP(e, 3100, 500)));
          slide('.a', dgEase(dgP(e, 4000, 600)), -20);
        });
      }
    },

    'c5-03:2': {
      alt: '요일은 星期(xīngqī) 뒤에 숫자를 붙여 星期一(월요일)부터 星期六(토요일)까지 말하고, 일요일만 숫자가 아니라 星期天 또는 星期日라고 한다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <g class="xq">${R(150, 40, 180, 56, { f: C.ink, st: 'none', sw: 0, r: 28 })}${Z(206, 78, '星期', 30, '#fff')}${T(286, 76, 'xīngqī', { s: 20, c: '#fff', w: 800 })}</g>
        ${W.map((w, i) => { const x = 12 + i * 66, cx = x + 30, last = i === 6; return `<g class="w${i}">
          <path d="M240 98 C240 116 ${cx} 112 ${cx} 132" fill="none" stroke="#d2d2d7" stroke-width="2.5"/>
          ${R(x, 134, 60, 60, { f: last ? C.c : '#fff', st: last ? 'none' : C.d, sw: last ? 0 : 2.5 })}
          ${Z(cx, 176, w[0], 32, last ? '#fff' : C.ink)}
          ${T(cx, 218, w[1], { s: 18, c: last ? C.c : C.d, w: 800 })}
          ${T(cx, 244, w[2], { s: 20, c: C.ink, w: 800 })}</g>`; }).join('')}
        <g class="nt">${R(40, 268, 400, 50, { f: C.a, st: 'none', sw: 0, r: 25 })}
          ${T(66, 300, '일요일', { s: 20, w: 800, a: 'start' })}${Z(196, 302, '星期天', 26)}${T(264, 300, '또는', { s: 18, c: C.sub })}${Z(346, 302, '星期日', 26)}</g>
      </svg>`,
      play(el) {
        const { rise } = FX(el);
        dgAnim(el, 5600, e => {
          rise('.xq', dgEase(dgP(e, 200, 500)));
          W.forEach((w, i) => rise('.w' + i, dgEase(dgP(e, 900 + i * 450, 400))));
          rise('.nt', dgEase(dgP(e, 4600, 500)));
        });
      }
    },

    'c5-03:3': {
      alt: '我的(나의) + 生日(생일) + 是(이다) + 三月十号(3월 10일)로 我的生日是三月十号(내 생일은 3월 10일이에요)를 만들고, 생일인 친구에게 生日快乐(생일 축하해)라고 말하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${(() => { let x = 18; return S3.map((w, i) => { const g = `<g class="b${i}">${BL(x, 66, w[3], w[0], w[1], w[2], i === 0 ? { f: C.b, st: C.d, sw: 2.5 } : i === 3 ? { f: C.a, st: C.c, sw: 2.5, pc: C.c, zs: 30 } : {})}</g>`; x += w[3] + 10; return g; }).join(''); })()}
        <g class="tr">${T(240, 190, '내 생일은 3월 10일이에요', { s: 20, w: 800 })}</g>
        <g class="hb">${R(70, 216, 340, 70, { f: '#fff4e6', st: C.c, sw: 2.5, r: 20 })}
          ${Z(170, 258, '生日快乐！', 30)}${T(338, 246, 'shēngrì kuàilè', { s: 18, c: C.c, w: 800 })}${T(338, 272, '생일 축하해!', { s: 18, c: C.ink, w: 800 })}</g>
      </svg>`,
      play(el) {
        const { op, rise } = FX(el);
        dgAnim(el, 5600, e => {
          S3.forEach((w, i) => rise('.b' + i, dgEase(dgP(e, 200 + i * 650, 450))));
          op('.tr', dgP(e, 3000, 500));
          rise('.hb', dgEase(dgP(e, 4100, 600)));
        });
      }
    },
  });
})();
