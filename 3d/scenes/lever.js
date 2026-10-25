POP3D.register('lever', {
  title: '수평 잡기의 원리', kicker: '과학 3학년 · 물체의 무게', pageTitle: '지레와 수평 잡기', pageNo: 22,
  pageLines: ['막대의 한 점을 받쳐 수평을 잡을 때,', '받치는 점을 받침점이라고 해요.', '', '받침점에서 멀리 있을수록', '같은 무게라도 더 크게 기울게 해요.'],
  caption: '그림 5. 무게 × 거리로 수평 잡기',
  steps: [
    { name: '수평 잡기', title: '같은 무게를 같은 거리에 놓으면 수평', body: '받침점에서 양쪽으로 2칸 떨어진 곳에 1kg 추를 하나씩 놓았어요. 양쪽이 같아서 막대가 수평이 돼요.', f: '1kg × 2칸 = 1kg × 2칸' },
    { name: '한쪽이 무거우면', title: '한쪽이 무거우면 그쪽으로 기울어요', body: '왼쪽 추를 2kg으로 바꾸었어요. 왼쪽이 더 무거워서 막대가 왼쪽으로 기울어요.', f: '2kg × 2칸 > 1kg × 2칸' },
    { name: '가벼운 추를 멀리', title: '가벼운 추를 멀리 놓으면 다시 수평', body: '오른쪽 1kg 추를 4칸으로 옮겼어요. 무게와 거리를 곱한 값이 양쪽에서 같아지면 수평이 돼요.', f: '2kg × 2칸 = 1kg × 4칸' },
    { name: '무거운 추를 가까이', title: '무거운 추를 받침점 가까이', body: '2kg 추를 1칸에, 1kg 추를 2칸에 놓아도 곱한 값이 2로 같아서 수평이에요. 무거운 물건은 받침점 가까이 두면 쉽게 들 수 있어요.', f: '2kg × 1칸 = 1kg × 2칸' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const H = 1.05, L = 9.4;
    const tri = new THREE.Shape(); tri.moveTo(-0.55, 0); tri.lineTo(0.55, 0); tri.lineTo(0, H); tri.lineTo(-0.55, 0);
    const wg = new THREE.ExtrudeGeometry(tri, { depth: 0.9, bevelEnabled: false }); wg.translate(0, 0, -0.45);
    root.add(K.sketch(new THREE.Mesh(wg, K.paper(0xc9a06b, 1))));
    const fl = K.label('받침점', 0.95); fl.position.set(0, 0.35, 0.75); root.add(fl);
    const pivot = new THREE.Group(); pivot.position.y = H; root.add(pivot);
    const topCv = K.canvas(2048, 140, (c, w, h) => {
      c.fillStyle = '#f7e6c4'; c.fillRect(0, 0, w, h); c.strokeStyle = '#7a5a2e'; c.fillStyle = '#5b4321'; c.font = '40px Jua'; c.textAlign = 'center'; c.textBaseline = 'middle';
      for (let i = -4; i <= 4; i++) { const x = w / 2 + (i / (L / 2)) * (w / 2); c.lineWidth = i === 0 ? 6 : 3; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, i === 0 ? h : h * 0.45); c.stroke(); if (i !== 0) c.fillText(String(Math.abs(i)), x, h * 0.72); }
    });
    const side = K.paper(0xe8cfa0, 1);
    const pg = new THREE.BoxGeometry(L, 0.14, 0.62);
    const plank = new THREE.Mesh(pg, [side, side, new THREE.MeshLambertMaterial({ map: K.tex(topCv) }), side, side, side]); plank.position.y = 0.07; pivot.add(plank);
    plank.add(new THREE.LineSegments(new THREE.EdgesGeometry(pg), K.INK));
    const weight = kg => {
      const s = kg === 2 ? 0.62 : 0.48; const g = new THREE.BoxGeometry(s, s, s); g.translate(0, s / 2, 0);
      const m = K.sketch(new THREE.Mesh(g, K.paper(kg === 2 ? 0x8fbfe8 : 0xf3a9c0, 1)));
      const l = K.label(kg + 'kg', 0.72); l.position.set(0, s + 0.32, 0); m.add(l); m.userData = { x: 0, tx: 0 }; m.position.y = 0.14; pivot.add(m); return m;
    };
    const w1 = weight(1), w2 = weight(2), wr = weight(1);
    root.position.set(0.1, K.PAGE_Y + 0.55, 0.2);
    const cfg = [{ L: 1, lx: -2, rx: 2 }, { L: 2, lx: -2, rx: 2 }, { L: 2, lx: -2, rx: 4 }, { L: 2, lx: -1, rx: 2 }];
    let cur = cfg[0]; const st = { ang: 0, vel: 0 };
    return {
      root, cam: { pos: [0.4, 4.8, 13.2], target: [0.1, 1.3, 0.3] },
      set(step) { cur = cfg[step]; w1.visible = cur.L === 1; w2.visible = cur.L === 2; w1.userData.tx = w2.userData.tx = cur.lx; wr.userData.tx = cur.rx; if (K.RM) [w1, w2, wr].forEach(w => { w.userData.x = w.userData.tx; }); },
      update(dt) {
        [w1, w2, wr].forEach(w => { w.userData.x = K.damp(w.userData.x, w.userData.tx, dt, 3); w.position.x = w.userData.x; });
        const torque = cur.L * cur.lx + cur.rx;
        const moving = [w1, w2, wr].some(w => Math.abs(w.userData.x - w.userData.tx) > 0.05);
        const target = moving ? st.ang : Math.max(-0.2, Math.min(0.2, -torque * 0.09));
        if (K.RM) st.ang = target; else { st.vel += (target - st.ang) * dt * 18; st.vel *= Math.pow(0.04, dt); st.ang += st.vel * dt; }
        pivot.rotation.z = st.ang;
      },
    };
  },
});
