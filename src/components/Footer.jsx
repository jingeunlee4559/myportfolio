import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ScrollTrigger } from "../lib/gsap";
import { guide } from "../lib/guide";
import { FaGithub, FaEnvelope } from "react-icons/fa6";
import { PROFILE } from "../data/profile";

const EASE = [0.16, 1, 0.3, 1];
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const ch = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease: EASE } } };
const TITLE = "감사합니다";

// 위 내용이 위로 걷히면서 드러나는 마지막 화면 (main 아래에 깔려 있다가 스크롤 끝에서 보입니다)
export default function Footer() {
  // 마침표 길잡이의 마지막 자리: "감사합니다." (파란 배경 위라 흰 점으로)
  const ref = useRef(null);
  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: "main", start: "bottom 75%", end: "bottom -200%", onToggle: (s) => s.isActive && guide.set(() => ref.current) });
    return () => st.kill();
  }, []);
  return (
    <footer className="sticky bottom-0 z-0 isolate flex h-[min(100svh,860px)] min-h-[560px] flex-col justify-between overflow-hidden footer-bg text-white">
      <span className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] -z-10 select-none text-center text-[clamp(7rem,32vw,24rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,.2)]" aria-hidden="true">{PROFILE.name}</span>

      <div className="px-5 pt-32 text-center">
        <motion.h2 variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-[clamp(2.8rem,9vw,7.4rem)] font-extrabold leading-[1.04] tracking-[-0.06em]" aria-label={TITLE}>
          {[...TITLE].map((c, i) => <span key={i} aria-hidden="true" className="inline-block overflow-hidden py-[0.1em] -my-[0.1em] align-bottom"><motion.span variants={ch} className="inline-block">{c}{i === TITLE.length - 1 && <i ref={ref} className="gd-p" data-gd-tone="light" />}</motion.span></span>)}
        </motion.h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/85">끝까지 읽어 주셔서 감사합니다.<br />궁금한 점이 있으면 편하게 연락 주세요.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {PROFILE.email && <a className="btn !bg-white !text-accent" href={`mailto:${PROFILE.email}`}><FaEnvelope aria-hidden="true" />{PROFILE.email}</a>}
          <a className="btn !bg-white/15 !text-white ring-1 ring-white/40" href={PROFILE.githubPortfolio} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />GitHub</a>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-white/80 sm:flex-row">
        <p>© 2026 {PROFILE.name} · {PROFILE.role}</p>
        <a href="#top" className="font-bold transition hover:text-white">맨 위로 ↑</a>
      </div>
    </footer>
  );
}
