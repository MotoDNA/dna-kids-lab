/* 3학년 과학 · 지구와 달은 어떻게 생겼을까? (s3-09) */
(() => {
  const f2 = n => +n.toFixed(2);
  const SEA = DG_C.b, LAND = '#bfe5c5', MOON = '#e5e5ea', MARE = '#aeaeb2';
  // 지구 그림 (중심 0,0 / 반지름 r)
  const earth = (r, id) => `<clipPath id="${id}"><circle r="${r}"/></clipPath>
    <circle r="${r}" fill="${SEA}"/>
    <g clip-path="url(#${id})" transform="scale(${r / 100})">
      <path d="M-70 -60 C-40 -80 -10 -70 0 -50 C10 -30 -20 -20 -30 0 C-40 20 -60 10 -70 -10 C-90 -30 -90 -50 -70 -60 Z" fill="${LAND}" stroke="${DG_C.r}" stroke-width="3"/>
      <path d="M20 -10 C40 -30 70 -20 80 0 C90 30 60 50 40 70 C30 80 10 60 20 40 C25 20 5 10 20 -10 Z" fill="${LAND}" stroke="${DG_C.r}" stroke-width="3"/>
      <path d="M-40 60 C-20 50 0 70 -10 90 L-60 90 C-60 75 -55 65 -40 60 Z" fill="${LAND}" stroke="${DG_C.r}" stroke-width="3"/>
    </g>
    <circle r="${r}" fill="none" stroke="${DG_C.d}" stroke-width="3"/>`;
  const moon = (r, det) => `<circle r="${r}" fill="${MOON}" stroke="${DG_C.sub}" stroke-width="3"/>${det ? `<g transform="scale(${r / 100})">
      <path class="mare" d="M-60 -40 C-40 -64 -6 -60 -4 -36 C0 -14 -30 -4 -50 -10 C-70 -16 -74 -28 -60 -40 Z M10 -20 C30 -36 60 -30 62 -6 C64 14 40 24 22 16 C6 10 -2 -6 10 -20 Z M-30 20 C-12 12 6 26 0 42 C-6 56 -32 54 -40 40 C-44 30 -40 24 -30 20 Z" fill="${MARE}"/>
      ${[[40, 56, 13], [-58, 40, 9], [64, 30, 8], [20, -64, 9], [-20, 72, 7]].map(([x, y, cr]) => `<circle class="cr" cx="${x}" cy="${y}" r="${cr}" fill="#d1d1d6" stroke="#8e8e93" stroke-width="2.5"/>`).join('')}
    </g>` : ''}`;
  // O / X 표시
  const okMark = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="none" stroke="${DG_C.d}" stroke-width="5"/>`;
  const noMark = (x, y) => `<path d="M${x - 13} ${y - 13} L${x + 13} ${y + 13} M${x + 13} ${y - 13} L${x - 13} ${y + 13}" stroke="#ff3b30" stroke-width="5" stroke-linecap="round"/>`;

  /* 0: 둥근 지구와 배 */
  const C = { x: 200, y: 700 }, RR = 520, EYE = { x: 40, y: 158 };
  const surf = th => [C.x + RR * Math.sin(th * Math.PI / 180), C.y - RR * Math.cos(th * Math.PI / 180)];
  // 눈에서 지구에 닿는 접선(시선)
  const dx = C.x - EYE.x, dy = C.y - EYE.y, d = Math.hypot(dx, dy), base = Math.atan2(dy, dx), off = Math.asin(RR / d);
  const ang = base - off;               // 시계 반대 쪽 접선(위쪽)
  const sl = t => [EYE.x + Math.cos(ang) * t, EYE.y + Math.sin(ang) * t];
  const [lx, ly] = sl(520);
  const ship = `<path d="M-30 -2 L30 -2 L22 14 L-22 14 Z" fill="${DG_C.sub}"/>
    <rect x="-2" y="-70" width="4" height="68" fill="${DG_C.ink}"/>
    <path d="M3 -66 L3 -8 L34 -8 Z" fill="#fff" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M-3 -58 L-3 -10 L-26 -10 Z" fill="#fff" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M2 -70 l14 5 l-14 5 Z" fill="#ff3b30"/>`;
  const shipT = th => { const [x, y] = surf(th); return `translate(${f2(x)},${f2(y - 12)}) rotate(${th})`; };

  Object.assign(DIAG, {
    's3-09:0': {
      alt: '지구가 둥글기 때문에 멀리서 다가오는 배는 둥근 바다면에 가려 돛 꼭대기부터 보이기 시작하는 모습과, 지구 표면을 10칸으로 나누면 바다가 약 7칸, 육지가 약 3칸인 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <defs><clipPath id="s309sea"><rect x="0" y="0" width="480" height="236"/></clipPath><clipPath id="s309vis"><path d="M${EYE.x} ${EYE.y} L${f2(lx)} ${f2(ly)} L480 -40 L0 -40 L0 ${EYE.y} Z"/></clipPath></defs>
        <circle cx="${C.x}" cy="${C.y}" r="${RR}" fill="${SEA}" stroke="${DG_C.d}" stroke-width="3" clip-path="url(#s309sea)"/>
        <g clip-path="url(#s309sea)"><g class="shipF" opacity=".18">${ship}</g></g>
        <g clip-path="url(#s309vis)"><g class="shipV">${ship}</g></g>
        <g transform="translate(${EYE.x - 10},${EYE.y + 4})"><circle r="10" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/><path d="M0 10 V44" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/></g>
        <path class="sight" d="M${EYE.x} ${EYE.y} L${f2(sl(400)[0])} ${f2(sl(400)[1])}" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="8 7"/>
        <text class="msg" x="250" y="56" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">돛부터 보여요</text>
        <g class="bar">
          ${Array.from({ length: 10 }, (_, i) => `<rect class="cell" x="${40 + i * 40}" y="250" width="38" height="30" rx="6" fill="${i < 7 ? DG_C.d : DG_C.r}"/>`).join('')}
          <text x="${40 + 140}" y="312" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">바다 약 7칸</text>
          <text x="${40 + 340}" y="312" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">육지 약 3칸</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          const th = 31 - 10 * dgEase(dgP(e, 300, 2600));
          q('.shipF').setAttribute('transform', shipT(th));
          q('.shipV').setAttribute('transform', shipT(th));
          q('.sight').setAttribute('opacity', e > 300 ? 1 : 0);
          q('.msg').setAttribute('opacity', e > 2900 ? 1 : 0);
          qa('.cell').forEach((c, i) => c.setAttribute('opacity', e > 3600 + i * 120 ? 1 : 0));
          q('.bar').querySelectorAll('text').forEach(t => t.setAttribute('opacity', e > 4900 ? 1 : 0));
        });
      }
    },

    's3-09:1': {
      alt: '지구는 공기층으로 둘러싸여 있고 물이 있으며 알맞은 온도여서 많은 생물이 살 수 있다는 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <circle class="air" cx="140" cy="160" r="118" fill="#e8f2ff" stroke="${DG_C.b}" stroke-width="3"/>
        <g transform="translate(140,160)">${earth(92, 's309e1')}</g>
        <g class="cloud">${[[86, 66], [210, 84], [62, 232]].map(([x, y]) => `<path transform="translate(${x},${y})" d="M-18 6 q-4 -14 10 -14 q4 -10 16 -6 q12 -2 12 10 q8 2 4 10 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="2"/>`).join('')}</g>
        <text class="airl" x="140" y="30" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">공기</text>
        ${['공기', '물', '알맞은 온도'].map((t, i) => `<g class="ck${i}"><path d="M292 ${76 + i * 50} l8 9 l16 -18" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="326" y="${84 + i * 50}" fill="${DG_C.ink}" font-size="22" font-weight="800">${t}</text></g>`).join('')}
        <g class="life"><rect x="284" y="226" width="184" height="48" rx="24" fill="${DG_C.r}"/>
          <text x="376" y="258" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">생물이 살아요</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const a = dgEase(dgP(e, 300, 1000));
          q('.air').setAttribute('r', 92 + 26 * a);
          q('.airl').setAttribute('opacity', a >= 1 ? 1 : 0);
          q('.cloud').setAttribute('opacity', dgP(e, 1300, 500));
          for (let i = 0; i < 3; i++) q('.ck' + i).setAttribute('opacity', dgP(e, 1800 + i * 700, 400));
          q('.life').setAttribute('opacity', dgP(e, 4200, 500));
        });
      }
    },

    's3-09:2': {
      alt: '달의 지름은 지구의 약 4분의 1이어서 달 네 개를 늘어놓으면 지구 지름과 비슷하고, 달 표면(확대한 모습)에는 어둡게 보이는 달의 바다와 둥근 충돌 구덩이가 있는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <g transform="translate(90,124)">${earth(64, 's309e2')}</g>
        <text x="90" y="42" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">지구</text>
        <path d="M26 206 v-12 M154 206 v-12 M26 200 H154" stroke="${DG_C.sub}" stroke-width="2.5"/>
        ${[0, 1, 2, 3].map(k => `<g class="mn mn${k}">${moon(16, false)}</g>`).join('')}
        <text class="qt" x="90" y="276" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">달 4개 ≈ 지구</text>
        <text class="qt" x="90" y="304" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">지름 약 1/4</text>
        <line x1="190" y1="40" x2="190" y2="300" stroke="#e5e5ea" stroke-width="2"/>
        <g class="big" transform="translate(345,165)">${moon(88, true)}</g>
        <text class="zm" x="470" y="50" text-anchor="end" fill="${DG_C.sub}" font-size="18" font-weight="700">확대한 모습</text>
        <g class="lb1"><path d="M310 140 L262 88" stroke="${DG_C.ink}" stroke-width="2.5"/><circle cx="310" cy="140" r="4" fill="${DG_C.ink}"/>
          <text x="206" y="50" fill="${DG_C.ink}" font-size="20" font-weight="800">달의 바다</text>
          <text x="206" y="76" fill="${DG_C.sub}" font-size="18" font-weight="700">(물 없음)</text></g>
        <g class="lb2"><path d="M380 214 L410 282" stroke="${DG_C.ink}" stroke-width="2.5"/><circle cx="380" cy="214" r="4" fill="${DG_C.ink}"/>
          <text x="470" y="304" text-anchor="end" fill="${DG_C.ink}" font-size="20" font-weight="800">충돌 구덩이</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          for (let k = 0; k < 4; k++) {
            const f = dgEase(dgP(e, 400 + k * 500, 500));
            const x = 260 + (42 + 32 * k - 260) * f; // 오른쪽에서 날아와 한 줄로
            const xx = k === 0 ? 42 : x;
            q('.mn' + k).setAttribute('transform', `translate(${(k === 0 ? 42 : x).toFixed(1)},226)`);
            q('.mn' + k).setAttribute('opacity', k === 0 ? dgP(e, 100, 300) : (f > 0 ? 1 : 0));
          }
          qa('.qt').forEach(t => t.setAttribute('opacity', e > 2500 ? 1 : 0));
          q('.big').setAttribute('opacity', dgP(e, 2900, 600));
          q('.zm').setAttribute('opacity', dgP(e, 2900, 600));
          q('.lb1').setAttribute('opacity', e > 3800 ? 1 : 0);
          q('.lb2').setAttribute('opacity', e > 4700 ? 1 : 0);
        });
      }
    },

    's3-09:3': {
      alt: '지구에는 공기, 물, 생물이 있지만 달에는 공기, 물, 생물이 없다는 것을 표로 비교한 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g transform="translate(250,64)">${earth(34, 's309e3')}</g>
        <g transform="translate(390,64)">${moon(34, false)}<circle cx="-12" cy="-8" r="8" fill="${MARE}"/><circle cx="10" cy="10" r="6" fill="${MARE}"/></g>
        <text x="250" y="126" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">지구</text>
        <text x="390" y="126" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="800">달</text>
        ${['공기', '물', '생물'].map((t, i) => { const y = 176 + i * 52; return `<g class="row${i}">
          <rect x="20" y="${y - 24}" width="440" height="46" rx="12" fill="${i % 2 ? '#fff' : '#f5f5f7'}"/>
          <text x="90" y="${y + 7}" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${t}</text>
          ${okMark(250, y - 1)}${noMark(390, y - 1)}
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 3800, e => {
          for (let i = 0; i < 3; i++) q('.row' + i).setAttribute('opacity', dgP(e, 400 + i * 900, 500));
        });
      }
    },
  });
})();
