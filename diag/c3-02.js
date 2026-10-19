/* 3학년 중국어 · 같은 '마'인데 왜 뜻이 다를까? (c3-02) */
(() => {
  const C = DG_C, RED = '#ff3b30', ZH = 'lang="zh-CN"';
  const TC = { 1: C.d, 2: C.r, 3: C.c, 4: RED };
  /* 성조 곡선 (5단계 높이, 1=낮음 5=높음) — 상자 x,y,w,h */
  const tonePath = (t, x, y, w, h) => {
    const L = v => +(y + h - (v - 1) / 4 * h).toFixed(1);
    if (t === 1) return { d: `M${x} ${L(5)} L${x + w} ${L(5)}`, end: [x + w, L(5)], dir: [1, 0] };
    if (t === 2) return { d: `M${x} ${L(3)} C${x + w * .45} ${L(3)} ${x + w * .7} ${L(4.2)} ${x + w} ${L(5)}`, end: [x + w, L(5)], dir: [1, -.9] };
    if (t === 3) return { d: `M${x} ${L(2)} C${x + w * .25} ${L(.7)} ${x + w * .55} ${L(.7)} ${x + w} ${L(4)}`, end: [x + w, L(4)], dir: [1, -1.6] };
    return { d: `M${x} ${L(5)} C${x + w * .4} ${L(4.6)} ${x + w * .75} ${L(2.6)} ${x + w} ${L(1)}`, end: [x + w, L(1)], dir: [1, 1.7] };
  };
  const head = (end, dir, col, s = 11) => {
    const n = Math.hypot(dir[0], dir[1]), ux = dir[0] / n, uy = dir[1] / n, px = -uy, py = ux;
    const [ex, ey] = end, bx = ex - ux * s, by = ey - uy * s;
    return `<path d="M${ex} ${ey} L${(bx + px * s * .6).toFixed(1)} ${(by + py * s * .6).toFixed(1)} L${(bx - px * s * .6).toFixed(1)} ${(by - py * s * .6).toFixed(1)} Z" fill="${col}"/>`;
  };
  const grid = (x, y, w, h) => [0, 1, 2, 3, 4].map(k => `<line x1="${x}" y1="${y + k * h / 4}" x2="${x + w}" y2="${y + k * h / 4}" stroke="#e5e5ea" stroke-width="${k % 2 ? 1.5 : 2}"/>`).join('');
  const curve = (cls, t, x, y, w, h, sw = 6) => { const p = tonePath(t, x, y, w, h); return `<g class="${cls}"><path class="${cls}p" d="${p.d}" pathLength="100" fill="none" stroke="${TC[t]}" stroke-width="${sw}" stroke-linecap="round"/><g class="${cls}h">${head(p.end, p.dir, TC[t], sw + 7)}</g></g>`; };
  const drawCurve = (q, cls, f) => { q('.' + cls + 'p').setAttribute('stroke-dasharray', `${100 * f} 200`); q('.' + cls + 'h').setAttribute('opacity', f >= 1 ? 1 : 0); q('.' + cls).setAttribute('opacity', f > 0 ? 1 : 0); };

  /* 0: 네 가지 ma */
  const M0 = [
    { t: 1, py: 'mā', h: '妈', m: '엄마' },
    { t: 2, py: 'má', h: '麻', m: '삼(풀)' },
    { t: 3, py: 'mǎ', h: '马', m: '말' },
    { t: 4, py: 'mà', h: '骂', m: '꾸짖다' },
  ];

  /* 1·2: 두 성조 나란히 */
  const P = {
    1: { name: '1성', mk: 'ā', how: '높고 평평하게', ex: [['妈', 'mā', '엄마'], ['八', 'bā', '여덟']] },
    2: { name: '2성', mk: 'á', how: '아래→위로', ex: [['麻', 'má', '삼'], ['十', 'shí', '열']] },
    3: { name: '3성', mk: 'ǎ', how: '내렸다 올리기', ex: [['马', 'mǎ', '말'], ['五', 'wǔ', '다섯']] },
    4: { name: '4성', mk: 'à', how: '위에서 뚝!', ex: [['骂', 'mà', '꾸짖다'], ['四', 'sì', '넷']] },
  };
  const pair = (a, b) => `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
    <text x="16" y="${92}" fill="${C.sub}" font-size="18" font-weight="700">높게</text>
    <text x="16" y="${182}" fill="${C.sub}" font-size="18" font-weight="700">낮게</text>
    ${[a, b].map((t, i) => { const p = P[t], x0 = 70 + i * 210, gx = x0 + 10, gy = 86, gw = 170, gh = 92; return `
      <text x="${x0}" y="58" fill="${TC[t]}" font-size="24" font-weight="800">${p.name} <tspan font-size="26">${p.mk}</tspan></text>
      ${grid(gx, gy, gw, gh)}
      ${curve('cv' + i, t, gx + 16, gy, gw - 32, gh, 7)}
      <g class="ex${i}">
        <text x="${x0 + 95}" y="${gy + gh + 30}" text-anchor="middle" fill="${TC[t]}" font-size="18" font-weight="800">${p.how}</text>
        ${p.ex.map(([h, py, m], k) => `<text ${ZH} x="${x0 + 4}" y="${gy + gh + 72 + k * 36}" fill="${C.ink}" font-size="28" font-weight="600">${h}</text>
          <text x="${x0 + 44}" y="${gy + gh + 70 + k * 36}" fill="${C.ink}" font-size="22" font-weight="800">${py}</text>
          <text x="${x0 + 100}" y="${gy + gh + 69 + k * 36}" fill="${C.sub}" font-size="18" font-weight="700">${m}</text>`).join('')}
      </g>`; }).join('')}
  </svg>`;
  const pairPlay = el => {
    const q = s => el.querySelector(s);
    dgAnim(el, 5200, e => {
      [0, 1].forEach(i => {
        const st = 300 + i * 2300;
        drawCurve(q, 'cv' + i, dgEase(dgP(e, st, 1200)));
        q('.ex' + i).setAttribute('opacity', dgP(e, st + 1300, 500));
      });
    });
  };

  /* 3: 성조 표시 자리 */
  const R3 = [
    { h: '好', L: ['h', 'a', 'o'], at: 1, t: 3, r: 'a가 있으면 a' },
    { h: '多', L: ['d', 'u', 'o'], at: 2, t: 1, r: 'a 없으면 o·e' },
    { h: '六', L: ['l', 'i', 'u'], at: 2, t: 4, r: 'iu는 뒤 글자' },
    { h: '水', L: ['s', 'h', 'u', 'ı'], at: 3, t: 3, r: 'ui는 뒤 글자' },
    { h: '吗', L: ['m', 'a'], at: -1, t: 0, r: '경성: 표시 없음' },
  ];
  const TW = 38, TX = 84, ry = i => 82 + i * 60;
  const mark = (t, cx, my, col) => {
    const d = t === 1 ? `M${cx - 9} ${my} h18` : t === 2 ? `M${cx - 5} ${my + 5} L${cx + 6} ${my - 6}` : t === 3 ? `M${cx - 8} ${my - 5} L${cx} ${my + 4} L${cx + 8} ${my - 5}` : `M${cx - 6} ${my - 6} L${cx + 5} ${my + 5}`;
    return `<path d="${d}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  };

  Object.assign(DIAG, {
    'c3-02:0': {
      alt: '같은 ma라도 1성 mā(妈, 엄마)는 평평하게, 2성 má(麻, 삼)는 올라가게, 3성 mǎ(马, 말)는 내렸다 올라가게, 4성 mà(骂, 꾸짖다)는 뚝 떨어지게 소리 내는 네 칸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${M0.map((m, i) => { const x = 8 + i * 118, cx = x + 55; return `<g>
          <rect x="${x}" y="48" width="110" height="240" rx="18" fill="#f5f5f7"/>
          ${grid(x + 14, 64, 82, 56)}
          ${curve('c' + i, m.t, x + 22, 64, 66, 56, 6)}
          <g class="t${i}">
            <text x="${cx}" y="160" text-anchor="middle" fill="${TC[m.t]}" font-size="30" font-weight="800">${m.py}</text>
            <text ${ZH} x="${cx}" y="220" text-anchor="middle" fill="${C.ink}" font-size="46" font-weight="600">${m.h}</text>
            <text x="${cx}" y="268" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">${m.m}</text>
          </g></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          M0.forEach((m, i) => {
            const st = 300 + i * 1450;
            drawCurve(q, 'c' + i, dgEase(dgP(e, st, 800)));
            q('.t' + i).setAttribute('opacity', dgP(e, st + 700, 500));
          });
        });
      }
    },

    'c3-02:1': {
      alt: '1성(ā)은 높은 소리로 평평하게 쭉, 2성(á)은 중간에서 높은 곳으로 올라가는 선 그림. 1성 예: 妈 mā 엄마, 八 bā 여덟 / 2성 예: 麻 má 삼, 十 shí 열',
      svg: pair(1, 2),
      play: pairPlay
    },

    'c3-02:2': {
      alt: '3성(ǎ)은 낮게 내려갔다가 살짝 올라오고, 4성(à)은 높은 곳에서 아래로 뚝 떨어지는 선 그림. 3성 예: 马 mǎ 말, 五 wǔ 다섯 / 4성 예: 骂 mà 꾸짖다, 四 sì 넷',
      svg: pair(3, 4),
      play: pairPlay
    },

    'c3-02:3': {
      alt: '성조 표시가 붙는 자리: hǎo(好)는 a 위, duō(多)는 o 위, liù(六)는 iu의 뒤 글자 u 위, shuǐ(水)는 ui의 뒤 글자 i 위, 경성 ma(吗)는 표시가 없음',
      svg: `<svg viewBox="0 0 480 350" class="dg-svg" role="img">
        ${R3.map((r, i) => { const y = ry(i); return `<g class="r${i}">
          <text ${ZH} x="40" y="${y + 11}" text-anchor="middle" fill="${C.ink}" font-size="32" font-weight="600">${r.h}</text>
          ${r.L.map((ch, k) => { const x = TX + k * (TW + 4), on = k === r.at; return `<rect class="${on ? 'hl' + i : ''}" x="${x}" y="${y - 32}" width="${TW}" height="52" rx="10" fill="${on ? C.a : '#f5f5f7'}" stroke="${on ? C.c : '#d2d2d7'}" stroke-width="2"/>
            <text x="${x + TW / 2}" y="${y + 11}" text-anchor="middle" fill="${C.ink}" font-size="28" font-weight="700">${ch}</text>`; }).join('')}
          ${r.at >= 0 ? `<g class="mk${i}">${mark(r.t, TX + r.at * (TW + 4) + TW / 2, y - 20, '#ff3b30')}</g>` : ''}
          <text class="rl${i}" x="262" y="${y + 7}" fill="${r.at < 0 ? C.sub : C.c}" font-size="19" font-weight="800">${r.r}</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          R3.forEach((r, i) => {
            const st = 200 + i * 1300;
            q('.r' + i).setAttribute('opacity', e >= st ? 1 : 0);
            const f = dgEase(dgP(e, st + 500, 500));
            if (r.at >= 0) { q('.mk' + i).setAttribute('opacity', f); q('.mk' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`); }
            q('.rl' + i).setAttribute('opacity', dgP(e, st + 800, 400));
          });
        });
      }
    },
  });
})();
