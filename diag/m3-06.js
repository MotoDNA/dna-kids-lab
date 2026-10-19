/* 3학년 수학 · mm, km, 초는 언제 쓸까? (m3-06) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const R = Math.PI / 180;

  /* 0: 확대한 자 0~4cm (1cm = 100) */
  const RX = 40, RY = 76;
  let ticks = '';
  for (let m = 0; m <= 40; m++) {
    const len = m % 10 === 0 ? 34 : m % 5 === 0 ? 24 : 15;
    ticks += `<line class="${m > 0 && m <= 10 ? 'tk tk' + m : ''}" x1="${RX + m * 10}" y1="${RY}" x2="${RX + m * 10}" y2="${RY + len}" stroke="${C.ink}" stroke-width="${m % 10 ? 2 : 3}"/>`;
  }

  /* 1: 2km 300m */
  const KS = 400 / 2300, K0 = 50;
  const kx = m => K0 + m * KS;

  /* 2: 시계 */
  const CX = 140, CY = 160, CR = 112;
  let cticks = '';
  for (let i = 0; i < 60; i++) {
    const a = i * 6 * R, r0 = i % 5 ? CR - 10 : CR - 18;
    cticks += `<line x1="${(CX + r0 * Math.sin(a)).toFixed(1)}" y1="${(CY - r0 * Math.cos(a)).toFixed(1)}" x2="${(CX + CR * Math.sin(a)).toFixed(1)}" y2="${(CY - CR * Math.cos(a)).toFixed(1)}" stroke="${C.ink}" stroke-width="${i % 5 ? 1.5 : 3}"/>`;
  }
  const cnum = [12, 3, 6, 9].map((n, i) => { const a = i * 90 * R; return T((CX + (CR - 36) * Math.sin(a)).toFixed(1), (CY - (CR - 36) * Math.cos(a) + 8).toFixed(1), n, { s: 22, f: C.ink }); }).join('');
  const sweep = d => {
    if (d <= 0.01) return '';
    if (d >= 359.9) return `M${CX} ${CY - CR + 2} A${CR - 2} ${CR - 2} 0 1 1 ${CX - 0.01} ${CY - CR + 2} Z`;
    const x = CX + (CR - 2) * Math.sin(d * R), y = CY - (CR - 2) * Math.cos(d * R);
    return `M${CX} ${CY} L${CX} ${CY - CR + 2} A${CR - 2} ${CR - 2} 0 ${d > 180 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)} Z`;
  };

  /* 3: 시간 세로셈 두 개 */
  const cross = (x, y, w) => `<line x1="${x - w}" y1="${y + 2}" x2="${x + w}" y2="${y - 26}" stroke="${C.c}" stroke-width="3.5" stroke-linecap="round"/>`;

  Object.assign(DIAG, {
    'm3-06:0': {
      alt: '크게 확대한 자에서 1cm 사이의 작은 눈금 10칸이 각각 1mm여서 1cm=10mm이고, 3cm 5mm는 35mm와 같다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <rect class="hi" x="${RX}" y="${RY}" width="100" height="80" fill="${C.b}" opacity=".6"/>
        <rect x="${RX - 20}" y="${RY}" width="440" height="80" rx="8" fill="none" stroke="${C.sub}" stroke-width="2.5"/>
        ${ticks}
        ${[0, 1, 2, 3, 4].map(n => T(RX + n * 100, RY + 64, n, { s: 20, f: C.ink })).join('')}
        <g class="br"><path d="M${RX} 56 v-8 h100 v8" fill="none" stroke="${C.d}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(RX + 112, 44, '1cm = 10mm', { s: 22, f: C.d, a: 'start' })}</g>
        ${T(RX + 50, RY + 112, '', { c: 'cnt', s: 22, f: C.d })}
        <rect class="bar" x="${RX}" y="196" width="0" height="20" rx="4" fill="${C.c}"/>
        <g class="bl">${T(RX + 175, 256, '3cm 5mm = 35mm', { s: 24, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6200, e => {
          let n = 0;
          for (let m = 1; m <= 10; m++) {
            const on = e < 400 + m * 260 || e >= 3300;
            if (e >= 400 + m * 260) n = m;
            q('.tk' + m).setAttribute('stroke', on ? C.ink : C.d);
            q('.tk' + m).setAttribute('stroke-width', on ? (m === 10 ? 3 : 2) : 3.5);
          }
          q('.cnt').textContent = e >= 400 + 260 && e < 3300 ? n + '칸' : '';
          q('.hi').setAttribute('opacity', e >= 400 && e < 3300 ? 0.6 : 0);
          q('.br').setAttribute('opacity', dgP(e, 3000, 400));
          const b = dgEase(dgP(e, 3800, 1400));
          q('.bar').setAttribute('width', 350 * b);
          q('.bl').setAttribute('opacity', dgP(e, 5200, 500));
        });
      }
    },

    'm3-06:1': {
      alt: '집에서 출발해 1km, 1km, 300m를 이어 가면 2km 300m이고, 이는 1000m+1000m+300m=2300m와 같다는 것을 보여 주는 길 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        <path d="M${K0 - 26} 108 l16 -16 l16 16 v20 h-32 Z" fill="${C.a}" stroke="${C.c}" stroke-width="3" stroke-linejoin="round"/>
        <line x1="${K0}" y1="128" x2="${kx(2300)}" y2="128" stroke="#e5e5ea" stroke-width="14" stroke-linecap="round"/>
        ${[[0, 1000, C.d], [1000, 2000, C.r], [2000, 2300, C.c]].map(([a, b, col], i) => `<g class="sg${i}">
          <line class="ln${i}" x1="${kx(a)}" y1="128" x2="${kx(b)}" y2="128" stroke="${col}" stroke-width="14"/>
          <g class="lb${i}">${T((kx(a) + kx(b)) / 2, 100, i < 2 ? '1km' : '300m', { s: 22, f: col })}
          ${T((kx(a) + kx(b)) / 2, 166, i < 2 ? '1000m' : '300m', { s: 18, f: C.sub, w: 700 })}</g>
          <line x1="${kx(b)}" y1="116" x2="${kx(b)}" y2="140" stroke="#fff" stroke-width="3"/></g>`).join('')}
        
        <g class="tot">${T(240, 222, '2km 300m = 2300m', { s: 26, f: C.ink })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const seg = [[0, 1000], [1000, 2000], [2000, 2300]];
        dgAnim(el, 5200, e => {
          seg.forEach(([a, b], i) => {
            const f = dgEase(dgP(e, 400 + i * 1200, 900));
            q('.ln' + i).setAttribute('x2', kx(a) + (kx(b) - kx(a)) * f);
            q('.sg' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            q('.lb' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
          });
          q('.tot').setAttribute('opacity', dgP(e, 4000, 500));
        });
      }
    },

    'm3-06:2': {
      alt: '초바늘이 작은 눈금 한 칸을 가면 1초이고, 시계를 한 바퀴 돌면 60초로 1분이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <circle cx="${CX}" cy="${CY}" r="${CR}" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
        <path class="sw" fill="${C.a}" opacity=".7" d=""/>
        ${cticks}${cnum}
        <line class="hand" x1="${CX}" y1="${CY + 16}" x2="${CX}" y2="${CY - CR + 12}" stroke="${C.c}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="${CX}" cy="${CY}" r="7" fill="${C.c}"/>
        ${T(296, 120, '', { c: 'sec', s: 40, f: C.c, a: 'start' })}
        <g class="t1">${T(290, 110, '한 칸 = 1초', { s: 22, f: C.ink, a: 'start' })}</g>
        <g class="t2">${T(290, 170, '한 바퀴 = 60초', { s: 22, f: C.c, a: 'start' })}
          <rect x="290" y="196" width="150" height="48" rx="24" fill="${C.b}" fill-opacity=".6"/>${T(365, 228, '60초 = 1분', { s: 22, f: C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          // 처음엔 한 칸씩 똑딱 (1초씩), 그다음 빠르게 한 바퀴
          let d;
          if (e < 2400) d = Math.min(3, Math.floor(e / 600)) * 6;
          else d = 18 + 342 * dgEase(dgP(e, 2400, 3000));
          q('.hand').setAttribute('transform', `rotate(${d} ${CX} ${CY})`);
          q('.sw').setAttribute('d', sweep(d));
          const s = Math.round(d / 6);
          q('.sec').textContent = e > 600 && e < 5600 ? s + '초' : '';
          q('.t1').setAttribute('opacity', e >= 5600 ? 1 : 0);
          q('.t2').setAttribute('opacity', dgP(e, 5900, 500));
        });
      }
    },

    'm3-06:3': {
      alt: '1시간 40분+35분은 분끼리 더한 75분 중 60분을 1시간으로 올려 2시간 15분, 4시 20분−1시 45분은 1시간을 60분으로 내려 3시 80분으로 보고 빼서 2시간 35분이 되는 세로셈 그림',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img"><g transform="translate(0,16)">
        <line x1="240" y1="20" x2="240" y2="280" stroke="#e5e5ea" stroke-width="2"/>
        ${T(92, 46, '시간', { s: 18, f: C.sub, w: 700 })}${T(172, 46, '분', { s: 18, f: C.sub, w: 700 })}
        <g class="ca"><circle cx="92" cy="80" r="15" fill="#fff" stroke="${C.c}" stroke-width="3"/>${T(92, 88, '1', { s: 20, f: C.c })}</g>
        ${T(92, 128, '1', { s: 30 })}${T(172, 128, '40', { s: 30 })}
        ${T(34, 174, '+', { s: 30 })}${T(172, 174, '35', { s: 30 })}
        <line x1="22" y1="190" x2="212" y2="190" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        ${T(172, 232, '75', { s: 30, f: C.c, c: 'a75' })}
        <g class="ar">${T(92, 232, '2', { s: 30, f: C.d })}${T(172, 232, '15', { s: 30, f: C.d })}</g>
        <g class="an">${T(120, 278, '75분 = 1시간 15분', { s: 18, f: C.c, w: 700 })}</g>

        ${T(330, 46, '시', { s: 18, f: C.sub, w: 700 })}${T(415, 46, '분', { s: 18, f: C.sub, w: 700 })}
        <g class="bb">${T(330, 92, '3', { s: 24, f: C.c })}${T(415, 92, '80', { s: 24, f: C.c })}${cross(330, 128, 12)}${cross(415, 128, 22)}</g>
        ${T(330, 128, '4', { s: 30 })}${T(415, 128, '20', { s: 30 })}
        ${T(268, 174, '−', { s: 30 })}${T(330, 174, '1', { s: 30 })}${T(415, 174, '45', { s: 30 })}
        <line x1="256" y1="190" x2="458" y2="190" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        <g class="br">${T(330, 232, '2', { s: 30, f: C.d })}${T(415, 232, '35', { s: 30, f: C.d })}</g>
        <g class="bn">${T(360, 278, '1시간 = 60분', { s: 18, f: C.c, w: 700 })}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          const op = (c, v) => q(c).setAttribute('opacity', v);
          op('.a75', e >= 600 && e < 2200 ? dgP(e, 600, 400) : 0);
          op('.an', dgP(e, 1300, 400));
          const m = dgEase(dgP(e, 1800, 700));
          q('.ca').setAttribute('transform', `translate(${80 * (1 - m)},${152 * (1 - m)})`);
          op('.ca', e >= 1800 ? 1 : 0);
          op('.ar', dgP(e, 2600, 400));
          op('.bn', dgP(e, 3800, 400));
          op('.bb', dgP(e, 4300, 500));
          op('.br', dgP(e, 5400, 500));
        });
      }
    },
  });
})();
