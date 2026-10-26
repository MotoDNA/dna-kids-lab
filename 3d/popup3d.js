/* DNA Kids Lab · 입체 그림책 3D 뷰어
   사용법: POP3D.open('net')  → /3d/scenes/net.js 를 불러와 창으로 보여 줌
   장면 파일은 POP3D.register(id, def) 로 등록한다. def 형식은 /3d/SCENES.md 참고. */
(function () {
  const VER = '3';
  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  const ORBIT_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
  const BASE = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/popup3d\.js.*$/, '') : '3d/';
  const DEFS = {};
  const loaded = {};
  const loadScript = src => loaded[src] || (loaded[src] = new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => { delete loaded[src]; rej(new Error('load ' + src)); }; document.head.appendChild(s); }));
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const back = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function css() {
    if (document.getElementById('p3-css')) return;
    const st = document.createElement('style'); st.id = 'p3-css';
    st.textContent = `.p3-dlg{position:fixed;inset:0;z-index:95;background:rgba(18,24,28,.62);display:flex;align-items:center;justify-content:center;padding:max(12px,env(safe-area-inset-top)) 12px max(12px,env(safe-area-inset-bottom))}
.p3-box{background:#f4f7f4;border-radius:18px;width:min(980px,100%);max-height:100%;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.35);font-family:'Gowun Dodum','Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#1f2a33}
.p3-head{display:flex;align-items:center;gap:10px;padding:10px 14px 8px}
.p3-head b{flex:1;min-width:0;font-family:'Jua','Gowun Dodum',sans-serif;font-weight:400;font-size:20px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.p3-head small{display:block;font-family:'Gowun Dodum',sans-serif;font-size:12.5px;color:#5d6b72;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p3-x{border:0;background:#e6ece6;width:40px;height:40px;border-radius:50%;font-size:24px;line-height:1;cursor:pointer;color:#1f2a33;flex:none}
.p3-scroll{overflow:auto;display:flex;flex-direction:column;gap:10px;padding:0 12px 12px}
.p3-stage{position:relative;border-radius:14px;overflow:hidden;background:#dfe5df;aspect-ratio:16/10;max-height:58vh;min-height:240px;width:100%}
.p3-stage canvas{display:block;width:100%;height:100%;touch-action:none}
.p3-hint{position:absolute;right:10px;top:8px;background:rgba(255,253,246,.9);color:#5d6b72;font-size:12px;padding:3px 10px;border-radius:999px;pointer-events:none}
.p3-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;color:#5d6b72;font-size:15px}
.p3-panel{background:#fffdf6;border-radius:14px;padding:12px 16px;display:grid;gap:4px;min-height:96px}
.p3-kick{font-size:12.5px;color:#5d6b72}
.p3-panel h3{font-family:'Jua','Gowun Dodum',sans-serif;font-weight:400;font-size:19px;margin:0;line-height:1.3}
.p3-panel p{margin:0;font-size:15.5px;line-height:1.6}
.p3-f{justify-self:start;background:#eef3ff;color:#2a56c6;border-radius:10px;padding:3px 12px;font-weight:700;font-size:15px}
.p3-bar{display:flex;align-items:center;gap:4px;background:#fff;border-radius:999px;padding:5px;box-shadow:inset 0 0 0 1px #d6dcd6}
.p3-b{width:42px;height:42px;border-radius:50%;border:0;background:transparent;color:#1f2a33;font-size:18px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex:none}
.p3-b:hover{background:#eef2ee}.p3-b[aria-pressed="true"]{background:#e3ebff;color:#2a56c6}
.p3-b:focus-visible,.p3-x:focus-visible{outline:3px solid #0071e3;outline-offset:2px}
.p3-steps{flex:1;min-width:0;display:flex;align-items:center;gap:8px;font-family:'Jua','Gowun Dodum',sans-serif;font-size:17px;white-space:nowrap;overflow:hidden}
.p3-steps i{font-style:normal;color:#c0392b}.p3-steps span{overflow:hidden;text-overflow:ellipsis}
.p3-dots{display:flex;gap:5px;flex:none}.p3-dots i{width:7px;height:7px;border-radius:50%;background:#c7d0c9}.p3-dots i.on{background:#1f2a33}
@media(max-width:560px){.p3-dlg{padding:0}.p3-box{border-radius:0;height:100%}.p3-stage{max-height:none}.p3-dots{display:none}.p3-steps{font-size:15px}}
.p3-open{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #2a56c6;color:#2a56c6;background:#fff;border-radius:999px;padding:6px 14px;font:inherit;font-size:15px;font-weight:700;cursor:pointer;margin:10px 0 4px}
.p3-open:hover{background:#eef3ff}`;
    document.head.appendChild(st);
  }

  async function open(id, opts) {
    opts = opts || {};
    css();
    const dlg = document.createElement('div'); dlg.className = 'p3-dlg'; dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true');
    dlg.innerHTML = `<div class="p3-box"><div class="p3-head"><div style="flex:1;min-width:0"><b class="p3-title">입체 그림 불러오는 중…</b><small class="p3-sub"></small></div><button type="button" class="p3-x" aria-label="닫기">×</button></div>
      <div class="p3-scroll"><div class="p3-stage"><div class="p3-hint">끌어서 돌리기 · 두 손가락으로 확대</div></div>
      <section class="p3-panel" aria-live="polite"><div class="p3-kick"></div><h3></h3><p></p><div class="p3-f" hidden></div></section>
      <div class="p3-bar" role="group" aria-label="단계 조작"><button type="button" class="p3-b" data-a="prev" aria-label="이전 단계">‹</button><button type="button" class="p3-b" data-a="play" aria-label="자동 재생" aria-pressed="false">▶</button><div class="p3-steps"><i></i><span></span></div><div class="p3-dots"></div><button type="button" class="p3-b" data-a="next" aria-label="다음 단계">›</button><button type="button" class="p3-b" data-a="sound" aria-label="읽어 주기" aria-pressed="false">🔈</button></div></div></div>`;
    document.body.appendChild(dlg); document.body.style.overflow = 'hidden';
    const q = s => dlg.querySelector(s);
    const prevFocus = document.activeElement;
    let disposed = false, raf = 0, timer = null, renderer = null, soundOn = false;
    const close = () => {
      disposed = true; cancelAnimationFrame(raf); clearInterval(timer);
      try { speechSynthesis.cancel(); } catch (e) {}
      if (renderer) { try { renderer.dispose(); renderer.forceContextLoss(); } catch (e) {} }
      dlg.remove(); document.body.style.overflow = ''; removeEventListener('keydown', key);
      if (prevFocus && prevFocus.focus) prevFocus.focus();
      if (opts.onClose) opts.onClose();
    };
    const key = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') { stopPlay(); go(1); } else if (e.key === 'ArrowLeft') { stopPlay(); go(-1); } };
    addEventListener('keydown', key);
    dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('.p3-x')) close(); });
    q('.p3-x').focus();
    const stage = q('.p3-stage');
    const fail = msg => { stage.insertAdjacentHTML('beforeend', `<div class="p3-msg">${esc(msg)}</div>`); q('.p3-title').textContent = '입체 그림'; };

    try { await loadScript(THREE_URL); await loadScript(ORBIT_URL); if (!DEFS[id]) await loadScript(BASE + 'scenes/' + id + '.js?v=' + VER); }
    catch (e) { return fail('입체 그림을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 열어 주세요.'); }
    if (disposed) return;
    const def = DEFS[id]; if (!def) return fail('이 입체 그림은 아직 준비 중이에요.');
    try { const allTxt = [def.title, def.kicker, def.pageTitle, def.caption].concat(def.pageLines || [], ...(def.steps || []).map(s => [s.name, s.title])).join(' ') + '0123456789kgcm'; await Promise.all([document.fonts.load('64px Jua', allTxt), document.fonts.load('34px "Gowun Dodum"', allTxt)]); } catch (e) {}
    if (disposed) return;
    const THREE = window.THREE;
    try { renderer = new THREE.WebGLRenderer({ antialias: true }); if (!renderer.getContext()) throw 0; } catch (e) { renderer = null; return fail('이 기기에서는 입체 그림을 그릴 수 없어요. 책 페이지의 그림으로 공부해 주세요.'); }
    q('.p3-title').textContent = def.title; q('.p3-sub').textContent = def.kicker || '';
    try { gtag('event', 'view_3d', { scene: id }); } catch (e) {}

    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.setClearColor(0xdfe5df, 1);
    stage.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 16 / 10, 0.1, 200);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 5; controls.maxDistance = 26; controls.maxPolarAngle = 1.36;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc6b4, 0.95));
    const sun = new THREE.DirectionalLight(0xffffff, 0.55); sun.position.set(-5, 12, 6); scene.add(sun);

    const K = kit(THREE, renderer);
    // 책상과 펼친 책
    const desk = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshLambertMaterial({ color: 0xcfd8d1 }));
    desk.rotation.x = -Math.PI / 2; desk.position.y = -0.4; scene.add(desk);
    const PW = 6.4, PD = 8.4;
    const book = new THREE.Group(); book.position.x = -PW / 2 + 0.2; scene.add(book);
    const cover = new THREE.Mesh(new THREE.BoxGeometry(PW * 2 + 0.5, 0.18, PD + 0.4), new THREE.MeshLambertMaterial({ color: 0xd9a22b })); cover.position.y = -0.31; book.add(cover);
    book.add(new THREE.Mesh(new THREE.BoxGeometry(PW * 2 + 0.1, 0.5, PD), new THREE.MeshLambertMaterial({ color: 0xf1ede2 })));
    const makePage = side => {
      const g = new THREE.PlaneGeometry(PW, PD, 40, 1); g.rotateX(-Math.PI / 2); const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) { const x = p.getX(i) + PW / 2; const d = side < 0 ? PW - x : x; p.setY(i, 0.26 + 0.34 * (1 - Math.exp(-d * 2.4))); p.setX(i, side < 0 ? p.getX(i) - PW / 2 : p.getX(i) + PW / 2); }
      g.computeVertexNormals(); const m = new THREE.MeshLambertMaterial({ color: 0xffffff }); book.add(new THREE.Mesh(g, m)); return m;
    };
    const pL = makePage(-1), pR = makePage(1);
    pL.map = K.tex(K.canvas(1024, 1344, (c, w, h) => {
      c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#8a958f'; c.font = '28px "Gowun Dodum"'; c.fillText(def.kicker || '', 90, 120);
      c.fillStyle = '#1f2a33'; c.font = '60px Jua'; c.fillText(def.pageTitle || def.title, 90, 215);
      c.strokeStyle = '#e4e0d4'; c.lineWidth = 3; for (let y = 300; y < 1180; y += 56) { c.beginPath(); c.moveTo(90, y); c.lineTo(w - 90, y); c.stroke(); }
      c.fillStyle = '#4b5860'; c.font = '34px "Gowun Dodum"'; (def.pageLines || []).forEach((t, i) => c.fillText(t, 100, 286 + i * 56));
      c.fillStyle = '#9aa39e'; c.font = '28px "Gowun Dodum"'; c.fillText(String(def.pageNo || 14), 90, h - 70);
    }));
    pR.map = K.tex(K.canvas(1024, 1344, (c, w, h) => {
      c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#d8d3c4'; c.setLineDash([14, 12]); c.lineWidth = 3; c.strokeRect(120, 200, w - 240, h - 470); c.setLineDash([]);
      c.fillStyle = '#6d7a80'; c.font = 'italic 32px "Gowun Dodum"'; c.fillText(def.caption || '', 120, h - 190);
      c.fillStyle = '#9aa39e'; c.font = '28px "Gowun Dodum"'; c.fillText(String((def.pageNo || 14) + 1), w - 130, h - 70);
    }));
    pL.needsUpdate = pR.needsUpdate = true;

    let S;
    try { S = def.build(K); } catch (e) { console.error(e); return fail('입체 그림을 만드는 중에 문제가 생겼어요.'); }
    const baseY = S.root.position.y; scene.add(S.root);
    const V = a => new THREE.Vector3(a[0], a[1], a[2]);
    camera.position.copy(V(S.cam.pos)); controls.target.copy(V(S.cam.target));

    let step = 0; const steps = def.steps;
    q('.p3-dots').innerHTML = steps.map(() => '<i></i>').join('');
    const speak = () => { try { speechSynthesis.cancel(); if (!soundOn) return; const s = steps[step]; const u = new SpeechSynthesisUtterance(s.title + '. ' + s.body); u.lang = 'ko-KR'; u.rate = 0.95; speechSynthesis.speak(u); } catch (e) {} };
    const render = () => {
      const s = steps[step];
      q('.p3-kick').textContent = `${step + 1} / ${steps.length}`; q('.p3-panel h3').textContent = s.title; q('.p3-panel p').textContent = s.body;
      const f = q('.p3-f'); f.hidden = !s.f; f.textContent = s.f || '';
      q('.p3-steps i').textContent = step + 1; q('.p3-steps span').textContent = s.name;
      [...q('.p3-dots').children].forEach((d, i) => d.classList.toggle('on', i === step));
      S.set(step); speak();
      if (s.cam) { camFrom = { pos: camera.position.clone(), target: controls.target.clone() }; camTo = { pos: V(s.cam.pos), target: V(s.cam.target) }; camT = RM() ? 1 : 0; if (camT === 1) { camera.position.copy(camTo.pos); controls.target.copy(camTo.target); } }
    };
    let camFrom = null, camTo = null, camT = 1;
    const go = d => { step = (step + d + steps.length) % steps.length; render(); };
    const stopPlay = () => { clearInterval(timer); timer = null; const b = q('[data-a="play"]'); b.setAttribute('aria-pressed', 'false'); b.textContent = '▶'; };
    q('.p3-bar').addEventListener('click', e => {
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a;
      if (a === 'prev') { stopPlay(); go(-1); } else if (a === 'next') { stopPlay(); go(1); }
      else if (a === 'play') { if (timer) return stopPlay(); b.setAttribute('aria-pressed', 'true'); b.textContent = '❚❚'; go(1); timer = setInterval(() => go(1), soundOn ? 8000 : 4500); }
      else if (a === 'sound') { soundOn = !soundOn; b.setAttribute('aria-pressed', String(soundOn)); b.textContent = soundOn ? '🔊' : '🔈'; speak(); }
    });
    renderer.domElement.addEventListener('pointerdown', () => { const h = q('.p3-hint'); if (h) h.remove(); }, { once: true });
    const size = () => { const r = stage.getBoundingClientRect(); if (!r.width) return; renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.fov = r.width < 520 ? 48 : 36; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(size); ro.observe(stage); size();
    render();
    let popT = RM() ? 1 : 0, last = performance.now();
    const frame = now => {
      if (disposed) { ro.disconnect(); return; }
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (popT < 1) { popT = Math.min(1, popT + dt * 1.3); S.root.scale.y = Math.max(0.001, back(popT)); S.root.position.y = baseY - (1 - Math.min(1, popT * 1.4)) * 0.4; }
      if (camT < 1) { camT = Math.min(1, camT + dt * 1.2); const k = ease(camT); camera.position.lerpVectors(camFrom.pos, camTo.pos, k); controls.target.lerpVectors(camFrom.target, camTo.target, k); }
      try { S.update(dt, now / 1000); } catch (e) {}
      controls.update(); renderer.render(scene, camera); raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  }

  // 장면 만들 때 쓰는 도구 모음
  function kit(THREE, renderer) {
    const canvas = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); return c; };
    const tex = cv => { const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t; };
    const INK = new THREE.LineBasicMaterial({ color: 0x24303a });
    const INK2 = new THREE.LineBasicMaterial({ color: 0x24303a, transparent: true, opacity: 0.32 });
    const sketch = (mesh, angle) => { const eg = new THREE.EdgesGeometry(mesh.geometry, angle || 20); mesh.add(new THREE.LineSegments(eg, INK)); const b = new THREE.LineSegments(eg, INK2); b.position.set(0.012, 0.01, -0.008); b.scale.setScalar(1.004); mesh.add(b); return mesh; };
    const paper = (color, opacity) => { opacity = opacity == null ? 0.92 : opacity; return new THREE.MeshLambertMaterial({ color, transparent: opacity < 1, opacity, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }); };
    const label = (text, size, color, bg) => {
      size = size || 0.7; color = color || '#1f2a33'; bg = bg || 'rgba(255,253,246,.94)';
      const len = String(text).length; const W = Math.max(256, 64 + len * 58);
      const paint = (c, w, h) => { c.clearRect(0, 0, w, h); c.fillStyle = bg; const r = 40; c.beginPath(); c.moveTo(r, 8); c.arcTo(w - 8, 8, w - 8, h - 8, r); c.arcTo(w - 8, h - 8, 8, h - 8, r); c.arcTo(8, h - 8, 8, 8, r); c.arcTo(8, 8, w - 8, 8, r); c.fill(); c.fillStyle = color; c.font = '64px Jua'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, w / 2, h / 2 + 4); };
      const cv = canvas(W, 128, paint); const tx = tex(cv);
      try { if (document.fonts && !document.fonts.check('64px Jua', String(text))) document.fonts.load('64px Jua', String(text)).then(() => { paint(cv.getContext('2d'), cv.width, cv.height); tx.needsUpdate = true; }).catch(() => {}); } catch (e) {}
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, depthTest: false, transparent: true })); s.scale.set(size * W / 256, size / 2, 1); s.renderOrder = 10; return s;
    };
    const line = (points, color, opacity) => { const g = new THREE.BufferGeometry().setFromPoints(points.map(p => Array.isArray(p) ? new THREE.Vector3(p[0], p[1], p[2]) : p)); return new THREE.Line(g, new THREE.LineBasicMaterial({ color: color == null ? 0x24303a : color, transparent: opacity != null, opacity: opacity == null ? 1 : opacity })); };
    const arrow = (from, to, color) => { const d = new THREE.Vector3().subVectors(to, from); const len = d.length(); const a = new THREE.ArrowHelper(d.clone().normalize(), from, len, color == null ? 0xd04a3a : color, Math.min(0.35, len * 0.3), Math.min(0.22, len * 0.18)); return a; };
    return { THREE, canvas, tex, sketch, paper, label, line, arrow, INK, PAGE_Y: 0.32, RM: RM(), ease, back,
      lerp: (a, b, k) => a + (b - a) * k, damp: (cur, target, dt, speed) => cur + (target - cur) * Math.min(1, dt * (speed || 3)) };
  }

  // 단원 책 페이지에 버튼 달기: map = { 'm5-01': { 2: 'net' } }
  let MAP = null;
  const mapReady = () => MAP || (MAP = fetch(BASE + 'index.json?v=' + VER).then(r => r.ok ? r.json() : {}).catch(() => ({})));
  async function sceneFor(slug, sectionIndex) { const m = await mapReady(); const e = m[slug]; return e ? (e[String(sectionIndex)] || null) : null; }

  window.POP3D = { open, register: (id, def) => { DEFS[id] = def; }, sceneFor, css, VER };
})();
