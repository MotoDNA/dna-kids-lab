/* 2학년 영어 · 영어 이야기를 혼자 읽어 볼까? (e1-14) */
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

  /* 고양이 그림 (원점 기준) */
  const CAT = (black, eye) => { const f = black ? C.ink : '#fff', e = black ? C.a : C.ink; return `<g stroke="${C.ink}" stroke-width="3" stroke-linejoin="round">
    <path d="M16 26 Q40 22 34 -6" fill="none" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="0" cy="10" rx="20" ry="22" fill="${f}"/>
    <path d="M-14 -27 L-13 -44 L-1 -35 Z M14 -27 L13 -44 L1 -35 Z" fill="${f}"/>
    <circle cx="0" cy="-21" r="16" fill="${f}"/>
    <circle cx="-6" cy="-23" r="2.8" fill="${e}" stroke="none"/><circle cx="6" cy="-23" r="2.8" fill="${e}" stroke="none"/>
    <path d="M-3 -15 h6 l-3 3z" fill="${eye || C.c}" stroke="none"/></g>`; };
  const RUN = () => `<g stroke="${C.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-28 -4 Q-44 -6 -46 -24" fill="none" stroke-width="6"/>
    <path d="M-16 8 L-30 26 M-8 10 L0 27 M14 10 L26 25 M20 8 L8 27" fill="none" stroke-width="5"/>
    <ellipse cx="0" cy="0" rx="28" ry="13" fill="${C.ink}"/>
    <path d="M22 -18 L22 -33 L32 -24 Z M38 -18 L42 -33 L30 -26 Z" fill="${C.ink}"/>
    <circle cx="32" cy="-12" r="13" fill="${C.ink}"/>
    <circle cx="37" cy="-14" r="2.6" fill="${C.a}" stroke="none"/>
    <path d="M-50 -8 h10 M-54 4 h12 M-50 16 h10" stroke="${C.sub}" stroke-width="3" fill="none"/></g>`;
  const HEART = (x, y, s = 1, c = '') => `<path${c ? ` class="${c}"` : ''} transform="translate(${x},${y}) scale(${s})" d="M0 8 C-14 -2 -14 -16 -6 -18 C-2 -19 0 -15 0 -13 C0 -15 2 -19 6 -18 C14 -16 14 -2 0 8Z" fill="${RED}"/>`;

  /* 0: 이야기 읽기 */
  const STORY = ['I have a cat.', 'My cat is big.', 'It is black.', 'It can run.', 'I like my cat!'].map(s => s.split(' '));
  const NW = STORY.flat().length;

  /* 1: 문장마다 바뀌는 고양이 */
  const P1 = [
    { en: 'a cat', ko: '고양이', g: () => `<g transform="translate(0,6) scale(.8)">${CAT(false)}</g>` },
    { en: 'big', ko: '커요', g: () => `<g transform="scale(1.25)">${CAT(false)}</g>` },
    { en: 'black', ko: '까매요', g: () => `<g transform="scale(1.25)">${CAT(true)}</g>` },
    { en: 'can run', ko: '달릴 수 있어', g: () => `<g transform="translate(6,14) scale(.92)">${RUN()}</g>` },
    { en: 'like', ko: '좋아요', g: () => `<g transform="translate(-4,4) scale(1.1)">${CAT(true)}</g>${HEART(26, -44, 1.3)}` },
  ];

  /* 2: It = my cat */
  const R2 = ROW(22, 92, [{ s: 'My cat', k: 'blue', fs: 24 }, { s: 'is big.', plain: 1, fs: 24 }, { s: 'It', k: 'org', fs: 24, c: 'it' }, { s: 'is black.', plain: 1, fs: 24 }], 10, 24);
  const iX = R2.xs[2], mX = R2.xs[0];

  /* 3: 읽고 나서 */
  const Q3 = [
    { q: 'Who?', ans: [['a cat', 1]] },
    { q: 'What color?', ans: [['black', 1]] },
    { q: 'Big or small?', ans: [['big', 1], ['small', 0]] },
  ];

  Object.assign(DIAG, {
    'e1-14:0': {
      alt: 'I have a cat. My cat is big. It is black. It can run. I like my cat! 다섯 문장을 낱말 하나씩 짚으며 읽어 가는 그림책과 검은 고양이',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <rect x="8" y="40" width="300" height="240" rx="18" fill="${BG}"/>
        ${STORY.map((ws, li) => `<text x="30" y="${84 + li * 44}" font-size="24" font-weight="800" fill="${C.ink}">${ws.map((w, k) => `<tspan class="w">${w}</tspan>${k < ws.length - 1 ? ' ' : ''}`).join('')}</text>`).join('')}
        <rect class="ptr" x="0" y="0" width="10" height="5" rx="2.5" fill="${C.c}"/>
        <g transform="translate(395,180) scale(1.7)">${CAT(true)}</g>
      </svg>`,
      play(el) {
        const ws = [...el.querySelectorAll('.w')], ptr = el.querySelector('.ptr');
        const box = ws.map(w => { try { const t = w.parentNode, txt = [...t.childNodes]; let idx = 0; for (const n of txt) { if (n === w) break; idx += n.textContent.length; } const p = t.getStartPositionOfChar(idx); return { x: p.x, y: p.y, w: w.getComputedTextLength() }; } catch (err) { return null; } });
        dgAnim(el, 7000, e => {
          const cur = Math.floor((e - 300) / 360);
          const b = box[Math.max(0, Math.min(NW - 1, cur))];
          const on = cur >= 0 && cur < NW && e < 7000 && b;
          ptr.setAttribute('opacity', on ? 1 : 0);
          if (on) { ptr.setAttribute('x', b.x); ptr.setAttribute('y', b.y + 8); ptr.setAttribute('width', b.w); }
          ws.forEach((w, i) => w.setAttribute('fill', e >= 7000 || i <= cur ? (i === cur && e < 7000 ? C.c : C.ink) : '#b8b8be'));
        });
      }
    },

    'e1-14:1': {
      alt: '문장을 하나씩 읽을 때마다 고양이 그림이 바뀌는 모습: 고양이가 있고(a cat), 크고(big), 까맣고(black), 달릴 수 있고(can run), 내가 좋아해요(like)',
      svg: `<svg viewBox="0 0 480 240" class="dg-svg" role="img">
        ${P1.map((p, i) => { const x = 48 + i * 96; return `<g class="p${i}">
          <g transform="translate(${x},118)">${p.g()}</g>
          ${T(x, 200, p.en, { s: 20, f: C.d, w: 800 })}
          ${T(x, 226, p.ko, { s: 18, f: C.sub })}</g>
`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 6000, e => {
          P1.forEach((_, i) => POP(el, '.p' + i, dgP(e, 200 + i * 1100, 600)));
        });
      }
    },

    'e1-14:2': {
      alt: 'My cat is big. It is black. 에서 It이 앞에 나온 my cat을 가리키는 화살표와 It = my cat 이라는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${R2.svg}
        <path class="arc" d="M${iX} 86 C ${iX} 40, ${mX} 40, ${mX} 82" fill="none" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round" pathLength="100" stroke-dasharray="100" />
        <path class="ah" d="M${mX - 7} 74 l7 9 l7 -9" fill="none" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="eq">
          ${B(120, 186, 'It', { k: 'org', s: 26, h: 50 })}
          ${T(172, 222, '=', { s: 30, w: 800 })}
          ${B(250, 186, 'my cat', { k: 'blue', s: 26, h: 50 })}
          <g transform="translate(380,214) scale(.95)">${CAT(true)}</g>
          ${T(120, 266, '그것', { s: 18, f: C.sub })}
          ${T(250, 266, '내 고양이', { s: 18, f: C.sub })}
        </g>
      </svg>`,
      play(el) {
        const arc = el.querySelector('.arc');
        dgAnim(el, 4400, e => {
          POP(el, '.it', dgP(e, 300, 500));
          const a = dgEase(dgP(e, 1000, 1200));
          arc.setAttribute('stroke-dashoffset', 100 - 100 * a);
          OP(el, '.ah', a >= 1 ? 1 : 0);
          IN(el, '.eq', dgP(e, 2700, 700));
        });
      }
    },

    'e1-14:3': {
      alt: '이야기를 읽고 Who?에는 a cat, What color?에는 black, Big or small?에는 big에 동그라미를 치는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${Q3.map((r, i) => { const y = 72 + i * 72; let x = 254; return `
          ${T(196, y + 8, r.q, { s: 22, f: C.d, a: 'end', w: 800 })}
          ${ARROW(206, y, 232, y, GR)}
          ${r.ans.map(([s, ok]) => { const w = tw(s, 24), cx = x + w / 2; x += w + 34; return `
            ${T(cx, y + 9, s, { s: 24, f: ok ? C.ink : '#a1a1a6', w: 800 })}
            ${ok ? `<ellipse class="cir cir${i}" cx="${cx}" cy="${y}" rx="${w / 2 + 16}" ry="24" fill="none" stroke="${C.c}" stroke-width="3.5" pathLength="100" stroke-dasharray="100" transform="rotate(-4 ${cx} ${y})"/>` : ''}`; }).join('')}`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 4200, e => {
          Q3.forEach((_, i) => el.querySelectorAll('.cir' + i).forEach(c => c.setAttribute('stroke-dashoffset', 100 - 100 * dgEase(dgP(e, 500 + i * 1200, 900)))));
        });
      }
    },
  });
})();
