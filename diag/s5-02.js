/* 6학년 과학 · 식초와 비눗물은 무엇이 다를까? (s5-02) */
(() => {
  const RED = '#ff3b30', YEL = '#ffcc00', BLU = DG_C.d, GRN = DG_C.r, PUR = '#af52de', PINK = '#ff2d55';
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')'; };
  const beaker = (cx, top, bot, w) => `M${cx - w} ${top} V${bot - 10} a10 10 0 0 0 10 10 H${cx + w - 10} a10 10 0 0 0 10 -10 V${top}`;

  /* 0: 리트머스 */
  const L0 = [
    { cx: 120, name: '식초', kind: '산성', from: BLU, to: RED, t1: '푸른 종이', t2: '→ 붉게', side: -1, liq: DG_C.a },
    { cx: 360, name: '비눗물', kind: '염기성', from: RED, to: BLU, t1: '붉은 종이', t2: '→ 푸르게', side: 1, liq: DG_C.b },
  ];

  /* 1: 지시약 표 — [이름, 처음 색, 산성, 염기성(배열)] */
  const IND = [
    ['페놀프탈레인', '#ffffff', '#ffffff', [PINK]],
    ['BTB 용액', GRN, YEL, [BLU]],
    ['붉은 양배추', PUR, RED, [BLU, YEL]],
  ];
  const tube = (x, y, cls, col) => `<g><rect x="${x - 13}" y="${y}" width="26" height="66" rx="13" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5"/>
    <rect class="${cls}" x="${x - 10}" y="${y + 22}" width="20" height="41" rx="10" fill="${col}"/></g>`;

  /* 3: BTB에 염기성 용액 떨어뜨리기 */
  const NDROP = 6, D0 = 900, DT = 650;
  const btb = t => t < .5 ? mix(YEL, GRN, t * 2) : mix(GRN, BLU, (t - .5) * 2);

  Object.assign(DIAG, {
    's5-02:0': {
      alt: '식초에 넣은 푸른색 리트머스 종이는 붉게 변해 식초가 산성이고, 비눗물에 넣은 붉은색 리트머스 종이는 푸르게 변해 비눗물이 염기성인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${L0.map((b, i) => `<g>
          <path d="M${b.cx - 60} 150 H${b.cx + 60} V230 a10 10 0 0 1 -10 10 H${b.cx - 50} a10 10 0 0 1 -10 -10 Z" fill="${b.liq}" fill-opacity=".8"/>
          <rect x="${b.cx - 9}" y="62" width="18" height="150" rx="3" fill="${b.from}"/>
          <rect class="ch${i}" x="${b.cx - 9}" y="212" width="18" height="0" rx="3" fill="${b.to}"/>
          <path d="${beaker(b.cx, 70, 240, 60)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <text x="${b.cx + b.side * 20}" y="100" text-anchor="${b.side < 0 ? 'end' : 'start'}" fill="${DG_C.ink}" font-size="18" font-weight="700">${b.t1}</text>
          <text class="tl${i}" x="${b.cx + b.side * 20}" y="126" text-anchor="${b.side < 0 ? 'end' : 'start'}" fill="${b.to}" font-size="18" font-weight="800">${b.t2}</text>
          <text x="${b.cx}" y="272" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${b.name}</text>
          <text class="k${i}" x="${b.cx}" y="300" text-anchor="middle" fill="${b.to}" font-size="20" font-weight="800">${b.kind}</text>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          L0.forEach((b, i) => {
            const st = 400 + i * 2400, f = dgEase(dgP(e, st, 1300));
            q('.ch' + i).setAttribute('y', 212 - 90 * f); q('.ch' + i).setAttribute('height', 90 * f);
            q('.tl' + i).setAttribute('opacity', e > st + 1300 ? 1 : 0);
            q('.k' + i).setAttribute('opacity', e > st + 1700 ? 1 : 0);
          });
        });
      }
    },

    's5-02:1': {
      alt: '페놀프탈레인 용액은 산성에서 색이 변하지 않고 염기성에서 붉게, BTB 용액은 산성에서 노랗게 염기성에서 파랗게, 붉은 양배추 지시약은 산성에서 붉게 염기성에서 푸르거나 노랗게 변하는 것을 정리한 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        <text x="270" y="66" text-anchor="middle" fill="${RED}" font-size="22" font-weight="800">산성</text>
        <text x="400" y="66" text-anchor="middle" fill="${BLU}" font-size="22" font-weight="800">염기성</text>
        ${IND.map((d, r) => { const y = 84 + r * 86; return `<g>
          <line x1="10" y1="${y - 4}" x2="470" y2="${y - 4}" stroke="#e5e5ea" stroke-width="2"/>
          <text x="14" y="${y + 46}" fill="${DG_C.ink}" font-size="20" font-weight="800">${d[0]}</text>
          ${tube(270, y + 8, 'n' + r + 'a', d[1])}
          <rect class="c${r}a" x="260" y="${y + 30}" width="20" height="41" rx="10" fill="${d[2]}"/>
          ${d[3].map((c, k) => { const x = 400 + (k - (d[3].length - 1) / 2) * 38; return `${tube(x, y + 8, '', d[1])}<rect class="c${r}b" x="${x - 10}" y="${y + 30}" width="20" height="41" rx="10" fill="${c}"/>`; }).join('')}
          ${r === 0 ? `<text class="c0a" x="290" y="${y + 52}" fill="${DG_C.sub}" font-size="18" font-weight="700">무색</text>` : ''}
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5400, e => {
          IND.forEach((d, r) => {
            const st = 600 + r * 1500, f = dgEase(dgP(e, st, 900));
            qa(`.c${r}a, .c${r}b`).forEach(t => t.setAttribute('opacity', f));
          });
        });
      }
    },

    's5-02:2': {
      alt: '산성 용액에 넣은 달걀 껍데기는 기포가 생기며 녹고, 염기성 용액에 넣은 두부는 흐물흐물해지며 녹는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${[[120, DG_C.a], [360, DG_C.b]].map(([cx, c]) => `<path d="M${cx - 70} 96 H${cx + 70} V210 a10 10 0 0 1 -10 10 H${cx - 60} a10 10 0 0 1 -10 -10 Z" fill="${c}" fill-opacity=".8"/>
          <path d="${beaker(cx, 56, 220, 70)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>`).join('')}
        <g class="eg">${[[92, 210, 20], [130, 212, 17], [160, 210, 14]].map(p => `<path d="M${p[0] - p[2]} ${p[1] + 6} q${p[2]} -${p[2] * 1.4} ${p[2] * 2} 0 z" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linejoin="round"/>`).join('')}</g>
        ${Array.from({ length: 9 }, (_, k) => `<circle class="bb bb${k}" r="${4 + (k % 3)}" fill="#fff" stroke="${DG_C.c}" stroke-width="2"/>`).join('')}
        <rect x="325" y="168" width="70" height="50" rx="4" fill="none" stroke="${DG_C.sub}" stroke-width="2" stroke-dasharray="5 5"/>
        <path class="tf" fill="#fffdf5" stroke="#c7b98a" stroke-width="2.5"/>
        <text x="120" y="252" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">산성 용액</text>
        <text x="120" y="278" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">+ 달걀 껍데기</text>
        <text class="r0" x="120" y="308" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">기포 나며 녹아요</text>
        <text x="360" y="252" text-anchor="middle" fill="${BLU}" font-size="20" font-weight="800">염기성 용액</text>
        <text x="360" y="278" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">+ 두부</text>
        <text class="r1" x="360" y="308" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">흐물흐물해져요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          // 기포: e 값만으로 위치 결정 (아래→위)
          for (let k = 0; k < 9; k++) {
            const b = q('.bb' + k), x = 92 + (k * 23) % 62, period = 1400 + (k % 4) * 200, start = 400 + k * 160;
            const ph = e < start ? -1 : ((e - start) % period) / period;
            b.setAttribute('cx', x + 4 * Math.sin(ph * 6)); b.setAttribute('cy', 196 - 96 * ph);
            b.setAttribute('opacity', ph < 0 ? 0 : 1);
          }
          const s = 1 - 0.45 * dgEase(dgP(e, 600, 4800));
          q('.eg').setAttribute('transform', `translate(125 214) scale(${s}) translate(-125 -214)`);
          // 두부: 네모 → 납작하게 퍼진 덩어리
          const m = dgEase(dgP(e, 1200, 3600));
          const w = 70 + 40 * m, h = 50 - 30 * m, r = 4 + 14 * m, x = 360 - w / 2, y = 218 - h;
          q('.tf').setAttribute('d', `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h} H${x} V${y + r} Q${x} ${y} ${x + r} ${y} Z`);
          q('.r0').setAttribute('opacity', e > 2600 ? 1 : 0);
          q('.r1').setAttribute('opacity', e > 4400 ? 1 : 0);
        });
      }
    },

    's5-02:3': {
      alt: 'BTB 용액을 넣은 산성 용액(노란색)에 염기성 용액을 한 방울씩 넣으면 초록색을 거쳐 파란색으로 바뀌어, 산성이 점점 약해지다가 염기성이 되는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g><path d="M118 12 h24 v26 h-24 Z" fill="${DG_C.sub}"/><path d="M122 38 h16 v40 l-8 12 l-8 -12 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M124 52 h12 v24 l-6 9 l-6 -9 Z" fill="${BLU}" fill-opacity=".6"/></g>
        <path class="dp" d="M0 -9 q7 9 0 14 q-7 -5 0 -14 Z" fill="${BLU}"/>
        <path class="lq" d="M66 150 H194 V246 a10 10 0 0 1 -10 10 H76 a10 10 0 0 1 -10 -10 Z"/>
        <path d="${beaker(130, 110, 256, 64)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <text x="130" y="288" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">BTB 용액</text>
        <text x="230" y="64" fill="${BLU}" font-size="18" font-weight="700">염기성 용액</text>
        <text x="230" y="88" fill="${DG_C.sub}" font-size="18" font-weight="700">한 방울씩</text>
        <rect x="244" y="168" width="70" height="26" fill="${YEL}"/><rect x="314" y="168" width="70" height="26" fill="${GRN}"/><rect x="384" y="168" width="70" height="26" fill="${BLU}"/>
        <text x="279" y="222" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">산성</text>
        <text x="419" y="222" text-anchor="middle" fill="${BLU}" font-size="18" font-weight="800">염기성</text>
        <path class="pt" d="M0 0 l-10 -16 h20 Z" fill="${DG_C.ink}"/>
        <text class="msg" x="349" y="262" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">산성이 약해지다가</text>
        <text class="msg2" x="349" y="290" text-anchor="middle" fill="${BLU}" font-size="20" font-weight="800">염기성이 돼요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const total = D0 + NDROP * DT + 900;
        dgAnim(el, total, e => {
          // 몇 방울 떨어졌는지(진행도) → 색
          let k = -1, ph = 0;
          for (let i = 0; i < NDROP; i++) if (e >= D0 + i * DT) { k = i; ph = (e - D0 - i * DT) / DT; }
          const fall = Math.min(1, ph / 0.6);
          const dp = q('.dp');
          dp.setAttribute('transform', `translate(130,${92 + 58 * fall * fall})`);
          dp.setAttribute('opacity', k >= 0 && fall < 1 && e < D0 + NDROP * DT ? 1 : 0);
          const landed = k < 0 ? 0 : k + (fall >= 1 ? 1 : 0);
          const t = dgEase(Math.min(1, landed / NDROP));
          q('.lq').setAttribute('fill', btb(t));
          q('.pt').setAttribute('transform', `translate(${279 + 140 * t},164)`);
          q('.msg').setAttribute('opacity', e > D0 + 2 * DT ? 1 : 0);
          q('.msg2').setAttribute('opacity', e > D0 + NDROP * DT ? 1 : 0);
        });
      }
    },
  });
})();
