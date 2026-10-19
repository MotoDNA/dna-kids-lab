/* 6학년 영어 · 해야 할 일과 하면 안 되는 일을 영어로 말해 볼까? (e5-04) */
(() => {
  const C = DG_C, G = '#d6efdc', RED = '#ff3b30';
  const tw = (s, fs) => 0.92 * [...s].reduce((a, ch) => a + fs * (/[il.,'!|: ]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[ㄱ-힣]/.test(ch) ? 1.0 : 0.58), 0);
  const chip = (cls, x, y, s, f, st, fs = 22) => { const w = tw(s, fs) + 24; return { w, svg: `<g class="${cls}"><rect x="${x}" y="${y - 21}" width="${w}" height="42" rx="12" fill="${f}" stroke="${st}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + 8}" text-anchor="middle" fill="${C.ink}" font-size="${fs}" font-weight="800">${s}</text></g>` }; };

  /* 0: 주어 + should + 동사원형 */
  const S0 = [['You', 'wash', 'your hands.'], ['I', 'do', 'my homework.'], ['You', 'wear', 'a helmet.']];
  const row0 = (r, i) => {
    const y = 76 + i * 64; let x = 24, out = '';
    const a = chip('', x, y, r[0], '#fff', '#d2d2d7'); out += `<g class="sb${i}">${a.svg}</g>`; x += a.w + 8;
    const b = chip('', x, y, 'should', C.a, C.c); out += `<g class="sh${i}">${b.svg}</g>`; x += b.w + 8;
    const c = chip('', x, y, r[1], G, C.r); out += `<g class="vb${i}">${c.svg}<text x="${x + c.w + 8}" y="${y + 8}" fill="${C.ink}" font-size="22" font-weight="700">${r[2]}</text></g>`;
    return out;
  };

  /* 1: 달리는 사람 */
  const runner = (cx, cy, col) => `<g fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="${cx + 8}" cy="${cy - 30}" r="8" fill="${col}"/><path d="M${cx + 4} ${cy - 18} L${cx - 4} ${cy + 6}"/>
    <path d="M${cx - 4} ${cy + 6} L${cx + 12} ${cy + 18} L${cx + 8} ${cy + 34}"/><path d="M${cx - 4} ${cy + 6} L${cx - 14} ${cy + 22} L${cx - 26} ${cy + 22}"/>
    <path d="M${cx + 2} ${cy - 12} L${cx + 18} ${cy - 2}"/><path d="M${cx + 2} ${cy - 12} L${cx - 14} ${cy - 6}"/></g>`;
  const book = (cx, cy, col) => `<g fill="${C.b}" stroke="${col}" stroke-width="4" stroke-linejoin="round"><path d="M${cx} ${cy - 18} C${cx - 14} ${cy - 28} ${cx - 30} ${cy - 28} ${cx - 40} ${cy - 22} V${cy + 22} C${cx - 30} ${cy + 16} ${cx - 14} ${cy + 16} ${cx} ${cy + 26} Z"/><path d="M${cx} ${cy - 18} C${cx + 14} ${cy - 28} ${cx + 30} ${cy - 28} ${cx + 40} ${cy - 22} V${cy + 22} C${cx + 30} ${cy + 16} ${cx + 14} ${cy + 16} ${cx} ${cy + 26} Z"/></g>`;

  /* 2: 대화 */
  const B2 = [
    { s: 'I have a cold.', side: 0, y: 66 },
    { s: 'What <tspan fill="' + C.c + '">should</tspan> I do?', raw: 'What should I do?', side: 0, y: 122 },
    { s: 'You <tspan fill="' + C.c + '">should</tspan> get some rest.', raw: 'You should get some rest.', side: 1, y: 196 },
    { s: 'You <tspan fill="' + C.c + '">should</tspan> see a doctor.', raw: 'You should see a doctor.', side: 1, y: 252 },
  ];
  const face = (cx, cy, sad, col, fill) => `<circle cx="${cx}" cy="${cy}" r="26" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <circle cx="${cx - 9}" cy="${cy - 5}" r="3" fill="${C.ink}"/><circle cx="${cx + 9}" cy="${cy - 5}" r="3" fill="${C.ink}"/>
    <path d="${sad ? `M${cx - 8} ${cy + 13} q8 -7 16 0` : `M${cx - 9} ${cy + 8} q9 8 18 0`}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;

  Object.assign(DIAG, {
    'e5-04:0': {
      alt: 'You should wash your hands. / I should do my homework. / You should wear a helmet. 문장에서 should 뒤에 wash, do, wear 같은 동사의 원래 모양이 오는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${S0.map(row0).join('')}
        <g class="lg">
          <rect x="24" y="250" width="22" height="22" rx="6" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
          <text x="54" y="268" fill="${C.ink}" font-size="20" font-weight="800">should = ~해야 해</text>
          <rect x="262" y="250" width="22" height="22" rx="6" fill="${G}" stroke="${C.r}" stroke-width="2.5"/>
          <text x="292" y="268" fill="${C.ink}" font-size="20" font-weight="800">동사 원래 모양</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          S0.forEach((r, i) => {
            const st = 200 + i * 1500;
            q('.sb' + i).setAttribute('opacity', dgP(e, st, 400));
            const f = dgEase(dgP(e, st + 400, 600));
            q('.sh' + i).setAttribute('opacity', f);
            q('.sh' + i).setAttribute('transform', `translate(0,${-24 * (1 - f)})`);
            q('.vb' + i).setAttribute('opacity', dgP(e, st + 1000, 400));
          });
          q('.lg').setAttribute('opacity', dgP(e, 4800, 600));
        });
      }
    },

    'e5-04:1': {
      alt: 'should not을 줄이면 shouldn\'t(~하면 안 돼)가 되고, 복도 안내판에는 Don\'t run., 도서관 안내판에는 Be quiet.처럼 동사로 시작하는 규칙 문장이 쓰인 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <g class="top">
          <text x="24" y="66" fill="${C.sub}" font-size="24" font-weight="800">should not</text>
          <path d="M162 58 h36 m-9 -9 l9 9 l-9 9" fill="none" stroke="${C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text class="ct" x="212" y="66" fill="${C.ink}" font-size="26" font-weight="800">shouldn<tspan fill="${RED}">'</tspan>t</text>
          <text class="mn" x="24" y="104" fill="${RED}" font-size="20" font-weight="800">= ~하면 안 돼</text>
        </g>
        ${[{ x: 24, place: '복도', t: "Don't run.", kw: "Don't" }, { x: 252, place: '도서관', t: 'Be quiet.', kw: 'Be' }].map((s, i) => `<g class="sg${i}">
          <rect x="${s.x}" y="128" width="204" height="190" rx="18" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          <text x="${s.x + 102}" y="158" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">${s.place}</text>
          ${i === 0 ? `${runner(s.x + 102, 218, C.ink)}<circle cx="${s.x + 102}" cy="216" r="44" fill="none" stroke="${RED}" stroke-width="6"/><line x1="${s.x + 71}" y1="185" x2="${s.x + 133}" y2="247" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>`
          : `${book(s.x + 102, 216, C.d)}`}
          <text x="${s.x + 102}" y="298" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800"><tspan fill="${i ? C.d : RED}">${s.kw}</tspan>${s.t.slice(s.kw.length)}</text>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.top').setAttribute('opacity', dgP(e, 200, 500));
          const f = dgEase(dgP(e, 800, 600));
          q('.ct').setAttribute('opacity', f);
          q('.ct').setAttribute('transform', `translate(${-14 * (1 - f)},0)`);
          q('.mn').setAttribute('opacity', dgP(e, 1500, 400));
          [0, 1].forEach(i => {
            const g = dgEase(dgP(e, 2400 + i * 1000, 600));
            q('.sg' + i).setAttribute('opacity', g);
            q('.sg' + i).setAttribute('transform', `translate(0,${16 * (1 - g)})`);
          });
        });
      }
    },

    'e5-04:2': {
      alt: '감기에 걸린 아이가 I have a cold. What should I do? 하고 묻자 친구가 You should get some rest. You should see a doctor. 하고 조언하는 대화 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="f0">${face(40, 92, true, C.d, C.b)}</g>
        <g class="f1">${face(440, 224, false, C.c, C.a)}</g>
        ${B2.map((b, i) => { const w = tw(b.raw || b.s, 21) + 30, x = b.side ? 400 - w : 80; return `<g class="b${i}">
          <rect x="${x}" y="${b.y - 22}" width="${w}" height="44" rx="22" fill="${b.side ? C.a : '#f5f5f7'}" fill-opacity="${b.side ? .55 : 1}" stroke="${b.side ? C.c : '#d2d2d7'}" stroke-width="2"/>
          <text x="${x + w / 2}" y="${b.y + 7}" text-anchor="middle" fill="${C.ink}" font-size="21" font-weight="700">${b.s}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.f0').setAttribute('opacity', dgP(e, 0, 400));
          q('.f1').setAttribute('opacity', dgP(e, 2400, 400));
          B2.forEach((b, i) => {
            const st = [400, 1400, 2800, 4000][i], f = dgEase(dgP(e, st, 500));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(${(b.side ? 16 : -16) * (1 - f)},0)`);
          });
        });
      }
    },
  });
})();
