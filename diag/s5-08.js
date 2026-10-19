/* 6학년 과학 · 불은 어떻게 타고, 어떻게 끌까? (s5-08) */
(() => {
  const RED = '#ff3b30', YEL = '#ffcc00', BRN = '#a2845e';
  // 불꽃: (x,y)=불꽃 아래 끝, s=크기
  const flame = (cls, x, y, s = 1) => `<g class="${cls}"><path d="M${x} ${y} c${-14 * s} 0 ${-16 * s} ${-16 * s} ${-8 * s} ${-28 * s} c${4 * s} ${-6 * s} ${8 * s} ${-14 * s} ${8 * s} ${-22 * s} c${10 * s} ${10 * s} ${16 * s} ${26 * s} ${8 * s} ${42 * s} c${-2 * s} ${5 * s} ${-5 * s} ${8 * s} ${-8 * s} ${8 * s} Z" fill="${DG_C.c}"/>
    <path d="M${x} ${y - 2 * s} c${-6 * s} 0 ${-7 * s} ${-8 * s} ${-3 * s} ${-14 * s} c${2 * s} ${-3 * s} ${3 * s} ${-6 * s} ${3 * s} ${-9 * s} c${5 * s} ${5 * s} ${7 * s} ${12 * s} ${3 * s} ${19 * s} Z" fill="${YEL}"/></g>`;
  const rays = (cls, x, y, r0, r1) => `<g class="${cls}" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round">${[-150, -120, -60, -30, 0, 180].map(a => { const t = a * Math.PI / 180; return `<line x1="${(x + r0 * Math.cos(t)).toFixed(1)}" y1="${(y + r0 * Math.sin(t)).toFixed(1)}" x2="${(x + r1 * Math.cos(t)).toFixed(1)}" y2="${(y + r1 * Math.sin(t)).toFixed(1)}"/>`; }).join('')}</g>`;
  const heat = (cls, x, y) => `<g class="${cls}" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round">${[-14, 0, 14].map(d => `<path d="M${x + d} ${y} q6 -8 0 -16 q-6 -8 0 -16"/>`).join('')}</g>`;
  const setFlame = (g, x, y, k) => g.setAttribute('transform', `translate(${x} ${y}) scale(${Math.max(k, .001)}) translate(${-x} ${-y})`);

  Object.assign(DIAG, {
    's5-08:0': {
      alt: '촛불과 알코올램프가 타면서 빛과 열을 내고, 시간이 지나면 초의 길이와 알코올의 양이 줄어드는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="104" y="250" width="52" height="14" rx="4" fill="#d2d2d7"/>
        <rect class="cd" x="112" y="130" width="36" height="120" rx="5" fill="#fff4e8" stroke="${DG_C.c}" stroke-width="3"/>
        <rect x="112" y="130" width="36" height="120" rx="5" fill="none" stroke="${DG_C.sub}" stroke-width="2" stroke-dasharray="5 5"/>
        <line class="wk" x1="130" x2="130" stroke="${DG_C.ink}" stroke-width="3"/>
        <g class="cf"></g>
        ${rays('ry0', 130, 92, 34, 46)}${heat('ht0', 130, 50)}
        <text class="lt" x="64" y="96" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">빛</text>
        <text class="lh" x="178" y="42" fill="${RED}" font-size="22" font-weight="800">열</text>
        <defs><clipPath id="s508l"><path d="M300 270 a62 46 0 0 1 -4 -86 h88 a62 46 0 0 1 -4 86 Z"/></clipPath></defs>
        <rect class="lq" x="270" y="220" width="160" height="60" fill="${DG_C.b}" clip-path="url(#s508l)"/>
        <path d="M300 270 a62 46 0 0 1 -4 -86 h88 a62 46 0 0 1 -4 86 Z" fill="none" stroke="${DG_C.sub}" stroke-width="3"/>
        <line x1="270" y1="220" x2="300" y2="220" stroke="${DG_C.sub}" stroke-width="2" stroke-dasharray="5 5"/>
        <rect x="322" y="160" width="36" height="24" rx="4" fill="#d2d2d7" stroke="${DG_C.sub}" stroke-width="2.5"/>
        <line x1="340" y1="160" x2="340" y2="148" stroke="${DG_C.ink}" stroke-width="3"/>
        ${flame('lf', 340, 150, 1.1)}
        ${rays('ry1', 340, 120, 38, 50)}${heat('ht1', 340, 70)}
        <text x="130" y="292" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">초</text>
        <text x="340" y="292" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">알코올램프</text>
        <g class="lr"><text x="214" y="196" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="800">양이</text><text x="214" y="220" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="800">줄어요</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          const burn = dgP(e, 600, 5000);
          const top = 130 + 40 * burn;
          q('.cd').setAttribute('y', top); q('.cd').setAttribute('height', 250 - top);
          q('.wk').setAttribute('y1', top); q('.wk').setAttribute('y2', top - 10);
          q('.cf').innerHTML = flame('', 130, top - 8, 1);
          const f = dgP(e, 200, 500);
          q('.cf').setAttribute('opacity', f); q('.lf').setAttribute('opacity', f);
          const r = e > 900 ? 1 : 0, h = e > 1500 ? 1 : 0;
          q('.ry0').setAttribute('transform', `translate(0,${top - 130})`); q('.ht0').setAttribute('transform', `translate(0,${top - 130})`);
          qa('.ry0, .ry1, .lt').forEach(t => t.setAttribute('opacity', r));
          qa('.ht0, .ht1, .lh').forEach(t => t.setAttribute('opacity', h));
          q('.lq').setAttribute('y', 220 + 24 * burn);
          q('.lr').setAttribute('opacity', e > 3600 ? 1 : 0);
        });
      }
    },

    's5-08:1': {
      alt: '탈 물질, 산소, 발화점 이상의 온도를 세 꼭짓점으로 한 삼각형. 세 가지가 모두 있어야 불이 탄다',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <path class="s0" d="M90 236 L240 60" fill="none" stroke="${DG_C.sub}" stroke-width="5" stroke-linecap="round"/>
        <path class="s1" d="M240 60 L390 236" fill="none" stroke="${DG_C.sub}" stroke-width="5" stroke-linecap="round"/>
        <path class="s2" d="M390 236 L90 236" fill="none" stroke="${DG_C.sub}" stroke-width="5" stroke-linecap="round"/>
        <g class="v0"><circle cx="90" cy="236" r="14" fill="${BRN}"/><text x="90" y="274" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">탈 물질</text></g>
        <g class="v1"><circle cx="240" cy="60" r="14" fill="${DG_C.d}"/><text x="240" y="34" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">산소</text></g>
        <g class="v2"><circle cx="390" cy="236" r="14" fill="${RED}"/><text x="390" y="274" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">발화점 이상의</text>
          <text x="390" y="300" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">온도</text></g>
        ${flame('fl', 240, 210, 2.2)}
        <text class="lb" x="240" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">연소</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const len = (p, f) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - f); };
        dgAnim(el, 5400, e => {
          [0, 1, 2].forEach(i => {
            q('.v' + i).setAttribute('opacity', dgP(e, 200 + i * 1000, 400));
            len(q('.s' + i), dgEase(dgP(e, 600 + i * 1000, 700)));
          });
          const k = dgEase(dgP(e, 3500, 900));
          setFlame(q('.fl'), 240, 210, k);
          q('.lb').setAttribute('opacity', e > 4300 ? 1 : 0);
        });
      }
    },

    's5-08:2': {
      alt: '초가 탄 뒤 집기병 안쪽 벽에 붙인 푸른색 염화 코발트 종이가 붉게 변해 물이 생긴 것을 알 수 있고, 석회수를 넣고 흔들면 뿌옇게 흐려져 이산화 탄소가 생긴 것을 알 수 있는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <text x="120" y="36" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">염화 코발트 종이</text>
        <rect x="88" y="232" width="64" height="12" rx="3" fill="#d2d2d7"/>
        <rect x="112" y="186" width="16" height="46" rx="3" fill="#fff4e8" stroke="${DG_C.c}" stroke-width="2.5"/>
        <line x1="120" y1="186" x2="120" y2="178" stroke="${DG_C.ink}" stroke-width="2.5"/>
        ${flame('cf', 120, 180, .9)}
        <path d="M54 244 V84 q0 -24 24 -24 h84 q24 0 24 24 V244" fill="${DG_C.b}" fill-opacity=".25" stroke="${DG_C.sub}" stroke-width="3"/>
        <rect x="62" y="96" width="16" height="66" rx="3" fill="${DG_C.d}"/>
        <rect class="cp" x="62" y="96" width="16" height="66" rx="3" fill="${RED}"/>
        <line x1="70" y1="48" x2="70" y2="94" stroke="${DG_C.sub}" stroke-width="2"/>
        <g class="dr">${[[96, 104], [150, 96], [164, 130], [92, 140]].map(d => `<path d="M${d[0]} ${d[1]} q4 6 0 9 q-4 -3 0 -9 Z" fill="${DG_C.d}"/>`).join('')}</g>
        <text class="r0" x="120" y="278" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">푸른색 → 붉은색</text>
        <text class="r0" x="120" y="304" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">물이 생겼어요</text>
        <line x1="240" y1="50" x2="240" y2="300" stroke="#e5e5ea" stroke-width="2"/>
        <g class="jar"><path d="M300 244 V96 q0 -16 16 -16 h18 v-14 h52 v14 h18 q16 0 16 16 V244 a10 10 0 0 1 -10 10 H310 a10 10 0 0 1 -10 -10 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
          <path d="M303 196 H417 V244 a8 8 0 0 1 -8 8 H311 a8 8 0 0 1 -8 -8 Z" fill="${DG_C.b}" fill-opacity=".6"/>
          <path class="mk" d="M303 196 H417 V244 a8 8 0 0 1 -8 8 H311 a8 8 0 0 1 -8 -8 Z" fill="#e5e5ea"/>
          ${[[330, 214], [356, 230], [388, 212], [400, 236], [342, 240], [372, 220]].map(d => `<circle class="mk" cx="${d[0]}" cy="${d[1]}" r="4" fill="#fff"/>`).join('')}</g>
        <text x="360" y="58" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">석회수</text>
        <text class="r1" x="360" y="278" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">뿌옇게 흐려짐</text>
        <text class="r1" x="360" y="304" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">이산화 탄소가 생겼어요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          q('.dr').setAttribute('opacity', dgP(e, 600, 800));
          q('.cp').setAttribute('opacity', dgEase(dgP(e, 1300, 1200)));
          qa('.r0').forEach(t => t.setAttribute('opacity', e > 2500 ? 1 : 0));
          // 병을 흔들기
          const sh = e > 3200 && e < 4400 ? Math.sin((e - 3200) / 60) * 8 * (1 - (e - 3200) / 1200) : 0;
          q('.jar').setAttribute('transform', `rotate(${sh} 360 254)`);
          qa('.mk').forEach(t => t.setAttribute('opacity', dgEase(dgP(e, 3400, 1500))));
          qa('.r1').forEach(t => t.setAttribute('opacity', e > 5000 ? 1 : 0));
        });
      }
    },

    's5-08:3': {
      alt: '촛불 심지를 자르면 탈 물질이 없어지고, 알코올램프 뚜껑을 덮으면 산소가 막히고, 물을 뿌리면 온도가 발화점 아래로 낮아져 불이 꺼지는 세 가지 방법',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <!-- 1. 심지 자르기 -->
        <rect x="68" y="150" width="36" height="80" rx="5" fill="#fff4e8" stroke="${DG_C.c}" stroke-width="3"/>
        <rect x="58" y="230" width="56" height="12" rx="4" fill="#d2d2d7"/>
        <line class="wk0" x1="86" y1="150" x2="86" y2="138" stroke="${DG_C.ink}" stroke-width="3"/>
        ${flame('f0', 86, 132, 1.1)}
        <g class="sc" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"><path d="M0 -6 L40 10 M0 6 L40 -10"/><circle cx="48" cy="14" r="7"/><circle cx="48" cy="-14" r="7"/></g>
        <!-- 2. 뚜껑 덮기 -->
        <path d="M216 236 a50 34 0 0 1 -4 -64 h56 a50 34 0 0 1 -4 64 Z" fill="${DG_C.b}" fill-opacity=".6" stroke="${DG_C.sub}" stroke-width="3"/>
        <rect x="226" y="154" width="28" height="18" rx="3" fill="#d2d2d7" stroke="${DG_C.sub}" stroke-width="2"/>
        <line x1="240" y1="154" x2="240" y2="144" stroke="${DG_C.ink}" stroke-width="3"/>
        ${flame('f1', 240, 146, 1.1)}
        <path class="cap" d="M220 0 V-50 q0 -14 20 -14 q20 0 20 14 V0 Z" fill="#d2d2d7" stroke="${DG_C.sub}" stroke-width="3"/>
        <!-- 3. 물 뿌리기 -->
        <path d="M352 236 L428 216 M352 216 L428 236" stroke="${BRN}" stroke-width="10" stroke-linecap="round"/>
        ${flame('f2', 390, 214, 1.8)}
        <g class="wt">${[[372, 0], [392, 30], [410, 10], [382, 60], [402, 76]].map((d, k) => `<path class="dp" data-k="${k}" d="M${d[0]} 0 q7 11 0 17 q-7 -6 0 -17 Z" fill="${DG_C.d}"/>`).join('')}</g>
        <line x1="160" y1="50" x2="160" y2="290" stroke="#e5e5ea" stroke-width="2"/><line x1="320" y1="50" x2="320" y2="290" stroke="#e5e5ea" stroke-width="2"/>
        ${[['심지 자르기', '탈 물질 없애기', BRN], ['뚜껑 덮기', '산소 막기', DG_C.d], ['물 뿌리기', '온도 낮추기', RED]].map((t, i) => `<g class="lb${i}">
          <text x="${80 + i * 160}" y="270" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${t[0]}</text>
          <text x="${80 + i * 160}" y="294" text-anchor="middle" fill="${t[2]}" font-size="18" font-weight="800">${t[1]}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 7200, e => {
          // 1: 가위가 다가와 심지를 자름
          const a = dgEase(dgP(e, 300, 900));
          q('.sc').setAttribute('transform', `translate(${150 - 54 * a},146)`);
          q('.sc').setAttribute('opacity', 1);
          const cut = e > 1300;
          q('.wk0').setAttribute('y2', cut ? 148 : 138);
          setFlame(q('.f0'), 86, 132, cut ? 1 - dgP(e, 1300, 500) : 1);
          q('.lb0').setAttribute('opacity', e > 1300 ? 1 : 0);
          // 2: 뚜껑이 내려와 덮음
          const b = dgEase(dgP(e, 2300, 1000));
          q('.cap').setAttribute('transform', `translate(0,${96 + 76 * b})`);
          setFlame(q('.f1'), 240, 146, 1 - dgP(e, 3200, 300));
          q('.lb1').setAttribute('opacity', e > 3300 ? 1 : 0);
          // 3: 물방울이 떨어짐
          qa('.dp').forEach(d => { const k = +d.dataset.k, t = dgP(e, 4300 + k * 150, 900); d.setAttribute('transform', `translate(0,${50 + 90 * t + [0, 24, 8, 44, 58][k]})`); d.setAttribute('opacity', t > 0 ? 1 : 0); });
          setFlame(q('.f2'), 390, 214, 1 - dgP(e, 5000, 800));
          q('.lb2').setAttribute('opacity', e > 5600 ? 1 : 0);
        });
      }
    },

    's5-08:4': {
      alt: '불이 나면 연기가 위로 차오르므로 젖은 수건으로 코와 입을 막고 몸을 낮춰 계단으로 대피하고, 승강기는 타지 않는 모습',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path class="sm" d="M0 50 H480 V112 q-20 14 -40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 V50 Z" fill="${DG_C.sub}" fill-opacity=".35"/>
        <text class="sm" x="24" y="92" fill="${DG_C.ink}" font-size="20" font-weight="800">연기는 위로 차올라요</text>
        <line x1="0" y1="252" x2="480" y2="252" stroke="${DG_C.sub}" stroke-width="3"/>
        <g class="kid">
          <circle cx="0" cy="-58" r="15" fill="${DG_C.a}" stroke="${DG_C.ink}" stroke-width="3"/>
          <rect x="-3" y="-58" width="20" height="12" rx="3" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2"/>
          <path d="M-8 -44 Q-30 -36 -40 -20 M-12 -40 L-8 -10 M-40 -20 L-44 0 M-40 -20 L-20 0 M-30 -32 L-4 -26" fill="none" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="96" y="286" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">젖은 수건 · 몸 낮게</text>
        <path class="ar" d="M190 210 H262 m-12 -10 l12 10 l-12 10" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M282 252 V230 H306 V208 H330 V186 H354 V164" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linejoin="round"/>
        <text x="318" y="286" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="800">계단으로</text>
        <rect x="392" y="150" width="68" height="102" rx="4" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3"/>
        <line x1="426" y1="150" x2="426" y2="252" stroke="${DG_C.sub}" stroke-width="2.5"/>
        <g class="no"><circle cx="426" cy="200" r="30" fill="none" stroke="${RED}" stroke-width="5"/><path d="M405 179 L447 221" stroke="${RED}" stroke-width="5"/></g>
        <text x="426" y="286" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">승강기 X</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5000, e => {
          const sm = dgEase(dgP(e, 200, 1200));
          qa('.sm').forEach(t => t.setAttribute('opacity', sm));
          q('.sm').setAttribute('transform', `translate(0,${-30 * (1 - sm)})`);
          const w = dgEase(dgP(e, 1400, 2200));
          q('.kid').setAttribute('transform', `translate(${60 + 70 * w},252)`);
          q('.ar').setAttribute('opacity', e > 2600 ? 1 : 0);
          q('.no').setAttribute('opacity', e > 3800 ? 1 : 0);
        });
      }
    },
  });
})();
