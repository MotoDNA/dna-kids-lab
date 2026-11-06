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
    const b = ch && ch !== ' ' ? `<b class="${kind}" style="font-size:${fs}mm">${E(ch)}</b>` : '';
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
  window.DICT_TEST = { parse, wrap, build };
})();
