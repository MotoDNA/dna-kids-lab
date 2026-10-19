/* 2학년 수학 · 2씩, 5씩 묶어 세면 곱셈이 돼요! (m1-08) */
(() => {
  const RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const cherry = (x, y) => `<g transform="translate(${x},${y})"><path d="M-12 8 Q-6 -14 2 -24 M12 12 Q8 -10 2 -24" fill="none" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="5" cy="-24" rx="8" ry="4" fill="${DG_C.r}"/><circle cx="-12" cy="14" r="13" fill="${RED}"/><circle cx="13" cy="18" r="13" fill="${RED}"/></g>`;
  const hand = (x, y) => `<g transform="translate(${x},${y})" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round">
    ${[[-17, -34], [-6, -42], [5, -40], [16, -32]].map(([fx, fy]) => `<rect x="${fx - 5}" y="${fy}" width="10" height="${-fy + 4}" rx="5"/>`).join('')}
    <rect x="-28" y="-14" width="11" height="40" rx="5.5" transform="rotate(-40 -22 22)"/>
    <rect x="-24" y="-10" width="46" height="44" rx="14"/></g>`;
  const badge = (x, y, n, col, cls) => `<g class="${cls}"><circle cx="${x}" cy="${y}" r="18" fill="${col}"/>${T(x, y + 7, n, { s: 20, w: 800, f: '#fff' })}</g>`;
  const cup = (x, y) => `<path d="M${x - 36} ${y - 30} L${x + 36} ${y - 30} L${x + 26} ${y + 30} L${x - 26} ${y + 30} Z" fill="${DG_C.b}" fill-opacity=".6" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const dots5 = (x, y) => [[-12, -12], [12, -12], [0, 0], [-12, 12], [12, 12]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="6" fill="${DG_C.d}"/>`).join('');
  const show = (el, s, on) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', on ? 1 : 0));

  Object.assign(DIAG, {
    'm1-08:0': {
      alt: '체리를 두 개씩 짝지어 2, 4, 6으로 뛰어 세고, 손가락 다섯 개인 손을 5, 10으로 뛰어 세는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[0, 1, 2].map(i => `<g class="c${i}">${cherry(60 + i * 90, 72)}</g>${badge(60 + i * 90, 132, (i + 1) * 2, DG_C.d, 'cb' + i)}`).join('')}
        <g class="r0">${T(390, 92, '2씩 뛰어 세기', { s: 20, w: 800, f: DG_C.d })}</g>
        <line x1="20" y1="166" x2="460" y2="166" stroke="#e5e5ea" stroke-width="2"/>
        ${[0, 1].map(i => `<g class="h${i}">${hand(80 + i * 110, 210)}</g>${badge(80 + i * 110, 270, (i + 1) * 5, DG_C.c, 'hb' + i)}`).join('')}
        <g class="r1">${T(390, 232, '5씩 뛰어 세기', { s: 20, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5400, e => {
          for (let i = 0; i < 3; i++) { show(el, '.c' + i, e > 200 + i * 700); show(el, '.cb' + i, e > 500 + i * 700); }
          show(el, '.r0', e > 2400);
          for (let i = 0; i < 2; i++) { show(el, '.h' + i, e > 2900 + i * 800); show(el, '.hb' + i, e > 3200 + i * 800); }
          show(el, '.r1', e > 4700);
        });
      }
    },

    'm1-08:1': {
      alt: '컵 세 개에 구슬이 두 개씩 들어 있어 2씩 3묶음, 수직선에서 0부터 2씩 세 번 뛰면 6이 되어 2의 3배는 6인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[0, 1, 2].map(i => { const x = 120 + i * 120; return `<g class="cp${i}">${cup(x, 92)}<circle cx="${x - 12}" cy="106" r="11" fill="${DG_C.c}"/><circle cx="${x + 12}" cy="106" r="11" fill="${DG_C.c}"/></g>`; }).join('')}
        <line x1="40" y1="206" x2="450" y2="206" stroke="${DG_C.ink}" stroke-width="3"/>
        ${Array.from({ length: 7 }, (_, k) => `<line x1="${60 + 60 * k}" y1="198" x2="${60 + 60 * k}" y2="214" stroke="${DG_C.ink}" stroke-width="3"/>${T(60 + 60 * k, 240, k, { s: 20, w: 800, f: k % 2 || !k ? DG_C.sub : DG_C.d })}`).join('')}
        ${[0, 1, 2].map(i => `<path class="hp${i}" pathLength="1" d="M${60 + 120 * i} 198 Q${120 + 120 * i} 140 ${180 + 120 * i} 198" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"/>${T(120 + 120 * i, 160, '+2', { s: 18, w: 800, f: DG_C.d, c: 'pl' + i })}`).join('')}
        <g class="res">${T(240, 284, '2씩 3묶음 → 2의 3배 → 6', { s: 22, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          for (let i = 0; i < 3; i++) {
            show(el, '.cp' + i, e > 200 + i * 500);
            const f = dgP(e, 1900 + i * 1000, 800), h = q('.hp' + i);
            h.setAttribute('stroke-dasharray', '1 1'); h.setAttribute('stroke-dashoffset', 1 - f);
            h.setAttribute('opacity', f > 0 ? 1 : 0);
            show(el, '.pl' + i, f >= 1);
          }
          show(el, '.res', e > 5100);
        });
      }
    },

    'm1-08:2': {
      alt: '2개씩 3묶음은 2 + 2 + 2 = 6이고 곱셈식 2 × 3 = 6으로, 5개씩 3묶음은 5 + 5 + 5 = 15이고 5 × 3 = 15로 쓰는 그림',
      svg: (() => {
        const B = DG_C.d, O = DG_C.c, sp = (n, c) => `<tspan fill="${c}">${n}</tspan>`;
        const row = (y, n, p) => `${[0, 1, 2].map(i => { const x = 44 + i * 62; return `<g class="${p}b${i}"><rect x="${x - 26}" y="${y - 26}" width="52" height="52" rx="12" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>${n === 2 ? `<circle cx="${x - 10}" cy="${y}" r="8" fill="${B}"/><circle cx="${x + 10}" cy="${y}" r="8" fill="${B}"/>` : dots5(x, y)}</g>`; }).join('')}
          <g class="${p}g"><path d="M18 ${y + 34} v8 h176 v-8" fill="none" stroke="${O}" stroke-width="3"/>${T(106, y + 64, '3묶음', { s: 18, w: 800, f: O })}</g>`;
        return `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
          ${row(72, 2, 'a')}
          <text class="ae1" x="236" y="66" font-size="24" font-weight="800" fill="${DG_C.ink}">${sp(2, B)} + ${sp(2, B)} + ${sp(2, B)} = 6</text>
          <g class="ae2"><rect x="228" y="80" width="150" height="40" rx="12" fill="${DG_C.b}" fill-opacity=".5"/><text x="240" y="108" font-size="24" font-weight="800" fill="${DG_C.ink}">${sp(2, B)} × ${sp(3, O)} = 6</text></g>
          <line x1="20" y1="160" x2="460" y2="160" stroke="#e5e5ea" stroke-width="2"/>
          ${row(206, 5, 'b')}
          <text class="be1" x="236" y="200" font-size="24" font-weight="800" fill="${DG_C.ink}">${sp(5, B)} + ${sp(5, B)} + ${sp(5, B)} = 15</text>
          <g class="be2"><rect x="228" y="214" width="164" height="40" rx="12" fill="${DG_C.b}" fill-opacity=".5"/><text x="240" y="242" font-size="24" font-weight="800" fill="${DG_C.ink}">${sp(5, B)} × ${sp(3, O)} = 15</text></g>
        </svg>`;
      })(),
      play(el) {
        dgAnim(el, 6600, e => {
          for (let i = 0; i < 3; i++) show(el, '.ab' + i, e > 200 + i * 350);
          show(el, '.ag', e > 1300); show(el, '.ae1', e > 1300); show(el, '.ae2', e > 2200);
          for (let i = 0; i < 3; i++) show(el, '.bb' + i, e > 3000 + i * 350);
          show(el, '.bg', e > 4100); show(el, '.be1', e > 4100); show(el, '.be2', e > 5000);
          
        });
      }
    },

    'm1-08:3': {
      alt: '2단 곱의 값 2, 4, 6, 8, 10, 12, 14, 16, 18이 계단처럼 2씩 커지고, 5단 곱의 값 5, 10, 15 … 45는 끝자리가 5와 0으로 번갈아 나오는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${T(20, 32, '2단 · 2씩 커져요', { a: 'start', s: 20, w: 800, f: DG_C.d })}
        ${Array.from({ length: 9 }, (_, i) => { const x = 44 + i * 50, h = (i + 1) * 2 * 6; return `<rect class="bar${i}" x="${x - 18}" y="${184 - h}" width="36" height="${h}" rx="5" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/>${T(x, 176 - h, (i + 1) * 2, { s: 18, w: 800, f: DG_C.d, c: 'bv' + i })}`; }).join('')}
        <line x1="16" y1="184" x2="464" y2="184" stroke="${DG_C.sub}" stroke-width="2.5"/>
        <g class="h5">${T(20, 226, '5단 · 끝자리가 5, 0, 5, 0…', { a: 'start', s: 20, w: 800, f: DG_C.c })}</g>
        ${Array.from({ length: 9 }, (_, i) => { const x = 44 + i * 50, v = String((i + 1) * 5); return `<text class="f${i}" x="${x}" y="268" text-anchor="middle" font-size="22" font-weight="800" fill="${DG_C.ink}">${v.length > 1 ? v[0] : ''}<tspan fill="${i % 2 ? DG_C.d : DG_C.c}">${v[v.length - 1]}</tspan></text>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          for (let i = 0; i < 9; i++) {
            const f = dgEase(dgP(e, 200 + i * 300, 400)), h = (i + 1) * 12 * f;
            q('.bar' + i).setAttribute('y', 184 - h); q('.bar' + i).setAttribute('height', h);
            q('.bar' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            show(el, '.bv' + i, f >= 1);
          }
          show(el, '.h5', e > 3300);
          for (let i = 0; i < 9; i++) show(el, '.f' + i, e > 3600 + i * 280);
        });
      }
    },
  });
})();
