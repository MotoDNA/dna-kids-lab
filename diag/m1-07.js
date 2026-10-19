/* 1학년 수학 · 시계 바늘이 알려 주는 시각은? (m1-07) */
(() => {
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const R = Math.PI / 180;
  const pt = (cx, cy, r, deg) => [+(cx + r * Math.sin(deg * R)).toFixed(2), +(cy - r * Math.cos(deg * R)).toFixed(2)]; // 12시 방향 0°, 시계 방향
  const face = (cx, cy, r, pre = '') => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${DG_C.ink}" stroke-width="5"/>`;
    for (let k = 0; k < 60; k++) {
      const [x0, y0] = pt(cx, cy, r - (k % 5 ? 6 : 11), k * 6), [x1, y1] = pt(cx, cy, r - 2, k * 6);
      s += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${k % 5 ? '#c7c7cc' : DG_C.ink}" stroke-width="${k % 5 ? 1.5 : 3}"/>`;
    }
    for (let h = 1; h <= 12; h++) { const [x, y] = pt(cx, cy, r - 27, h * 30); s += `<text class="${pre}h${h}" x="${x}" y="${y + 7}" text-anchor="middle" fill="${DG_C.ink}" font-size="${r > 95 ? 20 : 18}" font-weight="700">${h}</text>`; }
    return s;
  };
  const hands = (cx, cy, r, pre = '') => `
    <line class="${pre}hh" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.45}" stroke="${DG_C.c}" stroke-width="9" stroke-linecap="round"/>
    <line class="${pre}mh" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.64}" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="7" fill="${DG_C.ink}"/>`;
  const setHand = (el, sel, cx, cy, deg) => el.querySelector(sel).setAttribute('transform', `rotate(${deg} ${cx} ${cy})`);
  const sector = (cx, cy, r, a1) => {
    if (a1 < 0.5) return '';
    if (a1 >= 359.9) return `M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
    const [x, y] = pt(cx, cy, r, a1);
    return `M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 ${a1 > 180 ? 1 : 0} 1 ${x} ${y} Z`;
  };
  const show = (el, s, on) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', on ? 1 : 0));

  Object.assign(DIAG, {
    'm1-07:0': {
      alt: '시계의 짧은바늘(주황)은 시를, 긴바늘(파랑)은 분을 알려 주고, 짧은바늘이 3, 긴바늘이 12를 가리키면 3시인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${face(150, 145, 120)}${hands(150, 145, 120)}
        <g class="l0"><line x1="300" y1="92" x2="330" y2="92" stroke="${DG_C.c}" stroke-width="9" stroke-linecap="round"/>${T(344, 99, '짧은바늘 → 시', { a: 'start', s: 20, w: 800, f: DG_C.c })}</g>
        <g class="l1"><line x1="300" y1="146" x2="330" y2="146" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="round"/>${T(344, 153, '긴바늘 → 분', { a: 'start', s: 20, w: 800, f: DG_C.d })}</g>
        <g class="l2"><rect x="306" y="190" width="120" height="58" rx="16" fill="${DG_C.b}"/>${T(366, 230, '3시', { s: 30, w: 800 })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 4800, e => {
          const h = dgEase(dgP(e, 400, 1200));
          setHand(el, '.hh', 150, 145, 90 * h);
          show(el, '.hh', e > 300); show(el, '.l0', e > 900);
          setHand(el, '.mh', 150, 145, 0);
          show(el, '.mh', e > 2000); show(el, '.l1', e > 2200);
          show(el, '.l2', e > 3400);
        });
      }
    },

    'm1-07:1': {
      alt: '7시는 짧은바늘이 7, 긴바늘이 12를 가리키고, 6시 30분은 긴바늘이 6을 가리키며 짧은바늘이 6과 7 사이에 있는 두 시계 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${face(120, 140, 94, 'a')}${hands(120, 140, 94, 'a')}
        ${face(360, 140, 94, 'b')}${hands(360, 140, 94, 'b')}
        <g class="t0">${T(120, 272, '7시', { s: 26, w: 800 })}${T(120, 304, '긴바늘 12', { s: 18, f: DG_C.d })}</g>
        <g class="t1">${T(360, 272, '6시 30분', { s: 26, w: 800 })}${T(360, 304, '긴바늘 6 · 짧은바늘 6과 7 사이', { s: 18, f: DG_C.sub })}</g>
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          const a = dgEase(dgP(e, 200, 900));
          setHand(el, '.ahh', 120, 140, 210 * a); setHand(el, '.amh', 120, 140, 0);
          show(el, '.t0', e > 1200);
          // 6시 → 6시 30분: 긴바늘 반 바퀴, 짧은바늘 6에서 6과 7 사이로
          const b = dgEase(dgP(e, 1800, 2400));
          setHand(el, '.bmh', 360, 140, 180 * b); setHand(el, '.bhh', 360, 140, 180 + 15 * b);
          show(el, '.t1', e > 4300);
        });
      }
    },

    'm1-07:2': {
      alt: '시계 숫자 바깥에 5, 10, 15, 20…을 적고, 긴바늘이 4를 가리키면 5씩 뛰어 세어 20분, 짧은바늘이 2와 3 사이에 있어 2시, 그래서 2시 20분인 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path class="sw" fill="${DG_C.b}" fill-opacity=".45"/>
        ${face(160, 152, 104)}
        ${Array.from({ length: 12 }, (_, i) => { const k = i + 1, [x, y] = pt(160, 152, 128, k * 30); return `<text class="m${k}" x="${x}" y="${y + 6}" text-anchor="middle" fill="#c7c7cc" font-size="18" font-weight="800">${k * 5}</text>`; }).join('')}
        ${hands(160, 152, 104)}
        <g class="s0">${T(312, 92, '짧은바늘', { a: 'start', s: 18, f: DG_C.c })}${T(312, 120, '2와 3 사이 → 2시', { a: 'start', s: 20, w: 800, f: DG_C.c })}</g>
        <g class="s1">${T(312, 162, '긴바늘', { a: 'start', s: 18, f: DG_C.d })}${T(312, 190, '4 → 20분', { a: 'start', s: 20, w: 800, f: DG_C.d })}</g>
        <g class="s2"><rect x="306" y="214" width="150" height="54" rx="16" fill="${DG_C.b}"/>${T(381, 250, '2시 20분', { s: 26, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          setHand(el, '.hh', 160, 152, 70);
          show(el, '.hh', e > 200); show(el, '.s0', e > 700);
          const m = dgP(e, 1700, 3000), a = 120 * m;
          setHand(el, '.mh', 160, 152, a);
          q('.sw').setAttribute('d', sector(160, 152, 104, a));
          for (let k = 1; k <= 12; k++) {
            const on = k <= 4 && a >= k * 30 - 0.5;
            q('.m' + k).setAttribute('fill', on ? DG_C.d : '#c7c7cc');
            q('.m' + k).setAttribute('font-size', on ? 22 : 18);
          }
          show(el, '.s1', e > 4800); show(el, '.s2', e > 5600);
        });
      }
    },

    'm1-07:3': {
      alt: '8시에서 긴바늘이 한 바퀴 돌면 60분이 지나 9시가 되고, 짧은바늘은 8에서 9로 한 칸 움직여 60분이 1시간인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <path class="sw" fill="${DG_C.b}" fill-opacity=".45"/>
        ${face(150, 145, 120)}${hands(150, 145, 120)}
        <text class="clk" x="380" y="70" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="800">8시</text>
        <text class="mn" x="380" y="134" text-anchor="middle" fill="${DG_C.d}" font-size="24" font-weight="800">0분</text>
        <g class="res"><rect x="300" y="186" width="164" height="78" rx="16" fill="${DG_C.a}"/>${T(382, 220, '60분', { s: 24, w: 800, f: DG_C.c })}${T(382, 252, '= 1시간', { s: 24, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          const m = dgP(e, 600, 4400), a = 360 * m;
          setHand(el, '.mh', 150, 145, a); setHand(el, '.hh', 150, 145, 240 + 30 * m);
          q('.sw').setAttribute('d', sector(150, 145, 120, a));
          q('.clk').textContent = m >= 1 ? '8시 → 9시' : '8시';
          q('.mn').textContent = m >= 1 ? '긴바늘 한 바퀴' : `${Math.floor(60 * m)}분 지남`;
          show(el, '.res', e > 5300);
        });
      }
    },
  });
})();
