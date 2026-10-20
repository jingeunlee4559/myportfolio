import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "motion/react";
import { PROFILE } from "../data/profile";
import { INTRO_ON } from "../lib/env";
import Sparkles from "./Sparkles";

const HELLO = ["안녕하세요", "Hello", "こんにちは", "Hola", "你好", "Bonjour", "안녕하세요"];
const COLS = 7;
const slide = (delay) => ({ y: "-100%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1], delay } });
const colStyle = (i) => ({ left: `${(i * 100) / COLS}%`, width: `calc(${100 / COLS}% + 1px)` });

// 새로고침할 때마다 나옵니다: 인사말이 바뀌며 이름이 솟아오르고 숫자가 100까지 오른 뒤,
// 두 겹의 셔터가 시차를 두고 올라가며 사이트가 열립니다. 끝나면 항상 맨 위에서 시작합니다.
export default function Intro() {
  const [show, setShow] = useState(INTRO_ON);
  const [n, setN] = useState(0);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!show) return;
    const html = document.documentElement, prev = html.style.overflow;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const done = () => { window.scrollTo(0, 0); setShow(false); };
    let t;
    const c = animate(0, 100, { duration: 2.1, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)), onComplete: () => { t = setTimeout(done, 280); } });
    const iv = setInterval(() => setW((v) => Math.min(v + 1, HELLO.length - 1)), 300);
    const esc = (e) => e.key === "Escape" && done();
    window.addEventListener("keydown", esc);
    window.__skipIntro = done;
    return () => { c.stop(); clearTimeout(t); clearInterval(iv); window.removeEventListener("keydown", esc); delete window.__skipIntro; html.style.overflow = prev; };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div key="intro" className="fixed inset-0 z-[100]" role="presentation">
          {/* 하늘색 셔터(아래 겹) */}
          {Array.from({ length: COLS }, (_, i) => <motion.i key={`a${i}`} exit={slide(0.12 + i * 0.06)} className="absolute inset-y-0 bg-accent" style={colStyle(i)} aria-hidden="true" />)}
          {/* 남색 셔터(위 겹) */}
          {Array.from({ length: COLS }, (_, i) => <motion.i key={`b${i}`} exit={slide(i * 0.06)} className="absolute inset-y-0 bg-night" style={colStyle(i)} aria-hidden="true" />)}

          <motion.div exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)", transition: { duration: 0.4 } }} className="absolute inset-0 grid place-items-center overflow-hidden text-white">
            <span className="drift pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[110px]" aria-hidden="true" />
            <span className="drift pointer-events-none absolute left-[18%] top-[62%] h-[40vmin] w-[40vmin] rounded-full bg-violet/30 blur-[100px]" style={{ animationDelay: "-6s" }} aria-hidden="true" />
            <Sparkles color="#7cc4ff" />
            <div className="relative text-center">
              <p className="h-8 font-mono text-lg font-semibold tracking-[0.2em] text-sky" aria-hidden="true">{HELLO[w]}</p>
              <p className="mt-3 flex justify-center overflow-hidden text-[clamp(3.6rem,15vw,11rem)] font-extrabold leading-[1.05] tracking-[-0.07em]">
                {[...PROFILE.name].map((ch, i) => (
                  <motion.span key={i} initial={{ y: "110%", rotate: 8 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }} className="inline-block bg-gradient-to-b from-white to-[#9bd6ff] bg-clip-text text-transparent">{ch}</motion.span>
                ))}
              </p>
              <p className="mt-2 text-sm font-bold tracking-[0.34em] text-white/60">WEB DEVELOPER PORTFOLIO</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 sm:pb-10">
              <div className="flex items-end justify-between">
                <span className="text-sm font-bold tracking-[0.2em] text-white/50">LOADING</span>
                <span className="text-6xl font-extrabold leading-none tracking-[-0.05em] tabular-nums sm:text-8xl">{n}<span className="text-2xl text-white/50 sm:text-4xl">%</span></span>
              </div>
              <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/15"><span className="block h-full origin-left rounded-full bg-gradient-to-r from-accent via-cyan to-white" style={{ transform: `scaleX(${n / 100})` }} /></div>
            </div>
            <button type="button" onClick={() => window.__skipIntro?.()} className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/70 backdrop-blur transition hover:bg-white/20 hover:text-white sm:right-8 sm:top-8">건너뛰기</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
