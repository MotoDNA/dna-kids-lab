/* 5학년 영어 · 어제 한 일을 영어로 말해 볼까? (e5-05) */
(() => {
  const C = DG_C;
  const tw = (s, fs) => 0.92 * [...s].reduce((a, ch) => a + fs * (/[il.,'!|: ]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[ㄱ-힣]/.test(ch) ? 1.0 : 0.58), 0);
  const arrow = (x, y, len, col) => `<path d="M${x} ${y} h${len} m-9 -9 l9 9 l-9 9" fill="none" stroke="${col}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* 0: -ed 붙이기 */
  const R0 = ['play', 'watch', 'visit'];
  /* 1: 특별한 과거형 */
  const R1 = [['go', 'went'], ['eat', 'ate'], ['see', 'saw'], ['have', 'had'], ['make', 'made']];
  /* 2: 때 */
  const T2 = [{ x: 96, e: 'last weekend', k: '지난 주말' }, { x: 264, e: 'yesterday', k: '어제' }, { x: 410, e: 'today', k: '오늘' }];

  Object.assign(DIAG, {
    'e5-05:0': {
      alt: 'play, watch, visit 뒤에 -ed가 붙어 played, watched, visited가 되고, I played soccer yesterday. 처럼 지난 일을 말하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${R0.map((w, i) => { const y = 72 + i * 62; return `<g class="r${i}">
          <rect x="40" y="${y - 23}" width="140" height="46" rx="14" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="110" y="${y + 9}" text-anchor="middle" fill="${C.ink}" font-size="26" font-weight="800">${w}</text>
          ${arrow(198, y, 44, C.sub)}</g>
          <text class="p${i}" x="262" y="${y + 9}" fill="${C.ink}" font-size="26" font-weight="800">${w}<tspan class="ed${i}" fill="${C.c}">ed</tspan></text>`; }).join('')}
        <g class="sen"><rect x="24" y="236" width="432" height="50" rx="16" fill="${C.a}" fill-opacity=".45"/>
          <text x="240" y="269" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="700">I play<tspan fill="${C.c}" font-weight="800">ed</tspan> soccer <tspan fill="${C.d}" font-weight="800">yesterday</tspan>.</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5800, e => {
          R0.forEach((w, i) => {
            const st = 200 + i * 1300;
            q('.r' + i).setAttribute('opacity', dgP(e, st, 400));
            q('.p' + i).setAttribute('opacity', dgP(e, st + 400, 400));
            const f = dgEase(dgP(e, st + 900, 500));
            q('.ed' + i).setAttribute('fill-opacity', f);
            q('.ed' + i).setAttribute('dx', (24 * (1 - f)).toFixed(1));
          });
          q('.sen').setAttribute('opacity', dgP(e, 4400, 600));
        });
      }
    },

    'e5-05:1': {
      alt: '모양이 특별하게 바뀌는 동사 짝꿍 카드: go-went, eat-ate, see-saw, have-had, make-made',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <text x="160" y="50" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="800">지금</text>
        <text x="340" y="50" text-anchor="middle" fill="${C.c}" font-size="18" font-weight="800">지난 일</text>
        ${R1.map(([a, b], i) => { const y = 86 + i * 54; return `<g class="a${i}">
          <rect x="100" y="${y - 22}" width="120" height="44" rx="12" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="160" y="${y + 8}" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800">${a}</text>
          ${arrow(234, y, 40, C.sub)}</g>
          <g class="b${i}" transform="translate(340 ${y})"><g class="bs${i}"><rect x="-60" y="-22" width="120" height="44" rx="12" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
          <text x="0" y="8" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800">${b}</text></g></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          R1.forEach((r, i) => {
            const st = 200 + i * 1000;
            q('.a' + i).setAttribute('opacity', dgP(e, st, 400));
            const f = dgEase(dgP(e, st + 500, 500));
            q('.bs' + i).setAttribute('transform', `scale(${Math.max(0.01, f)},1)`);
            q('.b' + i).setAttribute('opacity', f > 0 ? 1 : 0);
          });
        });
      }
    },

    'e5-05:2': {
      alt: 'What did you do yesterday? 하고 물으면 I visited my grandma. 처럼 과거형으로 대답하고, 오늘보다 앞선 지난 주말·어제가 지난 일이라는 것을 시간 줄로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <g class="qq"><rect x="16" y="46" width="350" height="46" rx="23" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="191" y="77" text-anchor="middle" fill="${C.ink}" font-size="21" font-weight="700">What <tspan fill="${C.d}" font-weight="800">did</tspan> you do yesterday?</text></g>
        <g class="aa"><rect x="190" y="104" width="274" height="46" rx="23" fill="${C.a}" fill-opacity=".55" stroke="${C.c}" stroke-width="2.5"/>
          <text x="327" y="135" text-anchor="middle" fill="${C.ink}" font-size="21" font-weight="700">I <tspan fill="${C.c}" font-weight="800">visited</tspan> my grandma.</text></g>
        <rect class="past" x="40" y="196" width="${T2[2].x - 40}" height="20" rx="10" fill="${C.a}" fill-opacity=".6"/>
        <line x1="40" y1="206" x2="456" y2="206" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"/>
        <path d="M456 206 m-10 -9 l10 9 l-10 9" fill="none" stroke="${C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="pl" x="${(40 + T2[2].x) / 2}" y="186" text-anchor="middle" fill="${C.c}" font-size="18" font-weight="800">지난 일 → 과거형</text>
        ${T2.map((t, i) => `<g class="t${i}"><circle cx="${t.x}" cy="206" r="${i === 2 ? 11 : 9}" fill="${i === 2 ? C.d : C.c}" stroke="#fff" stroke-width="3"/>
          <text x="${t.x}" y="246" text-anchor="middle" fill="${C.ink}" font-size="20" font-weight="800">${t.e}</text>
          <text x="${t.x}" y="274" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">${t.k}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.qq').setAttribute('opacity', dgP(e, 200, 500));
          q('.aa').setAttribute('opacity', dgP(e, 1300, 500));
          q('.t2').setAttribute('opacity', dgP(e, 2300, 400));
          q('.t1').setAttribute('opacity', dgP(e, 2900, 400));
          q('.t0').setAttribute('opacity', dgP(e, 3500, 400));
          const f = dgEase(dgP(e, 2900, 1400)), w = (T2[2].x - 40) * f;
          q('.past').setAttribute('x', T2[2].x - w); q('.past').setAttribute('width', w);
          q('.pl').setAttribute('opacity', dgP(e, 4400, 500));
        });
      }
    },
  });
})();
