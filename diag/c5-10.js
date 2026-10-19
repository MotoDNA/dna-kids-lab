/* 6학년 중국어 · 오늘 날씨 어때요? 중국어로 날씨 말하기 (c5-10) */
(() => {
  const ZH = 'lang="zh-CN"';
  const RED = '#ff3b30', GR = '#d6efdc', PINK = '#ffb3c7';
  const blk = (x, y, w, h, fill, stroke) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;

  /* 날씨 아이콘 (0,0 중심, 약 ±30) */
  const cloud = (fill, st) => `<path d="M-26 8 a12 12 0 0 1 4 -23 a16 16 0 0 1 30 -4 a12 12 0 0 1 18 27 Z" fill="${fill}" stroke="${st}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const sun = (r = 14) => `<g stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<line x1="${(r + 6) * c}" y1="${(r + 6) * s}" x2="${(r + 13) * c}" y2="${(r + 13) * s}"/>`; }).join('')}</g><circle r="${r}" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>`;
  const flake = (x, y, r, col) => `<g stroke="${col}" stroke-width="3" stroke-linecap="round" transform="translate(${x},${y})">${[0, 60, 120].map(a => `<line x1="${-r * Math.cos(a * Math.PI / 180)}" y1="${-r * Math.sin(a * Math.PI / 180)}" x2="${r * Math.cos(a * Math.PI / 180)}" y2="${r * Math.sin(a * Math.PI / 180)}"/>`).join('')}</g>`;
  const ICON = {
    rain: `${cloud(DG_C.b, DG_C.d)}<g class="fx" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"><line x1="-14" y1="16" x2="-18" y2="28"/><line x1="0" y1="16" x2="-4" y2="28"/><line x1="14" y1="16" x2="10" y2="28"/></g>`,
    snow: `${cloud('#f5f5f7', DG_C.sub)}<g class="fx">${flake(-14, 24, 6, DG_C.d)}${flake(4, 26, 6, DG_C.d)}${flake(20, 22, 6, DG_C.d)}</g>`,
    wind: `<g class="fx" fill="none" stroke="${DG_C.r}" stroke-width="4.5" stroke-linecap="round"><path d="M-30 -12 H12 a9 9 0 1 0 -9 -9"/><path d="M-30 2 H24 a9 9 0 1 1 -9 9"/><path d="M-22 16 H6"/></g>`,
    sunny: sun(14),
    cloudy: `${cloud('#e5e5ea', DG_C.sub)}`,
  };
  const W2 = [
    { k: 'rain', h: '下雨了', py: 'xià yǔ le', m: '비가 와요' },
    { k: 'snow', h: '下雪了', py: 'xià xuě le', m: '눈이 와요' },
    { k: 'wind', h: '刮风了', py: 'guā fēng le', m: '바람이 불어요' },
  ];

  /* 1: 온도 눈금 */
  const T1 = [
    { h: '冷', py: 'lěng', m: '춥다', col: DG_C.d },
    { h: '凉快', py: 'liángkuai', m: '시원하다', col: '#8ec3ff', tc: DG_C.d },
    { h: '暖和', py: 'nuǎnhuo', m: '따뜻하다', col: '#ffc070', tc: DG_C.c },
    { h: '热', py: 'rè', m: '덥다', col: RED },
  ];

  /* 3: 계절 */
  const SEA = [
    { h: '春天', py: 'chūntiān', s: '很暖和。', m: '따뜻해요', f: '#ffe3ea',
      g: `${[0, 72, 144, 216, 288].map(a => `<circle cx="${13 * Math.cos((a - 90) * Math.PI / 180)}" cy="${13 * Math.sin((a - 90) * Math.PI / 180)}" r="10" fill="${PINK}" stroke="#ff6b8a" stroke-width="2.5"/>`).join('')}<circle r="7" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5"/>` },
    { h: '夏天', py: 'xiàtiān', s: '很热。', m: '더워요', f: DG_C.a, g: sun(13) },
    { h: '秋天', py: 'qiūtiān', s: '很凉快。', m: '시원해요', f: '#ffe6cc',
      g: `<path d="M0 -26 C16 -16 18 6 0 22 C-18 6 -16 -16 0 -26 Z" fill="${DG_C.c}" stroke="#c96a00" stroke-width="2.5" stroke-linejoin="round"/><path d="M0 -18 V30" stroke="#c96a00" stroke-width="3" stroke-linecap="round"/>` },
    { h: '冬天', py: 'dōngtiān', s: '很冷。', m: '추워요', f: DG_C.b, g: flake(0, 0, 24, DG_C.d) },
  ];

  Object.assign(DIAG, {
    'c5-10:0': {
      alt: '今天(오늘) + 天气(날씨) + 怎么样(어때요)이 모여 "오늘 날씨 어때요?"가 되고, 今天을 明天(내일)으로 바꾸면 내일 날씨를 묻는 말이 되는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${[{ h: '今天', py: 'jīntiān', m: '오늘', f: DG_C.a, s: DG_C.c, x: 14, w: 120 }, { h: '天气', py: 'tiānqì', m: '날씨', f: '#f5f5f7', s: '#d2d2d7', x: 150, w: 120 }, { h: '怎么样？', py: 'zěnmeyàng', m: '어때요?', f: DG_C.b, s: DG_C.d, x: 286, w: 180 }].map((b, i) => `<g class="b${i}">${blk(b.x, 0, b.w, 70, b.f, b.s)}
          <text ${ZH} x="${b.x + b.w / 2}" y="47" text-anchor="middle" fill="${DG_C.ink}" font-size="34" font-weight="700">${b.h}</text>
          <text x="${b.x + b.w / 2}" y="98" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="700">${b.py}</text>
          <text x="${b.x + b.w / 2}" y="124" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${b.m}</text></g>`).join('')}
        <g class="sw"><line x1="14" y1="146" x2="466" y2="146" stroke="#e5e5ea" stroke-width="2"/>
          <rect x="14" y="162" width="120" height="56" rx="14" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="2.5" stroke-dasharray="7 5"/>
          <text ${ZH} x="74" y="200" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">明天</text>
          <text x="74" y="242" text-anchor="middle" fill="${DG_C.c}" font-size="18" font-weight="700">míngtiān 내일</text>
          <text ${ZH} x="236" y="200" text-anchor="middle" fill="${DG_C.ink}" font-size="28" font-weight="700">天气怎么样？</text>
          <text x="236" y="242" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">내일 날씨 어때?</text>
          <g transform="translate(410,192)">${cloud(DG_C.b, DG_C.d)}</g></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          [0, 1, 2].forEach(i => {
            const f = dgEase(dgP(e, 200 + i * 800, 600));
            q('.b' + i).setAttribute('opacity', f);
            q('.b' + i).setAttribute('transform', `translate(0,${-16 * (1 - f)})`);
          });
          const s = dgEase(dgP(e, 3000, 800));
          q('.sw').setAttribute('opacity', s);
        });
      }
    },

    'c5-10:1': {
      alt: '덥다 앞에는 是를 쓰지 않고 很을 써서 今天很热。라고 하는 그림과, 冷(춥다) 凉快(시원하다) 暖和(따뜻하다) 热(덥다)를 추운 쪽부터 더운 쪽까지 줄 세운 온도 눈금',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,40)">
        <g class="wr">${['今', '天', '是', '热', '。'].map((c, i) => `<text ${ZH} x="${45 + i * 30}" y="34" text-anchor="middle" fill="${i === 2 ? RED : DG_C.sub}" font-size="30" font-weight="700">${c}</text>`).join('')}
          <line class="x1" x1="90" y1="8" x2="120" y2="40" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
          <line class="x1" x1="120" y1="8" x2="90" y2="40" stroke="${RED}" stroke-width="4" stroke-linecap="round"/></g>
        <g class="ok"><text ${ZH} x="250" y="34" fill="${DG_C.ink}" font-size="30" font-weight="700">今天<tspan fill="${DG_C.r}">很</tspan>热。</text>
          <path d="M412 20 l9 10 l17 -20" fill="none" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="330" y="66" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">오늘은 더워요</text></g>
        <line x1="20" y1="88" x2="460" y2="88" stroke="#e5e5ea" stroke-width="2"/>
        <rect x="40" y="114" width="400" height="12" rx="6" fill="#f5f5f7"/>
        <rect class="bar" x="40" y="114" width="400" height="12" rx="6" fill="url(#c510g)"/>
        <defs><linearGradient id="c510g"><stop offset="0" stop-color="${DG_C.d}"/><stop offset=".35" stop-color="${DG_C.b}"/><stop offset=".65" stop-color="${DG_C.a}"/><stop offset="1" stop-color="${RED}"/></linearGradient></defs>
        ${T1.map((t, i) => { const x = 60 + i * 120; return `<g class="t${i}">
          <circle cx="${x}" cy="120" r="11" fill="#fff" stroke="${t.col}" stroke-width="5"/>
          <text ${ZH} x="${x}" y="176" text-anchor="middle" fill="${DG_C.ink}" font-size="32" font-weight="700">${t.h}</text>
          <text x="${x}" y="206" text-anchor="middle" fill="${t.tc || t.col}" font-size="20" font-weight="700">${t.py}</text>
          <text x="${x}" y="232" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${t.m}</text></g>`; }).join('')}
        <text x="40" y="270" fill="${DG_C.d}" font-size="18" font-weight="700">추워요</text>
        <text x="440" y="270" text-anchor="end" fill="${RED}" font-size="18" font-weight="700">더워요</text>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          q('.wr').setAttribute('opacity', dgP(e, 200, 500));
          [...el.querySelectorAll('.x1')].forEach(l => l.setAttribute('opacity', e > 900 ? 1 : 0));
          q('.ok').setAttribute('opacity', dgP(e, 1500, 500));
          const b = dgEase(dgP(e, 2400, 1600));
          q('.bar').setAttribute('width', Math.max(12, 400 * b));
          T1.forEach((t, i) => q('.t' + i).setAttribute('opacity', dgP(e, 2400 + i * 450, 400)));
        });
      }
    },

    'c5-10:2': {
      alt: '비 오는 구름은 下雨了(비가 와요), 눈 오는 구름은 下雪了(눈이 와요), 바람은 刮风了(바람이 불어요). 맑은 날은 晴天, 흐린 날은 阴天이라고 하는 그림',
      svg: `<svg viewBox="0 0 480 342" class="dg-svg" role="img"><g transform="translate(0,52)">
        ${W2.map((w, i) => { const x = 82 + i * 158; return `<g class="w${i}">
          <g transform="translate(${x},30)">${ICON[w.k]}</g>
          <text ${ZH} x="${x}" y="104" text-anchor="middle" fill="${DG_C.ink}" font-size="30" font-weight="700">${w.h}</text>
          <text x="${x}" y="132" text-anchor="middle" fill="${DG_C.d}" font-size="18" font-weight="700">${w.py}</text>
          <text x="${x}" y="156" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">${w.m}</text></g>`; }).join('')}
        <g class="d2"><line x1="20" y1="176" x2="460" y2="176" stroke="#e5e5ea" stroke-width="2"/>
          ${[{ k: 'sunny', h: '晴天', py: 'qíngtiān', m: '맑은 날' }, { k: 'cloudy', h: '阴天', py: 'yīntiān', m: '흐린 날' }].map((w, i) => { const x = 20 + i * 230; return `
            <g transform="translate(${x + 36},224)">${ICON[w.k]}</g>
            <text ${ZH} x="${x + 84}" y="222" fill="${DG_C.ink}" font-size="28" font-weight="700">${w.h}</text>
            <text x="${x + 84}" y="250" fill="${DG_C.sub}" font-size="18" font-weight="700">${w.py} ${w.m}</text>`; }).join('')}
          <text ${ZH} x="240" y="286" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="700">今天是晴天。<tspan fill="${DG_C.sub}" font-size="18">이름이라 是를 써요</tspan></text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          W2.forEach((w, i) => {
            const st = 200 + i * 1200;
            q('.w' + i).setAttribute('opacity', dgP(e, st, 500));
            // 비·눈은 아래로 살짝 내려오고, 바람은 옆으로 밀려 들어와요
            const f = dgEase(dgP(e, st, 1000));
            q('.w' + i + ' .fx').setAttribute('transform', i === 2 ? `translate(${-16 * (1 - f)},0)` : `translate(0,${-10 * (1 - f)})`);
          });
          q('.d2').setAttribute('opacity', dgP(e, 4000, 700));
        });
      }
    },

    'c5-10:3': {
      alt: '네 칸 계절 그림: 春天(봄) 很暖和 따뜻해요, 夏天(여름) 很热 더워요, 秋天(가을) 很凉快 시원해요, 冬天(겨울) 很冷 추워요',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${SEA.map((c, i) => { const x = 10 + (i % 2) * 234, y = Math.floor(i / 2) * 140; return `<g class="s${i}">
          <rect x="${x}" y="${y}" width="226" height="130" rx="18" fill="${c.f}" fill-opacity=".55"/>
          <g transform="translate(${x + 44},${y + 46})">${c.g}</g>
          <text ${ZH} x="${x + 90}" y="${y + 42}" fill="${DG_C.ink}" font-size="28" font-weight="700">${c.h}</text>
          <text x="${x + 90}" y="${y + 66}" fill="${DG_C.sub}" font-size="18" font-weight="700">${c.py}</text>
          <text ${ZH} x="${x + 20}" y="${y + 108}" fill="${DG_C.d}" font-size="26" font-weight="700">${c.s}</text>
          <text x="${x + 212}" y="${y + 108}" text-anchor="end" fill="${DG_C.ink}" font-size="18" font-weight="700">${c.m}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4400, e => {
          SEA.forEach((c, i) => {
            const f = dgEase(dgP(e, 200 + i * 900, 600));
            q('.s' + i).setAttribute('opacity', f);
            q('.s' + i).setAttribute('transform', `translate(0,${14 * (1 - f)})`);
          });
        });
      }
    },
  });
})();
