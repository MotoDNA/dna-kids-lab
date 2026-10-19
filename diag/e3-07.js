/* 4학년 영어 · 내 기분을 영어로 어떻게 말할까? (e3-07) */
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

  /* 기분 얼굴 (원점, 반지름 r) */
  const MOOD = (m, r = 34) => {
    const k = r / 34, s = (d) => d.replace(/-?\d+(\.\d+)?/g, v => +(v * k).toFixed(1));
    const ink = `stroke="${C.ink}" stroke-width="${3.5 * k}" stroke-linecap="round" fill="none"`;
    const dot = (x, y) => `<circle cx="${x * k}" cy="${y * k}" r="${3.6 * k}" fill="${C.ink}"/>`;
    let f = '';
    if (m === 'happy') f = `${dot(-12, -6)}${dot(12, -6)}<path ${ink} d="${s('M-14 8 Q0 24 14 8')}"/>`;
    if (m === 'sad') f = `${dot(-12, -6)}${dot(12, -6)}<path ${ink} d="${s('M-12 18 Q0 8 12 18')}"/><path d="${s('M-14 2 q-5 9 0 12 q5 -3 0 -12z')}" fill="${C.d}"/>`;
    if (m === 'angry') f = `<path ${ink} d="${s('M-20 -16 L-6 -9 M20 -16 L6 -9')}"/>${dot(-11, -2)}${dot(11, -2)}<path ${ink} d="${s('M-12 17 Q0 9 12 17')}"/>`;
    if (m === 'tired') f = `<path ${ink} d="${s('M-18 -4 h12 M6 -4 h12')}"/><path ${ink} d="${s('M-12 14 q4 -4 8 0 q4 4 8 0 q4 -4 8 0')}"/><path d="${s('M22 -22 q-5 9 0 12 q5 -3 0 -12z')}" fill="${C.d}"/>`;
    if (m === 'hungry') f = `${dot(-12, -8)}${dot(12, -8)}<ellipse cx="0" cy="${11 * k}" rx="${9 * k}" ry="${10 * k}" fill="${C.ink}"/><ellipse cx="0" cy="${16 * k}" rx="${6 * k}" ry="${4 * k}" fill="${RED}"/>`;
    if (m === 'sleepy') f = `<path ${ink} d="${s('M-18 -4 q6 6 12 0 M6 -4 q6 6 12 0')}"/><circle cx="0" cy="${14 * k}" r="${4 * k}" fill="${C.ink}"/>`;
    const fill = m === 'angry' ? '#ffc2b8' : C.a, st = m === 'angry' ? RED : C.c;
    return `<circle r="${r}" fill="${fill}" stroke="${st}" stroke-width="3"/>${f}${m === 'sleepy' ? `<text x="${r * .8}" y="${-r * .7}" font-size="20" font-weight="800" fill="${C.d}">z</text><text x="${r * 1.15}" y="${-r * 1.05}" font-size="22" font-weight="800" fill="${C.d}">Z</text>` : ''}`;
  };
  const M0 = [['happy', '기쁜'], ['sad', '슬픈'], ['angry', '화난'], ['tired', '피곤한'], ['hungry', '배고픈'], ['sleepy', '졸린']];
  /* 1 */
  const R1 = ROW(30, 136, [{ s: "I'm", k: 'blue' }, { s: 'happy', k: 'org' }, { s: '.', plain: 1 }], 8, 24);
  const R2 = ROW(30, 216, [{ s: "I'm", k: 'blue' }, { s: 'very', k: 'grn' }, { s: 'happy', k: 'org' }, { s: '.', plain: 1 }], 8, 24);

  Object.assign(DIAG, {
    'e3-07:0': {
      alt: '기분을 나타내는 얼굴 그림과 낱말: happy 기쁜, sad 슬픈, angry 화난, tired 피곤한, hungry 배고픈, sleepy 졸린',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${M0.map(([m, ko], i) => { const x = 80 + (i % 3) * 160, y = 84 + Math.floor(i / 3) * 140; return `<g class="m${i}">
          <g transform="translate(${x},${y})">${MOOD(m)}</g>
          ${T(x, y + 64, m, { s: 22, f: C.d, w: 800 })}${T(x, y + 88, ko, { s: 18, f: C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          M0.forEach((_, i) => POP(el, '.m' + i, dgP(e, 200 + i * 750, 550)));
        });
      }
    },

    'e3-07:1': {
      alt: 'I와 am이 합쳐져 I\'m이 되고, I\'m happy.(나는 기뻐.)에 very를 넣으면 I\'m very happy.(나는 정말 기뻐.)가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="c">${B(52, 46, 'I', { k: 'gray', s: 24 })}${B(120, 46, 'am', { k: 'gray', s: 24 })}${ARROW(166, 68, 206, 68, C.c)}${B(256, 46, "I'm", { k: 'blue', s: 24 })}${T(302, 76, '줄임말', { s: 18, f: C.sub, a: 'start' })}</g>
        <line x1="20" y1="114" x2="460" y2="114" stroke="#e5e5ea" stroke-width="2"/>
        <g class="r1">${R1.svg}${T(400, 164, '나는 기뻐.', { s: 20, f: C.sub })}</g>
        <g class="r2">${R2.svg}${T(R2.xs[1], 284, '정말', { s: 18, f: C.r, w: 800 })}${T(400, 244, '나는 정말 기뻐.', { s: 20, f: C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          IN(el, '.c', dgP(e, 200, 600));
          IN(el, '.r1', dgP(e, 1500, 600));
          IN(el, '.r2', dgP(e, 3000, 700));
        });
      }
    },

    'e3-07:2': {
      alt: '웃는 아이가 피곤해 보이는 친구에게 Are you tired?(너 피곤해?)라고 묻고, 피곤한 친구는 맞으면 Yes, I am., 아니면 No, I\'m not.이라고 대답하며, 다른 아이가 슬퍼 보이는 친구에게 What\'s wrong?(무슨 일 있어?)이라고 묻는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g transform="translate(60,62) scale(.75)">${MOOD('tired')}</g>
        <g transform="translate(424,58) scale(.75)">${MOOD('happy')}</g>
        ${BUB(176, 34, 210, 48, 'r', 'Are you tired?', { s: 22, bg: C.b })}
        <g class="y">${ARROW(60, 94, 70, 132, C.r)}${CHECK(64, 158, 15)}${T(88, 165, '맞으면', { s: 20, f: C.r, a: 'start' })}${B(116, 184, 'Yes, I am.', { k: 'grn' })}</g>
        <g class="n">${ARROW(88, 86, 290, 136, RED)}${CROSS(300, 158, 15)}${T(324, 165, '아니면', { s: 20, f: RED, a: 'start' })}${B(350, 184, "No, I'm not.", { k: 'red' })}</g>
        <g class="w">${FACE(32, 270, 20, { k: 'boy' })}<path d="M72 258 L56 270 L72 282Z" fill="${C.b}"/>${BUB(70, 250, 300, 40, '', `What's wrong? ${HL('(무슨 일 있어?)', C.sub)}`, { s: 18, bg: C.b })}<g transform="translate(436,270) scale(.6)">${MOOD('sad')}</g></g>
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
