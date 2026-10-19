/* 4학년 수학 · 0.01과 0.001, 소수는 어떻게 더하고 뺄까? (m4-09) */
(() => {
  const C = DG_C;
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.fill || C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const op = (el, s, v) => el.querySelectorAll(s).forEach(n => n.setAttribute('opacity', v));
  /* 모눈 100칸 */
  const grid = (x, y, c, cls) => {
    let s = '';
    for (let k = 0; k < 100; k++) s += `<rect class="${cls} ${cls}${k}" x="${x + (k % 10) * c}" y="${y + Math.floor(k / 10) * c}" width="${c}" height="${c}" fill="#fff" stroke="#c7c7cc" stroke-width="1"/>`;
    return s + `<rect x="${x}" y="${y}" width="${c * 10}" height="${c * 10}" fill="none" stroke="${C.sub}" stroke-width="2.5"/>`;
  };
  const fillTo = (el, cls, n, col) => el.querySelectorAll('.' + cls).forEach((r, k) => r.setAttribute('fill', k < n ? (typeof col === 'function' ? col(k) : col) : '#fff'));

  /* 세로셈 공통 배치 */
  const X = { op: 95, o: 150, p: 182, t: 214, h: 258 }, Y = [100, 160, 232], FS = 40;
  const num = (y, d, cls = '', col = C.ink) => [['o', d[0]], ['p', '.'], ['t', d[1]], ['h', d[2]]].map(([k, v]) => v === '' || (cls && k === 'p') ? '' : T(X[k], y, v, { fs: FS, fw: 700, fill: col, cls: cls ? `${cls} ${cls}${k}` : '' })).join('');
  const colBg = k => `<rect class="hl hl${k}" x="${X[k] - 22}" y="${Y[0] - 70}" width="44" height="${Y[2] - Y[0] + 92}" rx="10" fill="${C.b}" fill-opacity=".45"/>`;

  Object.assign(DIAG, {
    'm4-09:0': {
      alt: '모눈 100칸 중 1칸은 0.01, 10칸은 0.1, 37칸은 0.37을 나타내는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${grid(30, 30, 22, 'g')}
        ${T(300, 80, '1칸', { cls: 'l0', a: 'start', fill: C.d, fs: 22, fw: 800 })}${T(462, 80, '0.01', { cls: 'l0', a: 'end', fill: C.d, fs: 24, fw: 800 })}
        ${T(300, 150, '10칸', { cls: 'l1', a: 'start', fill: C.d, fs: 22, fw: 800 })}${T(462, 150, '0.1', { cls: 'l1', a: 'end', fill: C.d, fs: 24, fw: 800 })}
        ${T(300, 220, '37칸', { cls: 'l2', a: 'start', fill: C.c, fs: 22, fw: 800 })}${T(462, 220, '0.37', { cls: 'l2', a: 'end', fill: C.c, fs: 24, fw: 800 })}
        ${['l0', 'l1', 'l2'].map((c, i) => `<path class="${c}" d="M358 ${74 + i * 70} h28 m-8 -7 l8 7 l-8 7" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
      </svg>`,
      play(el) {
        dgAnim(el, 6000, e => {
          let n = e < 300 ? 0 : 1;
          n += Math.floor(9 * dgP(e, 1500, 1200));
          n += Math.floor(27 * dgP(e, 3400, 1800) + (e >= 5200 ? 0.5 : 0));
          fillTo(el, 'g', n, k => k === 0 ? C.d : k < 10 ? C.b : C.a);
          op(el, '.l0', e > 500 ? 1 : 0);
          op(el, '.l1', e > 2800 ? 1 : 0);
          op(el, '.l2', e > 5300 ? 1 : 0);
        });
      }
    },

    'm4-09:1': {
      alt: '2.574의 자릿값 표: 2는 일의 자리로 2, 5는 소수 첫째 자리로 0.5, 7은 소수 둘째 자리로 0.07, 4는 소수 셋째 자리로 0.004를 나타내는 그림',
      svg: (() => {
        const cols = [
          { x: 75, h: '일의 자리', d: '2', v: '2', c: C.ink },
          { x: 210, h: '소수 첫째', d: '5', v: '0.5', c: C.d },
          { x: 315, h: '소수 둘째', d: '7', v: '0.07', c: C.c },
          { x: 420, h: '소수 셋째', d: '4', v: '0.004', c: C.r },
        ];
        return `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
          ${cols.map((c, i) => `<g class="c${i}">
            <rect x="${c.x - 48}" y="${44}" width="96" height="34" rx="8" fill="${i ? C.b : '#f5f5f7'}" fill-opacity="${i ? .5 : 1}"/>
            ${T(c.x, 68, c.h, { fs: 18, fw: 700, fill: C.ink })}
            ${T(c.x, 196, c.v, { fs: 24, fw: 800, fill: c.c, cls: 'v v' + i })}
            <path class="v v${i}" d="M${c.x} 146 v18 m-6 -6 l6 6 l6 -6" fill="none" stroke="${C.sub}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>`).join('')}
          ${cols.map((c, i) => T(c.x, 136, c.d, { fs: 46, fw: 800, fill: c.c, cls: 'dg' + i })).join('')}
          ${T(142, 136, '.', { fs: 46, fw: 800, cls: 'dg0' })}
          ${T(240, 262, '2.574 = 2 + 0.5 + 0.07 + 0.004', { cls: 'eq', fs: 24, fw: 800 })}
        </svg>`;
      })(),
      play(el) {
        dgAnim(el, 6000, e => {
          [0, 1, 2, 3].forEach(i => {
            const st = 900 + i * 1000;
            op(el, '.c' + i, e > 300 ? (e > st || e < 900 ? 1 : 0.35) : 0);
            op(el, '.dg' + i, e > 300 ? 1 : 0);
            op(el, '.v' + i, e > st + 300 ? 1 : 0);
          });
          op(el, '.eq', e > 5000 ? 1 : 0);
        });
      }
    },

    'm4-09:2': {
      alt: '모눈 100칸에 0.4는 40칸, 0.38은 38칸을 색칠해 비교하면 0.4가 더 넓어서 0.4 > 0.38인 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${grid(45, 30, 15, 'a')}${grid(285, 30, 15, 'b')}
        ${T(240, 124, '>', { cls: 'gt', fs: 44, fw: 800 })}
        ${T(120, 216, '0.4 = 0.40', { fs: 24, fw: 800, fill: C.c })}
        ${T(360, 216, '0.38', { fs: 24, fw: 800, fill: C.d })}
        ${T(240, 270, '첫째 자리 4 > 3', { cls: 'gt', fs: 22, fw: 800 })}
      </svg>`,
      play(el) {
        dgAnim(el, 5200, e => {
          const f = dgP(e, 300, 2600);
          fillTo(el, 'a', Math.round(40 * f), C.a);
          fillTo(el, 'b', Math.round(38 * f), C.b);
          op(el, '.gt', e > 3500 ? 1 : 0);
        });
      }
    },

    'm4-09:3': {
      alt: '2.7 + 1.56을 2.70 + 1.56으로 소수점을 맞춰 세로로 쓰고, 오른쪽 자리부터 0 + 6 = 6, 7 + 5 = 12에서 1을 받아올리고, 2 + 1 + 1 = 4를 더해 4.26이 되는 세로셈 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${colBg('h')}${colBg('t')}${colBg('o')}
        ${num(Y[0], ['2', '7', ''])}${T(X.h, Y[0], '0', { fs: FS, fw: 700, fill: C.c, cls: 'z' })}
        ${T(X.op, Y[1], '+', { fs: FS, fw: 700 })}${num(Y[1], ['1', '5', '6'])}
        <line x1="70" y1="180" x2="285" y2="180" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        ${T(X.o, 50, '1', { cls: 'cy', fs: 22, fw: 800, fill: C.c })}
        ${num(Y[2], ['4', '2', '6'], 'r', C.d)}
        ${T(X.p, Y[2], '.', { cls: 'rp', fs: FS, fw: 800, fill: C.d })}
        ${['2.7 → 2.70', '0 + 6 = 6', '7 + 5 = 12', '2 + 1 + 1 = 4'].map((s, i) => T(318, 82 + i * 44, s, { cls: 'n n' + i, a: 'start', fs: 20, fw: 700, fill: i === 0 ? C.c : C.ink })).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          op(el, '.z,.n0', e > 700 ? 1 : 0);
          const S = [1800, 3000, 4200];
          ['h', 't', 'o'].forEach((k, i) => {
            op(el, '.hl' + k, e > S[i] && e < S[i] + 1100 ? 1 : 0);
            op(el, '.r' + k, e > S[i] + 400 ? 1 : 0);
            op(el, '.n' + (i + 1), e > S[i] + 400 ? 1 : 0);
          });
          op(el, '.cy', e > S[1] + 700 ? 1 : 0);
          const d = dgEase(dgP(e, 5300, 800));
          q('.rp').setAttribute('y', Y[0] + (Y[2] - Y[0]) * d);
          q('.rp').setAttribute('opacity', e > 5300 ? 1 : 0);
        });
      }
    },

    'm4-09:4': {
      alt: '5.2 − 1.75를 5.20 − 1.75로 바꾸어 세로셈으로 계산하는 그림: 받아내려 10 − 5 = 5, 다시 받아내려 11 − 7 = 4, 4 − 1 = 3이 되어 답은 3.45',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${colBg('h')}${colBg('t')}${colBg('o')}
        ${num(Y[0], ['5', '2', ''])}${T(X.h, Y[0], '0', { fs: FS, fw: 700, fill: C.c, cls: 'z' })}
        ${T(X.op, Y[1], '−', { fs: FS, fw: 700 })}${num(Y[1], ['1', '7', '5'])}
        <line x1="70" y1="180" x2="285" y2="180" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
        <g class="b1">${`<line x1="${X.t - 13}" y1="${Y[0] - 4}" x2="${X.t + 13}" y2="${Y[0] - 30}" stroke="${C.c}" stroke-width="3"/>`}
          ${T(X.h, 50, '10', { fs: 20, fw: 800, fill: C.c })}</g>
        ${T(X.t, 50, '1', { cls: 'b1a', fs: 20, fw: 800, fill: C.c })}
        <g class="b2"><line x1="${X.o - 13}" y1="${Y[0] - 4}" x2="${X.o + 13}" y2="${Y[0] - 30}" stroke="${C.c}" stroke-width="3"/>
          ${T(X.o, 50, '4', { fs: 20, fw: 800, fill: C.c })}${T(X.t, 50, '11', { fs: 20, fw: 800, fill: C.c })}</g>
        ${num(Y[2], ['3', '4', '5'], 'r', C.d)}
        ${T(X.p, Y[2], '.', { cls: 'rp', fs: FS, fw: 800, fill: C.d })}
        ${['5.2 → 5.20', '10 − 5 = 5', '11 − 7 = 4', '4 − 1 = 3'].map((s, i) => T(318, 82 + i * 44, s, { cls: 'n n' + i, a: 'start', fs: 20, fw: 700, fill: i === 0 ? C.c : C.ink })).join('')}
        ${T(240, 284, '검산: 3.45 + 1.75 = 5.2', { cls: 'ck', fs: 20, fw: 700, fill: C.sub })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          op(el, '.z,.n0', e > 700 ? 1 : 0);
          const S = [1800, 3200, 4600];
          ['h', 't', 'o'].forEach((k, i) => {
            op(el, '.hl' + k, e > S[i] && e < S[i] + 1300 ? 1 : 0);
            op(el, '.r' + k, e > S[i] + 700 ? 1 : 0);
            op(el, '.n' + (i + 1), e > S[i] + 700 ? 1 : 0);
          });
          op(el, '.b1', e > S[0] + 200 ? 1 : 0);
          op(el, '.b1a', e > S[0] + 200 && e <= S[1] + 200 ? 1 : 0);
          op(el, '.b2', e > S[1] + 200 ? 1 : 0);
          const d = dgEase(dgP(e, 5500, 800));
          q('.rp').setAttribute('y', Y[0] + (Y[2] - Y[0]) * d);
          q('.rp').setAttribute('opacity', e > 5500 ? 1 : 0);
          op(el, '.ck', e > 6400 ? 1 : 0);
        });
      }
    },
  });
})();
