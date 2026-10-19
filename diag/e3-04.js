/* 3학년 영어 · 오늘 날씨는 영어로 어떻게 말할까? (e3-04) */
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

  /* 날씨 아이콘 (원점 기준, 약 ±40) */
  const CLOUD = (fill, dy = 0) => `<g fill="${fill}" transform="translate(0,${dy})"><circle cx="-16" cy="2" r="16"/><circle cx="4" cy="-8" r="20"/><circle cx="22" cy="4" r="14"/><rect x="-32" y="2" width="68" height="16" rx="8"/></g>`;
  const ICON = {
    sunny: () => `<g stroke="${C.c}" stroke-width="4" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = a * Math.PI / 180; return `<line x1="${(26 * Math.cos(r)).toFixed(1)}" y1="${(26 * Math.sin(r)).toFixed(1)}" x2="${(36 * Math.cos(r)).toFixed(1)}" y2="${(36 * Math.sin(r)).toFixed(1)}"/>`; }).join('')}</g><circle r="18" fill="${C.a}" stroke="${C.c}" stroke-width="4"/>`,
    rainy: () => `${CLOUD('#a9c6e8', -10)}<g stroke="${C.d}" stroke-width="4" stroke-linecap="round"><line x1="-16" y1="18" x2="-21" y2="30"/><line x1="2" y1="18" x2="-3" y2="30"/><line x1="20" y1="18" x2="15" y2="30"/><line x1="-7" y1="30" x2="-12" y2="40"/><line x1="11" y1="30" x2="6" y2="40"/></g>`,
    cloudy: () => `${CLOUD('#d2d2d7', 0)}`,
    snowy: () => `${CLOUD('#d2d2d7', -10)}<g fill="${C.d}">${[[-16, 24], [2, 28], [20, 24], [-7, 38], [11, 38]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g>`,
    windy: () => `<g fill="none" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"><path d="M-34 -14 H14 a10 10 0 1 0 -10 -10"/><path d="M-34 2 H26 a10 10 0 1 1 -10 10"/><path d="M-26 18 H4"/></g>`,
  };
  const W1 = [['sunny', '맑아요'], ['rainy', '비 와요'], ['cloudy', '흐려요'], ['snowy', '눈 와요'], ['windy', '바람 불어요']];
  const R1 = ROWC(240, 46, [{ s: "It's", k: 'blue' }, { s: '날씨 낱말', k: 'white', c: 'slot' }, { s: '.', plain: 1 }], 8, 24);
  /* 2: 온도계 */
  const TH = [{ w: 'hot', ko: '더워요', lv: 0.9, col: RED }, { w: 'warm', ko: '따뜻해요', lv: 0.6, col: C.c }, { w: 'cold', ko: '추워요', lv: 0.18, col: C.d }];
  const TT = 52, TB = 172; // 관 위·아래

  Object.assign(DIAG, {
    'e3-04:0': {
      alt: 'How is가 줄어 How\'s가 되고, How\'s the weather?는 날씨(weather)가 어때?라고 묻는 말이라는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <g class="full">${B(70, 46, 'How', { k: 'gray', s: 24 })}${B(142, 46, 'is', { k: 'gray', s: 24 })}</g>
        <g class="ar">${ARROW(186, 68, 232, 68, C.c)}</g>
        <g class="sh">${B(290, 46, "How's", { k: 'blue', s: 24 })}${T(370, 76, '줄임말', { s: 18, f: C.sub, a: 'start' })}</g>
        <g class="q">${ROWC(240, 130, [{ s: "How's", k: 'blue' }, { s: 'the', k: 'gray' }, { s: 'weather', k: 'org' }, { s: '?', plain: 1 }], 8, 26).svg}</g>
        <g class="wk">${T(ROWC(240, 130, [{ s: "How's" }, { s: 'the' }, { s: 'weather' }, { s: '?', plain: 1 }], 8, 26).xs[2], 206, '날씨', { s: 20, f: C.c, w: 800 })}</g>
        <g class="ko">${T(240, 250, '날씨가 어때?', { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          IN(el, '.full', dgP(e, 200, 500));
          OP(el, '.ar', dgP(e, 900, 300));
          IN(el, '.sh', dgP(e, 1200, 500), -30, 0);
          IN(el, '.q', dgP(e, 2400, 600));
          OP(el, '.wk', dgP(e, 3300, 400));
          IN(el, '.ko', dgP(e, 4100, 500));
        });
      }
    },

    'e3-04:1': {
      alt: 'It\'s 뒤에 날씨 낱말을 붙여 대답해요. 해 sunny, 비 rainy, 흐린 구름 cloudy, 눈 snowy, 바람 windy 그림과 낱말',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${R1.svg}
        ${W1.map(([w, k], i) => { const x = 48 + i * 96; return `<g class="w${i}">
          <g transform="translate(${x},${w === 'sunny' ? 146 : 142})">${ICON[w]()}</g>
          ${T(x, 216, w, { s: 21, f: C.d, w: 800 })}
          ${T(x, 242, k, { s: 18, f: C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          W1.forEach((_, i) => POP(el, '.w' + i, dgP(e, 400 + i * 850, 550)));
        });
      }
    },

    'e3-04:2': {
      alt: '온도계 눈금이 높으면 hot(더워요), 중간이면 warm(따뜻해요), 낮으면 cold(추워요)라고 하고, 추울 때는 Wear your coat.라고 말해 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${TH.map((t, i) => { const x = 90 + i * 150; return `<g>
          <rect x="${x - 11}" y="${TT}" width="22" height="${TB - TT + 10}" rx="11" fill="#fff" stroke="${GR}" stroke-width="3"/>
          <circle cx="${x}" cy="${TB + 18}" r="18" fill="${t.col}" stroke="${GR}" stroke-width="3"/>
          <rect class="lv${i}" x="${x - 6}" y="${TB}" width="12" height="10" rx="6" fill="${t.col}"/>
          <circle cx="${x}" cy="${TB + 18}" r="14" fill="${t.col}"/>
          ${[0.25, 0.5, 0.75].map(f => `<line x1="${x + 14}" x2="${x + 22}" y1="${TB - (TB - TT) * f}" y2="${TB - (TB - TT) * f}" stroke="${GR}" stroke-width="2.5"/>`).join('')}
          <g class="lb${i}">${T(x, 238, t.w, { s: 24, f: t.col, w: 800 })}${T(x, 264, t.ko, { s: 18, f: C.sub })}</g></g>`; }).join('')}
        <g class="tip">${T(240, 300, `It's cold. → <tspan fill="${C.d}">Wear your coat.</tspan>`, { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          TH.forEach((t, i) => {
            const f = dgEase(dgP(e, 300 + i * 1000, 900)), h = (TB - TT - 6) * t.lv * f;
            el.querySelectorAll('.lv' + i).forEach(r => { r.setAttribute('y', TB - h); r.setAttribute('height', h + 10); });
            OP(el, '.lb' + i, dgP(e, 900 + i * 1000, 400));
          });
          IN(el, '.tip', dgP(e, 4000, 600));
        });
      }
    },
  });
})();
