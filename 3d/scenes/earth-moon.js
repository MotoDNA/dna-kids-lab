POP3D.register('earth-moon', {
  title: '지구와 달 비교하기', kicker: '과학 3학년 · 지구와 달', pageTitle: '지구와 달 비교하기', pageNo: 34,
  pageLines: ['지구와 달은 모두 둥근 공 모양이에요.', '달의 지름은 지구의 약 4분의 1이에요.', '', '지구에는 공기와 물이 있지만,', '달에는 공기와 물이 없어요.'],
  caption: '그림 3. 지구와 달의 모양과 크기',
  steps: [
    { name: '둥근 지구와 달', title: '지구도 달도 둥근 공 모양이에요', body: '우주에서 보면 지구와 달은 모두 공처럼 둥글어요. 화면을 끌어 돌려 보며 모양을 살펴봐요.', cam: { pos: [0.3, 2.6, 7.6], target: [0.3, 1.15, -0.2] } },
    { name: '공기와 물', title: '지구에는 공기와 물이 있고, 달에는 없어요', body: '지구는 공기로 둘러싸여 있고 넓은 바다가 있어요. 달에는 공기와 물이 없어요. 달에서 어둡게 보이는 \'달의 바다\'에도 물은 없고, 운석이 부딪쳐 생긴 충돌 구덩이(크레이터)가 많아요.', cam: { pos: [0.45, 2.3, 6.6], target: [0.3, 1.2, -0.2] } },
    { name: '크기 비교', title: '달의 지름은 지구의 약 4분의 1', body: '달을 4개 쌓으면 지구의 지름과 비슷해요. 달은 지구보다 훨씬 작아요.', f: '달의 지름 ≈ 지구의 지름 × 1/4', cam: { pos: [0.1, 2.4, 7.4], target: [-0.1, 1.2, -0.2] } },
    { name: '지구와 달 사이', title: '실제로는 아주 멀리 떨어져 있어요', body: '앞의 그림은 보기 쉽게 가까이 그렸어요. 실제 크기와 거리를 같은 비율로 줄이면 이렇게 돼요. 지구와 달 사이에는 지구가 약 30개 들어가요.', f: '지구~달 거리 ≈ 지구의 지름 × 30', cam: { pos: [0.1, 2.0, 7.6], target: [0.1, 0.9, -0.2] } },
    { name: '정리', title: '지구와 달을 정리해요', body: '둘 다 둥글지만, 지구는 공기와 물이 있어 생물이 살기에 알맞아요. 달은 공기와 물이 없어 생물이 살 수 없고, 낮에는 아주 뜨겁고 밤에는 아주 차가워요.', f: '지구: 공기 있음 · 물 있음 / 달: 공기 없음 · 물 없음', cam: { pos: [0.3, 2.6, 7.6], target: [0.3, 1.15, -0.2] } },
  ],
  build(K) {
    const { THREE } = K;
    const root = new THREE.Group();
    // 한글 글꼴(Jua)은 글자 묶음별로 늦게 내려받아지므로, 받아진 뒤 글자표를 다시 그림
    const LB = (text, size, color, bg) => { const s = K.label(text, size, color, bg); try { document.fonts.load('64px Jua', text).then(() => { const n = K.label(text, size, color, bg); s.material.map.dispose(); s.material.map = n.material.map; s.material.needsUpdate = true; }).catch(() => {}); } catch (e) {} return s; };
    const OUT = new THREE.MeshBasicMaterial({ color: 0x24303a, side: THREE.BackSide });
    // 지구 무늬: 바다가 약 7, 육지가 약 3
    const earthTex = K.tex(K.canvas(512, 256, (c, w, h) => {
      c.fillStyle = '#4f8fd6'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#8cc77a';
      [[70, 70, 46, 34, 0.3], [105, 150, 26, 46, 0.2], [255, 75, 34, 30, 0], [270, 150, 30, 46, 0.1], [370, 70, 74, 32, 0.1], [425, 170, 30, 20, 0.3], [330, 110, 18, 22, 0]].forEach(([x, y, a, b, r]) => { c.beginPath(); c.ellipse(x, y, a, b, r, 0, 7); c.fill(); });
      c.fillStyle = '#d7b98a'; [[380, 80, 26, 12], [272, 120, 16, 14]].forEach(([x, y, a, b]) => { c.beginPath(); c.ellipse(x, y, a, b, 0, 0, 7); c.fill(); });
      c.fillStyle = '#f4f8fb'; c.fillRect(0, 0, w, 14); c.fillRect(0, h - 18, w, 18);
    }));
    const cloudTex = K.tex(K.canvas(512, 256, (c, w, h) => {
      c.clearRect(0, 0, w, h); c.fillStyle = 'rgba(255,255,255,.85)';
      [[40, 110, 50, 7], [150, 60, 60, 8], [210, 190, 70, 7], [330, 140, 55, 7], [450, 95, 60, 8], [480, 200, 40, 6], [100, 200, 35, 6], [300, 40, 45, 6]].forEach(([x, y, a, b]) => { c.beginPath(); c.ellipse(x, y, a, b, 0.15, 0, 7); c.fill(); c.beginPath(); c.ellipse(x + a * 0.4, y + b * 1.6, a * 0.55, b * 0.8, 0.15, 0, 7); c.fill(); });
    }));
    const moonTex = K.tex(K.canvas(512, 256, (c, w, h) => {
      c.fillStyle = '#bdbcb6'; c.fillRect(0, 0, w, h);
      // 달의 바다 (앞면 = u 0.25 근처)
      c.fillStyle = '#85868a';
      [[110, 85, 36, 26], [150, 100, 24, 20], [98, 130, 30, 22], [140, 140, 22, 16], [72, 110, 22, 30]].forEach(([x, y, a, b]) => { c.beginPath(); c.ellipse(x, y, a, b, 0.3, 0, 7); c.fill(); });
      // 충돌 구덩이
      const cr = (x, y, r) => { c.fillStyle = '#9d9c97'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.strokeStyle = '#e6e5df'; c.lineWidth = Math.max(1.5, r * 0.25); c.beginPath(); c.arc(x - r * 0.12, y - r * 0.12, r, 2.4, 5.6); c.stroke(); c.strokeStyle = '#6f6f72'; c.beginPath(); c.arc(x, y, r, -0.8, 2.3); c.stroke(); };
      [[150, 190, 12], [175, 170, 7], [120, 200, 8], [190, 60, 9], [60, 60, 8], [200, 120, 6], [30, 160, 10], [250, 90, 12], [300, 160, 15], [360, 70, 10], [420, 140, 13], [470, 60, 9], [340, 210, 9], [440, 210, 8], [230, 210, 7], [85, 175, 6], [165, 45, 6]].forEach(a => cr(...a));
    }));
    const sphere = (r, mat, parent) => { const g = new THREE.SphereGeometry(r, 32, 20); const m = new THREE.Mesh(g, mat); const o = new THREE.Mesh(g, OUT); o.scale.setScalar(1.035); parent.add(o); parent.add(m); return m; };
    const earthG = new THREE.Group(); root.add(earthG);
    const earth = sphere(1, new THREE.MeshLambertMaterial({ map: earthTex }), earthG);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.018, 32, 20), new THREE.MeshLambertMaterial({ map: cloudTex, transparent: true, depthWrite: false })); earthG.add(clouds);
    const airM = new THREE.MeshBasicMaterial({ color: 0x9fd0ff, transparent: true, opacity: 0.3, side: THREE.BackSide, depthWrite: false });
    const air = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 20), airM); earthG.add(air);
    const MR = 0.273; // 달의 지름 = 지구의 0.273배 (약 4분의 1)
    const moonG = new THREE.Group(); root.add(moonG);
    const moon = sphere(MR, new THREE.MeshLambertMaterial({ map: moonTex }), moonG);
    // 크기 비교용 달 3개 (반투명)
    const ghosts = [1, 2, 3].map(() => { const g = new THREE.Group(); sphere(MR, new THREE.MeshLambertMaterial({ map: moonTex, transparent: true, opacity: 0.8 }), g); root.add(g); g.visible = false; return g; });
    const EP = new THREE.Vector3(-0.9, 1.15, -0.2), MP = new THREE.Vector3(1.5, 1.15, -0.2);
    const stackX = 0.48, stackY = i => EP.y - 1 + MR + i * 2 * MR;
    const guide = new THREE.Group(); root.add(guide);
    [EP.y - 1, EP.y + 1].forEach(y => { const l = K.line([[EP.x, y, EP.z], [stackX + 0.45, y, EP.z]], 0xc0392b, 0.9); guide.add(l); });
    // 실제 비율 모형: 지구 지름 0.19, 거리 = 지구 지름 × 30.2
    const SE = 0.095, MX0 = -2.75, MY = 0.85, MZ = -0.2, MX1 = MX0 + 30.2 * 2 * SE;
    const ruler = new THREE.Mesh(new THREE.PlaneGeometry(30 * 2 * SE, 2 * SE), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, map: K.tex(K.canvas(2048, 68, (c, w, h) => {
      c.strokeStyle = '#4f8fd6'; c.lineWidth = 4; for (let i = 0; i < 30; i++) { c.beginPath(); c.arc((i + 0.5) * w / 30, h / 2, h / 2 - 4, 0, 7); c.stroke(); }
    })) }));
    ruler.position.set(MX0 + SE + 30 * SE, MY, MZ); root.add(ruler);
    const dist = K.line([[MX0, MY - 0.32, MZ], [MX1, MY - 0.32, MZ]], 0x24303a, 0.8); root.add(dist);
    const ticks = [MX0, MX1].map(x => { const l = K.line([[x, MY - 0.42, MZ], [x, MY - 0.22, MZ]], 0x24303a, 0.8); root.add(l); return l; });
    // 글자표
    const L = (t, col) => { const s = LB(t, 0.6, col); root.add(s); return s; };
    const lab = {
      earth: L('지구'), moon: L('달'),
      air: L('공기', '#2a56c6'), water: L('바다 (물)', '#2a56c6'), mare: L('달의 바다 (물 없음)'), crater: L('충돌 구덩이'),
      four: L('달 4개 ≈ 지구 지름', '#c0392b'), thirty: L('지구 약 30개만큼 떨어져 있어요', '#c0392b'),
      eSum: L('지구 · 공기와 물 있음', '#2a56c6'), mSum: L('달 · 공기와 물 없음'),
    };
    const show = { 0: ['earth', 'moon'], 1: ['air', 'water', 'mare', 'crater'], 2: ['earth', 'four'], 3: ['earth', 'moon', 'thirty'], 4: ['eSum', 'mSum'] };
    root.position.set(0.1, K.PAGE_Y + 0.3, 0.2);
    const st = { step: 0, mini: 0, tMini: 0, stack: 0, tStack: 0, air: 0.3, tAir: 0.3, spin: true };
    const v = new THREE.Vector3();
    const apply = () => {
      const m = st.mini, s = st.stack;
      earthG.position.lerpVectors(EP, v.set(MX0, MY, MZ), m); earthG.scale.setScalar(K.lerp(1, SE, m));
      const mStack = v.set(stackX, stackY(0), EP.z).clone();
      moonG.position.copy(MP).lerp(mStack, s).lerp(new THREE.Vector3(MX1, MY, MZ), m); moonG.scale.setScalar(K.lerp(1, SE, m));
      ghosts.forEach((g, i) => { g.visible = s > 0.02; g.position.set(stackX, K.lerp(MP.y, stackY(i + 1), s), EP.z); g.scale.setScalar(Math.max(0.001, s)); });
      guide.visible = s > 0.6;
      ruler.material.opacity = m; ruler.visible = dist.visible = m > 0.05; ticks.forEach(t => { t.visible = m > 0.5; });
      const eR = earthG.scale.x, mR = MR * moonG.scale.x;
      lab.earth.position.set(earthG.position.x, earthG.position.y + eR * 1.1 + 0.3, earthG.position.z);
      lab.moon.position.set(moonG.position.x, moonG.position.y + (m > 0.5 ? 0.35 : mR + 0.3), moonG.position.z);
      lab.air.position.set(EP.x - 0.95, EP.y + 1.05, EP.z);
      lab.water.position.set(EP.x + 0.05, EP.y - 0.15, EP.z + 1.2);
      lab.mare.position.set(MP.x - 0.1, MP.y + 0.58, MP.z);
      lab.crater.position.set(MP.x + 0.15, MP.y - 0.55, MP.z);
      lab.four.position.set(stackX + 0.05, stackY(3) + MR + 0.32, EP.z);
      lab.thirty.position.set((MX0 + MX1) / 2, MY - 0.62, MZ);
      lab.eSum.position.set(EP.x, EP.y + 1.42, EP.z); lab.mSum.position.set(MP.x, MP.y + 0.62, MP.z);
    };
    return {
      root, cam: { pos: [0.3, 2.6, 7.6], target: [0.3, 1.15, -0.2] },
      set(step) {
        st.step = step; st.tMini = step === 3 ? 1 : 0; st.tStack = step === 2 ? 1 : 0; st.tAir = step === 1 ? 0.6 : 0.3; st.spin = step === 0;
        Object.keys(lab).forEach(k => { lab[k].visible = show[step].includes(k); });
        if (K.RM) { st.mini = st.tMini; st.stack = st.tStack; st.air = st.tAir; }
        apply();
      },
      update(dt, t) {
        st.mini = K.damp(st.mini, st.tMini, dt, 2.2); st.stack = K.damp(st.stack, st.tStack, dt, 2.4); st.air = K.damp(st.air, st.tAir, dt, 3);
        airM.opacity = st.air * (st.step === 1 && !K.RM ? 0.85 + 0.15 * Math.sin(t * 3) : 1);
        if (!K.RM) { earth.rotation.y += dt * 0.25; clouds.rotation.y += dt * 0.32; }
        if (st.spin && !K.RM) moon.rotation.y += dt * 0.3;
        else { const tgt = Math.round(moon.rotation.y / (Math.PI * 2)) * Math.PI * 2; moon.rotation.y = K.RM ? tgt : K.damp(moon.rotation.y, tgt, dt, 2.5); }
        apply();
      },
    };
  },
});
