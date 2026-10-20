import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function Word({ w, p, a, b }) {
  const o = useTransform(p, [a, b], [0.14, 1]);
  const y = useTransform(p, [a, b], [8, 0]);
  return <motion.span aria-hidden="true" style={{ opacity: o, y }} className="mr-[0.28em] inline-block">{w}</motion.span>;
}

// 스크롤하는 만큼 글자가 한 단어씩 진해지는 문장
export default function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 50%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />)}
    </p>
  );
}
