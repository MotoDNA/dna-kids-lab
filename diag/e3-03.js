/* 3학년 영어 · 우리 가족을 영어로 소개해 볼까? (e3-03) */
(() => {
  const C = DG_C, RED = '#ff3b30', LG = '#d6efdc', LR = '#ffd9d6', GR = '#c7c7cc', BG = '#f2f2f5';
  const tw = (s, fs) => { let w = 0; for (const ch of String(s).replace(/<[^>]+>/g, '')) w += /[가-힣ㄱ-ㅣ]/.test(ch) ? fs * 1.0 : /[MW]/.test(ch) ? fs * 0.9 : /[A-Z]/.test(ch) ? fs * 0.7 : /[mw]/.test(ch) ? fs * 0.86 : /[ijl.,'!:;|]/.test(ch) ? fs * 0.3 : ch === ' ' ? fs * 0.28 : /[ftr]/.test(ch) ? fs * 0.42 : /[0-9]/.test(ch) ? fs * 0.62 : fs * 0.6; return w; };
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const bw = (s, fs = 22) => Math.round(tw(s, fs) + 26);
  const ST = { blue: { bg: C.b, st: C.d }, org: { bg: C.a, st: C.c }, grn: { bg: LG, st: C.r }, red: { bg: LR, st: RED }, gray: { bg: BG, st: '#d2d2d7' }, white: { bg: '#fff', st: '#d2d2d7' } };
  /* 글자 블록: cx 가운데, y 위쪽 */
  const B = (cx, y, s, o = {}) => { const fs = o.s || 22, w = o.wd || bw(s, fs), h = o.h || 44, st = ST[o.k || 'blue']; return `<g${o.c ? ` class="${o.c}"` : ''}><rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.bg || st.bg}" stroke="${o.st || st.st}" stroke-width="${o.sw || 2.5}"${o.dash ? ' stroke-dasharray="6 5"' : ''}/>${T(cx, y + h / 2 + fs * 0.35, s, { s: fs, f: o.f || C.ink, w: o.w || 800 })}</g>`; };
  /* 블록 한 줄: items [{s,k,c,plain,f,fs,wd}] */
  const ROW = (x0, y, items, gap = 8, fs = 22) => { let x = x0, svg = ''; const xs = [], ws = []; for (const it of items) { const f2 = it.fs || fs, w = it.wd || (it.plain ? Math.round(tw(it.s, f2) + 4) : bw(it.s, f2)), cx = x + w / 2; xs.push(cx); ws.push(w); svg += it.plain ? T(cx, y + 22 + f2 * 0.35, it.s, { s: f2, f: it.f, w: 800, c: it.c }) : B(cx, y, it.s, { k: it.k, s: f2, wd: w, c: it.c, f: it.f }); x += w + gap; } return { svg, xs, ws, w: x - gap - x0 }; };
  const ROWC = (cx, y, items, gap = 8, fs = 22) => ROW(cx - ROW(0, y, items, gap, fs).w / 2, y, items, gap, fs);
  /* 말풍선 (면만, 꼬리 l/r) */
  const BUB = (x, y, w, h, side, s, o = {}) => { const fill = o.bg || BG, fs = o.s || 20; const tail = side === 'l' ? `M${x + 16} ${y + h - 3} L${x + 6} ${y + h + 12} L${x + 36} ${y + h - 3}Z` : side === 'r' ? `M${x + w - 16} ${y + h - 3} L${x + w - 6} ${y + h + 12} L${x + w - 36} ${y + h - 3}Z` : ''; return `<g${o.c ? ` class="${o.c}"` : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(20, h / 2)}" fill="${fill}"/>${tail ? `<path d="${tail}" fill="${fill}"/>` : ''}${s ? T(o.tx ?? x + w / 2, y + h / 2 + fs * 0.35, s, { s: fs, f: o.f || C.ink, w: 800, a: o.a }) : ''}</g>`; };
  /* 얼굴: k = 'kid' | 'man' | 'woman' | 'old-m' | 'old-w' */
  const FACE = (cx, cy, r, o = {}) => { const k = o.k || 'kid', fill = o.bg || (k === 'man' || k === 'old-m' || k === 'boy' ? C.b : C.a), st = o.st || (k === 'man' || k === 'old-m' || k === 'boy' ? C.d : C.c); const hairC = k.startsWith('old') ? '#a1a1a6' : C.ink; let hair = ''; if (k === 'man' || k === 'boy' || k === 'old-m') hair = `<path d="M${cx - r * .95} ${cy - r * .2} Q${cx - r} ${cy - r * 1.15} ${cx} ${cy - r * 1.08} Q${cx + r} ${cy - r * 1.15} ${cx + r * .95} ${cy - r * .2} Q${cx + r * .6} ${cy - r * .7} ${cx} ${cy - r * .72} Q${cx - r * .6} ${cy - r * .7} ${cx - r * .95} ${cy - r * .2}Z" fill="${hairC}"/>`; else if (k !== 'kid') hair = `<path d="M${cx - r * 1.02} ${cy + r * .6} Q${cx - r * 1.25} ${cy - r * 1.2} ${cx} ${cy - r * 1.1} Q${cx + r * 1.25} ${cy - r * 1.2} ${cx + r * 1.02} ${cy + r * .6} L${cx + r * .78} ${cy + r * .3} Q${cx + r * .8} ${cy - r * .55} ${cx} ${cy - r * .7} Q${cx - r * .8} ${cy - r * .55} ${cx - r * .78} ${cy + r * .3}Z" fill="${hairC}"/>`; const ey = cy - r * .08, ex = r * .36, er = Math.max(2.5, r * .09); return `<g${o.c ? ` class="${o.c}"` : ''}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${st}" stroke-width="3"/>${hair}<circle cx="${cx - ex}" cy="${ey}" r="${er}" fill="${C.ink}"/><circle cx="${cx + ex}" cy="${ey}" r="${er}" fill="${C.ink}"/><path d="M${cx - r * .34} ${cy + r * .3} Q${cx} ${cy + r * .62} ${cx + r * .34} ${cy + r * .3}" fill="none" stroke="${C.ink}" stroke-width="${Math.max(2.5, r * .1)}" stroke-linecap="round"/></g>`; };
  const CHECK = (cx, cy, r = 16, c) => `<g${c ? ` class="${c}"` : ''}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.r}"/><path d="M${cx - r * .45} ${cy} l${r * .32} ${r * .34} l${r * .6} ${-r * .66}" fill="none" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const CROSS = (cx, cy, r = 16, c) => `<g${c ? ` class="${c}"` : ''}><circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/><path d="M${cx - r * .38} ${cy - r * .38} l${r * .76} ${r * .76} m0 ${-r * .76} l${-r * .76} ${r * .76}" fill="none" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round"/></g>`;
  const ARROW = (x1, y1, x2, y2, col = C.sub, c = '', sw = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 10; return `<g${c ? ` class="${c}"` : ''} fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><path d="M${(x2 - h * Math.cos(a - .5)).toFixed(1)} ${(y2 - h * Math.sin(a - .5)).toFixed(1)} L${x2} ${y2} L${(x2 - h * Math.cos(a + .5)).toFixed(1)} ${(y2 - h * Math.sin(a + .5)).toFixed(1)}"/></g>`; };
  const HL = (s, col = C.c) => `<tspan fill="${col}">${s}</tspan>`;
  /* 애니메이션 도우미 */
  const OP = (el, sel, v) => el.querySelectorAll(sel).forEach(n => n.setAttribute('opacity', v));
  const MV = (el, sel, dx, dy) => el.querySelectorAll(sel).forEach(n => n.setAttribute('transform', `translate(${dx},${dy})`));
  const POP = (el, sel, p) => el.querySelectorAll(sel).forEach(n => { n.setAttribute('opacity', p > 0 ? Math.min(1, p * 2) : 0); n.style.transformBox = 'fill-box'; n.style.transformOrigin = 'center'; n.style.transform = `scale(${0.6 + 0.4 * dgEase(p)})`; });
  const SEQ = (el, e, list) => list.forEach(([sel, st, d = 400]) => OP(el, sel, dgP(e, st, d)));
  const IN = (el, sel, p, dx = 0, dy = 16) => { const f = dgEase(p); OP(el, sel, f); MV(el, sel, dx * (1 - f), dy * (1 - f)); };

  /* 0: 가족 */
  const FAM = [
    { k: 'old-m', en: 'grandfather', ko: '할아버지' }, { k: 'old-w', en: 'grandmother', ko: '할머니' },
    { k: 'man', en: 'dad', ko: '아빠 (father)' }, { k: 'woman', en: 'mom', ko: '엄마 (mother)' },
    { k: 'boy', en: 'brother', ko: '형·오빠·남동생', r: 20 }, { k: 'woman', en: 'sister', ko: '언니·누나·여동생', r: 20 },
  ];
  /* 1 */
  const R1 = ROWC(240, 52, [{ s: 'This is', k: 'gray' }, { s: 'my', k: 'blue', c: 'my' }, { s: 'mom.', k: 'org', c: 'mom' }], 10, 26);
  const R1b = ROWC(240, 186, [{ s: 'This is', k: 'gray' }, { s: 'my', k: 'blue' }, { s: 'brother.', k: 'org' }], 10, 24);
  /* 2 */
  const P2 = [
    { x: 120, k: 'man', pr: 'he', q: 'Who is he?', a: 'He is my dad.', col: C.d, kc: 'blue' },
    { x: 360, k: 'old-w', pr: 'she', q: 'Who is she?', a: 'She is my grandmother.', col: C.c, kc: 'org' },
  ];

  Object.assign(DIAG, {
    'e3-03:0': {
      alt: '할아버지 grandfather, 할머니 grandmother, 아빠 dad(father), 엄마 mom(mother), 남자 형제 brother(형·오빠·남동생), 여자 형제 sister를 얼굴 그림과 함께 보여 주는 가족 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${FAM.map((f, i) => { const col = i % 2, row = Math.floor(i / 2), fx = 40 + col * 236, fy = 70 + row * 88; return `<g class="f${i}">
          ${FACE(fx, fy, f.r || 26, { k: f.k })}
          ${T(fx + 38, fy - 2, f.en, { s: 22, f: C.ink, w: 800, a: 'start' })}
          ${T(fx + 38, fy + 24, f.ko, { s: 18, f: C.sub, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          FAM.forEach((_, i) => IN(el, '.f' + i, dgP(e, 200 + i * 650, 500), -16, 0));
        });
      }
    },

    'e3-03:1': {
      alt: 'This is my mom.에서 This is는 이분은, my는 우리(나의), mom은 엄마라는 뜻이고, mom 자리에 brother를 넣으면 This is my brother.가 되는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${R1.svg}
        <g class="k1">${T(R1.xs[0], 132, '이분은', { s: 20, f: C.sub })}</g>
        <g class="k2">${T(R1.xs[1], 132, '우리', { s: 20, f: C.d, w: 800 })}${T(R1.xs[1], 156, '(나의)', { s: 18, f: C.d })}</g>
        <g class="k3">${T(R1.xs[2], 132, '엄마', { s: 20, f: C.c, w: 800 })}</g>
        <g class="b">${R1b.svg}${T(240, 258, '이 아이는 우리 형이야.', { s: 18, f: C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          IN(el, '.k1', dgP(e, 400, 400), 0, -10);
          IN(el, '.k2', dgP(e, 1200, 400), 0, -10);
          IN(el, '.k3', dgP(e, 2000, 400), 0, -10);
          IN(el, '.b', dgP(e, 3400, 700));
        });
      }
    },

    'e3-03:2': {
      alt: '남자 사진에는 he를 써서 Who is he? - He is my dad., 여자인 할머니 사진에는 she를 써서 Who is she? - She is my grandmother.라고 묻고 답하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <line x1="240" y1="56" x2="240" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        ${P2.map((p, i) => `
          <rect x="${p.x - 48}" y="44" width="96" height="96" rx="10" fill="#fff" stroke="${GR}" stroke-width="5"/>
          ${FACE(p.x, 96, 28, { k: p.k })}
          <g class="pr${i}">${B(p.x, 152, p.pr, { k: p.kc, s: 24, h: 40 })}</g>
          <g class="q${i}">${T(p.x, 224, p.q, { s: 22, f: C.d, w: 800 })}</g>
          <g class="a${i}">${T(p.x, 260, p.a, { s: i ? 19 : 22, w: 800 })}</g>`).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5600, e => {
          P2.forEach((_, i) => {
            const t = 300 + i * 2400;
            POP(el, '.pr' + i, dgP(e, t, 500));
            IN(el, '.q' + i, dgP(e, t + 700, 500));
            IN(el, '.a' + i, dgP(e, t + 1500, 500));
          });
        });
      }
    },
  });
})();
