/* 5학년 과학 · 섞인 물질을 어떻게 다시 나눌까? (s3-05) */
(() => {
  const f2 = n => +n.toFixed(2);
  const arw = (x1, y1, x2, y2, h = 10) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return `M${f2(x1)} ${f2(y1)} L${f2(x2)} ${f2(y2)} M${f2(x2 - h * Math.cos(a - 0.5))} ${f2(y2 - h * Math.sin(a - 0.5))} L${f2(x2)} ${f2(y2)} L${f2(x2 - h * Math.cos(a + 0.5))} ${f2(y2 - h * Math.sin(a + 0.5))}`;
  };
  const rnd = s => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const RED = '#ff3b30', MIL = '#ffd60a', IRON = '#48484a', SAND = '#f2d7a6';
  // 알갱이: 0 콩(큼), 1 팥(중간), 2 좁쌀(작음)
  const GR = [{ n: '콩', r: 10, f: DG_C.a, s: DG_C.c }, { n: '팥', r: 6, f: RED, s: '#c4281c' }, { n: '좁쌀', r: 3.2, f: MIL, s: DG_C.c }];
  const grain = (k, x, y, cls = '') => `<circle class="${cls}" cx="${f2(x)}" cy="${f2(y)}" r="${GR[k].r}" fill="${GR[k].f}" stroke="${GR[k].s}" stroke-width="${k === 2 ? 1 : 1.8}"/>`;
  // 그릇 속 섞인 알갱이 위치
  const MIX = [];
  for (let i = 0; i < 34; i++) {
    const k = i < 8 ? 0 : i < 18 ? 1 : 2, a = rnd(i) * Math.PI, rr = Math.sqrt(rnd(i + 50));
    MIX.push({ k, dx: (rnd(i + 7) - 0.5) * 2 * 66 * rr, dy: -Math.abs(Math.sin(a)) * 30 * rr + (rnd(i + 20)) * 4 });
  }

  /* 1: 체 두 개 */
  const SV = [{ y: 92, hole: 9, x: 150 }, { y: 192, hole: 4.6, x: 150 }];
  const GR1 = [];
  for (let i = 0; i < 24; i++) GR1.push({ k: i < 6 ? 0 : i < 14 ? 1 : 2, x: 150 + (rnd(i + 3) - 0.5) * 120 });

  /* 2: 철 가루 */
  const FE = Array.from({ length: 16 }, (_, i) => ({ x: 170 + rnd(i + 11) * 140, y: 236 + rnd(i + 31) * 22, tx: 196 + rnd(i + 5) * 88, ty: 150 + rnd(i + 9) * 10 }));

  /* 3: 거름 */
  const DRP = Array.from({ length: 5 }, (_, i) => i);

  Object.assign(DIAG, {
    's3-05:0': {
      alt: '콩, 팥, 좁쌀을 한 그릇에 섞어도 콩은 크고, 팥은 붉고, 좁쌀은 작은 성질이 그대로 남아 있는 혼합물 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        ${GR.map((g, k) => `<g class="pile${k}">${Array.from({ length: [8, 10, 16][k] }, (_, i) => grain(k, 80 + k * 160 - 44 + rnd(i + k * 20) * 88, 76 - rnd(i + k * 40) * 34)).join('')}
          <text x="${80 + k * 160}" y="104" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">${g.n}</text></g>`).join('')}
        <path d="M150 210 Q150 276 240 276 Q330 276 330 210 Z" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3"/>
        <g class="mix">${MIX.map((m, i) => grain(m.k, 240 + m.dx * 1.1, 214 + m.dy * 0.9, 'mg')).join('')}</g>
        ${[0, 1, 2].map(k => `<path class="ar${k}" d="${arw(80 + k * 160, 118, 240 + (k - 1) * 30, 172, 8)}" fill="none" stroke="${DG_C.sub}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
        <text class="lb" x="240" y="298" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">혼합물 (성질은 그대로)</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 4400, e => {
          [0, 1, 2].forEach(k => {
            q('.pile' + k).setAttribute('opacity', dgP(e, 200 + k * 300, 400));
            q('.ar' + k).setAttribute('opacity', e > 1400 + k * 300 ? 1 : 0);
          });
          q('.mix').setAttribute('opacity', dgP(e, 2400, 700));
          q('.lb').setAttribute('opacity', e > 3400 ? 1 : 0);
        });
      }
    },

    's3-05:1': {
      alt: '콩, 팥, 좁쌀 혼합물을 눈이 큰 체에 거르면 콩이 남고, 빠져나온 팥과 좁쌀을 눈이 작은 체에 거르면 팥이 남고 좁쌀만 아래로 빠져나오는 그림',
      svg: `<svg viewBox="0 0 480 320" class="dg-svg" role="img">
        ${SV.map((s, j) => `<g>
          <path d="M70 ${s.y - 34} L84 ${s.y} H216 L230 ${s.y - 34}" fill="none" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linejoin="round"/>
          <line x1="84" y1="${s.y}" x2="216" y2="${s.y}" stroke="${DG_C.sub}" stroke-width="2.5" stroke-dasharray="${j ? '3 5' : '3 18'}"/>
          <text x="262" y="${s.y - 18}" fill="${DG_C.ink}" font-size="20" font-weight="800">${j ? '눈이 작은 체' : '눈이 큰 체'}</text>
          <g class="st${j}"><text x="262" y="${s.y + 8}" fill="${j ? RED : DG_C.c}" font-size="20" font-weight="800">→ ${j ? '팥' : '콩'}이 남아요</text></g>
        </g>`).join('')}
        <path d="M90 266 Q90 304 150 304 Q210 304 210 266 Z" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3"/>
        <text x="262" y="296" fill="${DG_C.ink}" font-size="20" font-weight="800">그릇</text>
        <g class="st2"><text x="314" y="296" fill="${DG_C.c}" font-size="20" font-weight="800">→ 좁쌀</text></g>
        ${GR1.map((g, i) => grain(g.k, 0, 0, 'g g' + i)).join('')}
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 6000, e => {
          const d1 = dgP(e, 1200, 1100), d2 = dgP(e, 3200, 1100);
          GR1.forEach((g, i) => {
            const r = GR[g.k].r, jit = rnd(i + 70);
            const y1 = SV[0].y - r - 2 - jit * 8, y2 = SV[1].y - r - 2 - jit * 6, y3 = 296 - r - jit * 10;
            let y = y1, x = g.x + (rnd(i) - 0.5) * 4 * Math.sin(e / 90 + i);
            if (g.k >= 1) {
              y = y1 + (y2 - y1) * d1 * d1;
              if (g.k === 2) y = d1 < 1 ? y : y2 + (y3 - y2) * d2 * d2;
            }
            if (e >= 6000) x = g.x;
            q('.g' + i).setAttribute('cx', f2(g.k === 2 && d2 > 0 ? 150 + (g.x - 150) * 0.7 : x));
            q('.g' + i).setAttribute('cy', f2(y));
            q('.g' + i).setAttribute('opacity', e > 200 ? 1 : 0);
          });
          q('.st0').setAttribute('opacity', e > 2400 ? 1 : 0);
          q('.st1').setAttribute('opacity', e > 4400 ? 1 : 0);
          q('.st2').setAttribute('opacity', e > 4600 ? 1 : 0);
        });
      }
    },

    's3-05:2': {
      alt: '모래와 철 가루가 섞인 혼합물에 자석을 가까이 대면 철 가루만 자석에 달라붙어 나오고 모래는 그대로 남는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <path d="M140 250 Q140 290 240 290 Q340 290 340 250 Z" fill="#f5f5f7" stroke="${DG_C.sub}" stroke-width="3"/>
        <path d="M150 252 Q240 226 330 252 Q330 270 240 274 Q150 270 150 252 Z" fill="${SAND}"/>
        ${Array.from({ length: 30 }, (_, i) => `<circle cx="${f2(160 + rnd(i + 90) * 160)}" cy="${f2(250 + rnd(i + 60) * 18)}" r="2.4" fill="${DG_C.c}"/>`).join('')}
        ${FE.map((p, i) => `<rect class="fe${i}" width="7" height="3" rx="1" fill="${IRON}"/>`).join('')}
        <g class="mag"><rect x="-60" y="-20" width="60" height="40" fill="#ff3b30"/><rect x="0" y="-20" width="60" height="40" fill="${DG_C.d}"/>
          <text x="-30" y="8" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">N</text><text x="30" y="8" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">S</text></g>
        <g class="lab">
          <text x="312" y="92" fill="${IRON}" font-size="20" font-weight="800">← 철 가루</text>
          <text x="352" y="262" fill="${DG_C.c}" font-size="20" font-weight="800">← 모래</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s);
        dgAnim(el, 4800, e => {
          const down = dgEase(dgP(e, 300, 1000)), up = dgEase(dgP(e, 2800, 1000));
          const my = 40 + 90 * down - 70 * up;            // 자석 위치(밑면 = my + 20)
          q('.mag').setAttribute('transform', `translate(240,${f2(my)})`);
          FE.forEach((p, i) => {
            const f = dgEase(dgP(e, 1300 + i * 50, 600));
            const ty = my + 20 + 2 + (p.ty - 150) * 0.6;
            const x = p.x + (p.tx - p.x) * f, y = p.y + (ty - p.y) * f;
            const r = q('.fe' + i);
            r.setAttribute('x', f2(x - 3.5)); r.setAttribute('y', f2(y - 1.5));
            r.setAttribute('transform', `rotate(${f2(rnd(i) * 180 * (1 - f) + 90 * f)} ${f2(x)} ${f2(y)})`);
          });
          q('.lab').setAttribute('opacity', e > 3800 ? 1 : 0);
        });
      }
    },

    's3-05:3': {
      alt: '소금과 모래를 물에 넣어 저은 뒤, 유리 막대를 따라 거름종이를 끼운 깔때기에 부으면 녹지 않는 모래는 거름종이 위에 남고, 소금물만 비커 옆면에 닿은 깔때기 끝을 따라 비커로 빠져나오는 거름 장치 그림',
      svg: `<svg viewBox="0 0 480 330" class="dg-svg" role="img">
        <path class="pour" d="M236 42 L199 132" fill="none" stroke="${DG_C.b}" stroke-width="8" stroke-linecap="round"/>
        <line x1="250" y1="8" x2="197" y2="140" stroke="${DG_C.sub}" stroke-width="4" stroke-linecap="round"/>
        <g transform="translate(276,44) rotate(-30)"><path d="M-30 -24 V24 H24 V-24" fill="${DG_C.b}" fill-opacity=".5" stroke="${DG_C.sub}" stroke-width="3"/></g>
        <path d="M94 96 H234 L174 176 V248 L154 262 V176 Z" fill="#fff" stroke="${DG_C.sub}" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M104 102 H224 L164 182 Z" fill="#f5f5f7" stroke="${DG_C.c}" stroke-width="2.5" stroke-dasharray="6 4" stroke-linejoin="round"/>
        <path class="liq" d="" fill="${DG_C.b}" fill-opacity=".75"/>
        <path class="sand" d="M140 160 L164 182 L188 160 Q164 150 140 160 Z" fill="${SAND}" stroke="${DG_C.c}" stroke-width="2"/>
        ${Array.from({ length: 9 }, (_, i) => `<circle class="sd" cx="${f2(148 + rnd(i) * 32)}" cy="${f2(164 + rnd(i + 3) * 10)}" r="2.6" fill="${DG_C.c}"/>`).join('')}
        <path d="M150 222 V308 Q150 316 158 316 H262 Q270 316 270 308 V222" fill="none" stroke="${DG_C.sub}" stroke-width="3.5"/>
        <rect class="bk" x="152" y="300" width="116" height="14" fill="${DG_C.b}"/>
        ${DRP.map(i => `<path class="dp${i}" d="M0 -6 Q5 1 0 5 Q-5 1 0 -6 Z" fill="${DG_C.d}"/>`).join('')}
        <g class="lab">
          <text x="236" y="30" text-anchor="end" fill="${DG_C.ink}" font-size="20" font-weight="800">유리 막대</text>
          <path d="M222 110 L322 96" stroke="${DG_C.ink}" stroke-width="2"/><text x="326" y="102" fill="${DG_C.ink}" font-size="20" font-weight="800">거름종이</text>
          <path d="M184 164 L322 156" stroke="${DG_C.ink}" stroke-width="2"/><text x="326" y="162" fill="${DG_C.c}" font-size="20" font-weight="800">모래가 남아요</text>
          <path d="M156 252 L322 226" stroke="${DG_C.ink}" stroke-width="2"/><text x="326" y="226" fill="${DG_C.ink}" font-size="18" font-weight="700"><tspan x="326">깔때기 끝은</tspan><tspan x="326" dy="22">비커 벽에 닿게</tspan></text>
          <path d="M262 300 L322 286" stroke="${DG_C.ink}" stroke-width="2"/><text x="326" y="292" fill="${DG_C.d}" font-size="20" font-weight="800">소금물</text>
        </g>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          const fil = dgEase(dgP(e, 600, 1200)), drain = dgP(e, 1800, 2800);
          q('.pour').setAttribute('opacity', e > 300 && e < 1800 ? 1 : 0);
          // 깔때기 속 액체: 차올랐다가 빠짐
          const lv = fil * (1 - drain);
          const top = 176 - 60 * lv, hw = (176 - top) * 0.75 + 4;
          q('.liq').setAttribute('d', lv > 0.02 ? `M${f2(164 - hw)} ${f2(top)} H${f2(164 + hw)} L164 180 Z` : '');
          q('.sand').setAttribute('opacity', dgP(e, 900, 500));
          qa('.sd').forEach(c => c.setAttribute('opacity', dgP(e, 900, 500)));
          // 소금물은 깔때기 끝에서 비커 옆면을 타고 흘러내림
          DRP.forEach(i => {
            const t = dgP(e, 1900 + i * 500, 600), d = q('.dp' + i);
            d.setAttribute('transform', `translate(157,${f2(264 + 34 * t)})`);
            d.setAttribute('opacity', t > 0 && t < 1 ? 1 : 0);
          });
          const b = 14 + 36 * drain;
          q('.bk').setAttribute('y', f2(314 - b)); q('.bk').setAttribute('height', f2(b));
          q('.lab').setAttribute('opacity', e > 4800 ? 1 : 0);
        });
      }
    },

    's3-05:4': {
      alt: '소금물을 햇볕에 두거나 가열하면 물은 증발해 날아가고 하얀 소금만 남는 그림',
      svg: `<svg viewBox="0 0 480 300" class="dg-svg" role="img">
        <g transform="translate(70,70)"><circle r="26" fill="#ffcc00" stroke="${DG_C.c}" stroke-width="3"/>${Array.from({ length: 8 }, (_, i) => { const a = i * 45 * Math.PI / 180; return `<line x1="${f2(Math.cos(a) * 32)}" y1="${f2(Math.sin(a) * 32)}" x2="${f2(Math.cos(a) * 42)}" y2="${f2(Math.sin(a) * 42)}" stroke="${DG_C.c}" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</g>
        <text x="70" y="146" text-anchor="middle" fill="${DG_C.c}" font-size="20" font-weight="800">햇볕</text>
        <rect class="wt" x="152" y="0" width="216" height="0" fill="${DG_C.b}"/>
        ${Array.from({ length: 14 }, (_, i) => `<rect class="salt" x="${f2(160 + i * 14.5 + rnd(i) * 4)}" y="${f2(232 - rnd(i + 4) * 6)}" width="9" height="9" rx="1.5" transform="rotate(${f2(rnd(i + 8) * 40)} ${f2(164 + i * 14.5)} ${f2(236)})" fill="#fff" stroke="${DG_C.sub}" stroke-width="1.5"/>`).join('')}
        <path d="M140 170 V236 Q140 246 150 246 H370 Q380 246 380 236 V170" fill="none" stroke="${DG_C.sub}" stroke-width="4"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<path class="vp${i}" d="M0 0 q-8 -10 0 -20 q8 -10 0 -20" fill="none" stroke="${DG_C.d}" stroke-width="3" stroke-linecap="round"/>`).join('')}
        <text class="t1" x="260" y="40" text-anchor="middle" fill="${DG_C.d}" font-size="20" font-weight="800">물은 날아가요</text>
        <text class="t2" x="260" y="282" text-anchor="middle" fill="${DG_C.ink}" font-size="20" font-weight="800">하얀 소금이 남아요</text>
      </svg>`,
      play(el) {
        const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
        dgAnim(el, 6000, e => {
          const ev = dgEase(dgP(e, 600, 3800)), lvl = 56 * (1 - ev);
          q('.wt').setAttribute('y', f2(244 - lvl)); q('.wt').setAttribute('height', f2(lvl));
          [0, 1, 2, 3, 4, 5].forEach(i => {
            const t = ((e - 600 - i * 330) % 1400) / 1400, on = e > 600 + i * 330 && (e < 4400 || e >= 6000);
            const y = e >= 6000 ? 150 - (i % 2) * 24 : 230 - lvl - 20 - 90 * Math.max(0, t);
            const p = q('.vp' + i);
            p.setAttribute('transform', `translate(${180 + i * 32},${f2(Math.min(y, 180 - lvl + 30))})`);
            p.setAttribute('opacity', on ? (e >= 6000 ? 0.8 : 1 - Math.max(0, t)) : 0);
          });
          qa('.salt').forEach((s, i) => s.setAttribute('opacity', dgP(e, 1800 + i * 120, 600)));
          q('.t1').setAttribute('opacity', e > 1200 ? 1 : 0);
          q('.t2').setAttribute('opacity', e > 4600 ? 1 : 0);
        });
      }
    },
  });
})();
