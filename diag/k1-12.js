/* 1학년 국어 · '음악'은 왜 [으막]이라고 읽을까? (k1-12) */
(() => {
  const arrow = (x, y) => `<path d="M${x - 14} ${y} h26 m-9 -9 l9 9 l-9 9" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  const frame = (x, y, w = 96, h = 120) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>`;
  const T = (x, y, t, col, fs, cls = '') => `<text ${cls ? `class="${cls}"` : ''} x="${x}" y="${y}" text-anchor="middle" fill="${col}" font-size="${fs}" font-weight="800">${t}</text>`;
  const tile = (x, y, t, fill, col) => `<rect x="${x - 26}" y="${y}" width="52" height="56" rx="13" fill="${fill}"/>${T(x, y + 39, t, col, 30)}`;

  Object.assign(DIAG, {
    'k1-12:0': {
      alt: '음의 받침 ㅁ이 뒤 글자 악의 ㅇ 자리로 넘어가서 음악을 [으막]으로 읽는 그림. 놀이는 [노리], 책이는 [채기]',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${frame(30, 50)}${frame(140, 50)}
        ${T(78, 104, '으', DG_C.ink, 44)}
        ${T(166, 104, 'ㅇ', DG_C.sub, 40, 'ng')}${T(210, 104, 'ㅏ', DG_C.ink, 40)}
        ${T(188, 156, 'ㄱ', DG_C.ink, 34)}
        <rect class="slot" x="50" y="122" width="56" height="44" rx="10" fill="none" stroke="${DG_C.c}" stroke-width="2.5" stroke-dasharray="5 5"/>
        <text class="m" text-anchor="middle" fill="${DG_C.c}" font-size="36" font-weight="800">ㅁ</text>
        <text class="lb" x="78" y="196" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">받침이 넘어가요</text>
        <g class="r">${arrow(272, 110)}${T(372, 124, '[으막]', DG_C.c, 42)}</g>
        <line x1="20" y1="222" x2="460" y2="222" stroke="#e5e5ea" stroke-width="2"/>
        <g class="ex">${T(125, 264, '놀이 → [노리]', DG_C.ink, 22)}${T(355, 264, '책이 → [채기]', DG_C.ink, 22)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          const f = dgEase(dgP(e, 800, 1400));
          // ㅁ: 음의 받침 자리(78,158) → 악의 ㅇ 자리(166,106)
          const m = q('.m');
          m.setAttribute('x', 78 + 88 * f); m.setAttribute('y', 158 - 52 * f - Math.sin(f * Math.PI) * 40);
          q('.ng').setAttribute('opacity', 1 - dgP(e, 1600, 500));
          q('.slot').setAttribute('opacity', f > 0.05 ? 1 : 0);
          q('.lb').setAttribute('opacity', e > 1000 ? 1 : 0);
          q('.r').setAttribute('opacity', dgP(e, 2600, 500));
          q('.ex').setAttribute('opacity', dgP(e, 3800, 500));
        });
      }
    },

    'k1-12:1': {
      alt: '학교의 교가 세게 소리 나서 [학꾜], 국수의 수가 세게 소리 나서 [국쑤]로 읽는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${[['학', '교', '꾜'], ['국', '수', '쑤']].map((r, i) => { const y = 56 + i * 96; return `<g>
          ${tile(50, y, r[0], '#f5f5f7', DG_C.ink)}${tile(110, y, r[1], '#f5f5f7', DG_C.ink)}
          <g class="r${i}">${arrow(184, y + 28)}
          ${tile(256, y, r[0], '#f5f5f7', DG_C.ink)}
          <g class="s${i}"><rect x="290" y="${y - 2}" width="56" height="60" rx="14" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>${T(318, y + 40, r[2], DG_C.c, 32)}</g>
          <text x="236" y="${y + 41}" text-anchor="end" fill="${DG_C.sub}" font-size="28" font-weight="700">[</text>
          <text x="352" y="${y + 41}" fill="${DG_C.sub}" font-size="28" font-weight="700">]</text>
          <text class="k${i}" x="380" y="${y + 37}" fill="${DG_C.c}" font-size="22" font-weight="800">세게!</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          [0, 1].forEach(i => {
            const st = 300 + i * 2000;
            q('.r' + i).setAttribute('opacity', dgP(e, st, 400));
            const f = dgP(e, st + 500, 600), k = f <= 0 ? 0.6 : f < 1 ? 0.6 + 0.55 * Math.sin(f * Math.PI / 2) - 0.15 * f : 1;
            const y = 56 + i * 96;
            q('.s' + i).setAttribute('transform', `translate(318,${y + 28}) scale(${k}) translate(-318,${-(y + 28)})`);
            q('.k' + i).setAttribute('opacity', e > st + 1100 ? 1 : 0);
          });
        });
      }
    },

    'k1-12:2': {
      alt: '좋아요의 좋 받침 ㅎ 뒤에 ㅇ이 와서 ㅎ 소리가 숨고 [조아요]로 읽는 그림. 많이는 [마니]',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${frame(24, 50)}
        ${T(72, 104, '조', DG_C.ink, 44)}
        <g class="h"><text x="72" y="156" text-anchor="middle" fill="${DG_C.c}" font-size="34" font-weight="800">ㅎ</text></g>
        <rect class="hx" x="46" y="122" width="52" height="44" rx="10" fill="none" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="5 5"/>
        ${tile(150, 76, '아', DG_C.b, DG_C.d)}${tile(210, 76, '요', '#f5f5f7', DG_C.ink)}
        <text class="lb" x="72" y="196" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="800">ㅎ이 숨어요</text>
        <g class="r">${arrow(276, 104)}${T(380, 118, '[조아요]', DG_C.c, 38)}</g>
        <line x1="20" y1="218" x2="460" y2="218" stroke="#e5e5ea" stroke-width="2"/>
        <g class="ex">${T(240, 260, '많이 → [마니]', DG_C.ink, 24)}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          const f = dgP(e, 900, 1200);
          q('.h').setAttribute('opacity', 1 - 0.85 * f);
          q('.hx').setAttribute('opacity', f > 0.5 ? 1 : 0);
          q('.lb').setAttribute('opacity', f > 0.5 ? 1 : 0);
          q('.r').setAttribute('opacity', dgP(e, 2300, 500));
          q('.ex').setAttribute('opacity', dgP(e, 3500, 500));
        });
      }
    },

    'k1-12:3': {
      alt: '읽을 때는 소리 나는 대로 [으막]이라고 읽지만, 쓸 때는 원래 글자대로 음악이라고 쓰는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <g class="c0"><rect x="16" y="48" width="212" height="212" rx="20" fill="${DG_C.a}" fill-opacity=".45"/>
          <path d="M60 72 h56 a14 14 0 0 1 14 14 v22 a14 14 0 0 1 -14 14 h-34 l-14 12 v-12 h-8 a14 14 0 0 1 -14 -14 v-22 a14 14 0 0 1 14 -14 Z" fill="#fff" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>
          <path d="M74 97 h40" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 8"/>
          <text x="186" y="104" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">읽을 때</text>
          ${T(122, 200, '[으막]', DG_C.c, 40)}
          <text x="122" y="240" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">소리 나는 대로</text></g>
        <g class="c1"><rect x="252" y="48" width="212" height="212" rx="20" fill="${DG_C.b}" fill-opacity=".45"/>
          <g transform="translate(300,104) rotate(-40)"><rect x="-6" y="-30" width="12" height="46" rx="2" fill="${DG_C.c}"/><path d="M-6 16 L0 30 L6 16 Z" fill="${DG_C.ink}"/></g>
          <text x="410" y="104" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">쓸 때</text>
          ${T(358, 200, '음악', DG_C.d, 40)}
          <path class="ck" d="M410 178 l10 12 l20 -26" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="358" y="240" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">원래 글자로</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 3600, e => {
          q('.c0').setAttribute('opacity', dgP(e, 200, 500));
          q('.c1').setAttribute('opacity', dgP(e, 1400, 500));
          q('.ck').setAttribute('opacity', e > 2600 ? 1 : 0);
        });
      }
    },
  });
})();
