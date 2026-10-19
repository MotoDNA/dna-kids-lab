/* 4학년 수학 · 규칙을 찾아 수와 식으로 나타내 볼까? (m4-06) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const trike = (x, y) => `<g transform="translate(${x},${y})" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="20" cy="8" r="10"/><circle cx="-24" cy="12" r="6"/><circle cx="-4" cy="12" r="6"/><path d="M-24 12 H-4 M-14 12 L-10 -4 M-16 -4 h10 M-10 -4 L14 -8 M20 8 L14 -8 l-2 -9 M7 -17 h10"/></g>`;

  /* 0: 표 */
  const COL = ['1', '2', '3', '4', '…', '6'], WH = ['3', '6', '9', '12', '…', '18'];
  const CXc = i => 134 + i * 48;

  /* 1: 수 배열 */
  const S1 = ['1025', '1125', '1225', '1325', '1425'], S2 = ['3', '6', '12', '24', '48'];
  const BXs = i => 24 + i * 88;

  /* 2: 바둑돌 ㄱ자 */
  const PX = [62, 152, 262, 392], STEP = 20;
  const stones = n => { const o = []; for (let i = 0; i < n; i++) o.push([i, 0]); for (let j = 1; j < n; j++) o.push([n - 1, j]); return o; };

  /* 3: 계산식 */
  const ROWY = [64, 118, 172, 226], M3 = ['3', '6', '9', '12'], R3 = ['111', '222', '333', '444'];

  /* 4: 양팔 저울 */
  const PV = [240, 104], BL = 128;

  Object.assign(DIAG, {
    'm4-06:0': {
      alt: '세발자전거가 1대, 2대, 3대, 4대로 늘어날 때 바퀴는 3개, 6개, 9개, 12개로 늘어나 세발자전거 수에 3을 곱하면 바퀴 수가 되고, 6대면 6×3=18개인 것을 표로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="16" y="56" width="390" height="120" rx="12" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
        <line x1="16" y1="116" x2="406" y2="116" stroke="#d2d2d7" stroke-width="2"/>
        <line x1="104" y1="56" x2="104" y2="176" stroke="#d2d2d7" stroke-width="2"/>
        ${trike(54, 88)}${T(60, 155, '바퀴', { s: 20, f: C.c })}
        ${COL.map((s, i) => `<g class="cl cl${i}">${T(CXc(i), 96, s, { s: 24, f: i === 5 ? C.d : C.ink })}${T(CXc(i), 156, WH[i], { s: 24, f: i === 5 ? C.c : C.c })}</g>`).join('')}
        <g class="x3"><path d="M424 84 Q452 116 424 148" fill="none" stroke="${C.r}" stroke-width="3" stroke-linecap="round"/><path d="M432 138 l-8 10 l12 3" fill="none" stroke="${C.r}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(452, 122, '×3', { s: 20, f: C.r })}</g>
        <g class="rl">${T(210, 226, '세발자전거 수 × 3 = 바퀴 수', { s: 22, f: C.r })}</g>
        <g class="ex">${T(210, 270, '6대 → 6 × 3 = 18(개)', { s: 22, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          COL.forEach((s, i) => q('.cl' + i).setAttribute('opacity', dgP(e, (i < 4 ? 300 + i * 600 : 4300), 400)));
          q('.x3').setAttribute('opacity', dgP(e, 2700, 400));
          q('.rl').setAttribute('opacity', dgP(e, 3300, 500));
          q('.ex').setAttribute('opacity', dgP(e, 4900, 500));
        });
      }
    },

    'm4-06:1': {
      alt: '1025, 1125, 1225, 1325는 100씩 커지므로 다음 수는 1425이고, 3, 6, 12, 24는 2씩 곱해 커지므로 다음 수는 48인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[[S1, 50, '+100', C.d], [S2, 170, '×2', C.r]].map(([S, y, op, col], r) => `
          ${S.map((v, i) => `<rect x="${BXs(i)}" y="${y}" width="80" height="48" rx="10" fill="${i === 4 ? '#fff' : '#f5f5f7'}" stroke="${i === 4 ? C.c : '#d2d2d7'}" stroke-width="${i === 4 ? 3 : 2}" ${i === 4 ? 'stroke-dasharray="6 5"' : ''}/>
            ${T(BXs(i) + 40, y + 33, v, { s: 24, f: i === 4 ? C.c : C.ink, c: i === 4 ? 'an' + r : '' })}`).join('')}
          ${[0, 1, 2, 3].map(i => `<g class="j${r} j${r}${i}"><path d="M${BXs(i) + 46} ${y + 54} Q${BXs(i) + 84} ${y + 84} ${BXs(i) + 122} ${y + 54}" fill="none" stroke="${col}" stroke-width="3"/><path d="M${BXs(i) + 110} ${y + 56} l12 -2 l-2 12" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            ${T(BXs(i) + 84, y + 98, op, { s: 18, f: col })}</g>`).join('')}`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          [0, 1].forEach(r => {
            const b = r * 2900;
            for (let i = 0; i < 4; i++) q(`.j${r}${i}`).setAttribute('opacity', dgP(e, b + 400 + i * 500, 300));
            q('.an' + r).setAttribute('opacity', dgP(e, b + 2400, 400));
          });
        });
      }
    },

    'm4-06:2': {
      alt: '바둑돌을 ㄱ자 모양으로 놓으면 첫째 1개, 둘째 1+2=3개, 셋째 1+2+2=5개, 넷째 1+2+2+2=7개로 2개씩 늘어나 다섯째는 7+2=9개인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${PX.map((x, k) => { const n = k + 1, w = (n - 1) * STEP; return `<g class="p p${k}">
          ${stones(n).map(([i, j]) => { const isNew = k > 0 && (i === n - 1); return `<circle cx="${x - w / 2 + i * STEP}" cy="${52 + j * STEP}" r="8.5" fill="${isNew ? C.c : C.ink}"/>`; }).join('')}
          ${T(x, 160, ['첫째', '둘째', '셋째', '넷째'][k], { s: 20, f: C.sub, w: 700 })}
          ${T(x, 190, `${2 * n - 1}개`, { s: 22, f: C.ink })}
          ${T(x, 220, ['1', '1+2', '1+2+2', '1+2+2+2'][k], { s: 18, f: C.c, w: 800 })}</g>`; }).join('')}
        <g class="nx"><rect x="90" y="246" width="300" height="44" rx="22" fill="${C.a}" fill-opacity=".6"/>${T(240, 276, '다섯째: 7 + 2 = 9(개)', { s: 22, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [0, 1, 2, 3].forEach(k => {
            const f = dgEase(dgP(e, 300 + k * 1000, 500));
            q('.p' + k).setAttribute('opacity', f);
            q('.p' + k).setAttribute('transform', `translate(0,${-10 * (1 - f)})`);
          });
          q('.nx').setAttribute('opacity', dgP(e, 4500, 500));
        });
      }
    },

    'm4-06:3': {
      alt: '37×3=111, 37×6=222, 37×9=333처럼 곱하는 수가 3씩 커지면 결과는 111씩 커지므로 다음 식은 37×12=444인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <rect class="hl" x="84" y="${ROWY[3] - 34}" width="250" height="46" rx="14" fill="${C.a}" fill-opacity=".6"/>
        ${ROWY.map((y, i) => `<g class="r r${i}">${T(114, y, '37', { s: 28 })}${T(152, y, '×', { s: 28 })}${T(194, y, M3[i], { s: 28, f: C.d })}${T(238, y, '=', { s: 28 })}${T(292, y, R3[i], { s: 28, f: C.c })}</g>`).join('')}
        ${[0, 1, 2].map(i => { const y0 = ROWY[i] - 8, y1 = ROWY[i + 1] - 18; return `<g class="a a${i}">
          <path d="M68 ${y0} Q46 ${(y0 + y1) / 2} 68 ${y1}" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/>${T(40, (y0 + y1) / 2 + 7, '+3', { s: 18, f: C.d, a: 'end' })}
          <path d="M344 ${y0} Q366 ${(y0 + y1) / 2} 344 ${y1}" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/>${T(368, (y0 + y1) / 2 + 7, '+111', { s: 18, f: C.c, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [0, 1, 2].forEach(i => q('.r' + i).setAttribute('opacity', dgP(e, 200 + i * 500, 400)));
          [0, 1].forEach(i => q('.a' + i).setAttribute('opacity', dgP(e, 1900 + i * 700, 400)));
          q('.a2').setAttribute('opacity', dgP(e, 3600, 400));
          q('.r3').setAttribute('opacity', dgP(e, 3900, 500));
          q('.hl').setAttribute('opacity', dgP(e, 4600, 500));
        });
      }
    },

    'm4-06:4': {
      alt: '양팔 저울 왼쪽에 16+27, 오른쪽에 20+□를 올리면 16이 20으로 4만큼 커졌으니 27은 4만큼 작아진 23이어야 수평이 되고, 양쪽 모두 43이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M${PV[0]} ${PV[1]} L${PV[0] - 22} 262 H${PV[0] + 22} Z" fill="#f5f5f7" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <line x1="${PV[0] - 70}" y1="262" x2="${PV[0] + 70}" y2="262" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"/>
        <line class="beam" x1="${PV[0] - BL}" y1="${PV[1]}" x2="${PV[0] + BL}" y2="${PV[1]}" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="${PV[0]}" cy="${PV[1]}" r="7" fill="${C.ink}"/>
        ${[-1, 1].map(s => `<g class="pan${s > 0 ? 'R' : 'L'}">
          <path d="M0 0 L-74 64 M0 0 L74 64" stroke="${C.sub}" stroke-width="2"/>
          <rect x="-94" y="64" width="188" height="56" rx="12" fill="${s < 0 ? C.b : C.a}" stroke="${s < 0 ? C.d : C.c}" stroke-width="3"/>
          ${s < 0 ? `${T(-40, 102, '16', { s: 28 })}${T(0, 102, '+', { s: 28 })}${T(40, 102, '27', { s: 28 })}`
            : `${T(-40, 102, '20', { s: 28 })}${T(0, 102, '+', { s: 28 })}<rect x="18" y="74" width="44" height="38" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>
               ${T(40, 102, '23', { s: 26, f: C.c, c: 'ans' })}
               <g class="hint">${T(-40, 146, '+4', { s: 20, f: C.d })}${T(40, 146, '−4', { s: 20, f: C.c })}</g>`}
        </g>`).join('')}
        <g class="eq">${T(112, 290, '16 + 27 = 43', { s: 20, f: C.d })}${T(368, 290, '20 + 23 = 43', { s: 20, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          // □가 비어 있을 때는 왼쪽이 무거움 → 23이 들어가면 수평
          const lv = dgEase(dgP(e, 3600, 1200)), a = (9 * (1 - lv)) * Math.PI / 180;
          const lx = PV[0] - BL * Math.cos(a), ly = PV[1] + BL * Math.sin(a), rx = PV[0] + BL * Math.cos(a), ry = PV[1] - BL * Math.sin(a);
          q('.beam').setAttribute('x1', lx); q('.beam').setAttribute('y1', ly); q('.beam').setAttribute('x2', rx); q('.beam').setAttribute('y2', ry);
          q('.panL').setAttribute('transform', `translate(${lx},${ly})`);
          q('.panR').setAttribute('transform', `translate(${rx},${ry})`);
          q('.hint').setAttribute('opacity', dgP(e, 1200, 500));
          q('.ans').setAttribute('opacity', dgP(e, 2600, 500));
          q('.eq').setAttribute('opacity', dgP(e, 5200, 500));
        });
      }
    },
  });
})();
