/* 5학년 국어 · 이야기 속 인물은 무엇을 소중하게 여겼을까? (k5-10) */
(() => {
  /* ── 공통 도우미 (이 파일 안에서만) ── */
  const C = DG_C, RED = '#ff3b30', LINE = '#d2d2d7', SOFT = '#f5f5f7', GRNF = '#d6efdc', REDF = '#ffe0de';
  const at = o => (o.t != null ? ` data-t="${o.t}"` : '') + (o.d ? ` data-d="${o.d}"` : '') + (o.o ? ` data-o="${o.o}"` : '') +
    (o.dx ? ` data-dx="${o.dx}"` : '') + (o.dy ? ` data-dy="${o.dy}"` : '') + (o.c ? ` class="${o.c}"` : '') + (o.draw ? ' data-draw="1"' : '');
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}"${o.lang ? ` lang="${o.lang}"` : ''}${at(o)}>${s}</text>`;
  const B = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || '#fff'}" stroke="${o.st || 'none'}" stroke-width="${o.sw || 2.5}"${o.da ? ` stroke-dasharray="${o.da}"` : ''}${at(o)}/>`;
  const G = (o, inner) => `<g${at(o)}>${inner}</g>`;
  const L = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.f || C.sub}" stroke-width="${o.sw || 3}" stroke-linecap="round"${o.da ? ` stroke-dasharray="${o.da}"` : ''}${at(o)}/>`;
  const ARR = (x1, y1, x2, y2, o = {}) => {
    const col = o.f || C.sub, w = o.sw || 3.5, a = Math.atan2(y2 - y1, x2 - x1), h = o.h || 10;
    const p = s => `${(x2 - h * Math.cos(a + s)).toFixed(1)} ${(y2 - h * Math.sin(a + s)).toFixed(1)}`;
    return `<g${at(o)}><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${p(-.55)} L${x2} ${y2} L${p(.55)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  const OK = (x, y, o = {}) => G(o, `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${C.r}"/><path d="M${x - 7} ${y} l5 5 l9 -10" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`);
  const NO = (x, y, o = {}) => G(o, `<circle cx="${x}" cy="${y}" r="${o.r || 15}" fill="${RED}"/><path d="M${x - 6} ${y - 6} l12 12 m0 -12 l-12 12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`);
  /* data-t(시작 ms)·data-d(길이)·data-o(사라지는 시각)·data-dx/dy(미끄러져 들어옴)·data-draw(선 그리기) 를 읽어 차례로 보여 줌 */
  const seq = (total, extra) => function (el) {
    const items = [...el.querySelectorAll('[data-t]')];
    const lens = items.map(n => n.dataset.draw && n.getTotalLength ? n.getTotalLength() : 0);
    dgAnim(el, total, e => {
      items.forEach((n, i) => {
        let p = dgEase(dgP(e, +n.dataset.t, +(n.dataset.d || 500)));
        if (n.dataset.draw) { n.setAttribute('stroke-dasharray', lens[i]); n.setAttribute('stroke-dashoffset', lens[i] * (1 - p)); n.setAttribute('opacity', p > 0 ? 1 : 0); }
        else n.setAttribute('opacity', n.dataset.o ? p * (1 - dgEase(dgP(e, +n.dataset.o, 500))) : p);
        if (n.dataset.dx || n.dataset.dy) n.setAttribute('transform', `translate(${((+n.dataset.dx || 0) * (1 - p)).toFixed(1)},${((+n.dataset.dy || 0) * (1 - p)).toFixed(1)})`);
      });
      if (extra) extra(el, e);
    });
  };
  const TW = (s, f = 20) => [...s].reduce((w, ch) => w + (/[\u3131-\uD7A3]/.test(ch) ? f * .96 : ch === ' ' ? f * .28 : f * .6), 0);
  const svg = (h, inner) => `<svg viewBox="0 0 480 ${h}" class="dg-svg" role="img">${inner}</svg>`;

  /* 상황 → 말과 행동 → 까닭 → 가치 차례 틀 */
  const KEYS = [['상황', C.sub, SOFT], ['말·행동', C.d, C.b], ['까닭', C.c, C.a], ['가치', C.r, GRNF]];
  const chain = rows => svg(300, rows.map((s, i) => {
    const y = 44 + i * 64, t = 200 + i * 1100, last = i === 3, [k, col, f] = KEYS[i];
    return `${G({ t, d: 500, dx: -16 }, `${B(14, y, 104, 48, { f: col, rx: 24 })}${T(66, y + 31, k, { s: 20, w: 800, f: '#fff' })}
      ${B(130, y, 336, 48, { f, rx: 12, st: last ? C.r : 'none', sw: 3 })}${T(298, y + 32, s, { s: last ? 24 : 20, w: last ? 800 : 700, f: last ? '#1e7a3a' : C.ink })}`)}
      ${i < 3 ? ARR(66, y + 50, 66, y + 62, { f: C.sub, sw: 3, h: 6, t: t + 700, d: 300 }) : ''}`;
  }).join(''));

  Object.assign(DIAG, {
    'k5-10:1': {
      alt: '가치를 찾는 차례: 상황(앞서 달리던 친구가 넘어짐) → 행동(멈추어 친구를 일으켜 줌) → 까닭(1등보다 친구가 더 중요함) → 가치(배려, 우정)',
      svg: chain(['앞서 달리던 친구가 넘어짐', '멈추어 친구를 일으켜 줌', '1등보다 친구가 더 중요', '배려 · 우정']),
      play: seq(4200)
    },
    'k5-10:2': {
      alt: '약속의 화분 이야기를 가치 찾기 틀로 정리한 그림: 상황(가족 여행으로 화분을 돌볼 수 없음) → 말·행동(옆집 할머니께 부탁하고 쪽지를 드림) → 까닭(맡겠다고 약속함, 반 모두의 화분) → 가치(책임, 신뢰)',
      svg: chain(['여행 때문에 화분을 못 돌봄', '할머니께 부탁하고 쪽지 드림', '약속했고, 반 모두의 화분', '책임 · 신뢰']),
      play: seq(4200)
    },
  });
})();
