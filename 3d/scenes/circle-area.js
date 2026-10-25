POP3D.register('circle-area', {
  title: '원을 잘라 직사각형 만들기', kicker: '수학 5학년 · 원의 넓이', pageTitle: '원의 넓이', pageNo: 40,
  pageLines: ['원을 피자처럼 잘게 잘라', '위아래로 엇갈리게 붙이면', '직사각형에 가까워져요.', '', '가로는 원주의 반,', '세로는 반지름이에요.'],
  caption: '그림 3. 원을 16조각으로 잘라 붙이기',
  steps: [
    { name: '원 보기', title: '반지름이 있는 원 하나', body: '이 원의 넓이를 구해 볼 거예요. 원의 중심에서 원 위의 한 점까지가 반지름이에요.' },
    { name: '16조각 자르기', title: '원을 똑같이 16조각으로 잘라요', body: '피자처럼 똑같은 크기로 16조각을 냈어요. 노란 조각과 파란 조각이 번갈아 있어요.' },
    { name: '엇갈려 붙이기', title: '위아래로 엇갈리게 붙여요', body: '노란 조각은 둥근 쪽이 아래로, 파란 조각은 둥근 쪽이 위로 가게 번갈아 붙였어요. 직사각형에 가까운 모양이 돼요.' },
    { name: '가로와 세로', title: '가로는 원주의 반, 세로는 반지름', body: '아래쪽 둥근 부분은 노란 조각 8개, 위쪽은 파란 조각 8개라서 가로는 원주의 반이에요. 세로는 반지름과 같아요.', f: '가로 = 지름 × 원주율 ÷ 2 = 반지름 × 원주율' },
    { name: '원의 넓이', title: '원의 넓이 = 반지름 × 반지름 × 원주율', body: '조각을 더 잘게 자를수록 직사각형에 더 가까워져요. 직사각형의 넓이는 가로 × 세로 = (반지름 × 원주율) × 반지름이에요.', f: '원의 넓이 = 반지름 × 반지름 × 원주율' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const lab = (text, size, color, bg) => { const sp = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); sp.material.map.dispose(); sp.material.map = n.material.map; sp.material.needsUpdate = true; }); } catch (e) {} return sp; };
    const N = 16, A = Math.PI / N, r = 1.55, RS = r * Math.sin(A), TH = 0.05;
    // 부채꼴 한 조각: 꼭짓점(원의 중심)이 원점, +x 방향을 가리킴 → 바닥(XZ)에 눕힘
    const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(r * Math.cos(-A), r * Math.sin(-A)); sh.absarc(0, 0, r, -A, A, false); sh.lineTo(0, 0);
    const g = new THREE.ExtrudeGeometry(sh, { depth: TH, bevelEnabled: false, curveSegments: 10 }); g.rotateX(-Math.PI / 2);
    const mY = K.paper(0xf6d35b, 1), mB = K.paper(0x78acdf, 1);
    const P = (x, y) => new THREE.Vector3(x, 0, -y); // 그림 평면(x, y) → 바닥(x, -z)
    const ax0 = -7.5 * RS, ay0 = -r / 2; // 엇갈린 모양을 가운데에 놓기
    const parts = [];
    for (let i = 0; i < N; i++) {
      const m = K.sketch(new THREE.Mesh(g, i % 2 ? mB : mY)); root.add(m);
      const th = (i + 0.5) * 2 * A; // 원에서 이 조각이 가리키는 방향
      const k = Math.floor(i / 2);
      // 짝수(노랑): 둥근 쪽이 아래, 꼭짓점이 위 / 홀수(파랑): 둥근 쪽이 위, 꼭짓점이 아래
      const down = i % 2 === 0;
      const apex = down ? P(ax0 + 2 * k * RS, ay0 + r) : P(ax0 + (2 * k + 1) * RS, ay0 + r * (1 - Math.cos(A)));
      const tgt = down ? -Math.PI / 2 : Math.PI / 2;
      let d = tgt - th; while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI;
      parts.push({ m, th, apex, d, dir: P(Math.cos(th), Math.sin(th)) });
    }
    // 반지름 선, 치수 선
    const red = 0xd04a3a, blue = 0x2a56c6;
    const rg = new THREE.CylinderGeometry(0.035, 0.035, r, 8); rg.rotateZ(Math.PI / 2); rg.translate(r / 2, 0, 0);
    const rad = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: red })); rad.position.y = TH + 0.04; root.add(rad);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), new THREE.MeshBasicMaterial({ color: red })); dot.position.y = TH + 0.02; root.add(dot);
    const W = Math.PI * r; // 원주의 반
    const yB = ay0 - 0.28, xL = -W / 2 - 0.5;
    const dimW = new THREE.Group(); root.add(dimW);
    const xB = -0.5 * RS; // 아래쪽 둥근 부분(노란 조각 8개)의 가운데
    dimW.add(K.line([P(xB - W / 2, yB), P(xB + W / 2, yB)], blue));
    [xB - W / 2, xB + W / 2].forEach(x => dimW.add(K.line([P(x, yB - 0.12), P(x, yB + 0.12)], blue)));
    const dimH = new THREE.Group(); root.add(dimH);
    dimH.add(K.line([P(xL, ay0), P(xL, ay0 + r)], red));
    [ay0, ay0 + r].forEach(y => dimH.add(K.line([P(xL - 0.12, y), P(xL + 0.12, y)], red)));
    const rect = K.line([P(-W / 2, ay0), P(W / 2, ay0), P(W / 2, ay0 + r), P(-W / 2, ay0 + r), P(-W / 2, ay0)], 0xe0752d); root.add(rect);
    [dimW, dimH, rect].forEach(o => o.position.y = TH + 0.02);
    // 글자표
    const L = { r0: lab('반지름', 0.7, '#c0392b'), cut: lab('16조각', 0.8), w: lab('원주의 반 = 반지름 × 원주율', 0.62, '#2a56c6'), h: lab('반지름', 0.62, '#c0392b'), area: lab('넓이 = 가로 × 세로', 0.7) };
    Object.values(L).forEach(l => { l.visible = false; root.add(l); });
    L.r0.position.set(r / 2, 0.5, 0.35);
    L.cut.position.set(0, 0.7, -r - 0.45);
    L.w.position.copy(P(xB, yB - 0.5)).setY(0.15);
    L.h.position.copy(P(xL - 0.75, ay0 + r / 2)).setY(0.2);
    L.area.position.copy(P(0, ay0 + r + 0.6)).setY(0.4);
    root.position.set(0.1, K.PAGE_Y + 0.3, 0.3);
    let step = 0; const st = { ex: 0, p: 0, tp: 0, tex: 0 };
    const cl = v => Math.max(0, Math.min(1, v));
    return {
      root, cam: { pos: [0.27, 6.5, 4.63], target: [0.1, 0.3, 0.25] },
      set(s) {
        step = s; st.tex = s === 1 ? 1 : 0; st.tp = s >= 2 ? 1 : 0;
        if (K.RM) { st.ex = st.tex; st.p = st.tp; }
      },
      update(dt, t) {
        st.ex = K.damp(st.ex, st.tex, dt, 4);
        if (st.p < st.tp) st.p = Math.min(st.tp, st.p + dt * 0.62); else if (st.p > st.tp) st.p = Math.max(st.tp, st.p - dt * 0.9);
        parts.forEach((o, i) => {
          const k = K.ease(cl(st.p * 1.6 - 0.6 * i / (N - 1)));
          const c = o.dir.clone().multiplyScalar(0.16 * st.ex);
          o.m.position.lerpVectors(c, o.apex, k);
          o.m.position.y = 0.9 * Math.sin(Math.PI * k);
          o.m.rotation.y = o.th + o.d * k;
        });
        rad.visible = dot.visible = step === 0;
        L.r0.visible = step === 0; L.cut.visible = step === 1;
        const done = st.p > 0.999;
        dimW.visible = dimH.visible = L.w.visible = L.h.visible = step >= 3 && done;
        rect.visible = L.area.visible = step === 4 && done;
        const pulse = step === 4 ? 0.5 + 0.5 * Math.sin(t * 3) : 0;
        mY.emissive.setRGB(pulse * 0.12, pulse * 0.1, 0); mB.emissive.setRGB(0, pulse * 0.06, pulse * 0.12);
      },
    };
  },
});
