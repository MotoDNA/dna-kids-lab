/* 1학년 국어 · 이야기는 어떤 차례로 펼쳐질까? (k1-17) */
(() => {
  const arrow = (x, y) => `<path d="M${x - 12} ${y} h22 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pot = `<path d="M-34 0 h68 l-8 46 h-52 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/><rect x="-38" y="-6" width="76" height="10" rx="4" fill="${DG_C.c}"/>`;
  const leaf = (s) => `<path d="M0 0 Q${18 * s} -16 ${30 * s} -6 Q${16 * s} 4 0 0 Z" fill="${DG_C.r}"/>`;
  const plants = [
    `<ellipse cx="0" cy="-12" rx="8" ry="5" fill="#a2845e"/><path d="M-26 -4 Q0 -14 26 -4" fill="none" stroke="#a2845e" stroke-width="3" stroke-dasharray="3 5"/>`,
    `<path d="M0 -6 V-44" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round"/><g transform="translate(0,-36)">${leaf(1)}</g><g transform="translate(0,-30)">${leaf(-1)}</g>`,
    `<path d="M0 -6 V-92" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round"/><g transform="translate(0,-40)">${leaf(1)}</g><g transform="translate(0,-56)">${leaf(-1)}</g>
     <g transform="translate(0,-104)">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = k * Math.PI / 4; return `<ellipse cx="${(20 * Math.cos(a)).toFixed(1)}" cy="${(20 * Math.sin(a)).toFixed(1)}" rx="10" ry="7" transform="rotate(${k * 45} ${(20 * Math.cos(a)).toFixed(1)} ${(20 * Math.sin(a)).toFixed(1)})" fill="#ffcc00"/>`; }).join('')}<circle r="13" fill="#a2845e"/></g>`,
  ];
  const P0 = [['처음', '씨앗 심기', DG_C.d], ['가운데', '싹이 났어요', DG_C.r], ['끝', '꽃이 피었어요', DG_C.c]];

  const R1 = [['먼저', '손을 씻어요', DG_C.d], ['그다음에', '밥을 먹어요', DG_C.r], ['마지막으로', '이를 닦아요', DG_C.c]];

  const R = Math.PI / 180, SC = { x: 240, y: 200 }, SR = 170;
  const T2 = [{ a: 160, n: '아침', t: '일어나요' }, { a: 90, n: '점심', t: '점심 먹어요' }, { a: 20, n: '저녁', t: '자요' }];
  const sp = a => [SC.x + SR * Math.cos(a * R), SC.y - SR * 0.62 * Math.sin(a * R)];

  const C3 = [['경주를', '해요'], ['토끼가', '낮잠을 자요'], ['거북이', '이겨요']];
  const SHUF = [2, 0, 1]; // 처음 놓인 자리
  const SX = i => 84 + i * 156;

  Object.assign(DIAG, {
    'k1-17:0': {
      alt: '이야기의 처음에 씨앗을 심고, 가운데에 싹이 나고, 끝에 꽃이 피는 것을 화분 세 개로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${P0.map(([n, t, c], i) => { const x = 80 + i * 160; return `<g class="p${i}">
          <g transform="translate(${x},176)">${plants[i]}${pot}</g>
          <text x="${x}" y="256" text-anchor="middle" fill="${c}" font-size="24" font-weight="800">${n}</text>
          <text x="${x}" y="286" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">${t}</text>
        </g>${i < 2 ? `<g class="a${i}">${arrow(x + 80, 200)}</g>` : ''}`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 200 + i * 1500, 700));
            q('.p' + i).setAttribute('opacity', f);
            q('.p' + i).setAttribute('transform', `translate(0,${(1 - f) * 16})`);
            if (i < 2) q('.a' + i).setAttribute('opacity', e > 1100 + i * 1500 ? 1 : 0);
          });
        });
      }
    },

    'k1-17:1': {
      alt: '먼저 손을 씻어요, 그다음에 밥을 먹어요, 마지막으로 이를 닦아요처럼 차례를 알려 주는 말을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${R1.map(([w, t, c], i) => { const y = 46 + i * 80; return `<g class="r${i}">
          <rect x="40" y="${y}" width="136" height="48" rx="24" fill="${c}"/>
          <text x="108" y="${y + 32}" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">${w}</text>
          <rect x="190" y="${y}" width="250" height="48" rx="14" fill="#f5f5f7"/>
          <text x="315" y="${y + 32}" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${t}</text>
          ${i < 2 ? `<path d="M108 ${y + 54} v18 m-7 -7 l7 7 l7 -7" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 300 + i * 1200, 600));
            q('.r' + i).setAttribute('opacity', f);
            q('.r' + i).setAttribute('transform', `translate(${(1 - f) * -30},0)`);
          });
        });
      }
    },

    'k1-17:2': {
      alt: '해가 뜨는 아침에 일어나고, 해가 높이 뜬 점심에 점심을 먹고, 달이 뜬 저녁에 자는 것처럼 시간 차례대로 일이 일어나는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <path d="M${sp(170).join(' ')} Q240 ${SC.y - SR * 1.24} ${sp(10).join(' ')}" fill="none" stroke="#e5e5ea" stroke-width="3" stroke-dasharray="6 7"/>
        <line x1="20" y1="${SC.y}" x2="460" y2="${SC.y}" stroke="${DG_C.sub}" stroke-width="3"/>
        ${T2.map((p, i) => { const [x] = sp(p.a); return `<g class="l${i}">
          <circle cx="${x}" cy="${SC.y}" r="6" fill="${DG_C.ink}"/>
          <text x="${x}" y="${SC.y + 36}" text-anchor="middle" fill="${i === 2 ? DG_C.d : DG_C.c}" font-size="24" font-weight="800">${p.n}</text>
          <text x="${x}" y="${SC.y + 66}" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">${p.t}</text></g>`; }).join('')}
        <g class="sun"><circle r="20" fill="${DG_C.c}"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = k * Math.PI / 4; return `<line x1="${(26 * Math.cos(a)).toFixed(1)}" y1="${(26 * Math.sin(a)).toFixed(1)}" x2="${(34 * Math.cos(a)).toFixed(1)}" y2="${(34 * Math.sin(a)).toFixed(1)}" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</g>
        <g class="moon"><path d="M8 -20 A22 22 0 1 0 8 20 A17 17 0 1 1 8 -20 Z" fill="${DG_C.d}"/></g>
        ${T2.map((p, i) => { const [x, y] = sp(p.a); return `<g class="g${i}" opacity="0">${i < 2 ? `<circle cx="${x}" cy="${y}" r="9" fill="${DG_C.c}" fill-opacity=".35"/>` : ''}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          // 해: 아침(160°) → 점심(90°) → 저녁(20°), 쉬었다 가기
          const f1 = dgEase(dgP(e, 900, 1300)), f2 = dgEase(dgP(e, 2900, 1300));
          const a = 160 - 70 * f1 - 70 * f2;
          const [x, y] = sp(a);
          const night = e > 4200;
          q('.sun').setAttribute('transform', `translate(${x},${y})`);
          q('.sun').setAttribute('opacity', night ? 0 : 1);
          q('.moon').setAttribute('transform', `translate(${x},${y})`);
          q('.moon').setAttribute('opacity', night ? 1 : 0);
          [0, 1, 2].forEach(i => q('.l' + i).setAttribute('opacity', e > [200, 2200, 4200][i] ? 1 : 0));
          q('.g0').setAttribute('opacity', e > 900 ? 1 : 0);
          q('.g1').setAttribute('opacity', e > 2900 ? 1 : 0);
        });
      }
    },

    'k1-17:3': {
      alt: '토끼와 거북 이야기 카드를 일어난 차례대로 정리하는 그림: 1 경주를 해요, 2 토끼가 낮잠을 자요, 3 거북이 이겨요',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${[0, 1, 2].map(i => `<g>
          <rect x="${SX(i) - 70}" y="146" width="140" height="104" rx="16" fill="none" stroke="#d2d2d7" stroke-width="2" stroke-dasharray="6 6"/>
          <text x="${SX(i)}" y="276" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">${i + 1}</text>
        </g>`).join('')}
        <g class="ar">${arrow(162, 198)}${arrow(318, 198)}</g>
        ${C3.map(([a, b], i) => `<g class="c${i}">
          <rect x="-62" y="-50" width="124" height="100" rx="14" fill="${i === 2 ? DG_C.a : '#fff'}" stroke="${[DG_C.d, DG_C.sub, DG_C.c][i]}" stroke-width="3"/>
          <text y="-8" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${a}</text>
          <text y="22" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${b}</text>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          C3.forEach((_, i) => {
            const f = dgEase(dgP(e, 1000 + i * 1200, 1000));
            const x0 = SX(SHUF[i]), y0 = 84, x1 = SX(i), y1 = 198;
            const x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
            q('.c' + i).setAttribute('transform', `translate(${x},${y}) rotate(${(1 - f) * (i - 1) * 6})`);
          });
          q('.ar').setAttribute('opacity', dgP(e, 4600, 400));
        });
      }
    },
  });
})();
