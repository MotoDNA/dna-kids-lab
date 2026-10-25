POP3D.register('magnets', {
  title: '자석의 극, 밀고 당기기', kicker: '과학 4학년 · 자석의 성질', pageTitle: '밀고 당기는 자석', pageNo: 10,
  pageLines: ['클립이 가장 많이 붙는 곳이', '자석의 극이에요. N극과 S극이 있어요.', '', '같은 극끼리는 서로 밀어내고,', '다른 극끼리는 서로 끌어당겨요.'],
  caption: '그림 2. 두 막대자석과 나침반',
  steps: [
    { name: '자석의 극', title: '클립은 양쪽 끝에 많이 붙어요', body: '막대자석을 클립 더미에 대었다가 들어 올렸어요. 클립이 양쪽 끝에 가장 많이 붙고 가운데에는 거의 붙지 않아요. 이 양쪽 끝이 자석의 극이에요.',
      cam: { pos: [0.3, 3.1, 6.8], target: [0.1, 1.35, 0.2] } },
    { name: '다른 극은 당겨요', title: 'N극과 S극은 서로 끌어당겨요', body: '한 자석의 N극과 다른 자석의 S극을 마주 보게 놓았어요. 다른 극끼리는 서로 끌어당겨서 착 붙어요.',
      cam: { pos: [0.3, 5.4, 5.8], target: [0.1, 0.3, 0.2] } },
    { name: '같은 극은 밀어요', title: '같은 극끼리는 서로 밀어내요', body: '위 줄은 N극과 N극, 아래 줄은 S극과 S극이 마주 보아요. 가까이 놓았다가 손을 떼면 같은 극끼리 서로 밀어내서 멀어져요.',
      cam: { pos: [0.3, 5.4, 5.8], target: [0.1, 0.3, 0.2] } },
    { name: '나침반', title: '나침반 바늘도 자석이에요', body: '자석을 멀리 치우고 나침반을 놓았어요. 바늘이 흔들리다가 빨간 N극은 북쪽, 파란 S극은 남쪽을 가리키며 멈춰요.',
      cam: { pos: [0.3, 5.8, 4.6], target: [0.1, 0.2, 0.1] } },
    { name: '정리', title: '자석의 성질 정리', body: '자석에는 N극과 S극이 있어요. 다른 극끼리는 끌어당기고, 같은 극끼리는 밀어내요.', f: 'N–S 당겨요 · N–N, S–S 밀어내요',
      cam: { pos: [0.3, 6.4, 6.6], target: [0.1, 0.2, 0.3] } },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const ML = 2.0, MH = 0.36, MD = 0.55, MY = MH / 2; // 막대자석 길이·높이·폭
    const RED = 0xe0604f, BLUE = 0x4f86d6;

    const letter = (ch, bg) => K.tex(K.canvas(256, 140, (c, w, h) => { c.fillStyle = bg; c.fillRect(0, 0, w, h); c.fillStyle = '#ffffff'; c.font = '110px Jua'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch, w / 2, h / 2 + 6); }));
    const texN = letter('N', '#e0604f'), texS = letter('S', '#4f86d6');
    const half = (tex, col) => { const p = K.paper(col, 1), t = new THREE.MeshLambertMaterial({ map: tex }); return [p, p, t, p, t, t]; }; // +x,-x,+y,-y,+z,-z
    const matN = half(texN, RED), matS = half(texS, BLUE);
    const hg = new THREE.BoxGeometry(ML / 2, MH, MD);
    const magnet = () => { // 로컬 +x 쪽이 N극
      const g = new THREE.Group();
      const n = K.sketch(new THREE.Mesh(hg, matN)); n.position.x = ML / 4; g.add(n);
      const s = K.sketch(new THREE.Mesh(hg, matS)); s.position.x = -ML / 4; g.add(s);
      g.userData = { x: 0, z: 0, y: MY, r: 0, sc: 0 }; g.scale.setScalar(0.001); root.add(g); return g;
    };
    const M = [magnet(), magnet(), magnet(), magnet(), magnet(), magnet()]; // A,B 당기기 / C,D N–N / E,F S–S

    // 클립
    const cg = new THREE.TorusGeometry(0.085, 0.017, 4, 14); cg.scale(1.7, 1, 1);
    const clipM = K.paper(0x98a2ad, 1);
    const clips = [];
    const endSet = [[0.92, -0.33, 0.12, 1.5], [0.92, -0.62, 0.12, 1.45], [1.0, -0.31, -0.12, 1.65], [0.8, -0.33, -0.02, 1.4], [1.14, -0.12, 0.05, 0.25], [1.06, -0.6, -0.12, 1.7], [0.74, -0.56, -0.02, 1.35]];
    const attach = [];
    endSet.forEach(e => { attach.push(e); attach.push([-e[0], e[1], e[2], Math.PI - e[3]]); });
    const pile = [[-1.6, 0.9], [-1.1, 1.3], [-0.6, 0.8], [0.0, 1.25], [0.5, 0.75], [1.0, 1.2], [1.6, 0.85], [-1.9, 1.4], [1.9, 1.35], [-0.3, 1.5], [0.3, 1.55], [-1.3, 0.55], [1.3, 0.5], [0.8, 1.6]];
    const LIFT = 1.5; // 들어 올린 자석 높이
    for (let i = 0; i < attach.length; i++) { const m = new THREE.Mesh(cg, clipM); root.add(m); clips.push(m); }
    const stay = [[-0.15, 0.2, 0.3], [0.25, -0.1, 1.1]].map(p => { const m = new THREE.Mesh(cg, clipM); m.position.set(p[0], 0.03, p[1]); m.rotation.set(-Math.PI / 2, 0, p[2]); root.add(m); return m; });

    // 나침반
    const comp = new THREE.Group(); comp.position.set(0, 0, 0.1); comp.scale.setScalar(0.001); root.add(comp);
    const cb = new THREE.CylinderGeometry(1.15, 1.2, 0.18, 32); cb.translate(0, 0.09, 0);
    const dial = K.canvas(512, 512, (c, w, h) => {
      c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h); c.strokeStyle = '#24303a'; c.lineWidth = 4; c.beginPath(); c.arc(w / 2, h / 2, w / 2 - 30, 0, Math.PI * 2); c.stroke();
      for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; const r1 = w / 2 - 30, r2 = r1 - (i % 9 === 0 ? 24 : 12); c.beginPath(); c.moveTo(w / 2 + Math.sin(a) * r1, h / 2 - Math.cos(a) * r1); c.lineTo(w / 2 + Math.sin(a) * r2, h / 2 - Math.cos(a) * r2); c.stroke(); }
      c.font = '56px Jua'; c.textAlign = 'center'; c.textBaseline = 'middle';
      [['북', 0, -1, '#c0392b'], ['동', 1, 0, '#24303a'], ['남', 0, 1, '#2a56c6'], ['서', -1, 0, '#24303a']].forEach(([t, x, y, col]) => { c.fillStyle = col; c.fillText(t, w / 2 + x * 170, h / 2 + y * 170); });
    });
    const topMat = new THREE.MeshLambertMaterial({ map: K.tex(dial) });
    const caseM = K.paper(0xc7b3ea, 1);
    comp.add(K.sketch(new THREE.Mesh(cb, caseM)));
    const face = new THREE.CircleGeometry(1.1, 32); face.rotateX(-Math.PI / 2); face.translate(0, 0.185, 0); comp.add(new THREE.Mesh(face, topMat)); // 원판 UV: 그림 위쪽 = -z(북쪽)
    const needle = new THREE.Group(); needle.position.y = 0.26; comp.add(needle);
    const tri = (col, dir) => { const s = new THREE.Shape(); s.moveTo(-0.11, 0); s.lineTo(0, dir * 0.6); s.lineTo(0.11, 0); s.lineTo(-0.11, 0); const g = new THREE.ShapeGeometry(s); g.rotateX(-Math.PI / 2); const m = K.sketch(new THREE.Mesh(g, K.paper(col, 1))); needle.add(m); return m; };
    tri(RED, 1); tri(BLUE, -1); // ShapeGeometry y → -z 이므로 빨간 쪽(N)이 -z(북쪽)
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12), K.paper(0x5d6b72, 1)); cap.position.y = 0.03; needle.add(cap);

    // 힘의 방향 화살표
    const AY = 0.62;
    const arr = (x1, x2, z) => { const a = K.arrow(V(x1, AY, z), V(x2, AY, z), 0xd04a3a); root.add(a); a.visible = false; return a; };
    // 글자표
    const L = (t, x, y, z, s) => { const l = K.label(t, s || 0.6); l.position.set(x, y, z); root.add(l); l.visible = false; return l; };
    const lN = L('N극', 1.0, LIFT + 0.55, 0), lS = L('S극', -1.0, LIFT + 0.55, 0), lMid = L('가운데', 0, LIFT + 0.55, 0, 0.5);
    const lPull = L('끌어당겨요', 0, 1.0, 0), lPush1 = L('밀어내요', 0, 0.45, -0.85), lPush2 = L('밀어내요', 0, 0.45, 0.85);
    const lNorth = L('북쪽', 0, 0.5, -1.6), lSouth = L('남쪽', 0, 0.5, 1.75);
    const sPull = L('당겨요', 0, 0.85, -1.55, 0.55), sPushA = L('밀어내요', 0, 0.4, 0, 0.55), sPushB = L('밀어내요', 0, 0.4, 1.55, 0.55);

    // 단계별 배치: [x, z, 회전(0이면 N극이 오른쪽), 시작 x(움직임용)]
    const PI = Math.PI;
    const PLAN = [
      { mag: [[0, 0, 0]], lift: true },
      { mag: [[-1.0, 0, 0, -1.9], [1.0, 0, 0, 1.9]], motion: 'pull' },
      { mag: [null, null, [-1.9, -0.85, 0, -1.08], [1.9, -0.85, PI, 1.08], [-1.9, 0.85, PI, -1.08], [1.9, 0.85, 0, 1.08]], motion: 'push' },
      { mag: [], compass: true },
      { mag: [[-1.0, -1.55, 0], [1.0, -1.55, 0], [-1.9, 0, 0], [1.9, 0, PI], [-1.9, 1.55, PI], [1.9, 1.55, 0]] },
    ];
    const arrows = {
      pull: [arr(-1.6, -0.9, 0), arr(1.6, 0.9, 0)],
      push: [arr(-1.2, -1.9, -0.85), arr(1.2, 1.9, -0.85), arr(-1.2, -1.9, 0.85), arr(1.2, 1.9, 0.85)],
    };
    root.position.set(0.1, K.PAGE_Y + 0.28, 0.2);
    let step = 0, t0 = -1, plan = PLAN[0];
    const st = { comp: 0, needle: 2.3 };
    return {
      root, cam: { pos: [0.3, 3.1, 6.8], target: [0.1, 1.35, 0.2] },
      set(s) { step = s; plan = PLAN[s]; t0 = -1; },
      update(dt, t) {
        if (t0 < 0) t0 = t; const tau = t - t0;
        const RM = K.RM;
        M.forEach((m, i) => {
          const p = plan.mag[i]; const u = m.userData;
          u.sc = RM ? (p ? 1 : 0) : K.damp(u.sc, p ? 1 : 0, dt, 6);
          m.visible = u.sc > 0.01; m.scale.setScalar(Math.max(0.001, u.sc));
          if (!p) return;
          let tx = p[0];
          if (plan.motion && p[3] !== undefined && !RM) {
            // 처음 1초: 시작 자리로 옮김 → 그다음 움직임 (당김: 점점 빨라짐, 밀어냄: 점점 느려짐)
            if (tau < 1.0) tx = p[3];
            else { const k = Math.min(1, (tau - 1.0) / 0.9); const e = plan.motion === 'pull' ? k * k : 1 - (1 - k) * (1 - k); tx = p[3] + (p[0] - p[3]) * e; }
          }
          const moving = plan.motion && tau >= 1.0 && !RM;
          u.x = RM ? tx : moving ? tx : K.damp(u.x, tx, dt, 5);
          u.z = RM ? p[1] : K.damp(u.z, p[1], dt, 5);
          u.r = RM ? p[2] : K.damp(u.r, p[2], dt, 4);
          const ty = plan.lift && i === 0 ? LIFT : MY; u.y = RM ? ty : K.damp(u.y, ty, dt, 3);
          m.position.set(u.x, u.y, u.z); m.rotation.y = u.r;
        });
        // 클립: 0단계에서 바닥 더미 → 양 끝으로 붙음
        const A = M[0];
        clips.forEach((c, i) => {
          const a = attach[i], pl = pile[i];
          const k = step === 0 ? (RM ? 1 : Math.min(1, Math.max(0, (tau - 0.9 - i * 0.07) / 0.6))) : 0;
          const e = K.ease(k);
          const ax = A.position.x + a[0], ay = A.position.y + a[1], az = A.position.z + a[2];
          c.position.set(K.lerp(pl[0], ax, e), K.lerp(0.03, ay, e), K.lerp(pl[1], az, e));
          c.rotation.set(K.lerp(-PI / 2, 0, e), 0, K.lerp(i * 0.7, a[3], e));
          c.visible = step === 0;
        });
        stay.forEach(c => { c.visible = step === 0; });
        // 나침반
        st.comp = RM ? (plan.compass ? 1 : 0) : K.damp(st.comp, plan.compass ? 1 : 0, dt, 6);
        comp.visible = st.comp > 0.01; comp.scale.setScalar(Math.max(0.001, st.comp));
        st.needle = plan.compass ? (RM ? 0 : 2.3 * Math.exp(-0.9 * tau) * Math.cos(3.2 * tau)) : 2.3;
        needle.rotation.y = st.needle;
        // 화살표·글자표
        const showArr = plan.motion && (tau > 0.7 || RM);
        arrows.pull.forEach(a => { a.visible = step === 1 && showArr; });
        arrows.push.forEach(a => { a.visible = step === 2 && showArr; });
        const up = step === 0 && M[0].userData.y > LIFT - 0.2;
        lN.visible = lS.visible = lMid.visible = up;
        lN.position.x = A.position.x + 1.0; lS.position.x = A.position.x - 1.0; lMid.position.x = A.position.x;
        lPull.visible = step === 1 && tau > 2.0; lPush1.visible = lPush2.visible = step === 2 && tau > 2.0;
        lNorth.visible = lSouth.visible = step === 3;
        sPull.visible = sPushA.visible = sPushB.visible = step === 4;
      },
    };
  },
});
