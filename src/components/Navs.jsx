import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import ThemeToggle from "./ThemeToggle";

// 번호는 페이지에 나오는 순서와 같습니다.
const links = [["about", "01", "소개"], ["project", "02", "프로젝트"], ["skill", "03", "기술"], ["board", "04", "방명록"]];

export default function Navs() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(null);
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const on = () => { setSolid(window.scrollY > 40); if (window.scrollY < 300) setActive(null); };
    on(); window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  const dark = false;
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-cyan to-violet" style={{ scaleX: w }} aria-hidden="true" />
      <nav aria-label="주요 메뉴" className={`flex h-14 w-full max-w-4xl items-center justify-between rounded-full pl-6 pr-2 transition-all duration-500 ${solid ? "bg-white/75 shadow-[0_10px_40px_-14px_rgba(25,31,40,.3)] ring-1 ring-white/70 backdrop-blur-2xl" : "bg-transparent"}`}>
        <a href="#top" className={`flex items-center gap-2 text-[17px] font-extrabold tracking-[-0.03em] transition-colors ${dark ? "text-white" : "text-ink"}`}><i className="spin-slow grid h-5 w-5 place-items-center rounded-full bg-[conic-gradient(#2f8cff,#3de0ff,#ff8ad0,#2f8cff)]" aria-hidden="true"><b className="h-2 w-2 rounded-full bg-white" /></i>이진근</a>
        <ul className="hidden gap-1 md:flex">
          {links.map(([id, no, label]) => (
            <li key={id} className="relative">
              {active === id && <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} className={`absolute inset-0 rounded-full ${dark ? "bg-white/15" : "bg-accent/10"}`} aria-hidden="true" />}
              <a href={`#${id}`} className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${dark ? "hover:text-white" : "hover:text-ink"} ${active === id ? (dark ? "text-white" : "text-accent") : dark ? "text-white/65" : "text-mute"}`}><span className="font-mono text-[10px] opacity-60">{no}</span>{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2"><ThemeToggle /><a href="#board" className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-95 ${dark ? "bg-white text-ink hover:bg-accent hover:text-white" : "bg-ink text-white hover:bg-accent"}`}>연락하기</a></div>
      </nav>
    </header>
  );
}
