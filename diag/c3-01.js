/* 3학년 중국어 · 중국어는 어떤 글자로 쓰고, 어떻게 읽을까? (c3-01) */
(() => {
  const ZH = 'lang="zh-CN"';
  /* 1: 그림 → 한자 (山 日 人 口) — 각 그림은 (0,0) 중심, 대략 ±45 크기 */
  const PIC = [
    { h: '山', py: 'shān', m: '산', col: DG_C.r, fill: '#d6efdc',
      g: c => `<path d="M-48 32 L-30 -4 L-18 14 L0 -38 L18 14 L30 -4 L48 32 Z" fill="${c.fill}" stroke="${c.col}" stroke-width="4" stroke-linejoin="round"/>` },
    { h: '日', py: 'rì', m: '해', col: DG_C.c, fill: DG_C.a,
      g: c => `<circle r="34" fill="${c.fill}" stroke="${c.col}" stroke-width="4"/><circle r="5" fill="${c.col}"/>` },
    { h: '人', py: 'rén', m: '사람', col: DG_C.d, fill: DG_C.b,
      g: c => `<g fill="none" stroke="${c.col}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="-30" r="9" fill="${c.fill}"/><path d="M4 -19 L-4 8 L-18 36"/><path d="M-4 8 L12 36"/><path d="M1 -10 L18 2"/></g>` },
    { h: '口', py: 'kǒu', m: '입', col: '#ff3b30', fill: DG_C.ink,
      g: c => `<ellipse rx="30" ry="18" fill="${c.fill}" stroke="${c.col}" stroke-width="5"/>` },
  ];
  /* 2: 번체자 → 간체자 */
  const TS = [
    { t: '學', s: '学', tn: 16, sn: 8, m: '배우다' },
    { t: '漢', s: '汉', tn: 14, sn: 5, m: '한자의 한' },
  ];
  /* 3: 병음 */
  const PY = [
    { h: '大', py: 'dà', m: '크다' },
    { h: '小', py: 'xiǎo', m: '작다' },
    { h: '人', py: 'rén', m: '사람' },
  ];

  Object.assign(DIAG, {
    'c3-01:1': {
      alt: '산, 해, 사람, 입을 그린 그림이 간단해져서 한자 山(shān), 日(rì), 人(rén), 口(kǒu)가 된 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${PIC.map((p, i) => { const x = 60 + i * 120; return `
          <g class="pic${i}" transform="translate(${x},${i === 0 ? 72 : 76})">${p.g(p)}</g>
          <path class="ar${i}" d="M${x} 126 v22 m-8 -8 l8 8 l8 -8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <text class="hz${i}" ${ZH} x="${x}" y="214" text-anchor="middle" fill="${DG_C.ink}" font-size="56" font-weight="700">${p.h}</text>
          <g class="lb${i}"><text x="${x}" y="252" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${p.py}</text>
          <text x="${x}" y="280" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${p.m}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          PIC.forEach((p, i) => {
            const st = 200 + i * 1400;
            q('.pic' + i).setAttribute('opacity', dgP(e, st, 500));
            q('.ar' + i).setAttribute('opacity', e > st + 700 ? 1 : 0);
            q('.hz' + i).setAttribute('opacity', dgEase(dgP(e, st + 800, 600)));
            q('.lb' + i).setAttribute('opacity', e > st + 1300 ? 1 : 0);
          });
        });
      }
    },

    'c3-01:2': {
      alt: '획이 많은 번체자 學(16획)과 漢(14획)이 획을 줄인 간체자 学(8획)과 汉(5획)으로 바뀌는 것을 비교하는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,26)">
        ${TS.map((p, i) => { const x = 14 + i * 240; return `<g>
          <text x="${x + 48}" y="40" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">번체자</text>
          <text x="${x + 164}" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">간체자</text>
          <g class="t${i}"><rect x="${x}" y="54" width="96" height="96" rx="16" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
            <text lang="zh-TW" x="${x + 48}" y="122" text-anchor="middle" fill="${DG_C.ink}" font-size="64" font-weight="600">${p.t}</text>
            <text x="${x + 48}" y="182" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">${p.tn}획</text></g>
          <path class="a${i}" d="M${x + 102} 102 h10" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>
          <path class="ah${i}" d="M${x + 106} 94 l8 8 l-8 8" fill="none" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <g class="s${i}"><rect x="${x + 116}" y="54" width="96" height="96" rx="16" fill="${DG_C.b}" fill-opacity=".5" stroke="${DG_C.d}" stroke-width="2.5"/>
            <text ${ZH} x="${x + 164}" y="122" text-anchor="middle" fill="${DG_C.ink}" font-size="64" font-weight="600">${p.s}</text>
            <text x="${x + 164}" y="182" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">${p.sn}획</text></g>
          <text class="m${i}" x="${x + 106}" y="236" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">${p.m}</text>
        </g>`; }).join('')}
        <line x1="240" y1="60" x2="240" y2="240" stroke="#e5e5ea" stroke-width="2"/>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          TS.forEach((p, i) => {
            const st = 200 + i * 2300, x = 14 + i * 240;
            q('.t' + i).setAttribute('opacity', dgP(e, st, 400));
            q('.m' + i).setAttribute('opacity', dgP(e, st, 400));
            const a = dgEase(dgP(e, st + 600, 500));
            q('.a' + i).setAttribute('d', `M${x + 100} 102 h${2 + 10 * a}`);
            q('.a' + i).setAttribute('opacity', a > 0 ? 1 : 0);
            q('.ah' + i).setAttribute('opacity', a >= 1 ? 1 : 0);
            const s = dgEase(dgP(e, st + 1100, 600));
            q('.s' + i).setAttribute('opacity', s);
            q('.s' + i).setAttribute('transform', `translate(${-20 * (1 - s)},0)`);
          });
        });
      }
    },

    'c3-01:3': {
      alt: '한자 大, 小, 人 위에 알파벳으로 쓴 병음 dà, xiǎo, rén이 붙고, 人은 우리 한자음으로 인이지만 중국어로는 rén으로 읽는다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 334" class="dg-svg" role="img"><g transform="translate(0,34)">
        ${PY.map((p, i) => { const x = 80 + i * 160; return `
          <g class="py${i}"><rect x="${x - 46}" y="22" width="92" height="38" rx="19" fill="#fff" stroke="${DG_C.d}" stroke-width="2.5"/>
            <text x="${x}" y="49" text-anchor="middle" fill="${DG_C.d}" font-size="24" font-weight="800">${p.py}</text></g>
          <rect x="${x - 46}" y="70" width="92" height="92" rx="16" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
          <text ${ZH} x="${x}" y="137" text-anchor="middle" fill="${DG_C.ink}" font-size="60" font-weight="600">${p.h}</text>
          <text x="${x}" y="190" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${p.m}</text>`; }).join('')}
        <g class="cmp">
          <line x1="20" y1="208" x2="460" y2="208" stroke="#e5e5ea" stroke-width="2"/>
          <text ${ZH} x="40" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="600">人</text>
          <rect x="74" y="226" width="176" height="56" rx="14" fill="#f5f5f7"/>
          <text x="162" y="262" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">한자음 <tspan fill="${DG_C.ink}" font-weight="800">인</tspan></text>
          <text x="267" y="263" text-anchor="middle" fill="#ff3b30" font-size="24" font-weight="800">≠</text>
          <rect x="284" y="226" width="186" height="56" rx="14" fill="${DG_C.b}" fill-opacity=".5"/>
          <text x="377" y="262" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="700">중국어 <tspan font-weight="800">rén</tspan></text>
        </g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          PY.forEach((p, i) => {
            const f = dgEase(dgP(e, 500 + i * 900, 700));
            q('.py' + i).setAttribute('opacity', f);
            q('.py' + i).setAttribute('transform', `translate(0,${-18 * (1 - f)})`);
          });
          q('.cmp').setAttribute('opacity', dgP(e, 3600, 600));
        });
      }
    },
  });
})();
