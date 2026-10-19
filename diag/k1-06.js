/* 1학년 국어 · 자음과 모음은 어디에 붙을까? (k1-06) */
(() => {
  const CONS = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split(''), VOWS = 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ'.split('');
  const cx = i => 78 + i * 28.5, vx = i => 78 + i * 38;

  /* 1·2: ㄱ + 모음 블록 */
  const STAND = [['ㅏ', '가'], ['ㅑ', '갸'], ['ㅓ', '거'], ['ㅕ', '겨'], ['ㅣ', '기']];
  const LIE = [['ㅗ', '고'], ['ㅛ', '교'], ['ㅜ', '구'], ['ㅠ', '규'], ['ㅡ', '그']];
  const blocks = (L, side) => L.map((p, i) => { const x = 52 + i * 94; return `<g>
      <rect x="${x - 42}" y="62" width="84" height="104" rx="16" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
      ${side ? `<rect x="${x + 2}" y="70" width="34" height="88" rx="10" fill="${DG_C.a}" fill-opacity=".6"/>
        <text x="${x - 18}" y="128" text-anchor="middle" fill="${DG_C.d}" font-size="40" font-weight="800">ㄱ</text>
        <text class="v${i}" x="${x + 19}" y="128" text-anchor="middle" fill="${DG_C.c}" font-size="40" font-weight="800">${p[0]}</text>`
      : `<rect x="${x - 34}" y="116" width="68" height="44" rx="10" fill="${DG_C.a}" fill-opacity=".6"/>
        <text x="${x}" y="106" text-anchor="middle" fill="${DG_C.d}" font-size="40" font-weight="800">ㄱ</text>
        <text class="v${i}" x="${x}" y="152" text-anchor="middle" fill="${DG_C.c}" font-size="40" font-weight="800">${p[0]}</text>`}
      <text class="s${i}" x="${x}" y="222" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="800">${p[1]}</text>
    </g>`; }).join('');
  const blockPlay = (el, L, side) => {
    const q = s => el.querySelector(s);
    dgAnim(el, 6000, e => {
      L.forEach((p, i) => {
        const st = 300 + i * 1000, f = dgEase(dgP(e, st, 700));
        const v = q('.v' + i);
        v.setAttribute('transform', side ? `translate(${50 * (1 - f)},0)` : `translate(0,${50 * (1 - f)})`);
        v.setAttribute('opacity', f);
        q('.s' + i).setAttribute('opacity', dgP(e, st + 700, 300));
      });
      q('.hd').setAttribute('opacity', 1);
    });
  };

  /* 3: 글자 → 낱말 */
  const W3 = [['바', '나', '나'], ['모', '자'], ['너', '구', '리']];
  const tile = (x, y, t, fill) => `<rect x="${x}" y="${y}" width="50" height="54" rx="12" fill="${fill}"/><text x="${x + 25}" y="${y + 38}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${t}</text>`;

  Object.assign(DIAG, {
    'k1-06:0': {
      alt: '자음 열네 개와 모음 열 개 가운데 자음 ㄱ과 모음 ㅏ를 퍼즐처럼 맞추면, 자음이 앞에 모음이 뒤에 붙어 글자 가가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <text x="12" y="76" fill="${DG_C.d}" font-size="18" font-weight="800">자음</text>
        ${CONS.map((c, i) => `<text class="c${i}" x="${cx(i)}" y="77" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${c}</text>`).join('')}
        <text x="12" y="130" fill="${DG_C.c}" font-size="18" font-weight="800">모음</text>
        ${VOWS.map((v, i) => `<text class="vw${i}" x="${vx(i)}" y="131" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">${v}</text>`).join('')}
        <circle class="hc" cx="${cx(0)}" cy="69" r="17" fill="none" stroke="${DG_C.d}" stroke-width="3"/>
        <circle class="hv" cx="${vx(0)}" cy="123" r="17" fill="none" stroke="${DG_C.c}" stroke-width="3"/>
        <g class="pc"><path d="M0 0 h56 v22 a10 10 0 0 1 0 20 v22 h-56 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>
          <text x="27" y="45" text-anchor="middle" fill="${DG_C.d}" font-size="36" font-weight="800">ㄱ</text></g>
        <g class="pv"><path d="M0 0 h56 v64 h-56 v-22 a10 10 0 0 0 0 -20 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>
          <text x="30" y="45" text-anchor="middle" fill="${DG_C.c}" font-size="36" font-weight="800">ㅏ</text></g>
        <g class="res"><text x="310" y="226" text-anchor="middle" fill="${DG_C.sub}" font-size="30" font-weight="700">=</text>
          <text x="370" y="232" text-anchor="middle" fill="${DG_C.ink}" font-size="50" font-weight="800">가</text>
          <text x="138" y="284" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">앞</text>
          <text x="196" y="284" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">뒤</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          CONS.forEach((c, i) => q('.c' + i).setAttribute('opacity', dgP(e, 100 + i * 70, 250)));
          VOWS.forEach((v, i) => q('.vw' + i).setAttribute('opacity', dgP(e, 1100 + i * 80, 250)));
          q('.hc').setAttribute('opacity', e > 2100 ? 1 : 0);
          q('.hv').setAttribute('opacity', e > 2300 ? 1 : 0);
          // 카드가 아래로 내려와 맞물림
          const m = dgEase(dgP(e, 2700, 1100)), k = dgEase(dgP(e, 3900, 500));
          const cxs = cx(0) - 28, cys = 69 - 32, vxs = vx(0) - 28, vys = 123 - 32;
          const cX = cxs + (110 - cxs) * m, cY = cys + (186 - cys) * m;
          const vX = vxs + (190 - vxs) * m - 24 * k, vY = vys + (186 - vys) * m;
          q('.pc').setAttribute('transform', `translate(${cX},${cY})`);
          q('.pv').setAttribute('transform', `translate(${vX},${vY})`);
          q('.pc').setAttribute('opacity', e > 2700 ? 1 : 0); q('.pv').setAttribute('opacity', e > 2700 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 4500 ? 1 : 0);
        });
      }
    },

    'k1-06:1': {
      alt: '서 있는 모음 ㅏ ㅑ ㅓ ㅕ ㅣ가 자음 ㄱ의 오른쪽에 붙어 가, 갸, 거, 겨, 기가 되는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <text class="hd" x="10" y="38" fill="${DG_C.sub}" font-size="20" font-weight="800">서 있는 모음 → <tspan fill="${DG_C.c}">오른쪽</tspan></text>
        ${blocks(STAND, 1)}
      </svg>`,
      play(el) { blockPlay(el, STAND, 1); }
    },

    'k1-06:2': {
      alt: '누워 있는 모음 ㅗ ㅛ ㅜ ㅠ ㅡ가 자음 ㄱ의 아래에 붙어 고, 교, 구, 규, 그가 되는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <text class="hd" x="10" y="38" fill="${DG_C.sub}" font-size="20" font-weight="800">누워 있는 모음 → <tspan fill="${DG_C.c}">아래</tspan></text>
        ${blocks(LIE, 0)}
      </svg>`,
      play(el) { blockPlay(el, LIE, 0); }
    },

    'k1-06:3': {
      alt: '글자 바, 나, 나를 이어 붙이면 바나나, 모와 자는 모자, 너, 구, 리는 너구리라는 낱말이 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${W3.map((w, r) => { const y = 50 + r * 82; return `<g class="row${r}">
          ${w.map((t, j) => tile(10 + j * 78, y, t, '#f5f5f7') + (j < w.length - 1 ? `<text x="${10 + j * 78 + 64}" y="${y + 37}" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>` : '')).join('')}
          </g>
          <path class="ar${r}" d="M248 ${y + 27} h24 m-8 -8 l8 8 l-8 8" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <g class="wd${r}"><rect x="290" y="${y - 3}" width="${w.length * 38 + 24}" height="60" rx="16" fill="${DG_C.b}" fill-opacity=".5" stroke="${DG_C.d}" stroke-width="2.5"/>
          ${w.map((t, j) => `<text class="lt${r}" data-j="${j}" x="${321 + j * 38}" y="${y + 39}" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800">${t}</text>`).join('')}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          W3.forEach((w, r) => {
            const st = 200 + r * 1800;
            q('.row' + r).setAttribute('opacity', dgP(e, st, 400));
            q('.ar' + r).setAttribute('opacity', e > st + 600 ? 1 : 0);
            const f = dgEase(dgP(e, st + 700, 800));
            q('.wd' + r).setAttribute('opacity', e > st + 700 ? 1 : 0);
            // 글자 사이가 벌어져 있다가 붙음
            qa('.lt' + r).forEach(t => { const j = +t.dataset.j; t.setAttribute('x', 321 + j * 38 + j * 16 * (1 - f)); });
          });
        });
      }
    },
  });
})();
