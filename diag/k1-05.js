/* 1학년 국어 · 바람이 세게 나오는 자음은 무엇일까? (k1-05) */
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
  const W3 = wordsSvg([['사자', '기차', '피자', '코'], ['토마토', '포도', '하마']], 50, 56, 20);
  const pair = (x, plain, asp, extra, i) => `
    ${stroke('a' + i, plain(x), DG_C.d)}
    <path class="ar${i}" d="M${x + 80} 118 h22 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${stroke('b' + i, plain(x + 128), DG_C.d)}
    ${stroke('x' + i, extra(x + 128), DG_C.c)}`;
  const P1 = [
    { g: x => `M${x} 74 H${x + 62} V164`, x: x => `M${x} 118 H${x + 62}`, a: 'ㄱ', an: '가', b: 'ㅋ', bn: '키읔', bs: '카' },
    { g: x => `M${x + 62} 74 H${x} V164 H${x + 62}`, x: x => `M${x} 119 H${x + 62}`, a: 'ㄷ', an: '다', b: 'ㅌ', bn: '티읕', bs: '타' },
  ];
  const P2 = [
    { j: 'ㅂ', n: '비읍', s: '바', t: 10, w: 1 },
    { j: 'ㅍ', n: '피읖', s: '파', t: 36, w: 3 },
    { j: 'ㅎ', n: '히읗', s: '하', t: 28, w: 2 },
  ];

  Object.assign(DIAG, {
    'k1-05:0': {
      alt: 'ㅈ(지읒, 자) 위에 작은 꼭지를 하나 얹으면 ㅊ(치읓, 차)이 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${stroke('z0', 'M60 86 H160', DG_C.d)}${stroke('z1', 'M110 86 L62 178', DG_C.d)}${stroke('z2', 'M90 128 L156 178', DG_C.d)}
        <path class="ar" d="M208 132 h30 m-9 -9 l9 9 l-9 9" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="ch">${stroke('', 'M300 86 H400', DG_C.d)}${stroke('', 'M350 86 L302 178', DG_C.d)}${stroke('', 'M330 128 L396 178', DG_C.d)}</g>
        ${stroke('tk', 'M350 48 V66', DG_C.c)}
        <g class="l0">${lab(110, 'ㅈ', '지읒', `ㅈ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">자</tspan>`)}</g>
        <g class="l1">${lab(350, 'ㅊ', '치읓', `ㅊ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">차</tspan>`)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          drawP(q('.z0'), dgP(e, 200, 500)); drawP(q('.z1'), dgP(e, 700, 500)); drawP(q('.z2'), dgP(e, 1200, 500));
          q('.l0').setAttribute('opacity', e > 1800 ? 1 : 0);
          q('.ar').setAttribute('opacity', e > 2200 ? 1 : 0);
          q('.ch').setAttribute('opacity', e > 2400 ? 1 : 0);
          const f = dgEase(dgP(e, 2900, 700));
          q('.tk').setAttribute('transform', `translate(0,${-40 * (1 - f)})`); q('.tk').setAttribute('opacity', f);
          q('.l1').setAttribute('opacity', e > 3800 ? 1 : 0);
        });
      }
    },

    'k1-05:1': {
      alt: 'ㄱ에 가로줄 하나를 더 그으면 ㅋ(키읔), ㄷ에 줄 하나를 더 그으면 ㅌ(티읕)이 되고, 가는 카, 다는 타가 되는 그림. 더해진 줄은 주황색',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${P1.map((p, i) => { const x = 24 + i * 244; return `${pair(x, p.g, '', p.x, i)}
          <g class="la${i}"><text x="${x + 31}" y="222" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${p.a}</text>
            <text x="${x + 31}" y="262" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="800">${p.an}</text></g>
          <g class="lb${i}"><text x="${x + 159}" y="222" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${p.b} ${p.bn}</text>
            <text x="${x + 159}" y="262" text-anchor="middle" fill="${DG_C.c}" font-size="24" font-weight="800">${p.bs}</text></g>`; }).join('')}
        <line x1="240" y1="60" x2="240" y2="270" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          P1.forEach((p, i) => {
            const st = 200 + i * 2700;
            drawP(q('.a' + i), dgP(e, st, 700));
            q('.la' + i).setAttribute('opacity', e > st + 700 ? 1 : 0);
            q('.ar' + i).setAttribute('opacity', e > st + 1000 ? 1 : 0);
            q('.b' + i).setAttribute('opacity', e > st + 1200 ? 1 : 0);
            drawP(q('.x' + i), dgP(e, st + 1500, 500));
            q('.lb' + i).setAttribute('opacity', e > st + 2100 ? 1 : 0);
          });
        });
      }
    },

    'k1-05:2': {
      alt: '입 앞에 종이띠를 대고 소리 내면 바보다 파에서 바람이 더 세게 나와 종이가 많이 흔들리고, 하~는 입김이 나오는 것을 보여 주는 그림. ㅍ은 피읖, ㅎ은 히읗',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${P2.map((p, i) => { const x = 4 + i * 160; return `<g>
          <text x="${x + 32}" y="128" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="800">${p.s}</text>
          <g class="wd${i}" fill="none" stroke="${DG_C.d}" stroke-width="3.5" stroke-linecap="round">
            ${Array.from({ length: p.w }, (_, k) => `<path d="M${x + 58} ${114 + (k - (p.w - 1) / 2) * 14} q 9 -6 18 0 t 18 0"/>`).join('')}
          </g>
          <line x1="${x + 92}" y1="64" x2="${x + 120}" y2="64" stroke="${DG_C.ink}" stroke-width="4" stroke-linecap="round"/>
          <g class="pp${i}"><rect x="${x + 100}" y="64" width="12" height="82" rx="3" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/></g>
          <text x="${x + 64}" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${p.j} ${p.n}</text>
          <text class="lv${i}" x="${x + 64}" y="264" text-anchor="middle" fill="${i ? DG_C.c : DG_C.sub}" font-size="20" font-weight="800">${['바람 약하게', '바람 세게', '입김 하~'][i]}</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          P2.forEach((p, i) => {
            const st = 300 + i * 1700, x = 4 + i * 160, f = dgEase(dgP(e, st + 300, 700));
            q('.wd' + i).setAttribute('opacity', e > st ? 1 : 0);
            q('.wd' + i).setAttribute('transform', `translate(${-10 * (1 - dgP(e, st, 400))},0)`);
            q('.pp' + i).setAttribute('transform', `rotate(${-p.t * f} ${x + 106} 64)`);
            q('.lv' + i).setAttribute('opacity', e > st + 900 ? 1 : 0);
          });
        });
      }
    },

    'k1-05:3': {
      alt: '사자, 기차, 피자, 코, 토마토, 포도, 하마의 글자마다 자음(파랑)과 모음(주황)으로 나누어 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="16" y="28" font-size="18" font-weight="800"><tspan fill="${DG_C.d}">자음</tspan><tspan fill="${DG_C.sub}"> + </tspan><tspan fill="${DG_C.c}">모음</tspan></text>
        ${W3.out}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          for (let k = 0; k < W3.n; k++) {
            const st = 200 + k * 900;
            q('.w' + k).setAttribute('opacity', dgP(e, st, 400));
            el.querySelectorAll('.j' + k).forEach(t => t.setAttribute('opacity', e > st + 500 ? 1 : 0));
          }
        });
      }
    },
  });
})();
