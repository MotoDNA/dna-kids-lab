/* 1학년 영어 · N부터 Z까지, 알파벳 끝까지 가 볼까? (e1-02) */
(() => {
  const AM = 'ABCDEFGHIJKLM'.split(''), NZ = 'NOPQRSTUVWXYZ'.split('');
  const BW = 32, BG = 3, BX = (480 - (13 * BW + 12 * BG)) / 2;
  const blk = (x, y, ch, fill, stroke, col) => `<rect x="${x}" y="${y}" width="${BW}" height="38" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/><text x="${x + BW / 2}" y="${y + 27}" text-anchor="middle" fill="${col}" font-size="22" font-weight="800">${ch}</text>`;

  /* 1: N~T 이름 */
  const N1 = [['N', '엔'], ['O', '오'], ['P', '피'], ['Q', '큐'], ['R', '알'], ['S', '에스'], ['T', '티']];
  const C1 = i => 12 + i * 66 + 30;
  /* 2: U~Z 이름 */
  const N2 = [['U', '유'], ['V', '브이'], ['W', '더블유'], ['X', '엑스'], ['Y', '와이'], ['Z', '지']];
  const C2 = i => 10 + i * 78 + 35;

  /* 3: 알파벳 노래 묶음 */
  const SG = [
    { y: 82, x0: 120, sp: 40, s: 'ABCDEFG' },
    { y: 146, x0: 72, sp: 40, s: 'HIJK' },
    { y: 146, x0: 260, sp: 28, s: 'LMNOP', fast: 1 },
    { y: 210, x0: 120, sp: 40, s: 'QRS' },
    { y: 210, x0: 280, sp: 40, s: 'TUV' },
    { y: 274, x0: 125, sp: 40, s: 'WX' },
    { y: 274, x0: 245, sp: 0, s: 'Y and Z', w: 150 },
  ];
  const grpW = g => g.w || (g.s.length - 1) * g.sp + 40;

  Object.assign(DIAG, {
    'e1-02:0': {
      alt: '앞에서 배운 A부터 M까지 다음에 N부터 Z까지 13개 글자가 하나씩 놓이고, Z가 맨 마지막 글자인 그림',
      svg: `<svg viewBox="0 0 480 236" class="dg-svg" role="img">
        ${AM.map((c, i) => blk(BX + i * (BW + BG), 46, c, '#f5f5f7', '#d2d2d7', '#aeaeb2')).join('')}
        ${NZ.map((c, i) => `<g class="b${i}">${blk(BX + i * (BW + BG), 112, c, i === 12 ? DG_C.a : DG_C.b, i === 12 ? DG_C.c : DG_C.d, DG_C.ink)}
          <text x="${BX + i * (BW + BG) + BW / 2}" y="176" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="600">${i + 1}</text></g>`).join('')}
        <path class="nx" d="M${BX + 12 * (BW + BG) + BW / 2} 88 C ${BX + 12 * (BW + BG) + 30} 98, ${BX + 30} 96, ${BX + BW / 2} 108" fill="none" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="5 5"/>
        <g class="tot"><text x="${BX + 4}" y="220" fill="${DG_C.d}" font-size="22" font-weight="800">N~Z 13개</text>
          <text x="${BX + 12 * (BW + BG) + BW}" y="220" text-anchor="end" fill="${DG_C.c}" font-size="22" font-weight="800">Z가 마지막!</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          q('.nx').setAttribute('opacity', e > 200 ? 1 : 0);
          NZ.forEach((c, i) => {
            const f = dgEase(dgP(e, 500 + i * 330, 300));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`);
          });
          q('.tot').setAttribute('opacity', e > 5200 ? 1 : 0);
        });
      }
    },

    'e1-02:1': {
      alt: 'N 엔, O 오, P 피, Q 큐, R 알, S 에스, T 티 글자 이름과 P로 시작하는 pig, S로 시작하는 sun을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${N1.map(([L, n], i) => `<g class="c${i}">
          <rect x="${C1(i) - 30}" y="44" width="60" height="70" rx="12" fill="${i === 4 ? DG_C.a : DG_C.b}"/>
          <text x="${C1(i)}" y="94" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="800">${L}</text>
          <text x="${C1(i)}" y="146" text-anchor="middle" fill="${i === 4 ? DG_C.c : DG_C.sub}" font-size="20" font-weight="700">${n}</text></g>`).join('')}
        ${[[2, 'p', 'ig'], [5, 's', 'un']].map(([i, f, r], k) => `<g class="w${k}">
          <line x1="${C1(i)}" y1="160" x2="${C1(i)}" y2="186" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="4 4"/>
          <text x="${C1(i)}" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800"><tspan fill="${DG_C.d}">${f}</tspan>${r}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          N1.forEach((_, i) => q('.c' + i).setAttribute('opacity', dgEase(dgP(e, 200 + i * 500, 400))));
          q('.w0').setAttribute('opacity', e > 4000 ? 1 : 0);
          q('.w1').setAttribute('opacity', e > 4700 ? 1 : 0);
        });
      }
    },

    'e1-02:2': {
      alt: 'U 유, V 브이, W 더블유, X 엑스, Y 와이, Z 지 글자 이름과 x가 끝에 있는 fox, Z로 시작하는 zebra를 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${N2.map(([L, n], i) => `<g class="c${i}">
          <rect x="${C2(i) - 33}" y="44" width="66" height="70" rx="12" fill="${i === 2 ? DG_C.a : DG_C.b}"/>
          <text x="${C2(i)}" y="94" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="800">${L}</text>
          <text x="${C2(i)}" y="146" text-anchor="middle" fill="${i === 2 ? DG_C.c : DG_C.sub}" font-size="20" font-weight="700">${n}</text></g>`).join('')}
        <g class="w0">
          <line x1="${C2(3)}" y1="160" x2="${C2(3)}" y2="186" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="4 4"/>
          <text x="${C2(3)}" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">fo<tspan fill="${DG_C.d}">x</tspan></text>
          <text x="${C2(3) - 52}" y="225" text-anchor="end" fill="${DG_C.sub}" font-size="18" font-weight="700">끝에 x</text></g>
        <g class="w1">
          <line x1="${C2(5)}" y1="160" x2="${C2(5)}" y2="186" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="4 4"/>
          <text x="${C2(5) - 10}" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800"><tspan fill="${DG_C.d}">z</tspan>ebra</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          N2.forEach((_, i) => q('.c' + i).setAttribute('opacity', dgEase(dgP(e, 200 + i * 500, 400))));
          q('.w0').setAttribute('opacity', e > 3600 ? 1 : 0);
          q('.w1').setAttribute('opacity', e > 4300 ? 1 : 0);
        });
      }
    },

    'e1-02:3': {
      alt: '알파벳 노래처럼 A부터 G, H I J K, 빨리 지나가니 천천히 짚는 L M N O P, Q R S, T U V, W X, Y and Z로 묶어 차례로 짚는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${SG.map((g, k) => `<g class="g${k}">
          <rect class="bx${k}" x="${g.x0 - 20}" y="${g.y - 34}" width="${grpW(g)}" height="46" rx="14" fill="#f5f5f7"/>
          ${g.sp ? g.s.split('').map((c, i) => `<text x="${g.x0 + i * g.sp}" y="${g.y}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${c}</text>`).join('')
          : `<text x="${g.x0 - 20 + g.w / 2}" y="${g.y}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">Y <tspan fill="${DG_C.sub}" font-size="22" font-weight="700">and</tspan> Z</text>`}
        </g>`).join('')}
        <text class="fast" x="${SG[2].x0 + 4 * SG[2].sp + 26}" y="${SG[2].y - 4}" text-anchor="start" fill="${DG_C.c}" font-size="18" font-weight="800" opacity="0">천천히!</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const st = [300, 1300, 2100, 2800, 3600, 4400, 5100];
        dgAnim(el, 6200, e => {
          SG.forEach((g, k) => {
            const on = e > st[k], cur = on && (k === SG.length - 1 ? true : e <= st[k + 1]);
            q('.g' + k).setAttribute('opacity', on ? 1 : 0.25);
            q('.bx' + k).setAttribute('fill', g.fast && on ? DG_C.a : cur ? DG_C.b : on ? '#e8f1fd' : '#f5f5f7');
          });
          q('.fast').setAttribute('opacity', e > st[2] ? 1 : 0);
          if (e >= 6200) SG.forEach((g, k) => q('.bx' + k).setAttribute('fill', g.fast ? DG_C.a : DG_C.b));
        });
      }
    },
  });
})();
