/* 1학년 영어 · 큰 글자 A와 작은 글자 a는 같은 친구일까? (e1-03) */
(() => {
  /* 0: 대문자 줄 / 소문자 줄 */
  const P0 = [['A', 'a', '에이'], ['B', 'b', '비'], ['C', 'c', '씨'], ['D', 'd', '디']];
  const X0 = i => 168 + i * 86;

  /* 1: 크기만 다른 짝 8개 */
  const P1 = ['Cc', 'Oo', 'Ss', 'Uu', 'Vv', 'Ww', 'Xx', 'Zz'];
  const cell1 = i => ({ x: 60 + (i % 4) * 120, y: 112 + Math.floor(i / 4) * 92 });
  const K = 0.74; // 대문자 → 소문자 크기 비율(대략)

  /* 2: 모양이 다른 짝 7개 — 소문자는 섞여 있다가 제자리로 */
  const UP = ['A', 'B', 'D', 'E', 'G', 'Q', 'R'];
  const MIX = [4, 6, 0, 3, 5, 1, 2]; // 처음 소문자가 놓인 칸 번호(정답 i → 처음 자리)
  const X2 = i => 48 + i * 64;

  /* 3: b d p q */
  const BD = [
    { s: -1, up: 1, t: '오른쪽', w: ['b', 'ear'] },
    { s: 1, up: 1, t: '왼쪽', w: ['d', 'og'] },
    { s: -1, up: 0, t: '오른쪽' },
    { s: 1, up: 0, t: '왼쪽' },
  ];
  const X3 = [64, 176, 304, 416];

  Object.assign(DIAG, {
    'e1-03:0': {
      alt: '대문자 A B C D 아래에 짝인 소문자 a b c d가 놓이고, 짝끼리 이름이 에이, 비, 씨, 디로 같은 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <text x="16" y="106" fill="${DG_C.d}" font-size="20" font-weight="800">대문자</text>
        <text x="16" y="182" fill="${DG_C.c}" font-size="20" font-weight="800">소문자</text>
        ${P0.map(([U, l, n], i) => `
          <rect class="pr${i}" x="${X0(i) - 34}" y="46" width="68" height="166" rx="16" fill="#f5f5f7"/>
          <text x="${X0(i)}" y="112" text-anchor="middle" fill="${DG_C.d}" font-size="52" font-weight="800">${U}</text>
          <text class="lo${i}" x="${X0(i)}" y="188" text-anchor="middle" fill="${DG_C.c}" font-size="52" font-weight="800">${l}</text>
          <text class="nm${i}" x="${X0(i)}" y="246" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">${n}</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          P0.forEach((_, i) => {
            const st = 500 + i * 900, f = dgEase(dgP(e, st, 600));
            q('.lo' + i).setAttribute('opacity', f);
            q('.lo' + i).setAttribute('transform', `translate(0,${-30 * (1 - f)})`);
            q('.pr' + i).setAttribute('opacity', f);
            q('.nm' + i).setAttribute('opacity', e > st + 600 ? 1 : 0);
          });
        });
      }
    },

    'e1-03:1': {
      alt: '대문자 C O S U V W X Z가 작아지면 소문자 c o s u v w x z와 모양이 같아지는, 크기만 다른 짝 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        ${P1.map((p, i) => { const c = cell1(i); return `
          <rect x="${c.x - 54}" y="${c.y - 58}" width="108" height="76" rx="16" fill="#f5f5f7"/>
          <text x="${c.x - 24}" y="${c.y}" text-anchor="middle" fill="${DG_C.d}" font-size="42" font-weight="800">${p[0]}</text>
          <text class="lo${i}" x="${c.x + 28}" y="${c.y}" text-anchor="middle" fill="${DG_C.c}" font-size="42" font-weight="800">${p[1]}</text>
          <text class="gh${i}" text-anchor="middle" fill="${DG_C.d}" fill-opacity=".45" font-size="42" font-weight="800">${p[0]}</text>`; }).join('')}
        <text class="cap" x="240" y="272" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">모양은 같고 크기만 달라요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          P1.forEach((_, i) => {
            const c = cell1(i), st = 300 + i * 600, f = dgEase(dgP(e, st, 700));
            const g = q('.gh' + i);
            g.setAttribute('transform', `translate(${c.x - 24 + 52 * f},${c.y}) scale(${1 - (1 - K) * f})`);
            g.setAttribute('opacity', e > st && e < st + 1000 ? 1 : 0);
            q('.lo' + i).setAttribute('opacity', e > st + 700 ? 1 : 0);
          });
          q('.cap').setAttribute('opacity', e > 5500 ? 1 : 0);
        });
      }
    },

    'e1-03:2': {
      alt: '대문자 A B D E G Q R 아래에 섞여 있던 소문자 a b d e g q r가 하나씩 제 짝 아래로 옮겨 가는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        ${UP.map((U, i) => `<rect class="pr${i}" x="${X2(i) - 28}" y="52" width="56" height="150" rx="14" fill="#f5f5f7"/>
          <text x="${X2(i)}" y="110" text-anchor="middle" fill="${DG_C.d}" font-size="44" font-weight="800">${U}</text>`).join('')}
                ${UP.map((U, i) => `<text class="lo${i}" x="0" y="0" text-anchor="middle" fill="${DG_C.c}" font-size="44" font-weight="800">${U.toLowerCase()}</text>`).join('')}
        <text class="cap" x="240" y="250" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">모양이 달라도 짝이에요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          UP.forEach((_, i) => {
            const st = 700 + i * 650, f = dgEase(dgP(e, st, 600));
            const x = X2(MIX[i]) + (X2(i) - X2(MIX[i])) * f, y = 256 - 72 * f - Math.sin(Math.PI * f) * 30;
            q('.lo' + i).setAttribute('x', x); q('.lo' + i).setAttribute('y', y);
            q('.pr' + i).setAttribute('fill', f >= 1 ? '#fff4e6' : '#f5f5f7');
          });
          q('.cap').setAttribute('opacity', e > 5600 ? 1 : 0);
        });
      }
    },

    'e1-03:3': {
      alt: 'b는 막대 오른쪽에 배가 있고(bear), d는 막대 왼쪽에 배가 있으며(dog), p는 오른쪽, q는 왼쪽에 배가 있는 것을 막대와 동그라미로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <line x1="240" y1="60" x2="240" y2="270" stroke="#e5e5ea" stroke-width="2"/>
        ${BD.map((L, i) => { const cx = X3[i], sx = cx + L.s * 26; return `
          <line class="st${i}" x1="${sx}" y1="${L.up ? 56 : 104}" x2="${sx}" y2="${L.up ? 160 : 208}" stroke="${DG_C.d}" stroke-width="10" stroke-linecap="round"/>
          <circle class="bl${i}" cx="${cx}" cy="134" r="26" fill="none" stroke="${DG_C.c}" stroke-width="10"/>
          <g class="lb${i}"><text x="${cx}" y="${L.w ? 204 : 244}" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">${L.s < 0 ? '배 → 오른쪽' : '왼쪽 ← 배'}</text>
          ${L.w ? `<text x="${cx}" y="248" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="800"><tspan fill="${DG_C.d}">${L.w[0]}</tspan>${L.w[1]}</text>` : ''}</g>
          <text class="lb${i}" x="${cx + (L.up ? 0 : 0)}" y="${L.up ? 40 : 78}" text-anchor="middle" fill="${DG_C.sub}" font-size="22" font-weight="800">${'bdpq'[i]}</text>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          BD.forEach((L, i) => {
            const st = 200 + i * 1400, f = dgEase(dgP(e, st, 500)), g = dgEase(dgP(e, st + 550, 500));
            const y1 = L.up ? 56 : 104, y2 = L.up ? 160 : 208;
            const s = q('.st' + i);
            s.setAttribute('y2', y1 + (y2 - y1) * Math.max(f, .001)); s.setAttribute('opacity', f > 0 ? 1 : 0);
            const b = q('.bl' + i);
            b.setAttribute('r', 26 * g); b.setAttribute('opacity', g > 0 ? 1 : 0);
            qa('.lb' + i).forEach(t => t.setAttribute('opacity', e > st + 1000 ? 1 : 0));
          });
        });
      }
    },
  });
})();
