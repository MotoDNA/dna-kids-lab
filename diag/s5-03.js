/* 5학년 과학 · 돋보기로 보면 왜 크게 보일까? (s5-03) */
(() => {
  const drawL = (p, f) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - f); p.setAttribute('opacity', f > 0 ? 1 : 0); };
  /* 0: 프리즘 — 빨강이 가장 적게, 보라가 가장 많이 꺾임 */
  const SPEC = [
    ['빨강', '#ff3b30'], ['주황', '#ff9500'], ['노랑', '#ffcc00'], ['초록', '#34a853'],
    ['파랑', '#0071e3'], ['남색', '#3a3f9e'], ['보라', '#af52de'],
  ];
  const P1 = [158, 136], P2 = [240, 136];
  const sy = k => 120 + k * 24;

  /* 2: 볼록 렌즈 */
  const LX = 190, F = [360, 150], RY = [78, 114, 150, 186, 222];
  const after = y => { // 초점을 지나 조금 더 나아간 끝점
    const t = (450 - LX) / (F[0] - LX); return [450, y + (F[1] - y) * t];
  };

  /* 3: 나무 */
  const tree = (s, col) => `<g><rect x="${-4 * s}" y="${8 * s}" width="${8 * s}" height="${16 * s}" fill="#a2845e"/>
    <path d="M0 ${-26 * s} L${18 * s} ${10 * s} L${-18 * s} ${10 * s} Z" fill="${col}"/></g>`;

  Object.assign(DIAG, {
    's5-03:0': {
      alt: '햇빛이 프리즘을 통과하면서 꺾여 하얀 종이 위에 빨강, 주황, 노랑, 초록, 파랑, 남색, 보라의 여러 빛깔로 나뉘는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path class="in" d="M14 172 L${P1[0]} ${P1[1]}" fill="none" stroke="#c7a200" stroke-width="7" stroke-linecap="round"/>
        <text x="14" y="206" fill="${DG_C.ink}" font-size="20" font-weight="800">햇빛</text>
        ${SPEC.map((c, k) => `<path class="ry ry${k}" d="M${P2[0]} ${P2[1]} L382 ${sy(k)}" stroke="${c[1]}" stroke-width="4" stroke-linecap="round" fill="none"/>`).join('')}
        <path d="M200 56 L270 196 L130 196 Z" fill="${DG_C.b}" fill-opacity=".55" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/>
        <path class="mid" d="M${P1[0]} ${P1[1]} L${P2[0]} ${P2[1]}" stroke="#c7a200" stroke-width="6" stroke-linecap="round" fill="none"/>
        <text x="200" y="230" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">프리즘</text>
        <rect x="382" y="96" width="14" height="${sy(6) - 96 + 26}" rx="3" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
        ${SPEC.map((c, k) => `<g class="bd${k}"><rect x="382" y="${sy(k) - 9}" width="14" height="18" fill="${c[1]}"/>
          <text x="406" y="${sy(k) + 7}" fill="${DG_C.ink}" font-size="18" font-weight="700">${c[0]}</text></g>`).join('')}
        <text class="pp" x="389" y="84" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">하얀 종이</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          drawL(q('.in'), dgEase(dgP(e, 200, 900)));
          drawL(q('.mid'), dgP(e, 1100, 400));
          SPEC.forEach((c, k) => {
            drawL(q('.ry' + k), dgEase(dgP(e, 1500, 1200)));
            q('.bd' + k).setAttribute('opacity', e > 2800 + k * 300 ? 1 : 0);
          });
          q('.pp').setAttribute('opacity', e > 2700 ? 1 : 0);
        });
      }
    },

    's5-03:1': {
      alt: '공기에서 물로 비스듬히 들어간 빛은 경계에서 꺾이고, 수직으로 들어간 빛은 꺾이지 않고 그대로 나아가며, 물컵 속 젓가락이 수면에서 꺾여 보이는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="8" y="150" width="292" height="120" fill="${DG_C.b}" fill-opacity=".55"/>
        <line x1="8" y1="150" x2="300" y2="150" stroke="${DG_C.d}" stroke-width="3"/>
        <text x="14" y="140" fill="${DG_C.sub}" font-size="18" font-weight="700">공기</text>
        <text x="14" y="258" fill="${DG_C.d}" font-size="18" font-weight="700">물</text>
        <line x1="120" y1="96" x2="120" y2="206" stroke="${DG_C.sub}" stroke-width="2" stroke-dasharray="5 5"/>
        <path class="r1" d="M40 70 L120 150" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round"/>
        <path class="r1h" d="M70 88 l12 0 m-12 0 l0 12" transform="rotate(0)" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>
        <path class="r2" d="M120 150 L170 250" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round"/>
        <path class="g1" d="M120 150 L200 230" fill="none" stroke="${DG_C.c}" stroke-opacity=".35" stroke-width="3" stroke-dasharray="4 6"/>
        <text class="l1" x="40" y="58" fill="${DG_C.c}" font-size="18" font-weight="800">비스듬히</text>
        <text class="l2" x="178" y="244" fill="${DG_C.c}" font-size="20" font-weight="800">꺾여요</text>
        <path class="r3" d="M262 70 V250" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round"/>
        <text class="l3" x="262" y="58" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="800">수직</text>
        <text class="l4" x="256" y="292" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="800">그대로</text>
        <g class="cup">
          <path d="M326 80 L338 270 H446 L458 80" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M329 140 L338 270 H446 L455 140 Z" fill="${DG_C.b}" fill-opacity=".7"/>
          <line x1="329" y1="140" x2="455" y2="140" stroke="${DG_C.d}" stroke-width="2.5"/>
          <line x1="352" y1="40" x2="398" y2="140" stroke="#a2845e" stroke-width="8" stroke-linecap="round"/>
          <line x1="398" y1="140" x2="442" y2="174" stroke="#a2845e" stroke-width="8" stroke-linecap="round"/>
          <text x="392" y="296" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">꺾여 보여요</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.l1').setAttribute('opacity', e > 200 ? 1 : 0);
          drawL(q('.r1'), dgP(e, 300, 900));
          q('.r1h').setAttribute('opacity', 0);
          q('.g1').setAttribute('opacity', e > 1200 && e < 2000 ? 1 : 0);
          drawL(q('.r2'), dgP(e, 1300, 800));
          q('.l2').setAttribute('opacity', e > 2200 ? 1 : 0);
          q('.l3').setAttribute('opacity', e > 2600 ? 1 : 0);
          drawL(q('.r3'), dgP(e, 2700, 1200));
          q('.l4').setAttribute('opacity', e > 3900 ? 1 : 0);
          q('.cup').setAttribute('opacity', dgP(e, 4300, 600));
        });
      }
    },

    's5-03:2': {
      alt: '가운데가 두꺼운 볼록 렌즈를 통과한 나란한 햇빛이 굴절하여 한 곳으로 모이고, 빛이 모인 곳은 밝고 뜨거운 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="16" y="44" fill="${DG_C.ink}" font-size="20" font-weight="800">햇빛</text>
        <circle class="gl" cx="${F[0]}" cy="${F[1]}" r="22" fill="${DG_C.c}" fill-opacity=".3"/>
        ${RY.map((y, i) => { const [ex, ey] = after(y); return `<path class="ry${i}" d="M16 ${y} L${LX} ${y} L${ex} ${ey.toFixed(1)}" fill="none" stroke="#e0b000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`; }).join('')}
        <path d="M${LX} 56 Q${LX + 40} 150 ${LX} 244 Q${LX - 40} 150 ${LX} 56 Z" fill="${DG_C.b}" fill-opacity=".75" stroke="${DG_C.d}" stroke-width="3.5"/>
        <circle class="fp" cx="${F[0]}" cy="${F[1]}" r="7" fill="${DG_C.c}"/>
        <text x="${LX}" y="274" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">볼록 렌즈</text>
        <g class="lb"><text x="${F[0]}" y="214" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">빛이 모인 곳</text>
          <text x="${F[0]}" y="242" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="700">밝고 뜨거워요</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          RY.forEach((y, i) => drawL(q('.ry' + i), dgP(e, 300 + i * 120, 2200)));
          const g = dgEase(dgP(e, 2900, 900));
          q('.gl').setAttribute('r', 6 + 20 * g); q('.gl').setAttribute('opacity', g);
          q('.fp').setAttribute('opacity', e > 2700 ? 1 : 0);
          q('.lb').setAttribute('opacity', e > 3600 ? 1 : 0);
        });
      }
    },

    's5-03:3': {
      alt: '볼록 렌즈로 가까운 글자 가를 보면 실제보다 크게 보이고, 멀리 있는 나무를 보면 위아래가 거꾸로 보이는 두 장면을 비교한 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <defs><clipPath id="s503a"><circle cx="150" cy="130" r="58"/></clipPath><clipPath id="s503b"><circle cx="390" cy="130" r="58"/></clipPath></defs>
        <text x="120" y="30" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">가까운 물체</text>
        <text x="36" y="138" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">가</text>
        <text x="36" y="172" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">실제</text>
        <g class="m0">
          <line x1="192" y1="172" x2="222" y2="214" stroke="${DG_C.ink}" stroke-width="12" stroke-linecap="round"/>
          <circle cx="150" cy="130" r="58" fill="#fff"/>
          <g clip-path="url(#s503a)"><text class="big" x="150" y="156" text-anchor="middle" fill="${DG_C.ink}" font-size="76" font-weight="800">가</text></g>
          <circle cx="150" cy="130" r="58" fill="${DG_C.b}" fill-opacity=".3" stroke="${DG_C.d}" stroke-width="5"/>
        </g>
        <text class="t0" x="120" y="270" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">크게 보여요</text>
        <line x1="240" y1="20" x2="240" y2="280" stroke="#e5e5ea" stroke-width="2"/>
        <text x="350" y="30" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">먼 물체</text>
        <g transform="translate(272,132)">${tree(1.1, DG_C.r)}</g>
        <line x1="252" y1="159" x2="292" y2="159" stroke="${DG_C.sub}" stroke-width="2.5"/>
        <text x="272" y="190" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">실제</text>
        <g class="m1">
          <line x1="432" y1="172" x2="462" y2="214" stroke="${DG_C.ink}" stroke-width="12" stroke-linecap="round"/>
          <circle cx="390" cy="130" r="58" fill="#fff"/>
          <g clip-path="url(#s503b)"><g class="inv">
            <rect x="330" y="72" width="120" height="30" fill="${DG_C.a}" fill-opacity=".7"/>
            <line x1="330" y1="102" x2="450" y2="102" stroke="${DG_C.sub}" stroke-width="2.5"/>
            <g transform="translate(390,128) rotate(180)">${tree(1.1, DG_C.r)}</g></g></g>
          <circle cx="390" cy="130" r="58" fill="${DG_C.b}" fill-opacity=".3" stroke="${DG_C.d}" stroke-width="5"/>
        </g>
        <text class="t1" x="360" y="270" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">거꾸로 보여요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          const m0 = dgEase(dgP(e, 300, 1000));
          q('.m0').setAttribute('transform', `translate(${-60 * (1 - m0)},${40 * (1 - m0)})`);
          q('.m0').setAttribute('opacity', m0 > 0 ? 1 : 0);
          const k = dgEase(dgP(e, 1300, 800)), b = q('.big');
          b.setAttribute('transform', `translate(150 130) scale(${0.3 + 0.7 * k}) translate(-150 -130)`);
          q('.t0').setAttribute('opacity', e > 2200 ? 1 : 0);
          const m1 = dgEase(dgP(e, 3000, 1000));
          q('.m1').setAttribute('transform', `translate(${40 * (1 - m1)},${40 * (1 - m1)})`);
          q('.m1').setAttribute('opacity', m1 > 0 ? 1 : 0);
          // 렌즈 안 장면이 뒤집힘
          const r = dgEase(dgP(e, 4000, 1000));
          q('.inv').setAttribute('transform', `translate(390 130) rotate(${180 * (1 - r)}) translate(-390 -130)`);
          q('.t1').setAttribute('opacity', e > 5100 ? 1 : 0);
        });
      }
    },
  });
})();
