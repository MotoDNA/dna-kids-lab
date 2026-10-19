/* 6학년 중국어 · 화장실은 어디예요? 중국어로 장소 묻기 (c5-08) */
(() => {
  const ZH = 'lang="zh-CN"';
  const RED = '#ff3b30', GR = '#d6efdc';
  /* 성조 곡선: 5단계 음높이 상자(x,y,w,h) 안에 tone 1~4 */
  const TONE = { 1: [[0, 5], [1, 5]], 2: [[0, 3], [1, 5]], 3: [[0, 2], [.5, 1], [1, 4]], 4: [[0, 5], [1, 1]] };
  const toneD = (x, y, w, h, t) => {
    const p = TONE[t].map(([u, l]) => [x + u * w, y + (5 - l) / 4 * h]);
    if (t === 3) return `M${p[0][0]} ${p[0][1]} Q${p[1][0]} ${p[1][1] + h * .32} ${p[2][0]} ${p[2][1]}`;
    return `M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]}`;
  };
  const grid = (x, y, w, h) => [0, 1, 2, 3, 4].map(i => `<line x1="${x}" y1="${y + i * h / 4}" x2="${x + w}" y2="${y + i * h / 4}" stroke="#e5e5ea" stroke-width="1.5"/>`).join('');
  const draw = (path, f) => { path.setAttribute('stroke-dashoffset', 1 - f); path.setAttribute('opacity', f > 0 ? 1 : 0); };
  const blk = (x, y, w, h, fill, stroke) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;

  /* 3: 장소 아이콘 (0,0 중심, 약 ±24) */
  const ICON = {
    school: `<path d="M-26 22 V-6 L0 -20 L26 -6 V22 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><rect x="-7" y="6" width="14" height="16" fill="${DG_C.d}"/><line x1="0" y1="-20" x2="0" y2="-34" stroke="${DG_C.d}" stroke-width="3"/><path d="M0 -34 h12 v7 h-12" fill="${DG_C.c}"/>`,
    lib: `<path d="M0 -14 C-10 -20 -20 -20 -28 -16 V18 C-20 14 -10 14 0 20 C10 14 20 14 28 18 V-16 C20 -20 10 -20 0 -14 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5" stroke-linejoin="round"/><line x1="0" y1="-14" x2="0" y2="20" stroke="${DG_C.c}" stroke-width="3"/>`,
    hosp: `<rect x="-24" y="-22" width="48" height="44" rx="8" fill="#fff" stroke="${DG_C.r}" stroke-width="3.5"/><path d="M-6 -14 h12 v8 h8 v12 h-8 v8 h-12 v-8 h-8 v-12 h8 Z" fill="${DG_C.r}"/>`,
    mart: `<path d="M-30 -18 h9 l7 28 h28 l6 -20 h-38" fill="none" stroke="${DG_C.d}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="-14" y="-10" width="28" height="18" fill="${DG_C.b}"/><circle cx="-10" cy="18" r="4.5" fill="${DG_C.d}"/><circle cx="12" cy="18" r="4.5" fill="${DG_C.d}"/>`,
    home: `<path d="M-26 0 L0 -22 L26 0" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="-18" y="-2" width="36" height="24" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5"/><rect x="-5" y="8" width="10" height="14" fill="${DG_C.c}"/>`,
  };
  const PL = [
    { k: 'school', h: '学校', py: 'xuéxiào', m: '학교' },
    { k: 'lib', h: '图书馆', py: 'túshūguǎn', m: '도서관' },
    { k: 'hosp', h: '医院', py: 'yīyuàn', m: '병원' },
    { k: 'mart', h: '超市', py: 'chāoshì', m: '마트' },
    { k: 'home', h: '家', py: 'jiā', m: '집' },
  ];

  Object.assign(DIAG, {
    'c5-08:0': {
      alt: '찾는 장소 洗手间(화장실) 뒤에 在哪儿(어디에 있어요)을 붙이면 洗手间在哪儿? 이 되고, 장소를 学校로 바꾸면 学校在哪儿? 이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        <text x="110" y="22" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">찾는 장소</text>
        <text x="340" y="22" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">어디에 있어요?</text>
        <g class="pA">${blk(20, 40, 180, 84, DG_C.a, DG_C.c)}
          <text ${ZH} x="110" y="92" text-anchor="middle" fill="${DG_C.ink}" font-size="38" font-weight="700">洗手间</text></g>
        <g class="pB">${blk(230, 40, 220, 84, DG_C.b, DG_C.d)}
          <text ${ZH} x="340" y="92" text-anchor="middle" fill="${DG_C.ink}" font-size="38" font-weight="700">在哪儿？</text></g>
        <g class="lb1"><text x="110" y="156" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="700">xǐshǒujiān</text>
          <text x="110" y="182" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">화장실</text>
          <text x="340" y="156" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="700">zài nǎr</text>
          <text x="340" y="182" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">在 ~에 있다 · 哪儿 어디</text></g>
        <g class="sw"><line x1="20" y1="202" x2="460" y2="202" stroke="#e5e5ea" stroke-width="2"/>
          <rect x="20" y="214" width="104" height="44" rx="12" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2"/>
          <text ${ZH} x="72" y="244" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">学校</text>
          <text ${ZH} x="186" y="246" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">在哪儿？</text>
          <text x="352" y="245" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">학교는 어디예요?</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          q('.pA').setAttribute('opacity', dgP(e, 200, 500));
          const b = dgEase(dgP(e, 1000, 900));
          q('.pB').setAttribute('opacity', b);
          q('.pB').setAttribute('transform', `translate(${60 * (1 - b)},0)`);
          q('.lb1').setAttribute('opacity', dgP(e, 2100, 600));
          q('.sw').setAttribute('opacity', dgP(e, 3600, 700));
        });
      }
    },

    'c5-08:1': {
      alt: '哪儿(nǎr, 어디)은 내렸다 올리는 3성, 那儿(nàr, 저기)은 위에서 뚝 떨어지는 4성이라는 것을 성조 곡선으로 비교한 그림. 대답은 在那儿(저기에 있어요)',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${[{ h: '哪儿', py: 'nǎr', m: '어디?', t: 3, n: '3성 ↘↗', col: DG_C.d }, { h: '那儿', py: 'nàr', m: '저기', t: 4, n: '4성 ↘', col: DG_C.c }].map((w, i) => { const x = 20 + i * 240; return `
          <text ${ZH} x="${x + 100}" y="34" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="700">${w.h}</text>
          <text x="${x + 100}" y="66" text-anchor="middle" fill="${w.col}" font-size="24" font-weight="800">${w.py} <tspan fill="${DG_C.sub}" font-size="20" font-weight="700">${w.m}</tspan></text>
          <rect x="${x + 20}" y="80" width="160" height="110" rx="12" fill="#f5f5f7"/>
          ${grid(x + 40, 92, 120, 86)}
          <path class="tc${i}" d="${toneD(x + 44, 92, 112, 86, w.t)}" pathLength="1" stroke-dasharray="1 1" fill="none" stroke="${w.col}" stroke-width="7" stroke-linecap="round"/>
          <text class="tn${i}" x="${x + 100}" y="222" text-anchor="middle" fill="${w.col}" font-size="22" font-weight="800">${w.n}</text>`; }).join('')}
        <line x1="240" y1="10" x2="240" y2="230" stroke="#e5e5ea" stroke-width="2"/>
        <g class="ans"><rect x="70" y="240" width="340" height="40" rx="20" fill="${DG_C.a}" fill-opacity=".6"/>
          <text x="240" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">대답: <tspan ${ZH} font-size="22">在那儿。</tspan> 저기에 있어요</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1].forEach(i => {
            draw(q('.tc' + i), dgEase(dgP(e, 400 + i * 1600, 1000)));
            q('.tn' + i).setAttribute('opacity', e > 1400 + i * 1600 ? 1 : 0);
          });
          q('.ans').setAttribute('opacity', dgP(e, 4000, 600));
        });
      }
    },

    'c5-08:2': {
      alt: '학교 건물 옆에 마트가 있는 그림과 함께, 超市(마트) 在 学校(학교) 旁边(옆)의 순서로 "마트는 학교 옆에 있어요"를 말하는 블록 그림. 前边은 앞, 后边은 뒤',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,40)">
        <line x1="20" y1="122" x2="460" y2="122" stroke="#d2d2d7" stroke-width="3"/>
        <g transform="translate(150,0)">
          <path d="M0 122 V40 L60 10 L120 40 V122 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="4" stroke-linejoin="round"/>
          <rect x="46" y="84" width="28" height="38" fill="${DG_C.d}"/>
          <rect x="18" y="52" width="22" height="20" rx="3" fill="#fff"/><rect x="80" y="52" width="22" height="20" rx="3" fill="#fff"/>
          <text ${ZH} x="60" y="150" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">学校</text>
        </g>
        <g class="mart"><g transform="translate(296,0)">
          <rect x="0" y="62" width="84" height="60" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4" stroke-linejoin="round"/>
          <path d="M-6 62 h96 l-8 -18 h-80 Z" fill="${DG_C.c}"/>
          <rect x="30" y="88" width="24" height="34" fill="${DG_C.c}"/>
          <text ${ZH} x="42" y="150" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">超市</text>
        </g></g>
        <g class="side"><path d="M276 92 h12 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <text ${ZH} x="420" y="40" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">旁边</text>
          <text x="420" y="64" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="700">옆</text></g>
        ${[{ h: '超市', m: '마트는', f: DG_C.a, s: DG_C.c, w: 96 }, { h: '在', m: '있어요', f: '#f5f5f7', s: '#d2d2d7', w: 60 }, { h: '学校', m: '학교', f: DG_C.b, s: DG_C.d, w: 96 }, { h: '旁边', m: '옆에', f: GR, s: DG_C.r, w: 96 }].map((b, i, A) => {
          const x = 36 + A.slice(0, i).reduce((s, a) => s + a.w + 14, 0);
          return `<g class="bk${i}">${blk(x, 176, b.w, 54, b.f, b.s)}
            <text ${ZH} x="${x + b.w / 2}" y="213" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="700">${b.h}</text>
            <text x="${x + b.w / 2}" y="258" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${b.m}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          const m = dgEase(dgP(e, 300, 800));
          q('.mart').setAttribute('opacity', m);
          q('.mart').setAttribute('transform', `translate(${40 * (1 - m)},0)`);
          q('.side').setAttribute('opacity', dgP(e, 1200, 500));
          [0, 1, 2, 3].forEach(i => {
            const f = dgEase(dgP(e, 2000 + i * 700, 500));
            q('.bk' + i).setAttribute('opacity', f);
            q('.bk' + i).setAttribute('transform', `translate(0,${20 * (1 - f)})`);
          });
        });
      }
    },

    'c5-08:3': {
      alt: '장소 낱말 카드: 学校(xuéxiào) 학교, 图书馆(túshūguǎn) 도서관, 医院(yīyuàn) 병원, 超市(chāoshì) 마트, 家(jiā) 집',
      svg: `<svg viewBox="0 0 480 376" class="dg-svg" role="img"><g transform="translate(0,38)">
        ${PL.map((p, i) => { const x = i < 3 ? 10 + i * 156 : 88 + (i - 3) * 156, y = i < 3 ? 0 : 166; return `<g class="cd${i}">
          <rect x="${x}" y="${y}" width="148" height="158" rx="16" fill="#f5f5f7"/>
          <g transform="translate(${x + 74},${y + 46})">${ICON[p.k]}</g>
          <text ${ZH} x="${x + 74}" y="${y + 104}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="700">${p.h}</text>
          <text x="${x + 74}" y="${y + 128}" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">${p.py}</text>
          <text x="${x + 74}" y="${y + 151}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${p.m}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          PL.forEach((p, i) => {
            const f = dgEase(dgP(e, 200 + i * 700, 600));
            q('.cd' + i).setAttribute('opacity', f);
            q('.cd' + i).setAttribute('transform', `translate(0,${16 * (1 - f)})`);
          });
        });
      }
    },
  });
})();
