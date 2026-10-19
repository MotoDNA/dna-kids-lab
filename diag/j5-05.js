/* 5학년 일본어 · 지금 몇 시? 오늘은 무슨 요일? 일본어로 말해 볼까? (j5-05) */
(() => {
  /* ---- 공통 도우미 (이 파일 안에서만) ---- */
  const JA = 'lang="ja"', LG = '#f5f5f7', LN = '#d2d2d7', RED = '#ff3b30', PUR = '#af52de', GF = '#d6efdc';
  // 글자 폭 대략 계산(가나·한자·한글 = 글자 크기, 그 밖 0.58)
  const tw = (s, fs) => [...String(s).replace(/<[^>]+>/g, '')].reduce((a, ch) => a + (/[　-鿿가-힯＀-￯]/.test(ch) ? fs : ch === ' ' ? fs * .3 : fs * .58), 0);
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''}${o.ja ? ' ' + JA : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || DG_C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) => `<rect${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || LG}"${o.s ? ` stroke="${o.s}" stroke-width="${o.sw || 2.5}"` : ''}${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
  const ARR = (x1, y1, x2, y2, c = DG_C.sub, sw = 3, cls = '') => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 9, f = v => v.toFixed(1);
    return `<g${cls ? ` class="${cls}"` : ''} stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M${x1} ${y1} L${x2} ${y2}"/><path d="M${f(x2 - h * Math.cos(a - .5))} ${f(y2 - h * Math.sin(a - .5))} L${x2} ${y2} L${f(x2 - h * Math.cos(a + .5))} ${f(y2 - h * Math.sin(a + .5))}"/></g>`;
  };
  // 낱말 블록 한 줄: items [{t 일본어, k 한국어(아래), r 위 꼬리표, f 면색, s 테두리, c 글자색}]
  const ROWW = (items, o = {}) => { const fs = o.fs || 24, pad = o.pad ?? 14; return items.map(it => Math.max(tw(it.t, fs) + pad * 2, it.k ? tw(it.k, o.kfs || 20) + 6 : 0, o.minw || 0)); };
  const ROW = (items, y, o = {}) => {
    const fs = o.fs || 24, h = o.h || 52, gap = o.gap ?? 8, kfs = o.kfs || 20;
    const ws = ROWW(items, o), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
    let x = o.x ?? ((o.cx ?? 240) - tot / 2);
    return items.map((it, i) => {
      const w = ws[i], cx = x + w / 2; x += w + gap;
      return `<g class="${o.p || 'b'}${i}">${BOX(cx - w / 2, y, w, h, { f: it.f || LG, s: it.s, rx: 12 })}${T(cx, y + h / 2 + fs * .36, it.t, { ja: 1, fs, c: it.c || DG_C.ink })}${it.k ? T(cx, y + h + kfs + 6, it.k, { fs: kfs, c: it.kc || DG_C.sub }) : ''}${it.r ? T(cx, y - 10, it.r, { fs: 18, c: it.rc || DG_C.c, fw: 800 }) : ''}</g>`;
    }).join('');
  };
  // 동그라미 얼굴 + 몸 (top = 머리 위)
  const KID = (cx, top, col, fill, back) => `<path d="M${cx - 27} ${top + 94} Q${cx - 27} ${top + 52} ${cx} ${top + 52} Q${cx + 27} ${top + 52} ${cx + 27} ${top + 94} Z" fill="${fill}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="${cx}" cy="${top + 23}" r="22" fill="${back ? col : '#fff'}" stroke="${col}" stroke-width="3"/>${back ? '' : `<circle cx="${cx - 8}" cy="${top + 20}" r="2.8" fill="${DG_C.ink}"/><circle cx="${cx + 8}" cy="${top + 20}" r="2.8" fill="${DG_C.ink}"/><path d="M${cx - 7} ${top + 30} Q${cx} ${top + 36} ${cx + 7} ${top + 30}" fill="none" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linecap="round"/>`}`;
  const FACE = (cx, cy, r, col) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${col}" stroke-width="3"/><circle cx="${cx - r * .36}" cy="${cy - r * .12}" r="2.4" fill="${DG_C.ink}"/><circle cx="${cx + r * .36}" cy="${cy - r * .12}" r="2.4" fill="${DG_C.ink}"/><path d="M${cx - r * .3} ${cy + r * .3} Q${cx} ${cy + r * .58} ${cx + r * .3} ${cy + r * .3}" fill="none" stroke="${DG_C.ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  // 말풍선 (꼬리: tx 위치, dir 'd' 아래 / 'l' 왼쪽 / 'r' 오른쪽)
  const BUB = (x, y, w, h, o = {}) => {
    const f = o.f || '#fff', s = o.s || LN, tx = o.tx ?? x + 30;
    const tail = o.dir === 'l' ? `M${x + 2} ${y + h / 2 - 8} L${x - 12} ${y + h / 2 + 4} L${x + 2} ${y + h / 2 + 8}`
      : o.dir === 'r' ? `M${x + w - 2} ${y + h / 2 - 8} L${x + w + 12} ${y + h / 2 + 4} L${x + w - 2} ${y + h / 2 + 8}`
      : `M${tx - 9} ${y + h - 2} L${tx - 2} ${y + h + 13} L${tx + 9} ${y + h - 2}`;
    return `${BOX(x, y, w, h, { f, s, sw: 2.5, rx: h / 2 > 22 ? 22 : h / 2 })}<path d="${tail}" fill="${f}" stroke="${s}" stroke-width="2.5" stroke-linejoin="round"/>`;
  };
  // 차례로 나타나기: steps [[선택자, 시작ms, 길이ms, 아래에서 올라오는 거리]]
  const pop = (el, sel, e, t, d = 450, dy = 12) => { const f = dgEase(dgP(e, t, d)); el.querySelectorAll(sel).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', dy ? `translate(0,${((1 - f) * dy).toFixed(2)})` : ''); }); return f; };
  const SEQ = (el, total, steps, extra) => dgAnim(el, total, e => { steps.forEach(([s, t, d, dy]) => pop(el, s, e, t, d ?? 450, dy ?? 12)); if (extra) extra(e); });
  const vis = (el, sel, on) => el.querySelectorAll(sel).forEach(n => n.setAttribute('opacity', on ? 1 : 0));
  // ROW 에서 i 번째 블록의 가운데 x
  const ROWX = (items, o, i) => { const ws = ROWW(items, o), g = o.gap ?? 8, tot = ws.reduce((a, b) => a + b, 0) + g * (ws.length - 1); let x = o.x ?? ((o.cx ?? 240) - tot / 2); for (let k = 0; k < i; k++) x += ws[k] + g; return x + ws[i] / 2; };
  const CLOCK = (cx, cy, r, hi = []) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${DG_C.ink}" stroke-width="4"/>
    ${Array.from({ length: 12 }, (_, i) => { const n = i + 1, a = n * 30 * Math.PI / 180, x = +(cx + r * .78 * Math.sin(a)).toFixed(1), y = +(cy - r * .78 * Math.cos(a)).toFixed(1), h = hi.includes(n);
      return `${h ? `<circle class="hc${n}" cx="${x}" cy="${y}" r="16" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>` : ''}${T(x, y + 7, n, { fs: 19, fw: h ? 800 : 700, c: h ? DG_C.c : DG_C.sub })}`; }).join('')}`;
  const HANDS = (cx, cy, r) => `<line class="mh" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * .54}" stroke="${DG_C.ink}" stroke-width="4" stroke-linecap="round"/>
    <line class="hh" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * .48}" stroke="${DG_C.d}" stroke-width="7" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="${DG_C.ink}"/>`;
  const setHand = (el, sel, cx, cy, len, deg) => { const a = deg * Math.PI / 180, n = el.querySelector(sel); n.setAttribute('x2', (cx + len * Math.sin(a)).toFixed(1)); n.setAttribute('y2', (cy - len * Math.cos(a)).toFixed(1)); };
  const OJ = s => s.replace(/じ(?=$|は)/, `<tspan fill="${DG_C.c}">じ</tspan>`);
  /* 1 */
  const SP = [[4, 'よじ', 'yoji'], [7, 'しちじ', 'shichiji'], [9, 'くじ', 'kuji']];
  /* 2: 요일 */
  const WK = [['월', '月', 'げつ'], ['화', '火', 'か'], ['수', '水', 'すい'], ['목', '木', 'もく'], ['금', '金', 'きん'], ['토', '土', 'ど'], ['일', '日', 'にち']];
  /* 3 */
  const TD = [['木', 'もくようび', 'きのう', '어제'], ['金', 'きんようび', 'きょう', '오늘'], ['土', 'どようび', 'あした', '내일']];

  Object.assign(DIAG, {
    'j5-05:0': {
      alt: '시계 바늘이 1시를 가리키면 いち+じ = いちじ(1시), 3시를 가리키면 さん+じ = さんじ(3시)가 되고, 몇 시인지는 いま なんじですか(지금 몇 시예요?)라고 묻는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${CLOCK(120, 156, 100)}${HANDS(120, 156, 100)}
        <g class="r0">${T(262, 104, OJ('いちじ'), { ja: 1, a: 'start', fs: 30, fw: 800, c: DG_C.sub })}${T(462, 104, '1시', { a: 'end', fs: 22, c: DG_C.sub })}</g>
        <g class="r1">${T(262, 176, OJ('さんじ'), { ja: 1, a: 'start', fs: 30, fw: 800 })}${T(462, 176, '3시', { a: 'end', fs: 22, fw: 800 })}</g>
        <g class="r2">${T(262, 250, 'いま なんじですか。', { ja: 1, a: 'start', fs: 20, fw: 800, c: DG_C.d })}${T(262, 278, '지금 몇 시예요?', { a: 'start', fs: 18, c: DG_C.sub })}</g>
      </svg>`,
      play(el) {
        SEQ(el, 5200, [['.r0', 1300], ['.r1', 3300], ['.r2', 4300]], e => {
          const d = 30 * dgEase(dgP(e, 300, 900)) + 60 * dgEase(dgP(e, 2200, 1000));
          setHand(el, '.hh', 120, 156, 48, d);
        });
      }
    },

    'j5-05:1': {
      alt: '특별하게 읽는 시간 4시 よじ, 7시 しちじ, 9시 くじ를 시계 숫자에 표시하고, 시계가 7시 반을 가리키면 しちじ+はん(30분) = しちじはん이 되는 그림',
      svg: `<svg viewBox="0 0 480 304" class="dg-svg" role="img">
        ${CLOCK(116, 160, 100, [4, 7, 9])}${HANDS(116, 160, 100)}
        ${SP.map(([n, k, r], i) => { const y = 78 + i * 52; return `<g class="s${i}">${T(246, y, n + '시', { a: 'start', fs: 20, c: DG_C.sub })}${T(300, y, k, { ja: 1, a: 'start', fs: 26, fw: 800, c: DG_C.c })}${T(470, y, r, { a: 'end', fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <g class="h"><line x1="246" y1="214" x2="470" y2="214" stroke="#e5e5ea" stroke-width="2"/>
          ${T(246, 252, '7시 반', { a: 'start', fs: 20, c: DG_C.sub })}${T(318, 252, `しちじ<tspan fill="${DG_C.r}">はん</tspan>`, { ja: 1, a: 'start', fs: 26, fw: 800 })}
          ${T(318, 284, 'はん = 30분(반)', { ja: 1, a: 'start', fs: 18, c: DG_C.r })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          SP.forEach(([n], i) => { const t = 300 + i * 1000; pop(el, '.s' + i, e, t, 450, 10); const f = dgEase(dgP(e, t, 450)); q('.hc' + n).setAttribute('opacity', f); });
          const m = dgEase(dgP(e, 3400, 1500));
          setHand(el, '.hh', 116, 160, 48, 225 * m);
          setHand(el, ".mh", 116, 160, 54, 180 * m);
          pop(el, '.h', e, 5000, 500, 10);
        });
      }
    },

    'j5-05:2': {
      alt: '월요일부터 일요일까지 요일 한자 月(げつ) 火(か) 水(すい) 木(もく) 金(きん) 土(ど) 日(にち)를 한 줄로 놓고, 뒤에 ようび를 붙이면 げつようび(월요일)처럼 요일 이름이 되는 그림',
      svg: `<svg viewBox="0 0 480 296" class="dg-svg" role="img">
        ${WK.map(([k, h, r], i) => { const x = 11 + i * 66, c = i === 5 ? DG_C.d : i === 6 ? RED : DG_C.ink; return `<g class="d${i}">
          ${BOX(x, 46, 62, 132, { f: i === 0 ? DG_C.b : LG, rx: 12 })}
          ${T(x + 31, 74, k, { fs: 18, c: DG_C.sub })}${T(x + 31, 126, h, { ja: 1, fs: 36, fw: 600, c })}${T(x + 31, 162, r, { ja: 1, fs: 18, c: DG_C.d })}</g>`; }).join('')}
        <g class="ex">
          ${BOX(20, 214, 74, 52, { f: DG_C.b })}${T(57, 248, 'げつ', { ja: 1, fs: 24, c: DG_C.d })}
          ${T(110, 248, '+', { fs: 24, c: DG_C.sub })}
          ${BOX(126, 214, 100, 52, { f: DG_C.a, s: DG_C.c })}${T(176, 248, 'ようび', { ja: 1, fs: 24, c: DG_C.c })}
          ${ARR(238, 240, 262, 240, DG_C.sub, 3)}
          ${T(272, 250, `げつ<tspan fill="${DG_C.c}">ようび</tspan>`, { ja: 1, a: 'start', fs: 24, fw: 800 })}${T(272, 284, '월요일', { a: 'start', fs: 18, c: DG_C.sub })}</g>
      </svg>`,
      play(el) { SEQ(el, 4800, [...WK.map((w, i) => ['.d' + i, 200 + i * 350, 400, 12]), ['.ex', 3000, 500, 12]]); }
    },

    'j5-05:3': {
      alt: '오늘이 금요일(きんようび)일 때 어제는 きのう 목요일(もくようび), 오늘은 きょう, 내일은 あした 토요일(どようび)이고, 오늘은 금요일이에요는 きょうは きんようびです라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${ARR(20, 186, 462, 186, LN, 3)}
        ${TD.map(([h, r, w, k], i) => { const x = 100 + i * 140, now = i === 1; return `<g class="t${i}">
          ${BOX(x - 60, 46, 120, 114, { f: now ? DG_C.a : LG, s: now ? DG_C.c : null, sw: 3, rx: 16 })}
          ${T(x, 104, h, { ja: 1, fs: 40, fw: 600, c: now ? DG_C.c : DG_C.ink })}${T(x, 140, r, { ja: 1, fs: 18, c: now ? DG_C.c : DG_C.sub })}
          <circle cx="${x}" cy="186" r="${now ? 8 : 6}" fill="${now ? DG_C.c : DG_C.sub}"/>
          ${T(x, 222, w, { ja: 1, fs: 24, fw: 800, c: now ? DG_C.c : DG_C.ink })}${T(x, 248, k, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        ${T(240, 288, `きょうは <tspan fill="${DG_C.c}">きんようび</tspan>です。`, { ja: 1, fs: 22, fw: 800, cls: 's' })}
      </svg>`,
      play(el) { SEQ(el, 4400, [['.t1', 200], ['.t0', 1100], ['.t2', 1900], ['.s', 3000]]); }
    },
  });
})();
