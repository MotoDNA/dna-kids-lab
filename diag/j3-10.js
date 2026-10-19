/* 4학년 일본어 · 바나나, 케이크를 가타카나로 써 볼까? (j3-10) */
(() => {
  /* ---- 공통 도우미 (이 파일 안에서만) ---- */
  const JA = 'lang="ja"', LG = '#f5f5f7', LN = '#d2d2d7', RED = '#ff3b30', PUR = '#af52de', GF = '#d6efdc';
  // 글자 폭 대략 계산(가나·한자·한글 = 글자 크기, 그 밖 0.58)
  const tw = (s, fs) => [...String(s).replace(/<[^>]+>/g, '')].reduce((a, ch) => a + (/[　-鿿가-힯＀-￯]/.test(ch) ? fs : ch === ' ' ? fs * .3 : fs * .58), 0);
  const T = (x, y, s, o = {}) => `<text${o.cls ? ` class="${o.cls}"` : ''}${o.ja ? ' ' + JA : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.c || DG_C.ink}" font-size="${o.fs || 20}" font-weight="${o.fw || 700}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) => `<rect${o.cls ? ` class="${o.cls}"` : ''} x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" fill="${o.f || LG}"${o.s ? ` stroke="${o.s}" stroke-width="${o.sw || 2.5}"` : ''}${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
  const ARR = (x1, y1, x2, y2, c = DG_C.sub, sw = 3, cls = '') => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 9, f = v => v.toFixed(1);
    return `<g${cls ? ` class="${cls}"` : ''} stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M${x1} ${y1} L${x2} ${y2}"/><path d="M${f(x2 - h * Math.cos(a - .5))} ${f(y2 - h * Math.sin(a - .5))} L${x2} ${y2} L${f(x2 - h * Math.cos(a + .5))} ${f(y2 - h * Math.sin(a + .5))}"/></g>`;
  };
  // 낱말 블록 한 줄: items [{t 일본어, k 한국어(아래), r 위 꼬리표, f 면색, s 테두리, c 글자색}]
  const ROWW = (items, o = {}) => { const fs = o.fs || 24, pad = o.pad ?? 14; return items.map(it => Math.max(tw(it.t, fs) + pad * 2, it.k ? tw(it.k, o.kfs || 20) + 6 : 0, o.minw || 0)); };
  const ROW = (items, y, o = {}) => {
    const fs = o.fs || 24, h = o.h || 52, gap = o.gap ?? 8, kfs = o.kfs || 20;
    const ws = ROWW(items, o), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
    let x = o.x ?? ((o.cx ?? 240) - tot / 2);
    return items.map((it, i) => {
      const w = ws[i], cx = x + w / 2; x += w + gap;
      return `<g class="${o.p || 'b'}${i}">${BOX(cx - w / 2, y, w, h, { f: it.f || LG, s: it.s, rx: 12 })}${T(cx, y + h / 2 + fs * .36, it.t, { ja: 1, fs, c: it.c || DG_C.ink })}${it.k ? T(cx, y + h + kfs + 6, it.k, { fs: kfs, c: it.kc || DG_C.sub }) : ''}${it.r ? T(cx, y - 10, it.r, { fs: 18, c: it.rc || DG_C.c, fw: 800 }) : ''}</g>`;
    }).join('');
  };
  // 동그라미 얼굴 + 몸 (top = 머리 위)
  const KID = (cx, top, col, fill, back) => `<path d="M${cx - 27} ${top + 94} Q${cx - 27} ${top + 52} ${cx} ${top + 52} Q${cx + 27} ${top + 52} ${cx + 27} ${top + 94} Z" fill="${fill}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="${cx}" cy="${top + 23}" r="22" fill="${back ? col : '#fff'}" stroke="${col}" stroke-width="3"/>${back ? '' : `<circle cx="${cx - 8}" cy="${top + 20}" r="2.8" fill="${DG_C.ink}"/><circle cx="${cx + 8}" cy="${top + 20}" r="2.8" fill="${DG_C.ink}"/><path d="M${cx - 7} ${top + 30} Q${cx} ${top + 36} ${cx + 7} ${top + 30}" fill="none" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linecap="round"/>`}`;
  const FACE = (cx, cy, r, col) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${col}" stroke-width="3"/><circle cx="${cx - r * .36}" cy="${cy - r * .12}" r="2.4" fill="${DG_C.ink}"/><circle cx="${cx + r * .36}" cy="${cy - r * .12}" r="2.4" fill="${DG_C.ink}"/><path d="M${cx - r * .3} ${cy + r * .3} Q${cx} ${cy + r * .58} ${cx + r * .3} ${cy + r * .3}" fill="none" stroke="${DG_C.ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  // 말풍선 (꼬리: tx 위치, dir 'd' 아래 / 'l' 왼쪽 / 'r' 오른쪽)
  const BUB = (x, y, w, h, o = {}) => {
    const f = o.f || '#fff', s = o.s || LN, tx = o.tx ?? x + 30;
    const tail = o.dir === 'l' ? `M${x + 2} ${y + h / 2 - 8} L${x - 12} ${y + h / 2 + 4} L${x + 2} ${y + h / 2 + 8}`
      : o.dir === 'r' ? `M${x + w - 2} ${y + h / 2 - 8} L${x + w + 12} ${y + h / 2 + 4} L${x + w - 2} ${y + h / 2 + 8}`
      : `M${tx - 9} ${y + h - 2} L${tx - 2} ${y + h + 13} L${tx + 9} ${y + h - 2}`;
    return `${BOX(x, y, w, h, { f, s, sw: 2.5, rx: h / 2 > 22 ? 22 : h / 2 })}<path d="${tail}" fill="${f}" stroke="${s}" stroke-width="2.5" stroke-linejoin="round"/>`;
  };
  // 차례로 나타나기: steps [[선택자, 시작ms, 길이ms, 아래에서 올라오는 거리]]
  const pop = (el, sel, e, t, d = 450, dy = 12) => { const f = dgEase(dgP(e, t, d)); el.querySelectorAll(sel).forEach(n => { n.setAttribute('opacity', f); n.setAttribute('transform', dy ? `translate(0,${((1 - f) * dy).toFixed(2)})` : ''); }); return f; };
  const SEQ = (el, total, steps, extra) => dgAnim(el, total, e => { steps.forEach(([s, t, d, dy]) => pop(el, s, e, t, d ?? 450, dy ?? 12)); if (extra) extra(e); });
  const vis = (el, sel, on) => el.querySelectorAll(sel).forEach(n => n.setAttribute('opacity', on ? 1 : 0));
  /* 0: あいうえお ↔ アイウエオ */
  const HK = [['あ', 'ア', '아'], ['い', 'イ', '이'], ['う', 'ウ', '우'], ['え', 'エ', '에'], ['お', 'オ', '오']];
  const LW = [['バナナ', '바나나'], ['ソウル', '서울'], ['キムチ', '김치']];
  /* 1: 닮은 짝 */
  const PAIR = [['か', 'カ', '카'], ['き', 'キ', '키'], ['へ', 'ヘ', '헤'], ['り', 'リ', '리'], ['も', 'モ', '모'], ['や', 'ヤ', '야']];
  /* 2: シ ツ ン ソ 획 (상자 0~80 안 좌표). 마지막 획은 Q 곡선 [시작, 조절점, 끝] */
  const ST = [
    { ch: 'シ', k: '시', up: 1, dots: ['M12 14 L28 24', 'M8 36 L24 46'], last: [[12, 74], [42, 66], [72, 24]] },
    { ch: 'ツ', k: '츠', up: 0, dots: ['M10 16 L18 34', 'M30 12 L38 30'], last: [[68, 12], [64, 58], [22, 76]] },
    { ch: 'ン', k: '응', up: 1, dots: ['M12 20 L30 32'], last: [[12, 74], [46, 66], [72, 28]] },
    { ch: 'ソ', k: '소', up: 0, dots: ['M18 16 L28 40'], last: [[68, 12], [64, 58], [22, 76]] },
  ];
  const SX = [62, 176, 304, 418];
  const lastD = l => `M${l[0][0]} ${l[0][1]} Q${l[1][0]} ${l[1][1]} ${l[2][0]} ${l[2][1]}`;
  const headD = l => { const a = Math.atan2(l[2][1] - l[1][1], l[2][0] - l[1][0]), h = 12, [x, y] = l[2], f = v => v.toFixed(1); return `M${f(x - h * Math.cos(a - .55))} ${f(y - h * Math.sin(a - .55))} L${x} ${y} L${f(x - h * Math.cos(a + .55))} ${f(y - h * Math.sin(a + .55))}`; };
  /* 3: ー */
  const LB = [{ a: 'ケ', b: 'キ', rd: '케-키', m: '케이크' }, { a: 'ゲ', b: 'ム', rd: '게-무', m: '게임' }];

  Object.assign(DIAG, {
    'j3-10:0': {
      alt: '히라가나 あいうえお 아래에 소리가 같은 가타카나 アイウエオ가 하나씩 짝지어 나타나고, 가타카나로 쓰는 낱말 バナナ(바나나), ソウル(서울), キムチ(김치)를 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${T(16, 82, '히라가나', { a: 'start', fs: 20, c: DG_C.sub })}${T(16, 176, '가타카나', { a: 'start', fs: 20, c: DG_C.d })}
        ${HK.map(([h, k, s], i) => { const x = 140 + i * 66; return `
          ${BOX(x - 28, 50, 56, 56, { rx: 12 })}${T(x, 90, h, { ja: 1, fs: 34, fw: 700 })}
          <g class="k${i}">${ARR(x, 112, x, 136, DG_C.sub, 2.5)}${BOX(x - 28, 144, 56, 56, { f: DG_C.b, rx: 6 })}${T(x, 184, k, { ja: 1, fs: 34, fw: 700, c: DG_C.d })}${T(x, 228, s, { fs: 20, c: DG_C.sub })}</g>`; }).join('')}
        <line x1="16" y1="250" x2="464" y2="250" stroke="#e5e5ea" stroke-width="2"/>
        ${LW.map(([w, k], i) => { const x = 82 + i * 158; return `<g class="w${i}">${T(x, 290, w, { ja: 1, fs: 24, fw: 800, c: DG_C.d })}${T(x, 318, k, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 5200, [...HK.map((h, i) => ['.k' + i, 300 + i * 550, 450, -14]), ...LW.map((w, i) => ['.w' + i, 3500 + i * 450])]); }
    },

    'j3-10:1': {
      alt: '히라가나와 닮은 가타카나 짝 か→カ, き→キ, へ→ヘ, り→リ, も→モ, や→ヤ와, ハ에 탁점을 붙이면 バ, 반탁점을 붙이면 パ가 되는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${PAIR.map(([h, k, s], i) => { const cx = 80 + (i % 3) * 160, y = 46 + Math.floor(i / 3) * 100; return `<g class="p${i}">
          ${BOX(cx - 70, y, 140, 86, { f: '#fff', s: LN, sw: 2, rx: 16 })}
          ${T(cx - 36, y + 54, h, { ja: 1, fs: 38, fw: 600 })}
          ${ARR(cx - 10, y + 40, cx + 10, y + 40, DG_C.sub, 2.5)}
          ${T(cx + 36, y + 54, k, { ja: 1, fs: 38, fw: 600, c: DG_C.d })}
          ${T(cx, y + 80, s, { fs: 18, c: DG_C.sub })}</g>`; }).join('')}
        ${[['゛', 'バ', '바', DG_C.c], ['゜', 'パ', '파', DG_C.r]].map(([m, r, s, c], i) => { const x0 = 24 + i * 232; return `<g class="d${i}">
          ${T(x0 + 22, 300, 'ハ', { ja: 1, fs: 34, fw: 600 })}${T(x0 + 56, 298, '+', { fs: 24, c: DG_C.sub })}
          ${BOX(x0 + 72, 262, 44, 48, { f: i ? GF : DG_C.a, rx: 10 })}${i ? `<circle cx="${x0 + 94}" cy="286" r="9" fill="none" stroke="${c}" stroke-width="4"/>` : `<path d="M${x0 + 86} 275 L${x0 + 91} 293 M${x0 + 99} 273 L${x0 + 104} 291" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/>`}
          ${ARR(x0 + 126, 288, x0 + 148, 288, DG_C.sub, 2.5)}
          ${T(x0 + 172, 300, r, { ja: 1, fs: 34, fw: 700, c })}${T(x0 + 210, 298, s, { fs: 20, c: DG_C.sub })}</g>`; }).join('')}
      </svg>`,
      play(el) { SEQ(el, 5200, [...PAIR.map((p, i) => ['.p' + i, 200 + i * 450, 450]), ['.d0', 3400], ['.d1', 4200]]); }
    },

    'j3-10:2': {
      alt: 'シ, ツ, ン, ソ의 획을 차례로 그리며, シ와 ン은 마지막 획을 아래에서 위로 올려 쓰고 ツ와 ソ는 위에서 아래로 내려 쓰는 방향을 화살표로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img">
        ${ST.map((s, i) => { const x = SX[i], col = s.up ? DG_C.d : DG_C.c; return `
          ${BOX(x - 52, 46, 104, 104, { f: LG, rx: 16 })}
          <g transform="translate(${x - 40},58)" fill="none" stroke-linecap="round" stroke-linejoin="round">
            ${s.dots.map((d, j) => `<path class="s${i}_${j}" d="${d}" pathLength="1" stroke="${DG_C.ink}" stroke-width="8"/>`).join('')}
            <path class="s${i}_l" d="${lastD(s.last)}" pathLength="1" stroke="${col}" stroke-width="8"/>
            <path class="h${i}" d="${headD(s.last)}" stroke="${col}" stroke-width="6"/>
          </g>
          <g class="lb${i}">${T(x - 14, 186, s.ch, { ja: 1, fs: 26, fw: 700 })}${T(x + 20, 186, s.k, { fs: 20, c: DG_C.sub })}
          ${T(x, 218, s.up ? '아래→위' : '위→아래', { fs: 18, fw: 800, c: col })}</g>`; }).join('')}
        <line x1="240" y1="52" x2="240" y2="222" stroke="#e5e5ea" stroke-width="2"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const draw = (p, f) => { p.setAttribute('stroke-dasharray', '1 1'); p.setAttribute('stroke-dashoffset', (1 - f).toFixed(3)); p.setAttribute('opacity', f > 0 ? 1 : 0); };
        dgAnim(el, 7000, e => {
          ST.forEach((s, i) => {
            let t = 300 + i * 1650;
            s.dots.forEach((d, j) => { draw(q(`.s${i}_${j}`), dgP(e, t, 250)); t += 330; });
            const f = dgP(e, t, 700);
            draw(q(`.s${i}_l`), dgEase(f));
            q('.h' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
            q('.lb' + i).setAttribute('opacity', dgP(e, t + 600, 300));
          });
        });
      }
    },

    'j3-10:3': {
      alt: 'ケ와 キ 사이에 긴소리 막대 ー가 들어가 ケーキ(케-키, 케이크)가 되고, ゲ와 ム 사이에 ー가 들어가 ゲーム(게-무, 게임)가 되면서 앞 소리가 길어지는 것을 소리 막대로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${LB.map((w, i) => { const y = 40 + i * 130; return `<g>
          ${BOX(24, y, 60, 60, { rx: 12 })}${T(54, y + 42, w.a, { ja: 1, fs: 34, fw: 700 })}
          <g class="bar${i}">${BOX(90, y, 60, 60, { f: DG_C.a, s: DG_C.c, rx: 12 })}${T(120, y + 42, 'ー', { ja: 1, fs: 34, fw: 700, c: DG_C.c })}</g>
          <g class="b${i}">${BOX(90, y, 60, 60, { rx: 12 })}${T(120, y + 42, w.b, { ja: 1, fs: 34, fw: 700 })}</g>
          <rect class="sa${i}" x="24" y="${y + 72}" width="60" height="12" rx="6" fill="${DG_C.d}"/>
          <rect class="sb${i}" x="90" y="${y + 72}" width="60" height="12" rx="6" fill="${DG_C.b}"/>
          <g class="rd${i}">${T(300, y + 36, w.rd, { fs: 24, fw: 800, c: DG_C.d })}${T(410, y + 36, w.m, { fs: 20, c: DG_C.sub })}</g>
        </g>`; }).join('')}
        ${T(300, 270, '소리를 길게!', { fs: 18, c: DG_C.c, cls: 'nt' })}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          LB.forEach((w, i) => {
            const st = 300 + i * 2300, f = dgEase(dgP(e, st + 700, 900));
            q('.b' + i).setAttribute('transform', `translate(${66 * f},0)`);
            q('.sb' + i).setAttribute('transform', `translate(${66 * f},0)`);
            const bar = q('.bar' + i); bar.setAttribute('opacity', f); bar.setAttribute("opacity", f);
            bar.setAttribute('transform', `translate(${120 - 120 * Math.max(f, .01)},0) scale(${Math.max(f, .01)},1)`);
            q('.sa' + i).setAttribute('width', 60 + 66 * f);
            q('.rd' + i).setAttribute('opacity', dgP(e, st + 1700, 400));
          });
          q('.nt').setAttribute('opacity', dgP(e, 4900, 400));
        });
      }
    },
  });
})();
