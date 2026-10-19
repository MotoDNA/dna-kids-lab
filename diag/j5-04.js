/* 5학년 일본어 · '좋아해요'는 일본어로 어떻게 말할까? (j5-04) */
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
  const S0 = [{ t: 'ねこ', k: '고양이' }, { t: 'が', k: '를', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c }, { t: 'すき', k: '좋아', f: '#ffd9d6', c: RED }, { t: 'です。', k: '해요' }];
  const O0 = { fs: 28, h: 60, gap: 10, minw: 74 };
  const GA = ROWX(S0, O0, 1);
  /* 1: 좋아하는 것 */
  const LIKE = [
    [['すし', '초밥'], ['りんご', '사과'], ['アイスクリーム', '아이스크림']],
    [['サッカー', '축구'], ['ゲーム', '게임'], ['おんがく', '음악']],
  ];
  /* 2: 묻고 답하기 (칸 위치 고정) */
  const QA = [
    { who: 'A', a: 'なに', b: 'が', c: 'すきですか。', m: '무엇을 좋아해요?', col: PUR },
    { who: 'B', a: 'ゲーム', b: 'が', c: 'すきです。', m: '게임을 좋아해요.', col: DG_C.d },
    { who: 'A', a: 'わたし', b: 'も', c: 'すきです！', m: '나도 좋아해요!', col: PUR, mo: 1 },
  ];
  /* 3: 좋아하는 정도 */
  const LV = [
    { t: 'だいすきです', k: '아주 좋아해요', v: 1, c: RED },
    { t: 'すきです', k: '좋아해요', v: .72, c: DG_C.c },
    { t: 'あまり すきじゃないです', k: '별로 안 좋아해요', v: .3, c: DG_C.d },
    { t: 'きらいです', k: '싫어해요', v: .08, c: DG_C.sub, n: '강하게 들려요' },
  ];
  const HEART = (cx, cy, s, c) => `<path transform="translate(${cx},${cy}) scale(${s})" d="M0 6 C-10 -2 -12 -10 -6 -13 C-2 -15 0 -12 0 -10 C0 -12 2 -15 6 -13 C12 -10 10 -2 0 6 Z" fill="${c}"/>`;

  Object.assign(DIAG, {
    'j5-04:0': {
      alt: 'ねこが すきです(고양이를 좋아해요)를 ねこ(고양이) が(를) すき(좋아) です(해요)로 나누어, 좋아하는 대상 뒤에는 を가 아니라 が를 쓴다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${ROW(S0, 84, O0)}
        <g class="x">${T(GA - 26, 60, 'を', { ja: 1, fs: 24, c: RED })}<path d="M${GA - 42} 52 L${GA - 10} 52" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
          ${T(GA + 22, 60, 'が!', { ja: 1, fs: 24, fw: 800, c: DG_C.c })}</g>
        ${T(240, 238, '고양이를 좋아해요.', { fs: 22, fw: 800, cls: 'mean' })}
      </svg>`,
      play(el) { SEQ(el, 4400, [['.b0', 200], ['.b2', 700], ['.b3', 1100], ['.b1', 1800, 500, -20], ['.x', 2700], ['.mean', 3500]]); }
    },

    'j5-04:1': {
      alt: '좋아하는 것 낱말 카드: 음식 すし(초밥), りんご(사과), アイスクリーム(아이스크림), 활동 サッカー(축구), ゲーム(게임), おんがく(음악). 낱말을 넣어 サッカーが すきです(축구를 좋아해요)라고 말해요',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${T(125, 46, '음식', { fs: 18, c: DG_C.c })}${T(355, 46, '활동', { fs: 18, c: DG_C.d })}
        ${LIKE.map((col, c) => col.map(([t, k], r) => { const x = 20 + c * 230, y = 58 + r * 64, hi = c === 1 && r === 0; return `<g class="w${c}_${r}">
          ${BOX(x, y, 210, 58, { f: '#fff', s: hi ? DG_C.d : LN, sw: hi ? 3 : 2, rx: 14 })}
          ${T(x + 105, y + 26, t, { ja: 1, fs: 21, fw: 800, c: hi ? DG_C.d : DG_C.ink })}${T(x + 105, y + 50, k, { fs: 18, c: DG_C.sub })}</g>`; }).join('')).join('')}
        ${ROW([{ t: 'サッカー', f: DG_C.b, s: DG_C.d, c: DG_C.d }, { t: 'が', f: DG_C.a, c: DG_C.c }, { t: 'すきです。' }], 266, { p: 's' })}
      </svg>`,
      play(el) {
        const st = [];
        LIKE.forEach((col, c) => col.forEach((w, r) => st.push([`.w${c}_${r}`, 200 + (c * 3 + r) * 350, 400])));
        SEQ(el, 4600, [...st, ['.s0', 2700, 500, -30], ['.s1', 3300], ['.s2', 3600]]);
      }
    },

    'j5-04:2': {
      alt: 'A가 なにが すきですか(무엇을 좋아해요?)라고 물으면 B는 なに 자리에 ゲーム를 넣어 ゲームが すきです(게임을 좋아해요)라고 답하고, A는 わたしも すきです(나도 좋아해요)라고 말하는 그림. も는 ~도라는 뜻',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${QA.map((r, i) => { const y = 40 + i * 94; return `<g class="r${i}">
          <circle cx="26" cy="${y + 25}" r="17" fill="${r.col}"/>${T(26, y + 32, r.who, { fs: 20, fw: 800, c: '#fff' })}
          <g class="a${i}">${BOX(54, y, 120, 50, { f: i === 2 ? LG : DG_C.b })}${T(114, y + 34, r.a, { ja: 1, fs: 24, c: i === 2 ? DG_C.ink : DG_C.d })}</g>
          ${BOX(180, y, 56, 50, { f: r.mo ? GF : DG_C.a, s: r.mo ? DG_C.r : null })}${T(208, y + 34, r.b, { ja: 1, fs: 24, c: r.mo ? DG_C.r : DG_C.c })}
          ${BOX(242, y, 200, 50, {})}${T(342, y + 34, r.c, { ja: 1, fs: 24 })}
          ${T(54, y + 76, r.m, { a: 'start', fs: 18, c: DG_C.sub })}
          ${r.mo ? T(208, y + 76, 'も = ~도', { fs: 18, fw: 800, c: DG_C.r }) : ''}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4800, [['.r0', 200], ['.r1', 1500], ['.a1', 1900, 500, -40], ['.r2', 3200]]); }
    },

    'j5-04:3': {
      alt: '좋아하는 정도에 따라 だいすきです(아주 좋아해요), すきです(좋아해요), あまり すきじゃないです(별로 안 좋아해요), きらいです(싫어해요, 강하게 들려요)를 막대 길이로 비교한 그림',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        ${LV.map((l, i) => { const y = 44 + i * 70; return `<g class="l${i}">
          ${T(16, y + 22, l.t, { ja: 1, a: 'start', fs: 20, fw: 800, c: l.c })}${T(16, y + 48, l.k, { a: 'start', fs: 18, c: DG_C.sub })}
          ${BOX(262, y + 8, 196, 22, { f: LG, rx: 11 })}<rect class="bar${i}" x="262" y="${y + 8}" width="0" height="22" rx="11" fill="${l.c}"/>
          ${l.n ? T(300, y + 54, l.n, { a: 'start', fs: 18, c: DG_C.sub }) : ''}
          </g>`; }).join('')}
      </svg>`,
      play(el) {
        SEQ(el, 5000, LV.map((l, i) => ['.l' + i, 200 + i * 1000, 400, 8]), e => LV.forEach((l, i) => el.querySelector('.bar' + i).setAttribute('width', Math.max(22, 196 * l.v) * dgEase(dgP(e, 500 + i * 1000, 700)))));
      }
    },
  });
})();
