/* 2학년 영어 · 영어로 어떻게 인사할까? (e1-10) */
(() => {
  const face = (cx, cy, fill, st, r = 34) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${st}" stroke-width="3"/>
    <circle cx="${cx - r * .33}" cy="${cy - r * .18}" r="4" fill="${DG_C.ink}"/><circle cx="${cx + r * .33}" cy="${cy - r * .18}" r="4" fill="${DG_C.ink}"/>
    <path d="M${cx - r * .36} ${cy + r * .28} Q${cx} ${cy + r * .62} ${cx + r * .36} ${cy + r * .28}" fill="none" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round"/>`;
  /* 말풍선: tail = 'l' | 'r' (아래 왼쪽/오른쪽에서 꼬리) 또는 'L' | 'R' (옆쪽 꼬리) */
  const bubble = (x, y, w, txt, fill, st, side) => {
    const h = 50;
    let tail = '';
    if (side === 'L') tail = `<path d="M${x + 1.5} ${y + 16} l-16 10 l16 10" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/><rect x="${x}" y="${y + 18}" width="4" height="16" fill="${fill}"/>`;
    if (side === 'R') tail = `<path d="M${x + w - 1.5} ${y + 16} l16 10 l-16 10" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/><rect x="${x + w - 4}" y="${y + 18}" width="4" height="16" fill="${fill}"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="25" fill="${fill}" stroke="${st}" stroke-width="2.5"/>${tail}
      <text x="${x + w / 2}" y="${y + 34}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${txt}</text>`;
  };
  const GRY = '#f5f5f7', GST = '#d2d2d7';

  /* 1: 하루 해의 길 */
  const R = Math.PI / 180, AX = 240, AY = 200, ARX = 170, ARY = 140;
  const onArc = t => [AX - ARX * Math.cos(t * Math.PI), AY - ARY * Math.sin(t * Math.PI)];
  const STOP = [{ t: 0.12, k: '아침', w: 'morning!' }, { t: 0.5, k: '낮', w: 'afternoon!' }, { t: 0.88, k: '저녁', w: 'evening!' }];
  const sun = (x, y) => `${Array.from({ length: 8 }, (_, i) => `<line x1="${x}" y1="${y - 30}" x2="${x}" y2="${y - 38}" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 45} ${x} ${y})"/>`).join('')}<circle cx="${x}" cy="${y}" r="22" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>`;
  const moon = (x, y) => `<path d="M${x + 6} ${y - 22} A22 22 0 1 0 ${x + 6} ${y + 22} A34 34 0 0 1 ${x + 6} ${y - 22}Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>`;

  Object.assign(DIAG, {
    'e1-10:0': {
      alt: '만났을 때 한 아이가 Hello!라고 인사하고, 다른 아이가 친구끼리 쓰는 짧은 인사 Hi!로 답하는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${face(70, 100, DG_C.a, DG_C.c)}
        ${face(410, 196, DG_C.b, DG_C.d)}
        <g class="b0">${bubble(126, 76, 150, 'Hello!', GRY, GST, 'L')}</g>
        <g class="b1">${bubble(240, 172, 112, 'Hi!', DG_C.b, DG_C.d, 'R')}
          <text x="296" y="252" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">친구끼리 짧게</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 3800, e => {
          const a = dgEase(dgP(e, 400, 500)), b = dgEase(dgP(e, 1800, 500));
          q('.b0').setAttribute('opacity', a); q('.b0').setAttribute('transform', `translate(${-10 * (1 - a)},0)`);
          q('.b1').setAttribute('opacity', b); q('.b1').setAttribute('transform', `translate(${10 * (1 - b)},0)`);
        });
      }
    },

    'e1-10:1': {
      alt: '해가 떠오르는 아침에는 Good morning!, 해가 높이 뜬 낮에는 Good afternoon!, 달이 뜬 저녁에는 Good evening!이라고 인사하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M${AX - ARX} ${AY} A${ARX} ${ARY} 0 0 1 ${AX + ARX} ${AY}" fill="none" stroke="#e5e5ea" stroke-width="3" stroke-dasharray="6 7"/>
        <line x1="30" y1="${AY}" x2="450" y2="${AY}" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
        ${STOP.map((s, i) => { const [x, y] = onArc(s.t); return `<g class="ic${i}">${i === 2 ? moon(x, y) : sun(x, y)}</g>
          <g class="lb${i}"><text x="${[84, 240, 396][i]}" y="232" text-anchor="middle" fill="${i === 2 ? DG_C.d : DG_C.c}" font-size="18" font-weight="800">${s.k}</text>
          <text x="${[84, 240, 396][i]}" y="258" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">Good</text>
          <text x="${[84, 240, 396][i]}" y="286" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${s.w}</text></g>`; }).join('')}
        <g class="mv"></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          const t = 0.12 + 0.76 * dgEase(dgP(e, 300, 5000));
          const [x, y] = onArc(t);
          const night = t > 0.8;
          q('.mv').innerHTML = e < 5400 ? (night ? moon(x, y) : sun(x, y)) : '';
          STOP.forEach((s, i) => {
            const reached = t >= s.t - 0.001;
            q('.lb' + i).setAttribute('opacity', reached ? 1 : 0);
            q('.ic' + i).setAttribute('opacity', e >= 5400 || (reached && Math.abs(t - s.t) > 0.06) ? 1 : 0);
          });
        });
      }
    },

    'e1-10:2': {
      alt: 'How are you?(잘 지내?)라고 물으면 I\'m fine, thank you. 또는 기분이 좋을 때 I\'m good!이라고 대답하는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${face(56, 84, DG_C.a, DG_C.c, 38)}
        ${face(424, 176, DG_C.b, DG_C.d, 32)}
        <g class="q">${bubble(114, 58, 196, 'How are you?', GRY, GST, 'L')}
          <text x="212" y="134" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">잘 지내?</text></g>
        <g class="a1">${bubble(110, 152, 260, 'I\'m fine, thank you.', DG_C.b, DG_C.d, 'R')}</g>
        <g class="a2"><text x="198" y="262" text-anchor="end" fill="${DG_C.sub}" font-size="18" font-weight="700">기분 좋으면</text>
          ${bubble(210, 228, 140, 'I\'m good!', DG_C.a, DG_C.c, '')}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          q('.q').setAttribute('opacity', dgEase(dgP(e, 300, 500)));
          q('.a1').setAttribute('opacity', dgEase(dgP(e, 1700, 500)));
          q('.a2').setAttribute('opacity', dgEase(dgP(e, 3200, 500)));
        });
      }
    },

    'e1-10:3': {
      alt: '헤어질 때 두 아이가 멀어지며 Goodbye!(Bye!)와 또 만나라는 뜻의 See you!라고 인사하는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <g class="p0">${face(0, 190, DG_C.a, DG_C.c)}</g>
        <g class="p1">${face(0, 190, DG_C.b, DG_C.d)}</g>
        <g class="b0">${bubble(10, 70, 150, 'Goodbye!', GRY, GST, '')}<path d="M70 120 l6 22 l12 -22Z" fill="${GRY}"/><path d="M70 121.5 l6 20.5 l12 -20.5" fill="none" stroke="${GST}" stroke-width="2.5" stroke-linejoin="round"/></g>
        <g class="b1">${bubble(300, 70, 156, 'See you!', DG_C.b, DG_C.d, '')}<path d="M392 120 l12 22 l6 -22Z" fill="${DG_C.b}"/><path d="M392 121.5 l12 20.5 l6 -20.5" fill="none" stroke="${DG_C.d}" stroke-width="2.5" stroke-linejoin="round"/>
          <text x="400" y="254" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">또 만나!</text></g>
        <path class="ar" d="M190 190 h-40 m10 -10 l-10 10 l10 10 M290 190 h40 m-10 -10 l10 10 l-10 10" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          const m = dgEase(dgP(e, 300, 1500));
          q('.p0').setAttribute('transform', `translate(${200 - 120 * m},0)`);
          q('.p1').setAttribute('transform', `translate(${280 + 120 * m},0)`);
          q('.ar').setAttribute('opacity', m > 0.2 ? 1 : 0);
          q('.b0').setAttribute('opacity', dgEase(dgP(e, 1900, 500)));
          q('.b1').setAttribute('opacity', dgEase(dgP(e, 2900, 500)));
        });
      }
    },
  });
})();
