/* 3학년 일본어 · すし, ねこ, いぬ를 히라가나로 읽어 볼까? (j3-03) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const card = (cx, y, s, ch, fill, st) => `<rect x="${cx - s / 2}" y="${y}" width="${s}" height="${s}" rx="${s * .18}" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${JA} x="${cx}" y="${y + s * .72}" text-anchor="middle" fill="${DG_C.ink}" font-size="${s * .62}" font-weight="600">${ch}</text>`;
  /* 다섯 글자 한 줄: 조심할 글자(hi)는 주황 */
  const row = (L, hi) => L.map((c, i) => { const x = 48 + i * 96, h = hi.includes(i); return `<g class="c${i}">
    ${card(x, 0, 76, c[0], h ? DG_C.a : DG_C.b, h ? DG_C.c : DG_C.d)}
    <text x="${x}" y="106" text-anchor="middle" fill="${h ? DG_C.c : DG_C.d}" font-size="24" font-weight="800">${c[1]}</text>
    <text x="${x}" y="134" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="700">${c[2]}</text></g>`; }).join('');
  const rowPlay = (el, n, t0 = 200, gap = 450) => { const q = s => el.querySelector(s); return e => { for (let i = 0; i < n; i++) { const f = dgEase(dgP(e, t0 + i * gap, 450)); q('.c' + i).setAttribute('opacity', f); q('.c' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`); } }; };
  const chip = (x, y, w, k, s, m) => `<rect x="${x}" y="${y}" width="${w}" height="92" rx="16" fill="${DG_C.a}" fill-opacity=".55"/>
    <text ${JA} x="${x + w / 2}" y="${y + 38}" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">${k}</text>
    <text x="${x + w / 2}" y="${y + 66}" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">${s} <tspan fill="${DG_C.sub}" font-weight="700">${m}</tspan></text>`;
  const fish = `<path d="M-30 0 C-18 -18 14 -18 24 0 C14 18 -18 18 -30 0 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><path d="M22 0 L38 -14 V14 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="-16" cy="-3" r="3.5" fill="${DG_C.ink}"/>`;

  const SA = [['さ', 'sa', '사'], ['し', 'shi', '시'], ['す', 'su', '스'], ['せ', 'se', '세'], ['そ', 'so', '소']];
  const TA = [['た', 'ta', '타'], ['ち', 'chi', '치'], ['つ', 'tsu', '츠'], ['て', 'te', '테'], ['と', 'to', '토']];
  const NA = [['な', 'na', '나'], ['に', 'ni', '니'], ['ぬ', 'nu', '누'], ['ね', 'ne', '네'], ['の', 'no', '노']];

  Object.assign(DIAG, {
    'j3-03:0': {
      alt: 'さ행 다섯 글자 さ(sa 사) し(shi 시) す(su 스) せ(se 세) そ(so 소). し는 si가 아니라 shi로 쓰고, す는 스에 가깝게 읽어요. 낱말 すし(스시) 초밥, いす(이스) 의자, うし(우시) 소',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${row(SA, [1, 2])}
        <g class="nt"><text x="144" y="160" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">si <tspan fill="${RED}">✕</tspan></text>
          <text x="240" y="160" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">수 <tspan fill="${RED}">✕</tspan></text></g>
        <g class="wd">${chip(14, 182, 140, 'すし', '스시', '초밥')}${chip(170, 182, 140, 'いす', '이스', '의자')}${chip(326, 182, 140, 'うし', '우시', '소')}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = rowPlay(el, 5);
        dgAnim(el, 4600, e => { r(e); q('.nt').setAttribute('opacity', dgP(e, 2600, 500)); q('.wd').setAttribute('opacity', dgP(e, 3500, 600)); });
      }
    },

    'j3-03:1': {
      alt: 'た행 た(ta 타) ち(chi 치) つ(tsu 츠) て(te 테) と(to 토)에서 ち와 つ를 조심하고, 거울에 비친 듯 닮은 さ와 ち는 아랫부분이 さ는 왼쪽으로, ち는 오른쪽으로 둥글다는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 350" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${row(TA, [1, 2])}
        <g class="mr"><line x1="20" y1="152" x2="460" y2="152" stroke="#e5e5ea" stroke-width="2"/>
          ${card(150, 168, 96, 'さ', '#f5f5f7', '#d2d2d7')}${card(330, 168, 96, 'ち', '#f5f5f7', '#d2d2d7')}
          <line x1="240" y1="166" x2="240" y2="268" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="6 6"/>
          <text x="240" y="292" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">거울 모양</text>
          <g class="ar"><path d="M76 248 h-26 m10 -10 l-10 10 l10 10" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="64" y="226" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">c처럼</text>
            <path d="M404 248 h26 m-10 -10 l10 10 l-10 10" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="416" y="226" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">5처럼</text>
            <text x="150" y="292" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">사</text>
            <text x="330" y="292" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">치</text></g></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = rowPlay(el, 5);
        dgAnim(el, 5200, e => { r(e); q('.mr').setAttribute('opacity', dgP(e, 2600, 600)); q('.ar').setAttribute('opacity', dgP(e, 3800, 600)); });
      }
    },

    'j3-03:2': {
      alt: 'な행 な(na 나) に(ni 니) ぬ(nu 누) ね(ne 네) の(no 노). ぬ와 ね는 둘 다 끝에 작은 고리가 있지만 ね는 왼쪽에 세로 막대가 있다는 것을 표시한 그림',
      svg: `<svg viewBox="0 0 480 360" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${row(NA, [2, 3])}
        <g class="cmp"><line x1="20" y1="152" x2="460" y2="152" stroke="#e5e5ea" stroke-width="2"/>
          ${card(130, 168, 100, 'ぬ', '#f5f5f7', '#d2d2d7')}${card(300, 168, 100, 'ね', '#f5f5f7', '#d2d2d7')}
          <circle class="lp" cx="${130 + 20}" cy="${168 + 74}" r="15" fill="none" stroke="${RED}" stroke-width="4"/>
          <circle class="lp" cx="${300 + 24}" cy="${168 + 74}" r="15" fill="none" stroke="${RED}" stroke-width="4"/>
          <rect class="bar" x="${300 - 36}" y="${168 + 12}" width="22" height="76" rx="10" fill="none" stroke="${DG_C.d}" stroke-width="4"/>
          <text class="lpt" x="215" y="298" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">둘 다 끝에 고리</text>
          <text class="bart" x="368" y="200" fill="${DG_C.d}" font-size="18" font-weight="800">ね는</text>
          <text class="bart" x="368" y="224" fill="${DG_C.d}" font-size="18" font-weight="800">왼쪽 막대</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)], r = rowPlay(el, 5);
        dgAnim(el, 5400, e => {
          r(e);
          q('.cmp').setAttribute('opacity', dgP(e, 2600, 500));
          const l = dgEase(dgP(e, 3200, 600));
          qa('.lp').forEach(c => { c.setAttribute('r', 15 * l); c.setAttribute('opacity', l > 0 ? 1 : 0); });
          qa('.lpt').forEach(t => t.setAttribute('opacity', l));
          const b = dgP(e, 4200, 500);
          qa('.bar,.bart').forEach(t => t.setAttribute('opacity', b));
        });
      }
    },

    'j3-03:3': {
      alt: 'さ(사) + か(카) + な(나)를 이어 읽으면 さかな(사카나), 뜻은 물고기가 되는 그림과 つくえ(츠쿠에) 책상, かさ(카사) 우산 낱말 카드',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${[['さ', '사'], ['か', '카'], ['な', '나']].map((c, i) => { const x = 38 + i * 84; return `<g class="p${i}">${card(x, 0, 60, c[0], DG_C.b, DG_C.d)}
          <text x="${x}" y="90" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${c[1]}</text>
          ${i ? `<text x="${x - 42}" y="38" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="700">+</text>` : ''}</g>`; }).join('')}
        <g class="res"><text x="250" y="40" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text>
          <text ${JA} x="268" y="46" fill="${DG_C.ink}" font-size="32" font-weight="700">さかな</text>
          <text x="316" y="90" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">사카나</text>
          <g transform="translate(432,30)">${fish}</g>
          <text x="432" y="90" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">물고기</text></g>
        <line x1="20" y1="114" x2="460" y2="114" stroke="#e5e5ea" stroke-width="2"/>
        <g class="w">${chip(40, 132, 186, 'つくえ', '츠쿠에', '책상')}${chip(254, 132, 186, 'かさ', '카사', '우산')}</g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1, 2].forEach(i => q('.p' + i).setAttribute('opacity', dgP(e, 200 + i * 600, 400)));
          q('.res').setAttribute('opacity', dgP(e, 2200, 600));
          q('.w').setAttribute('opacity', dgP(e, 3400, 600));
        });
      }
    },
  });
})();
