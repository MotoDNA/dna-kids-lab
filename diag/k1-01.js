/* 1학년 국어 · 입 모양을 바꾸면 어떤 소리가 날까? (k1-01) */
(() => {
  const LIP = '#ff3b30';
  /* 0: 모음 여섯 개와 입 모양 */
  const M0 = [
    { j: 'ㅏ', s: '아', rx: 24, ry: 22, t: '크게 벌려요' },
    { j: 'ㅓ', s: '어', rx: 20, ry: 14, t: '덜 벌려요' },
    { j: 'ㅗ', s: '오', rx: 13, ry: 13, t: '동그랗게' },
    { j: 'ㅜ', s: '우', rx: 8, ry: 9, t: '쭉 내밀어요' },
    { j: 'ㅡ', s: '으', rx: 22, ry: 4, t: '살짝 펴요' },
    { j: 'ㅣ', s: '이', rx: 28, ry: 6, t: '쭉 펴요' },
  ];
  const cell = i => ({ x: 80 + (i % 3) * 160, y: 78 + Math.floor(i / 3) * 130 });

  /* 1·2: 막대 + 짧은 줄 */
  const stand = [
    { j: 'ㅏ', s: '아', dx: 1, t: '오른쪽' },
    { j: 'ㅓ', s: '어', dx: -1, t: '왼쪽' },
    { j: 'ㅣ', s: '이', dx: 0, t: '막대 하나' },
  ];
  const lie = [
    { j: 'ㅗ', s: '오', dy: -1, t: '위' },
    { j: 'ㅜ', s: '우', dy: 1, t: '아래' },
    { j: 'ㅡ', s: '으', dy: 0, t: '막대 하나' },
  ];
  const barAnim = (el, n, setBar, setShort) => {
    const qa = s => [...el.querySelectorAll(s)];
    dgAnim(el, 5200, e => {
      for (let i = 0; i < n; i++) {
        const st = 300 + i * 1600;
        setBar(el, i, dgEase(dgP(e, st, 600)));
        setShort(el, i, dgEase(dgP(e, st + 700, 500)));
        qa('.lb' + i).forEach(t => t.setAttribute('opacity', e > st + 1200 ? 1 : 0));
      }
    });
  };

  Object.assign(DIAG, {
    'k1-01:0': {
      alt: '모음 ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ 여섯 개와 각각을 소리 낼 때의 입 모양: 아는 크게, 어는 덜 벌리고, 오는 동그랗게, 우는 쭉 내밀고, 으는 살짝, 이는 옆으로 쭉 펴요',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        ${M0.map((m, i) => { const c = cell(i); return `<g class="c${i}">
          <circle cx="${c.x - 32}" cy="${c.y}" r="38" fill="${DG_C.a}" fill-opacity=".55"/>
          <circle cx="${c.x - 45}" cy="${c.y - 14}" r="3.5" fill="${DG_C.ink}"/><circle cx="${c.x - 19}" cy="${c.y - 14}" r="3.5" fill="${DG_C.ink}"/>
          <ellipse class="m${i}" cx="${c.x - 32}" cy="${c.y + 14}" rx="${m.rx}" ry="${m.ry}" fill="${DG_C.ink}" stroke="${LIP}" stroke-width="4"/>
          <text x="${c.x + 34}" y="${c.y + 6}" text-anchor="middle" fill="${DG_C.d}" font-size="40" font-weight="800">${m.j}</text>
          <text x="${c.x + 34}" y="${c.y + 36}" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${m.s}</text>
          <text x="${c.x - 32}" y="${c.y + 62}" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="600">${m.t}</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          M0.forEach((m, i) => {
            const st = 200 + i * 900, f = dgEase(dgP(e, st, 600));
            q('.c' + i).setAttribute('opacity', e >= st ? 1 : 0);
            // 다문 입(가는 선) → 소리 낼 때 입 모양
            q('.m' + i).setAttribute('rx', 18 + (m.rx - 18) * f);
            q('.m' + i).setAttribute('ry', 1.5 + (m.ry - 1.5) * f);
          });
        });
      }
    },

    'k1-01:1': {
      alt: '세로 막대에 짧은 줄이 오른쪽에 붙으면 ㅏ(아), 왼쪽에 붙으면 ㅓ(어), 막대 하나뿐이면 ㅣ(이)가 되는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img"><g transform="translate(0,14)">
        ${stand.map((v, i) => { const x = 80 + i * 160; return `
          <line class="bar${i}" x1="${x}" y1="40" x2="${x}" y2="150" stroke="${DG_C.d}" stroke-width="14" stroke-linecap="round"/>
          ${v.dx ? `<line class="sh${i}" x1="${x}" y1="95" x2="${x + v.dx * 42}" y2="95" stroke="${DG_C.c}" stroke-width="14" stroke-linecap="round"/>` : ''}
          <text class="lb${i}" x="${x}" y="196" text-anchor="middle" fill="${v.dx ? DG_C.c : DG_C.d}" font-size="20" font-weight="700">${v.t}</text>
          <text class="lb${i}" x="${x}" y="246" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${v.j} <tspan fill="${DG_C.sub}" font-size="22" font-weight="700">${v.s}</tspan></text>`; }).join('')}
      </g></svg>`,
      play(el) {
        barAnim(el, 3,
          (el, i, f) => el.querySelector('.bar' + i).setAttribute('y2', 40 + 110 * Math.max(f, .001)),
          (el, i, f) => { const s = el.querySelector('.sh' + i); if (!s) return; const x = 80 + i * 160; s.setAttribute('x2', x + stand[i].dx * 42 * f); s.setAttribute('opacity', f > 0 ? 1 : 0); });
      }
    },

    'k1-01:2': {
      alt: '가로 막대에 짧은 줄이 위에 붙으면 ㅗ(오), 아래에 붙으면 ㅜ(우), 막대 하나뿐이면 ㅡ(으)가 되는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img"><g transform="translate(0,4)">
        ${lie.map((v, i) => { const x = 80 + i * 160; return `
          <line class="bar${i}" x1="${x - 60}" y1="100" x2="${x + 60}" y2="100" stroke="${DG_C.d}" stroke-width="14" stroke-linecap="round"/>
          ${v.dy ? `<line class="sh${i}" x1="${x}" y1="100" x2="${x}" y2="${100 + v.dy * 46}" stroke="${DG_C.c}" stroke-width="14" stroke-linecap="round"/>` : ''}
          <text class="lb${i}" x="${x}" y="196" text-anchor="middle" fill="${v.dy ? DG_C.c : DG_C.d}" font-size="20" font-weight="700">${v.t}</text>
          <text class="lb${i}" x="${x}" y="246" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800">${v.j} <tspan fill="${DG_C.sub}" font-size="22" font-weight="700">${v.s}</tspan></text>`; }).join('')}
      </g></svg>`,
      play(el) {
        barAnim(el, 3,
          (el, i, f) => { const x = 80 + i * 160; el.querySelector('.bar' + i).setAttribute('x2', x - 60 + 120 * Math.max(f, .001)); },
          (el, i, f) => { const s = el.querySelector('.sh' + i); if (!s) return; s.setAttribute('y2', 100 + lie[i].dy * 46 * f); s.setAttribute('opacity', f > 0 ? 1 : 0); });
      }
    },

    'k1-01:3': {
      alt: 'ㅇ(소리 없음)과 ㅏ를 합치면 글자 아가 되고, 아와 이를 이으면 아이, 오와 이를 이으면 오이라는 낱말이 되는 그림',
      svg: (() => {
        // ㅇ + ㅏ 를 도형으로: ㅇ 동그라미(가운데 cx) + ㅏ 막대
        const ieung = (cx, cy, col) => `<circle cx="${cx}" cy="${cy}" r="24" fill="none" stroke="${col}" stroke-width="10"/>`;
        const a = (x, cy) => `<line x1="${x}" y1="${cy - 46}" x2="${x}" y2="${cy + 46}" stroke="${DG_C.d}" stroke-width="10" stroke-linecap="round"/><line x1="${x}" y1="${cy}" x2="${x + 24}" y2="${cy}" stroke="${DG_C.d}" stroke-width="10" stroke-linecap="round"/>`;
        const tile = (x, y, t, col) => `<rect x="${x}" y="${y}" width="48" height="48" rx="12" fill="${col}"/><text x="${x + 24}" y="${y + 34}" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="800">${t}</text>`;
        const word = (x, w1, w2) => `${tile(x, 196, w1, DG_C.a)}<text x="${x + 63}" y="230" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">+</text>${tile(x + 78, 196, w2, DG_C.b)}<text x="${x + 144}" y="230" text-anchor="middle" fill="${DG_C.sub}" font-size="24" font-weight="700">→</text><text x="${x + 168}" y="232" fill="${DG_C.ink}" font-size="28" font-weight="800">${w1}${w2}</text>`;
        return `<svg viewBox="0 0 480 290" class="dg-svg" role="img"><g transform="translate(0,20)">
          <g>${ieung(60, 80, DG_C.sub)}<text x="60" y="160" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">소리 없음</text></g>
          <text x="118" y="92" text-anchor="middle" fill="${DG_C.sub}" font-size="28" font-weight="700">+</text>
          <g>${a(160, 80)}<text x="168" y="160" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">모음</text></g>
          <text class="arr" x="240" y="92" text-anchor="middle" fill="${DG_C.sub}" font-size="28" font-weight="700">→</text>
          <g class="pi" >${ieung(0, 0, DG_C.ink)}</g>
          <g class="pa">${a(0, 0)}</g>
          <text class="res" x="356" y="160" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">아</text>
          <line x1="20" y1="180" x2="460" y2="180" stroke="#e5e5ea" stroke-width="2"/>
          <g class="w1">${word(10, '아', '이')}</g>
          <g class="w2">${word(250, '오', '이')}</g>
        </g></svg>`;
      })(),
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          const m = dgEase(dgP(e, 400, 1400));
          // ㅇ: (60,80) → (340,80),  ㅏ: (160,80) → (384,80)
          q('.pi').setAttribute('transform', `translate(${60 + 280 * m},80)`);
          q('.pa').setAttribute('transform', `translate(${160 + 224 * m},80)`);
          q('.pi').setAttribute('opacity', m > 0 ? 1 : 0); q('.pa').setAttribute('opacity', m > 0 ? 1 : 0);
          q('.arr').setAttribute('opacity', e > 1900 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 2100 ? 1 : 0);
          q('.w1').setAttribute('opacity', e > 3000 ? 1 : 0);
          q('.w2').setAttribute('opacity', e > 4200 ? 1 : 0);
        });
      }
    },
  });
})();
