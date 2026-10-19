/* 1학년 국어 · 글자 아래에 자음이 붙으면 어떻게 읽을까? (k1-08) */
(() => {
  /* ── 입 옆모습(오른쪽을 봄) ── */
  const LIP = '#ff3b30';
  const lerp = (a, b, f) => a + (b - a) * f;
  // 닫힌 곡선(캣멀롬 → 3차 베지어)
  const smooth = pts => {
    const n = pts.length, f = v => v.toFixed(1);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + 'Z';
  };
  const T_REST = [[50, 214], [54, 150], [98, 118], [152, 126], [180, 138], [168, 156], [112, 172]];
  const T_BACK = [[50, 214], [56, 118], [92, 62], [146, 112], [178, 136], [166, 156], [112, 172]]; // 혀 뒤쪽을 올림
  const T_TIP = [[50, 214], [54, 150], [100, 118], [150, 100], [178, 78], [164, 112], [112, 172]];  // 혀끝을 윗잇몸에
  const tongue = (to, f) => smooth(T_REST.map((p, i) => [lerp(p[0], to[i][0], f), lerp(p[1], to[i][1], f)]));
  const UL = 98, LL_OPEN = 128, LL_SHUT = 118;
  const AIR = {
    back: 'M33 236 L33 112 Q36 88 66 80',
    nose: 'M33 236 L33 62 Q33 34 62 34 L168 34 Q194 34 208 52',
    lips: 'M33 236 L33 104 Q38 84 68 84 L146 84 Q176 88 192 104',
  };
  const mouthSvg = (o) => `
    <g transform="translate(8,26)">
      <path d="M150 -12 Q196 -10 206 8 L236 42 Q242 56 224 58 Q216 64 220 76 Q226 96 220 112 Q226 130 218 142 Q222 160 214 174 Q204 196 168 200 L112 214 L112 260 L0 260 L0 -12 Z" fill="${DG_C.a}" fill-opacity=".45"/>
      <path d="M20 248 L20 40 Q20 14 48 14 L170 14 Q204 14 218 46" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/>
      <path d="M44 92 C70 44 150 44 178 66 Q188 74 188 90" fill="none" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M180 64 Q200 58 212 60" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/>
      <path d="M188 122 L188 140 Q192 176 150 184 L60 194 Q46 198 46 248" fill="none" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
      <path class="tg" d="${tongue(T_REST, 0)}" fill="#ffb4ae" stroke="${LIP}" stroke-width="3"/>
      <text x="104" y="156" text-anchor="middle" fill="${LIP}" font-size="18" font-weight="800">혀</text>
      <ellipse cx="206" cy="${UL}" rx="12" ry="10" fill="${DG_C.a}" stroke="${LIP}" stroke-width="3"/>
      <ellipse class="ll" cx="206" cy="${LL_OPEN}" rx="12" ry="10" fill="${DG_C.a}" stroke="${LIP}" stroke-width="3"/>
      <text x="226" y="36" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">코</text>
      <text x="222" y="176" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">입술</text>
      <path class="air" d="${AIR[o.air]}" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-dasharray="7 6" stroke-linecap="round"/>
      <path class="airh" d="M0 0 l-12 -7 m12 7 l-12 7" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="stop"><circle cx="${o.stop[0]}" cy="${o.stop[1]}" r="13" fill="none" stroke="${DG_C.c}" stroke-width="4"/>
        <text x="${o.stop[0] + (o.lx || 0)}" y="${o.stop[1] + (o.ly || -24)}" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">${o.stopT}</text></g>
    </g>`;

  /* 오른쪽: 받침 글자 + 소리 + 낱말 */
  const side = o => `
    <g class="hd"><text x="320" y="92" text-anchor="middle" fill="${DG_C.c}" font-size="56" font-weight="800">${o.j}</text>
    <text x="410" y="88" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800">[${o.s}]</text></g>
    ${o.words.map((w, i) => {
      const r = Math.floor(i / o.perRow), c = i % o.perRow;
      return `<text class="wd" x="${o.wx[r][c]}" y="${168 + r * 56}" text-anchor="middle" font-size="28" font-weight="800">${w.map(([s, hi]) => `<tspan fill="${hi ? DG_C.c : DG_C.ink}">${s}</tspan>`).join('')}</text>`;
    }).join('')}`;

  const mk = o => ({
    alt: o.alt,
    svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">${mouthSvg(o)}${side(o)}</svg>`,
    play(el) {
      const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
      const air = q('.air'), head = q('.airh'), L = air.getTotalLength();
      air.setAttribute('stroke-dasharray', `${L}`);
      dgAnim(el, 5600, e => {
        q('.hd').setAttribute('opacity', dgP(e, 0, 400));
        const f = dgEase(dgP(e, 400, 1100));
        q('.tg').setAttribute('d', tongue(o.to || T_REST, f));
        q('.ll').setAttribute('cy', o.shut ? lerp(LL_OPEN, LL_SHUT, f) : LL_OPEN);
        const a = dgEase(dgP(e, 1600, 1300));
        air.setAttribute('stroke-dashoffset', L * (1 - a));
        air.setAttribute('opacity', a > 0 ? 1 : 0);
        const p = air.getPointAtLength(L * Math.max(a, .01)), p0 = air.getPointAtLength(Math.max(0, L * a - 4));
        const ang = Math.atan2(p.y - p0.y, p.x - p0.x) * 180 / Math.PI;
        head.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${ang})`);
        head.setAttribute('opacity', a > 0 ? 1 : 0);
        q('.stop').setAttribute('opacity', e > 3000 ? 1 : 0);
        qa('.wd').forEach((w, i) => w.setAttribute('opacity', dgEase(dgP(e, 3300 + i * 400, 400))));
      });
    }
  });

  Object.assign(DIAG, {
    'k1-08:0': {
      alt: '가 아래에 받침 ㄱ, ㄴ, ㅁ을 받쳐 끼우면 각, 간, 감이 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text class="bl" x="44" y="152" text-anchor="end" fill="${DG_C.c}" font-size="18" font-weight="800">받침</text>
        ${[['ㄱ', '각'], ['ㄴ', '간'], ['ㅁ', '감']].map(([b, r], i) => { const x = 110 + i * 140; return `<g>
          <rect x="${x - 50}" y="44" width="100" height="134" rx="18" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
          <rect class="slot" x="${x - 42}" y="118" width="84" height="52" rx="12" fill="none" stroke="${DG_C.c}" stroke-width="2.5" stroke-dasharray="6 5"/>
          <text x="${x}" y="102" text-anchor="middle" fill="${DG_C.d}" font-size="48" font-weight="800">가</text>
          <g class="b${i}"><rect x="${x - 42}" y="118" width="84" height="52" rx="12" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
            <text x="${x}" y="156" text-anchor="middle" fill="${DG_C.c}" font-size="34" font-weight="800">${b}</text></g>
          <g class="r${i}"><path d="M${x} 190 v24 m-8 -8 l8 8 l8 -8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="${x}" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="44" font-weight="800">${r}</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5400, e => {
          q('.bl').setAttribute('opacity', e > 1200 ? 1 : 0);
          [0, 1, 2].forEach(i => {
            const st = 300 + i * 1500, f = dgEase(dgP(e, st, 800));
            q('.b' + i).setAttribute('transform', `translate(0,${(1 - f) * 90})`);
            q('.b' + i).setAttribute('opacity', f > 0 ? Math.min(1, f * 2) : 0);
            q('.r' + i).setAttribute('opacity', dgEase(dgP(e, st + 900, 400)));
          });
        });
      }
    },

    'k1-08:1': mk({
      alt: '받침 ㄱ은 혀 뒤쪽을 올려 입천장에 붙여 소리를 막아 [윽] 하고 끝나요. 국, 약, 수박, 북',
      to: T_BACK, air: 'back', stop: [92, 50], stopT: '막아요', ly: -18,
      j: 'ㄱ', s: '윽', perRow: 2, wx: [[320, 410], [320, 410]],
      words: [[['국', 1]], [['약', 1]], [['수', 0], ['박', 1]], [['북', 1]]],
    }),
    'k1-08:2': mk({
      alt: '받침 ㄴ은 혀끝을 윗잇몸에 대고 끝내고, 바람이 코로 나와 [은] 하는 콧소리가 나요. 눈, 산, 손, 문',
      to: T_TIP, air: 'nose', stop: [184, 74], stopT: '혀끝', lx: 58, ly: 6,
      j: 'ㄴ', s: '은', perRow: 2, wx: [[320, 410], [320, 410]],
      words: [[['눈', 1]], [['산', 1]], [['손', 1]], [['문', 1]]],
    }),
    'k1-08:3': mk({
      alt: '받침 ㅁ은 입술을 꼭 닫고 끝내고, 바람이 코로 나와 [음] 하고 입이 다물어져요. 곰, 봄, 밤, 엄마, 감자',
      to: T_REST, shut: true, air: 'nose', stop: [206, 108], stopT: '닫아요', lx: 36, ly: -24,
      j: 'ㅁ', s: '음', perRow: 3, wx: [[296, 360, 424], [320, 410]],
      words: [[['곰', 1]], [['봄', 1]], [['밤', 1]], [['엄', 1], ['마', 0]], [['감', 1], ['자', 0]]],
    }),
  });
})();
