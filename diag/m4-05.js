/* 4학년 수학 · 막대그래프로 한눈에 비교해 볼까? (m4-05) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.c ? ` class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 22}" font-weight="${o.w || 800}">${s}</text>`;
  const D = [['사과', 8], ['귤', 5], ['포도', 7], ['딸기', 10]];
  const OX = 66, OY = 252, UH = 17, BW = 52;
  const bx = i => 116 + i * 82;          // 막대 가운데
  const by = v => OY - v * UH;
  // 축 + 눈금 (step: 눈금 글자 간격, grid: 1칸 단위 가로줄)
  const axes = (lab = 2, cls = '') => {
    let g = '';
    for (let v = 1; v <= 10; v++) g += `<line x1="${OX}" y1="${by(v)}" x2="${OX + 340}" y2="${by(v)}" stroke="#e5e5ea" stroke-width="1.5"/>`;
    for (let v = 0; v <= 10; v += lab) g += T(OX - 12, by(v) + 6, v, { s: 18, f: C.sub, w: 700, a: 'end' });
    return `<g class="${cls}">${g}<path d="M${OX} ${by(10) - 16} V${OY} H${OX + 346}" fill="none" stroke="${C.ink}" stroke-width="3"/>${T(OX - 10, by(10) - 24, '(명)', { s: 18, f: C.sub, w: 700, a: 'start' })}</g>`;
  };
  const names = () => D.map(([n], i) => T(bx(i), OY + 28, n, { s: 20 })).join('');
  const bars = (cls, col = C.b, st = C.d) => D.map(([, v], i) => `<rect class="${cls} ${cls}${i}" x="${bx(i) - BW / 2}" y="${by(v)}" width="${BW}" height="${v * UH}" fill="${col}" stroke="${st}" stroke-width="2.5"/>`).join('');
  const grow = (q, cls, i, f) => { const v = D[i][1] * f; q('.' + cls + i).setAttribute('y', by(v)); q('.' + cls + i).setAttribute('height', v * UH); };

  /* 4: 등교 방법 */
  const W = [['걷기', 12], ['자전거', 4], ['버스', 6], ['자동차', 3]];
  const HX = 214, HU = 18, ry = i => 76 + i * 46;

  Object.assign(DIAG, {
    'm4-05:0': {
      alt: '좋아하는 과일 조사(사과 8명, 귤 5명, 포도 7명, 딸기 10명)를 막대그래프로 나타내면 막대가 가장 긴 딸기를 가장 많은 친구가 좋아한다는 것을 한눈에 알 수 있는 그림',
      svg: `<svg viewBox="0 0 480 294" class="dg-svg" role="img">
        ${axes(2)}${bars('b')}
        ${D.map(([, v], i) => T(bx(i), by(v) - 8, v, { s: 20, f: C.d, c: 'v' + i })).join('')}
        ${names()}
        <g class="top"><rect x="${bx(3) - BW / 2 - 6}" y="${by(10) - 34}" width="${BW + 12}" height="${10 * UH + 70}" rx="12" fill="none" stroke="${C.c}" stroke-width="3.5"/></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          D.forEach((d, i) => {
            const f = dgEase(dgP(e, 300 + i * 700, 900));
            grow(q, 'b', i, f);
            q('.v' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
          });
          q('.top').setAttribute('opacity', dgP(e, 3900, 500));
        });
      }
    },

    'm4-05:1': {
      alt: '세로 눈금 5칸이 10명을 나타내면 한 칸은 10÷5=2명이고, 막대가 4칸이면 2×4=8명이라고 읽는 눈금 확대 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[0, 1, 2, 3, 4, 5].map(k => `<line x1="96" y1="${250 - k * 40}" x2="250" y2="${250 - k * 40}" stroke="#e5e5ea" stroke-width="2"/>${T(84, 256 - k * 40, k * 2, { s: 20, f: C.sub, w: 700, a: 'end' })}`).join('')}
        <path d="M96 34 V250 H256" fill="none" stroke="${C.ink}" stroke-width="3.5"/>
        <g class="br"><path d="M58 250 h-8 V50 h8" fill="none" stroke="${C.c}" stroke-width="3"/>${T(40, 156, '5칸', { s: 18, f: C.c, a: 'end' })}</g>
        ${[0, 1, 2, 3].map(k => `<g class="c c${k}"><rect x="140" y="${212 - k * 40}" width="70" height="38" fill="${C.b}" stroke="${C.d}" stroke-width="2.5"/>${T(175, 238 - k * 40, `${k + 1}칸`, { s: 18, f: C.d })}</g>`).join('')}
        <g class="t1">${T(272, 70, '5칸 = 10명', { s: 22, f: C.c, a: 'start' })}</g>
        <g class="t2">${T(272, 120, '1칸 = 10 ÷ 5', { s: 22, f: C.ink, a: 'start' })}${T(358, 152, '= 2(명)', { s: 22, f: C.ink, a: 'start' })}</g>
        <g class="t3"><rect x="264" y="186" width="196" height="46" rx="23" fill="${C.b}" fill-opacity=".6"/>${T(362, 217, '4칸 → 8명', { s: 22, f: C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.br').setAttribute('opacity', dgP(e, 300, 400));
          q('.t1').setAttribute('opacity', dgP(e, 800, 400));
          q('.t2').setAttribute('opacity', dgP(e, 1800, 400));
          [0, 1, 2, 3].forEach(k => q('.c' + k).setAttribute('opacity', dgP(e, 2900 + k * 450, 300)));
          q('.t3').setAttribute('opacity', dgP(e, 4900, 500));
        });
      }
    },

    'm4-05:2': {
      alt: '막대그래프 그리는 순서: 가로(과일)와 세로(학생 수)를 정하고, 한 칸을 1명으로 하여 10칸 눈금을 그리고, 사과 8칸·귤 5칸·포도 7칸·딸기 10칸 막대를 같은 폭으로 그린 뒤 제목을 붙이는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <g class="ttl">${T(200, 30, '좋아하는 과일별 학생 수', { s: 20, f: C.ink })}</g>
        <g class="ax"><path d="M${OX} ${by(10) - 16} V${OY} H${OX + 346}" fill="none" stroke="${C.ink}" stroke-width="3"/>${names()}</g>
        <g class="tk">${Array.from({ length: 10 }, (_, k) => `<line x1="${OX}" y1="${by(k + 1)}" x2="${OX + 340}" y2="${by(k + 1)}" stroke="#e5e5ea" stroke-width="1.5"/>`).join('')}
          ${[0, 2, 4, 6, 8, 10].map(v => T(OX - 12, by(v) + 6, v, { s: 18, f: C.sub, w: 700, a: 'end' })).join('')}</g>
        ${bars('d', C.a, C.c)}
        ${['가로·세로', '눈금', '막대', '제목'].map((s, i) => `<g class="st st${i}"><rect x="${10 + i * 116}" y="292" width="108" height="32" rx="16" fill="#fff" stroke="${C.d}" stroke-width="2"/>${T(64 + i * 116, 315, `${i + 1}. ${s}`, { s: 18, f: C.d })}</g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          const S = [300, 1400, 2600, 5800];
          S.forEach((t, i) => q('.st' + i).setAttribute('opacity', e >= t ? 1 : 0.25));
          q('.ax').setAttribute('opacity', dgP(e, 400, 500));
          q('.tk').setAttribute('opacity', dgP(e, 1500, 600));
          D.forEach((d, i) => grow(q, 'd', i, dgEase(dgP(e, 2700 + i * 700, 700))));
          q('.ttl').setAttribute('opacity', dgP(e, 5900, 500));
        });
      }
    },

    'm4-05:3': {
      alt: '막대그래프에서 가장 긴 딸기(10명)와 가장 짧은 귤(5명)을 찾고, 두 막대의 차이가 10−5=5(명)이며, 많은 순서가 딸기, 사과, 포도, 귤인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${axes(2)}${bars('b')}
        ${names()}
        <g class="rk">${[2, 4, 3, 1].map((r, i) => `<circle cx="${bx(i)}" cy="${by(D[i][1]) - 20}" r="14" fill="${r === 1 ? C.c : r === 4 ? C.d : '#fff'}" stroke="${r === 1 ? C.c : C.d}" stroke-width="2.5"/>${T(bx(i), by(D[i][1]) - 13, r, { s: 18, f: r === 1 || r === 4 ? '#fff' : C.d })}`).join('')}</g>
        <g class="df">
          <line x1="${bx(1)}" y1="${by(5)}" x2="${bx(3) + BW / 2 + 14}" y2="${by(5)}" stroke="${C.c}" stroke-width="2.5" stroke-dasharray="6 5"/>
          <path d="M${bx(3) + BW / 2 + 8} ${by(10)} h8 V${by(5)} h-8" fill="none" stroke="${C.c}" stroke-width="3"/>
          ${T(bx(3) + BW / 2 + 22, by(7.5) + 8, '5명', { s: 22, f: C.c, a: 'start' })}
        </g>
        <g class="eq">${T(240, 312, '10 − 5 = 5(명)', { s: 20, f: C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.rk').setAttribute('opacity', dgP(e, 600, 500));
          q('.df').setAttribute('opacity', dgP(e, 2000, 600));
          q('.eq').setAttribute('opacity', dgP(e, 3300, 500));
        });
      }
    },

    'm4-05:4': {
      alt: '등교 방법을 조사한 표(걷기 12명, 자전거 4명, 버스 6명, 자동차 3명, 합계 25명)를 가로 막대그래프로 나타내면 걸어서 오는 친구가 가장 많다는 것을 알 수 있는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <rect x="16" y="46" width="170" height="232" rx="12" fill="#f5f5f7"/>
        ${T(70, 34, '표', { s: 18, f: C.sub, w: 700 })}${T(HX, 34, '막대그래프', { s: 18, f: C.sub, w: 700, a: 'start' })}
        ${W.map(([n, v], i) => `<g class="r r${i}">${T(30, ry(i) + 7, n, { s: 20, a: 'start' })}${T(168, ry(i) + 7, v, { s: 20, f: C.d, a: 'end' })}</g>`).join('')}
        <line x1="26" y1="${ry(3) + 24}" x2="176" y2="${ry(3) + 24}" stroke="#d2d2d7" stroke-width="2"/>
        <g class="sum">${T(30, ry(4) + 7, '합계', { s: 20, a: 'start' })}${T(168, ry(4) + 7, '25', { s: 20, f: C.r, a: 'end' })}</g>
        <line x1="${HX}" y1="52" x2="${HX}" y2="${ry(3) + 26}" stroke="${C.ink}" stroke-width="3"/>
        ${W.map(([, v], i) => `<rect class="h h${i}" x="${HX}" y="${ry(i) - 15}" width="${v * HU}" height="30" fill="${i === 0 ? C.a : C.b}" stroke="${i === 0 ? C.c : C.d}" stroke-width="2.5"/>`).join('')}
        <g class="best">${T(HX + 12 * HU - 10, ry(0) + 7, '가장 많아요', { s: 18, f: C.c, a: 'end' })}</g>
        <g class="ok"><path d="M${HX + 10} ${ry(4) - 2} l8 8 l16 -18" fill="none" stroke="${C.r}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${T(HX + 44, ry(4) + 7, '조사한 25명과 같아요', { s: 18, f: C.r, w: 700, a: 'start' })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          W.forEach(([, v], i) => {
            q('.r' + i).setAttribute('opacity', dgP(e, 200 + i * 400, 300));
            const f = dgEase(dgP(e, 2600 + i * 500, 700));
            q('.h' + i).setAttribute('width', v * HU * f);
          });
          q('.sum').setAttribute('opacity', dgP(e, 1900, 400));
          q('.best').setAttribute('opacity', dgP(e, 4800, 400));
          q('.ok').setAttribute('opacity', dgP(e, 5500, 400));
        });
      }
    },
  });
})();
