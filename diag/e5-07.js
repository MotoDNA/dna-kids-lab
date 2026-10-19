/* 5학년 영어 · 이번 방학에 무엇을 할 거야? 계획을 영어로 말해 볼까? (e5-07) */
(() => {
  const C = DG_C, G = '#d6efdc', RED = '#ff3b30';
  const tw = (s, fs) => 0.92 * [...s].reduce((a, ch) => a + fs * (/[il.,'!|: ]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[ㄱ-힣]/.test(ch) ? 1.0 : 0.58), 0);
  const chips = (cls, x, y, list) => list.map(([s, f, st], i) => {
    const w = tw(s, 22) + 26, out = `<g class="${cls}${i}"><rect x="${x}" y="${y - 22}" width="${w}" height="44" rx="12" fill="${f}" stroke="${st}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + 8}" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">${s}</text></g>`;
    x += w + 8; return out;
  }).join('');

  /* 0 */
  const R0 = [
    [["I'm", C.a, C.c], ['going to', C.b, C.d], ['swim.', G, C.r]],
    [['She is', C.a, C.c], ['going to', C.b, C.d], ['read books.', G, C.r]],
  ];
  /* 1 */
  const T1 = [['tomorrow', '내일'], ['this weekend', '이번 주말'], ['next week', '다음 주'], ['this summer', '이번 여름']];
  const ty = i => 64 + i * 42;
  const S1 = "I'm going to go camping", S1w = tw(S1, 21), CHW = tw('this weekend', 21) + 22;
  const S1x = (480 - (S1w + 8 + CHW + 8)) / 2;

  Object.assign(DIAG, {
    'e5-07:0': {
      alt: '지금에서 앞으로를 가리키는 화살표와 함께, I\'m going to swim. / She is going to read books. 처럼 am·is 뒤에 going to와 동사의 원래 모양을 쓰는 것을 블록으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="tl"><circle cx="40" cy="64" r="9" fill="${C.sub}"/>
          <text x="40" y="100" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="800">지금</text>
          <line class="tla" x1="56" y1="64" x2="300" y2="64" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
          <path class="tlh" d="M300 64 m-12 -11 l12 11 l-12 11" fill="none" stroke="${C.d}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <text class="tlt" x="252" y="100" text-anchor="middle" fill="${C.d}" font-size="18" font-weight="800">앞으로 할 일</text></g>
        ${chips('a', 24, 150, R0[0])}
        <text class="a3" x="${24 + (tw("I'm", 22) + 26) / 2}" y="190" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">I am</text>
        ${chips('b', 24, 228, R0[1])}
        <g class="lg"><rect x="300" y="262" width="20" height="20" rx="6" fill="${G}" stroke="${C.r}" stroke-width="2.5"/>
          <text x="328" y="279" fill="${C.ink}" font-size="18" font-weight="800">동사 원래 모양</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          const t = dgEase(dgP(e, 200, 900));
          q('.tla').setAttribute('x2', 56 + 244 * t);
          q('.tlh').setAttribute('transform', `translate(${-244 * (1 - t)},0)`);
          q('.tlt').setAttribute('opacity', dgP(e, 900, 400));
          ['a', 'b'].forEach((r, k) => [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 1500 + k * 1800 + i * 450, 450));
            q('.' + r + i).setAttribute('opacity', f);
            q('.' + r + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`);
          }));
          q('.a3').setAttribute('opacity', dgP(e, 2000, 400));
          q('.lg').setAttribute('opacity', dgP(e, 5000, 500));
        });
      }
    },

    'e5-07:1': {
      alt: '지금부터 아래로 갈수록 먼 앞날인 tomorrow, this weekend, next week, this summer를 시간 줄로 보여 주고, this weekend가 I\'m going to go camping 문장 끝에 붙는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <line x1="40" y1="30" x2="40" y2="${ty(3)}" stroke="#e5e5ea" stroke-width="5" stroke-linecap="round"/>
        <line class="ln" x1="40" y1="30" x2="40" y2="${ty(3)}" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="40" cy="30" r="8" fill="${C.sub}"/><text x="62" y="37" fill="${C.sub}" font-size="18" font-weight="800">지금</text>
        ${T1.map(([en, k], i) => `<g class="t${i}"><circle cx="40" cy="${ty(i)}" r="${i === 1 ? 10 : 8}" fill="${i === 1 ? C.c : C.d}" stroke="#fff" stroke-width="3"/>
          ${i === 1 ? `<rect x="58" y="${ty(i) - 19}" width="${tw(en, 21) + 22}" height="38" rx="12" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>` : ''}
          <text x="69" y="${ty(i) + 8}" fill="${C.ink}" font-size="21" font-weight="800">${en}</text>
          <text x="250" y="${ty(i) + 7}" fill="${C.sub}" font-size="18" font-weight="700">${k}</text></g>`).join('')}
        <line x1="16" y1="236" x2="464" y2="236" stroke="#e5e5ea" stroke-width="2"/>
        <g class="sen"><text x="${S1x}" y="290" fill="${C.ink}" font-size="21" font-weight="700">${S1}</text>
          <text x="${S1x + S1w + 8 + CHW + 6}" y="290" fill="${C.ink}" font-size="21" font-weight="800">.</text></g>
        <g class="fly"><rect x="${S1x + S1w + 8}" y="263" width="${CHW}" height="38" rx="12" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
          <text x="${S1x + S1w + 8 + CHW / 2}" y="290" text-anchor="middle" fill="${C.ink}" font-size="21" font-weight="800">this weekend</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const fx = 58 - (S1x + S1w + 8), fy = ty(1) - 282;
        dgAnim(el, 6400, e => {
          q('.ln').setAttribute('y2', 30 + (ty(3) - 30) * dgEase(dgP(e, 200, 2800)));
          T1.forEach((t, i) => q('.t' + i).setAttribute('opacity', dgP(e, 500 + i * 700, 400)));
          q('.sen').setAttribute('opacity', dgP(e, 3600, 500));
          const f = dgEase(dgP(e, 4400, 1100));
          q('.fly').setAttribute('opacity', e >= 4400 ? 1 : 0);
          q('.fly').setAttribute('transform', `translate(${fx * (1 - f)},${fy * (1 - f)})`);
        });
      }
    },

    'e5-07:2': {
      alt: 'Are you going to play baseball? 하고 물으면 Yes, I am. 또는 No, I\'m not.으로 대답하고, 함께하자고 할 때는 Let\'s go together!라고 하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="qq"><rect x="16" y="44" width="370" height="48" rx="24" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="201" y="76" text-anchor="middle" fill="${C.ink}" font-size="21" font-weight="700"><tspan fill="${C.c}" font-weight="800">Are</tspan> you going to play baseball?</text></g>
        <path class="br0" pathLength="100" d="M150 92 C150 120 120 120 120 148" fill="none" stroke="${C.r}" stroke-width="3.5" stroke-linecap="round"/>
        <path class="br1" pathLength="100" d="M250 92 C250 120 340 120 340 148" fill="none" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>
        <g class="y"><rect x="30" y="150" width="180" height="50" rx="16" fill="${G}" stroke="${C.r}" stroke-width="2.5"/>
          <text x="120" y="183" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">Yes, I <tspan fill="${C.c}">am</tspan>.</text></g>
        <g class="n"><rect x="250" y="150" width="180" height="50" rx="16" fill="#ffe0de" stroke="${RED}" stroke-width="2.5"/>
          <text x="340" y="183" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">No, I'<tspan fill="${C.c}">m</tspan> not.</text></g>
        <g class="lt"><path d="M120 200 v26" fill="none" stroke="${C.d}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 8"/>
          <rect x="30" y="232" width="230" height="50" rx="25" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>
          <text x="145" y="265" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">Let's go together!</text>
          <text x="276" y="264" fill="${C.sub}" font-size="18" font-weight="700">같이 가자!</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          q('.qq').setAttribute('opacity', dgP(e, 200, 500));
          const a = dgEase(dgP(e, 1000, 600));
          ['.br0', '.br1'].forEach(s => { q(s).setAttribute('stroke-dasharray', `${100 * a} 200`); q(s).setAttribute('opacity', a > 0 ? 1 : 0); });
          q('.y').setAttribute('opacity', dgP(e, 1700, 500));
          q('.n').setAttribute('opacity', dgP(e, 2500, 500));
          q('.lt').setAttribute('opacity', dgP(e, 3700, 600));
        });
      }
    },
  });
})();
