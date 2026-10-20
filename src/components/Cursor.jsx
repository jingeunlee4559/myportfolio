import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// 마우스를 따라다니는 점과 고리. 버튼·카드 위에서는 커지고, data-cursor가 있으면 글자가 나타납니다. (터치 기기에서는 숨김)
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.3 }), dy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.3 });
  const rx = useSpring(x, { stiffness: 160, damping: 20 }), ry = useSpring(y, { stiffness: 160, damping: 20 });
  const [fine, setFine] = useState(false), [big, setBig] = useState(false), [label, setLabel] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const mv = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target.closest?.("[data-cursor]");
      setLabel(t?.dataset.cursor ?? "");
      setBig(!!t || !!e.target.closest?.("a,button,[role=button],.card,input,textarea"));
    };
    window.addEventListener("pointermove", mv, { passive: true });
    return () => window.removeEventListener("pointermove", mv);
  }, [x, y]);
  if (!fine) return null;
  const size = label ? 92 : big ? 64 : 40;
  return (
    <>
      <motion.div style={{ x: rx, y: ry }} className="pointer-events-none fixed left-0 top-0 z-[90]" aria-hidden="true">
        <motion.div animate={{ width: size, height: size, opacity: big ? 1 : 0.7 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full text-[13px] font-extrabold tracking-[0.04em] text-white ${label ? "bg-accent shadow-[0_14px_40px_-8px_rgba(47,140,255,.9)]" : "border-2 border-accent bg-accent/10"}`}>
          {label}
        </motion.div>
      </motion.div>
      <motion.div style={{ x: dx, y: dy }} className={`pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent transition-opacity ${label ? "opacity-0" : "opacity-100"}`} aria-hidden="true" />
    </>
  );
}
