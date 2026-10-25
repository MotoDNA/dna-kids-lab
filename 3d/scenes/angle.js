POP3D.register('angle', {
  title: '각도기로 각도 재기', kicker: '수학 4학년 · 각도', pageTitle: '각도기 사용법', pageNo: 24,
  pageLines: ['① 각도기의 중심을', '    각의 꼭짓점에 맞춰요.', '② 밑금을 각의 한 변에 맞춰요.', '③ 나머지 변이 가리키는', '    눈금을 읽어요.', '0부터 시작하는 눈금을 따라 읽어요.'],
  caption: '그림 2. 각도기로 각의 크기 재기',
  steps: [
    { name: '각과 각도기', title: '각도기를 살펴봐요', body: '각도기 아래쪽 곧은 선이 밑금이고, 밑금 가운데 점이 중심이에요. 눈금은 바깥쪽과 안쪽 두 줄이 있어요.', cam: { pos: [0.1, 6.8, 4.5], target: [0.1, 0.3, -0.1] } },
    { name: '중심 맞추기', title: '① 중심을 꼭짓점에 맞춰요', body: '각도기의 중심을 각의 꼭짓점에 꼭 맞게 놓아요.' },
    { name: '밑금 맞추기', title: '② 밑금을 한 변에 맞춰요', body: '각도기를 돌려서 밑금을 파란 변에 맞춰요. 파란 변 쪽에서 0부터 시작하는 눈금은 안쪽 파란 눈금이에요.' },
    { name: '눈금 읽기', title: '③ 나머지 변이 가리키는 눈금을 읽어요', body: '빨간 변이 지나는 곳의 안쪽 눈금을 읽으면 60이에요. 이 각은 60°예요. 바깥쪽 120을 읽지 않게 조심해요.', f: '각도 = 60°', cam: { pos: [0.0, 5.7, 3.4], target: [0.0, 0.3, 0.05] } },
    { name: '예각·직각·둔각', title: '변을 돌려 여러 각을 재어 봐요', body: '30°처럼 직각보다 작은 각은 예각, 90°는 직각, 120°처럼 직각보다 크고 180°보다 작은 각은 둔각이에요.', f: '예각 30° · 직각 90° · 둔각 120°', cam: { pos: [0.1, 6.8, 4.5], target: [0.1, 0.3, -0.1] } },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const lab = (text, size, color, bg) => { const sp = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); sp.material.map.dispose(); sp.material.map = n.material.map; sp.material.needsUpdate = true; }); } catch (e) {} return sp; };
    const D2R = Math.PI / 180;
    // 각: 꼭짓점 VX, 파란 변(밑변)은 +x, 빨간 변은 시계 반대 방향으로 θ (위에서 볼 때)
    const VX = new THREE.Vector3(-0.1, 0, 1.15), ARM = 3.0;
    const armGeo = new THREE.BoxGeometry(ARM, 0.04, 0.08); armGeo.translate(ARM / 2, 0.02, 0);
    const base = new THREE.Mesh(armGeo, new THREE.MeshBasicMaterial({ color: 0x2a56c6 })); base.position.copy(VX); root.add(base);
    const arm = new THREE.Mesh(armGeo, new THREE.MeshBasicMaterial({ color: 0xd04a3a })); arm.position.copy(VX); root.add(arm);
    const vdot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 10), new THREE.MeshBasicMaterial({ color: 0x24303a })); vdot.position.copy(VX).setY(0.04); root.add(vdot);
    // 각을 나타내는 호와 직각 표시
    const arcMat = new THREE.MeshBasicMaterial({ color: 0xd04a3a, side: THREE.DoubleSide });
    const arc = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.57, 40, 1, 0, Math.PI / 3), arcMat); arc.rotation.x = -Math.PI / 2; arc.position.copy(VX).setY(0.1); arc.renderOrder = 3; root.add(arc);
    let arcDeg = 60;
    const sqS = new THREE.Shape(); sqS.moveTo(0.36, 0); sqS.lineTo(0.43, 0); sqS.lineTo(0.43, 0.43); sqS.lineTo(0, 0.43); sqS.lineTo(0, 0.36); sqS.lineTo(0.36, 0.36); sqS.lineTo(0.36, 0);
    const sq = new THREE.Mesh(new THREE.ShapeGeometry(sqS), arcMat); sq.rotation.x = -Math.PI / 2; sq.position.copy(VX).setY(0.1); sq.renderOrder = 3; root.add(sq);
    // 각도기: 반원 + 밑금 띠, 눈금은 캔버스 텍스처 (1° 작은 눈금, 5°, 10° 긴 눈금, 숫자 두 줄)
    const RD = 2.3, BM = 0.14;
    const CW = 980, CH = Math.round(CW * (RD + BM) / (2 * RD)), S = CW / (2 * RD), CX = CW / 2, CY = CH - BM * S;
    const cv = K.canvas(CW, CH, (c, w, h) => {
      c.clearRect(0, 0, w, h);
      c.fillStyle = 'rgba(255,253,246,0.45)';
      c.beginPath(); c.moveTo(0, h); c.lineTo(w, h); c.lineTo(w, CY); c.arc(CX, CY, RD * S, 0, Math.PI, true); c.closePath(); c.fill();
      const RP = RD * S - 3;
      c.strokeStyle = '#24303a'; c.lineCap = 'butt';
      for (let d = 0; d <= 180; d++) {
        const a = d * D2R, len = d % 10 === 0 ? 34 : d % 5 === 0 ? 22 : 12;
        c.lineWidth = d % 10 === 0 ? 2.6 : d % 5 === 0 ? 1.8 : 1.1;
        c.beginPath(); c.moveTo(CX + RP * Math.cos(a), CY - RP * Math.sin(a)); c.lineTo(CX + (RP - len) * Math.cos(a), CY - (RP - len) * Math.sin(a)); c.stroke();
      }
      // 안쪽 눈금선 (짧은 10° 눈금)
      c.beginPath(); c.arc(CX, CY, RP - 112, Math.PI, 0); c.lineWidth = 1.4; c.stroke();
      for (let d = 0; d <= 180; d += 10) { const a = d * D2R; c.beginPath(); c.moveTo(CX + (RP - 112) * Math.cos(a), CY - (RP - 112) * Math.sin(a)); c.lineTo(CX + (RP - 126) * Math.cos(a), CY - (RP - 126) * Math.sin(a)); c.stroke(); }
      c.textAlign = 'center'; c.textBaseline = 'middle';
      const num = (d, r, val, col, font) => { const a = d * D2R; c.save(); c.translate(CX + r * Math.cos(a), CY - r * Math.sin(a) - (d === 0 || d === 180 ? 16 : 0)); c.rotate(Math.PI / 2 - a); c.fillStyle = col; c.font = font; c.fillText(String(val), 0, 0); c.restore(); };
      for (let d = 0; d <= 180; d += 10) {
        num(d, RP - 52, 180 - d, '#4b5860', 'bold 25px sans-serif'); // 바깥쪽: 왼쪽에서 0
        num(d, RP - 88, d, '#2a56c6', 'bold 25px sans-serif'); // 안쪽: 오른쪽에서 0
      }
      // 밑금과 중심
      c.strokeStyle = '#24303a'; c.lineWidth = 3; c.beginPath(); c.moveTo(6, CY); c.lineTo(w - 6, CY); c.stroke();
      c.lineWidth = 2.5; c.beginPath(); c.moveTo(CX, CY - 26); c.lineTo(CX, CY + 0.6 * BM * S); c.stroke();
      c.fillStyle = '#24303a'; c.beginPath(); c.arc(CX, CY, 6, 0, Math.PI * 2); c.fill();
    });
    const shp = new THREE.Shape(); shp.moveTo(-RD, -BM); shp.lineTo(RD, -BM); shp.lineTo(RD, 0); shp.absarc(0, 0, RD, 0, Math.PI, false); shp.lineTo(-RD, -BM);
    const pg = new THREE.ShapeGeometry(shp, 64);
    const pos = pg.attributes.position, uv = pg.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + RD) / (2 * RD), (pos.getY(i) + BM) / (RD + BM));
    pg.rotateX(-Math.PI / 2);
    const pmat = new THREE.MeshBasicMaterial({ map: K.tex(cv), transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const protM = new THREE.Mesh(pg, pmat); protM.renderOrder = 2;
    protM.add(new THREE.LineSegments(new THREE.EdgesGeometry(pg), K.INK));
    const prot = new THREE.Group(); prot.add(protM); root.add(prot);
    // 글자표
    const L = {
      c: lab('중심', 0.6), b: lab('밑금', 0.6), v: lab('꼭짓점', 0.6), zero: lab('0부터 시작', 0.58, '#2a56c6'),
      r60: lab('60°', 0.8, '#c0392b'),
      k: [lab('30° 예각', 0.75, '#c0392b'), lab('90° 직각', 0.75, '#c0392b'), lab('120° 둔각', 0.75, '#c0392b')],
    };
    const allL = [L.c, L.b, L.v, L.zero, L.r60, ...L.k]; allL.forEach(l => { l.visible = false; root.add(l); });
    root.position.set(0.1, K.PAGE_Y + 0.3, 0.0);
    const P0 = { x: VX.x + 0.5, y: 0.8, z: VX.z - 0.85, r: 0.4 };
    const st = { x: P0.x, y: P0.y, z: P0.z, r: P0.r, th: 60, tth: 60 };
    let step = 0, t0 = null;
    const tgt = s => (s === 0 ? P0 : s === 1 ? { x: VX.x, y: 0.07, z: VX.z, r: P0.r } : { x: VX.x, y: 0.07, z: VX.z, r: 0 });
    return {
      root, cam: { pos: [0.1, 6.8, 4.5], target: [0.1, 0.3, -0.1] },
      set(s) {
        step = s; t0 = null;
        if (K.RM) { const g = tgt(s); st.x = g.x; st.y = g.y; st.z = g.z; st.r = g.r; }
      },
      update(dt, t) {
        if (t0 === null) t0 = t;
        const e = t - t0, g = tgt(step);
        st.x = K.damp(st.x, g.x, dt, 3); st.y = K.damp(st.y, g.y, dt, 3); st.z = K.damp(st.z, g.z, dt, 3); st.r = K.damp(st.r, g.r, dt, 3);
        if (Math.abs(st.r) < 0.0005) st.r = 0;
        prot.position.set(st.x, st.y, st.z); prot.rotation.y = st.r;
        // 4단계: 30° → 90° → 120° 차례로 (2.2초마다)
        let ki = -1;
        if (step === 4) { ki = Math.floor(Math.max(0, e - 0.3) / 2.2) % 3; st.tth = [30, 90, 120][ki]; } else st.tth = 60;
        st.th = K.RM ? st.tth : K.damp(st.th, st.tth, dt, 5);
        if (Math.abs(st.th - st.tth) < 0.05) st.th = st.tth;
        arm.rotation.y = st.th * D2R;
        if (Math.abs(arcDeg - st.th) > 0.01) { arcDeg = st.th; arc.geometry.dispose(); arc.geometry = new THREE.RingGeometry(0.5, 0.57, 40, 1, 0, Math.max(0.01, arcDeg * D2R)); }
        const right = Math.abs(st.th - 90) < 0.5;
        arc.visible = step >= 3 && !right; sq.visible = step >= 3 && right;
        // 글자표
        allL.forEach(l => { l.visible = false; });
        const pc = new THREE.Vector3(st.x, st.y + 0.1, st.z);
        const rot = v => v.applyAxisAngle(new THREE.Vector3(0, 1, 0), st.r);
        if (step === 0) {
          L.c.visible = true; L.c.position.copy(pc).add(rot(new THREE.Vector3(0, 0, 0.55)));
          L.b.visible = true; L.b.position.copy(pc).add(rot(new THREE.Vector3(-RD + 0.45, 0, 0.38)));
          L.v.visible = true; L.v.position.set(VX.x + 0.25, 0.2, VX.z + 0.5);
        }
        if (step === 1) { L.c.visible = true; L.c.position.set(VX.x, 0.2, VX.z + 0.55); }
        if (step === 2) { L.zero.visible = true; L.zero.position.set(VX.x + RD - 0.2, 0.25, VX.z + 0.55); }
        if (step === 3) { L.r60.visible = true; const a = 60 * D2R; L.r60.position.set(VX.x + (RD + 0.5) * Math.cos(a), 0.3, VX.z - (RD + 0.5) * Math.sin(a)); }
        if (step === 4 && ki >= 0 && Math.abs(st.th - st.tth) < 3) { const l = L.k[ki]; l.visible = true; const a = st.tth * D2R; l.position.set(VX.x + (ARM + 0.2) * Math.cos(a) + (ki === 0 ? 0.5 : 0), 0.3, VX.z - (ARM + 0.2) * Math.sin(a) - (ki === 0 ? 0 : 0.1)); }
      },
    };
  },
});
