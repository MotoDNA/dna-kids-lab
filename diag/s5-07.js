/* 6학년 과학 · 식물은 어떻게 스스로 양분을 만들까? (s5-07) */
(() => {
  const RED = '#ff3b30', GRN = DG_C.r, DGRN = '#1e7a37', BRN = '#a2845e';
  const arrow = (cls, x1, y1, x2, y2, col, w = 5, dash = '') => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 12;
    const p1 = [x2 - h * Math.cos(a - .5), y2 - h * Math.sin(a - .5)], p2 = [x2 - h * Math.cos(a + .5), y2 - h * Math.sin(a + .5)];
    return `<g class="${cls}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ''}/>
      <path d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${x2} ${y2} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${DG_C.sub}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="3.5" fill="${DG_C.sub}"/>`;

  /* 0: 양파 표피 세포 (벽돌 모양) */
  const OC = { x: 128, y: 146, r: 108 };
  let cells = '';
  for (let r = 0; r < 8; r++) for (let c = -1; c < 5; c++) {
    const w = 64, h = 32, x = 20 + c * w + (r % 2) * 32, y = 34 + r * h;
    cells += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f2fbf4" stroke="${GRN}" stroke-width="4"/><ellipse cx="${x + w / 2 + ((r + c) % 3 - 1) * 8}" cy="${y + h / 2}" rx="6" ry="5" fill="#8e5cc7"/>`;
  }

  /* 1: 물이 올라가는 길 (뿌리 끝 → 줄기 → 잎) */
  const WP = [[110, 262], [110, 190], [110, 78]];
  const wpt = t => { const L1 = 72, L2 = 112, s = t * (L1 + L2); return s < L1 ? [110, 262 - s] : [110, 190 - (s - L1)]; };
  const XS = [[-22, -12], [6, -26], [20, 4], [-6, 14], [-28, 14], [28, -14], [0, -6], [12, 24], [-16, -30]];

  /* 4: 씨 퍼지기 */
  const CELL = [
    { n: '민들레', m: '바람', col: DG_C.d },
    { n: '도꼬마리', m: '동물 털', col: '#b25d00' },
    { n: '봉선화', m: '열매가 터짐', col: RED },
    { n: '코코야자', m: '물', col: DG_C.d },
  ];
  const cxy = i => ({ x: (i % 2) * 240, y: 40 + Math.floor(i / 2) * 140 });

  Object.assign(DIAG, {
    's5-07:0': {
      alt: '현미경으로 본 양파 표피 세포가 벽돌처럼 쌓여 있고 각 세포에 세포벽과 핵이 있는 그림. 식물 세포에는 세포벽이 있고 동물 세포에는 세포벽이 없다',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        <defs><clipPath id="s507c"><circle cx="${OC.x}" cy="${OC.y}" r="${OC.r}"/></clipPath></defs>
        <circle cx="${OC.x}" cy="${OC.y}" r="${OC.r}" fill="#fff"/>
        <g class="cv" clip-path="url(#s507c)">${cells}</g>
        <circle cx="${OC.x}" cy="${OC.y}" r="${OC.r}" fill="none" stroke="${DG_C.ink}" stroke-width="6"/>
        <text x="${OC.x}" y="290" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">양파 표피 (현미경)</text>
        <g class="cmp">
          <rect x="282" y="62" width="88" height="62" rx="4" fill="#f2fbf4" stroke="${GRN}" stroke-width="6"/>
          <rect x="290" y="70" width="72" height="46" rx="3" fill="none" stroke="${DG_C.sub}" stroke-width="1.5" stroke-dasharray="3 3"/>
          <ellipse cx="326" cy="93" rx="10" ry="8" fill="#8e5cc7"/>
          <text x="326" y="152" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">식물 세포</text>
          ${lead(392, 72, 370, 72)}<text x="398" y="78" fill="${DGRN}" font-size="18" font-weight="800">세포벽</text>
          ${lead(392, 104, 336, 96)}<text x="398" y="110" fill="#8e5cc7" font-size="18" font-weight="800">핵</text>
          <path d="M290 192 q10 -24 40 -20 q36 -6 40 20 q8 30 -30 34 q-48 6 -50 -34 Z" fill="#fff4e8" stroke="${DG_C.sub}" stroke-width="2.5"/>
          <ellipse cx="330" cy="200" rx="10" ry="8" fill="#8e5cc7"/>
          <text x="330" y="262" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">동물 세포</text>
          <text x="330" y="288" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">세포벽 없음</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          const z = dgEase(dgP(e, 200, 1400));
          q('.cv').setAttribute('transform', `translate(${OC.x} ${OC.y}) scale(${0.45 + 0.55 * z}) translate(${-OC.x} ${-OC.y})`);
          q('.cv').setAttribute('opacity', dgP(e, 200, 500));
          q('.cmp').setAttribute('opacity', dgP(e, 2000, 800));
        });
      }
    },

    's5-07:1': {
      alt: '뿌리가 흡수한 물이 줄기를 따라 잎까지 올라가고, 붉은 색소 물에 꽂은 줄기를 가로로 자르면 붉은 점들이, 세로로 자르면 붉은 줄이 보이는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="10" y="190" width="220" height="100" rx="10" fill="#f3e6d3"/>
        <path d="M110 190 V64" stroke="${GRN}" stroke-width="10" stroke-linecap="round"/>
        <path d="M110 120 q-50 -30 -64 4 q30 22 64 -4 Z M110 92 q46 -38 66 -6 q-30 26 -66 6 Z" fill="${GRN}"/>
        <g fill="none" stroke="${BRN}" stroke-width="5" stroke-linecap="round">
          <path d="M110 190 V266 M110 214 L90 244 M110 222 L134 252 M110 240 L98 268"/></g>
        <g stroke="${BRN}" stroke-width="2" stroke-linecap="round">${[[92, 238], [96, 232], [128, 244], [124, 238], [104, 260], [110, 256], [110, 250]].map(p => `<line x1="${p[0]}" y1="${p[1]}" x2="${p[0] + 6}" y2="${p[1] + 6}"/>`).join('')}</g>
        ${Array.from({ length: 6 }, (_, k) => `<circle class="wd wd${k}" r="5" fill="${DG_C.d}"/>`).join('')}
        <text x="16" y="146" fill="${DG_C.ink}" font-size="20" font-weight="800">줄기</text>
        <text x="16" y="172" fill="${DG_C.d}" font-size="18" font-weight="700">물의 통로</text>
        <text x="16" y="222" fill="${DG_C.ink}" font-size="20" font-weight="800">뿌리</text>
        <text x="16" y="248" fill="${DG_C.d}" font-size="18" font-weight="700">물 흡수</text>
        <line x1="246" y1="50" x2="246" y2="290" stroke="#e5e5ea" stroke-width="2"/>
        <circle cx="318" cy="124" r="50" fill="#f2fbf4" stroke="${GRN}" stroke-width="4"/>
        ${XS.map((p, k) => `<circle class="xs" cx="${318 + p[0]}" cy="${124 + p[1]}" r="5" fill="${RED}"/>`).join('')}
        <text x="318" y="206" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">가로 단면</text>
        <rect x="404" y="54" width="44" height="180" rx="8" fill="#f2fbf4" stroke="${GRN}" stroke-width="4"/>
        ${[416, 426, 436].map((x, k) => `<line class="ls ls${k}" x1="${x}" y1="230" x2="${x}" y2="58" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`).join('')}
        <text x="426" y="266" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">세로 단면</text>
        <text class="rt" x="318" y="236" text-anchor="middle" fill="${RED}" font-size="18" font-weight="700">물이 지나간 길</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          for (let k = 0; k < 6; k++) {
            const st = 200 + k * 380, t = dgP(e, st, 2000), [x, y] = wpt(t), d = q('.wd' + k);
            d.setAttribute('cx', x); d.setAttribute('cy', y);
            d.setAttribute('opacity', t > 0 && t < 1 ? 1 : 0);
          }
          qa('.xs').forEach((c, k) => c.setAttribute('opacity', e > 3100 + k * 90 ? 1 : 0));
          [0, 1, 2].forEach(k => { const f = dgEase(dgP(e, 3600 + k * 150, 1200)); const l = q('.ls' + k); l.setAttribute('y2', 230 - 172 * f); l.setAttribute('opacity', f > 0 ? 1 : 0); });
          q('.rt').setAttribute('opacity', e > 5000 ? 1 : 0);
        });
      }
    },

    's5-07:2': {
      alt: '잎이 빛을 받아 이산화 탄소와 뿌리에서 올라온 물로 녹말 같은 양분을 만들고 산소를 내보내며(광합성), 물이 기공을 통해 수증기로 빠져나가는(증산 작용) 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <circle cx="46" cy="50" r="22" fill="${DG_C.c}"/>
        ${Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `<line x1="${46 + 28 * Math.cos(a)}" y1="${50 + 28 * Math.sin(a)}" x2="${46 + 36 * Math.cos(a)}" y2="${50 + 36 * Math.sin(a)}" stroke="${DG_C.c}" stroke-width="3.5" stroke-linecap="round"/>`; }).join('')}
        <g transform="rotate(-12 240 156)">
          <path d="M120 156 Q240 70 362 156 Q240 242 120 156 Z" fill="#d6efdc" stroke="${GRN}" stroke-width="4"/>
          <path d="M120 156 H350 M200 156 L230 128 M200 156 L230 184 M270 156 L298 132 M270 156 L298 180" stroke="${GRN}" stroke-width="2.5" fill="none"/>
        </g>
        <g class="st"><rect x="196" y="148" width="92" height="34" rx="10" fill="#fff" stroke="${DG_C.c}" stroke-width="2.5"/>
          <text x="242" y="172" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">양분(녹말)</text></g>
        ${arrow('i0', 76, 76, 160, 118, DG_C.c)}
        <text class="i0" x="96" y="66" fill="${DG_C.c}" font-size="20" font-weight="800">빛</text>
        ${arrow('i1', 14, 200, 120, 180, DG_C.sub)}
        <text class="i1" x="14" y="234" fill="${DG_C.sub}" font-size="20" font-weight="800">이산화 탄소</text>
        ${arrow('i2', 236, 292, 236, 214, DG_C.d)}
        <text class="i2" x="222" y="282" text-anchor="end" fill="${DG_C.d}" font-size="20" font-weight="800">물</text>
        ${arrow('o0', 352, 116, 440, 80, GRN)}
        <text class="o0" x="446" y="112" text-anchor="end" fill="${DGRN}" font-size="20" font-weight="800">산소</text>
        ${arrow('o1', 330, 196, 420, 236, DG_C.d, 4, '6 6')}
        <text class="o1" x="470" y="270" text-anchor="end" fill="${DG_C.d}" font-size="18" font-weight="800">수증기(기공)</text>
      </svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          const show = (c, t) => qa('.' + c).forEach(g => g.setAttribute('opacity', dgP(e, t, 500)));
          show('i0', 300); show('i1', 1100); show('i2', 1900); show('st', 2900); show('o0', 3700); show('o1', 4700);
        });
      }
    },

    's5-07:3': {
      alt: '꽃의 암술, 수술, 꽃잎, 꽃받침에 이름표를 붙이고, 벌이 수술의 꽃가루를 암술로 옮기는 꽃가루받이를 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M200 296 V200" stroke="${GRN}" stroke-width="8" stroke-linecap="round"/>
        <path d="M200 160 Q120 70 98 150 Q110 200 200 196 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
        <path d="M200 160 Q280 70 302 150 Q290 200 200 196 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
        <path d="M200 200 Q170 196 158 216 Q186 220 200 206 Z M200 200 Q230 196 242 216 Q214 220 200 206 Z" fill="${GRN}"/>
        <path d="M192 192 L168 108 M208 192 L232 108" stroke="#c7a200" stroke-width="3"/>
        <ellipse cx="167" cy="102" rx="9" ry="7" fill="#ffcc00" stroke="#c7a200" stroke-width="2"/>
        <ellipse cx="233" cy="102" rx="9" ry="7" fill="#ffcc00" stroke="#c7a200" stroke-width="2"/>
        <ellipse cx="200" cy="180" rx="14" ry="18" fill="#bfe5c9" stroke="${GRN}" stroke-width="3"/>
        <path d="M200 162 V88" stroke="${GRN}" stroke-width="6"/>
        <ellipse cx="200" cy="84" rx="12" ry="7" fill="#bfe5c9" stroke="${GRN}" stroke-width="3"/>
        <g class="pl"><circle cx="196" cy="80" r="3.5" fill="#ffcc00" stroke="#c7a200"/><circle cx="204" cy="82" r="3.5" fill="#ffcc00" stroke="#c7a200"/></g>
        <g class="lb0">${lead(70, 70, 190, 84)}<text x="14" y="76" fill="${DGRN}" font-size="20" font-weight="800">암술</text></g>
        <g class="lb1">${lead(300, 92, 242, 102)}<text x="306" y="98" fill="#b28a00" font-size="20" font-weight="800">수술</text></g>
        <g class="lb2">${lead(66, 186, 116, 160)}<text x="14" y="192" fill="${DG_C.c}" font-size="20" font-weight="800">꽃잎</text></g>
        <g class="lb3">${lead(290, 238, 238, 214)}<text x="296" y="244" fill="${DGRN}" font-size="20" font-weight="800">꽃받침</text></g>
        <g class="bee">
          <ellipse cx="-6" cy="-14" rx="10" ry="7" fill="#fff" stroke="${DG_C.sub}" stroke-width="2"/>
          <ellipse cx="8" cy="-14" rx="10" ry="7" fill="#fff" stroke="${DG_C.sub}" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="18" ry="11" fill="#ffcc00" stroke="${DG_C.ink}" stroke-width="2.5"/>
          <path d="M-4 -10 V10 M6 -9 V9" stroke="${DG_C.ink}" stroke-width="4"/>
          <circle cx="-18" cy="-2" r="5" fill="${DG_C.ink}"/>
          <circle class="cp" cx="0" cy="14" r="4" fill="#ffcc00" stroke="#c7a200"/>
        </g>
        <text class="msg" x="470" y="268" text-anchor="end" fill="${DG_C.ink}" font-size="22" font-weight="800">꽃가루받이</text>
        <text class="msg" x="470" y="294" text-anchor="end" fill="${DG_C.sub}" font-size="18" font-weight="700">수술 → 암술</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        // 벌의 경로: 오른쪽 위 → 수술 꽃밥 → 암술 머리 → 옆으로
        const K = [[430, 150, 0], [258, 92, 1600], [258, 92, 2300], [224, 70, 3300], [224, 70, 4100], [330, 150, 5200]];
        dgAnim(el, 6000, e => {
          [0, 1, 2, 3].forEach(i => q('.lb' + i).setAttribute('opacity', dgP(e, 200 + i * 350, 400)));
          let x = K[0][0], y = K[0][1];
          for (let i = 1; i < K.length; i++) {
            if (e >= K[i - 1][2]) { const f = dgEase(dgP(e, K[i - 1][2], K[i][2] - K[i - 1][2])); x = K[i - 1][0] + (K[i][0] - K[i - 1][0]) * f; y = K[i - 1][1] + (K[i][1] - K[i - 1][1]) * f; }
          }
          q('.bee').setAttribute('transform', `translate(${x},${y + Math.sin(e / 140) * 2 * (e < 5200 ? 1 : 0)})`);
          q('.cp').setAttribute('opacity', e > 2000 && e < 3900 ? 1 : 0);
          q('.pl').setAttribute('opacity', e > 3900 ? 1 : 0);
          qa('.msg').forEach(t => t.setAttribute('opacity', e > 4300 ? 1 : 0));
        });
      }
    },

    's5-07:4': {
      alt: '민들레 씨는 솜털이 있어 바람에 날리고, 도꼬마리 씨는 갈고리로 동물 털에 붙고, 봉선화는 열매 껍질이 터지며 씨가 튀어 나가고, 코코야자는 물에 떠서 퍼지는 모습을 모은 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${CELL.map((c, i) => { const p = cxy(i); return `<rect x="${p.x + 6}" y="${p.y}" width="228" height="132" rx="16" fill="#f9f9fb"/>
          <text x="${p.x + 120}" y="${p.y + 120}" text-anchor="middle" font-size="20" font-weight="800"><tspan fill="${DG_C.ink}">${c.n}</tspan><tspan fill="${c.col}"> · ${c.m}</tspan></text>`; }).join('')}
        <!-- 민들레 -->
        <g class="wind" stroke="${DG_C.d}" stroke-width="3.5" fill="none" stroke-linecap="round"><path d="M20 84 q10 -6 20 0 t20 0 t20 0"/><path d="M28 104 q10 -6 20 0 t20 0 t20 0"/></g>
        <g class="dd">${Array.from({ length: 11 }, (_, k) => { const a = (-165 + k * 15) * Math.PI / 180; return `<line x1="0" y1="0" x2="${(26 * Math.cos(a)).toFixed(1)}" y2="${(26 * Math.sin(a)).toFixed(1)}" stroke="${DG_C.sub}" stroke-width="2.5"/>`; }).join('')}
          <line x1="0" y1="0" x2="0" y2="30" stroke="${DG_C.sub}" stroke-width="2.5"/><ellipse cx="0" cy="37" rx="4" ry="8" fill="${BRN}"/></g>
        <!-- 도꼬마리 -->
        <rect x="256" y="48" width="208" height="26" rx="13" fill="${BRN}" fill-opacity=".6"/>
        ${Array.from({ length: 12 }, (_, k) => `<path d="M${264 + k * 17} 70 q4 12 -2 22" fill="none" stroke="${BRN}" stroke-width="3" stroke-linecap="round"/>`).join('')}
        <g class="bur"><ellipse cx="0" cy="0" rx="10" ry="15" fill="#9bb87a" stroke="${DGRN}" stroke-width="2"/>
          ${[[-10, -6], [10, -6], [-10, 6], [10, 6], [0, -15], [-6, 13], [6, 13]].map(h => `<path d="M${h[0]} ${h[1]} l${h[0] > 0 ? 5 : h[0] < 0 ? -5 : 0} ${h[1] < 0 ? -5 : 5} l${h[0] >= 0 ? -3 : 3} -2" fill="none" stroke="${DGRN}" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>
        <!-- 봉선화 -->
        <g class="pod0"><path d="M120 236 q-34 -4 -40 -32" fill="none" stroke="${GRN}" stroke-width="7" stroke-linecap="round"/></g>
        <g class="pod1"><path d="M120 236 q30 -6 34 -34" fill="none" stroke="${GRN}" stroke-width="7" stroke-linecap="round"/></g>
        <path class="podc" d="M104 238 q16 -26 32 0 q-16 10 -32 0 Z" fill="${GRN}"/>
        ${[[-60, -30], [-40, -48], [0, -54], [40, -46], [62, -26]].map((v, k) => `<circle class="sd" data-k="${k}" r="6" fill="${BRN}"/>`).join('')}
        <!-- 코코야자 -->
        <path class="wave" d="M246 236 q14 -8 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 V258 H246 Z" fill="${DG_C.b}"/>
        <g class="coco"><circle cx="0" cy="0" r="20" fill="${BRN}" stroke="#6e5537" stroke-width="2.5"/><circle cx="-5" cy="-4" r="2.5" fill="#6e5537"/><circle cx="4" cy="-6" r="2.5" fill="#6e5537"/></g>
        <path class="arw" d="M300 206 h60 m-10 -8 l10 8 l-10 8" fill="none" stroke="${DG_C.d}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        const SD = [[-62, -20], [-38, -38], [0, -44], [38, -38], [64, -18]];
        dgAnim(el, 6400, e => {
          // 민들레: 바람에 오른쪽 위로 날아감
          const a = dgEase(dgP(e, 200, 2400));
          q('.dd').setAttribute('transform', `translate(${100 + 80 * a},${84 - 18 * a}) rotate(${-10 + 20 * a})`);
          q('.wind').setAttribute('transform', `translate(${20 * a},0)`);
          // 도꼬마리: 아래에서 올라가 털에 걸림
          const b = dgEase(dgP(e, 1000, 1400));
          q('.bur').setAttribute('transform', `translate(${300 + 40 * b},${140 - 34 * b}) scale(1.3)`);
          // 봉선화: 껍질이 말리며 씨가 튀어 나감
          const c = dgEase(dgP(e, 2400, 900));
          q('.pod0').setAttribute('opacity', c); q('.pod1').setAttribute('opacity', c);
          q('.podc').setAttribute('opacity', 1 - c);
          qa('.sd').forEach(s => { const v = SD[+s.dataset.k]; s.setAttribute('cx', 120 + v[0] * c); s.setAttribute('cy', 226 + v[1] * c); });
          // 코코야자: 물결 따라 오른쪽으로
          const d = dgEase(dgP(e, 3600, 2400));
          q('.coco').setAttribute('transform', `translate(${290 + 120 * d},${232 + 3 * Math.sin(d * 12)})`);
          q('.arw').setAttribute('opacity', e > 3600 ? 1 : 0);
        });
      }
    },
  });
})();
