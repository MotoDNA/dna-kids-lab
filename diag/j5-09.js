/* 6학년 일본어 · '먹어요, 가요, 봐요'는 일본어로 어떻게 말할까? (j5-09) */
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
  const VB = [['たべ', '먹어요'], ['のみ', '마셔요'], ['いき', '가요'], ['み', '봐요']];
  const DAY = [['おきます', '일어나요'], ['ねます', '자요'], ['あそびます', '놀아요'], ['べんきょうします', '공부해요']];
  const PT = [
    { a: 'パン', p: 'を', v: 'たべます', m: '빵을 먹어요', q: '무엇을', c: DG_C.c, f: DG_C.a },
    { a: 'がっこう', p: 'に', v: 'いきます', m: '학교에 가요', q: '어디로', c: DG_C.d, f: DG_C.b },
    { a: 'こうえん', p: 'で', v: 'あそびます', m: '공원에서 놀아요', q: '어디에서', c: DG_C.r, f: GF },
  ];
  const CJ = [
    { e: 'ます', k: '먹어요', c: DG_C.d, f: DG_C.b },
    { e: 'ません', k: '안 먹어요', c: RED, f: '#ffd9d6' },
    { e: 'ました', k: '먹었어요', c: DG_C.r, f: GF },
    { e: 'ますか', k: '먹어요?', c: PUR, f: '#efdcf7' },
  ];

  Object.assign(DIAG, {
    'j5-09:0': {
      alt: '공손한 동사는 끝이 ます로 끝나요: たべ+ます = たべます(먹어요), のみ+ます = のみます(마셔요), いき+ます = いきます(가요), み+ます = みます(봐요)',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${VB.map(([s, k], i) => { const y = 44 + i * 62, w = tw(s, 26) + 28; return `
          <g class="s${i}">${BOX(222 - w, y, w, 50, {})}${T(222 - w / 2, y + 35, s, { ja: 1, fs: 26 })}</g>
          <g class="m${i}">${BOX(228, y, 80, 50, { f: DG_C.b, s: DG_C.d })}${T(268, y + 35, 'ます', { ja: 1, fs: 26, c: DG_C.d })}</g>
          ${T(334, y + 33, k, { a: 'start', fs: 20, cls: 'k' + i })}`; }).join('')}
      </svg>`,
      play(el) {
        const st = [];
        VB.forEach((v, i) => st.push(['.s' + i, 200 + i * 300, 400]));
        VB.forEach((v, i) => st.push(['.m' + i, 1700 + i * 450, 450, 0], ['.k' + i, 2000 + i * 450, 400, 0]));
        SEQ(el, 4400, st, e => VB.forEach((v, i) => { const f = dgEase(dgP(e, 1700 + i * 450, 450)); el.querySelector('.m' + i).setAttribute('transform', `translate(${60 * (1 - f)},0)`); }));
      }
    },

    'j5-09:1': {
      alt: '7시를 가리키는 시계와 함께 しちじ(7시) に(에) おきます(일어나요) 블록으로 시간 뒤에 に를 붙이는 것을 보여 주고, 하루 생활 동사 おきます(일어나요), ねます(자요), あそびます(놀아요), べんきょうします(공부해요)를 정리한 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        <g class="ck"><circle cx="70" cy="96" r="50" fill="#fff" stroke="${DG_C.ink}" stroke-width="4"/>
          ${[12, 3, 6, 9].map(n => { const a = n * 30 * Math.PI / 180; return T((70 + 37 * Math.sin(a)).toFixed(1), (96 - 37 * Math.cos(a) + 6).toFixed(1), n, { fs: 18, c: DG_C.sub }); }).join('')}
          <line x1="70" y1="96" x2="70" y2="72" stroke="${DG_C.ink}" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="70" y1="96" x2="${(70 + 26 * Math.sin(210 * Math.PI / 180)).toFixed(1)}" y2="${(96 - 26 * Math.cos(210 * Math.PI / 180)).toFixed(1)}" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="round"/><circle cx="70" cy="96" r="4.5" fill="${DG_C.ink}"/></g>
        ${ROW([{ t: 'しちじ', k: '7시' }, { t: 'に', k: '에', f: DG_C.a, s: DG_C.c, c: DG_C.c, kc: DG_C.c }, { t: 'おきます', k: '일어나요', f: DG_C.b, c: DG_C.d }], 70, { x: 140 })}
        <line x1="20" y1="186" x2="460" y2="186" stroke="#e5e5ea" stroke-width="2"/>
        ${DAY.map(([t, k], i) => { const x = 20 + (i % 2) * 226, y = 202 + Math.floor(i / 2) * 68; return `<g class="d${i}">${BOX(x, y, 214, 60, { f: '#fff', s: LN, sw: 2, rx: 14 })}
          ${T(x + 107, y + 27, t, { ja: 1, fs: 20, fw: 800 })}${T(x + 107, y + 51, k, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4600, [['.ck', 200], ['.b0', 800], ['.b2', 1200], ['.b1', 1800, 500, -20], ...DAY.map((d, i) => ['.d' + i, 2700 + i * 350])]); }
    },

    'j5-09:2': {
      alt: '짝꿍 글자: 무엇을 하는지는 を(パンを たべます 빵을 먹어요), 어디로 가는지는 に(がっこうに いきます 학교에 가요), 어디에서 하는지는 で(こうえんで あそびます 공원에서 놀아요)',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${PT.map((p, i) => { const y = 42 + i * 86; return `<g class="r${i}">
          ${ROW([{ t: p.a }, { t: p.p, f: p.f, s: p.c, c: p.c }, { t: p.v }], y, { x: 16, fs: 22, h: 48, pad: 12, gap: 6, minw: 48, p: `p${i}_` })}
          ${T(16, y + 72, p.m, { a: 'start', fs: 18, c: DG_C.sub })}
          ${BOX(366, y + 6, 100, 36, { f: p.f, rx: 18 })}${T(416, y + 30, p.q, { fs: 18, fw: 800, c: p.c })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 4200, PT.flatMap((p, i) => [['.r' + i, 200 + i * 1200, 450], [`.p${i}_1`, 600 + i * 1200, 450, -18]])); }
    },

    'j5-09:3': {
      alt: 'たべ 뒤의 끝말만 바꾸면 뜻이 바뀌어요: たべます(먹어요), たべません(안 먹어요), たべました(먹었어요), 질문은 끝에 か를 붙여 たべますか(먹어요?)',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${CJ.map((c, i) => { const y = 42 + i * 64; return `<g class="c${i}">
          ${BOX(30, y, 88, 52, {})}${T(74, y + 36, 'たべ', { ja: 1, fs: 26 })}
          <g class="e${i}">${BOX(124, y, 126, 52, { f: c.f, s: c.c })}${T(187, y + 36, c.e.replace('か', `<tspan fill="${PUR}">か</tspan>`), { ja: 1, fs: 26, c: c.c === PUR ? DG_C.d : c.c })}</g>
          ${T(276, y + 34, c.k, { a: 'start', fs: 20, fw: 800, c: c.c })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 5400, e => CJ.forEach((c, i) => {
          const t = 200 + i * 1250;
          pop(el, '.c' + i, e, t, 400, 0);
          const f = dgEase(dgP(e, t + 300, 500)), g = el.querySelector('.e' + i);
          g.setAttribute('transform', `translate(${50 * (1 - f)},0)`); g.setAttribute('opacity', f);
        }));
      }
    },
  });
})();
