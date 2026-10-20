import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { reduced } from "../lib/env";

const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+";

// 글자가 뒤섞이다가 제자리를 찾는 효과: 화면에 보일 때 한 번, 마우스를 올리면 다시
export default function Scramble({ text, className = "", auto = true }) {
  const [out, setOut] = useState(text);
  const ref = useRef(null), raf = useRef(0);
  const inView = useInView(ref, { once: true });
  const run = () => {
    if (reduced) return;
    cancelAnimationFrame(raf.current);
    const t0 = performance.now(), len = text.length;
    const step = (now) => {
      const k = (now - t0) / 700;
      setOut([...text].map((c, i) => (c === " " || k * len * 1.4 > i + 3 ? c : CH[(Math.random() * CH.length) | 0])).join(""));
      if (k < 1) raf.current = requestAnimationFrame(step); else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => { if (auto && inView) run(); return () => cancelAnimationFrame(raf.current); }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref} onMouseEnter={run} className={className} aria-label={text}><span aria-hidden="true">{out}</span></span>;
}
