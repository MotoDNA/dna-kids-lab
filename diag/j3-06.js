/* 4학년 일본어 · 점 두 개와 동그라미 하나로 소리가 바뀐다고? (j3-06) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const card = (cx, y, s, ch, fill, st, cls = '') => `<rect x="${cx - s / 2}" y="${y}" width="${s}" height="${s}" rx="${s * .18}" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${JA} ${cls ? `class="${cls}"` : ''} x="${cx}" y="${y + s * .72}" text-anchor="middle" fill="${DG_C.ink}" font-size="${s * .62}" font-weight="600">${ch}</text>`;

  const P0 = [['か', 'が', '카', 'ga', '가'], ['さ', 'ざ', '사', 'za', '자'], ['た', 'だ', '타', 'da', '다'], ['は', 'ば', '하', 'ba', '바']];
  const T1 = [
    ['が행', ['が', '가'], ['ぎ', '기'], ['ぐ', '구'], ['げ', '게'], ['ご', '고']],
    ['ざ행', ['ざ', '자'], ['じ', '지'], ['ず', '즈'], ['ぜ', '제'], ['ぞ', '조']],
    ['だ행', ['だ', '다'], ['ぢ', '지'], ['づ', '즈'], ['で', '데'], ['ど', '도']],
    ['ば행', ['ば', '바'], ['び', '비'], ['ぶ', '부'], ['べ', '베'], ['ぼ', '보']],
  ];
  const PA = [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']];

  /* 3: 그림 */
  const ICON = {
    kaki: `<circle r="22" cy="4" fill="${DG_C.c}" stroke="#c96a00" stroke-width="3"/><path d="M-12 -16 L0 -10 L12 -16 L6 -20 L0 -18 L-6 -20 Z" fill="${DG_C.r}" stroke="${DG_C.r}" stroke-width="2.5" stroke-linejoin="round"/>`,
    kagi: `<circle cx="-14" r="13" fill="none" stroke="${DG_C.c}" stroke-width="5"/><path d="M-1 0 H28 M18 0 V10 M26 0 V8" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round"/>`,
    futa: `<rect x="-26" y="-8" width="52" height="16" rx="5" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/><rect x="-10" y="-16" width="20" height="9" rx="3" fill="${DG_C.d}"/><path d="M-20 14 h40" stroke="${DG_C.sub}" stroke-width="3" stroke-dasharray="4 4"/>`,
    buta: `<path d="M-22 -14 L-18 -26 L-8 -18 Z M22 -14 L18 -26 L8 -18 Z" fill="#ffb3c7" stroke="#e0607e" stroke-width="2.5" stroke-linejoin="round"/><circle r="22" fill="#ffd6e0" stroke="#e0607e" stroke-width="3"/><ellipse cy="6" rx="10" ry="7" fill="#ffb3c7" stroke="#e0607e" stroke-width="2.5"/><circle cx="-4" cy="6" r="2" fill="#e0607e"/><circle cx="4" cy="6" r="2" fill="#e0607e"/><circle cx="-9" cy="-7" r="2.5" fill="${DG_C.ink}"/><circle cx="9" cy="-7" r="2.5" fill="${DG_C.ink}"/>`,
  };
  const word = (x, y, chars, diff, col) => chars.map((k, i) => { const d = i === diff; return `<rect x="${x + i * 46}" y="${y}" width="42" height="50" rx="10" fill="${d ? (col === RED ? '#ffe5e3' : '#f5f5f7') : '#f5f5f7'}" stroke="${d ? col : '#d2d2d7'}" stroke-width="${d ? 3 : 2}"/>
    <text ${JA} x="${x + i * 46 + 21}" y="${y + 36}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="600">${k}</text>`; }).join('');

  Object.assign(DIAG, {
    'j3-06:0': {
      alt: 'か, さ, た, は 오른쪽 위에 점 두 개(탁점)를 붙이면 が(ga 가), ざ(za 자), だ(da 다), ば(ba 바)로 소리가 바뀌는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${P0.map((p, i) => { const x = 60 + i * 120; return `
          ${card(x, 0, 70, p[0], '#f5f5f7', '#d2d2d7')}
          <text x="${x}" y="96" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${p[2]}</text>
          <g class="dt${i}" fill="${DG_C.c}"><rect x="-8" y="-9" width="5" height="16" rx="2.5" transform="rotate(-20)"/><rect x="3" y="-9" width="5" height="16" rx="2.5" transform="rotate(-20)"/></g>
          <g class="v${i}"><path d="M${x} 108 v14 m-7 -7 l7 7 l7 -7" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          ${card(x, 132, 86, p[1], DG_C.b, DG_C.d)}
          <text x="${x}" y="248" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${p[3]} <tspan fill="${DG_C.ink}">${p[4]}</tspan></text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          P0.forEach((p, i) => {
            const x = 60 + i * 120, st = 300 + i * 1300;
            const f = dgEase(dgP(e, st, 700));
            // 점 두 개가 위쪽에서 날아와 카드 오른쪽 위에 붙어요
            const tx = x + 22 + 30 * (1 - f), ty = 14 - 30 * (1 - f);
            q('.dt' + i).setAttribute('transform', `translate(${tx},${ty})`);
            q('.dt' + i).setAttribute('opacity', e >= st ? 1 : 0);
            q('.v' + i).setAttribute('opacity', dgP(e, st + 800, 400));
          });
        });
      }
    },

    'j3-06:1': {
      alt: '탁음 네 줄 표: が행 가기구게고, ざ행 자지즈제조, だ행 다지즈데도, ば행 바비부베보. ぢ와 づ는 じ, ず와 소리가 같다는 것을 표시한 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img"><g transform="translate(0,42)">
        ${T1.map((r, j) => { const y = j * 62; return `<g class="r${j}"><text x="34" y="${y + 38}" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">${r[0]}</text>
          ${r.slice(1).map((c, i) => { const x = 108 + i * 76, sp = j === 2 && (i === 1 || i === 2); return `<rect x="${x - 34}" y="${y}" width="68" height="58" rx="11" fill="${sp ? '#fff' : DG_C.b}" fill-opacity="${sp ? 1 : .5}" ${sp ? `stroke="${RED}" stroke-width="2.5" stroke-dasharray="6 4"` : ''}/>
            <text ${JA} x="${x}" y="${y + 32}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="600">${c[0]}</text>
            <text x="${x}" y="${y + 53}" text-anchor="middle" fill="${sp ? RED : DG_C.sub}" font-size="18" font-weight="700">${c[1]}</text>`; }).join('')}</g>`; }).join('')}
        <g class="nt"><rect x="40" y="256" width="400" height="36" rx="18" fill="#ffe5e3"/>
          <text ${JA} x="240" y="281" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">ぢ = じ · づ = ず  <tspan fill="${DG_C.ink}" font-size="18">소리가 같아요</tspan></text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          T1.forEach((r, j) => q('.r' + j).setAttribute('opacity', dgP(e, 200 + j * 700, 500)));
          q('.nt').setAttribute('opacity', dgP(e, 3300, 600));
        });
      }
    },

    'j3-06:2': {
      alt: 'は(하)에 점 두 개를 붙이면 ば(바), 작은 동그라미(반탁점)를 붙이면 ぱ(파)가 되는 비교 그림과 반탁음 ぱ(pa) ぴ(pi) ぷ(pu) ぺ(pe) ぽ(po)',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${[['は', 'ha 하', '그대로', '#f5f5f7', '#d2d2d7', DG_C.sub], ['ば', 'ba 바', '゛ 점 두 개', DG_C.b, DG_C.d, DG_C.d], ['ぱ', 'pa 파', '゜ 동그라미', DG_C.a, DG_C.c, DG_C.c]].map((c, i) => { const x = 80 + i * 160; return `<g class="h${i}">
          ${card(x, 0, 84, c[0], c[3], c[4])}
          <text x="${x}" y="114" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${c[1]}</text>
          <text ${JA} x="${x}" y="140" text-anchor="middle" fill="${c[5]}" font-size="18" font-weight="800">${c[2]}</text></g>`; }).join('')}
        <g class="pr"><line x1="20" y1="160" x2="460" y2="160" stroke="#e5e5ea" stroke-width="2"/>
          <text x="20" y="190" fill="${DG_C.c}" font-size="20" font-weight="800">반탁음은 は행에만!</text>
          ${PA.map((c, i) => { const x = 64 + i * 88; return `<rect x="${x - 36}" y="202" width="72" height="66" rx="12" fill="${DG_C.a}" fill-opacity=".6"/>
            <text ${JA} x="${x}" y="238" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="600">${c[0]}</text>
            <text x="${x}" y="261" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">${c[1]}</text>`; }).join('')}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 200 + i * 900, 600));
            q('.h' + i).setAttribute('opacity', f);
            q('.h' + i).setAttribute('transform', `translate(${-20 * (1 - f)},0)`);
          });
          q('.pr').setAttribute('opacity', dgP(e, 3000, 700));
        });
      }
    },

    'j3-06:3': {
      alt: 'かき(감)와 かぎ(열쇠), ふた(뚜껑)와 ぶた(돼지)처럼 탁점 하나가 있고 없고에 따라 뜻이 완전히 달라지는 낱말 짝 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${[[['か', 'き'], ['か', 'ぎ'], 1, 'kaki', 'kagi', '감', '열쇠', '카키', '카기'], [['ふ', 'た'], ['ぶ', 'た'], 0, 'futa', 'buta', '뚜껑', '돼지', '후타', '부타']].map((r, j) => { const y = j * 124; return `<g class="p${j}">
          <g transform="translate(36,${y + 30})">${ICON[r[3]]}</g>
          ${word(76, y + 4, r[0], r[2], DG_C.sub)}
          <text x="122" y="${y + 84}" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">${r[7]} <tspan fill="${DG_C.sub}">${r[5]}</tspan></text>
          <text x="240" y="${y + 38}" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">↔</text>
          <g class="q${j}">${word(266, y + 4, r[1], r[2], RED)}
          <text x="312" y="${y + 84}" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">${r[8]} <tspan fill="${DG_C.sub}">${r[6]}</tspan></text>
          <g transform="translate(${j ? 436 : 432},${y + 30})">${ICON[r[4]]}</g></g></g>`; }).join('')}
        <line x1="20" y1="108" x2="460" y2="108" stroke="#e5e5ea" stroke-width="2"/>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1].forEach(j => {
            q('.p' + j).setAttribute('opacity', dgP(e, 200 + j * 2000, 500));
            const f = dgEase(dgP(e, 1100 + j * 2000, 600));
            q('.q' + j).setAttribute('opacity', f);
            q('.q' + j).setAttribute('transform', `translate(${20 * (1 - f)},0)`);
          });
        });
      }
    },
  });
})();
