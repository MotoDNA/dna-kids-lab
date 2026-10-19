/* 6학년 일본어 · '오늘은 더워요'는 일본어로 어떻게 말할까? (j5-10) */
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
  const SUN = (s = 1) => `<g transform="scale(${s})">${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x1="${(28 * Math.cos(a)).toFixed(1)}" y1="${(28 * Math.sin(a)).toFixed(1)}" x2="${(38 * Math.cos(a)).toFixed(1)}" y2="${(38 * Math.sin(a)).toFixed(1)}" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>`; }).join('')}<circle r="20" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5"/></g>`;
  const CLOUD = (dy = 0, f = LG) => `<path transform="translate(0,${dy})" d="M-30 16 Q-44 16 -42 2 Q-40 -10 -26 -8 Q-22 -26 -2 -24 Q16 -30 24 -12 Q40 -12 40 2 Q40 16 26 16 Z" fill="${f}" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const RAIN = `${CLOUD(-12, '#e5e5ea')}${[-18, 0, 18].map((x, i) => `<line class="rd" x1="${x}" y1="${12 + (i % 2) * 6}" x2="${x - 5}" y2="${26 + (i % 2) * 6}" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"/>`).join('')}`;
  const SNOW = `${CLOUD(-12, '#fff')}${[-18, 0, 18].map((x, i) => `<circle cx="${x}" cy="${20 + (i % 2) * 8}" r="4.5" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2"/>`).join('')}`;
  const WX = [['はれ', '맑음', SUN(.95)], ['くもり', '흐림', CLOUD()], ['あめ', '비', RAIN], ['ゆき', '눈', SNOW]];
  /* 2: 계절 */
  const FLOWER = `${[0, 72, 144, 216, 288].map(a => `<circle cx="${(13 * Math.sin(a * Math.PI / 180)).toFixed(1)}" cy="${(-13 * Math.cos(a * Math.PI / 180)).toFixed(1)}" r="10" fill="#ffd9d6" stroke="${RED}" stroke-width="2.5"/>`).join('')}<circle r="8" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>`;
  const LEAF = `<path d="M-20 22 Q-26 -14 18 -24 Q26 12 -20 22 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/><path d="M-20 22 Q0 0 14 -16" fill="none" stroke="${DG_C.c}" stroke-width="2.5" stroke-linecap="round"/>`;
  const FLAKE = `<g stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round">${[0, 60, 120].map(a => `<line x1="${(-24 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y1="${(-24 * Math.sin(a * Math.PI / 180)).toFixed(1)}" x2="${(24 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${(24 * Math.sin(a * Math.PI / 180)).toFixed(1)}"/>`).join('')}</g><circle r="5" fill="${DG_C.b}"/>`;
  const SEA = [
    { s: 'はる', sk: '봄', a: 'あたたか', am: '따뜻하다', g: FLOWER },
    { s: 'なつ', sk: '여름', a: 'あつ', am: '덥다', g: SUN(.8) },
    { s: 'あき', sk: '가을', a: 'すずし', am: '시원하다', g: LEAF },
    { s: 'ふゆ', sk: '겨울', a: 'さむ', am: '춥다', g: FLAKE },
  ];
  const IE = s => `${s}<tspan fill="${DG_C.c}">い</tspan>`;
  /* 3: くない */
  const NEG = [
    { o: 'さむい', st: 'さむ', k: '안 추워요' },
    { o: 'あつい', st: 'あつ', k: '안 더워요' },
    { o: 'いい', st: 'よ', k: '안 좋아요', sp: 1 },
  ];
  const DOG = (cx, cy, s) => `<g transform="translate(${cx},${cy}) scale(${s})"><ellipse cx="-27" cy="-4" rx="11" ry="20" fill="${DG_C.c}"/><ellipse cx="27" cy="-4" rx="11" ry="20" fill="${DG_C.c}"/><circle r="28" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/><circle cx="-10" cy="-6" r="3.5" fill="${DG_C.ink}"/><circle cx="10" cy="-6" r="3.5" fill="${DG_C.ink}"/><ellipse cx="0" cy="8" rx="6" ry="4.5" fill="${DG_C.ink}"/></g>`;

  Object.assign(DIAG, {
    'j5-10:0': {
      alt: '날씨 낱말: 맑음 はれ, 흐림 くもり, 비 あめ, 눈 ゆき를 그림으로 보여 주고, きょうは あめです(오늘은 비가 와요)라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 304" class="dg-svg" role="img">
        ${WX.map(([k, m, g], i) => { const x = 60 + i * 120; return `<g class="w${i}">
          <g transform="translate(${x},98)">${g}</g>${T(x, 180, k, { ja: 1, fs: 26, fw: 800, c: i === 2 ? DG_C.d : DG_C.ink })}${T(x, 206, m, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <g class="s">${BOX(60, 232, 360, 60, { f: DG_C.b, rx: 18 })}${T(240, 260, `きょうは <tspan fill="${DG_C.d}">あめ</tspan>です。`, { ja: 1, fs: 22, fw: 800 })}${T(240, 284, '오늘은 비가 와요.', { fs: 18, c: DG_C.sub })}</g>
      </svg>`,
      play(el) {
        SEQ(el, 4400, [...WX.map((w, i) => ['.w' + i, 200 + i * 600, 450, 14]), ['.s', 3000]], e => {
          // 빗방울이 떨어지는 느낌 (마지막엔 제자리)
          const k = e >= 4400 ? 0 : (e % 500) / 500 * 6;
          el.querySelectorAll('.rd').forEach(n => n.setAttribute('transform', `translate(0,${k.toFixed(1)})`));
        });
      }
    },

    'j5-10:1': {
      alt: '맑은 날 A가 いい てんきですね(날씨가 좋네요)라고 말하면 B가 そうですね(그렇네요)라고 맞장구치는 그림. 끝의 ね는 ~네요라는 뜻',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g transform="translate(240,70)">${SUN(.9)}</g>
        <g class="a">${FACE(34, 140, 20, DG_C.d)}${BUB(66, 112, 236, 56, { dir: 'l', s: DG_C.d })}${T(184, 148, `いい てんきです<tspan fill="${DG_C.c}">ね</tspan>。`, { ja: 1, fs: 22, fw: 800 })}
          ${T(72, 194, '날씨가 좋네요.', { a: 'start', fs: 18, c: DG_C.sub })}</g>
        <g class="b">${FACE(446, 222, 20, DG_C.r)}${BUB(254, 194, 160, 56, { dir: 'r', s: DG_C.r })}${T(334, 230, `そうです<tspan fill="${DG_C.c}">ね</tspan>。`, { ja: 1, fs: 22, fw: 800 })}
          ${T(408, 276, '그렇네요.', { a: 'end', fs: 18, c: DG_C.sub })}</g>
        <g class="n">${BOX(20, 232, 170, 40, { f: DG_C.a, rx: 20 })}${T(105, 259, 'ね = ~네요', { ja: 1, fs: 20, fw: 800, c: DG_C.c })}</g>
      </svg>`,
      play(el) { SEQ(el, 4000, [['.a', 300], ['.b', 1500], ['.n', 2700]]); }
    },

    'j5-10:2': {
      alt: '계절과 날씨 형용사 짝: 봄 はる는 あたたかい(따뜻하다), 여름 なつ는 あつい(덥다), 가을 あき는 すずしい(시원하다), 겨울 ふゆ는 さむい(춥다). 모두 끝이 い로 끝나는 い형용사',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">
        ${SEA.map((c, i) => { const x = 14 + (i % 2) * 230, y = 40 + Math.floor(i / 2) * 128; return `<g class="c${i}">
          ${BOX(x, y, 222, 118, { f: '#fff', s: LN, sw: 2, rx: 18 })}
          <g transform="translate(${x + 44},${y + 59})">${c.g}</g>
          ${T(x + 88, y + 32, c.s, { ja: 1, a: 'start', fs: 20, fw: 800, c: DG_C.sub })}${T(x + 140, y + 32, c.sk, { a: 'start', fs: 18, c: DG_C.sub })}
          ${T(x + 88, y + 72, IE(c.a), { ja: 1, a: 'start', fs: 24, fw: 800 })}${T(x + 88, y + 102, c.am, { a: 'start', fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <g class="n">${T(240, 324, `끝이 <tspan fill="${DG_C.c}">い</tspan> → い형용사`, { ja: 1, fs: 20, fw: 800 })}</g>
      </svg>`,
      play(el) { SEQ(el, 4600, [...SEA.map((s, i) => ['.c' + i, 200 + i * 750, 450, 14]), ['.n', 3600]]); }
    },

    'j5-10:3': {
      alt: '안 ~해요는 끝의 い를 빼고 くない를 붙여요: さむい → さむくないです(안 추워요), あつい → あつくないです(안 더워요). いい는 특별해서 よくないです(안 좋아요)',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${NEG.map((n, i) => { const y = 40 + i * 86, len = n.o.length; return `<g class="r${i}">
          ${T(16, y + 34, n.sp ? n.o : `${n.o.slice(0, -1)}<tspan fill="${RED}">い</tspan>`, { ja: 1, a: 'start', fs: 24, fw: 800, c: n.sp ? DG_C.c : DG_C.ink })}
          ${n.sp ? '' : `<path class="x${i}" d="M${16 + 24 * (len - 1) - 2} ${y + 26} L${16 + 24 * len + 2} ${y + 26}" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>`}
          ${ARR(98, y + 26, 124, y + 26, DG_C.sub, 3)}
          ${ROW([{ t: n.st, f: n.sp ? DG_C.a : LG, s: n.sp ? DG_C.c : null, c: n.sp ? DG_C.c : DG_C.ink }, { t: 'くない', f: GF, s: DG_C.r, c: DG_C.r }, { t: 'です' }], y, { x: 136, h: 50, gap: 6, minw: 52, p: `p${i}_` })}
          ${T(136, y + 74, n.k + (n.sp ? ' (いい → よ)' : ''), { ja: 1, a: 'start', fs: 18, c: n.sp ? DG_C.c : DG_C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        SEQ(el, 5400, NEG.flatMap((n, i) => { const t = 200 + i * 1600; return [['.r' + i, t, 400, 0], ['.x' + i, t + 500, 300, 0], [`.p${i}_0`, t + 600, 400, 0], [`.p${i}_1`, t + 900, 450, -20], [`.p${i}_2`, t + 1200, 400, 0]]; }));
      }
    },

    'j5-10:4': {
      alt: '형용사를 낱말 앞에 두면 꾸며 줘요: おおきい いぬ(큰 개), たのしい なつ(즐거운 여름)',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[['おおきい', 'いぬ', '큰 개', DOG(410, 100, 1.25)], ['たのしい', 'なつ', '즐거운 여름', `<g transform="translate(410,212)">${SUN(.95)}</g>`]].map(([a, b, k, g], i) => { const y = 70 + i * 116; return `<g class="r${i}">
          ${ROW([{ t: a, f: DG_C.a, s: DG_C.c, c: DG_C.c }, { t: b, f: DG_C.b, c: DG_C.d }], y, { x: 20, fs: 26, h: 56, gap: 10, p: `q${i}_` })}
          <g class="ar${i}"><path d="M86 ${y - 6} Q143 ${y - 38} 196 ${y - 8}" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>${ARR(190, y - 13, 197, y - 7, DG_C.c, 3)}${T(143, y - 32, '꾸며 줘요', { fs: 18, c: DG_C.c })}</g>
          ${T(20, y + 84, k, { a: 'start', fs: 20, fw: 800 })}
          <g class="g${i}">${g}</g></g>`; }).join('')}
        
      </svg>`,
      play(el) { SEQ(el, 4600, [['.q0_1', 200], ['.q0_0', 800, 450, -18], ['.ar0', 1300, 400, 0], ['.g0', 1500], ['.q1_1', 2300], ['.q1_0', 2800, 450, -18], ['.ar1', 3300, 400, 0], ['.g1', 3500]]); }
    },
  });
})();
