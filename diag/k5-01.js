/* 5학년 국어 · "구름이 솜사탕 같아"라고 말하면 왜 더 잘 보일까? (k5-01) */
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

  // 겹친 동그라미로 폭신한 모양: 테두리 원을 먼저, 같은 원을 채우기만 해서 위에 덮음
  const puff = (cs, fill, stroke) => cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${stroke}" stroke="${stroke}" stroke-width="7"/>`).join('') +
    cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');
  const CLOUD = [[70, 122, 26], [104, 98, 34], [144, 112, 28], [118, 132, 24], [84, 138, 18], [150, 132, 16]];
  const CANDY = [[342, 96, 26], [372, 76, 30], [400, 98, 25], [370, 114, 26]];
  const heart = (x, y, s, col, fill) => `<path d="M${x} ${y + 26 * s} C${x - 46 * s} ${y - 4 * s} ${x - 30 * s} ${y - 40 * s} ${x} ${y - 20 * s} C${x + 30 * s} ${y - 40 * s} ${x + 46 * s} ${y - 4 * s} ${x} ${y + 26 * s} Z" fill="${fill}" stroke="${col}" stroke-width="4" stroke-linejoin="round"/>`;

  /* 3: 시 속 비유 */
  const POEM = [
    { a: '은행잎', b: '나비', k: '직유', s: '가볍게 날리는 모습' },
    { a: '운동장', b: '도화지', k: '은유', s: '넓고 색이 칠해진 모습' },
    { a: '바람', b: '장난꾸러기', k: '은유', s: '이리저리 움직이게 함' },
  ];

  Object.assign(DIAG, {
    'k5-01:0': {
      alt: '표현하려는 대상인 구름을 빗대는 대상인 솜사탕에 빗대고, 둘의 닮은 점은 하얗고 폭신폭신해 보인다는 것임을 보여 주는 그림',
      svg: svg(316, `
        ${G({ t: 200, d: 600, dy: 14 }, `${B(20, 44, 180, 136, { f: C.b, rx: 18 })}<g>${puff(CLOUD, '#fff', C.d)}</g>
          ${T(110, 212, '구름', { s: 24, w: 800, f: C.d })}${T(110, 238, '표현하려는 대상', { s: 18, f: C.sub, w: 600 })}`)}
        ${G({ t: 1400, d: 600, dy: 14 }, `${B(280, 44, 180, 136, { f: SOFT, rx: 18 })}
          <line x1="371" y1="128" x2="371" y2="172" stroke="${C.sub}" stroke-width="6" stroke-linecap="round"/>${puff(CANDY, '#fff', C.c)}
          ${T(370, 212, '솜사탕', { s: 24, w: 800, f: C.c })}${T(370, 238, '빗대는 대상', { s: 18, f: C.sub, w: 600 })}`)}
        ${G({ t: 2500, d: 500, dx: -16 }, `${ARR(208, 112, 270, 112, { f: C.ink })}${T(239, 96, '빗대요', { s: 18, f: C.ink })}`)}
        <path d="M110 248 V258 H370 V248 M240 258 V266" fill="none" stroke="${C.r}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-t="3300" data-d="700" data-draw="1"/>
        ${G({ t: 3900, d: 500, dy: 10 }, `${B(70, 268, 340, 42, { f: GRNF, rx: 21 })}${T(240, 297, '닮은 점 · 하얗고 폭신폭신', { s: 21, w: 800, f: '#1e7a3a' })}`)}
      `),
      play: seq(4800)
    },

    'k5-01:1': {
      alt: '직유법: 볼을 처럼으로 복숭아에, 눈을 같이로 이불에, 시냇물을 듯이로 노래하다에 이어 주는 그림. 이어 주는 말이 문장에 그대로 드러나요',
      svg: svg(300, `
        ${T(85, 62, '표현하려는 대상', { s: 18, f: C.sub })}${T(240, 62, '이어 주는 말', { s: 18, f: C.c })}${T(395, 62, '빗대는 대상', { s: 18, f: C.sub })}
        ${[['볼', '처럼', '복숭아'], ['눈', '같이', '이불'], ['시냇물', '듯이', '노래하다']].map(([a, k, b], i) => {
          const y = 80 + i * 70, t = 300 + i * 1500;
          return `${G({ t, d: 400 }, `${B(20, y, 130, 52, { f: C.b })}${T(85, y + 34, a, { s: 22, w: 800 })}`)}
            ${G({ t: t + 400, d: 400 }, `${B(330, y, 130, 52, { f: C.a })}${T(395, y + 34, b, { s: 22, w: 800 })}`)}
            ${L(150, y + 26, 330, y + 26, { f: C.c, sw: 4, t: t + 800, d: 500, draw: 1 })}
            ${G({ t: t + 1000, d: 400, dy: -16 }, `${B(190, y + 6, 100, 40, { f: '#fff', st: C.c, sw: 3, rx: 20 })}${T(240, y + 33, k, { s: 22, w: 800, f: C.c })}`)}`;
        }).join('')}
      `),
      play: seq(5000)
    },

    'k5-01:2': {
      alt: '은유법: 처럼 같은 말 없이 내 마음은 호수예요처럼 마음과 호수를 바로 같은 것으로 말하고, 읽는 사람이 닮은 점 넓고 고요하다를 스스로 떠올리는 그림',
      svg: svg(300, `
        ${G({ t: 200, d: 500, dy: 12 }, `${heart(110, 100, 1.25, C.d, C.b)}${T(110, 172, '마음', { s: 22, w: 800, f: C.d })}`)}
        ${G({ t: 900, d: 500, dy: 12 }, `<ellipse cx="370" cy="104" rx="78" ry="38" fill="${C.b}" stroke="${C.d}" stroke-width="4"/>
          <path d="M326 100 q11 -8 22 0 t22 0 M362 116 q11 -8 22 0 t22 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
          ${T(370, 172, '호수', { s: 22, w: 800, f: C.c })}`)}
        ${G({ t: 1700, d: 500 }, `${T(240, 120, '=', { s: 56, w: 800 })}${T(240, 70, '처럼 없이', { s: 18, f: C.sub })}`)}
        ${G({ t: 2400, d: 600, dy: 12 }, `${B(70, 192, 340, 48, { f: SOFT, rx: 24 })}<text x="240" y="225" text-anchor="middle" font-size="24" font-weight="800" fill="${C.ink}">내 <tspan fill="${C.d}">마음</tspan>은 <tspan fill="${C.c}">호수</tspan>예요</text>`)}
        ${G({ t: 3500, d: 600, dy: 10 }, `${T(240, 280, '닮은 점은? → 넓고 고요해요', { s: 21, w: 800, f: '#1e7a3a' })}`)}
      `),
      play: seq(4600)
    },

    'k5-01:3': {
      alt: '시 가을 운동장에서 은행잎을 나비에(직유, 가볍게 날리는 모습), 운동장을 도화지에(은유, 넓고 색이 칠해진 모습), 바람을 장난꾸러기에(은유, 이리저리 움직이게 함) 빗댄 것을 정리한 그림',
      svg: svg(326, `
        ${T(80, 52, '① 대상', { s: 18, f: C.sub })}${T(255, 52, '② 빗대는 대상', { s: 18, f: C.sub })}
        ${POEM.map((p, i) => {
          const y = 66 + i * 88, t = 300 + i * 1500, km = p.k === '직유';
          return `${G({ t, d: 400 }, `${B(20, y, 120, 46, { f: C.b })}${T(80, y + 31, p.a, { s: 22, w: 800 })}`)}
            ${G({ t: t + 400, d: 500, dx: 30 }, `${ARR(148, y + 23, 176, y + 23, { f: C.ink, h: 8 })}${B(184, y, 142, 46, { f: C.a })}${T(255, y + 31, p.b, { s: 22, w: 800 })}`)}
            ${G({ t: t + 800, d: 400 }, `${B(342, y + 5, 76, 36, { f: km ? C.d : C.c, rx: 18 })}${T(380, y + 30, p.k, { s: 20, w: 800, f: '#fff' })}`)}
            ${T(30, y + 74, '③ 닮은 점 · ' + p.s, { s: 18, w: 700, f: '#1e7a3a', a: 'start', t: t + 1100, d: 400 })}`;
        }).join('')}
      `),
      play: seq(5000)
    },

    'k5-01:4': {
      alt: '대상 아침 알람 소리의 특징 시끄럽고 갑작스럽다를 찾은 뒤, 처럼을 붙이면 직유 천둥처럼 울렸다, A는 B이다로 쓰면 은유 아침을 깨우는 북소리다가 되는 그림',
      svg: svg(316, `
        ${G({ t: 200, d: 500, dy: 10 }, `${B(70, 42, 340, 54, { f: C.b })}${T(108, 76, '대상', { s: 18, f: C.d, w: 800 })}${T(270, 78, '아침 알람 소리', { s: 22, w: 800 })}`)}
        ${ARR(240, 100, 240, 120, { f: C.sub, t: 900, d: 300 })}
        ${G({ t: 1100, d: 500, dy: 10 }, `${B(70, 124, 340, 54, { f: SOFT })}${T(108, 158, '특징', { s: 18, f: C.sub, w: 800 })}${T(270, 160, '시끄럽고 갑작스럽다', { s: 22, w: 800 })}`)}
        ${ARR(220, 182, 140, 210, { f: C.d, t: 2000, d: 300 })}${ARR(260, 182, 340, 210, { f: C.c, t: 3100, d: 300 })}
        ${G({ t: 2200, d: 500, dy: 10 }, `${B(20, 214, 210, 94, { f: '#fff', st: C.d, sw: 3 })}${T(125, 240, '직유 · ~처럼', { s: 18, f: C.d, w: 800 })}
          ${T(125, 268, '알람 소리가', { s: 20 })}${T(125, 294, '천둥처럼 울렸다', { s: 20, w: 800 })}`)}
        ${G({ t: 3300, d: 500, dy: 10 }, `${B(250, 214, 210, 94, { f: '#fff', st: C.c, sw: 3 })}${T(355, 240, '은유 · A는 B이다', { s: 18, f: C.c, w: 800 })}
          ${T(355, 268, '알람 소리는 아침을', { s: 20 })}${T(355, 294, '깨우는 북소리다', { s: 20, w: 800 })}`)}
      `),
      play: seq(4200)
    },
  });
})();
