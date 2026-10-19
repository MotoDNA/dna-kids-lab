/* 1학년 국어 · '빨간' 사과는 어떤 사과일까? (k1-15) */
(() => {
  const RED = '#ff3b30', GRAY = '#c7c7cc';
  const chip = (x, y, t, mod, cw = 24) => {
    const w = t.length * cw + 20;
    return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="40" rx="12" fill="${mod ? DG_C.a : '#f5f5f7'}" ${mod ? `stroke="${DG_C.c}" stroke-width="3"` : ''}/>
      <text x="${x}" y="${y + 28}" text-anchor="middle" fill="${mod ? DG_C.c : DG_C.ink}" font-size="${cw < 24 ? 20 : 22}" font-weight="800">${t}</text>`;
  };
  const pair = (cx, y, m, n) => { const wm = m.length * 21 + 20, wn = n.length * 21 + 20, tot = wm + 6 + wn, x0 = cx - tot / 2;
    return { m: chip(x0 + wm / 2, y, m, true, 21), n: chip(x0 + wm + 6 + wn / 2, y, n, false, 21) }; };

  /* 동물 모양 (0,0 중심) */
  const apple = `<path d="M0 -26 C-18 -40 -44 -30 -42 -2 C-40 26 -18 42 0 34 C18 42 40 26 42 -2 C44 -30 18 -40 0 -26 Z" class="ap" fill="${GRAY}"/>
    <path d="M0 -26 Q2 -40 8 -46" stroke="${DG_C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M6 -40 Q22 -52 30 -40 Q18 -32 6 -40 Z" fill="${DG_C.r}"/>`;
  const elephant = `<g fill="${GRAY}"><ellipse cx="10" cy="0" rx="46" ry="32"/><rect x="-14" y="18" width="15" height="26" rx="5"/><rect x="28" y="18" width="15" height="26" rx="5"/>
    <circle cx="-40" cy="-12" r="25"/><path d="M-58 -2 Q-74 22 -64 42" stroke="${GRAY}" stroke-width="12" fill="none" stroke-linecap="round"/></g>
    <ellipse cx="-26" cy="-12" rx="14" ry="19" fill="#aeaeb2"/><circle cx="-48" cy="-18" r="3.5" fill="${DG_C.ink}"/>`;
  const ant = `<g stroke="${DG_C.ink}" stroke-width="2.5" stroke-linecap="round"><path d="M-6 0 l-6 12 M0 0 l0 13 M6 0 l6 12 M-20 -6 l-6 -10 M-16 -6 l2 -12"/></g>
    <g fill="${DG_C.ink}"><circle cx="-18" cy="0" r="6"/><circle cx="-4" cy="0" r="5"/><circle cx="13" cy="0" r="9"/></g>`;
  const rabbit = `<g fill="#fff" stroke="${DG_C.sub}" stroke-width="3"><ellipse cx="-2" cy="4" rx="22" ry="15"/><ellipse cx="14" cy="-26" rx="5" ry="16" transform="rotate(14 14 -26)"/><ellipse cx="24" cy="-24" rx="5" ry="16" transform="rotate(28 24 -24)"/><circle cx="20" cy="-6" r="12"/></g><circle cx="24" cy="-8" r="2.5" fill="${DG_C.ink}"/>`;
  const turtle = `<g stroke="${DG_C.r}" stroke-width="3"><circle cx="30" cy="2" r="9" fill="#d6efdc"/><rect x="-18" y="6" width="10" height="12" rx="4" fill="#d6efdc"/><rect x="10" y="6" width="10" height="12" rx="4" fill="#d6efdc"/>
    <path d="M-26 10 Q-24 -24 2 -24 Q26 -24 26 10 Z" fill="#d6efdc"/></g><circle cx="33" cy="0" r="2.5" fill="${DG_C.ink}"/>
    <path d="M-12 -8 L2 -16 L16 -8 L2 0 Z" fill="none" stroke="${DG_C.r}" stroke-width="2"/>`;
  const star = (r) => { let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; d += `${k ? 'L' : 'M'}${(rr * Math.cos(a)).toFixed(1)} ${(rr * Math.sin(a)).toFixed(1)} `; } return d + 'Z'; };

  const C0 = [
    { x: 76, m: '빨간', n: '사과', g: apple },
    { x: 244, m: '커다란', n: '코끼리', g: elephant },
    { x: 412, m: '작은', n: '개미', g: ant },
  ];

  Object.assign(DIAG, {
    'k1-15:0': {
      alt: '꾸며 주는 말 빨간이 붙으면 사과가 빨갛게, 커다란이 붙으면 코끼리가 크게, 작은이 붙으면 개미가 작게 그려지는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${C0.map((c, i) => { const p = pair(c.x, 206, c.m, c.n); return `<g>
          <g class="g${i}">${c.g}</g>
          <g class="m${i}">${p.m}</g>${p.n}
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          C0.forEach((c, i) => {
            const st = 300 + i * 1600, f = dgEase(dgP(e, st + 400, 700));
            q('.m' + i).setAttribute('opacity', f);
            q('.m' + i).setAttribute('transform', `translate(0,${-(1 - f) * 30})`);
            const k = i === 1 ? 0.75 + 0.45 * f : i === 2 ? 1.4 - 0.5 * f : 1.15;
            q('.g' + i).setAttribute('transform', `translate(${c.x},${i === 2 ? 130 : 110}) scale(${k})`);
            if (i === 0) q('.ap').setAttribute('fill', f > 0.5 ? RED : GRAY);
          });
        });
      }
    },

    'k1-15:1': {
      alt: '토끼가 빨리 달려요에서는 토끼가 멀리 빠르게 가고, 거북이 천천히 걸어요에서는 거북이 조금씩 느리게 가는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="24" y="54" fill="${DG_C.ink}" font-size="24" font-weight="800">토끼가 <tspan fill="${DG_C.c}">빨리</tspan> 달려요.</text>
        <line x1="24" y1="130" x2="456" y2="130" stroke="#e5e5ea" stroke-width="4" stroke-linecap="round"/>
        <g class="sp" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"><path d="M-62 -6 h22 M-66 4 h26 M-60 14 h20"/></g>
        <g class="rb">${rabbit}</g>
        <text x="24" y="190" fill="${DG_C.ink}" font-size="24" font-weight="800">거북이 <tspan fill="${DG_C.d}">천천히</tspan> 걸어요.</text>
        <line x1="24" y1="266" x2="456" y2="266" stroke="#e5e5ea" stroke-width="4" stroke-linecap="round"/>
        <g class="tt">${turtle}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          const f = dgEase(dgP(e, 300, 1500)), hop = f > 0 && f < 1 ? -Math.abs(Math.sin(f * Math.PI * 5)) * 14 : 0;
          const rx = 60 + 360 * f;
          q('.rb').setAttribute('transform', `translate(${rx},${108 + hop})`);
          q('.sp').setAttribute('transform', `translate(${rx},${110})`);
          q('.sp').setAttribute('opacity', f > 0.05 ? 1 : 0);
          const t = dgP(e, 300, 4500);
          q('.tt').setAttribute('transform', `translate(${60 + 120 * t},${248})`);
        });
      }
    },

    'k1-15:2': {
      alt: '엉금엉금은 거북이 느릿느릿 기어가는 모양을, 반짝반짝은 별이 빛나는 모양을 흉내 내는 꾸며 주는 말인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${[0, 1, 2, 3].map(k => `<ellipse class="fp" cx="${40 + k * 30}" cy="${150 + (k % 2) * 10}" rx="5" ry="4" fill="${DG_C.r}" fill-opacity=".45"/>`).join('')}
        <g class="tt">${turtle}</g>
        <text x="120" y="216" text-anchor="middle" fill="${DG_C.r}" font-size="28" font-weight="800">엉금엉금</text>
        <text x="120" y="252" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">기어가요</text>
        <g transform="translate(360,120)">
          <g class="ry" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = k * Math.PI / 4; return `<line x1="${(56 * Math.cos(a)).toFixed(1)}" y1="${(56 * Math.sin(a)).toFixed(1)}" x2="${(70 * Math.cos(a)).toFixed(1)}" y2="${(70 * Math.sin(a)).toFixed(1)}"/>`; }).join('')}</g>
          <path class="st" d="${star(46)}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4" stroke-linejoin="round"/>
        </g>
        <text x="360" y="216" text-anchor="middle" fill="${DG_C.c}" font-size="28" font-weight="800">반짝반짝</text>
        <text x="360" y="252" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">빛나요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5200, e => {
          // 거북: 한 걸음씩 멈췄다 가기
          const t = Math.min(1, Math.max(0, (e - 200) / 4000)), step = Math.floor(t * 4), sub = t * 4 - step;
          const pos = Math.min(4, step + dgEase(Math.min(1, sub * 2)));
          q('.tt').setAttribute('transform', `translate(${70 + pos * 22},${140})`);
          qa('.fp').forEach((f, k) => f.setAttribute('opacity', pos > k + 0.5 ? 1 : 0));
          // 별: 세 번 반짝이고 멈춤
          const s = dgP(e, 400, 3600), pulse = s < 1 ? Math.abs(Math.sin(s * Math.PI * 3)) : 1;
          q('.st').setAttribute('transform', `scale(${0.75 + 0.25 * pulse})`);
          q('.ry').setAttribute('opacity', pulse > 0.7 ? 1 : 0.15);
        });
      }
    },

    'k1-15:3': {
      alt: '꽃이 피었어요에 꾸며 주는 말 예쁜과 활짝을 넣어 예쁜 꽃이 활짝 피었어요가 되면서 꽃봉오리가 활짝 피는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g transform="translate(240,0)">
          <path d="M0 196 V112" stroke="${DG_C.r}" stroke-width="6" stroke-linecap="round"/>
          <path d="M0 170 Q-30 150 -36 130 Q-10 140 0 160" fill="${DG_C.r}"/>
          <g class="pl"><ellipse cx="0" cy="-26" rx="15" ry="30" fill="${RED}"/></g>
          <g class="pr"><ellipse cx="0" cy="-26" rx="15" ry="30" fill="${RED}"/></g>
          <ellipse cx="0" cy="86" rx="15" ry="30" fill="${RED}"/>
          <path d="M-32 196 h64" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/>
        </g>
        <g class="w0">${chip(95, 226, '예쁜', true)}</g>
        ${chip(171, 226, '꽃이', false)}
        <g class="w1">${chip(247, 226, '활짝', true)}</g>
        <g class="w2"><rect x="289" y="226" width="128" height="40" rx="12" fill="#f5f5f7"/><text x="353" y="254" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">피었어요.</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const a = dgEase(dgP(e, 800, 600)), b = dgEase(dgP(e, 1800, 600)), f = dgEase(dgP(e, 2800, 1400));
          q('.w0').setAttribute('opacity', a); q('.w0').setAttribute('transform', `translate(0,${-(1 - a) * 40})`);
          q('.w1').setAttribute('opacity', b); q('.w1').setAttribute('transform', `translate(0,${-(1 - b) * 40})`);
          q('.w2').setAttribute('transform', `translate(${-76 * (1 - b)},0)`);
          // 봉오리 → 활짝: 양쪽 꽃잎이 바깥으로 벌어짐 (꽃잎 아래 끝 0,112 축)
          const ang = 8 + 34 * f;
          q('.pl').setAttribute('transform', `translate(0,112) rotate(${-ang})`);
          q('.pr').setAttribute('transform', `translate(0,112) rotate(${ang})`);
        });
      }
    },
  });
})();
