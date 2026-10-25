POP3D.register('lens', {
  title: '볼록 렌즈는 빛을 모아요', kicker: '과학 5학년 · 빛과 렌즈', pageTitle: '볼록 렌즈의 특징', pageNo: 26,
  pageLines: ['볼록 렌즈는 가운데가', '가장자리보다 두꺼운 렌즈예요.', '', '볼록 렌즈를 지난 빛은 굴절하여', '한 곳으로 모여요.', '렌즈로 해를 직접 보면 절대 안 돼요!'],
  caption: '그림 3. 나란한 빛과 볼록 렌즈',
  steps: [
    { name: '곧게 가는 빛', title: '빛은 공기 속에서 곧게 나아가요', body: '햇빛처럼 나란한 빛 다섯 줄이 검은 종이를 비춰요. 공기 속에서는 꺾이지 않고 곧게 나아가 종이에 따로따로 닿아요.',
      cam: { pos: [-1.5, 5.0, 9.6], target: [0.0, 1.15, 0] } },
    { name: '렌즈에서 꺾여요', title: '볼록 렌즈에서 빛이 꺾여요 (굴절)', body: '빛이 렌즈에 들어갈 때와 나올 때 경계에서 꺾여요. 가운데를 지나는 빛은 똑바로 가고, 가장자리 쪽 빛일수록 더 많이 꺾여요.',
      cam: { pos: [-1.2, 2.6, 7.4], target: [-0.5, 1.35, 0] } },
    { name: '한 곳에 모여요', title: '빛이 한 곳으로 모여요', body: '꺾인 빛이 렌즈 뒤 한 곳에 모여 밝고 뜨거운 점이 생겨요. 검은 종이가 탈 수도 있으니 꼭 어른과 함께하고, 렌즈로 해를 직접 보면 절대 안 돼요!',
      cam: { pos: [-2.6, 3.4, 8.6], target: [0.6, 1.35, 0] } },
    { name: '평평한 유리', title: '평평한 유리는 빛을 모으지 못해요', body: '두께가 고른 평평한 유리에는 빛이 똑바로 들어가서 꺾이지 않고 나란히 지나가요. 그래서 빛이 한 곳에 모이지 않아요.',
      cam: { pos: [-1.5, 5.0, 9.6], target: [0.0, 1.15, 0] } },
    { name: '정리', title: '볼록 렌즈는 빛을 모아요', body: '볼록 렌즈는 가운데가 두꺼워서 빛을 굴절시켜 한 곳으로 모아요. 이 성질을 이용한 도구가 돋보기예요.', f: '가운데가 두꺼운 볼록 렌즈 → 빛이 꺾여 한 곳에 모여요',
      cam: { pos: [-1.5, 5.0, 9.6], target: [0.0, 1.15, 0] } },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const G = new THREE.Group(); G.rotation.y = 0.32; root.add(G); // 빛의 축 = G 의 +x
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const YC = 1.3, XL = -0.6, F = 2.4, XP = XL + F, X0 = -3.1; // 축 높이, 렌즈 중심, 초점 거리, 종이 위치, 빛 시작
    const A = 1.1, SAG = 0.21, E = 0.04, RR = (A * A + SAG * SAG) / (2 * SAG); // 렌즈 반지름, 볼록한 정도, 가장자리 반두께, 면의 곡률 반지름
    const ht = r => E + Math.sqrt(RR * RR - r * r) - (RR - SAG); // 축에서 r 떨어진 곳의 렌즈 반두께
    const HS = [-0.9, -0.45, 0, 0.45, 0.9];

    // 볼록 렌즈 (가운데가 두꺼움)
    const prof = [];
    for (let i = 0; i <= 8; i++) { const r = A * i / 8; prof.push(new THREE.Vector2(r, -ht(r))); }
    for (let i = 8; i >= 0; i--) { const r = A * i / 8; prof.push(new THREE.Vector2(Math.max(0.0001, r), ht(r))); }
    const lg = new THREE.LatheGeometry(prof, 28); lg.rotateZ(-Math.PI / 2);
    const lens = new THREE.Group(); lens.position.set(XL, YC, 0); G.add(lens);
    const lm = new THREE.MeshLambertMaterial({ color: 0x8fbfe8, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false });
    lens.add(K.sketch(new THREE.Mesh(lg, lm), 50));
    const holdG = new THREE.CylinderGeometry(0.05, 0.05, YC - A, 8); holdG.translate(0, -(YC - A) / 2 - A, 0); lens.add(new THREE.Mesh(holdG, K.paper(0x8a6a3e, 1)));
    const lb = new THREE.BoxGeometry(0.5, 0.1, 0.5); lb.translate(0, -YC + 0.05, 0); lens.add(K.sketch(new THREE.Mesh(lb, K.paper(0xc9a06b, 1))));
    // 평평한 유리 (두께가 고름)
    const glass = new THREE.Group(); glass.position.set(XL, YC, 0); G.add(glass);
    const gg = new THREE.BoxGeometry(0.22, 2.3, 1.7); glass.add(K.sketch(new THREE.Mesh(gg, lm)));
    const gh = new THREE.BoxGeometry(0.5, 0.1, 0.5); gh.translate(0, -YC + 0.05, 0); glass.add(K.sketch(new THREE.Mesh(gh, K.paper(0xc9a06b, 1))));
    const ghs = new THREE.CylinderGeometry(0.05, 0.05, YC - 1.15, 8); ghs.translate(0, -(YC - 1.15) / 2 - 1.15, 0); glass.add(new THREE.Mesh(ghs, K.paper(0x8a6a3e, 1)));

    // 검은 종이
    const pg = new THREE.BoxGeometry(0.05, 2.5, 2.0); pg.translate(XP + 0.03, 1.25 + 0.15, 0); G.add(K.sketch(new THREE.Mesh(pg, K.paper(0x2b3036, 1))));
    const pf = new THREE.BoxGeometry(0.5, 0.15, 1.4); pf.translate(XP + 0.03, 0.075, 0); G.add(K.sketch(new THREE.Mesh(pf, K.paper(0xc9a06b, 1))));

    // 빛줄기의 길: 렌즈를 지나는 빛은 앞면과 뒷면에서 반씩 꺾여 종이 위 한 점(XP, YC)에 모인다 (얇은 렌즈 근사)
    const pathLens = y => {
      if (y === 0) return [V(X0, YC, 0), V(XP, YC, 0)];
      const s = Math.sign(y), ay = Math.abs(y); const ex = XL - ht(ay);
      let d = Math.atan(ay / F), oy = ay, ox = XL + ht(ay);
      for (let it = 0; it < 6; it++) { const m = Math.tan(d / 2); for (let j = 0; j < 4; j++) { ox = XL + ht(oy); oy = ay - m * (ox - ex); } d = Math.atan(oy / (XP - ox)); }
      return [V(X0, YC + y, 0), V(ex, YC + y, 0), V(ox, YC + s * oy, 0), V(XP, YC, 0)];
    };
    const pathStraight = y => [V(X0, YC + y, 0), V(XP, YC + y, 0)];
    const LENS = HS.map(pathLens), FLAT = HS.map(pathStraight);

    const cyl = new THREE.CylinderGeometry(0.028, 0.028, 1, 6); const UP = V(0, 1, 0);
    const rayM = new THREE.MeshBasicMaterial({ color: 0xffb703 });
    const segs = HS.map(() => [0, 1, 2].map(() => { const m = new THREE.Mesh(cyl, rayM); G.add(m); return m; }));
    const setSeg = (b, a, c) => { const d = new THREE.Vector3().subVectors(c, a); const L = d.length(); b.visible = L > 0.005; if (!b.visible) return; b.position.copy(a).addScaledVector(d, 0.5); b.quaternion.setFromUnitVectors(UP, d.multiplyScalar(1 / L)); b.scale.set(1, L, 1); };
    const dotM = new THREE.MeshBasicMaterial({ color: 0xfff6c8 });
    const dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 8, 6), dotM, 15); dots.frustumCulled = false; G.add(dots);
    // 종이 위 빛
    const spotM = new THREE.MeshBasicMaterial({ color: 0xffe066, transparent: true, opacity: 0, depthWrite: false });
    const spots = HS.map(y => { const m = new THREE.Mesh(new THREE.CircleGeometry(0.13, 16).rotateY(-Math.PI / 2), spotM); m.position.set(XP - 0.005, YC + y, 0); G.add(m); return m; });
    const hotM = new THREE.MeshBasicMaterial({ color: 0xfff7d6, transparent: true, opacity: 0, depthWrite: false });
    const hot = new THREE.Mesh(new THREE.CircleGeometry(0.11, 18).rotateY(-Math.PI / 2), hotM); hot.position.set(XP - 0.007, YC, 0); G.add(hot);
    const haloM = new THREE.MeshBasicMaterial({ color: 0xffc533, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const halo = new THREE.Mesh(new THREE.CircleGeometry(0.3, 24).rotateY(-Math.PI / 2), haloM); halo.position.set(XP - 0.006, YC, 0); G.add(halo);

    // 글자표
    const L = (t, x, y, z, s) => { const l = K.label(t, s || 0.6); l.position.set(x, y, z); G.add(l); return l; };
    const lSun = L('햇빛', X0 + 0.2, YC + 1.35, 0), lPaper = L('검은 종이', XP, 3.0, 0), lLens = L('볼록 렌즈', XL, YC + 1.45, 0);
    const lGlass = L('평평한 유리', XL, YC + 1.45, 0), lHot = L('빛이 모인 곳', XP - 0.2, YC - 0.55, 0.7), lBend = L('꺾여요', XL + 0.75, YC + 1.15, 0);

    root.position.set(0.3, K.PAGE_Y + 0.3, 0.1);
    const CFG = ['none', 'lens', 'lens', 'flat', 'lens'];
    let step = 0, cfg = 'none', rev = 1, t0 = -1; const st = { lens: 0, glass: 0, hot: 0 };
    const tmp = V(0, 0, 0), M4 = new THREE.Matrix4();
    const clipX = (a, b, xf, out) => { if (b.x <= xf) return out.copy(b); const k = (xf - a.x) / (b.x - a.x); return out.lerpVectors(a, b, Math.max(0, k)); };
    const cA = V(0, 0, 0), cB = V(0, 0, 0);
    return {
      root, cam: { pos: [-1.5, 5.0, 9.6], target: [0.0, 1.15, 0] },
      set(s) { step = s; t0 = -1; if (CFG[s] !== cfg) { cfg = CFG[s]; rev = K.RM ? 1 : 0; } },
      update(dt, t) {
        if (t0 < 0) t0 = t;
        st.lens = K.RM ? (cfg === 'lens' ? 1 : 0) : K.damp(st.lens, cfg === 'lens' ? 1 : 0, dt, 6);
        st.glass = K.RM ? (cfg === 'flat' ? 1 : 0) : K.damp(st.glass, cfg === 'flat' ? 1 : 0, dt, 6);
        lens.visible = st.lens > 0.02; lens.scale.setScalar(Math.max(0.01, st.lens));
        glass.visible = st.glass > 0.02; glass.scale.setScalar(Math.max(0.01, st.glass));
        rev = Math.min(1, rev + dt * 0.75);
        const xf = X0 + (XP - X0 + 0.01) * rev; // 빛이 나아간 앞쪽 끝
        const P = cfg === 'lens' ? LENS : FLAT;
        P.forEach((pts, r) => {
          segs[r].forEach((b, i) => {
            if (i >= pts.length - 1 || pts[i].x > xf) { b.visible = false; return; }
            setSeg(b, pts[i], clipX(pts[i], pts[i + 1], xf, cB));
          });
          // 빛 알갱이 3개씩 흐르기
          for (let j = 0; j < 3; j++) {
            const f = ((t * 0.35 + j / 3 + r * 0.07) % 1); const x = X0 + (XP - X0) * f;
            let i = 0; while (i < pts.length - 2 && pts[i + 1].x < x) i++;
            const a = pts[i], b = pts[i + 1]; tmp.lerpVectors(a, b, (x - a.x) / Math.max(1e-6, b.x - a.x));
            M4.makeScale(x <= xf ? 1 : 0, x <= xf ? 1 : 0, x <= xf ? 1 : 0); M4.setPosition(tmp); dots.setMatrixAt(r * 3 + j, M4);
          }
        });
        dots.instanceMatrix.needsUpdate = true;
        const arrived = rev >= 1;
        const conv = cfg === 'lens';
        st.hot = K.damp(st.hot, arrived && conv ? 1 : 0, dt, 3);
        spotM.opacity = K.damp(spotM.opacity, arrived && !conv ? 0.85 : 0, dt, 5);
        const pulse = 0.85 + 0.15 * Math.sin(t * 5);
        hotM.opacity = st.hot; haloM.opacity = 0.6 * st.hot * pulse; halo.scale.setScalar(0.7 + 0.5 * st.hot * pulse);
        lSun.visible = step === 0 || step === 3; lPaper.visible = step === 0;
        lLens.visible = (step === 1 || step === 4) && st.lens > 0.5; lGlass.visible = step === 3 && st.glass > 0.5;
        lBend.visible = step === 1 && rev > 0.6; lHot.visible = (step === 2 || step === 4) && st.hot > 0.5;
      },
    };
  },
});
