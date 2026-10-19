/* 1학년 수학 · 누가 더 길고, 무겁고, 넓을까? (m1-04) */
(() => {
  const T = (x, y, s, o = {}) => `<text ${o.c ? `class="${o.c}"` : ''} x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${o.f || DG_C.ink}" font-size="${o.s || 20}" font-weight="${o.w || 700}">${s}</text>`;
  const pencil = `<rect x="0" y="-15" width="20" height="30" rx="4" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="3"/>
    <rect x="20" y="-15" width="230" height="30" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3"/>
    <line x1="22" y1="0" x2="248" y2="0" stroke="${DG_C.c}" stroke-width="2"/>
    <path d="M250 -15 L300 0 L250 15 Z" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M284 -5 L300 0 L284 5 Z" fill="${DG_C.ink}"/>`;
  const crayon = `<rect x="0" y="-17" width="170" height="34" rx="6" fill="${DG_C.d}"/>
    <rect x="30" y="-17" width="110" height="34" fill="${DG_C.b}"/>
    <path d="M170 -13 L200 -6 L200 6 L170 13 Z" fill="${DG_C.d}"/>`;

  /* 1: 양팔 저울 */
  const PV = [240, 104], HL = 150, ROT = -10;
  const ends = a => { const r = a * Math.PI / 180; return [[PV[0] - HL * Math.cos(r), PV[1] - HL * Math.sin(r)], [PV[0] + HL * Math.cos(r), PV[1] + HL * Math.sin(r)]]; };
  const pan = `<path d="M0 0 L-46 86 M0 0 L46 86" stroke="${DG_C.sub}" stroke-width="2.5"/><path d="M-58 86 h116 a58 18 0 0 1 -116 0 Z" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const melon = `<circle r="40" fill="#d6efdc" stroke="${DG_C.r}" stroke-width="4"/>
    <path d="M-20 -34 Q-34 0 -20 34 M0 -40 Q-10 0 0 40 M20 -34 Q32 0 20 34" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round"/>`;
  const apple = `<path d="M0 -14 C16 -24 26 -2 16 12 C10 20 4 18 0 16 C-4 18 -10 20 -16 12 C-26 -2 -16 -24 0 -14 Z" fill="#ff3b30"/><path d="M0 -14 q1 -6 4 -9" stroke="${DG_C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;

  /* 3: 클립 */
  const clip = (x, y, col) => `<g transform="translate(${x},${y})"><rect x="0" y="0" width="44" height="18" rx="9" fill="none" stroke="${col}" stroke-width="3"/><path d="M38 5 H11 a4 4 0 0 0 0 8 H34" fill="none" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/></g>`;

  Object.assign(DIAG, {
    'm1-04:0': {
      alt: '연필과 크레파스의 왼쪽 끝을 맞추어 나란히 놓으면 연필의 다른 쪽 끝이 더 나와서 연필이 더 긴 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img">
        <g class="al"><line x1="60" y1="66" x2="60" y2="210" stroke="${DG_C.r}" stroke-width="3" stroke-dasharray="7 6"/>${T(60, 238, '끝 맞추기', { s: 18, f: DG_C.r })}</g>
        <g class="pc">${pencil}</g>
        <g class="cr">${crayon}</g>
        ${T(60, 58, '연필', { a: 'start', s: 18, f: DG_C.sub, c: 'n1' })}${T(60, 138, '크레파스', { a: 'start', s: 18, f: DG_C.sub, c: 'n2' })}
        <g class="df"><line x1="260" y1="150" x2="260" y2="104" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="6 5"/>
          <path d="M264 58 v-8 h96 v8" fill="none" stroke="${DG_C.c}" stroke-width="3"/>${T(312, 40, '더 나와요', { s: 20, w: 800, f: DG_C.c })}</g>
        <g class="res">${T(320, 238, '연필이 더 길어요', { s: 22, w: 800, f: DG_C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          const m = dgEase(dgP(e, 700, 1300));
          q('.pc').setAttribute('transform', `translate(${60 + 40 * (1 - m)},84)`);
          q('.cr').setAttribute('transform', `translate(${60 + 150 * (1 - m)},166)`);
          q('.n1').setAttribute('x', 60 + 40 * (1 - m)); q('.n2').setAttribute('x', 60 + 150 * (1 - m));
          q('.al').setAttribute('opacity', e > 2100 ? 1 : 0);
          q('.df').setAttribute('opacity', e > 2900 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 3700 ? 1 : 0);
        });
      }
    },

    'm1-04:1': {
      alt: '양팔 저울의 한쪽에 수박, 다른 쪽에 사과를 올리면 수박 쪽이 아래로 내려가서 수박이 더 무거운 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M200 252 h80 l-14 -18 h-52 Z" fill="${DG_C.sub}"/>
        <rect x="235" y="${PV[1]}" width="10" height="132" fill="${DG_C.sub}"/>
        <g class="pL"><g transform="translate(0,0)">${pan}</g><g class="w">${melon}</g></g>
        <g class="pR">${pan}<g class="ap">${apple}</g></g>
        <line class="beam" stroke="${DG_C.ink}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="${PV[0]}" cy="${PV[1]}" r="8" fill="${DG_C.ink}"/>
        <g class="dn"><path d="M22 160 v52 m-9 -10 l9 10 l9 -10" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${T(12, 250, '내려가요', { a: 'start', s: 18, f: DG_C.c })}</g>
        <g class="res">${T(240, 290, '수박이 더 무거워요', { s: 22, w: 800, f: DG_C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          const fw = dgEase(dgP(e, 300, 800)), fa = dgEase(dgP(e, 1100, 700));
          const a = ROT * dgEase(dgP(e, 2100, 1300));
          const [L, R] = ends(a);
          q('.beam').setAttribute('x1', L[0]); q('.beam').setAttribute('y1', L[1]);
          q('.beam').setAttribute('x2', R[0]); q('.beam').setAttribute('y2', R[1]);
          q('.pL').setAttribute('transform', `translate(${L[0]},${L[1]})`);
          q('.pR').setAttribute('transform', `translate(${R[0]},${R[1]})`);
          q('.w').setAttribute('transform', `translate(0,${46 - 60 * (1 - fw)})`); q('.w').setAttribute('opacity', fw > 0 ? 1 : 0);
          q('.ap').setAttribute('transform', `translate(0,${70 - 60 * (1 - fa)}) scale(1.2)`); q('.ap').setAttribute('opacity', fa > 0 ? 1 : 0);
          q('.dn').setAttribute('opacity', e > 3400 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 4000 ? 1 : 0);
        });
      }
    },

    'm1-04:2': {
      alt: '공책 위에 우표를 겹쳐 놓으면 공책의 남는 부분이 많아서 공책이 더 넓은 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <rect x="30" y="50" width="250" height="180" rx="10" fill="${DG_C.b}" stroke="${DG_C.d}" stroke-width="4"/>
        <line x1="54" y1="50" x2="54" y2="230" stroke="${DG_C.d}" stroke-width="2" opacity=".5"/>
        <path class="rem" d="M30 160 V220 a10 10 0 0 0 10 10 H270 a10 10 0 0 0 10 -10 V60 a10 10 0 0 0 -10 -10 H140 V160 Z" fill="${DG_C.r}" fill-opacity=".22" stroke="${DG_C.r}" stroke-width="3" stroke-dasharray="7 5"/>
        ${T(155, 140, '공책', { s: 22, w: 800, f: DG_C.d, c: 'nb' })}
        <g class="st"><rect x="0" y="0" width="96" height="96" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4" stroke-dasharray="4 3"/>${T(48, 56, '우표', { s: 20, w: 800, f: DG_C.c })}</g>
        <g class="lb">${T(212, 196, '남는 부분', { s: 20, w: 800, f: DG_C.r })}</g>
        <g class="res">${T(384, 120, '공책이', { s: 22, w: 800, f: DG_C.d })}${T(384, 152, '더 넓어요', { s: 22, w: 800, f: DG_C.d })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          const m = dgEase(dgP(e, 600, 1500));
          q('.st').setAttribute('transform', `translate(${340 + (32 - 340) * m},${110 + (52 - 110) * m}) scale(${1 + 0.13 * m})`);
          q('.nb').setAttribute('opacity', m < 0.05 ? 1 : 0);
          q('.rem').setAttribute('opacity', e > 2400 ? 1 : 0);
          q('.lb').setAttribute('opacity', e > 2600 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 3500 ? 1 : 0);
        });
      }
    },

    'm1-04:3': {
      alt: '줄 가는 클립 5개, 줄 나는 클립 8개만큼의 길이여서 줄 나가 클립 3개만큼 더 긴 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${T(20, 50, '줄 가', { a: 'start', s: 20, w: 800 })}<text class="c1" x="86" y="50" font-size="20" font-weight="800" fill="${DG_C.d}">· 클립 5개</text>
        <line x1="22" y1="70" x2="${22 + 5 * 52}" y2="70" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
        ${Array.from({ length: 5 }, (_, i) => `<g class="a${i}">${clip(26 + i * 52, 84, DG_C.d)}${T(48 + i * 52, 128, i + 1, { s: 18, f: DG_C.d })}</g>`).join('')}
        ${T(20, 172, '줄 나', { a: 'start', s: 20, w: 800 })}<text class="c2" x="86" y="172" font-size="20" font-weight="800" fill="${DG_C.d}">· 클립 8개</text>
        <line x1="22" y1="192" x2="${22 + 8 * 52}" y2="192" stroke="${DG_C.ink}" stroke-width="5" stroke-linecap="round"/>
        ${Array.from({ length: 8 }, (_, i) => `<g class="b${i}">${clip(26 + i * 52, 206, i < 5 ? DG_C.d : DG_C.c)}${T(48 + i * 52, 250, i + 1, { s: 18, f: i < 5 ? DG_C.d : DG_C.c })}</g>`).join('')}
        <g class="df"><line x1="${22 + 5 * 52}" y1="80" x2="${22 + 5 * 52}" y2="186" stroke="${DG_C.c}" stroke-width="3" stroke-dasharray="6 5"/></g>
        <g class="res">${T(240, 296, '8 − 5 = 3 → 나가 클립 3개만큼 더 길어요', { s: 20, w: 800, f: DG_C.c })}</g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 7000, e => {
          for (let i = 0; i < 5; i++) q('.a' + i).setAttribute('opacity', e > 300 + i * 350 ? 1 : 0);
          q('.c1').setAttribute('opacity', e > 2100 ? 1 : 0);
          for (let i = 0; i < 8; i++) q('.b' + i).setAttribute('opacity', e > 2500 + i * 350 ? 1 : 0);
          q('.c2').setAttribute('opacity', e > 5400 ? 1 : 0);
          q('.df').setAttribute('opacity', e > 5800 ? 1 : 0);
          q('.res').setAttribute('opacity', e > 6200 ? 1 : 0);
        });
      }
    },
  });
})();
