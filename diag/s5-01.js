/* 5학년 과학 · 우리 몸은 어떻게 움직이고 살아갈까? (s5-01) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  const RED = '#ff3b30', BONE = '#f5f5f7', MUS = '#ff8a80', MUS2 = '#ffb3a7', BODY = '#fbeee4';
  // 두 점 사이 근육(볼록한 렌즈 모양), w = 두께
  const muscle = (A, B, w, side = 1) => {
    const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy);
    const nx = -dy / L, ny = dx / L;
    const c1 = [mx + nx * w * side * 1.6, my + ny * w * side * 1.6], c2 = [mx - nx * w * side * 0.4, my - ny * w * side * 0.4];
    return `M${f2(A[0])} ${f2(A[1])} Q${f2(c1[0])} ${f2(c1[1])} ${f2(B[0])} ${f2(B[1])} Q${f2(c2[0])} ${f2(c2[1])} ${f2(A[0])} ${f2(A[1])} Z`;
  };
  /* 0: 팔 */
  const SH = [60, 200], EL = [250, 200], FL = 130;
  const rotP = (ang, d, off = 0) => { const a = ang * Math.PI / 180; return [EL[0] + d * Math.cos(a) - off * Math.sin(a), EL[1] + d * Math.sin(a) + off * Math.cos(a)]; };

  /* 1: 소화 기관 경로 */
  const ROUTE = 'M200 66 L200 92 L204 140 Q206 158 222 162 Q262 166 262 186 Q258 212 222 206 L206 204 Q186 210 186 222 Q190 236 214 232 Q232 228 230 244 Q226 258 200 256 Q178 254 176 266 Q180 280 210 278 L146 280 L146 196 Q146 186 158 186 L272 186 Q284 186 284 198 L284 280 Q282 300 214 302 L200 318';

  Object.assign(DIAG, {
    's5-01:0': {
      alt: '팔을 구부리면 위팔 안쪽 근육의 길이가 줄어들면서 아래팔뼈를 끌어올리고, 바깥쪽 근육은 늘어나는 모습을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="${SH[0]}" y="${SH[1] - 9}" width="${EL[0] - SH[0]}" height="18" rx="9" fill="${BONE}" stroke="${DG_C.sub}" stroke-width="3"/>
        <circle cx="${SH[0]}" cy="${SH[1]}" r="16" fill="${BONE}" stroke="${DG_C.sub}" stroke-width="3"/>
        <g class="fa"><rect x="0" y="-8" width="${FL}" height="16" rx="8" fill="${BONE}" stroke="${DG_C.sub}" stroke-width="3"/>
          <path d="M${FL - 4} -12 q24 -6 32 6 q4 10 -6 14 q-14 6 -26 4" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="3"/></g>
        <circle cx="${EL[0]}" cy="${EL[1]}" r="11" fill="${BONE}" stroke="${DG_C.sub}" stroke-width="3"/>
        <path class="bi" d="" fill="${MUS}" stroke="${RED}" stroke-width="3" stroke-linejoin="round"/>
        <path class="tri" d="" fill="${MUS2}" stroke="${DG_C.c}" stroke-width="3" stroke-linejoin="round"/>
        <g class="lb">
          <text x="24" y="64" fill="${RED}" font-size="20" font-weight="800">안쪽 근육</text>
          <text x="24" y="90" fill="${RED}" font-size="20" font-weight="800">줄어들어요</text>
          <path d="${arw(90, 100, 128, 160, 8)}" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
          <text x="24" y="290" fill="${DG_C.c}" font-size="20" font-weight="800">바깥쪽 근육: 늘어나요</text>
          <path d="${arw(110, 268, 130, 224, 8)}" fill="none" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>
          <path d="M346 200 A96 96 0 0 0 272 108" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-dasharray="6 6"/>
          <path d="${arw(288, 116, 270, 106, 10)}" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>
          <text x="300" y="246" fill="${DG_C.d}" font-size="20" font-weight="800">아래팔뼈가</text>
          <text x="300" y="272" fill="${DG_C.d}" font-size="20" font-weight="800">올라와요</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          const f = dgEase(dgP(e, 600, 2400)), ang = -100 * f;
          q('.fa').setAttribute('transform', `translate(${EL[0]},${EL[1]}) rotate(${f2(ang)})`);
          const bA = [SH[0] + 30, SH[1] - 8], bB = rotP(ang, 30, -8);
          const L = Math.hypot(bB[0] - bA[0], bB[1] - bA[1]);
          q('.bi').setAttribute('d', muscle(bA, bB, Math.max(8, Math.min(26, 8 + (190 - L) * 0.32)), -1));
          const tA = [SH[0] + 30, SH[1] + 8], tB = rotP(ang, -14, 8);
          const L2 = Math.hypot(tB[0] - tA[0], tB[1] - tA[1]);
          q('.tri').setAttribute('d', muscle(tA, tB, Math.max(4, 14 - (L2 - 180) * 0.15), 1));
          q('.lb').setAttribute('opacity', e > 3200 ? 1 : 0);
        });
      }
    },

    's5-01:1': {
      alt: '음식물이 입, 식도, 위, 작은창자, 큰창자를 차례로 지나 찌꺼기는 항문으로 나가는 소화 기관의 경로를 나타낸 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img">
        <circle cx="200" cy="40" r="32" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="3"/>
        <path d="M200 72 V84 M130 100 Q130 84 160 84 H240 Q270 84 270 100 L296 320 Q296 334 280 334 H120 Q104 334 104 320 Z" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="3"/>
        <path d="M188 50 Q200 58 212 50" fill="none" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
        <path d="M200 66 L200 92 L204 140" fill="none" stroke="#e8a0a0" stroke-width="9" stroke-linecap="round"/>
        <path d="M204 140 Q206 160 226 164 Q266 168 264 190 Q258 214 222 208 Q206 206 206 194 Q214 176 204 152 Z" fill="#ffc9c0" stroke="${RED}" stroke-width="3"/>
        <path d="M146 288 V196 Q146 184 158 184 H272 Q286 184 286 198 V282 Q284 300 214 302 L202 316" fill="none" stroke="${DG_C.c}" stroke-width="12" stroke-linejoin="round" stroke-opacity=".55"/>
        <path d="M206 210 Q184 212 186 224 Q190 236 214 232 Q234 228 232 244 Q228 260 200 258 Q176 256 176 268 Q180 282 210 280 L150 282" fill="none" stroke="${DG_C.d}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6"/>
        <path class="route" d="${ROUTE}" fill="none" stroke="none"/>
        <circle class="food" r="8" fill="${DG_C.r}" stroke="#fff" stroke-width="2"/>
        ${[['입', 214, 56, 330, 52], ['식도', 202, 110, 330, 102], ['위', 252, 186, 330, 152], ['작은창자', 230, 244, 330, 236], ['큰창자', 284, 250, 330, 286], ['항문', 202, 318, 330, 324]].map(([t, x, y, lx, ly], i) => `<g class="lb${i}"><path d="M${x} ${y} L${lx - 6} ${ly - 7}" stroke="${DG_C.ink}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3.5" fill="${DG_C.ink}"/>
          <text x="${lx}" y="${ly}" fill="${DG_C.ink}" font-size="20" font-weight="800">${i + 1}. ${t}</text></g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), r = q('.route'), L = r.getTotalLength();
        // 각 기관에 닿는 경로 위치(비율)
        const AN = [[200, 66], [202, 110], [240, 186], [214, 232], [146, 240], [200, 318]], N = 300;
        const SP = Array.from({ length: N + 1 }, (_, i) => r.getPointAtLength(L * i / N));
        const STOP = AN.map(([x, y]) => { let bi = 0, bd = 1e9; SP.forEach((p, i) => { const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; bi = i; } }); return bi / N; });
        dgAnim(el, 7200, e => {
          const t = dgP(e, 300, 6400), p = r.getPointAtLength(L * t);
          q('.food').setAttribute('cx', f2(p.x)); q('.food').setAttribute('cy', f2(p.y));
          q('.food').setAttribute('opacity', e >= 7200 ? 0 : 1);
          STOP.forEach((s, i) => q('.lb' + i).setAttribute('opacity', e >= 7200 || t >= s - 0.001 ? 1 : 0.15));
        });
      }
    },

    's5-01:2': {
      alt: '숨을 들이마시면 공기가 코, 기관, 기관지를 거쳐 폐로 들어가 산소를 받아들이고 이산화 탄소를 내보내며, 심장이 펌프처럼 혈액을 온몸으로 보내고 혈액이 혈관을 따라 다시 심장으로 돌아오는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <path d="M150 40 V100" stroke="${DG_C.sub}" stroke-width="10" stroke-linecap="round"/>
        <path d="M150 100 L118 128 M150 100 L182 128" stroke="${DG_C.sub}" stroke-width="7" stroke-linecap="round"/>
        <path d="M112 112 Q70 120 64 190 Q62 228 100 226 Q126 222 128 190 L128 128 Z" fill="#ffc9c0" stroke="${RED}" stroke-width="3"/>
        <path d="M188 112 Q230 120 236 190 Q238 228 200 226 Q174 222 172 190 L172 128 Z" fill="#ffc9c0" stroke="${RED}" stroke-width="3"/>
        <path class="hrt" d="M150 210 C130 196 124 176 138 170 C146 166 150 174 150 178 C150 174 154 166 162 170 C176 176 170 196 150 210 Z" fill="${RED}" stroke="#c4281c" stroke-width="2"/>
        <path class="ain" d="${arw(126, 22, 142, 50, 8)}" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"/>
        <text class="ain" x="20" y="34" fill="${DG_C.d}" font-size="18" font-weight="800">산소 들어와요</text>
        <path class="aout" d="${arw(160, 50, 178, 22, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/>
        <text class="aout" x="186" y="34" fill="${DG_C.sub}" font-size="18" font-weight="800">이산화 탄소 나가요</text>
        <text x="100" y="256" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">폐</text>
        <text x="150" y="250" text-anchor="middle" fill="${RED}" font-size="20" font-weight="800">심장</text>
        <path class="v1" d="M164 204 C190 250 280 220 350 208" fill="none" stroke="${RED}" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 10"/>
        <path class="v1h" d="${arw(330, 211, 352, 207, 12)}" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
        <path class="v2" d="M440 214 C460 300 230 316 152 216" fill="none" stroke="${DG_C.d}" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 10"/>
        <path class="v2h" d="${arw(170, 236, 154, 218, 12)}" fill="none" stroke="${DG_C.d}" stroke-width="5" stroke-linecap="round"/>
        <g class="bl"><rect x="356" y="188" width="84" height="40" rx="20" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="2"/>
          <text x="398" y="215" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">온몸</text>
          <text x="300" y="182" text-anchor="middle" fill="${RED}" font-size="18" font-weight="800">산소·영양소</text>
          <text x="330" y="318" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="800">다시 심장으로</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6400, e => {
          qa('.ain').forEach(t => t.setAttribute('opacity', dgP(e, 300, 400)));
          qa('.aout').forEach(t => t.setAttribute('opacity', dgP(e, 1400, 400)));
          const beat = e >= 6400 ? 1 : 1 + 0.08 * Math.max(0, Math.sin(e / 140));
          q('.hrt').setAttribute('transform', `translate(150,190) scale(${f2(beat)}) translate(-150,-190)`);
          const off = e >= 6400 ? 0 : -e / 25;
          q('.v1').setAttribute('stroke-dashoffset', f2(off)); q('.v2').setAttribute('stroke-dashoffset', f2(off));
          q('.v1').setAttribute('opacity', dgP(e, 2400, 500)); q('.v1h').setAttribute('opacity', dgP(e, 2400, 500)); q('.v2').setAttribute('opacity', dgP(e, 3200, 500)); q('.v2h').setAttribute('opacity', dgP(e, 3200, 500));
          q('.bl').setAttribute('opacity', dgP(e, 2800, 500));
        });
      }
    },

    's5-01:3': {
      alt: '혈액 속 노폐물이 등 쪽 허리 좌우의 강낭콩 모양 콩팥에서 걸러져 오줌이 되고, 오줌관을 따라 방광에 모였다가 몸 밖으로 나가는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <path d="M150 40 Q150 20 180 20 H300 Q330 20 330 40 L350 300 Q350 314 334 314 H146 Q130 314 130 300 Z" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="3"/>
        <path d="M240 30 V170" stroke="${RED}" stroke-width="6" stroke-opacity=".5"/>
        <path d="M240 112 H196 M240 112 H284" stroke="${RED}" stroke-width="5" stroke-opacity=".5"/>
        ${[-1, 1].map(s => `<path transform="translate(${240 + s * 62},112) scale(${-s},1)" d="M-12 -34 Q14 -40 18 -14 Q20 -2 10 0 Q20 4 18 16 Q14 40 -12 34 Q-30 26 -28 0 Q-30 -26 -12 -34 Z" fill="#c9785f" stroke="#8a4a36" stroke-width="3"/>`).join('')}
        <path class="ur" d="M190 132 Q210 190 228 240 M290 132 Q270 190 252 240" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round"/>
        <path d="M206 236 Q206 214 240 214 Q274 214 274 236 Q274 270 240 272 Q206 270 206 236 Z" fill="#fff" stroke="${DG_C.c}" stroke-width="3"/>
        <clipPath id="s501bl"><path d="M206 236 Q206 214 240 214 Q274 214 274 236 Q274 270 240 272 Q206 270 206 236 Z"/></clipPath>
        <rect class="uri" clip-path="url(#s501bl)" x="200" y="272" width="80" height="0" fill="#ffe27a"/>
        <path d="M240 272 V300" stroke="${DG_C.c}" stroke-width="5" stroke-linecap="round"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="wd${i}" r="5" fill="#ffd60a" stroke="${DG_C.c}" stroke-width="1.5"/>`).join('')}
        <g class="lb">
          <path d="M140 112 L100 112" stroke="${DG_C.ink}" stroke-width="2"/><text x="96" y="104" text-anchor="end" fill="#8a4a36" font-size="20" font-weight="800">콩팥</text>
          <text x="96" y="128" text-anchor="end" fill="${DG_C.sub}" font-size="18" font-weight="700">(거름)</text>
          <path d="M282 180 L370 180" stroke="${DG_C.ink}" stroke-width="2"/><text x="374" y="187" fill="${DG_C.c}" font-size="20" font-weight="800">오줌관</text>
          <path d="M276 248 L370 248" stroke="${DG_C.ink}" stroke-width="2"/><text x="374" y="255" fill="${DG_C.c}" font-size="20" font-weight="800">방광</text>
          <text x="374" y="50" fill="${RED}" font-size="18" font-weight="800">혈액</text><path d="M370 44 L248 60" stroke="${DG_C.ink}" stroke-width="2"/>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const UR = [[[190, 132], [210, 190], [228, 240]], [[290, 132], [270, 190], [252, 240]]];
        const bez = (P, t) => [0, 1].map(k => (1 - t) * (1 - t) * P[0][k] + 2 * (1 - t) * t * P[1][k] + t * t * P[2][k]);
        dgAnim(el, 5600, e => {
          q('.lb').setAttribute('opacity', e > 400 ? 1 : 0);
          for (let i = 0; i < 6; i++) {
            const t = dgP(e, 1000 + i * 500, 1100), [x, y] = bez(UR[i % 2], t);
            const c = q('.wd' + i); c.setAttribute('cx', f2(x)); c.setAttribute('cy', f2(y));
            c.setAttribute('opacity', t > 0 && t < 1 ? 1 : 0);
          }
          const fill = 34 * dgEase(dgP(e, 1800, 3400));
          q('.uri').setAttribute('y', f2(272 - fill)); q('.uri').setAttribute('height', f2(fill));
        });
      }
    },

    's5-01:4': {
      alt: '날아오는 공을 눈(감각 기관)이 보고, 그 자극이 신경을 통해 뇌로 전달되면 뇌가 판단해 다시 신경을 통해 손(운동 기관)에 명령을 보내 공을 잡는 과정을 나타낸 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <circle cx="130" cy="96" r="58" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="3"/>
        <path d="M92 74 Q96 40 132 38 Q170 40 172 76 Q160 92 130 90 Q100 90 92 74 Z" fill="#ffd6e0" stroke="#d6608a" stroke-width="2.5"/>
        <path d="M110 58 q8 8 0 16 M132 50 q8 10 0 20 M152 58 q8 8 0 16" fill="none" stroke="#d6608a" stroke-width="2"/>
        <ellipse cx="168" cy="104" rx="10" ry="8" fill="#fff" stroke="${DG_C.ink}" stroke-width="2.5"/><circle cx="172" cy="104" r="4" fill="${DG_C.ink}"/>
        <path d="M130 154 V200 L180 230 L260 230" fill="none" stroke="${DG_C.sub}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".3"/>
        <path d="M262 214 q20 -8 30 6 l-6 22 q-16 6 -26 -6 Z" fill="${BODY}" stroke="${DG_C.sub}" stroke-width="3"/>
        <path class="n1" d="M164 100 Q150 82 140 74" fill="none" stroke="${DG_C.d}" stroke-width="4" stroke-dasharray="5 5"/>
        <path class="n2" d="M130 80 Q120 140 130 200 L180 228 L262 226" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-dasharray="5 5"/>
        <circle class="s1" r="7" fill="${DG_C.d}"/>
        <circle class="s2" r="7" fill="${DG_C.c}"/>
        <g class="ball"><circle r="18" fill="#fff" stroke="${DG_C.ink}" stroke-width="3"/><path d="M-16 -8 Q0 4 16 -8 M-16 8 Q0 -4 16 8" fill="none" stroke="${RED}" stroke-width="2"/></g>
        <g class="l1"><text x="210" y="66" fill="${DG_C.d}" font-size="20" font-weight="800">① 눈: 공을 봐요</text></g>
        <g class="l2"><text x="14" y="190" fill="#d6608a" font-size="20" font-weight="800">② 뇌: 판단</text></g>
        <g class="l3"><text x="230" y="290" fill="${DG_C.c}" font-size="20" font-weight="800">③ 손: 공을 잡아요</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        const n1 = q('.n1'), n2 = q('.n2'), L1 = n1.getTotalLength(), L2 = n2.getTotalLength();
        dgAnim(el, 6400, e => {
          const fin = e >= 6400;
          const b = dgEase(dgP(e, 200, 4800));
          const bx = 450 - (450 - 300) * b, by = 110 + 90 * b;
          q('.ball').setAttribute('transform', `translate(${f2(bx)},${f2(by)})`);
          q('.l1').setAttribute('opacity', e > 900 ? 1 : 0);
          const t1 = dgP(e, 1200, 900), p1 = n1.getPointAtLength(L1 * t1);
          q('.s1').setAttribute('cx', f2(p1.x)); q('.s1').setAttribute('cy', f2(p1.y));
          q('.s1').setAttribute('opacity', t1 > 0 && t1 < 1 ? 1 : 0);
          n1.setAttribute('opacity', e > 1200 ? 1 : 0);
          q('.l2').setAttribute('opacity', e > 2200 ? 1 : 0);
          const t2 = dgP(e, 2800, 1600), p2 = n2.getPointAtLength(L2 * t2);
          q('.s2').setAttribute('cx', f2(p2.x)); q('.s2').setAttribute('cy', f2(p2.y));
          q('.s2').setAttribute('opacity', t2 > 0 && t2 < 1 ? 1 : 0);
          n2.setAttribute('opacity', e > 2800 ? 1 : 0);
          q('.l3').setAttribute('opacity', e > 4600 ? 1 : 0);
        });
      }
    },
  });
})();
