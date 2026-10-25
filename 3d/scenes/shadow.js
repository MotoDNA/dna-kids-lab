POP3D.register('shadow', {
  title: '그림자의 크기 바꾸기', kicker: '과학 5학년 · 빛과 그림자', pageTitle: '빛의 직진과 그림자', pageNo: 18,
  pageLines: ['빛은 곧게 나아가요.', '곧게 가던 빛이 물체에 막히면', '물체 뒤쪽 스크린에 그림자가 생겨요.', '', '물체를 손전등에 가까이 하면 그림자가', '커지고, 멀리 하면 작아져요.'],
  caption: '그림 2. 손전등, 종이 인형, 스크린',
  steps: [
    { name: '빛의 직진', title: '빛은 곧게 나아가요', body: '손전등을 켜면 빛이 똑바로 뻗어 나가 스크린을 밝혀요. 노란 선이 빛이 나아가는 길이에요.' },
    { name: '그림자 생기기', title: '빛이 막힌 곳에 그림자가 생겨요', body: '빛이 통과하지 못하는 종이 인형을 세웠어요. 빛이 인형에 막혀 뒤쪽 스크린에 닿지 못해서 인형 모양의 그림자가 생겨요.' },
    { name: '손전등 가까이', title: '손전등에 가까이 하면 그림자가 커져요', body: '손전등과 스크린은 그대로 두고 인형만 손전등 쪽으로 옮겼어요. 인형 가장자리를 스치는 빛이 더 넓게 벌어져서 그림자가 커져요.' },
    { name: '스크린 가까이', title: '스크린에 가까이 하면 그림자가 작아져요', body: '이번에는 인형을 손전등에서 멀리, 스크린 쪽으로 옮겼어요. 그림자가 작아져서 인형 크기와 비슷해져요.' },
    { name: '정리', title: '그림자의 크기 정리', body: '빛은 곧게 나아가서 물체에 막힌 곳에 그림자가 생겨요. 물체가 손전등에 가까울수록 그림자가 크고, 멀어질수록 작아요.', f: '손전등에 가까이 → 그림자 커짐 · 멀리 → 그림자 작아짐' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const G = new THREE.Group(); G.rotation.y = 0.62; root.add(G); // 빛의 축 = G 의 +x
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const H = 1.6, XS = -2.25, XSC = 2.6, R = 1.4; // 빛 높이, 손전등 앞(빛이 나오는 점), 스크린, 밝은 원 반지름
    const S = V(XS, H, 0);

    // 손전등과 받침 상자
    const box = new THREE.BoxGeometry(0.95, H - 0.27, 0.8); box.translate(-2.75, (H - 0.27) / 2, 0); G.add(K.sketch(new THREE.Mesh(box, K.paper(0xc9a06b, 1))));
    const body = new THREE.CylinderGeometry(0.17, 0.17, 0.75, 16); body.rotateZ(-Math.PI / 2); body.translate(-2.93, H, 0); G.add(K.sketch(new THREE.Mesh(body, K.paper(0x8fbfe8, 1))));
    const headG = new THREE.CylinderGeometry(0.27, 0.18, 0.32, 16); headG.rotateZ(-Math.PI / 2); headG.translate(-2.41, H, 0); G.add(K.sketch(new THREE.Mesh(headG, K.paper(0x8fbfe8, 1))));
    const lensG = new THREE.CircleGeometry(0.24, 20); lensG.rotateY(Math.PI / 2); lensG.translate(XS - 0.005, H, 0);
    const lensM = new THREE.MeshBasicMaterial({ color: 0xfff3b0 }); G.add(new THREE.Mesh(lensG, lensM));

    // 스크린
    const scr = new THREE.BoxGeometry(0.06, 3.2, 3.5); scr.translate(XSC + 0.05, 1.6, 0); G.add(K.sketch(new THREE.Mesh(scr, K.paper(0xfffdf6, 1))));
    [-1.4, 1.4].forEach(z => { const f = new THREE.BoxGeometry(0.7, 0.12, 0.2); f.translate(XSC + 0.05, 0.06, z); G.add(K.sketch(new THREE.Mesh(f, K.paper(0xc9a06b, 1)))); });
    const litG = new THREE.CircleGeometry(R, 40); litG.rotateY(-Math.PI / 2); litG.translate(XSC - 0.004, H, 0);
    const litM = new THREE.MeshBasicMaterial({ color: 0xffe680, transparent: true, opacity: 0, depthWrite: false }); G.add(new THREE.Mesh(litG, litM));

    // 종이 인형 (축 위 가운데 기준, 반높이 0.3)
    const bodyPts = [[0.035, 0.11], [0.12, 0.08], [0.24, -0.02], [0.21, -0.07], [0.11, 0.0], [0.1, -0.11], [0.16, -0.2], [0.07, -0.2], [0.07, -0.3], [0.02, -0.3], [0.0, -0.22]];
    const full = bodyPts.concat(bodyPts.slice(0, -1).reverse().map(p => [-p[0], p[1]]));
    const shp = new THREE.Shape(); full.forEach((p, i) => i ? shp.lineTo(p[0], p[1]) : shp.moveTo(p[0], p[1]));
    const HEAD = { y: 0.2, r: 0.1 };
    const hs = new THREE.Shape(); hs.absarc(0, HEAD.y, HEAD.r, 0, Math.PI * 2, false);
    const FS = 1.15; // 인형 크기 배율 (반높이 0.3 × 1.15)
    const figG = new THREE.ShapeGeometry([shp, hs], 10); figG.scale(FS, FS, 1); figG.rotateY(Math.PI / 2); // 모양 x → -z
    const inFig = (yy, zz) => { // 인형 면 위 점(축 기준)이 인형 안인가
      const x = -zz / FS, y = yy / FS; if (x * x + (y - HEAD.y) * (y - HEAD.y) <= HEAD.r * HEAD.r) return true;
      let inside = false; for (let i = 0, j = full.length - 1; i < full.length; j = i++) { const [xi, yi] = full[i], [xj, yj] = full[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside; } return inside;
    };
    const fig = new THREE.Group(); G.add(fig);
    const figMesh = K.sketch(new THREE.Mesh(figG, K.paper(0xf3a9c0, 1))); figMesh.position.y = H; fig.add(figMesh);
    const stickG = new THREE.CylinderGeometry(0.02, 0.02, H - 0.3 * FS, 6); stickG.translate(0, (H - 0.3 * FS) / 2, 0); fig.add(new THREE.Mesh(stickG, K.paper(0x8a6a3e, 1)));
    const baseG = new THREE.BoxGeometry(0.4, 0.1, 0.4); baseG.translate(0, 0.05, 0); fig.add(K.sketch(new THREE.Mesh(baseG, K.paper(0xc9a06b, 1))));

    // 스크린의 그림자 (실제 투영: 크기 배율 k = (스크린-손전등)/(인형-손전등))
    const shM = new THREE.MeshBasicMaterial({ color: 0x3b4149, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const shadow = new THREE.Mesh(figG, shM); shadow.position.set(XSC - 0.008, H, 0); shadow.renderOrder = 1; G.add(shadow); // 밝은 원 위에 그리기
    const stickSh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateY(-Math.PI / 2), shM); stickSh.renderOrder = 1; G.add(stickSh);

    // 빛줄기 (가는 원기둥)
    const cyl = new THREE.CylinderGeometry(0.016, 0.016, 1, 6); const UP = V(0, 1, 0);
    const rayM = new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0.6 });
    const edgeM = new THREE.MeshBasicMaterial({ color: 0xe8590c, transparent: true, opacity: 0.95 });
    const beam = m => { const b = new THREE.Mesh(cyl, m); G.add(b); return b; };
    const setBeam = (b, a, c) => { const d = new THREE.Vector3().subVectors(c, a); const L = d.length(); b.visible = L > 0.01; if (!b.visible) return; b.position.copy(a).addScaledVector(d, 0.5); b.quaternion.setFromUnitVectors(UP, d.multiplyScalar(1 / L)); b.scale.set(1, L, 1); };
    // 스크린 위 목표점(축 기준 y, z)
    const targets = [];
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; targets.push([Math.sin(a) * R * 0.97, Math.cos(a) * R * 0.97]); }
    [[0, 0], [0.45, 0], [-0.5, 0], [0, 0.6], [0, -0.6], [0.75, 0.5], [-0.8, -0.45], [0.2, 0.25], [-0.25, -0.2]].forEach(t => targets.push(t));
    const rays = targets.map(() => beam(rayM));
    const edgeT = [[0.3, 0], [-0.3, -0.045], [-0.02, 0.24], [-0.02, -0.24]].map(e => [e[0] * FS, e[1] * FS]); // 머리 위, 발끝, 양팔 끝 (y, z)
    const edges = edgeT.map(() => beam(edgeM));
    const dotM = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
    const dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.055, 8, 6), dotM, targets.length); dots.frustumCulled = false; G.add(dots);

    // 글자표
    const L = (t, x, y, z, s) => { const l = K.label(t, s || 0.6); l.position.set(x, y, z); G.add(l); return l; };
    const lTorch = L('손전등', -2.8, H + 0.6, 0), lScr = L('스크린', XSC, 3.45, 0), lFig = L('종이 인형', 0, H + 0.62, 0), lSh = L('그림자', XSC - 0.1, H - 1.1, -0.75);
    const lBig = L('그림자가 커져요', XSC - 0.1, 3.45, 0, 0.6), lSmall = L('그림자가 작아져요', XSC - 0.1, 3.45, 0, 0.6);
    lFig.userData.follow = true;

    root.position.set(0.25, K.PAGE_Y + 0.3, 0.1);
    const POS = [0.2, 0.2, -1.0, 1.8, 0.2];
    let step = 0, t0 = -1; const st = { x: 0.2, tx: 0.2, show: 0, ts: 0, lit: 0 };
    const M4 = new THREE.Matrix4(), tmp = V(0, 0, 0), hit = V(0, 0, 0), end = V(0, 0, 0);
    return {
      root, cam: { pos: [-2.0, 5.3, 9.5], target: [0.3, 1.6, 0] },
      set(s) { step = s; t0 = -1; st.tx = POS[s]; st.ts = s >= 1 ? 1 : 0; if (K.RM) { st.x = st.tx; st.show = st.ts; } },
      update(dt, t) {
        if (t0 < 0) t0 = t; const tau = t - t0;
        if (step === 4 && !K.RM) st.tx = 0.4 - 1.4 * Math.cos(tau * 0.9); // 정리: 인형이 앞뒤로 오가요 (-1.0 ~ 1.8)
        st.x = K.RM ? st.tx : K.damp(st.x, st.tx, dt, 2.5); st.show = K.RM ? st.ts : K.damp(st.show, st.ts, dt, 4); st.lit = K.damp(st.lit, 1, dt, 3);
        const on = st.show > 0.02; fig.visible = on; fig.scale.setScalar(Math.max(0.01, Math.min(1, st.show)));
        const xo = st.x; fig.position.x = xo;
        const k = (XSC - XS) / (xo - XS);
        shadow.scale.set(1, k, k); shM.opacity = 0.88 * Math.min(1, st.show); shadow.visible = on;
        const yTop = H - 0.3 * FS * k, yBot = H - R; // 막대 그림자: 밝은 원 안쪽만
        stickSh.visible = on && yTop > yBot; stickSh.position.set(XSC - 0.009, (yTop + yBot) / 2, 0); stickSh.scale.set(1, Math.max(0.001, yTop - yBot), 0.04 * k);
        litM.opacity = 0.9 * st.lit; lensM.color.setRGB(1, 0.95, 0.69);
        const fl = (t * 0.55) % 1;
        targets.forEach((tg, i) => {
          end.set(XSC - 0.01, H + tg[0], tg[1]);
          let stop = end;
          if (on && st.show > 0.6) { const y = tg[0] / k, z = tg[1] / k; if (inFig(y, z)) { hit.set(xo, H + y, z); stop = hit; } }
          setBeam(rays[i], S, stop);
          const f = (fl + i * 0.137) % 1; tmp.lerpVectors(S, stop, f); M4.makeTranslation(tmp.x, tmp.y, tmp.z); dots.setMatrixAt(i, M4);
        });
        dots.instanceMatrix.needsUpdate = true;
        edgeT.forEach((e, i) => { const show = on && st.show > 0.6; edges[i].visible = show; if (show) { end.set(XSC - 0.012, H + e[0] * k, e[1] * k); setBeam(edges[i], S, end); } });
        lTorch.visible = lScr.visible = step <= 1;
        lFig.visible = step === 1; lSh.visible = step >= 1 && step <= 1;
        lBig.visible = step === 2; lSmall.visible = step === 3;
        lFig.position.x = xo;
      },
    };
  },
});
