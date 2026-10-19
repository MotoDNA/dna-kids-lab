/* 1학년 수학 · 더하면 몇 개? 빼면 몇 개? (m1-03) */
(() => {
  const RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  // 딸기 (0,0 기준)
  const berry = `<path d="M0 16 C-14 8 -15 -6 -11 -9 C-6 -12 6 -12 11 -9 C15 -6 14 8 0 16 Z" fill="${RED}"/>
    <path d="M-9 -9 L-4 -15 L0 -10 L4 -15 L9 -9 Z" fill="${DG_C.r}"/>
    <circle cx="-4" cy="-2" r="1.4" fill="#fff"/><circle cx="4" cy="1" r="1.4" fill="#fff"/><circle cx="0" cy="7" r="1.4" fill="#fff"/>`;
  const plate = (x, y, w) => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="12" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="3"/>`;
  // 병아리 (0,0)
  const chick = `<ellipse cx="0" cy="6" rx="22" ry="19" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
    <circle cx="6" cy="-14" r="13" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
    <circle cx="10" cy="-17" r="2.6" fill="${DG_C.ink}"/><path d="M18 -14 L27 -11 L18 -8 Z" fill="${DG_C.c}"/>
    <path d="M-2 22 v8 M8 22 v8" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>`;
  const cookie = `<circle r="24" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5"/>
    <circle cx="-8" cy="-7" r="3.2" fill="#8a5a2b"/><circle cx="7" cy="-9" r="3.2" fill="#8a5a2b"/><circle cx="9" cy="7" r="3.2" fill="#8a5a2b"/><circle cx="-5" cy="9" r="3.2" fill="#8a5a2b"/>`;

  /* 0: 모으기 */
  const SRC = [[52, 88], [92, 88], [162, 88], [200, 88], [238, 88]]; // 2개 + 3개
  const DST = [334, 362, 390, 418, 446].map(x => [x, 88]);
  const bond = (x, a, b) => `<line x1="${x}" y1="204" x2="${x - 36}" y2="246" stroke="${DG_C.sub}" stroke-width="3"/><line x1="${x}" y1="204" x2="${x + 36}" y2="246" stroke="${DG_C.sub}" stroke-width="3"/>
    <circle cx="${x}" cy="196" r="22" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>${T(x, 205, '5', { s: 24, w: 800, f: DG_C.d })}
    <rect x="${x - 58}" y="242" width="40" height="40" rx="10" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>${T(x - 38, 270, a, { s: 22, w: 800 })}
    <rect x="${x + 18}" y="242" width="40" height="40" rx="10" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>${T(x + 38, 270, b, { s: 22, w: 800 })}`;

  /* 3: 10 만들기 */
  const cellC = k => [40 + (k % 5) * 44 + 22, 60 + Math.floor(k / 5) * 44 + 22];
  const R5 = [[300, 104], [340, 104], [384, 104], [422, 104], [460, 104]];

  Object.assign(DIAG, {
    'm1-03:0': {
      alt: '딸기 2개와 3개를 한 접시에 모으면 5개가 되는 모으기, 그리고 5를 1과 4, 2와 3으로 가르는 가르기를 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 296" class="dg-svg" role="img">
        ${plate(72, 104, 84)}${plate(200, 104, 116)}${plate(390, 104, 150)}
        ${T(72, 146, '2', { s: 22, w: 800, c: 'n0', f: DG_C.sub })}${T(200, 146, '3', { s: 22, w: 800, c: 'n0', f: DG_C.sub })}
        <g class="ar"><path d="M268 96 h34 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${T(285, 70, '모으기', { s: 20, w: 800, f: DG_C.d })}</g>
        ${T(390, 146, '5', { s: 26, w: 800, c: 'n5', f: DG_C.d })}
        ${SRC.map((_, i) => `<g class="be${i}">${berry}</g>`).join('')}
        <line x1="20" y1="166" x2="460" y2="166" stroke="#e5e5ea" stroke-width="2"/>
        <g class="gr">${T(70, 252, '가르기', { s: 20, w: 800, f: DG_C.c })}
        <g class="bd0">${bond(220, '1', '4')}</g><g class="bd1">${bond(370, '2', '3')}</g></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5600, e => {
          SRC.forEach((s, i) => {
            const f = dgEase(dgP(e, 900 + i * 180, 900));
            const x = s[0] + (DST[i][0] - s[0]) * f, y = s[1] + (DST[i][1] - s[1]) * f - 30 * Math.sin(Math.PI * f);
            q('.be' + i).setAttribute('transform', `translate(${x},${y})`);
          });
          q('.ar').setAttribute('opacity', e > 600 ? 1 : 0);
          q('.n5').setAttribute('opacity', e > 2600 ? 1 : 0);
          q('.gr').setAttribute('opacity', e > 3100 ? 1 : 0);
          q('.bd0').setAttribute('opacity', dgP(e, 3300, 400));
          q('.bd1').setAttribute('opacity', dgP(e, 4300, 400));
        });
      }
    },

    'm1-03:1': {
      alt: '병아리 2마리 옆으로 3마리가 더 와서 모두 5마리가 되고, 2 + 3 = 5라고 쓰는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[0, 1, 2, 3, 4].map(i => `<g class="ck${i}">${chick}</g>`).join('')}
        <g class="br0"><path d="M42 160 v8 h106 v-8" fill="none" stroke="${DG_C.d}" stroke-width="3"/>${T(95, 196, '2', { s: 24, w: 800, f: DG_C.d })}</g>
        <g class="br1"><path d="M178 160 v8 h226 v-8" fill="none" stroke="${DG_C.c}" stroke-width="3"/>${T(291, 196, '3', { s: 24, w: 800, f: DG_C.c })}</g>
        <text class="eq" x="240" y="246" text-anchor="middle" font-size="32" font-weight="800" fill="${DG_C.ink}"><tspan fill="${DG_C.d}">2</tspan> + <tspan fill="${DG_C.c}">3</tspan> = 5</text>
        ${T(240, 280, '2 더하기 3은 5와 같아요', { s: 18, f: DG_C.sub, c: 'rd' })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const X = [70, 130, 210, 290, 370];
        dgAnim(el, 5000, e => {
          X.forEach((x, i) => {
            const f = i < 2 ? 1 : dgEase(dgP(e, 1100 + (i - 2) * 200, 1200));
            const x0 = x + 180;
            q('.ck' + i).setAttribute('transform', `translate(${x0 + (x - x0) * f},${112 - (i < 2 ? 0 : 8 * Math.abs(Math.sin(f * Math.PI * 3)))})`);
            q('.ck' + i).setAttribute('opacity', i < 2 ? dgP(e, 100, 400) : dgP(e, 1000, 300));
          });
          q('.br0').setAttribute('opacity', e > 600 ? 1 : 0);
          q('.br1').setAttribute('opacity', e > 2700 ? 1 : 0);
          q('.eq').setAttribute('opacity', e > 3300 ? 1 : 0);
          q('.rd').setAttribute('opacity', e > 4000 ? 1 : 0);
        });
      }
    },

    'm1-03:2': {
      alt: '쿠키 5개 중 2개를 먹어서 덜어 내면 3개가 남고, 5 − 2 = 3이라고 쓰는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${[0, 1, 2, 3, 4].map(i => `<circle class="gh${i}" cx="${64 + i * 88}" cy="120" r="24" fill="none" stroke="#c7c7cc" stroke-width="3" stroke-dasharray="5 5"/><g class="co${i}">${cookie}</g>`).join('')}
        <g class="rest"><path d="M40 160 v8 h224 v-8" fill="none" stroke="${DG_C.d}" stroke-width="3"/>${T(152, 196, '남은 3개', { s: 20, w: 800, f: DG_C.d })}</g>
        <g class="gone">${T(372, 196, '먹은 2개', { s: 20, w: 800, f: '#ff3b30' })}</g>
        <text class="eq" x="240" y="250" text-anchor="middle" font-size="32" font-weight="800" fill="${DG_C.ink}">5 − <tspan fill="#ff3b30">2</tspan> = <tspan fill="${DG_C.d}">3</tspan></text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1, 2, 3, 4].forEach(i => {
            const x = 64 + i * 88;
            const f = i < 3 ? 0 : dgEase(dgP(e, 1200 + (i - 3) * 500, 900));
            q('.co' + i).setAttribute('transform', `translate(${x + 20 * f},${120 - 70 * f}) scale(${1 - 0.5 * f})`);
            q('.co' + i).setAttribute('opacity', (1 - f) * dgP(e, 0, 300 + i * 150));
            q('.gh' + i).setAttribute('opacity', i >= 3 && f > 0.3 ? 1 : 0);
          });
          q('.gone').setAttribute('opacity', e > 2400 ? 1 : 0);
          q('.rest').setAttribute('opacity', e > 3000 ? 1 : 0);
          q('.eq').setAttribute('opacity', e > 3700 ? 1 : 0);
        });
      }
    },

    'm1-03:3': {
      alt: '10칸 틀에 8개가 있고, 5를 2와 3으로 갈라 2개를 채워 10을 만든 뒤 남은 3을 더해 8 + 5 = 13이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${T(40, 36, '8 + 5', { a: 'start', s: 24, w: 800 })}
        ${Array.from({ length: 10 }, (_, k) => { const [x, y] = cellC(k); return `<rect x="${x - 22}" y="${y - 22}" width="44" height="44" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5"/>`; }).join('')}
        ${Array.from({ length: 8 }, (_, k) => { const [x, y] = cellC(k); return `<circle cx="${x}" cy="${y}" r="15" fill="${DG_C.d}"/>`; }).join('')}
        ${T(150, 46, '8', { s: 22, w: 800, f: DG_C.d, c: 'n8' })}
        <g class="sp2"><path d="M286 146 v10 h68 v-10" fill="none" stroke="${DG_C.c}" stroke-width="3"/>${T(320, 182, '2', { s: 22, w: 800, f: DG_C.c })}</g>
          <g class="sp3"><path d="M370 146 v10 h104 v-10" fill="none" stroke="${DG_C.c}" stroke-width="3"/>${T(422, 182, '3', { s: 22, w: 800, f: DG_C.c })}</g>
        ${R5.map((_, i) => `<circle class="o${i}" r="15" fill="${DG_C.c}"/>`).join('')}
        <g class="ten"><rect x="34" y="54" width="232" height="100" rx="10" fill="none" stroke="${DG_C.r}" stroke-width="4"/>${T(150, 44, '10', { s: 26, w: 800, f: DG_C.r })}</g>
        <g class="s1">${T(40, 218, '① 8 + <tspan fill="#ff9500">2</tspan> = <tspan fill="#34a853">10</tspan>', { a: 'start', s: 22, w: 800 })}</g>
        <g class="s2">${T(40, 252, '② <tspan fill="#34a853">10</tspan> + <tspan fill="#ff9500">3</tspan> = 13', { a: 'start', s: 22, w: 800 })}</g>
        <g class="s3"><rect x="260" y="226" width="196" height="56" rx="14" fill="${DG_C.b}"/>${T(358, 264, '8 + 5 = 13', { s: 26, w: 800, f: DG_C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          const sp = dgEase(dgP(e, 900, 700));
          R5.forEach((p, i) => {
            const start = [310 + i * 36, 104];
            let [x, y] = [start[0] + (p[0] - start[0]) * sp, p[1]];
            if (i < 2) { const f = dgEase(dgP(e, 2200 + i * 250, 900)), [tx, ty] = cellC(8 + i); x += (tx - x) * f; y += (ty - y) * f - 40 * Math.sin(Math.PI * f); }
            q('.o' + i).setAttribute('cx', x); q('.o' + i).setAttribute('cy', y);
            q('.o' + i).setAttribute('opacity', dgP(e, 200, 400));
          });
          q('.sp2').setAttribute('opacity', e > 1600 && e < 2200 ? 1 : 0);
          q('.sp3').setAttribute('opacity', e > 1600 ? 1 : 0);
          q('.n8').setAttribute('opacity', e > 3500 ? 0 : 1);
          q('.ten').setAttribute('opacity', e > 3500 ? 1 : 0);
          q('.s1').setAttribute('opacity', e > 3700 ? 1 : 0);
          q('.s2').setAttribute('opacity', e > 4700 ? 1 : 0);
          q('.s3').setAttribute('opacity', e > 5700 ? 1 : 0);
        });
      }
    },
  });
})();
