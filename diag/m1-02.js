/* 1학년 수학 · 상자, 공, 세모, 네모! 어떤 모양일까? (m1-02) */
(() => {
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const FL = `fill="${DG_C.b}" stroke="${DG_C.d}"`, CU = `fill="${DG_C.a}" stroke="${DG_C.c}"`;
  const SW = 'stroke-width="3.5" stroke-linejoin="round"';
  // 상자(정육면체 느낌), 가운데 (x,y), 크기 s
  const box = (x, y, s, cls = '') => {
    const d = s * 0.42, h = s / 2;
    return `<g class="${cls}"><path class="fl" d="M${x - h} ${y - h + d / 2} h${s} v${s} h${-s} Z" ${FL} ${SW}/>
      <path class="fl" d="M${x - h} ${y - h + d / 2} l${d} ${-d} h${s} l${-d} ${d} Z" ${FL} ${SW}/>
      <path class="fl" d="M${x + h} ${y - h + d / 2} l${d} ${-d} v${s} l${-d} ${d} Z" ${FL} ${SW}/></g>`;
  };
  // 세운 둥근기둥, 가운데 x, 윗면 y, 반지름 rx, 높이 h
  const cyl = (x, y, rx, h, cls = '') => {
    const ry = rx * 0.3;
    return `<g class="${cls}"><path class="cu" d="M${x - rx} ${y} v${h} A${rx} ${ry} 0 0 0 ${x + rx} ${y + h} v${-h} Z" ${CU} ${SW}/>
      <ellipse class="fl" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${FL} ${SW}/></g>`;
  };
  const ball = (x, y, r, cls = '') => `<g class="${cls}"><circle class="cu" cx="${x}" cy="${y}" r="${r}" ${CU} ${SW}/>
    <path class="sp" d="M${x - r} ${y} A${r} ${r * 0.32} 0 0 0 ${x + r} ${y}" fill="none" stroke="${DG_C.c}" stroke-width="2.5" stroke-dasharray="5 5"/></g>`;
  // 누운 둥근기둥 (옆에서 본 모습), 가운데 (x,y)
  const lyingCyl = (x, y, r, len) => `<g><path d="M${x - len / 2} ${y - r} h${len} v${2 * r} h${-len} Z" ${CU} ${SW}/>
    <ellipse cx="${x + len / 2}" cy="${y}" rx="${r * 0.3}" ry="${r}" ${FL} ${SW}/></g>`;
  // 삼각기둥(앞면 삼각형)
  const prism = (x, y, cls = '') => {
    const A = [x - 40, y + 32], B = [x + 30, y + 32], C = [x - 5, y - 30], dx = 24, dy = -18;
    return `<g class="${cls}"><path d="M${B} L${B[0] + dx} ${B[1] + dy} L${C[0] + dx} ${C[1] + dy} L${C} Z" ${FL} ${SW}/>
      <path d="M${A} L${B} L${C} Z" ${FL} ${SW}/></g>`;
  };
  const ON = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));

  /* 3: 삼각형과 사각형 */
  const TRI = [[60, 196], [200, 196], [130, 70]];
  const SQ = [[290, 70], [420, 70], [420, 196], [290, 196]];
  const sides = (P, cls) => P.map((p, i) => { const q = P[(i + 1) % P.length]; return `<line class="${cls}${i}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${DG_C.d}" stroke-width="7" stroke-linecap="round"/>`; }).join('');
  const verts = (P, cls) => P.map((p, i) => `<circle class="${cls}${i}" cx="${p[0]}" cy="${p[1]}" r="10" fill="${DG_C.c}" stroke="#fff" stroke-width="3"/>`).join('');

  Object.assign(DIAG, {
    'm1-02:0': {
      alt: '상자 모양은 평평한 부분만, 둥근기둥 모양은 평평한 부분과 둥근 부분이 함께, 공 모양은 모두 둥근 부분인 것을 파랑(평평)과 주황(둥근)으로 칠해 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${box(80, 128, 84, 's0')}
        ${cyl(240, 82, 46, 92, 's1')}
        ${ball(395, 126, 52, 's2')}
        ${T(84, 222, '상자 모양', { s: 20, w: 800 })}${T(240, 222, '둥근기둥 모양', { s: 20, w: 800 })}${T(395, 222, '공 모양', { s: 20, w: 800 })}
        <g class="lg1"><rect x="92" y="248" width="26" height="22" rx="6" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>${T(126, 266, '평평한 부분', { a: 'start', s: 18, f: DG_C.d })}</g>
        <g class="lg2"><rect x="262" y="248" width="26" height="22" rx="6" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>${T(296, 266, '둥근 부분', { a: 'start', s: 18, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        const paint = (n, on, f, s) => { n.setAttribute('fill', on ? f : '#f5f5f7'); n.setAttribute('stroke', on ? s : DG_C.sub); };
        dgAnim(el, 5000, e => {
          ['.s0', '.s1', '.s2'].forEach((c, i) => qa(c).forEach(g => g.setAttribute('opacity', dgP(e, 100 + i * 300, 400))));
          qa('.fl').forEach(n => paint(n, e > 1600, DG_C.b, DG_C.d));
          qa('.cu').forEach(n => paint(n, e > 3000, DG_C.a, DG_C.c));
          qa('.sp').forEach(n => n.setAttribute('opacity', e > 3000 ? 1 : 0));
          ON(el, '.lg1', e > 1600 ? 1 : 0); ON(el, '.lg2', e > 3000 ? 1 : 0);
        });
      }
    },

    'm1-02:1': {
      alt: '상자 모양은 잘 쌓이고, 둥근기둥 모양은 세우면 쌓이지만 눕히면 굴러가고, 공 모양은 잘 굴러가서 쌓기 어려운 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <line x1="10" y1="196" x2="470" y2="196" stroke="#d2d2d7" stroke-width="3"/>
        <line x1="160" y1="70" x2="160" y2="270" stroke="#e5e5ea" stroke-width="2"/><line x1="320" y1="70" x2="320" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        ${[0, 1, 2].map(i => `<g class="b${i}">${box(70, 0, 46)}</g>`).join('')}
        ${[0, 1].map(i => `<g class="c${i}">${cyl(0, 0, 24, 44)}</g>`).join('')}
        <g class="lc">${lyingCyl(0, 0, 22, 54)}</g>
        <g class="bl"><circle r="32" ${CU} ${SW}/><line class="bs" x1="0" y1="0" x2="0" y2="-32" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/><circle r="4" fill="${DG_C.c}"/></g>
        <g class="t0">${T(80, 232, '잘 쌓여요', { s: 20, w: 800, f: DG_C.r })}${T(80, 260, '안 굴러가요', { s: 18, f: DG_C.sub })}</g>
        <g class="t1">${T(240, 232, '세우면 쌓여요', { s: 20, w: 800, f: DG_C.r })}${T(240, 260, '눕히면 굴러가요', { s: 18, f: DG_C.c })}</g>
        <g class="t2">${T(400, 232, '잘 굴러가요', { s: 20, w: 800, f: DG_C.c })}${T(400, 260, '쌓기 어려워요', { s: 18, f: DG_C.sub })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          // 상자 3개가 차례로 내려와 쌓임 (한 개 높이 46+19)
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 200 + i * 500, 500)), yT = 196 - 23 - i * 46 - 0, y0 = -40;
            q('.b' + i).setAttribute('transform', `translate(0,${y0 + (yT - y0) * f})`);
            q('.b' + i).setAttribute('opacity', e > 200 + i * 500 ? 1 : 0);
          });
          q('.t0').setAttribute('opacity', e > 1800 ? 1 : 0);
          // 둥근기둥 2개 세워 쌓기 → 눕힌 기둥 굴러감
          [0, 1].forEach(i => {
            const f = dgEase(dgP(e, 2000 + i * 500, 500)), yT = 196 - 44 - 7 - i * 51 + 0, y0 = -40;
            q('.c' + i).setAttribute('transform', `translate(204,${y0 + (yT - y0) * f})`);
            q('.c' + i).setAttribute('opacity', e > 2000 + i * 500 ? 1 : 0);
          });
          const r1 = dgEase(dgP(e, 3100, 1200));
          q('.lc').setAttribute('transform', `translate(${262 + 26 * r1},174)`);
          q('.t1').setAttribute('opacity', e > 3400 ? 1 : 0);
          // 공이 굴러감
          const r2 = dgEase(dgP(e, 4400, 1600)), bx = 352 + 86 * r2;
          q('.bl').setAttribute('transform', `translate(${bx},164)`);
          q('.bs').setAttribute('transform', `rotate(${(86 * r2) / 32 * 57.3})`);
          q('.t2').setAttribute('opacity', e > 4800 ? 1 : 0);
        });
      }
    },

    'm1-02:2': {
      alt: '상자 바닥을 종이에 대고 본뜨면 네모(사각형), 삼각기둥의 세모 면을 본뜨면 세모(삼각형), 캔 바닥을 본뜨면 동그라미(원)가 나오는 그림',
      svg: `<svg viewBox="0 0 480 316" class="dg-svg" role="img">
        <rect x="14" y="150" width="452" height="104" rx="12" fill="#f5f5f7"/>
        ${box(76, 78, 58, 'o0')}${prism(240, 82, 'o1')}${cyl(400, 56, 38, 52, 'o2')}
        ${[80, 240, 400].map((x, i) => `<path class="ar${i}" d="M${x} 126 v16 m-7 -7 l7 7 l7 -7" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        <rect class="tr0" pathLength="1" x="46" y="168" width="68" height="68" fill="none" stroke="${DG_C.d}" stroke-width="5" stroke-linejoin="round"/>
        <path class="tr1" pathLength="1" d="M205 236 L275 236 L240 170 Z" fill="none" stroke="${DG_C.d}" stroke-width="5" stroke-linejoin="round"/>
        <circle class="tr2" pathLength="1" cx="400" cy="202" r="36" fill="none" stroke="${DG_C.d}" stroke-width="5" transform="rotate(-90 400 202)"/>
        ${[['네모 □', '사각형'], ['세모 △', '삼각형'], ['동그라미 ○', '원']].map((t, i) => `<g class="lb${i}">${T(80 + i * 160, 280, t[0], { s: 18, f: DG_C.sub })}${T(80 + i * 160, 306, t[1], { s: 22, w: 800, f: DG_C.d })}</g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          [0, 1, 2].forEach(i => {
            const st = 200 + i * 1800;
            q('.ar' + i).setAttribute('opacity', e > st + 300 ? 1 : 0);
            const f = dgP(e, st + 500, 900);
            const t = q('.tr' + i);
            t.setAttribute('stroke-dasharray', '1 1'); t.setAttribute('stroke-dashoffset', 1 - f);
            t.setAttribute('opacity', f > 0 ? 1 : 0);
            q('.lb' + i).setAttribute('opacity', e > st + 1400 ? 1 : 0);
          });
        });
      }
    },

    'm1-02:3': {
      alt: '삼각형의 곧은 선(변) 3개와 뾰족한 점(꼭짓점) 3개, 사각형의 변 4개와 꼭짓점 4개를 하나씩 표시하며 세는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M${TRI.join(' L')} Z" fill="#f5f5f7" stroke="#c7c7cc" stroke-width="4" stroke-linejoin="round"/>
        <path d="M${SQ.join(' L')} Z" fill="#f5f5f7" stroke="#c7c7cc" stroke-width="4" stroke-linejoin="round"/>
        ${sides(TRI, 'ts')}${sides(SQ, 'ss')}${verts(TRI, 'tv')}${verts(SQ, 'sv')}
        ${T(130, 238, '삼각형', { s: 20, w: 800, f: DG_C.sub })}${T(355, 238, '사각형', { s: 20, w: 800, f: DG_C.sub })}
        <text class="tn" x="130" y="272" text-anchor="middle" font-size="20" font-weight="800"><tspan class="tn1" fill="${DG_C.d}">변 3</tspan><tspan fill="${DG_C.sub}"> · </tspan><tspan class="tn2" fill="${DG_C.c}">꼭짓점 3</tspan></text>
        <text class="sn" x="355" y="272" text-anchor="middle" font-size="20" font-weight="800"><tspan class="sn1" fill="${DG_C.d}">변 4</tspan><tspan fill="${DG_C.sub}"> · </tspan><tspan class="sn2" fill="${DG_C.c}">꼭짓점 4</tspan></text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7600, e => {
          let t = 300;
          const run = (cls, n, lab, word) => {
            let c = 0;
            for (let i = 0; i < n; i++) { const on = e > t; q('.' + cls + i).setAttribute('opacity', on ? 1 : 0); if (on) c++; t += 450; }
            q('.' + lab).textContent = `${word} ${c}`;
            q('.' + lab).setAttribute('opacity', c ? 1 : 0);
            t += 300;
          };
          run('ts', 3, 'tn1', '변'); run('tv', 3, 'tn2', '꼭짓점');
          t += 300;
          run('ss', 4, 'sn1', '변'); run('sv', 4, 'sn2', '꼭짓점');
        });
      }
    },
  });
})();
