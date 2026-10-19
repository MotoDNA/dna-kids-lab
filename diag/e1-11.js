/* 2학년 영어 · This is my mom! 어떻게 소개할까? (e1-11) */
(() => {
  const face = (cx, cy, fill, st, r = 34) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${st}" stroke-width="3"/>
    <circle cx="${cx - r * .33}" cy="${cy - r * .18}" r="4" fill="${DG_C.ink}"/><circle cx="${cx + r * .33}" cy="${cy - r * .18}" r="4" fill="${DG_C.ink}"/>
    <path d="M${cx - r * .36} ${cy + r * .28} Q${cx} ${cy + r * .62} ${cx + r * .36} ${cy + r * .28}" fill="none" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round"/>`;
  const bubble = (x, y, w, txt, fill, st, side) => {
    let tail = '';
    if (side === 'L') tail = `<path d="M${x + 1.5} ${y + 16} l-16 10 l16 10" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/><rect x="${x}" y="${y + 18}" width="4" height="16" fill="${fill}"/>`;
    if (side === 'R') tail = `<path d="M${x + w - 1.5} ${y + 16} l16 10 l-16 10" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/><rect x="${x + w - 4}" y="${y + 18}" width="4" height="16" fill="${fill}"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="50" rx="25" fill="${fill}" stroke="${st}" stroke-width="2.5"/>${tail}
      <text x="${x + w / 2}" y="${y + 34}" text-anchor="middle" fill="${DG_C.ink}" font-size="23" font-weight="800">${txt}</text>`;
  };
  const pill = (x, y, w, t, fill, st) => `<rect x="${x}" y="${y - 26}" width="${w}" height="50" rx="14" fill="${fill}" stroke="${st}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + 8}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${t}</text>`;

  const FAM = [
    { w: 'dad', k: '아빠', r: 38, f: DG_C.b, s: DG_C.d },
    { w: 'mom', k: '엄마', r: 38, f: DG_C.a, s: DG_C.c },
    { w: 'sister', k: '여자 형제', r: 29, f: DG_C.a, s: DG_C.c },
    { w: 'brother', k: '남자 형제', r: 29, f: DG_C.b, s: DG_C.d },
  ];
  const B2 = [{ t: 'This is', k: '얘는', w: 120, f: DG_C.b, s: DG_C.d }, { t: 'my friend,', k: '내 친구', w: 160, f: '#f5f5f7', s: '#d2d2d7' }, { t: 'Mina.', k: '미나야', w: 104, f: DG_C.a, s: DG_C.c }];

  Object.assign(DIAG, {
    'e1-11:0': {
      alt: '아이가 옆에 있는 엄마를 가리키며 친구에게 This is my mom.(이분은 우리 엄마야.)이라고 소개하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="mom">${face(70, 104, DG_C.a, DG_C.c, 42)}<text x="70" y="172" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">엄마</text></g>
        ${face(236, 114, DG_C.b, DG_C.d, 32)}<text x="236" y="172" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">나</text>
        ${face(404, 114, '#d6efdc', DG_C.r, 32)}<text x="404" y="172" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">친구</text>
        <path class="pt" d="M200 108 H126 m12 -12 l-12 12 l12 12" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100"/>
        <g class="s0">${pill(64, 226, 140, 'This is', DG_C.b, DG_C.d)}<text x="134" y="282" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">이분은 ~야</text></g>
        <g class="s1">${pill(216, 226, 160, 'my mom.', DG_C.a, DG_C.c)}<text x="296" y="282" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">우리 엄마</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          q('.pt').setAttribute('stroke-dashoffset', 100 * (1 - dgEase(dgP(e, 300, 800))));
          q('.mom').setAttribute('transform', `translate(70,104) scale(${1 + 0.08 * Math.sin(Math.PI * dgP(e, 900, 500))}) translate(-70,-104)`);
          const a = dgEase(dgP(e, 1600, 600)), b = dgEase(dgP(e, 2700, 600));
          q('.s0').setAttribute('opacity', a); q('.s0').setAttribute('transform', `translate(0,${16 * (1 - a)})`);
          q('.s1').setAttribute('opacity', b); q('.s1').setAttribute('transform', `translate(0,${16 * (1 - b)})`);
        });
      }
    },

    'e1-11:1': {
      alt: 'my는 나의라는 뜻이고, 가족을 my dad(아빠), my mom(엄마), my sister(여자 형제), my brother(남자 형제)로 소개하는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <text x="24" y="40" fill="${DG_C.ink}" font-size="22" font-weight="800"><tspan fill="${DG_C.c}">my</tspan> = 나의</text>
        ${FAM.map((m, i) => { const x = 66 + i * 116; return `<g class="m${i}">
          ${face(x, 116 + (38 - m.r), m.f, m.s, m.r)}
          <text x="${x}" y="190" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">my</text>
          <text x="${x}" y="218" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${m.w}</text>
          <text x="${x}" y="246" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${m.k}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => FAM.forEach((_, i) => {
          const f = dgEase(dgP(e, 300 + i * 900, 500));
          q('.m' + i).setAttribute('opacity', f);
          q('.m' + i).setAttribute('transform', `translate(0,${14 * (1 - f)})`);
        }));
      }
    },

    'e1-11:2': {
      alt: 'This is my friend, Mina. 문장을 This is(얘는), my friend(내 친구), Mina(미나야) 조각으로 나누어 친구 이름을 넣어 소개하는 그림',
      svg: `<svg viewBox="0 0 480 210" class="dg-svg" role="img">
        ${(() => { let x = 36; return B2.map((b, i) => { const g = `<g class="b${i}">${pill(x, 92, b.w, b.t, b.f, b.s)}
          <path d="M${x + b.w / 2} 126 v22" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="4 4"/>
          <text x="${x + b.w / 2}" y="178" text-anchor="middle" fill="${i === 2 ? DG_C.c : DG_C.sub}" font-size="22" font-weight="800">${b.k}</text></g>`; x += b.w + 12; return g; }).join(''); })()}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          B2.forEach((_, i) => {
            const f = dgEase(dgP(e, 300 + i * 1100, 600));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(${24 * (1 - f)},0)`);
          });
        });
      }
    },

    'e1-11:3': {
      alt: '소개받은 아이가 Nice to meet you.(만나서 반가워.)라고 하면 상대가 too(~도)를 붙여 Nice to meet you, too.라고 대답하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${face(52, 84, DG_C.a, DG_C.c)}
        ${face(428, 186, DG_C.b, DG_C.d)}
        <g class="q">${bubble(104, 58, 220, 'Nice to meet you.', '#f5f5f7', '#d2d2d7', 'L')}
          <text x="214" y="134" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">만나서 반가워.</text></g>
        <g class="a">${bubble(108, 162, 270, 'Nice to meet you, <tspan fill="' + DG_C.c + '">too</tspan>.', DG_C.b, DG_C.d, 'R')}
          <text x="243" y="244" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">나<tspan fill="${DG_C.c}">도</tspan> 만나서 반가워.</text>
          <text x="243" y="274" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">too = ~도</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 3800, e => {
          q('.q').setAttribute('opacity', dgEase(dgP(e, 300, 500)));
          q('.a').setAttribute('opacity', dgEase(dgP(e, 1900, 500)));
        });
      }
    },
  });
})();
