import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { guide } from "../lib/guide";
import { reduced } from "../lib/env";

// 마침표 길잡이를 그리는 층: 파란 점 하나 + 지나간 자리에 남는 짧은 빛 꼬리.
// 각 장면이 정해 준 "마침표 자리"(요소)의 실제 위치를 매 프레임 읽어 부드럽게 따라갑니다.
// 자리 요소에 data-gd-size(크기 px)·data-gd-tone="alert"(빨강)을 달면 그 모양으로 바뀝니다.
// 자리가 화면 밖으로 나가면 그쪽으로 밀려나며 흐려지고, 다음 자리가 정해지면 거기로 날아갑니다.
const COLORS = { base: [47, 140, 255], alert: [230, 45, 45], light: [255, 255, 255] };

export default function Guide() {
  const dot = useRef(null), cv = useRef(null);
  useEffect(() => {
    if (reduced) return;
    document.documentElement.classList.add("gd-live");
    const c = cv.current, g = c.getContext("2d");
    let W = 0, H = 0, DPR = 1;
    const size = () => { W = innerWidth; H = innerHeight; DPR = Math.min(2, devicePixelRatio || 1); c.width = W * DPR; c.height = H * DPR; };
    size(); addEventListener("resize", size);
    // 인트로가 끝나고 히어로 문장이 다 올라온 뒤(약 0.9초) 마침표가 떨어지듯 등장
    let readyAt = window.__introDone ? performance.now() + 900 : Infinity;
    const onIntro = () => { readyAt = performance.now() + 900; };
    window.addEventListener("intro-done", onIntro);
    const P = { x: innerWidth / 2, y: -60, s: 16, o: 0, r: 47, g: 140, b: 255 };
    const trail = [];
    let shown = false;
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
      if (to && !shown) { shown = true; P.x = tx; P.y = ty - Math.min(220, H * 0.3); P.s = ts; }
      const f = Math.max(0.5, Math.min(3, dt / 16.7));
      const k = 1 - Math.pow(1 - 0.17, f);
      P.x += (tx - P.x) * k; P.y += (ty - P.y) * k;
      P.s += (ts - P.s) * (1 - Math.pow(0.8, f)); P.o += (to - P.o) * (1 - Math.pow(0.84, f));
      P.r += (tone[0] - P.r) * 0.15; P.g += (tone[1] - P.g) * 0.15; P.b += (tone[2] - P.b) * 0.15;
      const col = `${P.r | 0},${P.g | 0},${P.b | 0}`;
      const d = dot.current;
      d.style.transform = `translate3d(${(P.x - P.s / 2).toFixed(2)}px, ${(P.y - P.s / 2).toFixed(2)}px, 0)`;
      d.style.width = d.style.height = `${P.s.toFixed(2)}px`;
      d.style.opacity = P.o.toFixed(3);
      d.style.setProperty("--gc", col);
      // 빛 꼬리: 빠르게 움직일 때만 길게 남음
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
  if (reduced) return null;
  return (
    <>
      <canvas ref={cv} className="gd-trail" aria-hidden="true" />
      <i ref={dot} className="gd-dot" aria-hidden="true" />
    </>
  );
}
