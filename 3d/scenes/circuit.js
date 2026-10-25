POP3D.register('circuit', {
  title: '전기 회로와 전구 연결', kicker: '과학 6학년 · 전기의 이용', pageTitle: '직렬연결과 병렬연결', pageNo: 30,
  pageLines: ['전지, 전선, 전구를 끊어진 곳 없이', '하나의 길로 이으면 불이 켜져요.', '', '전구를 한 줄로 이으면 직렬연결,', '여러 갈래로 이으면 병렬연결이에요.'],
  caption: '그림 4. 전구 두 개를 잇는 두 가지 방법',
  steps: [
    { name: '끊어진 회로', title: '스위치를 열면 불이 꺼져 있어요', body: '전지, 전선, 전구, 스위치로 전기 회로를 만들었어요. 스위치가 열려 길이 끊어져 있어서 전기가 흐르지 않아요.' },
    { name: '이어진 회로', title: '스위치를 닫으면 불이 켜져요', body: '끊어진 곳 없이 이어지자 전기가 전지의 (+)극에서 나와 전구를 지나 (-)극으로 흘러요. 노란 점이 전기가 흐르는 방향이에요.', f: '(+)극 → 전선 → 전구 → 전선 → (-)극' },
    { name: '직렬연결', title: '한 줄로 이은 직렬연결', body: '전구 두 개를 한 줄로 이었더니 둘 다 전구 하나일 때보다 어두워요. 전구 하나를 빼면 길이 끊겨 나머지 전구도 꺼져요.' },
    { name: '병렬연결', title: '여러 갈래로 나눈 병렬연결', body: '전구 두 개를 두 갈래로 나누어 이었더니 둘 다 전구 하나일 때만큼 밝아요. 전구 하나를 빼도 다른 갈래로 전기가 흘러 나머지 전구는 켜져 있어요.' },
    { name: '정리', title: '직렬연결과 병렬연결 비교', body: '직렬연결은 전구가 어둡고 하나가 꺼지면 모두 꺼져요. 병렬연결은 전구가 더 밝고 하나가 꺼져도 나머지는 켜져 있어요.', f: '전구의 밝기: 병렬연결 > 직렬연결' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const YW = 0.05, ZF = 1.35, ZB = -1.3, ZM = -0.15, XR = 2.3, XL = -2.3;

    // 판지 판
    const bg = new THREE.BoxGeometry(5.8, 0.12, 4.0); bg.translate(0, -0.06, 0.05);
    root.add(K.sketch(new THREE.Mesh(bg, K.paper(0xe8cfa0, 1))));

    // 전지: +x 쪽이 (+)극
    const batCv = K.canvas(256, 256, (c, w, h) => {
      c.fillStyle = '#f7b267'; c.fillRect(0, 0, w, h * 0.5); c.fillStyle = '#6b7780'; c.fillRect(0, h * 0.5, w, h * 0.5);
      c.strokeStyle = '#ffffff'; c.lineWidth = 13; c.lineCap = 'round';
      for (let i = 0; i < 4; i++) {
        const u = (i + 0.5) * w / 4;
        c.beginPath(); c.moveTo(u - 22, h * 0.24); c.lineTo(u + 22, h * 0.24); c.moveTo(u, h * 0.24 - 22); c.lineTo(u, h * 0.24 + 22); c.stroke();
        c.beginPath(); c.moveTo(u, h * 0.76 - 22); c.lineTo(u, h * 0.76 + 22); c.stroke(); // 전지 길이 방향의 가로줄 = (-)
      }
    });
    const batG = new THREE.CylinderGeometry(0.28, 0.28, 1.6, 20); batG.rotateZ(-Math.PI / 2); batG.translate(-0.05, 0.3, ZF);
    const bat = new THREE.Mesh(batG, [new THREE.MeshLambertMaterial({ map: K.tex(batCv) }), K.paper(0xf7b267, 1), K.paper(0x6b7780, 1)]);
    root.add(K.sketch(bat));
    const nubG = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 12); nubG.rotateZ(-Math.PI / 2); nubG.translate(0.8, 0.3, ZF);
    root.add(K.sketch(new THREE.Mesh(nubG, K.paper(0xb8bec4, 1))));
    const metal = K.paper(0xb8bec4, 1);
    [0.9, -0.9].forEach(x => { const g = new THREE.BoxGeometry(0.05, 0.45, 0.34); g.translate(x, 0.225, ZF); root.add(K.sketch(new THREE.Mesh(g, metal))); });

    // 스위치 (오른쪽 전선 위, z 0.75 ~ 0.25)
    const swb = new THREE.BoxGeometry(0.5, 0.04, 0.85); swb.translate(XR, 0.02, 0.5); root.add(K.sketch(new THREE.Mesh(swb, K.paper(0xc9a06b, 1))));
    [0.75, 0.25].forEach(z => { const g = new THREE.BoxGeometry(0.14, 0.14, 0.12); g.translate(XR, 0.09, z); root.add(K.sketch(new THREE.Mesh(g, metal))); });
    const lever = new THREE.Group(); lever.position.set(XR, 0.17, 0.25); root.add(lever);
    const lg = new THREE.BoxGeometry(0.07, 0.05, 0.58); lg.translate(0, 0, 0.29); lever.add(K.sketch(new THREE.Mesh(lg, metal)));
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), K.paper(0xe0645a, 1)); knob.position.set(0, 0.06, 0.58); lever.add(knob);

    // 전선 조각
    const wireMat = new THREE.MeshLambertMaterial({ color: 0x3c4a56 });
    const cyl = new THREE.CylinderGeometry(0.045, 0.045, 1, 8);
    const joint = new THREE.SphereGeometry(0.045, 8, 6);
    const UP = V(0, 1, 0);
    const wireGroup = segs => {
      const g = new THREE.Group(); const done = new Set();
      const key = p => p.toArray().map(v => v.toFixed(2)).join(',');
      segs.forEach(([a, b]) => {
        const k = [key(a), key(b)].sort().join('|'); if (done.has(k)) return; done.add(k);
        const d = new THREE.Vector3().subVectors(b, a); const m = new THREE.Mesh(cyl, wireMat);
        m.position.copy(a).addScaledVector(d, 0.5); m.quaternion.setFromUnitVectors(UP, d.clone().normalize()); m.scale.y = d.length(); g.add(m);
        [a, b].forEach(p => { const kk = key(p); if (done.has(kk)) return; done.add(kk); const j = new THREE.Mesh(joint, wireMat); j.position.copy(p); g.add(j); });
      });
      root.add(g); return g;
    };

    // 길(전류 방향 = (+)극 → (-)극). 넷째 값 'w' = 앞 점에서 이 점까지 전선
    const head = [[0.85, 0.3, ZF, 'n'], [0.9, 0.3, ZF, 'n'], [0.9, YW, ZF, 'n'], [XR, YW, ZF, 'w'], [XR, YW, 0.75, 'w'], [XR, 0.16, 0.75, 'n'], [XR, 0.16, 0.25, 'n'], [XR, YW, 0.25, 'n']];
    const tail = [[XL, YW, ZF, 'w'], [-0.9, YW, ZF, 'w'], [-0.9, 0.3, ZF, 'n'], [-0.85, 0.3, ZF, 'n']];
    const thru = (bx, bz) => [[bx + 0.22, YW, bz, 'w'], [bx + 0.07, 0.6, bz, 'n'], [bx - 0.07, 0.6, bz, 'n'], [bx - 0.22, YW, bz, 'n']];
    const mkPath = arr => {
      const pts = arr.map(a => V(a[0], a[1], a[2])); const segs = []; const cum = [0];
      for (let i = 1; i < pts.length; i++) { cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1])); if (arr[i][3] === 'w') segs.push([pts[i - 1], pts[i]]); }
      const L = cum[cum.length - 1];
      return { pts, cum, L, segs, at(s, out) { s = ((s % L) + L) % L; let i = 1; while (i < cum.length - 1 && cum[i] < s) i++; const k = (s - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]); return out.lerpVectors(pts[i - 1], pts[i], k); } };
    };
    const BP = { single: { A: [0, ZB] }, series: { A: [-1.0, ZB], B: [1.0, ZB] }, parallel: { A: [-0.9, ZB], B: [0.9, ZM] } };
    const P = {
      single: [mkPath([...head, [XR, YW, ZB, 'w'], ...thru(0, ZB), [XL, YW, ZB, 'w'], ...tail])],
      series: [mkPath([...head, [XR, YW, ZB, 'w'], ...thru(1.0, ZB), ...thru(-1.0, ZB), [XL, YW, ZB, 'w'], ...tail])],
      parallel: [
        mkPath([...head, [XR, YW, ZM, 'w'], [XR, YW, ZB, 'w'], ...thru(-0.9, ZB), [XL, YW, ZB, 'w'], [XL, YW, ZM, 'w'], ...tail]),
        mkPath([...head, [XR, YW, ZM, 'w'], ...thru(0.9, ZM), [XL, YW, ZM, 'w'], ...tail]),
      ],
    };
    const WG = {}; Object.keys(P).forEach(k => { WG[k] = wireGroup(P[k].flatMap(p => p.segs)); WG[k].visible = k === 'single'; });

    // 전구
    const bulb = () => {
      const g = new THREE.Group();
      const pg = new THREE.BoxGeometry(0.58, 0.06, 0.34); pg.translate(0, 0.03, 0); g.add(K.sketch(new THREE.Mesh(pg, K.paper(0xc9a06b, 1))));
      const sg = new THREE.CylinderGeometry(0.16, 0.18, 0.2, 14); sg.translate(0, 0.16, 0); g.add(K.sketch(new THREE.Mesh(sg, metal)));
      const glass = new THREE.Group(); g.add(glass);
      const scg = new THREE.CylinderGeometry(0.11, 0.11, 0.16, 12); scg.translate(0, 0.32, 0); glass.add(K.sketch(new THREE.Mesh(scg, metal)));
      const gm = new THREE.MeshLambertMaterial({ color: 0xeef2f4, transparent: true, opacity: 0.8 });
      const sph = new THREE.Mesh(new THREE.SphereGeometry(0.27, 18, 12), gm); sph.position.y = 0.64; glass.add(sph);
      const fil = K.line([[0.07, 0.4, 0], [0.07, 0.62, 0], [-0.07, 0.62, 0], [-0.07, 0.4, 0]], 0x24303a); glass.add(fil);
      const hm = new THREE.MeshBasicMaterial({ color: 0xffd24a, transparent: true, opacity: 0, depthWrite: false });
      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 10), hm); halo.position.y = 0.64; glass.add(halo);
      g.scale.setScalar(1.3); g.userData = { glass, gm, fil, hm, halo, b: 0, tb: 0, lift: 0, tl: 0 };
      root.add(g); return g;
    };
    const bA = bulb(), bB = bulb();
    const glowCol = new THREE.Color(0xfff1b0), offCol = new THREE.Color(0xeef2f4);
    const applyBulb = (bu, dt) => {
      const u = bu.userData; u.b = K.RM ? u.tb : K.damp(u.b, u.tb, dt, 6); u.lift = K.RM ? u.tl : K.damp(u.lift, u.tl, dt, 4);
      u.gm.color.copy(offCol).lerp(glowCol, Math.min(1, u.b)); u.gm.emissive.setRGB(0.95 * u.b, 0.72 * u.b, 0.12 * u.b);
      u.fil.material.color.setRGB(0.14 + 0.86 * u.b, 0.19 + 0.5 * u.b, 0.23 - 0.1 * u.b);
      u.hm.opacity = 0.42 * u.b; u.halo.scale.setScalar(0.7 + 0.5 * u.b);
      u.glass.position.set(0.12 * u.lift, 0.42 * u.lift, 0.1 * u.lift); u.glass.rotation.z = -0.3 * u.lift;
    };

    // 흐르는 점
    const dotG = new THREE.SphereGeometry(0.085, 10, 8);
    const mkDots = n => { const m = new THREE.InstancedMesh(dotG, new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0 }), n); m.frustumCulled = false; m.renderOrder = 2; root.add(m); return m; };
    const D1 = mkDots(60), D2 = mkDots(60);
    const flow = [{ off: 0, op: 0 }, { off: 0, op: 0 }];
    const tmpV = V(0, 0, 0), M4 = new THREE.Matrix4();
    const Z0 = new THREE.Matrix4().makeScale(0, 0, 0);
    const drawDots = (mesh, path, f, phase, branchOnly) => {
      if (!path) { mesh.count = 0; return; }
      const n = Math.min(60, Math.floor(path.L / 0.4)); mesh.count = n;
      for (let i = 0; i < n; i++) { path.at(f.off + (i + phase) * path.L / n, tmpV); tmpV.y += 0.03; M4.makeTranslation(tmpV.x, tmpV.y, tmpV.z);
        // 병렬 둘째 갈래는 갈라진 부분(가운데 줄)에만 점을 그린다
        mesh.setMatrixAt(i, branchOnly && !(Math.abs(tmpV.z - ZM) < 0.05 && tmpV.x > XL + 0.01 && tmpV.x < XR - 0.01) ? Z0 : M4); }
      mesh.instanceMatrix.needsUpdate = true; mesh.material.opacity = f.op;
    };

    // 글자표
    const L = (t, x, y, z, s) => { const l = K.label(t, s || 0.6); l.position.set(x, y, z); root.add(l); return l; };
    const lPlus = L('(+)극', 0.95, 0.95, ZF + 0.2), lMinus = L('(-)극', -0.95, 0.95, ZF + 0.2);
    const lSw = L('스위치', XR, 0.85, 0.45), lBat = L('전지', -0.05, 0.25, ZF + 0.75, 0.55), lBulb = L('전구', 0, 1.35, ZB);
    const lSer = L('직렬연결', -0.05, 0.2, ZF + 0.62, 0.7), lPar = L('병렬연결', -0.05, 0.2, ZF + 0.62, 0.7);
    const arrows = [K.arrow(V(1.3, 0.35, ZF + 0.35), V(2.0, 0.35, ZF + 0.35), 0xd04a3a), K.arrow(V(-2.0, 0.35, ZF + 0.35), V(-1.3, 0.35, ZF + 0.35), 0xd04a3a)];
    arrows.forEach(a => root.add(a));
    const lOut = K.label('전구를 빼면?', 0.5); lOut.position.set(0.55, 1.15, 0); bB.userData.glass.add(lOut);

    root.position.set(0.1, K.PAGE_Y + 0.42, 0.1);
    let step = 0, t0 = -1, sw = 0, swT = 0, layout = 'single', tLayout = 'single', fv = 1;
    const place = () => {
      const bp = BP[layout]; bA.position.set(bp.A[0], 0, bp.A[1]);
      bB.visible = !!bp.B; if (bp.B) bB.position.set(bp.B[0], 0, bp.B[1]);
      Object.keys(WG).forEach(k => { WG[k].visible = k === layout; });
    };
    place();
    return {
      root, cam: { pos: [0.4, 5.3, 6.9], target: [0.1, 0.55, 0.15] },
      set(s) { step = s; t0 = -1; swT = s >= 1 ? 1 : 0; tLayout = s <= 1 ? 'single' : s === 2 ? 'series' : 'parallel'; if (K.RM) { sw = swT; layout = tLayout; place(); } },
      update(dt, t) {
        if (t0 < 0) t0 = t; const tau = t - t0;
        // 정리 단계: 직렬과 병렬을 번갈아
        if (step === 4) tLayout = (tau % 7) < 3.5 ? 'series' : 'parallel';
        if (layout !== tLayout) { fv = K.damp(fv, 0, dt, 12); if (fv < 0.06 || K.RM) { layout = tLayout; place(); fv = K.RM ? 1 : 0.06; } }
        else fv = K.damp(fv, 1, dt, 8);
        WG[layout].scale.set(1, fv, 1); bA.scale.setScalar(Math.max(0.01, fv) * 1.3); bB.scale.setScalar(Math.max(0.01, fv) * 1.3);
        sw = K.RM ? swT : K.damp(sw, swT, dt, 4); lever.rotation.x = -0.95 * (1 - sw);
        const closed = sw > 0.97;
        const removed = (step === 2 || step === 3) && (tau % 6.5) > 3.2;
        bB.userData.tl = removed ? 1 : 0; if (step < 2 || step === 4) bB.userData.tl = 0;
        const out = bB.userData.lift > 0.25;
        const ready = fv > 0.9;
        // 전류: 전구 1개 = 1, 직렬 = 1/2, 병렬은 갈래마다 1
        let i1 = 0, i2 = 0, path1 = P[layout][0], path2 = P[layout][1];
        if (closed && ready) {
          if (layout === 'single') i1 = 1;
          else if (layout === 'series') i1 = out ? 0 : 0.5;
          else { i1 = 1; i2 = out ? 0 : 1; }
        }
        bA.userData.tb = layout === 'series' ? (i1 > 0 ? 0.36 : 0) : (i1 > 0 ? 1 : 0);
        bB.userData.tb = layout === 'series' ? (i1 > 0 ? 0.36 : 0) : (i2 > 0 ? 1 : 0);
        [[flow[0], i1], [flow[1], i2]].forEach(([f, i]) => { f.off += 1.3 * i * dt; f.op = K.damp(f.op, i > 0 ? 1 : 0, dt, i > 0 ? 4 : 9); });
        if (!ready) flow[0].op = flow[1].op = 0;
        drawDots(D1, path1, flow[0], 0); drawDots(D2, path2, flow[1], 0.5, true);
        applyBulb(bA, dt); applyBulb(bB, dt);
        // 글자표 (한 화면 6개 이하)
        lPlus.visible = lMinus.visible = step <= 1;
        lSw.visible = lBat.visible = lBulb.visible = step === 0;
        lSer.visible = (step === 2 || step === 4) && layout === 'series' && ready;
        lPar.visible = (step === 3 || step === 4) && layout === 'parallel' && ready;
        lOut.visible = out && step !== 4;
        arrows.forEach(a => { a.visible = step === 1 && flow[0].op > 0.5; });
      },
    };
  },
});
