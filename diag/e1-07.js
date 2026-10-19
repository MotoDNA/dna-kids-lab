/* 1학년 영어 · I, you, the, a — 책에 자꾸 나오는 낱말은 뭘까? (e1-07) */
(() => {
  const face = (cx, cy, fill, st) => `<circle cx="${cx}" cy="${cy}" r="36" fill="${fill}" stroke="${st}" stroke-width="3"/>
    <circle cx="${cx - 12}" cy="${cy - 6}" r="4" fill="${DG_C.ink}"/><circle cx="${cx + 12}" cy="${cy - 6}" r="4" fill="${DG_C.ink}"/>
    <path d="M${cx - 13} ${cy + 10} Q${cx} ${cy + 22} ${cx + 13} ${cy + 10}" fill="none" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round"/>`;

  /* 0: 책 속 문장 — [낱말, 자주 나오는 낱말인가] */
  const BOOK = [
    [['I', 1], ['see', 0], ['a', 1], ['dog.', 0]],
    [['I', 1], ['see', 0], ['the', 1], ['sun.', 0]],
    [['I', 1], ['like', 0], ['you.', 1]],
  ];
  const SW = ['I', 'you', 'the', 'a'];

  /* 3: I see ___. */
  const END = [['a cat.', '고양이'], ['the sun.', '해'], ['you.', '너']];

  Object.assign(DIAG, {
    'e1-07:0': {
      alt: '책 속 문장 I see a dog. I see the sun. I like you.에서 I, a, the, you가 여러 번 나오는 것을 색칠해 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="40" y="40" width="400" height="168" rx="18" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
        ${BOOK.map((ln, r) => `<text x="76" y="${90 + r * 46}" font-size="28" font-weight="700" fill="${DG_C.ink}" xml:space="preserve">${ln.map(([w, s]) => s ? `<tspan class="sw" fill="${DG_C.ink}">${w.replace('.', '')}</tspan>${w.endsWith('.') ? '.' : ''}` : w).join(' ')}</text>`).join('')}
        ${SW.map((w, i) => `<g class="cd${i}"><rect x="${48 + i * 100}" y="232" width="84" height="52" rx="14" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>
          <text x="${90 + i * 100}" y="267" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${w}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)], q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          qa('.sw').forEach((t, i) => t.setAttribute('fill', e > 1000 + i * 380 ? DG_C.c : DG_C.ink));
          SW.forEach((_, i) => q('.cd' + i).setAttribute('opacity', dgEase(dgP(e, 3800 + i * 400, 400))));
        });
      }
    },

    'e1-07:1': {
      alt: '나를 가리키는 말은 I(나), 상대를 가리키는 말은 you(너)이고, I like you.에서 I는 언제나 대문자로 쓰는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="me">${face(110, 96, DG_C.a, DG_C.c)}
          <text x="110" y="172" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800"><tspan fill="${DG_C.c}">I</tspan> <tspan fill="${DG_C.sub}" font-size="22">나</tspan></text></g>
        <g class="yo">${face(370, 96, DG_C.b, DG_C.d)}
          <text x="370" y="172" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800"><tspan fill="${DG_C.d}">you</tspan> <tspan fill="${DG_C.sub}" font-size="22">너</tspan></text></g>
        <path class="pt" d="M160 96 H300 m-12 -12 l12 12 l-12 12" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100"/>
        <g class="sn"><rect x="96" y="206" width="288" height="56" rx="16" fill="#f5f5f7"/>
          <text x="240" y="244" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800"><tspan fill="${DG_C.c}">I</tspan> like <tspan fill="${DG_C.d}">you</tspan>.</text></g>
        <text class="cap" x="176" y="292" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">I는 늘 대문자</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5200, e => {
          q('.me').setAttribute('opacity', dgP(e, 200, 500));
          q('.yo').setAttribute('opacity', dgP(e, 1100, 500));
          q('.pt').setAttribute('stroke-dashoffset', 100 * (1 - dgEase(dgP(e, 1100, 800))));
          q('.sn').setAttribute('opacity', dgP(e, 2600, 500));
          qa('.cap').forEach(c => c.setAttribute('opacity', e > 3600 ? 1 : 0));
        });
      }
    },

    'e1-07:2': {
      alt: 'a cat은 고양이 한 마리(a는 하나), the sun은 모두가 다 아는 그 해(the는 그)라는 것을 그림으로 비교',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="pa">
          <text x="120" y="58" text-anchor="middle" fill="${DG_C.d}" font-size="24" font-weight="800">a = 하나</text>
          <g transform="translate(120,138)">
            <path d="M-30 -18 L-26 -48 L-6 -30 Z M30 -18 L26 -48 L6 -30 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>
            <circle r="36" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
            <circle cx="-12" cy="-6" r="4" fill="${DG_C.ink}"/><circle cx="12" cy="-6" r="4" fill="${DG_C.ink}"/>
            <path d="M-4 8 L4 8 L0 13 Z" fill="${DG_C.ink}"/>
            <path d="M-12 18 Q0 24 12 18" fill="none" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linecap="round"/>
          </g>
          <text x="120" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800"><tspan fill="${DG_C.d}">a</tspan> cat</text>
          <text x="120" y="262" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">고양이 한 마리</text>
        </g>
        <line x1="240" y1="50" x2="240" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        <g class="pb">
          <text x="360" y="58" text-anchor="middle" fill="${DG_C.c}" font-size="24" font-weight="800">the = 그</text>
          <g transform="translate(360,138)">
            ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="-44" x2="0" y2="-56" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}
            <circle r="34" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
          </g>
          <text x="360" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800"><tspan fill="${DG_C.c}">the</tspan> sun</text>
          <text x="360" y="262" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">다 아는 해</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          const a = dgEase(dgP(e, 200, 700)), b = dgEase(dgP(e, 1900, 700));
          q('.pa').setAttribute('opacity', a); q('.pa').setAttribute('transform', `translate(0,${12 * (1 - a)})`);
          q('.pb').setAttribute('opacity', b); q('.pb').setAttribute('transform', `translate(0,${12 * (1 - b)})`);
        });
      }
    },

    'e1-07:3': {
      alt: 'I see 뒤에 오는 낱말만 a cat, the sun, you로 바꿔 I see a cat. I see the sun. I see you.를 읽는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="105" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">나는 ~을 봐요</text>
        ${END.map(([w, m], k) => { const y = 82 + k * 72; return `
          <rect x="36" y="${y - 28}" width="138" height="54" rx="16" fill="${DG_C.b}"/>
          <text x="105" y="${y + 9}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">I see</text>
          <g class="en${k}"><rect x="188" y="${y - 28}" width="150" height="54" rx="16" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>
            <text x="263" y="${y + 9}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${w}</text>
            <text x="356" y="${y + 8}" fill="${DG_C.sub}" font-size="20" font-weight="700">${m}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          END.forEach((_, k) => {
            const f = dgEase(dgP(e, 500 + k * 1300, 700));
            q('.en' + k).setAttribute('opacity', f);
            q('.en' + k).setAttribute('transform', `translate(${60 * (1 - f)},0)`);
          });
        });
      }
    },
  });
})();
