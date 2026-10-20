import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// 마우스를 따라 기울어지고, 빛이 번져 나가는 3D 래퍼
export default function Tilt({ children, className = "", max = 9, glare = true }) {
  const px = useMotionValue(0), py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 18 });
  return (
    <div className="[perspective:1100px]">
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5); py.set((e.clientY - r.top) / r.height - 0.5);
          e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
        }}
        onPointerLeave={() => { px.set(0); py.set(0); }}
        className={`group relative ${className}`}
      >
        {children}
        {glare && <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(360px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,.35), transparent 60%)", mixBlendMode: "soft-light" }} />}
      </motion.div>
    </div>
  );
}
