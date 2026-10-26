/* 상식 놀이터 — DNA Kids Lab (plain JS, 외부 라이브러리 없음)
   index.html 의 라우터가 #/gk, #/gk/<sub> 에서 GK.render(app, sub) 를 부른다. */
(function () {
'use strict';
const V = '1';
const GREEN = '#34a853';
const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];
const nf = n => Number(n).toLocaleString('ko-KR');
const flagSrc = iso => `assets/flags/${iso}.svg`;
// 받침 여부: true/false, 한글이 아니면 null (숫자는 읽는 소리로)
function batchim(w) {
  const ch = String(w).trim().slice(-1); const c = ch.charCodeAt(0);
  if (c >= 0xAC00 && c <= 0xD7A3) return (c - 0xAC00) % 28 !== 0;
  if (/[0-9]/.test(ch)) return '013678'.includes(ch);
  return null;
}
const J = (w, a, b) => { const t = batchim(w); return t === null ? `${a}(${b})` : t ? a : b; }; // J(w,'은','는')
const iga = w => w + J(w, '이', '가');
const eunnun = w => w + J(w, '은', '는');
const ieyo = w => w + J(w, '이에요', '예요');
const sfx2 = k => { try { if (typeof sfx === 'function') sfx(k); } catch (e) {} };
const toast2 = m => { try { if (typeof toast === 'function') toast(m); } catch (e) {} };
function rec(ref, title, score, total) {
  try { if (typeof logOnce === 'function') Promise.resolve(logOnce({ kind: 'gk', ref, title, score, total })).catch(() => {}); } catch (e) {}
}

/* ---------- 자료 불러오기 ---------- */
const cache = {};
function get(path, type) {
  return cache[path] || (cache[path] = fetch(path + '?v=' + V).then(r => { if (!r.ok) throw new Error('nodata'); return type === 'text' ? r.text() : r.json(); })
    .catch(e => { delete cache[path]; throw e; }));
}
const data = name => get(`gk/data/${name}.json`);
const worldText = () => get('gk/world.svg', 'text');

/* ---------- 화면 떠날 때 정리 ---------- */
let cleanups = [];
const onLeave = fn => cleanups.push(fn);
function leave() {
  cleanups.forEach(f => { try { f(); } catch (e) {} }); cleanups = [];
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
}

/* ---------- 아이콘 (인라인 SVG, 색은 currentColor) ---------- */
const IC = {
  map: '<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="2.6"/><ellipse cx="20" cy="20" rx="6" ry="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 20h28M8.5 12.5h23M8.5 27.5h23" stroke="currentColor" stroke-width="2" fill="none"/>',
  flags: '<path d="M10 5v31" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M11.5 7H32l-4.5 6.5L32 20H11.5z" fill="currentColor"/>',
  capitals: '<rect x="5" y="9" width="15" height="21" rx="3" fill="currentColor" opacity=".45" transform="rotate(-9 12.5 19.5)"/><rect x="19" y="10" width="15" height="21" rx="3" fill="currentColor" transform="rotate(8 26.5 20.5)"/><path d="M24 18l3 3 4-5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="rotate(8 26.5 20.5)"/>',
  peaks: '<path d="M2 34 15 11l7 11 5-7 11 19z" fill="currentColor"/><path d="M15 11l-4 7 4-2 3.5 2z" fill="#fff"/>',
  morse: '<circle cx="8" cy="20" r="4.2" fill="currentColor"/><rect x="15" y="16" width="13" height="8" rx="4" fill="currentColor"/><circle cx="33.5" cy="20" r="4.2" fill="currentColor"/>',
  quiz: '<path d="M8 6h24a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H19l-8 7v-7H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="currentColor"/><path d="M16.3 13.2a3.8 3.8 0 1 1 5.4 3.4c-1.1.6-1.7 1.3-1.7 2.6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="20" cy="23.2" r="1.6" fill="#fff"/>',
  greet: '<path d="M6 6h18a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9l-6 5v-5H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="currentColor"/><path d="M34 15h-4v6a5 5 0 0 1-5 5h-7v1a3 3 0 0 0 3 3h7l5 4v-4h1a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3z" fill="currentColor" opacity=".5"/>',
  korea: '<path d="M20 3.5a10.5 10.5 0 0 1 10.5 10.5C30.5 22.5 20 36 20 36S9.5 22.5 9.5 14A10.5 10.5 0 0 1 20 3.5z" fill="currentColor"/><circle cx="20" cy="14" r="4.2" fill="#fff"/>',
  space: '<circle cx="20" cy="20" r="9" fill="currentColor"/><ellipse cx="20" cy="20" rx="17.5" ry="5.5" fill="none" stroke="currentColor" stroke-width="2.4" transform="rotate(-20 20 20)"/>',
  stars: '<path d="M5 31l9-9 9 4 9-15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/><circle cx="5" cy="31" r="3" fill="currentColor"/><circle cx="14" cy="22" r="2.6" fill="currentColor"/><circle cx="23" cy="26" r="2.6" fill="currentColor"/><path d="M32 4l1.8 5.2L39 11l-5.2 1.8L32 18l-1.8-5.2L25 11l5.2-1.8z" fill="currentColor"/>',
  dino: '<path d="M3 31c3 0 6-5 10-6.5 4-1.4 9 .6 13-.4 2-.5 2.6-5 2.8-10 .1-3.2 1.4-6.1 4.4-6.1 2 0 3.3 1.1 3.3 2.3l-3.2.9c-.8 4-.6 9.6-1.8 13.4-.9 2.8-2.7 4.6-5.3 5.4l.9 5.5h-3.3l-1-4.8h-6.7l-.9 4.8H9.3l.3-5.6C7 31.4 5 32 3 31z" fill="currentColor"/>',
  globe: '<circle cx="20" cy="20" r="15" fill="currentColor" opacity=".25"/><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.6"/><ellipse cx="20" cy="20" rx="6.5" ry="15" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M5 20h30M8 12h24M8 28h24" stroke="currentColor" stroke-width="2"/>',
  time: '<circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 10.5V20l6.5 4" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
};
IC.solar3d = IC.space;
const ic = (k, size) => `<svg viewBox="0 0 40 40" width="${size || 34}" height="${size || 34}" aria-hidden="true" focusable="false">${IC[k]}</svg>`;

const ACTS = [
  { id: 'globe', href: 'gk/globe/', t: '3D 지구본 여행', d: '위성 사진 지구본을 돌리며 나라·수도·문화와 북극·남극을 알아봐요.', c: '#0b57d0' },
  { id: 'solar3d', href: 'gk/solar/', t: '3D 태양계 탐험', d: '태양 둘레를 도는 8개 행성에 날아가 크기·거리·1년 길이를 알아봐요.', c: '#3949ab' },
  { id: 'map', t: '세계지도 탐험', d: '나라를 눌러 국기·수도·인사말을 알아보고, 어디 있는지 맞혀 봐요.', c: '#34a853' },
  { id: 'flags', t: '국기 맞히기', d: '국기를 보고 나라를, 나라를 보고 국기를 골라요.', c: '#d93025' },
  { id: 'capitals', t: '나라·수도', d: '카드를 뒤집어 나라와 수도 짝을 찾아요.', c: '#0071e3' },
  { id: 'peaks', t: '산·강 비교', d: '세계와 우리나라의 높은 산, 긴 강을 견줘 봐요.', c: '#8a5a2b' },
  { id: 'morse', t: '모스부호', d: '점과 선으로 소리와 빛 신호를 보내고 들어 봐요.', c: '#5e5ce6' },
  { id: 'quiz', t: '상식 퀴즈', d: '자연·과학·역사… 10문제로 상식을 겨뤄요.', c: '#e37400' },
  { id: 'greet', t: '세계의 인사말', d: '여러 나라 말로 "안녕하세요"를 듣고 따라 해요.', c: '#d6336c' },
  { id: 'korea', t: '우리나라 시·도', d: '17개 시·도와 시·도청이 있는 곳을 알아봐요.', c: '#1a73e8' },
  { id: 'space', t: '태양계 행성', d: '여덟 행성의 크기를 한 줄로 세워 비교해요.', c: '#3949ab' },
  { id: 'stars', t: '별자리 여행', d: '계절마다 보이는 별자리와 북극성 찾는 법을 알아봐요.', c: '#5b3cc4' },
  { id: 'dino', t: '공룡 시대', d: '트라이아스기·쥐라기·백악기를 시간 띠로 봐요.', c: '#2e7d32' },
  { id: 'time', t: '세계 시간', d: '지금 세계 여러 도시는 몇 시일까요?', c: '#00838f' }
];
const ACT = Object.fromEntries(ACTS.map(a => [a.id, a]));

/* ---------- 스타일 (한 번만) ---------- */
const CSS = `
.gk{--gk:${GREEN};padding-bottom:10px}
.gk-back{display:inline-flex;align-items:center;min-height:40px;font-size:15px;font-weight:600;margin:-8px 0 6px}
.gk-head{display:flex;gap:14px;align-items:center;margin-bottom:20px}
.gk-head h1{font-size:clamp(26px,4.4vw,34px);margin:0;line-height:1.2}
.gk-head p{margin:4px 0 0;color:var(--sub);font-size:16px;line-height:1.5}
.gk-ic{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;flex:none}
.gk-kick{display:inline-block;font-size:14px;font-weight:700;padding:4px 12px;border-radius:999px;background:#e6f4ea;color:#1e7e34;margin-bottom:10px}
.gk-hero{text-align:center;margin:4px 0 26px}
.gk-hero h1{font-size:clamp(32px,5.6vw,48px);letter-spacing:-.04em;margin:0 0 8px}
.gk-hero p{color:var(--sub);font-size:clamp(16px,2.2vw,19px);margin:0 auto;max-width:30em}
.gk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.gk-tile{display:flex;flex-direction:column;gap:6px;background:#fff;border-radius:20px;padding:18px 18px 16px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.04);color:var(--ink);text-decoration:none;transition:transform .15s,box-shadow .15s}
.gk-tile:hover{text-decoration:none;transform:translateY(-2px);box-shadow:0 0 0 1px rgba(0,0,0,.07),0 10px 26px rgba(0,0,0,.09)}
.gk-tile .gk-ic{width:50px;height:50px;margin-bottom:4px}
.gk-tile b{font-size:19px;letter-spacing:-.02em}
.gk-tile span{font-size:14.5px;color:var(--sub);line-height:1.45}
@media (max-width:560px){.gk-grid{grid-template-columns:1fr 1fr;gap:10px}.gk-tile{padding:14px 13px 13px;border-radius:18px}.gk-tile b{font-size:17px}.gk-tile span{font-size:14px}.gk-tile .gk-ic{width:44px;height:44px}.gk-head{gap:12px}.gk-ic{width:46px;height:46px}}
.gk .seg{margin-bottom:16px}
.gk-panel{background:#fff;border-radius:22px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 6px 20px rgba(0,0,0,.04);padding:22px;margin:0 auto 16px}
.gk-setup{max-width:640px;text-align:center}
.gk-setup h3{font-size:15px;color:var(--sub);margin:4px 0 8px;font-weight:600}
.gk-setup .btn{min-width:180px;margin-top:6px}
.gk-note{font-size:14.5px;color:var(--sub);background:var(--bg2);border-radius:14px;padding:10px 14px;line-height:1.55;margin:12px 0 0}
.gk-quiz{max-width:640px;margin:0 auto}
.gk-qtop{display:flex;justify-content:space-between;font-size:15px;color:var(--sub);font-weight:600}
.gk-qtop b{color:#1e7e34}
.gk-prog{height:8px;background:#e8e8ed;border-radius:99px;overflow:hidden;margin:6px 0 18px}
.gk-prog i{display:block;height:100%;background:var(--gk);border-radius:99px;transition:width .3s}
.gk-q{font-size:clamp(20px,3.2vw,24px);font-weight:700;text-align:center;line-height:1.45;letter-spacing:-.02em}
.gk-q small{display:block;font-size:15px;font-weight:500;color:var(--sub);margin-top:4px}
.gk-bigflag{height:clamp(110px,30vw,190px);width:auto;max-width:100%;margin:4px auto 12px;border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,.1),0 6px 18px rgba(0,0,0,.08);background:#f5f5f7}
.gk-ch{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
.gk-ch button{background:#fff;border:1.5px solid #d2d2d7;border-radius:16px;min-height:60px;padding:12px 14px;font-size:18px;font-weight:600;cursor:pointer;color:var(--ink);line-height:1.35;transition:background .15s,border-color .15s}
.gk-ch button:hover:not(:disabled){border-color:var(--gk);background:#f6fbf7}
.gk-ch button:disabled{cursor:default}
.gk-ch button.right{border-color:#1d8348;background:#e6f4ea;color:#14532d}
.gk-ch button.wrong{border-color:#d70015;background:#fdecee}
.gk-ch.flags button{padding:10px;display:flex;align-items:center;justify-content:center}
.gk-ch.flags img{height:clamp(84px,20vw,130px);width:auto;max-width:100%;border-radius:6px;box-shadow:0 0 0 1px rgba(0,0,0,.1);background:#f5f5f7}
.gk-ch.letters{grid-template-columns:repeat(4,1fr)}
.gk-ch.letters button{font-size:30px;min-height:76px}
@media (max-width:520px){.gk-ch{grid-template-columns:1fr}.gk-ch.flags{grid-template-columns:1fr 1fr}.gk-ch.letters{grid-template-columns:repeat(4,1fr)}.gk-panel{padding:18px 16px}}
.gk-fb{margin-top:14px;text-align:center}
.gk-fb p{margin:0 0 8px}
.gk-verdict{font-size:19px;font-weight:700}
.gk-verdict.ok{color:#1d8348}.gk-verdict.no{color:#c5221f}
.gk-explain{background:var(--bg2);border-radius:14px;padding:12px 16px;font-size:16px;text-align:left;line-height:1.6}
.gk-fb .btn{min-width:170px;margin-top:4px}
.gk-result{text-align:center;max-width:520px;margin:0 auto}
.gk-result img{width:150px;height:150px;object-fit:contain;margin:0 auto 6px}
.gk-result h2{margin:0 0 6px;font-size:26px}
.gk-btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:14px}
.gk-err{padding:30px 0;color:var(--sub);text-align:center}
@keyframes gkpop{0%{transform:scale(.6);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes gkblink{0%,100%{opacity:1}50%{opacity:.35}}
/* 지도 */
.gk-wide{--W:min(1180px,calc(100vw - 32px));width:var(--W);margin-left:calc((100% - var(--W)) / 2)}
.gk-mapgrid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start}
@media (max-width:900px){.gk-mapgrid{grid-template-columns:minmax(0,1fr)}}
.gk-map{position:relative;background:#e4f1fa;border-radius:20px;overflow:hidden;aspect-ratio:960/500;touch-action:pan-y;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;outline-offset:3px}
.gk-map.zoomed{touch-action:none;cursor:grab}
.gk-map svg{display:block;width:100%;height:100%}
.gk-map path{fill:#dadade;stroke:#fff;stroke-width:.6;vector-effect:non-scaling-stroke;transition:fill .25s}
.gk-map path[data-k]{cursor:pointer}
.gk-map path.k1{fill:#ffd8a8}.gk-map path.k2{fill:#c5dcff}.gk-map path.k3{fill:#ffe98f}.gk-map path.k4{fill:#c9ebc1}.gk-map path.k5{fill:#f7c8de}.gk-map path.k6{fill:#d9ccf4}
@media (hover:hover){.gk-map path[data-k]:hover{filter:brightness(.9)}}
.gk-map path.sel{fill:${GREEN};stroke:#1d1d1f;stroke-width:1.6}
.gk-map path.ok{fill:${GREEN}}
.gk-map path.bad{fill:#f28b82}
.gk-map path.ans{fill:${GREEN};stroke:#1d1d1f;stroke-width:2;animation:gkblink .8s ease-in-out 4}
.gk-zoom{position:absolute;right:8px;bottom:8px;display:flex;gap:6px}
.gk-zoom button{width:42px;height:42px;border-radius:12px;border:0;background:rgba(255,255,255,.95);box-shadow:0 2px 8px rgba(0,0,0,.16);font-size:22px;font-weight:700;line-height:1;cursor:pointer;color:var(--ink);padding:0}
.gk-zoom button:hover{background:#fff}
.gk-legend{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:14px;color:var(--sub);margin:10px 2px 0}
.gk-legend i{display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:5px;vertical-align:-1px}
.gk-find{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:15px;font-weight:600}
.gk-find select{flex:1;max-width:320px;min-height:44px}
.gk-card{background:#fff;border-radius:20px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 6px 20px rgba(0,0,0,.05);padding:18px}
.gk-card .gk-flag{width:132px;height:auto;aspect-ratio:4/3;object-fit:contain;border-radius:6px;box-shadow:0 0 0 1px rgba(0,0,0,.1);background:#f5f5f7;margin-bottom:10px}
.gk-card h2{font-size:26px;margin:0;line-height:1.25}
.gk-card .en{font-size:14px;color:var(--sub);margin-bottom:10px}
.gk-card dl{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin:0 0 10px;font-size:16px}
.gk-card dt{color:var(--sub)}.gk-card dd{margin:0;font-weight:600}
.gk-card .fact{background:#f1f8f3;border-radius:12px;padding:10px 12px;font-size:15.5px;line-height:1.55;margin:0 0 10px}
.gk-card .cnote{font-size:14px;color:var(--sub);line-height:1.5;margin:-4px 0 10px}
.gk-card .hint{color:var(--sub);font-size:15.5px;line-height:1.6;margin:0}
.gk-say{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;border-top:1px solid var(--line);padding-top:10px;margin-top:4px}
.gk-say b{font-size:22px}
.gk-sbtn{border:1px solid #d2d2d7;background:#fff;border-radius:999px;min-height:40px;padding:6px 14px;font-size:15px;font-weight:600;cursor:pointer;color:var(--ink)}
.gk-sbtn:hover{border-color:var(--gk)}
.gk-sbtn.on{background:#e6f4ea;border-color:var(--gk)}
.gk-snote{font-size:13.5px;color:var(--sub);width:100%}
.gk-gamebar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 12px;background:#e6f4ea;border-radius:16px;padding:10px 14px;margin-bottom:10px;font-size:17px;min-height:60px}
.gk-gamebar b.tg{font-size:23px;color:#14532d}
.gk-gamebar .sc{font-size:15px;color:#1e7e34;font-weight:700;white-space:nowrap}
.gk-gamebar .btn{min-height:40px;padding:8px 16px;font-size:15px}
/* 짝 맞추기 */
.gk-mem{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:640px;margin:0 auto}
@media (max-width:560px){.gk-mem{grid-template-columns:repeat(3,1fr);gap:8px}}
.gk-mc{position:relative;height:104px;border:0;background:none;padding:0;cursor:pointer;perspective:700px;font:inherit;color:inherit}
.gk-mc .in{position:absolute;inset:0;transition:transform .45s;transform-style:preserve-3d}
.gk-mc.flip .in,.gk-mc.done .in{transform:rotateY(180deg)}
.gk-mc .fa{position:absolute;inset:0;border-radius:14px;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px}
.gk-mc .bk{background:linear-gradient(135deg,#5fc27e,#2e9d63);color:#fff;font-size:30px;font-weight:800;box-shadow:0 3px 0 #1e7e34}
.gk-mc .fr{background:#fff;transform:rotateY(180deg);box-shadow:0 0 0 1.5px #d2d2d7;font-size:15px;font-weight:700;line-height:1.25;text-align:center;word-break:break-all}
.gk-mc .fr img{width:44px;height:33px;object-fit:contain;border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,.1)}
.gk-mc .fr small{font-size:12px;color:#0071e3;font-weight:700}
.gk-mc.cap .fr{background:#f2f7ff}
.gk-mc.done .fr{box-shadow:0 0 0 2px var(--gk);background:#e6f4ea}
.gk-mc.miss .fr{box-shadow:0 0 0 2px #f28b82}
.gk-memtop{display:flex;justify-content:space-between;max-width:640px;margin:0 auto 10px;font-size:15px;font-weight:600;color:var(--sub)}
.gk-pairs{max-width:640px;margin:14px auto 0;font-size:15px}
.gk-pairs li{margin:3px 0}
/* 산·강 */
.gk-sil{display:block;width:100%;height:auto;margin:0 0 14px;border-radius:16px;background:linear-gradient(#e7f3ff,#f7fbff)}
.gk-sil .m{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.gk-sil.on .m{transform:scaleY(1)}
.gk-sil text{font-size:13px;font-weight:700;fill:#1d1d1f}
.gk-rows{display:flex;flex-direction:column;gap:14px}
.gk-r{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 10px;align-items:baseline}
.gk-r .nm{font-weight:700;font-size:16px}
.gk-r .nm em{font-style:normal;display:inline-grid;place-items:center;min-width:22px;height:22px;border-radius:50%;background:#1d1d1f;color:#fff;font-size:12.5px;margin-right:6px;vertical-align:1px}
.gk-r .wh{font-size:14px;color:var(--sub);font-weight:400;margin-left:4px}
.gk-r .val{font-weight:700;font-size:16px;font-variant-numeric:tabular-nums;white-space:nowrap}
.gk-r .bar{grid-column:1/-1;height:16px;background:#eef0f3;border-radius:99px;overflow:hidden}
.gk-r .bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#a7d8b5,#34a853);transition:width 1s cubic-bezier(.2,.8,.2,1)}
.gk-r.kr .bar i{background:linear-gradient(90deg,#a8c7fa,#1a73e8)}
.gk-r.ref .bar i{background:linear-gradient(90deg,#e0e0e0,#9aa0a6)}
.gk-r .tag{font-size:12px;font-weight:700;background:#f1f3f4;color:#5f6368;border-radius:99px;padding:1px 8px;margin-left:6px;vertical-align:1px}
.gk-r .nt{grid-column:1/-1;font-size:14px;color:var(--sub);margin-top:-1px}
.gk-r.river .bar i{background:linear-gradient(90deg,#9fd3f5,#1e88e5)}
.gk-r.river.kr .bar i{background:linear-gradient(90deg,#b4e6d4,#12a37a)}
/* 모스 */
.gk-morse .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.gk-morse input[type=text]{flex:1;min-width:0;font-size:20px;letter-spacing:.06em;text-transform:uppercase}
.gk-light{width:64px;height:64px;border-radius:50%;background:#3a3a3c;flex:none;box-shadow:inset 0 -4px 8px rgba(0,0,0,.35);transition:background .03s,box-shadow .03s}
.gk-light.on{background:#ffd60a;box-shadow:0 0 26px 6px rgba(255,214,10,.65)}
.gk-code{display:flex;flex-wrap:wrap;gap:8px 10px;margin:14px 0 4px;min-height:58px}
.gk-lt{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 8px;border-radius:12px;background:var(--bg2);min-width:42px}
.gk-lt.on{background:#ffe680}
.gk-lt b{font-size:20px;line-height:1}
.gk-lt.sp{background:none;min-width:14px}
.gk-sym{display:inline-flex;gap:4px;align-items:center;height:12px}
.gk-dot{width:9px;height:9px;border-radius:50%;background:currentColor;display:inline-block}
.gk-dash{width:24px;height:9px;border-radius:5px;background:currentColor;display:inline-block}
.gk-tbl{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px}
.gk-tbl button{display:flex;flex-direction:column;align-items:center;gap:6px;background:#fff;border:1px solid #d2d2d7;border-radius:14px;padding:10px 4px;min-height:64px;cursor:pointer;color:var(--ink)}
.gk-tbl button b{font-size:20px;line-height:1}
.gk-tbl button:hover{border-color:#5e5ce6}
.gk-tbl button.on{background:#ffe680;border-color:#e0b400}
.gk-keywrap{display:flex;flex-direction:column;align-items:center;gap:12px}
.gk-key{width:150px;height:150px;border-radius:50%;border:0;background:radial-gradient(circle at 40% 35%,#7b79ff,#5e5ce6 60%,#4543c4);color:#fff;font-size:19px;font-weight:800;box-shadow:0 8px 0 #3634a3,0 12px 20px rgba(0,0,0,.18);cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;transition:transform .05s,box-shadow .05s}
.gk-key.down{transform:translateY(6px);box-shadow:0 2px 0 #3634a3,0 4px 8px rgba(0,0,0,.18)}
.gk-buf{font-size:30px;min-height:44px;display:flex;gap:6px;align-items:center;justify-content:center}
.gk-out{font-size:30px;font-weight:800;letter-spacing:.1em;min-height:58px;word-break:break-all;background:var(--bg2);border-radius:14px;padding:8px 14px;text-align:center;width:100%}
.gk-replay{margin-top:10px}
/* 퀴즈 고르기 */
.gk-cats{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:4px 0 14px}
.gk-cats button{border:1.5px solid #d2d2d7;background:#fff;border-radius:999px;min-height:44px;padding:8px 16px;font-size:16px;font-weight:600;cursor:pointer;color:var(--ink)}
.gk-cats button[aria-pressed=true]{background:#1d1d1f;border-color:#1d1d1f;color:#fff}
.gk-cats button span{font-weight:400;opacity:.7;margin-left:4px;font-size:14px}
/* 카드 목록 */
.gk-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.gk-c{background:#fff;border-radius:18px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.035);padding:16px}
.gk-c .top{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.gk-c .top img{width:48px;height:36px;object-fit:contain;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.1);background:#f5f5f7}
.gk-c .top b{font-size:17px;line-height:1.3}
.gk-c .top small{display:block;font-size:13px;color:var(--sub);font-weight:400}
.gk-c .big{font-size:26px;font-weight:800;line-height:1.3;margin:2px 0 10px;word-break:keep-all}
.gk-c .chip{display:inline-block;font-size:12.5px;font-weight:700;border-radius:99px;padding:2px 9px;background:#e8f0fe;color:#1a73e8}
.gk-kr .big{margin:6px 0 2px;font-size:21px}
@media (max-width:560px){.gk-kr{grid-template-columns:1fr 1fr;gap:8px}.gk-kr .gk-c{padding:12px}.gk-kr .big{font-size:17px}.gk-kr .seat b{font-size:17px}}
.gk-c .seat{font-size:15px;margin-top:6px}
.gk-c .seat b{font-size:19px}
/* 우주 */
.gk-space{background:radial-gradient(ellipse at 30% 0,#1d2c5c,#0b1430 70%);border-radius:22px;padding:12px 10px;overflow:hidden}
.gk-space svg{display:block;width:100%;height:auto}
.gk-space text{fill:#fff;font-size:14px;font-weight:700}
.gk-space text.s{fill:#c9d4ff;font-size:12.5px;font-weight:500}
.gk-space .pl{transform-box:fill-box;transform-origin:50% 50%;transform:scale(0);transition:transform .7s cubic-bezier(.2,1.3,.4,1)}
.gk-space.on .pl{transform:scale(1)}
.gk-space .pl{cursor:pointer}
.gk-space .pl.sel circle.b{stroke:#ffd60a;stroke-width:3}
.gk-ctrl{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:center;margin-bottom:12px}
.gk-ctrl .seg{margin:0}
.gk .seg.sm{width:max-content!important}.gk .seg.sm .f{flex:none;padding:6px 16px}
.gk-tog{border:1.5px solid #d2d2d7;background:#fff;border-radius:999px;min-height:42px;padding:6px 16px;font-size:15px;font-weight:600;cursor:pointer;color:var(--ink)}
.gk-tog[aria-pressed=true]{background:#fff4d6;border-color:#f2b600}
.gk-info{margin-top:12px}
/* 공룡 */
.gk-tl{display:flex;height:60px;border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.06)}
.gk-tl div{display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px;text-align:center;padding:0 4px;min-width:0;line-height:1.2}
.gk-tlx{display:flex;justify-content:space-between;font-size:13px;color:var(--sub);margin-top:6px;gap:8px}
.gk-ast{display:flex;align-items:center;justify-content:flex-end;gap:8px;font-size:14.5px;font-weight:700;color:#b3261e;margin-top:6px;text-align:right}
.gk-ast svg{flex:none}
.gk-eras{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:18px}
.gk-era{border-radius:18px;padding:16px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.06);border-top:6px solid}
.gk-era h3{font-size:20px;margin:0 0 2px}
.gk-era .yr{font-size:14px;color:var(--sub);margin-bottom:8px;line-height:1.5}
.gk-era .ds{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.gk-era .ds span{font-size:15px;font-weight:600;background:var(--bg2);border-radius:99px;padding:3px 11px}
.gk-era p{font-size:15px;line-height:1.55;margin:0;color:#333}
/* 시계 */
.gk-clocks{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.gk-clk{display:flex;gap:14px;align-items:center;background:#fff;border-radius:18px;padding:14px 16px;box-shadow:0 0 0 1px rgba(0,0,0,.06)}
.gk-clk.night{background:#f1f3fb}
.gk-clk.home{box-shadow:0 0 0 2px var(--gk)}
.gk-clk svg.face{flex:none}
.gk-clk .ct{font-size:18px;font-weight:800;line-height:1.25}
.gk-clk .ct small{font-size:13px;color:var(--sub);font-weight:500;margin-left:4px}
.gk-clk .tm{font-size:26px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em;line-height:1.25}
.gk-clk .dd{font-size:14px;color:var(--sub);line-height:1.45}
.gk-clk .df{font-size:14px;font-weight:700;color:#00838f}
/* 별자리 */
.gk .seg.big .f{min-height:44px;font-size:15px;font-weight:600}
.gk-sky{position:relative;background:radial-gradient(ellipse at 50% 0,#1d2c62,#080e26 75%);border-radius:22px;overflow:hidden}
.gk-sky svg{display:block;width:100%;height:auto;-webkit-tap-highlight-color:transparent}
.gk-sky .ln{fill:none;stroke:#8fb0ff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.2s ease-out}
.gk-sky.on .ln{stroke-dashoffset:0}
.gk-sky.st .ln{stroke-dasharray:none;transition:none}
.gk-sky .hit{fill:none;stroke:transparent;stroke-width:24;stroke-linecap:round;stroke-linejoin:round;pointer-events:stroke}
.gk-sky .hitc{fill:transparent}
.gk-sky .cn{cursor:pointer;outline:none}
.gk-sky .cn.sel .ln{stroke:#fff;stroke-width:3.2;filter:drop-shadow(0 0 4px #9fc2ff)}
.gk-sky .cn:focus-visible .ln{stroke:#fff;stroke-width:3}
.gk-sky text{paint-order:stroke;stroke:#0a1230;stroke-linejoin:round;pointer-events:none}
.gk-sky .cl{fill:#d6e2ff;font-size:14.5px;font-weight:800;stroke-width:4px}
.gk-sky .cn.sel .cl{fill:#fff;font-size:16px}
.gk-sky .sn{fill:#ffe9a8;font-size:12.5px;font-weight:700;stroke-width:3px}
.gk-sky .cmp{fill:#9fb0d9;font-size:12.5px;font-weight:700;stroke-width:0}
.gk-sky path.shp{fill:none}
.gk-sky .shp{fill:rgba(255,200,40,.13);stroke:#ffd60a;stroke-width:2.6;stroke-dasharray:7 6;stroke-linejoin:round;opacity:0;transition:opacity .6s 1.4s;pointer-events:none}
.gk-sky.on .shp{opacity:.95}
.gk-sky .lb{fill:none;stroke:#8fb0ff;stroke-width:1.6;opacity:.3;stroke-linecap:round;stroke-linejoin:round}
.gk-sky .hl{fill:none;stroke:#ffd60a;stroke-width:2.8;stroke-linecap:round;stroke-linejoin:round}
.gk-sky .gd{fill:none;stroke:#6ff0c3;stroke-width:2.4;stroke-linecap:round}
.gk-sky .gd.dash{stroke-dasharray:6 6}
.gk-sky .tk{fill:#6ff0c3}
.gk-sky .tkt{fill:#b9ffe6;font-size:12px;font-weight:800;stroke-width:3px}
.gk-sky .ring{fill:none;stroke:#ffd60a;stroke-width:2.2}
.gk-sky .ring.g{stroke:#6ff0c3}
.gk-sky .pol{fill:#fff;filter:drop-shadow(0 0 6px #ffd60a)}
.gk-sky .big{font-size:16px;fill:#ffd60a;font-weight:800;stroke-width:4px}
.gk-sky .nw{stroke-dasharray:1;animation:gkdraw 1.1s ease-out both}
.gk-sky .nw.slow{animation-duration:1.8s}
.gk-sky .fd{animation:gkfade .5s ease-out both}
@keyframes gkdraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes gkfade{from{opacity:0}to{opacity:1}}
.gk-stchips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 0}
.gk-stchips button{border:1.5px solid #d2d2d7;background:#fff;border-radius:999px;min-height:44px;padding:8px 16px;font-size:16px;font-weight:600;cursor:pointer;color:var(--ink)}
.gk-stchips button[aria-pressed=true]{background:#1d1d1f;border-color:#1d1d1f;color:#fff}
.gk-shape{display:flex;gap:10px;align-items:flex-start;background:#fff8dc;border-radius:16px;padding:12px 14px;margin:12px 0 0;font-size:15.5px;line-height:1.6}
.gk-shape i{flex:none;width:26px;height:0;border-top:3px dashed #e0a800;margin-top:12px}
.gk-shape b{display:block;font-size:17px}
.gk-schip{display:inline-block;font-size:13px;font-weight:700;border-radius:99px;padding:2px 10px;background:#efeafd;color:#5b3cc4;white-space:nowrap}
.gk-schip.spring{background:#fde7ef;color:#b0245c}.gk-schip.summer{background:#e6f4ea;color:#1e7e34}.gk-schip.autumn{background:#fff1e0;color:#a35300}.gk-schip.winter{background:#e8f0fe;color:#1a57c7}.gk-schip.south{background:#f1f3f4;color:#5f6368}
.gk-stinfo{display:grid;grid-template-columns:170px minmax(0,1fr);gap:16px;align-items:start}
.gk-stinfo .mini{background:#0d1736;border-radius:16px;overflow:hidden}
.gk-stinfo .mini svg{display:block;width:100%;height:auto}
.gk-stinfo h2{font-size:26px;margin:0;line-height:1.25}
.gk-stinfo .en{font-size:14px;color:var(--sub);margin:2px 0 8px}
.gk-stinfo dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 14px;margin:12px 0 10px;font-size:16px;line-height:1.5}
.gk-stinfo dt{color:var(--sub)}.gk-stinfo dd{margin:0;font-weight:600}
.gk-stinfo dd span{font-weight:400;color:var(--sub)}
.gk-stinfo .fact{background:#f3effd;border-radius:12px;padding:10px 12px;font-size:15.5px;line-height:1.6;margin:0}
@media (max-width:560px){.gk-stinfo{grid-template-columns:1fr}.gk-stinfo .mini{max-width:220px}}
.gk-steps{max-width:760px;margin:12px auto 0}
.gk-steps .no{font-size:14px;font-weight:700;color:#5b3cc4}
.gk-steps p.tx{font-size:17.5px;line-height:1.6;margin:4px 0 12px;min-height:3.2em;font-weight:600}
.gk-steps .gk-btns{justify-content:space-between;margin-top:0}
.gk-steps .btn{min-height:48px;min-width:120px}
.gk-nwrap{max-width:760px;margin:0 auto}
.gk-stcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
.gk-stc{display:flex;flex-direction:column;gap:4px;text-align:left;background:#fff;border:0;border-radius:18px;padding:10px 10px 12px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.035);cursor:pointer;color:var(--ink);font:inherit;transition:transform .15s,box-shadow .15s}
.gk-stc:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(0,0,0,.07),0 10px 26px rgba(0,0,0,.09)}
.gk-stc .mini{background:#0d1736;border-radius:12px;overflow:hidden;margin-bottom:4px}
.gk-stc .mini svg{display:block;width:100%;height:auto}
.gk-stc b{font-size:17px;line-height:1.3;word-break:keep-all}
.gk-stc .st{font-size:14px;color:var(--sub);line-height:1.4}
@media (max-width:560px){.gk-stcards{grid-template-columns:1fr 1fr;gap:10px}}
.gk-modal{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px}
.gk-modal .box{position:relative;background:#fff;border-radius:22px;padding:22px 20px 20px;max-width:620px;width:100%;max-height:calc(100vh - 32px);overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.gk-modal .x{position:absolute;right:10px;top:10px;width:44px;height:44px;border-radius:50%;border:0;background:var(--bg2);font-size:24px;line-height:1;cursor:pointer;color:var(--ink)}
.gk-modal .box h2{padding-right:44px}
.gk-qsky{background:#0d1736;border-radius:16px;overflow:hidden;max-width:300px;margin:12px auto 0}
.gk-qsky svg{display:block;width:100%;height:auto}
@media (prefers-reduced-motion:reduce){.gk-sky .ln,.gk-sky .shp,.gk-stc{transition:none!important}.gk-sky .nw,.gk-sky .fd{animation:none!important}.gk-stc:hover{transform:none}}
@media (prefers-reduced-motion:reduce){.gk-tile,.gk-mc .in,.gk-sil .m,.gk-r .bar i,.gk-space .pl,.gk-prog i{transition:none!important}.gk-map path.ans{animation:none}.gk-tile:hover{transform:none}}
`;
function injectCss() { if (document.getElementById('gk-css')) return; const s = document.createElement('style'); s.id = 'gk-css'; s.textContent = CSS; document.head.appendChild(s); }

/* ---------- 공통 틀 ---------- */
function shell(app, id, extra) {
  const a = ACT[id];
  document.title = `${a.t} · 상식 놀이터 · DNA Kids Lab`;
  app.innerHTML = `<div class="gk ${extra || ''}"><a class="gk-back" href="#/gk">‹ 상식 놀이터</a>
    <div class="gk-head"><span class="gk-ic" style="background:${a.c}1a;color:${a.c}">${ic(id)}</span><div><h1>${a.t}</h1><p>${a.d}</p></div></div>
    <div class="gk-body"><p class="gk-err">불러오는 중…</p></div></div>`;
  return app.querySelector('.gk-body');
}
function fail(body) { body.innerHTML = `<p class="gk-err">자료를 준비하고 있어요. 잠시 뒤에 다시 와 주세요.<br><button class="btn ghost" type="button" style="margin-top:12px">다시 불러오기</button></p>`; body.querySelector('button').onclick = () => GK.render(document.getElementById('app'), currentSub); }
function segHtml(name, opts, cur) {
  return `<div class="seg" role="group" aria-label="${E(name)}">${opts.map(([v, l]) => `<button type="button" class="f" data-v="${E(v)}" aria-pressed="${v === cur}">${l}</button>`).join('')}</div>`;
}
function bindSeg(root, sel, fn) {
  const seg = typeof sel === 'string' ? root.querySelector(sel) : sel;
  seg.querySelectorAll('.f').forEach(b => b.onclick = () => { seg.querySelectorAll('.f').forEach(x => x.setAttribute('aria-pressed', x === b)); fn(b.dataset.v); });
}
const later = (fn, ms) => { const t = setTimeout(fn, ms); onLeave(() => clearTimeout(t)); return t; };

/* ---------- 객관식 문제 풀기 (공통) ----------
   qs: [{ q:html, choices:[{html, ok, label}], answer:'정답 글자', explain:html, cls, onShow(box) }] */
function runQuiz(box, qs, o) {
  let i = 0, right = 0; const n = qs.length;
  const show = () => {
    const Q = qs[i];
    box.innerHTML = `<div class="gk-quiz gk-panel"><div class="gk-qtop"><span>${i + 1} / ${n}</span><span>맞힌 문제 <b>${right}</b></span></div><div class="gk-prog" aria-hidden="true"><i style="width:${i / n * 100}%"></i></div>
      <div class="gk-q">${Q.q}</div><div class="gk-ch ${Q.cls || ''}">${Q.choices.map((c, k) => `<button type="button" data-k="${k}"${c.label ? ` aria-label="${E(c.label)}"` : ''}>${c.html}</button>`).join('')}</div><div class="gk-fb" role="status"></div></div>`;
    const bs = [...box.querySelectorAll('.gk-ch button')];
    bs.forEach(b => b.onclick = () => {
      const k = +b.dataset.k, ok = !!Q.choices[k].ok;
      bs.forEach((x, j) => { x.disabled = true; if (Q.choices[j].ok) x.classList.add('right'); });
      if (ok) right++; else b.classList.add('wrong');
      sfx2(ok ? 'right' : 'wrong');
      const fb = box.querySelector('.gk-fb');
      const ans = Q.answer || '';
      fb.innerHTML = `<p class="gk-verdict ${ok ? 'ok' : 'no'}">${ok ? pick(['딩동댕! 맞았어요.', '정답이에요!', '훌륭해요! 맞았어요.']) : `아쉬워요. 정답: <b>${E(ans)}</b>`}</p>${Q.explain ? `<p class="gk-explain">${Q.explain}</p>` : ''}<button class="btn gk-next" type="button">${i + 1 < n ? '다음 문제 ›' : '결과 보기'}</button>`;
      box.querySelector('.gk-qtop b').textContent = right;
      const nb = fb.querySelector('.gk-next');
      nb.onclick = () => { if (o.onNext) o.onNext(); i++; if (i < n) { show(); box.scrollIntoView({ block: 'nearest' }); } else done(); };
      nb.focus({ preventScroll: true });
      try { fb.scrollIntoView({ block: 'nearest', behavior: RM() ? 'auto' : 'smooth' }); } catch (e) {}
      if (Q.after) Q.after(ok, box);
    });
    if (Q.onShow) Q.onShow(box);
  };
  const done = () => {
    const r = n ? right / n : 0;
    const msg = r >= 1 ? '하나도 안 틀렸어요. 상식 박사예요!' : r >= .7 ? '아주 잘했어요! 조금만 더 하면 100점이에요.' : r >= .4 ? '좋아요! 한 번 더 하면 더 많이 맞힐 수 있어요.' : '괜찮아요. 다시 하면서 하나씩 알아 가요.';
    box.innerHTML = `<div class="gk-result gk-panel"><img src="assets/img/didi/cheer.webp" alt="응원하는 디디" width="150" height="150"><h2>${n}문제 중 ${right}문제 맞혔어요!</h2><p class="sub">${msg}</p>
      <div class="gk-btns"><button class="btn" type="button" data-a="again">다시 하기</button>${o.back ? `<button class="btn ghost" type="button" data-a="back">${o.backLabel || '처음으로'}</button>` : ''}</div></div>`;
    box.querySelector('[data-a=again]').onclick = () => o.retry();
    const bk = box.querySelector('[data-a=back]'); if (bk) bk.onclick = () => o.back();
    rec(o.ref, o.title, right, n);
    try { if (typeof didiCelebrate === 'function') didiCelebrate(right, n, { onRetry: o.retry }); } catch (e) {}
    box.scrollIntoView({ block: 'nearest' });
  };
  show();
}
// 정답 + 오답 3개(같은 값 빼고) 섞기
function choicesFrom(correct, pool, key, n = 4) {
  const used = new Set([key(correct)]); const out = [correct];
  for (const x of shuffle(pool)) { if (out.length >= n) break; const k = key(x); if (!used.has(k)) { used.add(k); out.push(x); } }
  return shuffle(out);
}

/* ---------- 음성 (인사말) ---------- */
let voicesReady = null;
function getVoices() {
  if (!window.speechSynthesis) return Promise.resolve([]);
  const v = speechSynthesis.getVoices(); if (v.length) return Promise.resolve(v);
  return voicesReady || (voicesReady = new Promise(r => { const t = setTimeout(() => r(speechSynthesis.getVoices()), 1200); speechSynthesis.addEventListener('voiceschanged', () => { clearTimeout(t); r(speechSynthesis.getVoices()); }, { once: true }); }));
}
let langNames = null;
function langName(code) {
  try { langNames = langNames || new Intl.DisplayNames(['ko'], { type: 'language' }); const n = langNames.of(code.split('-')[0]); return n || code; } catch (e) { return code; }
}
async function speak(text, lang, btn, noteEl) {
  const say = m => { if (noteEl) noteEl.textContent = m; else toast2(m); };
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) { say('이 기기에서는 소리로 들려줄 수 없어요. 글자를 보며 따라 말해 봐요.'); return; }
  const vs = await getVoices();
  const L = (lang || '').toLowerCase(), base = L.split('-')[0];
  const norm = v => (v.lang || '').replace('_', '-').toLowerCase();
  const voice = vs.find(v => norm(v) === L) || vs.find(v => norm(v).split('-')[0] === base);
  if (vs.length && !voice) { say(`이 기기에는 ${langName(lang)} 목소리가 없어요. 글자를 보며 따라 말해 봐요.`); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = lang; if (voice) u.voice = voice; u.rate = .85;
  if (btn) { btn.classList.add('on'); u.onend = u.onerror = () => btn.classList.remove('on'); }
  if (noteEl) noteEl.textContent = '';
  speechSynthesis.speak(u);
}
const greetHtml = c => c.greet ? `<div class="gk-say"><b lang="${E(c.greet.lang)}">${E(c.greet.text)}</b><button type="button" class="gk-sbtn" data-gsay="${E(c.iso2)}">🔊 들어 보기</button><span class="gk-snote" aria-live="polite"></span><span class="gk-snote" style="margin-top:-6px">${E(langName(c.greet.lang))}로 하는 "안녕하세요"</span></div>` : '';
function bindSay(root, byIso) {
  root.querySelectorAll('[data-gsay]').forEach(b => b.onclick = () => { const c = byIso[b.dataset.gsay]; if (c && c.greet) speak(c.greet.text, c.greet.lang, b, b.parentElement.querySelector('.gk-snote')); });
}

/* =================== 1. 홈 =================== */
function viewHome(app) {
  document.title = '상식 놀이터 · DNA Kids Lab';
  app.innerHTML = `<div class="gk"><section class="gk-hero"><span class="gk-kick">상식 놀이터</span><h1>세계 상식 놀이</h1><p>지도·국기·모스부호·행성·공룡까지, 놀면서 세상을 알아 가요.</p></section>
  <div class="gk-grid">${ACTS.map(a => `<a class="gk-tile" href="${a.href || '#/gk/' + a.id}"><span class="gk-ic" style="background:${a.c}1a;color:${a.c}">${ic(a.id, 30)}</span><b>${a.t}</b><span>${a.d}</span></a>`).join('')}</div></div>`;
}

/* =================== 2. 세계지도 =================== */
const CONTS = ['아시아', '유럽', '아프리카', '북아메리카', '남아메리카', '오세아니아'];
const CONT_COL = ['#ffd8a8', '#c5dcff', '#ffe98f', '#c9ebc1', '#f7c8de', '#d9ccf4'];
async function viewMap(app) {
  const body = shell(app, 'map', 'gk-wide');
  let cs, svgTxt;
  try { [cs, svgTxt] = await Promise.all([data('countries'), worldText()]); } catch (e) { return fail(body); }
  const byIso = Object.fromEntries(cs.map(c => [c.iso2, c]));
  body.innerHTML = `${segHtml('놀이 방법', [['explore', '둘러보기'], ['game', '어디일까요? 게임']], 'explore')}
  <div class="gk-mapgrid"><div>
    <div class="gk-gamebar" hidden></div>
    <div class="gk-map" tabindex="0" aria-label="세계지도. 나라를 누르면 정보가 나와요.">${svgTxt.replace(/<\?xml[^>]*>/, '')}<div class="gk-zoom"><button type="button" data-z="in" aria-label="지도 크게">+</button><button type="button" data-z="out" aria-label="지도 작게">−</button><button type="button" data-z="reset" aria-label="처음 크기로" style="font-size:15px">처음</button></div></div>
    <div class="gk-legend">${CONTS.map((c, k) => `<span><i style="background:${CONT_COL[k]}"></i>${c}</span>`).join('')}</div>
    <label class="gk-find">나라 찾기 <select><option value="">나라를 골라요</option>${CONTS.map(ct => `<optgroup label="${ct}">${cs.filter(c => c.cont === ct).sort((a, b) => a.ko.localeCompare(b.ko, 'ko')).map(c => `<option value="${c.iso2}">${E(c.ko)}</option>`).join('')}</optgroup>`).join('')}</select></label>
  </div><aside class="gk-card" aria-live="polite"><p class="hint">지도에서 나라를 눌러 보세요. 국기와 수도, 그 나라 말 인사가 나와요.<br><br>작은 나라는 <b>+</b> 단추나 두 손가락(마우스 휠)으로 지도를 크게 해서 눌러요.</p></aside></div>`;
  const wrap = body.querySelector('.gk-map'), svg = wrap.querySelector('svg'), card = body.querySelector('.gk-card'), bar = body.querySelector('.gk-gamebar');
  if (!svg) return fail(body);
  svg.removeAttribute('width'); svg.removeAttribute('height'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); svg.setAttribute('aria-hidden', 'true');
  const vb0 = (svg.getAttribute('viewBox') || '0 0 960 500').split(/[\s,]+/).map(Number);
  const B = { x: vb0[0], y: vb0[1], w: vb0[2], h: vb0[3] };
  wrap.style.aspectRatio = `${B.w} / ${B.h}`;
  const paths = {};
  svg.querySelectorAll('path').forEach(p => {
    p.removeAttribute('fill'); p.removeAttribute('style');
    const iso = (p.getAttribute('data-iso2') || '').toLowerCase(); const c = byIso[iso];
    if (c) { p.dataset.k = iso; p.classList.add('k' + (CONTS.indexOf(c.cont) + 1)); (paths[iso] = paths[iso] || []).push(p); }
  });
  // 보기 영역(viewBox) 다루기
  let vb = { ...B };
  const minW = B.w / 14;
  const apply = () => {
    vb.w = Math.max(minW, Math.min(B.w, vb.w)); vb.h = vb.w * B.h / B.w;
    vb.x = Math.max(B.x, Math.min(B.x + B.w - vb.w, vb.x)); vb.y = Math.max(B.y, Math.min(B.y + B.h - vb.h, vb.y));
    svg.setAttribute('viewBox', `${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${vb.h.toFixed(2)}`);
    wrap.classList.toggle('zoomed', vb.w < B.w - .5);
  };
  const toSvg = (cx, cy) => { const r = svg.getBoundingClientRect(); return { x: vb.x + (cx - r.left) / r.width * vb.w, y: vb.y + (cy - r.top) / r.height * vb.h }; };
  const zoomAt = (f, px, py) => { const nw = Math.max(minW, Math.min(B.w, vb.w / f)); const k = nw / vb.w; vb.x = px - (px - vb.x) * k; vb.y = py - (py - vb.y) * k; vb.w = nw; apply(); };
  let animId = 0;
  const animateTo = t => {
    const id = ++animId; const s = { ...vb };
    if (RM()) { vb = { ...t }; apply(); return; }
    const t0 = performance.now();
    const step = now => { if (id !== animId) return; const p = Math.min(1, (now - t0) / 450), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      vb = { x: s.x + (t.x - s.x) * e, y: s.y + (t.y - s.y) * e, w: s.w + (t.w - s.w) * e, h: 0 }; apply(); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const bboxOf = iso => { let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity; (paths[iso] || []).forEach(p => { const b = p.getBBox(); x1 = Math.min(x1, b.x); y1 = Math.min(y1, b.y); x2 = Math.max(x2, b.x + b.width); y2 = Math.max(y2, b.y + b.height); }); return x1 === Infinity ? null : { x: x1, y: y1, w: x2 - x1, h: y2 - y1 }; };
  const focusOn = (iso, pad = 3.2) => { const b = bboxOf(iso); if (!b) return; const w = Math.max(minW * 1.6, b.w * pad, b.h * pad * B.w / B.h); animateTo({ x: b.x + b.w / 2 - w / 2, y: b.y + b.h / 2 - w * B.h / B.w / 2, w }); };
  wrap.querySelector('.gk-zoom').onclick = e => { const z = e.target.closest('button'); if (!z) return; animId++; const c = { x: vb.x + vb.w / 2, y: vb.y + vb.h / 2 };
    if (z.dataset.z === 'in') zoomAt(1.6, c.x, c.y); else if (z.dataset.z === 'out') zoomAt(1 / 1.6, c.x, c.y); else animateTo({ ...B }); };
  wrap.addEventListener('wheel', e => { e.preventDefault(); animId++; const p = toSvg(e.clientX, e.clientY); zoomAt(Math.exp(-e.deltaY * .0022), p.x, p.y); }, { passive: false });
  // 손가락·마우스: 끌기(이동), 두 손가락(확대), 짧게 누르기(선택)
  const pts = new Map(); let gest = null;
  svg.addEventListener('pointerdown', e => {
    if (e.target.closest && e.target.closest('.gk-zoom')) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now() });
    try { svg.setPointerCapture(e.pointerId); } catch (er) {}
    if (pts.size === 2) { const [a, b] = [...pts.values()]; gest = { d: Math.hypot(a.x - b.x, a.y - b.y), moved: true }; }
    else if (pts.size === 1) gest = { moved: false };
  });
  svg.addEventListener('pointermove', e => {
    const p = pts.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
    if (pts.size === 2 && gest) {
      const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (gest.d > 0) { const m = toSvg((a.x + b.x) / 2, (a.y + b.y) / 2); animId++; zoomAt(d / gest.d, m.x, m.y); }
      gest.d = d; return;
    }
    if (Math.hypot(e.clientX - p.sx, e.clientY - p.sy) > 7 && gest) gest.moved = true;
    if (gest && gest.moved && vb.w < B.w - .5) { const r = svg.getBoundingClientRect(); animId++; vb.x -= dx / r.width * vb.w; vb.y -= dy / r.height * vb.h; apply(); }
  });
  const up = e => {
    const p = pts.get(e.pointerId); if (!p) return; pts.delete(e.pointerId);
    if (e.type === 'pointerup' && pts.size === 0 && gest && !gest.moved) {
      const el = document.elementFromPoint(e.clientX, e.clientY); const path = el && el.closest && el.closest('path[data-k]');
      if (path) tap(path.dataset.k);
    }
    if (pts.size === 0) gest = null; else if (gest) gest.moved = true;
  };
  svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
  apply();

  const clear = cls => svg.querySelectorAll('path.' + cls).forEach(p => p.classList.remove(cls));
  const mark = (iso, cls) => (paths[iso] || []).forEach(p => { p.classList.add(cls); p.parentNode.appendChild(p); });
  const infoHtml = c => `<img class="gk-flag" src="${flagSrc(c.iso2)}" alt="${E(c.ko)} 국기" width="132" height="99"><h2>${E(c.ko)}</h2><div class="en">${E(c.en || '')}</div>
    <dl><dt>수도</dt><dd>${E(c.capital)}</dd><dt>대륙</dt><dd>${E(c.cont)}</dd></dl>${c.capitalNote ? `<p class="cnote">수도: ${E(c.capitalNote)}</p>` : ''}${c.fact ? `<p class="fact">${E(c.fact)}</p>` : ''}${greetHtml(c)}`;
  const showInfo = (iso, lead) => { const c = byIso[iso]; if (!c) return; card.innerHTML = (lead || '') + infoHtml(c); bindSay(card, byIso); };

  let mode = 'explore', game = null;
  const tap = iso => {
    if (mode === 'explore') { clear('sel'); mark(iso, 'sel'); showInfo(iso); if (matchMedia('(max-width:900px)').matches) card.scrollIntoView({ block: 'nearest', behavior: RM() ? 'auto' : 'smooth' }); return; }
    if (!game || game.locked) return;
    game.locked = true; const t = game.list[game.i]; const ok = iso === t.iso2;
    if (ok) { game.right++; mark(iso, 'ok'); sfx2('right'); }
    else { mark(iso, 'bad'); mark(t.iso2, 'ans'); sfx2('wrong'); focusOn(t.iso2, 5); }
    showInfo(t.iso2, `<p class="gk-verdict ${ok ? 'ok' : 'no'}" style="margin:0 0 10px">${ok ? '딩동댕! 맞았어요.' : `아쉬워요. 초록색으로 깜빡이는 곳이 ${E(eunnun(t.ko))} 여기예요.`}</p>`);
    drawBar(true);
  };
  // 게임: 지도에서 잘 보이는(너무 작지 않은) 나라만
  const gamePool = () => {
    const ok = cs.filter(c => paths[c.iso2]).map(c => ({ c, b: bboxOf(c.iso2) })).filter(x => x.b && x.b.w * x.b.h > B.w * B.h / 2400);
    const easy = ok.filter(x => x.c.level <= 2).map(x => x.c);
    return easy.length >= 10 ? easy : ok.map(x => x.c);
  };
  const drawBar = answered => {
    const t = game.list[game.i]; const last = game.i + 1 >= game.list.length;
    bar.innerHTML = `<span><b class="tg">${E(t.ko)}</b>${J(t.ko, '은', '는')} 어디일까요?</span><span class="sc">${game.i + 1} / ${game.list.length} · 맞힘 ${game.right}</span>${answered ? `<button class="btn" type="button">${last ? '결과 보기' : '다음 ›'}</button>` : ''}`;
    const nb = bar.querySelector('.btn'); if (nb) { nb.onclick = next; nb.focus({ preventScroll: true }); }
  };
  const next = () => {
    clear('ok'); clear('bad'); clear('ans'); game.i++; game.locked = false;
    if (game.i >= game.list.length) {
      const n = game.list.length, r = game.right;
      bar.innerHTML = `<span><b class="tg">${n}문제 중 ${r}문제</b> 맞혔어요!</span><button class="btn" type="button">다시 하기</button>`;
      bar.querySelector('.btn').onclick = startGame;
      rec('map', '세계지도 어디일까요?', r, n);
      try { if (typeof didiCelebrate === 'function') didiCelebrate(r, n, { onRetry: startGame }); } catch (e) {}
      return;
    }
    animateTo({ ...B }); drawBar(false);
    card.innerHTML = '<p class="hint">위에 나온 나라를 지도에서 찾아 눌러 보세요. 잘 안 보이면 <b>+</b> 단추로 크게 해요.</p>';
  };
  const startGame = () => { const pool = gamePool(); game = { list: shuffle(pool).slice(0, 10), i: -1, right: 0, locked: false }; bar.hidden = false; next(); };
  bindSeg(body, '.seg', v => {
    mode = v; clear('sel'); clear('ok'); clear('bad'); clear('ans'); animId++;
    if (v === 'game') startGame();
    else { game = null; bar.hidden = true; bar.innerHTML = ''; card.innerHTML = '<p class="hint">지도에서 나라를 눌러 보세요.</p>'; animateTo({ ...B }); }
  });
  body.querySelector('.gk-find select').onchange = e => {
    const iso = e.target.value; if (!iso) return;
    if (mode === 'game') { body.querySelector('.seg .f[data-v=explore]').click(); }
    clear('sel'); mark(iso, 'sel'); showInfo(iso); if (paths[iso]) focusOn(iso); else card.insertAdjacentHTML('beforeend', '<p class="cnote" style="margin-top:8px">이 나라는 너무 작아서 지도에 따로 그려져 있지 않아요.</p>');
  };
}

/* =================== 3. 국기 맞히기 =================== */
async function viewFlags(app) {
  const body = shell(app, 'flags');
  let cs; try { cs = await data('countries'); } catch (e) { return fail(body); }
  let mode = 'f2n', lv = '1';
  const setup = () => {
    body.innerHTML = `<div class="gk-panel gk-setup"><h3>어떻게 놀까요?</h3>${segHtml('놀이 방법', [['f2n', '국기 보고 나라'], ['n2f', '나라 보고 국기']], mode)}
      <h3>단계</h3>${segHtml('단계', [['1', '1단계 쉬움'], ['2', '2단계 보통'], ['3', '3단계 어려움']], lv)}
      <button class="btn" type="button" id="gkGo">시작하기</button><p class="gk-note">한 판에 10문제예요. 1단계는 잘 알려진 나라, 3단계는 처음 보는 나라가 많아요.</p></div>`;
    const segs = body.querySelectorAll('.seg');
    bindSeg(body, segs[0], v => mode = v); bindSeg(body, segs[1], v => lv = v);
    body.querySelector('#gkGo').onclick = start;
  };
  const start = () => {
    const L = +lv; let pool = cs.filter(c => c.level === L);
    if (pool.length < 10) pool = pool.concat(shuffle(cs.filter(c => c.level !== L)).slice(0, 10 - pool.length));
    const qs = shuffle(pool).slice(0, 10).map(c => {
      const same = cs.filter(x => x.iso2 !== c.iso2 && (L === 1 ? x.level <= 2 : x.cont === c.cont));
      const opts = choicesFrom(c, same.length >= 3 ? same : cs.filter(x => x.iso2 !== c.iso2), x => x.ko);
      if (mode === 'f2n') return { q: `<img class="gk-bigflag" src="${flagSrc(c.iso2)}" alt="어느 나라 국기일까요?">어느 나라 국기일까요?`, choices: opts.map(x => ({ html: E(x.ko), ok: x === c })), answer: c.ko, explain: `${E(c.ko)} · 수도 ${E(c.capital)} · ${E(c.cont)}${c.fact ? '<br>' + E(c.fact) : ''}` };
      return { q: `<b>${E(c.ko)}</b>의 국기는 무엇일까요?`, cls: 'flags', choices: opts.map((x, k) => ({ html: `<img src="${flagSrc(x.iso2)}" alt="보기 ${k + 1}">`, label: `보기 ${k + 1}`, ok: x === c })), answer: c.ko + ' 국기', explain: `<img src="${flagSrc(c.iso2)}" alt="" style="height:40px;width:auto;display:inline-block;vertical-align:middle;margin-right:8px;border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,.1)">${E(c.ko)} 국기예요.` };
    });
    runQuiz(body, qs, { ref: 'flags', title: `국기 맞히기 ${lv}단계`, retry: start, back: setup, backLabel: '방법·단계 바꾸기' });
  };
  setup();
}

/* =================== 4. 나라·수도 =================== */
async function viewCapitals(app) {
  const body = shell(app, 'capitals');
  let cs; try { cs = await data('countries'); } catch (e) { return fail(body); }
  let mode = 'mem', lv = '1';
  const top = `<div class="gk-capseg"></div><div class="gk-capbody"></div>`;
  body.innerHTML = top;
  const segBox = body.querySelector('.gk-capseg'), box = body.querySelector('.gk-capbody');
  segBox.innerHTML = segHtml('놀이 방법', [['mem', '카드 짝 맞추기'], ['quiz', '수도 퀴즈']], mode) + segHtml('단계', [['1', '쉬움'], ['2', '보통'], ['3', '어려움']], lv);
  const segs = segBox.querySelectorAll('.seg');
  bindSeg(segBox, segs[0], v => { mode = v; go(); }); bindSeg(segBox, segs[1], v => { lv = v; go(); });
  const poolOf = () => { const L = +lv; let p = cs.filter(c => c.level === L); if (p.length < 10) p = p.concat(shuffle(cs.filter(c => c.level !== L)).slice(0, 10 - p.length)); return p; };
  const go = () => mode === 'mem' ? memory() : quiz();
  const memory = () => {
    // 수도 이름이 나라 이름과 같으면(예: 싱가포르) 짝 맞추기가 싱거우니 뺀다
    const pairs = shuffle(poolOf().filter(c => c.capital && !c.capital.startsWith(c.ko))).slice(0, 6);
    const cards = shuffle(pairs.flatMap(c => [{ c, cap: false }, { c, cap: true }]));
    let open = [], moves = 0, found = 0, lock = false;
    box.innerHTML = `<div class="gk-memtop"><span>뒤집은 횟수 <b class="mv">0</b></span><span>찾은 짝 <b class="fd">0</b> / ${pairs.length}</span></div>
      <div class="gk-mem">${cards.map((x, k) => `<button type="button" class="gk-mc${x.cap ? ' cap' : ''}" data-k="${k}" aria-label="카드 ${k + 1}"><span class="in"><span class="fa bk">?</span><span class="fa fr">${x.cap ? `<small>수도</small>${E(x.c.capital)}` : `<img src="${flagSrc(x.c.iso2)}" alt="">${E(x.c.ko)}`}</span></span></button>`).join('')}</div>
      <p class="gk-note" style="max-width:640px;margin:14px auto 0">나라 카드(국기)와 그 나라의 수도 카드를 짝지어요. 두 장씩 뒤집어 보세요.</p><ul class="gk-pairs"></ul>`;
    const bs = [...box.querySelectorAll('.gk-mc')];
    bs.forEach(b => b.onclick = () => {
      if (lock || b.classList.contains('flip') || b.classList.contains('done')) return;
      const x = cards[+b.dataset.k]; b.classList.add('flip'); b.setAttribute('aria-label', x.cap ? `수도 ${x.c.capital}` : x.c.ko); open.push(b);
      if (open.length < 2) return;
      moves++; box.querySelector('.mv').textContent = moves;
      const [p, q] = open, A = cards[+p.dataset.k], Bc = cards[+q.dataset.k];
      if (A.c === Bc.c && A.cap !== Bc.cap) {
        [p, q].forEach(z => { z.classList.add('done'); z.classList.remove('flip'); }); open = []; found++; sfx2('right');
        box.querySelector('.fd').textContent = found;
        box.querySelector('.gk-pairs').insertAdjacentHTML('beforeend', `<li><b>${E(A.c.ko)}</b> — 수도 <b>${E(A.c.capital)}</b>${A.c.capitalNote ? ` <span class="sub">(${E(A.c.capitalNote)})</span>` : ''}</li>`);
        if (found === pairs.length) later(() => {
          const msg = moves <= pairs.length + 2 ? '눈썰미 대장! 거의 한 번에 다 찾았어요.' : moves <= pairs.length * 2 ? '잘했어요! 기억력이 좋아요.' : '다 찾았어요! 한 번 더 하면 더 빨리 찾을 수 있어요.';
          box.querySelector('.gk-note').outerHTML = `<div class="gk-result gk-panel" style="margin-top:16px"><h2>${moves}번 만에 다 찾았어요!</h2><p class="sub">${msg}</p><div class="gk-btns"><button class="btn" type="button">새 카드로 다시 하기</button></div></div>`;
          box.querySelector('.gk-result .btn').onclick = memory; sfx2('perfect');
          rec('capitals-memory', `나라·수도 짝 맞추기 (${moves}번 뒤집기)`, pairs.length, pairs.length);
        }, 500);
      } else {
        lock = true; [p, q].forEach(z => z.classList.add('miss'));
        later(() => { [p, q].forEach(z => { z.classList.remove('flip', 'miss'); z.setAttribute('aria-label', '카드'); }); open = []; lock = false; }, 950);
      }
    });
  };
  const quiz = () => {
    const pool = poolOf().filter(c => c.capital);
    const qs = shuffle(pool).slice(0, 10).map(c => {
      const opts = choicesFrom(c, cs.filter(x => x.iso2 !== c.iso2 && x.capital && x.capital !== c.capital), x => x.capital);
      return { q: `<img class="gk-bigflag" src="${flagSrc(c.iso2)}" alt="" style="height:clamp(70px,16vw,100px)"><b>${E(c.ko)}</b>의 수도는 어디일까요?`, choices: opts.map(x => ({ html: E(x.capital), ok: x === c })), answer: c.capital, explain: `${E(c.ko)}의 수도는 <b>${E(c.capital)}</b>${c.capitalEn ? ` (${E(c.capitalEn)})` : ''}.${c.capitalNote ? '<br>' + E(c.capitalNote) : ''}` };
    });
    runQuiz(box, qs, { ref: 'capitals', title: '나라·수도 퀴즈', retry: quiz });
  };
  go();
}

/* =================== 5. 산·강 비교 =================== */
async function viewPeaks(app) {
  const body = shell(app, 'peaks');
  let peaks, rivers; try { [peaks, rivers] = await Promise.all([data('peaks'), data('rivers')]); } catch (e) { return fail(body); }
  let tab = 'peak', where = 'w';
  body.innerHTML = `<div class="gk-ctrl">${segHtml('무엇을 볼까요', [['peak', '산 높이'], ['river', '강 길이']], tab)}${segHtml('어디', [['w', '세계'], ['k', '우리나라']], where)}</div><div class="gk-panel gk-pk"></div>`;
  const segs = body.querySelectorAll('.seg'), box = body.querySelector('.gk-pk');
  bindSeg(body, segs[0], v => { tab = v; draw(); }); bindSeg(body, segs[1], v => { where = v; draw(); });
  let instant = false;
  const grow = (root) => {
    const go = () => { root.querySelectorAll('[data-w]').forEach(i => i.style.width = i.dataset.w); const s = root.querySelector('.gk-sil'); if (s) s.classList.add('on'); };
    if (RM() || instant) go(); else requestAnimationFrame(() => requestAnimationFrame(go));
  };
  const sil = (list, max) => {
    const W = Math.max(280, Math.round(box.clientWidth - 44)), H = W < 500 ? 170 : 220, n = list.length, slot = W / n, base = H - 4;
    const cols = ['#5b8c5a', '#6d9b5f', '#7aa86a', '#4f7f56', '#88b37a', '#5f9468'];
    const m = list.map((p, k) => { const h = (base - 26) * p.h / max, cx = slot * (k + .5), hw = Math.min(slot * .9, 26 + h * .55);
      const snow = p.h >= 4000 ? `<path d="M${cx} ${base - h} L${cx - hw * .16} ${base - h * .84} L${cx - hw * .05} ${base - h * .87} L${cx + hw * .04} ${base - h * .82} L${cx + hw * .16} ${base - h * .84}Z" fill="#fff"/>` : '';
      return `<g class="m" style="transition-delay:${k * 90}ms"><path d="M${cx - hw} ${base} L${cx} ${base - h} L${cx + hw} ${base}Z" fill="${p.ref ? '#b0b5bb' : p.kr ? '#3f7fd8' : cols[k % cols.length]}" opacity=".93"/>${snow}<text x="${cx}" y="${base - h - 7}" text-anchor="middle">${k + 1}</text></g>`; }).join('');
    return `<svg class="gk-sil" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="산 높이를 그림으로 비교"><rect x="0" y="${base}" width="${W}" height="4" fill="#8d7b68"/>${m}</svg>`;
  };
  const draw = () => {
    const kr = where === 'k';
    if (tab === 'peak') {
      let list = peaks.filter(p => !!p.kr === kr).sort((a, b) => b.h - a.h);
      const top = peaks.filter(p => !p.kr).sort((a, b) => b.h - a.h)[0];
      if (kr && top) list = [{ ...top, ref: true }].concat(list);
      const max = Math.max(...list.map(p => p.h));
      box.innerHTML = `${sil(list, max)}<div class="gk-rows">${list.map((p, k) => `<div class="gk-r${p.kr ? ' kr' : ''}${p.ref ? ' ref' : ''}"><div class="nm"><em>${k + 1}</em>${E(p.ko)}<span class="wh">${E(p.where || '')}</span>${p.ref ? '<span class="tag">비교용</span>' : ''}</div><div class="val">${nf(p.h)}m</div><div class="bar"><i data-w="${(p.h / max * 100).toFixed(1)}%"></i></div>${p.note ? `<div class="nt">${E(p.note)}</div>` : ''}</div>`).join('')}</div>
        <p class="gk-note">높이는 바다 수면(해발)에서 잰 높이예요.${kr && top ? ` ${E(top.ko)}${J(top.ko, '은', '는')} ${E(list[1] ? list[1].ko : '')}보다 약 ${list[1] ? (top.h / list[1].h).toFixed(1) : ''}배 높아요.` : ''}</p>`;
    } else {
      let list = rivers.filter(r => !!r.kr === kr).sort((a, b) => b.len - a.len);
      const top = rivers.filter(r => !r.kr).sort((a, b) => b.len - a.len)[0];
      if (kr && top) list = [{ ...top, ref: true }].concat(list);
      const max = Math.max(...list.map(r => r.len));
      box.innerHTML = `<div class="gk-rows">${list.map((r, k) => `<div class="gk-r river${r.kr ? ' kr' : ''}${r.ref ? ' ref' : ''}"><div class="nm"><em>${k + 1}</em>${E(r.ko)}<span class="wh">${E(r.where || '')}</span>${r.ref ? '<span class="tag">비교용</span>' : ''}</div><div class="val">${r.approx ? '약 ' : ''}${nf(r.len)}km</div><div class="bar"><i data-w="${(r.len / max * 100).toFixed(1)}%"></i></div>${r.note ? `<div class="nt">${E(r.note)}</div>` : ''}</div>`).join('')}</div>
        <p class="gk-note">강의 길이는 어디를 시작점으로 보느냐에 따라 자료마다 조금씩 달라서 ‘약’을 붙였어요.</p>`;
    }
    grow(box);
  };
  draw();
  let rw = box.clientWidth; const ro = new ResizeObserver(() => { if (Math.abs(box.clientWidth - rw) > 40 && tab === 'peak') { rw = box.clientWidth; instant = true; draw(); instant = false; } });
  ro.observe(box); onLeave(() => ro.disconnect());
}

/* =================== 6. 모스부호 =================== */
const MORSE = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.' };
const DEMORSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));
const symHtml = code => `<span class="gk-sym" aria-label="${E(code.replace(/\./g, '점 ').replace(/-/g, '선 ').trim())}">${[...code].map(s => s === '.' ? '<i class="gk-dot"></i>' : '<i class="gk-dash"></i>').join('')}</span>`;
function viewMorse(app) {
  const body = shell(app, 'morse');
  let ac = null, osc = null, gain = null, unit = 80, timers = [], token = 0;
  const audio = () => {
    try {
      if (!ac) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ac = new C(); gain = ac.createGain(); gain.gain.value = 0; gain.connect(ac.destination); osc = ac.createOscillator(); osc.type = 'sine'; osc.frequency.value = 600; osc.connect(gain); osc.start(); }
      if (ac.state === 'suspended') ac.resume(); return ac;
    } catch (e) { return null; }
  };
  const lights = () => body.querySelectorAll('.gk-light');
  const light = on => lights().forEach(l => l.classList.toggle('on', on));
  const stop = () => { token++; timers.forEach(clearTimeout); timers = []; if (gain && ac) { gain.gain.cancelScheduledValues(ac.currentTime); gain.gain.setTargetAtTime(0, ac.currentTime, .005); } light(false); body.querySelectorAll('.gk-lt.on,.gk-tbl .on').forEach(x => x.classList.remove('on')); };
  onLeave(() => { stop(); try { if (ac) ac.close(); } catch (e) {} });
  // 글자들을 소리·빛으로. onLetter(k) 는 k번째 글자가 시작될 때
  const play = (text, onLetter) => new Promise(res => {
    stop(); const my = token; const a = audio(); const u = unit / 1000;
    const t0 = a ? a.currentTime + .08 : 0; let t = 0; const start = performance.now() + 80;
    const at = (sec, fn) => timers.push(setTimeout(() => { if (my === token) fn(); }, Math.max(0, start - performance.now() + sec * 1000)));
    [...text].forEach((ch, k) => {
      if (ch === ' ') { t += u * 4; return; }
      const code = MORSE[ch]; if (!code) return;
      at(t, () => onLetter && onLetter(k));
      [...code].forEach((s, j) => {
        const d = (s === '.' ? 1 : 3) * u;
        if (a) { gain.gain.setValueAtTime(0, t0 + t); gain.gain.linearRampToValueAtTime(.22, t0 + t + .006); gain.gain.setValueAtTime(.22, t0 + t + d - .006); gain.gain.linearRampToValueAtTime(0, t0 + t + d); }
        at(t, () => light(true)); at(t + d, () => light(false));
        t += d + (j < code.length - 1 ? u : 0);
      });
      t += u * 3;
    });
    at(t, () => { onLetter && onLetter(-1); res(); });
  });
  body.innerHTML = `${segHtml('모스부호 놀이', [['send', '보내기'], ['tap', '두드리기'], ['listen', '듣기 게임'], ['table', '부호표']], 'send')}
    <div class="gk-ctrl" style="margin-top:-6px"><span style="font-size:15px;color:var(--sub);font-weight:600">빠르기</span>${segHtml('빠르기', [['160', '느리게'], ['80', '보통']], '80').replace('class="seg"', 'class="seg sm"')}</div>
    <div class="gk-mbody gk-morse"></div>
    <p class="gk-note">모스부호는 점(짧은 소리)과 선(긴 소리)으로 글자를 나타내는 신호예요. 국제 모스부호라서 <b>영어 알파벳과 숫자만</b> 쓸 수 있어요. 한글은 바꿀 수 없어요.</p>`;
  const segs = body.querySelectorAll('.seg'), box = body.querySelector('.gk-mbody');
  bindSeg(body, segs[1], v => { unit = +v; });
  let tab = 'send';
  bindSeg(body, segs[0], v => { tab = v; stop(); draw(); });
  const tableHtml = () => `<div class="gk-tbl">${Object.keys(MORSE).map(k => `<button type="button" data-l="${k}" aria-label="${k} 들어 보기"><b>${k}</b>${symHtml(MORSE[k])}</button>`).join('')}</div>`;
  const bindTable = () => box.querySelectorAll('.gk-tbl button').forEach(b => b.onclick = () => { const l = b.dataset.l; play(l, k => b.classList.toggle('on', k === 0)); });
  const draw = () => {
    if (tab === 'send') {
      box.innerHTML = `<div class="gk-panel"><label for="gkMt" style="font-weight:700;display:block;margin-bottom:8px">보낼 말 (영어·숫자)</label>
        <div class="row"><input type="text" id="gkMt" maxlength="24" value="HELLO" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="latin"><span class="gk-light" aria-hidden="true"></span></div>
        <p class="gk-warn" style="color:#c5221f;font-size:14.5px;margin:8px 0 0" hidden>한글이나 기호는 모스부호로 바꿀 수 없어서 건너뛰어요. 영어 알파벳과 숫자로 써 주세요.</p>
        <div class="gk-code" aria-live="off"></div>
        <div class="gk-btns" style="justify-content:flex-start"><button class="btn" type="button" data-a="play">▶ 소리·빛으로 보내기</button><button class="btn ghost" type="button" data-a="sos">SOS 보내기</button><button class="btn ghost" type="button" data-a="stop">멈추기</button></div>
        <p class="gk-note">SOS(··· − − − ···)는 "도와주세요!"라는 뜻으로 세계 어디서나 알아보는 구조 신호예요.</p></div>`;
      const inp = box.querySelector('#gkMt'), codeEl = box.querySelector('.gk-code'), warn = box.querySelector('.gk-warn');
      const clean = () => inp.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '').replace(/ {2,}/g, ' ').trim();
      const show = txt => { codeEl.innerHTML = [...txt].map((ch, k) => ch === ' ' ? `<span class="gk-lt sp" data-k="${k}"></span>` : `<span class="gk-lt" data-k="${k}"><b>${ch}</b>${symHtml(MORSE[ch])}</span>`).join(''); };
      const upd = () => { warn.hidden = !/[^A-Za-z0-9 ]/.test(inp.value); show(clean()); };
      inp.addEventListener('input', upd); upd();
      const run = txt => { show(txt); play(txt, k => codeEl.querySelectorAll('.gk-lt').forEach(x => x.classList.toggle('on', +x.dataset.k === k))); };
      box.querySelector('[data-a=play]').onclick = () => { const t = clean(); if (!t) { warn.hidden = false; return; } run(t); };
      box.querySelector('[data-a=sos]').onclick = () => { inp.value = 'SOS'; upd(); run('SOS'); };
      box.querySelector('[data-a=stop]').onclick = stop;
    } else if (tab === 'tap') {
      box.innerHTML = `<div class="gk-panel gk-keywrap"><p style="margin:0;text-align:center;font-size:16px">단추를 <b>짧게</b> 누르면 점(·), <b>길게</b> 누르면 선(−)이에요.<br>잠깐 쉬면 글자가 돼요.</p>
        <div class="row" style="justify-content:center"><span class="gk-light" aria-hidden="true"></span><button type="button" class="gk-key" aria-label="모스 단추, 누르고 있기">꾹 누르기</button></div>
        <div class="gk-buf" aria-live="polite"></div><div class="gk-out" aria-live="polite"></div>
        <div class="gk-btns"><button class="btn ghost" type="button" data-a="clr">모두 지우기</button><button class="btn ghost" type="button" data-a="bs">한 글자 지우기</button></div>
        <details style="width:100%"><summary>부호표 보기</summary><div style="margin-top:10px">${tableHtml()}</div></details></div>`;
      bindTable();
      const key = box.querySelector('.gk-key'), bufEl = box.querySelector('.gk-buf'), outEl = box.querySelector('.gk-out');
      let buf = '', out = '', t0 = 0, down = false, tCommit = null, tSpace = null;
      const render = () => { bufEl.innerHTML = buf ? symHtml(buf) + ` <span style="font-size:18px;color:var(--sub)">→ ${DEMORSE[buf] || '?'}</span>` : ''; outEl.textContent = out || ' '; };
      const commit = () => { if (!buf) return; out += DEMORSE[buf] || '?'; buf = ''; render(); tSpace = setTimeout(() => { if (out && !out.endsWith(' ')) { out += ' '; render(); } }, unit * 22); };
      const press = () => { if (down) return; down = true; clearTimeout(tCommit); clearTimeout(tSpace); t0 = performance.now(); key.classList.add('down'); light(true);
        const a = audio(); if (a) { gain.gain.cancelScheduledValues(a.currentTime); gain.gain.setTargetAtTime(.22, a.currentTime, .005); } };
      const release = () => { if (!down) return; down = false; key.classList.remove('down'); light(false);
        if (ac) { gain.gain.cancelScheduledValues(ac.currentTime); gain.gain.setTargetAtTime(0, ac.currentTime, .005); }
        const d = performance.now() - t0; if (buf.length < 6) buf += d < Math.max(220, unit * 2.5) ? '.' : '-'; render(); tCommit = setTimeout(commit, Math.max(700, unit * 9)); };
      key.addEventListener('pointerdown', e => { e.preventDefault(); try { key.setPointerCapture(e.pointerId); } catch (er) {} press(); });
      key.addEventListener('pointerup', release); key.addEventListener('pointercancel', release); key.addEventListener('lostpointercapture', release);
      key.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); } else if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); });
      key.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); } });
      key.addEventListener('contextmenu', e => e.preventDefault());
      box.querySelector('[data-a=clr]').onclick = () => { buf = ''; out = ''; clearTimeout(tCommit); clearTimeout(tSpace); render(); };
      box.querySelector('[data-a=bs]').onclick = () => { if (buf) buf = ''; else out = out.replace(/ ?.$/, ''); render(); };
      onLeave(() => { clearTimeout(tCommit); clearTimeout(tSpace); });
      render();
    } else if (tab === 'listen') {
      box.innerHTML = `<div class="gk-panel gk-setup"><p style="margin:0 0 12px;font-size:17px">모스부호 소리를 듣고 어떤 글자인지 맞혀요. 10문제예요.<br><span class="sub" style="font-size:15px">소리가 잘 들리게 볼륨을 켜 주세요.</span></p><button class="btn" type="button">시작하기</button></div>`;
      const startL = () => {
        const letters = Object.keys(MORSE).filter(k => /[A-Z]/.test(k));
        const qs = shuffle(letters).slice(0, 10).map(L => {
          const opts = choicesFrom(L, letters.filter(x => x !== L), x => x);
          return { q: `이 소리는 어떤 글자일까요?<br><button type="button" class="btn ghost gk-replay">🔊 다시 듣기</button>`, cls: 'letters', choices: opts.map(x => ({ html: x, ok: x === L })), answer: L, explain: `<b style="font-size:20px">${L}</b> = ${symHtml(MORSE[L])}`,
            onShow: b => { const go = () => play(L); b.querySelector('.gk-replay').onclick = go; setTimeout(go, 250); } };
        });
        runQuiz(box, qs, { ref: 'morse-listen', title: '모스부호 듣기 게임', retry: startL, onNext: stop });
      };
      box.querySelector('.btn').onclick = startL;
    } else {
      box.innerHTML = `<div class="gk-panel"><div class="row" style="margin-bottom:12px"><span class="gk-light" aria-hidden="true"></span><span style="font-size:15.5px">글자를 누르면 소리와 빛으로 들려줘요.</span></div>${tableHtml()}</div>`;
      bindTable();
    }
  };
  draw();
}

/* =================== 7. 상식 퀴즈 =================== */
async function viewQuiz(app) {
  const body = shell(app, 'quiz');
  let qsAll; try { qsAll = await data('quiz'); } catch (e) { return fail(body); }
  const ORDER = ['자연', '우리나라', '세계', '과학', '생활', '역사'];
  const cats = ORDER.filter(c => qsAll.some(q => q.cat === c)).concat([...new Set(qsAll.map(q => q.cat))].filter(c => !ORDER.includes(c)));
  let cat = '전체';
  const setup = () => {
    body.innerHTML = `<div class="gk-panel gk-setup"><h3>어떤 문제를 풀까요?</h3><div class="gk-cats" role="group" aria-label="분야">${['전체'].concat(cats).map(c => `<button type="button" data-c="${E(c)}" aria-pressed="${c === cat}">${E(c)}<span>${c === '전체' ? qsAll.length : qsAll.filter(q => q.cat === c).length}</span></button>`).join('')}</div>
      <button class="btn" type="button" id="gkGo">10문제 풀기</button><p class="gk-note">문제마다 풀이가 나와요. 틀려도 괜찮아요, 풀이를 읽으면 새로 알게 돼요.</p></div>`;
    body.querySelectorAll('.gk-cats button').forEach(b => b.onclick = () => { cat = b.dataset.c; body.querySelectorAll('.gk-cats button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
    body.querySelector('#gkGo').onclick = start;
  };
  const start = () => {
    const pool = cat === '전체' ? qsAll : qsAll.filter(q => q.cat === cat);
    const qs = shuffle(pool).slice(0, 10).map(q => ({ q: `<small style="margin:0 0 6px;color:#e37400;font-weight:700">${E(q.cat)}</small>${E(q.q)}`, choices: q.choices.map((c, k) => ({ html: E(c), ok: k === q.answer })), answer: q.choices[q.answer], explain: q.explain ? E(q.explain) : '' }));
    runQuiz(body, qs, { ref: 'quiz-' + cat, title: `상식 퀴즈 (${cat})`, retry: start, back: setup, backLabel: '분야 바꾸기' });
  };
  setup();
}

/* =================== 8. 세계의 인사말 =================== */
async function viewGreet(app) {
  const body = shell(app, 'greet');
  let cs; try { cs = await data('countries'); } catch (e) { return fail(body); }
  const list = cs.filter(c => c.greet && c.greet.text);
  const byIso = Object.fromEntries(cs.map(c => [c.iso2, c]));
  body.innerHTML = `<div class="gk-cards">${list.map(c => `<div class="gk-c"><div class="top"><img src="${flagSrc(c.iso2)}" alt="${E(c.ko)} 국기" loading="lazy"><b>${E(c.ko)}<small>${E(langName(c.greet.lang))}</small></b></div>
    <div class="big" lang="${E(c.greet.lang)}">${E(c.greet.text)}</div><button type="button" class="gk-sbtn" data-gsay="${E(c.iso2)}">🔊 들어 보기</button><span class="gk-snote" aria-live="polite" style="display:block;margin-top:6px"></span></div>`).join('')}</div>
    <p class="gk-note">소리는 이 기기(휴대폰·컴퓨터)에 들어 있는 목소리로 읽어 줘요. 그 나라 말 목소리가 없는 기기에서는 소리가 나오지 않을 수 있어요.</p>`;
  body.querySelectorAll('[data-gsay]').forEach(b => b.onclick = () => { const c = byIso[b.dataset.gsay]; speak(c.greet.text, c.greet.lang, b, b.parentElement.querySelector('.gk-snote')); });
}

/* =================== 9. 우리나라 시·도 =================== */
async function viewKorea(app) {
  const body = shell(app, 'korea');
  let ks; try { ks = await data('korea'); } catch (e) { return fail(body); }
  const office = k => /도$/.test(k.type || k.name) ? '도청' : '시청';
  let mode = 'list';
  body.innerHTML = segHtml('보기', [['list', '살펴보기'], ['quiz', '도청 퀴즈']], mode) + '<div class="gk-kb"></div>';
  const box = body.querySelector('.gk-kb');
  bindSeg(body, '.seg', v => { mode = v; draw(); });
  const draw = () => {
    if (mode === 'list') {
      box.innerHTML = `<p class="gk-note" style="margin:0 0 14px">우리나라에는 ${[...new Set(ks.map(k => k.type))].map(t => `${E(t)} ${ks.filter(k => k.type === t).length}곳`).join(', ')}, 모두 ${ks.length}개 광역자치단체(시·도)가 있어요.</p>
        <div class="gk-cards gk-kr">${ks.map(k => `<div class="gk-c"><span class="chip">${E(k.type)}</span><div class="big">${E(k.name)}</div><div class="sub" style="font-size:14px">줄여서 ‘${E(k.short)}’</div>${k.seat && k.seat !== k.name ? `<div class="seat">${office(k)}이 있는 곳<br><b>${E(k.seat)}</b></div>` : ''}</div>`).join('')}</div>`;
    } else {
      const pool = ks.filter(k => /도$/.test(k.type || ''));
      const startK = () => {
        const qs = shuffle(pool).map(k => {
          const opts = choicesFrom(k, pool.filter(x => x !== k && x.seat !== k.seat), x => x.seat);
          return { q: `<b>${E(k.name)}</b>의 도청은<br>어느 시·군에 있을까요?`, choices: opts.map(x => ({ html: E(x.seat), ok: x === k })), answer: k.seat, explain: `${E(k.name)}(${E(k.short)})의 도청은 <b>${E(k.seat)}</b>에 있어요.` };
        });
        runQuiz(box, qs, { ref: 'korea', title: '우리나라 도청 퀴즈', retry: startK });
      };
      startK();
    }
  };
  draw();
}

/* =================== 10. 태양계 행성 =================== */
const PCOL = { Mercury: ['#c9c3b8', '#8f877c'], Venus: ['#f3dca0', '#c99a4b'], Earth: ['#6fb1ff', '#1f5fbf'], Mars: ['#f08a5d', '#a8401f'], Jupiter: ['#f1d2a8', '#b9875a'], Saturn: ['#f4e3b0', '#c7a55e'], Uranus: ['#bff0f3', '#5fb7c4'], Neptune: ['#7d9bff', '#2d4bc4'] };
async function viewSpace(app) {
  const body = shell(app, 'space');
  let ps; try { ps = await data('planets'); } catch (e) { return fail(body); }
  const sun = ps.find(p => p.en === 'Sun' || p.ko === '태양');
  const planets = ps.filter(p => p !== sun);
  const earth = planets.find(p => p.en === 'Earth' || p.ko === '지구');
  let order = 'dist', withSun = false, sel = null;
  body.innerHTML = `<div class="gk-ctrl">${segHtml('순서', [['dist', '태양에서 가까운 순'], ['size', '큰 순']], order)}${sun ? '<button type="button" class="gk-tog" aria-pressed="false">☀ 태양도 함께 보기</button>' : ''}<button type="button" class="gk-tog" data-a="re">↻ 다시 보기</button></div>
    <div class="gk-space"></div><div class="gk-card gk-info"><p class="hint">행성을 누르면 크기와 거리를 알려 줘요.</p></div>
    <p class="gk-note">크기는 실제 지름 비율대로 그렸어요. 행성 사이의 거리는 실제보다 아주 가깝게 붙여 그렸어요(실제로는 훨씬 멀리 떨어져 있어요).</p>`;
  const sp = body.querySelector('.gk-space'), info = body.querySelector('.gk-info');
  bindSeg(body, '.seg', v => { order = v; draw(); });
  const tog = body.querySelector('.gk-tog:not([data-a])'); if (tog) tog.onclick = () => { withSun = !withSun; tog.setAttribute('aria-pressed', withSun); draw(); };
  body.querySelector('[data-a=re]').onclick = () => draw();
  const showInfo = p => {
    const x = earth ? p.d / earth.d : null;
    info.innerHTML = `<h2 style="font-size:24px">${E(p.ko)} <span class="sub" style="font-size:15px;font-weight:500">${E(p.en || '')}</span></h2><dl><dt>지름</dt><dd>약 ${nf(p.d)}km</dd>${earth && p !== earth ? `<dt>지구와 비교</dt><dd>지구 지름의 약 ${x >= 10 ? Math.round(x) : x.toFixed(1)}배</dd>` : ''}${p.au != null ? `<dt>태양과의 거리</dt><dd>${p.au} AU${p !== earth ? ` <span class="sub" style="font-weight:400">(지구-태양 거리의 ${p.au}배)</span>` : ' <span class="sub" style="font-weight:400">(1 AU = 약 1억 5천만 km)</span>'}</dd>` : ''}</dl>${p.fact ? `<p class="fact">${E(p.fact)}</p>` : ''}`;
  };
  const draw = () => {
    const list = order === 'dist' ? planets.slice().sort((a, b) => (a.au ?? 0) - (b.au ?? 0)) : planets.slice().sort((a, b) => b.d - a.d);
    const W = Math.max(300, sp.clientWidth - 20); const two = W < 640;
    const rows = two ? [list.slice(0, 4), list.slice(4)] : [list];
    const sunPad = withSun && sun ? (two ? 42 : 70) : 0, gap = two ? 8 : 12, minSlot = 50;
    const slotW = (p, s) => Math.max(p.d * s * (p.en === 'Saturn' ? 1.6 : 1), minSlot);
    const fits = s => rows.every(r => r.reduce((t, p) => t + slotW(p, s), 0) + gap * (r.length - 1) <= W - sunPad - 4);
    let lo = 0, hi = 1; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (fits(m)) lo = m; else hi = m; }
    const s = lo; let y = 10, out = '', idx = 0;
    rows.forEach(r => {
      const rowH = Math.max(...r.map(p => p.d * s)); const cy = y + rowH / 2;
      const used = r.reduce((t, p) => t + slotW(p, s), 0) + gap * (r.length - 1);
      let x = sunPad + (W - sunPad - used) / 2;
      r.forEach(p => {
        const slot = slotW(p, s), cx = x + slot / 2, rr = Math.max(p.d * s / 2, 1.2), col = PCOL[p.en] || ['#ddd', '#888'], gid = 'gkg' + idx;
        const ring = p.en === 'Saturn' ? `<ellipse cx="${cx}" cy="${cy}" rx="${rr * 1.6}" ry="${rr * .4}" fill="none" stroke="#e8d8a8" stroke-width="${Math.max(1.5, rr * .16)}" opacity=".9" transform="rotate(-14 ${cx} ${cy})"/>` : '';
        out += `<defs><radialGradient id="${gid}" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="${col[0]}"/><stop offset="1" stop-color="${col[1]}"/></radialGradient></defs>
          <g class="pl${sel === p ? ' sel' : ''}" data-i="${planets.indexOf(p)}" style="transition-delay:${idx * 110}ms" tabindex="0" role="button" aria-label="${E(p.ko)}"><circle cx="${cx}" cy="${cy}" r="${Math.max(rr, 14)}" fill="transparent"/><circle class="b" cx="${cx}" cy="${cy}" r="${rr}" fill="url(#${gid})"/>${ring}</g>
          <text x="${cx}" y="${y + rowH + 22}" text-anchor="middle">${E(p.ko)}</text>${order === 'dist' && p.au != null ? `<text class="s" x="${cx}" y="${y + rowH + 40}" text-anchor="middle">${p.au} AU</text>` : ''}`;
        x += slot + gap; idx++;
      });
      y += rowH + (order === 'dist' ? 54 : 38);
    });
    const H = Math.round(y);
    let sunSvg = '';
    if (withSun && sun) { const R = sun.d * s / 2; sunSvg = `<defs><radialGradient id="gksun" cx="1" cy=".5" r="1"><stop offset=".9" stop-color="#ffcf3f"/><stop offset="1" stop-color="#ff8f1f"/></radialGradient></defs><circle cx="${sunPad - 10 - R}" cy="${H / 2}" r="${R}" fill="url(#gksun)"/><text x="6" y="${H / 2 + 5}" style="fill:#7a3b00;font-size:13px">태양</text>`; }
    sp.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="태양계 행성 크기 비교">${sunSvg}${out}</svg>`;
    sp.classList.remove('on');
    if (RM()) sp.classList.add('on'); else requestAnimationFrame(() => requestAnimationFrame(() => sp.classList.add('on')));
    sp.querySelectorAll('.pl').forEach(g => { const f = () => { sel = planets[+g.dataset.i]; sp.querySelectorAll('.pl').forEach(x => x.classList.toggle('sel', x === g)); showInfo(sel); }; g.addEventListener('click', f); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } }); });
    if (withSun && sun && earth) info.innerHTML = `<h2 style="font-size:24px">태양</h2><dl><dt>지름</dt><dd>약 ${nf(sun.d)}km</dd><dt>지구와 비교</dt><dd>지구 지름의 약 ${Math.round(sun.d / earth.d)}배</dd></dl><p class="fact">태양은 너무 커서 왼쪽에 일부분(둥근 가장자리)만 보여요.</p>`;
  };
  draw();
  let rw = sp.clientWidth; const ro = new ResizeObserver(() => { if (Math.abs(sp.clientWidth - rw) > 30) { rw = sp.clientWidth; draw(); } });
  ro.observe(sp); onLeave(() => ro.disconnect());
}

/* =================== 10-2. 별자리 여행 =================== */
const SEA_SHORT = { spring: '봄', summer: '여름', autumn: '가을', winter: '겨울', north: '일 년 내내', south: '남반구' };
const SEA_LONG = { spring: '봄 저녁 하늘', summer: '여름 저녁 하늘', autumn: '가을 저녁 하늘', winter: '겨울 저녁 하늘', north: '일 년 내내 (북쪽 하늘)', south: '남반구 하늘 (우리나라에서는 거의 볼 수 없어요)' };
const QSTAR = { UMa: ['북두칠성'], UMi: ['북극성'], Ori: ['베텔게우스', '리겔'], Tau: ['알데바란'], Gem: ['폴룩스', '카스토르'], CMa: ['시리우스'], CMi: ['프로키온'], Leo: ['레굴루스'], Vir: ['스피카'], Boo: ['아크투루스'], Lyr: ['베가'], Cyg: ['데네브'], Aql: ['알타이르'], Sco: ['안타레스'], Sgr: ['남두육성'], Cru: ['아크룩스'] };
const STAR_NOTE = { 베가: '직녀성', 알타이르: '견우성', 북극성: '폴라리스' };
const D2R = Math.PI / 180;
// 평사도법(스테레오 투영): 하늘을 올려다본 모습(위=북, 왼쪽=동)
function skyProj(ra0, dec0, rot) {
  const d0 = dec0 * D2R, s0 = Math.sin(d0), c0 = Math.cos(d0), cr = Math.cos(rot || 0), sr = Math.sin(rot || 0);
  return (ra, dec) => {
    const a = (ra - ra0) * D2R, d = dec * D2R, cd = Math.cos(d);
    const cc = s0 * Math.sin(d) + c0 * cd * Math.cos(a); if (cc < -.2) return null;
    const k = 2 / (1 + cc), x = -k * cd * Math.sin(a), y = k * (c0 * Math.sin(d) - s0 * cd * Math.cos(a));
    return [x * cr - y * sr, x * sr + y * cr];
  };
}
function skyCenter(pts) {
  let X = 0, Y = 0, Z = 0;
  pts.forEach(([r, d]) => { const a = r * D2R, b = d * D2R; X += Math.cos(b) * Math.cos(a); Y += Math.cos(b) * Math.sin(a); Z += Math.sin(b); });
  return [(Math.atan2(Y, X) / D2R + 360) % 360, Math.atan2(Z, Math.hypot(X, Y)) / D2R];
}
function bounds(P) {
  const b = [Infinity, -Infinity, Infinity, -Infinity];
  P.forEach(p => { if (!p) return; b[0] = Math.min(b[0], p[0]); b[1] = Math.max(b[1], p[0]); b[2] = Math.min(b[2], p[1]); b[3] = Math.max(b[3], p[1]); });
  return b;
}
// 단위 좌표 → 화면 좌표 (W×H 상자에 맞춤, y 뒤집기)
function fitBox(b, W, H, pad) {
  const bw = Math.max(b[1] - b[0], 1e-4), bh = Math.max(b[3] - b[2], 1e-4);
  const s = Math.min((W - 2 * pad) / bw, (H - 2 * pad) / bh);
  const ox = W / 2 - (b[0] + b[1]) / 2 * s, oy = H / 2 + (b[2] + b[3]) / 2 * s;
  const f = p => p ? [ox + p[0] * s, oy - p[1] * s] : null; f.s = s; return f;
}
const starR = (m, k) => Math.max(1, Math.min(6.4, 4.4 - .95 * m)) * (k || 1);
const r1 = n => Math.round(n * 10) / 10;
const ptsAttr = P => P.map(p => `${r1(p[0])},${r1(p[1])}`).join(' ');
function miniSky(c, W, H, pad) {
  const [ra0, dec0] = skyCenter(c.stars); const pr = skyProj(ra0, dec0);
  const f = fitBox(bounds(c.stars.map(s => pr(s[0], s[1]))), W, H, pad || 12);
  const k = Math.max(.75, Math.min(1.15, W / 220));
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" focusable="false">${c.lines.map(l => `<polyline points="${ptsAttr(l.map(p => f(pr(p[0], p[1]))))}" fill="none" stroke="#8fb0ff" stroke-width="${r1(1.5 * k)}" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`).join('')}${c.stars.map(s => { const p = f(pr(s[0], s[1])); return `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r1(starR(s[2], k))}" fill="#fff"/>`; }).join('')}</svg>`;
}
const seaChip = c => `<span class="gk-schip ${c.season}">${SEA_SHORT[c.season]}</span>`;
function starInfo(c) {
  return `<div class="gk-stinfo"><div class="mini">${miniSky(c, 220, 170)}</div><div><h2>${E(c.ko)}</h2><div class="en">${E(c.en)} · ${E(c.la)}</div><span class="gk-schip ${c.season}">${E(SEA_LONG[c.season])}</span>
    <dl><dt>${c.bright ? '가장 밝은 별' : '대표 별'}</dt><dd>${E(c.star)}${c.starNote ? ` <span>(${E(c.starNote)})</span>` : ''}</dd><dt>찾는 방법</dt><dd>${E(c.find)}</dd></dl><p class="fact">${E(c.fact)}</p></div></div>`;
}
function seasonNow() { const m = new Date().getMonth() + 1; return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter'; }
// 부드러운 곡선(캣멀-롬)
function curvePath(P) {
  let d = `M${r1(P[0][0])},${r1(P[0][1])}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    d += ` C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
  }
  return d;
}

async function viewStars(app) {
  const body = shell(app, 'stars');
  let D; try { D = await data('stars'); } catch (e) { return fail(body); }
  const byId = Object.fromEntries(D.cons.map(c => [c.id, c]));
  const N = D.named;
  let tab = 'sky', sea = seasonNow(), sel = null, method = 'dip', step = 0, cardFilter = 'all';
  body.innerHTML = segHtml('보기', [['sky', '계절 밤하늘'], ['pole', '북극성 찾기'], ['cards', '별자리 카드'], ['quiz', '퀴즈']], tab).replace('class="seg"', 'class="seg big"') + '<div class="gk-stb"></div>';
  const box = body.querySelector('.gk-stb');
  let ro = null; const stopRO = () => { if (ro) { ro.disconnect(); ro = null; } };
  onLeave(stopRO);
  const watch = (el, fn) => { stopRO(); let w = el.clientWidth; ro = new ResizeObserver(() => { if (Math.abs(el.clientWidth - w) > 30) { w = el.clientWidth; fn(); } }); ro.observe(el); };
  const go = v => { tab = v; stopRO(); closeModal(); ({ sky: drawSkyTab, pole: drawPoleTab, cards: drawCards, quiz: startQuiz })[v](); };
  bindSeg(body, '.seg', go);

  /* ----- 1. 계절 밤하늘 ----- */
  function drawSkyTab() {
    box.innerHTML = `<div class="gk-stchips" role="group" aria-label="계절" style="margin:0 0 12px">${['spring', 'summer', 'autumn', 'winter'].map(k => `<button type="button" data-s="${k}" aria-pressed="${k === sea}">${SEA_SHORT[k]}</button>`).join('')}</div>
      <div class="gk-sky"></div><div class="gk-stchips gk-cnl" role="group" aria-label="별자리 고르기"></div><div class="gk-shape"></div>
      <div class="gk-card gk-info"><p class="hint">별자리 선이나 이름을 누르면 자세히 알려 줘요.</p></div>
      <p class="gk-note">하늘을 올려다본 모습이에요. 위쪽이 북쪽, 왼쪽이 동쪽이에요. 별의 위치는 실제 자료로 그렸고, 밝은 별일수록 크게 그렸어요. 별자리는 저녁 8~9시 무렵에 보기 좋은 계절로 나누었어요.</p>`;
    box.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { sea = b.dataset.s; sel = null; box.querySelectorAll('[data-s]').forEach(x => x.setAttribute('aria-pressed', x === b)); drawSky(); });
    drawSky();
    watch(box.querySelector('.gk-sky'), () => drawSky(true));
  }
  function drawSky(keep) {
    const S = D.seasons[sea], cons = S.ids.map(id => byId[id]);
    const sky = box.querySelector('.gk-sky'), info = box.querySelector('.gk-info');
    const all = [].concat(...cons.map(c => c.stars));
    const pr = skyProj(S.c[0], S.c[1]);
    const b = bounds(all.map(s => pr(s[0], s[1])));
    const W = Math.max(300, Math.round(sky.clientWidth || 600)), pad = W < 500 ? 34 : 50;
    const asp = (b[3] - b[2]) / (b[1] - b[0]);
    const H = Math.round(Math.min(Math.max((W - 2 * pad) * asp + 2 * pad, W * .62), Math.max(W * 1.25, 420), 700));
    const f = fitBox(b, W, H, pad);
    const kk = W < 500 ? .85 : 1;
    let bg = '';
    D.bg.forEach(s => { const p = f(pr(s[0], s[1])); if (p && p[0] > -5 && p[0] < W + 5 && p[1] > -5 && p[1] < H + 5) bg += `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r1(starR(s[2], .7 * kk))}" fill="#fff" opacity=".6"/>`; });
    const shapeStars = S.shape.stars.map(n => N[n]).filter(Boolean).map(s => f(pr(s.ra, s.dec)));
    const sp = S.shape;
    const shape = sp.kind === 'curve' ? `<path class="shp" d="${curvePath(shapeStars)}"/>` : `<polygon class="shp" points="${ptsAttr(shapeStars)}"/>`;
    // 별자리 이름표: 선과 다른 이름표를 덜 가리는 자리로
    const CL = cons.map(c => ({ c, L: c.lines.map(l => l.map(p => f(pr(p[0], p[1])))), P: c.stars.map(s => f(pr(s[0], s[1]))) }));
    const samples = [];
    CL.forEach(o => o.L.forEach(l => { for (let j = 0; j < l.length - 1; j++) { const a = l[j], b2 = l[j + 1], n = Math.max(1, Math.ceil(Math.hypot(b2[0] - a[0], b2[1] - a[1]) / 4)); for (let q = 0; q <= n; q++) samples.push([a[0] + (b2[0] - a[0]) * q / n, a[1] + (b2[1] - a[1]) * q / n]); } }));
    const placedN = [];
    // 이름표 붙일 밝은 별
    let names = '';
    Object.entries(N).forEach(([nm, s]) => {
      if (!s.label) return; const p = f(pr(s.ra, s.dec)); if (!p || p[0] < 0 || p[0] > W || p[1] < 0 || p[1] > H) return;
      const right = p[0] < W - 90, x0 = p[0] + (right ? 1 : -1) * (starR(s.mag, kk) + 5), tw = nm.length * 13;
      placedN.push(right ? [x0, p[1] - 10, x0 + tw, p[1] + 6] : [x0 - tw, p[1] - 10, x0, p[1] + 6]);
      names += `<text class="sn" x="${r1(p[0] + (right ? 1 : -1) * (starR(s.mag, kk) + 5))}" y="${r1(p[1] + 4)}" text-anchor="${right ? 'start' : 'end'}">${E(nm)}</text>`;
    });
    const placed = placedN.slice();
    CL.forEach(o => {
      const P = o.P, xs = P.map(p => p[0]), ys = P.map(p => p[1]);
      const cx = xs.reduce((t, v) => t + v, 0) / P.length, cy = ys.reduce((t, v) => t + v, 0) / P.length;
      const tw = o.c.ko.length * 15 + 6, th = 20;
      const cands = [[cx, cy], [cx, cy - 26], [cx, cy + 26], [cx - 50, cy], [cx + 50, cy], [cx, Math.max(...ys) + 22], [cx, Math.min(...ys) - 10], [cx - 40, cy - 30], [cx + 40, cy + 30], [cx + 40, cy - 30], [cx - 40, cy + 30]];
      let best = null, bs = Infinity;
      cands.forEach(([x, y], ci) => {
        const r = [x - tw / 2, y - th + 4, x + tw / 2, y + 6];
        let sc = ci * .6;
        if (r[0] < 4 || r[2] > W - 4 || r[1] < 22 || r[3] > H - 22) sc += 1000;
        samples.forEach(p => { if (p[0] > r[0] - 3 && p[0] < r[2] + 3 && p[1] > r[1] - 3 && p[1] < r[3] + 3) sc += 1; });
        placed.forEach(q => { if (r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1]) sc += 500; });
        if (sc < bs) { bs = sc; best = [x, y, r]; }
      });
      placed.push(best[2]); o.lx = best[0]; o.ly = best[1];
    });
    let groups = '';
    CL.forEach((o, i) => {
      const c = o.c, L = o.L.map(ptsAttr), P = o.P, lx = o.lx, ly = o.ly;
      groups += `<g class="cn${sel === c.id ? ' sel' : ''}" data-id="${c.id}" tabindex="0" role="button" aria-label="${E(c.ko)}">${L.map(p => `<polyline class="hit" points="${p}"/>`).join('')}<circle class="hitc" cx="${r1(lx)}" cy="${r1(ly - 5)}" r="24"/>${L.map(p => `<polyline class="ln" pathLength="1" points="${p}" style="transition-delay:${(i * .35).toFixed(2)}s"/>`).join('')}
        ${c.stars.map((s, j) => `<circle cx="${r1(P[j][0])}" cy="${r1(P[j][1])}" r="${r1(starR(s[2], kk))}" fill="#fff"/>`).join('')}<text class="cl" x="${r1(lx)}" y="${r1(ly)}" text-anchor="middle">${E(c.ko)}</text></g>`;
    });
    sky.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${E(S.ko)} 저녁 하늘의 별자리">${bg}${groups}${shape}${names}<text class="cmp" x="10" y="${H - 10}">← 동쪽</text><text class="cmp" x="${W - 10}" y="${H - 10}" text-anchor="end">서쪽 →</text><text class="cmp" x="${W / 2}" y="16" text-anchor="middle">↑ 북쪽</text></svg>`;
    sky.classList.remove('on');
    if (RM() || keep) sky.classList.add('on'); else requestAnimationFrame(() => requestAnimationFrame(() => sky.classList.add('on')));
    const pickC = id => { sel = id; sky.querySelectorAll('.cn').forEach(g => g.classList.toggle('sel', g.dataset.id === id)); box.querySelectorAll('.gk-cnl button').forEach(x => x.setAttribute('aria-pressed', x.dataset.id === id)); info.innerHTML = starInfo(byId[id]); };
    sky.querySelectorAll('.cn').forEach(g => { g.addEventListener('click', () => pickC(g.dataset.id)); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickC(g.dataset.id); } }); });
    const chips = box.querySelector('.gk-cnl');
    chips.innerHTML = cons.map(c => `<button type="button" data-id="${c.id}" aria-pressed="${sel === c.id}">${E(c.ko)}</button>`).join('');
    chips.querySelectorAll('button').forEach(bt => bt.onclick = () => pickC(bt.dataset.id));
    box.querySelector('.gk-shape').innerHTML = `<i aria-hidden="true"></i><div><b>${E(sp.ko)}</b>${E(sp.text)}</div>`;
    if (!keep && !sel) info.innerHTML = '<p class="hint">별자리 선이나 이름을 누르면 자세히 알려 줘요.</p>';
  }

  /* ----- 2. 북극성 찾기 ----- */
  const DIP = ['두베', '메라크', '페크다', '메그레즈', '알리오스', '미자르', '알카이드'];
  const CAS = ['카프', '셰다르', '감마별', '루크바', '세긴'];
  const STEPS = {
    dip: ['북쪽 하늘에서 국자 모양으로 늘어선 일곱 별, 북두칠성을 찾아요.',
      '국자 끝에 있는 두 별을 찾아요. 국자 바닥 쪽 별(메라크)과 국자 입구 쪽 별(두베)이에요.',
      '두 별을 이은 거리를 한 칸으로 생각하고, 국자 입구 쪽으로 그 거리의 약 5배만큼 늘여요.',
      '그곳에서 밝게 빛나는 별이 북극성이에요! 북극성은 작은곰자리 꼬리 끝에 있어요.'],
    cas: ['북극성을 사이에 두고 북두칠성 맞은편에서 W 모양의 카시오페이아자리를 찾아요.',
      'W 모양에서 바깥쪽 두 선을 길게 늘여 서로 만나는 점을 찾아요.',
      '만나는 점과 W 모양의 가운데 별을 선으로 이어요.',
      '가운데 별에서 그 거리의 약 5배만큼 늘여요.',
      '그곳에서 밝게 빛나는 별이 북극성이에요! 북두칠성이 낮게 떠서 잘 안 보이는 가을에는 이 방법이 좋아요.']
  };
  function drawPoleTab() {
    box.innerHTML = `<div class="gk-nwrap"><div class="gk-stchips" role="group" aria-label="찾는 방법" style="margin:0 0 12px"><button type="button" data-m="dip" aria-pressed="${method === 'dip'}">북두칠성으로 찾기</button><button type="button" data-m="cas" aria-pressed="${method === 'cas'}">카시오페이아자리로 찾기</button></div>
      <div class="gk-sky on st"></div><div class="gk-panel gk-steps" aria-live="polite"></div>
      <p class="gk-note">북쪽 하늘을 바라본 모습이에요. 북쪽 하늘의 별들은 북극성을 중심으로 하루에 한 바퀴씩 도는 것처럼 보여서, 시각과 계절에 따라 별자리가 기울어진 모습으로 보여요. 북극성은 아주 밝은 별은 아니지만, 거의 움직이지 않아서 방향을 찾을 때 길잡이가 돼요.</p></div>`;
    box.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { method = b.dataset.m; step = 0; box.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', x === b)); drawPole(); });
    drawPole();
    watch(box.querySelector('.gk-sky'), () => drawPole(true));
  }
  function drawPole(still) {
    const sky = box.querySelector('.gk-sky');
    // 북극을 가운데에 두고, 북두칠성이 위쪽에 오도록 돌림
    let pr = skyProj(0, 90);
    const dc = DIP.map(n => pr(N[n].ra, N[n].dec)); const cx = dc.reduce((t, p) => t + p[0], 0) / 7, cy = dc.reduce((t, p) => t + p[1], 0) / 7;
    const rot = Math.PI / 2 - Math.atan2(cy, cx) + .25;
    pr = skyProj(0, 90, rot);
    const u = n => pr(N[n].ra, N[n].dec);
    const add = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    const M = u('메라크'), Du = u('두베'), Po = u('북극성');
    const dTicks = [1, 2, 3, 4, 5].map(k => add(Du, [Du[0] + (Du[0] - M[0]), Du[1] + (Du[1] - M[1])], k));
    const [cB, cA, cG, cD, cE] = CAS.map(u);
    // 바깥 두 선(β-α, ε-δ)의 교점
    const x1 = cA[0] - cB[0], y1 = cA[1] - cB[1], x2 = cD[0] - cE[0], y2 = cD[1] - cE[1];
    const den = x1 * y2 - y1 * x2, t = ((cE[0] - cB[0]) * y2 - (cE[1] - cB[1]) * x2) / den;
    const X = [cB[0] + t * x1, cB[1] + t * y1];
    const cTicks = [1, 2, 3, 4, 5].map(k => [cG[0] + (cG[0] - X[0]) * k, cG[1] + (cG[1] - X[1]) * k]);
    const umi = byId.UMi, uma = byId.UMa;
    // 방법마다 필요한 부분만 크게 보이도록 맞춤
    const unit = method === 'dip' ? [].concat(DIP.map(u), [Po], dTicks, umi.stars.map(s => pr(s[0], s[1])))
      : [].concat(CAS.map(u), [Po, X], cTicks, umi.stars.map(s => pr(s[0], s[1])));
    const W = Math.max(300, Math.round(sky.clientWidth || 600)), pad = W < 500 ? 30 : 46;
    const b = bounds(unit), asp = (b[3] - b[2]) / (b[1] - b[0]);
    const H = Math.round(Math.min(Math.max((W - 2 * pad) * asp + 2 * pad, W * .7), W * 1.3, 760));
    const f = fitBox(b, W, H, pad), F = p => f(p);
    const kk = W < 500 ? .9 : 1.05;
    const st = (ra, dec, m, extra) => { const p = f(pr(ra, dec)); return p ? `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r1(starR(m, kk))}" fill="#fff"${extra || ''}/>` : ''; };
    const line = (P, cls, ex) => `<polyline class="${cls}" ${cls.includes('nw') ? 'pathLength="1" ' : ''}points="${ptsAttr(P.map(F))}"${ex || ''}/>`;
    const lbl = (p, txt, cls, dx, dy, anc) => { const q = F(p); return `<text class="${cls || 'sn'}" x="${r1(q[0] + (dx || 0))}" y="${r1(q[1] + (dy || 0))}" text-anchor="${anc || 'middle'}">${E(txt)}</text>`; };
    const ring = (p, r, cls, d) => { const q = F(p); return `<circle class="ring ${cls || ''} fd" cx="${r1(q[0])}" cy="${r1(q[1])}" r="${r}" style="animation-delay:${d || 0}s"/>`; };
    const dirS = (a, b) => { const p = F(a), q = F(b), dx = p[0] - q[0], dy = p[1] - q[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
    const nrm = d => { const l = Math.hypot(d[0], d[1]) || 1; return [d[0] / l, d[1] / l]; };
    const lblS = (p, d, dist, txt, cls) => { const q = F(p), y = q[1] + d[1] * dist, tw = txt.length * (cls === 'big' ? 16 : 12.5); let x = q[0] + d[0] * dist; const anc = Math.abs(d[0]) < .4 ? 'middle' : d[0] > 0 ? 'start' : 'end';
      const lo = anc === 'start' ? 6 : anc === 'end' ? 6 + tw : 6 + tw / 2, hi = anc === 'start' ? W - 6 - tw : anc === 'end' ? W - 6 : W - 6 - tw / 2; x = Math.min(Math.max(x, lo), hi); return `<text class="${cls || 'sn'}" x="${r1(x)}" y="${r1(y + 5)}" text-anchor="${anc}">${E(txt)}</text>`; };
    const ax = method === 'dip' ? dirS(Du, M) : dirS(cG, X);
    let nx = [-ax[1], ax[0]];
    if (method === 'dip') { const bw = dirS(u('페크다'), Du); if (nx[0] * bw[0] + nx[1] * bw[1] > 0) nx = [-nx[0], -nx[1]]; }
    const isLast = step === STEPS[method].length - 1;
    let bg = '';
    D.bg.forEach(s => { const p = f(pr(s[0], s[1])); if (p && p[0] > -5 && p[0] < W + 5 && p[1] > -5 && p[1] < H + 5) bg += `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r1(starR(s[2], .65 * kk))}" fill="#fff" opacity=".5"/>`; });
    let base = uma.lines.map(l => line(l.map(p => pr(p[0], p[1])), 'lb')).join('') + byId.Cas.lines.map(l => line(l.map(p => pr(p[0], p[1])), 'lb')).join('');
    [uma, byId.Cas, umi].forEach(c => c.stars.forEach(s => base += st(s[0], s[1], s[2])));
    const dipLine = line(['알카이드', '미자르', '알리오스', '메그레즈', '페크다', '메라크', '두베', '메그레즈'].map(u), 'hl' + (method === 'dip' && step === 0 && !still ? ' nw' : ''));
    const casLine = line(CAS.map(u), 'hl' + (method === 'cas' && step === 0 && !still ? ' nw' : ''));
    const nw = still ? '' : ' nw';
    let ov = '';
    const tickSvg = (T, d0) => T.map((p, i) => { const q = F(p); return `<g class="fd" style="animation-delay:${(d0 + i * .3).toFixed(2)}s"><circle class="tk" cx="${r1(q[0])}" cy="${r1(q[1])}" r="${i === 4 ? 4.5 : 3.2}"/><text class="tkt" x="${r1(q[0] + nx[0] * 14)}" y="${r1(q[1] + nx[1] * 14 + 4)}" text-anchor="middle">${i + 1}</text></g>`; }).join('');
    const polaris = d => `${ring(Po, 15, '', d)}<circle class="pol fd" cx="${r1(F(Po)[0])}" cy="${r1(F(Po)[1])}" r="${r1(starR(N['북극성'].mag, kk) + 1)}" style="animation-delay:${d}s"/>`;
    const umiLines = d => umi.lines.map(l => line(l.map(p => pr(p[0], p[1])), 'hl' + nw, ` style="animation-delay:${d}s;stroke:#ffb35c"`)).join('');
    if (method === 'dip') {
      ov += dipLine + lbl(add(u('메그레즈'), u('알리오스'), .5), '북두칠성', 'big', 0, 26);
      if (step >= 1) ov += ring(M, 11, 'g') + ring(Du, 11, 'g', .2) + line([M, Du], 'gd' + nw) + lblS(M, nrm([nx[0] - ax[0], nx[1] - ax[1]]), 16, '메라크', 'tkt') + lblS(Du, nx, 18, '두베', 'tkt');
      if (step >= 2) ov += line([Du, dTicks[4]], 'gd dash') + tickSvg(dTicks, still ? 0 : .3);
      if (step >= 3) ov += umiLines(0) + polaris(.4) + lblS(Po, ax, 26, '북극성', 'big') + lbl(add(u('북극성'), [umi.stars.reduce((t, s) => t + pr(s[0], s[1])[0], 0) / umi.stars.length, umi.stars.reduce((t, s) => t + pr(s[0], s[1])[1], 0) / umi.stars.length], 1.6), '작은곰자리', 'sn');
    } else {
      { const ext = Math.max(...CAS.map(n => { const q = F(u(n)), g = F(cG); return (q[0] - g[0]) * nx[0] + (q[1] - g[1]) * nx[1]; })); ov += casLine + lblS(cG, nx, ext + 18, '카시오페이아자리', 'big'); }
      if (step >= 1) ov += line([cB, X], 'gd' + nw) + line([cE, X], 'gd' + nw) + ring(X, 7, 'g', still ? 0 : 1) + lblS(X, [-ax[0], -ax[1]], 16, '만나는 점', 'tkt');
      if (step >= 2) ov += line([X, cG], 'gd' + nw, ' style="stroke:#ffd60a"') + ring(cG, 11, '', .2) + lblS(cG, nrm([ax[0] - nx[0] * 1.2, ax[1] - nx[1] * 1.2]), 18, '가운데 별', 'tkt');
      if (step >= 3) ov += line([cG, cTicks[4]], 'gd dash') + tickSvg(cTicks, still ? 0 : .3);
      if (step >= 4) ov += umiLines(0) + polaris(.4) + lblS(Po, ax, 26, '북극성', 'big');
    }
    sky.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="북쪽 하늘에서 북극성 찾기">${bg}${base}${ov}</svg>`;
    const steps = box.querySelector('.gk-steps'), n = STEPS[method].length;
    steps.innerHTML = `<div class="no">${n}단계 중 ${step + 1}단계</div><p class="tx">${E(STEPS[method][step])}</p><div class="gk-btns"><button class="btn ghost" type="button" data-a="prev"${step ? '' : ' disabled'}>‹ 이전</button><button class="btn" type="button" data-a="next">${isLast ? '처음부터 ↺' : '다음 ›'}</button></div>`;
    steps.querySelector('[data-a=prev]').onclick = () => { if (step) { step--; drawPole(true); } };
    steps.querySelector('[data-a=next]').onclick = () => { if (isLast) { step = 0; drawPole(); } else { step++; drawPole(); } if (step === n - 1) sfx2('right'); };
  }

  /* ----- 3. 별자리 카드 ----- */
  function drawCards() {
    const F = [['all', '전체'], ['spring', '봄'], ['summer', '여름'], ['autumn', '가을'], ['winter', '겨울'], ['north', '북쪽 하늘'], ['south', '남반구']];
    box.innerHTML = `<div class="gk-cats" role="group" aria-label="계절">${F.map(([k, l]) => `<button type="button" data-f="${k}" aria-pressed="${k === cardFilter}">${l}</button>`).join('')}</div><div class="gk-stcards"></div>
      <p class="gk-note">카드를 누르면 찾는 방법과 별자리 이야기를 볼 수 있어요. 계절은 우리나라에서 저녁에 보기 좋은 때예요.</p>`;
    const grid = box.querySelector('.gk-stcards');
    const fill = () => {
      const list = D.cons.filter(c => cardFilter === 'all' || c.season === cardFilter);
      grid.innerHTML = list.map(c => `<button type="button" class="gk-stc" data-id="${c.id}"><div class="mini">${miniSky(c, 200, 150)}</div><b>${E(c.ko)}</b><div>${seaChip(c)}</div><div class="st">${c.bright ? '가장 밝은 별' : '대표 별'}: ${E(c.star)}</div></button>`).join('');
      grid.querySelectorAll('.gk-stc').forEach(b => b.onclick = () => openModal(byId[b.dataset.id], b));
    };
    box.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { cardFilter = b.dataset.f; box.querySelectorAll('[data-f]').forEach(x => x.setAttribute('aria-pressed', x === b)); fill(); });
    fill();
  }
  let modal = null, modalKey = null, modalFrom = null;
  function closeModal() {
    if (modal) { modal.remove(); modal = null; }
    if (modalKey) { document.removeEventListener('keydown', modalKey); modalKey = null; }
    if (modalFrom && modalFrom.isConnected) { try { modalFrom.focus({ preventScroll: true }); } catch (e) {} } modalFrom = null;
  }
  onLeave(closeModal);
  function openModal(c, from) {
    closeModal(); modalFrom = from;
    modal = document.createElement('div'); modal.className = 'gk-modal';
    modal.innerHTML = `<div class="box" role="dialog" aria-modal="true" aria-label="${E(c.ko)}" tabindex="-1"><button type="button" class="x" aria-label="닫기">×</button>${starInfo(c)}</div>`;
    body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    modal.querySelector('.x').onclick = closeModal;
    modalKey = e => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', modalKey);
    modal.querySelector('.x').focus({ preventScroll: true });
  }

  /* ----- 4. 퀴즈 ----- */
  function startQuiz() {
    const cons = D.cons;
    const pic = shuffle(cons).slice(0, 4).map(c => {
      const opts = choicesFrom(c, cons, x => x.id);
      return { q: `이 모양은 어떤 별자리일까요?<div class="gk-qsky">${miniSky(c, 300, 220, 18)}</div>`, choices: opts.map(x => ({ html: E(x.ko), ok: x === c })), answer: c.ko, explain: `이 모양은 <b>${E(c.ko)}</b>${J(c.ko, '이에요', '예요')}. ${E(c.find)}` };
    });
    const seasonal = cons.filter(c => SEA_SHORT[c.season] && ['spring', 'summer', 'autumn', 'winter'].includes(c.season));
    const sea = shuffle(seasonal).slice(0, 3).map(c => ({
      q: `<b>${E(c.ko)}</b>${J(c.ko, '은', '는')}<br>어느 계절 저녁 하늘에서 잘 보일까요?`,
      choices: ['spring', 'summer', 'autumn', 'winter'].map(k => ({ html: SEA_SHORT[k], ok: k === c.season })), answer: SEA_SHORT[c.season],
      explain: `${E(eunnun(c.ko))} <b>${SEA_SHORT[c.season]}</b> 저녁 하늘에서 잘 보여요. ${E(c.find)}` }));
    const starQ = shuffle(cons.filter(c => QSTAR[c.id])).slice(0, 3).map(c => {
      const nm = pick(QSTAR[c.id]);
      const opts = choicesFrom(c, cons, x => x.id);
      const note = STAR_NOTE[nm] ? `(${STAR_NOTE[nm]})` : '';
      return { q: `<b>${E(nm)}</b>${E(note)}${J(nm, '이', '가')} 있는 별자리는<br>어느 것일까요?`, choices: opts.map(x => ({ html: E(x.ko), ok: x === c })), answer: c.ko,
        explain: `${E(nm)}${E(note)}${J(nm, '은', '는')} <b>${E(c.ko)}</b>에 있어요. ${E(c.fact)}` };
    });
    const qs = shuffle(pic.concat(sea, starQ));
    runQuiz(box, qs, { ref: 'stars', title: '별자리 퀴즈', retry: startQuiz });
  }

  drawSkyTab();
}

/* =================== 11. 공룡 시대 =================== */
const ERA_COL = ['#8e6bbf', '#2f8f5b', '#d9822b'];
function yearsKo(m) { // 백만 년 → "2억 5,200만"
  const man = Math.round(m * 100); const eok = Math.floor(man / 10000), rest = man % 10000;
  return (eok ? eok + '억' + (rest ? ' ' : '') : '') + (rest ? nf(rest) + '만' : '');
}
async function viewDino(app) {
  const body = shell(app, 'dino');
  let eras; try { eras = await data('dinos'); } catch (e) { return fail(body); }
  eras = eras.slice().sort((a, b) => b.from - a.from);
  const first = eras[0], last = eras[eras.length - 1];
  body.innerHTML = segHtml('보기', [['tl', '시간 띠'], ['quiz', '어느 시대일까?']], 'tl') + '<div class="gk-db"></div>';
  const box = body.querySelector('.gk-db');
  const tl = () => {
    box.innerHTML = `<div class="gk-panel"><div class="gk-tl" role="img" aria-label="중생대 시간 띠">${eras.map((e, k) => `<div style="flex:${e.from - e.to};background:${ERA_COL[k % 3]}">${E(e.ko)}</div>`).join('')}</div>
      <div class="gk-tlx"><span>${yearsKo(first.from)} 년 전</span><span>${yearsKo(last.to)} 년 전</span></div>
      <div class="gk-ast"><svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><path d="M4 6l14 14" stroke="#f29900" stroke-width="4" stroke-linecap="round" opacity=".6"/><path d="M8 4l10 12" stroke="#fbbc04" stroke-width="2.5" stroke-linecap="round" opacity=".6"/><circle cx="25" cy="25" r="10" fill="#7a6a5a"/><circle cx="22" cy="22" r="2.5" fill="#5c4f43"/><circle cx="28" cy="28" r="2" fill="#5c4f43"/></svg><span>${yearsKo(last.to)} 년 전 소행성 충돌<br><span style="font-weight:500;color:var(--sub);font-size:13.5px">이때 공룡 대부분이 사라졌어요</span></span></div>
      <p class="gk-note">공룡이 살던 때를 ‘중생대’라고 해요. 세 시대를 합치면 약 ${yearsKo(first.from - last.to)} 년이나 돼요. 사람은 공룡이 사라지고도 아주 오랜 시간이 지난 뒤에 나타났어요.</p></div>
      <div class="gk-eras">${eras.map((e, k) => `<div class="gk-era" style="border-top-color:${ERA_COL[k % 3]}"><h3>${E(e.ko)}</h3><div class="yr">${yearsKo(e.from)} ~ ${yearsKo(e.to)} 년 전<br>약 ${yearsKo(e.from - e.to)} 년 동안</div><div class="ds">${(e.dinos || []).map(d => `<span>${E(d)}</span>`).join('')}</div>${e.fact ? `<p>${E(e.fact)}</p>` : ''}</div>`).join('')}</div>`;
  };
  const quiz = () => {
    const all = []; const seen = new Set();
    eras.forEach(e => (e.dinos || []).forEach(d => { if (!seen.has(d)) { seen.add(d); all.push({ d, e }); } }));
    const qs = shuffle(all).slice(0, 10).map(x => ({ q: `<b>${E(x.d)}</b>${J(x.d, '은', '는')}<br>어느 시대에 살았을까요?`, choices: eras.map(e => ({ html: E(e.ko), ok: e === x.e })), answer: x.e.ko, explain: `${E(x.d)}${J(x.d, '은', '는')} <b>${E(x.e.ko)}</b>(${yearsKo(x.e.from)} ~ ${yearsKo(x.e.to)} 년 전)에 살았어요.` }));
    runQuiz(box, qs, { ref: 'dino', title: '공룡 시대 퀴즈', retry: quiz });
  };
  bindSeg(body, '.seg', v => v === 'tl' ? tl() : quiz());
  tl();
}

/* =================== 12. 세계 시간 =================== */
const CITIES = [['서울', '대한민국', 'Asia/Seoul'], ['도쿄', '일본', 'Asia/Tokyo'], ['베이징', '중국', 'Asia/Shanghai'], ['뉴델리', '인도', 'Asia/Kolkata'], ['두바이', '아랍에미리트', 'Asia/Dubai'], ['모스크바', '러시아', 'Europe/Moscow'],
  ['파리', '프랑스', 'Europe/Paris'], ['런던', '영국', 'Europe/London'], ['뉴욕', '미국', 'America/New_York'], ['로스앤젤레스', '미국', 'America/Los_Angeles'], ['시드니', '오스트레일리아', 'Australia/Sydney'], ['상파울루', '브라질', 'America/Sao_Paulo']];
const fmtCache = {};
function partsIn(tz, d) {
  const f = fmtCache[tz] || (fmtCache[tz] = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'short' }));
  const p = {}; f.formatToParts(d).forEach(x => p[x.type] = x.value); p.hour = +p.hour % 24; return p;
}
function offsetMin(tz, d) { const p = partsIn(tz, d); return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, p.hour, +p.minute, +p.second) - Math.floor(d.getTime() / 1000) * 1000) / 60000); }
const WD = { Sun: '일', Mon: '월', Tue: '화', Wed: '수', Thu: '목', Fri: '금', Sat: '토' };
const SUN_IC = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="#fbbc04"/><g stroke="#fbbc04" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></g></svg>';
const MOON_IC = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="#5c6bc0"/></svg>';
function viewTime(app) {
  const body = shell(app, 'time');
  const now0 = new Date();
  let cities;
  try { cities = CITIES.map(c => ({ c, o: offsetMin(c[2], now0) })); } catch (e) { body.innerHTML = '<p class="gk-err">이 브라우저에서는 세계 시간을 보여 줄 수 없어요.</p>'; return; }
  const home = cities[0]; const rest = cities.slice(1).sort((a, b) => b.o - a.o);
  const list = [home].concat(rest);
  body.innerHTML = `<div class="gk-clocks">${list.map((x, k) => `<div class="gk-clk${k === 0 ? ' home' : ''}" data-tz="${x.c[2]}">
      <svg class="face" width="66" height="66" viewBox="0 0 66 66" aria-hidden="true"><circle cx="33" cy="33" r="31" fill="#fff" stroke="#d2d2d7" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${33 + 25 * Math.sin(a)}" y1="${33 - 25 * Math.cos(a)}" x2="${33 + 28 * Math.sin(a)}" y2="${33 - 28 * Math.cos(a)}" stroke="#8e8e93" stroke-width="${i % 3 ? 1.2 : 2.4}"/>`; }).join('')}<line class="h" x1="33" y1="33" x2="33" y2="17" stroke="#1d1d1f" stroke-width="3.4" stroke-linecap="round"/><line class="m" x1="33" y1="33" x2="33" y2="9" stroke="#1d1d1f" stroke-width="2.2" stroke-linecap="round"/><line class="s" x1="33" y1="37" x2="33" y2="8" stroke="#d93025" stroke-width="1.2"/><circle cx="33" cy="33" r="2.6" fill="#d93025"/></svg>
      <div style="min-width:0"><div class="ct">${x.c[0]}<small>${x.c[1]}</small></div><div class="tm"><span class="t"></span> <span class="dn"></span></div><div class="dd"></div><div class="df"></div></div></div>`).join('')}</div>
    <p class="gk-note">지구는 하루에 한 바퀴씩 돌아서, 해가 뜨는 시각이 나라마다 달라요. 그래서 동쪽에 있는 도시일수록 시간이 빨라요. 어떤 나라는 여름에 시계를 1시간 앞당기는 ‘서머타임’을 쓰는데, 이 시계는 그것까지 저절로 맞춰 줘요. 해 그림은 오전 6시~오후 6시, 달 그림은 그 밖의 시간이에요.</p>`;
  const els = [...body.querySelectorAll('.gk-clk')];
  const diffTxt = m => { if (m === 0) return '서울과 시간이 같아요'; const a = Math.abs(m), h = Math.floor(a / 60), mm = a % 60; return `서울보다 ${h ? h + '시간' : ''}${h && mm ? ' ' : ''}${mm ? mm + '분' : ''} ${m > 0 ? '빨라요' : '느려요'}`; };
  const tick = () => {
    if (!body.isConnected) { clearInterval(iv); return; }
    const d = new Date(); const sp = partsIn('Asia/Seoul', d); const sDay = Date.UTC(+sp.year, +sp.month - 1, +sp.day); const sOff = offsetMin('Asia/Seoul', d);
    els.forEach((el, k) => {
      const tz = el.dataset.tz, p = partsIn(tz, d), off = offsetMin(tz, d);
      const h = p.hour, m = +p.minute, s = +p.second;
      el.querySelector('.t').textContent = `${h < 12 ? '오전' : '오후'} ${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')}`;
      const day = h >= 6 && h < 18; el.classList.toggle('night', !day);
      const dn = el.querySelector('.dn'); if (dn.dataset.d !== String(day)) { dn.dataset.d = String(day); dn.innerHTML = day ? SUN_IC : MOON_IC; dn.setAttribute('title', day ? '낮' : '밤'); }
      const dd = Math.round((Date.UTC(+p.year, +p.month - 1, +p.day) - sDay) / 864e5);
      el.querySelector('.dd').textContent = `${+p.month}월 ${+p.day}일 (${WD[p.weekday] || ''})${k === 0 ? '' : dd === 0 ? ' · 서울과 같은 날' : dd < 0 ? ' · 서울보다 하루 전(어제)' : ' · 서울보다 하루 뒤(내일)'}`;
      el.querySelector('.df').textContent = k === 0 ? '지금 우리나라 시간' : diffTxt(off - sOff);
      const rot = (cls, deg) => el.querySelector('line.' + cls).setAttribute('transform', `rotate(${deg} 33 33)`);
      rot('h', (h % 12) * 30 + m * .5); rot('m', m * 6 + s * .1); rot('s', s * 6);
    });
  };
  tick(); const iv = setInterval(tick, 1000); onLeave(() => clearInterval(iv));
}

/* ---------- 진입점 ---------- */
let currentSub = '';
const VIEWS = { map: viewMap, flags: viewFlags, capitals: viewCapitals, peaks: viewPeaks, morse: viewMorse, quiz: viewQuiz, greet: viewGreet, korea: viewKorea, space: viewSpace, stars: viewStars, dino: viewDino, time: viewTime };
const GK = window.GK = {
  acts: ACTS,
  leave,
  async render(app, sub) {
    leave(); injectCss();
    currentSub = VIEWS[sub] ? sub : '';
    if (!currentSub) return viewHome(app);
    try { await VIEWS[currentSub](app); } catch (e) { console.warn('gk', e); const b = app.querySelector('.gk-body'); if (b) fail(b); }
  }
};
})();
