/* 4학년 과학 · 생물은 주변 환경과 어떻게 어울려 살까? (s5-09) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  // 두 칩 사이 화살표(칩 가장자리에서 멈춤)
  const link = (a, b, ra = 40, rb = 40) => {
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const ea = Math.min(ra / Math.max(Math.abs(ux), 0.01), 21 / Math.max(Math.abs(uy), 0.01)) + 4;
    const eb = Math.min(rb / Math.max(Math.abs(ux), 0.01), 21 / Math.max(Math.abs(uy), 0.01)) + 6;
    return arw(a.x + ux * ea, a.y + uy * ea, b.x - ux * eb, b.y - uy * eb, 9);
  };
  const GRN = '#d6efdc', LEAF = '#8fd18a', SUN = '#ffcc00';
  const tag = (x, y, t, bio) => `<g><rect x="${x - t.length * 10 - 12}" y="${y - 17}" width="${t.length * 20 + 24}" height="34" rx="17" fill="${bio ? DG_C.r : DG_C.c}"/>
    <text x="${x}" y="${y + 7}" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">${t}</text></g>`;

  /* 2: 먹이 사슬 → 먹이 그물 */
  const N = {
    벼: { x: 56, y: 290 }, 메뚜기: { x: 140, y: 222 }, 개구리: { x: 232, y: 170 }, 뱀: { x: 322, y: 118 }, 매: { x: 420, y: 72 },
    쥐: { x: 350, y: 270 }, 참새: { x: 92, y: 120 },
  };
  const CHAIN = [['벼', '메뚜기'], ['메뚜기', '개구리'], ['개구리', '뱀'], ['뱀', '매']];
  const WEB = [['벼', '쥐'], ['쥐', '뱀'], ['쥐', '매'], ['벼', '참새'], ['메뚜기', '참새'], ['참새', '매']];
  const cw = n => n.length * 20 / 2 + 14;

  /* 3: 늑대-사슴-풀 */
  const ST3 = [
    { t: '균형', v: [3, 3, 5] },
    { t: '늑대 사라짐', v: [0, 6, 1.5] },
    { t: '늑대 돌아옴', v: [3, 3.4, 4.2] },
  ];
  const SP = [{ n: '늑대', c: DG_C.sub }, { n: '사슴', c: DG_C.c }, { n: '풀', c: DG_C.r }];

  Object.assign(DIAG, {
    's5-09:0': {
      alt: '연못 생태계에서 물고기, 개구리, 수초 같은 생물 요소와 햇빛, 물, 흙 같은 비생물 요소를 표시한 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g transform="translate(70,70)"><circle r="24" fill="${SUN}" stroke="${DG_C.c}" stroke-width="3"/>${Array.from({ length: 8 }, (_, i) => { const a = i * 45 * Math.PI / 180; return `<line x1="${f2(Math.cos(a) * 30)}" y1="${f2(Math.sin(a) * 30)}" x2="${f2(Math.cos(a) * 40)}" y2="${f2(Math.sin(a) * 40)}" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</g>
        <path d="M0 150 Q60 140 120 150 L140 160 Q240 168 340 160 L360 150 Q420 140 480 150 V320 H0 Z" fill="${DG_C.a}" fill-opacity=".7"/>
        <path d="M40 160 Q240 150 440 160 Q430 260 240 270 Q50 260 40 160 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
        <path d="M60 300 Q240 280 420 300" stroke="${DG_C.c}" stroke-width="3" fill="none"/>
        ${[120, 136, 350].map((x, i) => `<path d="M${x} 262 q-10 -30 4 -60 M${x} 262 q10 -36 -2 -74" stroke="${DG_C.r}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
        <g transform="translate(250,222)"><path d="M-26 0 Q-6 -16 18 0 Q-6 16 -26 0 Z M18 0 L32 -10 V10 Z" fill="${DG_C.c}"/><circle cx="-14" cy="-3" r="2.5" fill="${DG_C.ink}"/></g>
        <g transform="translate(330,150)"><ellipse rx="22" ry="13" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="3"/><circle cx="-10" cy="-12" r="6" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="2.5"/><circle cx="10" cy="-12" r="6" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="2.5"/><circle cx="-10" cy="-12" r="2" fill="${DG_C.ink}"/><circle cx="10" cy="-12" r="2" fill="${DG_C.ink}"/></g>
        <rect x="200" y="20" width="18" height="18" rx="4" fill="${DG_C.r}"/><text x="226" y="36" fill="${DG_C.r}" font-size="20" font-weight="800">생물 요소</text>
        <rect x="200" y="50" width="18" height="18" rx="4" fill="${DG_C.c}"/><text x="226" y="66" fill="${DG_C.c}" font-size="20" font-weight="800">비생물 요소</text>
        <g class="bio">
          ${tag(250, 186, '물고기', 1)}${tag(380, 112, '개구리', 1)}${tag(84, 206, '수초', 1)}
        </g>
        <g class="abio">
          ${tag(70, 136, '햇빛', 0)}${tag(240, 250, '물', 0)}${tag(240, 302, '흙', 0)}
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4000, e => {
          q('.bio').setAttribute('opacity', dgP(e, 800, 600));
          q('.abio').setAttribute('opacity', dgP(e, 2200, 600));
        });
      },
    },

    's5-09:1': {
      alt: '햇빛으로 스스로 양분을 만드는 벼는 생산자, 벼를 먹는 메뚜기는 소비자, 죽은 생물과 배출물을 분해하는 버섯은 분해자이며 분해된 양분이 다시 흙으로 돌아가는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g transform="translate(70,58)"><circle r="20" fill="${SUN}" stroke="${DG_C.c}" stroke-width="3"/></g>
        <path class="sa" d="${arw(78, 84, 92, 128, 8)}" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="g0"><g transform="translate(96,196)">
          <path d="M0 30 q-8 -30 -22 -46 M0 30 q0 -34 2 -56 M0 30 q8 -30 22 -44" stroke="${DG_C.r}" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M2 -26 q6 -10 14 -12" stroke="${DG_C.c}" stroke-width="3" fill="none"/>${[0, 1, 2].map(i => `<ellipse cx="${8 + i * 4}" cy="${-30 - i * 4}" rx="3" ry="4.5" fill="#ffd60a" stroke="${DG_C.c}" stroke-width="1.5"/>`).join('')}</g>
          <text x="96" y="262" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">생산자</text>
          <text x="96" y="288" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">벼</text></g>
        <g class="g1"><g transform="translate(270,110)">
          <path d="M-30 4 Q-6 -12 26 -2 Q30 8 18 10 Q-10 14 -30 4 Z" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="3"/>
          <circle cx="24" cy="-2" r="7" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="2.5"/>
          <path d="M-4 6 L-20 -18 L-34 14 M8 8 L4 22 M-10 9 L-14 22 M28 -8 q8 -14 16 -16" stroke="${DG_C.r}" stroke-width="2.5" fill="none" stroke-linejoin="round"/></g>
          <text x="270" y="160" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">소비자</text>
          <text x="270" y="186" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">메뚜기</text></g>
        <g class="g2"><g transform="translate(386,232)">
          <path d="M-30 0 Q-30 -30 0 -32 Q30 -30 30 0 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
          <rect x="-8" y="0" width="16" height="28" rx="5" fill="#fff" stroke="${DG_C.c}" stroke-width="3"/></g>
          <text x="386" y="290" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">분해자</text>
          <text x="386" y="314" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">버섯</text></g>
        <path class="a0" d="${arw(138, 160, 226, 120)}" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="a0" x="166" y="122" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="800">먹어요</text>
        <path class="a1" d="${arw(310, 168, 360, 196)}" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="a1" x="356" y="160" fill="${DG_C.sub}" font-size="18" font-weight="800">죽으면</text>
        <path class="a2" d="${arw(340, 262, 150, 262)}" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="a2" x="250" y="250" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">양분을 흙으로</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5600, e => {
          q('.sa').setAttribute('opacity', dgP(e, 200, 400));
          q('.g0').setAttribute('opacity', dgP(e, 500, 500));
          qa('.a0').forEach(t => t.setAttribute('opacity', dgP(e, 1500, 400)));
          q('.g1').setAttribute('opacity', dgP(e, 1900, 500));
          qa('.a1').forEach(t => t.setAttribute('opacity', dgP(e, 2900, 400)));
          q('.g2').setAttribute('opacity', dgP(e, 3300, 500));
          qa('.a2').forEach(t => t.setAttribute('opacity', dgP(e, 4400, 500)));
        });
      }
    },

    's5-09:2': {
      alt: '벼, 메뚜기, 개구리, 뱀, 매가 한 줄로 이어진 먹이 사슬에 쥐와 참새가 더해져 여러 먹이 사슬이 그물처럼 얽힌 먹이 그물이 되는 그림. 화살표는 먹이에서 먹는 생물 쪽을 향함',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <text x="12" y="34" fill="${DG_C.sub}" font-size="18" font-weight="700">먹이 → 먹는 생물</text>
        ${WEB.map(([a, b], i) => `<path class="w w${i}" d="${link(N[a], N[b], cw(a), cw(b))}" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        ${CHAIN.map(([a, b], i) => `<path class="c c${i}" d="${link(N[a], N[b], cw(a), cw(b))}" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        ${Object.entries(N).map(([n, p]) => { const extra = n === '쥐' || n === '참새'; return `<g class="${extra ? 'nx' : 'nc'}"><rect x="${p.x - cw(n)}" y="${p.y - 19}" width="${cw(n) * 2}" height="38" rx="19" fill="${extra ? DG_C.a : n === '벼' ? GRN : DG_C.b}" stroke="${extra ? DG_C.c : n === '벼' ? DG_C.r : DG_C.d}" stroke-width="3"/>
          <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${n}</text></g>`; }).join('')}
        <text class="t1" x="260" y="34" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">먹이 사슬</text>
        <text class="t2" x="250" y="316" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">먹이 그물</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          qa('.nc').forEach((g, i) => g.setAttribute('opacity', e > 200 + i * 500 ? 1 : 0));
          CHAIN.forEach((c, i) => q('.c' + i).setAttribute('opacity', e > 450 + i * 500 ? 1 : 0));
          q('.t1').setAttribute('opacity', e > 2400 && e < 3200 ? 1 : 0);
          qa('.nx').forEach(g => g.setAttribute('opacity', dgP(e, 3200, 400)));
          WEB.forEach((w, i) => q('.w' + i).setAttribute('opacity', e > 3600 + i * 350 ? 1 : 0));
          q('.t2').setAttribute('opacity', e > 5800 ? 1 : 0);
        });
      }
    },

    's5-09:3': {
      alt: '처음에는 늑대, 사슴, 풀이 균형을 이루다가 늑대가 사라지자 사슴이 크게 늘고 풀이 줄었으며, 늑대를 다시 데려오자 사슴이 줄고 풀이 회복되는 변화를 막대로 나타낸 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${SP.map((s, i) => `<rect x="${20 + i * 96}" y="18" width="18" height="18" rx="4" fill="${s.c}"/><text x="${44 + i * 96}" y="34" fill="${DG_C.ink}" font-size="18" font-weight="700">${s.n}</text>`).join('')}
        <line x1="12" y1="260" x2="468" y2="260" stroke="${DG_C.sub}" stroke-width="2.5"/>
        ${ST3.map((st, k) => { const cx = 84 + k * 156; return `<g class="st${k}">
          ${st.v.map((v, j) => `<rect class="b${k}_${j}" x="${cx - 54 + j * 38}" y="260" width="30" height="0" rx="5" fill="${SP[j].c}"/>`).join('')}
          ${k === 1 ? `<text x="${cx - 39}" y="250" text-anchor="middle" fill="#ff3b30" font-size="22" font-weight="800">×</text>` : ''}
          <text x="${cx}" y="288" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">${k + 1}. ${st.t}</text>
        </g>`; }).join('')}
        ${[0, 1].map(k => `<path class="ar${k}" d="${arw(150 + k * 156, 150, 174 + k * 156, 150, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          ST3.forEach((st, k) => {
            const s0 = 300 + k * 1900;
            q('.st' + k).setAttribute('opacity', e > s0 ? 1 : 0);
            st.v.forEach((v, j) => {
              const f = dgEase(dgP(e, s0 + j * 250, 700)), h = v * 34 * f;
              const r = q(`.b${k}_${j}`); r.setAttribute('y', f2(260 - h)); r.setAttribute('height', f2(h));
            });
            if (k < 2) q('.ar' + k).setAttribute('opacity', e > s0 + 1500 ? 1 : 0);
          });
        });
      }
    },

    's5-09:4': {
      alt: '사막의 선인장은 잎이 가시로 되어 있어 물이 덜 빠져나가고, 북극여우는 귀가 작고 털이 두꺼워 추위를 잘 견디는 것을 나란히 비교한 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <rect x="8" y="24" width="224" height="288" rx="18" fill="${DG_C.a}" fill-opacity=".45"/>
        <rect x="248" y="24" width="224" height="288" rx="18" fill="#eef6ff"/>
        <text x="120" y="74" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">사막</text>
        <text x="300" y="74" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">북극</text>
        <g transform="translate(120,212)">
          <path d="M-16 40 V-70 Q-16 -86 0 -86 Q16 -86 16 -70 V40 Z M-16 -10 H-36 Q-46 -10 -46 -22 V-46 Q-46 -54 -38 -54 Q-30 -54 -30 -46 V-26 H-16 Z M16 0 H34 Q44 0 44 -12 V-36 Q44 -44 36 -44 Q28 -44 28 -36 V-16 H16 Z" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="3" stroke-linejoin="round"/>
          <g class="sp" stroke="${DG_C.ink}" stroke-width="2" stroke-linecap="round">${[[-16, -60, -1], [16, -50, 1], [-16, -30, -1], [16, -20, 1], [-16, 10, -1], [16, 20, 1], [-46, -38, -1], [44, -28, 1], [0, -86, 0]].map(([x, y, s]) => s ? `<path d="M${x} ${y} l${s * 9} -4 M${x} ${y} l${s * 9} 4"/>` : `<path d="M${x} ${y} l-4 -9 M${x} ${y} l4 -9"/>`).join('')}</g>
          <path d="M-60 40 H60" stroke="${DG_C.c}" stroke-width="3"/>
        </g>
        <g class="l0"><text x="120" y="280" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">잎 → 가시</text>
          <text x="120" y="304" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">물이 덜 빠져요</text></g>
        <g transform="translate(360,196)">
          <path d="M-70 30 Q-80 -10 -40 -20 Q0 -26 30 -14 Q46 -8 46 20 Q40 40 0 40 Q-50 44 -70 30 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
          <path d="M-70 26 Q-104 30 -100 0 Q-96 -14 -84 -10 Q-90 16 -66 14" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
          <circle cx="48" cy="-22" r="26" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
          <path class="ear" d="M34 -42 L36 -56 L46 -46 Z M54 -46 L62 -56 L64 -42 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="54" cy="-24" r="3" fill="${DG_C.ink}"/><circle cx="72" cy="-16" r="4" fill="${DG_C.ink}"/>
          <path d="M-40 40 v14 M20 40 v14" stroke="${DG_C.sub}" stroke-width="5" stroke-linecap="round"/>
        </g>
        <g class="l1"><path d="M414 138 L430 122" stroke="${DG_C.d}" stroke-width="2.5"/><text x="450" y="116" text-anchor="end" fill="${DG_C.d}" font-size="18" font-weight="800">작은 귀</text>
          <text x="360" y="280" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">두꺼운 털</text>
          <text x="360" y="304" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">추위를 견뎌요</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4000, e => {
          q('.sp').setAttribute('opacity', dgP(e, 600, 500));
          q('.l0').setAttribute('opacity', dgP(e, 1100, 400));
          q('.l1').setAttribute('opacity', dgP(e, 2400, 400));
        });
      }
    },
  });
})();
