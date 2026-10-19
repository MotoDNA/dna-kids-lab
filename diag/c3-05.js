/* 3학년 중국어 · 중국 친구에게 뭐라고 인사할까? (c3-05) */
(() => {
  const C = DG_C, RED = '#ff3b30', ZH = 'lang="zh-CN"';
  const TC = { 1: C.d, 2: C.r, 3: C.c, 4: RED };
  const tonePath = (t, x, y, w, h) => {
    const L = v => +(y + h - (v - 1) / 4 * h).toFixed(1);
    if (t === 2) return `M${x} ${L(3)} C${x + w * .45} ${L(3)} ${x + w * .7} ${L(4.2)} ${x + w} ${L(5)}`;
    return `M${x} ${L(2)} C${x + w * .25} ${L(.7)} ${x + w * .55} ${L(.7)} ${x + w} ${L(4)}`;
  };
  const card = (cls, x, y, w, h, py, m, fill, st, fs = 40) => `<g class="${cls}"><rect x="${x}" y="${y}" width="${w}" height="112" rx="16" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${ZH} x="${x + w / 2}" y="${y + 50}" text-anchor="middle" fill="${C.ink}" font-size="${fs}" font-weight="600">${h}</text>
    <text x="${x + w / 2}" y="${y + 78}" text-anchor="middle" fill="${C.d}" font-size="19" font-weight="800">${py}</text>
    <text x="${x + w / 2}" y="${y + 102}" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">${m}</text></g>`;
  const op = (cls, x, y, s) => `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" fill="${C.sub}" font-size="28" font-weight="800">${s}</text>`;

  /* 1: 누구에게 */
  const W1 = [
    { k: '친구 한 명', p: '你', py: 'nǐ hǎo' },
    { k: '어른', p: '您', py: 'nín hǎo', hi: true },
    { k: '선생님', p: '老师', py: 'lǎoshī hǎo' },
    { k: '친구 여러 명', p: '你们', py: 'nǐmen hǎo' },
    { k: '모두', p: '大家', py: 'dàjiā hǎo' },
  ];
  const ry = i => 72 + i * 54;

  /* 2: 하루 인사 */
  const D2 = [
    { h: '早上好', py: 'zǎoshang hǎo', k: '좋은 아침', sky: C.b, so: .55 },
    { h: '晚上好', py: 'wǎnshang hǎo', k: '저녁 인사', sky: C.a, so: .7 },
    { h: '晚安', py: "wǎn'ān", k: '잘 자', sky: C.ink, so: 1 },
  ];

  /* 3: 헤어질 때 */
  const R3 = [
    { a: '再', apy: 'zài', am: '다시', r: '再见', rpy: 'zàijiàn', rm: '잘 가!', y: 50 },
    { a: '明天', apy: 'míngtiān', am: '내일', r: '明天见', rpy: 'míngtiān jiàn', rm: '내일 만나!', y: 186 },
  ];

  Object.assign(DIAG, {
    'c3-05:0': {
      alt: '你(nǐ, 너)와 好(hǎo, 좋다)가 합쳐져 你好(안녕)가 되고, 3성 두 개가 이어지면 앞 글자 nǐ를 2성처럼 올려 ní hǎo로 말하는 것을 성조 선으로 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        ${card('a', 16, 48, 100, '你', 'nǐ', '너', '#f5f5f7', '#d2d2d7')}
        ${op('o0', 134, 112, '+')}
        ${card('b', 152, 48, 100, '好', 'hǎo', '좋다', '#f5f5f7', '#d2d2d7')}
        ${op('o1', 272, 112, '=')}
        ${card('c', 292, 48, 172, '你好', 'nǐ hǎo', '안녕', C.a, C.c, 44)}
        <g class="sd">
          <line x1="16" y1="186" x2="464" y2="186" stroke="#e5e5ea" stroke-width="2"/>
          <text x="16" y="220" fill="${C.ink}" font-size="20" font-weight="800">3성 + 3성이면 앞 글자는 2성처럼</text>
          ${[[3, 3, 'nǐ', 'hǎo', 40], [2, 3, 'ní', 'hǎo', 280]].map(([t1, t2, p1, p2, x], k) => `<g class="s${k}">
            <path d="${tonePath(t1, x, 236, 50, 46)}" fill="none" stroke="${TC[t1]}" stroke-width="6" stroke-linecap="round"/>
            <path d="${tonePath(t2, x + 84, 236, 50, 46)}" fill="none" stroke="${TC[t2]}" stroke-width="6" stroke-linecap="round"/>
            <text x="${x + 25}" y="314" text-anchor="middle" fill="${TC[t1]}" font-size="24" font-weight="800">${p1}</text>
            <text x="${x + 109}" y="314" text-anchor="middle" fill="${TC[t2]}" font-size="24" font-weight="800">${p2}</text></g>`).join('')}
          <path class="ar" d="M200 262 h50 m-10 -10 l10 10 l-10 10" fill="none" stroke="${C.sub}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6400, e => {
          ['a', 'o0', 'b', 'o1', 'c'].forEach((c, i) => q('.' + c).setAttribute('opacity', dgEase(dgP(e, 200 + i * 450, 450))));
          q('.sd').setAttribute('opacity', e >= 3000 ? 1 : 0);
          q('.sd > text').setAttribute('opacity', dgP(e, 3000, 400));
          q('.s0').setAttribute('opacity', dgP(e, 3500, 500));
          q('.ar').setAttribute('opacity', dgP(e, 4400, 400));
          q('.s1').setAttribute('opacity', dgP(e, 4900, 600));
        });
      }
    },

    'c3-05:1': {
      alt: '인사하는 사람에 따라 앞말만 바뀌고 好는 그대로: 친구 한 명 你好(nǐ hǎo), 어른 您好(nín hǎo), 선생님 老师好(lǎoshī hǎo), 친구 여러 명 你们好(nǐmen hǎo), 모두 大家好(dàjiā hǎo)',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        <rect class="col" x="250" y="${ry(0) - 34}" width="44" height="${ry(4) - ry(0) + 52}" rx="14" fill="${C.a}" fill-opacity=".55"/>
        ${W1.map((w, i) => `<g class="w${i}">
          <text x="20" y="${ry(i) + 7}" fill="${C.ink}" font-size="20" font-weight="800">${w.k}</text>
          <text class="pf${i}" ${ZH} x="248" y="${ry(i) + 10}" text-anchor="end" fill="${w.hi ? C.c : C.ink}" font-size="32" font-weight="600">${w.p}</text>
          <text x="310" y="${ry(i) + 7}" fill="${C.d}" font-size="19" font-weight="800">${w.py}</text></g>
          <text class="hao" ${ZH} x="272" y="${ry(i) + 10}" text-anchor="middle" fill="${C.ink}" font-size="32" font-weight="600">好</text>`).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          q('.col').setAttribute('opacity', dgP(e, 100, 400));
          qa('.hao').forEach(t => t.setAttribute('opacity', dgP(e, 300, 500)));
          W1.forEach((w, i) => {
            const f = dgEase(dgP(e, 1000 + i * 900, 600));
            q('.w' + i).setAttribute('opacity', f);
            q('.pf' + i).setAttribute('transform', `translate(${-24 * (1 - f)},0)`);
          });
        });
      }
    },

    'c3-05:2': {
      alt: '해가 뜨는 아침에는 早上好(zǎoshang hǎo), 노을 지는 저녁에는 晚上好(wǎnshang hǎo), 달이 뜬 밤 잠자리에 들기 전에는 晚安(wǎn\'ān)이라고 인사하는 세 칸 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <defs>${D2.map((d, i) => `<clipPath id="c305sky${i}"><rect x="${8 + i * 158}" y="48" width="148" height="112" rx="16"/></clipPath>`).join('')}</defs>
        ${D2.map((d, i) => { const x = 8 + i * 158, cx = x + 74; return `<g class="p${i}">
          <g clip-path="url(#c305sky${i})">
            <rect x="${x}" y="48" width="148" height="112" fill="${d.sky}" fill-opacity="${d.so}"/>
            ${i === 0 ? `<circle class="sun0" cx="${cx}" cy="128" r="22" fill="${C.c}"/>` : ''}
            ${i === 1 ? `<circle class="sun1" cx="${cx}" cy="128" r="22" fill="#ff3b30" fill-opacity=".85"/>` : ''}
            ${i === 2 ? `<g class="moon"><circle cx="${cx + 10}" cy="88" r="20" fill="${C.a}"/><circle cx="${cx + 20}" cy="80" r="17" fill="${C.ink}"/></g>
              <g class="stars" fill="#fff"><circle cx="${x + 30}" cy="72" r="2.5"/><circle cx="${x + 56}" cy="104" r="2"/><circle cx="${x + 120}" cy="122" r="2.5"/><circle cx="${x + 34}" cy="130" r="2"/></g>` : ''}
            <rect x="${x}" y="134" width="148" height="30" fill="${i === 2 ? C.sub : C.r}" fill-opacity="${i === 2 ? 1 : .55}"/>
          </g>
          <text ${ZH} x="${cx}" y="208" text-anchor="middle" fill="${C.ink}" font-size="30" font-weight="600">${d.h}</text>
          <text x="${cx}" y="238" text-anchor="middle" fill="${C.d}" font-size="18" font-weight="800">${d.py}</text>
          <text x="${cx}" y="266" text-anchor="middle" fill="${C.sub}" font-size="18" font-weight="700">${d.k}</text>
        </g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          D2.forEach((d, i) => q('.p' + i).setAttribute('opacity', dgP(e, 200 + i * 1800, 500)));
          q('.sun0').setAttribute('cy', 150 - 64 * dgEase(dgP(e, 400, 1300)));
          q('.sun1').setAttribute('cy', 96 + 34 * dgEase(dgP(e, 2200, 1300)));
          q('.moon').setAttribute('transform', `translate(0,${30 * (1 - dgEase(dgP(e, 4000, 1200)))})`);
          q('.stars').setAttribute('opacity', dgP(e, 4800, 600));
        });
      }
    },

    'c3-05:3': {
      alt: '再(zài, 다시)와 见(jiàn, 만나다)이 합쳐져 再见(잘 가), 明天(míngtiān, 내일)과 见이 합쳐져 明天见(내일 만나)이 되는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img">
        ${R3.map((r, i) => { const y = r.y; return `
          ${card('a' + i, 12, y, 108, r.a, r.apy, r.am, '#f5f5f7', '#d2d2d7', 36)}
          ${op('o' + i, 136, y + 64, '+')}
          ${card('b' + i, 152, y, 90, '见', 'jiàn', '만나다', C.a, C.c, 36)}
          ${op('e' + i, 260, y + 64, '=')}
          <g class="r${i}"><rect x="278" y="${y}" width="190" height="112" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>
            <text ${ZH} x="373" y="${y + 50}" text-anchor="middle" fill="${C.ink}" font-size="36" font-weight="600">${r.r.slice(0, -1)}<tspan fill="${C.c}">见</tspan></text>
            <text x="373" y="${y + 78}" text-anchor="middle" fill="${C.d}" font-size="19" font-weight="800">${r.rpy}</text>
            <text x="373" y="${y + 102}" text-anchor="middle" fill="${C.ink}" font-size="18" font-weight="800">${r.rm}</text></g>`; }).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5600, e => {
          [0, 1].forEach(i => {
            const st = 200 + i * 2400;
            ['a', 'o', 'b', 'e'].forEach((c, k) => q('.' + c + i).setAttribute('opacity', dgEase(dgP(e, st + k * 350, 400))));
            const f = dgEase(dgP(e, st + 1500, 600));
            q('.r' + i).setAttribute('opacity', f);
            q('.r' + i).setAttribute('transform', `translate(${16 * (1 - f)},0)`);
          });
        });
      }
    },
  });
})();
