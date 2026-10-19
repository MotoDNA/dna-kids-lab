/* 1학년 수학 · 두 자리 수, 어떻게 더하고 뺄까? (m1-06) */
(() => {
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const TX = 120, OX = 210, OPX = 52; // 십의 자리, 일의 자리, 기호 x
  const Y1 = 120, Y2 = 172, YL = 192, YA = 246;
  const frame = (op, a, b) => `
    <rect class="bt" x="${TX - 38}" y="46" width="76" height="222" rx="14" fill="${DG_C.a}" opacity=".0"/>
    <rect class="bo" x="${OX - 38}" y="46" width="76" height="222" rx="14" fill="${DG_C.b}" opacity=".0"/>
    ${T(TX, 32, '십의 자리', { s: 18, f: DG_C.c })}${T(OX, 32, '일의 자리', { s: 18, f: DG_C.d })}
    <text class="a1" x="${TX}" y="${Y1}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.ink}">${a[0]}</text>
    <text class="a0" x="${OX}" y="${Y1}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.ink}">${a[1]}</text>
    ${T(OPX, Y2, op, { s: 40, w: 800 })}
    ${T(TX, Y2, b[0], { s: 44, w: 800 })}${T(OX, Y2, b[1], { s: 44, w: 800 })}
    <line x1="30" y1="${YL}" x2="250" y2="${YL}" stroke="${DG_C.ink}" stroke-width="4" stroke-linecap="round"/>`;
  const show = (el, s, on) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', on ? 1 : 0));
  const band = (el, e, oStart, oEnd, tStart) => {
    el.querySelector('.bo').setAttribute('opacity', e > oStart && (e < oEnd) ? 1 : 0);
    el.querySelector('.bt').setAttribute('opacity', e > tStart && e < 1e9 ? 1 : 0);
  };

  Object.assign(DIAG, {
    'm1-06:0': {
      alt: '32 + 15를 세로셈으로 쓰고, 일의 자리 2 + 5 = 7, 십의 자리 3 + 1 = 4를 따로 계산해 47이 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">${frame('+', '32', '15')}
        <text class="r0" x="${OX}" y="${YA}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.d}">7</text>
        <text class="r1" x="${TX}" y="${YA}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.c}">4</text>
        <g class="n0">${T(280, 120, '일: 2 + 5 = 7', { a: 'start', s: 22, w: 800, f: DG_C.d })}</g>
        <g class="n1">${T(280, 170, '십: 3 + 1 = 4', { a: 'start', s: 22, w: 800, f: DG_C.c })}</g>
        <g class="n2">${T(280, 240, '답 47', { a: 'start', s: 26, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          el.querySelector('.bo').setAttribute('opacity', e > 600 && e < 2600 ? 1 : 0);
          el.querySelector('.bt').setAttribute('opacity', e > 2600 && e < 4400 ? 1 : 0);
          show(el, '.n0', e > 900); show(el, '.r0', e > 1700);
          show(el, '.n1', e > 2900); show(el, '.r1', e > 3700);
          show(el, '.n2', e > 4500);
        });
      }
    },

    'm1-06:1': {
      alt: '38 + 25 세로셈에서 일의 자리 8 + 5 = 13의 3을 쓰고 1을 십의 자리 위로 올린 뒤, 십의 자리 1 + 3 + 2 = 6을 계산해 63이 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">${frame('+', '38', '25')}
        <g class="cy"><rect x="-14" y="-24" width="28" height="30" rx="8" fill="#fff" stroke="#ff3b30" stroke-width="2.5"/>${T(0, 0, '1', { s: 24, w: 800, f: '#ff3b30' })}</g>
        <text class="r0" x="${OX}" y="${YA}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.d}">3</text>
        <text class="r1" x="${TX}" y="${YA}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.c}">6</text>
        <g class="n0">${T(276, 100, '8 + 5 = 13', { a: 'start', s: 22, w: 800, f: DG_C.d })}${T(276, 128, '3 쓰고 1 올림', { a: 'start', s: 18, f: '#ff3b30' })}</g>
        <g class="n1">${T(276, 180, '1 + 3 + 2 = 6', { a: 'start', s: 22, w: 800, f: DG_C.c })}</g>
        <g class="n2">${T(276, 244, '답 63', { a: 'start', s: 26, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          q('.bo').setAttribute('opacity', e > 500 && e < 3200 ? 1 : 0);
          q('.bt').setAttribute('opacity', e > 3300 && e < 5400 ? 1 : 0);
          show(el, '.n0', e > 800); show(el, '.r0', e > 1600);
          // 13의 1이 일의 자리 답 옆에서 십의 자리 위로 올라감
          const m = dgEase(dgP(e, 2000, 1100));
          const x = (OX - 40) + (TX - (OX - 40)) * m, y = (YA - 4) + (80 - (YA - 4)) * m - 30 * Math.sin(Math.PI * m);
          q('.cy').setAttribute('transform', `translate(${x},${y})`);
          q('.cy').setAttribute('opacity', e > 1900 ? 1 : 0);
          show(el, '.n1', e > 3600); show(el, '.r1', e > 4400);
          show(el, '.n2', e > 5500);
        });
      }
    },

    'm1-06:2': {
      alt: '52 − 27 세로셈에서 일의 자리 2에서 7을 뺄 수 없어 십의 자리에서 10을 빌려 12 − 7 = 5, 십의 자리는 5가 4가 되어 4 − 2 = 2, 답 25가 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">${frame('−', '52', '27')}
        <line class="x1" x1="${TX - 18}" y1="${Y1 + 4}" x2="${TX + 18}" y2="${Y1 - 34}" stroke="#ff3b30" stroke-width="4" stroke-linecap="round"/>
        <g class="b4">${T(TX, 80, '4', { s: 24, w: 800, f: '#ff3b30' })}</g>
        <g class="b10"><rect x="-22" y="-24" width="44" height="30" rx="8" fill="#fff" stroke="#ff3b30" stroke-width="2.5"/>${T(0, 0, '10', { s: 22, w: 800, f: '#ff3b30' })}</g>
        <text class="r0" x="${OX}" y="${YA}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.d}">5</text>
        <text class="r1" x="${TX}" y="${YA}" text-anchor="middle" font-size="44" font-weight="800" fill="${DG_C.c}">2</text>
        <g class="n0">${T(276, 82, '2에서 7을 뺄 수 없어요', { a: 'start', s: 18, w: 800, f: '#ff3b30' })}</g>
        <g class="n1">${T(276, 126, '10 빌려 오기', { a: 'start', s: 20, w: 800, f: '#ff3b30' })}</g>
        <g class="n2">${T(276, 170, '12 − 7 = 5', { a: 'start', s: 22, w: 800, f: DG_C.d })}</g>
        <g class="n3">${T(276, 210, '4 − 2 = 2', { a: 'start', s: 22, w: 800, f: DG_C.c })}</g>
        <g class="n4">${T(276, 254, '답 25', { a: 'start', s: 26, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7600, e => {
          q('.bo').setAttribute('opacity', e > 500 && e < 4400 ? 1 : 0);
          q('.bt').setAttribute('opacity', e > 4500 && e < 6400 ? 1 : 0);
          show(el, '.n0', e > 700);
          show(el, '.x1', e > 1800); show(el, '.b4', e > 1800); show(el, '.n1', e > 1800);
          const m = dgEase(dgP(e, 2200, 1000));
          q('.b10').setAttribute('transform', `translate(${TX + (OX - TX) * m},${80 - 24 * Math.sin(Math.PI * m)})`);
          q('.b10').setAttribute('opacity', e > 2200 ? 1 : 0);
          show(el, '.n2', e > 3400); show(el, '.r0', e > 3900);
          show(el, '.n3', e > 4800); show(el, '.r1', e > 5500);
          show(el, '.n4', e > 6600);
        });
      }
    },

    'm1-06:3': {
      alt: '수 카드 25, 27, 52를 세모 모양으로 놓고, 25 + 27 = 52 덧셈식에서 52 − 27 = 25, 52 − 25 = 27 뺄셈식 두 개를 만드는 그림',
      svg: (() => {
        const cardc = (x, y, n, f, s) => `<rect x="${x - 40}" y="${y - 28}" width="80" height="56" rx="14" fill="${f}" stroke="${s}" stroke-width="3"/>${T(x, y + 11, n, { s: 30, w: 800, f: s })}`;
        const B = DG_C.d, G = DG_C.r, O = DG_C.c;
        const sp = (n, c) => `<tspan fill="${c}">${n}</tspan>`;
        return `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
          <path d="M120 80 L54 200 L186 200 Z" fill="none" stroke="#d2d2d7" stroke-width="4" stroke-linejoin="round"/>
          ${cardc(120, 72, '52', DG_C.a, O)}${cardc(54, 204, '25', DG_C.b, B)}${cardc(186, 204, '27', '#d6efdc', G)}
          <text class="e0" x="250" y="88" font-size="26" font-weight="800" fill="${DG_C.ink}">${sp(25, B)} + ${sp(27, G)} = ${sp(52, O)}</text>
          <g class="ar">${T(316, 132, '↓ 바꿔 쓰기', { s: 18, f: DG_C.sub })}</g>
          <text class="e1" x="250" y="184" font-size="26" font-weight="800" fill="${DG_C.ink}">${sp(52, O)} − ${sp(27, G)} = ${sp(25, B)}</text>
          <text class="e2" x="250" y="236" font-size="26" font-weight="800" fill="${DG_C.ink}">${sp(52, O)} − ${sp(25, B)} = ${sp(27, G)}</text>
        </svg>`;
      })(),
      play(el) {
        dgAnim(el, 4600, e => {
          show(el, '.e0', e > 600); show(el, '.ar', e > 1700);
          show(el, '.e1', e > 2300); show(el, '.e2', e > 3400);
        });
      }
    },
  });
})();
