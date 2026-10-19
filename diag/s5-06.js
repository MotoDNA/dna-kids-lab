/* 5학년 과학 · 바람은 왜 불고, 구름은 어떻게 생길까? (s5-06) */
(() => {
  const RED = '#ff3b30';
  /* 0: 건습구 습도계 — 온도 10~30°C 를 y 220~80 에 */
  const ty = t => 220 - (t - 10) * 7;
  const thermo = (x, cls, wet) => `
    <rect x="${x - 10}" y="62" width="20" height="170" rx="10" fill="#fff" stroke="${DG_C.sub}" stroke-width="2.5"/>
    ${[10, 15, 20, 25, 30].map(t => `<line x1="${x + 10}" y1="${ty(t)}" x2="${x + 18}" y2="${ty(t)}" stroke="${DG_C.sub}" stroke-width="2"/>`).join('')}
    <rect class="${cls}" x="${x - 4}" y="${ty(25)}" width="8" height="${236 - ty(25)}" rx="4" fill="${RED}"/>
    <circle cx="${x}" cy="244" r="16" fill="${RED}" stroke="${DG_C.sub}" stroke-width="2.5"/>
    ${wet ? `<rect x="${x - 19}" y="226" width="38" height="36" rx="10" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5" opacity=".9"/>
      <path d="M${x} 262 V284" stroke="${DG_C.d}" stroke-width="4"/>
      <path d="M${x - 26} 272 h52 v18 a6 6 0 0 1 -6 6 h-40 a6 6 0 0 1 -6 -6 Z" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2.5"/>` : ''}`;
  const HT = [[1, 92], [2, 84], [3, 77]]; // 건구 25°C 행

  /* 2: 공기 알갱이 */
  const dots = (x0, x1, y0, y1, n, seed) => {
    const out = []; let s = seed;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const cols = Math.ceil(Math.sqrt(n * (x1 - x0) / (y1 - y0))), rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) {
      const c = i % cols, r = Math.floor(i / cols);
      out.push([x0 + (c + .5) * (x1 - x0) / cols + (rnd() - .5) * 10, y0 + (r + .5) * (y1 - y0) / rows + (rnd() - .5) * 10]);
    }
    return out;
  };
  const HI = dots(36, 184, 74, 226, 36, 7), LO = dots(296, 444, 74, 226, 12, 3);
  const MV = [0, 1, 2, 3, 4]; // 이동하는 알갱이

  /* 3: 해풍·육풍 */
  const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="${DG_C.c}"/>${Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `<line x1="${x + 18 * Math.cos(a)}" y1="${y + 18 * Math.sin(a)}" x2="${x + 25 * Math.cos(a)}" y2="${y + 25 * Math.sin(a)}" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>`; }).join('')}`;
  const moon = (x, y) => `<path d="M${x + 6} ${y - 16} a17 17 0 1 0 10 28 a14 14 0 1 1 -10 -28 Z" fill="#8e8e93"/>`;
  const row = (Y, day) => `
    <text x="16" y="${Y + 32}" fill="${DG_C.ink}" font-size="22" font-weight="800">${day ? '낮' : '밤'}</text>
    ${day ? sun(70, Y + 24) : moon(64, Y + 24)}
    <rect x="10" y="${Y + 106}" width="230" height="30" fill="${DG_C.b}"/>
    <path d="M240 ${Y + 100} H470 V${Y + 136} H240 Z" fill="${day ? DG_C.a : '#e5e5ea'}"/>
    <text x="125" y="${Y + 128}" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">바다</text>
    <text x="355" y="${Y + 125}" text-anchor="middle" fill="${day ? '#b25d00' : DG_C.sub}" font-size="18" font-weight="800">육지 ${day ? '(빨리 데워짐)' : '(빨리 식음)'}</text>
    <text x="110" y="${Y + 74}" text-anchor="middle" fill="${day ? DG_C.d : DG_C.c}" font-size="20" font-weight="800">${day ? '고기압' : '저기압'}</text>
    <text x="370" y="${Y + 74}" text-anchor="middle" fill="${day ? DG_C.c : DG_C.d}" font-size="20" font-weight="800">${day ? '저기압' : '고기압'}</text>
    <g class="w${day ? 0 : 1}">
      <path d="${day ? `M168 ${Y + 88} H300` : `M312 ${Y + 88} H180`}" fill="none" stroke="${DG_C.r}" stroke-width="6" stroke-linecap="round"/>
      <path d="${day ? `M292 ${Y + 78} l12 10 l-12 10` : `M188 ${Y + 78} l-12 10 l12 10`}" fill="none" stroke="${DG_C.r}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="240" y="${Y + 66}" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">${day ? '해풍' : '육풍'}</text>
    </g>`;

  Object.assign(DIAG, {
    's5-06:0': {
      alt: '건구 온도계는 25°C, 젖은 헝겊을 감은 습구 온도계는 물이 증발하며 22°C로 내려가 차이가 3°C이고, 습도표의 건구 25°C 줄과 차이 3°C 칸이 만나는 곳에서 습도 77%를 찾는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${thermo(70, 'dry', false)}${thermo(160, 'wet', true)}
        <text x="70" y="40" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">건구</text>
        <text x="160" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">습구</text>
        <text x="40" y="${ty(25) + 6}" text-anchor="end" fill="${RED}" font-size="18" font-weight="800">25°</text>
        <text class="wt" x="186" y="${ty(22) + 6}" fill="${RED}" font-size="18" font-weight="800">22°</text>
        <g class="dif"><path d="M98 ${ty(25)} H122 M98 ${ty(22)} H122" stroke="${DG_C.c}" stroke-width="2.5" stroke-dasharray="4 4"/>
          <text x="110" y="${ty(25) - 12}" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="800">3°</text></g>
        <g class="tb">
          <text x="350" y="78" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">습도표 (%)</text>
          <rect x="236" y="92" width="232" height="96" rx="12" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
          <line x1="236" y1="136" x2="468" y2="136" stroke="#d2d2d7" stroke-width="2"/>
          <line x1="300" y1="92" x2="300" y2="188" stroke="#d2d2d7" stroke-width="2"/>
          <text x="268" y="122" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">차이</text>
          <text x="268" y="170" text-anchor="middle" fill="${DG_C.ink}" font-size="18" font-weight="800">25°</text>
          ${HT.map((h, i) => `<text x="${330 + i * 56}" y="122" text-anchor="middle" fill="${i === 2 ? DG_C.c : DG_C.sub}" font-size="20" font-weight="800">${h[0]}</text>
            <text x="${330 + i * 56}" y="170" text-anchor="middle" fill="${i === 2 ? DG_C.c : DG_C.ink}" font-size="20" font-weight="800">${h[1]}</text>`).join('')}
          <rect class="hl" x="420" y="141" width="44" height="42" rx="10" fill="none" stroke="${DG_C.c}" stroke-width="3.5"/>
        </g>
        <text class="ans" x="350" y="236" text-anchor="middle" fill="${DG_C.c}" font-size="26" font-weight="800">습도 77%</text>
        <text class="nt" x="350" y="278" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">차이가 클수록 습도↓</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          // 젖은 헝겊의 물이 증발하며 습구 온도가 내려감
          const t = 25 - 3 * dgEase(dgP(e, 400, 1600));
          q('.wet').setAttribute('y', ty(t)); q('.wet').setAttribute('height', 236 - ty(t));
          q('.wt').setAttribute('opacity', e > 2000 ? 1 : 0);
          q('.dif').setAttribute('opacity', e > 2400 ? 1 : 0);
          q('.tb').setAttribute('opacity', dgP(e, 3000, 500));
          q('.hl').setAttribute('opacity', e > 3900 ? 1 : 0);
          q('.ans').setAttribute('opacity', e > 4400 ? 1 : 0);
          q('.nt').setAttribute('opacity', e > 5200 ? 1 : 0);
        });
      }
    },

    's5-06:1': {
      alt: '수증기가 응결하여 차가운 풀잎 표면에 맺힌 물방울은 이슬, 땅 가까이 떠 있는 작은 물방울은 안개, 하늘 높이 올라가 차가워져 떠 있는 물방울과 얼음 알갱이는 구름인 것을 한 장면에 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="0" y="262" width="480" height="38" fill="#d6efdc"/>
        <g class="cl"><path d="M250 92 a26 26 0 0 1 22 -40 a34 34 0 0 1 62 -6 a26 26 0 0 1 42 22 a22 22 0 0 1 -4 24 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
          <text x="312" y="124" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">구름</text>
          <text x="312" y="150" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">하늘 높이</text></g>
        <g class="up">${[0, 1, 2].map(k => `<path d="M${200 - k * 22} ${236 - k * 6} V${120 + k * 10}" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="5 6"/><path d="M${193 - k * 22} ${130 + k * 10} l7 -10 l7 10" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
          <text x="146" y="100" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="700">올라가 식어요</text></g>
        <g class="fg">${[[260, 246, 90], [360, 240, 100], [430, 250, 70]].map(f => `<ellipse cx="${f[0]}" cy="${f[1]}" rx="${f[2]}" ry="16" fill="${DG_C.sub}" fill-opacity=".2"/>`).join('')}
          <text x="380" y="214" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">안개</text>
          <text x="380" y="190" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">땅 가까이</text></g>
        ${[[30, 0], [52, 10], [74, -6], [96, 6]].map(g => `<path d="M${g[0]} 264 Q${g[0] + g[1] - 4} 230 ${g[0] + g[1] + 6} 196 Q${g[0] + g[1] + 6} 232 ${g[0] + 10} 264 Z" fill="${DG_C.r}"/>`).join('')}
        <g class="dw">${[[38, 232], [62, 214], [83, 240], [104, 220], [58, 248]].map(d => `<circle cx="${d[0]}" cy="${d[1]}" r="5" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="2"/>`).join('')}
          <text x="66" y="176" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">이슬</text>
          <text x="66" y="152" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">풀잎 표면</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.dw').setAttribute('opacity', dgP(e, 300, 800));
          q('.fg').setAttribute('opacity', dgP(e, 1500, 900));
          const u = dgP(e, 2700, 1200);
          q('.up').setAttribute('opacity', u > 0 ? 1 : 0);
          q('.up').setAttribute('transform', `translate(0,${30 * (1 - dgEase(u))})`);
          q('.cl').setAttribute('opacity', dgP(e, 3800, 900));
        });
      }
    },

    's5-06:2': {
      alt: '차가운 공기가 있는 고기압 쪽은 공기 알갱이가 많아 누르는 힘이 크고, 따뜻한 저기압 쪽은 적어서, 공기가 고기압에서 저기압으로 이동하는 바람이 부는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="30" y="66" width="160" height="166" rx="16" fill="${DG_C.b}" fill-opacity=".5"/>
        <rect x="290" y="66" width="160" height="166" rx="16" fill="${DG_C.a}" fill-opacity=".5"/>
        ${HI.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="${DG_C.d}"/>`).join('')}
        ${LO.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="${DG_C.c}"/>`).join('')}
        <text x="110" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="24" font-weight="800">고기압</text>
        <text x="370" y="40" text-anchor="middle" fill="${DG_C.c}" font-size="24" font-weight="800">저기압</text>
        <text x="110" y="290" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">차갑고 무거워요</text>
        <text x="370" y="290" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">따뜻하고 가벼워요</text>
        <line x1="20" y1="246" x2="460" y2="246" stroke="${DG_C.sub}" stroke-width="3"/>
        ${MV.map(i => `<circle class="mv mv${i}" r="5" fill="${DG_C.d}"/>`).join('')}
        <g class="wd"><path d="M196 150 H280" stroke="${DG_C.r}" stroke-width="7" stroke-linecap="round"/>
          <path d="M268 136 l14 14 l-14 14" fill="none" stroke="${DG_C.r}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="238" y="128" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="800">바람</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.wd').setAttribute('opacity', dgP(e, 1200, 600));
          MV.forEach(i => {
            // 알갱이 몇 개가 고기압 → 저기압으로 이동
            const f = dgEase(dgP(e, 1600 + i * 500, 1600)), y = 110 + i * 22;
            const c = q('.mv' + i);
            c.setAttribute('cx', 170 + (320 + (i % 3) * 30 - 170) * f); c.setAttribute('cy', y);
            c.setAttribute('opacity', f > 0 ? 1 : 0);
          });
        });
      }
    },

    's5-06:3': {
      alt: '낮에는 육지가 빨리 데워져 육지 위가 저기압, 바다 위가 고기압이 되어 바다에서 육지로 해풍이 불고, 밤에는 육지가 빨리 식어 육지에서 바다로 육풍이 부는 것을 비교한 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${row(0, true)}
        <line x1="10" y1="150" x2="470" y2="150" stroke="#e5e5ea" stroke-width="2"/>
        ${row(152, false)}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          [0, 1].forEach(i => {
            const f = dgEase(dgP(e, 600 + i * 2200, 1200));
            q('.w' + i).setAttribute('opacity', f > 0 ? 1 : 0);
            q('.w' + i).setAttribute('transform', `translate(${(i ? 1 : -1) * 40 * (1 - f)},0)`);
          });
        });
      }
    },

    's5-06:4': {
      alt: '우리나라에 겨울에는 북서쪽 대륙의 차갑고 건조한 공기, 여름에는 남동쪽 바다의 덥고 습한 공기, 봄과 가을에는 남서쪽 대륙의 따뜻하고 건조한 공기가 오는 것을 화살표로 표시한 지도 그림',
      svg: `<svg viewBox="0 0 480 346" class="dg-svg" role="img"><g transform="translate(0,36)">
        <rect x="0" y="0" width="480" height="310" rx="16" fill="${DG_C.b}" fill-opacity=".45"/>
        <path d="M0 0 H330 V30 Q300 62 268 86 L244 94 Q218 118 210 160 Q196 220 200 310 H0 Z" fill="${DG_C.a}" fill-opacity=".7"/>
        <path d="M243 95 L269 86 Q282 118 276 150 Q270 178 254 192 Q240 188 238 166 Q235 128 243 95 Z" fill="${DG_C.r}" stroke="#1e7a37" stroke-width="2"/>
        <text x="282" y="150" fill="${DG_C.ink}" font-size="20" font-weight="800">우리나라</text>
        <text x="130" y="140" text-anchor="middle" fill="#b25d00" font-size="18" font-weight="700">대륙</text>
        <text x="420" y="300" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">바다</text>
        <g class="a0"><path d="M60 70 L222 128" stroke="${DG_C.d}" stroke-width="8" stroke-linecap="round"/><path d="M204 112 l20 17 l-26 4" fill="none" stroke="${DG_C.d}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="14" y="30" fill="${DG_C.d}" font-size="20" font-weight="800">겨울 · 북서쪽</text>
          <text x="14" y="56" fill="${DG_C.ink}" font-size="18" font-weight="700">차갑고 건조</text></g>
        <g class="a1"><path d="M430 250 L286 186" stroke="${RED}" stroke-width="8" stroke-linecap="round"/><path d="M296 204 l-12 -18 l22 -4" fill="none" stroke="${RED}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="466" y="222" text-anchor="end" fill="${RED}" font-size="20" font-weight="800">여름 · 남동쪽</text>
          <text x="466" y="196" text-anchor="end" fill="${DG_C.ink}" font-size="18" font-weight="700">덥고 습함</text></g>
        <g class="a2"><path d="M70 250 L222 182" stroke="${DG_C.r}" stroke-width="8" stroke-linecap="round"/><path d="M200 180 l24 1 l-12 20" fill="none" stroke="${DG_C.r}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="14" y="274" fill="#1e7a37" font-size="20" font-weight="800">봄·가을 · 남서쪽</text>
          <text x="14" y="298" fill="${DG_C.ink}" font-size="18" font-weight="700">따뜻하고 건조</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 400 + i * 1600, 1000));
            q('.a' + i).setAttribute('opacity', f);
          });
        });
      }
    },
  });
})();
