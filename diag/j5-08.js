/* 6학년 일본어 · '화장실이 어디예요?'는 일본어로 어떻게 물을까? (j5-08) */
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
  const PIN = (cx, cy, col, f) => `<path d="M${cx} ${cy} C${cx - 6} ${cy - 10} ${cx - 14} ${cy - 16} ${cx - 14} ${cy - 26} A14 14 0 1 1 ${cx + 14} ${cy - 26} C${cx + 14} ${cy - 16} ${cx + 6} ${cy - 10} ${cx} ${cy} Z" fill="${f}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy - 26}" r="5" fill="#fff" stroke="${col}" stroke-width="2.5"/>`;
  /* 2 */
  const BY = [
    { k: ['び', 'ょ', 'う', 'い', 'ん'], rd: '뵤-인', m: '병원', col: DG_C.d },
    { k: ['び', 'よ', 'う', 'い', 'ん'], rd: '비요-인', m: '미용실', col: DG_C.c },
  ];
  /* 3: 위치 */
  const POS = [['うえ', '위'], ['した', '아래'], ['なか', '안'], ['となり', '옆']];
  const CAT = (cx, cy) => `<path d="M${cx - 12} ${cy - 6} L${cx - 10} ${cy - 20} L${cx - 2} ${cy - 11} Z M${cx + 12} ${cy - 6} L${cx + 10} ${cy - 20} L${cx + 2} ${cy - 11} Z" fill="${DG_C.c}" stroke="${DG_C.c}" stroke-width="2" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="13" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/><circle cx="${cx - 5}" cy="${cy - 2}" r="2" fill="${DG_C.ink}"/><circle cx="${cx + 5}" cy="${cy - 2}" r="2" fill="${DG_C.ink}"/>`;
  const DESK = (x) => `<rect x="${x - 34}" y="104" width="68" height="50" rx="4" fill="#fff" fill-opacity=".6" stroke="${DG_C.sub}" stroke-width="3.5"/><path d="M${x - 30} 154 V190 M${x + 30} 154 V190" stroke="${DG_C.sub}" stroke-width="5" stroke-linecap="round"/>`;
  const PC = [[0, 0, 86], [0, 0, 176], [0, 0, 132], [-14, 50, 176]]; // [책상 이동, 고양이 x, 고양이 y]

  Object.assign(DIAG, {
    'j5-08:0': {
      alt: '내가 있는 곳은 ここ(여기), 친구가 있는 곳은 そこ(거기), 둘 다에게서 먼 곳은 あそこ(저기, あこ가 아님), 어디인지 물을 때는 どこ(어디)라고 하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">
        <line x1="10" y1="246" x2="470" y2="246" stroke="#e5e5ea" stroke-width="3"/>
        <ellipse class="z0" cx="112" cy="234" rx="84" ry="30" fill="${DG_C.b}" fill-opacity=".35" stroke="${DG_C.d}" stroke-width="2" stroke-dasharray="6 6"/>
        <ellipse class="z1" cx="368" cy="234" rx="84" ry="30" fill="${DG_C.a}" fill-opacity=".35" stroke="${DG_C.c}" stroke-width="2" stroke-dasharray="6 6"/>
        ${KID(64, 150, DG_C.d, DG_C.b)}${KID(416, 150, DG_C.c, DG_C.a)}
        ${T(64, 290, '나', { fs: 18, c: DG_C.d })}${T(416, 290, '친구', { fs: 18, c: DG_C.c })}
        <g class="o0">${PIN(146, 244, DG_C.d, DG_C.b)}${T(146, 196, 'ここ', { ja: 1, fs: 26, fw: 800, c: DG_C.d })}${T(146, 290, '여기', { fs: 18, c: DG_C.d })}</g>
        <g class="o1">${PIN(334, 244, DG_C.c, DG_C.a)}${T(334, 196, 'そこ', { ja: 1, fs: 26, fw: 800, c: DG_C.c })}${T(334, 290, '거기', { fs: 18, c: DG_C.c })}</g>
        <g class="o2"><path d="M170 120 L310 120" stroke="#e5e5ea" stroke-width="3"/>${PIN(240, 118, DG_C.r, GF)}
          ${T(240, 66, 'あそこ', { ja: 1, fs: 26, fw: 800, c: DG_C.r })}${T(240, 146, '저기 (멀리)', { fs: 18, c: DG_C.r })}</g>
        <g class="no">${T(318, 64, 'あこ', { ja: 1, a: 'start', fs: 20, c: RED })}<path d="M314 57 L362 57" stroke="${RED}" stroke-width="3" stroke-linecap="round"/></g>
        <g class="o3">${T(206, 322, 'どこ?', { ja: 1, fs: 22, fw: 800, c: PUR })}${T(272, 322, '어디', { fs: 18, c: PUR })}</g>
      </svg>`,
      play(el) { SEQ(el, 5200, [['.z0', 300, 500, 0], ['.o0', 600], ['.z1', 1600, 500, 0], ['.o1', 1900], ['.o2', 3000, 500, 20], ['.no', 3700, 400, 0], ['.o3', 4400]]); }
    },

    'j5-08:1': {
      alt: '먼저 すみません(실례합니다)이라고 말을 건 뒤, トイレは どこですか를 トイレ(화장실) は(은) どこ(어디) です(예요) か(?)로 나누어 화장실이 어디인지 묻는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="s">${BOX(20, 44, 170, 52, { f: GF, s: DG_C.r })}${T(105, 79, 'すみません、', { ja: 1, fs: 24, c: DG_C.r })}${T(206, 78, '실례합니다', { a: 'start', fs: 20, c: DG_C.sub })}</g>
        ${ARR(105, 104, 105, 132, DG_C.sub, 3, 'ar')}
        ${ROW([{ t: 'トイレ', k: '화장실', f: DG_C.b, c: DG_C.d, kc: DG_C.d }, { t: 'は', k: '은', r: 'wa', rc: DG_C.d }, { t: 'どこ', k: '어디', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c }, { t: 'です', k: '예요' }, { t: 'か。', k: '?', f: '#efdcf7', c: PUR, kc: PUR }], 150, { fs: 26, h: 56, minw: 60 })}
        ${T(240, 274, '화장실은 어디예요?', { fs: 20, fw: 800, cls: 'm' })}
      </svg>`,
      play(el) { SEQ(el, 4400, [['.s', 200], ['.ar', 900, 300, 0], ['.b0', 1200], ['.b1', 1550], ['.b2', 1900, 500, -20], ['.b3', 2400], ['.b4', 2750], ['.m', 3400]]); }
    },

    'j5-08:2': {
      alt: '작은 ょ가 들어간 びょういん은 び와 ょ가 합쳐져 한 소리 뵤로 읽어 뵤-인(병원), 큰 よ가 들어간 びよういん은 비, 요 두 소리로 읽어 비요-인(미용실)이 되는 것을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${BY.map((w, r) => { const y = 46 + r * 130; return `<g class="w${r}">
          ${w.k.map((ch, i) => { const hi = i === 1, x = 20 + i * 56; return `${BOX(x, y, 50, 54, { f: hi ? DG_C.a : LG, s: hi ? DG_C.c : null, rx: 10 })}${T(x + 25, y + 39, ch, { ja: 1, fs: 30, fw: 700, c: hi ? DG_C.c : DG_C.ink })}`; }).join('')}
          ${T(310, y + 26, w.rd, { a: 'start', fs: 22, fw: 800, c: DG_C.d })}${T(310, y + 52, w.m, { a: 'start', fs: 20 })}</g>
          <g class="u${r}">${r === 0
            ? `<path d="M24 ${y + 62} V${y + 70} H122 V${y + 62}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>${T(73, y + 94, '뵤', { fs: 20, fw: 800, c: DG_C.d })}${T(150, y + 94, '한 소리', { a: 'start', fs: 18, c: DG_C.sub })}`
            : `<path d="M24 ${y + 62} V${y + 70} H66 V${y + 62} M80 ${y + 62} V${y + 70} H122 V${y + 62}" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>${T(45, y + 94, '비', { fs: 20, fw: 800, c: DG_C.c })}${T(101, y + 94, '요', { fs: 20, fw: 800, c: DG_C.c })}${T(150, y + 94, '두 소리', { a: 'start', fs: 18, c: DG_C.sub })}`}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4200, [['.w0', 200], ['.u0', 1000, 450, 0], ['.w1', 2000], ['.u1', 2800, 450, 0]]); }
    },

    'j5-08:3': {
      alt: '책상을 기준으로 고양이가 책상 위에 있으면 うえ(위), 아래에 있으면 した(아래), 안에 있으면 なか(안), 옆에 있으면 となり(옆)라고 하는 그림. つくえの した는 책상 아래',
      svg: `<svg viewBox="0 0 480 304" class="dg-svg" role="img">
        ${POS.map(([k, m], i) => { const cx = 66 + i * 116, [dx, cxo, cy] = PC[i]; return `
          <line x1="${cx - 54}" y1="191" x2="${cx + 54}" y2="191" stroke="#e5e5ea" stroke-width="3"/>
          ${i === 2 ? '' : DESK(cx + dx)}<g class="c${i}">${CAT(cx + cxo, cy)}</g>${i === 2 ? DESK(cx + dx) : ''}
          <g class="l${i}">${T(cx, 232, k, { ja: 1, fs: 24, fw: 800, c: DG_C.c })}${T(cx, 258, m, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        ${T(240, 294, `つくえの <tspan fill="${DG_C.c}">した</tspan> = 책상 아래`, { ja: 1, fs: 20, fw: 800, cls: 'ex' })}
      </svg>`,
      play(el) { SEQ(el, 4800, [...POS.flatMap((p, i) => [['.c' + i, 300 + i * 900, 450, -16], ['.l' + i, 600 + i * 900, 400, 0]]), ['.ex', 4000]]); }
    },

    'j5-08:4': {
      alt: '내 몸을 기준으로 오른쪽은 みぎ, 왼쪽은 ひだり. 화장실이 오른쪽이면 トイレは みぎです, 편의점이 왼쪽이면 コンビニは ひだりです라고 하고, 길을 알려 주면 ありがとうございます(고맙습니다)라고 인사하는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${KID(240, 120, DG_C.d, DG_C.b, 1)}${T(240, 238, '나 (뒷모습)', { fs: 18, c: DG_C.sub })}
        <g class="l">${ARR(204, 168, 70, 168, DG_C.r, 5)}${T(136, 154, 'ひだり', { ja: 1, fs: 26, fw: 800, c: DG_C.r })}${T(136, 196, '왼쪽', { fs: 18, c: DG_C.r })}
          ${BOX(14, 60, 112, 44, { f: GF, s: DG_C.r, rx: 10 })}${T(70, 90, 'コンビニ', { ja: 1, fs: 20, c: DG_C.r })}</g>
        <g class="r">${ARR(276, 168, 410, 168, DG_C.c, 5)}${T(344, 154, 'みぎ', { ja: 1, fs: 26, fw: 800, c: DG_C.c })}${T(344, 196, '오른쪽', { fs: 18, c: DG_C.c })}
          ${BOX(366, 60, 100, 44, { f: DG_C.a, s: DG_C.c, rx: 10 })}${T(416, 90, 'トイレ', { ja: 1, fs: 20, c: DG_C.c })}</g>
        <g class="t">${BOX(40, 256, 400, 46, { rx: 23 })}${T(240, 286, `ありがとうございます。 <tspan fill="${DG_C.sub}" font-size="18">고맙습니다</tspan>`, { ja: 1, fs: 20, fw: 800 })}</g>
      </svg>`,
      play(el) { SEQ(el, 4000, [['.l', 400, 600, 0], ['.r', 1600, 600, 0], ['.t', 2900]]); }
    },
  });
})();
