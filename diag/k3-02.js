/* 3학년 국어 · 이 문단에서 가장 중요한 문장은 어디 있을까? (k3-02) */
(() => {
  const C = DG_C, RED = '#ff3b30', PU = '#af52de', LG = '#e5e5ea', BG = '#f5f5f7', GN = '#d6efdc';
  // 글자 폭 어림(한글 1em)
  const tw = (s, fs = 20) => [...String(s)].reduce((w, ch) => w + fs * (/[가-힣]/.test(ch) ? .865 : /[ㄱ-ㅣ]/.test(ch) ? .95 : ch === ' ' ? .23 : /[.,'‘’:;]/.test(ch) ? .28 : /[!]/.test(ch) ? .31 : /[()\[\]]/.test(ch) ? .39 : /[-]/.test(ch) ? .45 : /[“”]/.test(ch) ? .49 : /[?]/.test(ch) ? .54 : /[0-9]/.test(ch) ? .47 : /[a-z]/.test(ch) ? .56 : ch === '→' ? .92 : ch === '○' ? 1 : .66), 0);
  const tx = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || C.ink}" font-size="${o.fs || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const box = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || '#fff'}" stroke="${o.s || '#d2d2d7'}" stroke-width="${o.sw ?? 2}"${o.da ? ` stroke-dasharray="${o.da}"` : ''}/>`;
  // 글자 카드 (가운데 cx, cy)
  const card = (cx, cy, s, o = {}) => { const fs = o.fs || 20, w = o.w || tw(o.m || s, fs) + (o.px ?? 28), h = o.h || fs + 22; return box(cx - w / 2, cy - h / 2, w, h, o) + tx(cx, cy + fs * .36, s, { fs, c: o.c, w: o.fw || 800 }); };
  const cw = (s, fs = 20, px = 28) => tw(s, fs) + px;
  // 등장 묶음: t 에 나타남, dx/dy 만큼 떨어진 곳에서 미끄러져 옴
  const g = (t, inner, o = {}) => `<g data-t="${t}"${o.d ? ` data-d="${o.d}"` : ''}${o.dx ? ` data-dx="${o.dx}"` : ''}${o.dy ? ` data-dy="${o.dy}"` : ''}${o.o ? ` data-o="${o.o}"` : ''}>${inner}</g>`;
  const arrow = (x1, y1, x2, y2, col = C.sub, sw = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 10, p = k => `${(x2 - L * Math.cos(a + k)).toFixed(1)} ${(y2 - L * Math.sin(a + k)).toFixed(1)}`; return `<path d="M${x1} ${y1} L${x2} ${y2} M${p(.55)} L${x2} ${y2} L${p(-.55)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const ok = (cx, cy, r = 11, col = C.r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="3.5"/>`;
  const no = (cx, cy, r = 9, col = RED) => `<path d="M${cx - r} ${cy - r} L${cx + r} ${cy + r} M${cx + r} ${cy - r} L${cx - r} ${cy + r}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;
  const chk = (cx, cy, col = C.r, k = 1) => `<path d="M${cx - 9 * k} ${cy} l${6 * k} ${7 * k} l${12 * k} ${-14 * k}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  // 얼굴: mood 1 웃음, 0 보통, -1 찡그림
  const face = (cx, cy, r, mood, col = C.c, fill = C.a) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <circle cx="${cx - r * .35}" cy="${cy - r * .2}" r="${Math.max(2.2, r * .09)}" fill="${C.ink}"/><circle cx="${cx + r * .35}" cy="${cy - r * .2}" r="${Math.max(2.2, r * .09)}" fill="${C.ink}"/>
    <path d="M${cx - r * .4} ${cy + r * .32 - mood * r * .08} Q${cx} ${cy + r * .32 + mood * r * .3} ${cx + r * .4} ${cy + r * .32 - mood * r * .08}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
  // 사람(아주 단순): 발바닥 by, 크기 k
  const person = (cx, by, k = 1, col = C.d, fill = C.b) => `<circle cx="${cx}" cy="${by - 78 * k}" r="${15 * k}" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <path d="M${cx - 20 * k} ${by} V${by - 40 * k} Q${cx - 20 * k} ${by - 58 * k} ${cx} ${by - 58 * k} Q${cx + 20 * k} ${by - 58 * k} ${cx + 20 * k} ${by - 40 * k} V${by} Z" fill="${fill}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/>`;
  // 말풍선: 꼬리 아래(tx 위치) 또는 side:'l'/'r'
  const bubble = (cx, cy, s, o = {}) => {
    const fs = o.fs || 22, w = o.w || tw(s, fs) + 32, h = fs + 24, x0 = cx - w / 2, y0 = cy - h / 2, x1 = cx + w / 2, y1 = cy + h / 2, r = 14, t = o.tx ?? cx;
    let d;
    if (o.side === 'l') d = `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${cy + 8} L${x0 - 13} ${cy} L${x0} ${cy - 8} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
    else if (o.side === 'r') d = `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${cy - 8} L${x1 + 13} ${cy} L${x1} ${cy + 8} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
    else d = `M${x0 + r} ${y0} H${x1 - r} Q${x1} ${y0} ${x1} ${y0 + r} V${y1 - r} Q${x1} ${y1} ${x1 - r} ${y1} H${t + 9} L${t} ${y1 + 13} L${t - 9} ${y1} H${x0 + r} Q${x0} ${y1} ${x0} ${y1 - r} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} Z`;
    return `<path d="${d}" fill="${o.f || '#fff'}" stroke="${o.s || C.d}" stroke-width="2.5" stroke-linejoin="round"/>` + tx(cx, cy + fs * .36, s, { fs, c: o.c || C.ink, w: 800 });
  };
  const play = total => function (el) {
    const qa = s => [...el.querySelectorAll(s)];
    dgAnim(el, total, e => qa('[data-t]').forEach(n => {
      const f = dgEase(dgP(e, +n.dataset.t, +(n.dataset.d || 500)));
      const out = n.dataset.o ? 1 - dgP(e, +n.dataset.o, 400) : 1;
      n.setAttribute('opacity', Math.min(1, f * 1.5) * out);
      if (n.dataset.dx || n.dataset.dy) n.setAttribute('transform', `translate(${((1 - f) * (n.dataset.dx || 0)).toFixed(1)},${((1 - f) * (n.dataset.dy || 0)).toFixed(1)})`);
    }));
  };
  const SV = (h, inner) => `<svg viewBox="0 0 480 ${h}" class="dg-svg" role="img">${inner}</svg>`;

  /* 0: 공책 — 문단마다 첫 줄 들여쓰기 */
  const PARA = [3, 3, 2], PX = 120, PW = 330;
  let rows = '', y = 62, tag = '';
  PARA.forEach((n, k) => {
    const y0 = y, t = 300 + k * 900;
    let ln = '';
    for (let j = 0; j < n; j++) {
      const ind = j === 0 ? 30 : 0, w = j === n - 1 ? PW * (0.55 + 0.12 * k) - ind : PW - ind;
      ln += `<rect x="${PX + ind}" y="${y - 6}" width="${w}" height="12" rx="6" fill="${[C.b, C.a, GN][k]}"/>`;
      y += 23;
    }
    rows += g(t, ln + tx(70, (y0 + y - 23) / 2 + 7, `문단 ${k + 1}`, { fs: 18, c: C.sub }), { dx: -16 });
    tag += g(3200 + k * 250, `<rect x="${PX + 2}" y="${y0 - 11}" width="24" height="22" rx="4" fill="none" stroke="${C.c}" stroke-width="3"/>`);
    y += 14;
  });

  /* 1: 지붕과 기둥 */
  const PIL = [['먹이를 찾으면', '동료에게', '알려 줘요'], ['무거운 먹이는', '여럿이 함께', '옮겨요'], ['집을 지킬 때도', '힘을 모아요']];

  /* 2: 계절 꽃 문단 */
  const S2 = ['봄에는 진달래가 피어요.', '여름에는 해바라기가 피어요.', '가을에는 국화가 피어요.', '이처럼 계절마다 피는 꽃이 달라요.'];
  /* 3: 물 문단 */
  const S3 = ['우리 몸에 물은 꼭 필요해요.', '물은 몸속 찌꺼기를 내보내요.', '땀을 흘려 체온을 맞춰 줘요.'];
  const sbox = (x, y, s, o = {}) => { const w = tw(s, 20) + 28; return box(x, y - 21, w, 42, { f: o.f || BG, s: o.s || BG, rx: 10 }) + tx(x + 14, y + 7, s, { a: 'start', fs: 20, c: o.c }); };

  Object.assign(DIAG, {
    'k3-02:0': {
      alt: '글 한 편이 문단 세 개로 되어 있고, 문단마다 첫 줄의 첫 칸을 한 칸 비워 들여 쓴 모습을 보여 주는 공책 그림',
      svg: SV(320, `
        <rect x="100" y="36" width="368" height="238" rx="14" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
        ${rows}${tag}
        ${g(3900, `${tx(PX + 2, 306, '첫 칸 비우기 = 새 문단 시작', { a: 'start', fs: 20, c: C.c, w: 800 })}`)}
      `),
      play: play(4600),
    },

    'k3-02:1': {
      alt: '중심 문장 개미는 서로 도우며 살아가요가 지붕이고, 먹이를 알려 주고, 함께 옮기고, 힘을 모아 집을 지킨다는 뒷받침 문장 세 개가 기둥처럼 받치고 있는 집 그림',
      svg: SV(320, `
        <line x1="10" y1="268" x2="470" y2="268" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"/>
        ${PIL.map((p, i) => { const cx = 92 + i * 148; return g(300 + i * 700, `
          <rect x="${cx - 68}" y="140" width="136" height="126" rx="10" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>
          ${p.map((l, j) => tx(cx, 176 + j * 28 + (p.length === 2 ? 14 : 0), l, { fs: 18, c: C.ink })).join('')}`, { dy: 40 }); }).join('')}
        ${g(2600, `<path d="M14 132 L466 132 L376 56 L104 56 Z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
          ${tx(240, 105, '개미는 서로 도우며 살아가요.', { fs: 22, w: 800 })}`, { dy: -40, d: 700 })}
        ${g(3500, `${tx(16, 40, '중심 문장 = 지붕', { a: 'start', fs: 20, c: C.c, w: 800 })}
          ${tx(240, 302, '뒷받침 문장 = 기둥', { fs: 20, c: C.d, w: 800 })}`)}
      `),
      play: play(4200),
    },

    'k3-02:2': {
      alt: '봄 진달래, 여름 해바라기, 가을 국화 문장 세 개를 마지막 문장 이처럼 계절마다 피는 꽃이 달라요가 정리하므로 이 문단은 끝에 중심 문장이 있음을 보여 주는 그림',
      svg: SV(310, `
        ${S2.slice(0, 3).map((s, i) => g(300 + i * 700, sbox(24, 50 + i * 54, s), { dx: -16 })).join('')}
        ${g(2500, `<path d="M300 32 H312 V170 H300" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M312 101 H352 Q372 101 372 121 V218 Q372 238 352 238 H340" fill="none" stroke="${C.sub}" stroke-width="3"/>
          ${arrow(352, 238, 332, 238, C.sub, 3)}${tx(384, 176, '정리', { a: 'start', fs: 18, c: C.sub })}`)}
        ${g(3200, `${sbox(24, 238, S2[3], { f: C.a, s: C.c })}`, { dy: 14 })}
        ${g(3900, `${card(100, 288, '중심 문장 (끝)', { fs: 18, f: C.c, s: C.c, c: '#fff', h: 34 })}`)}
      `),
      play: play(4600),
    },

    'k3-02:3': {
      alt: '물 문단에서 다른 두 문장이 공통으로 설명하는 첫 문장을 찾고, 그 문장을 빼면 무엇에 대한 글인지 알기 어려운 것을 확인해 우리 몸에 물은 꼭 필요해요를 중심 문장으로 찾는 그림',
      svg: SV(320, `
        ${S3.map((s, i) => g(300 + i * 500, sbox(70, 64 + i * 64, s), { dx: -12 })).join('')}
        ${g(5000, `<rect x="70" y="43" width="${tw(S3[0], 20) + 28}" height="42" rx="10" fill="${C.a}"/>${tx(84, 71, S3[0], { a: 'start', fs: 20, w: 800 })}
          <line x1="84" y1="80" x2="${84 + tw(S3[0], 20)}" y2="80" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>`)}
        ${g(2000, `<path d="M64 128 Q34 128 34 96 Q34 64 58 64" fill="none" stroke="${C.d}" stroke-width="3"/>${arrow(52, 64, 62, 64, C.d, 3)}
          <path d="M64 192 Q14 192 14 128 Q14 64 58 66" fill="none" stroke="${C.d}" stroke-width="3"/>`)}
        ${g(3400, `<rect x="66" y="40" width="${tw(S3[0], 20) + 36}" height="48" rx="10" fill="#fff" stroke="${C.sub}" stroke-width="2.5" stroke-dasharray="6 5"/>
          ${tx(70 + (tw(S3[0], 20) + 28) / 2, 74, '?', { fs: 28, c: RED, w: 800 })}`, { o: 4700 })}
        ${g(5200, card(70 + tw(S3[0], 20) + 28 + 58, 64, '중심 문장', { fs: 18, f: C.c, s: C.c, c: '#fff', h: 34 }), { dx: -12 })}
        ${['① 끝까지 읽기', '② 공통점 찾기', '③ 빼 보기'].map((s, i) => g([300, 2000, 3400][i], card(82 + i * 158, 284, s, { fs: 18, w: 144, h: 40, f: '#fff', s: [C.sub, C.d, C.c][i], c: [C.ink, C.d, C.c][i] }))).join('')}
      `),
      play: play(6000),
    },
  });
})();
