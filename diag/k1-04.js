/* 1학년 국어 · 네모 ㅁ, 동그라미 ㅇ은 어떤 소리일까? (k1-04) */
(() => {
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ', JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const dec = s => { const c = s.charCodeAt(0) - 0xAC00; return [CHO[Math.floor(c / 588)], JUNG[Math.floor((c % 588) / 28)]]; };
  const SW = 12;
  const stroke = (cls, d, col) => `<path class="${cls}" d="${d}" fill="none" stroke="${col}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const drawP = (p, f) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - f); p.setAttribute('opacity', f > 0 ? 1 : 0); };
  const lab = (x, j, name, ex) => `<text x="${x}" y="236" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${j} ${name}</text>
    <text x="${x}" y="274" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">${ex}</text>`;

  /* 3: 낱말 → 자음 + 모음 */
  const wordsSvg = (rows, y0, CW, GAP) => {
    let out = '', k = 0;
    rows.forEach((row, r) => {
      const n = row.join('').length, w = n * CW + (row.length - 1) * GAP;
      let x = 240 - w / 2;
      const y = y0 + r * 118;
      row.forEach(word => {
        out += `<g class="w${k}">`;
        [...word].forEach((s, j) => {
          const [c, v] = dec(s), cx = x + j * CW + CW / 2;
          out += `<rect x="${cx - CW / 2 + 3}" y="${y}" width="${CW - 6}" height="58" rx="12" fill="#f5f5f7"/>
            <text x="${cx}" y="${y + 42}" text-anchor="middle" fill="${DG_C.ink}" font-size="32" font-weight="800">${s}</text>
            <g class="j${k}"><text x="${cx - 12}" y="${y + 88}" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${c}</text><text x="${cx + 12}" y="${y + 88}" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">${v}</text></g>`;
        });
        out += `</g>`;
        x += word.length * CW + GAP; k++;
      });
    });
    return { out, n: k };
  };
  const W3 = wordsSvg([['나무', '나비', '바다'], ['버스', '모기', '고구마']], 50, 58, 24);

  Object.assign(DIAG, {
    'k1-04:0': {
      alt: '네모 모양 ㅁ(미음, 마) 위로 짧은 기둥 두 개를 세우면 ㅂ(비읍, 바)이 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${stroke('m0', 'M60 100 V180 H160 V100 Z', DG_C.d)}
        ${stroke('m1', 'M300 100 V180 H400 V100 Z', DG_C.d)}
        ${stroke('p0', 'M300 100 V50', DG_C.c)}
        ${stroke('p1', 'M400 100 V50', DG_C.c)}
        <g class="l0">${lab(110, 'ㅁ', '미음', `ㅁ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">마</tspan>`)}</g>
        <path class="ar" d="M208 140 h30 m-9 -9 l9 9 l-9 9" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="l1">${lab(350, 'ㅂ', '비읍', `ㅂ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">바</tspan>`)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          drawP(q('.m0'), dgP(e, 200, 1100));
          q('.l0').setAttribute('opacity', e > 1400 ? 1 : 0);
          q('.ar').setAttribute('opacity', e > 1900 ? 1 : 0);
          q('.m1').setAttribute('opacity', e > 2100 ? 1 : 0);
          const f = dgEase(dgP(e, 2600, 900));
          [q('.p0'), q('.p1')].forEach((p, i) => { p.setAttribute('d', `M${300 + i * 100} 100 V${100 - 50 * Math.max(f, .001)}`); p.setAttribute('opacity', f > 0 ? 1 : 0); });
          q('.l1').setAttribute('opacity', e > 3700 ? 1 : 0);
        });
      }
    },

    'k1-04:1': {
      alt: '두 다리를 벌리고 걸어가는 사람의 다리 모양이 ㅅ(시옷)과 닮은 것을 보여 주는 그림. ㅅ+ㅏ=사, ㅅ+ㅗ=소',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <g class="man" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="122" cy="56" r="17" fill="${DG_C.a}" stroke="${DG_C.ink}" stroke-width="4"/>
          <path d="M122 73 V112 M122 86 L96 108 M122 86 L148 104" stroke="${DG_C.ink}" stroke-width="6"/>
          <path class="legs" d="M122 112 L82 184 M122 112 L162 184" stroke="${DG_C.c}" stroke-width="8"/>
        </g>
        <path class="ar" d="M210 130 h36 m-9 -9 l9 9 l-9 9" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        ${stroke('s1', 'M352 60 L292 182', DG_C.c)}
        ${stroke('s2', 'M326 113 L392 182', DG_C.c)}
        <g class="lb">
          <text x="122" y="236" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">걸어가는 사람</text>
          ${lab(342, 'ㅅ', '시옷', `ㅅ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">사</tspan> · ㅅ+ㅗ=<tspan fill="${DG_C.ink}" font-weight="800">소</tspan>`)}
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.man').setAttribute('opacity', dgP(e, 200, 500));
          // 다리 두 개가 걸어가듯 벌어짐
          const f = dgEase(dgP(e, 700, 900)), dx = 40 * Math.max(f, .05);
          q('.legs').setAttribute('d', `M122 112 L${122 - dx} 184 M122 112 L${122 + dx} 184`);
          q('.ar').setAttribute('opacity', e > 1800 ? 1 : 0);
          drawP(q('.s1'), dgP(e, 2100, 700));
          drawP(q('.s2'), dgP(e, 2900, 600));
          q('.lb').setAttribute('opacity', e > 3700 ? 1 : 0);
        });
      }
    },

    'k1-04:2': {
      alt: '동그라미 ㅇ(이응)은 글자 맨 앞에 오면 소리가 없어서, ㅇ+ㅏ=아, ㅇ+ㅣ=이처럼 모음 소리만 나는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <circle class="o" cx="100" cy="122" r="58" fill="none" stroke="${DG_C.d}" stroke-width="${SW}" transform="rotate(-90 100 122)"/>
        <g class="l0">${lab(100, 'ㅇ', '이응', '')}</g>
        ${[['ㅏ', '아'], ['ㅣ', '이']].map((p, i) => { const y = 56 + i * 92; return `<g class="r${i}">
          <rect x="216" y="${y}" width="56" height="60" rx="12" fill="#f5f5f7"/>
          <text x="244" y="${y + 43}" text-anchor="middle" fill="#c7c7cc" font-size="34" font-weight="800">ㅇ</text>
          <text x="294" y="${y + 41}" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">+</text>
          <rect x="316" y="${y}" width="56" height="60" rx="12" fill="${DG_C.a}"/>
          <text x="344" y="${y + 43}" text-anchor="middle" fill="${DG_C.c}" font-size="34" font-weight="800">${p[0]}</text>
          <text x="394" y="${y + 41}" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">=</text>
          <text x="440" y="${y + 44}" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="800">${p[1]}</text></g>`; }).join('')}
        <g class="nb"><path d="M244 240 v-24" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
          <text x="244" y="266" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">소리 없음</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const c = q('.o'), L = 2 * Math.PI * 58, f = dgEase(dgP(e, 200, 1200));
          c.style.strokeDasharray = L; c.style.strokeDashoffset = L * (1 - f); c.setAttribute('opacity', f > 0 ? 1 : 0);
          q('.l0').setAttribute('opacity', e > 1400 ? 1 : 0);
          q('.r0').setAttribute('opacity', dgP(e, 2000, 500));
          q('.r1').setAttribute('opacity', dgP(e, 2900, 500));
          q('.nb').setAttribute('opacity', e > 3800 ? 1 : 0);
        });
      }
    },

    'k1-04:3': {
      alt: '나무, 나비, 바다, 버스, 모기, 고구마의 글자마다 자음(파랑)과 모음(주황)으로 나누어 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="16" y="28" font-size="18" font-weight="800"><tspan fill="${DG_C.d}">자음</tspan><tspan fill="${DG_C.sub}"> + </tspan><tspan fill="${DG_C.c}">모음</tspan></text>
        ${W3.out}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6600, e => {
          for (let k = 0; k < W3.n; k++) {
            const st = 200 + k * 1000;
            q('.w' + k).setAttribute('opacity', dgP(e, st, 400));
            q('.j' + k) && el.querySelectorAll('.j' + k).forEach(t => t.setAttribute('opacity', e > st + 500 ? 1 : 0));
          }
        });
      }
    },
  });
})();
