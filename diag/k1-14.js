/* 1학년 국어 · 마침표, 물음표, 느낌표는 언제 쓸까? (k1-14) */
(() => {
  const AR = '#ff3b30';
  // 문장(끝 부호 앞까지)을 x=X 에 끝맞춤, 부호는 따로 강조
  const sent = (o, y) => `
    <text x="${o.X}" y="${y}" text-anchor="end" fill="${DG_C.ink}" font-size="32" font-weight="800">${o.w}</text>
    <g class="pm"><circle cx="${o.X + 28}" cy="${y - 11}" r="22" fill="${o.col}" fill-opacity=".15" stroke="${o.col}" stroke-width="3"/>
    <text x="${o.X + 28}" y="${y}" text-anchor="middle" fill="${o.col}" font-size="34" font-weight="800">${o.p}</text></g>`;
  const head = `<path class="hd" d="M0 0 l-13 -7 m13 7 l-13 7" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const drawLine = (el, path, head, a, col) => {
    const L = path.getTotalLength();
    path.setAttribute('stroke-dasharray', L);
    path.setAttribute('stroke-dashoffset', L * (1 - a));
    path.setAttribute('opacity', a > 0 ? 1 : 0);
    const p = path.getPointAtLength(L * Math.max(a, .01)), p0 = path.getPointAtLength(Math.max(0, L * Math.max(a, .01) - 4));
    head.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${Math.atan2(p.y - p0.y, p.x - p0.x) * 180 / Math.PI})`);
    head.setAttribute('stroke', col);
    head.setAttribute('opacity', a > 0 ? 1 : 0);
  };
  const mk = o => ({
    alt: o.alt,
    svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
      ${o.extra || ''}
      <path class="cv" d="${o.d}" fill="none" stroke="${o.col}" stroke-width="${o.sw || 4}" stroke-linecap="round" stroke-linejoin="round"/>${head}
      ${sent(o, 172)}
      <text class="lb" x="240" y="230" text-anchor="middle" fill="${o.col}" font-size="22" font-weight="800">${o.lb}</text>
    </svg>`,
    play(el) {
      const q = s => el.querySelector(s);
      dgAnim(el, 4200, e => {
        drawLine(el, q('.cv'), q('.hd'), dgEase(dgP(e, 300, 2000)), o.col);
        q('.pm').setAttribute('opacity', dgP(e, 2300, 400));
        q('.lb').setAttribute('opacity', dgP(e, 2900, 400));
        if (o.after) o.after(el, e);
      });
    }
  });

  /* 3 */
  const R3 = [
    { p: '.', col: DG_C.d, d: 'M0 0 H34 Q52 0 64 20', t: '알려 주는 말' },
    { p: '?', col: DG_C.r, d: 'M0 14 H34 Q52 14 64 -8', t: '묻는 말' },
    { p: '!', col: DG_C.c, d: 'M0 14 Q14 -10 34 -4 H50 Q62 -4 64 -14', t: '놀람, 기쁨' },
  ];

  Object.assign(DIAG, {
    'k1-14:0': mk({
      alt: '무엇을 알려 주는 문장 나는 여덟 살이에요 끝에 마침표를 쓰고, 끝을 살짝 내려 읽는 것을 소리 높낮이 선으로 보여 주는 그림',
      w: '나는 여덟 살이에요', p: '.', X: 380, col: DG_C.d, lb: '끝을 살짝 내려 읽어요',
      d: 'M110 108 H330 Q376 108 400 136',
    }),
    'k1-14:1': mk({
      alt: '묻는 문장 밥 먹었니 끝에 물음표를 쓰고, 끝을 올려 읽는 것을 소리 높낮이 선으로 보여 주는 그림',
      w: '밥 먹었니', p: '?', X: 310, col: DG_C.r, lb: '끝을 올려 읽어요',
      d: 'M170 124 H270 Q312 124 334 90',
    }),
    'k1-14:2': mk({
      alt: '놀라거나 기쁜 마음을 나타내는 문장 와, 무지개다 끝에 느낌표를 쓰고, 느낌을 살려 힘 있게 읽는 것을 굵은 높낮이 선으로 보여 주는 그림',
      w: '와, 무지개다', p: '!', X: 330, col: DG_C.c, lb: '느낌을 살려 힘 있게!', sw: 6,
      d: 'M156 118 Q170 76 200 86 L232 92 Q266 74 296 84 Q336 94 356 68',
      extra: `<g class="rb" transform="translate(76,128)">${[[DG_C.c, 52], [DG_C.r, 42], [DG_C.d, 32]].map(([c, r]) => `<path d="M${-r} 0 A${r} ${r} 0 0 1 ${r} 0" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`).join('')}</g>`,
      after(el, e) { el.querySelector('.rb').setAttribute('opacity', dgP(e, 0, 500) * 0.9); },
    }),

    'k1-14:3': {
      alt: '같은 말 밥 먹어요도 마침표를 쓰면 알려 주는 말, 물음표를 쓰면 묻는 말, 느낌표를 쓰면 놀람이나 기쁨을 나타내는 말이 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${R3.map((r, i) => { const y = 92 + i * 74; return `<g>
          <text x="170" y="${y}" text-anchor="end" fill="${DG_C.ink}" font-size="30" font-weight="800">밥 먹어요</text>
          <g class="p${i}"><rect x="174" y="${y - 32}" width="36" height="42" rx="10" fill="${r.col}" fill-opacity=".15" stroke="${r.col}" stroke-width="3"/>
            <text x="192" y="${y}" text-anchor="middle" fill="${r.col}" font-size="32" font-weight="800">${r.p}</text></g>
          <g class="l${i}"><g transform="translate(232,${y - 14})"><path d="${r.d}" fill="none" stroke="${r.col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
            <text x="318" y="${y - 2}" fill="${r.col}" font-size="22" font-weight="800">${r.t}</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          R3.forEach((r, i) => {
            const st = 300 + i * 1300;
            const f = dgEase(dgP(e, st, 500));
            q('.p' + i).setAttribute('opacity', f);
            q('.p' + i).setAttribute('transform', `translate(0,${-(1 - f) * 24})`);
            q('.l' + i).setAttribute('opacity', dgP(e, st + 600, 400));
          });
        });
      }
    },
  });
})();
