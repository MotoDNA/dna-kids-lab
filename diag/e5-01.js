/* 5학년 영어 · 길을 잃었을 때 영어로 길을 물어볼까? (e5-01) */
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

  /* 0 */
  const PL = [['the library?', '도서관'], ['the post office?', '우체국']];
  const NB = (x, y, n, col) => `<circle cx="${x}" cy="${y}" r="14" fill="${col}"/>${T(x, y + 6.5, n, { s: 18, f: '#fff', w: 800 })}`;
  /* 1: 지도 */
  const VX = [300, 420], HY = [170, 280];
  const LEG = [
    { s: 'Go straight.', d: 'M0 14 V-14 M-8 -6 L0 -14 L8 -6' },
    { s: 'Turn left.', d: 'M8 14 V-2 Q8 -8 2 -8 H-12 M-5 -15 L-12 -8 L-5 -1' },
    { s: 'Turn right.', d: 'M-8 14 V-2 Q-8 -8 -2 -8 H12 M5 -15 L12 -8 L5 -1' },
  ];
  const ROUTE = [[VX[0], 292], [VX[0], HY[0]], [392, HY[0]]];
  /* 2: 마을 지도 */
  const BLD = { school: [20, 48, 120, 70], library: [180, 48, 120, 70], park: [340, 48, 120, 70], bank: [40, 182, 120, 66], post: [180, 182, 120, 66] };
  const bx = k => BLD[k][0] + BLD[k][2] / 2;

  Object.assign(DIAG, {
    'e5-01:0': {
      alt: '먼저 Excuse me.(실례합니다.)로 말을 건 다음, Where is 뒤에 the library?나 the post office? 같은 장소를 붙여 묻는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="s1">${NB(26, 70, 1, C.c)}${BUB(50, 48, 176, 46, '', 'Excuse me.', { s: 22, bg: C.a })}${T(242, 78, '먼저 말 걸기', { s: 18, f: C.sub, a: 'start' })}</g>
        <g class="s2">${NB(26, 196, 2, C.d)}${B(102, 174, 'Where is', { k: 'blue', s: 22 })}</g>
        ${PL.map(([p, k], i) => { const y = 136 + i * 76, w = bw(p, 22); return `<g class="p${i}">
          <path d="M${154} 196 C ${172} 196, ${172} ${y + 22}, ${188} ${y + 22}" fill="none" stroke="${C.sub}" stroke-width="2.5"/>
          ${B(190 + w / 2, y, p, { k: 'org', s: 22 })}${T(190 + w / 2, y + 66, k, { s: 18, f: C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 4800, e => {
          IN(el, '.s1', dgP(e, 200, 500));
          IN(el, '.s2', dgP(e, 1300, 500));
          IN(el, '.p0', dgP(e, 2100, 500), 24, 0);
          IN(el, '.p1', dgP(e, 3100, 500), 24, 0);
        });
      }
    },

    'e5-01:1': {
      alt: '길 안내 표현 Go straight.(곧장 가세요), Turn left.(왼쪽으로 도세요), Turn right.(오른쪽으로 도세요)와, 지도에서 한 블록 곧장 간 뒤 오른쪽으로 돌아 도착하는 길 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${LEG.map((l, i) => { const y = 72 + i * 70; return `<g class="lg${i}"><rect x="10" y="${y - 26}" width="52" height="52" rx="14" fill="${BG}"/><path transform="translate(36,${y})" d="${l.d}" fill="none" stroke="${C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${T(74, y + 7, l.s, { s: 21, w: 800, a: 'start' })}</g>`; }).join('')}
        <g>
          ${[250, 350].map(x => [100, 210].map(y => `<rect x="${x - 6}" y="${y - 40}" width="${x === 250 ? 34 : 54}" height="${y === 100 ? 54 : 84}" rx="8" fill="${BG}"/>`).join('')).join('')}
          ${VX.map(x => `<rect x="${x - 10}" y="44" width="20" height="260" fill="#e5e5ea"/>`).join('')}
          ${HY.map(y => `<rect x="236" y="${y - 10}" width="240" height="20" fill="#e5e5ea"/>`).join('')}
          <g class="dst"><rect x="372" y="104" width="44" height="44" rx="8" fill="${C.a}" stroke="${C.c}" stroke-width="3"/>${T(394, 134, '도착', { s: 18, f: C.ink, w: 800 })}</g>
          <path class="rt" d="M${ROUTE.map(p => p.join(' ')).join(' L')}" fill="none" stroke="${C.c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle class="me" r="9" fill="${C.d}" stroke="#fff" stroke-width="3"/>
          <g class="bl">${T(330, 236, 'one', { s: 18, f: C.c, w: 800, a: 'start' })}${T(330, 258, 'block', { s: 18, f: C.c, w: 800, a: 'start' })}</g>
        </g>
      </svg>`,
      play(el) {
        const rt = el.querySelector('.rt'), me = el.querySelector('.me');
        const L1 = ROUTE[0][1] - ROUTE[1][1], L2 = ROUTE[2][0] - ROUTE[1][0];
        rt.setAttribute('stroke-dasharray', `${L1 + L2} ${L1 + L2}`);
        dgAnim(el, 6000, e => {
          const a = dgEase(dgP(e, 800, 1800)), b = dgEase(dgP(e, 3200, 1400));
          const d = L1 * a + L2 * b;
          rt.setAttribute('stroke-dashoffset', L1 + L2 - d);
          const x = ROUTE[1][0] + L2 * b, y = ROUTE[0][1] - L1 * a;
          me.setAttribute('cx', x); me.setAttribute('cy', y);
          const hi = (i, on) => el.querySelectorAll(`.lg${i} path`).forEach(p => p.setAttribute('stroke', on ? C.c : C.sub));
          hi(0, e > 700); hi(2, e > 3000); hi(1, false);
          OP(el, '.bl', dgP(e, 1800, 400));
          POP(el, '.dst', dgP(e, 4700, 500));
        });
      }
    },

    'e5-01:2': {
      alt: '마을 지도에서 도서관은 학교와 공원 사이(between the school and the park), 우체국은 은행 옆(next to the bank), 우체국은 도서관 건너편(across from the library)에 있는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 374" class="dg-svg" role="img">
        <rect x="0" y="134" width="480" height="32" fill="#e5e5ea"/>
        ${Object.entries({ school: 'school', library: 'library', bank: 'bank', post: 'post office' }).map(([k, n]) => { const [x, y, w, h] = BLD[k]; return `<rect class="bd-${k}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${BG}" stroke="#d2d2d7" stroke-width="2.5"/>${T(x + w / 2, y + h / 2 + 7, n, { s: 20, w: 800 })}`; }).join('')}
        <rect x="340" y="48" width="120" height="70" rx="10" fill="${LG}" stroke="${C.r}" stroke-width="2.5"/>
        <circle cx="368" cy="74" r="12" fill="${C.r}" opacity=".55"/><circle cx="432" cy="74" r="12" fill="${C.r}" opacity=".55"/>
        ${T(400, 106, 'park', { s: 20, w: 800 })}
        <g class="h1">${ARROW(146, 83, 174, 83, C.d, '', 4)}${ARROW(334, 83, 306, 83, C.d, '', 4)}<rect x="180" y="48" width="120" height="70" rx="10" fill="none" stroke="${C.d}" stroke-width="4"/>${NB(240, 30 + 4, 1, C.d)}</g>
        <g class="h2"><rect x="32" y="174" width="276" height="82" rx="14" fill="none" stroke="${C.r}" stroke-width="4" stroke-dasharray="8 6"/>${NB(170, 266, 2, C.r)}</g>
        <g class="h3">${ARROW(250, 124, 250, 176, C.c, '', 4)}${ARROW(250, 176, 250, 124, C.c, '', 4)}${NB(276, 150, 3, C.c)}</g>
        <g class="c1">${NB(26, 300, 1, C.d)}${T(48, 306, `library: ${HL('between', C.d)} the school and the park`, { s: 18, w: 800, a: 'start' })}</g>
        <g class="c2">${NB(26, 328, 2, C.r)}${T(48, 334, `post office: ${HL('next to', C.r)} the bank`, { s: 18, w: 800, a: 'start' })}</g>
        <g class="c3">${NB(26, 356, 3, C.c)}${T(48, 362, `post office: ${HL('across from', C.c)} the library`, { s: 18, w: 800, a: 'start' })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 6000, e => {
          [['.h1', '.c1'], ['.h2', '.c2'], ['.h3', '.c3']].forEach(([h, c], i) => { POP(el, h, dgP(e, 400 + i * 1800, 500)); IN(el, c, dgP(e, 800 + i * 1800, 500), -16, 0); });
        });
      }
    },
  });
})();
