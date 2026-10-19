/* 3학년 일본어 · あいうえお, かきくけこ는 어떻게 읽을까? (j3-02) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const A = [['あ', 'a', '아'], ['い', 'i', '이'], ['う', 'u', '우'], ['え', 'e', '에'], ['お', 'o', '오']];
  const K = [['か', 'ka', '카'], ['き', 'ki', '키'], ['く', 'ku', '쿠'], ['け', 'ke', '케'], ['こ', 'ko', '코']];
  const card = (cx, y, s, ch, fill, st) => `<rect x="${cx - s / 2}" y="${y}" width="${s}" height="${s}" rx="${s * .18}" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${JA} x="${cx}" y="${y + s * .72}" text-anchor="middle" fill="${DG_C.ink}" font-size="${s * .62}" font-weight="600">${ch}</text>`;
  const house = `<path d="M-28 0 L0 -24 L28 0" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="-20" y="-2" width="40" height="28" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5"/><rect x="-6" y="10" width="12" height="16" fill="${DG_C.c}"/>`;
  const W3 = [['かお', '카오', '얼굴'], ['あか', '아카', '빨강'], ['いか', '이카', '오징어'], ['あき', '아키', '가을']];

  Object.assign(DIAG, {
    'j3-02:0': {
      alt: '히라가나 あ(a, 아), い(i, 이), う(u, 우), え(e, 에), お(o, 오) 다섯 장의 카드를 왼쪽부터 순서대로 짚으며 읽는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${A.map((c, i) => { const x = 48 + i * 96; return `<g class="c${i}">${card(x, 0, 80, c[0], DG_C.b, DG_C.d)}
          <text x="${x}" y="112" text-anchor="middle" fill="${DG_C.d}" font-size="24" font-weight="800">${c[1]}</text>
          <text x="${x}" y="142" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="700">${c[2]}</text></g>`; }).join('')}
        <rect class="ring" x="0" y="-6" width="92" height="156" rx="20" fill="none" stroke="${DG_C.c}" stroke-width="4"/>
        <g class="ord"><line x1="40" y1="176" x2="430" y2="176" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>
          <path d="M422 168 l10 8 l-10 8" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="240" y="204" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">아 · 이 · 우 · 에 · 오 순서로!</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          A.forEach((c, i) => q('.c' + i).setAttribute('opacity', e > 300 + i * 900 ? 1 : .25));
          const k = Math.min(4, Math.max(0, Math.floor((e - 300) / 900)));
          q('.ring').setAttribute('x', 48 + k * 96 - 46);
          q('.ring').setAttribute('opacity', e > 300 && e < 5000 ? 1 : 0);
          q('.ord').setAttribute('opacity', dgP(e, 5000, 600));
        });
      }
    },

    'j3-02:1': {
      alt: 'あいうえお 줄 아래에 k 소리를 붙인 かきくけこ 줄이 표처럼 나란히 놓인 그림: k+a=か(ka), k+i=き(ki), k+u=く(ku), k+e=け(ke), k+o=こ(ko)',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${A.map((c, i) => { const x = 116 + i * 76; return `<text x="${x}" y="20" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="800">${c[1]}</text>`; }).join('')}
        <text x="40" y="76" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">あ행</text>
        ${A.map((c, i) => { const x = 116 + i * 76; return `<rect x="${x - 34}" y="34" width="68" height="76" rx="12" fill="${DG_C.b}" fill-opacity=".5"/>
          <text ${JA} x="${x}" y="80" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="600">${c[0]}</text>
          <text x="${x}" y="102" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${c[2]}</text>`; }).join('')}
        <g class="kl"><text x="40" y="162" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">か행</text>
          <rect x="16" y="176" width="48" height="34" rx="17" fill="${DG_C.a}"/>
          <text x="40" y="200" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">k +</text></g>
        ${K.map((c, i) => { const x = 116 + i * 76; return `<g class="k${i}">
          <path d="M${x} 114 v8" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>
          <rect x="${x - 34}" y="126" width="68" height="100" rx="12" fill="${DG_C.a}" fill-opacity=".6"/>
          <text ${JA} x="${x}" y="172" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="600">${c[0]}</text>
          <text x="${x}" y="196" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">${c[1]}</text>
          <text x="${x}" y="218" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${c[2]}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          q('.kl').setAttribute('opacity', dgP(e, 400, 500));
          K.forEach((c, i) => {
            const f = dgEase(dgP(e, 1200 + i * 750, 600));
            q('.k' + i).setAttribute('opacity', f);
            q('.k' + i).setAttribute('transform', `translate(0,${-24 * (1 - f)})`);
          });
        });
      }
    },

    'j3-02:2': {
      alt: 'あ와 お를 나란히 놓고 お의 오른쪽 위 작은 점에 빨간 동그라미를 친 그림, 그리고 い는 세로 두 줄(서 있어요), こ는 가로 두 줄(누워 있어요)이라는 것을 화살표로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${[['あ', '아', 64], ['お', '오', 170], ['い', '이', 310], ['こ', '코', 416]].map(([k, s, x]) => `${card(x, 0, 92, k, '#f5f5f7', '#d2d2d7')}
          <text x="${x}" y="126" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">${s}</text>`).join('')}
        <line x1="240" y1="0" x2="240" y2="230" stroke="#e5e5ea" stroke-width="2"/>
        <circle class="dot" cx="191" cy="27" r="13" fill="none" stroke="${RED}" stroke-width="4"/>
        <g class="dotl"><text x="117" y="170" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">점이 있으면 お</text></g>
        <g class="io">
          <g stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round" fill="none"><line x1="310" y1="150" x2="310" y2="196"/><path d="M302 158 l8 -8 l8 8 M302 188 l8 8 l8 -8"/></g>
          <g stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" fill="none"><line x1="392" y1="173" x2="440" y2="173"/><path d="M400 165 l-8 8 l8 8 M432 165 l8 8 l-8 8"/></g>
          <text x="310" y="226" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">서 있어요</text>
          <text x="416" y="226" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">누워 있어요</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          const d = dgEase(dgP(e, 600, 700));
          q('.dot').setAttribute('r', 13 * d); q('.dot').setAttribute('opacity', d > 0 ? 1 : 0);
          q('.dotl').setAttribute('opacity', dgP(e, 1300, 500));
          q('.io').setAttribute('opacity', dgP(e, 2500, 700));
        });
      }
    },

    'j3-02:3': {
      alt: 'い(이)와 え(에)를 이어 읽으면 いえ(이에), 뜻은 집이 되는 그림과 かお 얼굴, あか 빨강, いか 오징어, あき 가을 낱말 카드',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        <g class="p0">${card(50, 0, 72, 'い', DG_C.b, DG_C.d)}<text x="50" y="98" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">이</text></g>
        <text class="p1" x="108" y="46" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">+</text>
        <g class="p1">${card(166, 0, 72, 'え', DG_C.b, DG_C.d)}<text x="166" y="98" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">에</text></g>
        <g class="p2"><text x="226" y="46" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">→</text>
          <text ${JA} x="250" y="54" fill="${DG_C.ink}" font-size="44" font-weight="700">いえ</text>
          <text x="294" y="98" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">이에</text>
          <g transform="translate(400,30)">${house}</g>
          <text x="400" y="98" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">집</text></g>
        <line x1="20" y1="122" x2="460" y2="122" stroke="#e5e5ea" stroke-width="2"/>
        ${W3.map((w, i) => { const x = 14 + i * 116; return `<g class="w${i}">
          <rect x="${x}" y="138" width="104" height="104" rx="16" fill="${DG_C.a}" fill-opacity=".55"/>
          <text ${JA} x="${x + 52}" y="180" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">${w[0]}</text>
          <text x="${x + 52}" y="206" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">${w[1]}</text>
          <text x="${x + 52}" y="230" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${w[2]}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5600, e => {
          qa('.p0').forEach(g => g.setAttribute('opacity', dgP(e, 200, 400)));
          qa('.p1').forEach(g => g.setAttribute('opacity', dgP(e, 900, 400)));
          qa('.p2').forEach(g => g.setAttribute('opacity', dgP(e, 1700, 600)));
          W3.forEach((w, i) => qa('.w' + i).forEach(g => g.setAttribute('opacity', dgP(e, 3000 + i * 500, 400))));
        });
      }
    },
  });
})();
