import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function Counter({ to, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) { ref.current.textContent = to; return; }
    const c = animate(0, to, { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v); } });
    return () => c.stop();
  }, [inView, to, delay, reduce]);
  return <span ref={ref}>{to}</span>;
}
