/* 1학년 영어 · 빨간 동그라미를 영어로 뭐라고 할까? (e1-09) */
(() => {
  const RED = '#ff3b30', YEL = '#ffcc00';
  const COL = [['red', '빨강', RED], ['blue', '파랑', DG_C.d], ['yellow', '노랑', YEL], ['green', '초록', DG_C.r], ['black', '검정', DG_C.ink], ['white', '하양', '#fff']];
  /* 모양 경로 (중심 0,0) */
  const star = (R, r) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, k = i % 2 ? r : R; d += `${i ? 'L' : 'M'}${(k * Math.cos(a)).toFixed(1)} ${(k * Math.sin(a)).toFixed(1)}`; } return d + 'Z'; };
  const SH = [
    ['circle', '동그라미', 'M0 -34 A34 34 0 1 1 0 34 A34 34 0 1 1 0 -34Z'],
    ['square', '네모', 'M-32 -32 H32 V32 H-32Z'],
    ['triangle', '세모', 'M0 -36 L38 30 H-38Z'],
    ['star', '별', star(40, 17)],
  ];
  const bubble = (x, y, w, txt, fill, st, tail) => `<rect x="${x}" y="${y}" width="${w}" height="48" rx="24" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <path d="M${tail[0]} ${y + (tail[1] > 0 ? 48 : 0)} l${tail[2]} ${tail[1]} l14 ${-tail[1]}" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="${tail[0] + 1.5}" y="${y + (tail[1] > 0 ? 45.5 : -1.5)}" width="11" height="4" fill="${fill}"/>
    <text x="${x + w / 2}" y="${y + 33}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${txt}</text>`;
  const pill = (x, y, w, t, fill, st) => `<rect x="${x}" y="${y - 26}" width="${w}" height="48" rx="14" fill="${fill}" stroke="${st}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + 7}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${t}</text>`;
  /* 2: 색깔 + 모양 */
  const R2 = [
    { c: 'red', s: 'circle', col: RED, d: SH[0][2], k: '빨간 동그라미', y: 112 },
    { c: 'blue', s: 'square', col: DG_C.d, d: SH[1][2], k: '파란 네모', y: 232 },
  ];

  Object.assign(DIAG, {
    'e1-09:0': {
      alt: '빨강 red, 파랑 blue, 노랑 yellow, 초록 green, 검정 black, 하양 white 색 동그라미와 영어 낱말',
      svg: `<svg viewBox="0 0 480 220" class="dg-svg" role="img">
        ${COL.map(([w, k, c], i) => { const x = 45 + i * 78; return `<g class="c${i}">
          <circle cx="${x}" cy="88" r="30" fill="${c}" stroke="${i === 5 ? '#c7c7cc' : c}" stroke-width="3"/>
          <text x="${x}" y="156" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${w}</text>
          <text x="${x}" y="186" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${k}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => COL.forEach((_, i) => {
          const f = dgEase(dgP(e, 200 + i * 650, 450));
          q('.c' + i).setAttribute('opacity', f);
          q('.c' + i).setAttribute('transform', `translate(0,${12 * (1 - f)})`);
        }));
      }
    },

    'e1-09:1': {
      alt: '동그라미 circle, 네모 square, 세모 triangle, 별 star 모양이 그려지는 그림',
      svg: `<svg viewBox="0 0 480 240" class="dg-svg" role="img">
        ${SH.map(([w, k, d], i) => { const x = 66 + i * 116; return `
          <path class="f${i}" transform="translate(${x},104)" d="${d}" fill="${DG_C.b}"/>
          <path class="p${i}" transform="translate(${x},104)" d="${d}" fill="none" stroke="${DG_C.d}" stroke-width="5" stroke-linejoin="round" pathLength="100" stroke-dasharray="100"/>
          <g class="l${i}"><text x="${x}" y="182" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${w}</text>
          <text x="${x}" y="212" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${k}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => SH.forEach((_, i) => {
          const st = 200 + i * 1200, f = dgEase(dgP(e, st, 800));
          q('.p' + i).setAttribute('stroke-dashoffset', 100 * (1 - f));
          q('.f' + i).setAttribute('opacity', dgP(e, st + 700, 300));
          q('.l' + i).setAttribute('opacity', e > st + 800 ? 1 : 0);
        }));
      }
    },

    'e1-09:2': {
      alt: '색깔을 먼저, 모양을 나중에 말해 빨간 동그라미는 a red circle, 파란 네모는 a blue square가 되는 그림',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        <text class="hd" x="198" y="58" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">① 색깔</text>
        <text class="hd" x="326" y="58" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">② 모양</text>
        ${R2.map((r, k) => `
          <path class="sh${k}" transform="translate(56,${r.y})" d="${r.d}" fill="#fff" stroke="${DG_C.sub}" stroke-width="4" stroke-linejoin="round"/>
          <g>${pill(96, r.y, 44, 'a', '#f5f5f7', '#d2d2d7')}</g>
          <g class="cb${k}">${pill(150, r.y, 96, r.c, DG_C.a, DG_C.c)}</g>
          <g class="sb${k}">${pill(256, r.y, 140, r.s, DG_C.b, DG_C.d)}</g>
          <text class="kr${k}" x="250" y="${r.y + 56}" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${r.k}</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          qa('.hd').forEach(h => h.setAttribute('opacity', e > 200 ? 1 : 0));
          R2.forEach((r, k) => {
            const st = 400 + k * 2800, a = dgEase(dgP(e, st, 600)), b = dgEase(dgP(e, st + 1000, 600));
            q('.cb' + k).setAttribute('opacity', a); q('.cb' + k).setAttribute('transform', `translate(0,${-20 * (1 - a)})`);
            q('.sh' + k).setAttribute('fill', a > 0.5 ? r.col : '#fff');
            q('.sh' + k).setAttribute('stroke', a > 0.5 ? r.col : DG_C.sub);
            q('.sb' + k).setAttribute('opacity', b); q('.sb' + k).setAttribute('transform', `translate(0,${-20 * (1 - b)})`);
            q('.kr' + k).setAttribute('opacity', e > st + 1700 ? 1 : 0);
          });
        });
      }
    },

    'e1-09:3': {
      alt: 'What color? 하고 물으면 초록 개구리를 보고 Green!이라고 색깔 낱말로 대답하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="qb">${bubble(24, 24, 190, 'What color?', '#f5f5f7', '#d2d2d7', [64, 14, 6])}</g>
        <g class="fr" transform="translate(240,170)">
          <circle cx="-28" cy="-44" r="18" fill="${DG_C.r}"/><circle cx="28" cy="-44" r="18" fill="${DG_C.r}"/>
          <ellipse rx="70" ry="50" fill="${DG_C.r}"/>
          <circle cx="-28" cy="-46" r="9" fill="#fff"/><circle cx="28" cy="-46" r="9" fill="#fff"/>
          <circle cx="-26" cy="-45" r="4.5" fill="${DG_C.ink}"/><circle cx="30" cy="-45" r="4.5" fill="${DG_C.ink}"/>
          <path d="M-30 6 Q0 26 30 6" fill="none" stroke="${DG_C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        </g>
        <g class="ab">${bubble(318, 222, 140, 'Green!', '#d6efdc', DG_C.r, [350, -14, 6])}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          q('.qb').setAttribute('opacity', dgP(e, 200, 400));
          q('.fr').setAttribute('opacity', dgP(e, 900, 500));
          q('.ab').setAttribute('opacity', dgEase(dgP(e, 2600, 500)));
        });
      }
    },
  });
})();
