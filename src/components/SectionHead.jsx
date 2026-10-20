import { motion } from "motion/react";
import Reveal from "./Reveal";
import Scramble from "./Scramble";

const EASE = [0.16, 1, 0.3, 1];
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const word = { hidden: { y: "115%", rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 1, ease: EASE } } };

// 큰 번호 + 단어별로 솟아오르는 제목 + 늘어나는 밑줄.
// 번호는 화면에 나오는 순서대로 01, 02, 03, 04 입니다. (dark: 어두운 배경용)
// (보이는지 감지하는 요소는 잘리지 않는 부모 h2에 둡니다. 자식에 두면 마스크에 가려 영영 안 나타납니다.)
export default function SectionHead({ no, label, title, desc, dark = false }) {
  return (
    <div className="relative mb-14 md:mb-20">
      <span className={`pointer-events-none absolute -left-2 -top-12 select-none text-[9rem] font-extrabold leading-none tracking-[-0.08em] md:-top-24 md:text-[18rem] ${dark ? "text-white/[0.05]" : "text-accent/[0.07]"}`} aria-hidden="true">{no}</span>
      <Reveal className="relative">
        <p className={`inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-extrabold ${dark ? "bg-white/10 text-sky" : "bg-skysoft text-accent"}`}>
          <b className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 font-mono text-[11px] ${dark ? "bg-accent text-white" : "bg-accent text-white"}`}>{no}</b>
          <Scramble text={label} />
        </p>
      </Reveal>
      <motion.h2 variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} aria-label={title} className={`relative mt-5 flex flex-wrap gap-x-[0.25em] text-[clamp(3.2rem,9vw,7.4rem)] font-extrabold leading-[1.05] tracking-[-0.07em] ${dark ? "text-white" : "text-ink"}`}>
        {String(title).split(" ").map((w, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]"><motion.span variants={word} className="inline-block origin-bottom-left">{w}</motion.span></span>
        ))}
      </motion.h2>
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE, delay: 0.5 }} className="relative mt-5 block h-1.5 w-28 origin-left rounded-full bg-gradient-to-r from-accent via-cyan to-violet" aria-hidden="true" />
      {desc && <Reveal delay={0.15} className="relative"><p className={`mt-5 max-w-xl text-[18px] leading-relaxed ${dark ? "text-white/85" : "text-mute"}`}>{desc}</p></Reveal>}
    </div>
  );
}
