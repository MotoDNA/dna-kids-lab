POP3D.register('net', {
  title: '직육면체를 접고 펼치기', kicker: '수학 5학년 · 직육면체', pageTitle: '직육면체의 전개도', pageNo: 14,
  pageLines: ['직육면체를 모서리를 따라 잘라서', '평면 위에 펼쳐 놓은 그림을', '직육면체의 전개도라고 해요.', '', '접었을 때 서로 겹치는 면이 없고,', '맞닿는 모서리의 길이가 같아요.'],
  caption: '그림 3. 직육면체를 접고 펼치기',
  steps: [
    { name: '펼친 모양, 전개도', title: '직육면체를 펼치면 전개도가 돼요', body: '면 여섯 개가 이어진 이 그림이 직육면체의 전개도예요. 같은 색끼리는 접었을 때 서로 마주 보는 면이에요.' },
    { name: '옆면 세우기', title: '네 옆면을 세워요', body: '밑면을 바닥에 두고 둘레의 네 면을 위로 접어 올려요. 모서리끼리 꼭 맞게 만나요.' },
    { name: '윗면 덮기', title: '윗면을 덮으면 직육면체 완성', body: '마지막으로 윗면을 덮으면 면 6개, 모서리 12개, 꼭짓점 8개인 직육면체가 돼요.' },
    { name: '마주 보는 면', title: '마주 보는 면은 모양과 크기가 같아요', body: '노란 면끼리, 파란 면끼리, 분홍 면끼리 서로 마주 보고, 모양과 크기가 같아요. 직육면체를 돌려 보며 확인해 봐요.' },
  ],
  build(K) {
    const { THREE } = K;
    const A = 2.6, B = 1.7, C = 1.15;
    const YEL = 0xf6d35b, BLU = 0x8fbfe8, PNK = 0xf3a9c0;
    const root = new THREE.Group();
    const face = (w, l, color) => { const g = new THREE.PlaneGeometry(w, l); g.rotateX(-Math.PI / 2); g.translate(0, 0, l / 2); return K.sketch(new THREE.Mesh(g, K.paper(color))); };
    const bg = new THREE.PlaneGeometry(A, B); bg.rotateX(-Math.PI / 2);
    const bottom = K.sketch(new THREE.Mesh(bg, K.paper(YEL))); root.add(bottom);
    const hinge = (pos, rotY, w, l, color) => { const p = new THREE.Group(); p.position.copy(pos); p.rotation.y = rotY; const f = face(w, l, color); p.add(f); root.add(p); return f; };
    const front = hinge(new THREE.Vector3(0, 0, B / 2), 0, A, C, BLU);
    const backS = hinge(new THREE.Vector3(0, 0, -B / 2), Math.PI, A, C, BLU);
    const right = hinge(new THREE.Vector3(A / 2, 0, 0), Math.PI / 2, B, C, PNK);
    const left = hinge(new THREE.Vector3(-A / 2, 0, 0), -Math.PI / 2, B, C, PNK);
    const topPivot = new THREE.Group(); topPivot.position.set(0, 0, C); backS.add(topPivot);
    const top = face(A, B, YEL); topPivot.add(top);
    const lab = K.label('밑면', 0.8); lab.position.set(0, 0.35, 0); root.add(lab);
    root.position.set(0.1, K.PAGE_Y + 0.62, 0.15);
    const st = { fold: 0, lid: 0, tf: 0, tl: 0, pulse: false };
    return {
      root, cam: { pos: [1.6, 6.4, 10.6], target: [0.1, 0.9, 0.3] },
      set(step) { st.tf = step >= 1 ? 1 : 0; st.tl = step >= 2 ? 1 : 0; st.pulse = step === 3; lab.visible = step === 0; if (K.RM) { st.fold = st.tf; st.lid = st.tl; } },
      update(dt, t) {
        st.fold = K.damp(st.fold, st.tf, dt, 2.6); st.lid = K.damp(st.lid, st.tl, dt, 2.6);
        const a = K.ease(Math.min(1, Math.max(0, st.fold))) * Math.PI / 2;
        [front, backS, right, left].forEach(f => { f.rotation.x = -a; });
        topPivot.rotation.x = -K.ease(Math.min(1, Math.max(0, st.lid))) * Math.PI / 2;
        const g = st.pulse ? 0.5 + 0.5 * Math.sin(t * 3.2) : 0;
        [bottom, top].forEach(m => m.material.emissive.setRGB(g * 0.25, g * 0.2, 0));
        [front, backS].forEach(m => m.material.emissive.setRGB(0, g * 0.1, g * 0.22));
        [right, left].forEach(m => m.material.emissive.setRGB(g * 0.22, 0, g * 0.1));
      },
    };
  },
});
