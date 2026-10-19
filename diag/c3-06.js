/* 4학년 중국어 · 중국어로 하나부터 열까지 셀 수 있을까? (c3-06) */
(() => {
  const C = DG_C, RED = '#ff3b30', ZH = 'lang="zh-CN"';
  const TC = { 1: C.d, 2: C.r, 3: C.c, 4: RED };
  const tonePath = (t, x, y, w, h) => {
    const L = v => +(y + h - (v - 1) / 4 * h).toFixed(1);
    if (t === 1) return `M${x} ${L(5)} L${x + w} ${L(5)}`;
    if (t === 2) return `M${x} ${L(3)} C${x + w * .45} ${L(3)} ${x + w * .7} ${L(4.2)} ${x + w} ${L(5)}`;
    if (t === 3) return `M${x} ${L(2)} C${x + w * .25} ${L(.7)} ${x + w * .55} ${L(.7)} ${x + w} ${L(4)}`;
    return `M${x} ${L(5)} C${x + w * .4} ${L(4.6)} ${x + w * .75} ${L(2.6)} ${x + w} ${L(1)}`;
  };
  const apple = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="14" fill="${RED}"/><path d="M${cx} ${cy - 13} q2 -7 8 -9" fill="none" stroke="${C.r}" stroke-width="3" stroke-linecap="round"/>`;

  /* 0: 一 二 三 — 획(가로줄) 좌표 */
  const N0 = [
    { py: 'yī', n: 1, s: [[-46, 107, 92]] },
    { py: 'èr', n: 2, s: [[-30, 88, 60], [-48, 130, 96]] },
    { py: 'sān', n: 3, s: [[-36, 76, 72], [-28, 104, 56], [-50, 136, 100]] },
  ];

  /* 1: 주사위 4 5 6 */
  const PIP = {
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  const D1 = [{ n: 4, h: '四', py: 'sì', t: 4 }, { n: 5, h: '五', py: 'wǔ', t: 3 }, { n: 6, h: '六', py: 'liù', t: 4 }];

  /* 2: 수직선 0~10 */
  const HZ = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const PY2 = { 0: 'líng', 7: 'qī', 8: 'bā', 9: 'jiǔ', 10: 'shí' };
  const nx = n => 30 + n * 42;

  /* 3: 손가락 숫자 (로컬 좌표, 손바닥 중심 0,0) */
  const fing = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.c}" stroke-width="15" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.a}" stroke-width="10" stroke-linecap="round"/>`;
  const fpath = d => `<path d="${d}" fill="none" stroke="${C.c}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${C.a}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  const knuck = xs => xs.map(x => `<rect x="${x - 7}" y="-14" width="14" height="22" rx="7" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>`).join('');
  const palm = `<rect x="-27" y="-8" width="54" height="50" rx="16" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>`;
  const FX = [-19, -6, 7, 20]; // 검지 중지 약지 새끼
  const H3 = [
    { h: '六', py: 'liù', n: 6, g: knuck([FX[0], FX[1], FX[2]]) + fing(FX[3], -2, FX[3] + 4, -38) + palm + fing(-20, 22, -46, -2) },
    { h: '七', py: 'qī', n: 7, g: knuck([FX[2], FX[3]]) + fing(-19, -2, -9, -42) + fing(-4, -2, -6, -44) + palm + fing(-22, 22, -11, -38) },
    { h: '八', py: 'bā', n: 8, g: knuck([FX[1], FX[2], FX[3]]) + fing(FX[0], -2, FX[0], -48) + palm + fing(-20, 22, -52, 12) },
    { h: '九', py: 'jiǔ', n: 9, g: knuck([FX[1], FX[2], FX[3]]) + fpath(`M${FX[0]} -2 L${FX[0]} -34 Q${FX[0]} -48 -6 -46 L-4 -36`) + palm + fing(-20, 22, -6, 18) },
    { h: '十', py: 'shí', n: 10, g: fing(0, 30, 0, -46) + fing(-34, -10, 34, -10) },
  ];

  Object.assign(DIAG, {
    'c3-06:0': {
      alt: '一(yī)은 가로줄 하나와 사과 1개, 二(èr)는 가로줄 둘과 사과 2개, 三(sān)은 가로줄 셋과 사과 3개로, 줄의 개수가 숫자와 같다는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${N0.map((d, i) => { const x = 10 + i * 158, cx = x + 72; return `
          <rect x="${x}" y="48" width="144" height="250" rx="18" fill="#f5f5f7"/>
          ${d.s.map(([dx, y, w], k) => `<line class="s${i}_${k}" x1="${cx + dx}" y1="${y}" x2="${cx + dx + w}" y2="${y}" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>`).join('')}
          <text class="p${i}" x="${cx}" y="186" text-anchor="middle" fill="${C.d}" font-size="26" font-weight="800">${d.py}</text>
          <g class="ap${i}">${Array.from({ length: d.n }, (_, k) => apple(cx + (k - (d.n - 1) / 2) * 36, 236)).join('')}
            <text x="${cx}" y="284" text-anchor="middle" fill="${C.sub}" font-size="20" font-weight="800">${d.n}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          N0.forEach((d, i) => {
            const st = 200 + i * 1900;
            d.s.forEach(([dx, y, w], k) => {
              const f = dgEase(dgP(e, st + k * 450, 400)), cx = 10 + i * 158 + 72;
              const ln = q(`.s${i}_${k}`); ln.setAttribute('x2', cx + dx + Math.max(0.1, w * f)); ln.setAttribute('opacity', f > 0 ? 1 : 0);
            });
            const t = st + d.n * 450;
            q('.p' + i).setAttribute('opacity', dgP(e, t, 400));
            q('.ap' + i).setAttribute('opacity', dgP(e, t + 300, 400));
          });
        });
      }
    },

    'c3-06:1': {
      alt: '주사위 눈 4, 5, 6 아래에 四(sì, 4성으로 뚝), 五(wǔ, 3성으로 눌렀다 올리기), 六(liù, 4성)을 성조 선과 함께 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${D1.map((d, i) => { const cx = 80 + i * 160; return `<g class="d${i}">
          <rect x="${cx - 46}" y="48" width="92" height="92" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="3.5"/>
          ${PIP[d.n].map(([px, py]) => `<circle cx="${cx + px * 25}" cy="${94 + py * 25}" r="8" fill="${d.n === 5 && !px && !py ? RED : C.ink}"/>`).join('')}
          <text ${ZH} x="${cx}" y="204" text-anchor="middle" fill="${C.ink}" font-size="44" font-weight="600">${d.h}</text></g>
          <g class="t${i}"><text x="${cx}" y="244" text-anchor="middle" fill="${TC[d.t]}" font-size="26" font-weight="800">${d.py}</text>
            <path d="${tonePath(d.t, cx - 22, 258, 44, 34)}" fill="none" stroke="${TC[d.t]}" stroke-width="5" stroke-linecap="round"/></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          D1.forEach((d, i) => {
            const st = 200 + i * 1400, f = dgEase(dgP(e, st, 500));
            q('.d' + i).setAttribute('opacity', f);
            q('.d' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`);
            q('.t' + i).setAttribute('opacity', dgP(e, st + 700, 500));
          });
        });
      }
    },

    'c3-06:2': {
      alt: '0부터 10까지 수직선 위에 한자가 놓여 있고, 七(qī) 7, 八(bā) 8, 九(jiǔ) 9, 十(shí) 10, 零(líng) 0을 강조하며, 十 shí는 2성으로 올리고 四 sì는 4성으로 내린다는 비교를 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <line x1="${nx(0) - 12}" y1="146" x2="${nx(10) + 12}" y2="146" stroke="${C.sub}" stroke-width="4" stroke-linecap="round"/>
        ${HZ.map((h, n) => { const f = n in PY2; return `<g class="n${n}">
          <line x1="${nx(n)}" y1="138" x2="${nx(n)}" y2="154" stroke="${C.sub}" stroke-width="3"/>
          <text ${ZH} x="${nx(n)}" y="120" text-anchor="middle" fill="${f ? C.d : '#aeaeb2'}" font-size="28" font-weight="600">${h}</text>
          <text x="${nx(n)}" y="180" text-anchor="middle" fill="${f ? C.ink : '#aeaeb2'}" font-size="18" font-weight="800">${n}</text>
          ${f ? `<text x="${nx(n)}" y="210" text-anchor="middle" fill="${C.d}" font-size="18" font-weight="800">${PY2[n]}</text>` : ''}</g>`; }).join('')}
        <circle class="ball" cx="${nx(0)}" cy="80" r="9" fill="${C.c}"/>
        <g class="cmp">
          <rect x="24" y="236" width="206" height="64" rx="16" fill="#d6efdc"/>
          <text ${ZH} x="50" y="279" text-anchor="middle" fill="${C.ink}" font-size="30" font-weight="600">十</text>
          <text x="74" y="277" fill="${C.r}" font-size="22" font-weight="800">shí</text>
          <path d="${tonePath(2, 120, 250, 36, 34)}" fill="none" stroke="${C.r}" stroke-width="5" stroke-linecap="round"/>
          <text x="166" y="276" fill="${C.sub}" font-size="18" font-weight="700">'스'</text>
          <rect x="250" y="236" width="206" height="64" rx="16" fill="#ffe0de"/>
          <text ${ZH} x="276" y="279" text-anchor="middle" fill="${C.ink}" font-size="30" font-weight="600">四</text>
          <text x="300" y="277" fill="${RED}" font-size="22" font-weight="800">sì</text>
          <path d="${tonePath(4, 334, 250, 36, 34)}" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
          <text x="384" y="276" fill="${C.sub}" font-size="18" font-weight="700">'쓰'</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          const T = 4400, pos = Math.min(10, Math.max(0, (e - 300) / (T / 10)));
          const k = Math.floor(pos), fr = pos - k, x = nx(k) + 42 * fr, y = 82 - (k < 10 ? 26 * Math.sin(Math.PI * fr) : 0);
          q('.ball').setAttribute('cx', x); q('.ball').setAttribute('cy', y);
          q('.ball').setAttribute('opacity', e >= 300 && e < T + 900 ? 1 : 0);
          HZ.forEach((h, n) => q('.n' + n).setAttribute('opacity', n === 0 || pos >= n - 0.3 ? 1 : 0.15));
          q('.cmp').setAttribute('opacity', dgP(e, T + 900, 600));
        });
      }
    },

    'c3-06:3': {
      alt: '중국식 한 손 숫자: 六(liù) 6은 엄지와 새끼손가락만 펴고, 七(qī) 7은 엄지·검지·중지 끝을 모으고, 八(bā) 8은 엄지와 검지를 ㄴ 모양으로 펴고, 九(jiǔ) 9는 검지를 갈고리처럼 구부리고, 十(shí) 10은 두 검지를 십자로 겹치는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${H3.map((h, i) => { const cx = 50 + i * 95; return `<g class="h${i}">
          <text x="${cx}" y="62" text-anchor="middle" fill="${C.sub}" font-size="20" font-weight="800">${h.n}</text>
          <g transform="translate(${cx + [16, 6, 12, 2, 0][i]},146)">${h.g}</g>
          <text ${ZH} x="${cx}" y="240" text-anchor="middle" fill="${C.ink}" font-size="34" font-weight="600">${h.h}</text>
          <text x="${cx}" y="272" text-anchor="middle" fill="${C.d}" font-size="20" font-weight="800">${h.py}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          H3.forEach((h, i) => {
            const f = dgEase(dgP(e, 200 + i * 1000, 600));
            q('.h' + i).setAttribute('opacity', f);
            q('.h' + i).setAttribute('transform', `translate(0,${12 * (1 - f)})`);
          });
        });
      }
    },
  });
})();
