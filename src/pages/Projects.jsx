import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { projects } from "../data/projects";
import { THEMES } from "../data/themes";
import { PROFILE } from "../data/profile";
import Split from "../components/Split";
import ProjectModal from "../components/Projects/ProjectModal";

const ROLE = projects.map((p) => p.details.roleShort);
const ORDER = [7, 6, 5, 4, 3, 2, 1, 0]; // 최신순
const EASE = [0.16, 1, 0.3, 1];
// 대표색 위에서 글자가 읽히도록 밝기에 따라 검정/흰색을 고릅니다.
const textOn = (hex) => { const n = parseInt(hex.slice(1), 16), l = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255); return l > 150 ? "#0a0b10" : "#ffffff"; };
const year = (p) => p.details.period.slice(0, 4);

// 커서를 느슨하게 따라다니며 대표 화면을 보여주는 미리보기 (마우스가 있는 넓은 화면에서만)
function Preview({ index }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 }), sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });
  const rot = useSpring(0, { stiffness: 120, damping: 14 });
  useEffect(() => {
    let lx = 0;
    const mv = (e) => { x.set(e.clientX + 36); y.set(e.clientY - 150); rot.set(Math.max(-9, Math.min(9, (e.clientX - lx) * 0.5))); lx = e.clientX; };
    window.addEventListener("pointermove", mv, { passive: true });
    return () => window.removeEventListener("pointermove", mv);
  }, [x, y, rot]);
  const p = index == null ? null : projects[index];
  return (
    <motion.div aria-hidden="true" style={{ x: sx, y: sy, rotate: rot }} className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)_and_(min-width:1024px)]:block">
      <AnimatePresence>
        {p && (
          <motion.div key={index} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.35, ease: EASE }} className="w-[360px] overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)] ring-4" style={{ "--tw-ring-color": THEMES[index].c }}>
            <img src={p.image} alt="" className="block aspect-[16/10] w-full object-cover object-top" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Row({ i, onOpen, onHover }) {
  const p = projects[i], c = THEMES[i].c, fg = textOn(c);
  return (
    <motion.li initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.9, ease: EASE }} className="border-t border-ink/10 last:border-b">
      <button type="button" data-cursor="열기" onClick={() => onOpen(i)} onPointerEnter={() => onHover(i)} onPointerLeave={() => onHover(null)} aria-label={`${p.details.modalTitle} 자세히 보기`}
        style={{ "--c": c, "--fg": fg }} className="row group relative block w-full cursor-pointer overflow-hidden text-left text-ink transition-colors duration-300 hover:text-[var(--fg)] focus-visible:text-[var(--fg)]">
        <i className="row-fill" aria-hidden="true" />
        <div className="relative grid items-center gap-x-8 gap-y-3 px-1 py-7 transition-transform duration-500 [transition-timing-function:cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 md:px-4 md:py-10 lg:grid-cols-[6rem_minmax(0,1fr)_minmax(0,18rem)_3rem]">
          <span className="display text-[15px] font-semibold tabular-nums opacity-60">{year(p)}</span>
          <div className="min-w-0">
            <h3 className="text-[clamp(1.5rem,3.3vw,3.1rem)] font-bold leading-[1.15] tracking-[-0.05em]">{p.details.modalTitle}</h3>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed opacity-60">{THEMES[i].focus}</p>
          </div>
          <div className="hidden text-[14px] leading-relaxed opacity-70 lg:block">
            <p className="font-semibold">{p.details.techStack.slice(0, 3).join(" · ")}</p>
            <p className="mt-1">{ROLE[i]}</p>
          </div>
          <span className="hidden h-12 w-12 place-items-center rounded-full text-xl ring-1 ring-current transition-transform duration-500 group-hover:rotate-[-45deg] lg:grid" aria-hidden="true">→</span>
        </div>
      </button>
    </motion.li>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const sec = useRef(null);
  return (
    <section id="project" ref={sec} className="relative mx-2 my-2 rounded-[40px] proj-bg px-5 py-28 text-ink ring-1 ring-white md:mx-4 md:my-4 md:rounded-[56px] md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mb-24">
          <Split text="프로젝트" className="display text-[clamp(3rem,10vw,9.5rem)] font-extrabold leading-[0.95]" />
          <p className="max-w-sm text-[17px] leading-relaxed text-ink/60">팀으로 만든 {projects.length}개입니다. 누르면 제가 맡은 일과 결과를 볼 수 있어요.</p>
        </div>
        <ul onPointerLeave={() => setHover(null)}>{ORDER.map((i) => <Row key={i} i={i} onOpen={setOpen} onHover={setHover} />)}</ul>
        <div className="mt-14 flex justify-end"><a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-accent">코드는 GitHub에 있어요</a></div>
      </div>
      <Preview index={open == null ? hover : null} />
      {createPortal(<ProjectModal index={open} onClose={() => setOpen(null)} onChange={setOpen} order={ORDER} roles={ROLE} />, document.body)}
    </section>
  );
}
