POP3D.register('solar', {
  title: '태양계 행성의 크기와 거리', kicker: '과학 5학년 · 태양계와 별', pageTitle: '행성의 크기와 거리', pageNo: 40,
  pageLines: ['태양과 태양의 영향을 받는 천체들,', '그리고 그 공간을 태양계라고 해요.', '', '태양에서 가까운 순서대로', '수성, 금성, 지구, 화성,', '목성, 토성, 천왕성, 해왕성이에요.'],
  caption: '그림 2. 태양과 태양 둘레를 도는 행성 8개',
  steps: [
    { name: '태양계 식구들', title: '태양계의 중심에는 태양이 있어요', body: '태양 둘레를 행성 8개가 돌아요. 이 그림은 보기 쉽게 크기와 거리를 실제와 다르게 그렸어요.', f: '수성 → 금성 → 지구 → 화성 → 목성 → 토성 → 천왕성 → 해왕성', cam: { pos: [0.1, 4.9, 6.3], target: [0.1, 0.45, 0.25] } },
    { name: '행성의 크기', title: '목성이 가장 크고, 수성이 가장 작아요', body: '지구의 지름을 1로 하고 실제 크기 비율대로 줄을 세웠어요. 목성은 지구의 약 11배예요. 태양은 지구의 약 109배라서 한쪽 끝만 그렸어요.', f: '목성의 지름 ≈ 지구의 지름 × 11', cam: { pos: [0.05, 3.0, 8.3], target: [0.05, 1.45, 0.0] } },
    { name: '태양과의 거리', title: '태양에서 멀수록 행성 사이도 멀어요', body: '태양~지구 거리를 1로 했을 때의 거리예요. 안쪽 행성 4개는 서로 가깝고, 바깥쪽 행성은 멀리 떨어져 있어요. 실제 비율대로는 다 그릴 수 없어서 거리와 크기를 줄여서 그렸어요(실제와 비율이 달라요).', f: '수성 0.4 · 금성 0.7 · 지구 1 · 화성 1.5 · 목성 5.2 · 토성 9.5 · 천왕성 19.2 · 해왕성 30.1', cam: { pos: [0.05, 3.0, 8.3], target: [0.05, 1.45, 0.0] } },
    { name: '태양 둘레 돌기', title: '안쪽 행성일수록 빨리 돌아요', body: '행성은 모두 같은 방향으로 태양 둘레를 돌아요. 지구가 한 바퀴 도는 1년 동안 수성은 4바퀴쯤 돌고, 해왕성은 아주 조금만 움직여요.', cam: { pos: [0.1, 4.9, 6.3], target: [0.1, 0.45, 0.25] } },
    { name: '정리', title: '태양계를 정리해요', body: '스스로 빛을 내는 태양 둘레를 행성 8개가 돌아요. 수성·금성·지구·화성은 작고 암석으로 되어 있고, 목성·토성·천왕성·해왕성은 크고 주로 기체로 되어 있으며 고리가 있어요.', f: '가장 큰 행성: 목성 · 가장 작은 행성: 수성', cam: { pos: [0.1, 4.9, 6.3], target: [0.1, 0.45, 0.25] } },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    // 한글 글꼴(Jua)은 글자 묶음별로 늦게 내려받아지므로, 받아진 뒤 글자표를 다시 그림
    const LB = (text, size, color, bg) => { const s = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); s.material.map.dispose(); s.material.map = n.material.map; s.material.needsUpdate = true; }).catch(() => {}); } catch (e) {} return s; };
    // 실제 값: 지름(지구=1), 태양과의 거리(지구=1), 공전 주기(년)
    const P = [
      { n: '수성', d: 0.38, au: 0.4, T: 0.241, c: 0xb8b2a7, rd: 0.042 },
      { n: '금성', d: 0.95, au: 0.7, T: 0.615, c: 0xf1d79a, rd: 0.058 },
      { n: '지구', d: 1, au: 1, T: 1, c: 0x6fa8e0, rd: 0.06 },
      { n: '화성', d: 0.53, au: 1.5, T: 1.881, c: 0xe0835a, rd: 0.047 },
      { n: '목성', d: 11.2, au: 5.2, T: 11.86, c: 0xe2b98a, rd: 0.2 },
      { n: '토성', d: 9.4, au: 9.5, T: 29.46, c: 0xf0d98c, rd: 0.175 },
      { n: '천왕성', d: 4.0, au: 19.2, T: 84.0, c: 0xa9dfe3, rd: 0.125 },
      { n: '해왕성', d: 3.9, au: 30.1, T: 164.8, c: 0x6c8fe6, rd: 0.122 },
    ];
    const OUT = new THREE.MeshBasicMaterial({ color: 0x24303a, side: THREE.BackSide });
    const SG = new THREE.SphereGeometry(1, 22, 14);
    const ball = (mat, group) => { const m = new THREE.Mesh(SG, mat); const o = new THREE.Mesh(SG, OUT); o.scale.setScalar(1.07); group.add(o); group.add(m); return m; };
    const texEarth = K.tex(K.canvas(128, 64, (c, w, h) => {
      c.fillStyle = '#5f9bdc'; c.fillRect(0, 0, w, h); c.fillStyle = '#86c77f';
      [[20, 22, 12, 9], [30, 42, 7, 10], [64, 20, 14, 8], [70, 40, 8, 9], [104, 28, 10, 8]].forEach(([x, y, a, b]) => { c.beginPath(); c.ellipse(x, y, a, b, 0.4, 0, 7); c.fill(); });
      c.fillStyle = 'rgba(255,255,255,.8)'; [[44, 12, 12, 2.5], [92, 50, 14, 2.5], [10, 52, 9, 2]].forEach(([x, y, a, b]) => { c.beginPath(); c.ellipse(x, y, a, b, 0, 0, 7); c.fill(); });
    }));
    const texJup = K.tex(K.canvas(64, 64, (c, w, h) => {
      const band = ['#efd9b8', '#c99a6c', '#f2e2c6', '#b98558', '#efd9b8', '#d5aa7c', '#f2e2c6', '#c99a6c', '#efd9b8'];
      band.forEach((b, i) => { c.fillStyle = b; c.fillRect(0, i * h / band.length, w, h / band.length + 1); });
      c.fillStyle = '#c4644a'; c.beginPath(); c.ellipse(40, 42, 7, 3.5, 0, 0, 7); c.fill();
    }));
    const pl = P.map((p, i) => {
      const g = new THREE.Group(); const tilt = new THREE.Group(); g.add(tilt);
      const mat = i === 2 ? new THREE.MeshLambertMaterial({ map: texEarth }) : i === 4 ? new THREE.MeshLambertMaterial({ map: texJup }) : new THREE.MeshLambertMaterial({ color: p.c });
      const body = ball(mat, tilt);
      if (i === 5) { // 토성 고리
        const rg = new THREE.RingGeometry(1.24, 2.27, 40, 1); rg.rotateX(-Math.PI / 2);
        tilt.add(K.sketch(new THREE.Mesh(rg, K.paper(0xe3c98f, 0.9)), 10)); tilt.rotation.z = 0.47;
      }
      if (i === 4 || i === 6 || i === 7) { // 희미한 고리
        const rg = new THREE.RingGeometry(1.6, 1.78, 40, 1); rg.rotateX(-Math.PI / 2);
        tilt.add(new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: 0x7c7466, transparent: true, opacity: 0.5, side: THREE.DoubleSide })));
        tilt.rotation.z = i === 6 ? 1.71 : i === 7 ? 0.49 : 0.05;
      }
      root.add(g);
      return { g, body, p, x: 0, y: 0, z: 0, s: p.rd, th0: [5.7, 2.3, 4.3, 3.0, 5.0, 2.55, 0.25, 4.45][i], om: 2 * Math.PI / (p.T * 10) };
    });
    // 1) 공전 궤도 배치 (보기 쉽게 줄인 거리)
    const orbR = P.map(p => 0.5 + 0.493 * (Math.sqrt(p.au) - Math.sqrt(0.4)));
    const OY = 0.34, OZ = 0.0;
    orbR.forEach(r => { const pts = []; for (let k = 0; k <= 72; k++) { const a = k / 72 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, OY, OZ - Math.sin(a) * r)); } const l = K.line(pts, 0x6d6553, 0.5); root.add(l); l.userData.orb = true; });
    const orbLines = root.children.filter(c => c.userData.orb);
    // 2) 크기 줄 (지구 지름 = 0.125, 실제 비율)
    const k = 0.125, LY = 1.4, LZ = -0.6, X0 = -3.0, SW = 6.2;
    const sizeX = []; let cx = -2.88;
    P.forEach((p, i) => { const r = p.d * k / 2; const half = i === 5 ? 2.27 * r * Math.cos(0.47) : r; cx += half; sizeX.push(cx); cx += half + 0.14; });
    // 3) 거리 줄 (제곱근으로 줄인 거리 — 실제 비율 아님)
    const distX = P.map(p => -2.3 + 1.123 * (Math.sqrt(p.au) - Math.sqrt(0.4)));
    // 태양: 작은 태양 + 크기 비교용 큰 태양의 한쪽 끝
    const sunG = new THREE.Group(); root.add(sunG);
    ball(new THREE.MeshBasicMaterial({ color: 0xffcf3a }), sunG);
    const glow = new THREE.Mesh(SG, new THREE.MeshBasicMaterial({ color: 0xffe27a, transparent: true, opacity: 0.35, depthWrite: false })); glow.scale.setScalar(1.35); sunG.add(glow);
    const RS = 109 * k / 2;
    const capG = new THREE.SphereGeometry(RS, 24, 12, Math.PI - 0.26, 0.52, Math.PI / 2 - 0.2, 0.4);
    const capM = new THREE.MeshLambertMaterial({ color: 0xffcf3a, emissive: 0x7a5a00, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const cap = new THREE.Mesh(capG, capM); cap.position.set(-3.08 - RS, LY, LZ); root.add(cap);
    const capEdge = new THREE.LineSegments(new THREE.EdgesGeometry(capG, 30), new THREE.LineBasicMaterial({ color: 0x24303a, transparent: true, opacity: 0 })); cap.add(capEdge);
    // 이름표 띠: 책에서 비스듬히 세운 종이 띠. 작은 안쪽 행성 4개는 이름을 옆으로 펼쳐 적음
    const SH = SW / 8, TILT = 0.95;
    const strip = (xs, vals, fan, cap1, cap2, capX) => {
      const draw = (c, w, h) => {
        const X = x => (x - X0) / SW * w;
        c.fillStyle = '#fffaf0'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8cfa0'; c.fillRect(0, 0, w, 8);
        c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 3; c.strokeStyle = '#8b7a5c';
        xs.forEach((x, i) => {
          const inner = i < 4, lx = inner ? fan[i] : x, y = inner ? 168 : 52;
          c.beginPath(); c.moveTo(X(x), 8); if (inner) { c.lineTo(X(x), 30); c.lineTo(X(lx), 128); } else c.lineTo(X(x), 22); c.stroke();
          c.fillStyle = '#1f2a33'; c.font = '46px Jua'; c.fillText(P[i].n, X(lx), y);
          c.fillStyle = '#c0392b'; c.font = '46px Jua'; c.fillText(vals[i], X(lx), y + 52);
        });
        c.fillStyle = '#5d6b72'; c.font = '38px Jua'; c.fillText(cap1, X(capX), cap2 ? 150 : 175); if (cap2) c.fillText(cap2, X(capX), 200);
      };
      const cv = K.canvas(2048, 256, draw), tx = K.tex(cv);
      try { document.fonts.load('46px Jua', P.map(p => p.n).join('') + cap1 + (cap2 || '')).then(() => { const c = cv.getContext('2d'); c.clearRect(0, 0, 2048, 256); draw(c, 2048, 256); tx.needsUpdate = true; }).catch(() => {}); } catch (e) {}
      const g = new THREE.PlaneGeometry(SW, SH); g.translate(0, -SH / 2, 0);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: tx, transparent: true, opacity: 0, side: THREE.DoubleSide }));
      m.rotation.x = -TILT; m.position.set(X0 + SW / 2, SH * Math.sin(TILT) + 0.03, LZ + 0.45); root.add(m); return m;
    };
    const sStrip = strip(sizeX, ['0.38', '0.95', '1', '0.53', '11.2', '9.4', '4.0', '3.9'], [-2.85, -2.3, -1.75, -1.2], '지구의 지름을 1로 했을 때', '', 1.05);
    const dStrip = strip(distX, ['0.4', '0.7', '1', '1.5', '5.2', '9.5', '19.2', '30.1'], [-2.62, -2.07, -1.52, -0.97], '태양~지구 거리를 1로 했을 때', '(실제 거리 비율과 달라요)', 0.95);
    // 글자표
    const lab = {}; const L = (key, t, pi) => { const s = LB(t, 0.6); root.add(s); lab[key] = { s, pi }; };
    L('sun', '태양'); L('cap', '태양의 일부'); [0, 2, 4, 5, 7].forEach(i => L(i, P[i].n, i));
    L('e1', '지구 1', 2); L('j11', '목성 11.2', 4); L('n30', '해왕성 30.1', 7);
    const show = { 0: ['sun', 0, 2, 4, 5, 7], 1: ['cap', 'e1', 'j11'], 2: ['sun', 'e1', 'n30'], 3: ['sun', 0, 2, 7], 4: ['sun', 0, 2, 4, 5, 7] };
    root.position.set(0.1, K.PAGE_Y + 0.3, 0.15);
    const w = { o: 1, s: 0, d: 0 }, tw = { o: 1, s: 0, d: 0 }; let tau = 0, moving = false, step = 0;
    const apply = () => {
      const sum = w.o + w.s + w.d;
      pl.forEach((q, i) => {
        const th = q.th0 + q.om * tau, r = orbR[i];
        const ox = Math.cos(th) * r, oz = OZ - Math.sin(th) * r;
        q.g.position.set((w.o * ox + w.s * sizeX[i] + w.d * distX[i]) / sum, (w.o * OY + (w.s + w.d) * LY) / sum, (w.o * oz + (w.s + w.d) * LZ) / sum);
        q.g.scale.setScalar((w.o * q.p.rd + w.s * q.p.d * k / 2 + w.d * q.p.rd) / sum);
      });
      Object.values(lab).forEach(o => { if (o.pi == null) return; const g = pl[o.pi].g; o.s.position.set(g.position.x, g.position.y + g.scale.x * (o.pi === 5 ? 1.3 : 1) + 0.24, g.position.z); });
      sunG.position.set(w.d * -2.75 / sum + w.s * -3.4 / sum, (w.o * OY + (w.s + w.d) * LY) / sum, (w.o * OZ + (w.s + w.d) * LZ) / sum);
      sunG.scale.setScalar(0.001 + (w.o + w.d) / sum * 0.27);
      capM.opacity = w.s; cap.visible = w.s > 0.02; capEdge.material.opacity = w.s * 0.8;
      orbLines.forEach(l => { l.material.opacity = 0.5 * w.o; l.visible = w.o > 0.02; });
      sStrip.material.opacity = w.s; sStrip.visible = w.s > 0.02; dStrip.material.opacity = w.d; dStrip.visible = w.d > 0.02;
      lab.sun.s.position.set(sunG.position.x, sunG.position.y + (w.o * 0.95 + (w.s + w.d) * 0.55) / sum, sunG.position.z);
      lab.cap.s.position.set(-2.75, LY + 1.5, LZ);
    };
    return {
      root, cam: { pos: [0.1, 4.9, 6.3], target: [0.1, 0.45, 0.25] },
      set(s) {
        step = s; tw.o = (s === 0 || s >= 3) ? 1 : 0; tw.s = s === 1 ? 1 : 0; tw.d = s === 2 ? 1 : 0; moving = s >= 3;
        Object.keys(lab).forEach(key => { lab[key].s.visible = show[s].some(v => String(v) === key); });
        if (K.RM) { Object.assign(w, tw); apply(); }
      },
      update(dt) {
        ['o', 's', 'd'].forEach(c => { w[c] = K.damp(w[c], tw[c], dt, 2.4); });
        if (moving && !K.RM) tau += dt;
        pl.forEach(q => { q.body.rotation.y += dt * 0.6; });
        apply();
      },
    };
  },
});
