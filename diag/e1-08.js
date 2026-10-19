/* 1학년 영어 · 영어로 하나, 둘, 셋 어떻게 셀까? (e1-08) */
(() => {
  const RED = '#ff3b30';
  const apple = (x, y) => `<path d="M${x} ${y - 12} q2 -8 7 -10" fill="none" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="12" fill="${RED}"/>`;
  /* 주사위 모양 배치 */
  const DICE = [[[0, 0]], [[-1, -1], [1, 1]], [[-1, -1], [0, 0], [1, 1]], [[-1, -1], [1, -1], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]]];
  const N0 = ['one', 'two', 'three', 'four', 'five'];
  const N1 = ['six', 'seven', 'eight', 'nine', 'ten'];
  const CX = i => 96 + i * 72;

  /* 3: 강아지 */
  const dog = (x, y) => `<ellipse cx="${x - 30}" cy="${y - 4}" rx="11" ry="22" fill="${DG_C.c}" transform="rotate(20 ${x - 30} ${y - 4})"/>
    <ellipse cx="${x + 30}" cy="${y - 4}" rx="11" ry="22" fill="${DG_C.c}" transform="rotate(-20 ${x + 30} ${y - 4})"/>
    <circle cx="${x}" cy="${y}" r="32" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
    <circle cx="${x - 11}" cy="${y - 6}" r="4" fill="${DG_C.ink}"/><circle cx="${x + 11}" cy="${y - 6}" r="4" fill="${DG_C.ink}"/>
    <ellipse cx="${x}" cy="${y + 8}" rx="7" ry="5" fill="${DG_C.ink}"/>`;
  const bubble = (x, y, w, txt, fill, st, tail) => `<rect x="${x}" y="${y}" width="${w}" height="48" rx="24" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <path d="M${tail[0]} ${y + (tail[1] > 0 ? 48 : 0)} l${tail[2]} ${tail[1]} l14 ${-tail[1]}" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="${tail[0] + 1.5}" y="${y + (tail[1] > 0 ? 45.5 : -1.5)}" width="11" height="4" fill="${fill}"/>
    <text x="${x + w / 2}" y="${y + 33}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${txt}</text>`;

  Object.assign(DIAG, {
    'e1-08:0': {
      alt: '사과 1개 one, 2개 two, 3개 three, 4개 four, 5개 five를 차례로 세는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${N0.map((w, i) => { const x = 48 + i * 96, y = 104; return `<g class="c${i}">
          <rect x="${x - 40}" y="${y - 44}" width="80" height="88" rx="16" fill="#f5f5f7"/>
          ${DICE[i].map(([a, b]) => apple(x + a * 22, y + 4 + b * 22)).join('')}
          <text x="${x}" y="${y + 84}" text-anchor="middle" fill="${DG_C.d}" font-size="26" font-weight="800">${i + 1}</text>
          <text x="${x}" y="${y + 118}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${w}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => N0.forEach((_, i) => {
          const f = dgEase(dgP(e, 200 + i * 900, 500));
          q('.c' + i).setAttribute('opacity', f);
          q('.c' + i).setAttribute('transform', `translate(0,${12 * (1 - f)})`);
        }));
      }
    },

    'e1-08:1': {
      alt: '10칸 틀에 다섯 칸이 채워진 다음 six, seven, eight, nine, ten 하며 한 칸씩 채워 10이 되는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <rect x="60" y="44" width="360" height="144" rx="10" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
        <line x1="60" y1="116" x2="420" y2="116" stroke="${DG_C.sub}" stroke-width="2"/>
        ${[1, 2, 3, 4].map(k => `<line x1="${60 + k * 72}" y1="44" x2="${60 + k * 72}" y2="188" stroke="${DG_C.sub}" stroke-width="2"/>`).join('')}
        ${[0, 1, 2, 3, 4].map(i => `<circle cx="${CX(i)}" cy="80" r="24" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/><text x="${CX(i)}" y="88" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${i + 1}</text>`).join('')}
        ${N1.map((w, i) => `<g class="d${i}"><circle cx="${CX(i)}" cy="152" r="24" fill="${DG_C.c}"/><text x="${CX(i)}" y="160" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">${i + 6}</text></g>
          <text class="w${i}" x="${CX(i)}" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${w}</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => N1.forEach((_, i) => {
          const st = 500 + i * 900, f = dgEase(dgP(e, st, 400));
          q('.d' + i).setAttribute('opacity', f);
          q('.d' + i).setAttribute('transform', `translate(${CX(i)},152) scale(${0.4 + 0.6 * f}) translate(${-CX(i)},-152)`);
          q('.w' + i).setAttribute('opacity', e > st + 300 ? 1 : 0);
        }));
      }
    },

    'e1-08:2': {
      alt: 'two에서 w는 소리가 나지 않아 투로 읽고, eight에서 gh는 소리가 나지 않아 에잇으로 읽는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${[{ w: 'two', s: [1], r: '[투]', y: 96 }, { w: 'eight', s: [2, 3], r: '[에잇]', y: 210 }].map((o, k) => o.w.split('').map((c, i) => {
          const x = 48 + i * 58, sil = o.s.includes(i);
          return `<g class="${sil ? 'sl' + k : ''}"><rect class="${sil ? 'sr' + k : ''}" x="${x - 26}" y="${o.y - 34}" width="52" height="58" rx="12" fill="${DG_C.b}"/>
            <text class="${sil ? 'st' + k : ''}" x="${x}" y="${o.y + 8}" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="800">${c}</text></g>`;
        }).join('') + `<g class="lb${k}"><text x="${o.w.length === 3 ? 48 + 58 : 48 + 2.5 * 58}" y="${o.y + 56}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">소리 안 나요</text>
          <text x="${k ? 360 : 260}" y="${o.y + 12}" fill="${DG_C.c}" font-size="32" font-weight="800">${o.r}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)], q = s => el.querySelector(s);
        dgAnim(el, 5200, e => [0, 1].forEach(k => {
          const st = 600 + k * 2300, f = dgP(e, st, 600);
          qa('.sr' + k).forEach(r => { r.setAttribute('fill', f > 0.5 ? '#fff' : DG_C.b); r.setAttribute('stroke', '#c7c7cc'); r.setAttribute('stroke-dasharray', '5 5'); r.setAttribute('stroke-width', f > 0.5 ? 2 : 0); });
          qa('.st' + k).forEach(t => t.setAttribute('fill', f > 0.5 ? '#c7c7cc' : DG_C.ink));
          q('.lb' + k).setAttribute('opacity', e > st + 700 ? 1 : 0);
        }));
      }
    },

    'e1-08:3': {
      alt: 'How many? 하고 물으면 강아지를 하나, 둘, 셋 세어 Three!라고 숫자로 대답하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="qb">${bubble(24, 22, 180, 'How many?', '#f5f5f7', '#d2d2d7', [60, 14, 6])}</g>
        ${[0, 1, 2].map(i => `<g>${dog(110 + i * 110, 140)}</g>
          <g class="n${i}"><circle cx="${110 + i * 110}" cy="206" r="18" fill="${DG_C.d}"/><text x="${110 + i * 110}" y="214" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">${i + 1}</text></g>`).join('')}
        <g class="ab">${bubble(270, 236, 150, 'Three!', DG_C.a, DG_C.c, [370, -14, 6])}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.qb').setAttribute('opacity', dgP(e, 200, 400));
          [0, 1, 2].forEach(i => q('.n' + i).setAttribute('opacity', e > 1200 + i * 800 ? 1 : 0));
          q('.ab').setAttribute('opacity', dgEase(dgP(e, 4000, 500)));
        });
      }
    },
  });
})();
