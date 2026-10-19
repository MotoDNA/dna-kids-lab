/* 5학년 영어 · 몇 시에 일어나? 하루 일과를 영어로 말해 볼까? (e5-02) */
(() => {
  const C = DG_C;
  const tw = (s, fs) => 0.92 * [...s].reduce((a, ch) => a + fs * (/[il.,'!|: ]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[ㄱ-힣]/.test(ch) ? 1.0 : 0.58), 0);
  /* 시계: 바늘은 cls-h / cls-m 클래스, transform rotate 로 움직임 */
  const clock = (cx, cy, r, cls, h, m, nums) => {
    let t = '';
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * Math.PI / 180, r0 = r - (i % 3 ? 7 : 12);
      t += `<line x1="${(cx + Math.sin(a) * r0).toFixed(1)}" y1="${(cy - Math.cos(a) * r0).toFixed(1)}" x2="${(cx + Math.sin(a) * (r - 3)).toFixed(1)}" y2="${(cy - Math.cos(a) * (r - 3)).toFixed(1)}" stroke="${C.sub}" stroke-width="${i % 3 ? 2 : 3.5}" stroke-linecap="round"/>`;
    }
    if (nums) [[12, 0], [3, 1], [9, 3]].forEach(([n, i]) => {
      const a = i * 90 * Math.PI / 180, rr = r - 30;
      t += `<text x="${(cx + Math.sin(a) * rr).toFixed(1)}" y="${(cy - Math.cos(a) * rr + 7).toFixed(1)}" text-anchor="middle" fill="${C.ink}" font-size="20" font-weight="700">${n}</text>`;
    });
    const ha = (h % 12 + m / 60) * 30, ma = m * 6;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${t}
      <line class="${cls}-h" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.5}" stroke="${C.c}" stroke-width="${r > 50 ? 8 : 6}" stroke-linecap="round" transform="rotate(${ha} ${cx} ${cy})"/>
      <line class="${cls}-m" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.78}" stroke="${C.d}" stroke-width="${r > 50 ? 5 : 4}" stroke-linecap="round" transform="rotate(${ma} ${cx} ${cy})"/>
      <circle cx="${cx}" cy="${cy}" r="${r > 50 ? 6 : 4}" fill="${C.ink}"/>`;
  };
  const bubble = (x, y, w, h, fill, stroke, tail) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;

  /* 1: 하루 일과 */
  const R1 = [
    { e: 'get up', k: '일어나다' },
    { e: 'eat breakfast', k: '아침을 먹다' },
    { e: 'go to school', k: '학교에 가다' },
    { e: 'do my homework', k: '숙제를 하다' },
    { e: 'go to bed', k: '잠자리에 들다' },
  ];
  const ry = i => 74 + i * 56;

  /* 2: at + 시각 */
  const S2 = [
    { h: 10, pre: 'I go to bed', t: '10.', y: 146 },
    { h: 7, pre: 'I get up', t: '7.', y: 236 },
  ];

  Object.assign(DIAG, {
    'e5-02:0': {
      alt: '시계 바늘이 8시 30분을 가리키고, What time is it? 하고 물으면 It\'s eight thirty. 하고 시와 분을 차례로 말하는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${clock(116, 150, 96, 'k', 8, 30, true)}
        <g class="q">${bubble(232, 52, 230, 50, '#f5f5f7', '#d2d2d7')}
          <text x="347" y="85" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="700">What time is it?</text></g>
        <g class="an">${bubble(232, 120, 230, 50, C.b, C.d)}
          <text x="347" y="153" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="700">It's <tspan fill="${C.c}" font-weight="800">eight</tspan> <tspan fill="${C.d}" font-weight="800">thirty</tspan>.</text></g>
        <g class="h8"><text x="290" y="214" text-anchor="middle" fill="${C.c}" font-size="22" font-weight="800">eight</text>
          <text x="290" y="244" text-anchor="middle" fill="${C.sub}" font-size="20" font-weight="700">8시</text></g>
        <g class="m30"><text x="404" y="214" text-anchor="middle" fill="${C.d}" font-size="22" font-weight="800">thirty</text>
          <text x="404" y="244" text-anchor="middle" fill="${C.sub}" font-size="20" font-weight="700">30분</text></g>
        <text class="pl" x="347" y="226" text-anchor="middle" fill="${C.sub}" font-size="22" font-weight="700">+</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.q').setAttribute('opacity', dgP(e, 200, 500));
          const a = dgEase(dgP(e, 900, 2000));
          q('.k-m').setAttribute('transform', `rotate(${180 * a} 116 150)`);
          q('.k-h').setAttribute('transform', `rotate(${255 * a} 116 150)`);
          q('.an').setAttribute('opacity', dgP(e, 3200, 500));
          q('.h8').setAttribute('opacity', dgP(e, 4000, 500));
          q('.pl').setAttribute('opacity', dgP(e, 4500, 400));
          q('.m30').setAttribute('opacity', dgP(e, 4800, 500));
        });
      }
    },

    'e5-02:1': {
      alt: '해가 뜬 아침부터 달이 뜬 밤까지 get up, eat breakfast, go to school, do my homework, go to bed 순서로 하루 일과가 이어지는 그림',
      svg: `<svg viewBox="0 0 480 354" class="dg-svg" role="img">
        <line x1="44" y1="${ry(0)}" x2="44" y2="${ry(4)}" stroke="#e5e5ea" stroke-width="5" stroke-linecap="round"/>
        <line class="trk" x1="44" y1="${ry(0)}" x2="44" y2="${ry(4)}" stroke="${C.c}" stroke-width="5" stroke-linecap="round"/>
        ${R1.map((r, i) => `<g class="it${i}">
          <circle cx="44" cy="${ry(i)}" r="${i === 0 || i === 4 ? 20 : 8}" fill="${i === 0 ? C.a : i === 4 ? C.b : '#fff'}" stroke="${i === 0 ? C.c : i === 4 ? C.d : C.c}" stroke-width="3"/>
          ${i === 0 ? `<g stroke="${C.c}" stroke-width="3" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = k * Math.PI / 4; return `<line x1="${(44 + Math.cos(a) * 25).toFixed(1)}" y1="${(ry(0) + Math.sin(a) * 25).toFixed(1)}" x2="${(44 + Math.cos(a) * 31).toFixed(1)}" y2="${(ry(0) + Math.sin(a) * 31).toFixed(1)}"/>`; }).join('')}</g>` : ''}
          ${i === 4 ? `<path d="M50 ${ry(4) - 11} a12 12 0 1 0 0 22 a9 9 0 1 1 0 -22z" fill="${C.d}"/>` : ''}
          <rect x="86" y="${ry(i) - 23}" width="378" height="46" rx="23" fill="${i === 4 ? C.b : i === 0 ? C.a : '#f5f5f7'}" fill-opacity="${i === 0 || i === 4 ? .6 : 1}"/>
          <text x="106" y="${ry(i) + 8}" fill="${C.ink}" font-size="22" font-weight="800">${r.e}</text>
          <text x="448" y="${ry(i) + 7}" text-anchor="end" fill="${C.sub}" font-size="19" font-weight="700">${r.k}</text>
        </g>`).join('')}
        <text class="am" x="16" y="34" fill="${C.c}" font-size="18" font-weight="800">아침</text>
        <text class="pm" x="16" y="${ry(4) + 46}" fill="${C.d}" font-size="18" font-weight="800">밤</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          q('.am').setAttribute('opacity', dgP(e, 0, 400));
          R1.forEach((r, i) => {
            const st = 300 + i * 1100, f = dgEase(dgP(e, st, 500));
            q('.it' + i).setAttribute('opacity', f);
            q('.it' + i).setAttribute('transform', `translate(${-16 * (1 - f)},0)`);
          });
          q('.trk').setAttribute('y2', ry(0) + (ry(4) - ry(0)) * dgEase(dgP(e, 300, 4400)));
          q('.pm').setAttribute('opacity', dgP(e, 4700, 400));
        });
      }
    },

    'e5-02:2': {
      alt: 'What time do you ~? 질문에 10시 시계 옆 I go to bed at 10., 7시 시계 옆 I get up at 7. 문장이 있고, 시각 앞에 붙는 at은 ~시에라는 뜻임을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <g class="qq"><rect x="16" y="50" width="396" height="48" rx="24" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="214" y="82" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="700">What time do you ~?</text></g>
        ${S2.map((s, i) => { const x0 = 120, wp = tw(s.pre, 22); return `<g class="row${i}">
          ${clock(56, s.y, 38, 'c' + i, s.h, 0, false)}
          <text x="${x0}" y="${s.y + 8}" fill="${C.ink}" font-size="22" font-weight="800">${s.pre}</text>
          <g class="at${i}"><rect x="${x0 + wp + 8}" y="${s.y - 20}" width="44" height="38" rx="10" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
            <text x="${x0 + wp + 30}" y="${s.y + 7}" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">at</text></g>
          <text x="${x0 + wp + 62}" y="${s.y + 8}" fill="${C.d}" font-size="24" font-weight="800">${s.t}</text>
        </g>`; }).join('')}
        <g class="mean">
          <text x="240" y="300" text-anchor="middle" fill="${C.c}" font-size="22" font-weight="800">at = ~시에</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.qq').setAttribute('opacity', dgP(e, 0, 500));
          S2.forEach((s, i) => {
            const st = 800 + i * 1900;
            q('.row' + i).setAttribute('opacity', dgP(e, st, 500));
            const f = dgEase(dgP(e, st + 800, 600));
            q('.at' + i).setAttribute('opacity', f);
            q('.at' + i).setAttribute('transform', `translate(0,${-26 * (1 - f)})`);
          });
          q('.mean').setAttribute('opacity', dgP(e, 4800, 500));
        });
      }
    },
  });
})();
