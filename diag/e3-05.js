/* 3학년 영어 · 무지개 색깔과 숫자를 영어로 세어 볼까? (e3-05) */
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

  /* 0: 색깔 (색 이름을 배우는 단원이라 실제 색을 씀) */
  const COL = [
    ['red', '빨강', '#ff3b30'], ['yellow', '노랑', '#ffcc00'], ['blue', '파랑', '#0071e3'],
    ['green', '초록', '#34a853'], ['orange', '주황', '#ff9500'], ['purple', '보라', '#af52de'],
    ['pink', '분홍', '#ff8fc2'], ['black', '검정', '#1d1d1f'], ['white', '하양', '#ffffff'],
  ];
  const CRAYON = (x, y, c) => `<path d="M${x} ${y - 13} h40 l14 9 v8 l-14 9 h-40 a4 4 0 0 1 -4 -4 v-18 a4 4 0 0 1 4 -4z" fill="${c}" stroke="${c === '#ffffff' ? '#c7c7cc' : 'none'}" stroke-width="2.5"/><rect x="${x + 8}" y="${y - 13}" width="6" height="26" fill="#fff" opacity="${c === '#ffffff' ? 0 : .45}"/>`;
  /* 1: 바나나 */
  const BANANA = `<g transform="translate(96,140) scale(1.4) rotate(-8)"><path d="M-58 -30 Q-40 40 52 18 Q60 16 58 8 Q-10 24 -42 -34 Z" fill="#ffcc00" stroke="#d4a300" stroke-width="3" stroke-linejoin="round"/><path d="M-42 -34 l-6 -10 l-12 6 l2 8z" fill="#8a6a00"/></g>`;
  /* 2: 11~20 */
  const NUM = [['11', 'eleven'], ['12', 'twelve'], ['13', 'thir'], ['14', 'four'], ['15', 'fif'], ['16', 'six'], ['17', 'seven'], ['18', 'eigh'], ['19', 'nine'], ['20', 'twenty']];
  /* 3: 사과 */
  const APPLE = (x, y) => `<g transform="translate(${x},${y})"><path d="M0 -20 C-10 -30 -34 -26 -34 -2 C-34 20 -16 34 0 28 C16 34 34 20 34 -2 C34 -26 10 -30 0 -20Z" fill="#ff3b30"/><path d="M0 -20 Q2 -30 6 -36" stroke="#8a5a2b" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M4 -30 Q16 -42 26 -34 Q16 -24 4 -30Z" fill="${C.r}"/></g>`;
  const AX = [140, 240, 340], AW = ['one', 'two', 'three'];

  Object.assign(DIAG, {
    'e3-05:0': {
      alt: '크레파스 색마다 영어 이름: red 빨강, yellow 노랑, blue 파랑, green 초록, orange 주황, purple 보라, pink 분홍, black 검정, white 하양',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${COL.map(([en, ko, c], i) => { const x = 12 + (i % 3) * 158, y = 74 + Math.floor(i / 3) * 70; return `<g class="c${i}">
          ${CRAYON(x, y, c)}
          ${T(x + 64, y - 1, en, { s: 22, w: 800, a: 'start' })}
          ${T(x + 64, y + 22, ko, { s: 18, f: C.sub, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          COL.forEach((_, i) => IN(el, '.c' + i, dgP(e, 200 + i * 480, 450), -24, 0));
        });
      }
    },

    'e3-05:1': {
      alt: '노란 바나나를 보고 What color is it?(무슨 색이야?)라고 물으면 It\'s yellow.(노란색이야.)라고 It\'s 뒤에 색깔을 붙여 대답하는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${BANANA}
        <g class="q">${BUB(186, 50, 244, 50, 'l', 'What color is it?', { s: 22, bg: C.b })}${T(308, 134, '무슨 색이야?', { s: 18, f: C.sub })}</g>
        <g class="a">${BUB(186, 154, 200, 50, 'l', `It's ${HL('yellow', '#d4a300')}.`, { s: 24, bg: '#fff3c4' })}${T(286, 236, '노란색이야.', { s: 18, f: C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 3800, e => {
          IN(el, '.q', dgP(e, 400, 600));
          IN(el, '.a', dgP(e, 1900, 600));
        });
      }
    },

    'e3-05:2': {
      alt: '11 eleven, 12 twelve, 13 thirteen부터 19 nineteen까지는 끝에 teen이 붙고 20은 twenty라는 것을 보여 주는 숫자 표',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${NUM.map(([n, w], i) => { const col = Math.floor(i / 5), r = i % 5, x = 30 + col * 236, y = 60 + r * 44, teen = +n >= 13 && +n <= 19; return `<g class="n${i}">
          <circle cx="${x}" cy="${y}" r="19" fill="${teen ? C.a : C.b}"/>${T(x, y + 7, n, { s: 19, w: 800 })}
          ${T(x + 30, y + 8, teen ? `${w}<tspan class="tn" fill="${C.c}">teen</tspan>` : w, { s: 24, w: 800, a: 'start' })}</g>`; }).join('')}
        <g class="nt">${B(240, 268, '13~19 → 끝에 -teen', { k: 'org', s: 20, h: 36 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 6000, e => {
          NUM.forEach((_, i) => IN(el, '.n' + i, dgP(e, 200 + i * 420, 400), -14, 0));
          const t = dgP(e, 4600, 500);
          el.querySelectorAll('.tn').forEach(s => s.setAttribute('fill', t > 0 ? C.c : C.ink));
          IN(el, '.nt', dgP(e, 4800, 500));
        });
      }
    },

    'e3-05:3': {
      alt: '사과를 one, two, three 하고 세어 보고 How many apples?(사과가 몇 개야?)에 Three apples.(사과 세 개.)라고 대답하는 그림. 둘 이상이라 apple 끝에 s가 붙어요',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${BUB(110, 44, 240, 48, '', `How many apple${HL('s')}?`, { s: 22, bg: C.b })}
        ${AX.map((x, i) => `<g class="ap${i}">${APPLE(x, 150)}</g><g class="nm${i}">${T(x, 212, AW[i], { s: 22, f: C.d, w: 800 })}</g>`).join('')}
        <g class="ans">${T(240, 258, `Three apple${HL('s')}.`, { s: 28, w: 800 })}${T(240, 294, '둘 이상이면 끝에 s', { s: 18, f: C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          AX.forEach((_, i) => { POP(el, '.ap' + i, dgP(e, 200 + i * 300, 400)); POP(el, '.nm' + i, dgP(e, 1400 + i * 800, 400)); });
          IN(el, '.ans', dgP(e, 4000, 600));
        });
      }
    },
  });
})();
