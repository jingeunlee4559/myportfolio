import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { PROFILE } from "../data/profile";
import { useDark } from "../lib/theme";

// 번호는 페이지에 나오는 순서와 같습니다.
const links = [["project", "01", "프로젝트"], ["about", "02", "소개"], ["skill", "03", "기술"], ["board", "04", "방명록"]];
// "프로젝트"는 스크롤 연출 속 첫 프로젝트 지점으로 이동합니다.
const goProject = (e) => { e.preventDefault(); window.dispatchEvent(new Event("goto-project")); };

// 아래로 스크롤하면 숨고, 위로 올리면 다시 나타납니다. 페이지 맨 위에서는 항상 보입니다.
export default function Navs() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const last = useRef(0);
  const dark = useDark();
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const on = () => {
      const y = window.scrollY, d = y - last.current;
      setSolid(true);
      if (y < 300) setActive(null);
      if (y < 120) setHidden(false);
      else if (d > 6) setHidden(true);   // 아래로
      else if (d < -6) setHidden(false); // 위로
      if (Math.abs(d) > 6 || y < 120) last.current = y;
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.nav); }), { rootMargin: "-45% 0px -50% 0px" });
    const watch = () => document.querySelectorAll("[data-nav]").forEach((el) => io.observe(el));
    watch(); const t = setTimeout(watch, 1500); // 방명록은 늦게 불러오므로 한 번 더
    return () => { window.removeEventListener("scroll", on); io.disconnect(); clearTimeout(t); };
  }, []);
  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" style={{ scaleX: w }} aria-hidden="true" />
      <motion.header initial={false} animate={{ y: hidden && !menu ? "-120%" : "0%" }} transition={{ type: "spring", stiffness: 380, damping: 38 }} className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4" onFocusCapture={() => setHidden(false)}>
        <nav aria-label="주요 메뉴" className={`${menu ? "nav-open" : ""} flex h-14 w-full max-w-4xl items-center justify-between rounded-full pl-6 pr-2 transition-[background,box-shadow] duration-500 ${solid ? (dark ? "bg-[#0f1730]/85 shadow-[0_10px_40px_-14px_rgba(0,0,0,.6)] ring-1 ring-white/10 backdrop-blur-2xl" : "bg-white/80 shadow-[0_10px_40px_-14px_rgba(25,31,40,.3)] ring-1 ring-black/5 backdrop-blur-2xl") : "bg-transparent"}`}>
          <a href="#top" className="nav-logo flex items-center gap-2 text-[17px] font-extrabold tracking-[-0.03em] text-ink"><i className="grid h-5 w-5 place-items-center rounded-full bg-accent" aria-hidden="true"><b className="h-2 w-2 rounded-full bg-white" /></i><span id="logoText">{PROFILE.name}</span></a>
          <ul className="hidden gap-1 md:flex">
            {links.map(([id, no, label]) => (
              <li key={id} className="relative">
                {active === id && <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} className="absolute inset-0 rounded-full bg-accent/10" aria-hidden="true" />}
                <a href={`#${id}`} onClick={id === "project" ? goProject : undefined} className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition hover:text-ink ${active === id ? "text-accent" : "text-mute"}`}><span className="font-mono text-[10px] opacity-60">{no}</span>{label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button type="button" className={`mm-btn md:hidden ${menu ? "on" : ""}`} onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? "메뉴 닫기" : "메뉴 열기"}>
              <i /><i />
            </button>
          </div>
        </nav>
      </motion.header>
      <MobileMenu open={menu} onClose={closeMenu} links={links} active={active} />
    </>
  );
}
