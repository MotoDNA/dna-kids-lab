/* 1학년 국어 · ㄱ ㄴ ㄷ ㄹ, 이름이 뭘까? (k1-03) */
(() => {
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ', JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const dec = s => { const c = s.charCodeAt(0) - 0xAC00; return [CHO[Math.floor(c / 588)], JUNG[Math.floor((c % 588) / 28)]]; };
  const SW = 12; // 자음 획 굵기
  const stroke = (cls, d, col) => `<path class="${cls}" d="${d}" fill="none" stroke="${col}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // 길이에 맞춰 선이 그려지는 효과
  const drawP = (p, f) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - f); p.setAttribute('opacity', f > 0 ? 1 : 0); };

  /* 3: 낱말 → 자음 + 모음 */
  const ROWS = [['오리', '다리', '고기'], ['구두', '라디오']];
  const CW = 62, GAP = 26;
  const wordsSvg = (rows, y0) => {
    let out = '', k = 0;
    rows.forEach((row, r) => {
      const n = row.join('').length, w = n * CW + (row.length - 1) * GAP;
      let x = 240 - w / 2;
      const y = y0 + r * 118;
      row.forEach(word => {
        out += `<g class="w${k}">`;
        [...word].forEach((s, j) => {
          const [c, v] = dec(s), cx = x + j * CW + CW / 2;
          out += `<rect x="${cx - 28}" y="${y}" width="56" height="58" rx="12" fill="#f5f5f7"/>
            <text x="${cx}" y="${y + 42}" text-anchor="middle" fill="${DG_C.ink}" font-size="32" font-weight="800">${s}</text>
            <g class="j${k}"><text x="${cx - 12}" y="${y + 88}" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${c}</text><text x="${cx + 12}" y="${y + 88}" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">${v}</text></g>`;
        });
        out += `</g>`;
        x += word.length * CW + GAP; k++;
      });
    });
    return { out, n: k };
  };
  const W3 = wordsSvg(ROWS, 50);

  Object.assign(DIAG, {
    'k1-03:0': {
      alt: '아 카드에서 소리 없는 ㅇ을 빼고 그 자리에 ㄱ을 끼우면 가가 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <rect x="30" y="60" width="200" height="150" rx="22" fill="#fff" stroke="#d2d2d7" stroke-width="2.5"/>
        <rect class="slot" x="46" y="76" width="84" height="118" rx="14" fill="${DG_C.b}" fill-opacity=".45" stroke="${DG_C.d}" stroke-width="2.5" stroke-dasharray="7 6"/>
        <text x="174" y="164" text-anchor="middle" fill="${DG_C.c}" font-size="80" font-weight="800">ㅏ</text>
        <text class="ie" x="88" y="164" text-anchor="middle" fill="${DG_C.sub}" font-size="80" font-weight="800">ㅇ</text>
        <text class="gi" x="88" y="164" text-anchor="middle" fill="${DG_C.d}" font-size="80" font-weight="800">ㄱ</text>
        <path class="ar" d="M250 135 h40 m-10 -10 l10 10 l-10 10" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text class="r0" x="380" y="166" text-anchor="middle" fill="${DG_C.sub}" font-size="84" font-weight="800">아</text>
        <text class="r1" x="380" y="166" text-anchor="middle" fill="${DG_C.ink}" font-size="84" font-weight="800">가</text>
        <text class="e0" x="130" y="262" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">ㅇ+ㅏ=아</text>
        <text class="e1" x="350" y="262" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800"><tspan fill="${DG_C.d}">ㄱ</tspan>+<tspan fill="${DG_C.c}">ㅏ</tspan>=가</text>
        <path class="e1" d="M206 255 h40 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5600, e => {
          // ① 아 카드  ② ㅇ이 빠짐  ③ ㄱ이 위에서 내려와 들어감  ④ 가
          const out = dgEase(dgP(e, 1300, 700)), inn = dgEase(dgP(e, 2100, 900));
          q('.ie').setAttribute('transform', `translate(0,${-90 * out})`);
          q('.ie').setAttribute('opacity', 1 - out);
          q('.gi').setAttribute('transform', `translate(0,${-120 * (1 - inn)})`);
          q('.gi').setAttribute('opacity', inn);
          q('.r0').setAttribute('opacity', e < 1300 ? dgP(e, 400, 400) : 1 - out);
          q('.r1').setAttribute('opacity', dgP(e, 3100, 500));
          q('.ar').setAttribute('opacity', e > 400 ? 1 : 0);
          q('.e0').setAttribute('opacity', e > 600 ? 1 : 0);
          qa('.e1').forEach(t => t.setAttribute('opacity', e > 3700 ? 1 : 0));
        });
      }
    },

    'k1-03:1': {
      alt: 'ㄱ은 오른쪽으로 긋다가 아래로 꺾고, ㄴ은 위에서 아래로 내려오다가 옆으로 꺾는 방향을 화살표로 보여 주는 그림. ㄱ은 기역(가), ㄴ은 니은(나)',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[['ㄱ', '기역', '가', 'M50 60 H150 V160', 'M138 148 l12 14 l12 -14'], ['ㄴ', '니은', '나', 'M300 60 V160 H400', 'M388 148 l14 12 l-14 12']].map((g, i) => `
          ${stroke('s' + i, g[3], DG_C.d)}
          <circle class="o${i}" cx="${i ? 300 : 50}" cy="60" r="9" fill="${DG_C.c}"/>
          <path class="h${i}" d="${g[4]}" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <g class="lb${i}">
            <text x="${i ? 350 : 100}" y="228" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${g[0]} ${g[1]}</text>
            <text x="${i ? 350 : 100}" y="268" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">${g[0]}+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">${g[2]}</tspan></text>
          </g>`).join('')}
        <line x1="240" y1="60" x2="240" y2="270" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [0, 1].forEach(i => {
            const st = 300 + i * 2500;
            drawP(q('.s' + i), dgP(e, st, 1300));
            q('.o' + i).setAttribute('opacity', e > st - 200 ? 1 : 0);
            q('.h' + i).setAttribute('opacity', e > st + 1300 ? 1 : 0);
            q('.lb' + i).setAttribute('opacity', e > st + 1500 ? 1 : 0);
          });
        });
      }
    },

    'k1-03:2': {
      alt: 'ㄴ 위에 가로줄을 하나 그으면 ㄷ(디귿, 다)이 되고, ㄹ(리을, 라)은 ㄱ, 가로줄, ㄴ을 이어 꼬불꼬불하게 쓰는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${stroke('dn', 'M60 60 V160 H160', DG_C.d)}
        ${stroke('dt', 'M60 60 H160', DG_C.c)}
        ${stroke('r1', 'M300 56 H400 V110', DG_C.d)}
        ${stroke('r2', 'M300 110 H400', DG_C.d)}
        ${stroke('r3', 'M300 110 V164 H400', DG_C.d)}
        <g class="l0"><text x="110" y="228" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">ㄷ 디귿</text>
          <text x="110" y="268" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">ㄷ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">다</tspan></text></g>
        <g class="l1"><text x="350" y="228" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">ㄹ 리을</text>
          <text x="350" y="268" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">ㄹ+ㅏ=<tspan fill="${DG_C.ink}" font-weight="800">라</tspan></text></g>
        <line x1="240" y1="60" x2="240" y2="270" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          drawP(q('.dn'), dgP(e, 200, 900));
          drawP(q('.dt'), dgP(e, 1400, 600));
          q('.l0').setAttribute('opacity', e > 2100 ? 1 : 0);
          drawP(q('.r1'), dgP(e, 2900, 800));
          drawP(q('.r2'), dgP(e, 3800, 500));
          drawP(q('.r3'), dgP(e, 4400, 800));
          q('.l1').setAttribute('opacity', e > 5400 ? 1 : 0);
        });
      }
    },

    'k1-03:3': {
      alt: '오리, 다리, 고기, 구두, 라디오의 글자마다 자음(파랑)과 모음(주황)으로 나누어 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="16" y="28" font-size="18" font-weight="800"><tspan fill="${DG_C.d}">자음</tspan><tspan fill="${DG_C.sub}"> + </tspan><tspan fill="${DG_C.c}">모음</tspan></text>
        ${W3.out}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          for (let k = 0; k < W3.n; k++) {
            const st = 200 + k * 1000;
            q('.w' + k).setAttribute('opacity', dgP(e, st, 400));
            qa('.j' + k).forEach(t => t.setAttribute('opacity', e > st + 500 ? 1 : 0));
          }
        });
      }
    },
  });
})();
