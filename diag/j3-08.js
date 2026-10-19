/* 4학년 일본어 · いち, に, さん! 일본어로 10까지 세어 볼까? (j3-08) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const N0 = [[1, 'いち', '이치'], [2, 'に', '니'], [3, 'さん', '상'], [4, 'よん', '욘'], [5, 'ご', '고']];
  const N1 = [[6, 'ろく', '로쿠'], [7, 'なな', '나나'], [8, 'はち', '하치'], [9, 'きゅう', '큐-'], [10, 'じゅう', '주-']];
  const N2 = [[4, 'よん', '욘', 'し', '시'], [7, 'なな', '나나', 'しち', '시치'], [9, 'きゅう', '큐-', 'く', '쿠']];
  const dots = (cx, y, n) => { let s = ''; for (let i = 0; i < n; i++) s += `<circle cx="${cx - (n - 1) * 8 + i * 16}" cy="${y}" r="6" fill="${DG_C.c}"/>`; return s; };
  const apple = (x, y) => `<g transform="translate(${x},${y})"><path d="M0 -10 C-6 -16 -17 -13 -16 0 C-15 12 -7 17 0 14 C7 17 15 12 16 0 C17 -13 6 -16 0 -10 Z" fill="${RED}"/><path d="M0 -10 v-7" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linecap="round"/><path d="M1 -15 q6 -6 11 -3 q-5 5 -11 3 Z" fill="${DG_C.r}"/></g>`;
  /* 숫자 줄: 숫자 / 가나 / 소리 */
  const nrow = (L, hot) => L.map((c, i) => { const x = 48 + i * 96, h = hot && hot.includes(i); return `<g class="n${i}">
    <rect x="${x - 44}" y="0" width="88" height="138" rx="16" fill="${h ? DG_C.a : DG_C.b}" fill-opacity=".5"/>
    <text x="${x}" y="46" text-anchor="middle" fill="${h ? DG_C.c : DG_C.d}" font-size="40" font-weight="800">${c[0]}</text>
    <text ${JA} x="${x}" y="92" text-anchor="middle" fill="${DG_C.ink}" font-size="${c[1].length > 2 ? 24 : 28}" font-weight="700">${c[1]}</text>
    <text x="${x}" y="124" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${c[2]}</text></g>`; }).join('');
  const rowPlay = (el, n, t0 = 200, gap = 550) => { const q = s => el.querySelector(s); return e => { for (let i = 0; i < n; i++) { const f = dgEase(dgP(e, t0 + i * gap, 450)); q('.n' + i).setAttribute('opacity', f); q('.n' + i).setAttribute('transform', `translate(0,${-14 * (1 - f)})`); } }; };

  Object.assign(DIAG, {
    'j3-08:0': {
      alt: '숫자 1부터 5까지 점을 하나씩 늘려 세며 いち(이치), に(니), さん(상), よん(욘), ご(고)로 읽는 그림',
      svg: `<svg viewBox="0 0 480 250" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${nrow(N0)}
        ${N0.map((c, i) => `<g class="d${i}">${dots(48 + i * 96, 168, c[0])}</g>`).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = rowPlay(el, 5, 200, 800);
        dgAnim(el, 4800, e => { r(e); N0.forEach((c, i) => q('.d' + i).setAttribute('opacity', dgP(e, 400 + i * 800, 400))); });
      }
    },

    'j3-08:1': {
      alt: '숫자 6부터 10까지 ろく(로쿠), なな(나나), はち(하치), きゅう(큐-), じゅう(주-). 큰 き(키)에 작은 ゅ가 붙으면 한 소리 큐가 되고, 끝의 う가 길게 늘여 큐-가 되는 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${nrow(N1, [3, 4])}
        <g class="ky"><line x1="20" y1="156" x2="460" y2="156" stroke="#e5e5ea" stroke-width="2"/>
          <rect x="16" y="174" width="72" height="72" rx="14" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/>
          <text ${JA} x="52" y="226" text-anchor="middle" fill="${DG_C.ink}" font-size="44" font-weight="600">き</text>
          <text x="52" y="272" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">키</text>
          <text x="106" y="222" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>
          <g class="yu"><rect x="124" y="198" width="48" height="48" rx="10" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>
            <text ${JA} x="148" y="232" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="600">ゅ</text>
            <text x="148" y="272" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">작은 유</text></g></g>
        <g class="kyu"><text x="194" y="222" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text>
          <text ${JA} x="214" y="226" fill="${DG_C.ink}" font-size="40" font-weight="700">きゅ</text>
          <text x="250" y="272" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">큐</text></g>
        <g class="kyuu"><text x="314" y="222" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text>
          <text ${JA} x="334" y="226" fill="${DG_C.ink}" font-size="40" font-weight="700">きゅう</text>
          <text x="394" y="272" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">큐- <tspan fill="${DG_C.sub}" font-size="18" font-weight="700">길게</tspan></text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = rowPlay(el, 5, 200, 450);
        dgAnim(el, 6000, e => {
          r(e);
          q('.ky').setAttribute('opacity', dgP(e, 2600, 500));
          const y = dgEase(dgP(e, 2900, 600));
          q('.yu').setAttribute('transform', `translate(0,${-30 * (1 - y)})`);
          q('.kyu').setAttribute('opacity', dgP(e, 3800, 500));
          q('.kyuu').setAttribute('opacity', dgP(e, 4800, 500));
        });
      }
    },

    'j3-08:2': {
      alt: '읽는 법이 두 가지인 숫자: 4는 よん(욘) 또는 し(시), 7은 なな(나나) 또는 しち(시치), 9는 きゅう(큐-) 또는 く(쿠). 수를 셀 때는 よん, なな, きゅう를 더 많이 써요',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${N2.map((c, i) => { const x = 80 + i * 160; return `
          <rect x="${x - 40}" y="0" width="80" height="80" rx="16" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
          <text x="${x}" y="58" text-anchor="middle" fill="${DG_C.ink}" font-size="48" font-weight="800">${c[0]}</text>
          <g class="m${i}"><path d="M${x - 30} 86 l-16 20 M${x + 30} 86 l16 20" stroke="#d2d2d7" stroke-width="3" stroke-linecap="round"/>
            <rect x="${x - 74}" y="110" width="70" height="92" rx="14" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
            <text ${JA} x="${x - 39}" y="148" text-anchor="middle" fill="${DG_C.ink}" font-size="${c[1].length > 2 ? 20 : 24}" font-weight="700">${c[1]}</text>
            <text x="${x - 39}" y="180" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">${c[2]}</text></g>
          <g class="o${i}"><rect x="${x + 4}" y="110" width="70" height="92" rx="14" fill="#fff" stroke="#d2d2d7" stroke-width="2" stroke-dasharray="6 5"/>
            <text ${JA} x="${x + 39}" y="148" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">${c[3]}</text>
            <text x="${x + 39}" y="180" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${c[4]}</text></g>`; }).join('')}
        <g class="lg"><rect x="60" y="216" width="22" height="22" rx="6" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/>
          <text x="90" y="234" fill="${DG_C.d}" font-size="18" font-weight="800">셀 때 많이 써요</text>
          <rect x="268" y="216" width="22" height="22" rx="6" fill="#fff" stroke="#d2d2d7" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="298" y="234" fill="${DG_C.sub}" font-size="18" font-weight="700">다른 읽는 법</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          N2.forEach((c, i) => {
            q('.m' + i).setAttribute('opacity', dgP(e, 400 + i * 1000, 500));
            q('.o' + i).setAttribute('opacity', dgP(e, 800 + i * 1000, 500));
          });
          q('.lg').setAttribute('opacity', dgP(e, 3800, 500));
        });
      }
    },

    'j3-08:3': {
      alt: '사과 세 개와 사과 네 개를 모으면 일곱 개: さん たす よん は なな(3 더하기 4는 7). 그리고 じゅう(10) 뒤에 いち(1)를 붙이면 じゅういち(11)가 되는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img"><g transform="translate(0,44)">
        <g class="g3">${[0, 1, 2].map(i => apple(40 + i * 36, 30)).join('')}</g>
        <g class="g4">${[0, 1, 2, 3].map(i => apple(210 + i * 36, 30)).join('')}</g>
        <text class="pl" x="172" y="40" text-anchor="middle" fill="${DG_C.sub}" font-size="28" font-weight="700">+</text>
        <text class="eq" x="370" y="40" text-anchor="middle" fill="${DG_C.sub}" font-size="28" font-weight="700">=</text>
        <text class="eq" x="420" y="44" text-anchor="middle" fill="${RED}" font-size="36" font-weight="800">7</text>
        ${[['さん', 76, '3'], ['たす', 172, '+'], ['よん', 264, '4'], ['は', 370, '='], ['なな', 420, '7']].map((w, i) => `<g class="w${i}">
          <text ${JA} x="${w[1]}" y="${w[0] === 'は' ? 100 : 100}" text-anchor="middle" fill="${w[0] === 'たす' || w[0] === 'は' ? DG_C.c : DG_C.ink}" font-size="26" font-weight="700">${w[0]}</text>
          <text x="${w[1]}" y="128" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${['상', '타스', '욘', '와', '나나'][i]}</text></g>`).join('')}
        <line x1="20" y1="150" x2="460" y2="150" stroke="#e5e5ea" stroke-width="2"/>
        <g class="b0"><rect x="20" y="170" width="110" height="66" rx="14" fill="${DG_C.b}" fill-opacity=".6"/>
          <text ${JA} x="75" y="212" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">じゅう</text>
          <text x="75" y="262" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">10</text>
          <text x="146" y="210" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>
          <rect x="162" y="170" width="80" height="66" rx="14" fill="${DG_C.a}" fill-opacity=".7"/>
          <text ${JA} x="202" y="212" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700">いち</text>
          <text x="202" y="262" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">1</text></g>
        <g class="b1"><text x="260" y="210" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text>
          <text ${JA} x="372" y="214" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">じゅういち</text>
          <text x="372" y="262" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">11 <tspan fill="${DG_C.sub}" font-size="18" font-weight="700">주-이치</tspan></text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          q('.g3').setAttribute('opacity', dgP(e, 200, 400));
          q('.pl').setAttribute('opacity', dgP(e, 700, 300));
          q('.g4').setAttribute('opacity', dgP(e, 1000, 400));
          qa('.eq').forEach(t => t.setAttribute('opacity', dgP(e, 1700, 400)));
          [0, 1, 2, 3, 4].forEach(i => q('.w' + i).setAttribute('opacity', dgP(e, 2300 + i * 350, 300)));
          q('.b0').setAttribute('opacity', dgP(e, 4400, 500));
          q('.b1').setAttribute('opacity', dgP(e, 5300, 500));
        });
      }
    },
  });
})();
