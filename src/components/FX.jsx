import { useEffect, useRef } from "react";

const COLORS = ["#2f8cff", "#56c1ff", "#ffc933", "#ff8ad0", "#03b26c", "#f04452"];
const TRAIL = ["#2f8cff", "#56c1ff", "#9bd6ff", "#ffc933"];

function star(ctx, x, y, r) {
  ctx.beginPath(); ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill();
}

// 마우스를 따라 별가루가 흩날리고, 클릭하면 색종이가 터집니다. (마우스가 있고 모션 줄이기가 꺼진 화면에서만)
export default function FX() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current, ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    const ps = [];
    let w = 0, h = 0, raf = 0, lx = -999, ly = -999;
    const size = () => { w = window.innerWidth; h = window.innerHeight; cv.width = w * dpr; cv.height = h * dpr; cv.style.width = `${w}px`; cv.style.height = `${h}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life -= p.decay;
        if (p.life <= 0) { ps.splice(i, 1); continue; }
        p.vy += p.g; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.globalAlpha = Math.min(1, p.life * 1.6); ctx.fillStyle = p.c;
        const r = p.s * (0.4 + p.life * 0.6);
        if (p.kind === 0) star(ctx, p.x, p.y, r * 1.6);
        else if (p.kind === 1) { ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill(); }
        else { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-r, -r * 0.55, r * 2, r * 1.1); ctx.restore(); }
      }
      ctx.globalAlpha = 1;
      raf = ps.length ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e) => {
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 16) return;
      lx = e.clientX; ly = e.clientY;
      ps.push({ x: lx + (Math.random() - 0.5) * 8, y: ly + (Math.random() - 0.5) * 8, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8 + 0.2, g: 0.02, s: 2 + Math.random() * 3.5, c: TRAIL[(Math.random() * TRAIL.length) | 0], life: 1, decay: 0.028, kind: 0, rot: 0, vr: 0 });
      kick();
    };
    const down = (e) => {
      for (let i = 0; i < 28; i++) {
        const a = Math.random() * 6.283, sp = 2 + Math.random() * 6;
        ps.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, g: 0.14, s: 3 + Math.random() * 4, c: COLORS[(Math.random() * COLORS.length) | 0], life: 1, decay: 0.014 + Math.random() * 0.01, kind: (Math.random() * 3) | 0, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4 });
      }
      kick();
    };
    size();
    window.addEventListener("resize", size); window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerdown", down, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[89]" aria-hidden="true" />;
}
