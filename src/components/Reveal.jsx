import { motion } from "motion/react";

// 토스처럼 살짝 튕기며 떠오르는 래퍼
export default function Reveal({ children, delay = 0, y = 36, className = "", as = "div" }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} initial={{ opacity: 0, y, scale: 0.96, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9, delay }}>
      {children}
    </Tag>
  );
}
