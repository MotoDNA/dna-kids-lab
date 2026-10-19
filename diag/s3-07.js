/* 3학년 과학 · 씨앗은 어떻게 자라서 다시 씨앗이 될까? (s3-07) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  const GRN = '#d6efdc', LEAF = '#8fd18a', PUR = '#af52de';
  // 강낭콩 씨(콩팥 모양), 중심 0,0
  const bean = (s = 1, rot = 0) => `<path transform="rotate(${rot}) scale(${s})" d="M-16 -6 Q-14 -14 0 -12 Q14 -14 16 -4 Q18 10 4 10 Q0 6 -4 10 Q-18 10 -16 -6 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const leaf = (x, y, rot, s = 1, fill = LEAF) => `<path transform="translate(${x},${y}) rotate(${rot}) scale(${s})" d="M0 0 C10 -10 32 -12 40 0 C32 12 10 10 0 0 Z" fill="${fill}" stroke="${DG_C.r}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const coty = (x, y, s = 1, fill = '#c9e3a0') => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="-13" cy="0" rx="14" ry="9" fill="${fill}" stroke="${DG_C.r}" stroke-width="2.5"/><ellipse cx="13" cy="0" rx="14" ry="9" fill="${fill}" stroke="${DG_C.r}" stroke-width="2.5"/></g>`;
  const root = (x, y, len) => `<path d="M${x} ${y} q-3 ${len * 0.5} 2 ${len} M${x} ${y + len * 0.4} l-12 14 M${x} ${y + len * 0.55} l12 13" fill="none" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linecap="round"/>`;

  /* 3: 벼(한해살이) 4장면 */
  const rice = k => {
    if (k === 0) return `<path d="M0 0 q-2 -14 -8 -22 M0 0 q2 -14 8 -24" stroke="${DG_C.r}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    if (k === 1) return `<path d="M0 0 q-6 -30 -18 -46 M0 0 q0 -34 2 -52 M0 0 q6 -30 18 -44" stroke="${DG_C.r}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    if (k === 2) return `<path d="M0 0 q-6 -30 -18 -40 M0 0 q6 -30 18 -40" stroke="${DG_C.r}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M0 0 q0 -40 14 -52" stroke="${DG_C.c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>${[0, 1, 2, 3].map(i => `<ellipse cx="${7 + i * 3}" cy="${-34 - i * 5}" rx="3.5" ry="5" fill="#ffd60a" stroke="${DG_C.c}" stroke-width="1.5"/>`).join('')}`;
    return `<path d="M0 0 q-10 -20 -24 -22 M0 0 q4 -20 20 -26 M0 0 q-2 -18 4 -30" stroke="#aeaeb2" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  };
  const tree = (s, nf) => `<g transform="scale(${s})"><rect x="-6" y="-34" width="12" height="34" rx="3" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>
    <circle cx="0" cy="-58" r="30" fill="${GRN}" stroke="${DG_C.r}" stroke-width="3"/>
    ${[[-14, -62], [10, -70], [14, -48], [-6, -44], [-2, -78]].slice(0, nf).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${DG_C.c}"/>`).join('')}</g>`;

  Object.assign(DIAG, {
    's3-07:0': {
      alt: '물에 적신 솜 위의 강낭콩은 뿌리가 나오며 싹이 트고, 마른 솜 위의 강낭콩은 그대로인 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[0, 1].map(k => { const x = k ? 350 : 130; return `<g>
          <text x="${x}" y="70" text-anchor="middle" fill="${k ? DG_C.sub : DG_C.d}" font-size="22" font-weight="800">${k ? '마른 솜' : '젖은 솜'}</text>
          <ellipse cx="${x}" cy="206" rx="98" ry="20" fill="#f5f5f7" stroke="#c7c7cc" stroke-width="3"/>
          <path class="cot${k}" d="M${x - 78} 200 q-8 -18 12 -22 q6 -16 26 -10 q14 -14 32 -4 q18 -12 34 0 q20 -6 26 10 q18 4 10 26 Z" fill="${k ? '#fff' : DG_C.b}" stroke="${k ? '#c7c7cc' : DG_C.d}" stroke-width="2.5" stroke-linejoin="round"/>
        </g>`; }).join('')}
        ${[0, 1, 2].map(i => `<path class="drop drop${i}" d="M0 -9 Q7 0 0 7 Q-7 0 0 -9 Z" fill="${DG_C.d}"/>`).join('')}
        <path class="rt" d="M144 180 q8 10 20 12" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
        <path class="sh" d="M126 170 q-4 -24 6 -36 q8 -6 12 4" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/>
        <g transform="translate(130,176)">${bean(1.3)}</g>
        <g transform="translate(350,178)">${bean(1.3)}</g>
        <text class="res0" x="130" y="268" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">싹이 터요</text>
        <text class="res1" x="350" y="268" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="800">그대로예요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5400, e => {
          qa('.drop').forEach((d, i) => {
            const f = dgP(e, 200 + i * 300, 700);
            d.setAttribute('transform', `translate(${104 + i * 26},${90 + 80 * f})`);
            d.setAttribute('opacity', f > 0 && f < 1 ? 1 : 0);
          });
          q('.cot0').setAttribute('fill', e > 900 ? DG_C.b : '#fff');
          q('.cot0').setAttribute('stroke', e > 900 ? DG_C.d : '#c7c7cc');
          const r = dgEase(dgP(e, 1700, 1000)), s = dgEase(dgP(e, 2800, 1100));
          q('.rt').setAttribute('opacity', r); q('.rt').setAttribute('stroke-dasharray', `${30 * r} 40`);
          q('.sh').setAttribute('opacity', s > 0 ? 1 : 0); q('.sh').setAttribute('stroke-dasharray', `${60 * s} 80`);
          q('.res0').setAttribute('opacity', e > 4000 ? 1 : 0);
          q('.res1').setAttribute('opacity', e > 4500 ? 1 : 0);
        });
      }
    },

    's3-07:1': {
      alt: '강낭콩이 싹틀 때 뿌리가 먼저 나오고, 떡잎 두 장이 땅 위로 올라온 뒤, 본잎이 나고 줄기가 자라며 떡잎은 쭈글쭈글해지는 순서를 나타낸 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <rect x="0" y="196" width="480" height="114" fill="${DG_C.a}" fill-opacity=".55"/>
        <line x1="0" y1="196" x2="480" y2="196" stroke="${DG_C.c}" stroke-width="3"/>
        <g class="s0">
          ${root(84, 222, 40)}
          <g transform="translate(84,216)">${bean(1.3, -20)}</g>
        </g>
        <g class="s1">
          ${root(240, 200, 62)}
          <path d="M240 200 V132" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/>
          ${coty(240, 128, 1.15)}
        </g>
        <g class="s2">
          ${root(396, 200, 70)}
          <path d="M396 200 V74" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/>
          ${coty(396, 166, 0.85, '#e5e5b0')}
          ${leaf(396, 80, -150, 1)}${leaf(396, 80, -30, 1)}
          ${leaf(396, 120, -170, 0.75)}${leaf(396, 120, -10, 0.75)}
        </g>
        ${['뿌리', '떡잎', '본잎'].map((t, i) => `<text class="l${i}" x="${84 + i * 156}" y="294" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${i + 1}. ${t}</text>`).join('')}
        <path class="pt0" d="${arw(114, 248, 92, 244, 8)}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>
        <path class="pt1" d="${arw(296, 110, 262, 124, 8)}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>
        <path class="pt2" d="${arw(452, 56, 430, 70, 8)}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          for (let i = 0; i < 3; i++) {
            const st = 300 + i * 1600, f = dgEase(dgP(e, st, 900));
            q('.s' + i).setAttribute('opacity', f);
            q('.s' + i).setAttribute('transform', `translate(0,${(16 * (1 - f)).toFixed(1)})`);
            q('.l' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
            q('.pt' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
          }
        });
      }
    },

    's3-07:2': {
      alt: '강낭콩 꽃이 지고 그 자리에 열매인 꼬투리가 생기며, 꼬투리 속 콩알 하나하나가 씨인 것을 순서대로 나타낸 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <g class="p0" transform="translate(80,128)">
          <path d="M0 40 V10" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/>
          <path d="M0 8 C-30 0 -34 -40 0 -44 C34 -40 30 0 0 8 Z" fill="#f6ecfb" stroke="${PUR}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M0 8 C-24 4 -30 -10 -14 -18 C-6 -10 -2 0 0 8 Z M0 8 C24 4 30 -10 14 -18 C6 -10 2 0 0 8 Z" fill="#fff" stroke="${PUR}" stroke-width="2.5" stroke-linejoin="round"/>
        </g>
        <g class="p1" transform="translate(240,128)">
          <path d="M-54 -26 C-30 10 30 22 60 6 C40 30 -30 26 -60 -20 Z" fill="${LEAF}" stroke="${DG_C.r}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M-58 -24 l-8 -10" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/>
        </g>
        <g class="p2" transform="translate(400,128)">
          <path d="M-62 -10 C-30 -24 30 -24 62 -10 C30 30 -30 30 -62 -10 Z" fill="${GRN}" stroke="${DG_C.r}" stroke-width="3" stroke-linejoin="round"/>
          ${[-39, -13, 13, 39].map(x => `<g transform="translate(${x},3)">${bean(0.72)}</g>`).join('')}
        </g>
        <path class="a0" d="${arw(124, 128, 166, 128)}" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="a1" d="${arw(306, 128, 330, 128)}" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="t0"><text x="80" y="218" text-anchor="middle" fill="${PUR}" font-size="22" font-weight="800">꽃</text></g>
        <g class="t1"><text x="240" y="218" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">꼬투리</text>
          <text x="240" y="246" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">= 열매</text></g>
        <g class="t2"><text x="400" y="218" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">콩알</text>
          <text x="400" y="246" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">= 씨</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          for (let i = 0; i < 3; i++) {
            const st = 300 + i * 1500;
            q('.p' + i).setAttribute('opacity', dgP(e, st, 600));
            q('.t' + i).setAttribute('opacity', e > st + 600 ? 1 : 0);
            if (i < 2) q('.a' + i).setAttribute('opacity', e > st + 1000 ? 1 : 0);
          }
        });
      }
    },

    's3-07:3': {
      alt: '한해살이 식물인 벼는 봄에 싹이 터 자라고 가을에 열매를 맺은 뒤 겨울에 죽고, 여러해살이 식물인 감나무는 해마다 열매를 맺는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <text x="12" y="34" fill="${DG_C.c}" font-size="22" font-weight="800">한해살이</text>
        <text x="112" y="34" fill="${DG_C.sub}" font-size="18" font-weight="700">벼</text>
        <line x1="12" y1="122" x2="468" y2="122" stroke="#d2d2d7" stroke-width="3"/>
        ${['봄', '여름', '가을', '겨울'].map((t, k) => `<g class="r${k}"><g transform="translate(${70 + k * 112},120)">${rice(k)}</g>
          <text x="${70 + k * 112}" y="150" text-anchor="middle" fill="${k === 3 ? '#8e8e93' : DG_C.ink}" font-size="20" font-weight="700">${t}</text></g>
          ${k < 3 ? `<path class="ra${k}" d="${arw(108 + k * 112, 96, 144 + k * 112, 96, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`).join('')}
        <text class="die" x="406" y="64" text-anchor="middle" fill="#8e8e93" font-size="18" font-weight="800">죽어요</text>
        <line x1="12" y1="172" x2="468" y2="172" stroke="#e5e5ea" stroke-width="2"/>
        <text x="12" y="206" fill="${DG_C.r}" font-size="22" font-weight="800">여러해살이</text>
        <text x="132" y="206" fill="${DG_C.sub}" font-size="18" font-weight="700">감나무</text>
        <line x1="12" y1="290" x2="468" y2="290" stroke="#d2d2d7" stroke-width="3"/>
        ${[0, 1, 2].map(k => `<g class="t${k}"><g transform="translate(${126 + k * 132},290)">${tree(0.82 + k * 0.17, 3 + k)}</g>
          <text x="${126 + k * 132}" y="318" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">${k + 1}년</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          for (let k = 0; k < 4; k++) {
            const st = 200 + k * 800;
            q('.r' + k).setAttribute('opacity', dgP(e, st, 400));
            if (k < 3) q('.ra' + k).setAttribute('opacity', e > st + 500 ? 1 : 0);
          }
          q('.die').setAttribute('opacity', e > 2900 ? 1 : 0);
          for (let k = 0; k < 3; k++) q('.t' + k).setAttribute('opacity', dgP(e, 3500 + k * 800, 500));
        });
      }
    },
  });
})();
