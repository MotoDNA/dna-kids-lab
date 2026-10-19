/* 4학년 과학 · 태양계에는 어떤 행성들이 있을까? (s5-04) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  const SUN = '#ffcc00', SUNS = DG_C.c;
  const sun = (r, rays = true) => `${rays ? Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<line x1="${f2(Math.cos(a) * (r + 6))}" y1="${f2(Math.sin(a) * (r + 6))}" x2="${f2(Math.cos(a) * (r + 16))}" y2="${f2(Math.sin(a) * (r + 16))}" stroke="${SUNS}" stroke-width="4" stroke-linecap="round"/>`; }).join('') : ''}<circle r="${r}" fill="${SUN}" stroke="${SUNS}" stroke-width="3"/>`;
  const star = (r, col = '#ffcc00') => { let d = ''; for (let i = 0; i < 10; i++) { const a = (i * 36 - 90) * Math.PI / 180, rr = i % 2 ? r * 0.45 : r; d += `${i ? 'L' : 'M'}${f2(Math.cos(a) * rr)} ${f2(Math.sin(a) * rr)} `; } return `<path d="${d}Z" fill="${col}" stroke="${DG_C.c}" stroke-width="1.5" stroke-linejoin="round"/>`; };

  /* 1, 2: 행성 */
  const PL = [
    { n: '수성', d: 0.4, col: '#c7c7cc', r: 6, rock: 1 },
    { n: '금성', d: 0.9, col: '#ffd6a5', r: 9, rock: 1 },
    { n: '지구', d: 1, col: '#5aa9ff', r: 10, rock: 1 },
    { n: '화성', d: 0.5, col: '#ff8a65', r: 7, rock: 1 },
    { n: '목성', d: 11.2, col: '#e9c39b', r: 24, rock: 0 },
    { n: '토성', d: 9.4, col: '#f3dc9a', r: 20, rock: 0, ring: 1 },
    { n: '천왕성', d: 4.0, col: '#9fe3e8', r: 15, rock: 0 },
    { n: '해왕성', d: 3.9, col: '#6d8cff', r: 15, rock: 0 },
  ];
  const PX = [96, 140, 186, 230, 282, 342, 398, 448];

  /* 4: 북두칠성 */
  const DIP = [[130, 278], [166, 256], [198, 252], [234, 258], [242, 292], [304, 284], [296, 246]]; // 알카이드→…→메라크(5)→두베(6)
  const MER = DIP[5], DUB = DIP[6], dv = [DUB[0] - MER[0], DUB[1] - MER[1]];
  const POL = [DUB[0] + 5 * dv[0], DUB[1] + 5 * dv[1]];

  /* 3: 별자리와 움직이는 행성 */
  const BG = [[60, 210], [104, 186], [150, 200], [190, 170], [236, 196], [300, 180], [340, 214], [392, 190], [440, 222], [50, 286], [214, 290], [380, 262]];
  const PP = [[110, 236], [180, 228], [250, 224], [320, 228]];

  Object.assign(DIAG, {
    's5-04:0': {
      alt: '태양 빛과 열 덕분에 식물이 양분을 만들어 자라고, 태양 전지판이 전기를 만들고, 염전에서 바닷물을 말려 소금을 얻는 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g transform="translate(240,74)">${sun(36)}</g>
        ${[90, 240, 390].map((x, i) => `<path class="ray${i}" d="${arw(240 + (x - 240) * 0.3, 132, x, 168)}" fill="none" stroke="${SUNS}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        <g class="it0" transform="translate(90,226)">
          <path d="M0 30 V-12" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/>
          <path d="M0 4 C-10 -6 -32 -6 -36 4 C-28 14 -10 12 0 4 Z M0 -10 C10 -20 32 -20 36 -10 C28 0 10 -2 0 -10 Z" fill="#8fd18a" stroke="${DG_C.r}" stroke-width="2.5"/>
          <rect x="-40" y="30" width="80" height="8" rx="4" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2"/>
        </g>
        <g class="it1" transform="translate(240,226)">
          <path d="M-40 18 L-26 -20 H40 L26 18 Z" fill="#1f4f99" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M-33 -1 H33 M-11 -20 L-18 18 M14 -20 L7 18" stroke="${DG_C.b}" stroke-width="2"/>
          <path d="M0 18 V36" stroke="${DG_C.sub}" stroke-width="4"/>
        </g>
        <g class="it2" transform="translate(390,226)">
          <rect x="-44" y="-6" width="88" height="34" rx="4" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/>
          <path d="M-30 20 L-18 4 L-6 20 Z M6 20 L18 2 L30 20 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5" stroke-linejoin="round"/>
        </g>
        ${['식물', '태양 전지판', '염전'].map((t, i) => `<text class="lb${i}" x="${90 + i * 150}" y="290" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${t}</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          for (let i = 0; i < 3; i++) {
            const st = 600 + i * 1100;
            q('.ray' + i).setAttribute('opacity', dgP(e, st, 400));
            q('.it' + i).setAttribute('opacity', dgP(e, st + 300, 500));
            q('.lb' + i).setAttribute('opacity', e > st + 700 ? 1 : 0);
          }
        });
      }
    },

    's5-04:1': {
      alt: '태양을 중심으로 가까운 순서대로 수성, 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성 8개 행성이 늘어선 태양계 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <g transform="translate(-50,128)">${sun(100, false)}</g>
        <text x="4" y="135" fill="#a05a00" font-size="20" font-weight="800">태양</text>
        <line x1="60" y1="128" x2="474" y2="128" stroke="#e5e5ea" stroke-width="2"/>
        ${PL.map((p, i) => `<g class="pl${i}">
          ${p.ring ? `<ellipse cx="${PX[i]}" cy="128" rx="${p.r + 12}" ry="6" fill="none" stroke="#c9a96e" stroke-width="3"/>` : ''}
          <circle cx="${PX[i]}" cy="128" r="${p.r}" fill="${p.col}" stroke="${DG_C.sub}" stroke-width="2"/>
          <text x="${PX[i]}" y="${i % 2 ? 196 : 84}" text-anchor="middle" fill="${i === 2 ? DG_C.d : DG_C.ink}" font-size="${p.n.length > 2 ? 18 : 20}" font-weight="800">${p.n}</text>
          <line x1="${PX[i]}" y1="${i % 2 ? 128 + p.r + 4 : 128 - p.r - 4}" x2="${PX[i]}" y2="${i % 2 ? 176 : 92}" stroke="#d2d2d7" stroke-width="2"/>
        </g>`).join('')}
        <text class="tip" x="270" y="238" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">수·금·지·화·목·토·천·해</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          PL.forEach((p, i) => q('.pl' + i).setAttribute('opacity', dgP(e, 300 + i * 500, 350)));
          q('.tip').setAttribute('opacity', e > 4500 ? 1 : 0);
        });
      }
    },

    's5-04:2': {
      alt: '지구 지름을 1로 할 때 수성 0.4, 금성 0.9, 지구 1, 화성 0.5, 목성 11.2, 토성 9.4, 천왕성 4.0, 해왕성 3.9로, 암석으로 된 작은 행성과 기체로 된 큰 행성을 막대로 비교한 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <rect x="12" y="18" width="18" height="18" rx="4" fill="${DG_C.c}"/><text x="36" y="34" fill="${DG_C.ink}" font-size="18" font-weight="700">암석 행성</text>
        <rect x="140" y="18" width="18" height="18" rx="4" fill="${DG_C.d}"/><text x="164" y="34" fill="${DG_C.ink}" font-size="18" font-weight="700">기체 행성</text>
        <line x1="82" y1="50" x2="82" y2="318" stroke="#d2d2d7" stroke-width="2"/>
        ${PL.map((p, i) => { const y = 66 + i * 33; return `
          <text x="74" y="${y + 7}" text-anchor="end" fill="${i === 2 ? DG_C.d : DG_C.ink}" font-size="18" font-weight="800">${p.n}</text>
          <rect class="br${i}" x="84" y="${y - 11}" width="0" height="22" rx="5" fill="${p.rock ? DG_C.c : DG_C.d}"/>
          <text class="v${i}" x="0" y="${y + 7}" fill="${i === 2 ? DG_C.d : DG_C.ink}" font-size="18" font-weight="800">${p.d.toFixed(1).replace('.0', i === 2 ? '' : '.0')}</text>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const K = 30; // 지구 지름 1 = 30
        dgAnim(el, 5200, e => {
          PL.forEach((p, i) => {
            const st = i === 2 ? 200 : 900 + (i < 2 ? i : i - 1) * 450, f = dgEase(dgP(e, st, 700));
            const w = Math.max(3, p.d * K) * f;
            q('.br' + i).setAttribute('width', f2(w));
            q('.v' + i).setAttribute('x', f2(84 + w + 8));
            q('.v' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
          });
        });
      }
    },

    's5-04:3': {
      alt: '별은 스스로 빛을 내고 행성은 햇빛을 반사해 보이며, 며칠 동안 관측하면 별들은 제자리에 있지만 행성은 별들 사이에서 위치가 조금씩 바뀌는 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <g transform="translate(46,72)">${sun(22)}</g>
        <text x="46" y="128" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">스스로 빛</text>
        <path d="${arw(86, 72, 166, 72)}" fill="none" stroke="${SUNS}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g transform="translate(194,72)"><circle r="20" fill="#5b5b60"/><path d="M0 -20 A20 20 0 0 0 0 20 Z" fill="#ffd6a5"/><circle r="20" fill="none" stroke="${DG_C.sub}" stroke-width="2"/></g>
        <text x="194" y="128" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="800">행성: 반사</text>
        <path d="${arw(222, 80, 300, 104)}" fill="none" stroke="${SUNS}" stroke-width="4" stroke-dasharray="7 6" stroke-linecap="round" stroke-linejoin="round"/>
        <g transform="translate(322,104)"><ellipse rx="16" ry="11" fill="#fff" stroke="${DG_C.ink}" stroke-width="3"/><circle r="5" fill="${DG_C.ink}"/></g>
        <rect x="12" y="146" width="456" height="166" rx="16" fill="#1d1d3a"/>
        ${BG.map(([x, y]) => `<g transform="translate(${x},${y})">${star(8, '#fff3b0')}</g>`).join('')}
        <path class="trail" d="M${PP.map(p => p.join(' ')).join(' L')}" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="6 6"/>
        ${PP.map(([x, y], i) => `<g class="pp${i}"><circle cx="${x}" cy="${y}" r="9" fill="${i === PP.length - 1 ? DG_C.c : '#ffb86b'}" ${i < PP.length - 1 ? 'opacity=".55"' : ''}/>
          <text x="${x}" y="${y + 32}" text-anchor="middle" fill="#fff" font-size="18" font-weight="700">${i * 2 + 1}일</text></g>`).join('')}
        <text class="lab" x="452" y="304" text-anchor="end" fill="${DG_C.c}" font-size="20" font-weight="800">행성은 움직여요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          PP.forEach((p, i) => q('.pp' + i).setAttribute('opacity', e > 1000 + i * 900 ? 1 : 0));
          const k = Math.min(PP.length - 1, Math.max(0, Math.floor((e - 1000) / 900)));
          q('.trail').setAttribute('opacity', e > 1900 ? 1 : 0);
          q('.trail').setAttribute('d', `M${PP.slice(0, k + 1).map(p => p.join(' ')).join(' L')}`);
          q('.lab').setAttribute('opacity', e > 4400 ? 1 : 0);
        });
      }
    },

    's5-04:4': {
      alt: '북두칠성 국자 끝의 두 별을 이은 거리를 그 방향으로 약 5배 늘인 곳에 북극성이 있어 북쪽을 찾을 수 있는 것을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <rect x="0" y="0" width="480" height="330" rx="16" fill="#1d1d3a"/>
        <path class="dip" d="M${DIP.slice(0, 5).map(p => p.join(' ')).join(' L')} L${MER.join(' ')} L${DUB.join(' ')} L${DIP[3].join(' ')}" fill="none" stroke="#8e8eb8" stroke-width="2.5"/>
        ${DIP.map(([x, y], i) => `<g transform="translate(${x},${y})">${star(i >= 5 ? 11 : 9, i >= 5 ? '#ffd60a' : '#fff3b0')}</g>`).join('')}
        <text x="150" y="320" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">북두칠성</text>
        <path class="ptr" d="" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="7 6" fill="none"/>
        ${[1, 2, 3, 4, 5].map(k => { const x = DUB[0] + k * dv[0], y = DUB[1] + k * dv[1]; return `<g class="tk tk${k}"><circle cx="${f2(x)}" cy="${f2(y)}" r="4" fill="${DG_C.c}"/>${k < 5 ? `<text x="${f2(x + 16)}" y="${f2(y + 7)}" fill="${DG_C.a}" font-size="18" font-weight="800">${k}</text>` : ''}</g>`; }).join('')}
        <g class="pol"><g transform="translate(${POL[0]},${POL[1]})">${star(16, '#fff')}</g>
          <text x="${POL[0] + 26}" y="${POL[1] + 8}" fill="#fff" font-size="22" font-weight="800">북극성</text>
          <text x="${POL[0] - 24}" y="${POL[1] + 8}" text-anchor="end" fill="${DG_C.a}" font-size="20" font-weight="800">5배</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6200, e => {
          q('.dip').setAttribute('opacity', dgP(e, 200, 600));
          const f = dgEase(dgP(e, 1200, 3000)), L = 5 * f;
          q('.ptr').setAttribute('d', `M${MER.join(' ')} L${f2(DUB[0] + L * dv[0])} ${f2(DUB[1] + L * dv[1])}`);
          [1, 2, 3, 4, 5].forEach(k => q('.tk' + k).setAttribute('opacity', L >= k - 0.02 ? 1 : 0));
          q('.pol').setAttribute('opacity', dgP(e, 4400, 600));
        });
      }
    },
  });
})();
