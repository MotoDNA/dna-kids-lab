/* 4학년 수학 · 시간에 따라 어떻게 변했을까? 꺾은선그래프 (m4-11) */
(() => {
  const C = DG_C, RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  const f1 = v => +v.toFixed(1);
  const seg = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  const wave = (x, y) => `<path d="M${x - 12} ${y + 4} q6 -10 12 0 t12 0 M${x - 12} ${y + 12} q6 -10 12 0 t12 0" fill="none" stroke="${C.ink}" stroke-width="2.5"/><rect x="${x - 4}" y="${y + 3}" width="8" height="10" fill="#fff"/>`;

  /* 기온 그래프 (0~25°C) */
  const TM = ['9시', '10시', '11시', '12시', '1시', '2시'], TV = [12, 15, 19, 22, 23, 21];
  const gx = i => 105 + i * 66, gy = v => f1(240 - 7.6 * v);
  const PTS = TV.map((v, i) => [gx(i), gy(v)]);
  const frame = `
    ${[0, 5, 10, 15, 20, 25].map(v => `<line x1="70" y1="${gy(v)}" x2="455" y2="${gy(v)}" stroke="${v ? '#e5e5ea' : C.ink}" stroke-width="${v ? 1.5 : 3}"/>${T(60, gy(v) + 6, v, { a: 'end', fs: 18, fw: 600, fill: C.sub })}`).join('')}
    <line x1="70" y1="40" x2="70" y2="240" stroke="${C.ink}" stroke-width="3"/>
    ${TM.map((t, i) => T(gx(i), 268, t, { fs: 18, fw: 600, fill: C.sub })).join('')}
    ${T(20, 26, '(°C)', { a: 'start', fs: 18, fw: 600, fill: C.sub })}`;
  const lines = (cls, col = C.d) => PTS.slice(1).map((p, i) => `<line class="${cls} ${cls}${i}" x1="${PTS[i][0]}" y1="${PTS[i][1]}" x2="${p[0]}" y2="${p[1]}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>`).join('');
  const dots = cls => PTS.map((p, i) => `<circle class="${cls} ${cls}${i}" cx="${p[0]}" cy="${p[1]}" r="6.5" fill="${C.d}" stroke="#fff" stroke-width="2"/>`).join('');

  /* 3: 키 */
  const HV = [140, 141, 143, 144];
  const L3 = HV.map((v, i) => [85 + i * 35, f1(240 - v * 1.2)]);
  const R3 = HV.map((v, i) => [345 + i * 35, f1(240 - (v - 139) * 34)]);
  const poly = (P, cls) => P.slice(1).map((p, i) => `<line class="${cls}${i}" x1="${P[i][0]}" y1="${P[i][1]}" x2="${p[0]}" y2="${p[1]}" stroke="${C.d}" stroke-width="4" stroke-linecap="round"/>`).join('')
    + P.map(p => `<circle class="${cls}d" cx="${p[0]}" cy="${p[1]}" r="6" fill="${C.d}" stroke="#fff" stroke-width="2"/>`).join('');

  /* 2: 확대 그래프 14~20°C */
  const zy = v => 250 - (v - 14) * 30, ZA = [110, zy(15)], ZB = [370, zy(19)], ZM = [240, zy(17)];

  /* 4 */
  const BV = [[110, '사과', 120], [160, '귤', 75], [210, '포도', 95]];
  const BP = [[300, 210], [345, 175], [390, 135], [435, 85]];

  const drawLines = (el, e, st, dur) => {
    PTS.slice(1).forEach((p, i) => {
      const f = dgEase(dgP(e, st + i * dur, dur * .85)), ln = el.querySelector('.ln' + i);
      const [x, y] = seg(PTS[i], p, f);
      ln.setAttribute('x2', x); ln.setAttribute('y2', y); ln.setAttribute('opacity', f > 0 ? 1 : 0);
    });
  };

  Object.assign(DIAG, {
    'm4-11:0': {
      alt: '가로에는 시각, 세로에는 기온을 나타낸 모눈에 시각별 기온 12, 15, 19, 22, 23, 21°C를 점으로 찍고 차례로 선분으로 이어 꺾은선그래프를 만드는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">${frame}${lines('ln')}${dots('pt')}</svg>`,
      play(el) {
        dgAnim(el, 6200, e => {
          TV.forEach((v, i) => op(el, '.pt' + i, e > 300 + i * 450 ? 1 : 0));
          drawLines(el, e, 3300, 520);
        });
      }
    },

    'm4-11:1': {
      alt: '시각별 기온 꺾은선그래프에서 오전 10시~11시 선분이 가장 가파르게 올라가 기온이 4°C 올랐고, 오후 1시~2시 선분은 내려가 2°C 낮아진 것을 강조한 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">${frame}${lines('ln', '#c7c7cc')}
        <line class="up" x1="${PTS[1][0]}" y1="${PTS[1][1]}" x2="${PTS[2][0]}" y2="${PTS[2][1]}" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>
        <line class="dn" x1="${PTS[4][0]}" y1="${PTS[4][1]}" x2="${PTS[5][0]}" y2="${PTS[5][1]}" stroke="${C.d}" stroke-width="6" stroke-linecap="round"/>
        ${dots('pt')}
        ${T(212, 140, '+4°C', { cls: 'up', a: 'start', fs: 22, fw: 800, fill: RED })}
        ${T(212, 166, '가장 가팔라요', { cls: 'up', a: 'start', fs: 18, fw: 700, fill: RED })}
        ${T(402, 112, '−2°C', { cls: 'dn', fs: 22, fw: 800, fill: C.d })}
      </svg>`,
      play(el) {
        dgAnim(el, 5000, e => {
          TV.forEach((v, i) => op(el, '.pt' + i, 1));
          drawLines(el, e, 0, 300);
          const f = dgEase(dgP(e, 2000, 700)), [x, y] = seg(PTS[1], PTS[2], f);
          const u = el.querySelector('line.up'); u.setAttribute('x2', x); u.setAttribute('y2', y);
          op(el, '.up', f > 0 ? 1 : 0); op(el, 'text.up', f >= 1 ? 1 : 0);
          const g = dgEase(dgP(e, 3500, 700)), [x2, y2] = seg(PTS[4], PTS[5], g);
          const d = el.querySelector('line.dn'); d.setAttribute('x2', x2); d.setAttribute('y2', y2);
          op(el, '.dn', g > 0 ? 1 : 0); op(el, 'text.dn', g >= 1 ? 1 : 0);
        });
      }
    },

    'm4-11:2': {
      alt: '오전 10시 15°C와 11시 19°C를 이은 선분의 가운데인 10시 30분 자리를 따라 올라가 읽으면 약 17°C로 어림할 수 있는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${[15, 16, 17, 18, 19, 20].map(v => `<line x1="80" y1="${zy(v)}" x2="420" y2="${zy(v)}" stroke="#e5e5ea" stroke-width="1.5"/>${T(68, zy(v) + 6, v, { a: 'end', fs: 18, fw: v === 17 ? 800 : 600, fill: v === 17 ? C.c : C.sub })}`).join('')}
        <line x1="80" y1="60" x2="80" y2="270" stroke="${C.ink}" stroke-width="3"/>
        <line x1="80" y1="270" x2="420" y2="270" stroke="${C.ink}" stroke-width="3"/>
        ${wave(80, 248)}${T(68, 276, '0', { a: 'end', fs: 18, fw: 600, fill: C.sub })}
        ${T(20, 44, '(°C)', { a: 'start', fs: 18, fw: 600, fill: C.sub })}
        ${T(ZA[0], 294, '10시', { fs: 18, fw: 700, fill: C.sub })}${T(ZB[0], 294, '11시', { fs: 18, fw: 700, fill: C.sub })}
        ${T(ZM[0], 294, '10시 30분', { cls: 'm1', fs: 18, fw: 800, fill: C.c })}
        <line class="zl" x1="${ZA[0]}" y1="${ZA[1]}" x2="${ZB[0]}" y2="${ZB[1]}" stroke="${C.d}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="${ZA[0]}" cy="${ZA[1]}" r="7" fill="${C.d}"/><circle cx="${ZB[0]}" cy="${ZB[1]}" r="7" fill="${C.d}"/>
        ${T(ZA[0], ZA[1] - 16, '15°C', { fs: 20, fw: 800, fill: C.d })}${T(ZB[0], ZB[1] - 16, '19°C', { fs: 20, fw: 800, fill: C.d })}
        <line class="vg" x1="${ZM[0]}" y1="270" x2="${ZM[0]}" y2="270" stroke="${C.c}" stroke-width="3" stroke-dasharray="6 5"/>
        <line class="hg" x1="${ZM[0]}" y1="${ZM[1]}" x2="${ZM[0]}" y2="${ZM[1]}" stroke="${C.c}" stroke-width="3" stroke-dasharray="6 5"/>
        <circle class="m2" cx="${ZM[0]}" cy="${ZM[1]}" r="7" fill="#fff" stroke="${C.c}" stroke-width="4"/>
        ${T(ZM[0] + 18, ZM[1] + 34, '약 17°C', { cls: 'm3', a: 'start', fs: 24, fw: 800, fill: C.c })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5400, e => {
          const a = dgEase(dgP(e, 200, 900)), [x, y] = seg(ZA, ZB, a);
          q('.zl').setAttribute('x2', x); q('.zl').setAttribute('y2', y);
          op(el, '.m1', e > 1400 ? 1 : 0);
          const v = dgEase(dgP(e, 1900, 900));
          q('.vg').setAttribute('y2', 270 + (ZM[1] - 270) * v); q('.vg').setAttribute('opacity', v > 0 ? 1 : 0);
          op(el, '.m2', v >= 1 ? 1 : 0);
          const h = dgEase(dgP(e, 3000, 900));
          q('.hg').setAttribute('x2', ZM[0] + (80 - ZM[0]) * h); q('.hg').setAttribute('opacity', h > 0 ? 1 : 0);
          op(el, '.m3', e > 4100 ? 1 : 0);
        });
      }
    },

    'm4-11:3': {
      alt: '키 140, 141, 143, 144cm를 0cm부터 그린 그래프는 선이 거의 평평하지만, 물결선을 넣고 139cm부터 눈금 한 칸을 1cm로 그리면 변화가 잘 보이는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 318" class="dg-svg" role="img">
        <g class="lp">
          ${[0, 50, 100, 150].map(v => `<line x1="62" y1="${240 - v * 1.2}" x2="210" y2="${240 - v * 1.2}" stroke="${v ? '#e5e5ea' : C.ink}" stroke-width="${v ? 1.5 : 3}"/>${T(54, 240 - v * 1.2 + 6, v, { a: 'end', fs: 18, fw: 600, fill: C.sub })}`).join('')}
          <line x1="62" y1="44" x2="62" y2="240" stroke="${C.ink}" stroke-width="3"/>
          ${T(12, 30, '(cm)', { a: 'start', fs: 18, fw: 600, fill: C.sub })}
          ${poly(L3, 'l')}
          ${T(130, 306, '변화가 안 보여요', { fs: 20, fw: 800, fill: C.sub })}
        </g>
        <g class="rp">
          ${[139, 140, 141, 142, 143, 144].map(v => `<line x1="322" y1="${240 - (v - 139) * 34}" x2="468" y2="${240 - (v - 139) * 34}" stroke="#e5e5ea" stroke-width="1.5"/>${T(308, 240 - (v - 139) * 34 + 6, v, { a: 'end', fs: 18, fw: 600, fill: C.sub })}`).join('')}
          <line x1="322" y1="44" x2="322" y2="274" stroke="${C.ink}" stroke-width="3"/>
          <line x1="322" y1="274" x2="468" y2="274" stroke="${C.ink}" stroke-width="3"/>
          ${T(308, 282, '0', { a: 'end', fs: 18, fw: 600, fill: C.sub })}
          <g class="wv">${wave(322, 248)}</g>
          ${poly(R3, 'r')}
          ${T(380, 310, '변화가 잘 보여요', { fs: 20, fw: 800, fill: C.d })}
        </g>
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        const draw = (P, cls, e, st) => {
          op(el, '.' + cls + 'd', e > st ? 1 : 0);
          P.slice(1).forEach((p, i) => {
            const f = dgEase(dgP(e, st + 300 + i * 400, 350)), [x, y] = seg(P[i], p, f), l = el.querySelector('.' + cls + i);
            l.setAttribute('x2', x); l.setAttribute('y2', y); l.setAttribute('opacity', f > 0 ? 1 : 0);
          });
        };
        dgAnim(el, 6000, e => {
          op(el, '.lp', e > 100 ? 1 : 0);
          draw(L3, 'l', e, 400);
          op(el, '.rp', e > 2400 ? 1 : 0);
          const w = dgEase(dgP(e, 2600, 600));
          qa('.wv').forEach(g => g.setAttribute('transform', `translate(322 256) scale(${0.3 + 0.7 * w + 0.4 * Math.sin(Math.PI * w)}) translate(-322 -256)`));
          draw(R3, 'r', e, 3400);
        });
      }
    },

    'm4-11:4': {
      alt: '좋아하는 과일별 학생 수처럼 항목끼리 비교할 때는 막대그래프, 날짜별 강낭콩 키처럼 시간에 따른 변화를 볼 때는 꺾은선그래프가 편리한 것을 나란히 비교한 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${T(150, 40, '막대그래프', { fs: 22, fw: 800, fill: C.c })}
        ${T(360, 40, '꺾은선그래프', { fs: 22, fw: 800, fill: C.d })}
        <path d="M80 60 V230 H240" fill="none" stroke="${C.ink}" stroke-width="3"/>
        ${BV.map(([x, t, h], i) => `<rect class="bar" data-h="${h}" x="${x - 18}" y="${230 - h}" width="36" height="${h}" rx="4" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>${T(x, 256, t, { fs: 18, fw: 700, fill: C.sub })}`).join('')}
        <path d="M280 60 V230 H460" fill="none" stroke="${C.ink}" stroke-width="3"/>
        ${T(370, 256, '날짜 →', { fs: 18, fw: 700, fill: C.sub })}
        ${BP.slice(1).map((p, i) => `<line class="bl${i}" x1="${BP[i][0]}" y1="${BP[i][1]}" x2="${p[0]}" y2="${p[1]}" stroke="${C.d}" stroke-width="4" stroke-linecap="round"/>`).join('')}
        ${BP.map((p, i) => `<circle class="bd${i}" cx="${p[0]}" cy="${p[1]}" r="6" fill="${C.d}" stroke="#fff" stroke-width="2"/>`).join('')}
        ${T(150, 294, '항목끼리 비교', { cls: 'cap1', fs: 20, fw: 800 })}
        ${T(360, 294, '시간에 따른 변화', { cls: 'cap2', fs: 20, fw: 800 })}
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5600, e => {
          qa('.bar').forEach((b, i) => {
            const h = +b.dataset.h * dgEase(dgP(e, 200 + i * 300, 700));
            b.setAttribute('y', 230 - h); b.setAttribute('height', h);
          });
          op(el, '.cap1', e > 1700 ? 1 : 0);
          BP.forEach((p, i) => op(el, '.bd' + i, e > 2300 + i * 350 ? 1 : 0));
          BP.slice(1).forEach((p, i) => {
            const f = dgEase(dgP(e, 3800 + i * 350, 320)), [x, y] = seg(BP[i], p, f), l = el.querySelector('.bl' + i);
            l.setAttribute('x2', x); l.setAttribute('y2', y); l.setAttribute('opacity', f > 0 ? 1 : 0);
          });
          op(el, '.cap2', e > 5000 ? 1 : 0);
        });
      }
    },
  });
})();
