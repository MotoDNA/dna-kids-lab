/* 6학년 수학 · 원의 넓이 (m5-07) */
Object.assign(DIAG, {
  /* 원주와 원주율: 지름 긋기 → 원을 한 바퀴 굴려 원주 펼치기 → 지름 3개와 비교 */
  'm5-07:0': {
    alt: '원을 한 바퀴 굴려 펼친 원주가 지름 3개보다 조금 더 긴 것을 보여 주는 그림',
    svg: `<svg viewBox="0 0 640 300" class="dg-svg" role="img">
      <line x1="30" y1="170" x2="610" y2="170" stroke="#d2d2d7" stroke-width="2"/>
      <line class="trail" x1="100" y1="170" x2="100" y2="170" stroke="${DG_C.c}" stroke-width="6" stroke-linecap="round"/>
      <g class="wheel" transform="translate(100,120)">
        <circle r="50" fill="#fff" stroke="${DG_C.c}" stroke-width="5"/>
        <g class="spin"><line class="dia" x1="-50" y1="0" x2="-50" y2="0" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"/><circle cx="0" cy="50" r="6" fill="${DG_C.c}"/></g>
        <circle r="4" fill="${DG_C.ink}"/>
      </g>
      <text class="lab-d" x="100" y="108" text-anchor="middle" fill="${DG_C.d}" font-size="26" font-weight="700" opacity="0">지름</text>
      <text class="lab-c" x="257" y="196" text-anchor="middle" fill="${DG_C.c}" font-size="26" font-weight="700" opacity="0">펼친 원주</text>
      ${[0, 1, 2].map(i => `<g class="seg" opacity="0"><line x1="${100 + i * 100}" y1="232" x2="${200 + i * 100}" y2="232" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="butt"/><line x1="${100 + i * 100}" y1="222" x2="${100 + i * 100}" y2="242" stroke="#fff" stroke-width="3"/><text x="${150 + i * 100}" y="262" text-anchor="middle" fill="${DG_C.d}" font-size="23" font-weight="600">지름 ${i + 1}</text></g>`).join('')}
      <g class="seg" opacity="0"><line x1="400" y1="232" x2="414" y2="232" stroke="${DG_C.c}" stroke-width="6"/><text x="452" y="238" fill="${DG_C.c}" font-size="23" font-weight="700">조금 더</text></g>
      <text class="lab-f" x="320" y="292" text-anchor="middle" fill="${DG_C.ink}" font-size="26" font-weight="700" opacity="0">원주 = 지름 × 약 3.14</text>
    </svg>`,
    play(el) {
      const $ = s => el.querySelector(s), $$ = s => [...el.querySelectorAll(s)];
      const R = 50, X0 = 100, L = 2 * Math.PI * R;
      const set = (t1, t2, t3) => { // 각 단계 진행도 0~1
        $('.dia').setAttribute('x2', -R + 2 * R * t1);
        $('.lab-d').setAttribute('opacity', t1 >= 1 && t2 < .05 ? 1 : 0);
        const x = X0 + L * t2;
        $('.wheel').setAttribute('transform', `translate(${x},120)`);
        $('.spin').setAttribute('transform', `rotate(${360 * t2})`);
        $('.trail').setAttribute('x2', x);
        $('.lab-c').setAttribute('opacity', t2 >= 1 ? 1 : 0);
        $$('.seg').forEach((g, i) => g.setAttribute('opacity', t3 * 4 > i ? 1 : 0));
        $('.lab-f').setAttribute('opacity', t3 >= 1 ? 1 : 0);
      };
      if (DG_RM()) { set(1, 1, 1); return; }
      const T = [1000, 3000, 2000], t0 = performance.now(), id = el.dataset.run = String(Math.random());
      const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const tick = now => { if (el.dataset.run !== id) return; const e = now - t0;
        const a = Math.min(1, e / T[0]), b = Math.min(1, Math.max(0, (e - T[0] - 300) / T[1])), c = Math.min(1, Math.max(0, (e - T[0] - T[1] - 600) / T[2]));
        set(ease(a), ease(b), c); if (c < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
  },
  /* 원주 구하기: 지름 10cm → 원주 31.4cm */
  'm5-07:1': {
    alt: '지름 10cm인 원과, 그 원주를 곧게 펼친 31.4cm 선분',
    svg: `<svg viewBox="0 0 640 260" class="dg-svg" role="img">
      <circle cx="95" cy="115" r="55" fill="none" stroke="#e5e5ea" stroke-width="3"/><circle class="ring" cx="95" cy="115" r="55" fill="none" stroke="${DG_C.c}" stroke-width="5" stroke-dasharray="346" stroke-dashoffset="0" transform="rotate(90 95 115)"/>
      <line class="dia" x1="40" y1="115" x2="150" y2="115" stroke="${DG_C.d}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="95" cy="115" r="4" fill="${DG_C.ink}"/>
      <text x="95" y="44" text-anchor="middle" fill="${DG_C.d}" font-size="26" font-weight="700">지름 10 cm</text>
      <line class="flat" x1="175" y1="210" x2="175" y2="210" stroke="${DG_C.c}" stroke-width="6" stroke-linecap="round"/>
      <line x1="40" y1="210" x2="150" y2="210" stroke="${DG_C.d}" stroke-width="6" stroke-linecap="round" opacity=".35"/>
      <text x="95" y="240" text-anchor="middle" fill="${DG_C.sub}" font-size="22">지름 10 cm</text>
      <text class="lab" x="348" y="240" text-anchor="middle" fill="${DG_C.c}" font-size="26" font-weight="700" opacity="0">원주 = 10 × 3.14 = 31.4 cm</text>
    </svg>`,
    play(el) {
      const ring = el.querySelector('.ring'), flat = el.querySelector('.flat'), lab = el.querySelector('.lab');
      const C = 2 * Math.PI * 55, W = 345.4; // 원주 그림 길이(지름 110px × 3.14)
      ring.setAttribute('stroke-dasharray', C);
      const set = t => { ring.setAttribute('stroke-dashoffset', C * t); flat.setAttribute('x2', 175 + W * t); lab.setAttribute('opacity', t >= 1 ? 1 : 0); };
      if (DG_RM()) { set(1); return; }
      const t0 = performance.now(), id = el.dataset.run = String(Math.random());
      const tick = now => { if (el.dataset.run !== id) return; const t = Math.min(1, Math.max(0, (now - t0 - 500) / 2200)); set(t); if (t < 1) requestAnimationFrame(tick); };
      set(0); requestAnimationFrame(tick);
    }
  },
  /* 원을 잘라 직사각형 만들기: 16조각이 원에서 직사각형 모양으로 이동 */
  'm5-07:2': {
    alt: '원을 16조각으로 잘라 위아래로 엇갈려 붙이면 가로가 원주의 반, 세로가 반지름인 직사각형 모양이 되는 그림',
    svg: (() => {
      const r = 70, th = Math.PI / 16, w = 2 * r * Math.sin(th), h = r * Math.cos(th);
      const wedge = `M0 0 L${-r * Math.sin(th)} ${r * Math.cos(th)} A${r} ${r} 0 0 0 ${r * Math.sin(th)} ${r * Math.cos(th)} Z`;
      let g = '';
      for (let k = 0; k < 16; k++) g += `<path class="wd" data-k="${k}" d="${wedge}" fill="${k % 2 ? DG_C.b : DG_C.a}" stroke="#fff" stroke-width="1.5"/>`;
      return `<svg viewBox="0 0 640 270" class="dg-svg" role="img">${g}
        <g class="rlab" opacity="0">
          <line x1="160" y1="${200 + 14}" x2="${160 + 8 * w}" y2="${200 + 14}" stroke="${DG_C.c}" stroke-width="4"/>
          <text x="${160 + 4 * w}" y="${200 + 42}" text-anchor="middle" fill="${DG_C.c}" font-size="25" font-weight="700">가로 = 원주 × ½ = 반지름 × 3.14</text>
          <line x1="146" y1="${200 - h}" x2="146" y2="200" stroke="${DG_C.r}" stroke-width="4"/>
          <text x="136" y="${200 - h / 2 + 6}" text-anchor="end" fill="${DG_C.r}" font-size="25" font-weight="700">세로 = 반지름</text>
        </g></svg>`;
    })(),
    play(el) {
      const r = 70, th = Math.PI / 16, w = 2 * r * Math.sin(th), h = r * Math.cos(th), cx = 120, cy = 110;
      const ws = [...el.querySelectorAll('.wd')], lab = el.querySelector('.rlab');
      const circ = k => `translate(${cx}px,${cy}px) rotate(${k * 22.5}deg)`;
      const rect = k => { const i = k >> 1; return k % 2 === 0 ? `translate(${160 + w / 2 + i * w}px,${200 - h}px) rotate(0deg)` : `translate(${160 + w + i * w}px,200px) rotate(180deg)`; };
      ws.forEach((p, k) => { p.style.transition = 'none'; p.style.transform = circ(k); });
      lab.setAttribute('opacity', 0);
      if (DG_RM()) { ws.forEach((p, k) => p.style.transform = rect(k)); lab.setAttribute('opacity', 1); return; }
      const id = el.dataset.run = String(Math.random());
      setTimeout(() => { if (el.dataset.run !== id) return;
        ws.forEach((p, k) => { p.style.transition = `transform 1.2s cubic-bezier(.5,0,.2,1) ${k * 70}ms`; p.style.transform = rect(k); });
        setTimeout(() => { if (el.dataset.run === id) lab.setAttribute('opacity', 1); }, 1200 + 16 * 70); }, 900);
    }
  },
  /* 원의 넓이 구하기: 반지름 5cm */
  'm5-07:3': {
    alt: '반지름 5cm인 원과 넓이 계산 과정',
    svg: `<svg viewBox="0 0 640 230" class="dg-svg" role="img">
      <circle cx="120" cy="115" r="90" fill="${DG_C.a}" stroke="${DG_C.c}" stroke-width="4"/>
      <line class="rad" x1="120" y1="115" x2="120" y2="115" stroke="${DG_C.r}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="120" cy="115" r="4" fill="${DG_C.ink}"/>
      <text class="rl" x="122" y="150" text-anchor="middle" fill="${DG_C.r}" font-size="22" font-weight="700" opacity="0">반지름 5 cm</text>
      ${['① 5 × 5 = 25', '② 25 × 3.14 = 78.5', '넓이 78.5 cm²'].map((t, i) => `<text class="st" x="260" y="${80 + i * 40}" fill="${i === 2 ? DG_C.c : DG_C.ink}" font-size="${i === 2 ? 30 : 25}" font-weight="${i === 2 ? 800 : 600}" opacity="0">${t}</text>`).join('')}
    </svg>`,
    play(el) {
      const rad = el.querySelector('.rad'), rl = el.querySelector('.rl'), st = [...el.querySelectorAll('.st')];
      const set = (t, n) => { rad.setAttribute('x2', 120 + 90 * t); rl.setAttribute('opacity', t >= 1 ? 1 : 0); st.forEach((s, i) => s.setAttribute('opacity', i < n ? 1 : 0)); };
      if (DG_RM()) { set(1, 3); return; }
      const t0 = performance.now(), id = el.dataset.run = String(Math.random());
      const tick = now => { if (el.dataset.run !== id) return; const e = now - t0; const t = Math.min(1, Math.max(0, (e - 400) / 900)); const n = Math.min(3, Math.max(0, Math.floor((e - 1500) / 900) + 1)); set(t, n); if (n < 3) requestAnimationFrame(tick); };
      set(0, 0); requestAnimationFrame(tick);
    }
  }
});
