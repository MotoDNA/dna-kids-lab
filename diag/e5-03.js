/* 5학년 영어 · 영어 문장은 어떤 순서로 만들까? (e5-03) */
(() => {
  const C = DG_C, G = '#d6efdc';
  const tw = (s, fs) => 0.92 * [...s].reduce((a, ch) => a + fs * (/[il.,'!|: ]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[ㄱ-힣]/.test(ch) ? 1.0 : 0.58), 0);
  /* 블록 줄 배치: 가운데 cx 기준 */
  const lay = (ws, fs, pad, gap, cx) => {
    const w = ws.map(s => Math.max(34, tw(s, fs) + pad * 2)), tot = w.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let x = cx - tot / 2; return w.map(v => { const r = { x, w: v }; x += v + gap; return r; });
  };

  /* 0: 누가-한다-무엇을 */
  const ROLE = [
    { r: '누가', k: '나는', e: 'I', f: C.b, s: C.d },
    { r: '한다', k: '한다', e: 'play', f: C.a, s: C.c },
    { r: '무엇을', k: '축구를', e: 'soccer.', f: G, s: C.r },
  ];
  const KO = [0, 2, 1]; // 우리말 칸 순서: 누가, 무엇을, 한다
  const SX = [100, 228, 356], BW = 104, Y0 = 90, Y1 = 206;
  const slotK = i => KO.indexOf(i); // ROLE i 가 우리말에서 몇 번째 칸인지

  /* 3: 묻는 문장 / 부정 */
  const QA = { a: ['You', 'are', 'tall', '.'], b: ['Are', 'you', 'tall', '?'] };
  const qa0 = lay(QA.a, 24, 12, 8, 290), qa1 = lay(QA.b, 24, 12, 8, 290);
  const NB = { a: ['I', 'like', 'milk', '.'], b: ['I', "don't", 'like', 'milk', '.'] };
  const nb0 = lay(NB.a, 24, 12, 8, 290), nb1 = lay(NB.b, 24, 12, 8, 290);
  const blk = (cls, x, y, w, s, f, st) => `<g class="${cls}"><rect x="${x}" y="${y - 22}" width="${w}" height="44" rx="12" fill="${f}" stroke="${st}" stroke-width="2.5"/><text class="${cls}t" x="${x + w / 2}" y="${y + 8}" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800">${s}</text></g>`;

  Object.assign(DIAG, {
    'e5-03:0': {
      alt: '우리말은 나는-축구를-한다 순서지만 영어는 누가(I)-한다(play)-무엇을(soccer) 순서로, 동사 블록이 앞으로 자리를 바꾸는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <text x="16" y="${Y0 + 8}" fill="${C.sub}" font-size="20" font-weight="800">우리말</text>
        <text x="16" y="${Y1 + 8}" fill="${C.ink}" font-size="20" font-weight="800">영어</text>
        ${KO.map((ri, s) => { const r = ROLE[ri]; return `<g class="k${s}">
          <rect x="${SX[s]}" y="${Y0 - 30}" width="${BW}" height="60" rx="14" fill="${r.f}" fill-opacity=".55" stroke="${r.s}" stroke-width="2" stroke-dasharray="5 4"/>
          <text x="${SX[s] + BW / 2}" y="${Y0 + 2}" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">${r.k}</text>
          <text x="${SX[s] + BW / 2}" y="${Y0 + 24}" text-anchor="middle" fill="${r.s}" font-size="18" font-weight="800">${r.r}</text></g>`; }).join('')}
        ${ROLE.map((r, i) => `<g class="m${i}">
          <rect x="${SX[i]}" y="${Y1 - 30}" width="${BW}" height="60" rx="14" fill="${r.f}" stroke="${r.s}" stroke-width="3"/>
          <text class="mk${i}" x="${SX[i] + BW / 2}" y="${Y1 + 2}" text-anchor="middle" fill="${C.ink}" font-size="22" font-weight="800">${r.k}</text>
          <text class="me${i}" x="${SX[i] + BW / 2}" y="${Y1 + 2}" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800">${r.e}</text>
          <text x="${SX[i] + BW / 2}" y="${Y1 + 24}" text-anchor="middle" fill="${r.s}" font-size="18" font-weight="800">${r.r}</text></g>`).join('')}
        <g class="pl" fill="${C.sub}" font-size="22" font-weight="800" text-anchor="middle"><text x="${SX[1] - 12}" y="${Y1 + 8}">+</text><text x="${SX[2] - 12}" y="${Y1 + 8}">+</text></g>
        <text class="note" x="240" y="${Y1 + 76}" text-anchor="middle" fill="${C.c}" font-size="20" font-weight="800">영어는 '한다'가 '무엇을'보다 먼저!</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          KO.forEach((ri, s) => q('.k' + s).setAttribute('opacity', dgP(e, 200 + s * 500, 400)));
          ROLE.forEach((r, i) => {
            const st = 2000 + i * 500;
            const down = dgEase(dgP(e, st, 700)), side = dgEase(dgP(e, st + 800, 900));
            const dx = (SX[slotK(i)] - SX[i]) * (1 - side), dy = (Y0 - Y1) * (1 - down);
            q('.m' + i).setAttribute('opacity', e >= st ? 1 : 0);
            q('.m' + i).setAttribute('transform', `translate(${dx},${dy})`);
            q('.mk' + i).setAttribute('opacity', 1 - dgP(e, st + 1300, 250));
            q('.me' + i).setAttribute('opacity', dgP(e, st + 1550, 300));
          });
          q('.pl').setAttribute('opacity', dgP(e, 5000, 400));
          q('.note').setAttribute('opacity', dgP(e, 5400, 500));
        });
      }
    },

    'e5-03:1': {
      alt: 'my dog is cute 를 고쳐서 첫 글자를 대문자 M으로 바꾸고 끝에 마침표를 찍어 My dog is cute. 로 만드는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <text x="240" y="92" text-anchor="middle" fill="${C.sub}" font-size="34" font-weight="700">my dog is cute</text>
        <path class="ar" d="M240 112 v34 m-10 -10 l10 10 l10 -10" fill="none" stroke="${C.sub}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="40" y="160" width="400" height="70" rx="18" fill="#f5f5f7"/>
        <text class="fix" x="240" y="208" text-anchor="middle" fill="${C.ink}" font-size="38" font-weight="800"><tspan class="cap" fill="#ff3b30">M</tspan>y dog is cute<tspan class="dot" fill="#ff3b30">.</tspan></text>
        <circle class="c1" r="23" fill="none" stroke="#ff3b30" stroke-width="3.5"/>
        <circle class="c2" r="15" fill="none" stroke="#ff3b30" stroke-width="3.5"/>
        <text class="l1" y="268" text-anchor="middle" fill="#ff3b30" font-size="20" font-weight="800">대문자</text>
        <text class="l2" y="268" text-anchor="middle" fill="#ff3b30" font-size="20" font-weight="800">마침표</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const t = q('.fix');
        dgAnim(el, 5000, e => {
          q('.ar').setAttribute('opacity', dgP(e, 600, 400));
          t.setAttribute('opacity', dgP(e, 1000, 400));
          const capOn = e >= 2000, dotOn = e >= 3200;
          q('.cap').textContent = capOn ? 'M' : 'm';
          q('.cap').setAttribute('fill', capOn ? '#ff3b30' : C.ink);
          q('.dot').setAttribute('fill-opacity', dotOn ? 1 : 0);
          let b0, b1;
          try { b0 = t.getExtentOfChar(0); b1 = t.getExtentOfChar(t.getNumberOfChars() - 1); } catch (_) { b0 = { x: 120, y: 172, width: 30, height: 46 }; b1 = { x: 350, y: 172, width: 10, height: 46 }; }
          const c1x = b0.x + b0.width / 2, c2x = b1.x + b1.width / 2;
          q('.c1').setAttribute('cx', c1x); q('.c1').setAttribute('cy', 194);
          q('.c2').setAttribute('cx', c2x); q('.c2').setAttribute('cy', 204);
          q('.l1').setAttribute('x', Math.max(50, c1x)); q('.l2').setAttribute('x', Math.min(430, c2x));
          const a1 = dgEase(dgP(e, 2300, 500)), a2 = dgEase(dgP(e, 3500, 500));
          q('.c1').setAttribute('opacity', a1); q('.c1').setAttribute('stroke-dasharray', `${150 * a1} 200`);
          q('.c2').setAttribute('opacity', a2); q('.c2').setAttribute('stroke-dasharray', `${95 * a2} 200`);
          q('.l1').setAttribute('opacity', a1); q('.l2').setAttribute('opacity', a2);
        });
      }
    },

    'e5-03:2': {
      alt: 'be동사 짝꿍 카드: I는 am, he·she·it는 is, you·we·they는 are와 짝이 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${[['I', 'am'], ['he · she · it', 'is'], ['you · we · they', 'are']].map(([s, v], i) => { const y = 80 + i * 78; return `
          <g class="s${i}"><rect x="40" y="${y - 28}" width="210" height="56" rx="16" fill="${C.b}" fill-opacity=".6" stroke="${C.d}" stroke-width="2.5"/>
            <text x="145" y="${y + 9}" text-anchor="middle" fill="${C.ink}" font-size="24" font-weight="800">${s}</text></g>
          <line class="ln${i}" x1="250" y1="${y}" x2="310" y2="${y}" stroke="${C.sub}" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 9"/>
          <g class="v${i}"><rect x="310" y="${y - 28}" width="110" height="56" rx="16" fill="${C.a}" stroke="${C.c}" stroke-width="2.5"/>
            <text x="365" y="${y + 10}" text-anchor="middle" fill="${C.ink}" font-size="28" font-weight="800">${v}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          [0, 1, 2].forEach(i => {
            const st = 300 + i * 1500;
            q('.s' + i).setAttribute('opacity', dgP(e, st, 400));
            const f = dgEase(dgP(e, st + 600, 700));
            q('.v' + i).setAttribute('opacity', f);
            q('.v' + i).setAttribute('transform', `translate(${50 * (1 - f)},0)`);
            q('.ln' + i).setAttribute('opacity', e > st + 1200 ? 1 : 0);
          });
        });
      }
    },

    'e5-03:3': {
      alt: 'You are tall. 에서 are가 맨 앞으로 가고 마침표가 물음표로 바뀌어 Are you tall? 이 되고, I like milk. 에 don\'t가 들어가 I don\'t like milk. 가 되는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <text x="16" y="44" fill="${C.d}" font-size="20" font-weight="800">묻는 문장</text>
        <text x="16" y="82" fill="${C.sub}" font-size="20" font-weight="700">You are tall.</text>
        ${QA.a.map((w, i) => blk('qa' + i, 0, 132, qa0[i].w, w, i === 1 ? C.a : i === 3 ? C.b : '#fff', i === 1 ? C.c : i === 3 ? C.d : '#d2d2d7')).join('')}
        <line x1="16" y1="176" x2="464" y2="176" stroke="#e5e5ea" stroke-width="2"/>
        <text x="16" y="212" fill="#ff3b30" font-size="20" font-weight="800">부정하는 문장</text>
        <text x="16" y="250" fill="${C.sub}" font-size="20" font-weight="700">I like milk.</text>
        ${NB.b.map((w, i) => blk('nb' + i, 0, 296, nb1[i].w, w, i === 1 ? '#ffe0de' : '#fff', i === 1 ? '#ff3b30' : '#d2d2d7')).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          // 위: You are tall. → Are you tall?
          const m = dgEase(dgP(e, 1000, 1200)), lift = Math.sin(Math.PI * m);
          const pos = [ // 각 블록 (원래 a 순서 기준)의 시작 x, 끝 x
            [qa0[0].x, qa1[1].x], [qa0[1].x, qa1[0].x], [qa0[2].x, qa1[2].x], [qa0[3].x, qa1[3].x]];
          pos.forEach(([a, b], i) => {
            const x = a + (b - a) * m, y = i === 1 ? -40 * lift : 0;
            q('.qa' + i).setAttribute('transform', `translate(${x},${y})`);
            q('.qa' + i).setAttribute('opacity', dgP(e, 200, 400));
          });
          const cap = e >= 2200;
          q('.qa0t').textContent = cap ? 'you' : 'You';
          q('.qa1t').textContent = cap ? 'Are' : 'are';
          q('.qa3t').textContent = e >= 2700 ? '?' : '.';
          q('.qa3t').setAttribute('fill', e >= 2700 ? C.d : C.ink);
          // 아래: I like milk. → I don't like milk.
          const n = dgEase(dgP(e, 4200, 900)), d = dgEase(dgP(e, 5000, 700));
          const from = [nb0[0].x, null, nb0[1].x, nb0[2].x, nb0[3].x];
          NB.b.forEach((w, i) => {
            const g = q('.nb' + i);
            if (i === 1) {
              g.setAttribute('transform', `translate(${nb1[1].x},${-40 * (1 - d)})`);
              g.setAttribute('opacity', d);
            } else {
              g.setAttribute('transform', `translate(${from[i] + (nb1[i].x - from[i]) * n},0)`);
              g.setAttribute('opacity', dgP(e, 3500, 400));
            }
          });
        });
      }
    },
  });
})();
