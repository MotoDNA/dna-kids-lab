/* 5학년 일본어 · 일본어로 몇 살인지 어떻게 묻고 답할까? (j5-03) */
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
  const NUM = ['いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう', 'じゅう'];
  /* 2: 작은 っ */
  const SM = [
    { n: '1살', p: [['い'], ['ち', 'っ'], ['さ'], ['い']], rd: '잇사이', ro: 'issai' },
    { n: '8살', p: [['は'], ['ち', 'っ'], ['さ'], ['い']], rd: '핫사이', ro: 'hassai' },
    { n: '10살', p: [['じゅ'], ['う', 'っ'], ['さ'], ['い']], rd: '줏사이', ro: 'jussai' },
    { n: '11살', p: [['じゅう'], ['い'], ['ち', 'っ'], ['さ'], ['い']], rd: '주-잇사이', ro: 'juuissai' },
  ];
  const tl = s => Math.max(44, tw(s, 24) + 16);
  // 블록 + 블록 → 결과 (j5-03:1)
  const PLUS = (y, a, ak, b, bk, r, rk, cls) => { const wa = tw(a, 24) + 28, wb = tw(b, 24) + 28, x0 = 20; return `
    <g class="${cls}a">${BOX(x0, y, wa, 52, {})}${T(x0 + wa / 2, y + 35, a, { ja: 1, fs: 24 })}${T(x0 + wa / 2, y + 80, ak, { fs: 18, c: DG_C.sub })}</g>
    <g class="${cls}b">${T(x0 + wa + 16, y + 34, '+', { fs: 24, c: DG_C.sub })}${BOX(x0 + wa + 32, y, wb, 52, { f: DG_C.b, s: DG_C.d })}${T(x0 + wa + 32 + wb / 2, y + 35, b, { ja: 1, fs: 24, c: DG_C.d })}${T(x0 + wa + 32 + wb / 2, y + 80, bk, { fs: 18, c: DG_C.d })}</g>
    <g class="${cls}r">${ARR(x0 + wa + wb + 46, y + 26, x0 + wa + wb + 76, y + 26, DG_C.sub, 3)}${T(466, y + 36, r, { ja: 1, fs: 26, fw: 800, a: 'end' })}${T(466, y + 80, rk, { fs: 18, a: 'end' })}</g>`; };

  Object.assign(DIAG, {
    'j5-03:0': {
      alt: '일본어 숫자 1부터 10까지: 1 いち, 2 に, 3 さん, 4 よん, 5 ご, 6 ろく, 7 なな, 8 はち, 9 きゅう, 10 じゅう. 11은 じゅう+いち, 12는 じゅう+に',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${NUM.map((k, i) => { const x = 14 + (i % 5) * 92, y = 44 + Math.floor(i / 5) * 102; return `<g class="n${i}">
          ${BOX(x, y, 84, 92, { f: i === 9 ? DG_C.b : LG, rx: 14 })}${T(x + 42, y + 42, i + 1, { fs: 30, fw: 800, c: DG_C.d })}${T(x + 42, y + 76, k, { ja: 1, fs: 20, fw: 700 })}</g>`; }).join('')}
        <g class="e0">${T(124, 292, `11 = <tspan fill="${DG_C.d}">じゅう</tspan> + いち`, { ja: 1, fs: 22, fw: 800 })}</g>
        <g class="e1">${T(356, 292, `12 = <tspan fill="${DG_C.d}">じゅう</tspan> + に`, { ja: 1, fs: 22, fw: 800 })}</g>
      </svg>`,
      play(el) { SEQ(el, 5400, [...NUM.map((k, i) => ['.n' + i, 200 + i * 330, 380, 12]), ['.e0', 3900], ['.e1', 4600]]); }
    },

    'j5-03:1': {
      alt: 'なん(몇)과 さい(살)를 합치면 なんさい(몇 살), 그 뒤에 です와 か를 붙이면 なんさいですか(몇 살이에요?)라는 질문이 되는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${PLUS(50, 'なん', '몇', 'さい', '살', 'なんさい', '몇 살', 'p')}
        <line x1="20" y1="158" x2="460" y2="158" stroke="#e5e5ea" stroke-width="2"/>
        ${ROW([{ t: 'なんさい', k: '몇 살', f: DG_C.b, c: DG_C.d }, { t: 'です', k: '이에요' }, { t: 'か。', k: '?', f: '#efdcf7', s: PUR, c: PUR, kc: PUR }], 178, { minw: 64 })}
      </svg>`,
      play(el) { SEQ(el, 4600, [['.pa', 200], ['.pb', 800, 500, -16], ['.pr', 1600], ['.b0', 2600], ['.b1', 3100], ['.b2', 3600]]); }
    },

    'j5-03:2': {
      alt: '1살 いちさい가 아니라 いっさい(잇사이), 8살 はっさい(핫사이), 10살 じゅっさい(줏사이), 11살 じゅういっさい(주-잇사이)처럼 숫자 끝소리가 작은 っ로 바뀌는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">
        ${SM.map((r, i) => { const y = 50 + i * 74; let x = 74; return `<g class="r${i}">
          ${T(14, y + 34, r.n, { a: 'start', fs: 20, fw: 800, c: DG_C.sub })}
          ${r.p.map(([a, b], j) => { const w = tl(a), cx = x + w / 2; x += w + 6; return b ? `
            <g class="c${i}">${T(cx, y - 7, `${a}→${b}`, { ja: 1, fs: 18, c: DG_C.c })}</g>
            ${BOX(cx - w / 2, y, w, 48, { f: DG_C.a, s: DG_C.c, rx: 10 })}
            <g class="o${i}">${T(cx, y + 34, a, { ja: 1, fs: 24, c: DG_C.sub })}</g>
            <g class="s${i}">${T(cx, y + 34, b, { ja: 1, fs: 24, fw: 800, c: DG_C.c })}</g>`
            : `${BOX(cx - w / 2, y, w, 48, { rx: 10 })}${T(cx, y + 34, a, { ja: 1, fs: 24 })}`; }).join('')}
          <g class="rd${i}">${T(470, y + 22, r.rd, { a: 'end', fs: 20, fw: 800, c: DG_C.d })}${T(470, y + 46, r.ro, { a: 'end', fs: 18, c: DG_C.sub })}</g></g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 6800, e => {
          SM.forEach((r, i) => {
            const st = 200 + i * 1550;
            pop(el, '.r' + i, e, st, 400, 10);
            const f = dgEase(dgP(e, st + 600, 500));
            el.querySelectorAll('.o' + i).forEach(n => { n.setAttribute('opacity', 1 - f); n.setAttribute('transform', `translate(0,${12 * f})`); });
            pop(el, '.s' + i, e, st + 800, 450, -12);
            pop(el, '.c' + i, e, st + 800, 400, 0);
            pop(el, '.rd' + i, e, st + 1100, 400, 0);
          });
        });
      }
    },

    'j5-03:3': {
      alt: 'なんさいですか(몇 살이에요?)에 じゅうに さい です(12살이에요)로 대답하고, 학년은 숫자 뒤에 ねんせい를 붙여 ろく ねんせい です(6학년이에요), ごねんせい(5학년)라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">
        <g class="q">${BUB(16, 26, 196, 44, { tx: 50, s: PUR })}${T(114, 55, 'なんさいですか。', { ja: 1, fs: 20, fw: 800, c: PUR })}</g>
        ${ROW([{ t: 'じゅうに', k: '12' }, { t: 'さい', k: '살', f: DG_C.b, c: DG_C.d, kc: DG_C.d }, { t: 'です。', k: '이에요' }], 90, { x: 20, p: 'a' })}
        ${ROW([{ t: 'ろく', k: '6' }, { t: 'ねんせい', k: '학년', f: GF, c: DG_C.r, kc: DG_C.r }, { t: 'です。', k: '이에요' }], 196, { x: 20, p: 'c' })}
        <g class="m0">${T(466, 124, '12살이에요.', { a: 'end', fs: 20, fw: 800 })}</g>
        <g class="m1">${T(466, 230, '6학년이에요.', { a: 'end', fs: 20, fw: 800 })}</g>
        <g class="g5">${T(240, 318, `5학년은 ご<tspan fill="${DG_C.r}">ねんせい</tspan>`, { ja: 1, fs: 20, fw: 700 })}</g>
      </svg>`,
      play(el) { SEQ(el, 5400, [['.q', 200], ['.a0', 1000], ['.a1', 1350], ['.a2', 1700], ['.m0', 2200], ['.c0', 2900], ['.c1', 3250], ['.c2', 3600], ['.m1', 4100], ['.g5', 4700]]); }
    },
  });
})();
