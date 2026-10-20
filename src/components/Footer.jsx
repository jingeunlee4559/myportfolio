import { useRef } from "react";
import { motion } from "motion/react";
import { FaGithub, FaEnvelope } from "react-icons/fa6";
import { PROFILE } from "../data/profile";
import Magnetic from "./Magnetic";
import Sparkles from "./Sparkles";
import VelocityMarquee from "./VelocityMarquee";

const EASE = [0.16, 1, 0.3, 1];
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const ch = { hidden: { y: "110%", rotate: 8 }, show: { y: 0, rotate: 0, transition: { duration: 1.1, ease: EASE } } };
const LINES = ["감사합니다"];
const RING = "THANK YOU • THANK YOU • THANK YOU • ";
const TAPE = ["THANK YOU", "감사합니다", "THANK YOU", "감사합니다"];

// 위 내용이 위로 걷히면서 드러나는 마지막 화면 (main 아래에 깔려 있다가 스크롤 끝에서 보입니다)
export default function Footer() {
  const h2 = useRef(null);
  // 커서가 다가오면 글자가 밀려나며 노랗게 빛납니다
  const move = (e) => h2.current?.querySelectorAll(".ch-in-w").forEach((el) => {
    const b = el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2, d = Math.hypot(e.clientX - cx, e.clientY - cy) || 1, s = Math.max(0, 1 - d / 200);
    el.style.setProperty("--l", s.toFixed(2)); el.style.setProperty("--dx", (((cx - e.clientX) / d) * s * 30).toFixed(1)); el.style.setProperty("--dy", (((cy - e.clientY) / d) * s * 30).toFixed(1));
  });
  const leave = () => h2.current?.querySelectorAll(".ch-in-w").forEach((el) => { el.style.setProperty("--l", 0); el.style.setProperty("--dx", 0); el.style.setProperty("--dy", 0); });
  return (
    <footer onPointerMove={move} onPointerLeave={leave} className="sticky bottom-0 z-0 isolate flex h-[min(100svh,920px)] min-h-[640px] flex-col justify-between overflow-hidden footer-bg text-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="drift absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/40 blur-[110px] dark:bg-accent/25" />
        <div className="drift absolute -bottom-28 -right-16 h-[28rem] w-[28rem] rounded-full bg-[#3de0ff]/60 blur-[120px] dark:bg-cyan/15" style={{ animationDelay: "-6s" }} />
        <div className="drift absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#ff8ad0]/40 blur-[110px] dark:bg-violet/30" style={{ animationDelay: "-11s" }} />
        <div className="absolute inset-0 hidden dark:block [background-image:radial-gradient(rgba(180,200,255,.16)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(75%_65%_at_50%_45%,#000,transparent)]" />
        <Sparkles color="#ffffff" />
        <span className="absolute inset-x-0 -bottom-[0.18em] select-none text-center text-[clamp(7rem,32vw,24rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,.24)] dark:[-webkit-text-stroke:2px_rgba(140,170,255,.14)]">{PROFILE.name}</span>
      </div>

      {/* 빙글 도는 글자 배지 */}
      <div className="absolute right-6 top-24 hidden h-32 w-32 place-items-center rounded-full bg-white/15 backdrop-blur md:grid" aria-hidden="true">
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full"><defs><path id="fring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text className="fill-white font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em]"><textPath href="#fring" textLength="268" lengthAdjust="spacing">{RING}</textPath></text></svg>
        <span className="text-3xl">✦</span>
      </div>

      <div className="px-5 pt-28 text-center">
        <p className="eyebrow !text-white/80">Thank you</p>
        <motion.h2 ref={h2} variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-5 text-[clamp(2.8rem,10.5vw,8.8rem)] font-extrabold leading-[1.04] tracking-[-0.06em]" aria-label="감사합니다">
          {LINES.map((w) => (
            <span key={w} aria-hidden="true" className="mr-[0.25em] inline-block last:mr-0">
              {[...w].map((c, i) => <span key={i} className="inline-block overflow-hidden py-[0.1em] -my-[0.1em] align-bottom"><motion.span variants={ch} className="inline-block"><span className="ch-in-w inline-block">{c}</span></motion.span></span>)}
            </span>
          ))}
        </motion.h2>
        <p className="mx-auto mt-7 max-w-lg text-lg text-white/85">부족한 점은 배우며 채워 가겠습니다. 함께할 기회를 주시면 감사하겠습니다.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {PROFILE.email && <Magnetic><a className="btn !bg-white !text-accent" href={`mailto:${PROFILE.email}`}><FaEnvelope aria-hidden="true" />이메일</a></Magnetic>}
          <Magnetic><a className="btn !bg-white !text-accent" href={PROFILE.githubPortfolio} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />GitHub</a></Magnetic>
        </div>
      </div>

      <div>
        <div className="-rotate-2 bg-white/95 py-3 text-accent shadow-[0_20px_50px_-20px_rgba(0,0,0,.4)] dark:bg-[#0c1433]/80 dark:text-sky dark:ring-1 dark:ring-white/10 dark:backdrop-blur" aria-hidden="true">
          <VelocityMarquee base={-2.4} skew={false}>
            <ul className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold tracking-[-0.03em]">{TAPE.map((t, i) => <li key={i} className="flex items-center gap-8">{t}<span className="text-[.7em] opacity-70">✦</span></li>)}</ul>
          </VelocityMarquee>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-white/80 sm:flex-row">
          <p>© 2026 {PROFILE.name} · {PROFILE.role}</p>
          <a href="#top" className="font-bold transition hover:text-white">맨 위로 ↑</a>
        </div>
      </div>
    </footer>
  );
}
