/* 4학년 수학 · 각의 크기는 어떻게 잴까? (m4-02) */
(() => {
  const R = Math.PI / 180;
  const pt = (cx, cy, r, a) => [+(cx + r * Math.cos(a * R)).toFixed(2), +(cy - r * Math.sin(a * R)).toFixed(2)];
  // 부채꼴(꼭짓점 cx,cy / 반지름 r / 각 a0→a1, 수학 방향)
  const sec = (cx, cy, r, a0, a1) => {
    if (a1 - a0 < 0.01) return `M${cx} ${cy}`;
    const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
    return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${x1} ${y1} Z`;
  };
  const arc = (cx, cy, r, a0, a1) => {
    if (a1 - a0 < 0.01) return `M${pt(cx, cy, r, a0).join(' ')}`;
    const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
    return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${x1} ${y1}`;
  };

  /* 0: 직각 90° → 직각 2개 180° → 직각 4개 360° */
  const P0 = [
    { cx: 70, cy: 170, r: 70, n: 1, v: '90°', t: '직각 1개' },
    { cx: 240, cy: 170, r: 70, n: 2, v: '180°', t: '직각 2개' },
    { cx: 400, cy: 135, r: 55, n: 4, v: '360°', t: '직각 4개' },
  ];

  /* 1: 각도기 */
  const PC = { x: 240, y: 250 }, PR = 180;
  let ticks = '', nums = '';
  for (let a = 0; a <= 180; a += 5) {
    const [x0, y0] = pt(0, 0, PR - (a % 10 ? 9 : 16), a), [x1, y1] = pt(0, 0, PR, a);
    ticks += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${DG_C.d}" stroke-width="${a % 90 ? 1.5 : 2.5}"/>`;
  }
  for (const a of [0, 90, 180]) {
    const [xi, yi] = pt(0, 0, 122, a), [xo, yo] = pt(0, 0, 150, a);
    const dy = a === 0 || a === 180 ? -10 : 6;
    nums += `<text x="${xo}" y="${yo + dy}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="600">${180 - a}</text>`;
    nums += `<text x="${xi}" y="${yi + dy}" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">${a}</text>`;
  }
  const [r65x, r65y] = pt(0, 0, 122, 65), [o65x, o65y] = pt(0, 0, 150, 65);
  const [e65x, e65y] = pt(PC.x, PC.y, 215, 65);

  /* 2: 예각 · 직각 · 둔각 */
  const P2 = [
    { cx: 40, cy: 175, L: 100, a: 40, n: '예각', col: DG_C.r },
    { cx: 200, cy: 175, L: 95, a: 90, n: '직각', col: DG_C.d },
    { cx: 380, cy: 175, L: 88, a: 125, n: '둔각', col: DG_C.c },
  ];

  /* 4: 삼각형 50°, 75°, 55° */
  const A = [20, 255], B = [220, 255];
  const bLen = 200 * Math.sin(75 * R) / Math.sin(55 * R);
  const C = [+(A[0] + bLen * Math.cos(50 * R)).toFixed(2), +(A[1] - bLen * Math.sin(50 * R)).toFixed(2)];
  const G = [370, 255], WR = 54;
  // 꼭짓점, 원래 각 구간, 모였을 때 회전량
  const W4 = [
    { v: A, a0: 0, a1: 50, rot: 0, fill: DG_C.a, st: DG_C.c, lab: '50°' },
    { v: C, a0: 230, a1: 285, rot: -180, fill: '#d6efdc', st: DG_C.r, lab: '55°' },
    { v: B, a0: 105, a1: 180, rot: 0, fill: DG_C.b, st: DG_C.d, lab: '75°' },
  ];

  Object.assign(DIAG, {
    'm4-02:0': {
      alt: '직각 하나는 90°, 직각 두 개를 이어 붙이면 한 직선으로 180°, 직각 네 개면 한 바퀴로 360°인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${P0.map((p, i) => `<g>
          ${Array.from({ length: p.n }, (_, k) => `<path class="q q${i}" data-a0="${k * 90}" fill="${k % 2 ? DG_C.b : DG_C.a}" stroke="${k % 2 ? DG_C.d : DG_C.c}" stroke-width="3" stroke-linejoin="round" d="${sec(p.cx, p.cy, p.r, k * 90, k * 90 + 90)}"/>`).join('')}
          <circle cx="${p.cx}" cy="${p.cy}" r="4" fill="${DG_C.ink}"/>
          <g class="lb${i}"><text x="${i === 0 ? p.cx + 35 : p.cx}" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${p.v}</text>
          <text x="${i === 0 ? p.cx + 35 : p.cx}" y="254" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="600">${p.t}</text></g>
        </g>`).join('')}
        <path d="M${70 + 14} 170 v-14 h-14" fill="none" stroke="${DG_C.ink}" stroke-width="2.5" class="sq"/>
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        const order = [];
        P0.forEach((p, i) => qa('.q' + i).forEach(q => order.push([q, p, i])));
        dgAnim(el, 6200, e => {
          let t = 300;
          order.forEach(([q, p, i], k) => {
            if (k === 1 || k === 3) t += 700; // 다음 그림으로 넘어갈 때 잠깐 쉼
            const a0 = +q.dataset.a0, f = dgEase(dgP(e, t, 650));
            q.setAttribute('d', sec(p.cx, p.cy, p.r, a0, a0 + 90 * f));
            q.setAttribute('opacity', f > 0 ? 1 : 0);
            t += 650;
          });
          qa('.lb0').forEach(g => g.setAttribute('opacity', e > 1000 ? 1 : 0));
          el.querySelector('.sq').setAttribute('opacity', e > 1000 ? 1 : 0);
          qa('.lb1').forEach(g => g.setAttribute('opacity', e > 3000 ? 1 : 0));
          qa('.lb2').forEach(g => g.setAttribute('opacity', e > 6000 ? 1 : 0));
        });
      }
    },

    'm4-02:1': {
      alt: '각도기의 중심을 각의 꼭짓점에, 밑금을 한 변에 맞춘 뒤 오른쪽 0에서 시작하는 안쪽 눈금 65를 읽어 65°를 재는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <line x1="${PC.x}" y1="${PC.y}" x2="470" y2="${PC.y}" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
        <line x1="${PC.x}" y1="${PC.y}" x2="${e65x}" y2="${e65y}" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
        <g class="prot">
          <path d="M${-PR} 0 A${PR} ${PR} 0 0 1 ${PR} 0 Z" fill="${DG_C.b}" fill-opacity=".35" stroke="${DG_C.d}" stroke-width="3"/>
          <line x1="${-PR}" y1="0" x2="${PR}" y2="0" stroke="${DG_C.d}" stroke-width="3"/>
          ${ticks}${nums}
          <circle r="6" fill="#fff" stroke="${DG_C.d}" stroke-width="3"/>
        </g>
        <circle class="vx" cx="${PC.x}" cy="${PC.y}" r="5" fill="${DG_C.ink}"/>
        <path class="sw" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" d="${arc(PC.x, PC.y, 95, 0, 65)}"/>
        <g class="rd">
          <text x="${PC.x + 122}" y="${PC.y - 10}" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">0</text>
          <circle cx="${PC.x + r65x}" cy="${PC.y + r65y - 1}" r="17" fill="#fff" stroke="${DG_C.c}" stroke-width="3"/>
          <text x="${PC.x + r65x}" y="${PC.y + r65y + 6}" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">65</text>
          <rect x="${PC.x + o65x - 22}" y="${PC.y + o65y - 14}" width="44" height="26" rx="13" fill="#fff" stroke="#d2d2d7" stroke-width="1.5"/>
          <text x="${PC.x + o65x}" y="${PC.y + o65y + 6}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="600">115</text>
          <text x="400" y="80" text-anchor="middle" fill="${DG_C.c}" font-size="26" font-weight="800">65°</text>
        </g>
        ${['① 중심 맞추기', '② 밑금 맞추기', '③ 눈금 읽기'].map((s, i) => `<text class="stp" x="${80 + i * 160}" y="300" text-anchor="middle" font-size="18" font-weight="700">${s}</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          // ① 각도기가 왼쪽에서 와서 중심이 꼭짓점에 맞음
          const m = dgEase(dgP(e, 400, 1300));
          const x = PC.x - 150 * (1 - m), y = PC.y - 60 * (1 - m);
          // ② 기울어져 있던 밑금이 한 변에 맞춰짐
          const rr = -14 * (1 - dgEase(dgP(e, 1900, 900)));
          q('.prot').setAttribute('transform', `translate(${x},${y}) rotate(${rr})`);
          q('.prot').setAttribute('opacity', e > 200 ? 1 : 0);
          // ③ 0에서 65까지 따라 읽기
          const s = dgEase(dgP(e, 3100, 1300));
          q('.sw').setAttribute('d', arc(PC.x, PC.y, 95, 0, 65 * s));
          q('.sw').setAttribute('opacity', s > 0 ? 1 : 0);
          q('.rd').setAttribute('opacity', e > 4500 ? 1 : 0);
          const step = e > 3000 ? 2 : e > 1800 ? 1 : 0;
          qa('.stp').forEach((t, i) => t.setAttribute('fill', i === step || (e >= 6000) ? (i === 2 ? DG_C.c : DG_C.d) : '#c7c7cc'));
          if (e >= 6000) qa('.stp').forEach((t, i) => t.setAttribute('fill', i === 2 ? DG_C.c : DG_C.d));
        });
      }
    },

    'm4-02:2': {
      alt: '직각(90°)을 기준으로 40°는 예각, 90°는 직각, 125°는 둔각으로 비교하는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${P2.map((p, i) => `<g>
          ${p.a !== 90 ? `<line x1="${p.cx}" y1="${p.cy}" x2="${p.cx}" y2="${p.cy - 95}" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="6 6"/>
          <text x="${p.cx + (p.a < 90 ? -6 : 6)}" y="${p.cy - 102}" text-anchor="${p.a < 90 ? 'start' : 'end'}" fill="${DG_C.sub}" font-size="18" font-weight="600">90°</text>` : ''}
          <path class="ar${i}" fill="${p.col}" fill-opacity=".18" stroke="${p.col}" stroke-width="3" d=""/>
          <line x1="${p.cx}" y1="${p.cy}" x2="${p.cx + p.L}" y2="${p.cy}" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
          <line class="ry${i}" x1="${p.cx}" y1="${p.cy}" x2="${p.cx + p.L}" y2="${p.cy}" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
          ${p.a === 90 ? `<path class="sq" d="M${p.cx + 16} ${p.cy} v-16 h-16" fill="none" stroke="${DG_C.ink}" stroke-width="2.5"/>` : ''}
          <circle cx="${p.cx}" cy="${p.cy}" r="4" fill="${DG_C.ink}"/>
          <g class="lb${i}">
            <text x="${pt(p.cx, p.cy, 50, p.a / 2)[0] + (p.a === 90 ? 6 : p.a === 40 ? 10 : 0)}" y="${pt(p.cx, p.cy, 50, p.a / 2)[1] + 7 + (p.a === 40 ? 4 : 0)}" text-anchor="${p.a === 40 ? 'start' : 'middle'}" fill="${p.col}" font-size="20" font-weight="800">${p.a}°</text>
            <text x="${i === 2 ? 400 : p.cx + 48}" y="225" text-anchor="middle" fill="${p.col}" font-size="24" font-weight="800">${p.n}</text>
          </g>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          P2.forEach((p, i) => {
            const st = 300 + i * 1700, f = dgEase(dgP(e, st, 1100)), a = p.a * f;
            const [x, y] = pt(p.cx, p.cy, p.L, a);
            q('.ry' + i).setAttribute('x2', x); q('.ry' + i).setAttribute('y2', y);
            q('.ar' + i).setAttribute('d', sec(p.cx, p.cy, 30, 0, a));
            q('.lb' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
            const sq = p.a === 90 && q('.sq'); if (sq) sq.setAttribute('opacity', f >= 1 ? 1 : 0);
          });
        });
      }
    },

    'm4-02:3': {
      alt: '75°인 부채꼴과 40°인 부채꼴의 꼭짓점을 맞춰 이어 붙이면 115°가 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <path d="${sec(130, 215, 110, 0, 75)}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>
        <text x="${pt(130, 215, 66, 37.5)[0]}" y="${pt(130, 215, 66, 37.5)[1] + 8}" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">75°</text>
        <g class="wb"><path d="${sec(0, 0, 110, 0, 40)}" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/></g>
        <text class="lb" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">40°</text>
        <circle cx="130" cy="215" r="4" fill="${DG_C.ink}"/>
        <g class="sum">
          <path d="${arc(130, 215, 128, 0, 115)}" fill="none" stroke="${DG_C.ink}" stroke-width="3" stroke-dasharray="6 6"/>
          <text x="${pt(130, 215, 150, 60)[0] + 10}" y="${pt(130, 215, 150, 60)[1]}" text-anchor="start" fill="${DG_C.ink}" font-size="24" font-weight="800">115°</text>
        </g>
        <text class="eq" x="240" y="272" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">75° + 40° = 115°</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          const m = dgEase(dgP(e, 800, 1800));
          const x = 330 + (130 - 330) * m, rot = 75 * m;
          q('.wb').setAttribute('transform', `translate(${x},215) rotate(${-rot})`);
          const [lx, ly] = pt(x, 215, 66, 20 + rot);
          q('.lb').setAttribute('x', lx); q('.lb').setAttribute('y', ly + 8);
          q('.sum').setAttribute('opacity', e > 3000 ? 1 : 0);
          q('.eq').setAttribute('opacity', e > 3800 ? 1 : 0);
        });
      }
    },

    'm4-02:4': {
      alt: '각이 50°, 75°, 55°인 삼각형의 세 귀퉁이를 떼어 한 점에 모으면 한 직선(180°)이 되는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <path d="M${A} L${B} L${C} Z" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <g class="line"><line x1="272" y1="${G[1]}" x2="468" y2="${G[1]}" stroke="${DG_C.ink}" stroke-width="3" stroke-dasharray="7 6"/>
          <text x="${G[0]}" y="${G[1] - WR * 1.5 - 14}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">180°</text></g>
        ${W4.map(w => `<path d="${sec(w.v[0], w.v[1], WR, w.a0, w.a1)}" fill="${w.fill}" fill-opacity=".45" stroke="${w.st}" stroke-width="2" stroke-dasharray="5 5"/>`).join('')}
        ${W4.map((w, i) => `<g class="w w${i}"><path d="${sec(0, 0, WR, w.a0, w.a1)}" fill="${w.fill}" stroke="${w.st}" stroke-width="3" stroke-linejoin="round"/></g>`).join('')}
        ${W4.map((w, i) => `<text class="wl wl${i}" text-anchor="middle" fill="${w.st}" font-size="20" font-weight="800">${w.lab}</text>`).join('')}
        <text class="eq" x="240" y="308" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">50° + 75° + 55° = 180°</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          W4.forEach((w, i) => {
            const m = dgEase(dgP(e, 900 + i * 1100, 1300));
            const x = w.v[0] + (G[0] - w.v[0]) * m, y = w.v[1] + (G[1] - w.v[1]) * m, rot = w.rot * m, k = 1 + 0.5 * m;
            q('.w' + i).setAttribute('transform', `translate(${x},${y}) rotate(${-rot}) scale(${k})`);
            const [lx, ly] = pt(x, y, 36 * k, (w.a0 + w.a1) / 2 + rot);
            q('.wl' + i).setAttribute('x', lx); q('.wl' + i).setAttribute('y', ly + 6);
          });
          q('.line').setAttribute('opacity', e > 4500 ? 1 : 0);
          q('.eq').setAttribute('opacity', e > 5300 ? 1 : 0);
        });
      }
    },
  });
})();
