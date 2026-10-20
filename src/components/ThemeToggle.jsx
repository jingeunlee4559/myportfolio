import { motion } from "motion/react";
import { useDark, setTheme } from "../lib/theme";
import { reduced } from "../lib/env";

const STARS = [[16, 9, 0], [28, 22, 0.6], [12, 24, 1.2], [38, 10, 1.8]];

// 낮에는 해와 구름, 밤에는 달과 별이 되는 스위치. 누른 자리에서 새 테마가 원으로 퍼져 나갑니다.
export default function ThemeToggle() {
  const dark = useDark();
  const flip = (e) => {
    const r = e.currentTarget.getBoundingClientRect(), root = document.documentElement;
    root.style.setProperty("--tx", `${r.left + r.width / 2}px`); root.style.setProperty("--ty", `${r.top + r.height / 2}px`);
    const next = !dark;
    if (document.startViewTransition && !reduced) document.startViewTransition(() => setTheme(next)); else setTheme(next);
  };
  const spring = { type: "spring", stiffness: 320, damping: 22 };
  return (
    <button type="button" role="switch" aria-checked={dark} aria-label={dark ? "라이트 모드로 바꾸기" : "다크 모드로 바꾸기"} data-cursor={dark ? "라이트" : "다크"} onClick={flip}
      className="relative h-9 w-[68px] shrink-0 cursor-pointer overflow-hidden rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,.25),0_0_0_1px_rgba(255,255,255,.35)] transition-transform active:scale-95">
      <span className="absolute inset-0" style={{ background: "linear-gradient(100deg,#7cc4ff,#cfeaff)" }} />
      <motion.span className="absolute inset-0" initial={false} animate={{ opacity: dark ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ background: "linear-gradient(100deg,#090f2e,#27337a)" }}>
        {STARS.map(([x, y, d], i) => <i key={i} className="twinkle absolute h-1.5 w-1.5" style={{ left: x, top: y, animationDelay: `${d}s` }}><svg viewBox="0 0 24 24" className="h-full w-full"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="#fff" /></svg></i>)}
      </motion.span>
      <motion.span className="absolute bottom-0 right-1 h-4 w-9 rounded-t-full bg-white/90" initial={false} animate={{ y: dark ? 22 : 0 }} transition={spring} aria-hidden="true" />
      <motion.span className="absolute bottom-1 right-6 h-3 w-5 rounded-t-full bg-white/80" initial={false} animate={{ y: dark ? 22 : 0 }} transition={{ ...spring, delay: 0.04 }} aria-hidden="true" />
      <motion.span className="absolute left-[3px] top-[3px] h-[30px] w-[30px]" initial={false} animate={{ x: dark ? 32 : 0, rotate: dark ? 360 : 0 }} transition={spring} aria-hidden="true">
        <motion.i className="absolute inset-0 rounded-full shadow-[0_0_0_5px_rgba(255,214,90,.35),0_4px_10px_rgba(255,170,30,.5)]" initial={false} animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.6 : 1 }} style={{ background: "radial-gradient(circle at 35% 30%,#fff3b0,#ffc933 70%)" }} />
        <motion.i className="absolute inset-0 rounded-full shadow-[0_0_14px_rgba(190,210,255,.6)]" initial={false} animate={{ opacity: dark ? 1 : 0, scale: dark ? 1 : 0.6 }} style={{ background: "radial-gradient(circle at 35% 30%,#fff,#d7e0ff 70%)" }}>
          <b className="absolute left-[7px] top-[9px] h-2.5 w-2.5 rounded-full bg-[#b9c6ee]" /><b className="absolute bottom-[6px] right-[8px] h-2 w-2 rounded-full bg-[#b9c6ee]" /><b className="absolute right-[6px] top-[6px] h-1.5 w-1.5 rounded-full bg-[#b9c6ee]" />
        </motion.i>
      </motion.span>
    </button>
  );
}
