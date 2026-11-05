import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { guide } from "../lib/guide";
import { reduced, touch, LITE_FX, FULL } from "../lib/env";

// 휴대폰·태블릿 간편 모드에서는 따라다니는 점을 쓰지 않습니다. 화면이 좁아 글자와 겹치거나 산만해 보이고,
// 매 프레임 위치를 읽는 일이 카톡 같은 느린 브라우저에 부담이라서입니다.
// 대신 각 제목 끝 자리(.gd-p)에 파란 마침표가 그대로 찍히고, 걸어온 길은 지금 단계의 동그라미가 직접 켜집니다.
// (html에 gd-live가 없을 때의 모습은 index.css에 이미 준비되어 있음)
const OFF = reduced || LITE_FX;
// 휴대폰 전체 애니메이션 버전에서는 빛 꼬리까지 PC와 똑같이 그림
const TRAIL = !touch || FULL;

// 마침표 길잡이를 그리는 층: 파란 점 하나 + 지나간 자리에 남는 짧은 빛 꼬리.
// 각 장면이 정해 준 "마침표 자리"(요소)의 실제 위치를 매 프레임 읽어 부드럽게 따라갑니다.
// 자리 요소에 data-gd-size(크기 px)·data-gd-tone="alert"(빨강)을 달면 그 모양으로 바뀝니다.
// 자리가 화면 밖으로 나가면 그쪽으로 밀려나며 흐려지고, 다음 자리가 정해지면 거기로 날아갑니다.
const COLORS = { base: [47, 140, 255], alert: [230, 45, 45], light: [255, 255, 255] };

export default function Guide() {
  const dot = useRef(null), cv = useRef(null);
  useEffect(() => {
    if (OFF) return;
    document.documentElement.classList.add("gd-live");
    const c = cv.current, g = c.getContext("2d");
    let W = 0, H = 0, DPR = 1;
    // 휴대폰에서는 빛 꼬리를 그리지 않습니다. (화면 전체를 매 프레임 다시 그리는 작업이라 무거움)
    const size = () => { W = innerWidth; H = innerHeight; if (!TRAIL) return; DPR = Math.min(2, devicePixelRatio || 1); c.width = W * DPR; c.height = H * DPR; };
    size(); addEventListener("resize", size);
    // 인트로가 끝나고 히어로 문장이 다 올라온 뒤(약 0.9초) 마침표가 떨어지듯 등장
    let readyAt = window.__introDone ? performance.now() + 900 : Infinity;
    const onIntro = () => { readyAt = performance.now() + 900; };
    window.addEventListener("intro-done", onIntro);
    const P = { x: innerWidth / 2, y: -60, s: 16, o: 0, r: 47, g: 140, b: 255 };
    const trail = [];
    let shown = false, prevEl = null;
    const off = { x: 0, y: 0 };
    const was = { tf: "", sz: "", op: "", col: "" };
    const tick = (_, dt) => {
      const now = performance.now();
      const el = now > readyAt ? guide.resolve() : null;
      let tx = P.x, ty = P.y, ts = P.s, to = 0, tone = COLORS.base;
      if (el && el.isConnected) {
        const r = el.getBoundingClientRect();
        if (el.getClientRects().length) {
          tx = r.left + r.width / 2; ty = r.top + r.height / 2;
          ts = +el.dataset?.gdSize || Math.max(10, Math.min(26, r.width || 16));
          tone = COLORS[el.dataset?.gdTone] || COLORS.base;
          // 화면 안에 있을 때만 또렷하게, 밖이면 가장자리로 밀려나며 흐려짐
          const inside = ty > -10 && ty < H + 10 && tx > -10 && tx < W + 10;
          to = inside ? 1 : 0;
          if (!inside) { tx = Math.max(-30, Math.min(W + 30, tx)); ty = Math.max(-30, Math.min(H + 30, ty)); }
        }
      }
      const f = Math.max(0.5, Math.min(3, dt / 16.7));
      const k = 1 - Math.pow(1 - 0.17, f);
      if (el && el.isConnected) {
        // 자리가 바뀌면 "지금 점 위치 - 새 자리"만큼을 떨어진 거리로 두고, 그 거리만 서서히 줄입니다.
        // 스크롤로 자리가 움직이는 건 매 프레임 그대로 따라가므로, 스크롤 중에도 점이 자리에서 밀려나지 않습니다.
        if (to && !shown) { shown = true; P.s = ts; off.x = 0; off.y = -Math.min(220, H * 0.3); }
        else if (el !== prevEl) { off.x = P.x - tx; off.y = P.y - ty; }
        prevEl = el;
        off.x -= off.x * k; off.y -= off.y * k;
        if (Math.abs(off.x) < 0.05) off.x = 0;
        if (Math.abs(off.y) < 0.05) off.y = 0;
        P.x = tx + off.x; P.y = ty + off.y;
      } else prevEl = null;
      P.s += (ts - P.s) * (1 - Math.pow(0.8, f)); P.o += (to - P.o) * (1 - Math.pow(0.84, f));
      P.r += (tone[0] - P.r) * 0.15; P.g += (tone[1] - P.g) * 0.15; P.b += (tone[2] - P.b) * 0.15;
      const col = `${P.r | 0},${P.g | 0},${P.b | 0}`;
      const d = dot.current;
      // 값이 실제로 바뀔 때만 스타일을 씁니다. 특히 width/height는 쓸 때마다 페이지 배치를 다시 계산하게 만들어
      // (다음 프레임의 getBoundingClientRect가 전체 배치 계산을 강제) 휴대폰 스크롤이 끊기는 원인이었습니다.
      const tf = `translate3d(${(P.x - P.s / 2).toFixed(1)}px, ${(P.y - P.s / 2).toFixed(1)}px, 0)`;
      const sz = `${P.s.toFixed(1)}px`, op = P.o.toFixed(2);
      if (tf !== was.tf) d.style.transform = was.tf = tf;
      if (sz !== was.sz) d.style.width = d.style.height = was.sz = sz;
      if (op !== was.op) d.style.opacity = was.op = op;
      if (col !== was.col) d.style.setProperty("--gc", was.col = col);
      // 빛 꼬리: 빠르게 움직일 때만 길게 남음 (휴대폰은 생략)
      if (!TRAIL) return;
      const last = trail[trail.length - 1];
      if (P.o > 0.2 && (!last || Math.hypot(last.x - P.x, last.y - P.y) > 1)) trail.push({ x: P.x, y: P.y, t: now, s: P.s });
      while (trail.length && now - trail[0].t > 380) trail.shift();
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);
      g.lineCap = "round";
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1], b = trail[i], q = i / trail.length;
        g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y);
        g.strokeStyle = `rgba(${col},${(q * 0.45 * P.o).toFixed(3)})`; g.lineWidth = Math.max(1, b.s * q * 0.85); g.stroke();
      }
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); removeEventListener("resize", size); window.removeEventListener("intro-done", onIntro); document.documentElement.classList.remove("gd-live"); };
  }, []);
  if (OFF) return null;
  return (
    <>
      <canvas ref={cv} className="gd-trail" aria-hidden="true" />
      <i ref={dot} className="gd-dot" aria-hidden="true" />
    </>
  );
}
