/* 1학년 국어 · 쌍둥이 자음은 어떤 소리가 날까? (k1-07) */
(() => {
  const S0 = [
    { j: 'ㄱ', jj: 'ㄲ', n: '쌍기역' },
    { j: 'ㄷ', jj: 'ㄸ', n: '쌍디귿' },
    { j: 'ㅂ', jj: 'ㅃ', n: '쌍비읍' },
    { j: 'ㅅ', jj: 'ㅆ', n: '쌍시옷' },
    { j: 'ㅈ', jj: 'ㅉ', n: '쌍지읒' },
  ];
  const S1 = [['가', '까'], ['다', '따'], ['바', '빠'], ['사', '싸'], ['자', '짜']];
  const S2 = [
    { s: '가', t: '부드럽게', amp: 10, w: 1, col: DG_C.d, more: '다 · 바' },
    { s: '카', t: '바람 세게', amp: 40, w: 3, col: DG_C.r, more: '타 · 파' },
    { s: '까', t: '단단하게', amp: 3, w: 0, col: DG_C.c, more: '따 · 빠' },
  ];
  /* 3: 낱말 — 된소리 글자 표시(1) */
  const W3 = [
    [[['토', 0], ['끼', 1]], [['코', 0], ['끼', 1], ['리', 0]], [['까', 1], ['치', 0]]],
    [[['아', 0], ['빠', 1]], [['뽀', 1], ['뽀', 1]], [['씨', 1]], [['짜', 1], ['다', 0]]],
  ];
  const TW = 46, GAP = 26;
  const rowLay = row => {
    const n = row.reduce((s, w) => s + w.length, 0);
    const width = n * TW + (row.length - 1) * GAP;
    let x = 240 - width / 2;
    return row.map(w => { const x0 = x; x += w.length * TW + GAP; return x0; });
  };

  Object.assign(DIAG, {
    'k1-07:0': {
      alt: '같은 자음 두 개를 나란히 쓰면 쌍둥이 자음이 되는 그림: ㄱ은 ㄲ 쌍기역, ㄷ은 ㄸ 쌍디귿, ㅂ은 ㅃ 쌍비읍, ㅅ은 ㅆ 쌍시옷, ㅈ은 ㅉ 쌍지읒',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${S0.map((m, i) => { const x = 48 + i * 96; return `<g>
          <g class="a${i}"><rect x="${x - 40}" y="52" width="39" height="50" rx="10" fill="${DG_C.b}"/>
            <text x="${x - 20.5}" y="88" text-anchor="middle" fill="${DG_C.d}" font-size="28" font-weight="800">${m.j}</text></g>
          <g class="b${i}"><rect x="${x + 1}" y="52" width="39" height="50" rx="10" fill="${DG_C.b}"/>
            <text x="${x + 20.5}" y="88" text-anchor="middle" fill="${DG_C.d}" font-size="28" font-weight="800">${m.j}</text></g>
          <g class="r${i}">
            <path d="M${x} 116 v24 m-8 -8 l8 8 l8 -8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="${x}" y="200" text-anchor="middle" fill="${DG_C.c}" font-size="44" font-weight="800">${m.jj}</text>
            <text x="${x}" y="240" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">${m.n}</text>
          </g></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          S0.forEach((m, i) => {
            const st = 200 + i * 1000, f = dgEase(dgP(e, st + 300, 500));
            q('.a' + i).setAttribute('opacity', e >= st ? 1 : 0);
            q('.b' + i).setAttribute('opacity', f > 0 ? f : 0);
            q('.b' + i).setAttribute('transform', `translate(${(1 - f) * 30},0)`);
            q('.r' + i).setAttribute('opacity', dgEase(dgP(e, st + 800, 400)));
          });
        });
      }
    },

    'k1-07:1': {
      alt: '가 다 바 사 자를 목에 힘을 주어 단단하게 소리 내면 까 따 빠 싸 짜, 곧 된소리가 되는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${S1.map((p, i) => { const x = 48 + i * 96; return `<g>
          <rect x="${x - 32}" y="46" width="64" height="64" rx="16" fill="${DG_C.b}"/>
          <text x="${x}" y="90" text-anchor="middle" fill="${DG_C.d}" font-size="32" font-weight="800">${p[0]}</text>
          <path class="ar${i}" d="M${x} 120 v26 m-8 -8 l8 8 l8 -8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <g class="t${i}"><rect x="${x - 32}" y="156" width="64" height="64" rx="16" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>
          <text x="${x}" y="200" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="800">${p[1]}</text></g>
        </g>`; }).join('')}
        <g class="lb"><rect x="130" y="238" width="220" height="38" rx="19" fill="${DG_C.c}"/>
        <text x="240" y="264" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">된소리: 힘주어 단단하게</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          S1.forEach((p, i) => {
            const st = 300 + i * 750, x = 48 + i * 96;
            q('.ar' + i).setAttribute('opacity', e >= st ? 1 : 0);
            const f = dgP(e, st + 200, 500);
            // 꽉 힘주듯 작아졌다가 단단하게 커짐
            const k = f <= 0 ? 0 : f < .5 ? 0.6 + 0.2 * (f / .5) : 0.8 + 0.2 * dgEase((f - .5) / .5);
            q('.t' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            q('.t' + i).setAttribute('transform', `translate(${x},188) scale(${k || 1}) translate(${-x},-188)`);
          });
          q('.lb').setAttribute('opacity', e > 4300 ? 1 : 0);
        });
      }
    },

    'k1-07:2': {
      alt: '입 앞에 든 휴지가 가에서는 조금, 카에서는 바람이 세게 나와 크게, 까에서는 거의 흔들리지 않는 모습. 다 타 따, 바 파 빠도 같아요',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${S2.map((m, i) => { const x = 80 + i * 160; return `<g>
          <text x="${x}" y="84" text-anchor="middle" fill="${m.col}" font-size="40" font-weight="800">${m.s}</text>
          <circle cx="${x - 36}" cy="160" r="30" fill="${DG_C.a}" fill-opacity=".6"/>
          <ellipse cx="${x - 14}" cy="168" rx="7" ry="9" fill="${DG_C.ink}" stroke="#ff3b30" stroke-width="3"/>
          ${Array.from({ length: m.w }, (_, k) => `<path class="w${i}" d="M${x - 2} ${162 + (k - (m.w - 1) / 2) * 10 + 6} h${k === 1 ? 22 : 16}" stroke="${m.col}" stroke-width="3" stroke-linecap="round"/>`).join('')}
          <line x1="${x + 26}" y1="118" x2="${x + 58}" y2="118" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/>
          <rect class="ts${i}" x="${x + 30}" y="118" width="22" height="72" rx="3" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5"/>
          <g class="lb${i}"><text x="${x}" y="246" text-anchor="middle" fill="${m.col}" font-size="20" font-weight="800">${m.t}</text>
          <text x="${x}" y="280" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${m.more}</text></g>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          S2.forEach((m, i) => {
            const x = 80 + i * 160, st = 300 + i * 1700;
            const f = dgP(e, st, 1300);
            const wob = f > 0 && f < 1 ? Math.sin(f * Math.PI * 4) * 0.25 * (1 - f) : 0;
            const ang = m.amp * (dgEase(Math.min(1, f * 2)) + wob);
            // 휴지는 윗변(가운데)을 축으로, 입에서 먼 쪽(오른쪽)으로 날림
            q('.ts' + i).setAttribute('transform', `rotate(${-ang} ${x + 41} 118)`);
            qa('.w' + i).forEach(w => w.setAttribute('opacity', f > 0 ? 1 : 0));
            q('.lb' + i).setAttribute('opacity', e > st + 700 ? 1 : 0);
          });
        });
      }
    },

    'k1-07:3': {
      alt: '된소리가 들어간 낱말 토끼, 코끼리, 까치, 아빠, 뽀뽀, 씨, 짜다에서 쌍둥이 자음이 있는 글자(끼, 까, 빠, 뽀, 씨, 짜)를 주황색으로 표시한 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${W3.map((row, r) => { const xs = rowLay(row), y = 60 + r * 90; return row.map((w, k) => `<g class="wd wd${r}_${k}">
          ${w.map(([s, hi], j) => `<rect x="${xs[k] + j * TW}" y="${y}" width="${TW - 4}" height="56" rx="12" fill="${hi ? DG_C.a : '#f5f5f7'}" ${hi ? `stroke="${DG_C.c}" stroke-width="3"` : ''}/>
            <text x="${xs[k] + j * TW + (TW - 4) / 2}" y="${y + 39}" text-anchor="middle" fill="${hi ? DG_C.c : DG_C.ink}" font-size="28" font-weight="800">${s}</text>`).join('')}
        </g>`).join(''); }).join('')}
        <g class="lg"><rect x="136" y="236" width="26" height="26" rx="7" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
        <text x="172" y="257" fill="${DG_C.ink}" font-size="20" font-weight="700">힘을 꼭 주어 읽어요</text></g>
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)], q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          qa('.wd').forEach((g, i) => {
            const f = dgEase(dgP(e, 200 + i * 520, 450));
            g.setAttribute('opacity', f);
            g.setAttribute('transform', `translate(0,${(1 - f) * 14})`);
          });
          q('.lg').setAttribute('opacity', e > 4000 ? 1 : 0);
        });
      }
    },
  });
})();
