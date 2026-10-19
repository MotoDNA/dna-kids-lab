/* 1학년 국어 · 옷은 왜 [옫]으로 소리 날까? (k1-09) */
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
    out: 'M33 236 L33 104 Q38 84 68 84 L146 84 Q182 90 202 113 L236 113',
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
  const side = o => `
    <g class="hd"><text x="320" y="92" text-anchor="middle" fill="${DG_C.c}" font-size="56" font-weight="800">${o.j}</text>
    <text x="410" y="88" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800">[${o.s}]</text></g>
    ${o.words.map(([w, x, y]) => `<text class="wd" x="${x}" y="${y}" text-anchor="middle" font-size="28" font-weight="800">${w.map(([s, hi]) => `<tspan fill="${hi ? DG_C.c : DG_C.ink}">${s}</tspan>`).join('')}</text>`).join('')}
    ${o.extra || ''}`;

  const mk = o => ({
    alt: o.alt,
    svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">${mouthSvg(o)}${side(o)}</svg>`,
    play(el) {
      const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
      const air = q('.air'), head = q('.airh'), L = air.getTotalLength();
      air.setAttribute('stroke-dasharray', `${L}`);
      dgAnim(el, o.total || 5600, e => {
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
        qa('.wd').forEach((w, i) => w.setAttribute('opacity', dgEase(dgP(e, 3300 + i * 350, 400))));
        if (o.after) o.after(el, e);
      });
    }
  });

  /* 1: ㅁ(길게) vs ㅂ(짧게) 막대 */
  const BARS = `
    <text x="300" y="222" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="800">음~</text>
    <rect x="336" y="204" width="0" height="22" rx="11" fill="#c7c7cc" class="bm"/>
    <text x="300" y="266" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">읍</text>
    <rect x="336" y="248" width="0" height="22" rx="11" fill="${DG_C.c}" class="bb"/>
    <text class="bt" x="398" y="266" fill="${DG_C.c}" font-size="20" font-weight="800">짧게!</text>`;

  /* 2: ㅅ 받침 → [ㄷ] */
  const S2 = [['옷', '옫'], ['붓', '붇'], ['맛', '맏']];
  const tile = (x, y, t, fill, col, w = 48) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="48" rx="12" fill="${fill}"/><text x="${x}" y="${y + 35}" text-anchor="middle" fill="${col}" font-size="30" font-weight="800">${t}</text>`;

  Object.assign(DIAG, {
    'k1-09:0': mk({
      alt: '받침 ㄹ은 혀끝을 윗잇몸에 살짝 대고 끝내며, 바람이 혀 옆으로 계속 나와 [을] 하고 소리가 이어져요. 달, 물, 별, 발, 귤',
      to: T_TIP, air: 'out', stop: [184, 74], stopT: '살짝', lx: 58, ly: 6,
      j: 'ㄹ', s: '을',
      words: [[[['달', 1]], 296, 168], [[['물', 1]], 360, 168], [[['별', 1]], 424, 168], [[['발', 1]], 328, 224], [[['귤', 1]], 392, 224]],
    }),
    'k1-09:1': mk({
      alt: '받침 ㅂ은 입술을 꼭 닫고 짧게 끊어 [읍] 소리가 나요. ㅁ 받침의 [음~]보다 짧고 단단해요. 밥, 집, 입, 컵',
      to: T_REST, shut: true, air: 'lips', stop: [206, 108], stopT: '닫아요', lx: 36, ly: -24,
      j: 'ㅂ', s: '읍', extra: BARS, total: 6400,
      words: [[[['밥', 1]], 290, 160], [[['집', 1]], 345, 160], [[['입', 1]], 400, 160], [[['컵', 1]], 455, 160]],
      after(el, e) {
        const q = s => el.querySelector(s);
        q('.bm').setAttribute('width', 130 * dgEase(dgP(e, 4800, 900)));
        q('.bb').setAttribute('width', 22 + 32 * dgEase(dgP(e, 5600, 300)) - (e < 5600 ? 22 : 0));
        q('.bt').setAttribute('opacity', e > 5900 ? 1 : 0);
      },
    }),

    'k1-09:2': {
      alt: '옷, 붓, 맛은 글자로 쓸 때는 받침이 ㅅ이지만 소리는 [ㄷ]처럼 나서 [옫], [붇], [맏]으로 읽는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="8" y="102" fill="${DG_C.d}" font-size="18" font-weight="800">쓰기</text>
        <text x="8" y="252" fill="${DG_C.c}" font-size="18" font-weight="800">소리</text>
        ${S2.map(([w, s], i) => { const x = 130 + i * 128; return `<g>
          <g class="w${i}"><text x="${x}" y="104" text-anchor="middle" fill="${DG_C.ink}" font-size="50" font-weight="800">${w}</text></g>
          <g class="a${i}">${tile(x - 30, 134, 'ㅅ', DG_C.b, DG_C.d, 40)}</g>
          <path class="ar${i}" d="M${x - 7} 158 h14 m-6 -6 l6 6 l-6 6" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <g class="b${i}">${tile(x + 30, 134, 'ㄷ', DG_C.a, DG_C.c, 40)}</g>
          <text class="s${i}" x="${x}" y="254" text-anchor="middle" fill="${DG_C.c}" font-size="38" font-weight="800">[${s}]</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          S2.forEach((_, i) => {
            const st = 200 + i * 1800;
            q('.w' + i).setAttribute('opacity', dgP(e, st, 400));
            q('.a' + i).setAttribute('opacity', dgP(e, st + 400, 400));
            q('.ar' + i).setAttribute('opacity', e > st + 900 ? 1 : 0);
            const f = dgEase(dgP(e, st + 900, 600));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(${-(1 - f) * 30},0)`);
            q('.s' + i).setAttribute('opacity', dgP(e, st + 1400, 400));
          });
        });
      }
    },

    'k1-09:3': {
      alt: '맨 앞의 ㅇ(아)은 소리가 없지만, 고 아래에 받침으로 붙은 ㅇ(공)은 [응] 하고 콧소리가 나요. 공, 빵, 가방, 강',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="r0">${tile(40, 52, 'ㅇ', '#e5e5ea', DG_C.sub)}
          <text x="88" y="86" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>
          ${tile(136, 52, 'ㅏ', DG_C.b, DG_C.d)}
          <text x="188" y="86" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text>
          <text x="230" y="90" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="800">아</text>
          <text x="276" y="74" fill="${DG_C.sub}" font-size="18" font-weight="700">맨 앞의 ㅇ</text>
          <text x="276" y="100" fill="${DG_C.sub}" font-size="20" font-weight="800">소리 없음</text></g>
        <g class="r1">${tile(40, 138, '고', DG_C.b, DG_C.d)}
          <text x="88" y="172" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>
          <g class="ng">${tile(136, 138, 'ㅇ', DG_C.a, DG_C.c)}</g>
          <text x="188" y="172" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text>
          <text x="230" y="176" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="800">공</text>
          <text x="276" y="160" fill="${DG_C.c}" font-size="18" font-weight="700">받침 ㅇ</text>
          <text x="276" y="186" fill="${DG_C.c}" font-size="20" font-weight="800">[응~] 콧소리</text></g>
        <line x1="20" y1="216" x2="460" y2="216" stroke="#e5e5ea" stroke-width="2"/>
        ${[[['공', 1]], [['빵', 1]], [['가', 0], ['방', 1]], [['강', 1]]].map((w, i) => `<text class="wd" x="${[100, 190, 290, 390][i]}" y="266" text-anchor="middle" font-size="30" font-weight="800">${w.map(([s, h]) => `<tspan fill="${h ? DG_C.c : DG_C.ink}">${s}</tspan>`).join('')}</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5400, e => {
          q('.r0').setAttribute('opacity', dgP(e, 200, 500));
          q('.r1').setAttribute('opacity', dgP(e, 1500, 500));
          const f = dgEase(dgP(e, 1700, 700));
          q('.ng').setAttribute('transform', `translate(0,${(1 - f) * 40})`);
          qa('.wd').forEach((w, i) => w.setAttribute('opacity', dgP(e, 3000 + i * 450, 400)));
        });
      }
    },
  });
})();
