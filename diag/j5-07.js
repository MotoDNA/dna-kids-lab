/* 6학년 일본어 · 일본 가게에서 '얼마예요?'는 어떻게 물을까? (j5-07) */
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
  const ERASER = (cx, cy) => `<g transform="translate(${cx},${cy})"><rect x="-44" y="-20" width="88" height="40" rx="8" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/><rect x="-10" y="-20" width="54" height="40" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/></g>`;
  const TAG = (x, y, s, c) => `<g transform="translate(${x},${y})"><path d="M0 0 L16 -20 H76 V20 H16 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/><circle cx="16" cy="0" r="4" fill="#fff" stroke="${DG_C.c}" stroke-width="2"/>${T(48, 8, s, { fs: 22, fw: 800, c: c || DG_C.c })}</g>`;
  const MONEY = [
    { v: '100', k: 'ひゃくえん', w: '100엔', g: x => `<circle cx="${x}" cy="100" r="40" fill="#e5e5ea" stroke="${DG_C.sub}" stroke-width="3"/><circle cx="${x}" cy="100" r="32" fill="none" stroke="#fff" stroke-width="2"/>` },
    { v: '500', k: 'ごひゃくえん', w: '500엔', g: x => `<circle cx="${x}" cy="100" r="44" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/><circle cx="${x}" cy="100" r="36" fill="none" stroke="#fff" stroke-width="2"/>` },
    { v: '1000', k: 'せんえん', w: '1000엔', g: x => `<rect x="${x - 70}" y="64" width="140" height="72" rx="8" fill="${GF}" stroke="${DG_C.r}" stroke-width="3"/><circle cx="${x + 42}" cy="100" r="18" fill="none" stroke="${DG_C.r}" stroke-width="2"/>` },
  ];
  const HUN = [
    ['100', 'ひゃく'], ['200', 'にひゃく'], ['300', 'さん|びゃく'], ['400', 'よんひゃく'], ['500', 'ごひゃく'],
    ['600', 'ろ|っぴゃく'], ['700', 'ななひゃく'], ['800', 'は|っぴゃく'], ['900', 'きゅうひゃく'],
  ];
  const DLG = [
    { who: 'A', t: 'これは いくらですか。', k: '이것은 얼마예요?' },
    { who: 'B', t: 'ひゃくえんです。', k: '100엔이에요.' },
    { who: 'A', t: `<tspan fill="${DG_C.r}">やすい！</tspan> これを ください。`, k: '싸다! 이거 주세요.' },
  ];

  Object.assign(DIAG, {
    'j5-07:0': {
      alt: '값을 모르는 지우개를 가리키며 これは いくらですか(이것은 얼마예요?)라고 묻는 그림. いくら는 얼마라는 뜻',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <g class="ob">${ERASER(170, 84)}${TAG(240, 84, '?')}</g>
        ${ROW([{ t: 'これ', k: '이것' }, { t: 'は', k: '은' }, { t: 'いくら', k: '얼마', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c }, { t: 'です', k: '예요' }, { t: 'か。', k: '?', f: '#efdcf7', c: PUR, kc: PUR }], 140, { fs: 26, h: 56, minw: 60 })}
        ${T(240, 266, '이것은 얼마예요?', { fs: 20, fw: 800, cls: 'm' })}
      </svg>`,
      play(el) { SEQ(el, 4200, [['.ob', 200], ['.b0', 900], ['.b1', 1200], ['.b2', 1700, 500, -20], ['.b3', 2200], ['.b4', 2500], ['.m', 3200]]); }
    },

    'j5-07:1': {
      alt: '일본 돈: 100엔 동전 ひゃくえん, 500엔 동전 ごひゃくえん, 1000엔 지폐 せんえん. 100은 ひゃく, 1000은 せん이고 숫자 뒤에 えん을 붙여요',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${MONEY.map((m, i) => { const x = [78, 222, 384][i]; return `<g class="m${i}">${m.g(x)}${T(i === 2 ? x - 18 : x, 108, m.v, { fs: 24, fw: 800, c: i === 0 ? DG_C.sub : i === 1 ? DG_C.c : DG_C.r })}
          ${T(x, 184, m.k, { ja: 1, fs: 22, fw: 800 })}${T(x, 210, m.w, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <g class="f">${BOX(20, 234, 440, 44, { rx: 22 })}
          ${T(240, 263, `<tspan fill="${DG_C.d}">ひゃく</tspan> 100 · <tspan fill="${DG_C.d}">せん</tspan> 1000 · <tspan fill="${DG_C.c}">えん</tspan> 엔`, { ja: 1, fs: 20, fw: 800 })}</g>
      </svg>`,
      play(el) { SEQ(el, 4000, [['.m0', 200, 450, 16], ['.m1', 900, 450, 16], ['.m2', 1600, 450, 16], ['.f', 2700]]); }
    },

    'j5-07:2': {
      alt: '100부터 900까지 일본어: ひゃく, にひゃく, さんびゃく, よんひゃく, ごひゃく, ろっぴゃく, ななひゃく, はっぴゃく, きゅうひゃく. 300, 600, 800은 소리가 바뀌어요. 150엔은 ひゃく+ごじゅう+えん = ひゃくごじゅうえん',
      svg: `<svg viewBox="0 0 480 344" class="dg-svg" role="img">
        ${HUN.map(([n, k], i) => { const x = 15 + (i % 3) * 152, y = 44 + Math.floor(i / 3) * 70, ch = k.includes('|'), [a, b] = k.split('|'); return `<g class="h${i}">
          ${BOX(x, y, 146, 62, { rx: 12 })}${ch ? BOX(x, y, 146, 62, { f: DG_C.a, s: DG_C.c, rx: 12, cls: 'hl' }) : ''}
          ${T(x + 14, y + 25, n, { a: 'start', fs: 18, c: ch ? DG_C.c : DG_C.sub })}
          ${T(x + 73, y + 52, ch ? `${a}<tspan fill="${DG_C.c}">${b}</tspan>` : k, { ja: 1, fs: 22, fw: 800 })}</g>`; }).join('')}
        <g class="e">${ROW([{ t: 'ひゃく', k: '100' }, { t: 'ごじゅう', k: '50' }, { t: 'えん', k: '엔', f: DG_C.b, c: DG_C.d, kc: DG_C.d }], 264, { x: 15, fs: 22, h: 46, gap: 6 })}
          ${T(466, 296, '= 150엔', { a: 'end', fs: 22, fw: 800 })}</g>
      </svg>`,
      play(el) {
        SEQ(el, 5200, [...HUN.map((h, i) => ['.h' + i, 200 + i * 300, 350, 10]), ['.hl', 3000, 500, 0], ['.e', 3900]]);
      }
    },

    'j5-07:3': {
      alt: '가게 대화: A가 これは いくらですか(이것은 얼마예요?)라고 묻고, B가 ひゃくえんです(100엔이에요)라고 답하면, A가 やすい! これを ください(싸다! 이거 주세요)라고 말해요. 비싸면 たかい, 싸면 やすい',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        ${DLG.map((d, i) => { const y = 40 + i * 80, a = d.who === 'A', w = tw(d.t, 20) + 34, x = a ? 62 : 418 - w; return `<g class="d${i}">
          ${FACE(a ? 30 : 450, y + 23, 18, a ? DG_C.d : DG_C.r)}
          ${BUB(x, y, w, 46, { dir: a ? 'l' : 'r', s: a ? DG_C.d : DG_C.r })}${T(x + w / 2, y + 30, d.t, { ja: 1, fs: 20, fw: 800 })}
          ${T(a ? x + 6 : x + w - 6, y + 70, d.k, { a: a ? 'start' : 'end', fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        <g class="adj">${BOX(40, 288, 180, 42, { f: '#ffd9d6', rx: 21 })}${T(130, 316, `<tspan fill="${RED}">たかい</tspan> 비싸다`, { ja: 1, fs: 20, fw: 800 })}
          ${BOX(260, 288, 180, 42, { f: GF, rx: 21 })}${T(350, 316, `<tspan fill="${DG_C.r}">やすい</tspan> 싸다`, { ja: 1, fs: 20, fw: 800 })}</g>
      </svg>`,
      play(el) { SEQ(el, 4400, [['.d0', 200], ['.d1', 1200], ['.d2', 2200], ['.adj', 3300]]); }
    },
  });
})();
