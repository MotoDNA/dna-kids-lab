/* 3학년 수학 · 큰 수의 곱셈은 어떻게 할까? (m3-02) */
(() => {
  const RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const apple = (x, y) => `<g transform="translate(${x},${y})"><path d="M0 -12 C14 -21 23 -2 14 11 C9 18 4 16 0 14 C-4 16 -9 18 -14 11 C-23 -2 -14 -21 0 -12 Z" fill="${RED}"/><path d="M0 -12 q1 -5 4 -8" stroke="${DG_C.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;
  const show = (el, s, on) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', on ? 1 : 0));

  /* 1: 156 × 4 */
  const CX = [150, 210, 270], Y1 = 124, Y2 = 184, YL = 204, YA = 262;
  const dig = (x, y, d, cls = '', f = DG_C.ink) => `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" font-size="44" font-weight="800" fill="${f}">${d}</text>`;
  const carry = cls => `<g class="${cls}"><rect x="-14" y="-24" width="28" height="30" rx="8" fill="#fff" stroke="${RED}" stroke-width="2.5"/>${T(0, 0, '2', { s: 22, w: 800, f: RED })}</g>`;

  /* 2: 24 × 13 모눈 */
  const GX = 44, GY = 44, CS = 11;

  Object.assign(DIAG, {
    'm3-02:0': {
      alt: '사과가 4개씩 담긴 접시 3줄을 4 + 4 + 4 = 4 × 3 = 12로 세고, 세로로 3개씩 4줄로 보면 3 × 4 = 12로 결과가 같은 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${[0, 1, 2].map(r => `<g class="pl${r}"><rect x="24" y="${48 + r * 62}" width="232" height="50" rx="25" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2.5"/>
          ${[0, 1, 2, 3].map(c => apple(64 + c * 52, 75 + r * 62)).join('')}</g>`).join('')}
        ${[0, 1, 2, 3].map(c => `<rect class="col${c}" x="${64 + c * 52 - 22}" y="40" width="44" height="190" rx="22" fill="none" stroke="${DG_C.d}" stroke-width="3.5"/>`).join('')}
        <text class="e1" x="276" y="84" font-size="24" font-weight="800" fill="${DG_C.ink}">4 + 4 + 4 = 12</text>
        <g class="e2"><rect x="268" y="102" width="160" height="42" rx="12" fill="${DG_C.a}"/><text x="280" y="132" font-size="24" font-weight="800" fill="${DG_C.c}">4 × 3 = 12</text></g>
        <g class="e3"><rect x="268" y="164" width="160" height="42" rx="12" fill="${DG_C.b}"/><text x="280" y="194" font-size="24" font-weight="800" fill="${DG_C.d}">3 × 4 = 12</text>
          ${T(276, 236, '바꿔 곱해도 같아요', { a: 'start', s: 18, f: DG_C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 6400, e => {
          for (let r = 0; r < 3; r++) show(el, '.pl' + r, e > 200 + r * 600);
          show(el, '.e1', e > 2000); show(el, '.e2', e > 2800);
          for (let c = 0; c < 4; c++) show(el, '.col' + c, e > 3700 + c * 300);
          show(el, '.e3', e > 5100);
        });
      }
    },

    'm3-02:1': {
      alt: '156 × 4 세로셈: 일의 자리 6 × 4 = 24에서 4를 쓰고 2를 올리고, 십의 자리 5 × 4 = 20에 2를 더해 22에서 2를 쓰고 2를 올리고, 백의 자리 1 × 4 = 4에 2를 더해 6, 답 624인 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${CX.map((x, i) => `<rect class="bd${i}" x="${x - 28}" y="54" width="56" height="222" rx="12" fill="${[DG_C.a, '#d6efdc', DG_C.b][i]}"/>`).join('')}
        ${T(CX[0], 38, '백', { s: 18, f: DG_C.sub })}${T(CX[1], 38, '십', { s: 18, f: DG_C.sub })}${T(CX[2], 38, '일', { s: 18, f: DG_C.sub })}
        ${dig(CX[0], Y1, 1)}${dig(CX[1], Y1, 5)}${dig(CX[2], Y1, 6)}
        ${T(96, Y2, '×', { s: 40, w: 800 })}${dig(CX[2], Y2, 4)}
        <line x1="80" y1="${YL}" x2="300" y2="${YL}" stroke="${DG_C.ink}" stroke-width="4" stroke-linecap="round"/>
        ${carry('c1')}${carry('c2')}
        ${dig(CX[2], YA, 4, 'r0', DG_C.d)}${dig(CX[1], YA, 2, 'r1', DG_C.r)}${dig(CX[0], YA, 6, 'r2', DG_C.c)}
        <g class="n0">${T(318, 106, '6 × 4 = 24', { a: 'start', s: 22, w: 800, f: DG_C.d })}</g>
        <g class="n1">${T(318, 156, '5 × 4 + 2 = 22', { a: 'start', s: 22, w: 800, f: DG_C.r })}</g>
        <g class="n2">${T(318, 206, '1 × 4 + 2 = 6', { a: 'start', s: 22, w: 800, f: DG_C.c })}</g>
        <g class="n3">${T(318, 262, '답 624', { a: 'start', s: 26, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 8000, e => {
          q('.bd2').setAttribute('opacity', e > 300 && e < 2600 ? 1 : 0);
          q('.bd1').setAttribute('opacity', e > 2700 && e < 5000 ? 1 : 0);
          q('.bd0').setAttribute('opacity', e > 5100 && e < 7000 ? 1 : 0);
          show(el, '.n0', e > 500); show(el, '.r0', e > 1200);
          const m1 = dgEase(dgP(e, 1500, 900));
          q('.c1').setAttribute('transform', `translate(${CX[2] + (CX[1] - CX[2]) * m1 - 30 * (1 - m1)},${(YA - 6) + (80 - (YA - 6)) * m1})`);
          show(el, '.c1', e > 1500);
          show(el, '.n1', e > 2900); show(el, '.r1', e > 3600);
          const m2 = dgEase(dgP(e, 3900, 900));
          q('.c2').setAttribute('transform', `translate(${CX[1] + (CX[0] - CX[1]) * m2 - 30 * (1 - m2)},${(YA - 6) + (80 - (YA - 6)) * m2})`);
          show(el, '.c2', e > 3900);
          show(el, '.n2', e > 5300); show(el, '.r2', e > 6000);
          show(el, '.n3', e > 7000);
        });
      }
    },

    'm3-02:2': {
      alt: '가로 24칸, 세로 13칸 모눈을 10줄과 3줄로 나누어 24 × 10 = 240, 24 × 3 = 72를 구하고 더해서 24 × 13 = 312가 되는 그림',
      svg: (() => {
        let g = '';
        for (let i = 0; i <= 24; i++) g += `<line x1="${GX + i * CS}" y1="${GY}" x2="${GX + i * CS}" y2="${GY + 13 * CS}" stroke="${DG_C.sub}" stroke-width="${i % 24 ? 0.8 : 2.5}"/>`;
        for (let j = 0; j <= 13; j++) g += `<line x1="${GX}" y1="${GY + j * CS}" x2="${GX + 24 * CS}" y2="${GY + j * CS}" stroke="${DG_C.sub}" stroke-width="${j % 13 ? 0.8 : 2.5}"/>`;
        return `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
          <rect class="ra" x="${GX}" y="${GY}" width="${24 * CS}" height="${10 * CS}" fill="${DG_C.b}"/>
          <rect class="rb" x="${GX}" y="${GY + 10 * CS}" width="${24 * CS}" height="${3 * CS}" fill="${DG_C.a}"/>
          ${g}
          <line class="sp" x1="${GX - 6}" y1="${GY + 10 * CS}" x2="${GX + 24 * CS + 6}" y2="${GY + 10 * CS}" stroke="${DG_C.ink}" stroke-width="3.5"/>
          ${T(GX + 12 * CS, 34, '24칸', { s: 20, w: 800 })}
          <g class="la">${T(36, GY + 5 * CS + 7, '10', { a: 'end', s: 20, w: 800, f: DG_C.d })}${T(GX + 24 * CS + 14, GY + 5 * CS + 8, '24 × 10 = 240', { a: 'start', s: 20, w: 800, f: DG_C.d })}</g>
          <g class="lb">${T(36, GY + 11.5 * CS + 7, '3', { a: 'end', s: 20, w: 800, f: DG_C.c })}${T(GX + 24 * CS + 14, GY + 11.5 * CS + 8, '24 × 3 = 72', { a: 'start', s: 20, w: 800, f: DG_C.c })}</g>
          <g class="tot"><rect x="40" y="208" width="400" height="48" rx="14" fill="#f5f5f7"/>${T(240, 240, '24 × 13 = <tspan fill="#0071e3">240</tspan> + <tspan fill="#ff9500">72</tspan> = 312', { s: 24, w: 800 })}</g>
        </svg>`;
      })(),
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          const a = dgEase(dgP(e, 1000, 1200)), b = dgEase(dgP(e, 2800, 900));
          q('.ra').setAttribute('height', 10 * CS * a);
          q('.rb').setAttribute('height', 3 * CS * b);
          show(el, '.sp', e > 600);
          show(el, '.la', e > 2300); show(el, '.lb', e > 3800);
          show(el, '.tot', e > 4900);
        });
      }
    },

    'm3-02:3': {
      alt: '30 × 40은 3 × 4 = 12를 구한 뒤 0 두 개를 붙여 1200이 되고, 198 × 3은 198을 약 200으로 어림해 200 × 3 = 600쯤이라고 생각하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="130" y="76" text-anchor="middle" font-size="32" font-weight="800" fill="${DG_C.ink}">3<tspan fill="${DG_C.c}">0</tspan> × 4<tspan fill="${DG_C.c}">0</tspan></text>
        <g class="s1"><text x="130" y="140" text-anchor="middle" font-size="28" font-weight="800" fill="${DG_C.d}">3 × 4 = 12</text></g>
        <g class="s2"><text x="128" y="210" text-anchor="end" font-size="40" font-weight="800" fill="${DG_C.d}">12</text></g>
        <text class="z" x="128" y="210" text-anchor="start" font-size="40" font-weight="800" fill="${DG_C.c}">00</text>
        <g class="s3">${T(130, 254, '0이 2개 → 1200', { s: 20, w: 800, f: DG_C.c })}</g>
        <line x1="262" y1="40" x2="262" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        <g class="r0">${T(370, 82, '198 × 3', { s: 28, w: 800 })}</g>
        <g class="r1">${T(370, 130, '≈ 200 × 3', { s: 24, w: 800, f: DG_C.r })}</g>
        <g class="r2">${T(370, 174, '= 600쯤', { s: 24, w: 800, f: DG_C.r })}</g>
        <line x1="296" y1="232" x2="452" y2="232" stroke="${DG_C.ink}" stroke-width="3"/>
        ${[190, 200, 210].map(v => `<line x1="${296 + (v - 190) * 7.8}" y1="224" x2="${296 + (v - 190) * 7.8}" y2="240" stroke="${DG_C.ink}" stroke-width="3"/>${T(296 + (v - 190) * 7.8, 266, v, { s: 18, f: v === 200 ? DG_C.r : DG_C.sub, w: 800 })}`).join('')}
        <circle class="dot" cx="${296 + 8 * 7.8}" cy="232" r="8" fill="${DG_C.c}"/>
        <g class="nl">${T(296 + 8 * 7.8 - 6, 214, '198', { a: 'end', s: 18, w: 800, f: DG_C.c })}<path d="M${296 + 8 * 7.8} 218 Q${296 + 9 * 7.8} 202 ${296 + 10 * 7.8} 218" fill="none" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          show(el, '.s1', e > 600); show(el, '.s2', e > 1400);
          const m = dgEase(dgP(e, 1900, 900));
          q('.z').setAttribute('y', 76 + (210 - 76) * m); q('.z').setAttribute('x', 160 + (128 - 160) * m);
          q('.z').setAttribute('opacity', e > 1900 ? 1 : 0);
          show(el, '.s3', e > 2900);
          show(el, '.r0', e > 3500); show(el, '.dot', e > 3800); show(el, '.nl', e > 4300);
          show(el, '.r1', e > 4800); show(el, '.r2', e > 5600);
        });
      }
    },
  });
})();
