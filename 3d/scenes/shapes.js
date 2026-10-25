POP3D.register('shapes', {
  title: '쌓아 보고 굴려 봐요', kicker: '수학 1학년 · 여러 가지 모양', pageTitle: '쌓아 보고 굴려 봐요', pageNo: 8,
  pageLines: ['상자 모양은 잘 쌓이고', '굴러가지 않아요.', '둥근기둥 모양은 세우면 쌓이고,', '눕히면 굴러가요.', '공 모양은 어느 쪽으로도', '잘 굴러가서 쌓기 어려워요.'],
  caption: '그림 2. 상자, 둥근기둥, 공 모양 놀이',
  steps: [
    { name: '세 가지 모양', title: '세 가지 모양을 만나요', body: '상자 모양, 둥근기둥 모양, 공 모양이에요. 하나씩 쌓아 보고 굴려 볼 거예요.' },
    { name: '쌓아 봐요', title: '위에 하나씩 쌓아 봐요', body: '상자 모양은 잘 쌓여요. 둥근기둥 모양도 세우면 쌓을 수 있어요. 공 모양은 위에 올리면 데굴데굴 굴러 떨어져요.' },
    { name: '굴려 봐요', title: '이번에는 굴려 봐요', body: '상자 모양은 밀어도 굴러가지 않아요. 둥근기둥 모양은 눕히면 굴러가요. 공 모양은 어느 쪽으로도 잘 굴러가요.' },
    { name: '정리해요', title: '모양마다 달라요', body: '평평한 부분이 있으면 쌓을 수 있고, 둥근 부분이 있으면 굴러가요.', f: '평평한 부분 → 쌓여요 · 둥근 부분 → 굴러가요' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const lab = (text, size, color, bg) => { const sp = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); sp.material.map.dispose(); sp.material.map = n.material.map; sp.material.needsUpdate = true; }); } catch (e) {} return sp; };
    const CX = [-2.0, 0.1, 2.2];
    // 상자 모양
    const BW = 1.2, BH = 0.8, BD = 1.0;
    const bg = new THREE.BoxGeometry(BW, BH, BD); bg.translate(0, BH / 2, 0);
    const mkBox = () => { const m = K.sketch(new THREE.Mesh(bg, K.paper(0xf6d35b, 1))); const rib = new THREE.Mesh(new THREE.BoxGeometry(0.16, BH + 0.01, BD + 0.01), K.paper(0xf3a9c0, 1)); rib.position.y = BH / 2; m.add(rib); root.add(m); return m; };
    const boxA = mkBox(), boxB = mkBox();
    // 둥근기둥 모양 (옆면 줄무늬로 구르는 게 보이게)
    const CR = 0.42, CH = 1.0;
    const stripe = K.tex(K.canvas(256, 64, (c, w, h) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#8fbfe8' : '#cfe3f6'; c.fillRect(i * w / 8, 0, w / 8 + 1, h); } }));
    const cg = new THREE.CylinderGeometry(CR, CR, CH, 24);
    const cMats = [new THREE.MeshLambertMaterial({ map: stripe }), K.paper(0xb7d6f2, 1), K.paper(0xb7d6f2, 1)];
    const mkCyl = () => { const g = new THREE.Group(); const m = K.sketch(new THREE.Mesh(cg, cMats)); g.add(m); root.add(g); return g; };
    const cylA = mkCyl(), cylB = mkCyl();
    // 공 모양 (비치볼 무늬)
    const R = 0.48;
    const ballTex = K.tex(K.canvas(256, 128, (c, w, h) => { const cols = ['#f3a9c0', '#fffdf6', '#9fd6a5', '#fffdf6', '#f7b267', '#fffdf6']; cols.forEach((col, i) => { c.fillStyle = col; c.fillRect(i * w / 6, 0, w / 6 + 1, h); }); }));
    const sg = new THREE.SphereGeometry(R, 24, 16);
    const mkBall = () => { const m = new THREE.Mesh(sg, new THREE.MeshLambertMaterial({ map: ballTex })); const g = new THREE.Group(); g.add(m); root.add(g); return { g, m }; };
    const ballA = mkBall(), ballB = mkBall();
    // 화살표 (굴리기)
    const arrows = new THREE.Group(); root.add(arrows);
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const push = K.arrow(V(CX[0] - 1.45, 0.4, 0), V(CX[0] - BW / 2 - 0.08, 0.4, 0), 0xd04a3a); arrows.add(push);
    [[0, 1], [0, -1]].forEach(([dx, dz]) => arrows.add(K.arrow(V(CX[1] + 0.66, 0.05, dz * 0.35), V(CX[1] + 0.66, 0.05, dz * 1.25), 0x2a56c6)));
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dz]) => arrows.add(K.arrow(V(CX[2] + dx * 0.75, 0.05, dz * 1.0), V(CX[2] + dx * 1.2, 0.05, dz * 1.5), 0x2a8a4a)));
    // 글자표
    const L = {
      n: ['상자 모양', '둥근기둥 모양', '공 모양'].map(s => lab(s, 0.66)),
      s: ['잘 쌓여요', '세우면 쌓여요', '쌓기 어려워요'].map(s => lab(s, 0.6, '#2a56c6')),
      r: ['안 굴러가요', '눕히면 굴러가요', '잘 굴러가요'].map(s => lab(s, 0.6, '#2a56c6')),
      z: ['잘 쌓여요', '세우면 쌓이고 눕히면 굴러요', '잘 굴러요'].map(s => lab(s, 0.52, '#2a56c6')),
    };
    [...L.n, ...L.s, ...L.r, ...L.z].forEach(l => { l.visible = false; root.add(l); });
    root.position.set(0.1, K.PAGE_Y + 0.3, 0.0);
    let step = 0, t0 = null; const st = { lie: 0, roll: 0, bx: 0, bz: 0 };
    const clamp = v => Math.max(0, Math.min(1, v));
    const prevBall = new THREE.Vector3();
    // 공을 공 위에 올렸을 때: 떨어져 내려와 옆으로 굴러 떨어짐 (앞쪽 +z)
    const ballPath = tau => {
      const y0 = 3 * R;
      if (tau < 0) return [0, y0 + 1.6, false];
      if (tau < 0.45) { const u = tau / 0.45; return [0, y0 + 1.6 * (1 - u * u), true]; }
      const th = tau < 0.75 ? 0.06 * (tau - 0.45) / 0.3 : 0.06 + 1.14 * Math.pow(clamp((tau - 0.75) / 0.7), 2);
      if (tau < 1.45) return [2 * R * Math.sin(th), R + 2 * R * Math.cos(th), true];
      const z1 = 2 * R * Math.sin(1.2), y1 = R + 2 * R * Math.cos(1.2);
      if (tau < 1.85) { const u = (tau - 1.45) / 0.4; return [z1 + 0.55 * u, y1 + (R - y1) * u * u, true]; }
      const u = clamp((tau - 1.85) / 0.75); return [z1 + 0.55 + 0.75 * (1 - (1 - u) * (1 - u)), R, true];
    };
    return {
      root, cam: { pos: [0.36, 3.75, 6.45], target: [0.2, 1.0, 0.6] },
      set(s) { step = s; t0 = null; },
      update(dt, t) {
        if (t0 === null) t0 = t;
        const e = K.RM ? 99 : t - t0;
        // 상자
        boxA.position.set(CX[0], 0, 0);
        boxB.visible = step === 1;
        const ub = clamp((e - 0.2) / 0.45);
        boxB.position.set(CX[0], BH + 2.0 * (1 - ub * ub), 0);
        // 둥근기둥: 2단계에서 눕혀서 앞뒤로 굴리기
        st.lie = K.RM ? (step === 2 ? 1 : 0) : K.damp(st.lie, step === 2 ? 1 : 0, dt, 4);
        const lie = K.ease(clamp(st.lie));
        const rollZ = step === 2 && lie > 0.95 && !K.RM ? 0.75 * Math.sin((e - 0.6) * 1.6) : 0;
        st.roll = K.damp(st.roll, rollZ, dt, 8);
        cylA.position.set(CX[1], CH / 2 + (CR - CH / 2) * lie, st.roll);
        cylA.rotation.set(st.roll / CR, 0, lie * Math.PI / 2);
        cylB.visible = step === 1;
        const uc = clamp((e - 0.7) / 0.45);
        cylB.rotation.set(0, 0, 0); cylB.position.set(CX[1], CH * 1.5 + 2.0 * (1 - uc * uc), 0);
        // 공
        let tx = 0, tz = 0;
        if (step === 2 && !K.RM) { tx = 0.55 * Math.sin(e * 1.3); tz = 0.6 * Math.sin(e * 0.85 + 0.6); }
        if (step === 3 && !K.RM) { tx = 0.25 * Math.sin(e * 1.1); tz = 0; }
        st.bx = K.damp(st.bx, tx, dt, 6); st.bz = K.damp(st.bz, tz, dt, 6);
        const np = new THREE.Vector3(CX[2] + st.bx, R, st.bz);
        const mv = np.clone().sub(prevBall); mv.y = 0; const d = mv.length();
        if (d > 1e-5 && d < 1) ballA.g.rotateOnWorldAxis(new THREE.Vector3(mv.z, 0, -mv.x).normalize(), d / R);
        ballA.g.position.copy(np); prevBall.copy(np);
        const bp = ballPath(K.RM ? 9 : e - 1.2);
        ballB.g.visible = step === 1 && bp[2];
        ballB.g.position.set(CX[2], bp[1], bp[0]); ballB.g.rotation.set(bp[0] / R * 1.4, 0, 0);
        // 화살표
        arrows.visible = step === 2;
        if (step === 2) { const k = 0.12 * Math.sin(t * 5); push.position.x = CX[0] - 1.45 + k; }
        // 글자표
        for (let i = 0; i < 3; i++) {
          const y = [BH, CH, 2 * R][i] + 0.62;
          L.n[i].visible = step === 0 || step === 3; L.n[i].position.set(CX[i], y + (step === 3 ? 0 : 0.1), 0);
          L.s[i].visible = step === 1 && e > [0.8, 1.3, 3.0][i]; L.s[i].position.set(CX[i], [2 * BH, 2 * CH, 2 * R][i] + 0.55, 0);
          L.r[i].visible = step === 2; L.r[i].position.set(CX[i], [BH + 0.55, 2 * CR + 0.6, 2 * R + 0.55][i], 0);
          L.z[i].visible = step === 3; L.z[i].position.set(CX[i], -0.05, 1.25);
        }
      },
    };
  },
});
