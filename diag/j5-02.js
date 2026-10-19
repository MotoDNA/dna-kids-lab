/* 5학년 일본어 · '이것', '그것', '저것'은 일본어로 뭐라고 할까? (j5-02) */
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
  const BALL = (cx, cy, r, col, f) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${col}" stroke-width="3"/><path d="M${cx - r} ${cy} Q${cx} ${cy - r * .5} ${cx + r} ${cy}" fill="none" stroke="${col}" stroke-width="2.5"/>`;
  const PEN = (cx, cy) => `<g transform="translate(${cx},${cy})"><rect x="-42" y="-8" width="64" height="16" rx="4" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/><rect x="-42" y="-8" width="24" height="16" rx="4" fill="${DG_C.d}"/><path d="M-30 -8 V-13 H-6" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/><path d="M22 -6 L36 0 L22 6 Z" fill="${DG_C.ink}" stroke="${DG_C.ink}" stroke-width="2" stroke-linejoin="round"/></g>`;
  const PENCIL = (cx, cy, rot = 0) => `<g transform="translate(${cx},${cy}) rotate(${rot})"><rect x="-34" y="-8" width="54" height="16" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/><rect x="-42" y="-8" width="9" height="16" rx="3" fill="#ffb3ad" stroke="${RED}" stroke-width="2.5"/><path d="M20 -8 L38 0 L20 8 Z" fill="#fff" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/><path d="M32 -3 L38 0 L32 3 Z" fill="${DG_C.ink}"/></g>`;
  const OK = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${DG_C.r}" stroke-width="4.5"/>`;
  const NO = (cx, cy) => `<path d="M${cx - 12} ${cy - 12} L${cx + 12} ${cy + 12} M${cx + 12} ${cy - 12} L${cx - 12} ${cy + 12}" stroke="${RED}" stroke-width="4.5" stroke-linecap="round"/>`;
  const W4 = [['これ', '이것', 'この', 'ほん', '이 책'], ['それ', '그것', 'その', 'ほん', '그 책'], ['あれ', '저것', 'あの', 'いぬ', '저 개']];
  const C4 = [DG_C.d, DG_C.c, DG_C.r];

  Object.assign(DIAG, {
    'j5-02:0': {
      alt: '내 가까이에 있는 공은 これ(이것), 친구 가까이에 있는 공은 それ(그것), 둘 다에게서 멀리 있는 공은 あれ(저것), 어느 것인지 물을 때는 どれ(어느 것)라고 하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">
        <line x1="10" y1="246" x2="470" y2="246" stroke="#e5e5ea" stroke-width="3"/>
        <ellipse class="z0" cx="112" cy="232" rx="82" ry="30" fill="${DG_C.b}" fill-opacity=".35" stroke="${DG_C.d}" stroke-width="2" stroke-dasharray="6 6"/>
        <ellipse class="z1" cx="368" cy="232" rx="82" ry="30" fill="${DG_C.a}" fill-opacity=".35" stroke="${DG_C.c}" stroke-width="2" stroke-dasharray="6 6"/>
        ${KID(64, 150, DG_C.d, DG_C.b)}${KID(416, 150, DG_C.c, DG_C.a)}
        ${T(64, 290, '나', { fs: 18, c: DG_C.d })}${T(416, 290, '친구', { fs: 18, c: DG_C.c })}
        <g class="o0">${BALL(146, 228, 15, DG_C.d, DG_C.b)}${T(146, 196, 'これ', { ja: 1, fs: 26, fw: 800, c: DG_C.d })}${T(146, 290, '이것', { fs: 18, c: DG_C.d })}</g>
        <g class="o1">${BALL(334, 228, 15, DG_C.c, DG_C.a)}${T(334, 196, 'それ', { ja: 1, fs: 26, fw: 800, c: DG_C.c })}${T(334, 290, '그것', { fs: 18, c: DG_C.c })}</g>
        <g class="o2"><path d="M180 112 L300 112" stroke="#e5e5ea" stroke-width="3"/>${BALL(240, 100, 10, DG_C.r, GF)}
          ${T(240, 66, 'あれ', { ja: 1, fs: 26, fw: 800, c: DG_C.r })}${T(240, 140, '저것 (멀리)', { fs: 18, c: DG_C.r })}</g>
        <g class="o3">${T(206, 322, 'どれ?', { ja: 1, fs: 22, fw: 800, c: PUR })}${T(276, 322, '어느 것', { fs: 18, c: PUR })}</g>
      </svg>`,
      play(el) { SEQ(el, 5000, [['.z0', 300, 500, 0], ['.o0', 600], ['.z1', 1600, 500, 0], ['.o1', 1900], ['.o2', 3000, 500, 20], ['.o3', 4100]]); }
    },

    'j5-02:1': {
      alt: 'これは なんですか를 これ(이것) は(은) なん(무엇) です(이에요) か(질문) 블록으로 나누고, 끝의 か가 질문을 만들며 말할 때 끝을 살짝 올린다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${ROW([{ t: 'これ', k: '이것' }, { t: 'は', k: '은', r: 'wa', rc: DG_C.d }, { t: 'なん', k: '무엇', f: DG_C.b, c: DG_C.d }, { t: 'です', k: '이에요' }, { t: 'か。', k: '?', f: '#efdcf7', s: PUR, c: PUR, kc: PUR, r: '질문!', rc: PUR }], 70, { fs: 26, h: 56, gap: 8, minw: 64 })}
        <g class="up"><path d="M300 212 Q360 214 390 186" fill="none" stroke="${PUR}" stroke-width="3.5" stroke-linecap="round"/>${ARR(384, 192, 392, 183, PUR, 3.5)}
          ${T(300, 240, '끝을 살짝 올려요', { fs: 18, c: PUR })}</g>
        ${T(120, 240, '이것은 무엇이에요?', { fs: 20, fw: 800, cls: 'mean' })}
      </svg>`,
      play(el) { SEQ(el, 4800, [...[0, 1, 2, 3].map(i => ['.b' + i, 200 + i * 450]), ['.b4', 2300, 500, -18], ['.up', 3200, 500, 0], ['.mean', 3900]]); }
    },

    'j5-02:2': {
      alt: '연필이 B의 손 가까이에 있을 때, A는 それは なんですか(그건 뭐예요?)라고 묻고 B는 자기 가까이에 있으니 これは えんぴつです(이건 연필이에요)라고 대답하는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <ellipse class="zb" cx="372" cy="246" rx="96" ry="34" fill="${DG_C.b}" fill-opacity=".35" stroke="${DG_C.d}" stroke-width="2" stroke-dasharray="6 6"/>
        ${KID(70, 180, DG_C.c, DG_C.a)}${KID(410, 180, DG_C.d, DG_C.b)}
        ${T(70, 262, 'A', { fs: 22, fw: 800, c: DG_C.c })}${T(410, 262, 'B', { fs: 22, fw: 800, c: DG_C.d })}
        ${PENCIL(342, 246, -20)}
        <g class="pt"><path d="M104 236 Q210 200 296 238" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round"/>${ARR(286, 232, 298, 239, DG_C.c, 3)}</g>
        <g class="qa">${BUB(14, 52, 214, 48, { tx: 70, s: DG_C.c })}${T(121, 83, `<tspan fill="${DG_C.c}" font-weight="800">それ</tspan>は なんですか。`, { ja: 1, fs: 20 })}</g>
        <g class="qb">${BUB(244, 112, 228, 48, { tx: 410, s: DG_C.d })}${T(358, 143, `<tspan fill="${DG_C.d}" font-weight="800">これ</tspan>は えんぴつです。`, { ja: 1, fs: 20 })}</g>
        <g class="la">${T(76, 304, 'A: 상대 쪽 → それ', { fs: 18, c: DG_C.c, a: 'start' })}${T(470, 304, 'B: 내 쪽 → これ', { fs: 18, c: DG_C.d, a: 'end' })}</g>
      </svg>`,
      play(el) { SEQ(el, 5200, [['.pt', 400, 500, 0], ['.qa', 900], ['.zb', 2300, 500, 0], ['.qb', 2700], ['.la', 4000]]); }
    },

    'j5-02:3': {
      alt: 'これは ペンですか(이것은 펜이에요?)라는 질문에, 정말 펜이면 はい、そうです(네, 그래요), 연필이면 いいえ、ちがいます。えんぴつです(아니요, 달라요. 연필이에요)라고 대답하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="q">${BUB(130, 40, 220, 48, { tx: 240, s: LN })}${T(240, 71, 'これは ペンですか。', { ja: 1, fs: 20, fw: 800 })}</g>
        <g class="l">${ARR(200, 108, 140, 132, DG_C.r, 3)}${BOX(14, 136, 216, 152, { f: '#fff', s: DG_C.r, sw: 2.5, rx: 18 })}
          ${PEN(72, 172)}${T(142, 178, 'ペン', { ja: 1, fs: 18, c: DG_C.d })}${OK(206, 160)}
          ${T(122, 230, 'はい、そうです。', { ja: 1, fs: 20, fw: 800, c: DG_C.r })}${T(122, 262, '네, 그래요.', { fs: 18, c: DG_C.sub })}</g>
        <g class="r">${ARR(280, 108, 340, 132, RED, 3)}${BOX(250, 136, 216, 152, { f: '#fff', s: RED, sw: 2.5, rx: 18 })}
          ${PENCIL(298, 172)}${T(376, 178, 'えんぴつ', { ja: 1, fs: 18, c: DG_C.c })}${NO(444, 158)}
          ${T(358, 224, 'いいえ、ちがいます。', { ja: 1, fs: 20, fw: 800, c: RED })}${T(358, 252, 'えんぴつです。', { ja: 1, fs: 18, fw: 700 })}${T(358, 278, '아니요, 달라요.', { fs: 18, c: DG_C.sub })}</g>
      </svg>`,
      play(el) { SEQ(el, 4400, [['.q', 200], ['.l', 1200, 500, 14], ['.r', 2600, 500, 14]]); }
    },

    'j5-02:4': {
      alt: 'これ・それ・あれ는 혼자 쓰고, この・その・あの는 뒤에 물건 이름이 와서 このほん(이 책), そのほん(그 책), あのいぬ(저 개)가 되는 것을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 304" class="dg-svg" role="img">
        ${T(60, 52, '혼자 써요', { fs: 18, c: DG_C.sub })}${T(297, 52, '+ 물건 이름', { fs: 18, c: DG_C.sub })}
        <line x1="198" y1="66" x2="198" y2="290" stroke="#e5e5ea" stroke-width="2"/>
        ${W4.map(([a, ak, b, n, bk], i) => { const y = 70 + i * 76, c = C4[i]; return `
          <g class="a${i}">${BOX(20, y, 80, 52, { f: '#fff', s: c })}${T(60, y + 35, a, { ja: 1, fs: 24, c })}${T(150, y + 34, ak, { fs: 20 })}</g>
          <g class="c${i}">${BOX(214, y, 80, 52, { f: '#fff', s: c })}${T(254, y + 35, b, { ja: 1, fs: 24, c })}</g>
          <g class="n${i}">${BOX(300, y, 80, 52, { f: LG })}${T(340, y + 35, n, { ja: 1, fs: 24 })}</g>
          ${T(428, y + 34, bk, { fs: 20, cls: 'k' + i })}`; }).join('')}
      </svg>`,
      play(el) {
        const steps = [];
        W4.forEach((w, i) => steps.push(['.a' + i, 200 + i * 350]));
        W4.forEach((w, i) => { const t = 1500 + i * 1000; steps.push(['.c' + i, t], ['.k' + i, t + 600, 400, 0]); });
        SEQ(el, 5200, steps, e => W4.forEach((w, i) => { const f = dgEase(dgP(e, 1800 + i * 1000, 500)); const n = el.querySelector('.n' + i); n.setAttribute('opacity', f); n.setAttribute('transform', `translate(${40 * (1 - f)},0)`); }));
      }
    },
  });
})();
