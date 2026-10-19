/* 4학년 과학 · 물은 어떻게 얼음과 수증기로 변할까? (s3-08) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  const rnd = s => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ICE = '#e3f1ff', WATER = DG_C.b, RED = '#ff3b30';

  /* 0: 세 가지 상태 (알갱이 배열) */
  const NX = [64, 240, 416], NY = 150;
  const parts = k => {
    let o = '';
    if (k === 0) for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) o += `<circle cx="${-30 + i * 20}" cy="${-30 + j * 20}" r="8" fill="${DG_C.d}"/>`;
    if (k === 1) for (let i = 0; i < 14; i++) o += `<circle cx="${f2(-36 + (i % 5) * 18 + rnd(i) * 6)}" cy="${f2(-4 + Math.floor(i / 5) * 18 + rnd(i + 9) * 5)}" r="8" fill="${DG_C.d}"/>`;
    if (k === 2) [[-30, -30], [22, -36], [-4, -6], [30, 8], [-34, 22], [12, 34]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="8" fill="${DG_C.d}"/>`; });
    return o;
  };
  const NODE = [
    { n: '얼음', s: '고체', box: `<rect x="-52" y="-52" width="104" height="104" rx="10" fill="${ICE}" stroke="${DG_C.d}" stroke-width="3"/>` },
    { n: '물', s: '액체', box: `<path d="M-52 -52 V44 Q-52 52 -44 52 H44 Q52 52 52 44 V-52" fill="none" stroke="${DG_C.sub}" stroke-width="3"/><rect x="-50" y="-14" width="100" height="64" rx="6" fill="${WATER}"/>` },
    { n: '수증기', s: '기체', box: `<rect x="-52" y="-52" width="104" height="104" rx="10" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="6 6"/>` },
  ];

  /* 2: 증발 / 끓음 알갱이 */
  const EV = [0, 1, 2, 3].map(i => ({ x: 70 + i * 34, t: 600 + i * 1100 }));
  const BB = Array.from({ length: 9 }, (_, i) => ({ x: 300 + (i % 5) * 22 + rnd(i) * 8, t: 300 + i * 480 }));

  /* 3: 응결 */
  const VP = Array.from({ length: 10 }, (_, i) => {
    const side = i % 2 ? 1 : -1, y = 110 + (i >> 1) * 34 + rnd(i) * 10;
    return { sx: 240 + side * (150 + rnd(i + 3) * 60), sy: y - 30 + rnd(i + 5) * 40, ex: 240 + side * (62 + (y - 90) * 0.06), ey: y, t: 300 + i * 380 };
  });

  Object.assign(DIAG, {
    's3-08:0': {
      alt: '물은 온도에 따라 얼음(고체), 물(액체), 수증기(기체)로 바뀌며, 얼음이 녹으면 물, 물이 증발하거나 끓으면 수증기, 수증기가 응결하면 물, 물이 얼면 얼음이 되는 것을 알갱이 그림으로 나타낸 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${NODE.map((nd, k) => `<g class="nd${k}"><g transform="translate(${NX[k]},${NY}) scale(.82)">${nd.box}${parts(k)}</g>
          <text x="${NX[k]}" y="${NY + 76}" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${nd.n}</text>
          <text x="${NX[k]}" y="${NY + 102}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">(${nd.s})</text></g>`).join('')}
        ${[0, 1].map(k => { const x1 = NX[k] + 50, x2 = NX[k + 1] - 50; return `
          <g class="up${k}"><path d="${arw(x1, NY - 18, x2, NY - 18, 9)}" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="${(x1 + x2) / 2}" y="${NY - 26}" text-anchor="middle" fill="${DG_C.c}" font-size="${k ? 18 : 20}" font-weight="800">${k ? '증발·끓음' : '녹아요'}</text></g>
          <g class="dn${k}"><path d="${arw(x2, NY + 18, x1, NY + 18, 9)}" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`; }).join('')}
        <text class="dn0" x="152" y="${NY + 46}" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">얼어요</text>
        <text class="dn1" x="328" y="${NY + 46}" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">응결</text>
        <text class="hot" x="20" y="40" fill="${DG_C.c}" font-size="20" font-weight="800">→ 데우면</text>
        <text class="cold" x="140" y="40" fill="${DG_C.d}" font-size="20" font-weight="800">← 식히면</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5600, e => {
          for (let k = 0; k < 3; k++) q('.nd' + k).setAttribute('opacity', dgP(e, 200 + k * 500, 400));
          q('.hot').setAttribute('opacity', e > 1800 ? 1 : 0);
          for (let k = 0; k < 2; k++) q('.up' + k).setAttribute('opacity', dgP(e, 1900 + k * 800, 400));
          q('.cold').setAttribute('opacity', e > 3600 ? 1 : 0);
          for (let k = 0; k < 2; k++) qa('.dn' + k).forEach(g => g.setAttribute('opacity', dgP(e, 3700 + k * 800, 400)));
        });
      }
    },

    's3-08:1': {
      alt: '시험관 속 물을 얼리면 얼음의 높이가 처음 물 높이보다 올라가 부피는 늘어나지만, 저울에 올리면 무게는 그대로인 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${[0, 1].map(k => { const x = k ? 290 : 120; return `<g>
          <text x="${x}" y="40" text-anchor="middle" fill="${k ? DG_C.d : DG_C.ink}" font-size="22" font-weight="800">${k ? '얼린 뒤' : '처음'}</text>
          <rect class="liq${k}" x="${x - 22}" y="140" width="44" height="90" fill="${WATER}"/>
          <path d="M${x - 24} 56 V214 A24 24 0 0 0 ${x + 24} 214 V56" fill="none" stroke="${DG_C.sub}" stroke-width="3.5"/>
          <path d="M${x - 40} 140 H${x + 40}" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="6 5"/>
          <rect x="${x - 60}" y="252" width="120" height="22" rx="6" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="2.5"/>
          <rect x="${x - 34}" y="276" width="68" height="28" rx="6" fill="${DG_C.ink}"/>
          <text x="${x}" y="297" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">무게</text>
        </g>`; }).join('')}
        <g class="up"><path d="${arw(342, 140, 342, 116, 8)}" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="354" y="112" fill="${DG_C.c}" font-size="20" font-weight="800">부피</text>
          <text x="354" y="136" fill="${DG_C.c}" font-size="20" font-weight="800">늘어요</text></g>
        <text class="same" x="205" y="270" text-anchor="middle" fill="${DG_C.r}" font-size="26" font-weight="800">=</text>
        <text class="same" x="205" y="236" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">그대로</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 4800, e => {
          const f = dgEase(dgP(e, 800, 1800));
          const top = 140 - 22 * f;
          const l = q('.liq1');
          l.setAttribute('y', f2(top)); l.setAttribute('height', f2(230 - top));
          l.setAttribute('fill', f > 0.5 ? ICE : WATER);
          l.setAttribute('stroke', f > 0.5 ? DG_C.d : 'none'); l.setAttribute('stroke-width', 2);
          q('.up').setAttribute('opacity', e > 2700 ? 1 : 0);
          qa('.same').forEach(t => t.setAttribute('opacity', e > 3500 ? 1 : 0));
        });
      }
    },

    's3-08:2': {
      alt: '증발은 물 표면에서 물이 천천히 수증기로 변하는 것이고, 끓음은 가열한 물의 표면과 물속에서 기포가 생기며 빠르게 수증기로 변하는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <text x="120" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="24" font-weight="800">증발</text>
        <text x="300" y="40" text-anchor="middle" fill="${DG_C.c}" font-size="24" font-weight="800">끓음</text>
        <line x1="240" y1="20" x2="240" y2="300" stroke="#e5e5ea" stroke-width="2"/>
        <rect x="46" y="186" width="148" height="44" fill="${WATER}"/>
        <path d="M44 160 V232 H196 V160" fill="none" stroke="${DG_C.sub}" stroke-width="3.5"/>
        ${EV.map((p, i) => `<circle class="ev${i}" r="7" fill="${DG_C.d}"/>`).join('')}
        <text x="120" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">표면에서</text>
        <text x="120" y="294" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">천천히</text>
        <rect x="276" y="140" width="148" height="90" fill="${WATER}"/>
        <path d="M274 120 V232 H426 V120" fill="none" stroke="${DG_C.sub}" stroke-width="3.5"/>
        <path class="fire" d="M300 254 q-10 -14 0 -20 q2 10 8 8 q-4 -12 8 -18 q-2 12 8 16 q4 -8 2 -14 q14 10 6 28 Z M358 254 q-10 -14 0 -20 q2 10 8 8 q-4 -12 8 -18 q-2 12 8 16 q4 -8 2 -14 q14 10 6 28 Z" fill="${DG_C.c}"/>
        <rect x="262" y="234" width="176" height="6" rx="3" fill="${DG_C.sub}"/>
        ${BB.map((p, i) => `<circle class="bb${i}" r="7" fill="#fff" stroke="${DG_C.d}" stroke-width="2.5"/><circle class="bv${i}" r="7" fill="${DG_C.c}"/>`).join('')}
        <text x="350" y="282" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">물속에서도</text>
        <text x="350" y="308" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">빠르게</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          EV.forEach((p, i) => {
            const f = dgP(e, p.t, 2400), c = q('.ev' + i);
            c.setAttribute('cx', f2(p.x + 10 * Math.sin(f * 6)));
            c.setAttribute('cy', f2(186 - 100 * f));
            c.setAttribute('opacity', e >= 6000 ? (i % 2 ? 0.5 : 1) : (f > 0 && f < 1 ? 1 - f * 0.4 : 0));
          });
          BB.forEach((p, i) => {
            const b = dgP(e, p.t, 700), v = dgP(e, p.t + 700, 900), fin = e >= 6000;
            const by = 222 - 82 * dgEase(b), r = 3 + 5 * b;
            const B = q('.bb' + i), V = q('.bv' + i);
            B.setAttribute('cx', f2(p.x)); B.setAttribute('cy', f2(fin ? 210 - (i % 3) * 26 : by)); B.setAttribute('r', f2(fin ? 7 : r));
            B.setAttribute('opacity', fin ? (i < 6 ? 1 : 0) : (b > 0 && b < 1 ? 1 : 0));
            V.setAttribute('cx', f2(p.x + 8 * Math.sin(v * 5)));
            V.setAttribute('cy', f2(fin ? 104 - (i % 4) * 18 : 140 - 90 * v));
            V.setAttribute('opacity', fin ? (i < 7 ? 1 : 0) : (v > 0 && v < 1 ? 1 : 0));
          });
          // 마지막 장면: 증발 알갱이 위치 고정
          if (e >= 6000) EV.forEach((p, i) => { const c = q('.ev' + i); c.setAttribute('cx', p.x + (i % 2 ? 8 : -4)); c.setAttribute('cy', 168 - (i % 2) * 40 - i * 4); });
        });
      }
    },

    's3-08:3': {
      alt: '공기 중의 수증기가 얼음물이 든 차가운 컵 겉면에 닿아 작은 물방울로 맺히는 응결을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <path d="M184 90 L196 270 H284 L296 90 Z" fill="${WATER}" fill-opacity=".55"/>
        ${[[214, 130, 8], [252, 150, -10], [228, 176, 14]].map(([x, y, r]) => `<rect x="${x}" y="${y}" width="28" height="28" rx="5" transform="rotate(${r} ${x + 14} ${y + 14})" fill="#fff" stroke="${DG_C.d}" stroke-width="2.5"/>`).join('')}
        <path d="M176 70 L194 280 H286 L304 70" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linejoin="round"/>
        <text x="240" y="232" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">얼음물</text>
        ${VP.map((p, i) => `<circle class="vp${i}" r="6" fill="${DG_C.sub}"/><path class="dr${i}" d="M0 -8 Q6 0 0 6 Q-6 0 0 -8 Z" fill="${DG_C.d}"/>`).join('')}
        <g class="lab"><text x="20" y="44" fill="${DG_C.sub}" font-size="20" font-weight="800">수증기</text>
          <path d="${arw(86, 52, 116, 84, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/></g>
        <g class="lab2"><text x="460" y="300" text-anchor="end" fill="${DG_C.d}" font-size="20" font-weight="800">물방울</text>
          <path d="${arw(420, 278, 324, 236, 8)}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          VP.forEach((p, i) => {
            const f = dgEase(dgP(e, p.t, 1200)), c = q('.vp' + i), d = q('.dr' + i);
            c.setAttribute('cx', f2(p.sx + (p.ex - p.sx) * f)); c.setAttribute('cy', f2(p.sy + (p.ey - p.sy) * f));
            c.setAttribute('opacity', f < 1 ? 1 : 0);
            d.setAttribute('transform', `translate(${f2(p.ex)},${f2(p.ey)})`);
            d.setAttribute('opacity', f >= 1 ? 1 : 0);
          });
          q('.lab').setAttribute('opacity', e < 4800 ? dgP(e, 200, 300) : 0);
          q('.lab2').setAttribute('opacity', e > 4400 ? 1 : 0);
          if (e >= 5600) {
            // 최종 장면: 맺힌 물방울과 함께 주변 수증기도 몇 개 보여 줌
            q('.lab').setAttribute('opacity', 1);
            VP.slice(0, 3).forEach((p, i) => { const c = q('.vp' + i); c.setAttribute('cx', f2(p.sx)); c.setAttribute('cy', f2(p.sy)); c.setAttribute('opacity', 1); });
          }
        });
      }
    },
  });
})();
