/* 4학년 수학 · 만보다 큰 수는 어떻게 읽고 쓸까? (m4-01) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;

  /* 0: 1000 × 10 */
  const BX = i => 32 + (i % 5) * 80, BY = i => 52 + Math.floor(i / 5) * 48;

  /* 1: 자릿값 표 */
  const PV = ['만', '천', '백', '십', '일'], DG1 = '35274', VAL = ['30000', '5000', '200', '70', '4'];
  const PX = i => 72 + i * 84;

  /* 2: 520340000 네 자리씩 */
  const N2 = '520340000';
  const DX2 = i => { const fromR = 8 - i; const grp = Math.floor(fromR / 4); return 432 - fromR * 34 - grp * 28; };

  /* 3: 뛰어 세기 */
  const R1 = ['25000', '35000', '45000', '55000'];
  const R2 = [['1억 ', '9', '000만'], ['', '2', '억'], ['2억 ', '1', '000만']];

  /* 4: 크기 비교 */
  const A4 = '572031', B4 = '571999', P4 = ['십만', '만', '천', '백', '십', '일'];
  const CX4 = i => 110 + i * 56;

  Object.assign(DIAG, {
    'm4-01:0': {
      alt: '1000이 적힌 지폐 10장을 모으면 10000(만)이 되고, 10000은 100이 100개, 10이 1000개인 수라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${Array.from({ length: 10 }, (_, i) => `<g class="b b${i}"><rect x="${BX(i)}" y="${BY(i)}" width="70" height="38" rx="6" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>${T(BX(i) + 35, BY(i) + 26, '1000', { s: 18, f: C.d })}</g>`).join('')}
        ${T(240, 168, '', { c: 'cnt', s: 22, f: C.d })}
        <g class="big">
          <path d="M240 148 v18 m-8 -8 l8 8 l8 -8" fill="none" stroke="${C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="130" y="178" width="220" height="56" rx="8" fill="${C.a}" stroke="${C.c}" stroke-width="3"/>
          ${T(240, 216, '10000 = 만', { s: 26, f: C.c })}
        </g>
        <g class="oth">${T(240, 274, '= 100이 100개 = 10이 1000개', { s: 18, f: C.sub, w: 700 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          let n = 0;
          for (let i = 0; i < 10; i++) {
            const st = 300 + i * 320, f = dgEase(dgP(e, st, 300));
            if (e >= st) n = i + 1;
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(0,${-10 * (1 - f)})`);
          }
          q('.cnt').textContent = n > 0 && e < 3900 ? `1000이 ${n}개` : '';
          q('.big').setAttribute('opacity', dgP(e, 3900, 600));
          q('.oth').setAttribute('opacity', dgP(e, 5000, 600));
        });
      }
    },

    'm4-01:1': {
      alt: '만·천·백·십·일 자릿값 표에 3, 5, 2, 7, 4를 넣으면 35274이고, 각 숫자는 30000, 5000, 200, 70, 4를 나타내며 삼만 오천이백칠십사로 읽는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,10)">
        ${PV.map((p, i) => `<rect x="${PX(i) - 40}" y="40" width="80" height="34" fill="${i % 2 ? '#f5f5f7' : C.b}" stroke="#d2d2d7" stroke-width="2"/>${T(PX(i), 64, p + (p === '일' ? '' : ''), { s: 20, f: C.ink })}
          <rect x="${PX(i) - 40}" y="74" width="80" height="70" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>`).join('')}
        ${[...DG1].map((d, i) => `<g class="cd cd${i}"><rect x="${PX(i) - 24}" y="84" width="48" height="52" rx="8" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>${T(PX(i), 122, d, { s: 32, f: C.ink })}</g>`).join('')}
        ${VAL.map((v, i) => T(PX(i), 180, v, { s: 20, f: C.d, c: 'v' + i })).join('')}
        <g class="rd">${T(240, 236, '35274', { s: 28 })}${T(240, 274, '삼만 오천이백칠십사', { s: 22, f: C.c })}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          for (let i = 0; i < 5; i++) {
            const f = dgEase(dgP(e, 300 + i * 500, 450));
            q('.cd' + i).setAttribute('opacity', f);
            q('.cd' + i).setAttribute('transform', `translate(0,${-40 * (1 - f)})`);
            q('.v' + i).setAttribute('opacity', dgP(e, 3000 + i * 300, 300));
          }
          q('.rd').setAttribute('opacity', dgP(e, 4800, 600));
        });
      }
    },

    'm4-01:2': {
      alt: '520340000을 일의 자리부터 네 자리씩 끊으면 5 | 2034 | 0000이 되고, 끊은 곳에 억과 만을 붙여 5억 2034만(오억 이천삼십사만)으로 읽는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="gb">
          <rect x="${DX2(0) - 22}" y="104" width="44" height="58" rx="10" fill="${C.a}" opacity=".7"/>
          <rect x="${DX2(1) - 22}" y="104" width="${DX2(4) - DX2(1) + 44}" height="58" rx="10" fill="${C.b}" opacity=".7"/>
        </g>
        ${[...N2].map((d, i) => T(DX2(i), 146, d, { s: 34 })).join('')}
        ${[1, 5].map((i, k) => `<line class="cut${k}" x1="${(DX2(i) + DX2(i - 1)) / 2}" y1="96" x2="${(DX2(i) + DX2(i - 1)) / 2}" y2="170" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>`).join('')}
        <g class="cnt" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round">
          ${[[5, 8], [1, 4]].map(([a, b], k) => `<path class="br${k}" d="M${DX2(a) - 14} 180 q0 10 10 10 H${DX2(b) + 4} q10 0 10 -10"/>`).join('')}
        </g>
        ${T((DX2(5) + DX2(8)) / 2, 214, '네 자리', { s: 18, f: C.sub, w: 700, c: 'n0' })}
        ${T((DX2(1) + DX2(4)) / 2, 214, '네 자리', { s: 18, f: C.sub, w: 700, c: 'n1' })}
        <g class="u1">${T((DX2(1) + DX2(4)) / 2, 82, '만', { s: 24, f: C.d })}</g>
        <g class="u2">${T(DX2(0), 82, '억', { s: 24, f: C.c })}</g>
        <g class="rd">${T(240, 254, '5억 2034만', { s: 26 })}${T(240, 284, '오억 이천삼십사만', { s: 20, f: C.sub, w: 700 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          const op = (c, v) => q(c).setAttribute('opacity', v);
          op('.br0', dgP(e, 600, 400)); op('.n0', dgP(e, 600, 400)); op('.cut1', dgP(e, 1200, 300)); op('.u1', dgP(e, 2900, 400));
          op('.br1', dgP(e, 1800, 400)); op('.n1', dgP(e, 1800, 400)); op('.cut0', dgP(e, 2400, 300)); op('.u2', dgP(e, 3300, 400));
          op('.gb', dgP(e, 3600, 500));
          op('.rd', dgP(e, 4500, 600));
          // 다 끊고 나면 '네 자리' 표시는 그대로 둠
        });
      }
    },

    'm4-01:3': {
      alt: '25000, 35000, 45000, 55000처럼 만의 자리 숫자가 1씩 커지면 10000씩 뛰어 센 것이고, 1억 9000만 다음 2억, 2억 1000만처럼 1000만씩 뛰어 세면 9 다음에 윗자리로 1이 올라가는 수직선 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <line x1="24" y1="104" x2="456" y2="104" stroke="${C.ink}" stroke-width="3"/>
        ${R1.map((n, i) => { const x = 60 + i * 120; return `<line x1="${x}" y1="94" x2="${x}" y2="114" stroke="${C.ink}" stroke-width="3"/>
          <g class="p1 p1${i}">${T(x, 142, `<tspan fill="${C.c}">${n[0]}</tspan>${n.slice(1)}`, { s: 22 })}</g>`; }).join('')}
        ${[0, 1, 2].map(i => { const x = 60 + i * 120; return `<g class="j1 j1${i}"><path d="M${x + 4} 96 Q${x + 60} 46 ${x + 116} 96" fill="none" stroke="${C.d}" stroke-width="3"/><path d="M${x + 104} 88 l12 8 l-2 -14" fill="none" stroke="${C.d}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          ${T(x + 60, 58, '+10000', { s: 18, f: C.d })}</g>`; }).join('')}
        <line x1="24" y1="236" x2="456" y2="236" stroke="${C.ink}" stroke-width="3"/>
        ${R2.map((n, i) => { const x = 90 + i * 150; return `<line x1="${x}" y1="226" x2="${x}" y2="246" stroke="${C.ink}" stroke-width="3"/>
          <g class="p2 p2${i}">${T(x, 274, `${n[0]}<tspan fill="${C.c}">${n[1]}</tspan>${n[2]}`, { s: 20 })}</g>`; }).join('')}
        ${[0, 1].map(i => { const x = 90 + i * 150; return `<g class="j2 j2${i}"><path d="M${x + 4} 228 Q${x + 75} 178 ${x + 146} 228" fill="none" stroke="${C.r}" stroke-width="3"/><path d="M${x + 134} 220 l12 8 l-2 -14" fill="none" stroke="${C.r}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          ${T(x + 75, 192, '+1000만', { s: 18, f: C.r })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6600, e => {
          q('.p10').setAttribute('opacity', dgP(e, 200, 300));
          for (let i = 0; i < 3; i++) {
            q('.j1' + i).setAttribute('opacity', dgP(e, 600 + i * 800, 400));
            q('.p1' + (i + 1)).setAttribute('opacity', dgP(e, 900 + i * 800, 300));
          }
          q('.p20').setAttribute('opacity', dgP(e, 3600, 300));
          for (let i = 0; i < 2; i++) {
            q('.j2' + i).setAttribute('opacity', dgP(e, 4000 + i * 1000, 400));
            q('.p2' + (i + 1)).setAttribute('opacity', dgP(e, 4300 + i * 1000, 300));
          }
        });
      }
    },

    'm4-01:4': {
      alt: '572031과 571999를 자리를 맞춰 위아래로 쓰고 높은 자리부터 비교하면 십만, 만의 자리는 같고 천의 자리에서 2가 1보다 커서 572031이 더 큰 수인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <rect class="hl" y="44" width="48" height="146" rx="12" fill="${C.b}" opacity="0"/>
        ${P4.map((p, i) => T(CX4(i), 68, p, { s: 18, f: C.sub, w: 700 })).join('')}
        ${[...A4].map((d, i) => T(CX4(i), 122, d, { s: 34, c: 'a' + i })).join('')}
        ${[...B4].map((d, i) => T(CX4(i), 174, d, { s: 34, c: 'b' + i })).join('')}
        ${[0, 1].map(i => `<path class="ok${i}" d="M${CX4(i) - 10} 208 l7 7 l13 -15" fill="none" stroke="${C.r}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        <g class="df"><circle cx="${CX4(2)}" cy="111" r="23" fill="none" stroke="${C.c}" stroke-width="3.5"/><circle cx="${CX4(2)}" cy="163" r="23" fill="none" stroke="${C.c}" stroke-width="3.5"/>
          ${T(CX4(2), 222, '2 > 1', { s: 20, f: C.c })}</g>
        <g class="res">${T(240, 272, '572031 > 571999', { s: 28, f: C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          let col = -1;
          for (let i = 0; i < 3; i++) if (e >= 500 + i * 1000 && e < 1500 + i * 1000 + (i === 2 ? 1300 : 0)) col = i;
          q('.hl').setAttribute('x', CX4(Math.max(col, 0)) - 24);
          q('.hl').setAttribute('opacity', col >= 0 ? 0.6 : 0);
          q('.ok0').setAttribute('opacity', e >= 1000 ? 1 : 0);
          q('.ok1').setAttribute('opacity', e >= 2000 ? 1 : 0);
          q('.df').setAttribute('opacity', dgP(e, 3000, 400));
          q('.res').setAttribute('opacity', dgP(e, 4200, 500));
        });
      }
    },
  });
})();
