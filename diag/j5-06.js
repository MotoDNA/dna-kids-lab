/* 6학년 일본어 · 일본 식당에서 음식을 어떻게 주문할까? (j5-06) */
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
  const ONI = (cx, cy, s = 1) => `<g transform="translate(${cx},${cy}) scale(${s})"><path d="M0 -26 Q5 -30 9 -23 L27 11 Q31 22 18 22 L-18 22 Q-31 22 -27 11 L-9 -23 Q-5 -30 0 -26 Z" fill="#fff" stroke="${DG_C.ink}" stroke-width="3" stroke-linejoin="round"/><rect x="-12" y="6" width="24" height="16" fill="${DG_C.ink}"/></g>`;
  const BOWL = (cx, cy, food, steam) => `<g transform="translate(${cx},${cy})">
    ${steam ? `<path d="M-12 -30 q-6 -8 0 -16 M0 -32 q-6 -8 0 -16 M12 -30 q-6 -8 0 -16" fill="none" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linecap="round"/>` : ''}
    ${food ? `<path d="M-28 -2 Q-26 ${-2 - 22 * food} 0 ${-2 - 24 * food} Q26 ${-2 - 22 * food} 28 -2 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5"/>` : ''}
    <path d="M-34 -2 H34 Q32 28 0 28 Q-32 28 -34 -2 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/></g>`;
  const CNT = [['ひとつ', '한 개'], ['ふたつ', '두 개'], ['みっつ', '세 개']];
  const MEAL = [
    { t: 'いただきます。', k: '잘 먹겠습니다', w: '먹기 전', food: 1, steam: 1 },
    { t: 'おいしい！', k: '맛있다', w: '먹으면서', food: .5, c: DG_C.c },
    { t: 'ごちそうさまでした。', k: '잘 먹었습니다', w: '먹은 뒤', food: 0 },
  ];

  Object.assign(DIAG, {
    'j5-06:0': {
      alt: '가게에 들어가면 직원이 いらっしゃいませ(어서 오세요)라고 말하고, 직원을 부를 때 나는 손을 살짝 들고 すみません(저기요)이라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        <g class="cl">${BUB(246, 48, 220, 70, { tx: 404, s: DG_C.r })}${T(356, 78, 'いらっしゃいませ。', { ja: 1, fs: 20, fw: 800, c: DG_C.r })}${T(356, 106, '어서 오세요', { fs: 18, c: DG_C.sub })}</g>
        ${KID(404, 190, DG_C.r, GF)}<rect x="390" y="254" width="28" height="30" rx="4" fill="#fff" stroke="${DG_C.r}" stroke-width="2.5"/>
        ${T(404, 312, '직원', { fs: 18, c: DG_C.r })}
        ${KID(76, 190, DG_C.d, DG_C.b)}
        <g class="me"><path d="M96 252 L116 212" stroke="${DG_C.d}" stroke-width="7" stroke-linecap="round"/><circle cx="118" cy="206" r="7" fill="#fff" stroke="${DG_C.d}" stroke-width="3"/>
          ${BUB(14, 108, 168, 70, { tx: 60, s: DG_C.d })}${T(98, 138, 'すみません。', { ja: 1, fs: 20, fw: 800, c: DG_C.d })}${T(98, 166, '저기요', { fs: 18, c: DG_C.sub })}</g>
        ${T(76, 312, '나', { fs: 18, c: DG_C.d })}
      </svg>`,
      play(el) { SEQ(el, 3800, [['.cl', 300, 500, 12], ['.me', 1800, 500, 12]]); }
    },

    'j5-06:1': {
      alt: 'ラーメンを ください(라멘 주세요)를 ラーメン(라멘) を(을) ください(주세요) 블록으로 나누고, を는 お와 똑같이 오(o)로 읽는다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <g class="bw">${BOWL(240, 72, 1, 1)}</g>
        ${ROW([{ t: 'ラーメン', k: '라멘', f: DG_C.b, c: DG_C.d }, { t: 'を', k: '을', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c, r: 'o (오)' }, { t: 'ください', k: '주세요', f: GF, c: DG_C.r }], 140, { fs: 26, h: 56, gap: 10, minw: 70 })}
        ${T(240, 258, '라멘 주세요.', { fs: 20, fw: 800, cls: 'm' })}
      </svg>`,
      play(el) { SEQ(el, 4000, [['.bw', 200], ['.b0', 900], ['.b1', 1500, 500, -20], ['.b2', 2200], ['.m', 3000]]); }
    },

    'j5-06:2': {
      alt: 'カレー(카레)와 ジュース(주스) 사이에 と(~와)를 넣어 カレーと ジュースを ください(카레와 주스 주세요)라고 두 가지를 함께 주문하는 그림',
      svg: `<svg viewBox="0 0 480 220" class="dg-svg" role="img">
        ${ROW([{ t: 'カレー', k: '카레', f: DG_C.b, c: DG_C.d }, { t: 'と', k: '와', f: GF, s: DG_C.r, c: DG_C.r, kc: DG_C.r, r: '~와', rc: DG_C.r }, { t: 'ジュース', k: '주스', f: DG_C.b, c: DG_C.d }, { t: 'を', k: '를' }, { t: 'ください', k: '주세요' }], 70, { fs: 22, pad: 12, gap: 6, minw: 46 })}
        ${T(240, 204, '카레와 주스 주세요.', { fs: 20, fw: 800, cls: 'm' })}
      </svg>`,
      play(el) { SEQ(el, 4200, [['.b0', 200], ['.b2', 700], ['.b3', 1100], ['.b4', 1500], ['.b1', 2300, 500, -24], ['.m', 3300]]); }
    },

    'j5-06:3': {
      alt: '주먹밥 한 개 ひとつ, 두 개 ふたつ, 세 개 みっつ를 그림으로 보여 주고, 개수는 ください 바로 앞에 넣어 おにぎりを みっつ ください(주먹밥 세 개 주세요)라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${CNT.map(([k, m], i) => { const x = 80 + i * 160; return `<g class="c${i}">
          ${Array.from({ length: i + 1 }, (_, j) => ONI(x + (j - i / 2) * 50, 92, .74)).join('')}
          ${T(x, 158, k, { ja: 1, fs: 24, fw: 800, c: i === 2 ? DG_C.c : DG_C.ink })}${T(x, 186, m, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <line x1="20" y1="208" x2="460" y2="208" stroke="#e5e5ea" stroke-width="2"/>
        ${ROW([{ t: 'おにぎりを', k: '주먹밥을' }, { t: 'みっつ', k: '세 개', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c }, { t: 'ください', k: '주세요', f: GF, c: DG_C.r }], 226, { p: 's' })}
      </svg>`,
      play(el) { SEQ(el, 4600, [['.c0', 200], ['.c1', 800], ['.c2', 1400], ['.s0', 2400], ['.s2', 2800], ['.s1', 3400, 500, -24]]); }
    },

    'j5-06:4': {
      alt: '먹기 전에는 いただきます(잘 먹겠습니다), 먹으면서 맛있으면 おいしい(맛있다), 다 먹은 뒤에는 ごちそうさまでした(잘 먹었습니다)라고 말하는 순서를 그릇이 비어 가는 모습과 함께 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <line class="ln" x1="64" y1="94" x2="64" y2="94" stroke="${LN}" stroke-width="3" stroke-dasharray="5 6"/>
        ${MEAL.map((m, i) => { const y = 44 + i * 86; return `<g class="m${i}">
          <rect x="22" y="${y - 8}" width="84" height="74" rx="16" fill="#fff"/>${BOWL(64, y + 34, m.food, m.steam)}
          ${T(128, y + 26, m.t, { ja: 1, a: 'start', fs: 22, fw: 800, c: m.c || DG_C.ink })}${T(128, y + 54, m.k, { a: 'start', fs: 18, c: DG_C.sub })}
          ${T(470, y + 54, m.w, { a: 'end', fs: 18, c: DG_C.d })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4400, MEAL.map((m, i) => ['.m' + i, 200 + i * 1300, 500, 10]), e => el.querySelector('.ln').setAttribute('y2', 94 + 180 * dgEase(dgP(e, 400, 2600)))); }
    },
  });
})();
