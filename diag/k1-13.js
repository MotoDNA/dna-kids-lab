/* 1학년 국어 · 어디에서 띄어 쓰고, 어디에서 쉬어 읽을까? (k1-13) */
(() => {
  /* 0 */
  const S0 = [...'나는학교에가요.'];
  const SP0 = [2, 5]; // 이 글자 앞에서 한 칸 띄움(학, 가)
  const C0 = 42;
  const pos0 = (i, f) => i + SP0.filter(k => k <= i).length * f;
  /* 1 */
  const R1 = [['강아지', '가'], ['사과', '를'], ['학교', '에']];
  /* 2 */
  const A = [...'아버지가 방에 들어가신다.'];
  const B = [...'아버지 가방에 들어가신다.'];
  const C2 = 32, X2 = 16;
  const cells = (arr, y, cls) => arr.map((ch, i) => `<rect x="${X2 + i * C2}" y="${y}" width="${C2}" height="${C2 + 6}" fill="${ch === ' ' ? DG_C.b : '#fff'}" ${ch === ' ' ? `fill-opacity=".6"` : ''} stroke="#d2d2d7" stroke-width="1.5"/>`).join('')
    + arr.map((ch, i) => ch === ' ' ? '' : `<text class="${cls}${i}" x="${X2 + i * C2 + C2 / 2}" y="${y + 28}" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${ch}</text>`).join('');

  Object.assign(DIAG, {
    'k1-13:0': {
      alt: '나는학교에가요를 붙여 쓰면 읽기 어렵고, 낱말 사이를 한 칸씩 띄어 나는 학교에 가요로 쓰면 읽기 쉬운 것을 칸 공책으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 240" class="dg-svg" role="img">
        <text x="18" y="46" fill="${DG_C.sub}" font-size="18" font-weight="700">붙여 쓰면 읽기 어려워요</text>
        ${S0.map((c, i) => `<rect x="${18 + i * C0}" y="58" width="${C0}" height="${C0}" fill="#fff" stroke="#d2d2d7" stroke-width="1.5"/>
          <text x="${18 + i * C0 + C0 / 2}" y="${58 + 30}" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">${c}</text>`).join('')}
        <text class="lb" x="18" y="150" fill="${DG_C.d}" font-size="18" font-weight="800">띄어 쓰면 읽기 쉬워요</text>
        ${Array.from({ length: S0.length + SP0.length }, (_, i) => `<rect x="${18 + i * C0}" y="162" width="${C0}" height="${C0}" fill="#fff" stroke="#d2d2d7" stroke-width="1.5"/>`).join('')}
        ${SP0.map((k, j) => `<rect class="gp" x="${18 + (k + j) * C0 + 3}" y="165" width="${C0 - 6}" height="${C0 - 6}" rx="6" fill="${DG_C.b}"/>`).join('')}
        ${S0.map((c, i) => `<text class="ch" data-i="${i}" y="${162 + 30}" text-anchor="middle" fill="${DG_C.ink}" font-size="24" font-weight="800">${c}</text>`).join('')}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)], q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          const f = dgEase(dgP(e, 1200, 1300));
          qa('.ch').forEach(t => { const i = +t.dataset.i; t.setAttribute('x', 18 + pos0(i, f) * C0 + C0 / 2); t.setAttribute('opacity', e > 400 ? 1 : 0); });
          qa('.gp').forEach(g => g.setAttribute('opacity', f >= 1 ? 1 : 0));
          q('.lb').setAttribute('opacity', e > 400 ? 1 : 0);
        });
      }
    },

    'k1-13:1': {
      alt: '가, 를, 에 같은 작은 말은 앞 낱말에 붙여 써서 강아지가, 사과를, 학교에가 되는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${R1.map(([w, p], i) => { const y = 46 + i * 66, W = w.length * 32 + 24; return `<g>
          <rect x="${120 - W / 2 + 40}" y="${y}" width="${W}" height="50" rx="12" fill="${DG_C.b}"/>
          <text x="${160}" y="${y + 35}" text-anchor="middle" fill="${DG_C.d}" font-size="28" font-weight="800">${w}</text>
          <g class="p${i}" data-x="${160 + W / 2}"><rect x="0" y="${y}" width="44" height="50" rx="12" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
          <text x="22" y="${y + 35}" text-anchor="middle" fill="${DG_C.c}" font-size="28" font-weight="800">${p}</text></g>
        </g>`; }).join('')}
        <text class="lb" x="360" y="125" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">꼭 붙여요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          R1.forEach((_, i) => {
            const g = q('.p' + i), x = +g.dataset.x, f = dgEase(dgP(e, 400 + i * 1000, 800));
            g.setAttribute('transform', `translate(${x + 2 + (1 - f) * 120},0)`);
            g.setAttribute('opacity', e >= 300 + i * 1000 ? 1 : 0);
          });
          q('.lb').setAttribute('opacity', dgP(e, 3500, 400));
        });
      }
    },

    'k1-13:2': {
      alt: '아버지가 방에 들어가신다는 아버지가 방으로 들어가는 뜻이지만, 가를 띄어 아버지 가방에 들어가신다로 쓰면 아버지가 가방 속에 들어가는 뜻이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${cells(A, 46, 'a')}
        <rect class="hl0" x="${X2 + 5 * C2 - 2}" y="42" width="${C2 * 2 + 4}" height="46" rx="8" fill="none" stroke="${DG_C.d}" stroke-width="3"/>
        <g class="m0"><path d="M40 118 l18 -14 l18 14 v20 h-36 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3" stroke-linejoin="round"/>
          <rect x="52" y="124" width="12" height="14" fill="#fff" stroke="${DG_C.d}" stroke-width="2"/>
          <text x="90" y="138" fill="${DG_C.d}" font-size="20" font-weight="800">방 안으로 들어가요</text></g>
        <line x1="16" y1="160" x2="464" y2="160" stroke="#e5e5ea" stroke-width="2"/>
        <g class="row2">${cells(B, 178, 'b')}</g>
        <rect class="hl" x="${X2 + 4 * C2 - 2}" y="174" width="${C2 * 3 + 4}" height="46" rx="8" fill="none" stroke="${DG_C.c}" stroke-width="3"/>
        <g class="m1"><rect x="40" y="252" width="38" height="28" rx="6" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
          <path d="M50 252 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke="${DG_C.c}" stroke-width="3"/>
          <text x="90" y="274" fill="${DG_C.c}" font-size="20" font-weight="800">가방 속으로?!</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          q('.m0').setAttribute('opacity', dgP(e, 700, 400));
          q('.hl0').setAttribute('opacity', e > 700 ? 1 : 0);
          q('.row2').setAttribute('opacity', dgP(e, 1600, 400));
          // 두 번째 줄의 '가'(4번 칸)가 3번 칸에서 띄어쓰기를 건너 넘어오는 모습
          const f = dgEase(dgP(e, 2200, 900));
          const g = q('.b4');
          g.setAttribute('transform', `translate(${-(1 - f) * C2},${-Math.sin(f * Math.PI) * 18})`);
          q('.hl').setAttribute('opacity', e > 3200 ? 1 : 0);
          q('.m1').setAttribute('opacity', dgP(e, 3600, 400));
        });
      }
    },

    'k1-13:3': {
      alt: '토끼야, 뒤에서는 ∨ 표시처럼 조금 쉬고, 같이 놀자. 뒤에서는 ≫ 표시처럼 조금 더 쉬어 읽는 그림. 응,∨좋아.≫',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <text x="24" y="84" font-size="30" font-weight="800" fill="${DG_C.ink}">토끼야,</text>
        <text class="v0" x="140" y="84" text-anchor="middle" font-size="30" font-weight="800" fill="${DG_C.d}">∨</text>
        <text x="166" y="84" font-size="30" font-weight="800" fill="${DG_C.ink}">같이 놀자.</text>
        <text class="v1" x="338" y="84" text-anchor="middle" font-size="30" font-weight="800" fill="${DG_C.c}">≫</text>
        <text x="24" y="150" font-size="30" font-weight="800" fill="${DG_C.ink}">응,</text>
        <text class="v2" x="82" y="150" text-anchor="middle" font-size="30" font-weight="800" fill="${DG_C.d}">∨</text>
        <text x="108" y="150" font-size="30" font-weight="800" fill="${DG_C.ink}">좋아.</text>
        <text class="v3" x="200" y="150" text-anchor="middle" font-size="30" font-weight="800" fill="${DG_C.c}">≫</text>
        <circle class="dot" r="7" fill="${DG_C.c}"/>
        <line x1="20" y1="186" x2="460" y2="186" stroke="#e5e5ea" stroke-width="2"/>
        <g class="lg"><text x="40" y="230" text-anchor="middle" font-size="28" font-weight="800" fill="${DG_C.d}">∨</text>
          <text x="64" y="228" font-size="20" font-weight="700" fill="${DG_C.ink}">쉼표 뒤: 조금 쉬어요</text>
          <rect x="300" y="210" width="34" height="22" rx="11" fill="${DG_C.b}"/>
          <text x="40" y="268" text-anchor="middle" font-size="28" font-weight="800" fill="${DG_C.c}">≫</text>
          <text x="64" y="266" font-size="20" font-weight="700" fill="${DG_C.ink}">마침표 뒤: 더 쉬어요</text>
          <rect x="300" y="248" width="90" height="22" rx="11" fill="${DG_C.a}"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        // 읽는 점: 글자 위에서는 움직이고, 표시에서는 멈춰 쉼
        const K = [ // [시각ms, x, y]
          [0, 24, 100], [900, 128, 100], [1300, 140, 100], [1500, 166, 100], [2600, 326, 100], [3500, 338, 100],
          [3600, 24, 166], [3900, 70, 166], [4300, 82, 166], [4400, 108, 166], [4900, 188, 166], [5800, 200, 166],
        ];
        const marks = [[1000, 'v0'], [2700, 'v1'], [4000, 'v2'], [5000, 'v3']];
        dgAnim(el, 6400, e => {
          let k = 0; while (k < K.length - 1 && e > K[k + 1][0]) k++;
          const [t0, x0, y0] = K[k], [t1, x1, y1] = K[Math.min(k + 1, K.length - 1)];
          const f = t1 > t0 ? Math.min(1, Math.max(0, (e - t0) / (t1 - t0))) : 1;
          const jump = y1 !== y0; // 줄 바꿈은 순간 이동
          q('.dot').setAttribute('cx', jump ? x0 : x0 + (x1 - x0) * f);
          q('.dot').setAttribute('cy', y0);
          q('.dot').setAttribute('opacity', e < 6000 ? 1 : 0);
          marks.forEach(([t, c]) => q('.' + c).setAttribute('opacity', e > t ? 1 : 0.15));
          q('.lg').setAttribute('opacity', dgP(e, 5800, 500));
        });
      }
    },
  });
})();
