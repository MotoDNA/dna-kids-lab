/* 받아쓰기 연습장 만들기 — 급수표 문장을 넣으면 A4 한글 쓰기 연습장을 만들어 줌 */
(function () {
  const KEY = 'dnakids_dict_v1';
  const E = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const W = 210, H = 297, M = 12, HEAD = 20, AW = W - 2 * M, AH = H - 2 * M - HEAD - 3 - 8;
  const SAMPLE = ['우리 반 친구들', '나는 노래를 좋아합니다.', '햇볕이 따뜻해요.', '동생과 함께 놀았어요.', '꽃밭에 나비가 날아요.', '할머니께 편지를 써요.', '책상 위를 깨끗이 닦았다.', '맛있는 김밥을 먹었다.', '운동장에서 줄넘기를 해요.', '"고마워." 하고 말했어요.'];
  const SIZES = [[18, '큰 칸 18mm', '1학년'], [14, '보통 칸 14mm', '1~2학년'], [10, '작은 칸 10mm', '3학년 이상']];

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function parse(text) {
    return String(text || '').split(/\r?\n/).map(l => l
      .replace(/^\s*(\(?\d{1,2}\)?|[①-⑳])\s*[.)．、:]?\s+/, '')   // 앞 번호 지우기: 1. 1) (1) ①
      .replace(/^\s*(\d{1,2})[.)．、]/, '')
      .replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 30);
  }
  function wrap(t, cols) {
    const words = t.split(' '), lines = []; let cur = [];
    const push = () => { if (cur.length) lines.push(cur); cur = []; };
    for (const w of words) {
      let ch = [...w];
      const need = cur.length ? cur.length + 1 + ch.length : ch.length;
      if (need <= cols) { if (cur.length) cur.push(' '); cur.push(...ch); continue; }
      push();
      while (ch.length > cols) { lines.push(ch.slice(0, cols)); ch = ch.slice(cols); }
      cur = ch;
    }
    push();
    return lines.length ? lines : [[]];
  }
  const dims = s => [Math.floor(AW / s), Math.floor(AH / s)];

  function cell(s, ch, kind, o = {}) {
    const fs = (s * 0.72).toFixed(2);
    const num = o.num ? `<i style="font-size:${Math.max(2.4, s * 0.2).toFixed(1)}mm">${o.num}</i>` : '';
    const pt = ch === '.' || ch === ',';   // 원고지 쓰기: 마침표·쉼표는 칸의 왼쪽 아래
    const b = ch && ch !== ' ' ? `<b class="${kind}${pt ? ' p' : ''}" style="font-size:${fs}mm">${E(ch)}</b>` : '';
    return `<div class="c${s >= 14 ? ' g' : ''}${o.hl ? ' hl' : ''}" style="width:${s}mm;height:${s}mm">${num}${b}</div>`;
  }
  const row = (s, cols, chars, kind, o = {}) => {
    const out = []; for (let i = 0; i < cols; i++) out.push(cell(s, chars[i] || '', kind, { hl: o.hl, num: i === 0 ? o.num : '' })); return out.join('');
  };
  const grid = (s, cols, rows) => `<div class="grid" style="grid-template-columns:repeat(${cols},${s}mm);width:${(cols * s + 0.35).toFixed(2)}mm">${rows.join('')}</div>`;
  function page(title, sub, body, n, total) {
    return `<section class="pg"><div class="hd"><div><div class="t">${E(sub)}</div><h1>${E(title)}</h1></div><div class="nm">이름<span></span>날짜<span style="width:22mm"></span></div></div>${body}<div class="ft"><span>DNA Kids Lab 받아쓰기 연습장 · 가정 학습용</span><span>dnakidslab.cloud · ${n}/${total}</span></div></section>`;
  }
  function paginate(blocks, rows, s, cols) {
    const pages = []; let cur = [];
    for (const b of blocks) {
      if (cur.length + b.length > rows && cur.length) { pages.push(cur); cur = []; }
      cur.push(...b);
    }
    if (cur.length) pages.push(cur);
    return pages.map(p => { while (p.length < rows) p.push(row(s, cols, [], '')); return p; });
  }

  function build(o) {
    const s = o.size, [cols, rows] = dims(s), sents = o.sents, R = o.reps;
    const title = o.title || '받아쓰기 연습';
    const out = [];
    // 1) 번호 순서대로: 예시 문장 줄 → 연습 칸 R번 (첫 줄은 흐린 글씨로 따라 쓰기 선택)
    const blocks = sents.map((t, i) => {
      const ls = wrap(t.text, cols), b = [];
      ls.forEach((l, j) => b.push(row(s, cols, l, 'm', { hl: true, num: j === 0 ? t.no : '' })));
      for (let k = 0; k < R; k++) ls.forEach(l => b.push(row(s, cols, k === 0 && o.traceFirst ? l : [], 't')));
      return b;
    });
    const p1 = paginate(blocks, rows, s, cols);
    p1.forEach(p => out.push([title, `예시 문장을 보고 ${R}번씩 써요${o.traceFirst ? ' · 첫 줄은 흐린 글씨 따라 쓰기' : ''} · ${s}mm 칸`, grid(s, cols, p)]));
    // 2) 받아쓰기 시험지 (번호 + 빈 칸) / 3) 정답
    const tb = (fill) => sents.map(t => wrap(t.text, cols).map((l, j) => row(s, cols, fill ? l : [], 'm', { num: j === 0 ? t.no : '' })));
    if (o.test) paginate(tb(false), rows, s, cols).forEach(p => out.push([title + ' · 받아쓰기', `받아쓰기 시험지 · 불러 주는 문장을 듣고 번호에 맞춰 써요 · 띄어쓰기는 한 칸 비우기`, grid(s, cols, p)]));
    if (o.answer) paginate(tb(true), rows, s, cols).forEach(p => out.push([title + ' · 정답', '정답 · 맞춤법과 띄어쓰기를 함께 확인해요', grid(s, cols, p)]));
    return out.map((x, i) => page(x[0], x[1], x[2], i + 1, out.length)).join('');
  }

  const CSS = `
.dict-ocr{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:10px 0 4px}
.dict-ocr .sub{font-size:14px;margin:0}
.dict-cam{cursor:pointer;display:inline-flex;align-items:center;min-height:44px}
.dict-cam.busy{opacity:.6;pointer-events:none}
.dict-ocrmsg{margin:8px 0 4px;padding:10px 14px;border-radius:12px;background:#eef4ff;color:#1d1d1f;font-size:15px;line-height:1.5}
.dict-ocrmsg.ok{background:#eaf7ee}.dict-ocrmsg.bad{background:#fdeceb}
.dict-list{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;margin-top:8px}
@media (max-width:640px){.dict-list{grid-template-columns:1fr}}
.dict-row{display:flex;align-items:center;gap:8px}
.dict-row b{flex:none;width:30px;height:30px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px}
.dict-row input{flex:1;min-width:0;font:inherit;font-size:17px;padding:9px 10px;border:1px solid var(--line,#ccc);border-radius:10px}
.dict-wrap textarea{width:100%;min-height:200px;font:inherit;font-size:17px;line-height:1.7;padding:12px;border:1px solid var(--line,#ccc);border-radius:10px;box-sizing:border-box}
.dict-wrap .opt{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;margin:14px 0}
.dict-wrap .opt label{display:inline-flex;align-items:center;gap:6px;font-size:16px;white-space:nowrap}
.dict-wrap .opt select,.dict-wrap .opt input[type=text]{font:inherit;font-size:16px;padding:6px 8px;border:1px solid var(--line,#ccc);border-radius:8px}
.dict-wrap .acts{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0 18px}
.dict-wrap .btn2{background:#fff;color:var(--accent);border:1.5px solid var(--accent);border-radius:999px;padding:9px 16px;font:inherit;font-weight:700;cursor:pointer;min-height:44px}
.dict-wrap .pill{border-radius:999px}
.dict-wrap .cnt{font-size:14px;color:var(--sub,#666)}
.dict-say{background:#f3f8f5;border:1px solid #cfe3d8;border-radius:14px;padding:14px 16px;margin:8px 0 18px}
.dict-say ol{margin:8px 0 0;padding-left:26px}.dict-say li{margin:4px 0}
.dict-say li button{margin-left:6px}
.dict-say .now{font-size:22px;font-weight:800;color:var(--accent);min-height:30px}
.dict-prev{background:#e9e6df;border-radius:12px;padding:12px;overflow:hidden}
.dict-prev .scale{transform-origin:0 0}
.dict-prev .pg{background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12);margin-bottom:6mm}
#wsPrint{display:none}
.ws .pg{width:210mm;height:297mm;padding:12mm;position:relative;overflow:hidden;box-sizing:border-box;font-family:"Noto Sans KR",sans-serif;color:#1d1d1f;page-break-after:always;break-after:page}
.ws .pg:last-child{page-break-after:auto;break-after:auto}
.ws .hd{height:20mm;display:flex;align-items:flex-end;justify-content:space-between;border-bottom:.4mm solid #1d1d1f;padding-bottom:2mm;margin-bottom:3mm;box-sizing:border-box}
.ws .hd h1{font-size:6mm;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.2}
.ws .hd .t{font-size:2.8mm;color:#0071e3;font-weight:700;margin-bottom:1mm}
.ws .hd .nm{font-size:3.4mm;color:#444;white-space:nowrap}
.ws .hd .nm span{display:inline-block;border-bottom:.3mm solid #999;width:30mm;margin:0 3mm 0 1mm}
.ws .ft{position:absolute;left:12mm;right:12mm;bottom:5mm;font-size:2.6mm;color:#999;display:flex;justify-content:space-between}
.ws .grid{display:grid;border-top:.35mm solid #7fa7c9;border-left:.35mm solid #7fa7c9;margin:0 auto;box-sizing:content-box}
.ws .c{position:relative;border-right:.35mm solid #7fa7c9;border-bottom:.35mm solid #7fa7c9;display:flex;align-items:center;justify-content:center;line-height:1;box-sizing:border-box}
.ws .c.g::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:.25mm dashed #c9d9e8}
.ws .c.g::after{content:"";position:absolute;top:50%;left:0;right:0;border-top:.25mm dashed #c9d9e8}
.ws .c b{position:relative;z-index:1;font-weight:400}
.ws .c b.p{position:absolute;left:14%;bottom:8%;line-height:1}
.ws .c b.m{color:#1d1d1f}.ws .c b.t{color:#c4c4c4}
.ws .c.hl{background:#f4f8fc}
.ws .c i{position:absolute;left:.6mm;top:.3mm;font-style:normal;font-weight:700;color:#0071e3;z-index:2;line-height:1}
@media print{
  @page{size:A4;margin:0}
  body.ws-print > *{display:none!important}
  body.ws-print > #wsPrint{display:block!important}
  body.ws-print{background:#fff!important;margin:0!important;padding:0!important}
  .ws .c.hl{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}`;

  let speaking = false;
  function stopSay() { speaking = false; try { speechSynthesis.cancel(); } catch (e) {} }
  function sayOnce(t) {
    return new Promise(res => {
      try {
        const u = new SpeechSynthesisUtterance(t); u.lang = 'ko-KR'; u.rate = 0.75;
        let done = false; const fin = () => { if (!done) { done = true; res(); } };
        u.onend = fin; u.onerror = fin; setTimeout(fin, 3000 + t.length * 450);
        speechSynthesis.speak(u);
      } catch (e) { res(); }
    });
  }
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- 급수표 사진 읽기 (무료 글자 인식 Tesseract, 기기 안에서 처리) ---------- */
  const TESS = 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/';
  let tessP = null;
  function loadTess() {
    if (window.Tesseract) return Promise.resolve();
    return tessP || (tessP = new Promise((ok, no) => { const sc = document.createElement('script'); sc.src = TESS + 'tesseract.min.js'; sc.onload = ok; sc.onerror = () => { tessP = null; no(new Error('load')); }; document.head.appendChild(sc); }));
  }
  async function prepImage(file) {
    let bmp;
    try { bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }); }
    catch (e) { bmp = await new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = URL.createObjectURL(file); }); }
    const w0 = bmp.width, h0 = bmp.height, k = Math.min(2.5, 2200 / Math.max(w0, h0));
    let W = Math.round(w0 * k), H = Math.round(h0 * k);
    const cv0 = document.createElement('canvas'); cv0.width = W; cv0.height = H;
    const c0 = cv0.getContext('2d', { willReadFrequently: true }); c0.fillStyle = '#fff'; c0.fillRect(0, 0, W, H); c0.drawImage(bmp, 0, 0, W, H);
    // 1) 흑백 → 주변보다 어두운 곳만 글자로
    const binar = (ctx, W, H) => {
      const p = ctx.getImageData(0, 0, W, H).data, N = W * H, g = new Float32Array(N);
      for (let i = 0, j = 0; j < N; i += 4, j++) g[j] = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2];
      const hist = new Uint32Array(256); for (let j = 0; j < N; j++) hist[g[j] | 0]++;
      let lo = 0, hi = 255, acc = 0; for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc > N * 0.01) { lo = v; break; } }
      acc = 0; for (let v = 255; v >= 0; v--) { acc += hist[v]; if (acc > N * 0.05) { hi = v; break; } }
      const span = Math.max(30, hi - lo); for (let j = 0; j < N; j++) g[j] = Math.max(0, Math.min(255, (g[j] - lo) * 255 / span));
      const ii = new Float64Array((W + 1) * (H + 1));
      for (let y = 0; y < H; y++) { let row = 0; for (let x = 0; x < W; x++) { row += g[y * W + x]; ii[(y + 1) * (W + 1) + x + 1] = ii[y * (W + 1) + x + 1] + row; } }
      const R = 15, d = new Uint8Array(N);
      for (let y = 0; y < H; y++) { const y0 = Math.max(0, y - R), y1 = Math.min(H, y + R + 1);
        for (let x = 0; x < W; x++) { const x0 = Math.max(0, x - R), x1 = Math.min(W, x + R + 1);
          const m = (ii[y1 * (W + 1) + x1] - ii[y0 * (W + 1) + x1] - ii[y1 * (W + 1) + x0] + ii[y0 * (W + 1) + x0]) / ((y1 - y0) * (x1 - x0));
          const v = g[y * W + x]; d[y * W + x] = (v < m - 18 && v < 170) ? 1 : 0; } }
      return d;
    };
    let dark = binar(c0, W, H);
    // 2) 기울기 바로잡기: 가로줄이 가장 또렷해지는 각도 찾기
    const pts = []; for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x += 3) if (dark[y * W + x]) pts.push(x, y);
    let best = 0, bestS = -1;
    for (let a = -5; a <= 5.001; a += 0.25) {
      const t = a * Math.PI / 180, sn = Math.sin(t), cs = Math.cos(t), hist = new Float64Array(Math.ceil(H / 2) + W);
      for (let i = 0; i < pts.length; i += 2) { const yy = ((-pts[i] * sn + pts[i + 1] * cs) / 2 + W / 2) | 0; if (yy >= 0 && yy < hist.length) hist[yy]++; }
      let sc = 0; for (let i = 0; i < hist.length; i++) sc += hist[i] * hist[i];
      if (sc > bestS) { bestS = sc; best = a; }
    }
    if (Math.abs(best) >= 0.25) {
      const cv1 = document.createElement('canvas'); cv1.width = W; cv1.height = H;
      const c1 = cv1.getContext('2d', { willReadFrequently: true }); c1.fillStyle = '#fff'; c1.fillRect(0, 0, W, H);
      c1.translate(W / 2, H / 2); c1.rotate(-best * Math.PI / 180); c1.drawImage(cv0, -W / 2, -H / 2);
      dark = binar(c1, W, H);
    }
    // 3) 칸 선(표·원고지 선) 지우기: 반듯해진 그림에서 길게 이어진 가로줄·세로줄만 지우기
    const line = new Uint8Array(W * H), L = Math.max(50, Math.round(W * 0.035)); let vcols = 0; const vx = new Uint8Array(W);
    for (let y = 0; y < H; y++) { let run = 0;   // 위아래 한 줄까지 함께 봐서 살짝 끊긴 선도 잡기
      for (let x = 0; x <= W; x++) { const on = x < W && (dark[y * W + x] || (y > 0 && dark[(y - 1) * W + x]) || (y < H - 1 && dark[(y + 1) * W + x]));
        if (on) run++; else { if (run >= L) for (let q = x - run; q < x; q++) if (dark[y * W + q]) line[y * W + q] = 1; run = 0; } } }
    for (let x = 0; x < W; x++) { let run = 0;
      for (let y = 0; y <= H; y++) { const on = y < H && (dark[y * W + x] || (x > 0 && dark[y * W + x - 1]) || (x < W - 1 && dark[y * W + x + 1]));
        if (on) run++; else { if (run >= L) { vcols++; vx[x] = 1; for (let q = y - run; q < y; q++) if (dark[q * W + x]) line[q * W + x] = 1; } run = 0; } } }
    // 가늘고 긴 선 조각(끊긴 원고지 선) 한 번 더: 굵기 3px 이하, 길이 L2 이상
    const L2 = Math.max(26, Math.round(W * 0.02));
    const thinV = (x, y) => !(x > 2 && dark[y * W + x - 3]) && !(x < W - 3 && dark[y * W + x + 3]);
    const thinH = (x, y) => !(y > 2 && dark[(y - 3) * W + x]) && !(y < H - 3 && dark[(y + 3) * W + x]);
    for (let x = 0; x < W; x++) { let run = 0, th = 0;
      for (let y = 0; y <= H; y++) { if (y < H && dark[y * W + x] && !line[y * W + x]) { run++; if (thinV(x, y)) th++; } else { if (run >= L2 && th >= run * 0.8) for (let q = y - run; q < y; q++) line[q * W + x] = 1; run = 0; th = 0; } } }
    for (let y = 0; y < H; y++) { let run = 0, th = 0;
      for (let x = 0; x <= W; x++) { if (x < W && dark[y * W + x] && !line[y * W + x]) { run++; if (thinH(x, y)) th++; } else { if (run >= L2 && th >= run * 0.8) for (let q = x - run; q < x; q++) line[y * W + q] = 1; run = 0; th = 0; } } }
    // 선 옆에 붙은 한 줄짜리 찌꺼기도 지우기
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const j = y * W + x;
      if (dark[j] && !line[j] && ((line[j - 1] && line[j + 1]) || (line[j - W] && line[j + W]))) line[j] = 2; }
    const ink = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const j = y * W + x; if (!dark[j] || line[j]) continue;
      const nb = (x > 0 && line[j - 1] === 1) + (x < W - 1 && line[j + 1] === 1) + (y > 0 && line[j - W] === 1) + (y < H - 1 && line[j + W] === 1);
      ink[j] = nb >= 2 ? 0 : 1; }
    // 작은 점·잡티 지우기 (주변에 잉크가 거의 없는 점)
    // 4) 왼쪽·오른쪽 두 단이면 나누기: 가운데 세로 띠에 글자가 걸친 줄이 거의 없을 때만
    const rowInk = new Uint8Array(H); let inkRows = 0;
    for (let y = 0; y < H; y++) { for (let x = 0; x < W; x++) if (ink[y * W + x]) { rowInk[y] = 1; inkRows++; break; } }
    let gx = -1, gmin = Infinity;
    for (let x = Math.round(W * 0.38); x < W * 0.62; x += 2) {
      let hit = 0;
      for (let y = 0; y < H; y++) { if (!rowInk[y]) continue; const o = y * W; for (let d = -6; d <= 6; d++) if (ink[o + x + d]) { hit++; break; } }
      if (hit < gmin) { gmin = hit; gx = x; }
    }
    const cuts = gmin < inkRows * 0.1 ? [[0, gx], [gx, W]] : [[0, W]];
    // 원고지인지: 서로 떨어진 세로선 묶음이 많으면(한 줄에 칸이 여럿) 원고지
    let vclusters = 0; for (let x = 0, last = -99; x < W; x++) if (vx[x]) { if (x - last > 4) vclusters++; last = x; }
    const grid = vclusters >= 14;
    return cuts.map(([a, b]) => {
      const cw = b - a, cv = document.createElement('canvas'); cv.width = cw + 40; cv.height = H + 40;
      const cx = cv.getContext('2d'), im = cx.createImageData(cw + 40, H + 40), q = im.data; q.fill(255);
      for (let y = 0; y < H; y++) for (let x = a; x < b; x++) if (ink[y * W + x]) { const o = ((y + 20) * (cw + 40) + (x - a + 20)) * 4; q[o] = q[o + 1] = q[o + 2] = 0; }
      cx.putImageData(im, 0, 0); cv.grid = grid; return cv;
    });
  }
  const HANGUL = /[가-힣]/;
  function cleanSent(t) {
    t = t.replace(/(^|\s)[ㄱ-ㅎㅏ-ㅣ|｜¦](?=\s|$)/g, '$1').replace(/[|｜¦【】「」『』〔〕]/g, ' ');
    t = t.replace(/[\[\]{}_=~`<>@#$%^&*+\\\/]/g, ' ');
    // 끝부분 찌꺼기 정리: 마침표·물음표·느낌표 하나만 남기기
    const m = t.match(/[\s.,，。、:：;'"’”0-9!?)]*$/); let tail = '';
    if (m && m[0]) { const z = m[0].replace(/\s/g, ''); if (/\?/.test(z)) tail = '?'; else if (/^[.,，。、]/.test(z)) tail = '.'; else if (/^!/.test(z)) tail = '!'; t = t.slice(0, t.length - m[0].length); }
    // 글자 사이에 끼어든 점·쉼표는 빈칸(띄어쓰기)으로
    t = t.replace(/([가-힣])[\s.,，。、:：;]*[.,，。、:：;][\s.,，。、:：;]*(?=[가-힣])/g, '$1 ');
    t = t.replace(/^[^가-힣"“‘']+/, '').replace(/\s+/g, ' ').trim();
    return t ? t + tail : t;
  }
  function parseOcr(text) {
    const groups = []; let cur = null, part = 0;
    const newG = name => { cur = { name, items: [], part }; groups.push(cur); };
    for (const raw of String(text).split(/\n/)) {
      const l = raw.replace(/[|\[\]{}=]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!l) continue;
      if (l === '§PART§') { part++; cur = null; continue; }
      const hg = l.match(/(\d{1,2})\s*급/);
      if (hg && (hg.index <= 6 || /[<>〈〉]/.test(l) || l.replace(/받아\s*쓰기|급수표|\d+\s*급|[^가-힣]/g, '').length <= 3)) { newG(+hg[1] + '급'); continue; }
      if (/^[<〈(]?\s*\S?\s*급\s*[>〉)]?\s*\.?\s*\d{1,2}\s*[.,]/.test(l) || /[<〈]\s*\S{0,2}\s*급\s*[>〉]/.test(l)) { newG('?'); continue; }   // 숫자를 못 읽은 급 제목
      if (!cur) newG('');
      const hasNo = /^[^가-힣0-9①-⑳]*(\d{1,2}|[①-⑳])\s*[.)\],:·、。_\-]?\s+/.test(l);
      if (!hasNo && /급수표|받아\s*쓰기|학년|학기|이름|날짜|부모님|확인/.test(l)) continue;   // 제목·안내 줄 빼기
      let t = l.replace(/^[^가-힣0-9①-⑳]+/, '').replace(/^(\d{1,2}|[①-⑳])\s*[.)\],:·、。_\-]?\s*/, '');
      t = t.replace(/^[^가-힣"“‘']+/, '');
      t = cleanSent(t);
      if (t.replace(/[^가-힣]/g, '').length >= 2) cur.items.push(t);
    }
    // 번호는 잘못 읽힐 때가 많아서, 위에서부터 순서대로 1, 2, 3… 으로 넣어요
    // 숫자를 못 읽은 급: 같은 단의 앞뒤 급 번호로 채우기 (보통 1씩, 두 단이면 2씩)
    for (let p = 0; p <= part; p++) {
      const gs = groups.filter(g => g.part === p && g.name !== '');
      const nums = gs.map(g => parseInt(g.name)).filter(n => !isNaN(n)); let step = 1;
      for (let i = 1; i < gs.length; i++) { const a = parseInt(gs[i - 1].name), b = parseInt(gs[i].name); if (!isNaN(a) && !isNaN(b) && b > a) { step = b - a; break; } }
      if (part >= 1 && step === 1 && nums.length > 1 && nums.every(n => n % 2 === nums[0] % 2)) step = 2;
      gs.forEach((g, i) => { if (g.name === '?') { const prev = gs.slice(0, i).reverse().find(x => !isNaN(parseInt(x.name))); const next = gs.slice(i + 1).find(x => !isNaN(parseInt(x.name)));
        g.name = prev ? (parseInt(prev.name) + step * (i - gs.indexOf(prev))) + '급' : next ? (parseInt(next.name) - step * (gs.indexOf(next) - i)) + '급' : ''; } });
    }
    // 급 번호를 잘못 읽은 경우(13급 → 3급 등): 같은 단에서 가장 많이 맞는 '시작 번호 + 간격'으로 다시 매기기
    for (let p = 0; p <= part; p++) {
      const gs = groups.filter(g => g.part === p && g.name && g.items.length >= 3), n = gs.map(g => parseInt(g.name));
      let bestFit = null;
      for (let i = 0; i < gs.length; i++) for (let j = i + 1; j < gs.length; j++) {
        if (isNaN(n[i]) || isNaN(n[j]) || n[j] <= n[i] || (n[j] - n[i]) % (j - i)) continue;
        const st = (n[j] - n[i]) / (j - i); if (st > 2) continue;
        const s0 = n[i] - st * i, hit = n.filter((v, k) => v === s0 + st * k).length;
        if (s0 >= 1 && (!bestFit || hit > bestFit.hit)) bestFit = { s0, st, hit };
      }
      if (bestFit && bestFit.hit >= 2) gs.forEach((g, k) => { g.name = (bestFit.s0 + bestFit.st * k) + '급'; });
    }
    groups.forEach(g => { [0, 9].forEach(k => { if (g.items[k]) g.items[k] = g.items[k].replace(/^[그고]\s*(0|01|10)?\s+(?=[가-힣])/, '').replace(/^[그고](0|01|10)(?=[가-힣])/, ''); }); });
    let out = groups.filter(gr => gr.items.length);
    if (out.some(g => g.name)) out = out.filter(g => g.name);           // 급 제목 앞의 꾸밈 글자는 빼기
    const seen = {}; out = out.filter(g => !g.name || (seen[g.name] ? false : (seen[g.name] = 1)));
    out.sort((a, b) => (parseInt(a.name) || 0) - (parseInt(b.name) || 0));
    return out.map(gr => ({ name: gr.name, list: gr.items.slice(0, 30).map((t, i) => ({ no: i + 1, text: t })) }));
  }
  function lineText(ln, grid) {
    if (!grid) return ln.text || '';
    const sy = []; (ln.words || []).forEach(w => (w.symbols || []).forEach(c => { const t = (c.text || '').trim(); if (t && !/^[|｜¦ㅣㅡ!:;'"`‘’“”_~\-\\/()\[\]{}<>]$/.test(t) && !/^[ㄱ-ㅎㅏ-ㅣ]$/.test(t)) sy.push({ t, x0: c.bbox.x0, x1: c.bbox.x1 }); }));
    if (sy.length < 2) return ln.text || '';
    const cx = sy.map(c => (c.x0 + c.x1) / 2), df = []; for (let i = 1; i < sy.length; i++) if (/[가-힣]/.test(sy[i].t) && /[가-힣]/.test(sy[i - 1].t)) df.push(cx[i] - cx[i - 1]);
    if (df.length < 2) return ln.text || '';
    const ds = df.slice().sort((a, b) => a - b), pitch = ds[Math.floor(ds.length * 0.3)];   // 원고지 한 칸 너비
    let out = sy[0].t;
    for (let i = 1; i < sy.length; i++) { const gap = cx[i] - cx[i - 1]; out += (gap > pitch * 1.55 ? ' ' : '') + sy[i].t; }
    return out;
  }
  async function ocrImage(file, onMsg) {
    onMsg('글자 읽는 도구를 준비하는 중… (처음 한 번은 조금 걸려요)');
    await loadTess();
    onMsg('사진을 반듯하게 펴는 중…');
    const parts = await prepImage(file);
    const worker = await Tesseract.createWorker('kor', 1, {
      workerPath: TESS + 'worker.min.js',
      corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0',
      langPath: 'https://cdn.jsdelivr.net/npm/@tesseract.js-data/kor@1.0.0/4.0.0_best_int',
      logger: m => { if (m.status === 'recognizing text') onMsg(`사진 속 글자를 읽는 중… ${Math.round((m.progress || 0) * 100)}%`); }
    });
    try {
      await worker.setParameters({ preserve_interword_spaces: '1' });
      const texts = [];
      for (const cv of parts) {
        const r = await worker.recognize(cv, {}, { text: true, blocks: true });
        const lines = []; (r.data.blocks || []).forEach(b => (b.paragraphs || []).forEach(p => (p.lines || []).forEach(l => lines.push(lineText(l, cv.grid)))));
        texts.push(lines.length ? lines.join('\n') : (r.data.text || ''));
      }
      return texts.join('\n§PART§\n');
    } finally { try { await worker.terminate(); } catch (e) {} }
  }

  window.viewDictation = function (app) {
    const st = load();
    document.title = '받아쓰기 연습장 만들기 · DNA Kids Lab';
    if (!document.getElementById('dictCss')) { const c = document.createElement('style'); c.id = 'dictCss'; c.textContent = CSS; document.head.appendChild(c); }
    app.innerHTML = `<div class="narrow dict-wrap">
<h1>받아쓰기 연습장 만들기</h1>
<p class="sub">학교에서 받아 온 <b>급수표</b> 문장을 번호에 맞춰 적고, 문장마다 몇 번 쓸지 고르세요. 번호 순서대로 <b>예시 문장</b>과 <b>연습 칸</b>이 들어간 A4 연습장을 만들어 드려요.</p>
<label for="dictTitle" style="font-weight:700">제목</label>
<div class="opt" style="margin-top:6px"><input type="text" id="dictTitle" maxlength="30" placeholder="예: 1학년 받아쓰기 3급" style="flex:1;min-width:220px" value="${E(st.title || '')}"></div>
<div style="font-weight:700;margin-top:6px">급수표 문장 <span class="cnt" id="dictCnt"></span></div>
<div class="dict-ocr"><label class="btn pill dict-cam">📷 급수표 사진으로 채우기<input type="file" id="dictPhoto" accept="image/*" hidden></label><span class="sub">사진 속 글자를 읽어 1번부터 채워요. 사진은 이 기기 밖으로 보내지 않아요.</span></div>
<div class="dict-ocrmsg" id="dictOcrMsg" hidden></div>
<div class="dict-list" id="dictRows"></div>
<button class="btn2" id="dictMore" style="margin-top:8px">＋ 문장 칸 더하기</button>
<div class="opt">
  <label>칸 크기 <select id="dictSize">${SIZES.map(([v, l, g]) => `<option value="${v}"${(st.size || 14) == v ? ' selected' : ''}>${l} (${g})</option>`).join('')}</select></label>
  <label>문장마다 쓰기 <select id="dictReps">${[1, 2, 3, 4, 5].map(n => `<option value="${n}"${(st.reps || 3) == n ? ' selected' : ''}>${n}번</option>`).join('')}</select></label>
  <label><input type="checkbox" id="dictTraceFirst"${st.traceFirst !== false ? ' checked' : ''}> 첫 줄은 흐린 글씨로 따라 쓰기</label>
  <label><input type="checkbox" id="dictTest"${st.test ? ' checked' : ''}> 받아쓰기 시험지 쪽 더하기</label>
  <label><input type="checkbox" id="dictAns"${st.answer ? ' checked' : ''}> 정답 쪽 더하기</label>
</div>
<div class="acts">
  <button class="btn pill" id="dictPrint">🖨️ 인쇄 / PDF로 저장</button>
  <button class="btn2" id="dictSayAll">🔊 받아쓰기 불러 주기</button>
  <button class="btn2" id="dictSample">예시 문장 넣기</button>
</div>
<div class="dict-say" id="dictSay" hidden></div>
<p class="sub" id="dictInfo" style="font-size:15px"></p>
<div class="dict-prev" id="dictPrev"><div class="scale ws" id="dictScale"></div></div>
<p class="sub" style="font-size:14px;margin-top:12px">인쇄 창에서 용지는 <b>A4</b>, 배율은 <b>100%(실제 크기)</b>로 골라 주세요. 'PDF로 저장'을 고르면 파일로 저장돼요. 입력한 문장은 이 기기에만 저장돼요.</p>
</div>`;
    const $ = id => document.getElementById(id);
    let lines = Array.isArray(st.lines) ? st.lines.slice(0, 30) : [];
    if (!lines.length && st.text) lines = parse(st.text);
    while (lines.length < 10) lines.push('');
    const drawRows = () => {
      $('dictRows').innerHTML = lines.map((t, i) => `<label class="dict-row"><b>${i + 1}</b><input type="text" maxlength="60" data-i="${i}" value="${E(t)}" placeholder="${i + 1}번 문장" enterkeyhint="next"></label>`).join('');
      $('dictMore').hidden = lines.length >= 30;
    };
    drawRows();
    $('dictRows').addEventListener('input', e => { const x = e.target.closest('input[data-i]'); if (!x) return; lines[+x.dataset.i] = x.value; later(); });
    $('dictRows').addEventListener('keydown', e => { const x = e.target.closest('input[data-i]'); if (!x || e.key !== 'Enter') return; e.preventDefault(); const nx = $('dictRows').querySelector(`input[data-i="${+x.dataset.i + 1}"]`); if (nx) nx.focus(); });
    $('dictRows').addEventListener('paste', e => {   // 급수표 여러 줄을 한 번에 붙여 넣으면 번호 칸에 나눠 넣기
      const x = e.target.closest('input[data-i]'); const tx = (e.clipboardData || window.clipboardData).getData('text');
      if (!x || !/\n/.test(tx)) return; e.preventDefault();
      const arr = parse(tx); let i = +x.dataset.i;
      arr.forEach(t => { if (i < 30) { lines[i++] = t; } }); while (lines.length < Math.min(30, i)) lines.push('');
      drawRows(); render();
    });
    $('dictPhoto').onchange = async e => {
      const file = e.target.files && e.target.files[0]; e.target.value = ''; if (!file) return;
      const box = $('dictOcrMsg'), msg = (t, cls) => { box.hidden = false; box.className = 'dict-ocrmsg' + (cls ? ' ' + cls : ''); box.textContent = t; };
      const lab = document.querySelector('.dict-cam'); lab.classList.add('busy');
      try {
        const text = await ocrImage(file, msg);
        const groups = parseOcr(text);
        if (!groups.length) { msg('사진에서 문장을 찾지 못했어요. 급수표가 화면에 꽉 차게, 밝고 반듯하게 다시 찍어 주세요.', 'bad'); return; }
        const fill = gr => {
          if (sentList().length && !confirm('지금 적혀 있는 문장을 사진에서 읽은 문장으로 바꿀까요?')) return;
          lines = []; gr.list.forEach(x => { if (x.no <= 30) lines[x.no - 1] = x.text; });
          for (let i = 0; i < lines.length; i++) if (lines[i] == null) lines[i] = '';
          while (lines.length < 10) lines.push('');
          if (gr.name && !$('dictTitle').value.trim()) $('dictTitle').value = '받아쓰기 ' + gr.name;
          drawRows(); render();
          msg(`${gr.list.length}문장을 채웠어요${gr.name ? ' (' + gr.name + ')' : ''}. 사진에서 읽은 글자는 틀릴 수 있으니, 맞춤법과 띄어쓰기를 한 번 확인해 주세요.`, 'ok');
        };
        if (groups.length === 1) fill(groups[0]);
        else {
          box.hidden = false; box.className = 'dict-ocrmsg';
          box.innerHTML = `<b>사진에 급수가 ${groups.length}개 있어요. 어느 것을 넣을까요?</b><div class="acts" style="margin:8px 0 0">${groups.map((g, i) => `<button class="btn2" data-g="${i}">${E(g.name || (i + 1) + '번째 묶음')} · ${g.list.length}문장</button>`).join('')}</div>`;
          box.querySelectorAll('button[data-g]').forEach(b => b.onclick = () => fill(groups[+b.dataset.g]));
        }
      } catch (err) {
        msg('사진을 읽지 못했어요. 인터넷 연결을 확인하고 다시 해 주세요.', 'bad');
      } finally { lab.classList.remove('busy'); }
    };
    $('dictMore').onclick = () => { for (let k = 0; k < 5 && lines.length < 30; k++) lines.push(''); drawRows(); };
    const sentList = () => lines.map((t, i) => ({ no: i + 1, text: String(t || '').replace(/\s+/g, ' ').trim() })).filter(x => x.text);
    const opts = () => ({ title: $('dictTitle').value.trim(), lines, size: +$('dictSize').value, reps: +$('dictReps').value, traceFirst: $('dictTraceFirst').checked, test: $('dictTest').checked, answer: $('dictAns').checked });
    let html = '';
    const render = () => {
      const o = opts(); save(o);
      const sents = sentList();
      $('dictCnt').textContent = sents.length ? `· ${sents.length}문장` : '';
      if (!sents.length) { html = ''; $('dictScale').innerHTML = ''; $('dictPrev').style.height = '0px'; $('dictPrev').style.padding = '0'; $('dictInfo').textContent = '문장을 적으면 아래에 연습장이 바로 보여요.'; return; }
      html = build({ ...o, sents });
      const n = (html.match(/class="pg"/g) || []).length;
      $('dictInfo').textContent = `미리 보기 · ${sents.length}문장 × ${o.reps}번 · A4 ${n}쪽${o.test ? ' (+ 시험지' + (o.answer ? '·정답)' : ')') : (o.answer ? ' (+ 정답)' : '')}`;
      const sc = $('dictScale'); sc.innerHTML = html;
      const pv = $('dictPrev'); pv.style.padding = '12px'; pv.style.height = '';
      const fit = () => { const px = 210 * 96 / 25.4, k = Math.min(1, (pv.clientWidth - 24) / px); sc.style.transform = `scale(${k})`; pv.style.height = (sc.scrollHeight * k + 24) + 'px'; };
      fit(); requestAnimationFrame(fit);
    };
    let tm; var later = () => { clearTimeout(tm); tm = setTimeout(render, 250); };
    $('dictTitle').addEventListener('input', later);
    ['dictSize', 'dictReps', 'dictTraceFirst', 'dictTest', 'dictAns'].forEach(id => $(id).addEventListener('change', render));
    window.addEventListener('resize', later);
    $('dictSample').onclick = () => { if (sentList().length && !confirmReplace()) return; lines = SAMPLE.slice(); drawRows(); if (!$('dictTitle').value) $('dictTitle').value = '받아쓰기 예시'; render(); };
    function confirmReplace() { return window.confirm ? confirm('적어 둔 문장을 예시 문장으로 바꿀까요?') : true; }
    $('dictPrint').onclick = async () => {
      if (!html) { toastMsg('먼저 급수표 문장을 적어 주세요.'); return; }
      let pr = document.getElementById('wsPrint'); if (!pr) { pr = document.createElement('div'); pr.id = 'wsPrint'; pr.className = 'ws'; document.body.appendChild(pr); }
      pr.innerHTML = html;
      try { await document.fonts.ready; } catch (e) {}
      document.body.classList.add('ws-print');
      const done = () => { document.body.classList.remove('ws-print'); window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      setTimeout(() => { window.print(); }, 50);
    };
    // 불러 주기
    $('dictSayAll').onclick = () => {
      const sents = sentList().map(x => x.text), nos = sentList().map(x => x.no), box = $('dictSay');
      if (!sents.length) { toastMsg('먼저 급수표 문장을 적어 주세요.'); return; }
      if (!window.speechSynthesis) { toastMsg('이 기기에서는 소리로 읽어 줄 수 없어요.'); return; }
      box.hidden = false;
      box.innerHTML = `<div class="now" id="dictNow">준비됐어요</div><p class="sub" style="font-size:15px;margin:4px 0 10px">문장마다 두 번씩 천천히 읽어 주고, 쓸 시간을 기다려 줘요. 아이는 시험지에 번호대로 써요.</p>
<div class="acts" style="margin:0"><button class="btn pill" id="dictGo">▶ 처음부터 불러 주기</button><button class="btn2" id="dictStop">■ 멈추기</button><label style="display:inline-flex;align-items:center;gap:6px"><input type="checkbox" id="dictShow"> 문장 보기(부모님용)</label></div>
<ol id="dictList" hidden>${sents.map((t, i) => `<li value="${nos[i]}">${E(t)} <button class="say" data-i="${i}">🔊</button></li>`).join('')}</ol>`;
      $('dictShow').onchange = e => { $('dictList').hidden = !e.target.checked; };
      $('dictList').onclick = e => { const b = e.target.closest('button[data-i]'); if (!b) return; stopSay(); sayOnce(sents[+b.dataset.i]); };
      $('dictStop').onclick = () => { stopSay(); $('dictNow').textContent = '멈췄어요'; };
      $('dictGo').onclick = async () => {
        stopSay(); await wait(150); speaking = true;
        for (let i = 0; i < sents.length && speaking; i++) {
          $('dictNow').textContent = `${nos[i]}번 문장`;
          await sayOnce(`${nos[i]}번.`); if (!speaking) break; await wait(500);
          await sayOnce(sents[i]); if (!speaking) break; await wait(1200);
          await sayOnce(sents[i]); if (!speaking) break;
          $('dictNow').textContent = `${nos[i]}번 · 쓰는 중…`;
          await wait(4000 + [...sents[i]].length * 700);
        }
        if (speaking) { $('dictNow').textContent = '끝! 정답을 확인해 봐요 🎉'; speaking = false; }
      };
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    function toastMsg(m) { if (typeof window.toast === 'function') window.toast(m); else alert(m); }
    render();
    return () => { stopSay(); window.removeEventListener('resize', later); document.body.classList.remove('ws-print'); const pr = document.getElementById('wsPrint'); if (pr) pr.remove(); };
  };
  window.DICT_TEST = { parse, wrap, build, parseOcr, prepImage, ocrImage: (f, m) => ocrImage(f, m || (() => {})) };
})();
