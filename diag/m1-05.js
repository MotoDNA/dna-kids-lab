/* 1학년 수학 · 10개씩 묶어 세면 100까지 셀 수 있어요! (m1-05) */
(() => {
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  // 빨대 묶음 (가운데 x, 위 y, 높이 h, 폭 w)
  const bundle = (x, y, h, w) => {
    let s = '';
    for (let i = 0; i < 10; i++) { const sx = x - w / 2 + (w / 9) * i; s += `<line x1="${sx}" y1="${y}" x2="${sx}" y2="${y + h}" stroke="${DG_C.d}" stroke-width="${w > 30 ? 4 : 2}" stroke-linecap="round"/>`; }
    return s + `<rect x="${x - w / 2 - 5}" y="${y + h / 2 - (w > 30 ? 7 : 4)}" width="${w + 10}" height="${w > 30 ? 14 : 8}" rx="${w > 30 ? 5 : 3}" fill="${DG_C.c}"/>`;
  };
  const stick = (x, y, h, sw = 4) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${DG_C.d}" stroke-width="${sw}" stroke-linecap="round"/>`;

  /* 0 */
  const BX = [64, 152, 240, 328, 416];

  /* 1 */
  const RD = [['10', '십', '열'], ['20', '이십', '스물'], ['30', '삼십', '서른'], ['40', '사십', '마흔'], ['50', '오십', '쉰'], ['60', '육십', '예순'], ['70', '칠십', '일흔'], ['80', '팔십', '여든'], ['90', '구십', '아흔'], ['100', '백', '']];
  const card = k => {
    const x = 12 + (k % 5) * 92, y = 40 + Math.floor(k / 5) * 132, n = k + 1;
    let ic = '';
    for (let j = 0; j < n; j++) { const ix = x + 15 + (j % 5) * 14.5, iy = y + 48 + Math.floor(j / 5) * 22; ic += `<rect x="${ix - 3}" y="${iy}" width="6" height="18" rx="2" fill="${DG_C.d}"/><rect x="${ix - 5}" y="${iy + 7}" width="10" height="4" fill="${DG_C.c}"/>`; }
    const rd = RD[k][2] ? `<tspan fill="${DG_C.d}">${RD[k][1]}</tspan><tspan fill="${DG_C.sub}">·</tspan><tspan fill="${DG_C.c}">${RD[k][2]}</tspan>` : `<tspan fill="${DG_C.d}">${RD[k][1]}</tspan>`;
    return `<g class="cd${k}"><rect x="${x}" y="${y}" width="88" height="122" rx="14" fill="#f5f5f7"/>
      ${T(x + 44, y + 36, RD[k][0], { s: 28, w: 800 })}${ic}
      <text x="${x + 44}" y="${y + 110}" text-anchor="middle" font-size="18" font-weight="700">${rd}</text></g>`;
  };

  /* 2: 사탕 */
  const candy = (x, y) => `<g transform="translate(${x},${y})"><path d="M-12 0 L-20 -8 L-20 8 Z M12 0 L20 -8 L20 8 Z" fill="${DG_C.c}"/><ellipse rx="13" ry="10" fill="${DG_C.c}"/><path d="M-5 -6 q5 6 0 12 M3 -7 q5 7 0 14" stroke="#fff" stroke-width="2" fill="none"/></g>`;
  const bag = x => `<g transform="translate(${x},96)"><path d="M-26 -30 Q-34 34 -24 40 H24 Q34 34 26 -30 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M-20 -30 l-8 -12 h56 l-8 12" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><rect x="-22" y="-34" width="44" height="7" rx="3" fill="${DG_C.d}"/>
    ${T(0, 14, '10개', { s: 18, w: 800, f: DG_C.d })}</g>`;

  /* 3 */
  const smallNum = (x, y, tens, ones) => {
    let s = '';
    for (let i = 0; i < tens; i++) s += bundle(x + i * 26 + 10, y - 22, 44, 16);
    for (let j = 0; j < ones; j++) s += stick(x + tens * 26 + 6 + j * 9, y - 22, 44, 3);
    return s;
  };
  const pairRow = (y, n, cls) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const p = Math.floor(i / 2), x = 140 + p * 76 + (i % 2) * 30;
      s += `<circle class="${cls}d${i}" cx="${x}" cy="${y}" r="11" fill="${i === n - 1 && n % 2 ? DG_C.c : DG_C.d}"/>`;
    }
    for (let p = 0; p < Math.floor(n / 2); p++) s += `<rect class="${cls}r${p}" x="${140 + p * 76 - 22}" y="${y - 22}" width="74" height="44" rx="22" fill="none" stroke="${DG_C.r}" stroke-width="3"/>`;
    return s;
  };

  Object.assign(DIAG, {
    'm1-05:0': {
      alt: '빨대 10개를 한 묶음으로 묶고, 10개씩 묶음을 10, 20, 30, 40, 50으로 세어 묶음 5개가 50인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${Array.from({ length: 10 }, (_, i) => `<line class="ls${i}" y1="60" y2="150" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"/>`).join('')}
        <rect class="band" x="${BX[0] - 25}" y="98" width="50" height="14" rx="5" fill="${DG_C.c}"/>
        ${BX.slice(1).map((x, i) => `<g class="bd${i + 1}">${bundle(x, 60, 90, 40)}</g>`).join('')}
        ${BX.map((x, i) => `<g class="nm${i}"><rect x="${x - 30}" y="164" width="60" height="38" rx="19" fill="${i === 1 || i === 4 ? DG_C.b : '#f5f5f7'}"/>${T(x, 191, (i + 1) * 10, { s: 24, w: 800, f: i === 1 || i === 4 ? DG_C.d : DG_C.ink })}</g>`).join('')}
        <g class="res">${T(240, 246, '10개씩 묶음 5개 → 50', { s: 24, w: 800, f: DG_C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          // 흩어진 빨대 10개가 모여 한 묶음
          const m = dgEase(dgP(e, 400, 1100));
          for (let i = 0; i < 10; i++) {
            const x0 = 30 + i * 24, x1 = BX[0] - 20 + (40 / 9) * i, x = x0 + (x1 - x0) * m;
            q('.ls' + i).setAttribute('x1', x); q('.ls' + i).setAttribute('x2', x);
          }
          q('.band').setAttribute('opacity', e > 1600 ? 1 : 0);
          q('.nm0').setAttribute('opacity', e > 1900 ? 1 : 0);
          for (let i = 1; i < 5; i++) {
            const st = 2300 + (i - 1) * 750;
            q('.bd' + i).setAttribute('opacity', dgP(e, st, 300));
            q('.nm' + i).setAttribute('opacity', e > st + 350 ? 1 : 0);
          }
          q('.res').setAttribute('opacity', e > 5500 ? 1 : 0);
        });
      }
    },

    'm1-05:1': {
      alt: '10부터 100까지 몇십의 두 가지 읽는 법: 10 십·열, 20 이십·스물, 30 삼십·서른, 40 사십·마흔, 50 오십·쉰, 60 육십·예순, 70 칠십·일흔, 80 팔십·여든, 90 구십·아흔, 100 백',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img">${RD.map((_, k) => card(k)).join('')}
        <g class="lg"><circle cx="22" cy="320" r="7" fill="${DG_C.d}"/>${T(34, 326, '이십, 삼십… (수를 읽을 때)', { a: 'start', s: 17, f: DG_C.d })}
          <circle cx="252" cy="320" r="7" fill="${DG_C.c}"/>${T(264, 326, '스물, 서른… (개수를 셀 때)', { a: 'start', s: 17, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          RD.forEach((_, k) => q('.cd' + k).setAttribute('opacity', dgP(e, 200 + k * 450, 350)));
          q('.lg').setAttribute('opacity', dgP(e, 4800, 400));
        });
      }
    },

    'm1-05:2': {
      alt: '사탕 10개씩 묶음 3개와 낱개 6개를 세어, 묶음 수 3을 앞에, 낱개 수 6을 뒤에 써서 36(삼십육, 서른여섯)이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[0, 1, 2].map(i => `<g class="bg${i}">${bag(56 + i * 74)}</g>`).join('')}
        ${[0, 1, 2, 3, 4, 5].map(i => `<g class="cn${i}">${candy(306 + (i % 3) * 52, 80 + Math.floor(i / 3) * 40)}</g>`).join('')}
        <g class="l1">${T(130, 172, '묶음 3개', { s: 20, w: 800, f: DG_C.d })}</g>
        <g class="l2">${T(358, 172, '낱개 6개', { s: 20, w: 800, f: DG_C.c })}</g>
        <path class="a1" d="M150 182 Q190 196 200 210" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>
        <path class="a2" d="M338 182 Q290 196 280 210" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>
        <rect x="178" y="210" width="60" height="66" rx="12" fill="${DG_C.b}"/><rect x="242" y="210" width="60" height="66" rx="12" fill="${DG_C.a}"/>
        <text class="d1" x="208" y="258" text-anchor="middle" fill="${DG_C.d}" font-size="44" font-weight="800">3</text>
        <text class="d2" x="272" y="258" text-anchor="middle" fill="${DG_C.c}" font-size="44" font-weight="800">6</text>
        <g class="rd">${T(318, 238, '삼십육', { a: 'start', s: 20, w: 800 })}${T(318, 266, '서른여섯', { a: 'start', s: 20, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          [0, 1, 2].forEach(i => q('.bg' + i).setAttribute('opacity', dgP(e, 200 + i * 400, 300)));
          q('.l1').setAttribute('opacity', e > 1500 ? 1 : 0);
          [0, 1, 2, 3, 4, 5].forEach(i => q('.cn' + i).setAttribute('opacity', dgP(e, 1900 + i * 250, 250)));
          q('.l2').setAttribute('opacity', e > 3500 ? 1 : 0);
          const f1 = dgEase(dgP(e, 4000, 600)), f2 = dgEase(dgP(e, 4600, 600));
          q('.a1').setAttribute('opacity', f1 > 0 ? 1 : 0); q('.a2').setAttribute('opacity', f2 > 0 ? 1 : 0);
          q('.d1').setAttribute('opacity', f1); q('.d1').setAttribute('y', 258 - 20 * (1 - f1));
          q('.d2').setAttribute('opacity', f2); q('.d2').setAttribute('y', 258 - 20 * (1 - f2));
          q('.rd').setAttribute('opacity', e > 5500 ? 1 : 0);
        });
      }
    },

    'm1-05:3': {
      alt: '42와 51은 10개씩 묶음 4개와 5개를 비교해 42 < 51이고, 둘씩 짝을 지으면 6은 남는 것이 없어 짝수, 7은 하나가 남아 홀수인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${T(20, 68, '42', { a: 'start', s: 26, w: 800 })}<g class="n1">${smallNum(70, 60, 4, 2)}</g>
        ${T(20, 136, '51', { a: 'start', s: 26, w: 800 })}<g class="n2">${smallNum(70, 128, 5, 1)}</g>
        <g class="cmp"><rect x="70" y="30" width="${4 * 26 - 4}" height="56" rx="8" fill="none" stroke="${DG_C.c}" stroke-width="3"/>
          <rect x="70" y="98" width="${5 * 26 - 4}" height="56" rx="8" fill="none" stroke="${DG_C.c}" stroke-width="3"/>
          ${T(330, 92, '묶음 4 < 5', { s: 20, w: 800, f: DG_C.c })}${T(330, 128, '42 < 51', { s: 26, w: 800, f: DG_C.d })}</g>
        <line x1="20" y1="178" x2="460" y2="178" stroke="#e5e5ea" stroke-width="2"/>
        ${T(20, 226, '6', { a: 'start', s: 24, w: 800 })}${pairRow(218, 6, 'e')}<g class="ev">${T(400, 226, '짝수', { a: 'start', s: 22, w: 800, f: DG_C.r })}</g>
        ${T(20, 294, '7', { a: 'start', s: 24, w: 800 })}${pairRow(286, 7, 'o')}<g class="od">${T(400, 294, '홀수', { a: 'start', s: 22, w: 800, f: DG_C.c })}${T(366, 320, '하나 남아요', { s: 18, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          q('.n1').setAttribute('opacity', dgP(e, 100, 400)); q('.n2').setAttribute('opacity', dgP(e, 500, 400));
          q('.cmp').setAttribute('opacity', e > 1300 ? 1 : 0);
          for (let i = 0; i < 6; i++) q('.ed' + i).setAttribute('opacity', e > 2400 ? 1 : 0);
          for (let i = 0; i < 7; i++) q('.od' + i).setAttribute('opacity', e > 2400 ? 1 : 0);
          for (let p = 0; p < 3; p++) {
            q('.er' + p).setAttribute('opacity', e > 3000 + p * 500 ? 1 : 0);
            q('.or' + p).setAttribute('opacity', e > 3000 + p * 500 ? 1 : 0);
          }
          q('.ev').setAttribute('opacity', e > 4800 ? 1 : 0);
          q('.od').setAttribute('opacity', e > 5500 ? 1 : 0);
        });
      }
    },
  });
})();
