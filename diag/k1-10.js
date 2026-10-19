/* 1학년 국어 · 모음 두 개가 만나면 어떤 소리가 날까? (k1-10) */
(() => {
  const ln = (cls, x1, y1, x2, y2, col) => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="12" stroke-linecap="round"/>`;
  const arrow = (x, y) => `<path d="M${x - 14} ${y} h26 m-9 -9 l9 9 l-9 9" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* 0: ㅏ+ㅣ=ㅐ, ㅓ+ㅣ=ㅔ (막대 그림) */
  const R0 = [
    { cy: 98, base: x => ln('', x, 58, x, 138, DG_C.d) + ln('', x, 98, x + 24, 98, DG_C.d), add: 34, w: '개', f: 'ㅏ + ㅣ' },
    { cy: 214, base: x => ln('', x - 24, 214, x, 214, DG_C.d) + ln('', x, 174, x, 254, DG_C.d), add: 26, w: '게', f: 'ㅓ + ㅣ' },
  ];
  /* 1 */
  const R1 = [
    { a: 'ㅗ', b: 'ㅏ', c: 'ㅘ', s: '와', w: [['사', 0], ['과', 1]] },
    { a: 'ㅜ', b: 'ㅓ', c: 'ㅝ', s: '워', w: [['원', 1], ['숭', 0], ['이', 0]] },
    { a: 'ㅗ', b: 'ㅣ', c: 'ㅚ', s: '외', w: [['참', 0], ['외', 1]] },
    { a: 'ㅜ', b: 'ㅣ', c: 'ㅟ', s: '위', w: [['쥐', 1]] },
  ];
  const tile = (x, y, t, fill, col, fs = 28) => `<rect x="${x - 22}" y="${y}" width="44" height="46" rx="11" fill="${fill}"/><text x="${x}" y="${y + 33}" text-anchor="middle" fill="${col}" font-size="${fs}" font-weight="800">${t}</text>`;
  /* 3 */
  const R3 = [['오', '아', '와'], ['우', '어', '워'], ['우', '이', '위']];

  Object.assign(DIAG, {
    'k1-10:0': {
      alt: 'ㅏ에 ㅣ를 붙이면 ㅐ(개), ㅓ에 ㅣ를 붙이면 ㅔ(게)가 되고, 개와 게는 소리가 거의 같은 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${R0.map((r, i) => `<g>
          ${r.base(64)}
          <g class="i${i}">${ln('', 0, r.cy - 40, 0, r.cy + 40, DG_C.c)}</g>
          <text class="f${i}" x="172" y="${r.cy - 22}" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${r.f}</text>
          <g class="r${i}">${arrow(170, r.cy)}
          <text x="250" y="${r.cy + 17}" text-anchor="middle" fill="${DG_C.ink}" font-size="50" font-weight="800">${r.w}</text></g>
        </g>`).join('')}
        <g class="eq">
          <path d="M318 98 h14 v116 h-14" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <text x="352" y="166" text-anchor="middle" fill="${DG_C.c}" font-size="30" font-weight="800">≈</text>
          <text x="420" y="146" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">소리가</text>
          <text x="420" y="174" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">거의</text>
          <text x="420" y="202" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">같아요</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          R0.forEach((r, i) => {
            const st = 400 + i * 1900, f = dgEase(dgP(e, st, 900));
            q('.i' + i).setAttribute('transform', `translate(${64 + r.add + (1 - f) * 70},0)`);
            q('.i' + i).setAttribute('opacity', e >= st - 300 ? 1 : 0);
            q('.f' + i).setAttribute('opacity', e >= st - 300 ? 1 : 0);
            q('.r' + i).setAttribute('opacity', dgP(e, st + 1000, 400));
          });
          q('.eq').setAttribute('opacity', dgP(e, 4600, 500));
        });
      }
    },

    'k1-10:1': {
      alt: 'ㅗ와 ㅏ가 만나면 ㅘ[와](사과), ㅜ와 ㅓ가 만나면 ㅝ[워](원숭이), ㅗ와 ㅣ는 ㅚ(참외), ㅜ와 ㅣ는 ㅟ(쥐)가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${R1.map((r, i) => { const y = 44 + i * 64; return `<g>
          <g class="a${i}">${tile(36, y, r.a, DG_C.b, DG_C.d)}</g>
          <text class="p${i}" x="76" y="${y + 32}" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">+</text>
          <g class="b${i}">${tile(116, y, r.b, DG_C.b, DG_C.d)}</g>
          <g class="c${i}">${arrow(168, y + 23)}
            ${tile(222, y, r.c, DG_C.a, DG_C.c, 30)}
            <text x="290" y="${y + 33}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">[${r.s}]</text></g>
          <text class="w${i}" x="400" y="${y + 33}" text-anchor="middle" font-size="26" font-weight="800">${r.w.map(([s, h]) => `<tspan fill="${h ? DG_C.c : DG_C.ink}">${s}</tspan>`).join('')}</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          R1.forEach((r, i) => {
            const st = 200 + i * 1400, f = dgEase(dgP(e, st + 300, 500));
            q('.a' + i).setAttribute('opacity', e >= st ? 1 : 0);
            q('.p' + i).setAttribute('opacity', e >= st ? 1 : 0);
            q('.b' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            q('.b' + i).setAttribute('transform', `translate(${(1 - f) * 40},0)`);
            q('.c' + i).setAttribute('opacity', dgP(e, st + 800, 400));
            q('.w' + i).setAttribute('opacity', dgP(e, st + 1100, 400));
          });
        });
      }
    },

    'k1-10:2': {
      alt: 'ㅡ에 ㅣ를 붙이면 ㅢ가 되고 [의]로 소리 나요. 의자, 의사',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${ln('', 30, 146, 110, 146, DG_C.d)}
        <g class="i">${ln('', 0, 80, 0, 200, DG_C.c)}</g>
        <text class="f" x="80" y="236" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">ㅡ + ㅣ</text>
        <g class="r">${arrow(186, 140)}
          <text x="258" y="158" text-anchor="middle" fill="${DG_C.c}" font-size="44" font-weight="800">[의]</text></g>
        <g class="w0"><text x="400" y="122" text-anchor="middle" font-size="32" font-weight="800"><tspan fill="${DG_C.c}">의</tspan><tspan fill="${DG_C.ink}">자</tspan></text></g>
        <g class="w1"><text x="400" y="188" text-anchor="middle" font-size="32" font-weight="800"><tspan fill="${DG_C.c}">의</tspan><tspan fill="${DG_C.ink}">사</tspan></text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          const f = dgEase(dgP(e, 400, 900));
          q('.i').setAttribute('transform', `translate(${130 + (1 - f) * 70},0)`);
          q('.r').setAttribute('opacity', dgP(e, 1500, 400));
          q('.w0').setAttribute('opacity', dgP(e, 2400, 400));
          q('.w1').setAttribute('opacity', dgP(e, 3000, 400));
        });
      }
    },

    'k1-10:3': {
      alt: '오와 아를 천천히 읽다가 점점 빠르게 이어 읽으면 두 소리가 붙어 와가 되고, 우+어는 워, 우+이는 위가 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text class="fs" x="20" y="34" fill="${DG_C.c}" font-size="20" font-weight="800">빠르게 이어 읽으면?</text>
        ${R3.map((r, i) => { const y = 54 + i * 78; return `<g>
          <text x="54" y="${y + 36}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${r[0]}+${r[1]}</text>
          <g class="x${i}"><rect x="-26" y="${y}" width="52" height="52" rx="13" fill="${DG_C.b}"/><text y="${y + 37}" text-anchor="middle" fill="${DG_C.d}" font-size="30" font-weight="800">${r[0]}</text></g>
          <g class="y${i}"><rect x="-26" y="${y}" width="52" height="52" rx="13" fill="${DG_C.b}"/><text y="${y + 37}" text-anchor="middle" fill="${DG_C.d}" font-size="30" font-weight="800">${r[1]}</text></g>
          ${arrow(122, y + 26)}
          <g class="z${i}"><rect x="219" y="${y - 2}" width="56" height="56" rx="14" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/><text x="247" y="${y + 37}" text-anchor="middle" fill="${DG_C.c}" font-size="32" font-weight="800">${r[2]}</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6200, e => {
          R3.forEach((r, i) => {
            const st = 200 + i * 1500, f = dgEase(dgP(e, st + 200, 900));
            const gap = 110 * (1 - f);
            q('.x' + i).setAttribute('transform', `translate(${247 - 28 - gap / 2},0)`);
            q('.y' + i).setAttribute('transform', `translate(${247 + 28 + gap / 2},0)`);
            const m = dgP(e, st + 1100, 300);
            q('.x' + i).setAttribute('opacity', e >= st ? 1 - m : 0);
            q('.y' + i).setAttribute('opacity', e >= st ? 1 - m : 0);
            q('.z' + i).setAttribute('opacity', m);
          });
        });
      }
    },
  });
})();
