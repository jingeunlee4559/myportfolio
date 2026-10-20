import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { FaGithub } from "react-icons/fa6";
import { PROFILE } from "../data/profile";
import { D0, reduced } from "../lib/env";
import { layers } from "../data/skills";
import Magnetic from "../components/Magnetic";
import DotField from "../components/DotField";
import Aurora from "../components/Aurora";
import Sparkles from "../components/Sparkles";
import Mascot from "../components/Mascot";
import { useDark } from "../lib/theme";

const WORDS = ["꼼꼼한", "끝까지 해내는", "함께 만드는", "성장하는"];
const ICON = Object.fromEntries(layers.flatMap((l) => l.items).filter(([, i]) => i));
const ORBIT = ["React", "Spring Boot", "Node.js", "Tailwind CSS", "Vite", "Figma"].filter((n) => ICON[n]);
const SPRING = { type: "spring", stiffness: 70, damping: 15 };
const Z = (n) => ({ transform: `translateZ(${n}px)` });

function Chars({ text, base = 0 }) {
  return [...text].map((ch, i) => ch === " "
    ? <span key={i} className="inline-block w-[.28em]" />
    : <span key={i} className="ch inline-block" style={{ animationDelay: `${D0 + base + i * 0.05}s` }}>{ch}</span>);
}

const MSGS = ["안녕! 👋", "반가워요!", "눌러줘서 고마워요 ✨", "프로젝트 보러 가요", "스크롤 해볼래요?"];
const FACES = ["React", "Tailwind CSS", "Vite", "Node.js", "Spring Boot", "Figma"].filter((n) => ICON[n]);

const Float = ({ cls, z, delay, fl = "", children }) => (
  <div className={`absolute ${cls}`} style={Z(z)}>
    <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: D0 + delay }}><div className={fl}>{children}</div></motion.div>
  </div>
);
const glass = "rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-extrabold shadow-[0_18px_36px_-16px_rgba(47,140,255,.7)] ring-1 ring-white backdrop-blur";
const Orb = ({ size, from, to }) => <div className="rounded-full shadow-[inset_-8px_-10px_18px_rgba(0,0,0,.12),0_24px_40px_-14px_rgba(60,90,255,.45)]" style={{ width: size, height: size, background: `radial-gradient(circle at 32% 26%, #fff 0, ${from} 32%, ${to} 100%)` }} />;

// 면마다 기술 아이콘이 붙은 3D 유리 큐브
function Cube() {
  const faces = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(270deg)", "rotateX(90deg)", "rotateX(-90deg)"];
  return (
    <div className="relative h-[96px] w-[96px]" style={{ transformStyle: "preserve-3d" }}>
      <div className="cube-spin absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {faces.map((f, i) => (
          <span key={f} className="absolute inset-0 grid place-items-center rounded-[18px] bg-white/70 p-5 ring-1 ring-white backdrop-blur-sm shadow-[inset_0_0_24px_rgba(47,140,255,.25)]" style={{ transform: `${f} translateZ(48px)` }}>
            <img src={ICON[FACES[i % FACES.length]]} alt="" className="h-full w-full object-contain" />
          </span>
        ))}
      </div>
    </div>
  );
}

// 3D 무대: 마우스 방향으로 통째로 기울고, 마스코트 둘레를 기술 아이콘 고리가 돕니다. 마스코트를 누르면 말을 걸어요.
function Stage({ sx, sy }) {
  const rY = useTransform(sx, [-0.5, 0.5], [-16, 16]), rX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const [msg, setMsg] = useState(0);
  const R = 215;
  return (
    <div className="relative mx-auto h-[330px] w-[330px] sm:h-[440px] sm:w-[440px] lg:h-[560px] lg:w-[560px]">
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: D0 + 0.1 }} className="absolute left-0 top-0 h-[560px] w-[560px] origin-top-left [scale:.59] sm:[scale:.786] lg:[scale:1]" style={{ perspective: 1300 }}>
        <motion.div style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }} className="absolute inset-0">
          <div className="stage-disc absolute inset-[7%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#d6ecff_50%,#c6d2ff)] shadow-[0_60px_120px_-40px_rgba(47,140,255,.7)]" style={Z(-90)} />
          <span className="spin-slow absolute inset-[1%] rounded-full border-2 border-dashed border-accent/35" style={Z(-60)} />
          <span className="spin-rev absolute inset-[13%] rounded-full border border-violet/30" style={Z(-40)} />
          <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d", transform: "translateZ(0) rotateX(-18deg)" }}>
            <div className="ring-spin" style={{ transformStyle: "preserve-3d" }}>
              {ORBIT.map((n, i) => { const a = (360 / ORBIT.length) * i; return (
                <div key={n} className="absolute -ml-8 -mt-8 h-16 w-16" style={{ transformStyle: "preserve-3d", transform: `rotateY(${a}deg) translateZ(${R}px)` }}>
                  <div style={{ transformStyle: "preserve-3d", transform: `rotateY(${-a}deg)` }}><div className="ring-counter" style={{ transformStyle: "preserve-3d" }}>
                    <span className="grid h-16 w-16 place-items-center rounded-[20px] bg-white p-3 shadow-[0_24px_44px_-18px_rgba(30,80,170,.55)] ring-1 ring-line"><img src={ICON[n]} alt="" className="h-full w-full object-contain" /></span>
                  </div></div>
                </div>); })}
            </div>
          </div>
          <div className="absolute left-1/2 top-[16%] w-[250px] -translate-x-1/2" style={Z(40)}>
            <motion.div initial={{ opacity: 0, y: 80, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...SPRING, delay: D0 + 0.3 }}>
              <div className="bob"><motion.button type="button" data-cursor="눌러봐" aria-label="마스코트에게 인사하기" onClick={() => setMsg((m) => (m + 1) % MSGS.length)} whileTap={{ scale: 0.92, y: 14 }} whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.6 } }} className="block w-full cursor-pointer"><Mascot sx={sx} sy={sy} /></motion.button></div>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute bottom-[12%] left-1/2 h-6 w-40 -translate-x-1/2 rounded-full bg-accent/25 blur-xl" style={Z(10)} />

          <div className="pointer-events-none absolute right-[2%] top-[4%]" style={{ ...Z(150), transformStyle: "preserve-3d" }}><div className="float-a" style={{ transformStyle: "preserve-3d" }}><Cube /></div></div>
          <Float cls="right-[26%] bottom-[3%]" z={170} delay={0.9} fl="float-b"><Orb size={62} from="#ff8ad0" to="#c94fd8" /></Float>
          <Float cls="left-[15%] bottom-[30%]" z={120} delay={1} fl="float-a"><Orb size={34} from="#ffe27a" to="#ffb21e" /></Float>
          <Float cls="right-[1%] top-[47%]" z={140} delay={1.1} fl="float-b"><Orb size={44} from="#9be9ff" to="#2f8cff" /></Float>

          <div className="pointer-events-none absolute left-[1%] top-[20%]" style={Z(190)}>
            <motion.div key={msg} initial={{ opacity: 0, scale: 0.4, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 16, delay: msg === 0 ? D0 + 1.1 : 0 }}>
              <div className={`float-b relative ${glass}`}>{MSGS[msg]}<i className="absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 bg-white/90" /></div>
            </motion.div>
          </div>
          <Float cls="left-[30%] top-[1%]" z={110} delay={1.2} fl="float-a"><div className={`${glass} font-mono text-[13px] text-accent`}>{"<Hero />"}</div></Float>
          <Float cls="left-[-2%] bottom-[10%]" z={150} delay={1.3} fl="float-b"><div className={`${glass} flex items-center gap-3`}>Dark mode<span className="relative block h-7 w-[52px] rounded-full bg-accent"><i className="knob absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow" /></span></div></Float>
          <Float cls="right-[-2%] bottom-[26%]" z={160} delay={1.4} fl="float-a"><div className={`${glass} flex items-center gap-2`}><motion.span animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.2 }} className="text-lg text-coral" aria-hidden="true">♥</motion.span>128</div></Float>
          <div className="pointer-events-none absolute left-[30%] top-[64%]" style={Z(210)} aria-hidden="true">
            <motion.div animate={{ x: [0, 60, 20, -30, 0], y: [0, -30, 40, 10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M3 2l17 8-7.5 2.5L10 20z" fill="#7c5cff" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              <span className="ml-4 -mt-1 block w-max rounded-full bg-violet px-2.5 py-1 text-[11px] font-bold text-white">{PROFILE.name}</span>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-0" style={Z(100)}><Sparkles color="#2f8cff" /></div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [k, setK] = useState(0);
  const dark = useDark();
  const sec = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 }), sy = useSpring(my, { stiffness: 90, damping: 18 });
  useEffect(() => { const t = setInterval(() => setK((v) => (v + 1) % WORDS.length), 2300); return () => clearInterval(t); }, []);

  // 마우스를 따라 무대가 기울고, 가만히 있으면 스스로 살랑살랑 흔들립니다.
  useEffect(() => {
    const el = sec.current; if (!el || reduced) return;
    let last = 0, raf = 0, vis = true; const t0 = performance.now();
    const move = (e) => { const b = el.getBoundingClientRect(); mx.set((e.clientX - b.left) / b.width - 0.5); my.set((e.clientY - b.top) / b.height - 0.5); el.style.setProperty("--mx", `${(e.clientX - b.left).toFixed(0)}px`); el.style.setProperty("--my", `${(e.clientY - b.top).toFixed(0)}px`); last = performance.now(); };
    const loop = (now) => { raf = requestAnimationFrame(loop); if (!vis || now - last < 2400) return; const t = (now - t0) / 1000; mx.set(Math.sin(t * 0.5) * 0.3); my.set(Math.cos(t * 0.7) * 0.2); };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(el);
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("pointermove", move); };
  }, [mx, my]);

  const { scrollYProgress: p } = useScroll({ target: sec, offset: ["start start", "end start"] });
  const y = useTransform(p, [0, 1], [0, 120]), o = useTransform(p, [0, 0.75], [1, 0]), sc = useTransform(p, [0, 1], [1, 0.94]);
  const rise = (d) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: D0 + d, ease: [0.16, 1, 0.3, 1] } });

  return (
    <section ref={sec} id="top" style={{ "--mx": "70%", "--my": "40%" }} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden rounded-b-[40px] hero-bg text-ink md:rounded-b-[56px]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0"><Aurora dark={dark} /></div>
        <span className="absolute h-[38vmax] w-[38vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[110px] transition-[left,top] duration-700 ease-out" style={{ left: "var(--mx)", top: "var(--my)" }} />
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(90%_75%_at_50%_40%,#000,transparent)]"><DotField /></div>
      </div>

      <motion.div style={{ y, opacity: o, scale: sc }} className="relative flex flex-1 items-center px-5 pb-16 pt-28 md:px-12">
        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.p {...rise(0)} className="inline-flex items-center gap-2.5 rounded-full bg-white/85 px-4 py-2 text-sm font-bold shadow-[0_10px_30px_-14px_rgba(47,140,255,.7)] ring-1 ring-white backdrop-blur">
              <i className="pulse-dot h-2.5 w-2.5 rounded-full bg-mint" aria-hidden="true" />신입 웹 개발자 {PROFILE.name}
            </motion.p>
            <h1 className="mt-6 text-[clamp(2.7rem,7.4vw,7.4rem)] font-extrabold leading-[1.04] tracking-[-0.075em]" aria-label={`안녕하세요, ${WORDS[k]} 개발자 ${PROFILE.name}입니다.`}>
              <span className="block"><Chars text="안녕하세요," /></span>
              <span className="grid h-[1.2em] [clip-path:inset(0_-100vw)] overflow-y-clip" aria-hidden="true">
                {WORDS.map((w, i) => (
                  <motion.span key={w} initial={false} animate={k === i ? { y: "0%", opacity: 1 } : { y: i === (k + WORDS.length - 1) % WORDS.length ? "-110%" : "110%", opacity: 0 }} transition={{ type: "spring", stiffness: 140, damping: 20 }} className="col-start-1 row-start-1 whitespace-nowrap"><span className="hl">{w}</span></motion.span>
                ))}
              </span>
              <span className="block"><Chars text="개발자" base={0.3} /></span>
              <span className="block whitespace-nowrap"><Chars text={`${PROFILE.name}입니다.`} base={0.45} /></span>
            </h1>
            <motion.p {...rise(0.9)} className="mt-7 max-w-lg text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-ink/65">움직이는 화면에 끌려 개발을 시작했어요. 화면 구현에서 멈추지 않고 UI/UX 설계와 백엔드 API까지 맡아 서비스를 끝까지 완성하고, 인터랙션과 모션으로 완성도를 한 단계 더 끌어올립니다.</motion.p>
            <motion.div {...rise(1.05)} className="mt-8 flex flex-wrap gap-3">
              <Magnetic><a href="#project" className="btn btn-accent">프로젝트 보기</a></Magnetic>
              <Magnetic><a href={PROFILE.githubPortfolio} target="_blank" rel="noopener noreferrer" className="btn btn-glass"><FaGithub aria-hidden="true" />GitHub</a></Magnetic>
            </motion.div>
          </div>
          <Stage sx={sx} sy={sy} />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center" aria-hidden="true">
        <span className="relative block h-11 w-[26px] overflow-hidden rounded-full ring-2 ring-ink/25"><i className="scroll-cue absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 rounded-full bg-ink/60" /></span>
      </div>
    </section>
  );
}
