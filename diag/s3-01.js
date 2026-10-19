/* 3학년 과학 · 소리는 어떻게 생기고 전해질까? (s3-01) */
(() => {
  const C = DG_C, RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const f1 = v => +v.toFixed(1);
  /* 작은북(옆에서 본 모습): 윗면 가운데 (x, y) */
  const drum = (x, y, rx, h) => `<path d="M${x - rx} ${y} V${y + h} A${rx} ${rx * .22} 0 0 0 ${x + rx} ${y + h} V${y}" fill="${C.b}" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/>
    ${[-.6, -.2, .2, .6].map(k => `<line x1="${x + k * rx}" y1="${y + rx * .2}" x2="${x + k * rx * .9}" y2="${y + h + rx * .2}" stroke="${C.d}" stroke-width="2" opacity=".5"/>`).join('')}
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .22}" fill="#fff" stroke="${C.d}" stroke-width="3"/>`;
  const GR = [-36, -18, 0, 18, 36];
  const grains = (x, y, cls) => GR.map((d, i) => `<circle class="${cls} ${cls}${i}" cx="${x + d}" cy="${y - 4}" r="5" fill="${C.c}"/>`).join('');
  const setGrains = (el, cls, y0, amp, e, st, en, air) => {
    GR.forEach((d, i) => {
      let off = 0;
      if (air) off = amp * (0.45 + 0.55 * Math.abs(Math.sin(1.1 + i * 1.3))); // 최종 장면: 공중에 뜬 모습
      else if (e >= st && e < en) off = amp * Math.abs(Math.sin((e - st) / 260 + i * 1.3));
      el.querySelector(`.${cls}${i}`).setAttribute('cy', y0 - 4 - off);
    });
  };
  const note = (x, y, col) => `<g fill="${col}" stroke="${col}"><ellipse cx="${x}" cy="${y}" rx="7" ry="5.5" transform="rotate(-20 ${x} ${y})" stroke="none"/><line x1="${x + 6}" y1="${y - 2}" x2="${x + 6}" y2="${y - 26}" stroke-width="2.5"/><path d="M${x + 6} ${y - 26} q10 4 10 14" fill="none" stroke-width="2.5"/></g>`;
  const vib = (x, y, rx, cls) => `<g class="${cls}" fill="none" stroke="${C.d}" stroke-width="2.5" stroke-linecap="round">
    <path d="M${x - rx - 10} ${y - 10} q-8 10 0 20"/><path d="M${x - rx - 20} ${y - 15} q-10 15 0 30"/>
    <path d="M${x + rx + 10} ${y - 10} q8 10 0 20"/><path d="M${x + rx + 20} ${y - 15} q10 15 0 30"/></g>`;
  const wave = (x0, x1, y, amp, per, prog = 1) => {
    let d = `M${x0} ${y}`;
    const xe = x0 + (x1 - x0) * prog;
    for (let x = x0 + 2; x <= xe; x += 2) d += ` L${x} ${f1(y - amp * Math.sin((x - x0) / per * 2 * Math.PI))}`;
    return d;
  };

  /* 4: 반사 */
  const CAR = [138, 196], WALL = 330;
  const arcPath = (cx, cy, r, a0, a1) => { const p = a => [f1(cx + r * Math.cos(a * Math.PI / 180)), f1(cy + r * Math.sin(a * Math.PI / 180))]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`; };
  const fronts = R => R.map(r => r <= 0 ? '' : r < WALL - CAR[0]
    ? `<path d="${arcPath(CAR[0], CAR[1], r, -32, 32)}" fill="none" stroke="${C.d}" stroke-width="4" stroke-linecap="round"/>`
    : r < 2 * (WALL - CAR[0]) - 30 ? `<path d="${arcPath(2 * WALL - CAR[0], CAR[1], r, 148, 212)}" fill="none" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>` : '').join('');

  Object.assign(DIAG, {
    's3-01:0': {
      alt: '작은북 위에 좁쌀을 올려놓고 북을 치면 북이 떨리면서 좁쌀이 튀어 오르고 소리가 나며, 손으로 꽉 잡아 떨림을 멈추면 좁쌀이 가만히 있고 소리도 멈추는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${drum(120, 160, 78, 62)}${grains(120, 160, 'ga')}${vib(120, 160, 78, 'va')}
        <g class="stk"><line x1="0" y1="0" x2="62" y2="0" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><circle cx="64" cy="0" r="7" fill="${C.ink}"/></g>
        <g class="na">${note(178, 78, C.d)}${note(206, 56, C.d)}</g>
        ${T(120, 276, '떨려요', { cls: 'la', fs: 22, fw: 800, fill: C.d })}${T(120, 302, '소리가 나요', { cls: 'la', fs: 18, fw: 700, fill: C.sub })}
        <line x1="240" y1="40" x2="240" y2="290" stroke="#e5e5ea" stroke-width="2"/>
        <g class="rp">${drum(360, 160, 78, 62)}${grains(360, 160, 'gb')}${vib(360, 160, 78, 'vb')}
          <g class="hand"><path d="M300 146 q0 -30 30 -32 h66 q24 2 24 26 v10 q-2 8 -12 8 h-100 q-8 0 -8 -12 z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
            <path d="M330 114 v-16 M352 114 v-18 M374 114 v-18 M396 116 v-14" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/></g>
          <g class="nb">${note(420, 78, C.sub)}<line x1="404" y1="46" x2="440" y2="88" stroke="${RED}" stroke-width="4" stroke-linecap="round"/></g>
          ${T(360, 276, '꽉 잡으면', { cls: 'lb', fs: 22, fw: 800, fill: C.c })}${T(360, 302, '소리가 멈춰요', { cls: 'lb', fs: 18, fw: 700, fill: C.sub })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), END = 6400;
        dgAnim(el, END, e => {
          // 왼쪽: 북채로 치기
          const hit = dgP(e, 300, 400);
          const ang = e < 700 ? -40 + 40 * dgEase(hit) : -40 * dgEase(dgP(e, 700, 400));
          q('.stk').setAttribute('transform', `translate(20,${118}) rotate(${ang + 30})`);
          const fin = e >= END;
          setGrains(el, 'ga', 160, 34, e, 700, 3600, fin);
          op(el, '.va', (e > 700 && e < 3600) || fin ? 1 : 0);
          op(el, '.na', e > 900 ? 1 : 0); op(el, '.la', e > 1200 ? 1 : 0);
          // 오른쪽: 떨리다가 손으로 잡음
          op(el, '.rp', e > 2600 ? 1 : 0);
          const h = dgEase(dgP(e, 3600, 900));
          q('.hand').setAttribute('transform', `translate(0,${-70 * (1 - h)})`);
          q('.hand').setAttribute('opacity', e > 3300 ? 1 : 0);
          setGrains(el, 'gb', 160, 26, e, 2600, 4500);
          op(el, '.vb', e > 2600 && e < 4500 ? 1 : 0);
          op(el, '.nb', e > 4600 ? 1 : 0); op(el, '.lb', e > 4900 ? 1 : 0);
        });
      }
    },

    's3-01:1': {
      alt: '북을 세게 치면 좁쌀이 높이 튀고 크게 떨려서 큰 소리, 약하게 치면 좁쌀이 낮게 튀고 작게 떨려서 작은 소리가 나는 것을 떨림의 크기로 비교한 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${drum(120, 150, 64, 46)}${grains(120, 150, 'ga')}
        ${drum(360, 150, 64, 46)}${grains(360, 150, 'gb')}
        <g class="hA"><line x1="186" y1="146" x2="186" y2="60" stroke="${C.c}" stroke-width="2.5" stroke-dasharray="5 5"/><path d="M180 68 l6 -10 l6 10" fill="none" stroke="${C.c}" stroke-width="2.5"/></g>
        <g class="hB"><line x1="426" y1="146" x2="426" y2="118" stroke="${C.d}" stroke-width="2.5" stroke-dasharray="5 5"/><path d="M420 126 l6 -10 l6 10" fill="none" stroke="${C.d}" stroke-width="2.5"/></g>
        ${T(120, 232, '세게 → 큰 소리', { cls: 'lA', fs: 20, fw: 800, fill: C.c })}
        ${T(360, 232, '약하게 → 작은 소리', { cls: 'lB', fs: 20, fw: 800, fill: C.d })}
        <line x1="30" y1="272" x2="210" y2="272" stroke="#e5e5ea" stroke-width="1.5"/><line x1="270" y1="272" x2="450" y2="272" stroke="#e5e5ea" stroke-width="1.5"/>
        <path class="wA" d="" fill="none" stroke="${C.c}" stroke-width="3.5" stroke-linejoin="round"/>
        <path class="wB" d="" fill="none" stroke="${C.d}" stroke-width="3.5" stroke-linejoin="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), END = 6000, fin = e => e >= END;
        dgAnim(el, END, e => {
          setGrains(el, 'ga', 150, 84, e, 300, 2600, fin(e));
          setGrains(el, 'gb', 150, 22, e, 2800, 5100, fin(e));
          op(el, '.hA,.lA', e > 1200 ? 1 : 0); op(el, '.hB,.lB', e > 3700 ? 1 : 0);
          q('.wA').setAttribute('d', wave(30, 210, 272, 22, 36, dgP(e, 500, 1600)));
          q('.wB').setAttribute('d', wave(270, 450, 272, 6, 36, dgP(e, 3000, 1600)));
        });
      }
    },

    's3-01:2': {
      alt: '실로폰의 짧은 음판을 치면 빠르게 떨려 높은 소리, 긴 음판을 치면 느리게 떨려 낮은 소리가 나는 것을 떨림의 빠르기로 비교한 그림',
      svg: (() => {
        const bars = Array.from({ length: 7 }, (_, i) => ({ x: 58 + i * 58, h: 150 - i * 13 }));
        return `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
          <line x1="30" y1="${100 - 52}" x2="440" y2="${100 - 33}" stroke="${C.sub}" stroke-width="3"/>
          <line x1="30" y1="${100 + 52}" x2="440" y2="${100 + 33}" stroke="${C.sub}" stroke-width="3"/>
          ${bars.map((b, i) => `<rect class="xb${i}" x="${b.x - 20}" y="${100 - b.h / 2 + 8}" width="40" height="${b.h - 16}" rx="6" fill="${i === 0 ? C.b : i === 6 ? C.a : '#f5f5f7'}" stroke="${i === 0 ? C.d : i === 6 ? C.c : C.sub}" stroke-width="2.5"/>`).join('')}
          ${T(58, 196, '긴 음판', { fs: 18, fw: 700, fill: C.d })}${T(406, 196, '짧은 음판', { fs: 18, fw: 700, fill: C.c })}
          <g class="mal"><line x1="0" y1="0" x2="0" y2="-46" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="0" r="10" fill="${C.ink}"/></g>
          ${T(16, 232, '높은 소리', { cls: 'lh', a: 'start', fs: 20, fw: 800, fill: C.c })}${T(16, 256, '빠르게 떨림', { cls: 'lh', a: 'start', fs: 18, fw: 700, fill: C.sub })}
          <path class="wh" d="" fill="none" stroke="${C.c}" stroke-width="3.5"/>
          ${T(16, 296, '낮은 소리', { cls: 'll', a: 'start', fs: 20, fw: 800, fill: C.d })}${T(16, 320, '느리게 떨림', { cls: 'll', a: 'start', fs: 18, fw: 700, fill: C.sub })}
          <path class="wl" d="" fill="none" stroke="${C.d}" stroke-width="3.5"/>
        </svg>`;
      })(),
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          // 짧은 음판 치기 → 빠른 떨림, 긴 음판 치기 → 느린 떨림
          const m = e < 2900 ? [406, 100 - 40 + 8 * Math.max(0, Math.sin(Math.PI * dgP(e, 300, 500)))] : [58, 100 - 52 + 10 * Math.max(0, Math.sin(Math.PI * dgP(e, 3100, 500)))];
          q('.mal').setAttribute('transform', `translate(${m[0] + 26},${m[1] + 26}) rotate(30)`);
          q('.mal').setAttribute('opacity', e < 5600 ? 1 : 0);
          q('.wh').setAttribute('d', wave(136, 466, 240, 12, 22, dgP(e, 700, 1700)));
          q('.wl').setAttribute('d', wave(136, 466, 304, 12, 82, dgP(e, 3500, 1700)));
          op(el, '.lh', e > 800 ? 1 : 0); op(el, '.ll', e > 3600 ? 1 : 0);
        });
      }
    },

    's3-01:3': {
      alt: '종이컵 실 전화기에서 한 아이의 목소리 떨림이 팽팽한 실을 따라 전해져 다른 아이의 귀에 들리는 그림. 소리는 기체(공기), 고체(실, 책상), 액체(물)를 통해 전해져요',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <circle cx="38" cy="110" r="26" fill="${C.a}" stroke="${C.c}" stroke-width="3"/><circle cx="44" cy="102" r="3" fill="${C.ink}"/>
        <circle cx="442" cy="110" r="26" fill="${C.a}" stroke="${C.c}" stroke-width="3"/><circle cx="436" cy="102" r="3" fill="${C.ink}"/>
        <path d="M70 92 L96 100 L96 120 L70 128 Z" fill="#fff" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M410 92 L384 100 L384 120 L410 128 Z" fill="#fff" stroke="${C.sub}" stroke-width="3" stroke-linejoin="round"/>
        <line x1="96" y1="110" x2="384" y2="110" stroke="${C.ink}" stroke-width="2.5"/>
        <g class="pl"></g>
        ${T(240, 80, '실이 떨림을 전해요', { cls: 'lb', fs: 20, fw: 800, fill: C.c })}
        ${[['기체', '공기', 80], ['고체', '실, 책상', 240], ['액체', '물', 400]].map(([a, b, x], i) => `<g class="ch ch${i}"><rect x="${x - 72}" y="190" width="144" height="70" rx="16" fill="${[C.b, C.a, '#d6efdc'][i]}" fill-opacity=".7"/>
          ${T(x, 220, a, { fs: 22, fw: 800, fill: [C.d, C.c, C.r][i] })}${T(x, 248, b, { fs: 18, fw: 700, fill: C.ink })}</g>`).join('')}
      </svg>`,
      play(el) {
        const g = el.querySelector('.pl');
        dgAnim(el, 6000, e => {
          // 떨림(작은 물결 덩어리)이 실을 따라 오른쪽으로 이동
          let s = '';
          const ks = e >= 6000 ? [0.25, 0.55, 0.85] : [0, 1, 2].map(k => ((e - 300) / 1800 - k * .33));
          ks.forEach(p => {
            if (p < 0 || p > 1) return;
            const x = 104 + p * 260;
            s += `<path d="${wave(x, x + 24, 110, 7, 12)}" fill="none" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round"/>`;
          });
          g.innerHTML = s;
          op(el, '.lb', e > 1200 ? 1 : 0);
          [0, 1, 2].forEach(i => op(el, '.ch' + i, e > 3200 + i * 600 ? 1 : 0));
        });
      }
    },

    's3-01:4': {
      alt: '자동차 소리가 나아가다가 도로 옆 방음벽에 부딪쳐 되돌아오는 소리의 반사를 나타낸 그림. 방음벽 뒤의 집에는 소리가 덜 전해져요',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <line x1="10" y1="236" x2="470" y2="236" stroke="${C.sub}" stroke-width="3"/>
        <g><rect x="30" y="184" width="104" height="38" rx="10" fill="${C.b}" stroke="${C.d}" stroke-width="3"/>
          <path d="M50 184 l14 -22 h44 l14 22" fill="#fff" stroke="${C.d}" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="58" cy="226" r="11" fill="${C.ink}"/><circle cx="108" cy="226" r="11" fill="${C.ink}"/></g>
        <rect x="${WALL}" y="70" width="22" height="166" fill="#d2d2d7" stroke="${C.ink}" stroke-width="3"/>
        ${T(WALL + 11, 56, '방음벽', { fs: 20, fw: 800 })}
        <path d="M392 236 V196 L422 172 L452 196 V236 Z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
        <rect x="414" y="208" width="16" height="28" fill="#fff" stroke="${C.c}" stroke-width="2"/>
        <clipPath id="s301-clip"><rect x="0" y="62" width="${WALL}" height="174"/></clipPath>
        <g class="fr" clip-path="url(#s301-clip)"></g>
        <g class="lb">
          <path d="M150 112 H300" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/><path d="M292 104 l8 8 l-8 8" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round"/>
          <path d="M300 136 H158" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/><path d="M166 128 l-8 8 l8 8" fill="none" stroke="${C.c}" stroke-width="3" stroke-linecap="round"/>
          ${T(226, 100, '나아가요', { fs: 18, fw: 800, fill: C.d })}
          ${T(226, 164, '되돌아와요', { fs: 20, fw: 800, fill: C.c })}
          ${T(240, 276, '소리의 반사', { fs: 22, fw: 800 })}
        </g>
      </svg>`,
      play(el) {
        const g = el.querySelector('.fr'), END = 6200;
        dgAnim(el, END, e => {
          const R = e >= END ? [] : [0, 1, 2].map(k => (e - 200 - k * 450) * 0.11);
          g.innerHTML = fronts(R.filter(r => r < 2 * (WALL - CAR[0]) - 30));
          el.querySelector('.fr').setAttribute('opacity', e > 4800 ? Math.max(0, 1 - (e - 4800) / 600) : 1);
          op(el, '.lb', e > 4600 ? 1 : 0);
        });
      }
    },
  });
})();
