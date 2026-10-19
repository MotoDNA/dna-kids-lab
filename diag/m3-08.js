/* 3학년 수학 · 선과 각으로 어떤 도형을 만들까? (m3-08) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const head = (x, y, dir, col) => `<path d="M${x - 14 * dir} ${y - 9} L${x} ${y} L${x - 14 * dir} ${y + 9}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const dot = (x, y, lab) => `<circle cx="${x}" cy="${y}" r="6" fill="${C.ink}"/>${T(x, y + 32, lab, { s: 20, f: C.sub, w: 700 })}`;
  // 직각 표시(꼭짓점 x,y, 두 방향 단위벡터)
  const sq = (x, y, ux, uy, vx, vy, s = 16, cls = '') => `<path class="${cls}" d="M${x + ux * s} ${y + uy * s} L${x + (ux + vx) * s} ${y + (uy + vy) * s} L${x + vx * s} ${y + vy * s}" fill="none" stroke="${C.c}" stroke-width="3"/>`;

  /* 0: 선분·반직선·직선 */
  const ROWS = [
    { y: 64, n: '선분', a: 200, b: 360, L: 200, R: 360, col: C.d },
    { y: 150, n: '반직선', a: 200, b: 320, L: 200, R: 456, col: C.r },
    { y: 236, n: '직선', a: 230, b: 350, L: 124, R: 456, col: C.c },
  ];

  /* 1: 시계 3시 */
  const KX = 360, KY = 150, KR = 92;

  Object.assign(DIAG, {
    'm3-08:0': {
      alt: '두 점 ㄱ, ㄴ을 곧게 이은 선분, 한 점에서 시작해 한쪽으로 끝없이 늘인 반직선, 양쪽으로 끝없이 늘인 직선을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${ROWS.map((r, i) => `<g class="rw${i}">
          ${T(16, r.y + 8, r.n, { s: 22, f: r.col, a: 'start' })}
          <line class="ln${i}" x1="${r.a}" y1="${r.y}" x2="${r.b}" y2="${r.y}" stroke="${r.col}" stroke-width="5" stroke-linecap="round"/>
          <g class="hR${i}">${r.R > r.b ? head(r.R, r.y, 1, r.col) : ''}</g>
          <g class="hL${i}">${r.L < r.a ? head(r.L, r.y, -1, r.col) : ''}</g>
          ${dot(r.a, r.y, 'ㄱ')}${dot(r.b, r.y, 'ㄴ')}
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          ROWS.forEach((r, i) => {
            const st = 300 + i * 1800;
            q('.rw' + i).setAttribute('opacity', dgP(e, st, 400));
            const f = dgEase(dgP(e, st + 500, 1100));
            const x1 = r.a + (r.L - r.a) * f, x2 = r.b + (r.R - r.b) * f;
            q('.ln' + i).setAttribute('x1', x1); q('.ln' + i).setAttribute('x2', x2);
            q('.hR' + i).setAttribute('transform', `translate(${x2 - r.R},0)`);
            q('.hL' + i).setAttribute('transform', `translate(${x1 - r.L},0)`);
            q('.hR' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            q('.hL' + i).setAttribute('opacity', f > 0 ? 1 : 0);
          });
        });
      }
    },

    'm3-08:1': {
      alt: '한 점(꼭짓점)에서 그은 두 반직선(변)으로 이루어진 각과, 3시를 가리키는 시계의 두 바늘이 이루는 직각을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <line class="v1" x1="50" y1="210" x2="230" y2="210" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
        <line class="v2" x1="50" y1="210" x2="170" y2="70" stroke="${C.d}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="50" cy="210" r="7" fill="${C.c}"/>
        <g class="lb">${T(50, 252, '꼭짓점', { s: 20, f: C.c })}${T(176, 240, '변', { s: 20, f: C.d })}${T(84, 120, '변', { s: 20, f: C.d })}</g>
        <line x1="258" y1="40" x2="258" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        <circle cx="${KX}" cy="${KY}" r="${KR}" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
        ${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<line x1="${(KX + (KR - 12) * Math.sin(a)).toFixed(1)}" y1="${(KY - (KR - 12) * Math.cos(a)).toFixed(1)}" x2="${(KX + KR * Math.sin(a)).toFixed(1)}" y2="${(KY - KR * Math.cos(a)).toFixed(1)}" stroke="${C.ink}" stroke-width="${i % 3 ? 2 : 4}"/>`; }).join('')}
        <line class="mh" x1="${KX}" y1="${KY}" x2="${KX}" y2="${KY - 72}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        <line class="hh" x1="${KX}" y1="${KY}" x2="${KX + 52}" y2="${KY}" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="${KX}" cy="${KY}" r="6" fill="${C.ink}"/>
        ${sq(KX, KY, 1, 0, 0, -1, 18, 'rq')}
        <g class="ck">${T(KX, 278, '3시 → 직각', { s: 22, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          const a = dgEase(dgP(e, 300, 700)), b = dgEase(dgP(e, 900, 800));
          q('.v1').setAttribute('x2', 50 + 180 * a);
          q('.v2').setAttribute('x2', 50 + 120 * b); q('.v2').setAttribute('y2', 210 - 140 * b);
          q('.lb').setAttribute('opacity', dgP(e, 1800, 400));
          // 3시: 긴바늘은 12, 짧은바늘은 3
          const mm = dgEase(dgP(e, 2600, 700)), h = dgEase(dgP(e, 3300, 700));
          q('.mh').setAttribute('y2', KY - 72 * mm); q('.mh').setAttribute('opacity', mm > 0 ? 1 : 0);
          q('.hh').setAttribute('x2', KX + 52 * h); q('.hh').setAttribute('opacity', h > 0 ? 1 : 0);
          q('.rq').setAttribute('opacity', e >= 4200 ? 1 : 0);
          q('.ck').setAttribute('opacity', dgP(e, 4400, 400));
        });
      }
    },

    'm3-08:2': {
      alt: '삼각자의 직각 부분 꼭짓점을 직사각형의 꼭짓점에 맞추고 두 변을 겹쳐 보면 꼭 맞아서 직각이고, 직사각형의 네 각 모두 직각(∟ 표시)인 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <rect x="40" y="70" width="250" height="160" fill="#f5f5f7" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        ${sq(40, 70, 1, 0, 0, 1, 18, 'c0')}${sq(290, 70, -1, 0, 0, 1, 18, 'c1')}${sq(290, 230, -1, 0, 0, -1, 18, 'c2')}${sq(40, 230, 1, 0, 0, -1, 18, 'c3')}
        <g class="tri"><path d="M0 0 H120 L0 86 Z" fill="${C.b}" fill-opacity=".75" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M28 18 H52 L28 36 Z" fill="#fff" stroke="${C.d}" stroke-width="2"/></g>
        <g class="ok">${T(390, 140, '꼭 맞아요', { s: 22, f: C.d })}</g>
        <g class="n4">${T(390, 190, '직각 4개', { s: 24, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          const m = dgEase(dgP(e, 300, 1500));
          // 삼각자가 오른쪽에서 와서 왼쪽 위 꼭짓점에 맞음
          const x = 40 + 300 * (1 - m), y = 70 + 40 * (1 - m), r = 25 * (1 - m);
          // 다 맞춘 뒤 살짝 빠짐 → 표시가 보이게
          const out = dgEase(dgP(e, 3000, 700));
          q('.tri').setAttribute('transform', `translate(${x + 10 * out},${y + 10 * out}) rotate(${r})`);
          q('.tri').setAttribute('opacity', 1 - 0.65 * out);
          q('.ok').setAttribute('opacity', dgP(e, 2000, 400));
          [0, 1, 2, 3].forEach(i => q('.c' + i).setAttribute('opacity', e >= (i === 0 ? 2400 : 3700 + i * 400) ? 1 : 0));
          q('.n4').setAttribute('opacity', dgP(e, 5200, 400));
        });
      }
    },

    'm3-08:3': {
      alt: '직각이 1개인 직각삼각형, 네 각이 모두 직각인 직사각형, 네 각이 모두 직각이고 네 변의 길이도 같은 정사각형을 나란히 비교한 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="s0"><path d="M30 180 H150 V70 Z" fill="${C.a}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>${sq(150, 180, -1, 0, 0, -1, 16)}
          ${T(90, 222, '직각삼각형', { s: 20 })}${T(90, 252, '직각 1개', { s: 18, f: C.c, w: 700 })}</g>
        <g class="s1"><rect x="180" y="90" width="134" height="90" fill="${C.b}" stroke="${C.ink}" stroke-width="4"/>
          ${sq(180, 90, 1, 0, 0, 1, 16)}${sq(314, 90, -1, 0, 0, 1, 16)}${sq(314, 180, -1, 0, 0, -1, 16)}${sq(180, 180, 1, 0, 0, -1, 16)}
          ${T(247, 222, '직사각형', { s: 20 })}${T(247, 252, '직각 4개', { s: 18, f: C.c, w: 700 })}</g>
        <g class="s2"><rect x="350" y="80" width="100" height="100" fill="#d6efdc" stroke="${C.ink}" stroke-width="4"/>
          ${sq(350, 80, 1, 0, 0, 1, 16)}${sq(450, 80, -1, 0, 0, 1, 16)}${sq(450, 180, -1, 0, 0, -1, 16)}${sq(350, 180, 1, 0, 0, -1, 16)}
          <g class="tk" stroke="${C.r}" stroke-width="4" stroke-linecap="round"><line x1="400" y1="72" x2="400" y2="88"/><line x1="400" y1="172" x2="400" y2="188"/><line x1="342" y1="130" x2="358" y2="130"/><line x1="442" y1="130" x2="458" y2="130"/></g>
          ${T(400, 222, '정사각형', { s: 20 })}${T(400, 252, '직각 4개', { s: 18, f: C.c, w: 700 })}<g class="tl">${T(400, 276, '+ 네 변 같음', { s: 18, f: C.r, w: 700 })}</g></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 300 + i * 1200, 700));
            q('.s' + i).setAttribute('opacity', f);
            q('.s' + i).setAttribute('transform', `translate(0,${12 * (1 - f)})`);
          });
          q('.tk').setAttribute('opacity', e >= 3900 ? 1 : 0);
          q('.tl').setAttribute('opacity', dgP(e, 4100, 400));
        });
      }
    },
  });
})();
