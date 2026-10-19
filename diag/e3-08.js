/* 3학년 영어 · 내가 좋아하는 것을 영어로 말해 볼까? (e3-08) */
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

  /* 0: I like + apple + s */
  const S0 = [{ w: 'apple', ko: '사과' }, { w: 'dog', ko: '개' }];
  const L0 = (w, y, i) => { const r = ROW(40, y, [{ s: 'I like', k: 'blue' }, { s: w, k: 'org' }], 10, 24); const sx = r.xs[1] + r.ws[1] / 2 + 6; return { svg: r.svg, sx }; };
  /* 1: don't 끼우기 */
  const R1a = ROWC(240, 56, [{ s: 'I', k: 'gray' }, { s: 'like', k: 'blue' }, { s: 'carrots.', k: 'org' }], 10, 24);
  const R1b = ROWC(240, 156, [{ s: 'I', k: 'gray' }, { s: "don't", k: 'red' }, { s: 'like', k: 'blue' }, { s: 'carrots.', k: 'org' }], 10, 24);

  Object.assign(DIAG, {
    'e3-08:0': {
      alt: 'I like 뒤에 좋아하는 것을 붙이고, 셀 수 있는 apple, dog에는 s를 붙여 I like apples. I like dogs.라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${S0.map((p, i) => { const y = 50 + i * 86, l = L0(p.w, y, i); return `<g class="r${i}">${l.svg}</g>
          <g class="s${i}">${B(l.sx + 16, y, 's', { k: 'grn', s: 24, wd: 34 })}${T(l.sx + 42, y + 30, '.', { s: 24, w: 800, a: 'start' })}</g>
          <g class="k${i}">${T(l.sx + 70, y + 30, p.ko, { s: 18, f: C.sub, a: 'start' })}</g>`; }).join('')}
        <g class="nt">${T(240, 236, `셀 수 있는 것 → 끝에 ${HL('s', C.r)}`, { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 4800, e => {
          S0.forEach((_, i) => { const t = 200 + i * 1600; IN(el, '.r' + i, dgP(e, t, 500), -20, 0); POP(el, '.s' + i, dgP(e, t + 800, 450)); OP(el, '.k' + i, dgP(e, t + 1100, 300)); });
          IN(el, '.nt', dgP(e, 3600, 500));
        });
      }
    },

    'e3-08:1': {
      alt: 'I like carrots.의 I와 like 사이에 don\'t를 넣으면 I don\'t like carrots.(나는 당근을 좋아하지 않아.)가 되고, don\'t는 do not을 줄인 말이라는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${R1a.svg}${T(240, 128, '좋아해', { s: 18, f: C.r, w: 800 })}
        <g class="b0">${B(R1b.xs[0], 156, 'I', { k: 'gray', s: 24, wd: R1b.ws[0] })}</g>
        <g class="b2">${B(R1b.xs[2], 156, 'like', { k: 'blue', s: 24, wd: R1b.ws[2] })}</g>
        <g class="b3">${B(R1b.xs[3], 156, 'carrots.', { k: 'org', s: 24, wd: R1b.ws[3] })}</g>
        <g class="dn">${B(R1b.xs[1], 156, "don't", { k: 'red', s: 24, wd: R1b.ws[1] })}</g>
        <g class="k2">${T(240, 228, '좋아하지 않아', { s: 18, f: RED, w: 800 })}</g>
        <g class="dd">${T(240, 274, `don't = ${HL('do not', RED)}`, { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          const c = dgP(e, 300, 500);
          OP(el, '.b0,.b2,.b3', c);
          const sp = dgEase(dgP(e, 1000, 700));
          MV(el, '.b0', (R1a.xs[0] - R1b.xs[0]) * (1 - sp), 0);
          MV(el, '.b2', (R1a.xs[1] - R1b.xs[2]) * (1 - sp), 0);
          MV(el, '.b3', (R1a.xs[2] - R1b.xs[3]) * (1 - sp), 0);
          IN(el, '.dn', dgP(e, 1800, 600), 0, -40);
          OP(el, '.k2', dgP(e, 2700, 400));
          IN(el, '.dd', dgP(e, 3600, 500));
        });
      }
    },

    'e3-08:2': {
      alt: 'Do you like cats?라는 물음에 좋아하면 Yes, I do., 좋아하지 않으면 No, I don\'t.라고 대답하고, 무엇을 좋아하는지는 What do you like?로 묻는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${BUB(100, 44, 240, 48, '', 'Do you like cats?', { s: 22, bg: C.b })}
        <g class="y">${ARROW(196, 102, 134, 136, C.r)}${CHECK(70, 160, 15)}${T(94, 167, '좋아하면', { s: 20, f: C.r, a: 'start' })}${B(120, 186, 'Yes, I do.', { k: 'grn' })}</g>
        <g class="n">${ARROW(244, 102, 326, 136, RED)}${CROSS(300, 160, 15)}${T(324, 167, '아니면', { s: 20, f: RED, a: 'start' })}${B(350, 186, "No, I don't.", { k: 'red' })}</g>
        <g class="w">${T(240, 274, `What do you like? ${HL('무엇을 좋아해?', C.sub)}`, { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 4400, e => {
          IN(el, '.y', dgP(e, 600, 600), -20, 0);
          IN(el, '.n', dgP(e, 1800, 600), 20, 0);
          IN(el, '.w', dgP(e, 3200, 500));
        });
      }
    },
  });
})();
