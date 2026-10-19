/* 3학년 일본어 · 일본어는 왜 글자가 세 가지나 있을까? (j3-01) */
(() => {
  const JA = 'lang="ja"';
  const RED = '#ff3b30', GR = '#d6efdc', PINK = '#ffd9d6';
  const card = (cx, y, s, ch, fill, st, fs) => `<rect x="${cx - s / 2}" y="${y}" width="${s}" height="${s}" rx="${s * .18}" fill="${fill}" stroke="${st}" stroke-width="2.5"/>
    <text ${JA} x="${cx}" y="${y + s * .72}" text-anchor="middle" fill="${DG_C.ink}" font-size="${fs || s * .62}" font-weight="600">${ch}</text>`;
  const cat = `<g fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5" stroke-linejoin="round"><path d="M-26 -10 L-24 -34 L-8 -22 Z"/><path d="M26 -10 L24 -34 L8 -22 Z"/><circle r="26"/></g>
    <circle cx="-9" cy="-4" r="3.5" fill="${DG_C.ink}"/><circle cx="9" cy="-4" r="3.5" fill="${DG_C.ink}"/><path d="M-4 6 L0 9 L4 6" fill="none" stroke="${DG_C.ink}" stroke-width="2.5" stroke-linecap="round"/>
    <g stroke="${DG_C.sub}" stroke-width="2" stroke-linecap="round"><line x1="-14" y1="8" x2="-34" y2="4"/><line x1="-14" y1="12" x2="-34" y2="14"/><line x1="14" y1="8" x2="34" y2="4"/><line x1="14" y1="12" x2="34" y2="14"/></g>`;
  const bread = `<path d="M-30 14 V-2 C-40 -8 -36 -26 -18 -24 C-10 -32 10 -32 18 -24 C36 -26 40 -8 30 -2 V14 Z" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const mtn = `<path d="M-40 26 L-14 -16 L0 4 L14 -26 L42 26 Z" fill="${GR}" stroke="${DG_C.r}" stroke-width="3.5" stroke-linejoin="round"/><path d="M14 -26 L6 -12 L14 -8 L22 -12 Z" fill="#fff" stroke="${DG_C.r}" stroke-width="2.5" stroke-linejoin="round"/>`;

  const K0 = [{ k: 'あ', r: 'a', s: '아' }, { k: 'ね', r: 'ne', s: '네' }, { k: 'こ', r: 'ko', s: '코' }];

  /* 3: 山で パンを たべます。 */
  const SENT = [['山', 'k'], ['で', 'h'], null, ['パ', 't'], ['ン', 't'], ['を', 'h'], null, ['た', 'h'], ['べ', 'h'], ['ま', 'h'], ['す', 'h'], ['。', 'p']];
  const KIND = { k: { c: RED, f: PINK, n: '한자', ord: 0 }, t: { c: DG_C.r, f: GR, n: '가타카나', ord: 1 }, h: { c: DG_C.d, f: DG_C.b, n: '히라가나', ord: 2 } };
  let sx = 16; const SX = SENT.map(c => { if (!c) { sx += 12; return null; } const x = sx; sx += 38; return x; });

  Object.assign(DIAG, {
    'j3-01:0': {
      alt: '둥글둥글한 히라가나 카드 あ(a, 아), ね(ne, 네), こ(ko, 코)가 한 글자에 한 소리를 내고, ね와 こ를 이어 읽으면 ねこ(네코, 고양이)가 되는 그림',
      svg: `<svg viewBox="0 0 480 310" class="dg-svg" role="img"><g transform="translate(0,40)">
        ${K0.map((c, i) => { const x = 100 + i * 140; return `<g class="c${i}">${card(x, 0, 92, c.k, DG_C.b, DG_C.d)}
          <text x="${x}" y="122" text-anchor="middle" fill="${DG_C.d}" font-size="22" font-weight="800">${c.r} <tspan fill="${DG_C.sub}" font-size="20" font-weight="700">${c.s}</tspan></text></g>`; }).join('')}
        <g class="w"><line x1="20" y1="146" x2="460" y2="146" stroke="#e5e5ea" stroke-width="2"/>
          <text ${JA} x="40" y="214" fill="${DG_C.ink}" font-size="44" font-weight="700">ねこ</text>
          <text x="40" y="250" fill="${DG_C.d}" font-size="20" font-weight="800">neko <tspan fill="${DG_C.sub}" font-weight="700">네코</tspan></text>
          <text x="208" y="214" text-anchor="middle" fill="${DG_C.sub}" font-size="28" font-weight="700">=</text>
          <g transform="translate(290,200)">${cat}</g>
          <text x="390" y="212" fill="${DG_C.ink}" font-size="22" font-weight="800">고양이</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          K0.forEach((c, i) => {
            const f = dgEase(dgP(e, 200 + i * 800, 600));
            q('.c' + i).setAttribute('opacity', f);
            q('.c' + i).setAttribute('transform', `translate(0,${-18 * (1 - f)})`);
          });
          q('.w').setAttribute('opacity', dgP(e, 2900, 700));
        });
      }
    },

    'j3-01:1': {
      alt: '둥근 히라가나 あ와 각진 가타카나 ア는 모양만 다르고 둘 다 아 소리이며, 외국에서 온 말 빵은 가타카나로 パン(pan, 팡)이라고 쓰는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img"><g transform="translate(0,40)">
        <g class="h">${card(120, 0, 110, 'あ', DG_C.b, DG_C.d)}
          <text x="120" y="140" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">히라가나</text>
          <text x="120" y="164" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">둥글둥글</text></g>
        <g class="t">${card(360, 0, 110, 'ア', GR, DG_C.r)}
          <text x="360" y="140" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">가타카나</text>
          <text x="360" y="164" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">뾰족뾰족</text></g>
        <g class="eq"><rect x="196" y="30" width="88" height="50" rx="25" fill="${DG_C.a}"/>
          <text x="240" y="64" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">a 아</text>
          <text x="240" y="108" text-anchor="middle" fill="${DG_C.sub}" font-size="18" font-weight="700">소리 같아요</text></g>
        <g class="pan"><line x1="20" y1="186" x2="460" y2="186" stroke="#e5e5ea" stroke-width="2"/>
          <g transform="translate(80,236)">${bread}</g>
          <text ${JA} x="160" y="250" fill="${DG_C.ink}" font-size="40" font-weight="700">パン</text>
          <text x="262" y="236" fill="${DG_C.r}" font-size="20" font-weight="800">pan 팡 = 빵</text>
          <text x="262" y="262" fill="${DG_C.sub}" font-size="18" font-weight="700">외국에서 온 말</text></g>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 5000, e => {
          q('.h').setAttribute('opacity', dgP(e, 200, 500));
          const t = dgEase(dgP(e, 1000, 700));
          q('.t').setAttribute('opacity', t);
          q('.t').setAttribute('transform', `translate(${30 * (1 - t)},0)`);
          q('.eq').setAttribute('opacity', dgP(e, 2000, 500));
          q('.pan').setAttribute('opacity', dgP(e, 3200, 700));
        });
      }
    },

    'j3-01:2': {
      alt: '뜻을 담은 한자 山 위에 작은 히라가나 やま(후리가나)가 붙어서 야마라고 읽는 법을 알려 주고, 뜻은 산이라는 것을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img"><g transform="translate(0,40)">
        <g class="fu"><text ${JA} x="128" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="30" font-weight="700">や</text><text ${JA} x="172" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="30" font-weight="700">ま</text>
          <path d="M226 30 h40" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>
          <text x="274" y="38" fill="${DG_C.d}" font-size="20" font-weight="800">후리가나</text>
          <text x="274" y="64" fill="${DG_C.sub}" font-size="18" font-weight="700">읽는 법 yama</text></g>
        <rect x="80" y="56" width="140" height="140" rx="22" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>
        <text ${JA} x="150" y="164" text-anchor="middle" fill="${DG_C.ink}" font-size="104" font-weight="600">山</text>
        <g class="mn"><path d="M226 126 h40" stroke="${DG_C.r}" stroke-width="3" stroke-linecap="round"/>
          <g transform="translate(330,122)">${mtn}</g>
          <text x="330" y="186" text-anchor="middle" fill="${DG_C.r}" font-size="20" font-weight="800">뜻: 산</text></g>
        <text class="rd" x="150" y="236" text-anchor="middle" fill="${DG_C.ink}" font-size="22" font-weight="800">'야마'라고 읽어요</text>
      </g></svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4600, e => {
          q('.mn').setAttribute('opacity', dgP(e, 600, 600));
          const f = dgEase(dgP(e, 1800, 800));
          q('.fu').setAttribute('opacity', f);
          q('.fu').setAttribute('transform', `translate(0,${-16 * (1 - f)})`);
          q('.rd').setAttribute('opacity', dgP(e, 3000, 600));
        });
      }
    },

    'j3-01:3': {
      alt: '문장 山で パンを たべます(산에서 빵을 먹어요)에서 山은 한자(빨강), パン은 가타카나(초록), で·を·たべます는 히라가나(파랑)로 색칠해 세 글자가 섞여 있음을 보여 주는 그림',
      svg: `<svg viewBox="0 0 480 280" class="dg-svg" role="img"><g transform="translate(0,44)">
        ${SENT.map((c, i) => { if (!c) return ''; const x = SX[i], K = KIND[c[1]]; return `
          ${K ? `<rect class="hl ${'k' + c[1]}" x="${x + 1}" y="0" width="36" height="58" rx="10" fill="${K.f}" stroke="${K.c}" stroke-width="2.5"/>` : ''}
          <text ${JA} x="${x + 19}" y="42" text-anchor="middle" fill="${DG_C.ink}" font-size="32" font-weight="600">${c[0]}</text>`; }).join('')}
        <text x="240" y="98" text-anchor="middle" fill="${DG_C.sub}" font-size="20" font-weight="700">산에서 빵을 먹어요</text>
        ${['k', 't', 'h'].map((k, i) => { const K = KIND[k], x = 22 + i * 152; return `<g class="lg${k}">
          <rect x="${x}" y="130" width="140" height="80" rx="16" fill="${K.f}" fill-opacity=".6"/>
          <text x="${x + 70}" y="162" text-anchor="middle" fill="${K.c}" font-size="20" font-weight="800">${K.n}</text>
          <text ${JA} x="${x + 70}" y="194" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="700">${k === 'k' ? '山 · 뜻' : k === 't' ? 'パン · 외래어' : 'で を たべます'}</text></g>`; }).join('')}
      </g></svg>`,
      play(el) {
        const qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 5200, e => {
          ['k', 't', 'h'].forEach((k, i) => {
            const f = dgP(e, 600 + i * 1300, 600);
            qa('.k' + k).forEach(r => r.setAttribute('opacity', f));
            qa('.lg' + k).forEach(r => r.setAttribute('opacity', dgP(e, 900 + i * 1300, 500)));
          });
        });
      }
    },
  });
})();
