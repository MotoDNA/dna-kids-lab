/* 6학년 영어 · 나는 커서 무엇이 되고 싶을까? (e5-06) */
(() => {
  const C = DG_C, G = '#d6efdc';
  const tw = (s, fs) => 0.92 * [...s].reduce((a, ch) => a + fs * (/[il.,'!|: ]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[ㄱ-힣]/.test(ch) ? 1.0 : 0.58), 0);

  /* 0: a / an */
  const A0 = [['doctor', '의사'], ['teacher', '선생님'], ['cook', '요리사'], ['pilot', '조종사']];
  const N0 = [['artist', '화가'], ['engineer', '기술자']];
  const item = (cls, x, y, art, w, k, vow) => `<g class="${cls}">
    <text x="${x}" y="${y}" fill="${C.ink}" font-size="22" font-weight="800"><tspan fill="${vow ? C.c : C.d}">${art}</tspan> <tspan fill="${vow ? C.c : C.ink}">${w[0]}</tspan>${w.slice(1)}</text>
    <text x="${x}" y="${y + 22}" fill="${C.sub}" font-size="18" font-weight="700">${k}</text></g>`;

  /* 1 */
  const J1 = [['a cook.', '요리사'], ['a scientist.', '과학자'], ['a pilot.', '조종사']];

  Object.assign(DIAG, {
    'e5-06:0': {
      alt: '자음 소리로 시작하는 doctor, teacher, cook, pilot 앞에는 a를, 모음 소리로 시작하는 artist, engineer 앞에는 an을 붙이는 것을 두 칸으로 나눠 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <rect x="16" y="48" width="216" height="270" rx="18" fill="${C.b}" fill-opacity=".35"/>
        <rect x="248" y="48" width="216" height="270" rx="18" fill="${C.a}" fill-opacity=".45"/>
        <text x="124" y="90" text-anchor="middle" fill="${C.d}" font-size="30" font-weight="800">a</text>
        <text x="356" y="90" text-anchor="middle" fill="${C.c}" font-size="30" font-weight="800">an</text>
        ${A0.map(([w, k], i) => item('a' + i, 40, 134 + i * 48, 'a', w, k, false)).join('')}
        ${N0.map(([w, k], i) => item('n' + i, 272, 134 + i * 48, 'an', w, k, true)).join('')}
        <g class="vw"><text x="356" y="258" text-anchor="middle" fill="${C.ink}" font-size="18" font-weight="800">모음 소리로 시작</text>
          <text x="356" y="288" text-anchor="middle" fill="${C.c}" font-size="18" font-weight="800">(아·에·이·오·어 소리)</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          A0.forEach((w, i) => { const f = dgEase(dgP(e, 300 + i * 600, 500)); q('.a' + i).setAttribute('opacity', f); q('.a' + i).setAttribute('transform', `translate(${-14 * (1 - f)},0)`); });
          N0.forEach((w, i) => { const f = dgEase(dgP(e, 3000 + i * 700, 500)); q('.n' + i).setAttribute('opacity', f); q('.n' + i).setAttribute('transform', `translate(${14 * (1 - f)},0)`); });
          q('.vw').setAttribute('opacity', dgP(e, 4600, 600));
        });
      }
    },

    'e5-06:1': {
      alt: 'What do you want to be? 하고 물으면 I want to be 뒤에 a cook., a scientist., a pilot.처럼 직업을 붙여 대답하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="qq"><rect x="16" y="44" width="310" height="46" rx="23" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="171" y="75" text-anchor="middle" fill="${C.ink}" font-size="21" font-weight="700">What do you want to be?</text></g>
        <g class="st"><rect x="16" y="166" width="180" height="50" rx="14" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>
          <text x="106" y="199" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">I want to be</text>
          <text x="106" y="244" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">~이 되고 싶어</text></g>
        ${J1.map(([w, k], i) => { const y = 132 + i * 58; return `<g class="j${i}">
          <path d="M200 191 C222 191 214 ${y} 236 ${y}" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linecap="round"/>
          <rect x="240" y="${y - 23}" width="224" height="46" rx="14" fill="${i === 1 ? C.a : '#fff'}" stroke="${i === 1 ? C.c : '#d2d2d7'}" stroke-width="2.5"/>
          <text x="256" y="${y + 8}" fill="${C.ink}" font-size="22" font-weight="800">${w}</text>
          <text x="452" y="${y + 7}" text-anchor="end" fill="${C.sub}" font-size="18" font-weight="700">${k}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          q('.qq').setAttribute('opacity', dgP(e, 200, 500));
          q('.st').setAttribute('opacity', dgP(e, 1100, 500));
          J1.forEach((j, i) => { const f = dgEase(dgP(e, 2000 + i * 800, 500)); q('.j' + i).setAttribute('opacity', f); q('.j' + i).setAttribute('transform', `translate(${16 * (1 - f)},0)`); });
        });
      }
    },

    'e5-06:2': {
      alt: 'Why? 하고 이유를 물으면 I want to be a vet 뒤에 because I like animals.를 이어 붙여 이유를 말하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="qq"><rect x="16" y="44" width="96" height="46" rx="23" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="64" y="75" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">Why?</text>
          <text x="126" y="74" fill="${C.sub}" font-size="18" font-weight="700">왜?</text></g>
        <g class="s1"><rect x="16" y="118" width="268" height="50" rx="14" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>
          <text x="150" y="151" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">I want to be a vet</text>
          <text x="300" y="150" fill="${C.sub}" font-size="18" font-weight="700">수의사가 되고 싶어</text></g>
        <g class="bc"><rect x="60" y="196" width="118" height="50" rx="14" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
          <text x="119" y="229" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">because</text>
          <text x="119" y="272" text-anchor="middle" fill="${C.c}" font-size="18" font-weight="800">왜냐하면</text>
          <path d="M38 168 v53 h18" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="rs"><rect x="186" y="196" width="190" height="50" rx="14" fill="${G}" stroke="${C.r}" stroke-width="2.5"/>
          <text x="281" y="229" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">I like animals.</text>
          <text x="281" y="272" text-anchor="middle" fill="${C.r}" font-size="18" font-weight="800">이유</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          q('.qq').setAttribute('opacity', dgP(e, 200, 400));
          q('.s1').setAttribute('opacity', dgP(e, 900, 500));
          const b = dgEase(dgP(e, 1900, 600));
          q('.bc').setAttribute('opacity', b); q('.bc').setAttribute('transform', `translate(0,${-16 * (1 - b)})`);
          const r = dgEase(dgP(e, 2900, 600));
          q('.rs').setAttribute('opacity', r); q('.rs').setAttribute('transform', `translate(${20 * (1 - r)},0)`);
        });
      }
    },
  });
})();
