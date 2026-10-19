/* 5학년 국어 · 여행의 추억을 글로 오래 간직하려면? (k5-09) */
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

  const heart = (x, y, s, col, fill) => `<path d="M${x} ${y + 26 * s} C${x - 46 * s} ${y - 4 * s} ${x - 30 * s} ${y - 40 * s} ${x} ${y - 20 * s} C${x + 30 * s} ${y - 40 * s} ${x + 46 * s} ${y - 4 * s} ${x} ${y + 26 * s} Z" fill="${fill}" stroke="${col}" stroke-width="4" stroke-linejoin="round"/>`;
  const foot = (x, y, col) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="14" fill="${col}"/>${[-7, -2, 3, 8].map((dx, k) => `<circle cx="${x + dx}" cy="${y - 19 + Math.abs(dx - 1) * .3}" r="${k === 0 ? 3.5 : 2.8}" fill="${col}"/>`).join('')}`;
  const pin = (x, y, col) => `<path d="M${x} ${y} c-12 -14 -16 -20 -16 -28 a16 16 0 0 1 32 0 c0 8 -4 14 -16 28 Z" fill="${col}"/><circle cx="${x}" cy="${y - 28}" r="6" fill="#fff"/>`;
  const sent = (x, y, html, s = 20) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="600" fill="${C.ink}">${html}</text>`;
  const sp = (s, col) => `<tspan fill="${col}" font-weight="800">${s}</tspan>`;

  Object.assign(DIAG, {
    'k5-09:0': {
      alt: '일기는 하루 동안 있었던 일 가운데 기억에 남는 일을 쓰고, 기행문은 여행하며 장소를 옮겨 다닌 차례에 따라 쓴다는 차이를 보여 주는 그림',
      svg: svg(280, `
        ${G({ t: 200, d: 500 }, `${B(16, 46, 212, 222, { f: SOFT, rx: 18 })}
          <rect x="82" y="72" width="80" height="80" rx="10" fill="#fff" stroke="${C.d}" stroke-width="3.5"/><rect x="82" y="72" width="80" height="22" rx="6" fill="${C.d}"/>
          <path d="M122 104 l6 12 l13 2 l-10 9 l3 13 l-12 -7 l-12 7 l3 -13 l-10 -9 l13 -2 Z" fill="${C.c}"/>
          ${T(122, 196, '일기', { s: 24, w: 800, f: C.d })}${T(122, 226, '하루 중', { s: 18, f: C.sub })}${T(122, 250, '기억에 남는 일', { s: 18, f: C.sub })}`)}
        ${G({ t: 1100, d: 500 }, `${B(252, 46, 212, 222, { f: SOFT, rx: 18 })}${T(358, 196, '기행문', { s: 24, w: 800, f: C.c })}${T(358, 226, '장소를 옮겨 다닌', { s: 18, f: C.sub })}${T(358, 250, '차례대로', { s: 18, f: C.sub })}`)}
        <path d="M292 140 Q320 92 356 124 T426 100" fill="none" stroke="${C.c}" stroke-width="4" stroke-dasharray="8 7" stroke-linecap="round" data-t="1600" data-d="1600" data-draw="1"/>
        ${[[292, 146, 1500], [356, 130, 2300], [426, 106, 3100]].map(([x, y, t], k) => G({ t, d: 400, dy: -12 }, pin(x, y, [C.d, C.c, C.r][k]))).join('')}
      `),
      play: seq(3800)
    },

    'k5-09:1': {
      alt: '기행문의 세 요소: 여정(여행한 차례, 경주역 도착), 견문(보거나 들은 것, 첨성대의 모양과 해설), 감상(생각이나 느낌, 정성에 놀랐다)',
      svg: svg(290, `
        ${G({ t: 200, d: 500, dy: 12 }, `${foot(70, 104, C.d)}${foot(96, 84, C.d)}${T(82, 172, '여정', { s: 24, w: 800, f: C.d })}${T(82, 200, '간 차례', { s: 18, f: C.sub })}
          ${B(14, 220, 136, 54, { f: C.b, rx: 14 })}${T(82, 244, '경주역에', { s: 18, w: 700 })}${T(82, 266, '도착했다', { s: 18, w: 700 })}`)}
        ${G({ t: 1300, d: 500, dy: 12 }, `<path d="M206 94 Q240 62 274 94 Q240 126 206 94 Z" fill="#fff" stroke="${C.c}" stroke-width="4" stroke-linejoin="round"/><circle cx="240" cy="94" r="11" fill="${C.c}"/>
          <path d="M282 80 q8 8 0 16 M290 72 q16 16 0 32" fill="none" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round"/>
          ${T(240, 172, '견문', { s: 24, w: 800, f: C.c })}${T(240, 200, '보고 들은 것', { s: 18, f: C.sub })}
          ${B(172, 220, 136, 54, { f: C.a, rx: 14 })}${T(240, 244, '첨성대 모양', { s: 18, w: 700 })}${T(240, 266, '해설사의 설명', { s: 18, w: 700 })}`)}
        ${G({ t: 2400, d: 500, dy: 12 }, `${heart(398, 100, 1.1, C.r, GRNF)}${T(398, 172, '감상', { s: 24, w: 800, f: C.r })}${T(398, 200, '생각·느낌', { s: 18, f: C.sub })}
          ${B(330, 220, 136, 54, { f: GRNF, rx: 14 })}${T(398, 244, '정성에', { s: 18, w: 700 })}${T(398, 266, '놀랐다', { s: 18, w: 700 })}`)}
      `),
      play: seq(3400)
    },

    'k5-09:2': {
      alt: '기행문의 짜임을 기찻길로 나타낸 그림: 출발하는 처음(떠난 까닭), 첨성대·불국사·박물관을 차례로 지나는 가운데(견문과 감상), 도착하는 끝(전체 느낌과 다짐)',
      svg: svg(270, `<g transform="translate(0,-34)">
        ${L(30, 150, 450, 150, { f: C.ink, sw: 5 })}
        ${Array.from({ length: 22 }, (_, k) => `<line x1="${36 + k * 19.5}" y1="144" x2="${36 + k * 19.5}" y2="157" stroke="${C.sub}" stroke-width="3"/>`).join('')}
        ${[[46, '출발', C.d], [170, '첨성대', C.c], [250, '불국사', C.c], [330, '박물관', C.c], [434, '도착', C.r]].map(([x, s, col], k) => G({ t: [200, 1200, 1800, 2400, 3200][k], d: 300 },
          `<circle cx="${x}" cy="150" r="10" fill="#fff" stroke="${col}" stroke-width="4"/>${T(x, 186, s, { s: 18, w: 800, f: col })}`)).join('')}
        <g class="train"><rect x="-30" y="110" width="60" height="30" rx="9" fill="${C.d}"/><rect x="-22" y="117" width="16" height="12" rx="3" fill="#fff"/><rect x="2" y="117" width="16" height="12" rx="3" fill="#fff"/>
          <circle cx="-16" cy="142" r="5" fill="${C.ink}"/><circle cx="16" cy="142" r="5" fill="${C.ink}"/></g>
        ${G({ t: 600, d: 400 }, `${B(6, 204, 80, 38, { f: C.d, rx: 19 })}${T(46, 230, '처음', { s: 20, w: 800, f: '#fff' })}${T(46, 270, '떠난 까닭', { s: 18, f: C.sub })}`)}
        ${G({ t: 2700, d: 400 }, `<path d="M140 204 V212 H360 V204" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/>${B(196, 216, 108, 34, { f: C.c, rx: 17 })}${T(250, 240, '가운데', { s: 20, w: 800, f: '#fff' })}${T(250, 276, '견문 + 감상', { s: 18, f: C.sub })}`)}
        ${G({ t: 3500, d: 400 }, `${B(394, 204, 80, 38, { f: C.r, rx: 19 })}${T(434, 230, '끝', { s: 20, w: 800, f: '#fff' })}${T(434, 270, '전체 느낌', { s: 18, f: C.sub })}`)}
      </g>`),
      play: seq(4000, (el, e) => {
        // 정류장마다 잠깐 멈추며 이동
        const legs = [[46, 170, 400], [170, 250, 1300], [250, 330, 1900], [330, 434, 2500]];
        let x = 46; legs.forEach(([a, b, st]) => { const p = dgEase(dgP(e, st, 600)); if (p > 0) x = a + (b - a) * p; });
        el.querySelector('.train').setAttribute('transform', `translate(${x},0)`);
      })
    },

    'k5-09:3': {
      alt: '기행문 한 문단을 여정(버스를 타고 불국사로 향했다), 견문(다보탑과 석가탑이 마주 서 있었다), 감상(두 탑의 모습이 달라 신기했다, 석가탑이 더 마음에 들었다)으로 나누어 색칠한 그림',
      svg: svg(300, `
        ${G({ t: 200, d: 500, dx: -14 }, `${B(14, 46, 456, 56, { f: C.b, rx: 14 })}${B(24, 56, 72, 36, { f: C.d, rx: 18 })}${T(60, 81, '여정', { s: 20, w: 800, f: '#fff' })}
          ${sent(110, 82, `버스를 타고 불국사로 ${sp('향했다', C.d)}`)}`)}
        ${G({ t: 1300, d: 500, dx: -14 }, `${B(14, 112, 456, 82, { f: C.a, rx: 14 })}${B(24, 135, 72, 36, { f: C.c, rx: 18 })}${T(60, 160, '견문', { s: 20, w: 800, f: '#fff' })}
          ${sent(110, 146, '다보탑과 석가탑이')}${sent(110, 176, `마주 ${sp('서 있었다', '#c25e00')}`)}`)}
        ${G({ t: 2400, d: 500, dx: -14 }, `${B(14, 204, 456, 82, { f: GRNF, rx: 14 })}${B(24, 227, 72, 36, { f: C.r, rx: 18 })}${T(60, 252, '감상', { s: 20, w: 800, f: '#fff' })}
          ${sent(110, 238, `두 탑이 달라 참 ${sp('신기했다', '#1e7a3a')}`)}${sent(110, 268, `석가탑이 더 ${sp('마음에 들었다', '#1e7a3a')}`)}`)}
      `),
      play: seq(3400)
    },

    'k5-09:4': {
      alt: '밋밋한 감상 바다가 좋았다에 철썩이는 파도 소리, 짭짤한 바닷바람, 가슴속까지 시원해지는 느낌과 그 까닭을 더해 생생한 감상으로 바꾸는 그림',
      svg: svg(300, `
        ${G({ t: 200, d: 400 }, `${B(90, 46, 300, 52, { f: SOFT, rx: 26 })}${T(240, 80, '바다가 좋았다.', { s: 22, w: 700, f: C.sub })}`)}
        ${ARR(240, 104, 240, 126, { f: C.ink, t: 900, d: 300 })}
        ${[
          [`<path d="M-10 -6 h6 l8 -7 v26 l-8 -7 h-6 Z" fill="${C.d}"/><path d="M8 -6 q5 6 0 12 M13 -11 q10 11 0 22" fill="none" stroke="${C.d}" stroke-width="2.5" stroke-linecap="round"/>`, '소리', '철썩이는 파도 소리', C.d, C.b],
          [`<path d="M-12 -7 h16 q7 0 7 -6 M-12 1 h22 q7 0 7 6 M-12 9 h12" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/>`, '냄새·맛', '짭짤한 바닷바람', '#c25e00', C.a],
          [heart(0, 2, .45, C.r, GRNF), '느낌', '가슴속까지 시원해짐', '#1e7a3a', GRNF],
        ].map(([ic, k, s, col, f], i) => { const y = 132 + i * 56; return G({ t: 1200 + i * 900, d: 500, dx: 20 },
          `${B(14, y, 452, 48, { f, rx: 14 })}<circle cx="44" cy="${y + 24}" r="18" fill="#fff"/><g transform="translate(44,${y + 24})">${ic}</g>
          ${T(74, y + 31, k, { s: 18, w: 800, f: col, a: 'start' })}${T(160, y + 32, s, { s: 20, w: 700, a: 'start' })}`); }).join('')}
      `),
      play: seq(4200)
    },
  });
})();
