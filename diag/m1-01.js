/* 1학년 수학 · 하나, 둘, 셋! 9까지 셀 수 있을까? (m1-01) */
(() => {
  const RED = '#ff3b30';
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const apple = (x, y, r) => `<g transform="translate(${x},${y})">
    <path d="M0 ${-r * 0.78} q2 ${-r * 0.35} 6 ${-r * 0.5}" fill="none" stroke="${DG_C.ink}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="${r * 0.35}" cy="${-r * 1.05}" rx="${r * 0.32}" ry="${r * 0.16}" transform="rotate(-25 ${r * 0.35} ${-r * 1.05})" fill="${DG_C.r}"/>
    <path d="M0 ${-r * 0.7} C${r * 0.9} ${-r * 1.2} ${r * 1.35} ${-r * 0.1} ${r * 0.85} ${r * 0.6} C${r * 0.5} ${r * 1.05} ${r * 0.15} ${r * 0.95} 0 ${r * 0.8} C${-r * 0.15} ${r * 0.95} ${-r * 0.5} ${r * 1.05} ${-r * 0.85} ${r * 0.6} C${-r * 1.35} ${-r * 0.1} ${-r * 0.9} ${-r * 1.2} 0 ${-r * 0.7} Z" fill="${RED}"/>
  </g>`;

  /* 0 */
  const AX = [110, 240, 370], NAMES = ['하나', '둘', '셋'];

  /* 1 */
  const RD = [['0', '영'], ['1', '하나·일'], ['2', '둘·이'], ['3', '셋·삼'], ['4', '넷·사'], ['5', '다섯·오'], ['6', '여섯·육'], ['7', '일곱·칠'], ['8', '여덟·팔'], ['9', '아홉·구']];
  const card = (k) => {
    const x = 14 + (k % 5) * 92, y = 44 + Math.floor(k / 5) * 132;
    let dots = '';
    for (let j = 0; j < k; j++) dots += `<circle cx="${x + 14 + (j % 5) * 14}" cy="${y + 58 + Math.floor(j / 5) * 14}" r="5" fill="${DG_C.c}"/>`;
    if (!k) dots = `<circle cx="${x + 42}" cy="${y + 65}" r="9" fill="none" stroke="#d2d2d7" stroke-width="2.5" stroke-dasharray="4 4"/>`;
    return `<g class="cd${k}"><rect x="${x}" y="${y}" width="84" height="122" rx="14" fill="#f5f5f7"/>
      ${T(x + 42, y + 40, RD[k][0], { s: 32, w: 800, f: DG_C.d })}${dots}
      ${T(x + 42, y + 108, RD[k][1], { s: 18, w: 700 })}</g>`;
  };

  /* 2: 동물 얼굴 */
  const face = (kind, x, y) => {
    const r = 40;
    let ears = '', fill = '#f5f5f7', st = DG_C.sub;
    if (kind === 0) { // 토끼
      ears = `<ellipse cx="${x - 15}" cy="${y - 54}" rx="10" ry="28" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="4"/><ellipse cx="${x + 15}" cy="${y - 54}" rx="10" ry="28" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="4"/>`;
    } else if (kind === 1) { // 강아지
      fill = DG_C.a; st = DG_C.c;
      ears = `<ellipse cx="${x - 38}" cy="${y - 6}" rx="13" ry="26" transform="rotate(18 ${x - 38} ${y - 6})" fill="${DG_C.c}"/><ellipse cx="${x + 38}" cy="${y - 6}" rx="13" ry="26" transform="rotate(-18 ${x + 38} ${y - 6})" fill="${DG_C.c}"/>`;
    } else { // 고양이
      fill = DG_C.b; st = DG_C.d;
      ears = `<path d="M${x - 36} ${y - 14} L${x - 30} ${y - 58} L${x - 6} ${y - 36} Z M${x + 36} ${y - 14} L${x + 30} ${y - 58} L${x + 6} ${y - 36} Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="4" stroke-linejoin="round"/>`;
    }
    const front = `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${st}" stroke-width="4"/>
      <circle cx="${x - 14}" cy="${y - 6}" r="4.5" fill="${DG_C.ink}"/><circle cx="${x + 14}" cy="${y - 6}" r="4.5" fill="${DG_C.ink}"/>
      <ellipse cx="${x}" cy="${y + 9}" rx="6" ry="4.5" fill="${DG_C.ink}"/>
      <path d="M${x - 9} ${y + 19} q9 7 18 0" fill="none" stroke="${DG_C.ink}" stroke-width="3" stroke-linecap="round"/>`;
    return kind === 1 ? front + ears : ears + front;
  };
  const AN = [{ n: '토끼', o: '첫째' }, { n: '강아지', o: '둘째' }, { n: '고양이', o: '셋째' }];

  /* 3 */
  const cx3 = k => 9 + (k - 1) * 52 + 23; // 카드 k(1..9)의 가운데 x

  Object.assign(DIAG, {
    'm1-01:0': {
      alt: '사과 세 개를 하나씩 짚으며 하나, 둘, 셋 하고 세고, 마지막에 말한 셋이 전체 개수 3개인 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <rect x="40" y="186" width="400" height="8" rx="4" fill="#e5e5ea"/>
        ${AX.map((x, i) => `<circle class="ring${i}" cx="${x}" cy="142" r="50" fill="${DG_C.b}" fill-opacity=".35" stroke="${DG_C.d}" stroke-width="4"/>${apple(x, 146, 36)}
          <g class="n${i}"><rect x="${x - 36}" y="40" width="72" height="40" rx="20" fill="${DG_C.d}"/>${T(x, 68, NAMES[i], { s: 22, w: 800, f: '#fff' })}</g>`).join('')}
        <g class="pt"><circle r="9" fill="${DG_C.c}"/><circle r="15" fill="none" stroke="${DG_C.c}" stroke-width="3"/></g>
        <g class="res">${T(240, 246, '마지막에 말한 수 <tspan fill="#0071e3">셋</tspan> → <tspan fill="#ff9500">3개</tspan>', { s: 24, w: 800 })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          // 손가락(주황 점)이 사과를 하나씩 짚음
          let px = AX[0] - 120, py = 140;
          AX.forEach((x, i) => {
            const st = 400 + i * 1300;
            const m = dgEase(dgP(e, st, 600));
            if (e >= st) { px = (i ? AX[i - 1] : AX[0] - 120) + (x - (i ? AX[i - 1] : AX[0] - 120)) * m; }
            const on = e > st + 600;
            q('.ring' + i).setAttribute('opacity', on ? 1 : 0);
            q('.n' + i).setAttribute('opacity', on ? 1 : 0);
          });
          q('.pt').setAttribute('transform', `translate(${px},${py + 36})`);
          q('.pt').setAttribute('opacity', e < 4300 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 4400 ? 1 : 0);
        });
      }
    },

    'm1-01:1': {
      alt: '수 카드 0부터 9까지와 같은 개수의 점, 그리고 두 가지 읽는 법: 0 영, 1 하나·일, 2 둘·이, 3 셋·삼, 4 넷·사, 5 다섯·오, 6 여섯·육, 7 일곱·칠, 8 여덟·팔, 9 아홉·구',
      svg: `<svg viewBox="0 0 480 312" class="dg-svg" role="img">${RD.map((_, k) => card(k)).join('')}</svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          RD.forEach((_, k) => q('.cd' + k).setAttribute('opacity', dgP(e, 200 + k * 480, 350)));
        });
      }
    },

    'm1-01:2': {
      alt: '토끼, 강아지, 고양이가 한 줄로 서 있고 왼쪽부터 첫째 토끼, 둘째 강아지, 셋째 고양이로 차례를 세는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${AN.map((a, i) => { const x = 110 + i * 130; return `<g class="an${i}">${face(i, x, 120)}${T(x, 192, a.n, { s: 18, f: DG_C.sub })}</g>
          <g class="o${i}"><rect x="${x - 42}" y="206" width="84" height="40" rx="20" fill="${DG_C.d}"/>${T(x, 234, a.o, { s: 22, w: 800, f: '#fff' })}</g>`; }).join('')}
        <g class="dir"><line x1="156" y1="272" x2="412" y2="272" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>
          <path d="M402 262 L416 272 L402 282" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(96, 279, '왼쪽부터', { s: 20, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          AN.forEach((a, i) => {
            q('.an' + i).setAttribute('opacity', dgP(e, 100 + i * 250, 400));
            q('.o' + i).setAttribute('opacity', e > 1700 + i * 1000 ? 1 : 0);
          });
          q('.dir').setAttribute('opacity', dgP(e, 1100, 400));
        });
      }
    },

    'm1-01:3': {
      alt: '1부터 9까지 수 카드를 순서대로 놓고, 5 바로 뒤의 6이 5보다 1 큰 수, 5 바로 앞의 4가 5보다 1 작은 수인 것을 화살표로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${Array.from({ length: 9 }, (_, j) => { const k = j + 1, x = cx3(k);
          const fill = k === 5 ? DG_C.d : k === 6 ? DG_C.a : k === 4 ? '#d6efdc' : '#f5f5f7';
          return `<g class="k${k}"><rect class="bg${k}" x="${x - 23}" y="112" width="46" height="60" rx="10" fill="#f5f5f7"/>
            <text class="tx${k}" x="${x}" y="152" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${k}</text></g>`; }).join('')}
        <g class="big">
          <path d="M${cx3(5)} 104 Q${(cx3(5) + cx3(6)) / 2} 70 ${cx3(6)} 104" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>
          <path d="M${cx3(6) - 11} 96 L${cx3(6)} 105 L${cx3(6) + 3} 91" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(cx3(6) + 6, 62, '바로 뒤: 1 큰 수', { s: 20, w: 800, f: DG_C.c })}</g>
        <g class="sml">
          <path d="M${cx3(5)} 180 Q${(cx3(5) + cx3(4)) / 2} 214 ${cx3(4)} 180" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round"/>
          <path d="M${cx3(4) + 11} 188 L${cx3(4)} 179 L${cx3(4) - 3} 193" fill="none" stroke="${DG_C.r}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${T(cx3(4) - 6, 240, '바로 앞: 1 작은 수', { s: 20, w: 800, f: DG_C.r })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const col = { 5: [DG_C.d, '#fff'], 6: [DG_C.a, DG_C.c], 4: ['#d6efdc', DG_C.r] };
        dgAnim(el, 5200, e => {
          for (let k = 1; k <= 9; k++) q('.k' + k).setAttribute('opacity', dgP(e, 100 + k * 180, 300));
          const hl = { 5: e > 2100, 6: e > 2900, 4: e > 4000 };
          for (const k of [4, 5, 6]) {
            q('.bg' + k).setAttribute('fill', hl[k] ? col[k][0] : '#f5f5f7');
            q('.tx' + k).setAttribute('fill', hl[k] ? col[k][1] : DG_C.ink);
          }
          q('.big').setAttribute('opacity', dgP(e, 2800, 400));
          q('.sml').setAttribute('opacity', dgP(e, 3900, 400));
        });
      }
    },
  });
})();
