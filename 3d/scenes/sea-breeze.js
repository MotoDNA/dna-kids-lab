POP3D.register('sea-breeze', {
  title: '바닷가의 바람, 해풍과 육풍', kicker: '과학 5학년 · 날씨와 우리 생활', pageTitle: '해풍과 육풍', pageNo: 52,
  pageLines: ['낮에는 육지가 바다보다 빨리 데워져요.', '바다에서 육지로 부는 바람이 해풍이에요.', '', '밤에는 육지가 바다보다 빨리 식어요.', '육지에서 바다로 부는 바람이 육풍이에요.'],
  caption: '그림 4. 낮과 밤에 바닷가에서 부는 바람',
  steps: [
    { name: '낮의 바닷가', title: '낮에는 육지가 바다보다 빨리 데워져요', body: '햇빛을 똑같이 받아도 육지는 바다보다 빨리 데워져요. 그래서 낮에는 육지가 바다보다 따뜻해요. 온도계를 비교해 봐요.' },
    { name: '고기압과 저기압', title: '육지 위는 저기압, 바다 위는 고기압', body: '육지 위의 따뜻한 공기는 가벼워져 위로 올라가서 기압이 낮아져요. 바다 위의 공기는 더 차갑고 무거워서 기압이 높아요.', f: '육지 위 = 저기압 · 바다 위 = 고기압' },
    { name: '낮: 해풍', title: '바다에서 육지로, 해풍이 불어요', body: '바람은 고기압에서 저기압으로 불어요. 그래서 낮에는 바다에서 육지로 바람이 부는데, 이것을 해풍이라고 해요. 올라간 공기는 위쪽에서 바다 쪽으로 가서 내려와요.', f: '바다(고기압) → 육지(저기압) : 해풍' },
    { name: '밤: 육풍', title: '밤에는 육지에서 바다로, 육풍이 불어요', body: '밤에는 육지가 바다보다 빨리 식어요. 육지 위는 고기압, 바다 위는 저기압이 되어 육지에서 바다로 바람이 불어요. 이것을 육풍이라고 해요.', f: '육지(고기압) → 바다(저기압) : 육풍' },
    { name: '정리', title: '낮에는 해풍, 밤에는 육풍', body: '낮과 밤이 번갈아 바뀌는 모습을 봐요. 바람은 언제나 기압이 높은 곳에서 낮은 곳으로 불어요. 그래서 낮과 밤에 바람의 방향이 반대예요.', f: '낮: 바다 → 육지 (해풍) · 밤: 육지 → 바다 (육풍)' },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    // 한글 글꼴(Jua)은 글자 묶음별로 늦게 내려받아지므로, 받아진 뒤 글자표를 다시 그림
    const LB = (text, size, color, bg) => { const s = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); s.material.map.dispose(); s.material.map = n.material.map; s.material.needsUpdate = true; }).catch(() => {}); } catch (e) {} return s; };
    const box = (w, h, d, color, op) => { const g = new THREE.BoxGeometry(w, h, d); return K.sketch(new THREE.Mesh(g, K.paper(color, op))); };
    // 땅과 바다
    const landMat = K.paper(0x7fc283, 1);
    const land = K.sketch(new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.5, 2.6), landMat)); land.position.set(-1.4, 0.25, 0); root.add(land);
    const sand = box(0.5, 0.06, 2.6, 0xf3dfa6, 1); sand.position.set(-0.25, 0.53, 0); root.add(sand);
    const seaMat = K.paper(0x8fbfe8, 0.88);
    const sea = K.sketch(new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.34, 2.6), seaMat)); sea.position.set(1.45, 0.17, 0); root.add(sea);
    for (let r = 0; r < 3; r++) { const pts = []; for (let k = 0; k <= 24; k++) { const x = 0.2 + k * 0.11; pts.push([x, 0.345, -0.8 + r * 0.8 + Math.sin(k * 1.4) * 0.05]); } root.add(K.line(pts, 0xffffff, 0.9)); }
    // 나무와 집 (육지 표시)
    const trunk = box(0.1, 0.35, 0.1, 0xc9a06b, 1); trunk.position.set(-1.05, 0.68, -0.75); root.add(trunk);
    const crown = K.sketch(new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 8), K.paper(0x6fbf73, 1))); crown.position.set(-1.05, 1.05, -0.75); root.add(crown);
    const house = box(0.5, 0.36, 0.42, 0xe8cfa0, 1); house.position.set(-2.05, 0.68, -0.55); root.add(house);
    const roof = K.sketch(new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.3, 4), K.paper(0xf3a9c0, 1))); roof.rotation.y = Math.PI / 4; roof.position.set(-2.05, 1.01, -0.55); root.add(roof);
    // 하늘 배경 종이 (낮/밤)
    const skyMat = new THREE.MeshBasicMaterial({ color: 0xcfe8f7, side: THREE.DoubleSide });
    const sky = K.sketch(new THREE.Mesh(new THREE.PlaneGeometry(5.7, 3.4), skyMat)); sky.position.set(0.05, 1.7, -1.32); root.add(sky);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffd24a })); root.add(sun);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), new THREE.MeshBasicMaterial({ color: 0xf5f0d2 })); root.add(moon);
    const starG = new THREE.BufferGeometry(); const sp = [];
    for (let i = 0; i < 26; i++) sp.push(-2.6 + ((i * 2.17) % 5.3), 1.6 + ((i * 1.31) % 1.7), -1.28);
    starG.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
    const stars = new THREE.Points(starG, new THREE.PointsMaterial({ color: 0xfff6c8, size: 0.07, transparent: true, opacity: 0 })); root.add(stars);
    const rays = new THREE.Group(); root.add(rays);
    [[-2.0, 0.55], [-1.0, 0.55], [0.9, 0.36], [2.0, 0.36]].forEach(([x, y]) => rays.add(K.line([[-2.3, 3.0, -1.0], [x, y + 0.05, -0.3]], 0xf2b705, 0.7)));
    // 온도계 (육지, 바다)
    const thermo = (x, y) => {
      const g = new THREE.Group(); g.position.set(x, y, 0.95); root.add(g);
      const tube = K.sketch(new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 1.0, 12, 1, true), K.paper(0xffffff, 0.35))); tube.position.y = 0.6; g.add(tube);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), new THREE.MeshLambertMaterial({ color: 0xd8443a })); bulb.position.y = 0.1; g.add(bulb);
      const fg = new THREE.CylinderGeometry(0.05, 0.05, 1, 10); fg.translate(0, 0.5, 0);
      const fill = new THREE.Mesh(fg, new THREE.MeshLambertMaterial({ color: 0xd8443a })); fill.position.y = 0.15; g.add(fill);
      return { fill, h: 0.5, th: 0.5 };
    };
    const tL = thermo(-2.5, 0.5), tS = thermo(2.65, 0.34);
    // 데워지는 땅에서 올라가는 아지랑이
    const heat = []; for (let i = 0; i < 3; i++) { const pts = []; for (let k = 0; k <= 10; k++) pts.push([Math.sin(k * 1.2) * 0.06, k * 0.05, 0]); const l = K.line(pts, 0xe0573d, 0.8); l.position.set(-1.9 + i * 0.6, 0.6, 0.3); root.add(l); heat.push(l); }
    // 두꺼운 종이 화살표
    const fat = (from, to, color, r) => {
      const g = new THREE.Group(); const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to); const d = b.clone().sub(a); const len = d.length();
      const head = Math.min(0.32, len * 0.35), mat = new THREE.MeshLambertMaterial({ color });
      const sh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len - head, 10), mat); sh.position.y = (len - head) / 2; g.add(sh);
      const cone = K.sketch(new THREE.Mesh(new THREE.ConeGeometry(r * 2.4, head, 12), mat), 40); cone.position.y = len - head / 2; g.add(cone);
      g.position.copy(a); g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); root.add(g);
      g.userData = { s: 0, ts: 0 }; g.scale.setScalar(0.001); return g;
    };
    const ZA = 0.15, YB = 0.92, YT = 2.62, XL = -1.55, XS = 1.75;
    const BLUE = 0x3b7bd4, RED = 0xe0573d, ORG = 0xf0a04b;
    const day = { surf: fat([1.45, YB, ZA], [-1.25, YB, ZA], BLUE, 0.075), up: fat([XL, YB + 0.28, ZA], [XL, YT - 0.28, ZA], RED, 0.06), top: fat([-1.25, YT, ZA], [1.45, YT, ZA], ORG, 0.05), down: fat([XS, YT - 0.28, ZA], [XS, YB + 0.28, ZA], BLUE, 0.06) };
    const night = { surf: fat([-1.25, YB, ZA], [1.45, YB, ZA], BLUE, 0.075), up: fat([XS, YB + 0.28, ZA], [XS, YT - 0.28, ZA], RED, 0.06), top: fat([1.45, YT, ZA], [-1.25, YT, ZA], ORG, 0.05), down: fat([XL, YT - 0.28, ZA], [XL, YB + 0.28, ZA], BLUE, 0.06) };
    const allArrows = [...Object.values(day), ...Object.values(night)];
    // 공기 알갱이: 낮에는 바다쪽 아래 → 육지쪽 → 위로 → 바다쪽 → 아래로 도는 고리
    const loop = []; const R = 0.3;
    const seg = (x0, y0, x1, y1) => { const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / 0.05)); for (let i = 0; i < n; i++) loop.push(new THREE.Vector3(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, ZA)); };
    seg(XS - R, YB, XL + R, YB); seg(XL, YB + R, XL, YT - R); seg(XL + R, YT, XS - R, YT); seg(XS, YT - R, XS, YB + R);
    const dots = []; const dg = new THREE.SphereGeometry(0.055, 10, 8); const dm = new THREE.MeshBasicMaterial({ color: 0x1f4fae });
    for (let i = 0; i < 18; i++) { const m = new THREE.Mesh(dg, dm); m.userData.u = i / 18; root.add(m); dots.push(m); }
    // 글자표
    const L = (t, x, y, z, col) => { const s = LB(t, 0.62, col); s.position.set(x, y, z); root.add(s); return s; };
    const lab = { land: L('육지', -1.4, 0.5, 1.55), sea: L('바다', 1.4, 0.3, 1.55), lo: L('저기압', 0, 0, 0, '#c0392b'), hi: L('고기압', 0, 0, 0, '#2a56c6'), sb: L('해풍', 0.12, 1.9, ZA), lb: L('육풍', 0.12, 1.9, ZA) };
    const LAND_P = [-0.85, 1.28, ZA], SEA_P = [1.1, 1.28, ZA];
    root.position.set(0.1, K.PAGE_Y + 0.3, 0.2);
    const C_DAY = new THREE.Color(0x7fc283), C_NIGHT = new THREE.Color(0x5f8f86);
    const st = { n: 0, tn: 0, step: 0, night: false };
    const showArrows = (set, keys) => { allArrows.forEach(a => { a.userData.ts = 0; }); keys.forEach(k => { set[k].userData.ts = 1; }); };
    const mode = nightMode => {
      st.night = nightMode; st.tn = nightMode ? 1 : 0; const s = st.step;
      tL.th = nightMode ? 0.28 : 0.78; tS.th = nightMode ? 0.5 : 0.42;
      if (s === 0) showArrows(day, []); else if (s === 1) showArrows(day, ['up', 'down']); else showArrows(nightMode ? night : day, ['surf', 'up', 'top', 'down']);
      lab.lo.visible = lab.hi.visible = s >= 1;
      lab.lo.position.set(...(nightMode ? SEA_P : LAND_P)); lab.hi.position.set(...(nightMode ? LAND_P : SEA_P));
      lab.sb.visible = s >= 2 && !nightMode; lab.lb.visible = s >= 2 && nightMode;
      if (K.RM) { st.n = st.tn; allArrows.forEach(a => { a.userData.s = a.userData.ts; }); tL.h = tL.th; tS.h = tS.th; }
    };
    return {
      root, cam: { pos: [0.2, 3.4, 9.2], target: [0.15, 1.75, 0.1] },
      set(step) { st.step = step; mode(step === 3); },
      update(dt, t) {
        if (st.step === 4) { const nm = Math.floor(t / 5) % 2 === 1; if (nm !== st.night) mode(nm); }
        st.n = K.damp(st.n, st.tn, dt, 2.5); const n = st.n;
        skyMat.color.setRGB(K.lerp(0.81, 0.17, n), K.lerp(0.91, 0.23, n), K.lerp(0.97, 0.38, n));
        stars.material.opacity = n;
        sun.position.set(-2.3, K.lerp(3.0, 1.0, n), -1.0); sun.visible = n < 0.6; sun.scale.setScalar(1 - n * 0.6);
        moon.position.set(2.3, K.lerp(1.0, 3.0, n), -1.0); moon.visible = n > 0.4;
        rays.visible = n < 0.3 && st.step === 0;
        landMat.emissive.setRGB(0.07 * (1 - n), 0.02 * (1 - n), 0); landMat.color.lerpColors(C_DAY, C_NIGHT, n);
        [tL, tS].forEach(o => { o.h = K.damp(o.h, o.th, dt, 2); o.fill.scale.y = o.h; });
        heat.forEach((l, i) => { const k = ((t * 0.5 + i * 0.33) % 1); l.position.y = 0.6 + k * 0.6; l.material.opacity = (1 - n) * Math.sin(k * Math.PI) * 0.9; l.visible = st.step <= 1 && n < 0.5; });
        allArrows.forEach(a => { a.userData.s = K.damp(a.userData.s, a.userData.ts, dt, 4); a.scale.setScalar(Math.max(0.001, a.userData.s)); a.visible = a.userData.s > 0.01; });
        const on = st.step >= 2, dir = st.night ? -1 : 1;
        dots.forEach(m => {
          m.visible = on; if (!on) return;
          if (!K.RM) m.userData.u = (m.userData.u + dir * dt * 0.07 + 1) % 1;
          m.position.copy(loop[Math.floor(m.userData.u * loop.length) % loop.length]);
        });
      },
    };
  },
});
