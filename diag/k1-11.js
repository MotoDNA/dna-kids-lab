/* 1학년 국어 · 동물, 과일, 탈것 이름을 읽어 볼까? (k1-11) */
(() => {
  const arrow = (x, y) => `<path d="M${x - 14} ${y} h26 m-9 -9 l9 9 l-9 9" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* 0 */
  const R0 = ['강아지', '고양이'];
  /* 1 */
  const R1 = [
    { w: [['바', ''], ['나', ''], ['나', '']], x: 40, y: 56 },
    { w: [['포', ''], ['도', '']], x: 290, y: 56 },
    { w: [['딸', 'ㄹ'], ['기', '']], x: 40, y: 168 },
    { w: [['수', ''], ['박', 'ㄱ']], x: 290, y: 168 },
  ];
  /* 3 */
  const BOX = [{ n: '동물', x: 82, col: DG_C.r }, { n: '과일', x: 240, col: DG_C.c }, { n: '탈것', x: 398, col: DG_C.d }];
  const CH = [['곰', 0], ['사과', 1], ['버스', 2], ['사자', 0], ['기차', 2], ['포도', 1]];
  const start = i => ({ x: 45 + i * 78, y: 84 });
  const slot = (i) => { const b = CH[i][1]; const k = CH.slice(0, i).filter(c => c[1] === b).length; return { x: BOX[b].x, y: 190 + k * 52 }; };

  Object.assign(DIAG, {
    'k1-11:0': {
      alt: '강, 아, 지를 한 글자씩 천천히 읽은 다음 이어서 강아지로 읽고, 고, 양, 이를 읽은 다음 고양이로 읽는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${R0.map((w, r) => { const y = 54 + r * 100; return `<g>
          ${[...w].map((s, i) => `<rect class="t${r}_${i}" x="${20 + i * 66}" y="${y}" width="52" height="56" rx="13" fill="#f5f5f7"/>
            <text x="${46 + i * 66}" y="${y + 39}" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800">${s}</text>
            ${i < 2 ? `<text x="${79 + i * 66}" y="${y + 36}" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">-</text>` : ''}`).join('')}
          <g class="j${r}">${arrow(240, y + 28)}
            <text x="356" y="${y + 42}" text-anchor="middle" fill="${DG_C.d}" font-size="40" font-weight="800">${w}</text></g>
        </g>`; }).join('')}
        <text class="h1" x="106" y="248" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">한 글자씩</text>
        <text class="h2" x="356" y="248" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">이어서</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          R0.forEach((w, r) => {
            const st = 300 + r * 2600;
            for (let i = 0; i < 3; i++) {
              const on = e >= st + i * 600 && e < st + i * 600 + 600;
              q(`.t${r}_${i}`).setAttribute('fill', on ? DG_C.a : '#f5f5f7');
            }
            const f = dgEase(dgP(e, st + 1900, 500));
            q('.j' + r).setAttribute('opacity', f);
            q('.j' + r).setAttribute('transform', `translate(${(1 - f) * -30},0)`);
          });
          q('.h1').setAttribute('opacity', e > 300 ? 1 : 0);
          q('.h2').setAttribute('opacity', e > 2200 ? 1 : 0);
        });
      }
    },

    'k1-11:1': {
      alt: '바나나와 포도에는 받침이 없고, 딸기의 딸에는 받침 ㄹ, 수박의 박에는 받침 ㄱ이 있어 또박또박 소리 내는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${R1.map((r, k) => `<g class="w${k}">${r.w.map(([s, b], i) => { const x = r.x + i * 58; return `
          <rect x="${x}" y="${r.y}" width="50" height="56" rx="13" fill="${b ? DG_C.a : '#f5f5f7'}" ${b ? `stroke="${DG_C.c}" stroke-width="3"` : ''}/>
          <text x="${x + 25}" y="${r.y + 39}" text-anchor="middle" fill="${b ? DG_C.c : DG_C.ink}" font-size="30" font-weight="800">${s}</text>
          ${b ? `<g class="bc"><path d="M${x + 25} ${r.y + 62} v12" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>
            <text x="${x + 25}" y="${r.y + 100}" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">받침 ${b}</text></g>` : ''}`; }).join('')}
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 4600, e => {
          R1.forEach((r, k) => q('.w' + k).setAttribute('opacity', dgP(e, 200 + k * 700, 400)));
          qa('.bc').forEach((g, i) => g.setAttribute('opacity', dgP(e, 3200 + i * 500, 400)));
        });
      }
    },

    'k1-11:3': {
      alt: '곰, 사과, 버스, 사자, 기차, 포도 낱말 카드를 동물(곰, 사자), 과일(사과, 포도), 탈것(버스, 기차) 바구니에 나누어 담는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${BOX.map(b => `<g>
          <path d="M${b.x - 70} 172 h140 v120 a12 12 0 0 1 -12 12 h-116 a12 12 0 0 1 -12 -12 Z" fill="${b.col}" fill-opacity=".08" stroke="${b.col}" stroke-width="3" stroke-linejoin="round"/>
          <text x="${b.x}" y="160" text-anchor="middle" fill="${b.col}" font-size="22" font-weight="800">${b.n}</text>
        </g>`).join('')}
        ${CH.map(([w], i) => `<g class="c${i}"><rect x="-36" y="-22" width="72" height="44" rx="22" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
          <text y="9" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${w}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          CH.forEach((c, i) => {
            const a = start(i), b = slot(i), f = dgEase(dgP(e, 900 + i * 800, 800));
            const x = a.x + (b.x - a.x) * f, y = a.y + (b.y - a.y) * f - Math.sin(f * Math.PI) * 30;
            const g = q('.c' + i);
            g.setAttribute('transform', `translate(${x},${y})`);
            g.setAttribute('opacity', dgP(e, i * 100, 300));
            g.querySelector('rect').setAttribute('stroke', f >= 1 ? BOX[c[1]].col : '#d2d2d7');
          });
        });
      }
    },
  });
})();
