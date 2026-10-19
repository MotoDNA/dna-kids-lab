/* 4학년 영어 · 가게에서 영어로 물건을 사려면 뭐라고 할까? (e3-02) */
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

  const PENCIL = (x, y) => `<g transform="translate(${x},${y})"><rect x="-44" y="-9" width="70" height="18" fill="#ffcc00" stroke="#d4a300" stroke-width="2"/><rect x="-56" y="-9" width="14" height="18" rx="4" fill="#ff8fc2"/><path d="M26 -9 L46 0 L26 9 Z" fill="${C.a}" stroke="#d4a300" stroke-width="2" stroke-linejoin="round"/><path d="M40 -3 L46 0 L40 3Z" fill="${C.ink}"/></g>`;
  const NOTE = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-30" y="-38" width="60" height="76" rx="6" fill="${C.b}" stroke="${C.d}" stroke-width="3"/><line x1="-30" y1="-38" x2="-30" y2="38" stroke="${C.d}" stroke-width="7"/><line x1="-14" y1="-14" x2="18" y2="-14" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/><line x1="-14" y1="0" x2="18" y2="0" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/></g>`;
  const NB = (x, y, n, col) => `<circle cx="${x}" cy="${y}" r="14" fill="${col}"/>${T(x, y + 6.5, n, { s: 18, f: '#fff', w: 800 })}`;
  const RD = [['100', 'one hundred'], ['500', 'five hundred'], ['1,000', 'one thousand']];

  Object.assign(DIAG, {
    'e3-02:0': {
      alt: '점원이 Can I help you?(도와 드릴까요?)라고 물으면 아이가 I want a pencil.(연필을 사고 싶어요.)처럼 I want 뒤에 물건 이름을 붙여 말하는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${FACE(446, 96, 22, { k: 'man' })}
        <g class="q">${BUB(230, 54, 186, 46, 'r', 'Can I help you?', { s: 21, bg: C.b })}${T(323, 128, '도와 드릴까요?', { s: 18, f: C.sub })}</g>
        ${FACE(34, 182, 22, { k: 'kid' })}
        <g class="a">${BUB(66, 140, 220, 46, 'l', `I want ${HL('a pencil')}.`, { s: 22, bg: C.a })}${T(176, 214, '연필을 사고 싶어요.', { s: 18, f: C.sub })}</g>
        <g class="pc">${PENCIL(380, 164)}</g>
        <g class="f">${ROWC(240, 230, [{ s: 'I want', k: 'blue', fs: 20 }, { s: '+', plain: 1, fs: 22 }, { s: '물건 이름', k: 'org', fs: 20 }], 8, 20).svg}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 4600, e => {
          IN(el, '.q', dgP(e, 300, 500));
          IN(el, '.a', dgP(e, 1500, 500));
          POP(el, '.pc', dgP(e, 2100, 500));
          IN(el, '.f', dgP(e, 3300, 500));
        });
      }
    },

    'e3-02:1': {
      alt: '가격표가 붙은 공책을 보고 How much is it?(얼마예요?)라고 물으면 It\'s 1,000 won.이라고 대답하고, 100은 one hundred, 500은 five hundred, 1,000은 one thousand라고 읽는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${NOTE(62, 112, 1.1)}
        <g class="tag"><path d="M96 70 L112 58 H208 a6 6 0 0 1 6 6 v28 a6 6 0 0 1 -6 6 H112 Z" fill="#fff" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/><circle cx="110" cy="78" r="4" fill="${C.c}"/>${T(164, 86, '1,000 won', { s: 18, f: C.ink, w: 800 })}</g>
        <g class="q">${BUB(240, 44, 196, 44, 'l', 'How much is it?', { s: 21, bg: C.b })}</g>
        <g class="a">${BUB(240, 104, 196, 44, 'r', "It's 1,000 won.", { s: 21, bg: C.a })}</g>
        <line x1="20" y1="180" x2="460" y2="180" stroke="#e5e5ea" stroke-width="2"/>
        ${RD.map(([n, w], i) => `<g class="r${i}">${T(110, 214 + i * 30, n, { s: 22, f: C.c, w: 800, a: 'end' })}${T(126, 214 + i * 30, '→', { s: 20, f: GR, a: 'start' })}${T(160, 214 + i * 30, w, { s: 22, w: 800, a: 'start' })}</g>`).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          POP(el, '.tag', dgP(e, 200, 500));
          IN(el, '.q', dgP(e, 900, 500));
          IN(el, '.a', dgP(e, 1900, 500));
          RD.forEach((_, i) => IN(el, '.r' + i, dgP(e, 3000 + i * 600, 400), -16, 0));
        });
      }
    },

    'e3-02:2': {
      alt: '점원이 공책을 건네며 Here you are.라고 하고, 아이가 Thank you.라고 하면 점원이 You\'re welcome.이라고 대답하는 차례 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="b1">${BUB(250, 44, 180, 44, 'r', 'Here you are.', { s: 21, bg: C.b })}${NB(228, 66, 1, C.d)}</g>
        <g class="b2">${BUB(50, 110, 150, 44, 'l', 'Thank you.', { s: 21, bg: C.a })}${NB(220, 132, 2, C.c)}</g>
        <g class="b3">${BUB(232, 176, 198, 44, 'r', "You're welcome.", { s: 21, bg: C.b })}${NB(210, 198, 3, C.d)}</g>
        ${FACE(40, 252, 24, { k: 'kid' })}${FACE(444, 252, 24, { k: 'man' })}
        <g class="nb">${NOTE(0, 0, .5)}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5400, e => {
          IN(el, '.b1', dgP(e, 300, 500), 20, 0);
          const m = dgEase(dgP(e, 900, 1300));
          MV(el, '.nb', 400 - 310 * m, 256);
          IN(el, '.b2', dgP(e, 2400, 500), -20, 0);
          IN(el, '.b3', dgP(e, 3700, 500), 20, 0);
        });
      }
    },
  });
})();
