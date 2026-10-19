/* 1학년 영어 · n부터 z까지, 글자 소리를 들어 볼까? (e1-05) */
(() => {
  /* 낱말 카드: 글자 → 낱말(색칠한 부분 = 소리 나는 글자) → 소리 힌트. hl = [앞, 색, 뒤] */
  const card = (k, x, y, w, L, hl, hint) => `<g class="cd${k}">
    <rect x="${x}" y="${y}" width="${w}" height="128" rx="16" fill="#f5f5f7"/>
    <text x="${x + w / 2}" y="${y + 46}" text-anchor="middle" fill="${DG_C.d}" font-size="38" font-weight="800">${L}</text>
    <text x="${x + w / 2}" y="${y + 84}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${hl[0]}<tspan class="fl${k}" fill="${DG_C.d}">${hl[1]}</tspan>${hl[2]}</text>
    ${hint ? `<text class="ht${k}" x="${x + w / 2}" y="${y + 114}" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">${hint}</text>` : ''}
  </g>`;
  const cardsAnim = (el, n, total, gap) => {
    const q = s => el.querySelector(s);
    dgAnim(el, total, e => {
      for (let k = 0; k < n; k++) {
        const st = 200 + k * gap, f = dgEase(dgP(e, st, 400));
        q('.cd' + k).setAttribute('opacity', f);
        q('.cd' + k).setAttribute('transform', `translate(0,${12 * (1 - f)})`);
        q('.fl' + k).setAttribute('fill', e > st + 450 ? DG_C.c : DG_C.d);
        const h = q('.ht' + k); if (h) h.setAttribute('opacity', e > st + 650 ? 1 : 0);
      }
    });
  };

  const S0 = [['n', ['', 'n', 'ose'], "콧소리 '은'"], ['o', ['', 'o', 'ctopus']], ['p', ['', 'p', 'ig'], "'프' 터뜨려요"], ['q', ['', 'qu', 'een'], 'q는 u와 함께'], ['r', ['', 'r', 'abbit']]];
  const S1 = [['s', ['', 's', 'un'], "뱀 소리 '스'"], ['t', ['', 't', 'iger']], ['u', ['', 'u', 'mbrella'], "짧게 '어'"], ['v', ['', 'v', 'iolin'], '윗니로 입술 물기']];
  const S2 = [['w', ['', 'w', 'atch'], "'우'"], ['x', ['fo', 'x', ''], "끝에 '크스'"], ['y', ['', 'y', 'o-yo']], ['z', ['', 'z', 'ebra'], "벌 소리 '즈'"]];

  /* 3: 입 모양 (정면) */
  const LIP = '#ff3b30';
  const lipsB = cx => `<path d="M${cx - 50} 104 Q${cx - 25} 82 ${cx} 90 Q${cx + 25} 82 ${cx + 50} 104 Q${cx + 25} 106 ${cx} 104 Q${cx - 25} 106 ${cx - 50} 104Z" fill="${LIP}" fill-opacity=".3" stroke="${LIP}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M${cx - 50} 104 Q${cx - 25} 102 ${cx} 104 Q${cx + 25} 102 ${cx + 50} 104 Q${cx + 25} 130 ${cx} 130 Q${cx - 25} 130 ${cx - 50} 104Z" fill="${LIP}" fill-opacity=".3" stroke="${LIP}" stroke-width="3" stroke-linejoin="round"/>`;
  const lipsV = cx => `<path d="M${cx - 46} 90 Q${cx} 78 ${cx + 46} 90 Q${cx} 108 ${cx - 46} 90Z" fill="${DG_C.ink}"/>
    <path d="M${cx - 50} 106 Q${cx - 25} 104 ${cx} 104 Q${cx + 25} 104 ${cx + 50} 106 Q${cx + 25} 134 ${cx} 134 Q${cx - 25} 134 ${cx - 50} 106Z" fill="${LIP}" fill-opacity=".3" stroke="${LIP}" stroke-width="3" stroke-linejoin="round"/>
    <path class="teeth" d="M${cx - 26} 78 h52 v31 q0 3 -3 3 h-46 q-3 0 -3 -3Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="2"/>
    <path class="teeth" d="M${cx - 9} 80 v31 M${cx + 9} 80 v31" stroke="${DG_C.sub}" stroke-width="1.5"/>
    <path d="M${cx - 50} 84 Q${cx - 25} 58 ${cx} 66 Q${cx + 25} 58 ${cx + 50} 84 Q${cx + 25} 78 ${cx} 82 Q${cx - 25} 78 ${cx - 50} 84Z" fill="#ffc4c1" stroke="${LIP}" stroke-width="3" stroke-linejoin="round"/>`;
  let wave = 'M40 236', zig = 'M270 236';
  for (let i = 1; i <= 40; i++) wave += ` L${40 + i * 4.5} ${(236 - 9 * Math.sin(i * Math.PI / 10)).toFixed(1)}`;
  for (let i = 1; i <= 18; i++) zig += ` L${270 + i * 10} ${i % 2 ? 222 : 250}`;

  Object.assign(DIAG, {
    'e1-05:0': {
      alt: 'n nose, o octopus, p pig, q queen, r rabbit 카드: nose는 콧소리 은, pig는 입술을 붙였다 프 터뜨리고, q는 늘 u와 함께 qu로 쓰는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${S0.map((s, k) => card(k, (k < 3 ? 12 : 90) + (k % 3) * 156, 46 + Math.floor(k / 3) * 140, 144, s[0], s[1], s[2])).join('')}
      </svg>`,
      play(el) { cardsAnim(el, S0.length, 4800, 800); }
    },

    'e1-05:1': {
      alt: 's sun, t tiger, u umbrella, v violin 카드: sun은 뱀 소리 스, umbrella는 짧게 어, violin은 윗니로 아랫입술을 무는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${S1.map((s, k) => card(k, 12 + (k % 2) * 234, 46 + Math.floor(k / 2) * 140, 222, s[0], s[1], s[2])).join('')}
      </svg>`,
      play(el) { cardsAnim(el, S1.length, 4400, 950); }
    },

    'e1-05:2': {
      alt: 'w watch, x fox, y yo-yo, z zebra 카드: watch는 입술을 동그랗게 우, x는 fox처럼 끝에서 크스, zebra는 벌 소리 즈로 시작하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${S2.map((s, k) => card(k, 12 + (k % 2) * 234, 46 + Math.floor(k / 2) * 140, 222, s[0], s[1], s[2])).join('')}
      </svg>`,
      play(el) { cardsAnim(el, S2.length, 4400, 950); }
    },

    'e1-05:3': {
      alt: 'b는 두 입술이 붙고 v는 윗니가 아랫입술에 닿는 입 모양 비교, 그리고 s는 바람 소리처럼 부드럽고 z는 벌 소리처럼 떨리는 것을 선으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 350" class="dg-svg" role="img"><g transform="translate(0,30)">
        <g class="mb">${lipsB(120)}
          <text x="120" y="38" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800"><tspan fill="${DG_C.d}">b</tspan> · bear</text>
          <text x="120" y="164" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">두 입술이 붙어요</text></g>
        <g class="mv">${lipsV(340)}
          <text x="340" y="38" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800"><tspan fill="${DG_C.c}">v</tspan> · violin</text>
          <text x="340" y="164" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">윗니가 입술에</text></g>
        <line x1="20" y1="186" x2="460" y2="186" stroke="#e5e5ea" stroke-width="2"/>
        <path class="ws" d="${wave}" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>
        <path class="wz" d="${zig}" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>
        <g class="ls"><text x="130" y="290" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800"><tspan fill="${DG_C.d}">s</tspan> 바람 소리 '스'</text></g>
        <g class="lz"><text x="360" y="290" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800"><tspan fill="${DG_C.c}">z</tspan> 벌 소리 '즈'</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.mb').setAttribute('opacity', dgP(e, 200, 500));
          q('.mv').setAttribute('opacity', dgP(e, 1300, 500));
          q('.ws').setAttribute('stroke-dashoffset', 100 * (1 - dgP(e, 2800, 1200)));
          q('.ls').setAttribute('opacity', e > 3300 ? 1 : 0);
          q('.wz').setAttribute('stroke-dashoffset', 100 * (1 - dgP(e, 4200, 1200)));
          q('.lz').setAttribute('opacity', e > 4700 ? 1 : 0);
        });
      }
    },
  });
})();
