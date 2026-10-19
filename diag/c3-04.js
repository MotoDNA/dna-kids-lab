/* 3학년 중국어 · 병음의 앞소리 '성모'는 몇 개나 될까? (c3-04) */
(() => {
  const C = DG_C, RED = '#ff3b30', PUR = '#af52de', ZH = 'lang="zh-CN"';
  const TONGUE = '#ffc9c4';

  /* 입 옆모습 (왼쪽이 입술), 로컬 200x150 */
  const PAL = 'M30 66 Q40 62 46 60 Q52 54 62 50 Q110 34 150 44 Q170 50 180 64';
  const mouth = tongue => `
    <path d="${PAL} L196 64 L196 14 L64 14 Q30 16 30 66 Z" fill="#eef0f3"/>
    <path d="M196 14 V150" stroke="#d2d2d7" stroke-width="4" stroke-linecap="round"/>
    <path d="${tongue}" fill="${TONGUE}" stroke="${RED}" stroke-width="3" stroke-linejoin="round"/>
    <path d="${PAL}" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <rect x="27" y="66" width="10" height="16" rx="3" fill="#fff" stroke="${C.sub}" stroke-width="2"/>
    <rect x="27" y="98" width="10" height="14" rx="3" fill="#fff" stroke="${C.sub}" stroke-width="2"/>
    <ellipse cx="16" cy="64" rx="12" ry="9" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
    <ellipse cx="16" cy="116" rx="12" ry="9" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>`;
  const T_REST = 'M40 116 C38 104 46 98 60 96 C90 92 130 86 160 88 C176 90 184 102 186 120 L186 150 L56 150 Q42 140 40 116 Z';
  const T_FLAT = 'M40 116 C36 104 44 96 54 90 C70 66 96 50 124 50 C156 52 178 74 186 104 L186 150 L56 150 Q42 140 40 116 Z';
  const T_CURL = 'M40 118 C42 106 54 102 64 98 C62 84 64 64 74 56 C82 50 90 54 87 62 C83 70 80 80 90 90 C120 102 160 92 182 106 C187 120 187 140 186 150 L56 150 Q42 140 40 118 Z';

  /* 0: 소리 나는 자리 6묶음 (앞→뒤) */
  const G0 = [
    { k: '입술', l: 'b p m f', n: 4, col: PUR, p: [14, 90] },
    { k: '혀끝 앞니', l: 'z c s', n: 3, col: C.r, p: [44, 76] },
    { k: '혀끝', l: 'd t n l', n: 4, col: C.d, p: [56, 56] },
    { k: '혀를 만 소리', l: 'zh ch sh r', n: 4, col: RED, p: [80, 45] },
    { k: '혓바닥', l: 'j q x', n: 3, col: C.c, p: [116, 37] },
    { k: '혀뿌리', l: 'g k h', n: 3, col: C.ink, p: [166, 52] },
  ];
  const cum = G0.map((g, i) => G0.slice(0, i + 1).reduce((a, b) => a + b.n, 0));
  const gy = i => 92 + i * 42;

  /* 1: 휴지 실험 */
  const tissue = (x, y, bend) => `M${x} ${y} Q${x + bend * 0.4} ${y + 45} ${x + bend} ${y + 86}`;
  const P1 = [{ x: 0, l: 'b d g', k: '바람 약하게', bend: 4, col: C.d, n: 2 }, { x: 244, l: 'p t k', k: '바람 세게', bend: 50, col: RED, n: 3 }];

  /* 3: z + i + 4성 */
  const curve4 = (x, y, w, h) => `M${x} ${y} C${x + w * .4} ${y + h * .1} ${x + w * .75} ${y + h * .6} ${x + w} ${y + h}`;

  Object.assign(DIAG, {
    'c3-04:0': {
      alt: '입 옆모습에서 앞에서 뒤로 입술(b p m f), 혀끝 앞니(z c s), 혀끝(d t n l), 혀를 만 소리(zh ch sh r), 혓바닥(j q x), 혀뿌리(g k h) 자리를 색깔 점으로 표시하고, 모두 합쳐 성모가 21개임을 세는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <text x="16" y="44" fill="${C.ink}" font-size="24" font-weight="800">성모 <tspan class="cnt" fill="${C.d}">21</tspan>개</text>
        <g transform="translate(6,104) scale(0.98)">${mouth(T_REST)}
          ${G0.map((g, i) => `<circle class="pt${i}" cx="${g.p[0]}" cy="${g.p[1]}" r="7" fill="${g.col}" stroke="#fff" stroke-width="2.5"/>`).join('')}</g>
        ${G0.map((g, i) => `<g class="lg${i}">
          <circle cx="226" cy="${gy(i) - 7}" r="7" fill="${g.col}"/>
          <text x="240" y="${gy(i)}" fill="${g.col}" font-size="22" font-weight="800">${g.l}</text>
          <text x="464" y="${gy(i) - 1}" text-anchor="end" fill="${C.sub}" font-size="18" font-weight="700">${g.k}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          let shown = 0;
          G0.forEach((g, i) => {
            const st = 300 + i * 900, f = dgEase(dgP(e, st, 500));
            q('.pt' + i).setAttribute('opacity', f); q('.pt' + i).setAttribute('r', 3 + 4 * f);
            q('.lg' + i).setAttribute('opacity', f);
            if (e >= st) shown = cum[i];
          });
          q('.cnt').textContent = shown;
        });
      }
    },

    'c3-04:1': {
      alt: '입 앞에 휴지를 대고 b d g를 말하면 바람이 약해 휴지가 거의 움직이지 않고, p t k를 말하면 바람이 세서 휴지가 펄럭이는 그림. b와 p, d와 t, g와 k가 짝이에요',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${P1.map((p, i) => { const hx = p.x + 64, tx = p.x + 176; return `<g>
          <text x="${p.x + 16}" y="62" fill="${p.col}" font-size="26" font-weight="800">${p.l}</text>
          <text x="${p.x + 16}" y="88" fill="${C.sub}" font-size="18" font-weight="700">${p.k}</text>
          <circle cx="${hx}" cy="160" r="44" fill="${C.a}" fill-opacity=".6"/>
          <circle cx="${hx + 18}" cy="146" r="4" fill="${C.ink}"/>
          <ellipse cx="${hx + 38}" cy="176" rx="7" ry="6" fill="${C.ink}"/>
          <g class="air${i}" stroke="${p.col}" stroke-width="3.5" stroke-linecap="round" fill="none">
            ${Array.from({ length: p.n }, (_, k) => { const yy = 176 + (k - (p.n - 1) / 2) * 12, len = i ? 54 : 26; return `<path d="M${hx + 52} ${yy} h${len}"/>`; }).join('')}</g>
          <line x1="${tx - 16}" y1="120" x2="${tx + 16}" y2="120" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"/>
          <path class="ts${i}" d="${tissue(tx, 120, p.bend)}" fill="none" stroke="${C.b}" stroke-width="22" stroke-linecap="round"/>
        </g>`; }).join('')}
        <line x1="240" y1="40" x2="240" y2="230" stroke="#e5e5ea" stroke-width="2"/>
        <g class="pr">${[['b', 'p'], ['d', 't'], ['g', 'k']].map(([a, b], k) => { const x = 24 + k * 148; return `<rect x="${x}" y="244" width="136" height="44" rx="14" fill="#f5f5f7"/>
          <text x="${x + 68}" y="274" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800"><tspan fill="${C.d}">${a}</tspan> ↔ <tspan fill="${RED}">${b}</tspan></text>`; }).join('')}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          P1.forEach((p, i) => {
            const st = 400 + i * 2200, a = dgP(e, st, 600);
            q('.air' + i).setAttribute('opacity', a);
            q('.air' + i).setAttribute('transform', `translate(${-10 * (1 - a)},0)`);
            const f = dgEase(dgP(e, st + 200, 900)), wob = e < st + 1100 ? 0 : Math.sin((e - st - 1100) / 90) * 6 * (1 - dgP(e, st + 1100, 700));
            q('.ts' + i).setAttribute('d', tissue(p.x + 176, 120, 2 + (p.bend - 2) * f + (i ? wob : 0)));
          });
          q('.pr').setAttribute('opacity', dgP(e, 4800, 600));
        });
      }
    },

    'c3-04:2': {
      alt: '입속 옆모습 두 개: j q x는 혓바닥을 입천장 가까이 납작하게 대고(鸡 jī), zh ch sh r는 혀끝을 위로 말아 올려요(书 shū). j와 zh, q와 ch, x와 sh는 비슷해 보이지만 혀 모양이 달라요',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        ${[{ x: 16, t: T_FLAT, l: 'j q x', k: '혀를 납작하게', h: '鸡', py: 'jī', col: C.c },
           { x: 252, t: T_CURL, l: 'zh ch sh r', k: '혀끝을 말아 올려', h: '书', py: 'shū', col: RED }].map((p, i) => `<g class="p${i}">
          <text x="${p.x + 4}" y="58" fill="${p.col}" font-size="26" font-weight="800">${p.l}</text>
          <g transform="translate(${p.x},64)">${mouth(p.t)}</g>
          <text x="${p.x + 104}" y="246" text-anchor="middle" fill="${p.col}" font-size="20" font-weight="800">${p.k}</text>
          <text ${ZH} x="${p.x + 56}" y="300" fill="${C.ink}" font-size="32" font-weight="600">${p.h}</text>
          <text x="${p.x + 96}" y="297" fill="${C.ink}" font-size="22" font-weight="800">${p.py}</text>
        </g>`).join('')}
        <line x1="240" y1="40" x2="240" y2="316" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          [0, 1].forEach(i => {
            const f = dgEase(dgP(e, 300 + i * 2000, 700));
            q('.p' + i).setAttribute('opacity', f);
            q('.p' + i).setAttribute('transform', `translate(0,${12 * (1 - f)})`);
          });
        });
      }
    },

    'c3-04:3': {
      alt: '성모 카드 z와 운모 카드 i, 4성 카드를 이어 붙여 zì(字, 글자)를 만들고, 이때 i는 이가 아니라 으에 가깝게 소리 나서 쯔처럼 들린다는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="k0"><rect x="22" y="64" width="70" height="70" rx="16" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>
          <text x="57" y="112" text-anchor="middle" fill="${C.ink}" font-size="40" font-weight="800">z</text>
          <text x="57" y="160" text-anchor="middle" fill="${C.d}" font-size="18" font-weight="800">성모</text></g>
        <text class="o0" x="110" y="108" text-anchor="middle" fill="${C.sub}" font-size="28" font-weight="800">+</text>
        <g class="k1"><rect x="128" y="64" width="70" height="70" rx="16" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
          <text x="163" y="112" text-anchor="middle" fill="${C.ink}" font-size="40" font-weight="800">i</text>
          <text x="163" y="160" text-anchor="middle" fill="${C.c}" font-size="18" font-weight="800">운모</text></g>
        <text class="o1" x="216" y="108" text-anchor="middle" fill="${C.sub}" font-size="28" font-weight="800">+</text>
        <g class="k2"><rect x="234" y="64" width="70" height="70" rx="16" fill="#ffe0de" stroke="${RED}" stroke-width="2.5"/>
          <path d="${curve4(252, 82, 34, 34)}" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
          <text x="269" y="160" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">4성</text></g>
        <text class="o2" x="324" y="108" text-anchor="middle" fill="${C.sub}" font-size="28" font-weight="800">=</text>
        <g class="res"><rect x="344" y="56" width="116" height="86" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
          <text x="402" y="116" text-anchor="middle" fill="${C.ink}" font-size="46" font-weight="800">zì</text></g>
        <g class="mean"><rect x="24" y="190" width="432" height="92" rx="18" fill="#f5f5f7"/>
          <text ${ZH} x="78" y="256" text-anchor="middle" fill="${C.ink}" font-size="52" font-weight="600">字</text>
          <text x="128" y="236" fill="${C.sub}" font-size="18" font-weight="700">글자</text>
          <text x="128" y="266" fill="${C.ink}" font-size="24" font-weight="800">'쯔'</text>
          <text x="244" y="234" fill="${C.c}" font-size="20" font-weight="800">z·c·s 뒤의 i는</text>
          <text x="244" y="264" fill="${C.ink}" font-size="20" font-weight="800">'이' 아닌 '으' 소리</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          ['k0', 'o0', 'k1', 'o1', 'k2', 'o2'].forEach((c, i) => {
            const f = dgEase(dgP(e, 200 + i * 450, 450));
            q('.' + c).setAttribute('opacity', f);
            q('.' + c).setAttribute('transform', `translate(0,${-12 * (1 - f)})`);
          });
          const r = dgEase(dgP(e, 3000, 600));
          q('.res').setAttribute('opacity', r);
          q('.res').setAttribute('transform', `translate(402 99) scale(${0.7 + 0.3 * r}) translate(-402 -99)`);
          q('.mean').setAttribute('opacity', dgP(e, 4000, 600));
        });
      }
    },
  });
})();
