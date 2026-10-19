/* 3학년 수학 · 받아올림과 받아내림, 왜 필요할까? (m3-04) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const X = [170, 235, 300];             // 백·십·일 자리 x
  const NAMES = ['백', '십', '일'];
  // 세로셈 틀: 자리 띠 + 머리글 + 두 수 + 기호 + 가로줄
  const frame = (a, b, op, top) => `
    ${X.map((x, i) => `<rect class="col col${i}" x="${x - 28}" y="${top - 24}" width="56" height="${296 - top}" rx="14" fill="${C.b}" opacity="0"/>`).join('')}
    ${X.map((x, i) => T(x, top, NAMES[i], { s: 20, f: C.sub, w: 700 })).join('')}
    ${[...a].map((d, i) => T(X[i], 140, d, { s: 36, c: 'ta' + i })).join('')}
    ${T(110, 195, op, { s: 36 })}
    ${[...b].map((d, i) => T(X[i], 195, d, { s: 36 })).join('')}
    <line x1="96" y1="214" x2="330" y2="214" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`;
  const colOn = (q, k) => [0, 1, 2].forEach(i => q('.col' + i).setAttribute('opacity', i === k ? 0.55 : 0));

  Object.assign(DIAG, {
    'm3-04:0': {
      alt: '324와 152를 백·십·일 자리에 맞추어 세로로 쓰고, 일의 자리 4+2=6, 십의 자리 2+5=7, 백의 자리 3+1=4 순서로 계산해 476이 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${frame('324', '152', '+', 70)}
        ${'476'.split('').map((d, i) => T(X[i], 260, d, { s: 36, f: C.d, c: 'r' + i })).join('')}
        ${['4+2=6', '2+5=7', '3+1=4'].map((s, k) => { const i = 2 - k; return `<g class="n${i}">${T(352, 120 + k * 46, NAMES[i], { s: 18, f: C.sub, w: 700, a: 'start' })}${T(378, 120 + k * 46, s, { s: 22, f: C.d, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          let act = -1;
          [2, 1, 0].forEach((i, k) => {
            const st = 600 + k * 1400;
            if (e >= st && e < st + 1300) act = i;
            q('.r' + i).setAttribute('opacity', dgP(e, st + 600, 400));
            q('.n' + i).setAttribute('opacity', dgP(e, st + 200, 400));
          });
          colOn(q, act);
        });
      }
    },

    'm3-04:1': {
      alt: '456+278 세로셈에서 일의 자리 6+8=14의 1이 십의 자리 위로, 십의 자리 5+7+1=13의 1이 백의 자리 위로 올라가 답 734가 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${frame('456', '278', '+', 40)}
        ${[0, 1].map(i => `<g class="cy${i}"><circle cx="${X[i]}" cy="83" r="17" fill="#fff" stroke="${C.c}" stroke-width="3"/>${T(X[i], 91, '1', { s: 22, f: C.c })}</g>`).join('')}
        ${'734'.split('').map((d, i) => T(X[i], 260, d, { s: 36, f: C.d, c: 'r' + i })).join('')}
        ${['6+8=14', '5+7+1=13', '4+2+1=7'].map((s, k) => { const i = 2 - k; return `<g class="n${i}">${T(352, 120 + k * 46, NAMES[i], { s: 18, f: C.sub, w: 700, a: 'start' })}${T(376, 120 + k * 46, s, { s: 20, f: C.d, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          let act = -1;
          [2, 1, 0].forEach((i, k) => {
            const st = 600 + k * 1800;
            if (e >= st && e < st + 1700) act = i;
            q('.n' + i).setAttribute('opacity', dgP(e, st + 200, 400));
            q('.r' + i).setAttribute('opacity', dgP(e, st + 700, 400));
            if (i > 0) { // 받아올린 1이 결과 자리에서 윗자리 위로 올라감
              const m = dgEase(dgP(e, st + 1000, 700));
              const dx = (X[i] - X[i - 1]) * (1 - m), dy = (250 - 83) * (1 - m);
              const g = q('.cy' + (i - 1));
              g.setAttribute('transform', `translate(${dx},${dy})`);
              g.setAttribute('opacity', e >= st + 1000 ? 1 : 0);
            }
          });
          colOn(q, act);
        });
      }
    },

    'm3-04:2': {
      alt: '503−267 세로셈에서 백의 자리 5가 4가 되며 십의 자리가 10이 되고, 다시 십의 자리 10이 9가 되며 일의 자리가 13이 되어 13−7=6, 9−6=3, 4−2=2로 236이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${X.map((x, i) => `<rect class="col col${i}" x="${x - 30}" y="24" width="60" height="276" rx="14" fill="${C.b}" opacity="0"/>`).join('')}
        ${X.map((x, i) => T(x, 293, NAMES[i], { s: 18, f: C.sub, w: 700 })).join('')}
        ${'503'.split('').map((d, i) => T(X[i], 150, d, { s: 36 })).join('')}
        ${T(110, 200, '−', { s: 36 })}
        ${'267'.split('').map((d, i) => T(X[i], 200, d, { s: 36 })).join('')}
        <line x1="96" y1="216" x2="330" y2="216" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
        <g fill="none" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round">
          <line class="x0" x1="${X[0] - 14}" y1="150" x2="${X[0] + 14}" y2="118"/>
          <line class="x1" x1="${X[1] - 14}" y1="150" x2="${X[1] + 14}" y2="118"/>
          <line class="x2" x1="${X[2] - 14}" y1="150" x2="${X[2] + 14}" y2="118"/>
          <line class="x1b" x1="${X[1] - 20}" y1="103" x2="${X[1] + 20}" y2="80"/>
        </g>
        ${T(X[0], 103, '4', { s: 24, f: C.c, c: 'k0' })}
        ${T(X[1], 103, '10', { s: 24, f: C.c, c: 'k1' })}
        ${T(X[1], 62, '9', { s: 24, f: C.c, c: 'k1b' })}
        ${T(X[2], 103, '13', { s: 24, f: C.c, c: 'k2' })}
        ${'236'.split('').map((d, i) => T(X[i], 260, d, { s: 36, f: C.d, c: 'r' + i })).join('')}
        ${['13−7=6', '9−6=3', '4−2=2'].map((s, k) => { const i = 2 - k; return `<g class="n${i}">${T(352, 128 + k * 46, NAMES[i], { s: 18, f: C.sub, w: 700, a: 'start' })}${T(376, 128 + k * 46, s, { s: 20, f: C.d, a: 'start' })}</g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7400, e => {
          const on = (c, t) => q(c).setAttribute('opacity', e >= t ? 1 : 0);
          // ① 백의 자리에서 받아내림: 5→4, 0→10
          on('.x0', 900); on('.k0', 1100); on('.x1', 1700); on('.k1', 1700);
          // ② 십의 자리에서 받아내림: 10→9, 3→13
          on('.x1b', 2700); on('.k1b', 2900); on('.x2', 3500); on('.k2', 3500);
          let act = e < 2500 && e >= 700 ? 0 : (e >= 2500 && e < 3300 ? 1 : -1);
          [2, 1, 0].forEach((i, k) => {
            const st = 4300 + k * 1000;
            if (e >= st && e < st + 950) act = i;
            q('.n' + i).setAttribute('opacity', dgP(e, st, 300));
            q('.r' + i).setAttribute('opacity', dgP(e, st + 400, 300));
          });
          if (e >= 3300 && e < 4300) act = 2;
          colOn(q, act);
        });
      }
    },

    'm3-04:3': {
      alt: '312+289를 300+300=600으로 어림하면 실제 값 601과 가깝고, 503−267=236을 236+267=503으로 검산하는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${T(20, 34, '어림하기', { s: 18, f: C.sub, w: 700, a: 'start' })}
        ${T(70, 80, '312', { s: 26 })}${T(122, 80, '+', { s: 26 })}${T(174, 80, '289', { s: 26 })}
        <g class="est">
          <path d="M70 92 v18 m-6 -6 l6 6 l6 -6 M174 92 v18 m-6 -6 l6 6 l6 -6" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(70, 142, '300', { s: 26, f: C.c })}${T(122, 142, '+', { s: 26, f: C.c })}${T(174, 142, '300', { s: 26, f: C.c })}
          ${T(214, 142, '= 600', { s: 26, f: C.c, a: 'start' })}
        </g>
        <g class="real"><rect x="330" y="112" width="130" height="42" rx="21" fill="${C.b}" fill-opacity=".5"/>${T(395, 141, '실제 601', { s: 22, f: C.d })}</g>
        <line x1="20" y1="174" x2="460" y2="174" stroke="#e5e5ea" stroke-width="2"/>
        ${T(20, 206, '검산하기', { s: 18, f: C.sub, w: 700, a: 'start' })}
        ${[['503', '−', '267', '=', '236'], ['236', '+', '267', '=', '503']].map((r, j) => `<g class="eq${j}">${r.map((s, i) => T(110 + i * 62, j ? 318 : 240, s, { s: 26, f: (i === 0 || i === 4) ? (s === '236' ? C.c : C.d) : C.ink })).join('')}</g>`).join('')}
        <g class="arr" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M350 252 L126 290 m12 -10 l-12 10 l14 4" stroke="${C.c}"/>
          <path d="M126 252 L346 290 m-14 -10 l14 10 l-14 4" stroke="${C.d}"/>
        </g>
        <path class="ok" d="M412 306 l10 10 l20 -24" fill="none" stroke="${C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.est').setAttribute('opacity', dgP(e, 600, 600));
          q('.real').setAttribute('opacity', dgP(e, 1800, 500));
          q('.eq0').setAttribute('opacity', dgP(e, 2700, 500));
          const a = dgEase(dgP(e, 3400, 900));
          q('.arr').setAttribute('opacity', a > 0 ? 1 : 0);
          q('.arr').style.clipPath = `inset(0 0 ${100 - a * 100}% 0)`;
          q('.eq1').setAttribute('opacity', dgP(e, 4300, 500));
          q('.ok').setAttribute('opacity', e >= 5200 ? 1 : 0);
        });
      }
    },
  });
})();
