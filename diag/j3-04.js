/* 3학년 일본어 · はな, ほし, みみ는 무슨 뜻일까? (j3-04) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const card = (cx, y, s, ch, fill, st) => `<rect x="${cx - s / 2}" y="${y}" width="${s}" height="${s}" rx="${s * .18}" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${JA} x="${cx}" y="${y + s * .72}" text-anchor="middle" fill="${DG_C.ink}" font-size="${s * .62}" font-weight="600">${ch}</text>`;
  const row = (L, hi) => L.map((c, i) => { const x = 48 + i * 96, h = hi.includes(i); return `<g class="c${i}">
    ${card(x, 0, 76, c[0], h ? DG_C.a : DG_C.b, h ? DG_C.c : DG_C.d)}
    <text x="${x}" y="106" text-anchor="middle" fill="${h ? DG_C.c : DG_C.d}" font-size="24" font-weight="800">${c[1]}</text>
    <text x="${x}" y="134" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="700">${c[2]}</text></g>`; }).join('');
  const rowPlay = (el, n, t0 = 200, gap = 450) => { const q = s => el.querySelector(s); return e => { for (let i = 0; i < n; i++) { const f = dgEase(dgP(e, t0 + i * gap, 450)); q('.c' + i).setAttribute('opacity', f); q('.c' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`); } }; };
  const chip = (x, y, w, k, s, m) => `<rect x="${x}" y="${y}" width="${w}" height="92" rx="16" fill="${DG_C.a}" fill-opacity=".55"/>
    <text ${JA} x="${x + w / 2}" y="${y + 38}" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">${k}</text>
    <text x="${x + w / 2}" y="${y + 66}" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">${s} <tspan fill="${DG_C.sub}" font-weight="700">${m}</tspan></text>`;

  const HA = [['は', 'ha', '하'], ['ひ', 'hi', '히'], ['ふ', 'fu', '후'], ['へ', 'he', '헤'], ['ほ', 'ho', '호']];
  const MA = [['ま', 'ma', '마'], ['み', 'mi', '미'], ['む', 'mu', '무'], ['め', 'me', '메'], ['も', 'mo', '모']];

  Object.assign(DIAG, {
    'j3-04:0': {
      alt: 'は행 は(ha 하) ひ(hi 히) ふ(fu 후) へ(he 헤) ほ(ho 호). ふ는 fu로 쓰지만 후 소리이고, 히라가나 へ와 가타카나 ヘ는 거의 똑같이 생겼다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${row(HA, [2])}
        <g class="b"><line x1="20" y1="152" x2="460" y2="152" stroke="#e5e5ea" stroke-width="2"/>
          ${card(62, 172, 76, 'へ', DG_C.b, DG_C.d)}${card(178, 172, 76, 'ヘ', GR, DG_C.r)}
          <text x="120" y="222" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">≈</text>
          <text x="62" y="272" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">히라가나</text>
          <text x="178" y="272" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="800">가타카나</text>
          <text ${JA} x="350" y="206" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">ふ <tspan fill="${DG_C.c}" font-size="24" font-weight="800">fu</tspan></text>
          <text x="350" y="240" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">입술 오므려 '후'</text>
          <text x="350" y="268" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">영어 f 아니에요</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = rowPlay(el, 5);
        dgAnim(el, 4400, e => { r(e); q('.b').setAttribute('opacity', dgP(e, 2800, 700)); });
      }
    },

    'j3-04:1': {
      alt: 'は와 ほ를 나란히 놓고, は는 오른쪽 위가 열려 있고 ほ는 오른쪽 위에 가로줄이 하나 더 있어 막혀 있다는 것을 빨간 동그라미로 표시한 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${card(130, 0, 150, 'は', '#f5f5f7', '#d2d2d7')}${card(350, 0, 150, 'ほ', '#f5f5f7', '#d2d2d7')}
        <circle class="o1" cx="${130 + 18}" cy="40" r="22" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-dasharray="6 6"/>
        <circle class="o2" cx="${350 + 18}" cy="40" r="22" fill="none" stroke="${RED}" stroke-width="4.5"/>
        <g class="t1"><text x="130" y="186" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">は <tspan fill="${DG_C.d}">하</tspan></text>
          <text x="130" y="216" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">위가 열려 있어요</text></g>
        <g class="t2"><text x="350" y="186" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">ほ <tspan fill="${RED}">호</tspan></text>
          <text x="350" y="216" text-anchor="middle" fill="${RED}" font-size="20" font-weight="700">가로줄 하나 더!</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4200, e => {
          q('.t1').setAttribute('opacity', dgP(e, 400, 500));
          q('.o1').setAttribute('opacity', dgP(e, 400, 500));
          const o = dgEase(dgP(e, 1600, 700));
          q('.o2').setAttribute('r', 22 * o); q('.o2').setAttribute('opacity', o > 0 ? 1 : 0);
          q('.t2').setAttribute('opacity', dgP(e, 2200, 500));
        });
      }
    },

    'j3-04:2': {
      alt: 'ま행 ま(ma 마) み(mi 미) む(mu 무) め(me 메) も(mo 모). 쌍둥이처럼 닮은 ぬ와 め 중 ぬ는 끝에 고리가 있고 め는 고리 없이 끝나며, め 한 글자는 눈이라는 뜻이라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${row(MA, [3])}
        <g class="cmp"><line x1="20" y1="152" x2="460" y2="152" stroke="#e5e5ea" stroke-width="2"/>
          ${card(70, 170, 92, 'ぬ', '#f5f5f7', '#d2d2d7')}${card(190, 170, 92, 'め', DG_C.a, DG_C.c)}
          <circle class="lp" cx="${70 + 18}" cy="${170 + 68}" r="14" fill="none" stroke="${RED}" stroke-width="4"/>
          <text x="70" y="290" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">고리 있음</text>
          <text x="190" y="290" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">고리 없음</text>
          <g class="eye"><path d="M300 216 Q356 168 412 216 Q356 262 300 216 Z" fill="#fff" stroke="${DG_C.ink}" stroke-width="3.5" stroke-linejoin="round"/>
            <circle cx="356" cy="216" r="16" fill="${DG_C.d}"/><circle cx="356" cy="216" r="6" fill="${DG_C.ink}"/>
            <text ${JA} x="356" y="288" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">め <tspan fill="${DG_C.sub}" font-size="20">= 눈</tspan></text></g></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = rowPlay(el, 5);
        dgAnim(el, 5400, e => {
          r(e);
          q('.cmp').setAttribute('opacity', dgP(e, 2600, 500));
          const l = dgEase(dgP(e, 3200, 600));
          q('.lp').setAttribute('r', 14 * l); q('.lp').setAttribute('opacity', l > 0 ? 1 : 0);
          q('.eye').setAttribute('opacity', dgP(e, 4300, 600));
        });
      }
    },

    'j3-04:3': {
      alt: 'はな(꽃)에서는 は를 하(ha)로 읽고, 인사말 こんにちは에서는 끝의 は를 와(wa)로 읽어 콘니치와가 된다는 것을 글자 아래 읽는 소리로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${['は', 'な'].map((k, i) => { const x = 40 + i * 64; return `<rect x="${x - 28}" y="0" width="56" height="62" rx="12" fill="${i ? '#f5f5f7' : DG_C.a}" stroke="${i ? '#d2d2d7' : DG_C.c}" stroke-width="2.5"/>
          <text ${JA} x="${x}" y="44" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="600">${k}</text>
          <text class="r0" x="${x}" y="92" text-anchor="middle" fill="${i ? DG_C.sub : DG_C.d}" font-size="22" font-weight="800">${i ? 'na' : 'ha'}</text>`; }).join('')}
        <g class="r0"><text x="160" y="40" fill="${DG_C.ink}" font-size="24" font-weight="800">하나</text>
          <text x="226" y="40" fill="${DG_C.sub}" font-size="20" font-weight="700">꽃</text>
          <text x="160" y="92" fill="${DG_C.d}" font-size="18" font-weight="800">は = '하'</text></g>
        <line x1="20" y1="118" x2="460" y2="118" stroke="#e5e5ea" stroke-width="2"/>
        ${['こ', 'ん', 'に', 'ち', 'は'].map((k, i) => { const x = 40 + i * 64, h = i === 4; return `<rect x="${x - 28}" y="136" width="56" height="62" rx="12" fill="${h ? DG_C.a : '#f5f5f7'}" stroke="${h ? DG_C.c : '#d2d2d7'}" stroke-width="2.5"/>
          <text ${JA} x="${x}" y="180" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="600">${k}</text>
          <text class="r1${h ? ' wa' : ''}" x="${x}" y="228" text-anchor="middle" fill="${h ? RED : DG_C.sub}" font-size="22" font-weight="800">${['ko', 'n', 'ni', 'chi', 'wa'][i]}</text>`; }).join('')}
        <g class="r1"><text x="352" y="176" fill="${DG_C.ink}" font-size="24" font-weight="800">콘니치와</text>
          <text x="352" y="228" fill="${RED}" font-size="18" font-weight="800">は = '와'</text></g>
      </g></svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 4800, e => {
          qa('.r0').forEach(t => t.setAttribute('opacity', dgP(e, 500, 600)));
          qa('.r1').forEach(t => t.setAttribute('opacity', dgP(e, 2000, 600)));
          qa('.wa').forEach(t => t.setAttribute('font-size', 22 + 8 * Math.sin(Math.PI * dgP(e, 2800, 700))));
        });
      }
    },
  });
})();
