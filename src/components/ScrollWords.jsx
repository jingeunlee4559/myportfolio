import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function Word({ w, p, a, b }) {
  const o = useTransform(p, [a, b], [0.14, 1]);
  const y = useTransform(p, [a, b], [8, 0]);
  return <motion.span aria-hidden="true" style={{ opacity: o, y }} className="mr-[0.28em] inline-block">{w}</motion.span>;
}

// 스크롤하는 만큼 글자가 한 단어씩 진해지는 문장 (문장 안의 \n 은 줄바꿈)
export default function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 50%"] });
  const lines = text.split("\n").map((l) => l.trim().split(" "));
  const total = lines.flat().length;
  let n = 0;
  return (
    <p ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((ws, li) => (
        <span key={li} className="block">
          {ws.map((w) => { const i = n++; return <Word key={i} w={w} p={scrollYProgress} a={i / total} b={(i + 1) / total} />; })}
        </span>
      ))}
    </p>
  );
}
