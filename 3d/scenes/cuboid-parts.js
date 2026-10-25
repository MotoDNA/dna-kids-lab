POP3D.register('cuboid-parts', {
  title: '직육면체의 면, 모서리, 꼭짓점', kicker: '수학 5학년 · 직육면체', pageTitle: '면, 모서리, 꼭짓점', pageNo: 12,
  pageLines: ['선분으로 둘러싸인 부분은 면,', '면과 면이 만나는 선분은 모서리,', '모서리와 모서리가 만나는 점은', '꼭짓점이라고 해요.', '', '직육면체: 면 6, 모서리 12, 꼭짓점 8'],
  caption: '그림 2. 하나씩 세어 보는 직육면체',
  steps: [
    { name: '직육면체 보기', title: '직사각형 6개로 둘러싸인 직육면체', body: '상자 모양의 직육면체예요. 면, 모서리, 꼭짓점을 하나씩 세어 볼게요. 끌어서 돌려 보며 봐도 좋아요.' },
    { name: '면 6개', title: '면을 하나씩 세어요', body: '선분으로 둘러싸인 부분이 면이에요. 앞, 옆, 위, 뒤, 반대쪽 옆, 아래까지 세면 면은 6개예요. 마주 보는 두 면은 색이 같고 서로 평행해요.', f: '면 6개' },
    { name: '모서리 12개', title: '모서리를 하나씩 세어요', body: '면과 면이 만나는 선분이 모서리예요. 위에 4개, 옆에 세로로 4개, 아래에 4개라서 모서리는 12개예요.', f: '모서리 4 + 4 + 4 = 12개' },
    { name: '꼭짓점 8개', title: '꼭짓점을 하나씩 세어요', body: '모서리와 모서리가 만나는 점이 꼭짓점이에요. 위에 4개, 아래에 4개라서 꼭짓점은 8개예요.', f: '꼭짓점 4 + 4 = 8개' },
    { name: '정육면체와 비교', title: '정육면체는 면이 모두 정사각형', body: '가로, 세로, 높이가 모두 같아지면 정육면체가 돼요. 면이 모두 정사각형이고, 면 6개, 모서리 12개, 꼭짓점 8개는 직육면체와 같아요.', f: '정육면체: 면 6 · 모서리 12 · 꼭짓점 8' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const box = new THREE.Group(); root.add(box);
    const CUB = [3.6, 1.9, 2.4], CUBE = [2.4, 2.4, 2.4];
    const dim = CUB.slice(), tdim = CUB.slice();
    const YEL = 0xf6d35b, BLU = 0x8fbfe8, PNK = 0xf3a9c0;
    const WHITE = new THREE.Color(0xfffdf6);
    // 면 6개 (세는 순서: 앞, 오른쪽, 위, 뒤, 왼쪽, 아래)
    const FD = [
      { n: [0, 0, 1], rot: [0, 0, 0], wh: [0, 1], c: BLU },
      { n: [1, 0, 0], rot: [0, Math.PI / 2, 0], wh: [2, 1], c: PNK },
      { n: [0, 1, 0], rot: [-Math.PI / 2, 0, 0], wh: [0, 2], c: YEL },
      { n: [0, 0, -1], rot: [0, Math.PI, 0], wh: [0, 1], c: BLU },
      { n: [-1, 0, 0], rot: [0, -Math.PI / 2, 0], wh: [2, 1], c: PNK },
      { n: [0, -1, 0], rot: [Math.PI / 2, 0, 0], wh: [0, 2], c: YEL },
    ];
    const faces = FD.map(d => {
      const g = new THREE.Group(); g.rotation.set(d.rot[0], d.rot[1], d.rot[2]);
      const m = K.sketch(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), K.paper(d.c, 0.9)));
      m.material.depthWrite = false; g.add(m); box.add(g);
      return { d, g, m, col: new THREE.Color(d.c), pop: 0, op: 0.9 };
    });
    // 모서리 12개 (위 4, 세로 4, 아래 4)
    const E = [];
    E.push({ ax: 0, s: [0, 1, 1] }, { ax: 2, s: [1, 1, 0] }, { ax: 0, s: [0, 1, -1] }, { ax: 2, s: [-1, 1, 0] });
    E.push({ ax: 1, s: [-1, 0, 1] }, { ax: 1, s: [1, 0, 1] }, { ax: 1, s: [1, 0, -1] }, { ax: 1, s: [-1, 0, -1] });
    E.push({ ax: 0, s: [0, -1, 1] }, { ax: 2, s: [1, -1, 0] }, { ax: 0, s: [0, -1, -1] }, { ax: 2, s: [-1, -1, 0] });
    const glowM = new THREE.MeshBasicMaterial({ color: 0xff9f1c });
    const cg = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
    const edges = E.map(e => {
      const m = new THREE.Mesh(cg, glowM);
      if (e.ax === 0) m.rotation.z = Math.PI / 2; else if (e.ax === 2) m.rotation.x = Math.PI / 2;
      m.visible = false; box.add(m); return { e, m, k: 0 };
    });
    // 꼭짓점 8개 (위 4, 아래 4)
    const VS = [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]];
    const sg = new THREE.SphereGeometry(0.13, 16, 12), dotM = new THREE.MeshBasicMaterial({ color: 0xd8342b });
    const dots = VS.map(v => { const m = new THREE.Mesh(sg, dotM); m.scale.setScalar(0.001); box.add(m); return { v, m, k: 0 }; });
    // 글자표: 세는 수
    // 한글 글자 조각을 다 불러온 뒤 글자표를 다시 그려요
    const lab = (text, size, color, bg) => { const sp = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); sp.material.map.dispose(); sp.material.map = n.material.map; sp.material.needsUpdate = true; }); } catch (e) {} return sp; };
    const mk = t => { const l = lab(t, 0.85); l.visible = false; root.add(l); return l; };
    const L = { name: mk('직육면체'), cube: mk('정육면체'), sq: mk('정사각형'), face: [], edge: [], vert: [] };
    for (let i = 1; i <= 6; i++) L.face.push(mk('면 ' + i + '개'));
    for (let i = 1; i <= 12; i++) L.edge.push(mk('모서리 ' + i + '개'));
    for (let i = 1; i <= 8; i++) L.vert.push(mk('꼭짓점 ' + i + '개'));
    L.sq.scale.multiplyScalar(0.85);
    box.position.y = 1.25;
    root.position.set(0.1, K.PAGE_Y + 0.45, 0.2);
    let step = 0, t0 = null;
    const all = () => [L.name, L.cube, L.sq, ...L.face, ...L.edge, ...L.vert];
    const count = (t, n, gap) => (K.RM ? n : Math.max(0, Math.min(n, Math.floor((t - t0 - 0.4) / gap) + 1)));
    return {
      root, cam: { pos: [2.7, 5.4, 8.2], target: [0.1, 1.85, 0.2] },
      set(s) {
        step = s; t0 = null;
        const c = s === 4 ? CUBE : CUB; tdim[0] = c[0]; tdim[1] = c[1]; tdim[2] = c[2];
        if (K.RM) { dim[0] = tdim[0]; dim[1] = tdim[1]; dim[2] = tdim[2]; }
      },
      update(dt, t) {
        if (t0 === null) t0 = t;
        for (let i = 0; i < 3; i++) dim[i] = K.damp(dim[i], tdim[i], dt, 2.4);
        const h = [dim[0] / 2, dim[1] / 2, dim[2] / 2];
        box.position.y = h[1] + 0.6;
        const nf = step === 1 ? count(t, 6, 0.55) : 0;
        const ne = step === 2 ? count(t, 12, 0.3) : 0;
        const nv = step === 3 ? count(t, 8, 0.4) : 0;
        // 면
        faces.forEach((f, i) => {
          const d = f.d;
          let colored = true, op = 0.9, pop = 0;
          if (step === 1) { colored = i < nf; op = colored ? 0.85 : 0.35; pop = (i === nf - 1 && (t - t0 - 0.4) - (nf - 1) * 0.55 < 0.45) ? 0.5 : 0; }
          if (step === 2 || step === 3) { colored = false; op = 0.3; }
          if (step === 4) { colored = true; op = 0.88; }
          f.pop = K.RM ? pop : K.damp(f.pop, pop, dt, 6); f.op = K.RM ? op : K.damp(f.op, op, dt, 4);
          const target = colored ? (step === 4 ? new THREE.Color(YEL) : f.col) : WHITE;
          f.m.material.color.lerp(target, K.RM ? 1 : Math.min(1, dt * 6));
          f.m.material.opacity = f.op;
          const gl = (step === 1 && i === nf - 1) ? 0.5 + 0.5 * Math.sin(t * 6) : 0;
          f.m.material.emissive.setRGB(gl * 0.25, gl * 0.18, 0);
          f.g.position.set(d.n[0] * (h[0] + f.pop), d.n[1] * (h[1] + f.pop), d.n[2] * (h[2] + f.pop));
          f.m.scale.set(dim[d.wh[0]], dim[d.wh[1]], 1);
        });
        // 모서리
        edges.forEach((o, i) => {
          const on = i < ne; o.k = K.RM ? (on ? 1 : 0) : K.damp(o.k, on ? 1 : 0, dt, 7);
          o.m.visible = o.k > 0.02;
          const e = o.e; o.m.position.set(e.s[0] * h[0], e.s[1] * h[1], e.s[2] * h[2]);
          o.m.scale.set(1, Math.max(0.001, dim[e.ax] * o.k), 1);
        });
        // 꼭짓점
        dots.forEach((o, i) => {
          const on = i < nv; o.k = K.RM ? (on ? 1 : 0) : K.damp(o.k, on ? 1 : 0, dt, 8);
          o.m.scale.setScalar(Math.max(0.001, o.k * (1 + (i === nv - 1 ? 0.25 * Math.max(0, Math.sin(t * 7)) : 0))));
          o.m.position.set(o.v[0] * h[0], o.v[1] * h[1], o.v[2] * h[2]);
        });
        // 글자표
        all().forEach(l => { l.visible = false; });
        const topY = box.position.y + h[1] + 0.55;
        if (step === 0) { L.name.visible = true; L.name.position.set(0, topY, 0); }
        if (step === 1 && nf > 0) { const l = L.face[nf - 1]; l.visible = true; l.position.set(0, topY + 0.3, 0); }
        if (step === 2 && ne > 0) { const l = L.edge[ne - 1]; l.visible = true; l.position.set(0, topY + 0.3, 0); }
        if (step === 3 && nv > 0) { const l = L.vert[nv - 1]; l.visible = true; l.position.set(0, topY + 0.3, 0); }
        if (step === 4) { L.cube.visible = true; L.cube.position.set(0, topY + 0.2, 0); L.sq.visible = true; L.sq.position.set(0, box.position.y, h[2] + 0.05); }
      },
    };
  },
});
