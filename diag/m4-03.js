/* 4학년 수학 · 큰 수의 곱셈과 나눗셈, 어떻게 할까? (m4-03) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const digits = (str, xs, y, o) => [...str].map((d, i) => T(xs[i], y, d, o)).join('');

  /* 1: 254 × 36 */
  const MX = [176, 212, 248, 284];   // 천 백 십 일

  /* 2: 75 ÷ 23 막대 */
  const U2 = 420 / 75, B0 = 30;

  /* 3: 586 ÷ 24 */
  const DX = [220, 254, 288];        // 백 십 일

  /* 4: 수직선 0~10000 */
  const NX = v => 40 + v * 0.04;

  Object.assign(DIAG, {
    'm4-03:0': {
      alt: '300×40에서 0이 아닌 수끼리 3×4=12를 계산하고, 두 수의 0을 모두 세어 3개를 12 뒤에 붙이면 12000이 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${T(240, 76, `<tspan fill="${C.d}">3</tspan><tspan fill="${C.c}">00</tspan> × <tspan fill="${C.d}">4</tspan><tspan fill="${C.c}">0</tspan>`, { s: 40 })}
        <g class="s1">${T(240, 150, '3 × 4 = 12', { s: 32, f: C.d })}</g>
        <g class="s2">${T(240, 200, '0이 2개 + 1개 = 3개', { s: 20, f: C.c })}</g>
        <g class="s3">${T(240, 266, `<tspan fill="${C.d}">12</tspan><tspan fill="${C.c}">000</tspan>`, { s: 44 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.s1').setAttribute('opacity', dgP(e, 800, 500));
          q('.s2').setAttribute('opacity', dgP(e, 2000, 500));
          const f = dgEase(dgP(e, 3200, 700));
          q('.s3').setAttribute('opacity', f);
          q('.s3').setAttribute('transform', `translate(0,${-16 * (1 - f)})`);
        });
      }
    },

    'm4-03:1': {
      alt: '254×36 세로셈: 254×6=1524를 쓰고, 254×3을 십의 자리부터 맞추어 7620(일의 자리 0 생략)으로 쓴 뒤 두 값을 더해 9144가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${digits('254', MX.slice(1), 62, { s: 30 })}
        ${T(132, 108, '×', { s: 30 })}${T(MX[2], 108, '3', { s: 30, c: 'm3' })}${T(MX[3], 108, '6', { s: 30, c: 'm6' })}
        <line x1="116" y1="124" x2="304" y2="124" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        <g class="p1">${digits('1524', MX, 164, { s: 30, f: C.d })}${T(326, 162, '254 × 6', { s: 18, f: C.d, w: 700, a: 'start' })}</g>
        <g class="p2">${digits('762', MX.slice(0, 3), 210, { s: 30, f: C.c })}${T(326, 208, '254 × 30', { s: 18, f: C.c, w: 700, a: 'start' })}</g>
        ${T(MX[3], 210, '0', { s: 30, f: '#c7c7cc', c: 'z' })}
        <line class="p3l" x1="116" y1="226" x2="304" y2="226" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        <g class="p3">${digits('9144', MX, 270, { s: 32 })}${T(326, 268, '더하기', { s: 18, f: C.sub, w: 700, a: 'start' })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          const op = (c, v) => q(c).setAttribute('opacity', v);
          q('.m6').setAttribute('fill', e >= 500 && e < 2000 ? C.d : C.ink);
          op('.p1', dgP(e, 900, 500));
          q('.m3').setAttribute('fill', e >= 2300 && e < 4200 ? C.c : C.ink);
          op('.z', e >= 2700 ? (e < 3400 ? 1 : 1) : 0);
          q('.z').setAttribute('fill', e >= 2700 && e < 3500 ? C.c : '#c7c7cc');
          op('.p2', dgP(e, 3300, 500));
          op('.p3l', dgP(e, 4500, 300));
          op('.p3', dgP(e, 4800, 600));
        });
      }
    },

    'm4-03:2': {
      alt: '길이 75인 막대를 23씩 끊으면 3번 들어가고(23×3=69) 6이 남아서 75÷23=3…6이며, 나머지 6은 나누는 수 23보다 작다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <path d="M${B0} 70 v-10 H${B0 + 420} v10" fill="none" stroke="${C.sub}" stroke-width="2.5"/>
        ${T(240, 50, '75', { s: 22, f: C.ink })}
        <rect x="${B0}" y="80" width="420" height="46" rx="6" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
        ${[0, 1, 2].map(i => `<g class="g${i}"><rect x="${B0 + i * 23 * U2 + 2}" y="82" width="${23 * U2 - 4}" height="42" rx="6" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>${T(B0 + (i + 0.5) * 23 * U2, 111, '23', { s: 20, f: C.d })}</g>`).join('')}
        <g class="rm"><rect x="${B0 + 69 * U2 + 2}" y="82" width="${6 * U2 - 4}" height="42" rx="6" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>${T(B0 + 72 * U2, 160, '6', { s: 22, f: C.c })}${T(B0 + 72 * U2 - 6, 186, '남음', { s: 18, f: C.c, w: 700 })}</g>
        ${T(200, 160, '', { c: 'cnt', s: 20, f: C.d })}
        <g class="eq">${T(220, 220, '23 × 3 = 69', { s: 22, f: C.d })}${T(220, 264, `75 ÷ 23 = 3 … <tspan fill="${C.c}">6</tspan>`, { s: 28 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          let n = 0;
          [0, 1, 2].forEach(i => { const st = 500 + i * 800; if (e >= st) n = i + 1; q('.g' + i).setAttribute('opacity', dgP(e, st, 400)); });
          q('.cnt').textContent = n && e < 3200 ? `${n}번` : '';
          q('.rm').setAttribute('opacity', dgP(e, 3000, 400));
          q('.eq').setAttribute('opacity', dgP(e, 3800, 600));
        });
      }
    },

    'm4-03:3': {
      alt: '586÷24 세로 나눗셈: 58 안에 24가 2번(48) 들어가 몫의 십의 자리에 2, 58−48=10에 6을 내려 106, 24×4=96이라 몫의 일의 자리에 4, 나머지 10이며, 24×24+10=586으로 검산하는 그림',
      svg: `<svg viewBox="0 0 480 350" class="dg-svg" role="img">
        <rect class="hl" y="90" width="0" height="36" rx="10" fill="${C.b}" opacity="0"/>
        ${T(DX[1], 62, '2', { s: 30, f: C.c, c: 'q1' })}${T(DX[2], 62, '4', { s: 30, f: C.c, c: 'q2' })}
        <path d="M196 78 H312 M196 78 Q210 100 196 126" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        ${T(158, 116, '24', { s: 30, f: C.d })}
        ${digits('586', DX, 116, { s: 30 })}
        <g class="a1">${digits('48', DX, 158, { s: 30 })}<line x1="198" y1="170" x2="310" y2="170" stroke="${C.ink}" stroke-width="3"/>${T(340, 158, '24×2=48', { s: 20, f: C.c, a: 'start' })}</g>
        <g class="a2">${digits('10', DX, 202, { s: 30 })}</g>
        <g class="a3">${T(DX[2], 202, '6', { s: 30, f: C.d })}
          <path d="M${DX[2] + 20} 110 C${DX[2] + 38} 136, ${DX[2] + 38} 164, ${DX[2] + 20} 186 m-2 -12 l2 12 l11 -6" fill="none" stroke="${C.d}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(340, 202, '6 내리기', { s: 20, f: C.d, a: 'start' })}</g>
        <g class="a4">${digits('96', DX.slice(1), 244, { s: 30 })}<line x1="232" y1="256" x2="310" y2="256" stroke="${C.ink}" stroke-width="3"/>${T(340, 244, '24×4=96', { s: 20, f: C.c, a: 'start' })}</g>
        <g class="a5">${digits('10', DX.slice(1), 288, { s: 30, f: C.r })}${T(340, 288, '나머지', { s: 20, f: C.r, a: 'start' })}</g>
        <g class="ck">${T(240, 336, '검산: 24 × 24 + 10 = 586', { s: 20, f: C.sub })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7600, e => {
          const op = (c, v) => q(c).setAttribute('opacity', v);
          const hl = q('.hl');
          if (e >= 400 && e < 1900) { hl.setAttribute('x', DX[0] - 20); hl.setAttribute('y', 88); hl.setAttribute('width', DX[1] - DX[0] + 40); op('.hl', 0.6); }
          else if (e >= 3800 && e < 4900) { hl.setAttribute('x', DX[0] - 20); hl.setAttribute('y', 174); hl.setAttribute('width', DX[2] - DX[0] + 40); op('.hl', 0.6); }
          else op('.hl', 0);
          op('.q1', dgP(e, 1000, 400)); op('.a1', dgP(e, 1600, 400));
          op('.a2', dgP(e, 2500, 400)); op('.a3', dgP(e, 3100, 500));
          op('.q2', dgP(e, 4300, 400)); op('.a4', dgP(e, 4900, 400));
          op('.a5', dgP(e, 5700, 400)); op('.ck', dgP(e, 6600, 500));
        });
      }
    },

    'm4-03:4': {
      alt: '398×21을 약 400×20=8000으로 어림하면, 수직선에서 실제 값 8358과 아주 가까워 계산이 그럴듯하다는 것을 확인하는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${T(150, 62, '398', { s: 28 })}${T(210, 62, '×', { s: 28 })}${T(270, 62, '21', { s: 28 })}
        <g class="r1">
          <path d="M150 74 v20 m-6 -6 l6 6 l6 -6 M270 74 v20 m-6 -6 l6 6 l6 -6" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(150, 128, '400', { s: 28, f: C.c })}${T(210, 128, '×', { s: 28, f: C.c })}${T(270, 128, '20', { s: 28, f: C.c })}${T(306, 128, '= 8000', { s: 28, f: C.c, a: 'start' })}
        </g>
        <line x1="${NX(0)}" y1="210" x2="${NX(10000)}" y2="210" stroke="${C.ink}" stroke-width="3"/>
        ${[0, 5000, 10000].map(v => `<line x1="${NX(v)}" y1="200" x2="${NX(v)}" y2="220" stroke="${C.ink}" stroke-width="3"/>${T(NX(v), 246, v, { s: 18, f: C.sub, w: 700 })}`).join('')}
        <g class="m1"><circle cx="${NX(8000)}" cy="210" r="8" fill="${C.c}"/>${T(NX(8000) - 6, 184, '어림 8000', { s: 20, f: C.c, a: 'end' })}</g>
        <g class="m2"><circle cx="${NX(8358)}" cy="210" r="8" fill="${C.d}"/>${T(NX(8358) - 6, 280, '실제 8358', { s: 20, f: C.d, a: 'end' })}
          <line x1="${NX(8358)}" y1="218" x2="${NX(8358)}" y2="262" stroke="${C.d}" stroke-width="2" stroke-dasharray="4 4"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.r1').setAttribute('opacity', dgP(e, 700, 600));
          const f = dgEase(dgP(e, 2000, 900));
          q('.m1').setAttribute('opacity', f > 0 ? 1 : 0);
          q('.m1').setAttribute('transform', `translate(${-(NX(8000) - NX(0)) * (1 - f)},0)`);
          q('.m2').setAttribute('opacity', dgP(e, 3500, 500));
        });
      }
    },
  });
})();
