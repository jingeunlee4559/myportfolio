import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub, FaEnvelope, FaArrowRight } from "react-icons/fa6";
import { PROFILE } from "../data/profile";
import { lenisRef, lockScroll } from "../lib/gsap";

const EASE = [0.16, 1, 0.3, 1];
const DESC = { project: "대표 프로젝트 4개 · 그 밖의 프로젝트", about: "걸어온 길 · 수상", skill: "직접 써 본 기술", board: "의견 남기기" };

// 휴대폰·태블릿 메뉴: 화면을 덮는 판이 위에서 둥글게 내려오고, 큰 글자 메뉴가 차례로 올라옵니다.
// 지금 보고 있는 섹션 옆에는 파란 마침표가 찍혀 있습니다.
export default function MobileMenu({ open, onClose, links, active }) {
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { lockScroll(false); window.removeEventListener("keydown", esc); };
  }, [open, onClose]);

  const go = (id) => {
    onClose();
    // 메뉴가 닫히고 스크롤이 풀린 다음 이동
    setTimeout(() => {
      if (id === "project") { window.dispatchEvent(new Event("goto-project")); return; }
      const el = document.getElementById(id); if (!el) return;
      lenisRef.current ? lenisRef.current.scrollTo(el, { offset: -70, duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
    }, 380);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="mm" id="mobile-menu" className="mm" role="dialog" aria-modal="true" aria-label="메뉴"
          initial={{ clipPath: "circle(0% at calc(100% - 46px) 44px)" }} animate={{ clipPath: "circle(150% at calc(100% - 46px) 44px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 46px) 44px)", transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
          transition={{ duration: 0.75, ease: EASE }}>
          <span className="mm-glow" aria-hidden="true" />
          <nav className="mm-in" aria-label="섹션 이동">
            <motion.p className="mm-kick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE }}>MENU</motion.p>
            <ul className="mm-list">
              {links.map(([id, no, label], i) => (
                <li key={id} className="mm-li">
                  <motion.button type="button" onClick={() => go(id)} className={`mm-item ${active === id ? "on" : ""}`}
                    initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.22 + i * 0.07, duration: 0.8, ease: EASE }}>
                    <span className="mm-no">{no}</span>
                    <span className="mm-txt"><b>{label}{active === id && <i className="mm-dot" aria-hidden="true" />}</b><small>{DESC[id]}</small></span>
                    <FaArrowRight className="mm-arrow" aria-hidden="true" />
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div className="mm-foot" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease: EASE }}>
              {PROFILE.email && <a href={`mailto:${PROFILE.email}`}><FaEnvelope aria-hidden="true" />{PROFILE.email}</a>}
              <a href={PROFILE.githubPortfolio} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />GitHub</a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
