/* 3학년 수학 · 조사한 내용을 한눈에 보려면 어떻게 할까? (m3-03) */
(() => {
  const RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const show = (el, s, on) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', on ? 1 : 0));
  const D = [['사과', 7], ['바나나', 5], ['딸기', 9], ['포도', 4]];
  const apple = s => `<g transform="scale(${s})"><path d="M0 -12 C14 -21 23 -2 14 11 C9 18 4 16 0 14 C-4 16 -9 18 -14 11 C-23 -2 -14 -21 0 -12 Z" fill="${RED}"/><path d="M0 -12 q1 -5 4 -8" stroke="${DG_C.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="7" cy="-17" rx="5" ry="2.6" transform="rotate(-25 7 -17)" fill="${DG_C.r}"/></g>`;

  /* 0: 표 */
  const TX = 12, C0 = 96, CW = 72, colX = i => TX + C0 + CW * i + CW / 2;

  /* 1: 그림그래프 */
  const SX = j => 168 + j * 24, SY = r => 88 + r * 30;
  const BIG = [80, 146, 212], SM = [262, 292];

  /* 2·3: 막대그래프 */
  const chart = (base, unit, cls) => {
    let s = '';
    for (let v = 0; v <= 10; v++) {
      const y = base - v * unit;
      s += `<line x1="70" y1="${y}" x2="446" y2="${y}" stroke="${v % 2 ? '#f0f0f2' : '#e5e5ea'}" stroke-width="${v ? 1.5 : 0}"/>`;
      if (v % 2 === 0) s += T(56, y + 6, v, { a: 'end', s: 18, f: DG_C.sub, c: cls + 'n' });
    }
    return s + `<line x1="70" y1="${base - 10 * unit - 8}" x2="70" y2="${base}" stroke="${DG_C.ink}" stroke-width="3"/><line x1="70" y1="${base}" x2="446" y2="${base}" stroke="${DG_C.ink}" stroke-width="3"/>`;
  };
  const BXc = i => 130 + i * 92;

  Object.assign(DIAG, {
    'm3-03:0': {
      alt: '좋아하는 과일을 붙임 딱지로 모은 뒤 표로 정리한 그림: 사과 7명, 바나나 5명, 딸기 9명, 포도 4명, 합계 25명',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${D.map((d, i) => Array.from({ length: d[1] }, (_, k) => `<circle class="st${i}_${k}" cx="${colX(i) + (k % 2 ? 9 : -9)}" cy="${128 - Math.floor(k / 2) * 16}" r="6.5" fill="${DG_C.d}"/>`).join('')).join('')}
        ${T(TX + C0 / 2, 114, '붙임 딱지', { s: 18, f: DG_C.sub, c: 'stl' })}
        <rect x="${TX}" y="146" width="${C0 + 5 * CW}" height="88" rx="10" fill="#fff" stroke="${DG_C.ink}" stroke-width="2.5"/>
        <rect x="${TX + 1.25}" y="147.25" width="${C0 + 5 * CW - 2.5}" height="42.75" rx="9" fill="#f5f5f7"/>
        <rect class="sum" x="${TX + C0 + 4 * CW}" y="147.25" width="${CW - 1.25}" height="85.5" fill="${DG_C.a}"/>
        <line x1="${TX}" y1="190" x2="${TX + C0 + 5 * CW}" y2="190" stroke="${DG_C.ink}" stroke-width="2"/>
        ${[0, 1, 2, 3, 4].map(i => `<line x1="${TX + C0 + CW * i}" y1="146" x2="${TX + C0 + CW * i}" y2="234" stroke="${DG_C.ink}" stroke-width="2"/>`).join('')}
        ${T(TX + C0 / 2, 175, '과일', { s: 18, w: 800 })}${T(TX + C0 / 2, 219, '학생 수(명)', { s: 18, w: 800 })}
        ${D.map((d, i) => T(colX(i), 175, d[0], { s: 18, w: 800 })).join('')}${T(colX(4), 175, '합계', { s: 18, w: 800, f: DG_C.c })}
        ${D.map((d, i) => T(colX(i), 222, d[1], { s: 24, w: 800, f: DG_C.d, c: 'v' + i })).join('')}
        ${T(colX(4), 222, '25', { s: 24, w: 800, f: DG_C.c, c: 'tot' })}
      </svg>`,
      play(el) {
        dgAnim(el, 6200, e => {
          // 붙임 딱지가 하나씩 붙음
          let t = 200;
          D.forEach((d, i) => { for (let k = 0; k < d[1]; k++) { show(el, `.st${i}_${k}`, e > t); t += 110; } });
          show(el, '.stl', e > 200);
          D.forEach((d, i) => show(el, '.v' + i, e > 3500 + i * 450));
          show(el, '.sum', e > 5300); show(el, '.tot', e > 5500);
        });
      }
    },

    'm3-03:1': {
      alt: '큰 사과 그림은 10상자, 작은 사과 그림은 1상자를 나타내어, 작은 사과 32개 중 10개씩을 큰 그림 하나로 바꾸면 32상자는 큰 그림 3개와 작은 그림 2개로 그려지는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g transform="translate(34,34)">${apple(1.35)}</g>${T(60, 42, '= 10상자', { a: 'start', s: 20, w: 800 })}
        <g transform="translate(200,36)">${apple(0.7)}</g>${T(216, 42, '= 1상자', { a: 'start', s: 20, w: 800 })}
        ${Array.from({ length: 32 }, (_, i) => `<g class="s${i}">${apple(0.7)}</g>`).join('')}
        ${BIG.map((x, r) => `<g class="b${r}" transform="translate(${x},224)">${apple(1.35)}</g>`).join('')}
        <line class="row" x1="30" y1="${258}" x2="320" y2="258" stroke="#d2d2d7" stroke-width="2"/>
        <g class="lab">${BIG.map(x => T(x, 282, '10', { s: 18, f: DG_C.sub })).join('')}${SM.map(x => T(x, 282, '1', { s: 18, f: DG_C.sub })).join('')}</g>
        <g class="rule">${T(240, 140, '작은 그림 10개 → 큰 그림 1개', { s: 20, w: 800, f: DG_C.d })}</g>
        <g class="res">${T(400, 220, '32상자', { s: 26, w: 800, f: RED })}${T(400, 250, '큰 3 + 작은 2', { s: 18, f: DG_C.sub })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          for (let i = 0; i < 32; i++) {
            const r = Math.floor(i / 10), j = i % 10;
            const x0 = SX(j), y0 = SY(r);
            let x = x0, y = y0, op = dgP(e, 100 + i * 40, 200), sc = 1;
            if (r < 3) {
              const m = dgEase(dgP(e, 1900 + r * 1000, 800));
              x = x0 + (BIG[r] - x0) * m; y = y0 + (224 - y0) * m; op *= 1 - (m >= 1 ? 1 : 0); sc = 1 + m;
            } else {
              const m = dgEase(dgP(e, 5000, 700));
              x = x0 + (SM[j] - x0) * m; y = y0 + (226 - y0) * m;
            }
            q('.s' + i).setAttribute('transform', `translate(${x},${y}) scale(${sc})`);
            q('.s' + i).setAttribute('opacity', op);
          }
          BIG.forEach((_, r) => show(el, '.b' + r, e >= 1900 + r * 1000 + 800));
          show(el, '.row', e > 1800);
          show(el, '.lab', e > 5900); show(el, '.rule', e > 4900); show(el, '.res', e > 6000);
        });
      }
    },

    'm3-03:2': {
      alt: '좋아하는 과일을 막대그래프로 그리는 과정: 가로에 과일, 세로에 학생 수를 정하고 눈금 한 칸을 1명으로 정한 뒤 사과 7칸, 바나나 5칸, 딸기 9칸, 포도 4칸 높이로 막대를 그리고 제목을 붙인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="ttl">${T(20, 30, '좋아하는 과일', { a: 'start', s: 22, w: 800 })}</g>
        <g class="ax">${chart(236, 16, 'a')}${T(34, 64, '(명)', { s: 18, f: DG_C.sub })}</g>
        ${D.map((d, i) => `<rect class="br${i}" x="${BXc(i) - 25}" width="50" rx="4" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
          ${T(BXc(i), 236 - d[1] * 16 - 8, d[1], { s: 20, w: 800, f: DG_C.d, c: 'bv' + i })}
          ${T(BXc(i), 264, d[0], { s: 20, w: 800, c: 'xl' })}`).join('')}
        <g class="u1">${T(20, 292, '눈금 한 칸 = 1명', { a: 'start', s: 18, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          show(el, '.ax', e > 100); show(el, '.xl', e > 600);
          q('.ax').querySelectorAll('.an').forEach(n => n.setAttribute('opacity', e > 1200 ? 1 : 0));
          show(el, '.u1', e > 1400);
          D.forEach((d, i) => {
            const f = dgEase(dgP(e, 2200 + i * 900, 700)), h = d[1] * 16 * f;
            q('.br' + i).setAttribute('y', 236 - h); q('.br' + i).setAttribute('height', h);
            show(el, '.bv' + i, f >= 1);
          });
          show(el, '.ttl', e > 6000);
        });
      }
    },

    'm3-03:3': {
      alt: '막대그래프에서 가장 긴 막대 딸기(9명)와 가장 짧은 막대 포도(4명)를 표시하고, 차이가 9 − 4 = 5명인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${T(20, 30, '좋아하는 과일', { a: 'start', s: 22, w: 800 })}
        ${chart(236, 16, 'b')}${T(34, 64, '(명)', { s: 18, f: DG_C.sub })}
        ${D.map((d, i) => { const hi = i === 2 ? [DG_C.a, DG_C.c] : i === 3 ? ['#d6efdc', DG_C.r] : ['#f5f5f7', '#c7c7cc'];
          return `<rect class="br${i}" x="${BXc(i) - 25}" y="${236 - d[1] * 16}" width="50" height="${d[1] * 16}" rx="4" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" data-f="${hi[0]}" data-s="${hi[1]}"/>
          ${T(BXc(i), 236 - d[1] * 16 - 8, d[1], { s: 20, w: 800, f: DG_C.d, c: 'bv' + i })}${T(BXc(i), 264, d[0], { s: 20, w: 800 })}`; }).join('')}
        <g class="tg1">${T(BXc(2), 290, '가장 많음', { s: 18, w: 800, f: DG_C.c })}</g>
        <g class="tg2">${T(BXc(3), 290, '가장 적음', { s: 18, w: 800, f: DG_C.r })}</g>
        <g class="df"><line x1="${BXc(2) + 25}" y1="${236 - 9 * 16}" x2="${BXc(3) + 10}" y2="${236 - 9 * 16}" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="6 5"/>
          <path d="M${BXc(3)} ${236 - 9 * 16 + 4} V${236 - 4 * 16 - 30}" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
          <path d="M${BXc(3) - 7} ${236 - 9 * 16 + 11} L${BXc(3)} ${236 - 9 * 16 + 3} L${BXc(3) + 7} ${236 - 9 * 16 + 11}" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(BXc(3) + 14, 236 - 6.5 * 16 + 4, '5명', { a: 'start', s: 20, w: 800, f: RED })}</g>
        <g class="eq">${T(240, 314, '딸기 9명 − 포도 4명 = 5명', { s: 20, w: 800, f: RED })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          D.forEach((d, i) => {
            const b = q('.br' + i), on = (i === 2 && e > 800) || (i === 3 && e > 1800) || (i < 2 && e > 2600);
            b.setAttribute('fill', on ? b.dataset.f : DG_C.b); b.setAttribute('stroke', on ? b.dataset.s : DG_C.d);
            q('.bv' + i).setAttribute('fill', on ? (i < 2 ? '#c7c7cc' : b.dataset.s) : DG_C.d);
          });
          show(el, '.tg1', e > 800); show(el, '.tg2', e > 1800);
          show(el, '.df', e > 3200); show(el, '.eq', e > 4300);
        });
      }
    },
  });
})();
