/* 3학년 과학 · 동물은 어떻게 태어나고 자랄까? (s3-06) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  // 원 위의 호 + 화살촉 (각도: 시계 방향, 0 = 위쪽)
  const R_ = Math.PI / 180;
  const cpt = (cx, cy, r, a) => [cx + r * Math.sin(a * R_), cy - r * Math.cos(a * R_)];
  const carc = (cx, cy, r, a0, a1) => {
    const [x0, y0] = cpt(cx, cy, r, a0), [x1, y1] = cpt(cx, cy, r, a1);
    const [hx0, hy0] = cpt(cx, cy, r + 9, a1 - 7), [hx1, hy1] = cpt(cx, cy, r - 9, a1 - 7);
    return `M${f2(x0)} ${f2(y0)} A${r} ${r} 0 0 1 ${f2(x1)} ${f2(y1)} M${f2(hx0)} ${f2(hy0)} L${f2(x1)} ${f2(y1)} L${f2(hx1)} ${f2(hy1)}`;
  };
  const YEL = '#fff3b0', GRN = '#d6efdc';
  /* 닭 그림 (중심 0,0) */
  const egg = s => `<ellipse rx="${16 * s}" ry="${21 * s}" fill="#fff" stroke="${DG_C.c}" stroke-width="3"/>`;
  const chick = s => `<g transform="scale(${s})"><circle cx="0" cy="6" r="18" fill="${YEL}" stroke="${DG_C.c}" stroke-width="3"/><circle cx="10" cy="-16" r="11" fill="${YEL}" stroke="${DG_C.c}" stroke-width="3"/><path d="M20 -17 l8 3 l-8 3 Z" fill="${DG_C.c}"/><circle cx="12" cy="-18" r="2" fill="${DG_C.ink}"/><path d="M-4 24 v7 M6 24 v7" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/></g>`;
  const hen = s => `<g transform="scale(${s})"><path d="M-30 4 Q-34 -22 -18 -20 Q-4 -6 10 -6 L16 -26 Q22 -34 30 -26 L30 -6 Q32 26 0 28 Q-28 28 -30 4 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/><path d="M18 -32 q3 -8 6 -2 q3 -8 6 0" fill="#ff3b30" stroke="#ff3b30" stroke-width="3" stroke-linejoin="round"/><path d="M30 -20 l9 3 l-9 4 Z" fill="${DG_C.c}"/><circle cx="23" cy="-21" r="2.2" fill="${DG_C.ink}"/><path d="M-6 28 v10 M8 28 v10" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/></g>`;

  /* 배추흰나비 그림 (중심 0,0) */
  const BF = [
    { n: '알', g: `<path d="M-50 22 Q-10 -30 50 6 Q10 40 -50 22 Z" fill="${GRN}" stroke="${DG_C.r}" stroke-width="3"/><path d="M0 -14 q6 0 6 9 q0 8 -6 8 q-6 0 -6 -8 q0 -9 6 -9 Z" fill="#ffe08a" stroke="${DG_C.c}" stroke-width="2.5"/>` },
    { n: '애벌레', g: `<path d="M-50 22 Q-10 -12 50 18 Q10 40 -50 22 Z" fill="${GRN}" stroke="${DG_C.r}" stroke-width="3"/>${[-30, -18, -6, 6, 18].map((x, i) => `<circle cx="${x}" cy="${2 - Math.sin(i) * 3}" r="8" fill="#7cc576" stroke="${DG_C.r}" stroke-width="2.5"/>`).join('')}<circle cx="31" cy="-1" r="9" fill="#7cc576" stroke="${DG_C.r}" stroke-width="2.5"/><circle cx="34" cy="-3" r="1.8" fill="${DG_C.ink}"/>` },
    { n: '번데기', g: `<path d="M-34 -30 h68" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/><path d="M0 -30 L10 -16 L8 4 L14 12 L0 34 L-10 14 L-8 -6 L-12 -16 Z" fill="#c9e3b4" stroke="${DG_C.r}" stroke-width="3" stroke-linejoin="round"/><path d="M-4 -26 L-6 -30 M4 -26 L6 -30" stroke="${DG_C.sub}" stroke-width="2"/>` },
    { n: '어른벌레', g: `<path d="M0 -4 C-14 -38 -50 -34 -44 -8 C-40 4 -18 6 0 0 Z M0 -4 C14 -38 50 -34 44 -8 C40 4 18 6 0 0 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/><path d="M0 2 C-10 4 -36 10 -28 26 C-20 34 -6 20 0 6 Z M0 2 C10 4 36 10 28 26 C20 34 6 20 0 6 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/><circle cx="-26" cy="-14" r="4" fill="${DG_C.ink}"/><circle cx="26" cy="-14" r="4" fill="${DG_C.ink}"/><path d="M-40 -28 l6 6 M40 -28 l-6 6" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round"/><rect x="-3" y="-14" width="6" height="34" rx="3" fill="${DG_C.ink}"/><path d="M-1 -14 q-6 -12 -12 -14 M1 -14 q6 -12 12 -14" stroke="${DG_C.ink}" stroke-width="2" fill="none"/>` },
  ];

  /* 2: 탈바꿈 비교 */
  const ST = ['알', '애벌레', '번데기', '어른벌레'], BW = 92, GAP = 26, BX = i => 17 + i * (BW + GAP);

  /* 3: 알 / 새끼 */
  const EGG = ['닭', '개구리', '거북', '물고기'], BABY = ['개', '고양이', '소', '사람'];
  const SRC = [...EGG.map((n, i) => ({ n, k: 0, i })), ...BABY.map((n, i) => ({ n, k: 1, i }))];
  const MIX = [4, 0, 6, 2, 5, 1, 7, 3]; // 섞인 처음 순서
  const home = (k, i) => ({ x: (k ? 360 : 120) + (i % 2 ? 54 : -54), y: 176 + Math.floor(i / 2) * 56 });

  Object.assign(DIAG, {
    's3-06:0': {
      alt: '닭의 한살이: 알에서 병아리가 태어나 자라서 닭이 되고, 닭이 다시 알을 낳는 과정이 둥글게 이어지는 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        <text x="240" y="186" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">한살이</text>
        <g class="n0" transform="translate(240,62)">${egg(1.1)}</g>
        <g class="n1" transform="translate(350,232)">${chick(1.2)}</g>
        <g class="n2" transform="translate(128,234)">${hen(1.15)}</g>
        <text class="l0" x="272" y="70" fill="${DG_C.ink}" font-size="22" font-weight="800">알</text>
        <text class="l1" x="380" y="304" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">병아리</text>
        <text class="l2" x="100" y="304" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">닭</text>
        <path class="c0" d="" fill="none" stroke="${DG_C.d}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="c1" d="" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="c2" d="" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="t0" x="384" y="104" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">태어나요</text>
        <text class="t1" x="240" y="330" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">자라요</text>
        <text class="t2" x="96" y="104" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">알을 낳아요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const SEG = [[32, 92], [152, 208], [268, 328]];
        dgAnim(el, 6000, e => {
          for (let i = 0; i < 3; i++) {
            const st = 300 + i * 1700;
            const node = q('.n' + i), lab = q('.l' + i);
            node.setAttribute('opacity', dgP(e, st, 500)); lab.setAttribute('opacity', dgP(e, st, 500));
            const f = dgEase(dgP(e, st + 600, 900)), [a0, a1] = SEG[i];
            q('.c' + i).setAttribute('d', f > 0 ? carc(240, 178, 120, a0, a0 + (a1 - a0) * f) : '');
            q('.t' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
          }
        });
      }
    },

    's3-06:1': {
      alt: '배추흰나비는 배추 잎 뒷면의 알에서 애벌레가 나와 잎을 먹고 자라고, 번데기를 거쳐 어른벌레인 나비가 되며, 나비가 다시 알을 낳는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${BF.map((b, i) => `<g class="b${i}"><g transform="translate(${60 + i * 120},112) scale(.82)">${b.g}</g>
          <text x="${60 + i * 120}" y="182" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${b.n}</text></g>
          ${i < 3 ? `<path class="ar${i}" d="${arw(104 + i * 120, 112, 136 + i * 120, 112)}" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`).join('')}
        <path class="back" d="M420 196 Q420 238 340 238 H140 Q60 238 60 200 M50 210 L60 198 L70 210" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="backt" x="240" y="230" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800" stroke="#fff" stroke-width="8" paint-order="stroke">다시 알을 낳아요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          BF.forEach((b, i) => {
            const st = 200 + i * 1250;
            q('.b' + i).setAttribute('opacity', dgP(e, st, 500));
            if (i < 3) q('.ar' + i).setAttribute('opacity', e > st + 800 ? 1 : 0);
          });
          q('.back').setAttribute('opacity', dgP(e, 5200, 500));
          q('.backt').setAttribute('opacity', dgP(e, 5200, 500));
        });
      }
    },

    's3-06:2': {
      alt: '완전 탈바꿈은 알, 애벌레, 번데기, 어른벌레 순서로 자라고, 불완전 탈바꿈은 번데기 단계 없이 알, 애벌레, 어른벌레로 자라는 것을 위아래로 비교한 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[0, 1].map(r => { const y = r ? 196 : 66; return `<g class="row${r}">
          <text x="17" y="${y - 16}" fill="${r ? DG_C.r : DG_C.d}" font-size="22" font-weight="800">${r ? '불완전 탈바꿈' : '완전 탈바꿈'}</text>
          <text x="${r ? 168 : 138}" y="${y - 16}" fill="${DG_C.sub}" font-size="18" font-weight="700">${r ? '잠자리, 메뚜기' : '나비, 벌, 파리'}</text>
          ${ST.map((s, i) => { const x = BX(i), miss = r && i === 2; return `<g class="bx${r}_${i}">
            <rect x="${x}" y="${y}" width="${BW}" height="52" rx="14" fill="${miss ? '#fff' : i === 2 ? DG_C.a : r ? GRN : DG_C.b}" stroke="${miss ? '#c7c7cc' : i === 2 ? DG_C.c : r ? DG_C.r : DG_C.d}" stroke-width="3" ${miss ? 'stroke-dasharray="7 6"' : ''}/>
            <text x="${x + BW / 2}" y="${y + 34}" text-anchor="middle" fill="${miss ? '#aeaeb2' : DG_C.ink}" font-size="20" font-weight="800">${miss ? '없음' : s}</text>
            ${miss ? `<path d="M${x + 22} ${y + 8} L${x + BW - 22} ${y + 44}" stroke="#ff3b30" stroke-width="4" stroke-linecap="round" opacity=".0"/>` : ''}
          </g>${i < 3 ? `<path class="ah${r}_${i}" d="${arw(x + BW + 4, y + 26, x + BW + GAP - 4, y + 26, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`; }).join('')}
        </g>`; }).join('')}
        <text class="note" x="${BX(2) + BW / 2}" y="${196 + 80}" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">번데기가 없어요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          [0, 1].forEach(r => {
            const base = 200 + r * 2700;
            q('.row' + r).setAttribute('opacity', e > base ? 1 : 0);
            ST.forEach((s, i) => {
              const st = base + i * 550;
              q(`.bx${r}_${i}`).setAttribute('opacity', dgP(e, st, 350));
              if (i < 3) q(`.ah${r}_${i}`).setAttribute('opacity', e > st + 350 ? 1 : 0);
            });
          });
          q('.note').setAttribute('opacity', dgP(e, 5400, 500));
        });
      }
    },

    's3-06:3': {
      alt: '닭, 개구리, 거북, 물고기는 알을 낳는 동물로, 개, 고양이, 소, 사람은 새끼를 낳는 동물로 나누는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="8" y="80" width="224" height="212" rx="20" fill="${DG_C.a}" fill-opacity=".45" stroke="${DG_C.c}" stroke-width="3"/>
        <rect x="248" y="80" width="224" height="212" rx="20" fill="${DG_C.b}" fill-opacity=".45" stroke="${DG_C.d}" stroke-width="3"/>
        <ellipse cx="54" cy="116" rx="13" ry="17" fill="#fff" stroke="${DG_C.c}" stroke-width="3"/>
        <text x="76" y="124" fill="${DG_C.c}" font-size="22" font-weight="800">알을 낳아요</text>
        <circle cx="282" cy="112" r="12" fill="#fff" stroke="${DG_C.d}" stroke-width="3"/><circle cx="300" cy="122" r="7" fill="#fff" stroke="${DG_C.d}" stroke-width="3"/>
        <text x="316" y="124" fill="${DG_C.d}" font-size="22" font-weight="800">새끼를 낳아요</text>
        ${SRC.map((s, j) => `<g class="ch ch${j}"><rect x="-48" y="-21" width="96" height="42" rx="21" fill="#fff" stroke="${s.k ? DG_C.d : DG_C.c}" stroke-width="3"/>
          <text y="7" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${s.n}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          SRC.forEach((s, j) => {
            const m = MIX.indexOf(j), st = 300 + m * 700, h = home(s.k, s.i);
            const f = dgEase(dgP(e, st + 250, 400));
            const x = 240 + (h.x - 240) * f, y = 36 + (h.y - 36) * f;
            q('.ch' + j).setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
            q('.ch' + j).setAttribute('opacity', dgP(e, st, 200));
          });
        });
      }
    },
  });
})();
