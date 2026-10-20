import { motion, useMotionValue, useSpring } from "motion/react";

// 커서가 가까워지면 살짝 따라오는 래퍼
export default function Magnetic({ children, strength = 0.25 }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div className="inline-block" style={{ x: sx, y: sy }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - (r.left + r.width / 2)) * strength); y.set((e.clientY - (r.top + r.height / 2)) * strength); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}
