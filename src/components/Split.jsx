import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "../lib/env";

// 제목 글자가 마스크 아래에서 한 글자씩 솟아오릅니다. (화면에 들어올 때 한 번)
export default function Split({ text, as = "h2", className = "", delay = 0, step = 0.045 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const Tag = motion[as];
  let n = 0;
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap pr-[0.22em]">
          {[...w].map((c) => {
            const k = n++;
            return (
              <span key={k} className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
                <motion.span className="inline-block" initial={{ y: "115%", rotate: 6 }} animate={seen ? { y: 0, rotate: 0 } : undefined} transition={{ duration: 1, ease: EASE, delay: delay + k * step }}>{c}</motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
