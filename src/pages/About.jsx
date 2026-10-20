import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { FaReact, FaServer, FaTrophy } from "react-icons/fa6";
import portrait from "../assets/portrait.jpg";
import { PROFILE, INTRO, EDUCATION, AWARDS } from "../data/profile";
import { projects } from "../data/projects";
import SectionHead from "../components/SectionHead";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import ScrollWords from "../components/ScrollWords";
import Tilt from "../components/Tilt";

const EDU = [...EDUCATION].reverse(); // 최신이 위
const AW = [...AWARDS].sort((a, b) => b.year - a.year); // 최신 연도가 위 (같은 해는 등급 순)
const COURSES = EDUCATION.filter((e) => e.tag === "교육과정").length;
const stats = [[projects.length, "개", "팀 프로젝트", "text-accent"], [AWARDS.length, "회", "수상", "text-coral"], [COURSES, "개", "교육과정", "text-violet"]];
const areas = [
  [FaReact, "Frontend", "React로 지도, 차트, 실시간 화면까지. 헷갈리지 않는 화면을 만듭니다.", "text-accent bg-accent/10"],
  [FaServer, "Backend", "Spring Boot·Node.js로 로그인, REST API, 실시간 알림을 구성합니다.", "text-mint bg-mint/10"],
];

// 마우스를 따라 기울어지는 사진 카드 + 빙글 도는 무지개 테두리
function Photo() {
  const ref = useRef(null);
  const px = useMotionValue(0), py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 });
  const ring = "WEB DEVELOPER • JINGEUN LEE • ";
  return (
    <Reveal className="relative [perspective:1200px]">
      <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => { const r = ref.current.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width - 0.5); py.set((e.clientY - r.top) / r.height - 0.5); }}
        onPointerLeave={() => { px.set(0); py.set(0); }} className="relative mx-auto max-w-[420px] md:max-w-none">
        <div className="absolute -inset-6 -z-10 rounded-[56px] bg-gradient-to-br from-accent/40 via-cyan/30 to-violet/30 blur-3xl" aria-hidden="true" />
        <div className="glow-border rounded-[40px]">
          <div className="rounded-[38px] bg-white p-3 shadow-[0_40px_80px_-40px_rgba(47,140,255,.55)]">
            <div className="relative overflow-hidden rounded-[28px]">
              <img src={portrait} alt={`${PROFILE.name} 프로필 사진`} width="800" height="1000" loading="lazy" className="block aspect-[4/5] w-full object-cover object-[50%_58%] transition-transform duration-700 hover:scale-[1.04]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                <div><p className="text-2xl font-extrabold tracking-[-0.04em]">{PROFILE.name}</p><p className="eyebrow !text-white/80">{PROFILE.nameEn}</p></div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">{PROFILE.role}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="float-a absolute -left-3 bottom-28 z-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-extrabold shadow-[0_20px_40px_-18px_rgba(30,80,170,.5)] md:-left-9" style={{ transform: "translateZ(80px)" }} aria-hidden="true"><span className="text-lg">⚛️</span>React</div>
        <div className="float-b absolute -right-2 bottom-12 z-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-extrabold shadow-[0_20px_40px_-18px_rgba(30,80,170,.5)] md:-right-8" style={{ transform: "translateZ(70px)" }} aria-hidden="true"><span className="text-lg">🏆</span>수상 {AWARDS.length}회</div>
        <div className="absolute -right-4 -top-7 grid h-28 w-28 place-items-center rounded-full bg-accent text-white shadow-[0_20px_40px_-18px_rgba(47,140,255,.7)] md:-right-8 md:h-36 md:w-36" style={{ transform: "translateZ(60px)" }} aria-hidden="true">
          <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
            <defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
            <text className="fill-white font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em]"><textPath href="#circ" textLength="268" lengthAdjust="spacing">{ring}</textPath></text>
          </svg>
          <span className="text-3xl">✦</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

// 소개 · 교육 · 수상을 한 흐름으로: 왼쪽은 고정, 오른쪽은 스크롤하며 이야기가 이어집니다
export default function About() {
  const olRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: olRef, offset: ["start 72%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-[520px] w-[520px] rounded-full bg-cyan/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-[60%] -z-10 h-[520px] w-[520px] rounded-full bg-violet/10 blur-[130px]" aria-hidden="true" />
      <SectionHead no="01" label="About" title="소개" desc="전공에서 시작해 지금까지, 무엇을 배우고 어떻게 만들어 왔는지 한 흐름으로 담았어요." />
      <div className="grid items-start gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:sticky md:top-28 md:col-span-5">
          <Photo />
          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map(([n, u, t, c], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Tilt max={12} className="card p-4 text-center md:p-5">
                  <p className={`flex items-baseline justify-center font-extrabold tabular-nums tracking-[-0.06em] ${c}`}><span className="text-4xl md:text-5xl"><Counter to={n} delay={0.2 + i * 0.1} /></span><span className="ml-0.5 text-base">{u}</span></p>
                  <p className="mt-1.5 text-[12px] font-semibold leading-snug text-mute">{t}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <ScrollWords text={INTRO.lead} className="text-[clamp(1.9rem,4vw,3.4rem)] font-extrabold leading-[1.28] tracking-[-0.06em]" />
          <Reveal delay={0.05}><div className="mt-7 space-y-5 text-[16.5px] leading-[1.9] text-mute">{INTRO.body.map((t) => <p key={t}>{t}</p>)}</div></Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {areas.map(([Icon, t, d, c], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Tilt className="card spot h-full p-6">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl text-lg ${c}`}><Icon aria-hidden="true" /></span>
                  <h3 className="mt-4 text-lg font-extrabold tracking-[-0.03em]">{t}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-mute">{d}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>

          {/* 배움의 기록 + 받은 상 */}
          <Reveal className="mb-8 mt-20"><p className="text-sm font-extrabold text-accent">배움의 기록</p><h3 className="mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.055em]">하나씩 배우고,<br className="hidden sm:block" /> 직접 만들며 성장해 왔어요</h3></Reveal>
          <ol ref={olRef} className="relative space-y-5 pl-9">
            <i className="absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full bg-accent/15" aria-hidden="true" />
            <motion.i style={{ scaleY: fill }} className="absolute bottom-2 left-[7px] top-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-accent via-cyan to-violet" aria-hidden="true" />
            {EDU.map((e, i) => (
              <li key={e.title} className="relative">
                <motion.i initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-40% 0px" }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className={`absolute -left-[35px] top-8 h-4 w-4 rounded-full border-[3px] tl-ring ${e.awards ? "tl-dot-on bg-accent shadow-[0_0_0_6px_rgba(47,140,255,.2),0_0_24px_rgba(47,140,255,.7)]" : "bg-sky"}`} aria-hidden="true" />
                <Reveal delay={i * 0.04}>
                  <div className="card edu-card spot p-6 hover:-translate-y-1 md:p-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="edu-tag rounded-full px-3 py-1 text-xs font-extrabold">{e.tag}</span><span className="font-mono text-sm font-semibold tabular-nums text-mute">{e.period}</span></div>
                    <h4 className="mt-3 text-[clamp(1.2rem,2.2vw,1.6rem)] font-extrabold leading-snug tracking-[-0.04em]">{e.title}</h4>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-mute">{e.desc}</p>
                    {e.awards && <ul className="mt-4 flex flex-wrap gap-2">{e.awards.map((a) => <li key={a} className="inline-flex items-center gap-2 rounded-full award-chip px-3.5 py-1.5 text-sm font-bold"><span aria-hidden="true">🏆</span>{a}</li>)}</ul>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-8">
            <div className="glow-border rounded-[34px]">
              <div className="relative overflow-hidden rounded-[32px] bg-night p-8 text-white md:p-10">
                <span className="drift pointer-events-none absolute -right-14 -top-14 h-64 w-64 rounded-full bg-accent/50 blur-3xl" aria-hidden="true" />
                <span className="drift pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-violet/40 blur-3xl" style={{ animationDelay: "-6s" }} aria-hidden="true" />
                <span className="shine pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-white/10 blur-xl" aria-hidden="true" />
                <p className="relative flex items-center gap-2 text-sm font-bold text-sky"><FaTrophy aria-hidden="true" />지금까지 받은 상</p>
                <p className="hl relative mt-2 text-[clamp(3rem,7vw,5.4rem)] font-extrabold leading-none tracking-[-0.07em]">{AWARDS.length}회 수상</p>
                <ul className="relative mt-7 divide-y divide-white/10">
                  {AW.map((a) => (
                    <li key={a.year + a.title + a.rank} className="group flex items-baseline gap-4 py-3.5 transition-colors hover:bg-white/[0.04]">
                      <span className="w-12 shrink-0 font-mono text-sm font-bold tabular-nums text-white/50">{a.year}</span>
                      <b className="w-24 shrink-0 text-lg font-extrabold tracking-[-0.03em] text-[#ffd84a] transition-transform group-hover:translate-x-1">{a.rank}</b>
                      <span className="text-[15px] font-semibold text-white/85">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
