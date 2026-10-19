/* 3학년 일본어 · 히라가나 마지막 글자 ん까지 다 읽어 볼까? (j3-05) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const card = (cx, y, s, ch, fill, st) => `<rect x="${cx - s / 2}" y="${y}" width="${s}" height="${s}" rx="${s * .18}" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${JA} x="${cx}" y="${y + s * .72}" text-anchor="middle" fill="${DG_C.ink}" font-size="${s * .62}" font-weight="600">${ch}</text>`;
  const chip = (x, y, w, k, s, m) => `<rect x="${x}" y="${y}" width="${w}" height="92" rx="16" fill="${DG_C.a}" fill-opacity=".55"/>
    <text ${JA} x="${x + w / 2}" y="${y + 38}" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">${k}</text>
    <text x="${x + w / 2}" y="${y + 66}" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">${s} <tspan fill="${DG_C.sub}" font-weight="700">${m}</tspan></text>`;
  const book = `<path d="M0 -12 C-10 -18 -20 -18 -28 -14 V18 C-20 14 -10 14 0 20 C10 14 20 14 28 18 V-14 C20 -18 10 -18 0 -12 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><line x1="0" y1="-12" x2="0" y2="20" stroke="${DG_C.d}" stroke-width="3"/>`;

  /* 3: 오십음도 (열: あ か さ た な は ま や ら わ ん / 행: a i u e o) */
  const G = ['あいうえお', 'かきくけこ', 'さしすせそ', 'たちつてと', 'なにぬねの', 'はひふへほ', 'まみむめも', 'や ゆ よ', 'らりるれろ', 'わ   を', 'ん    '];
  const GX = i => 26 + i * 43, GY = j => 52 + j * 46;

  /* 1: 닮은 글자 끝 표시 (글자 크기 80 카드 기준, 카드 가운데 x 에서의 위치) */
  const R1 = [
    { k: 'る', t: '고리', col: RED, dx: 9, dy: 56 },
    { k: 'ろ', t: '없음', col: DG_C.sub, dx: 9, dy: 56, dash: 1 },
    { k: 'れ', t: '툭', col: DG_C.r, dx: 20, dy: 54 },
    { k: 'わ', t: '둥글게', col: DG_C.d, dx: 16, dy: 36 },
    { k: 'ね', t: '고리', col: DG_C.c, dx: 16, dy: 54 },
  ];
  const RX = [50, 134, 248, 340, 432];

  Object.assign(DIAG, {
    'j3-05:0': {
      alt: '오십음도 표에서 ま행(まみむめも) 아래 や행은 や(ya) ゆ(yu) よ(yo) 세 글자뿐이고 い 자리와 え 자리가 비어 있는 그림. 낱말 やま 산, ゆき 눈, よる 밤',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${['a', 'i', 'u', 'e', 'o'].map((v, i) => `<text x="${116 + i * 76}" y="18" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">${v}</text>`).join('')}
        <text x="40" y="66" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">ま행</text>
        <text x="40" y="142" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">や행</text>
        ${[...'まみむめも'].map((k, i) => { const x = 116 + i * 76; return `<rect x="${x - 34}" y="30" width="68" height="60" rx="12" fill="#f5f5f7"/>
          <text ${JA} x="${x}" y="72" text-anchor="middle" fill="${DG_C.sub}" font-size="32" font-weight="600">${k}</text>`; }).join('')}
        ${[['や', 'ya'], null, ['ゆ', 'yu'], null, ['よ', 'yo']].map((c, i) => { const x = 116 + i * 76; return c ? `<g class="y${i}"><rect x="${x - 34}" y="104" width="68" height="76" rx="12" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/>
          <text ${JA} x="${x}" y="148" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="600">${c[0]}</text>
          <text x="${x}" y="172" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">${c[1]}</text></g>`
          : `<g class="e${i}"><rect x="${x - 34}" y="104" width="68" height="76" rx="12" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="6 5"/>
          <text x="${x}" y="150" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">빈칸</text></g>`; }).join('')}
        <g class="w">${chip(14, 198, 140, 'やま', '야마', '산')}${chip(170, 198, 140, 'ゆき', '유키', '눈')}${chip(326, 198, 140, 'よる', '요루', '밤')}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 2, 4].forEach((i, n) => q('.y' + i).setAttribute('opacity', dgP(e, 300 + n * 600, 400)));
          [1, 3].forEach(i => q('.e' + i).setAttribute('opacity', dgP(e, 2300, 500)));
          q('.w').setAttribute('opacity', dgP(e, 3400, 600));
        });
      }
    },

    'j3-05:1': {
      alt: 'る는 아래에 작은 고리가 있고 ろ는 고리 없이 끝나며, 왼쪽에 세로 막대가 있는 れ·わ·ね는 끝이 れ는 바깥으로 툭, わ는 둥글게, ね는 작은 고리로 끝난다는 것을 동그라미로 표시한 그림. 낱말 りす 다람쥐, さる 원숭이, そら 하늘',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${R1.map((c, i) => `${card(RX[i], 0, 72, c.k, '#f5f5f7', '#d2d2d7')}
          <circle class="o${i}" cx="${RX[i] + c.dx}" cy="${c.dy}" r="13" fill="none" stroke="${c.col}" stroke-width="4" ${c.dash ? 'stroke-dasharray="5 5"' : ''}/>
          <text class="t${i}" x="${RX[i]}" y="100" text-anchor="middle" fill="${c.col}" font-size="18" font-weight="800">${c.t}</text>`).join('')}
        <text x="92" y="132" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">ru · ro</text>
        <text x="340" y="132" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="700">re · wa · ne</text>
        <line x1="191" y1="0" x2="191" y2="140" stroke="#e5e5ea" stroke-width="2"/>
        <g class="w">${chip(14, 166, 140, 'りす', '리스', '다람쥐')}${chip(170, 166, 140, 'さる', '사루', '원숭이')}${chip(326, 166, 140, 'そら', '소라', '하늘')}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          R1.forEach((c, i) => {
            const f = dgEase(dgP(e, 400 + i * 700, 500));
            q('.o' + i).setAttribute('r', 13 * f); q('.o' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            q('.t' + i).setAttribute('opacity', f);
          });
          q('.w').setAttribute('opacity', dgP(e, 4300, 600));
        });
      }
    },

    'j3-05:2': {
      alt: 'ほ(호) 뒤에 ん이 받침처럼 붙어 ほん(홍, 책)이 되는 그림과, 문장 ほんを よみます(책을 읽어요)에서 を(o)가 ~을/를 자리에 쓰인다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,44)">
        <g class="h">${card(48, 0, 72, 'ほ', DG_C.b, DG_C.d)}<text x="48" y="100" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">호</text></g>
        <text class="n" x="106" y="46" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">+</text>
        <g class="n">${card(164, 0, 72, 'ん', DG_C.a, DG_C.c)}<text x="164" y="100" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">받침처럼</text></g>
        <g class="r"><text x="226" y="46" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">→</text>
          <text ${JA} x="250" y="52" fill="${DG_C.ink}" font-size="40" font-weight="700">ほん</text>
          <text x="292" y="100" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">hon 홍</text>
          <g transform="translate(410,30)">${book}</g>
          <text x="410" y="100" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">책</text></g>
        <line x1="20" y1="122" x2="460" y2="122" stroke="#e5e5ea" stroke-width="2"/>
        <g class="s">${[['ほ', 'ho'], ['ん', 'n'], 0, ['を', 'o'], 0, ['よ', 'yo'], ['み', 'mi'], ['ま', 'ma'], ['す', 'su']].reduce((a, c) => { if (!c) { a.x += 14; return a; } const o = c[0] === 'を';
          a.s += `<rect x="${a.x}" y="140" width="46" height="56" rx="10" fill="${o ? DG_C.a : '#f5f5f7'}" stroke="${o ? DG_C.c : '#d2d2d7'}" stroke-width="2.5"/>
            <text ${JA} x="${a.x + 23}" y="180" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="600">${c[0]}</text>
            <text x="${a.x + 23}" y="222" text-anchor="middle" fill="${o ? DG_C.c : DG_C.sub}" font-size="18" font-weight="800">${c[1]}</text>`; a.x += 50; return a; }, { x: 53, s: '' }).s}
          <text x="190" y="248" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">~을</text></g>
      </g></svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5200, e => {
          qa('.h').forEach(g => g.setAttribute('opacity', dgP(e, 200, 400)));
          qa('.n').forEach(g => g.setAttribute('opacity', dgP(e, 900, 400)));
          qa('.r').forEach(g => g.setAttribute('opacity', dgP(e, 1800, 600)));
          qa('.s').forEach(g => g.setAttribute('opacity', dgP(e, 3200, 700)));
        });
      }
    },

    'j3-05:3': {
      alt: '히라가나 오십음도 표: あ행부터 わ행까지 열 줄과 마지막 글자 ん까지 모두 46글자가 한 줄씩 채워지는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,20)">
        <text x="6" y="24" fill="${DG_C.ink}" font-size="22" font-weight="800">히라가나 <tspan class="cnt" fill="${DG_C.d}">46</tspan>글자</text>
        ${G.map((col, i) => `<g class="g${i}">${[...col].map((k, j) => k === ' ' ? '' : `<rect x="${GX(i) - 20}" y="${GY(j) - 20}" width="40" height="42" rx="9" fill="${i === 10 ? DG_C.a : i % 2 ? '#f5f5f7' : DG_C.b}" ${i % 2 ? '' : 'fill-opacity=".55"'}/>
          <text ${JA} x="${GX(i)}" y="${GY(j) + 10}" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="600">${k}</text>`).join('')}</g>`).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          let n = 0;
          G.forEach((col, i) => {
            const f = dgP(e, 300 + i * 450, 350);
            q('.g' + i).setAttribute('opacity', f);
            if (f > 0) n += col.replace(/ /g, '').length;
          });
          q('.cnt').textContent = n;
        });
      }
    },
  });
})();
