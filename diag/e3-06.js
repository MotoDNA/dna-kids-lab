/* 3학년 영어 · 처음 만난 친구에게 영어로 인사해 볼까? (e3-06) */
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

  /* 2: 대화 두 쌍 */
  const D2 = [
    { h: '처음 만날 때', col: C.r, q: 'Nice to meet you.', a: `Nice to meet you, ${HL('too', C.r)}.`, y: 40 },
    { h: '아는 친구에게', col: C.d, q: 'How are you?', a: "I'm fine, thank you.", y: 184 },
  ];

  Object.assign(DIAG, {
    'e3-06:0': {
      alt: '만날 때는 Hi!, Hello!라고 하고 헤어질 때는 Goodbye!, See you later.라고 인사하는 두 장면 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <line x1="240" y1="50" x2="240" y2="256" stroke="#e5e5ea" stroke-width="2"/>
        <g class="mL">${FACE(0, 0, 26, { k: 'kid' })}</g><g class="mR">${FACE(0, 0, 26, { k: 'boy' })}</g>
        <g class="hb1">${BUB(14, 60, 82, 44, 'l', 'Hi!', { s: 22, bg: C.a })}</g>
        <g class="hb2">${BUB(96, 116, 110, 44, 'r', 'Hello!', { s: 22, bg: C.b })}</g>
        <g class="bL">${FACE(0, 0, 26, { k: 'kid' })}</g><g class="bR">${FACE(0, 0, 26, { k: 'boy' })}</g>
        <g class="gb1">${BUB(250, 60, 140, 44, 'l', 'Goodbye!', { s: 22, bg: C.a })}</g>
        <g class="gb2">${BUB(296, 116, 176, 44, 'r', 'See you later.', { s: 20, bg: C.b })}</g>
        ${T(120, 250, '만날 때', { s: 20, f: C.r, w: 800 })}${T(360, 250, '헤어질 때', { s: 20, f: C.c, w: 800 })}
      </svg>`,
      play(el) {
        dgAnim(el, 5600, e => {
          const m = dgEase(dgP(e, 200, 1000));
          MV(el, '.mL', 30 + 50 * m, 192); MV(el, '.mR', 210 - 50 * m, 192);
          IN(el, '.hb1', dgP(e, 1200, 400)); IN(el, '.hb2', dgP(e, 1700, 400));
          const b = dgEase(dgP(e, 2800, 1100));
          MV(el, '.bL', 340 - 70 * b, 192); MV(el, '.bR', 380 + 70 * b, 192);
          OP(el, '.bL,.bR', e >= 2600 ? 1 : dgP(e, 2400, 200));
          IN(el, '.gb1', dgP(e, 3900, 400)); IN(el, '.gb2', dgP(e, 4400, 400));
        });
      }
    },

    'e3-06:1': {
      alt: 'What\'s your name?(네 이름이 뭐야?)이라는 물음에 I\'m Mina.와 My name is Mina.로 대답할 수 있고, 둘 다 나는 미나야라는 뜻인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${FACE(32, 70, 24, { k: 'boy' })}
        ${BUB(66, 48, 240, 48, 'l', "What's your name?", { s: 22, bg: C.b })}
        <g class="a1">${BUB(196, 128, 160, 48, 'r', "I'm Mina.", { s: 24, bg: C.a })}</g>
        <g class="eq">${T(276, 210, '=', { s: 28, w: 800, f: C.sub })}</g>
        <g class="a2">${BUB(150, 218, 252, 48, 'r', 'My name is Mina.', { s: 24, bg: C.a })}</g>
        ${FACE(446, 216, 24, { k: 'woman' })}
        <g class="ko">${T(84, 202, '둘 다', { s: 18, f: C.sub })}${T(84, 228, '나는 미나야', { s: 20, f: C.c, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 4600, e => {
          IN(el, '.a1', dgP(e, 900, 500));
          OP(el, '.eq', dgP(e, 1800, 300));
          IN(el, '.a2', dgP(e, 2200, 500));
          IN(el, '.ko', dgP(e, 3400, 500), 0, 10);
        });
      }
    },

    'e3-06:2': {
      alt: '처음 만났을 때 Nice to meet you. - Nice to meet you, too., 아는 친구에게 How are you? - I\'m fine, thank you.라고 주고받는 대화 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${D2.map((d, i) => `<g class="h${i}">${T(16, d.y + 20, d.h, { s: 20, f: d.col, w: 800, a: 'start' })}</g>
          <g class="q${i}">${BUB(16, d.y + 30, bw(d.q, 21) + 10, 44, 'l', d.q, { s: 21, bg: BG })}</g>
          <g class="a${i}">${BUB(464 - bw(d.a, 21) - 10, d.y + 80, bw(d.a, 21) + 10, 44, 'r', d.a, { s: 21, bg: C.b })}</g>`).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          D2.forEach((_, i) => { const t = 200 + i * 2300; OP(el, '.h' + i, dgP(e, t, 300)); IN(el, '.q' + i, dgP(e, t + 300, 500), -20, 0); IN(el, '.a' + i, dgP(e, t + 1300, 500), 20, 0); });
        });
      }
    },
  });
})();
