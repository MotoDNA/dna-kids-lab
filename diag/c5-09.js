/* 6학년 중국어 · 중국어로 '나는 ~할 수 있어요' 말해 볼까요? (c5-09) */
(() => {
  const ZH = 'lang="zh-CN"';
  const RED = '#ff3b30', GR = '#d6efdc';
  const lv = (y, h, l) => y + (5 - l) / 4 * h;   // 음높이 단계 → y
  const grid = (x, y, w, h) => [0, 1, 2, 3, 4].map(i => `<line x1="${x}" y1="${y + i * h / 4}" x2="${x + w}" y2="${y + i * h / 4}" stroke="#e5e5ea" stroke-width="1.5"/>`).join('');
  const draw = (path, f) => { path.setAttribute('stroke-dashoffset', 1 - f); path.setAttribute('opacity', f > 0 ? 1 : 0); };
  const blk = (x, y, w, h, fill, stroke) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;

  /* 0: 我 + 会 + 游泳 */
  const B0 = [
    { h: '我', py: 'wǒ', m: '나는', f: '#f5f5f7', s: '#d2d2d7', w: 84 },
    { h: '会', py: 'huì', m: '할 수 있어요', f: DG_C.b, s: DG_C.d, w: 120 },
    { h: '游泳', py: 'yóuyǒng', m: '수영하다', f: DG_C.a, s: DG_C.c, w: 120 },
  ];
  const X0 = [30, 178, 330];

  /* 2: 你会 弹钢琴 吗？ */
  const B2 = [
    { h: '你会', py: 'nǐ huì', m: '너 ~할 줄 아니', f: DG_C.b, s: DG_C.d, x: 14, w: 120 },
    { h: '弹钢琴', py: 'tán gāngqín', m: '피아노 치다', f: DG_C.a, s: DG_C.c, x: 150, w: 160 },
    { h: '吗？', py: 'ma', m: '물음', f: GR, s: DG_C.r, x: 326, w: 92 },
  ];

  /* 1: 不 성조 바뀜 — 상자 안 선 (4성 5→1 에서 2성 3→5 로) */
  const BY = 168, BH = 72, GY = BY + 8, GH = BH - 16;
  const tbox = (cx, h, py, col) => `<text lang="zh-CN" x="${cx}" y="${BY + 40}" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="700">${h}</text>
    <rect x="${cx + 44}" y="${BY}" width="96" height="${BH}" rx="10" fill="#f5f5f7"/>${grid(cx + 54, GY, 76, GH)}`;

  Object.assign(DIAG, {
    'c5-09:0': {
      alt: '我(나는) + 会(할 수 있어요) + 游泳(수영하다) 블록이 모여 我会游泳。 "나는 수영할 수 있어요"가 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${B0.map((b, i) => `<g class="b${i}">${blk(X0[i], 0, b.w, 70, b.f, b.s)}
          <text ${ZH} x="${X0[i] + b.w / 2}" y="48" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="700">${b.h}</text>
          <text x="${X0[i] + b.w / 2}" y="98" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="700">${b.py}</text>
          <text x="${X0[i] + b.w / 2}" y="124" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${b.m}</text></g>`).join('')}
        <text class="pl0" x="${X0[1] - 17}" y="46" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">+</text>
        <text class="pl1" x="${X0[2] - 16}" y="46" text-anchor="middle" fill="${DG_C.sub}" font-size="26" font-weight="700">+</text>
        <g class="res"><path d="M240 140 v18 m-8 -8 l8 8 l8 -8" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="60" y="168" width="360" height="72" rx="18" fill="${DG_C.b}" fill-opacity=".45"/>
          <text ${ZH} x="240" y="202" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">我会游泳。</text>
          <text x="240" y="230" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">나는 수영할 수 있어요</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          B0.forEach((b, i) => {
            const f = dgEase(dgP(e, 200 + i * 900, 600));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(0,${-20 * (1 - f)})`);
          });
          q('.pl0').setAttribute('opacity', e > 1100 ? 1 : 0);
          q('.pl1').setAttribute('opacity', e > 2000 ? 1 : 0);
          q('.res').setAttribute('opacity', dgP(e, 3200, 700));
        });
      }
    },

    'c5-09:1': {
      alt: '不는 원래 뚝 떨어지는 4성 bù이지만, 4성인 会(huì) 앞에서는 위로 올리는 2성 bú로 바뀌어 不会(bú huì, 못 해요)로 읽는다는 것을 성조 선으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 340" class="dg-svg" role="img"><g transform="translate(0,40)">
        <text x="20" y="22" fill="${DG_C.sub}" font-size="20" font-weight="700">혼자 있을 때</text>
        <text ${ZH} x="60" y="74" text-anchor="middle" fill="${DG_C.ink}" font-size="40" font-weight="700">不</text>
        <text x="60" y="106" text-anchor="middle" fill="${DG_C.c}" font-size="22" font-weight="800">bù</text>
        <rect x="104" y="36" width="96" height="72" rx="10" fill="#f5f5f7"/>${grid(114, 44, 76, 56)}
        <path class="t0" d="M118 ${lv(44, 56, 5)} L186 ${lv(44, 56, 1)}" pathLength="1" stroke-dasharray="1 1" fill="none" stroke="${DG_C.c}" stroke-width="6" stroke-linecap="round"/>
        <text x="222" y="80" fill="${DG_C.c}" font-size="22" font-weight="800">4성 ↘</text>
        <line x1="20" y1="128" x2="460" y2="128" stroke="#e5e5ea" stroke-width="2"/>
        <g class="row2">
          <text x="20" y="158" fill="${DG_C.sub}" font-size="20" font-weight="700">会(4성) 앞에서</text>
          ${tbox(60, '不')}${tbox(290, '会')}
          <line x1="${348}" y1="${lv(GY, GH, 5)}" x2="${416}" y2="${lv(GY, GH, 1)}" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="round"/>
          <text x="290" y="${BY + 70}" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">huì</text>
          <line class="mv" x1="118" y1="0" x2="186" y2="0" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>
        </g>
        <g class="lab"><text x="60" y="${BY + 70}" text-anchor="middle" fill="${RED}" font-size="22" font-weight="800">bú</text>
          <rect x="60" y="256" width="360" height="40" rx="20" fill="${DG_C.a}" fill-opacity=".6"/>
          <text x="240" y="283" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700"><tspan fill="${RED}" font-weight="800">4성 → 2성 ↗</tspan>  <tspan lang="zh-CN">不会</tspan> bú huì 못 해요</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          draw(q('.t0'), dgEase(dgP(e, 300, 900)));
          q('.row2').setAttribute('opacity', dgP(e, 1500, 500));
          // 4성(5→1) 에서 2성(3→5) 으로 바뀜
          const m = dgEase(dgP(e, 2600, 1200));
          const l0 = 5 + (3 - 5) * m, l1 = 1 + (5 - 1) * m;
          q('.mv').setAttribute('y1', lv(GY, GH, l0));
          q('.mv').setAttribute('y2', lv(GY, GH, l1));
          q('.mv').setAttribute('stroke', m < .5 ? DG_C.c : '#ff3b30');
          q('.lab').setAttribute('opacity', dgP(e, 4000, 600));
        });
      }
    },

    'c5-09:2': {
      alt: '你会(너 ~할 줄 아니) + 弹钢琴(피아노 치다) + 吗(물음)로 묻고, 할 수 있으면 会!, 못 하면 不会。라고 짧게 대답하는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${B2.map((b, i) => `<g class="b${i}">${blk(b.x, 0, b.w, 64, b.f, b.s)}
          <text ${ZH} x="${b.x + b.w / 2}" y="44" text-anchor="middle" fill="${DG_C.ink}" font-size="32" font-weight="700">${b.h}</text>
          <text x="${b.x + b.w / 2}" y="92" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="700">${b.py}</text>
          <text x="${b.x + b.w / 2}" y="118" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${b.m}</text></g>`).join('')}
        <g class="a0"><path d="M120 136 l-30 26" fill="none" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/>
          <rect x="20" y="166" width="190" height="80" rx="18" fill="${GR}"/>
          <text ${ZH} x="115" y="204" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">会！</text>
          <text x="115" y="232" text-anchor="middle" fill="${DG_C.r}" font-size="18" font-weight="700">할 수 있어!</text></g>
        <g class="a1"><path d="M360 136 l30 26" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round"/>
          <rect x="270" y="166" width="190" height="80" rx="18" fill="#f5f5f7"/>
          <text ${ZH} x="365" y="204" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">不会。</text>
          <text x="365" y="232" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">못 해.</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5200, e => {
          B2.forEach((b, i) => {
            const f = dgEase(dgP(e, 200 + i * 800, 600));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(0,${-16 * (1 - f)})`);
          });
          q('.a0').setAttribute('opacity', dgP(e, 2800, 600));
          q('.a1').setAttribute('opacity', dgP(e, 3800, 600));
        });
      }
    },

    'c5-09:3': {
      alt: '汉语(Hànyǔ, 중국어)의 汉은 뚝 떨어지는 4성, 韩语(Hányǔ, 한국어)의 韩은 위로 올리는 2성이라 한글로는 둘 다 한위지만 성조가 다르다는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${[{ h: '汉语', py: 'Hànyǔ', m: '중국어', t: [5, 1], n: '汉 4성 ↘', col: DG_C.c }, { h: '韩语', py: 'Hányǔ', m: '한국어', t: [3, 5], n: '韩 2성 ↗', col: DG_C.d }].map((w, i) => { const x = 20 + i * 240; return `
          <text ${ZH} x="${x + 100}" y="34" text-anchor="middle" fill="${DG_C.ink}" font-size="36" font-weight="700">${w.h}</text>
          <text x="${x + 100}" y="66" text-anchor="middle" fill="${w.col}" font-size="24" font-weight="800">${w.py} <tspan fill="${DG_C.sub}" font-size="20" font-weight="700">${w.m}</tspan></text>
          <rect x="${x + 20}" y="80" width="160" height="110" rx="12" fill="#f5f5f7"/>
          ${grid(x + 40, 92, 120, 86)}
          <path class="tc${i}" d="M${x + 46} ${lv(92, 86, w.t[0])} L${x + 154} ${lv(92, 86, w.t[1])}" pathLength="1" stroke-dasharray="1 1" fill="none" stroke="${w.col}" stroke-width="7" stroke-linecap="round"/>
          <text class="tn${i}" x="${x + 100}" y="222" text-anchor="middle" fill="${w.col}" font-size="22" font-weight="800">${w.n}</text>`; }).join('')}
        <line x1="240" y1="10" x2="240" y2="230" stroke="#e5e5ea" stroke-width="2"/>
        <g class="ans"><rect x="60" y="240" width="360" height="40" rx="20" fill="${DG_C.a}" fill-opacity=".6"/>
          <text x="240" y="268" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">한글로는 둘 다 '한위'</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1].forEach(i => {
            draw(q('.tc' + i), dgEase(dgP(e, 400 + i * 1600, 1000)));
            q('.tn' + i).setAttribute('opacity', e > 1400 + i * 1600 ? 1 : 0);
          });
          q('.ans').setAttribute('opacity', dgP(e, 4000, 600));
        });
      }
    },
  });
})();
