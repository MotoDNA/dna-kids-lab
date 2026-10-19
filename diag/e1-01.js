/* 1학년 영어 · A부터 M까지, 알파벳 친구를 만나 볼까? (e1-01) */
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

  const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const NAME = { A: '에이', B: '비', C: '씨', D: '디', E: '이', F: '에프', G: '지', H: '에이치', I: '아이', J: '제이', K: '케이', L: '엘', M: '엠' };
  const tiles = (letters, x0, w, gap, t0, dt) => letters.map((l, i) => { const x = x0 + i * (w + gap); return G({ t: t0 + i * dt, d: 400, dy: -16 },
    `${B(x, 50, w, 104, { f: C.b, rx: 14 })}${T(x + w / 2, 104, l, { s: 38, w: 800, f: C.d })}${T(x + w / 2, 138, NAME[l], { s: 18, w: 700, f: C.ink })}`); }).join('');
  const apple = (x, y) => `<path d="M${x} ${y - 14} c-10 -8 -32 -6 -32 16 c0 20 16 32 24 32 c4 0 6 -2 8 -2 c2 0 4 2 8 2 c8 0 24 -12 24 -32 c0 -22 -22 -24 -32 -16 Z" fill="${RED}"/>
    <path d="M${x} ${y - 14} q-2 -10 4 -16" fill="none" stroke="#8a6a4a" stroke-width="3" stroke-linecap="round"/><path d="M${x + 3} ${y - 22} q12 -10 18 0 q-10 6 -18 0 Z" fill="${C.r}"/>`;
  const lion = (x, y) => `${Array.from({ length: 12 }, (_, k) => { const a = k * 30 * Math.PI / 180; return `<circle cx="${(x + 22 * Math.cos(a)).toFixed(1)}" cy="${(y + 22 * Math.sin(a)).toFixed(1)}" r="10" fill="${C.c}"/>`; }).join('')}
    <circle cx="${x}" cy="${y}" r="20" fill="${C.a}"/><circle cx="${x - 7}" cy="${y - 4}" r="2.5" fill="${C.ink}"/><circle cx="${x + 7}" cy="${y - 4}" r="2.5" fill="${C.ink}"/><path d="M${x - 4} ${y + 5} h8 l-4 4 Z" fill="${C.ink}"/>`;
  const moon = (x, y) => `<circle cx="${x}" cy="${y}" r="26" fill="${C.c}"/><circle cx="${x + 13}" cy="${y - 8}" r="23" fill="${SOFT}"/>`;
  const word = (x, y, w) => `<text x="${x}" y="${y}" font-size="30" font-weight="800" fill="${C.ink}"><tspan fill="${RED}">${w[0]}</tspan>${w.slice(1)}</text>`;
  const note = (x, y, col) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="6" fill="${col}" transform="rotate(-20 ${x} ${y})"/><line x1="${x + 7}" y1="${y - 2}" x2="${x + 7}" y2="${y - 30}" stroke="${col}" stroke-width="3"/><path d="M${x + 7} ${y - 30} q10 4 10 14" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
  /* 3: 노래 — 글자 자리 */
  const SONG = AZ.slice(0, 13).map((l, i) => i < 7 ? { l, x: 72 + i * 56, y: 112 } : { l, x: 100 + (i - 7) * 56, y: 206 });

  Object.assign(DIAG, {
    'e1-01:0': {
      alt: '알파벳 26개 글자 가운데 오늘 배우는 A부터 M까지 13개가 파랗게 빛나는 그림',
      svg: svg(240, `
        ${AZ.map((l, i) => { const x = 14 + (i % 13) * 35, y = i < 13 ? 56 : 108, on = i < 13; return `<g class="tl" data-i="${i}">
          <rect class="tb" x="${x}" y="${y}" width="31" height="42" rx="8" fill="${SOFT}"/><text class="tt" x="${x + 15.5}" y="${y + 30}" text-anchor="middle" font-size="22" font-weight="800" fill="${C.sub}">${l}</text></g>`; }).join('')}
        ${T(240, 196, 'A부터 M까지 · 오늘 배워요', { s: 22, w: 800, f: C.d, t: 3600, d: 400 })}
        ${T(240, 226, '알파벳은 모두 26개', { s: 18, w: 700, f: C.sub, t: 2600, d: 400 })}
      `),
      play: seq(4200, (el, e) => el.querySelectorAll('.tl').forEach(g => {
        const i = +g.dataset.i, on = i < 13 && e >= 2900 + i * 50;
        g.setAttribute('opacity', dgP(e, 200 + i * 90, 250));
        g.querySelector('.tb').setAttribute('fill', on ? C.b : SOFT); g.querySelector('.tt').setAttribute('fill', on ? C.d : '#aeaeb2');
      }))
    },

    'e1-01:1': {
      alt: 'A 에이, B 비, C 씨, D 디, E 이, F 에프, G 지. 사과 apple은 A로 시작해요',
      svg: svg(290, `
        ${tiles('ABCDEFG'.split(''), 12, 60, 6, 200, 450)}
        ${G({ t: 3600, d: 500, dy: 12 }, `${B(96, 188, 288, 84, { f: SOFT, rx: 20 })}${B(112, 204, 52, 52, { f: C.d, rx: 12 })}${T(138, 241, 'A', { s: 32, w: 800, f: '#fff' })}
          ${ARR(176, 230, 198, 230, { f: C.sub, sw: 3, h: 7 })}<g>${apple(240, 232)}</g>${word(284, 242, 'apple')}`)}
      `),
      play: seq(4400)
    },

    'e1-01:2': {
      alt: 'H 에이치, I 아이, J 제이, K 케이, L 엘, M 엠. 사자 lion은 L로, 달 moon은 M으로 시작해요',
      svg: svg(290, `
        ${tiles('HIJKLM'.split(''), 15, 70, 6, 200, 500)}
        ${G({ t: 3400, d: 500, dy: 12 }, `${B(12, 188, 220, 84, { f: SOFT, rx: 20 })}${B(26, 204, 46, 52, { f: C.d, rx: 12 })}${T(49, 241, 'L', { s: 30, w: 800, f: '#fff' })}${lion(116, 230)}${word(158, 242, 'lion')}`)}
        ${G({ t: 4200, d: 500, dy: 12 }, `${B(248, 188, 220, 84, { f: SOFT, rx: 20 })}${B(262, 204, 46, 52, { f: C.d, rx: 12 })}${T(285, 241, 'M', { s: 30, w: 800, f: '#fff' })}${moon(344, 230)}${word(380, 242, 'moon')}`)}
      `),
      play: seq(4800)
    },

    'e1-01:3': {
      alt: '알파벳 노래: 손가락으로 A B C D E F G, H I J K L M을 차례로 짚으며 부르는 그림',
      svg: svg(260, `
        ${note(30, 90, C.c)}${note(446, 236, C.d)}
        ${SONG.map((s, i) => `<text class="sg" data-i="${i}" x="${s.x}" y="${s.y}" text-anchor="middle" font-size="40" font-weight="800" fill="${LINE}">${s.l}</text>`).join('')}
        <g class="fin"><path d="M-6 6 v-18 a6 6 0 0 1 12 0 v18 Z" fill="${C.c}"/><rect x="-11" y="4" width="22" height="20" rx="7" fill="${C.c}"/></g>
      `),
      play: seq(6000, (el, e) => {
        const k = Math.min(12, Math.floor((e - 300) / 420));
        el.querySelectorAll('.sg').forEach(t => { const i = +t.dataset.i; t.setAttribute('fill', e < 300 || i > k ? LINE : i === k ? C.c : C.d); });
        const s = SONG[Math.max(0, k)];
        el.querySelector('.fin').setAttribute('transform', `translate(${s.x},${s.y + 22})`);
        el.querySelector('.fin').setAttribute('opacity', e < 300 ? 0 : 1);
      })
    },
  });
})();
