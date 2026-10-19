/* 4학년 일본어 · 엄마, 아빠, 연필, 가방은 일본어로 뭐라고 할까? (j3-09) */
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
  /* 0: 가족 */
  const FAM = [
    [{ t: 'おとうさん', k: '아빠', col: DG_C.d, f: DG_C.b }, { t: 'おかあさん', k: '엄마', col: DG_C.c, f: DG_C.a }],
    [{ t: 'おにいさん', k: '형·오빠', col: DG_C.d, f: DG_C.b }, { t: 'おねえさん', k: '누나·언니', col: DG_C.c, f: DG_C.a }],
    [{ t: 'わたし', k: '나', col: DG_C.r, f: GF }],
    [{ t: 'おとうと', k: '남동생', col: DG_C.d, f: DG_C.b }, { t: 'いもうと', k: '여동생', col: DG_C.c, f: DG_C.a }],
  ];
  const famCard = (x, y, m, sc) => `<g>${BOX(x, y, 200, 62, { f: '#fff', s: m.col, sw: 2.5, rx: 16 })}
    <circle cx="${x + 32}" cy="${y + 31}" r="${18 * sc}" fill="${m.f}" stroke="${m.col}" stroke-width="3"/>
    <circle cx="${x + 32 - 6 * sc}" cy="${y + 29}" r="2.2" fill="${DG_C.ink}"/><circle cx="${x + 32 + 6 * sc}" cy="${y + 29}" r="2.2" fill="${DG_C.ink}"/>
    ${T(x + 62, y + 30, m.t, { ja: 1, a: 'start', fs: 22, fw: 800 })}${T(x + 62, y + 54, m.k, { a: 'start', fs: 18, c: DG_C.sub })}</g>`;

  /* 1: 긴소리 */
  const LONG = [
    { l: ['お', 'ば', 'あ', 'さ', 'ん'], s: ['お', 'ば', 'さ', 'ん'], x: 2, lr: '오바-상', lm: '할머니', sr: '오바상', sm: '아주머니' },
    { l: ['お', 'じ', 'い', 'さ', 'ん'], s: ['お', 'じ', 'さ', 'ん'], x: 2, lr: '오지-상', lm: '할아버지', sr: '오지상', sm: '아저씨' },
  ];
  const TL = 46, TG = 4;
  const tile = (x, y, ch, hi) => `${BOX(x, y, TL, TL, { f: hi ? DG_C.a : LG, s: hi ? DG_C.c : null, rx: 10 })}${T(x + TL / 2, y + 33, ch, { ja: 1, fs: 26, c: hi ? DG_C.c : DG_C.ink, fw: 800 })}`;

  /* 2: 책상 위 물건 아이콘 (0,0 중심) */
  const OBJ = [
    { t: 'ほん', r: 'hon', k: '책', g: `<path d="M0 -26 Q-22 -34 -44 -26 L-44 28 Q-22 20 0 28 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 -26 Q22 -34 44 -26 L44 28 Q22 20 0 28 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><path d="M-34 -12 Q-20 -16 -8 -12 M-34 0 Q-20 -4 -8 0 M8 -12 Q20 -16 34 -12 M8 0 Q20 -4 34 0" fill="none" stroke="${DG_C.d}" stroke-width="2.5" stroke-linecap="round"/>` },
    { t: 'えんぴつ', r: 'enpitsu', k: '연필', g: `<g transform="rotate(-35)"><rect x="-40" y="-9" width="62" height="18" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5" stroke-linejoin="round"/><rect x="-50" y="-9" width="10" height="18" rx="3" fill="#ffb3ad" stroke="${RED}" stroke-width="3"/><path d="M22 -9 L44 0 L22 9 Z" fill="#fff" stroke="${DG_C.c}" stroke-width="3.5" stroke-linejoin="round"/><path d="M37 -3 L44 0 L37 3 Z" fill="${DG_C.ink}"/></g>` },
    { t: 'かばん', r: 'kaban', k: '가방', g: `<path d="M-16 -22 Q-16 -36 0 -36 Q16 -36 16 -22" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round"/><rect x="-38" y="-24" width="76" height="56" rx="14" fill="${GF}" stroke="${DG_C.r}" stroke-width="3.5"/><path d="M-38 -4 H38" stroke="${DG_C.r}" stroke-width="3"/><rect x="-8" y="-9" width="16" height="12" rx="3" fill="#fff" stroke="${DG_C.r}" stroke-width="3"/>` },
    { t: 'とけい', r: 'tokei', k: '시계', g: `<path d="M-22 26 L-28 36 M22 26 L28 36" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/><circle r="34" fill="#fff" stroke="${DG_C.sub}" stroke-width="4"/><path d="M0 0 V-22 M0 0 L15 8" stroke="${DG_C.ink}" stroke-width="4" stroke-linecap="round"/><circle r="3.5" fill="${DG_C.ink}"/>` },
  ];

  Object.assign(DIAG, {
    'j3-09:0': {
      alt: '가족 부르는 말: 위 줄에 おとうさん(아빠)과 おかあさん(엄마), 다음 줄에 おにいさん(형·오빠)과 おねえさん(누나·언니), 가운데 わたし(나), 아래 줄에 おとうと(남동생)와 いもうと(여동생)를 나이 순서로 놓은 그림',
      svg: `<svg viewBox="0 0 480 344" class="dg-svg" role="img">
        ${T(30, 30, 'かぞく', { ja: 1, a: 'start', fs: 24, fw: 800, c: DG_C.ink })}${T(118, 30, '가족', { a: 'start', fs: 20, c: DG_C.sub })}
        ${FAM.map((row, r) => `<g class="fr${r}">${row.length === 1 ? famCard(140, 46 + r * 74, row[0], 1) : row.map((m, j) => famCard(30 + j * 220, 46 + r * 74, m, r ? .85 : 1)).join('')}</g>`).join('')}
      </svg>`,
      play(el) { SEQ(el, 4200, [0, 1, 2, 3].map(r => ['.fr' + r, 300 + r * 900, 500, 14])); }
    },

    'j3-09:1': {
      alt: 'おばあさん(오바-상, 할머니)과 おばさん(오바상, 아주머니), おじいさん(오지-상, 할아버지)과 おじさん(오지상, 아저씨)을 비교해, 긴소리를 만드는 あ와 い 한 글자가 빠지면 뜻이 달라지는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 312" class="dg-svg" role="img">
        ${LONG.map((w, g) => { const y0 = 40 + g * 144; return `<g>
          <g class="sh${g}">${w.s.map((ch, i) => tile(16 + i * (TL + TG), y0 + 58, ch)).join('')}
            ${T(318, y0 + 90, w.sr, { fs: 20, c: DG_C.d, fw: 800 })}${T(420, y0 + 90, w.sm, { fs: 20 })}</g>
          <g class="lg${g}">
            ${w.l.map((ch, i) => i === w.x ? '' : `<g class="lt${g}_${i}">${tile(16 + i * (TL + TG), y0, ch)}</g>`).join('')}
            <g class="ex${g}">${tile(16 + w.x * (TL + TG), y0, w.l[w.x], 1)}</g>
            <g class="lm${g}">${T(318, y0 + 32, w.lr, { fs: 20, c: DG_C.d, fw: 800 })}${T(420, y0 + 32, w.lm, { fs: 20 })}</g>
          </g></g>`; }).join('')}
        <line x1="16" y1="170" x2="464" y2="170" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          LONG.forEach((w, g) => {
            const st = 200 + g * 2900;
            pop(el, '.sh' + g, e, st, 500, 10);
            // 짧은 낱말 → 긴 낱말: 뒤 글자가 비켜나고 あ/い가 위에서 내려옴
            const a = dgEase(dgP(e, st + 800, 600)), b = dgEase(dgP(e, st + 1300, 600));
            q('.lg' + g).setAttribute('opacity', a);
            w.l.forEach((ch, i) => { if (i > w.x) q(`.lt${g}_${i}`).setAttribute('transform', `translate(${-(TL + TG) * (1 - b)},0)`); });
            q('.ex' + g).setAttribute('opacity', b);
            q('.ex' + g).setAttribute('transform', `translate(0,${-24 * (1 - b)})`);
            q('.lm' + g).setAttribute('opacity', dgP(e, st + 1900, 400));
          });
        });
      }
    },

    'j3-09:2': {
      alt: '책상 위 물건과 일본어 이름: 책 ほん(hon), 연필 えんぴつ(enpitsu), 가방 かばん(kaban), 시계 とけい(tokei)',
      svg: `<svg viewBox="0 0 480 266" class="dg-svg" role="img">
        ${OBJ.map((o, i) => { const x = 60 + i * 120; return `<g class="o${i}">
          <g transform="translate(${x},92)">${o.g}</g>
          ${T(x, 176, o.t, { ja: 1, fs: 24, fw: 800 })}${T(x, 204, o.r, { fs: 18, c: DG_C.d })}${T(x, 238, o.k, { fs: 20, c: DG_C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4000, OBJ.map((o, i) => ['.o' + i, 200 + i * 850, 550, 16])); }
    },

    'j3-09:3': {
      alt: 'これは ほんです(이것은 책이에요)와 これは わたしの かばんです(이것은 내 가방이에요)를 낱말 블록으로 나누어, わたしの가 나의(내)라는 뜻임을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${ROW([{ t: 'これは', k: '이것은' }, { t: 'ほん', k: '책', f: DG_C.b }, { t: 'です。', k: '이에요' }], 50, { p: 'a' })}
        <line x1="20" y1="158" x2="460" y2="158" stroke="#e5e5ea" stroke-width="2"/>
        ${ROW([{ t: 'これは', k: '이것은' }, { t: 'わたしの', k: '나의(내)', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c, r: 'の = ~의' }, { t: 'かばん', k: '가방', f: DG_C.b }, { t: 'です。', k: '이에요' }], 196, { p: 'b' })}
      </svg>`,
      play(el) { SEQ(el, 4800, [...[0, 1, 2].map(i => ['.a' + i, 200 + i * 500]), ['.b0', 2000], ['.b2', 2500], ['.b3', 3000], ['.b1', 3700, 500, -20]]); }
    },
  });
})();
