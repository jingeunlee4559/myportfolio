import { useEffect, useRef } from "react";
import { reduced } from "../lib/env";

// 점 격자: 커서가 다가오면 점이 밀려나고 커지며 푸른색→보라→분홍으로 물듭니다.
// 가만히 있으면 보이지 않는 손이 화면을 훑고 지나가고(터치 기기 포함), 격자는 물결처럼 일렁입니다.
export default function DotField({ gap = 34 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, dpr = 1, raf = 0, vis = true;
    const p = { x: -999, y: -999, tx: -999, ty: -999, last: 0 };
    const size = () => { dpr = Math.min(2, window.devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); };
    size();
    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const R = Math.max(150, Math.min(W, H) * 0.3);
      for (let y = gap / 2; y < H; y += gap) for (let x = gap / 2; x < W; x += gap) {
        const dx = x - p.x, dy = y - p.y, d = Math.hypot(dx, dy), k = Math.max(0, 1 - d / R), e = k * k;
        const w = Math.sin(x * 0.012 + y * 0.01 - t * 0.0012);
        const push = e * 28, ux = d ? dx / d : 0, uy = d ? dy / d : 0;
        ctx.fillStyle = `hsla(${210 + e * 110 + w * 8},92%,${60 - e * 8}%,${0.2 + e * 0.75})`;
        ctx.beginPath(); ctx.arc(x + ux * push, y + uy * push + w * 2.2, 1.1 + e * 3.4 + (w + 1) * 0.3, 0, 6.283); ctx.fill();
      }
    };
    if (reduced) { p.x = W * 0.6; p.y = H * 0.4; draw(0); return; }
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (!vis || document.hidden) return;
      if (t - p.last > 2400) { p.tx = W * (0.5 + 0.34 * Math.sin(t * 0.0006)); p.ty = H * (0.46 + 0.26 * Math.sin(t * 0.0009 + 1)); }
      p.x += (p.tx - p.x) * 0.12; p.y += (p.ty - p.y) * 0.12;
      draw(t);
    };
    raf = requestAnimationFrame(loop);
    const mv = (e) => { const b = cv.getBoundingClientRect(); p.tx = e.clientX - b.left; p.ty = e.clientY - b.top; p.last = performance.now(); };
    window.addEventListener("pointermove", mv, { passive: true });
    const io = new IntersectionObserver(([en]) => { vis = en.isIntersecting; }); io.observe(cv);
    const ro = new ResizeObserver(size); ro.observe(cv);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener("pointermove", mv); };
  }, [gap]);
  return <canvas ref={ref} className="block h-full w-full" aria-hidden="true" />;
}
