/* 5학년 과학 · 그림자는 왜 생길까? (s3-03) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  const LIGHT = '#fff3b0', BEAM = '#ffcc00', DARK = '#2c2c34', SH = '#3a3a3c';
  // 손전등 (빛 나오는 곳이 0,0 / 오른쪽을 향함)
  const torch = `<rect x="-58" y="-12" width="44" height="24" rx="6" fill="${DG_C.sub}"/><path d="M-16 -16 L0 -22 V22 L-16 16 Z" fill="${DG_C.sub}"/><rect x="-1" y="-22" width="4" height="44" rx="2" fill="${BEAM}"/>`;
  // 광원 S에서 점 P를 지나 x=X 까지 연장한 y
  const ext = (S, P, X) => S.y + (P.y - S.y) * (X - S.x) / (P.x - S.x);

  /* 1 */
  const S1 = { x: 70, y: 150 }, OB1 = { x: 220, top: 112, bot: 172 }, WX = 420;
  /* 3 */
  const S3 = { x: 60, y: 136 }, W3 = 440, H3 = 44;

  Object.assign(DIAG, {
    's3-03:0': {
      alt: '어두운 곳에서 손전등 빛이 곧게 뻗어 나가다가 물체에 막히면 물체 뒤쪽으로는 빛이 가지 못하는 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <rect x="0" y="0" width="480" height="280" rx="16" fill="${DARK}"/>
        <g transform="translate(80,140)">${torch}</g>
        ${[-36, -24, -12, 0, 12, 24, 36].map((a, i) => `<line class="ry ry${i}" x1="84" y1="140" x2="84" y2="140" stroke="${BEAM}" stroke-width="4" stroke-linecap="round"/>`).join('')}
        <rect class="box" x="300" y="150" width="28" height="74" rx="4" fill="${DG_C.c}"/>
        <text class="lb1" x="160" y="40" text-anchor="middle" fill="${LIGHT}" font-size="22" font-weight="800" stroke="${DARK}" stroke-width="8" paint-order="stroke">빛은 곧게 나아가요</text>
        <text class="lb2" x="410" y="214" text-anchor="middle" fill="#aeaeb2" font-size="20" font-weight="800">빛이 못 가요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const A = [-36, -24, -12, 0, 12, 24, 36];
        dgAnim(el, 4600, e => {
          const box = e > 2200;
          A.forEach((a, i) => {
            const r = a * Math.PI / 180, f = dgEase(dgP(e, 200, 1600));
            let L = 460 * f;
            // 상자(물체)에 막히는 빛
            const yAt = x => 140 + Math.tan(r) * (x - 84);
            if (box && yAt(300) >= 150 && yAt(300) <= 224) L = Math.min(L, (300 - 84) / Math.cos(r));
            q('.ry' + i).setAttribute('x2', f2(84 + L * Math.cos(r)));
            q('.ry' + i).setAttribute('y2', f2(140 + L * Math.sin(r)));
          });
          q('.box').setAttribute('opacity', box ? 1 : 0);
          q('.lb1').setAttribute('opacity', e > 1400 ? 1 : 0);
          q('.lb2').setAttribute('opacity', e > 3000 ? 1 : 0);
        });
      }
    },

    's3-03:1': {
      alt: '손전등, 물체, 벽(스크린) 순서로 놓으면 곧게 나아가던 빛이 물체에 막혀 벽에 물체와 비슷한 모양의 그림자가 생기는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="${WX}" y="40" width="22" height="230" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3"/>
        <path class="beam" d="M${S1.x} ${S1.y} L${WX} ${f2(ext(S1, { x: OB1.x, y: OB1.top - 40 }, WX))} L${WX} ${f2(ext(S1, { x: OB1.x, y: OB1.bot + 40 }, WX))} Z" fill="${LIGHT}"/>
        <path class="shd" d="M${OB1.x} ${OB1.top} L${WX} ${f2(ext(S1, { x: OB1.x, y: OB1.top }, WX))} L${WX} ${f2(ext(S1, { x: OB1.x, y: OB1.bot }, WX))} L${OB1.x} ${OB1.bot} Z" fill="#e5e5ea"/>
        <path class="edge" d="M${S1.x} ${S1.y} L${WX} ${f2(ext(S1, { x: OB1.x, y: OB1.top }, WX))} M${S1.x} ${S1.y} L${WX} ${f2(ext(S1, { x: OB1.x, y: OB1.bot }, WX))}" stroke="${BEAM}" stroke-width="3" stroke-dasharray="7 6"/>
        <rect class="ws" x="${WX}" y="${f2(ext(S1, { x: OB1.x, y: OB1.top }, WX))}" width="22" height="${f2(ext(S1, { x: OB1.x, y: OB1.bot }, WX) - ext(S1, { x: OB1.x, y: OB1.top }, WX))}" fill="${SH}"/>
        <g transform="translate(${S1.x},${S1.y})">${torch}</g>
        <g transform="translate(${OB1.x},${(OB1.top + OB1.bot) / 2})"><rect x="-8" y="-30" width="16" height="60" rx="6" fill="${DG_C.c}"/><circle cx="0" cy="-40" r="12" fill="${DG_C.c}"/></g>
        <text x="${S1.x - 20}" y="210" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">빛</text>
        <text x="${OB1.x}" y="${OB1.bot + 40}" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">물체</text>
        <text x="${WX + 11}" y="294" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">스크린</text>
        <g class="lab"><text x="${WX - 12}" y="${f2(ext(S1, { x: OB1.x, y: OB1.bot }, WX) + 30)}" text-anchor="end" fill="${DG_C.ink}" font-size="22" font-weight="800">그림자</text>
          <path d="${arw(WX - 60, ext(S1, { x: OB1.x, y: OB1.bot }, WX) + 10, WX - 6, ext(S1, { x: OB1.x, y: OB1.bot }, WX) - 14, 8)}" fill="none" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          q('.beam').setAttribute('opacity', dgP(e, 200, 600));
          q('.shd').setAttribute('opacity', dgP(e, 1200, 600));
          q('.edge').setAttribute('opacity', dgP(e, 1200, 600));
          q('.ws').setAttribute('opacity', dgP(e, 2000, 600));
          q('.lab').setAttribute('opacity', e > 2800 ? 1 : 0);
        });
      }
    },

    's3-03:2': {
      alt: '빛이 대부분 통과하는 유리컵은 연한 그림자가, 빛이 통과하지 못하는 도자기 컵은 진한 그림자가 생기는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${[0, 1].map(k => { const y = k ? 234 : 110, op = !k; return `<g>
          <g transform="translate(64,${y})">${torch}</g>
          <path d="M68 ${y} L180 ${y - 46} L180 ${y + 46} Z" fill="${LIGHT}"/>
          <path class="sh${k}" d="M200 ${y - 34} L440 ${y - 52} L440 ${y + 42} L200 ${y + 30} Z" fill="${k ? SH : '#d1d1d6'}" fill-opacity="${k ? 0.9 : 0.6}"/>
          ${op ? `<path d="M176 ${y - 36} H224 L218 ${y + 34} H182 Z" fill="${DG_C.b}" fill-opacity=".35" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>`
               : `<path d="M176 ${y - 36} H224 L218 ${y + 34} H182 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/><path d="M224 ${y - 22} q20 4 16 22 q-4 14 -18 12" fill="none" stroke="${DG_C.sub}" stroke-width="5"/><path d="M180 ${y - 4} H221" stroke="${DG_C.d}" stroke-width="5"/>`}
          <rect x="440" y="${y - 70}" width="14" height="130" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="2"/>
          <text x="200" y="${y + 62}" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${k ? '도자기 컵' : '유리컵'}</text>
          <text class="t${k}" x="340" y="${y + 6}" text-anchor="middle" fill="${k ? '#fff' : DG_C.ink}" font-size="20" font-weight="800">${k ? '진한 그림자' : '연한 그림자'}</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 3600, e => {
          [0, 1].forEach(k => {
            const f = dgP(e, 500 + k * 1300, 700);
            q('.sh' + k).setAttribute('opacity', f);
            q('.t' + k).setAttribute('opacity', f >= 1 ? 1 : 0);
          });
        });
      }
    },

    's3-03:3': {
      alt: '물체를 손전등에 가까이 가져가면 스크린의 그림자가 커지고 멀리 하면 작아지며, 원기둥은 세우면 네모, 눕혀서 밑면을 비추면 동그라미 그림자가 생기는 그림',
      svg: `<svg viewBox="0 0 480 350" class="dg-svg" role="img">
        <rect x="${W3}" y="36" width="16" height="200" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="2.5"/>
        <path class="bm" d="" fill="${LIGHT}"/>
        <rect class="ws" x="${W3}" y="0" width="16" height="0" fill="${SH}"/>
        <g transform="translate(${S3.x},${S3.y})">${torch}</g>
        <rect class="ob" x="0" y="${S3.y - H3 / 2}" width="12" height="${H3}" rx="3" fill="${DG_C.c}"/>
        <text class="msg" x="230" y="228" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">가까우면 커요</text>
        <line x1="12" y1="248" x2="468" y2="248" stroke="#e5e5ea" stroke-width="2"/>
        <g class="cy" transform="translate(0,18)">
          <g transform="translate(70,276)"><ellipse cx="0" cy="-26" rx="16" ry="6" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/><path d="M-16 -26 V22 A16 6 0 0 0 16 22 V-26" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/></g>
          <path d="${arw(98, 276, 128, 276, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
          <rect x="140" y="246" width="36" height="58" fill="${SH}"/>
          <text x="158" y="324" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">네모</text>
          <g transform="translate(300,276)"><path d="M-30 -18 H20 A8 18 0 0 1 20 18 H-30" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/><ellipse cx="-30" cy="0" rx="8" ry="18" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/></g>
          <path d="${arw(334, 276, 364, 276, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
          <circle cx="398" cy="276" r="24" fill="${SH}"/>
          <text x="398" y="324" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">동그라미</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          // 물체 위치: 스크린 가까이(380) → 손전등 가까이(150)
          const m = dgEase(dgP(e, 600, 2600)), x = 380 - 230 * m;
          q('.ob').setAttribute('x', f2(x - 6));
          const top = ext(S3, { x, y: S3.y - H3 / 2 }, W3), bot = ext(S3, { x, y: S3.y + H3 / 2 }, W3);
          const bTop = ext(S3, { x: 100, y: S3.y - 40 }, W3), bBot = ext(S3, { x: 100, y: S3.y + 40 }, W3);
          q('.bm').setAttribute('d', `M${S3.x} ${S3.y} L${W3} ${f2(Math.max(36, bTop))} L${W3} ${f2(Math.min(236, bBot))} Z`);
          q('.ws').setAttribute('y', f2(top)); q('.ws').setAttribute('height', f2(bot - top));
          q('.msg').setAttribute('opacity', e > 3300 ? 1 : 0);
          q('.cy').setAttribute('opacity', dgP(e, 4300, 600));
        });
      }
    },

    's3-03:4': {
      alt: '빛이 거울에 부딪치면 방향이 바뀌어 되돌아 나오는 빛의 반사와, 좌우를 바꿔 쓴 구급차 글자가 거울 속에서는 바르게 보이는 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="30" y="220" width="200" height="12" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
        <path d="${Array.from({ length: 10 }, (_, i) => `M${40 + i * 20} 232 l-10 12`).join(' ')}" stroke="${DG_C.sub}" stroke-width="2"/>
        <text x="130" y="272" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">거울</text>
        <line x1="130" y1="220" x2="130" y2="90" stroke="#c7c7cc" stroke-width="2" stroke-dasharray="5 5"/>
        <g transform="translate(46,99) rotate(55)">${torch}</g>
        <path class="r1" d="" fill="none" stroke="${BEAM}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="r2" d="" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="rl" x="130" y="58" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">빛의 반사</text>
        <line x1="256" y1="30" x2="256" y2="290" stroke="#e5e5ea" stroke-width="2"/>
        <rect x="278" y="76" width="180" height="62" rx="14" fill="#fff" stroke="${DG_C.sub}" stroke-width="3"/>
        <text x="368" y="118" text-anchor="middle" fill="#ff3b30" font-size="28" font-weight="800" transform="translate(736,0) scale(-1,1)">구급차</text>
        <text x="368" y="164" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">차 앞에 쓴 글자</text>
        <g class="mir">
          <path d="${arw(368, 176, 368, 196, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
          <rect x="278" y="204" width="180" height="62" rx="14" fill="${DG_C.b}" fill-opacity=".5" stroke="${DG_C.d}" stroke-width="3"/>
          <text x="368" y="246" text-anchor="middle" fill="#ff3b30" font-size="28" font-weight="800">구급차</text>
          <text x="368" y="292" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">거울 속 모습</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const P0 = [62, 122], H = [130, 220], P1 = [198, 122];
        dgAnim(el, 4800, e => {
          const a = dgEase(dgP(e, 300, 1000)), b = dgEase(dgP(e, 1300, 1000));
          q('.r1').setAttribute('d', a > 0 ? arw(P0[0], P0[1], P0[0] + (H[0] - P0[0]) * a, P0[1] + (H[1] - P0[1]) * a, 11) : '');
          q('.r2').setAttribute('d', b > 0 ? arw(H[0], H[1], H[0] + (P1[0] - H[0]) * b, H[1] + (P1[1] - H[1]) * b, 11) : '');
          q('.rl').setAttribute('opacity', e > 2400 ? 1 : 0);
          q('.mir').setAttribute('opacity', dgP(e, 3200, 600));
        });
      }
    },
  });
})();
