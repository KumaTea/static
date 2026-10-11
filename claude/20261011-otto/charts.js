// Charts for "Laughter, by measurement". Plain SVG, no libraries. All data comes from data.js (build.py blog).
"use strict";
(() => {
  const B = window.BLOG;
  // The page's language. index.zh.html sets lang="zh-CN": every chart label then comes from this table (English is the
  // key), and the few sentences built from data have a Chinese variant inline (ZH ? … : …).
  const ZH = (document.documentElement.lang || "").startsWith("zh");
  const ZH_TEXT = {
    "■ Stop": "■ 停止",
    "Play": "播放",
    "Play the laugh": "播放这段笑声",
    "Hear this note": "听这个音",
    "Play this \"ha\"": "播放这个「哈」",
    "Hear it": "听听看",
    "What to play": "播放内容",
    "original vocals": "原版人声",
    "Otto": "电棍",
    "original": "原版",
    "notes the draft got right: same pitch, start within 120 ms": "初稿完全正确的音：音高相同，起点误差在 120 ms 以内",
    "right pitch, wrong timing: moved by hand": "音高对、时间错：手工挪动",
    "wrong pitch": "音高错误",
    "missed entirely, added by hand": "完全漏掉，手工补上",
    "our mix, 1:10–2:08": "我们的混音，1:10–2:08",
    "the original PV, same 58 seconds": "原版 PV，同样的 58 秒",
    "highest true peak (ceiling: −1)": "最高真峰值（上限 −1）",
    "time the limiter had to act": "限制器介入的时长",
    "shift of the file against the YouTube audio": "文件相对 YouTube 音频的偏移",
    "match (correlation)": "吻合度（相关系数）",
    "correlation": "相关系数",
    "position in the file": "在文件中的位置",
    "local offset − overall offset (samples)": "局部偏移 − 整体偏移（采样点）",
    "Drift check": "漂移检查",
    " samples": " 个采样点",
    "Source": "音源",
    "Offset": "偏移",
    "Peak correlation": "峰值相关系数",
    "Largest drift": "最大漂移",
    "sung pitch": "演唱音高",
    "time in the video": "视频时间",
    "Pitch of the humming and the notes": "哼唱的音高与音符",
    "narration": "旁白",
    "corrected note": "修正后的音符",
    "automatic note": "自动识别的音符",
    "Window position": "窗口位置",
    "stereo width": "立体声宽度",
    "harmonics-to-noise": "谐噪比",
    "beating": "拍频",
    "off-harmonic energy": "非谐波能量",
    "side vs mid energy": "侧声道与中声道的能量比",
    "overlaps this note": "与这个音重叠",
    "solo opening": "独唱开头",
    "Layers per phrase": "每个乐句的层数",
    "layers used": "实际层数",
    "measured suggestion": "测量建议",
    "used": "实际使用",
    "Phrase": "乐句",
    "From": "开始",
    "To": "结束",
    "Measured": "测量值",
    "Used": "实际使用",
    "inhale": "吸气",
    "loudness (dB)": "响度（dB）",
    "pitch (only where the voice is pitched)": "音高（只在有音高的地方）",
    "cut score": "切分分数",
    "its pitch (median)": "音高（中位数）",
    "tired (0 fresh → 1 spent)": "疲惫度（0 精神 → 1 力竭）",
    "loudness": "响度",
    "pitch": "音高",
    "Loudness, pitch and cut score of the laugh": "笑声的响度、音高与切分分数",
    "Unit": "片段",
    "Length": "时长",
    "\"h\"": "「h」",
    "Pitch": "音高",
    "Tired": "疲惫度",
    "pitch shift": "移调",
    "stretch": "拉伸",
    "tiredness": "疲惫度",
    "repeat": "重复",
    "overuse": "过度使用",
    "clash": "撞车",
    "The notes, coloured by which laugh sings the lead": "各个音符，按领唱所用的笑声着色",
    "sings the lead": "担任领唱",
    "voices": "个声部",
    "voice": "个声部",
    "stream laugh": "直播笑声",
    "sample-site laugh": "素材站笑声",
    "cost": "代价",
    "shift to the note": "移到目标音",
    "total": "总计",
    "Candidate": "候选",
    "Total": "总计",
    "Shift": "移调",
    "Stretch": "拉伸",
    "time from the start of the cut": "从片段开头算起的时间",
    "frequency (Hz)": "频率（Hz）",
    "vowel starts": "元音开始",
    "unvoiced": "无声",
    "no pitch": "无音高",
    "breathiness": "气声程度",
    "50 dB below that moment's loudest frequency": "比该时刻最响的频率低 50 dB",
    "the loudest": "最响",
    "Breathiness over time": "气声程度随时间的变化",
    " natural": " 自然",
    " half": " 一半",
    " flat": " 平直",
    "time in the note (0 = the beat)": "音内时间（0 = 拍点）",
    "moment of the original \"ha\"": "原始「哈」中的位置",
    "Time map": "时间映射",
    "stretched": "被拉伸",
    "1× speed": "1× 速度",
    "note ends": "音结束",
    "into the original \"ha\"": "原始「哈」中的位置",
    "1× (normal)": "1×（原速）",
    "playback": "播放速度",
    "semitones from the note": "与目标音相差的半音数",
    "Rendered pitch": "渲染出的音高",
    "the note": "目标音",
    "the laugh's own (α = 1)": "笑声本身的起伏（α = 1）",
    "rendered pitch − target (cents)": "渲染音高 − 目标（音分）",
    "Pitch error per note": "每个音的音高误差",
    "off the target": "偏离目标",
    "Version": "版本",
    "Median error": "误差中位数",
    "Over 30¢": "超过 30¢",
    "Over 100¢": "超过 100¢",
    "Notes checked": "检查的音数",
    "α = 1 (natural)": "α = 1（自然）",
    "α = 0.5, capped": "α = 0.5，有拉伸上限",
    "α = 0 (flat)": "α = 0（平直）",
    "α = 0.5, full stretch (chosen)": "α = 0.5，完整拉伸（最终选择）",
    "original humming": "原版哼唱",
    "Otto choir (final mix)": "电棍合唱（最终混音）",
    "how far below the loudest moment": "比最响时刻低多少",
    "share of 10 ms moments": "10 ms 片段的占比",
    "Distribution of peak levels": "峰值电平分布",
    "Otto, with our reverb": "电棍，加上我们的混响",
    "time after the phrase's last note ends": "乐句最后一个音结束后的时间",
    "level relative to the end of the note": "相对音尾的电平",
    "Decay after phrase ends": "乐句结束后的衰减",
    "humming (average of 3)": "哼唱（3 处平均）",
    "Otto (average of 3)": "电棍（3 处平均）"
  };
  const tr = s => (ZH && ZH_TEXT[s] != null ? ZH_TEXT[s] : s);
  const NS = "http://www.w3.org/2000/svg";
  const NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  const noteName = m => { const r = Math.round(m); return NAMES[((r % 12) + 12) % 12] + (Math.floor(r / 12) - 1); };
  const isSharp = m => NAMES[((Math.round(m) % 12) + 12) % 12].includes("♯");
  const fmtT = s => { const m = Math.floor(s / 60); return m + ":" + (s - 60 * m).toFixed(2).padStart(5, "0"); };
  const at = (name, t) => ZH ? `${fmtT(t)} 的 ${name}` : `${name} at ${fmtT(t)}`;
  const fmtTk = v => fmtT(v).replace(/\.00$/, "");
  const num = (v, d = 1) => (v < 0 ? "−" : "") + Math.abs(v).toFixed(d);
  const sgn = (v, d = 1) => (v > 0 ? "+" : v < 0 ? "−" : "±") + Math.abs(v).toFixed(d);
  const cents = m => { const c = Math.round((m - Math.round(m)) * 100); return noteName(m) + " " + (c >= 0 ? "+" : "−") + Math.abs(c) + "¢"; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const col = n => `var(--s${n})`;
  const isDark = () => {
    const t = document.documentElement.dataset.theme;
    return t === "dark" || (t !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  };

  // ------------------------------------------------------------------ tiny DOM + scale helpers
  function S(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function H(tag, attrs, parent, text) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(g, x, y, s, cls, anchor, base) {
    const t = S("text", { x, y, class: cls || "", "text-anchor": anchor || "start", "dominant-baseline": base || "auto" }, g);
    t.textContent = s;
    return t;
  }
  function lin(d0, d1, r0, r1) {
    const f = v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
    f.inv = p => d0 + (p - r0) / (r1 - r0) * (d1 - d0);
    f.d0 = d0; f.d1 = d1;
    return f;
  }
  function logScale(d0, d1, r0, r1) {
    const a = Math.log(d0), b = Math.log(d1);
    const f = v => r0 + (Math.log(v) - a) / (b - a) * (r1 - r0);
    f.inv = p => Math.exp(a + (p - r0) / (r1 - r0) * (b - a));
    f.d0 = d0; f.d1 = d1;
    return f;
  }
  function ticks(a, b, n) {
    const step0 = (b - a) / Math.max(1, n), mag = Math.pow(10, Math.floor(Math.log10(step0))), e = step0 / mag;
    const step = (e >= 7.5 ? 10 : e >= 3.5 ? 5 : e >= 1.5 ? 2 : 1) * mag, out = [];
    for (let v = Math.ceil(a / step - 1e-9) * step; v <= b + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }
  function linePath(n, xAt, yAt) {               // breaks at null/NaN
    let d = "", pen = false;
    for (let i = 0; i < n; i++) {
      const yv = yAt(i);
      if (yv == null || Number.isNaN(yv)) { pen = false; continue; }
      d += (pen ? "L" : "M") + xAt(i).toFixed(1) + "," + yv.toFixed(1);
      pen = true;
    }
    return d;
  }
  function path(g, d, color, cls, extra) {
    return S("path", Object.assign({ d, class: "ln " + (cls || ""), style: `stroke:${color}` }, extra || {}), g);
  }
  function dot(g, x, y, color, r = 4) {
    return S("circle", { cx: x, cy: y, r, style: `fill:${color};stroke:var(--surface);stroke-width:2` }, g);
  }
  let clipN = 0;

  // a frame: axes, recessive grid, a clipped plot group
  function frame(el, o) {
    el.textContent = "";
    const W = Math.max(260, el.clientWidth), Hh = el.clientHeight;
    const m = Object.assign({ t: 24, r: 14, b: o.xLabel ? 38 : 26, l: 46 }, o.m || {});
    const svg = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}`, role: "img" }, el);
    if (o.label) svg.setAttribute("aria-label", o.label);
    const x = (o.xlog ? logScale : lin)(o.x[0], o.x[1], m.l, W - m.r);
    const y = (o.ylog ? logScale : lin)(o.y[0], o.y[1], Hh - m.b, m.t);
    const g = S("g", {}, svg);
    const yt = o.yTicks || ticks(o.y[0], o.y[1], o.yn || 4);
    for (const v of yt) {
      const py = Math.round(y(v)) + 0.5;
      if (py < m.t - 1 || py > Hh - m.b + 1) continue;
      S("line", { x1: m.l, x2: W - m.r, y1: py, y2: py, class: "gridline" }, g);
      const s = (o.yFmt || String)(v);
      if (s) txt(g, m.l - 6, py, s, "", "end", "middle");
    }
    S("line", { x1: m.l, x2: W - m.r, y1: Hh - m.b + 0.5, y2: Hh - m.b + 0.5, class: "axisline" }, g);
    const xt = o.xTicks || ticks(o.x[0], o.x[1], o.xn || Math.max(3, Math.floor((W - m.l - m.r) / 80)));
    for (const v of xt) {
      const px = x(v);
      if (px < m.l - 1 || px > W - m.r + 1) continue;
      S("line", { x1: px, x2: px, y1: Hh - m.b, y2: Hh - m.b + 4, class: "axisline" }, g);
      txt(g, px, Hh - m.b + 15, (o.xFmt || String)(v), "", "middle");
    }
    if (o.xLabel) txt(g, W - m.r, Hh - 3, o.xLabel, "", "end");
    if (o.yLabel) txt(g, m.l, m.t - 10, o.yLabel, "", "start");
    const id = "clip" + (++clipN);
    S("rect", { x: m.l, y: m.t - 2, width: W - m.l - m.r, height: Hh - m.t - m.b + 4 }, S("clipPath", { id }, S("defs", {}, svg)));
    const plot = S("g", { "clip-path": `url(#${id})` }, svg);
    return { svg, g, plot, x, y, W, H: Hh, m };
  }

  // ------------------------------------------------------------------ the one tooltip
  const tip = document.getElementById("tip");
  function showTip(pt, title, rows) {
    tip.textContent = "";
    if (title) H("div", { class: "t" }, tip, title);
    for (const r of rows) {
      const d = H("div", { class: "row" }, tip);
      if (r.c) { const k = H("i", { class: "k" }, d); k.style.borderTopColor = r.c; }
      H("b", null, d, r.v);
      if (r.l) H("span", null, d, r.l);
    }
    tip.hidden = false;
    const pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
    let px = pt.clientX + pad, py = pt.clientY + pad;
    if (px + w > innerWidth - 8) px = pt.clientX - w - pad;
    if (py + h > innerHeight - 8) py = pt.clientY - h - pad;
    tip.style.left = Math.max(8, px) + "px";
    tip.style.top = Math.max(8, py) + "px";
  }
  const hideTip = () => { tip.hidden = true; };

  // crosshair: a hairline that snaps to the nearest data x; onX(xv) → {x, title, rows} | null
  function crosshair(f, onX, opts = {}) {
    const { svg, m, W, H: Hh, x } = f;
    const top = opts.top ?? m.t, bottom = opts.bottom ?? Hh - m.b;
    const line = S("line", { class: "crosshair", y1: top, y2: bottom, visibility: "hidden" }, svg);
    const hit = S("rect", { x: m.l, y: top, width: W - m.l - m.r, height: bottom - top, fill: "transparent" }, svg);
    let cur = (x.d0 + x.d1) / 2;
    const hide = () => { line.setAttribute("visibility", "hidden"); hideTip(); };
    function at(xv, pt) {
      const r = onX(clamp(xv, Math.min(x.d0, x.d1), Math.max(x.d0, x.d1)));
      if (!r) { hide(); return; }
      cur = r.x;
      const px = x(r.x);
      line.setAttribute("x1", px); line.setAttribute("x2", px); line.setAttribute("visibility", "visible");
      showTip(pt, r.title, r.rows);
    }
    hit.addEventListener("pointermove", ev => { const b = svg.getBoundingClientRect(); at(x.inv(ev.clientX - b.left), ev); });
    hit.addEventListener("pointerleave", hide);
    svg.setAttribute("tabindex", "0");
    const kpt = () => { const b = svg.getBoundingClientRect(); return { clientX: b.left + x(cur), clientY: b.top + top + 10 }; };
    svg.addEventListener("focus", () => at(cur, kpt()));
    svg.addEventListener("blur", hide);
    svg.addEventListener("keydown", ev => {
      if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
      ev.preventDefault();
      const step = (opts.step || (x.d1 - x.d0) / 50) * (ev.key === "ArrowRight" ? 1 : -1);
      cur = clamp(cur + step, Math.min(x.d0, x.d1), Math.max(x.d0, x.d1));
      at(cur, kpt());
    });
    return hit;
  }
  function nearest(arr, v) {                       // index of the closest value in a sorted array
    let lo = 0, hi = arr.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (arr[mid] < v) lo = mid; else hi = mid; }
    return Math.abs(arr[lo] - v) <= Math.abs(arr[hi] - v) ? lo : hi;
  }

  // ------------------------------------------------------------------ chart registry, controls
  const charts = [];
  function chart(fig, name, draw) {
    const el = fig.querySelector(`[data-chart="${name}"]`);
    const c = { draw: () => draw(el) };
    charts.push(c);
    return c;
  }
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => charts.forEach(c => c.draw()), 120); });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => charts.forEach(c => c.draw()));

  // ------------------------------------------------------------------ audio: one player for the whole page
  const AU = (() => {
    const a = new Audio();
    a.preload = "auto";
    const ext = a.canPlayType('audio/webm; codecs="opus"') ? "webm" : "m4a";
    const url = name => new URL(`audio/${name}.${ext}`, location.href).href;
    let job = null, raf = 0;
    function stop(ended = false) {                    // ended: the clip (or its span) played to the end
      cancelAnimationFrame(raf);
      a.pause();
      const j = job;
      job = null;
      if (j && j.onStop) j.onStop(ended);
    }
    function tick() {
      if (!job) return;
      const t = a.currentTime;
      if (a.ended || (job.to != null && t >= job.to)) { stop(true); return; }
      if (job.onFrame) job.onFrame(t);
      raf = requestAnimationFrame(tick);
    }
    function play(name, from, to, onFrame, onStop) {
      stop();
      document.querySelectorAll("audio").forEach(x => x.pause());
      const j = job = { onFrame, onStop, to };
      const go = () => {
        if (job !== j) return;
        a.currentTime = Math.max(0, from);
        a.play().then(() => { if (job === j) tick(); }).catch(() => { if (job === j) stop(); });
      };
      const src = url(name);
      if (a.src !== src) { a.src = src; a.addEventListener("loadedmetadata", go, { once: true }); }
      else if (a.readyState >= 1) go();
      else a.addEventListener("loadedmetadata", go, { once: true });
    }
    a.addEventListener("error", () => { if (job) stop(); });
    document.addEventListener("play", e => { if (e.target !== a && job) stop(); }, true);
    // the page works without the audio/ folder: if the clips aren't there, the players go away
    const probe = new Audio();
    probe.preload = "metadata";
    probe.addEventListener("error", () => document.body.classList.add("noaudio"));
    probe.src = url("ha_otto_07");
    return { play, stop: () => stop(false) };
  })();

  // play controls in a figure's control row: [optional source switch] [▶ label]
  function audioCtl(fig, label, sources) {
    const box = H("span", { class: "playbox" }, fig.querySelector(".controls"));
    let src = sources ? sources[0][0] : null;
    const ctl = { active: false, onToggle: null, get src() { return src; } };
    if (sources) {
      const sg = H("span", { class: "seg", role: "group", "aria-label": tr("What to play") }, box);
      for (const [v, l] of sources) H("button", { "data-v": v, "aria-pressed": String(v === src), type: "button" }, sg, l);
      sg.addEventListener("click", ev => {
        const b = ev.target.closest("button");
        if (!b) return;
        sg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        src = b.dataset.v;
        if (ctl.active) ctl.onToggle();                 // switch what's playing, from the same moment
      });
    }
    const btn = H("button", { class: "play", type: "button" }, box);
    ctl.set = on => { ctl.active = on; btn.textContent = on ? tr("■ Stop") : "▶ " + label; btn.setAttribute("aria-pressed", String(on)); };
    ctl.set(false);
    btn.addEventListener("click", () => ctl.active ? AU.stop() : ctl.onToggle());
    return ctl;
  }
  // a playhead: one hairline per chart frame, all at the same time t (in each frame's x units)
  function playhead() {
    const ph = { t: null, frames: {} };
    ph.add = (key, f, top, bottom) => {
      const l = S("line", { class: "playhead", y1: top ?? f.m.t, y2: bottom ?? f.H - f.m.b, visibility: "hidden" }, f.svg);
      ph.frames[key] = { f, l };
      ph.place();
    };
    ph.place = () => {
      for (const k in ph.frames) {
        const { f, l } = ph.frames[k], lo = Math.min(f.x.d0, f.x.d1), hi = Math.max(f.x.d0, f.x.d1);
        if (ph.t == null || ph.t < lo || ph.t > hi) { l.setAttribute("visibility", "hidden"); continue; }
        const px = f.x(ph.t);
        l.setAttribute("x1", px); l.setAttribute("x2", px); l.setAttribute("visibility", "visible");
      }
    };
    return ph;
  }
  const VT0 = B.audio.vocals_t0;
  const VOCALS = [["vocals_orig", tr("original vocals")], ["vocals_otto", tr("Otto")]];

  function seg(fig, name, onChange, items, sel) {
    const box = fig.querySelector(`[data-ctl="${name}"]`);
    if (items) for (const [v, label] of items) H("button", { "data-v": v, "aria-pressed": String(v === sel) }, box, label);
    box.addEventListener("click", ev => {
      const b = ev.target.closest("button");
      if (!b) return;
      box.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      onChange(b.dataset.v);
    });
    return box.querySelector('[aria-pressed="true"]').dataset.v;
  }
  function table(fig, name, head, rows) {
    const t = fig.querySelector(`[data-table="${name}"]`);
    t.textContent = "";
    const row0 = H("tr", null, H("thead", null, t));
    head.forEach(h => H("th", null, row0, tr(h)));
    const tb = H("tbody", null, t);
    rows.forEach(r => { const row = H("tr", null, tb); r.forEach(c => H("td", null, row, c)); });
  }
  function tiles(name, items) {
    const box = document.querySelector(`[data-tiles="${name}"]`);
    for (const [v, l] of items) { const t = H("div", { class: "tile" }, box); H("div", { class: "v" }, t, v); H("div", { class: "l" }, t, l); }
  }
  function legend(name, items) {             // [color, label, kind]
    const box = document.querySelector(`[data-legend="${name}"]`);
    box.textContent = "";
    for (const [c, l, kind] of items) {
      const s = H("span", null, box);
      const k = H("i", { class: "key " + (kind || "box") }, s);
      k.style.setProperty("--c", c);
      s.appendChild(document.createTextNode(l));
    }
  }
  function setNum(name, v) { document.querySelectorAll(`[data-num="${name}"]`).forEach(e => { e.textContent = v; }); }

  // ================================================================== numbers in the text
  const P = B.pitch, M = B.mix;
  setNum("lines", B.lines_of_python.toLocaleString("en-US"));
  setNum("mixres", num(B.align.mixture_residual_db) + " dB");
  setNum("ytres", num(B.align.yt_vs_lossless_db) + " dB");
  setNum("draftcount", String(P.draft_count));
  setNum("tempo-tracked", String(P.tempo_tracked));
  setNum("tempo", String(P.tempo));
  setNum("pitchfit", Math.round(P.pitch_fit * 100) + " %");
  setNum("otto-med", M.peaks.otto.median_below.toFixed(1) + " dB");
  setNum("hum-med", M.peaks.humming.median_below.toFixed(1) + " dB");
  const cc = P.compare;
  tiles("compare", [
    [String(cc.same), tr("notes the draft got right: same pitch, start within 120 ms")],
    [String(cc.moved), tr("right pitch, wrong timing: moved by hand")],
    [String(cc["pitch changed"]), tr("wrong pitch")],
    [String(cc["missing in draft"]), tr("missed entirely, added by hand")],
  ]);
  tiles("final", [
    [num(M.lufs_ours) + " LUFS", tr("our mix, 1:10–2:08")],
    [num(M.lufs_original) + " LUFS", tr("the original PV, same 58 seconds")],
    [num(M.mix.excerpt_true_peak_dbtp.final) + " dBTP", tr("highest true peak (ceiling: −1)")],
    [M.mix.limiter.ms_reduced + " ms", tr("time the limiter had to act")],
  ]);

  // ================================================================== 1. cross-correlation
  {
    const fig = document.getElementById("fig-align"), A = B.align;
    let si = 0, zoom = "coarse";
    seg(fig, "src", v => { si = +v; xc.draw(); dr.draw(); }, A.sources.map((s, i) => [String(i), s.name.split(" (")[0]]), "0");
    seg(fig, "zoom", v => { zoom = v; xc.draw(); });
    const xc = chart(fig, "xcorr", el => {
      const s = A.sources[si], c = s[zoom], fine = zoom === "fine", n = c.t.length;
      let lo = Math.min(...c.z), hi = Math.max(...c.z);
      const pad = (hi - lo) * 0.1;
      const f = frame(el, {
        x: [c.t[0], c.t[n - 1]], y: [Math.min(0, lo - pad), hi + pad], m: { l: 52 },
        xFmt: v => fine ? num(v, 0) + " ms" : num(v, 1) + " s", yFmt: v => v.toFixed(fine ? 2 : 1),
        xLabel: tr("shift of the file against the YouTube audio"), yLabel: tr("match (correlation)"),
        label: ZH ? `${s.name.split(" (")[0]} 与 YouTube 音频的互相关` : `Cross-correlation of ${s.name} against the YouTube audio`,
      });
      path(f.plot, linePath(n, i => f.x(c.t[i]), i => f.y(c.z[i])), col(1));
      const px = f.x(fine ? s.lag_ms : s.lag_ms / 1000), py = f.y(Math.max(...c.z));
      dot(f.svg, px, py, col(1));
      const lab = txt(f.svg, px + 8, py + 4, sgn(s.lag_ms, 3) + " ms", "lbl-strong", px > f.W * 0.7 ? "end" : "start");
      if (px > f.W * 0.7) lab.setAttribute("x", px - 8);
      crosshair(f, xv => {
        const i = nearest(c.t, xv);
        return { x: c.t[i], title: (fine ? sgn(c.t[i], 2) + " ms" : sgn(c.t[i], 3) + " s"), rows: [{ v: c.z[i].toFixed(3), l: tr("correlation"), c: col(1) }] };
      });
    });
    const dr = chart(fig, "drift", el => {
      const s = A.sources[si], d = s.drift;
      const f = frame(el, {
        x: [0, 200], y: [-0.5, 0.5], yTicks: [-0.5, -0.25, 0, 0.25, 0.5], yFmt: v => sgn(v, 2).replace("±0.00", "0"),
        xFmt: v => v + " s", xLabel: tr("position in the file"), yLabel: tr("local offset − overall offset (samples)"), m: { l: 52 },
        label: tr("Drift check"),
      });
      d.t.forEach((t, i) => dot(f.plot, f.x(t), f.y(clamp(d.dev[i], -0.5, 0.5)), col(1)));
      crosshair(f, xv => {
        const i = nearest(d.t, xv);
        return { x: d.t[i], title: ZH ? `${d.t[i].toFixed(0)} 秒处的窗口` : `window at ${d.t[i].toFixed(0)} s`, rows: [{ v: sgn(d.dev[i], 3) + tr(" samples"), l: `${sgn(d.dev[i] / 48, 2)} µs`, c: col(1) }] };
      }, { step: 15 });
    });
    xc.draw(); dr.draw();
    table(fig, "align", ["Source", "Offset", "Peak correlation", "Largest drift"], A.sources.map(s => [
      ZH ? s.name.split(" (")[0] : s.name, sgn(s.lag_ms, 3) + " ms", s.peak.toFixed(3), Math.max(...s.drift.dev.map(Math.abs)).toFixed(3) + tr(" samples")]));
  }

  // ================================================================== 2. pitch and notes
  {
    const fig = document.getElementById("fig-pitch");
    const N = P.sung.length, tAt = i => P.t0 + i * P.dt, tEnd = tAt(N - 1);
    const show = new Set(["sung", "final"]);
    let win = 8, w0 = P.final[0][0] - 0.6;
    fig.querySelectorAll('[data-ctl="layers"] input').forEach(inp => inp.addEventListener("change", () => {
      inp.checked ? show.add(inp.value) : show.delete(inp.value);
      det.draw();
    }));
    seg(fig, "win", v => { const c = w0 + win / 2; win = +v; w0 = clamp(c - win / 2, P.t0, tEnd - win); det.draw(); ov.draw(); });
    const ph = playhead(), actl = audioCtl(fig, tr("Play"), VOCALS);
    actl.onToggle = () => {
      const from = ph.t != null && ph.t >= w0 && ph.t < w0 + win ? ph.t : w0;
      AU.play(actl.src, from - VT0, null, t => {
        ph.t = VT0 + t;
        if (ph.t > w0 + win || ph.t < w0) { w0 = clamp(ph.t - win * 0.05, P.t0, tEnd - win); det.draw(); ov.draw(); }
        ph.place();
      }, ended => { actl.set(false); if (ended) { ph.t = null; ph.place(); } });
      actl.set(true);
    };
    const shift = -P.offset_s, per = P.grid.period;
    const series = { sung: [P.sung, 2, tr("sung pitch")], pyin: [P.pyin, 3, "pYIN"], harvest: [P.harvest, 5, "Harvest"] };
    const noteAt = (list, t) => list.find(n => n[0] <= t && t < n[1]);

    const det = chart(fig, "pitch", el => {
      const w1 = w0 + win, i0 = Math.max(0, Math.floor((w0 - P.t0) / P.dt)), i1 = Math.min(N - 1, Math.ceil((w1 - P.t0) / P.dt));
      let lo = Infinity, hi = -Infinity;           // scaled to the notes: stray pitch during narration is clipped
      for (const n of P.final) if (n[1] > w0 && n[0] < w1) { lo = Math.min(lo, n[2]); hi = Math.max(hi, n[2]); }
      if (!isFinite(lo)) for (let i = i0; i <= i1; i++) { const v = P.sung[i]; if (v != null) { lo = Math.min(lo, v); hi = Math.max(hi, v); } }
      if (!isFinite(lo)) { lo = 55; hi = 67; }
      lo = Math.floor(lo) - 2; hi = Math.ceil(hi) + 2;
      if (hi - lo < 10) { const c = (hi + lo) / 2; lo = Math.floor(c - 5); hi = Math.ceil(c + 5); }
      const yt = []; for (let v = lo; v <= hi; v++) yt.push(v);
      const f = frame(el, {
        x: [w0, w1], y: [lo - 0.5, hi + 0.5], yTicks: yt, yFmt: v => [0, 2, 4, 7, 9].includes(((v % 12) + 12) % 12) ? noteName(v) : "", xFmt: fmtTk,
        xLabel: tr("time in the video"), label: tr("Pitch of the humming and the notes"), m: { l: 40 },
      });
      // beat grid: bars (every 4th beat on the FL clock) a step stronger
      for (let k = Math.ceil((w0 - P.grid.phase) / per); P.grid.phase + k * per <= w1; k++) {
        const t = P.grid.phase + k * per, bar = ((Math.round((t + shift) / per) % 4) + 4) % 4 === 0;
        S("line", { x1: f.x(t), x2: f.x(t), y1: f.m.t, y2: f.H - f.m.b, class: bar ? "axisline" : "gridline" }, f.plot);
      }
      for (const [a, b] of P.narration) if (b > w0 && a < w1) {
        S("rect", { x: f.x(a), y: f.m.t, width: f.x(b) - f.x(a), height: f.H - f.m.t - f.m.b, style: "fill:var(--muted);opacity:.16" }, f.plot);
        txt(f.plot, f.x(Math.max(a, w0)) + 4, f.m.t + 12, tr("narration"), "lbl");
      }
      if (show.has("final")) for (const [s, e, m] of P.final) if (e > w0 && s < w1)
        S("rect", { x: f.x(s), y: f.y(m + 0.42), width: Math.max(1, f.x(e) - f.x(s) - 1), height: f.y(m - 0.42) - f.y(m + 0.42), rx: 3, style: "fill:var(--s1);opacity:.28" }, f.plot);
      if (show.has("draft")) for (const [s, e, m] of P.draft) if (e > w0 && s < w1)
        S("rect", { x: f.x(s) + 1, y: f.y(m + 0.3), width: Math.max(1, f.x(e) - f.x(s) - 2), height: f.y(m - 0.3) - f.y(m + 0.3), rx: 2, style: "fill:none;stroke:var(--ink2);stroke-width:1.5" }, f.plot);
      for (const k of ["harvest", "pyin", "sung"]) if (show.has(k)) {
        const [arr, c] = series[k];
        path(f.plot, linePath(i1 - i0 + 1, j => f.x(tAt(i0 + j)), j => arr[i0 + j] == null ? null : f.y(arr[i0 + j])), col(c), k === "sung" ? "" : "thin");
      }
      crosshair(f, xv => {
        const i = clamp(Math.round((xv - P.t0) / P.dt), 0, N - 1), t = tAt(i), rows = [];
        for (const k of ["sung", "pyin", "harvest"]) {
          const [arr, c, l] = series[k];
          if (show.has(k) || k === "sung") rows.push({ v: arr[i] == null ? "—" : cents(arr[i]), l, c: col(c) });
        }
        const fn = noteAt(P.final, t), dn = noteAt(P.draft, t);
        rows.push({ v: fn ? noteName(fn[2]) : "—", l: tr("corrected note") });
        if (show.has("draft")) rows.push({ v: dn ? noteName(dn[2]) : "—", l: tr("automatic note") });
        return { x: t, title: fmtT(t), rows };
      }, { step: 0.1 });
      ph.add("det", f);
    });

    const ov = chart(fig, "pitch-overview", el => {
      el.textContent = "";
      const W = Math.max(260, el.clientWidth), Hh = el.clientHeight, l = 40, r = 14;
      const svg = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}`, tabindex: "0", role: "slider",
        "aria-label": tr("Window position"), "aria-valuemin": P.t0.toFixed(0), "aria-valuemax": tEnd.toFixed(0) }, el);
      const x = lin(P.t0, tEnd, l, W - r), y = lin(50, 72, Hh - 14, 4);
      S("rect", { x: l, y: 2, width: W - l - r, height: Hh - 14, rx: 4, style: "fill:var(--wash)" }, svg);
      path(svg, linePath(N, i => x(tAt(i)), i => P.sung[i] == null ? null : y(clamp(P.sung[i], 50, 72))), col(2), "thin");
      const box = S("rect", { y: 1, height: Hh - 12, rx: 4, style: "fill:var(--s1);fill-opacity:.12;stroke:var(--s1);stroke-width:1.5" }, svg);
      for (const t of ticks(P.t0, tEnd, 6)) txt(svg, x(t), Hh - 1, fmtT(t).replace(/\.\d+$/, ""), "", "middle");
      const place = () => { box.setAttribute("x", x(w0)); box.setAttribute("width", x(w0 + win) - x(w0)); svg.setAttribute("aria-valuenow", w0.toFixed(1)); };
      place();
      const move = ev => { const b = svg.getBoundingClientRect(); w0 = clamp(x.inv(ev.clientX - b.left) - win / 2, P.t0, tEnd - win); AU.stop(); ph.t = null; place(); det.draw(); };
      svg.addEventListener("pointerdown", ev => { svg.setPointerCapture(ev.pointerId); move(ev); });
      svg.addEventListener("pointermove", ev => { if (svg.hasPointerCapture(ev.pointerId)) move(ev); });
      svg.addEventListener("keydown", ev => {
        if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
        ev.preventDefault();
        w0 = clamp(w0 + (ev.key === "ArrowRight" ? 1 : -1) * win / 4, P.t0, tEnd - win); AU.stop(); ph.t = null; place(); det.draw();
      });
    });
    det.draw(); ov.draw();
  }

  // ================================================================== 3. how many voices
  {
    const fig = document.getElementById("fig-stack"), St = B.stack;
    let meas = "side_mid_db";
    const label = { side_mid_db: tr("stereo width"), hnr_db: tr("harmonics-to-noise"), beating: tr("beating"), off_harm: tr("off-harmonic energy") };
    seg(fig, "measure", v => { meas = v; sc.draw(); });
    const ph = playhead(), actl = audioCtl(fig, tr("Play"), VOCALS);
    actl.onToggle = () => {
      AU.play(actl.src, (ph.t ?? VT0) - VT0, null, t => { ph.t = VT0 + t; ph.place(); },
        ended => { actl.set(false); if (ended) { ph.t = null; ph.place(); } });
      actl.set(true);
    };
    const X = [73.5, 128];
    const mids = St.notes.map(n => (n.s + n.e) / 2);
    const sc = chart(fig, "stack", el => {
      const vals = St.notes.map(n => n.z[meas]).filter(v => v != null);
      const lo = Math.min(-2, ...vals), hi = Math.max(2, ...vals);
      const f = frame(el, {
        x: X, y: [Math.floor(lo) - 0.5, Math.ceil(hi) + 0.5], xFmt: fmtTk, yFmt: v => (v > 0 ? "+" : "") + v + "σ",
        yLabel: ZH ? `${label[meas]}：相对独唱开头的标准差` : `${label[meas]}: standard deviations from the solo opening`,
        label: ZH ? `每个音的${label[meas]}` : `${label[meas]} per note`,
      });
      S("rect", { x: f.x(St.notes[0].s), y: f.m.t, width: f.x(St.baseline_end) - f.x(St.notes[0].s), height: f.H - f.m.t - f.m.b, style: "fill:var(--wash)" }, f.plot);
      txt(f.plot, f.x(St.notes[0].s) + 4, f.m.t + 12, tr("solo opening"), "lbl");
      S("line", { x1: f.m.l, x2: f.W - f.m.r, y1: f.y(0), y2: f.y(0), class: "axisline" }, f.plot);
      for (const n of St.notes) {
        const v = n.z[meas];
        if (v == null) continue;
        S("line", { x1: f.x(n.s) + 1.5, x2: Math.max(f.x(n.s) + 2, f.x(n.e) - 1.5), y1: f.y(v), y2: f.y(v),
          style: `stroke:${n.narr ? "var(--muted)" : col(1)};stroke-width:3;stroke-linecap:round` }, f.plot);
      }
      crosshair(f, xv => {
        const i = nearest(mids, xv), n = St.notes[i], v = n.z[meas];
        const rows = [{ v: v == null ? "—" : sgn(v, 2) + "σ", l: label[meas], c: n.narr ? "var(--muted)" : col(1) }];
        if (meas === "side_mid_db") rows.push({ v: num(n.width_db) + " dB", l: tr("side vs mid energy") });
        if (n.narr) rows.push({ v: tr("narration"), l: tr("overlaps this note") });
        return { x: mids[i], title: at(n.name, n.s), rows };
      }, { step: 0.5 });
      ph.add("stack", f);
    });
    const ly = chart(fig, "layers", el => {
      const f = frame(el, { x: X, y: [0.5, 4.5], yTicks: [1, 2, 3, 4], xFmt: fmtTk, xLabel: tr("time in the video"), label: tr("Layers per phrase") });
      const step = key => {
        let d = "";
        St.phrases.forEach((p, i) => {
          const nx = i + 1 < St.phrases.length ? St.phrases[i + 1].s : p.e;
          d += (i ? "L" : "M") + f.x(p.s).toFixed(1) + "," + f.y(p[key]).toFixed(1) + "L" + f.x(nx).toFixed(1) + "," + f.y(p[key]).toFixed(1);
        });
        return d;
      };
      path(f.plot, step("measured"), col(2), "", { style: `stroke:${col(2)};stroke-width:5;opacity:.45` });
      path(f.plot, step("layers"), col(1));
      crosshair(f, xv => {
        let i = St.phrases.findIndex((p, k) => xv < (k + 1 < St.phrases.length ? St.phrases[k + 1].s : Infinity));
        if (i < 0) i = St.phrases.length - 1;
        const p = St.phrases[i];
        return { x: clamp(xv, p.s, p.e), title: ZH ? `第 ${p.p + 1} 句：${fmtT(p.s)}–${fmtT(p.e)}` : `phrase ${p.p + 1}: ${fmtT(p.s)}–${fmtT(p.e)}`,
          rows: [{ v: String(p.layers), l: tr("layers used"), c: col(1) }, { v: String(p.measured), l: tr("measured suggestion"), c: col(2) }] };
      }, { step: 1 });
      const lg = S("g", {}, f.svg);
      [[col(1), tr("used")], [col(2), tr("measured suggestion")]].forEach(([c, l], k) => {
        const x0 = f.m.l + k * 70;
        S("line", { x1: x0, x2: x0 + 14, y1: 10, y2: 10, style: `stroke:${c};stroke-width:${k ? 5 : 2};opacity:${k ? .45 : 1}` }, lg);
        txt(lg, x0 + 18, 10, l, "lbl", "start", "middle");
      });
      ph.add("layers", f);
    });
    sc.draw(); ly.draw();
    table(fig, "phrases", ["Phrase", "From", "To", "Measured", "Used"], St.phrases.map(p => [
      String(p.p + 1), fmtT(p.s), fmtT(p.e), String(p.measured), String(p.layers)]));
  }

  // ================================================================== 4. cutting the laughs
  {
    const fig = document.getElementById("fig-units");
    let si = 0;
    seg(fig, "usrc", v => { AU.stop(); si = +v; uc.draw(); fill(); });
    const ph = playhead(), actl = audioCtl(fig, tr("Play the laugh"));
    const playSpan = (a, b) => {
      const U = B.units[si];
      AU.play("laugh_" + U.src, a - U.t0, b == null ? null : b - U.t0, t => { ph.t = U.t0 + t; ph.place(); },
        () => { actl.set(false); ph.t = null; ph.place(); });
      actl.set(true);
    };
    actl.onToggle = () => playSpan(B.units[si].t0, null);
    const label = u => u.breath ? tr("inhale") : u.id.split("_").pop();
    const uc = chart(fig, "units", el => {
      el.textContent = "";
      const U = B.units[si], n = U.level.length, tAt = i => U.t0 + i * U.dt;
      const W = Math.max(260, el.clientWidth), Hh = el.clientHeight, m = { t: 42, r: 14, b: 30, l: 46 }, gap = 24;
      const panelH = (Hh - m.t - m.b - 2 * gap) / 3;
      const svg = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}`, role: "img", "aria-label": tr("Loudness, pitch and cut score of the laugh") }, el);
      const x = lin(tAt(0), tAt(n - 1), m.l, W - m.r);
      const lv = U.level.filter(v => v != null), md = U.midi.filter(v => v != null), sc = U.score.filter(v => v != null);
      const panels = [
        { key: "level", y: [Math.max(Math.min(...lv), Math.max(...lv) - 45), Math.max(...lv) + 2], c: col(1), fmt: v => num(v, 0), title: tr("loudness (dB)") },
        { key: "midi", y: [Math.floor(Math.min(...md)) - 1, Math.ceil(Math.max(...md)) + 1], c: col(2), fmt: noteName, title: tr("pitch (only where the voice is pitched)"), step: 1 },
        { key: "score", y: [0, Math.ceil(Math.max(...sc)) + 1], c: col(1), fmt: v => String(v), title: tr("cut score") },
      ];
      const g = S("g", {}, svg);
      // the units: shaded blocks across all three panels
      U.units.forEach((u, k) => {
        if (k % 2 === 0) S("rect", { x: x(u.s), y: m.t, width: x(u.e) - x(u.s), height: Hh - m.t - m.b, style: "fill:var(--wash)" }, g);
        for (const t of [u.s, u.e]) S("line", { x1: x(t), x2: x(t), y1: m.t - 20, y2: Hh - m.b, class: "axisline" }, g);
        const cx = (x(u.s) + x(u.e)) / 2;
        if (x(u.e) - x(u.s) > 14 || u.breath) txt(g, cx, m.t - 26, label(u), "lbl", "middle");
      });
      panels.forEach((p, k) => {
        const top = m.t + k * (panelH + gap), y = lin(p.y[0], p.y[1], top + panelH, top);
        p.yScale = y;
        const keep = p.y[1] - p.y[0] > 18 ? [0] : [0, 4, 7];     // octaves only when the range is wide
        const yt = p.step ? (() => { const a = []; for (let v = Math.ceil(p.y[0]); v <= p.y[1]; v++) if (keep.includes(((v % 12) + 12) % 12)) a.push(v); return a; })() : ticks(p.y[0], p.y[1], 3);
        for (const v of yt) {
          const py = Math.round(y(v)) + 0.5;
          S("line", { x1: m.l, x2: W - m.r, y1: py, y2: py, class: "gridline" }, g);
          const s = p.fmt(v);
          if (s) txt(g, m.l - 6, py, s, "", "end", "middle");
        }
        txt(g, m.l, top - 7, p.title, "lbl");
        path(g, linePath(n, i => x(tAt(i)), i => U[p.key][i] == null ? null : y(clamp(U[p.key][i], p.y[0], p.y[1]))), p.c);
      });
      S("line", { x1: m.l, x2: W - m.r, y1: Hh - m.b + 0.5, y2: Hh - m.b + 0.5, class: "axisline" }, g);
      for (const t of ticks(tAt(0), tAt(n - 1), Math.floor((W - m.l - m.r) / 70))) txt(g, x(t), Hh - m.b + 15, t.toFixed(1) + " s", "", "middle");
      const f = { svg, m, W, H: Hh, x };
      crosshair(f, xv => {
        const i = clamp(Math.round((xv - U.t0) / U.dt), 0, n - 1), t = tAt(i);
        const u = U.units.find(u => u.s <= t && t < u.e);
        const rows = [];
        if (u) {
          if (u.breath) rows.push({ v: tr("inhale"), l: `${u.dur_ms.toFixed(0)} ms` });
          else {
            rows.push({ v: u.note, l: tr("its pitch (median)") });
            rows.push({ v: u.dur_ms.toFixed(0) + " ms", l: ZH ? `长，其中「h」${u.pre_ms.toFixed(0)} ms` : `long, of which "h" ${u.pre_ms.toFixed(0)} ms` });
            rows.push({ v: u.tired.toFixed(2), l: tr("tired (0 fresh → 1 spent)") });
          }
        }
        rows.push({ v: U.level[i] == null ? "—" : num(U.level[i]) + " dB", l: tr("loudness"), c: col(1) });
        rows.push({ v: U.midi[i] == null ? "—" : cents(U.midi[i]), l: tr("pitch"), c: col(2) });
        rows.push({ v: U.score[i] == null ? "—" : U.score[i].toFixed(1), l: tr("cut score"), c: col(1) });
        return { x: t, title: (u ? u.id + " · " : "") + t.toFixed(3) + " s", rows };
      }, { top: m.t, bottom: Hh - m.b, step: 0.02 }).addEventListener("click", ev => {
        const b = svg.getBoundingClientRect(), t = x.inv(ev.clientX - b.left), u = U.units.find(u => u.s <= t && t < u.e);
        if (u) playSpan(u.s, u.e);
      });
      ph.add("u", f, m.t - 20, Hh - m.b);
    });
    const fill = () => table(fig, "units", ["Unit", "From", "To", "Length", '"h"', "Pitch", "Tired"], B.units[si].units.map(u => [
      u.id, u.s.toFixed(3) + " s", u.e.toFixed(3) + " s", u.dur_ms.toFixed(0) + " ms", u.breath ? "—" : u.pre_ms.toFixed(0) + " ms",
      u.breath ? tr("inhale") : u.note, u.breath ? "—" : u.tired.toFixed(2)]));
    uc.draw(); fill();
  }

  // ================================================================== 5. casting
  {
    const fig = document.getElementById("fig-cast"), Cs = B.casting;
    const TERMS = [["shift", tr("pitch shift"), 1], ["stretch", tr("stretch"), 2], ["exhaustion", tr("tiredness"), 3],
      ["repeat", tr("repeat"), 4], ["reuse", tr("overuse"), 5], ["clash", tr("clash"), 6]];
    legend("terms", TERMS.map(([, l, c]) => [col(c), l]));
    const srcCol = id => id.startsWith("otto2") ? col(2) : col(1);
    let sel = Cs.notes.findIndex(n => n.i === 46);
    const select = fig.querySelector('[data-ctl="note"]');
    Cs.notes.forEach((n, k) => H("option", { value: k }, select, `#${n.i + 1} · ${at(n.name, n.s)} (${(n.e - n.s).toFixed(2)} s)`));
    select.value = sel;
    select.addEventListener("change", () => { AU.stop(); sel = +select.value; strip.draw(); bars.draw(); fill(); });
    const choose = k => { AU.stop(); sel = k; select.value = k; strip.draw(); bars.draw(); fill(); };
    const ph = playhead(), actl = audioCtl(fig, tr("Hear this note"), [["vocals_otto", tr("Otto")], ["vocals_orig", tr("original")]]);
    actl.onToggle = () => {
      const n = Cs.notes[sel];
      AU.play(actl.src, n.s - 0.15 - VT0, n.e + 0.3 - VT0, t => { ph.t = VT0 + t; ph.place(); },
        () => { actl.set(false); ph.t = null; ph.place(); });
      actl.set(true);
    };

    const strip = chart(fig, "strip", el => {
      const ms = Cs.notes.map(n => n.midi);
      const f = frame(el, {
        x: [73.5, 128], y: [Math.min(...ms) - 1.5, Math.max(...ms) + 1.5], yTicks: [48, 52, 55, 60, 64, 67, 72].filter(v => v >= Math.min(...ms) - 1 && v <= Math.max(...ms) + 1),
        yFmt: noteName, xFmt: fmtTk, label: tr("The notes, coloured by which laugh sings the lead"), m: { t: 22 },
      });
      Cs.notes.forEach((n, k) => {
        const lead = n.cands[0].id, x0 = f.x(n.s), w = Math.max(2, f.x(n.e) - x0 - 1.5), yc = f.y(n.midi);
        const on = k === sel;
        S("rect", { x: x0, y: yc - (on ? 5 : 3), width: w, height: on ? 10 : 6, rx: 2,
          style: `fill:${srcCol(lead)};${on ? "stroke:var(--ink);stroke-width:2" : ""}` }, f.svg);
        const hit = S("rect", { x: x0 - 2, y: yc - 11, width: Math.max(10, w + 4), height: 22, fill: "transparent", style: "cursor:pointer" }, f.svg);
        hit.addEventListener("click", () => choose(k));
        hit.addEventListener("pointermove", ev => showTip(ev, `#${n.i + 1} · ${at(n.name, n.s)}`,
          [{ v: lead, l: tr("sings the lead"), c: srcCol(lead) }, { v: String(n.layers), l: tr(n.layers > 1 ? "voices" : "voice") }]));
        hit.addEventListener("pointerleave", hideTip);
      });
      [[col(1), tr("stream laugh")], [col(2), tr("sample-site laugh")]].forEach(([c, l], k) => {
        const x0 = f.m.l + k * 110;
        S("rect", { x: x0, y: 5, width: 12, height: 8, rx: 2, style: `fill:${c}` }, f.svg);
        txt(f.svg, x0 + 17, 9, l, "lbl", "start", "middle");
      });
      ph.add("strip", f);
    });

    const bars = chart(fig, "costs", el => {
      el.textContent = "";
      const n = Cs.notes[sel], cands = n.cands;
      const W = Math.max(260, el.clientWidth), Hh = el.clientHeight, m = { t: 8, r: 56, b: 26, l: 112 };
      const svg = S("svg", { width: W, height: Hh, viewBox: `0 0 ${W} ${Hh}`, role: "img", "aria-label": ZH ? `第 ${n.i + 1} 个音的候选代价` : `Costs of the candidates for note ${n.i + 1}` }, el);
      const max = Math.max(...cands.map(c => c.total)) * 1.05, x = lin(0, max, m.l, W - m.r);
      for (const v of ticks(0, max, 4)) {
        const px = Math.round(x(v)) + 0.5;
        S("line", { x1: px, x2: px, y1: m.t, y2: Hh - m.b, class: "gridline" }, svg);
        txt(svg, px, Hh - m.b + 15, String(v), "", "middle");
      }
      txt(svg, W - m.r, Hh - 2, tr("cost"), "", "end");
      S("line", { x1: m.l + 0.5, x2: m.l + 0.5, y1: m.t, y2: Hh - m.b, class: "axisline" }, svg);
      const rowH = (Hh - m.t - m.b) / cands.length, bh = Math.min(22, rowH * 0.62);
      cands.forEach((c, k) => {
        const yc = m.t + rowH * (k + 0.5), g = S("g", { tabindex: "0", role: "img" }, svg);
        g.setAttribute("aria-label", `${c.id}: total ${c.total}`);
        const u = Cs.units[c.id];
        txt(g, m.l - 8, yc - 6, (k === 0 ? "✓ " : "") + c.id, k === 0 ? "lbl-strong" : "lbl", "end", "middle");
        txt(g, m.l - 8, yc + 8, noteName(u.midi) + " · " + u.len.toFixed(2) + " s", "", "end", "middle");
        let acc = 0;
        const parts = TERMS.filter(([key]) => c.terms[key] > 0.005);
        parts.forEach(([key, l, ci], j) => {
          const v = c.terms[key], x0 = x(acc), x1 = x(acc + v), last = j === parts.length - 1;
          acc += v;
          const w = Math.max(1, x1 - x0 - (last ? 0 : 2));
          const style = `fill:${col(ci)}`;
          let seg;
          if (last && w > 4) {
            const r = 4, y0 = yc - bh / 2;
            seg = S("path", { d: `M${x0},${y0}h${w - r}a${r},${r} 0 0 1 ${r},${r}v${bh - 2 * r}a${r},${r} 0 0 1 -${r},${r}h-${w - r}z`, style }, g);
          } else seg = S("rect", { x: x0, y: yc - bh / 2, width: w, height: bh, style }, g);
          seg.addEventListener("pointermove", ev => showTip(ev, c.id, [{ v: v.toFixed(2), l, c: col(ci) },
            { v: sgn(c.shift, 1) + " st", l: tr("shift to the note") }, { v: "×" + c.stretch.toFixed(2), l: tr("stretch") }]));
          seg.addEventListener("pointerleave", hideTip);
        });
        txt(g, x(c.total) + 6, yc, c.total.toFixed(1), k === 0 ? "lbl-strong" : "lbl", "start", "middle");
        g.addEventListener("focus", () => {
          const b = g.getBoundingClientRect();
          showTip({ clientX: b.right, clientY: b.top }, `${c.id} · ${tr("total")} ${c.total.toFixed(2)}`,
            TERMS.map(([key, l, ci]) => ({ v: c.terms[key].toFixed(2), l, c: col(ci) })));
        });
        g.addEventListener("blur", hideTip);
      });
    });
    const fill = () => {
      const n = Cs.notes[sel];
      table(fig, "cands", ["Candidate", "Total", ...TERMS.map(t => t[1]), "Shift", "Stretch"], n.cands.map(c => [
        c.id, c.total.toFixed(2), ...TERMS.map(([k]) => c.terms[k].toFixed(2)), sgn(c.shift, 1) + " st", "×" + c.stretch.toFixed(2)]));
    };
    strip.draw(); bars.draw(); fill();
  }

  // ================================================================== 6. WORLD: one "ha" taken apart
  const Wd = B.world;
  const RAMP_LIGHT = ["#fcfcfb", "#cde2fb", "#86b6ef", "#3987e5", "#1c5cab", "#0d366b"];
  const RAMP_DARK = ["#1a1a19", "#104281", "#1c5cab", "#3987e5", "#86b6ef", "#cde2fb"];
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  function ramp(t) {
    const r = isDark() ? RAMP_DARK : RAMP_LIGHT, p = clamp(t, 0, 1) * (r.length - 1), i = Math.min(r.length - 2, Math.floor(p)), w = p - i;
    const a = hex(r[i]), b = hex(r[i + 1]);
    return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * w)).join(",")})`;
  }
  {
    const fig = document.getElementById("fig-world");
    let ui = 0;
    seg(fig, "wunit", v => { AU.stop(); ui = +v; wh.draw(); ap.draw(); }, Wd.units.map((u, i) => [String(i), `${u.id} (${u.note})`]), "0");
    const ph = playhead(), actl = audioCtl(fig, tr('Play this "ha"'));
    actl.onToggle = () => {
      AU.play("ha_" + Wd.units[ui].id, 0, null, t => { ph.t = t * 1000; ph.place(); }, () => { actl.set(false); ph.t = null; ph.place(); });
      actl.set(true);
    };
    const sc = fig.querySelector('[data-scale="world"]');
    const scaleBar = () => {
      sc.textContent = "";
      H("span", null, sc, tr("50 dB below that moment's loudest frequency"));
      const i = H("i", null, sc);
      i.style.background = `linear-gradient(to right, ${[0, .2, .4, .6, .8, 1].map(ramp).join(",")})`;
      H("span", null, sc, tr("the loudest"));
    };
    const DB = 50;
    const xs = u => u.f0.map((_, i) => i * u.dt * 1000);
    const wh = chart(fig, "world", el => {
      const u = Wd.units[ui], nF = u.env.length, nB = u.freqs.length, T = xs(u);
      const f = frame(el, {
        x: [0, nF * u.dt * 1000], y: [u.freqs[0], u.freqs[nB - 1]], ylog: true,
        yTicks: [100, 200, 500, 1000, 2000, 5000, 10000], yFmt: v => v >= 1000 ? v / 1000 + "k" : String(v),
        xFmt: v => v + " ms", xLabel: tr("time from the start of the cut"), yLabel: tr("frequency (Hz)"),
        label: ZH ? `${u.id} 的频谱包络与音高` : `Spectral envelope and pitch of ${u.id}`,
      });
      const cv = H("canvas", null);
      el.insertBefore(cv, el.firstChild);
      const pw = f.W - f.m.l - f.m.r, phh = f.H - f.m.t - f.m.b, dpr = devicePixelRatio || 1;
      Object.assign(cv.style, { left: f.m.l + "px", top: f.m.t + "px", width: pw + "px", height: phh + "px" });
      cv.width = Math.round(pw * dpr); cv.height = Math.round(phh * dpr);
      const ctx = cv.getContext("2d"), cw = cv.width / nF, chh = cv.height / nB;
      for (let i = 0; i < nF; i++) for (let b = 0, top = Math.max(...u.env[i]); b < nB; b++) {
        ctx.fillStyle = ramp((u.env[i][b] - top + DB) / DB);
        ctx.fillRect(Math.floor(i * cw), Math.floor(cv.height - (b + 1) * chh), Math.ceil(cw) + 1, Math.ceil(chh) + 1);
      }
      f.svg.style.position = "relative";
      const vx = f.x((u.vowel - u.start) * 1000);
      S("line", { x1: vx, x2: vx, y1: f.m.t, y2: f.H - f.m.b, style: "stroke:var(--ink);stroke-width:1.5" }, f.svg);
      txt(f.svg, vx + 5, f.m.t + 12, tr("vowel starts"), "lbl-strong");
      txt(f.svg, (f.m.l + vx) / 2, f.m.t + 12, tr('"h"'), "lbl-strong", "middle");
      const d = linePath(nF, i => f.x(T[i]), i => u.f0[i] > 0 ? f.y(u.f0[i]) : null);
      path(f.svg, d, "var(--surface)", "", { style: "stroke:var(--surface);stroke-width:5;opacity:.8" });
      path(f.svg, d, col(2));
      crosshair(f, xv => {
        const i = nearest(T, xv), f0 = u.f0[i];
        return { x: T[i], title: `${T[i].toFixed(0)} ms`, rows: [
          { v: f0 > 0 ? f0.toFixed(0) + " Hz" : tr("unvoiced"), l: f0 > 0 ? noteName(69 + 12 * Math.log2(f0 / 440)) : tr("no pitch"), c: col(2) },
          { v: u.ap[i].toFixed(2), l: tr("breathiness") }] };
      }, { step: 10 });
      ph.add("heat", f);
      scaleBar();
    });
    const ap = chart(fig, "ap", el => {
      const u = Wd.units[ui], T = xs(u);
      const f = frame(el, { x: [0, u.env.length * u.dt * 1000], y: [0, 1], yTicks: [0, 0.5, 1], xFmt: v => v + " ms", label: tr("Breathiness over time") });
      const vx = f.x((u.vowel - u.start) * 1000);
      S("line", { x1: vx, x2: vx, y1: f.m.t, y2: f.H - f.m.b, style: "stroke:var(--ink);stroke-width:1.5" }, f.plot);
      path(f.plot, linePath(T.length, i => f.x(T[i]), i => f.y(u.ap[i])), col(1));
      crosshair(f, xv => { const i = nearest(T, xv); return { x: T[i], title: `${T[i].toFixed(0)} ms`, rows: [{ v: u.ap[i].toFixed(2), l: tr("breathiness"), c: col(1) }] }; }, { step: 10 });
      ph.add("ap", f);
    });
    wh.draw(); ap.draw();
  }

  // ================================================================== 6b. the time map and α, live
  {
    const fig = document.getElementById("fig-tmap"), DT = 0.005;
    let ui = 0;
    const ctl = n => fig.querySelector(`[data-ctl="${n}"]`);
    const dur = ctl("dur"), alpha = ctl("alpha"), cap = ctl("cap");
    seg(fig, "tunit", v => { AU.stop(); ui = +v; redraw(); }, Wd.units.map((u, i) => [String(i), `${u.id} (${u.note})`]), "0");
    const ph = playhead(), actl = audioCtl(fig, tr("Hear it"));
    let heard = "";
    actl.onToggle = () => {
      // the renders are real WORLD renders made by build.py blog, for a few settings: snap the sliders to the nearest one
      const near = (arr, v) => arr.reduce((b, x) => Math.abs(x - v) < Math.abs(b - v) ? x : b);
      const a = near(B.audio.alphas, +alpha.value), d = near(B.audio.durs, +dur.value);
      alpha.value = a; dur.value = d; cap.checked = false;
      heard = ZH ? `正在播放 α = ${a}、${d} 秒的真实渲染。` : ` Playing the real render for α = ${a}, ${d} s.`;
      redraw();
      const v0 = state.tm.v * DT * 1000, u = Wd.units[ui];
      AU.play(`tm_${u.id}_a${Math.round(a * 100)}_d${Math.round(d * 100)}`, 0, null, t => { ph.t = t * 1000 - v0; ph.place(); },
        () => { actl.set(false); ph.t = null; heard = ""; redraw(); });
      actl.set(true);
    };
    const out = el => el.parentElement.querySelector("output");
    function timeMap(u, d, capped) {
      const nIn = Math.round((u.end - u.start) / DT), v = (u.vowel - u.start) / DT;
      const hold = Wd.onset_hold_ms / 1000 / DT, rel = Wd.release_ms / 1000 / DT;
      const ca = Math.min(v + hold, nIn - rel - 1), cb = Math.max(ca + 1, nIn - rel);
      const nat = cb - ca, want = d / DT + v - ca - rel;
      let stretch = nat > 0 ? want / nat : 1, fit = "fit", cut = null;
      if (capped && stretch > 2.5) { stretch = 2.5; fit = "ends early"; }
      if (stretch < 0.7) { stretch = 0.7; fit = "cut"; cut = Math.round(d / DT + v); }
      const oc = Math.max(1, Math.round(nat * stretch));
      let p = [];
      for (let i = 0; i < Math.floor(ca); i++) p.push(i);
      for (let i = 0; i < oc; i++) p.push(ca + i / oc * nat);
      for (let i = 0; i < Math.ceil(rel); i++) p.push(cb + i);
      p = p.filter(q => q < nIn - 1);
      if (cut !== null) p = p.slice(0, cut);
      return { p, stretch, fit, v, a: Math.floor(ca), b: Math.floor(ca) + oc };
    }
    function pitch(u, tm, a) {
      const f0 = u.f0, L = f0.length, fin = tm.p.map(q => {
        const i0 = Math.floor(q), i1 = Math.min(i0 + 1, L - 1), w = q - i0;
        return f0[i0] > 0 && f0[i1] > 0 ? Math.exp((1 - w) * Math.log(f0[i0]) + w * Math.log(f0[i1])) : null;
      });
      const logs = fin.filter(v => v).map(Math.log).sort((x, y) => x - y);
      const mid = logs.length ? (logs.length % 2 ? logs[(logs.length - 1) / 2] : (logs[logs.length / 2 - 1] + logs[logs.length / 2]) / 2) : 0;
      const nat = fin.map(v => v ? 12 * (Math.log(v) - mid) / Math.LN2 : null);
      return { nat, out: nat.map(v => v == null ? null : a * v) };
    }
    let state;
    const compute = () => {
      const u = Wd.units[ui], d = +dur.value, a = +alpha.value, tm = timeMap(u, d, cap.checked);
      out(dur).textContent = d.toFixed(2) + " s";
      out(alpha).textContent = a.toFixed(2) + (a === 1 ? tr(" natural") : a === 0.5 ? tr(" half") : a === 0 ? tr(" flat") : "");
      const T = tm.p.map((_, j) => (j - tm.v) * DT * 1000);
      state = { u, d, a, tm, T, pc: pitch(u, tm, a) };
      const pre = (tm.v * DT * 1000).toFixed(0), sx = tm.stretch.toFixed(2);
      fig.querySelector('[data-readout="tmap"]').textContent = ZH
        ? `元音中段被拉伸 ×${sx}，${{ fit: "这个「哈」正好填满整个音", "ends early": "受上限限制：这个「哈」在音结束之前就结束了", cut: "音比「哈」还短：「哈」被淡出截断" }[tm.fit]}。它的「h」比拍点早 ${pre} ms 开始。` + heard
        : `The vowel's middle is stretched ×${sx}, and the "ha" ${{ fit: "fills the note", "ends early": "is capped: it ends early, before the note does", cut: "is longer than the note: it is cut short with a fade" }[tm.fit]}. Its "h" starts ${pre} ms before the beat.` + heard;
    };
    const xDom = () => [Math.min(state.T[0], -state.tm.v * DT * 1000) - 10, Math.max(state.d * 1000, state.T[state.T.length - 1]) + 20];
    const tmc = chart(fig, "tmap", el => {
      const { u, tm, T, d } = state, nIn = Math.round((u.end - u.start) / DT);
      const f = frame(el, { x: xDom(), y: [0, nIn * DT * 1000], xFmt: v => v + " ms", yFmt: v => v + " ms",
        xLabel: tr("time in the note (0 = the beat)"), yLabel: tr('moment of the original "ha"'), label: tr("Time map"), m: { l: 52, t: 42 } });
      S("rect", { x: f.x(T[tm.a] ?? 0), y: f.m.t, width: Math.max(0, f.x(T[Math.min(tm.b, T.length - 1)] ?? 0) - f.x(T[tm.a] ?? 0)), height: f.H - f.m.t - f.m.b, style: "fill:var(--s1);opacity:.1" }, f.plot);
      txt(f.plot, f.x(T[tm.a] ?? 0) + 4, f.m.t + 12, tr("stretched"), "lbl");
      const v0 = tm.v * DT * 1000;
      S("line", { x1: f.x(-v0), y1: f.y(0), x2: f.x(nIn * DT * 1000 - v0), y2: f.y(nIn * DT * 1000), style: "stroke:var(--muted);stroke-width:1" }, f.plot);
      txt(f.plot, f.x(nIn * DT * 1000 - v0) + 4, f.m.t + 26, tr("1× speed"), "lbl");
      S("line", { x1: f.x(0), x2: f.x(0), y1: f.m.t, y2: f.H - f.m.b, class: "axisline" }, f.plot);
      S("line", { x1: f.x(d * 1000), x2: f.x(d * 1000), y1: f.m.t, y2: f.H - f.m.b, style: "stroke:var(--ink2);stroke-width:1" }, f.plot);
      txt(f.plot, f.x(d * 1000) - 4, f.H - f.m.b - 6, tr("note ends"), "lbl", "end");
      path(f.plot, linePath(T.length, j => f.x(T[j]), j => f.y(tm.p[j] * DT * 1000)), col(1));
      crosshair(f, xv => {
        const j = nearest(T, xv), sp = j > 0 ? (tm.p[j] - tm.p[j - 1]) : 1;
        return { x: T[j], title: `${T[j].toFixed(0)} ms`, rows: [{ v: (tm.p[j] * DT * 1000).toFixed(0) + " ms", l: tr('into the original "ha"'), c: col(1) },
          { v: sp > 0.98 ? tr("1× (normal)") : "×" + (1 / sp).toFixed(2), l: tr("playback") }] };
      }, { step: 20 });
      ph.add("tmap", f);
    });
    const tpc = chart(fig, "tpitch", el => {
      const { T, pc, a } = state, vals = pc.nat.filter(v => v != null);
      const lim = Math.max(3, Math.ceil(Math.max(...vals.map(Math.abs), 0)) + 1);
      const f = frame(el, { x: xDom(), y: [-lim, lim], xFmt: v => v + " ms", yFmt: v => (v > 0 ? "+" : "") + v,
        xLabel: tr("time in the note (0 = the beat)"), yLabel: tr("semitones from the note"), label: tr("Rendered pitch"), m: { t: 42 } });
      S("line", { x1: f.m.l, x2: f.W - f.m.r, y1: f.y(0), y2: f.y(0), style: "stroke:var(--ink2);stroke-width:1" }, f.plot);
      txt(f.plot, f.W - f.m.r - 4, f.y(0) - 5, tr("the note"), "lbl", "end");
      path(f.plot, linePath(T.length, j => f.x(T[j]), j => pc.nat[j] == null ? null : f.y(pc.nat[j])), "var(--muted)", "", { style: "stroke:var(--muted);stroke-width:1.5" });
      path(f.plot, linePath(T.length, j => f.x(T[j]), j => pc.out[j] == null ? null : f.y(pc.out[j])), col(2));
      let lx = f.W - f.m.r;
      [["var(--muted)", tr("the laugh's own (α = 1)")], [col(2), (ZH ? `渲染结果（α = ${a.toFixed(2)}）` : `rendered (α = ${a.toFixed(2)})`)]].forEach(([c, l]) => {
        const t = txt(f.svg, lx, 8, l, "lbl", "end", "middle");
        lx -= t.getComputedTextLength() + 6;
        S("line", { x1: lx - 14, x2: lx, y1: 8, y2: 8, style: `stroke:${c};stroke-width:2` }, f.svg);
        lx -= 26;
      });
      crosshair(f, xv => {
        const j = nearest(T, xv);
        return { x: T[j], title: `${T[j].toFixed(0)} ms`, rows: [
          { v: pc.out[j] == null ? tr("unvoiced") : sgn(pc.out[j], 2) + " st", l: (ZH ? `渲染结果（α = ${a.toFixed(2)}）` : `rendered (α = ${a.toFixed(2)})`), c: col(2) },
          { v: pc.nat[j] == null ? tr("unvoiced") : sgn(pc.nat[j], 2) + " st", l: tr("the laugh's own (α = 1)"), c: "var(--muted)" }] };
      }, { step: 20 });
      ph.add("tpitch", f);
    });
    const redraw = () => { compute(); tmc.draw(); tpc.draw(); };
    [dur, alpha].forEach(i => i.addEventListener("input", () => { AU.stop(); redraw(); }));
    cap.addEventListener("change", () => { AU.stop(); redraw(); });
    redraw();
  }

  // ================================================================== 7. pitch check of the render
  {
    const fig = document.getElementById("fig-check"), V = B.variants;
    let vn = "half_full";
    seg(fig, "var", v => { vn = v; ch.draw(); });
    const names = Object.fromEntries(B.casting.notes.map(n => [n.i, n.name]));
    const lim = Math.max(150, Math.ceil(Math.max(...Object.values(V.variants).flatMap(v => v.notes.map(n => Math.abs(n.cents)))) / 50) * 50);
    const ch = chart(fig, "check", el => {
      const pts = V.variants[vn].notes.map(n => ({ ...n, t: V.starts[n.i] })).sort((a, b) => a.t - b.t);
      const f = frame(el, { x: [73.5, 128], y: [-lim, lim], yTicks: ticks(-lim, lim, 6), yFmt: v => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v) + "¢",
        xFmt: fmtTk, xLabel: tr("time in the video"), yLabel: tr("rendered pitch − target (cents)"), label: tr("Pitch error per note") });
      S("rect", { x: f.m.l, y: f.y(30), width: f.W - f.m.l - f.m.r, height: f.y(-30) - f.y(30), style: "fill:var(--wash)" }, f.plot);
      txt(f.plot, f.W - f.m.r - 4, f.y(30) - 4, "±30¢", "lbl", "end");
      pts.forEach(p => dot(f.plot, f.x(p.t), f.y(clamp(p.cents, -lim, lim)), col(1)));
      const ts = pts.map(p => p.t);
      crosshair(f, xv => {
        const k = nearest(ts, xv), p = pts[k];
        return { x: p.t, title: `#${p.i + 1} · ${at(names[p.i], p.t)}`, rows: [{ v: sgn(p.cents, 0) + "¢", l: tr("off the target"), c: col(1) }] };
      }, { step: 0.6 });
    });
    ch.draw();
    const label = { natural: "α = 1 (natural)", half: "α = 0.5, capped", flat: "α = 0 (flat)", half_full: "α = 0.5, full stretch (chosen)" };
    table(fig, "check", ["Version", "Median error", "Over 30¢", "Over 100¢", "Notes checked"], Object.entries(V.variants).map(([k, v]) => [
      tr(label[k] || k), v.summary.median_abs_cents + "¢", String(v.summary.over_30), String(v.summary.over_100), String(v.summary.checked)]));
  }

  // ================================================================== 8. mixing by measurement
  {
    const pk = M.peaks, X = pk.humming.hist.map((_, i) => i + 0.5);
    legend("peaks", [[col(1), tr("original humming"), "line"], [col(2), tr("Otto choir (final mix)"), "line"]]);
    const fig = document.getElementById("fig-peaks");
    const pc = chart(fig, "peaks", el => {
      const hi = Math.max(...pk.humming.hist, ...pk.otto.hist);
      const f = frame(el, { x: [0, 30], y: [0, Math.ceil(hi + 1)], xFmt: v => v + " dB", yFmt: v => v + " %",
        xLabel: tr("how far below the loudest moment"), yLabel: tr("share of 10 ms moments"), label: tr("Distribution of peak levels") });
      [["humming", 1], ["otto", 2]].forEach(([k, c]) => {
        const h = pk[k].hist;
        path(f.plot, linePath(h.length, i => f.x(X[i]), i => f.y(h[i])), col(c));
        const mv = pk[k].median_below, i = clamp(Math.floor(mv - 0.5), 0, h.length - 2), w = mv - 0.5 - i;
        dot(f.svg, f.x(mv), f.y(h[i] + (h[i + 1] - h[i]) * clamp(w, 0, 1)), col(c));
      });
      crosshair(f, xv => {
        const i = clamp(Math.round(xv - 0.5), 0, X.length - 1);
        return { x: X[i], title: ZH ? `比最响时刻低 ${i}–${i + 1} dB` : `${i}–${i + 1} dB below the loudest`, rows: [
          { v: pk.humming.hist[i].toFixed(1) + " %", l: ZH ? `哼唱（中位数 ${pk.humming.median_below} dB）` : `humming (median ${pk.humming.median_below} dB)`, c: col(1) },
          { v: pk.otto.hist[i].toFixed(1) + " %", l: ZH ? `电棍（中位数 ${pk.otto.median_below} dB）` : `Otto (median ${pk.otto.median_below} dB)`, c: col(2) }] };
      }, { step: 1 });
    });
    pc.draw();

    const T = M.tails, mean = rows => rows[0].map((_, j) => rows.reduce((s, r) => s + r[j], 0) / rows.length);
    const mh = mean(T.humming), mo = mean(T.otto);
    legend("tails", [[col(1), tr("original humming"), "line"], [col(2), tr("Otto, with our reverb"), "line"]]);
    const fig2 = document.getElementById("fig-tails");
    const tc = chart(fig2, "tails", el => {
      const all = [...T.humming.flat(), ...T.otto.flat()];
      const lo = Math.max(-50, Math.floor(Math.min(...all) / 5) * 5);
      const f = frame(el, { x: [T.t_ms[0], T.t_ms[T.t_ms.length - 1]], y: [lo, 5], xFmt: v => v + " ms", yFmt: v => num(v, 0) + " dB",
        xLabel: tr("time after the phrase's last note ends"), yLabel: tr("level relative to the end of the note"), label: tr("Decay after phrase ends"), m: { l: 52 } });
      S("line", { x1: f.x(0), x2: f.x(0), y1: f.m.t, y2: f.H - f.m.b, style: "stroke:var(--ink2);stroke-width:1" }, f.plot);
      txt(f.plot, f.x(0) + 4, f.m.t + 10, tr("note ends"), "lbl");
      const n = T.t_ms.length, yv = v => f.y(clamp(v, lo, 5));
      T.humming.forEach(r => path(f.plot, linePath(n, j => f.x(T.t_ms[j]), j => yv(r[j])), col(1), "thin"));
      T.otto.forEach(r => path(f.plot, linePath(n, j => f.x(T.t_ms[j]), j => yv(r[j])), col(2), "thin"));
      path(f.plot, linePath(n, j => f.x(T.t_ms[j]), j => yv(mh[j])), col(1));
      path(f.plot, linePath(n, j => f.x(T.t_ms[j]), j => yv(mo[j])), col(2));
      crosshair(f, xv => {
        const j = nearest(T.t_ms, xv);
        return { x: T.t_ms[j], title: `${sgn(T.t_ms[j], 0)} ms`, rows: [
          { v: num(mh[j]) + " dB", l: tr("humming (average of 3)"), c: col(1) }, { v: num(mo[j]) + " dB", l: tr("Otto (average of 3)"), c: col(2) }] };
      }, { step: 10 });
    });
    tc.draw();
  }
})();
