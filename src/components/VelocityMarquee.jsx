import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

// 천천히 흐르다가 스크롤을 빨리 내리면 빨라지고, 위로 올리면 방향이 바뀌며 기울어지는 띠
export default function VelocityMarquee({ children, base = -2, skew = true }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(vel, [-2000, 2000], [skew ? 10 : 0, skew ? -10 : 0]);
  const dir = useRef(base < 0 ? -1 : 1);
  useAnimationFrame((_, delta) => {
    let move = dir.current * Math.abs(base) * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    x.set(wrap(-50, 0, x.get() + move));
  });
  const tx = useTransform(x, (v) => `${v}%`);
  return (
    <motion.div style={{ skewX }} className="overflow-hidden">
      <motion.div style={{ x: tx }} className="flex w-max">{children}{children}</motion.div>
    </motion.div>
  );
}
