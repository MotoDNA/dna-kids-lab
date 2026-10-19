/* 1학년 국어 · 그림일기는 어떻게 쓸까? (k1-16) */
(() => {
  const sun = (x, y, r = 11) => `<g transform="translate(${x},${y})"><circle r="${r}" fill="${DG_C.c}"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = k * Math.PI / 4; return `<line x1="${((r + 4) * Math.cos(a)).toFixed(1)}" y1="${((r + 4) * Math.sin(a)).toFixed(1)}" x2="${((r + 9) * Math.cos(a)).toFixed(1)}" y2="${((r + 9) * Math.sin(a)).toFixed(1)}" stroke="${DG_C.c}" stroke-width="3" stroke-linecap="round"/>`; }).join('')}</g>`;
  const kid = (col, smile = true) => `<circle cx="0" cy="-30" r="11" fill="#fff" stroke="${col}" stroke-width="3"/>
    ${smile ? `<path d="M-5 -28 Q0 -23 5 -28" fill="none" stroke="${DG_C.ink}" stroke-width="2" stroke-linecap="round"/>` : ''}
    <path d="M0 -19 V6 M0 -12 L-12 -2 M0 -12 L12 -2 M0 6 L-9 24 M0 6 L9 24" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round"/>`;

  /* 1 */
  const EV = ['아침밥 먹기', '공원에서 그네', '숙제하기'];

  Object.assign(DIAG, {
    'k1-16:0': {
      alt: '그림일기 공책 맨 위 칸에 날짜와 요일(10월 13일 화요일)을 쓰고, 날씨(맑음)도 쓰는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <rect x="30" y="44" width="420" height="246" rx="14" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
        <rect x="44" y="114" width="392" height="88" rx="8" fill="#f5f5f7"/>
        <text x="240" y="166" text-anchor="middle" fill="#c7c7cc" font-size="20" font-weight="700">그림</text>
        ${[236, 262].map(y => `<line x1="44" y1="${y}" x2="436" y2="${y}" stroke="#e5e5ea" stroke-width="2"/>`).join('')}
        <text x="240" y="282" text-anchor="middle" fill="#c7c7cc" font-size="18" font-weight="700">글</text>
        <rect class="hl" x="38" y="52" width="404" height="52" rx="10" fill="${DG_C.a}" fill-opacity=".4" stroke="${DG_C.c}" stroke-width="3"/>
        <text class="d" x="54" y="86" fill="${DG_C.ink}" font-size="22" font-weight="800">10월 13일 화요일</text>
        <g class="w"><text x="262" y="86" fill="${DG_C.sub}" font-size="20" font-weight="700">날씨:</text>${sun(332, 78)}
          <text x="356" y="86" fill="${DG_C.ink}" font-size="22" font-weight="800">맑음</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4000, e => {
          q('.hl').setAttribute('opacity', dgP(e, 300, 500));
          q('.d').setAttribute('opacity', dgP(e, 1000, 500));
          q('.w').setAttribute('opacity', dgP(e, 2200, 500));
        });
      }
    },

    'k1-16:1': {
      alt: '오늘 한 일 가운데 가장 기억에 남는 일 하나(공원에서 그네를 탄 일)를 골라 그림일기에 쓰는 그림',
      svg: `<svg viewBox="0 0 480 260" class="dg-svg" role="img">
        <text x="24" y="40" fill="${DG_C.sub}" font-size="20" font-weight="700">오늘 한 일</text>
        ${EV.map((t, i) => { const x = 84 + i * 156; return `<g class="c${i}">
          <rect class="r${i}" x="${x - 72}" y="60" width="144" height="84" rx="16" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
          ${t.includes(' ') ? `<text x="${x}" y="96" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${t.split(' ')[0]}</text><text x="${x}" y="124" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${t.split(' ').slice(1).join(' ')}</text>`
            : `<text x="${x}" y="110" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${t}</text>`}
        </g>`; }).join('')}
        <g class="pk"><path d="M240 156 v26 m-9 -9 l9 9 l9 -9" fill="none" stroke="${DG_C.c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="120" y="196" width="240" height="44" rx="22" fill="${DG_C.c}"/>
          <text x="240" y="225" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">가장 기억에 남는 일</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          const pick = dgEase(dgP(e, 2000, 600));
          EV.forEach((_, i) => {
            q('.c' + i).setAttribute('opacity', i === 1 ? dgP(e, 200 + i * 400, 400) : dgP(e, 200 + i * 400, 400) * (1 - 0.6 * pick));
          });
          q('.r1').setAttribute('fill', pick > 0.5 ? DG_C.a : '#f5f5f7');
          q('.r1').setAttribute('stroke', pick > 0.5 ? DG_C.c : '#d2d2d7');
          q('.r1').setAttribute('stroke-width', pick > 0.5 ? 4 : 2);
          q('.c1').setAttribute('transform', `translate(0,${-6 * pick})`);
          q('.pk').setAttribute('opacity', dgP(e, 2900, 500));
        });
      }
    },

    'k1-16:2': {
      alt: '그림일기 그림에 누가(나와 동생), 어디에서(공원), 무엇을(그네 타기) 했는지 보이게 그린 그림',
      svg: `<svg viewBox="0 0 480 290" class="dg-svg" role="img">
        <rect x="16" y="44" width="300" height="230" rx="14" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
        <g class="pk"><line x1="18" y1="246" x2="314" y2="246" stroke="${DG_C.r}" stroke-width="4"/>
          <rect x="58" y="176" width="12" height="70" fill="#a2845e"/><circle cx="64" cy="158" r="36" fill="#d6efdc" stroke="${DG_C.r}" stroke-width="3"/>
          ${sun(278, 76, 10)}</g>
        <g class="sw"><path d="M140 246 L160 96 L250 96 L270 246" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-linejoin="round"/>
          <g class="seat"><line x1="194" y1="96" x2="194" y2="196" stroke="${DG_C.sub}" stroke-width="2.5"/><line x1="216" y1="96" x2="216" y2="196" stroke="${DG_C.sub}" stroke-width="2.5"/>
            <rect x="188" y="194" width="34" height="7" rx="3" fill="${DG_C.c}"/><g transform="translate(205,180)">${kid(DG_C.d)}</g></g></g>
        <g class="sb" transform="translate(290,222)">${kid(DG_C.d)}</g>
        <g class="l0"><text x="344" y="88" fill="${DG_C.d}" font-size="20" font-weight="800">누가</text><text x="344" y="114" fill="${DG_C.ink}" font-size="18" font-weight="700">나와 동생</text></g>
        <g class="l1"><text x="344" y="168" fill="${DG_C.r}" font-size="20" font-weight="800">어디에서</text><text x="344" y="194" fill="${DG_C.ink}" font-size="18" font-weight="700">공원</text></g>
        <g class="l2"><text x="344" y="244" fill="${DG_C.c}" font-size="20" font-weight="800">무엇을</text><text x="344" y="270" fill="${DG_C.ink}" font-size="18" font-weight="700">그네 타기</text></g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          q('.pk').setAttribute('opacity', dgP(e, 100, 400));
          q('.sw').setAttribute('opacity', dgP(e, 500, 400));
          q('.sb').setAttribute('opacity', dgP(e, 900, 400));
          // 그네가 몇 번 흔들리다 멈춤
          const s = dgP(e, 900, 3600), ang = s < 1 ? Math.sin(s * Math.PI * 4) * 18 * (1 - s) : 0;
          q('.seat').setAttribute('transform', `rotate(${ang} 205 96)`);
          q('.l0').setAttribute('opacity', dgP(e, 1700, 400));
          q('.l1').setAttribute('opacity', dgP(e, 2700, 400));
          q('.l2').setAttribute('opacity', dgP(e, 3700, 400));
        });
      }
    },

    'k1-16:3': {
      alt: '그림 아래 줄 칸에 한 일을 차례대로(동생과 공원에 갔다. 그네를 탔다.) 쓰고, 마지막에 생각이나 느낌(정말 재미있었다.)을 쓰는 그림',
      svg: `<svg viewBox="0 0 480 270" class="dg-svg" role="img">
        <rect x="16" y="44" width="448" height="212" rx="14" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>
        ${[106, 166, 226].map(y => `<line x1="30" y1="${y}" x2="450" y2="${y}" stroke="#e5e5ea" stroke-width="2"/>`).join('')}
        ${[['동생과 공원에 갔다.', '한 일 1', DG_C.d], ['그네를 탔다.', '한 일 2', DG_C.d], ['정말 재미있었다.', '느낌', DG_C.c]].map(([t, l, c], i) => `<g class="s${i}">
          <text x="36" y="${96 + i * 60}" fill="${DG_C.ink}" font-size="24" font-weight="800">${t}</text>
          <rect x="${360 - (i === 2 ? 0 : 8)}" y="${70 + i * 60}" width="${i === 2 ? 70 : 86}" height="34" rx="17" fill="${c}"/>
          <text x="395" y="${94 + i * 60}" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">${l}</text>
        </g>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          [0, 1, 2].forEach(i => {
            const f = dgP(e, 300 + i * 1300, 900);
            const g = q('.s' + i);
            g.setAttribute('opacity', f > 0 ? 1 : 0);
            g.querySelector('text').setAttribute('opacity', f);
            g.querySelector('rect').setAttribute('opacity', f >= 1 ? 1 : 0);
            g.querySelectorAll('text')[1].setAttribute('opacity', f >= 1 ? 1 : 0);
          });
        });
      }
    },
  });
})();
