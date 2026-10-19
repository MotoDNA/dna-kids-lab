/* 4학년 과학 · 자석은 어떤 물체를 끌어당길까? (s3-02) */
(() => {
  const f2 = n => +n.toFixed(2);
  const RED = '#ff3b30', BLU = DG_C.d, IRON = '#8e8e93', SILVER = '#d1d1d6';
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  // 막대자석: 중심 0,0, 길이 L, 높이 H, 왼쪽 극 이름 lp
  const bar = (L, H, lp, fs = 22) => {
    const rp = lp === 'N' ? 'S' : 'N', col = p => p === 'N' ? RED : BLU;
    return `<rect x="${-L / 2}" y="${-H / 2}" width="${L / 2}" height="${H}" fill="${col(lp)}"/>
      <rect x="0" y="${-H / 2}" width="${L / 2}" height="${H}" fill="${col(rp)}"/>
      <text x="${-L / 4}" y="${fs * 0.36}" text-anchor="middle" fill="#fff" font-size="${fs}" font-weight="800">${lp}</text>
      <text x="${L / 4}" y="${fs * 0.36}" text-anchor="middle" fill="#fff" font-size="${fs}" font-weight="800">${rp}</text>`;
  };
  // 말굽자석 (아래로 열린 U), 중심 위쪽 0,0
  const horse = `<path d="M-34 40 V0 A34 34 0 0 1 34 0 V40" fill="none" stroke="${SILVER}" stroke-width="22"/>
    <rect x="-45" y="22" width="22" height="22" fill="${RED}"/><rect x="23" y="22" width="22" height="22" fill="${BLU}"/>
    <text x="-34" y="40" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">N</text>
    <text x="34" y="40" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">S</text>`;
  // 클립 하나 (중심 0,0, 세로)
  const clip = (s = 1, col = IRON) => `<path transform="scale(${s})" d="M-4 8 V-8 a4 4 0 0 1 8 0 V10 a6 6 0 0 1 -12 0 V-11 a8 8 0 0 1 16 0 V6" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`;

  /* 0: 붙는 물체 / 안 붙는 물체 */
  const ICON = {
    '클립': `<g transform="rotate(90)">${clip(1.3)}</g>`,
    '철 못': `<path d="M-22 0 H18 L24 0" stroke="${IRON}" stroke-width="4" stroke-linecap="round"/><path d="M-22 -8 V8" stroke="${IRON}" stroke-width="5" stroke-linecap="round"/><path d="M18 -2 L26 0 L18 2 Z" fill="${IRON}"/>`,
    '철 숟가락': `<ellipse cx="-14" cy="0" rx="11" ry="8" fill="${SILVER}" stroke="${IRON}" stroke-width="2.5"/><path d="M-3 0 H26" stroke="${IRON}" stroke-width="5" stroke-linecap="round"/>`,
    '지우개': `<rect x="-20" y="-10" width="40" height="20" rx="3" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5"/><rect x="2" y="-10" width="18" height="20" fill="${DG_C.b}" stroke="${DG_C.sub}" stroke-width="2.5"/>`,
    '연필': `<path d="M-24 -6 H14 L26 0 L14 6 H-24 Z" fill="#ffd60a" stroke="${DG_C.c}" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 -6 L26 0 L14 6 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2"/><path d="M22 -2 L26 0 L22 2 Z" fill="${DG_C.ink}"/>`,
    '알루미늄 캔': `<rect x="-11" y="-18" width="22" height="28" rx="3" fill="${SILVER}" stroke="${DG_C.sub}" stroke-width="2.5"/><path d="M-11 -12 H11 M-11 4 H11" stroke="${DG_C.sub}" stroke-width="2"/>`,
    '동전': `<circle r="14" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/><circle r="9" fill="none" stroke="${DG_C.c}" stroke-width="1.5"/>`,
  };
  const ITEMS = [
    { n: '클립', on: 1 }, { n: '지우개', on: 0 }, { n: '철 못', on: 1 }, { n: '알루미늄 캔', on: 0 },
    { n: '연필', on: 0 }, { n: '철 숟가락', on: 1 }, { n: '동전', on: 0 },
  ];
  const slot = it => {
    const list = ITEMS.filter(x => x.on === it.on), i = list.indexOf(it);
    return { x: (it.on ? 66 : 300) + (i % 2) * 112 + (it.on && i === 2 ? 56 : 0), y: 230 + Math.floor(i / 2) * 60 };
  };
  const MG = { x: 240, y: 48 };
  const T0 = 300, STEP = 760;

  /* 1: 클립이 붙은 막대자석 */
  const CLIPS = [];
  [[-1, 0], [1, 0]].forEach(([s]) => {
    for (let k = 0; k < 7; k++) {
      const ang = (-60 + k * 20) * Math.PI / 180;
      const x = s * (110 + Math.cos(ang) * 6 + (k % 2) * 4), y = 70 + Math.sin(ang) * 22 + 18 + (k % 3) * 6;
      CLIPS.push({ x: x + s * (k % 3) * 3, y, r: s * (k * 13 - 30) });
    }
  });

  Object.assign(DIAG, {
    's3-02:0': {
      alt: '자석을 여러 물체에 대어 보면 클립, 철 못, 철 숟가락은 붙고 지우개, 연필, 알루미늄 캔, 동전은 붙지 않아 두 무리로 나뉘는 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        <rect x="8" y="170" width="224" height="164" rx="18" fill="${DG_C.a}" fill-opacity=".4" stroke="${DG_C.c}" stroke-width="3"/>
        <rect x="248" y="170" width="224" height="164" rx="18" fill="#f5f5f7" stroke="#c7c7cc" stroke-width="3"/>
        <text x="120" y="198" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">붙어요 (철)</text>
        <text x="360" y="198" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="800">안 붙어요</text>
        <g transform="translate(${MG.x},${MG.y})">${horse}</g>
        ${ITEMS.map((it, j) => `<g class="it it${j}"><g class="ic">${ICON[it.n]}</g>
          <text y="31" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">${it.n}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, T0 + ITEMS.length * STEP + 300, e => {
          ITEMS.forEach((it, j) => {
            const st = T0 + j * STEP, g = q('.it' + j), sl = slot(it);
            const lift = it.on ? dgEase(dgP(e, st + 150, 200)) : 0;  // 철이면 자석 쪽으로 튀어 오름
            const go = dgEase(dgP(e, st + 420, 320));
            const x0 = 240, y0 = 124 - 22 * lift;
            const x = x0 + (sl.x - x0) * go, y = y0 + (sl.y - y0) * go;
            g.setAttribute('transform', `translate(${f2(x)},${f2(y)})`);
            g.setAttribute('opacity', e > st ? 1 : 0);
          });
        });
      }
    },

    's3-02:1': {
      alt: '막대자석을 클립 더미에 넣었다 빼면 양쪽 끝(극)에 클립이 가장 많이 붙고 가운데는 거의 붙지 않으며, 자석을 잘라도 조각마다 N극과 S극이 다시 생기는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g transform="translate(240,0)">
          ${CLIPS.map((c, i) => `<g class="cl" transform="translate(${f2(c.x)},${f2(c.y)}) rotate(${c.r})">${clip(1.25)}</g>`).join('')}
          <g transform="translate(0,70)">${bar(240, 40, 'N')}</g>
          <g class="cl"><g transform="translate(-6,100) rotate(10)">${clip(1.25)}</g></g>
        </g>
        <g class="pole">
          <text x="${240 - 120}" y="156" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">극</text>
          <text x="${240 + 120}" y="156" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">극</text>
          <text x="240" y="156" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">거의 안 붙어요</text>
        </g>
        <line class="cut" x1="20" y1="176" x2="460" y2="176" stroke="#e5e5ea" stroke-width="2"/>
        <g class="whole" transform="translate(240,240)">${bar(240, 40, 'N')}</g>
        <g class="halfL">${bar(120, 40, 'N', 20)}</g>
        <g class="halfR">${bar(120, 40, 'N', 20)}</g>
        <path class="knife" d="M240 200 V280" stroke="${DG_C.ink}" stroke-width="3" stroke-dasharray="6 5"/>
        <text class="cutt" x="240" y="310" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">잘라도 N극과 S극이 생겨요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          qa('.cl').forEach((c, i) => c.setAttribute('opacity', e > 300 + (i % 7) * 120 ? 1 : 0));
          q('.pole').setAttribute('opacity', e > 1600 ? 1 : 0);
          const cut = dgP(e, 2600, 400), sp = dgEase(dgP(e, 3200, 900));
          q('.whole').setAttribute('opacity', e < 3200 ? 1 : 0);
          q('.knife').setAttribute('opacity', e > 2600 && e < 3300 ? cut : 0);
          q('.halfL').setAttribute('transform', `translate(${f2(180 - 40 * sp)},240)`);
          q('.halfR').setAttribute('transform', `translate(${f2(300 + 40 * sp)},240)`);
          q('.halfL').setAttribute('opacity', e >= 3200 ? 1 : 0);
          q('.halfR').setAttribute('opacity', e >= 3200 ? 1 : 0);
          q('.cutt').setAttribute('opacity', e > 4300 ? 1 : 0);
        });
      }
    },

    's3-02:2': {
      alt: 'N극과 S극처럼 다른 극끼리 마주 보면 두 자석이 서로 끌어당기고, N극과 N극처럼 같은 극끼리 마주 보면 서로 밀어내는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <text x="240" y="40" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">다른 극: 끌어당겨요</text>
        <g class="a1">${bar(140, 40, 'S')}</g><g class="a2">${bar(140, 40, 'S')}</g>
        <path class="aa" d="" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="20" y1="150" x2="460" y2="150" stroke="#e5e5ea" stroke-width="2"/>
        <text x="240" y="192" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">같은 극: 밀어내요</text>
        <g class="b1">${bar(140, 40, 'S')}</g><g class="b2">${bar(140, 40, 'N')}</g>
        <path class="bb" d="" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const a = dgEase(dgP(e, 600, 1300));      // 가까워짐
          const g1 = 70 - 66 * a;                    // 두 자석 사이 반 간격
          q('.a1').setAttribute('transform', `translate(${f2(240 - g1 - 70)},92)`);
          q('.a2').setAttribute('transform', `translate(${f2(240 + g1 + 70)},92)`);
          q('.aa').setAttribute('d', `${arw(150, 128, 226, 128, 8)} ${arw(330, 128, 254, 128, 8)}`);
          const b = dgEase(dgP(e, 2800, 1300));
          const g2 = 14 + 56 * b;
          q('.b1').setAttribute('transform', `translate(${f2(240 - g2 - 70)},244)`);
          q('.b2').setAttribute('transform', `translate(${f2(240 + g2 + 70)},244)`);
          q('.bb').setAttribute('d', `${arw(222, 282, 150, 282, 8)} ${arw(258, 282, 330, 282, 8)}`);
          q('.bb').setAttribute('opacity', e > 2800 ? 1 : 0);
          q('.aa').setAttribute('opacity', e > 200 ? 1 : 0);
        });
      }
    },

    's3-02:3': {
      alt: '물에 띄운 접시 위의 막대자석과 나침반 바늘이 빙글 돌다가 N극은 북쪽, S극은 남쪽을 가리키며 멈추는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <text x="240" y="40" text-anchor="middle" fill="${RED}" font-size="22" font-weight="800">↑ 북쪽</text>
        <text x="240" y="298" text-anchor="middle" fill="${BLU}" font-size="22" font-weight="800">↓ 남쪽</text>
        <circle cx="120" cy="168" r="100" fill="${DG_C.b}" fill-opacity=".5" stroke="${DG_C.d}" stroke-width="3"/>
        <circle cx="120" cy="168" r="66" fill="#fff" stroke="#c7c7cc" stroke-width="3"/>
        <g class="mag"><rect x="-55" y="-14" width="55" height="28" fill="${BLU}"/><rect x="0" y="-14" width="55" height="28" fill="${RED}"/></g>
        <text class="mN" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">N</text><text class="mS" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">S</text>
        <circle cx="360" cy="168" r="96" fill="#fff" stroke="${DG_C.ink}" stroke-width="5"/>
        ${[['북', 0], ['동', 90], ['남', 180], ['서', 270]].map(([t, a]) => { const r = 72, x = 360 + r * Math.sin(a * Math.PI / 180), y = 168 - r * Math.cos(a * Math.PI / 180) + 7; return `<text x="${f2(x)}" y="${f2(y)}" text-anchor="middle" fill="${t === '북' ? RED : DG_C.sub}" font-size="20" font-weight="800">${t}</text>`; }).join('')}
        <g class="ndl"><path d="M0 -52 L10 0 L-10 0 Z" fill="${RED}"/><path d="M0 52 L10 0 L-10 0 Z" fill="${BLU}"/><circle r="5" fill="#fff" stroke="${DG_C.ink}" stroke-width="2"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const t = Math.max(0, e - 300) / 1000;
          const damp = (a0, w, k) => a0 * Math.exp(-k * t) * Math.cos(w * t);
          const am = e >= 5200 ? 0 : damp(130, 3.2, 1.0);
          const an = e >= 5200 ? 0 : damp(-150, 3.8, 1.1);
          // 막대자석: 기본은 가로(S-N) → 세로로 세워 N이 위쪽(북)
          q('.mag').setAttribute('transform', `translate(120,168) rotate(${f2(-90 + am)})`);
          const ra = (-90 + am) * Math.PI / 180;
          q('.mN').setAttribute('x', f2(120 + 28 * Math.cos(ra))); q('.mN').setAttribute('y', f2(168 + 28 * Math.sin(ra) + 7));
          q('.mS').setAttribute('x', f2(120 - 28 * Math.cos(ra))); q('.mS').setAttribute('y', f2(168 - 28 * Math.sin(ra) + 7));
          q('.ndl').setAttribute('transform', `translate(360,168) rotate(${f2(an)})`);
        });
      }
    },

    's3-02:4': {
      alt: '자석과 철판 칠판 사이에 종이를 두어도 자석이 칠판을 끌어당겨 종이가 붙어 있는 모습을 옆에서 본 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="300" y="30" width="26" height="250" rx="4" fill="${SILVER}" stroke="${IRON}" stroke-width="3"/>
        <text x="350" y="150" fill="${DG_C.ink}" font-size="20" font-weight="800">철판</text>
        <text x="350" y="176" fill="${DG_C.sub}" font-size="18" font-weight="700">(칠판)</text>
        <g class="mv">
          <rect x="290" y="70" width="6" height="170" fill="#fff" stroke="${DG_C.sub}" stroke-width="2"/>
          <g transform="translate(250,155) rotate(0)">${bar(80, 40, 'S', 20)}</g>
        </g>
        <g class="lab">
          <path d="M293 70 L252 46" stroke="${DG_C.ink}" stroke-width="2"/><text x="248" y="44" text-anchor="end" fill="${DG_C.ink}" font-size="20" font-weight="800">종이</text>
          <path class="pull" d="${arw(150, 232, 276, 232)}" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="20" y="200" fill="${DG_C.r}" font-size="20" font-weight="800">사이에 두어도</text>
          <text x="20" y="226" fill="${DG_C.r}" font-size="20" font-weight="800">붙어요</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          const m = dgEase(dgP(e, 300, 1500));
          q('.mv').setAttribute('transform', `translate(${f2(-180 * (1 - m))},0)`);
          q('.lab').setAttribute('opacity', e > 2200 ? 1 : 0);
        });
      }
    },
  });
})();
