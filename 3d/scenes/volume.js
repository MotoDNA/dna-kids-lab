POP3D.register('volume', {
  title: '쌓기나무로 부피 재기', kicker: '수학 6학년 · 직육면체의 부피', pageTitle: '부피와 1cm³', pageNo: 18,
  pageLines: ['물건이 공간에서 차지하는 크기를', '부피라고 해요.', '', '한 모서리가 1cm인 정육면체의 부피는', '1cm³ (1세제곱센티미터)예요.', '쌓기나무가 몇 개 들어가는지 세어요.'],
  caption: '그림 1. 상자에 1cm³ 쌓기나무 채우기',
  steps: [
    { name: '1cm³ 쌓기나무', title: '한 모서리가 1cm인 정육면체', body: '가로, 세로, 높이가 모두 1cm인 쌓기나무예요. 이 쌓기나무의 부피를 1cm³라 쓰고 1세제곱센티미터라고 읽어요.', f: '1cm × 1cm × 1cm = 1cm³', cam: { pos: [4.4, 3.6, 4.6], target: [2.5, 0.7, -0.9] } },
    { name: '빈 상자', title: '가로 4cm, 세로 3cm, 높이 2cm인 상자', body: '이 직육면체 상자에 1cm³ 쌓기나무가 몇 개 들어가는지 세면 부피를 알 수 있어요.', cam: { pos: [2.36, 4.4, 6.8], target: [0.4, 0.95, 0.0] } },
    { name: '1층 깔기', title: '바닥 한 층에 12개가 깔려요', body: '가로로 4개씩 세로로 3줄을 깔면 한 층에 쌓기나무가 12개 들어가요.', f: '한 층: 4 × 3 = 12개' },
    { name: '2층 쌓기', title: '높이만큼 2층을 쌓아요', body: '높이가 2cm라서 12개씩 2층을 쌓아요. 쌓기나무는 모두 24개예요.', f: '12 × 2 = 24개' },
    { name: '부피 구하기', title: '직육면체의 부피 = 가로 × 세로 × 높이', body: '쌓기나무 24개가 들어가니 상자의 부피는 24cm³예요. 가로, 세로, 높이를 곱하면 한 번에 구할 수 있어요.', f: '가로 × 세로 × 높이 = 4 × 3 × 2 = 24cm³', cam: { pos: [2.36, 4.4, 6.8], target: [0.4, 0.95, 0.0] } },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const lab = (text, size, color, bg) => { const sp = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); sp.material.map.dispose(); sp.material.map = n.material.map; sp.material.needsUpdate = true; }); } catch (e) {} return sp; };
    const U = 0.8, NX = 4, NZ = 3, NY = 2;
    const W = NX * U, D = NZ * U, H = NY * U;
    // 상자: 바닥판 + 모서리 선 + 바닥 눈금
    const base = new THREE.Mesh(new THREE.BoxGeometry(W + 0.12, 0.06, D + 0.12), K.paper(0xe8cfa0, 1)); base.position.y = -0.03; K.sketch(base); root.add(base);
    const bx = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, D)), new THREE.LineBasicMaterial({ color: 0x2a56c6 }));
    bx.position.y = H / 2; root.add(bx);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), new THREE.MeshBasicMaterial({ color: 0x8fbfe8, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }));
    glass.position.y = H / 2; root.add(glass);
    const grid = new THREE.Group(); root.add(grid);
    for (let i = 1; i < NX; i++) grid.add(K.line([[-W / 2 + i * U, 0.005, -D / 2], [-W / 2 + i * U, 0.005, D / 2]], 0x7a5a2e, 0.5));
    for (let j = 1; j < NZ; j++) grid.add(K.line([[-W / 2, 0.005, -D / 2 + j * U], [W / 2, 0.005, -D / 2 + j * U]], 0x7a5a2e, 0.5));
    // 쌓기나무 24개 (1층: 노랑·주황, 2층: 파랑·보라)
    const cg = new THREE.BoxGeometry(U * 0.985, U * 0.985, U * 0.985);
    const mats = [K.paper(0xf6d35b, 1), K.paper(0xf7b267, 1), K.paper(0x8fbfe8, 1), K.paper(0xc7b3ea, 1)];
    const cubes = [];
    for (let y = 0; y < NY; y++) for (let z = 0; z < NZ; z++) for (let x = 0; x < NX; x++) {
      const m = K.sketch(new THREE.Mesh(cg, mats[y * 2 + ((x + z) % 2)]));
      const p = new THREE.Vector3(-W / 2 + (x + 0.5) * U, (y + 0.5) * U, -D / 2 + (z + 0.5) * U);
      m.position.copy(p); m.visible = false; root.add(m); cubes.push({ m, p, at: null });
    }
    // 1cm³ 쌓기나무 하나 (상자 옆)
    const UX = 2.5, UZ = -1.0;
    const unit = K.sketch(new THREE.Mesh(cg, K.paper(0xf3a9c0, 1))); unit.position.set(UX, U / 2, UZ); root.add(unit);
    // 글자표
    const L = {
      u3: lab('1cm³', 0.8), ux: lab('1cm', 0.55), uy: lab('1cm', 0.55), uz: lab('1cm', 0.55),
      w: lab('가로 4cm', 0.72), d: lab('세로 3cm', 0.72), h: lab('높이 2cm', 0.72), v: lab('24cm³', 0.95, '#2a56c6'), n: [],
    };
    L.u3.position.set(UX, U + 0.5, UZ);
    L.ux.position.set(UX, -0.05, UZ + U / 2 + 0.3);
    L.uy.position.set(UX - U / 2 - 0.42, U / 2, UZ + U / 2);
    L.uz.position.set(UX + U / 2 + 0.42, U, UZ);
    L.w.position.set(0, -0.15, D / 2 + 0.55);
    L.d.position.set(-W / 2 - 1.05, -0.05, 0);
    L.h.position.set(W / 2 + 0.95, H / 2, D / 2);
    L.v.position.set(0, H + 0.85, 0);
    for (let i = 1; i <= 24; i++) { const l = lab('쌓기나무 ' + i + '개', 0.78); l.position.set(0, H + 0.85, 0); L.n.push(l); }
    [L.u3, L.ux, L.uy, L.uz, L.w, L.d, L.h, L.v, ...L.n].forEach(l => { l.visible = false; root.add(l); });
    root.position.set(0.0, K.PAGE_Y + 0.32, 0.1);
    const GAP = 0.22, FALL = 0.45, DROP = 2.2;
    let step = 0, want = 0, pend = true;
    const show = (l, on) => { l.visible = on; };
    return {
      root, cam: { pos: [4.4, 3.6, 4.6], target: [2.5, 0.7, -0.9] },
      set(s) { step = s; want = s >= 3 ? 24 : s === 2 ? 12 : 0; pend = true; },
      update(dt, t) {
        if (pend) {
          pend = false; let k = 0;
          cubes.forEach((c, i) => { if (i < want) { if (c.at === null) c.at = K.RM ? -99 : t + 0.3 + (k++) * GAP; } else c.at = null; });
        }
        let placed = 0;
        cubes.forEach(c => {
          if (c.at === null) { c.m.visible = false; return; }
          const k = Math.max(0, Math.min(1, (t - c.at) / FALL));
          c.m.visible = t >= c.at; if (k >= 1) placed++;
          c.m.position.set(c.p.x, c.p.y + DROP * (1 - k * k), c.p.z);
        });
        unit.material.emissive.setRGB(step === 0 ? 0.12 + 0.1 * Math.sin(t * 3) : 0, step === 0 ? 0.04 : 0, step === 0 ? 0.06 : 0);
        show(L.u3, step <= 1); [L.ux, L.uy, L.uz].forEach(l => show(l, step === 0));
        [L.w, L.d, L.h].forEach(l => show(l, step === 1 || step === 4));
        L.n.forEach((l, i) => show(l, (step === 2 || step === 3) && i === placed - 1));
        show(L.v, step === 4);
        const pulse = step === 4 ? 0.5 + 0.5 * Math.sin(t * 3) : 0;
        mats.forEach(m => m.emissive.setRGB(pulse * 0.08, pulse * 0.08, pulse * 0.08));
      },
    };
  },
});
