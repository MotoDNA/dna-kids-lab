/* 2학년 영어 · 좋아하는 것을 영어로 어떻게 말할까? (e1-12) */
(() => {
  const RED = '#ff3b30';
  const pill = (x, y, w, t, fill, st, fs = 26) => `<rect x="${x}" y="${y - 26}" width="${w}" height="50" rx="14" fill="${fill}" stroke="${st}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + 8}" text-anchor="middle" fill="${DG_C.ink}" font-size="${fs}" font-weight="800">${t}</text>`;
  const apple = (x, y) => `<path d="M${x} ${y - 22} q3 -12 12 -15" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="22" fill="${RED}"/>`;
  const B = DG_C.b, BS = DG_C.d, G = '#f5f5f7', GS = '#d2d2d7';

  /* 0 */
  const W0 = [{ t: 'I', k: '나는', x: 40, w: 60, f: B, s: BS }, { t: 'like', k: '좋아해', x: 112, w: 100, f: DG_C.a, s: DG_C.c }, { t: 'apples.', k: '사과를', x: 224, w: 136, f: G, s: GS }];
  /* 1 */
  const E1 = [['dogs.', '동물'], ['pizza.', '음식'], ['blue.', '색깔']];
  /* 2: 줄 2개 — [글자, x, w] */
  const R1 = [['I', 40, 50], ['like', 102, 86], ['carrots.', 200, 130]];
  const R2 = [['I', 40, 50], ["don't", 102, 100], ['like', 214, 86], ['carrots.', 312, 130]];

  Object.assign(DIAG, {
    'e1-12:0': {
      alt: 'I like apples. 문장을 I(나는), like(좋아해), apples(사과를) 조각으로 나누어 나는 사과를 좋아해라는 뜻을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${W0.map((b, i) => `<g class="b${i}">${pill(b.x, 110, b.w, b.t, b.f, b.s)}
          <text x="${b.x + b.w / 2}" y="174" text-anchor="middle" fill="${i === 1 ? DG_C.c : DG_C.sub}" font-size="20" font-weight="800">${b.k}</text></g>`).join('')}
        <g class="ap">${apple(410, 112)}</g>
        <text class="kr" x="240" y="236" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">나는 사과를 좋아해.</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          W0.forEach((_, i) => {
            const f = dgEase(dgP(e, 300 + i * 900, 500));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(0,${-16 * (1 - f)})`);
          });
          q('.ap').setAttribute('opacity', dgP(e, 2100, 400));
          q('.kr').setAttribute('opacity', e > 3400 ? 1 : 0);
        });
      }
    },

    'e1-12:1': {
      alt: 'I like 뒤에 동물 dogs, 음식 pizza, 색깔 blue를 바꿔 넣어 I like dogs. I like pizza. I like blue.라고 말하는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${E1.map(([w, k], i) => { const y = 82 + i * 74; return `
          ${pill(40, y, 130, 'I like', B, BS)}
          <g class="e${i}">${pill(184, y, 140, w, DG_C.a, DG_C.c)}
            <text x="344" y="${y + 7}" fill="${DG_C.sub}" font-size="20" font-weight="700">${k}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => E1.forEach((_, i) => {
          const f = dgEase(dgP(e, 500 + i * 1300, 700));
          q('.e' + i).setAttribute('opacity', f);
          q('.e' + i).setAttribute('transform', `translate(${60 * (1 - f)},0)`);
        }));
      }
    },

    'e1-12:2': {
      alt: 'I like carrots.(나는 당근을 좋아해) 사이에 don\'t를 넣으면 I don\'t like carrots.(나는 당근을 안 좋아해)가 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${R1.map(([t, x, w], i) => pill(x, 76, w, t, i === 1 ? DG_C.a : G, i === 1 ? DG_C.c : GS)).join('')}
        <text x="40" y="132" fill="${DG_C.sub}" font-size="20" font-weight="700">나는 당근을 좋아해.</text>
        <g class="r2">
          ${pill(R2[0][1], 206, R2[0][2], 'I', G, GS)}
          <g class="mv">${pill(R1[1][1], 206, R2[2][2], 'like', DG_C.a, DG_C.c)}${pill(R1[2][1], 206, R2[3][2], 'carrots.', G, GS)}</g>
          <g class="dn">${pill(R2[1][1], 206, R2[1][2], "don't", '#ffe0de', RED)}</g>
        </g>
        <g class="k2"><text x="40" y="262" fill="${DG_C.sub}" font-size="20" font-weight="700">나는 당근을 <tspan fill="${RED}" font-weight="800">안</tspan> 좋아해.</text>
          <text x="${R2[1][1] + R2[1][2] / 2}" y="168" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">~하지 않아</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.r2').setAttribute('opacity', dgP(e, 800, 400));
          const m = dgEase(dgP(e, 1600, 800)), d = dgEase(dgP(e, 2400, 600));
          q('.mv').setAttribute('transform', `translate(${112 * m},0)`);
          q('.dn').setAttribute('opacity', d);
          q('.dn').setAttribute('transform', `translate(0,${-30 * (1 - d)})`);
          q('.k2').setAttribute('opacity', e > 3300 ? 1 : 0);
        });
      }
    },

    'e1-12:3': {
      alt: 'Do you like dogs?(너는 개를 좋아하니?)라고 물으면 좋을 때는 Yes, I do! 싫을 때는 No, I don\'t.라고 대답하는 갈래 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="q">${pill(70, 70, 300, 'Do you like dogs?', G, GS)}
          <text x="220" y="124" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">너는 개를 좋아하니?</text></g>
        <path class="l0" d="M170 136 L110 186" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>
        <path class="l1" d="M270 136 L340 186" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>
        <g class="a0">${pill(24, 218, 176, 'Yes, I do!', '#d6efdc', DG_C.r)}
          <text x="112" y="276" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">좋으면</text></g>
        <g class="a1">${pill(256, 218, 196, "No, I don't.", '#ffe0de', RED)}
          <text x="354" y="276" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">싫으면</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          q('.q').setAttribute('opacity', dgP(e, 200, 500));
          q('.l0').setAttribute('stroke-dashoffset', 100 * (1 - dgEase(dgP(e, 1100, 600))));
          q('.a0').setAttribute('opacity', dgEase(dgP(e, 1600, 500)));
          q('.l1').setAttribute('stroke-dashoffset', 100 * (1 - dgEase(dgP(e, 2600, 600))));
          q('.a1').setAttribute('opacity', dgEase(dgP(e, 3100, 500)));
        });
      }
    },
  });
})();
