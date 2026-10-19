/* 5학년 국어 · 내 생각으로 다른 사람을 설득하는 글은 어떻게 쓸까? (k5-05) */
(() => {
  /* ── 공통 도우미 (이 파일 안에서만) ── */
  const C = DG_C, RED = '#ff3b30', LINE = '#d2d2d7', SOFT = '#f5f5f7', GRNF = '#d6efdc', REDF = '#ffe0de';
  const at = o => (o.t != null ? ` data-t="${o.t}"` : '') + (o.d ? ` data-d="${o.d}"` : '') + (o.o ? ` data-o="${o.o}"` : '') +
    (o.dx ? ` data-dx="${o.dx}"` : '') + (o.dy ? ` data-dy="${o.dy}"` : '') + (o.c ? ` class="${o.c}"` : '') + (o.draw ? ' data-draw="1"' : '');
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}"${o.lang ? ` lang="${o.lang}"` : ''}${at(o)}>${s}</text>`;
  const B = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || '#fff'}" stroke="${o.st || 'none'}" stroke-width="${o.sw || 2.5}"${o.da ? ` stroke-dasharray="${o.da}"` : ''}${at(o)}/>`;
  const G = (o, inner) => `<g${at(o)}>${inner}</g>`;
  const L = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.f || C.sub}" stroke-width="${o.sw || 3}" stroke-linecap="round"${o.da ? ` stroke-dasharray="${o.da}"` : ''}${at(o)}/>`;
  const ARR = (x1, y1, x2, y2, o = {}) => {
    const col = o.f || C.sub, w = o.sw || 3.5, a = Math.atan2(y2 - y1, x2 - x1), h = o.h || 10;
    const p = s => `${(x2 - h * Math.cos(a + s)).toFixed(1)} ${(y2 - h * Math.sin(a + s)).toFixed(1)}`;
    return `<g${at(o)}><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${p(-.55)} L${x2} ${y2} L${p(.55)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  const OK = (x, y, o = {}) => G(o, `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${C.r}"/><path d="M${x - 7} ${y} l5 5 l9 -10" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`);
  const NO = (x, y, o = {}) => G(o, `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${RED}"/><path d="M${x - 6} ${y - 6} l12 12 m0 -12 l-12 12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`);
  /* data-t(시작 ms)·data-d(길이)·data-o(사라지는 시각)·data-dx/dy(미끄러져 들어옴)·data-draw(선 그리기) 를 읽어 차례로 보여 줌 */
  const seq = (total, extra) => function (el) {
    const items = [...el.querySelectorAll('[data-t]')];
    const lens = items.map(n => n.dataset.draw && n.getTotalLength ? n.getTotalLength() : 0);
    dgAnim(el, total, e => {
      items.forEach((n, i) => {
        let p = dgEase(dgP(e, +n.dataset.t, +(n.dataset.d || 500)));
        if (n.dataset.draw) { n.setAttribute('stroke-dasharray', lens[i]); n.setAttribute('stroke-dashoffset', lens[i] * (1 - p)); n.setAttribute('opacity', p > 0 ? 1 : 0); }
        else n.setAttribute('opacity', n.dataset.o ? p * (1 - dgEase(dgP(e, +n.dataset.o, 500))) : p);
        if (n.dataset.dx || n.dataset.dy) n.setAttribute('transform', `translate(${((+n.dataset.dx || 0) * (1 - p)).toFixed(1)},${((+n.dataset.dy || 0) * (1 - p)).toFixed(1)})`);
      });
      if (extra) extra(el, e);
    });
  };
  const TW = (s, f = 20) => [...s].reduce((w, ch) => w + (/[\u3131-\uD7A3]/.test(ch) ? f * .96 : ch === ' ' ? f * .28 : f * .6), 0);
  const svg = (h, inner) => `<svg viewBox="0 0 480 ${h}" class="dg-svg" role="img">${inner}</svg>`;

  const lines = (x, y, arr, o = {}) => arr.map((s, i) => T(x, y + i * (o.lh || 26), s, o)).join('');
  /* 3: 지울 낱말 위치는 재생할 때 tspan 크기를 재서 맞춤 */
  const fitStrikes = el => el.querySelectorAll('.stk').forEach(l => {
    const sp = el.querySelector('.' + l.dataset.for); if (!sp || !sp.getBBox) return;
    const bb = sp.getBBox(); l.setAttribute('x1', bb.x - 3); l.setAttribute('x2', bb.x + bb.width + 3); l.setAttribute('y1', bb.y + bb.height * .55); l.setAttribute('y2', bb.y + bb.height * .55);
  });
  const stk = (cls, t) => `<line class="stk" data-for="${cls}" x1="0" y1="0" x2="10" y2="0" stroke="${RED}" stroke-width="3.5" stroke-linecap="round" data-t="${t}" data-d="400"/>`;

  /* 4: 계단 */
  const STAIR = [['문제', '찾기'], ['주장', '정하기'], ['근거·자료', '모으기'], ['개요', '짜기'], ['글', '쓰기'], ['고쳐', '쓰기']];

  Object.assign(DIAG, {
    'k5-05:0': {
      alt: '주장 놀이터에 그늘막을 설치해야 한다를 근거 1(놀이 기구가 햇볕에 달궈져 화상 위험)과 근거 2(그늘에서 아이와 어른이 함께 쉴 수 있음) 두 기둥이 받치고 있는 그림',
      svg: svg(290, `
        ${L(20, 272, 460, 272, { f: C.ink, sw: 4 })}
        ${[['근거 1', ['놀이 기구가', '햇볕에 달궈져', '화상 위험']], ['근거 2', ['그늘에서', '아이와 어른이', '함께 쉴 수 있음']]].map(([k, a], i) => {
          const x = 40 + i * 220;
          return G({ t: 300 + i * 900, d: 600, dy: 40 }, `${B(x, 132, 180, 140, { f: C.a, st: C.c, sw: 3, rx: 6 })}${T(x + 90, 160, k, { s: 18, f: C.c, w: 800 })}${lines(x + 90, 192, a, { s: 20, w: 700 })}`);
        }).join('')}
        ${G({ t: 2200, d: 700, dy: -40 }, `${B(24, 46, 432, 74, { f: C.d, rx: 14 })}${T(240, 74, '주장', { s: 18, f: '#fff', w: 800 })}${T(240, 104, '놀이터에 그늘막을 설치해야 한다', { s: 21, w: 800, f: '#fff' })}`)}
      `),
      play: seq(3200)
    },

    'k5-05:1': {
      alt: '논설문의 짜임: 서론(문제 상황과 주장) → 본론(근거 1, 근거 2, 근거 3과 뒷받침 자료) → 결론(내용 요약과 주장 강조)',
      svg: svg(290, `
        ${G({ t: 200, d: 500, dy: -12 }, `${B(14, 44, 96, 56, { f: C.d, rx: 14 })}${T(62, 79, '서론', { s: 22, w: 800, f: '#fff' })}${B(122, 44, 344, 56, { f: C.b, rx: 14 })}${T(294, 79, '문제 상황 + 주장', { s: 21, w: 800 })}`)}
        ${G({ t: 1100, d: 500, dy: -12 }, `${B(14, 110, 96, 100, { f: C.c, rx: 14 })}${T(62, 167, '본론', { s: 22, w: 800, f: '#fff' })}`)}
        ${[0, 1, 2].map(i => G({ t: 1400 + i * 500, d: 400, dy: -12 }, `${B(122 + i * 118, 110, 108, 100, { f: C.a, rx: 14 })}${T(176 + i * 118, 152, '근거 ' + (i + 1), { s: 21, w: 800 })}${T(176 + i * 118, 182, '+ 자료', { s: 18, f: C.sub, w: 700 })}`)).join('')}
        ${G({ t: 3200, d: 500, dy: -12 }, `${B(14, 220, 96, 56, { f: C.r, rx: 14 })}${T(62, 255, '결론', { s: 22, w: 800, f: '#fff' })}${B(122, 220, 344, 56, { f: GRNF, rx: 14 })}${T(294, 255, '요약 + 주장 강조', { s: 21, w: 800 })}`)}
      `),
      play: seq(4000)
    },

    'k5-05:2': {
      alt: '어린이 30명에게 물었더니 25명이 여름에는 미끄럼틀이 뜨거워 탈 수 없다고 답한 조사 결과를 사람 30명 가운데 25명을 색칠해 보여 주는 그림. 숫자 자료가 근거를 탄탄하게 해요',
      svg: svg(300, `
        ${Array.from({ length: 30 }, (_, i) => { const x = 105 + (i % 10) * 30, y = 64 + Math.floor(i / 10) * 40;
          return `<g class="pp" data-i="${i}"><circle cx="${x}" cy="${y - 7}" r="7"/><path d="M${x - 10} ${y + 16} a10 10 0 0 1 20 0 Z"/></g>`; }).join('')}
        <text class="cnt" x="240" y="214" text-anchor="middle" font-size="26" font-weight="800" fill="${C.c}">25명 / 30명</text>
        ${T(240, 246, '"여름에는 미끄럼틀이 뜨거워 탈 수 없어요"', { s: 20, w: 700 })}
        ${T(240, 282, '조사 결과 = 믿을 만한 근거', { s: 18, f: C.sub, w: 700, t: 3600, d: 400 })}
      `),
      play: seq(4200, (el, e) => {
        const n = Math.round(25 * dgEase(dgP(e, 400, 2800)));
        el.querySelectorAll('.pp').forEach(g => g.setAttribute('fill', +g.dataset.i < n ? C.c : '#d2d2d7'));
        el.querySelector('.cnt').textContent = `${n}명 / 30명`;
      })
    },

    'k5-05:3': {
      alt: '고치기 전 문장 그늘막이 없으면 모든 아이가 반드시 화상을 입는다에서 지나치게 단정하는 말 모든과 반드시를 지우고, 화상을 입을 위험이 크다로 고친 그림',
      svg: svg(290, `
        ${B(20, 50, 440, 96, { f: REDF, rx: 16 })}${NO(436, 74, { r: 14 })}
        <text x="40" y="92" font-size="22" font-weight="700" fill="${C.ink}">그늘막이 없으면 <tspan class="w1" fill="${RED}" font-weight="800">모든</tspan> 아이가</text>
        <text x="40" y="124" font-size="22" font-weight="700" fill="${C.ink}"><tspan class="w2" fill="${RED}" font-weight="800">반드시</tspan> 화상을 입는다.</text>
        ${stk('w1', 900)}${stk('w2', 1300)}
        ${T(440, 132, '지나친 단정', { s: 18, f: RED, w: 800, a: 'end', t: 1700, d: 400 })}
        ${ARR(240, 152, 240, 172, { f: C.ink, t: 2200, d: 300 })}
        ${G({ t: 2500, d: 600, dy: 12 }, `${B(20, 176, 440, 96, { f: GRNF, rx: 16 })}${OK(436, 200, { r: 14 })}<text x="40" y="216" font-size="22" font-weight="700" fill="${C.ink}">그늘막이 없으면 아이들이</text>
          <text x="40" y="248" font-size="22" font-weight="700" fill="${C.ink}">화상을 입을 <tspan fill="#1e7a3a" font-weight="800">위험이 크다.</tspan></text>`)}
      `),
      play(el) { fitStrikes(el); if (document.fonts) document.fonts.ready.then(() => fitStrikes(el)); seq(3600)(el); }
    },

    'k5-05:4': {
      alt: '논설문을 쓰는 차례를 계단으로 나타낸 그림: ① 문제 찾기 ② 주장 정하기 ③ 근거·자료 모으기 ④ 개요 짜기 ⑤ 글 쓰기 ⑥ 고쳐 쓰기',
      svg: svg(300, STAIR.map(([a, b], i) => {
        const x = 6 + i * 78, top = 210 - i * 32, last = i === 5;
        return G({ t: 200 + i * 650, d: 500, dy: 24 }, `${B(x, top, 76, 300 - top, { f: last ? GRNF : C.b, rx: 8 })}
          <circle cx="${x + 38}" cy="${top + 22}" r="14" fill="${last ? C.r : C.d}"/>${T(x + 38, top + 29, i + 1, { s: 18, w: 800, f: '#fff' })}
          ${T(x + 38, top + 60, a, { s: 18, w: 800 })}${T(x + 38, top + 82, b, { s: 18, w: 800 })}`);
      }).join('')),
      play: seq(4400)
    },
  });
})();
