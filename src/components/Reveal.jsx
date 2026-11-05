import { motion } from "motion/react";
import { LITE_FX as lite } from "../lib/env";

// filter: blur 애니메이션은 휴대폰에서 무거워서, 가벼운 기기에서는 빼고 위치·투명도만 움직입니다.
const FROM = lite ? {} : { filter: "blur(10px)" };
const TO = lite ? {} : { filter: "blur(0px)" };

// 토스처럼 살짝 튕기며 떠오르는 래퍼
export default function Reveal({ children, delay = 0, y = 36, className = "", as = "div" }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} initial={{ opacity: 0, y, scale: 0.96, ...FROM }} whileInView={{ opacity: 1, y: 0, scale: 1, ...TO }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9, delay }}>
      {children}
    </Tag>
  );
}
