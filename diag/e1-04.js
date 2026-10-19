/* 1학년 영어 · 글자는 어떤 소리를 낼까? a부터 m까지 (e1-04) */
(() => {
  /* 낱말 카드: 글자 → 낱말(첫 글자 색) → 소리 힌트 */
  const card = (k, x, y, w, L, word, hint) => `<g class="cd${k}">
    <rect x="${x}" y="${y}" width="${w}" height="128" rx="16" fill="#f5f5f7"/>
    <text x="${x + w / 2}" y="${y + 46}" text-anchor="middle" fill="${DG_C.d}" font-size="38" font-weight="800">${L}</text>
    <text x="${x + w / 2}" y="${y + 84}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800"><tspan class="fl${k}" fill="${DG_C.d}">${word[0]}</tspan>${word.slice(1)}</text>
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

  const S1 = [['a', 'apple'], ['b', 'bear'], ['c', 'cat', "'크'"], ['d', 'dog'], ['e', 'egg'], ['f', 'fish', '입술 물기']];
  const S2 = [['g', 'grapes'], ['h', 'hat', "'흐~'"], ['i', 'insect'], ['j', 'juice'], ['k', 'kite'], ['l', 'lion', '혀끝 대기'], ['m', 'moon', "'음~'"]];

  /* 0: 이름 vs 소리 */
  const R0 = [{ L: 'a', n: '에이', s: '애', w: 'apple' }, { L: 'b', n: '비', s: '브', w: 'bear' }];

  Object.assign(DIAG, {
    'e1-04:0': {
      alt: '글자 a의 이름은 에이지만 apple에서는 애 소리가 나고, b의 이름은 비지만 bear에서는 브 소리가 나는 것을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <text x="160" y="44" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">이름</text>
        <text x="270" y="44" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="700">글자 소리</text>
        ${R0.map((r, i) => { const y = 92 + i * 96; return `
          <rect x="20" y="${y - 36}" width="68" height="68" rx="14" fill="${DG_C.b}"/>
          <text x="54" y="${y + 13}" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="800">${r.L}</text>
          <g class="nm${i}"><rect x="112" y="${y - 22}" width="96" height="42" rx="21" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
            <text x="160" y="${y + 7}" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">${r.n}</text></g>
          <g class="sd${i}"><rect x="222" y="${y - 22}" width="96" height="42" rx="21" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2"/>
            <text x="270" y="${y + 7}" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${r.s}</text></g>
          <g class="wd${i}"><path d="M326 ${y - 1} h22 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="360" y="${y + 9}" fill="${DG_C.ink}" font-size="28" font-weight="800"><tspan fill="${DG_C.c}">${r.w[0]}</tspan>${r.w.slice(1)}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          R0.forEach((_, i) => {
            const st = 300 + i * 2400;
            q('.nm' + i).setAttribute('opacity', e > st ? 1 : 0);
            q('.sd' + i).setAttribute('opacity', dgEase(dgP(e, st + 800, 400)));
            q('.wd' + i).setAttribute('opacity', dgEase(dgP(e, st + 1500, 400)));
          });
        });
      }
    },

    'e1-04:1': {
      alt: 'a apple, b bear, c cat, d dog, e egg, f fish 카드에서 낱말의 첫 글자가 그 글자 소리를 낸다는 것과, cat은 크 소리, fish는 아랫입술을 살짝 문다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${S1.map((s, k) => card(k, 12 + (k % 3) * 156, 46 + Math.floor(k / 3) * 140, 144, s[0], s[1], s[2])).join('')}
      </svg>`,
      play(el) { cardsAnim(el, S1.length, 5200, 750); }
    },

    'e1-04:2': {
      alt: 'g grapes, h hat, i insect, j juice, k kite, l lion, m moon 카드에서 hat은 흐 하고 숨을 내쉬고, lion은 혀끝을 대고, moon은 음 하고 입을 다무는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 324" class="dg-svg" role="img">
        ${S2.map((s, k) => card(k, (k < 4 ? 12 : 70) + (k % 4) * 116, 46 + Math.floor(k / 4) * 140, 108, s[0], s[1], s[2])).join('')}
      </svg>`,
      play(el) { cardsAnim(el, S2.length, 5800, 700); }
    },

    'e1-04:3': {
      alt: '글자 c로 시작하는 cat과 글자 k로 시작하는 kite가 둘 다 같은 크 소리로 시작하는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[['c', 'cat', 110], ['k', 'kite', 370]].map(([L, w, x], i) => `<g class="lt${i}">
          <rect x="${x - 40}" y="40" width="80" height="80" rx="16" fill="${DG_C.b}"/>
          <text x="${x}" y="96" text-anchor="middle" fill="${DG_C.ink}" font-size="48" font-weight="800">${L}</text>
          <text x="${x}" y="164" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800"><tspan fill="${DG_C.d}">${w[0]}</tspan>${w.slice(1)}</text></g>
          <path class="ar${i}" d="M${x} 180 Q ${x} 226 ${i ? 290 : 190} 236" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>`).join('')}
        <g class="snd"><circle cx="240" cy="236" r="40" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>
          <text x="240" y="248" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="800">크</text></g>
        <text class="eq" x="240" y="96" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">같은 소리!</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.lt0').setAttribute('opacity', dgP(e, 200, 400));
          q('.lt1').setAttribute('opacity', dgP(e, 900, 400));
          [0, 1].forEach(i => q('.ar' + i).setAttribute('stroke-dashoffset', 100 * (1 - dgEase(dgP(e, 1700 + i * 300, 900)))));
          q('.snd').setAttribute('opacity', dgEase(dgP(e, 2900, 500)));
          q('.eq').setAttribute('opacity', e > 3800 ? 1 : 0);
        });
      }
    },
  });
})();
