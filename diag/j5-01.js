/* 5학년 일본어 · 일본어로 내 이름을 어떻게 소개할까? (j5-01) */
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
  /* 0: 글자 세 가지 */
  const SC = [
    { n: '히라가나', s: 'あいう', d: '기본 글자', col: DG_C.ink, f: LG },
    { n: '가타카나', s: 'アイウ', d: '외국에서 온 말', col: DG_C.d, f: DG_C.b },
    { n: '한자', s: '日本', d: 'にほん 일본', col: DG_C.c, f: DG_C.a },
  ];
  /* 1: 소리 조각 */
  const GR = [
    { k: ['は', 'じ', 'め', 'ま', 'し', 'て'], r: ['ha', 'ji', 'me', 'ma', 'shi', 'te'], m: '처음 뵙겠습니다' },
    { k: ['こ', 'ん', 'に', 'ち', 'は'], r: ['ko', 'n', 'ni', 'chi', 'wa'], m: '안녕하세요(낮 인사)', hi: 4 },
  ];
  /* 2: 블록 */
  const W2 = [{ t: 'わたし', k: '저' }, { t: 'は', k: '는', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c }, { t: 'ミナ', k: '미나', f: DG_C.b, c: DG_C.d }, { t: 'です。', k: '예요' }];
  const O2 = { fs: 28, h: 60, gap: 10, minw: 72 };
  const tagX = (i = 1) => { const ws = ROWW(W2, O2), tot = ws.reduce((a, b) => a + b, 0) + 10 * (ws.length - 1); let x = 240 - tot / 2; for (let k = 0; k < i; k++) x += ws[k] + 10; return x + ws[i] / 2; };
  /* 4: 자기소개 순서 */
  const INTRO = [['はじめまして。', '처음 뵙겠습니다'], ['わたしは ミナです。', '저는 미나예요'], ['かんこくじんです。', '한국 사람이에요'], ['よろしくおねがいします。', '잘 부탁합니다']];

  Object.assign(DIAG, {
    'j5-01:0': {
      alt: '일본어 글자 세 가지: 기본 글자 히라가나(あいう), 외국에서 온 말을 쓰는 가타카나(アイウ), 한자(日本, にほん 일본). 히라가나와 가타카나는 소리가 똑같아요',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        ${SC.map((c, i) => { const x = 18 + i * 152, cx = x + 70; return `<g class="c${i}">
          ${BOX(x, 46, 140, 168, { f: '#fff', s: i ? c.col : LN, sw: 2.5, rx: 18 })}
          ${T(cx, 80, c.n, { fs: 20, fw: 800, c: c.col })}
          ${BOX(x + 14, 96, 112, 64, { f: c.f, rx: 12 })}${T(cx, 141, c.s, { ja: 1, fs: 36, fw: 700, c: i ? c.col : DG_C.ink })}
          ${T(cx, 196, c.d, { ja: i === 2, fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <g class="br"><path d="M40 232 V246 H272 V232" fill="none" stroke="${DG_C.r}" stroke-width="3" stroke-linejoin="round"/>
          ${T(156, 276, 'あ = ア = 아', { ja: 1, fs: 22, fw: 800, c: DG_C.r })}</g>
        ${T(156, 304, '소리는 똑같아요', { fs: 18, c: DG_C.r, cls: 'br2' })}
      </svg>`,
      play(el) { SEQ(el, 4200, [['.c0', 200], ['.c1', 900], ['.c2', 1600], ['.br', 2600], ['.br2', 3100]]); }
    },

    'j5-01:1': {
      alt: 'はじめまして를 글자마다 ha ji me ma shi te로 읽고, こんにちは는 ko n ni chi wa로 읽어 마지막 は를 와(wa)로 읽는다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 312" class="dg-svg" role="img">
        ${GR.map((g, r) => { const y = 44 + r * 140, n = g.k.length, x0 = r ? 30 : 240 - (n * 62 - 8) / 2; return `
          ${g.k.map((ch, i) => { const hi = g.hi === i, x = x0 + i * 62; return `<g class="t${r}_${i}">${BOX(x, y, 54, 54, { f: hi ? DG_C.a : LG, s: hi ? DG_C.c : null, rx: 12 })}${T(x + 27, y + 38, ch, { ja: 1, fs: 30, fw: 700, c: hi ? DG_C.c : DG_C.ink })}
            ${T(x + 27, y + 80, g.r[i], { fs: 20, fw: 800, c: hi ? DG_C.c : DG_C.d })}</g>`; }).join('')}
          ${T(r ? 179 : 240, y + 112, g.m, { fs: 18, c: DG_C.sub, cls: 'm' + r })}`; }).join('')}
        <g class="wa">${ARR(370, 211, 346, 211, DG_C.c, 3)}${T(380, 218, '와로 읽어요!', { a: 'start', fs: 18, fw: 800, c: DG_C.c })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5600, e => {
          GR.forEach((g, r) => {
            g.k.forEach((ch, i) => pop(el, `.t${r}_${i}`, e, 200 + r * 2400 + i * 300, 350, 10));
            pop(el, '.m' + r, e, 200 + r * 2400 + g.k.length * 300 + 200, 400, 0);
          });
          pop(el, '.wa', e, 4600, 400, 8);
        });
      }
    },

    'j5-01:2': {
      alt: 'わたしは ミナです를 わたし(저) は(는) ミナ(미나) です(예요) 블록으로 나누고, 여기서 は는 하가 아니라 와(wa)로 읽으며 이름 ミナ는 가타카나로 쓴다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${ROW(W2, 96, O2)}
        <g class="tag">${T(tagX(), 74, 'wa 와', { fs: 22, fw: 800, c: DG_C.c })}</g>
        <g class="kt">${T(tagX(2), 74, '가타카나', { fs: 18, c: DG_C.d })}</g>
        ${T(240, 230, '저는 미나예요.', { fs: 22, fw: 800, cls: 'mean' })}
      </svg>`,
      play(el) { SEQ(el, 4600, [['.b0', 200], ['.b1', 700], ['.b2', 1200], ['.b3', 1700], ['.tag', 2500, 450, 10], ['.kt', 3100], ['.mean', 3700]]); }
    },

    'j5-01:3': {
      alt: '나라 이름 かんこく(한국)에 じん(사람)을 붙이면 かんこくじん(한국 사람), にほん(일본)에 じん을 붙이면 にほんじん(일본 사람)이 되는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${[['かんこく', '한국', 'かんこくじん', '한국 사람'], ['にほん', '일본', 'にほんじん', '일본 사람']].map(([a, ak, r, rk], i) => { const y = 48 + i * 112; const wa = tw(a, 24) + 24, x0 = 14; return `
          <g class="n${i}">${BOX(x0, y, wa, 52, {})}${T(x0 + wa / 2, y + 35, a, { ja: 1, fs: 24 })}${T(x0 + wa / 2, y + 80, ak, { fs: 18, c: DG_C.sub })}</g>
          ${T(x0 + wa + 16, y + 34, '+', { fs: 24, c: DG_C.sub, cls: 'pl' + i })}
          <g class="j${i}">${BOX(x0 + wa + 32, y, 68, 52, { f: GF, s: DG_C.r })}${T(x0 + wa + 66, y + 35, 'じん', { ja: 1, fs: 24, c: DG_C.r })}${T(x0 + wa + 66, y + 80, '사람', { fs: 18, c: DG_C.r })}</g>
          <g class="r${i}">${ARR(x0 + wa + 112, y + 26, x0 + wa + 140, y + 26, DG_C.sub, 3)}
          ${T(470, y + 36, r.replace('じん', `<tspan fill="${DG_C.r}">じん</tspan>`), { ja: 1, fs: 26, fw: 800, a: 'end' })}${T(470, y + 80, rk, { fs: 18, c: DG_C.ink, a: 'end' })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4800, [['.n0', 200], ['.pl0', 600], ['.j0', 900, 500, -16], ['.r0', 1600], ['.n1', 2500], ['.pl1', 2900], ['.j1', 3200, 500, -16], ['.r1', 3900]]); }
    },

    'j5-01:4': {
      alt: '자기소개 순서: ① はじめまして(처음 뵙겠습니다) ② わたしは ミナです(저는 미나예요) ③ かんこくじんです(한국 사람이에요) ④ よろしくおねがいします(잘 부탁합니다)',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        <line class="ln" x1="34" y1="70" x2="34" y2="70" stroke="${LN}" stroke-width="4" stroke-linecap="round"/>
        ${INTRO.map(([j, k], i) => { const y = 44 + i * 70; return `<g class="s${i}">
          <circle cx="34" cy="${y + 26}" r="18" fill="${i === 3 ? DG_C.c : DG_C.d}"/>${T(34, y + 33, i + 1, { fs: 20, fw: 800, c: '#fff' })}
          ${T(66, y + 24, j, { ja: 1, a: 'start', fs: 22, fw: 800, c: i === 3 ? DG_C.c : DG_C.ink })}
          ${T(66, y + 52, k, { a: 'start', fs: 18, c: DG_C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        SEQ(el, 4600, INTRO.map((x, i) => ['.s' + i, 200 + i * 1000, 500, 10]), e => q('.ln').setAttribute('y2', 70 + 210 * dgEase(dgP(e, 200, 3200))));
      }
    },
  });
})();
