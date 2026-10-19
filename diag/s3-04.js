/* 3학년 과학 · 무게는 어떻게 잴까? (s3-04) */
(() => {
  const RED = '#ff3b30';
  // 화살표(선 + 화살촉) path
  const arw = (x1, y1, x2, y2, h = 11) => {
    const a = Math.atan2(y2 - y1, x2 - x1), f = n => +n.toFixed(2);
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)], p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    return `M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} M${f(p1[0])} ${f(p1[1])} L${f(x2)} ${f(y2)} L${f(p2[0])} ${f(p2[1])}`;
  };
  // 용수철(지그재그): 위 끝 y0, 길이 len
  const spring = (x, y0, len) => {
    const lead = 8, n = 10, w = 12, step = (len - lead * 2) / n;
    let d = `M${x} ${y0} v${lead}`;
    for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -w : w)} ${(y0 + lead + step * (i + 0.5)).toFixed(2)}`;
    return d + ` L${x} ${(y0 + len - lead).toFixed(2)} V${(y0 + len).toFixed(2)}`;
  };
  const SX = [70, 170, 270, 370], TOP = 44, L0 = 60, PER = 30, WH = 24;

  // 사람(앉은 모습): 기준점 = 엉덩이 가운데(판 위)
  const person = (s, col, fill) => `<rect x="${-13 * s}" y="${-40 * s}" width="${26 * s}" height="${40 * s}" rx="${9 * s}" fill="${fill}" stroke="${col}" stroke-width="3"/>
    <circle cx="0" cy="${-52 * s}" r="${11 * s}" fill="${fill}" stroke="${col}" stroke-width="3"/>`;

  // 양팔저울
  const BP = { x: 240, y: 96 }, ARM = 150, STR = 92;
  const R = Math.PI / 180;

  Object.assign(DIAG, {
    's3-04:0': {
      alt: '지구가 사과를 끌어당겨 사과가 땅으로 떨어지고, 무거운 물체일수록 지구가 끌어당기는 힘(무게)이 더 큰 것을 화살표 길이로 나타낸 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <path d="M0 262 Q240 236 480 262 V310 H0 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
        <text x="240" y="292" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">지구</text>
        <rect x="80" y="140" width="20" height="112" rx="4" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
        <circle cx="90" cy="104" r="62" fill="#d6efdc" stroke="${DG_C.r}" stroke-width="3"/>
        <g class="apl"><circle r="14" fill="${RED}"/><path d="M0 -14 v-7" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/></g>
        <path class="a0" d="${arw(182, 120, 182, 214)}" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="t0" x="196" y="168" fill="${DG_C.c}" font-size="20" font-weight="800">끌어당겨요</text>
        <g class="cmp">
          <line x1="320" y1="60" x2="320" y2="250" stroke="#e5e5ea" stroke-width="2"/>
          <circle cx="360" cy="94" r="14" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
          <circle cx="434" cy="104" r="28" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
          <text x="360" y="76" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">가벼움</text>
          <text x="434" y="64" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">무거움</text>
        </g>
        <path class="a1" d="" fill="none" stroke="${DG_C.d}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="a2" d="" fill="none" stroke="${DG_C.c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="t1" x="397" y="206" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">무게</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          const f = dgP(e, 400, 1100), y = 132 + 112 * f * f; // 점점 빨라지며 떨어짐
          q('.apl').setAttribute('transform', `translate(140,${y.toFixed(1)})`);
          q('.a0').setAttribute('opacity', e > 700 ? 1 : 0);
          q('.t0').setAttribute('opacity', e > 700 ? 1 : 0);
          q('.cmp').setAttribute('opacity', dgP(e, 2000, 500));
          const g1 = dgEase(dgP(e, 2700, 800)), g2 = dgEase(dgP(e, 3500, 1100));
          q('.a1').setAttribute('d', arw(360, 112, 360, 112 + 50 * g1)); q('.a1').setAttribute('opacity', g1 > 0 ? 1 : 0);
          q('.a2').setAttribute('d', arw(434, 136, 434, 136 + 92 * g2)); q('.a2').setAttribute('opacity', g2 > 0 ? 1 : 0);
          q('.t1').setAttribute('opacity', e > 4700 ? 1 : 0);
        });
      }
    },

    's3-04:1': {
      alt: '용수철에 추를 0개, 1개, 2개, 3개 걸면 용수철이 0cm, 2cm, 4cm, 6cm로 일정하게 늘어나는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <line x1="24" y1="${TOP}" x2="420" y2="${TOP}" stroke="${DG_C.ink}" stroke-width="6" stroke-linecap="round"/>
        <line x1="24" y1="${TOP + L0}" x2="420" y2="${TOP + L0}" stroke="${DG_C.sub}" stroke-width="2" stroke-dasharray="6 6"/>
        ${SX.map((x, k) => `<g>
          <path class="sp${k}" d="${spring(x, TOP, L0)}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>
          <path class="br${k}" d="" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>
          ${Array.from({ length: k }, (_, j) => `<rect class="w${k}_${j}" x="${x - 18}" y="0" width="36" height="${WH - 3}" rx="5" fill="${DG_C.sub}"/>`).join('')}
          <text x="${x}" y="292" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">추 ${k}개</text>
          <text class="lb${k}" x="${x}" y="320" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">${k * 2}cm</text>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          SX.forEach((x, k) => {
            const st = 300 + (k - 1) * 1500;
            const f = k === 0 ? 1 : dgEase(dgP(e, st + 300, 800));
            const len = L0 + PER * k * f, end = TOP + len;
            q('.sp' + k).setAttribute('d', spring(x, TOP, len));
            for (let j = 0; j < k; j++) {
              const w = q(`.w${k}_${j}`);
              w.setAttribute('y', (end + j * WH).toFixed(1));
              w.setAttribute('opacity', k === 0 || e > st ? 1 : 0);
            }
            q('.br' + k).setAttribute('d', k ? `M${x + 26} ${TOP + L0} V${(end).toFixed(1)}` : '');
            q('.lb' + k).setAttribute('opacity', k === 0 || f >= 1 ? 1 : 0);
          });
        });
      }
    },

    's3-04:2': {
      alt: '시소에서 무거운 사람은 받침점 가까이, 가벼운 사람은 받침점에서 먼 끝에 앉으면 수평이 되는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <line x1="10" y1="262" x2="470" y2="262" stroke="#d2d2d7" stroke-width="3"/>
        <path d="M240 208 L212 262 H268 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>
        <g class="pl">
          <rect x="-200" y="-4" width="400" height="10" rx="5" fill="${DG_C.ink}"/>
          <g class="dad">${person(1.4, DG_C.d, DG_C.b)}</g>
          <g transform="translate(180,-4)">${person(0.9, DG_C.r, '#d6efdc')}</g>
        </g>
        <g class="lev">
          <path d="M150 282 H236 M150 274 v16 M236 274 v16" stroke="${DG_C.d}" stroke-width="3" fill="none"/>
          <path d="M244 282 H420 M244 274 v16 M420 274 v16" stroke="${DG_C.r}" stroke-width="3" fill="none"/>
          <text x="193" y="312" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">가깝게</text>
          <text x="332" y="312" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">멀리</text>
          <text x="240" y="70" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">수평!</text>
        </g>
        <text class="tilt" x="240" y="70" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="800">기울어요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const m = dgEase(dgP(e, 1600, 1600));            // 아빠가 가운데 쪽으로 이동
          const d = 180 - 90 * m;                           // 받침점에서의 거리
          const tq = 2 * d - 180;                           // 돌림힘 차이(아빠 무게 2, 아이 1)
          const ang = -12 * Math.max(-1, Math.min(1, tq / 90));
          const intro = dgEase(dgP(e, 200, 800));
          q('.pl').setAttribute('transform', `translate(240,203) rotate(${(ang * intro).toFixed(2)})`);
          q('.dad').setAttribute('transform', `translate(${-d},-4)`);
          q('.tilt').setAttribute('opacity', e > 900 && e < 2400 ? 1 : 0);
          q('.lev').setAttribute('opacity', e > 3500 ? 1 : 0);
        });
      }
    },

    's3-04:3': {
      alt: '양팔저울 왼쪽에 사과, 오른쪽에 귤을 올리면 사과 쪽이 내려가서 사과가 더 무겁다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <rect x="234" y="${BP.y}" width="12" height="176" rx="4" fill="${DG_C.sub}"/>
        <rect x="180" y="268" width="120" height="14" rx="7" fill="${DG_C.sub}"/>
        <g class="bm"><rect x="${-ARM - 6}" y="-5" width="${ARM * 2 + 12}" height="10" rx="5" fill="${DG_C.ink}"/></g>
        <circle cx="${BP.x}" cy="${BP.y}" r="9" fill="#fff" stroke="${DG_C.ink}" stroke-width="3"/>
        ${[0, 1].map(s => `<g class="pan${s}">
          <path d="M0 0 L-46 ${STR} M0 0 L46 ${STR}" stroke="${DG_C.sub}" stroke-width="2"/>
          <path d="M-58 ${STR} H58 Q50 ${STR + 22} 0 ${STR + 22} Q-50 ${STR + 22} -58 ${STR} Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>
          ${s === 0
            ? `<circle cx="0" cy="${STR - 26}" r="26" fill="${RED}"/><path d="M0 ${STR - 52} q2 -10 8 -12" stroke="${DG_C.r}" stroke-width="4" fill="none" stroke-linecap="round"/>
               <text x="0" y="${STR + 48}" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">사과</text>`
            : `<circle cx="0" cy="${STR - 18}" r="18" fill="${DG_C.c}"/><circle cx="0" cy="${STR - 36}" r="3" fill="${DG_C.r}"/>
               <text x="0" y="${STR + 48}" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">귤</text>`}
        </g>`).join('')}
        <g class="res">
          <path d="${arw(18, 150, 18, 226)}" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="240" y="40" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">사과가 더 무거워요</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          const ang = -11 * dgEase(dgP(e, 900, 1500));    // 왼쪽(사과 쪽)이 내려감
          q('.bm').setAttribute('transform', `translate(${BP.x},${BP.y}) rotate(${ang.toFixed(2)})`);
          [-1, 1].forEach((s, i) => {
            const a = ang * R, x = BP.x + s * ARM * Math.cos(a), y = BP.y + s * ARM * Math.sin(a);
            q('.pan' + i).setAttribute('transform', `translate(${x.toFixed(2)},${y.toFixed(2)})`);
          });
          q('.res').setAttribute('opacity', e > 2700 ? 1 : 0);
        });
      }
    },
  });
})();
