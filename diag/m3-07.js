/* 3학년 수학 · 물병에 물이 얼마나 들어갈까? (m3-07) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const cross = (x, y, w) => `<line x1="${x - w}" y1="${y + 2}" x2="${x + w}" y2="${y - 26}" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round"/>`;

  /* 0: 그릇 (1000mL = 160 높이) */
  const CT = 60, CB = 220, CH = 160;
  const jar = (x, cls) => {
    let t = '';
    for (let m = 100; m < 1000; m += 100) t += `<line x1="${x}" y1="${CB - CH * m / 1000}" x2="${x + (m % 500 ? 12 : 22)}" y2="${CB - CH * m / 1000}" stroke="${C.d}" stroke-width="2"/>`;
    return `<rect class="${cls}" x="${x}" y="${CB}" width="96" height="0" fill="${C.b}"/>
      ${t}<path d="M${x} ${CT - 6} V${CB} H${x + 96} V${CT - 6}" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="${x - 6}" y1="${CT}" x2="${x + 102}" y2="${CT}" stroke="${C.d}" stroke-width="2" stroke-dasharray="5 5"/>`;
  };

  /* 1: 사과·수박·트럭 */
  const apple = `<g transform="translate(70,104)"><circle r="30" fill="#ff3b30"/><path d="M0 -28 q4 -14 12 -18" fill="none" stroke="${C.r}" stroke-width="4" stroke-linecap="round"/></g>`;
  const melon = `<g transform="translate(240,100)"><ellipse rx="52" ry="44" fill="${C.r}"/>${[-30, -10, 10, 30].map(d => `<path d="M${d} -42 Q${d * 1.5} 0 ${d} 42" fill="none" stroke="#1e7b34" stroke-width="4"/>`).join('')}</g>`;
  const truck = `<g transform="translate(410,100)"><rect x="-62" y="-40" width="80" height="54" rx="6" fill="${C.b}" stroke="${C.d}" stroke-width="3"/><path d="M18 -22 h24 l18 18 v18 h-42 Z" fill="${C.d}"/><circle cx="-38" cy="20" r="11" fill="${C.ink}"/><circle cx="36" cy="20" r="11" fill="${C.ink}"/></g>`;

  /* 2·3: 두 단위 세로셈 */
  const U = [160, 300];
  const head = (a, b) => T(U[0], 46, a, { s: 20, f: C.sub, w: 700 }) + T(U[1], 46, b, { s: 20, f: C.sub, w: 700 });
  const rule = `<line x1="70" y1="190" x2="360" y2="190" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>`;

  Object.assign(DIAG, {
    'm3-07:0': {
      alt: '1L 그릇에 물이 가득 차면 1000mL이고, 여기에 300mL를 더하면 1L 300mL, 곧 1300mL가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${jar(40, 'w0')}${jar(196, 'w1')}
        ${T(168, 150, '+', { s: 30, f: C.sub })}
        ${T(88, 252, '1L', { s: 24, f: C.d, c: 'l0' })}${T(244, 252, '300mL', { s: 22, f: C.d, c: 'l1' })}
        <g class="res">${T(380, 130, '1L 300mL', { s: 24 })}${T(380, 170, '= 1300mL', { s: 24, f: C.c })}</g>
        <g class="u">${T(240, 290, '1L = 1000mL', { s: 22, f: C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          const a = dgEase(dgP(e, 300, 1500)), b = dgEase(dgP(e, 2400, 900));
          q('.w0').setAttribute('y', CB - CH * a); q('.w0').setAttribute('height', CH * a);
          q('.w1').setAttribute('y', CB - CH * 0.3 * b); q('.w1').setAttribute('height', CH * 0.3 * b);
          q('.l0').setAttribute('opacity', dgP(e, 1800, 300));
          q('.u').setAttribute('opacity', dgP(e, 1800, 300));
          q('.l1').setAttribute('opacity', dgP(e, 3300, 300));
          q('.res').setAttribute('opacity', dgP(e, 4200, 500));
        });
      }
    },

    'm3-07:1': {
      alt: '사과처럼 가벼운 것은 g, 수박은 kg, 트럭처럼 아주 무거운 것은 t으로 나타내고, 1kg=1000g, 1t=1000kg, 2kg 500g=2500g인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g class="i0">${apple}${T(70, 190, 'g', { s: 32, f: C.ink })}</g>
        <g class="i1">${melon}${T(240, 190, 'kg', { s: 32, f: C.ink })}</g>
        <g class="i2">${truck}${T(410, 190, 't', { s: 32, f: C.ink })}</g>
        <g class="r0"><path d="M90 200 Q155 236 214 200" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/><path d="M202 196 l12 4 l-6 11" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(152, 246, '1kg = 1000g', { s: 18, f: C.d })}</g>
        <g class="r1"><path d="M266 200 Q330 236 394 200" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/><path d="M382 196 l12 4 l-6 11" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(330, 246, '1t = 1000kg', { s: 18, f: C.c })}</g>
        <g class="ex">${T(240, 288, '2kg 500g = 2500g', { s: 22, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 300 + i * 900, 600));
            q('.i' + i).setAttribute('opacity', f);
            q('.i' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`);
          });
          q('.r0').setAttribute('opacity', dgP(e, 3000, 500));
          q('.r1').setAttribute('opacity', dgP(e, 3600, 500));
          q('.ex').setAttribute('opacity', dgP(e, 4400, 500));
        });
      }
    },

    'm3-07:2': {
      alt: '1L 300mL+2L 800mL 세로셈에서 mL끼리 더한 1100mL 중 1000mL를 1L로 올려 L 자리에 1을 더하면 4L 100mL가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${head('L', 'mL')}
        <g class="ca"><circle cx="${U[0]}" cy="82" r="15" fill="#fff" stroke="${C.c}" stroke-width="3"/>${T(U[0], 90, '1', { s: 20, f: C.c })}</g>
        ${T(U[0], 128, '1', { s: 30 })}${T(U[1], 128, '300', { s: 30 })}
        ${T(90, 174, '+', { s: 30 })}${T(U[0], 174, '2', { s: 30 })}${T(U[1], 174, '800', { s: 30 })}
        ${rule}
        ${T(U[1], 234, '1100', { s: 30, f: C.c, c: 'mid' })}
        <g class="ans">${T(U[0], 234, '4', { s: 30, f: C.d })}${T(U[1], 234, '100', { s: 30, f: C.d })}</g>
        <g class="nt">${T(240, 284, '1100mL = 1L 100mL', { s: 20, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.mid').setAttribute('opacity', e >= 700 && e < 2700 ? dgP(e, 700, 400) : 0);
          q('.nt').setAttribute('opacity', dgP(e, 1500, 400));
          const m = dgEase(dgP(e, 2200, 800));
          q('.ca').setAttribute('transform', `translate(${(U[1] - U[0]) * (1 - m)},${152 * (1 - m)})`);
          q('.ca').setAttribute('opacity', e >= 2200 ? 1 : 0);
          q('.ans').setAttribute('opacity', dgP(e, 3400, 500));
        });
      }
    },

    'm3-07:3': {
      alt: '3kg 200g−1kg 500g 세로셈에서 200g에서 500g을 뺄 수 없어 1kg을 1000g으로 바꿔 2kg 1200g으로 만들고 빼면 1kg 700g이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${head('kg', 'g')}
        <g class="bb">${T(U[0], 92, '2', { s: 24, f: C.c })}${T(U[1], 92, '1200', { s: 24, f: C.c })}${cross(U[0], 128, 12)}${cross(U[1], 128, 30)}</g>
        ${T(U[0], 128, '3', { s: 30 })}${T(U[1], 128, '200', { s: 30 })}
        ${T(90, 174, '−', { s: 30 })}${T(U[0], 174, '1', { s: 30 })}${T(U[1], 174, '500', { s: 30 })}
        ${rule}
        <g class="ans">${T(U[0], 234, '1', { s: 30, f: C.d })}${T(U[1], 234, '700', { s: 30, f: C.d })}</g>
        <g class="nt">${T(240, 284, '1kg = 1000g', { s: 20, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.nt').setAttribute('opacity', dgP(e, 900, 400));
          q('.bb').setAttribute('opacity', dgP(e, 1700, 600));
          q('.ans').setAttribute('opacity', dgP(e, 3200, 600));
        });
      }
    },
  });
})();
