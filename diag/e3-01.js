/* 3학년 영어 · 알파벳 26글자로 어떻게 낱말을 만들까? (e3-01) */
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

  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const PAL = [[C.b, C.d], [C.a, C.c], [LG, C.r]];
  /* 1 */
  const PR = [['A', 'a'], ['B', 'b'], ['G', 'g'], ['Q', 'q']];
  /* 2 */
  const SND = [{ l: 'a', w: 'apple', s: '애', m: '사과' }, { l: 'b', w: 'ball', s: '브', m: '공' }, { l: 'c', w: 'cat', s: '크', m: '고양이' }, { l: 'd', w: 'dog', s: '드', m: '개' }];
  /* 3 */
  const TL = 56, TY = 56, T3 = [90, 152, 214];
  const TILE = (x, y, s, k, c) => `<g class="${c}"><rect x="${x - TL / 2}" y="${y}" width="${TL}" height="${TL}" rx="12" fill="${ST[k].bg}" stroke="${ST[k].st}" stroke-width="2.5"/>${T(x, y + 39, s, { s: 32, w: 800 })}</g>`;

  Object.assign(DIAG, {
    'e3-01:0': {
      alt: '알파벳 A부터 Z까지 26글자가 차례대로 블록에 하나씩 나타나는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${ABC.map((L, i) => { const r = Math.floor(i / 9), c = i % 9, x = 9 + c * 52 + (r === 2 ? 26 : 0), y = 46 + r * 58, [f, s] = PAL[i % 3]; return `<g class="t t${i}"><rect x="${x}" y="${y}" width="48" height="50" rx="10" fill="${f}" stroke="${s}" stroke-width="2"/>${T(x + 24, y + 35, L, { s: 26, w: 800 })}</g>`; }).join('')}
        <g class="tot">${T(240, 250, '모두 <tspan class="n" fill="' + C.d + '">26</tspan>글자', { s: 24, w: 800 })}</g>
      </svg>`,
      play(el) {
        const n = el.querySelector('.n');
        dgAnim(el, 6000, e => {
          let k = 0;
          ABC.forEach((_, i) => { const p = dgP(e, 200 + i * 180, 300); POP(el, '.t' + i, p); if (p > 0) k = i + 1; });
          n.textContent = k;
          OP(el, '.tot', e > 200 ? 1 : 0);
        });
      }
    },

    'e3-01:1': {
      alt: '대문자 A, B, G, Q와 소문자 a, b, g, q가 짝을 이루고, 이름 Tom과 Mina는 첫 글자를 대문자로 쓰는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${T(16, 76, '대문자', { s: 18, f: C.d, a: 'start' })}${T(16, 156, '소문자', { s: 18, f: C.c, a: 'start' })}
        ${PR.map(([U, l], i) => { const x = 130 + i * 92; return `<g class="pr${i}">
          ${B(x, 46, U, { k: 'blue', s: 34, wd: 60, h: 56 })}
          <line x1="${x}" y1="104" x2="${x}" y2="124" stroke="${GR}" stroke-width="3" stroke-linecap="round"/>
          ${B(x, 126, l, { k: 'org', s: 34, wd: 60, h: 56 })}</g>`; }).join('')}
        <line x1="20" y1="208" x2="460" y2="208" stroke="#e5e5ea" stroke-width="2"/>
        <g class="nm">
          ${T(130, 262, `${HL('T', C.d)}om`, { s: 36, w: 800 })}
          ${T(300, 262, `${HL('M', C.d)}ina`, { s: 36, w: 800 })}
          ${T(215, 300, '이름 첫 글자는 대문자', { s: 18, f: C.sub })}
        </g>
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          PR.forEach((_, i) => IN(el, '.pr' + i, dgP(e, 200 + i * 700, 500)));
          IN(el, '.nm', dgP(e, 3500, 700));
        });
      }
    },

    'e3-01:2': {
      alt: 'a는 apple의 애, b는 ball의 브, c는 cat의 크, d는 dog의 드처럼 낱말의 첫 글자가 내는 소리를 보여 주는 카드 그림. b의 이름은 비지만 소리는 브',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${SND.map((p, i) => { const x = 60 + i * 120; return `<g class="cd${i}">
          <rect x="${x - 52}" y="44" width="104" height="196" rx="16" fill="${BG}"/>
          ${T(x, 96, p.l, { s: 46, f: C.d, w: 800 })}
          ${T(x, 134, `${HL(p.w[0])}${p.w.slice(1)}`, { s: 24, w: 800 })}
          <g class="sd${i}"><circle cx="${x}" cy="170" r="22" fill="${C.a}"/>${T(x, 177, p.s, { s: 22, f: C.ink, w: 800 })}</g>
          ${T(x, 224, p.m, { s: 18, f: C.sub })}</g>`; }).join('')}
        <g class="nb">${T(240, 284, `b 이름은 <tspan fill="${C.d}">비</tspan>, 소리는 <tspan fill="${C.c}">브</tspan>`, { s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5400, e => {
          SND.forEach((_, i) => { IN(el, '.cd' + i, dgP(e, 200 + i * 900, 500)); POP(el, '.sd' + i, dgP(e, 700 + i * 900, 500)); });
          IN(el, '.nb', dgP(e, 4300, 600));
        });
      }
    },

    'e3-01:3': {
      alt: '글자 블록 c, a, t를 이어 붙이면 크-애-트, cat(고양이)이 되고, c를 h로 바꾸면 hat(모자)이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${['c', 'a', 't'].map((s, i) => TILE(T3[i], 46, s, i === 0 ? 'blue' : 'gray', 'k' + i)).join('')}
        ${['크', '애', '트'].map((s, i) => T(T3[i], 132, s, { s: 22, f: C.d, w: 800, c: 's' + i })).join('')}
        <g class="w1">${T(262, 86, '=', { s: 30, w: 800 })}${T(330, 88, 'cat', { s: 32, w: 800 })}${T(330, 124, '캣! 고양이', { s: 18, f: C.sub })}</g>
        <g class="row2">
          ${ARROW(T3[0], 150, T3[0], 180, C.c)}
          ${TILE(T3[1], 186, 'a', 'gray', '')}${TILE(T3[2], 186, 't', 'gray', '')}
        </g>
        ${TILE(T3[0], 186, 'h', 'org', 'h')}
        <g class="w2">${T(262, 226, '=', { s: 30, w: 800 })}${T(330, 228, 'hat', { s: 32, w: 800 })}${T(330, 264, '모자', { s: 18, f: C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 7000, e => {
          [-50, 0, 50].forEach((dx, i) => { const m = dgEase(dgP(e, 200, 1100)); MV(el, '.k' + i, dx * (1 - m), 0); OP(el, '.k' + i, Math.min(1, e / 200)); });
          ['.s0', '.s1', '.s2'].forEach((s, i) => OP(el, s, dgP(e, 1500 + i * 500, 300)));
          IN(el, '.w1', dgP(e, 3100, 500), -10, 0);
          OP(el, '.row2', dgP(e, 4000, 400));
          IN(el, '.h', dgP(e, 4600, 700), 0, -40);
          IN(el, '.w2', dgP(e, 5600, 500), -10, 0);
        });
      }
    },
  });
})();
