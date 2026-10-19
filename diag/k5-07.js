/* 5학년 국어 · 뉴스와 광고, 인터넷 글을 똑똑하게 읽으려면? (k5-07) */
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

  /* 0: 매체 아이콘 — (0,0) 중심 */
  const MED = [
    { n: '인쇄 매체', e: '신문·잡지·책', h: '글·사진', col: C.d, g: `<rect x="-42" y="-34" width="84" height="68" rx="6" fill="#fff" stroke="${C.d}" stroke-width="4"/>
      <rect x="-32" y="-24" width="30" height="24" rx="3" fill="${C.b}"/>${[-22, -12, -2].map(y => `<line x1="6" y1="${y}" x2="32" y2="${y}" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/>`).join('')}
      ${[12, 22].map(y => `<line x1="-32" y1="${y}" x2="32" y2="${y}" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/>`).join('')}` },
    { n: '방송 매체', e: 'TV·라디오', h: '소리·영상·자막', col: C.c, g: `<path d="M-16 -46 L0 -32 L16 -46" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="-46" y="-32" width="92" height="62" rx="10" fill="${C.a}" stroke="${C.c}" stroke-width="4"/><rect x="-36" y="-22" width="72" height="42" rx="5" fill="#fff"/>
      <line x1="-20" y1="40" x2="20" y2="40" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>` },
    { n: '인터넷 매체', e: '누리집·SNS', h: '글·영상·소리', col: C.r, g: `<rect x="-34" y="-42" width="68" height="84" rx="10" fill="${GRNF}" stroke="${C.r}" stroke-width="4"/>
      <rect x="-24" y="-30" width="48" height="56" rx="4" fill="#fff"/><path d="M-7 -12 L11 -2 L-7 8 Z" fill="${C.r}"/><circle cx="0" cy="34" r="3" fill="${C.r}"/>` },
  ];

  /* 2: 같은 공원 그림 */
  const park = (x, y) => `<rect x="${x}" y="${y}" width="196" height="92" rx="8" fill="${C.b}" fill-opacity=".55"/>
    <rect x="${x}" y="${y + 66}" width="196" height="26" rx="0" fill="${GRNF}"/>
    <circle cx="${x + 42}" cy="${y + 38}" r="22" fill="${C.r}" fill-opacity=".8"/><rect x="${x + 39}" y="${y + 56}" width="6" height="18" fill="${C.sub}"/>
    <circle cx="${x + 150}" cy="${y + 34}" r="18" fill="${C.r}" fill-opacity=".8"/><rect x="${x + 147}" y="${y + 50}" width="6" height="20" fill="${C.sub}"/>
    <rect x="${x + 80}" y="${y + 56}" width="44" height="8" rx="3" fill="${C.c}"/><line x1="${x + 86}" y1="${y + 64}" x2="${x + 86}" y2="${y + 74}" stroke="${C.c}" stroke-width="4"/><line x1="${x + 118}" y1="${y + 64}" x2="${x + 118}" y2="${y + 74}" stroke="${C.c}" stroke-width="4"/>`;

  /* 4: 점검표 */
  const CHECK = ['누가 썼나요?', '최근 글인가요?', '근거가 있나요?', '다른 곳도 같나요?'];

  Object.assign(DIAG, {
    'k5-07:0': {
      alt: '매체의 종류: 인쇄 매체(신문·잡지·책, 글과 사진), 방송 매체(텔레비전·라디오, 소리·영상·자막), 인터넷 매체(누리집·누리 소통망, 글·영상·소리)',
      svg: svg(280, MED.map((m, i) => { const x = 82 + i * 158; return G({ t: 200 + i * 1000, d: 500, dy: 14 },
        `<g transform="translate(${x},102)">${m.g}</g>${T(x, 184, m.n, { s: 21, w: 800, f: m.col })}${T(x, 212, m.e, { s: 18, f: C.sub, w: 600 })}
        ${B(x - 70, 228, 140, 38, { f: SOFT, rx: 19 })}${T(x, 254, m.h, { s: 18, w: 700 })}`); }).join('')),
      play: seq(3400)
    },

    'k5-07:1': {
      alt: '텔레비전 뉴스 화면을 나누어 보면 그래프는 숫자를 한눈에, 현장 영상은 생생함을, 기자의 말은 내용을 전하고, 자막 올여름 열대야 일수 지난해의 두 배는 핵심을 정리해 주는 그림',
      svg: svg(290, `
        <rect x="16" y="46" width="300" height="204" rx="14" fill="${C.ink}"/>
        <rect x="26" y="56" width="280" height="184" rx="6" fill="#1f3b63"/>
        <circle cx="64" cy="92" r="16" fill="${C.a}"/>
        <rect x="26" y="168" width="280" height="30" fill="#2f5b3a"/>
        ${[[60, 150], [104, 146]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="18" fill="#3c8a4f"/><rect x="${x - 3}" y="${y + 14}" width="6" height="14" fill="#8a6a4a"/>`).join('')}
        ${[150, 176, 204].map((x, k) => `<circle cx="${x}" cy="${160 + (k % 2) * 4}" r="7" fill="#fff"/><path d="M${x - 9} ${186 + (k % 2) * 4} a9 11 0 0 1 18 0 Z" fill="#fff"/>`).join('')}
        <g class="pv1"><rect x="200" y="66" width="98" height="92" rx="6" fill="#fff"/>
          <rect class="bar0" x="216" y="118" width="26" height="18" fill="${C.d}"/><rect class="bar1" x="256" y="100" width="26" height="36" fill="${C.c}"/>
          ${T(229, 152, '작년', { s: 18, w: 700, f: C.sub })}${T(269, 152, '올해', { s: 18, w: 700, f: C.c })}</g>
        <rect x="26" y="204" width="280" height="36" fill="#000" fill-opacity=".75"/>
        ${T(166, 229, '열대야 일수 지난해의 두 배', { s: 18, w: 800, f: '#fff', c: 'cap' })}
        ${G({ t: 600, d: 400 }, `${L(298, 84, 334, 70, { f: C.c, sw: 2.5 })}${T(342, 72, '그래프', { s: 20, w: 800, f: C.c, a: 'start' })}${T(342, 96, '숫자를 한눈에', { s: 18, f: C.sub, w: 600, a: 'start' })}`)}
        ${G({ t: 1600, d: 400 }, `<path d="M222 178 H320 L334 140" fill="none" stroke="${C.r}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${T(342, 138, '현장 영상', { s: 20, w: 800, f: C.r, a: 'start' })}${T(342, 162, '생생함', { s: 18, f: C.sub, w: 600, a: 'start' })}`)}
        ${G({ t: 2600, d: 400 }, `<path d="M342 188 h8 l10 -8 v24 l-10 -8 h-8 Z" fill="${C.d}"/><path d="M366 186 q6 6 0 12 M372 181 q11 11 0 22" fill="none" stroke="${C.d}" stroke-width="2.5" stroke-linecap="round"/>
          ${T(384, 200, '기자의 말', { s: 20, w: 800, f: C.d, a: 'start' })}${T(342, 224, '내용 전하기', { s: 18, f: C.sub, w: 600, a: 'start' })}`)}
        ${G({ t: 3600, d: 400 }, `${L(306, 230, 334, 256, { f: C.ink, sw: 2.5 })}${T(342, 262, '자막', { s: 20, w: 800, a: 'start' })}${T(342, 286, '핵심 정리', { s: 18, f: C.sub, w: 600, a: 'start' })}`)}
      `),
      play: seq(4400, (el, e) => {
        const f = dgEase(dgP(e, 200, 700));
        el.querySelector('.bar0').setAttribute('y', 136 - 18 * f); el.querySelector('.bar0').setAttribute('height', 18 * f);
        el.querySelector('.bar1').setAttribute('y', 136 - 36 * f); el.querySelector('.bar1').setAttribute('height', 36 * f);
        el.querySelector('.cap').setAttribute('opacity', dgP(e, 3400, 400));
      })
    },

    'k5-07:2': {
      alt: '같은 새 공원 사진에 뉴스 A는 주민들 크게 반겨, 뉴스 B는 주차 공간 부족해 불편 호소도라는 서로 다른 제목을 붙여 같은 일이라도 강조한 면에 따라 느낌이 달라짐을 보여 주는 그림',
      svg: svg(320, `
        ${[0, 1].map(i => { const x = 16 + i * 232; return G({ t: 200, d: 500 }, `${B(x, 46, 216, 236, { f: '#fff', st: LINE, sw: 2, rx: 14 })}${park(x + 10, 56)}
          ${B(x + 10, 160, 66, 28, { f: i ? C.c : C.r, rx: 14 })}${T(x + 43, 180, i ? '뉴스 B' : '뉴스 A', { s: 18, w: 800, f: '#fff' })}
          ${T(x + 14, 214, i ? '새 공원 개장…' : '새 공원 개장,', { s: 20, w: 800, a: 'start' })}`); }).join('')}
        ${T(30, 242, '주민들 크게 반겨', { s: 20, w: 800, f: '#1e7a3a', a: 'start', t: 1200, d: 500 })}
        ${G({ t: 2300, d: 500 }, `${T(262, 242, '주차 공간 부족해', { s: 20, w: 800, f: '#c25e00', a: 'start' })}${T(262, 268, '불편 호소도', { s: 20, w: 800, f: '#c25e00', a: 'start' })}`)}
        ${T(240, 310, '같은 일, 강조한 면이 달라요', { s: 18, f: C.sub, w: 700, t: 3300, d: 500 })}
      `),
      play: seq(4000)
    },

    'k5-07:3': {
      alt: '마시기만 하면 키가 쑥쑥이라는 음료 광고를 보며 과장된 표현은 없는지, 정말 필요한지, 말하지 않은 단점은 없는지 따져 보는 그림',
      svg: svg(290, `
        ${B(20, 46, 196, 234, { f: C.a, rx: 16 })}
        <rect x="94" y="92" width="48" height="96" rx="12" fill="#fff" stroke="${C.c}" stroke-width="4"/><rect x="104" y="76" width="28" height="18" rx="4" fill="${C.c}"/>
        <rect x="94" y="122" width="48" height="30" fill="${C.c}" fill-opacity=".35"/>
        ${T(118, 224, '마시기만 하면', { s: 20, w: 800 })}${T(118, 256, '키가 쑥쑥!', { s: 26, w: 800, f: RED })}
        ${L(62, 266, 174, 266, { f: RED, sw: 3, da: '6 5', t: 600, d: 600, draw: 1 })}
        ${['과장된 표현은?', '정말 필요할까?', '말하지 않은 단점은?'].map((s, i) => G({ t: 1100 + i * 1000, d: 500, dx: 20 },
          `${B(232, 66 + i * 70, 236, 50, { f: SOFT, rx: 25 })}<circle cx="256" cy="${91 + i * 70}" r="14" fill="${C.d}"/>${T(256, 98 + i * 70, '?', { s: 20, w: 800, f: '#fff' })}${T(278, 98 + i * 70, s, { s: 20, w: 700, a: 'start' })}`)).join('')}
      `),
      play: seq(4000)
    },

    'k5-07:4': {
      alt: '인터넷 정보 점검표: 누가 썼는지(출처), 최근 글인지(날짜), 근거가 있는지, 다른 믿을 만한 곳에도 같은 내용이 있는지 하나씩 확인하는 그림',
      svg: svg(290, `
        <rect x="20" y="56" width="140" height="196" rx="16" fill="${C.ink}"/><rect x="30" y="68" width="120" height="164" rx="6" fill="#fff"/>
        <rect x="40" y="80" width="100" height="40" rx="4" fill="${C.b}"/>${[134, 150, 166, 182, 198, 214].map((y, k) => `<line x1="40" y1="${y}" x2="${k % 3 === 2 ? 110 : 140}" y2="${y}" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>`).join('')}
        ${CHECK.map((s, i) => { const y = 58 + i * 56, t = 400 + i * 900; return `${B(178, y, 290, 46, { f: SOFT, rx: 12 })}
          <rect x="190" y="${y + 9}" width="28" height="28" rx="7" fill="#fff" stroke="${C.sub}" stroke-width="2.5"/>
          <path d="M196 ${y + 23} l6 6 l12 -13" fill="none" stroke="${C.r}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-t="${t}" data-d="400" data-draw="1"/>
          ${T(230, y + 30, s, { s: 20, w: 700, a: 'start' })}`; }).join('')}
      `),
      play: seq(4200)
    },
  });
})();
