/* 1학년 영어 · c-a-t, 소리를 이으면 어떤 낱말이 될까? (e1-06) */
(() => {
  const tile = (cx, cy, ch, fill, col = DG_C.ink, s = 56) => `<rect x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" rx="12" fill="${fill}"/><text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="${col}" font-size="34" font-weight="800">${ch}</text>`;
  const arrow = (x, y) => `<path d="M${x} ${y} h36 m-10 -10 l10 10 l-10 10" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* 0 */
  const W0 = [{ w: 'cat', s: ['크', '애', '트'], y: 84 }, { w: 'dog', y: 214 }];
  const SP = [56, 140, 224], CL = [82, 140, 198];
  /* 1 */
  const V1 = [['a', 'cat', 'hat'], ['e', 'bed', 'pen'], ['i', 'pig', 'six'], ['o', 'dog', 'box'], ['u', 'sun', 'bus']];
  /* 2 */
  const F2 = ['c', 'h', 'b', 'm'];
  /* 3 */
  const C3 = [{ a: 'pen', b: 'pan', ma: '펜', mb: '프라이팬' }, { a: 'pin', b: 'pen', ma: '핀', mb: '펜' }];
  const LX = i => 52 + i * 58, RX = i => 302 + i * 58;

  Object.assign(DIAG, {
    'e1-06:0': {
      alt: 'c, a, t 글자를 하나씩 크, 애, 트로 소리 낸 뒤 빨리 이으면 cat, d, o, g를 이으면 dog가 되는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        ${W0.map((r, k) => `${r.w.split('').map((c, i) => `<g class="t${k}_${i}">${tile(0, 0, c, i === 1 ? DG_C.a : DG_C.b)}
            ${r.s ? `<text class="s${i}" x="0" y="62" text-anchor="middle" fill="${DG_C.c}" font-size="24" font-weight="800">${r.s[i]}</text>` : ''}</g>`).join('')}
          <g class="r${k}">${arrow(268, r.y)}<text x="324" y="${r.y + 14}" fill="${DG_C.ink}" font-size="40" font-weight="800">${r.w}</text></g>`).join('')}
        <circle class="fg" r="8" fill="${DG_C.c}"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          // cat: 손가락이 한 글자씩 짚으며 소리 → 모여서 cat
          const m0 = dgEase(dgP(e, 3000, 900)), m1 = dgEase(dgP(e, 5000, 800));
          [0, 1, 2].forEach(i => {
            q(`.t0_${i}`).setAttribute('transform', `translate(${SP[i] + (CL[i] - SP[i]) * m0},${W0[0].y})`);
            q(`.t0_${i} .s${i}`).setAttribute('opacity', e > 600 + i * 800 ? 1 : 0);
            q(`.t1_${i}`).setAttribute('transform', `translate(${SP[i] + (CL[i] - SP[i]) * m1},${W0[1].y})`);
            q(`.t1_${i}`).setAttribute('opacity', e > 4300 ? 1 : 0.0);
          });
          const fi = Math.min(2, Math.floor(Math.max(0, e - 400) / 800));
          q('.fg').setAttribute('transform', `translate(${SP[fi]},${W0[0].y - 42})`);
          q('.fg').setAttribute('opacity', e > 400 && e < 2800 ? 1 : 0);
          q('.r0').setAttribute('opacity', dgP(e, 3800, 400));
          q('.r1').setAttribute('opacity', dgP(e, 5700, 400));
        });
      }
    },

    'e1-06:1': {
      alt: '모음 a e i o u가 세 글자 낱말 cat hat, bed pen, pig six, dog box, sun bus의 가운데에 오는 것을 색칠해 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${V1.map(([v, w1, w2], i) => { const x = 48 + i * 96; return `<g class="c${i}">
          <circle cx="${x}" cy="74" r="28" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
          <text x="${x}" y="85" text-anchor="middle" fill="${DG_C.ink}" font-size="32" font-weight="800">${v}</text>
          <rect x="${x - 42}" y="114" width="84" height="104" rx="14" fill="#f5f5f7"/>
          ${[w1, w2].map((w, k) => `<text x="${x}" y="${152 + k * 46}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${w[0]}<tspan fill="${DG_C.c}">${w[1]}</tspan>${w[2]}</text>`).join('')}
        </g>`; }).join('')}
        <text class="cap" x="240" y="254" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">가운데 모음은 짧게!</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          V1.forEach((_, i) => {
            const f = dgEase(dgP(e, 200 + i * 750, 450));
            q('.c' + i).setAttribute('opacity', f);
            q('.c' + i).setAttribute('transform', `translate(0,${14 * (1 - f)})`);
          });
          q('.cap').setAttribute('opacity', e > 4200 ? 1 : 0);
        });
      }
    },

    'e1-06:2': {
      alt: 'cat의 첫 글자 c를 h, b, m으로 바꾸면 hat, bat, mat이 되고, 끝소리 at이 같은 낱말 가족이 되는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <rect class="fam" x="174" y="40" width="124" height="246" rx="18" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-dasharray="7 6"/>
        ${F2.map((f, k) => { const y = 72 + k * 62; return `<g class="row${k}">
          <g class="f${k}">${tile(140, y, f, DG_C.a)}</g>
          ${tile(208, y, 'a', DG_C.b)}${tile(264, y, 't', DG_C.b)}
          <text class="wd${k}" x="330" y="${y + 10}" fill="${DG_C.ink}" font-size="28" font-weight="800"><tspan fill="${DG_C.c}">${f}</tspan>at</text></g>`; }).join('')}
        <text class="fl" x="236" y="316" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">-at 가족</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          F2.forEach((_, k) => {
            const st = 300 + k * 1200, f = dgEase(dgP(e, st, 600));
            q('.row' + k).setAttribute('opacity', k === 0 ? 1 : e > st ? 1 : 0);
            q('.f' + k).setAttribute('transform', `translate(${-90 * (1 - (k === 0 ? 1 : f))},0)`);
            q('.wd' + k).setAttribute('opacity', e > st + 650 ? 1 : 0);
          });
          q('.fam').setAttribute('opacity', e > 5000 ? 1 : 0);
          q('.fl').setAttribute('opacity', e > 5000 ? 1 : 0);
        });
      }
    },

    'e1-06:3': {
      alt: 'pen의 가운데 e를 a로 바꾸면 pan(프라이팬), pin의 가운데 i를 e로 바꾸면 pen(펜)이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${C3.map((c, k) => { const y = 86 + k * 128; return `<g class="rw${k}">
          ${c.a.split('').map((ch, i) => tile(LX(i), y, ch, i === 1 ? DG_C.a : DG_C.b)).join('')}
          <text x="${LX(1)}" y="${y + 60}" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${c.ma}</text>
          <g class="ar${k}">${arrow(208, y)}</g>
          <g class="nw${k}">${tile(RX(0), y, c.b[0], DG_C.b)}${tile(RX(2), y, c.b[2], DG_C.b)}
            <g class="old${k}">${tile(RX(1), y, c.a[1], DG_C.a)}</g>
            <g class="new${k}">${tile(0, 0, c.b[1], DG_C.c, '#fff')}</g>
            <text class="mb${k}" x="${RX(1)}" y="${y + 60}" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">${c.mb}</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          C3.forEach((c, k) => {
            const st = 300 + k * 2900, y = 86 + k * 128;
            q('.rw' + k).setAttribute('opacity', e > st ? 1 : 0);
            q('.ar' + k).setAttribute('opacity', e > st + 500 ? 1 : 0);
            q('.nw' + k).setAttribute('opacity', e > st + 800 ? 1 : 0);
            const o = dgP(e, st + 1300, 350), n = dgEase(dgP(e, st + 1650, 450));
            q('.old' + k).setAttribute('transform', o < 1 ? `translate(${RX(1)},${y}) scale(1,${Math.max(0.001, 1 - o)}) translate(${-RX(1)},${-y})` : '');
            q('.old' + k).setAttribute('display', o < 1 ? 'inline' : 'none');
            q('.old' + k).setAttribute('opacity', o < 1 ? 1 : 0);
            q('.new' + k).setAttribute('transform', `translate(${RX(1)},${y}) scale(1,${Math.max(0.001, n)})`);
            q('.new' + k).setAttribute('opacity', n > 0 ? 1 : 0);
            q('.mb' + k).setAttribute('opacity', e > st + 2200 ? 1 : 0);
          });
        });
      }
    },
  });
})();
