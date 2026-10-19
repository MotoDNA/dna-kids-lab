/* 4학년 일본어 · 일본 친구를 만나면 어떻게 인사할까? (j3-07) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const sun = (r, rays = 1) => `${rays ? `<g stroke="${DG_C.c}" stroke-width="3.5" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<line x1="${(r + 5) * c}" y1="${(r + 5) * s}" x2="${(r + 11) * c}" y2="${(r + 11) * s}"/>`; }).join('')}</g>` : ''}<circle r="${r}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5"/>`;
  const ICON = {
    am: `<clipPath id="j307c"><rect x="-30" y="-30" width="60" height="38"/></clipPath><g clip-path="url(#j307c)" transform="translate(0,6)">${sun(13)}</g><line x1="-28" y1="14" x2="28" y2="14" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round"/>`,
    noon: sun(13),
    pm: `<path d="M6 -20 A20 20 0 1 0 18 12 A16 16 0 1 1 6 -20 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/>`,
  };
  /* 글자 하나씩: は(와로 읽음)는 주황 */
  const kana = (x, y, str, fs, hiIdx = -1) => [...str].map((k, i) => `<text ${JA} x="${x + i * fs * 1.02}" y="${y}" fill="${i === hiIdx ? DG_C.c : DG_C.ink}" font-size="${fs}" font-weight="${i === hiIdx ? 800 : 600}">${k}</text>`).join('');
  const G0 = [
    { k: 'am', t: '아침', s: 'おはようございます', r: '오하요- 고자이마스', hi: -1 },
    { k: 'noon', t: '낮', s: 'こんにちは', r: '콘니치<tspan fill="${C}">와</tspan>', hi: 4 },
    { k: 'pm', t: '저녁', s: 'こんばんは', r: '콤방<tspan fill="${C}">와</tspan>', hi: 4 },
  ];
  const bowl = full => `${full ? `<path d="M-22 -2 C-20 -20 20 -20 22 -2 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>` : ''}<path d="M-28 -2 H28 C26 18 -26 18 -28 -2 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const face = (col, fill) => `<circle r="16" fill="${fill}" stroke="${col}" stroke-width="3"/><circle cx="-5" cy="-3" r="2.2" fill="${DG_C.ink}"/><circle cx="5" cy="-3" r="2.2" fill="${DG_C.ink}"/><path d="M-5 5 Q0 9 5 5" fill="none" stroke="${DG_C.ink}" stroke-width="2" stroke-linecap="round"/>`;

  Object.assign(DIAG, {
    'j3-07:0': {
      alt: '아침 해 그림 옆에 おはようございます(오하요- 고자이마스), 한낮 해 옆에 こんにちは(콘니치와), 저녁 달 옆에 こんばんは(콤방와). 끝 글자 は는 와로 읽어요',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${G0.map((g, i) => { const y = i * 84; return `<g class="g${i}">
          <rect x="6" y="${y}" width="468" height="76" rx="16" fill="${i === 2 ? DG_C.b : DG_C.a}" fill-opacity="${i === 2 ? .35 : .35}"/>
          <g transform="translate(44,${y + 27})">${ICON[g.k]}</g>
          <text x="44" y="${y + 70}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="800">${g.t}</text>
          ${kana(90, y + 38, g.s, 26, g.hi)}
          <text x="90" y="${y + 66}" fill="${DG_C.d}" font-size="18" font-weight="800">${g.r.replace(/\$\{C\}/g, DG_C.c)}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          G0.forEach((g, i) => {
            const f = dgEase(dgP(e, 200 + i * 1100, 700));
            q('.g' + i).setAttribute('opacity', f);
            q('.g' + i).setAttribute('transform', `translate(${-20 * (1 - f)},0)`);
          });
        });
      }
    },

    'j3-07:1': {
      alt: 'おはよう를 오하요우라고 끊어 읽지 않고, う가 앞의 よ 소리를 길게 늘여 오하요-가 된다는 것을 늘어나는 막대로 보여 주는 그림. ありがとう는 아리가토-, さようなら는 사요-나라',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${[...'おはよう'].map((k, i) => { const x = 60 + i * 96, u = i === 3; return `<g class="${u ? 'u' : ''}"><rect x="${x - 38}" y="0" width="76" height="76" rx="14" fill="${u ? '#f5f5f7' : DG_C.b}" stroke="${u ? '#d2d2d7' : DG_C.d}" stroke-width="2.5" ${u ? 'stroke-dasharray="6 5"' : ''}/>
          <text ${JA} x="${x}" y="54" text-anchor="middle" fill="${u ? DG_C.sub : DG_C.ink}" font-size="44" font-weight="600">${k}</text></g>
          ${u ? '' : `<text x="${x}" y="122" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${['오', '하', '요'][i]}</text>`}`; }).join('')}
        <rect class="bar" x="262" y="104" width="10" height="16" rx="8" fill="${DG_C.c}"/>
        <text class="lg" x="240" y="156" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">오하요우 <tspan fill="${RED}">✕</tspan>   <tspan dx="14" fill="${DG_C.c}" font-weight="800">오하요-</tspan> <tspan fill="${DG_C.r}">✓</tspan></text>
        <g class="w"><line x1="20" y1="168" x2="460" y2="168" stroke="#e5e5ea" stroke-width="2"/>
          ${[['ありがとう', '아리가토-'], ['さようなら', '사요-나라']].map((w, i) => { const x = 14 + i * 230; return `<rect x="${x}" y="184" width="222" height="70" rx="16" fill="${DG_C.a}" fill-opacity=".55"/>
            <text ${JA} x="${x + 111}" y="214" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">${w[0]}</text>
            <text x="${x + 111}" y="242" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">${w[1]}</text>`; }).join('')}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          // う는 따로 읽지 않고, 요 소리가 う 자리까지 길게 늘어나요
          const b = dgEase(dgP(e, 900, 1600));
          q('.bar').setAttribute('width', 10 + 126 * b);
          q('.u').setAttribute('opacity', 1 - .5 * b);
          q('.lg').setAttribute('opacity', dgP(e, 2700, 500));
          q('.w').setAttribute('opacity', dgP(e, 3800, 700));
        });
      }
    },

    'j3-07:2': {
      alt: '헤어질 때는 さようなら(사요-나라), 친구끼리는 またね(마타네, 또 봐), 밤에 잘 때는 おやすみなさい(오야스미나사이, 잘 자요)라고 하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img"><g transform="translate(0,44)">
        <g class="l"><rect x="6" y="0" width="230" height="230" rx="18" fill="${DG_C.a}" fill-opacity=".4"/>
          <text x="121" y="30" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">헤어질 때</text>
          <g transform="translate(96,66)">${face(DG_C.c, DG_C.a)}</g><g transform="translate(146,66)">${face(DG_C.d, DG_C.b)}</g>
          <path d="M60 70 l-8 -24 M68 66 l-2 -26" stroke="${DG_C.c}" stroke-width="3.5" stroke-linecap="round"/>
          <text ${JA} x="121" y="136" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">さようなら</text>
          <text x="121" y="160" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">사요-나라</text>
          <text ${JA} x="121" y="196" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="700">またね</text>
          <text x="121" y="220" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">마타네 <tspan fill="${DG_C.sub}">친구끼리</tspan></text></g>
        <g class="r"><rect x="244" y="0" width="230" height="230" rx="18" fill="${DG_C.b}" fill-opacity=".4"/>
          <text x="359" y="30" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">잘 때</text>
          <g transform="translate(340,72)">${ICON.pm}</g>
          <text x="374" y="62" fill="${DG_C.sub}" font-size="18" font-weight="800">z z</text>
          <text ${JA} x="359" y="146" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="700">おやすみなさい</text>
          <text x="359" y="172" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">오야스미나사이</text>
          <text x="359" y="200" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">잘 자요</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 3600, e => {
          q('.l').setAttribute('opacity', dgP(e, 200, 600));
          q('.r').setAttribute('opacity', dgP(e, 1600, 600));
        });
      }
    },

    'j3-07:3': {
      alt: '고맙다는 ありがとう(아리가토-)에 どういたしまして(천만에요)로 대답하고, 밥 먹기 전에는 いただきます(이타다키마스), 다 먹은 뒤에는 ごちそうさまでした(고치소-사마데시타)라고 하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,44)">
        <g class="a0"><rect x="6" y="0" width="176" height="84" rx="20" fill="${DG_C.a}" fill-opacity=".6"/>
          <text ${JA} x="94" y="38" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">ありがとう</text>
          <text x="94" y="68" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">고마워</text></g>
        <g class="a1"><path d="M190 42 h22 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="222" y="0" width="252" height="84" rx="20" fill="${DG_C.b}" fill-opacity=".6"/>
          <text ${JA} x="348" y="38" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="700">どういたしまして</text>
          <text x="348" y="68" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">천만에요</text></g>
        <line x1="20" y1="104" x2="460" y2="104" stroke="#e5e5ea" stroke-width="2"/>
        <g class="b0"><g transform="translate(46,150)">${bowl(1)}</g>
          <text ${JA} x="84" y="150" fill="${DG_C.ink}" font-size="22" font-weight="700">いただきます</text>
          <text x="84" y="178" fill="${DG_C.sub}" font-size="18" font-weight="700">먹기 전</text></g>
        <g class="b1"><g transform="translate(46,224)">${bowl(0)}</g>
          <text ${JA} x="84" y="224" fill="${DG_C.ink}" font-size="22" font-weight="700">ごちそうさまでした</text>
          <text x="84" y="252" fill="${DG_C.sub}" font-size="18" font-weight="700">다 먹은 뒤</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          q('.a0').setAttribute('opacity', dgP(e, 200, 500));
          q('.a1').setAttribute('opacity', dgP(e, 1100, 500));
          q('.b0').setAttribute('opacity', dgP(e, 2300, 500));
          q('.b1').setAttribute('opacity', dgP(e, 3300, 500));
        });
      }
    },
  });
})();
