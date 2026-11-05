import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub, FaEnvelope, FaArrowRight, FaBolt, FaWandMagicSparkles } from "react-icons/fa6";
import { PROFILE } from "../data/profile";
import { gsap, lenisRef, lockScroll } from "../lib/gsap";
import { lite, FULL } from "../lib/env";

const EASE = [0.16, 1, 0.3, 1];
// 메뉴 판이 열리고 닫히는 모습.
// 컴퓨터: 버튼에서 원이 퍼지듯 열림(clip-path). 휴대폰: 원형 clip-path는 화면 전체를 매 프레임 다시 그려야 해서 쓰지 않습니다.
const PANEL = lite
  // 휴대폰: 메뉴 판이 반투명해지는 순간 뒤 화면이 비쳐 보여서, 판은 열 때 바로 불투명하게 나타나고(안의 글자만 차례로 올라옴)
  // 닫을 때는 투명도 변화 없이 위로 걷혀 올라갑니다.
  ? { initial: false, animate: { y: 0 }, exit: { y: "-100%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } } }
  : { initial: { clipPath: "circle(0% at calc(100% - 46px) 44px)" }, animate: { clipPath: "circle(150% at calc(100% - 46px) 44px)" }, exit: { clipPath: "circle(0% at calc(100% - 46px) 44px)", transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } };

const DESC = { project: "대표 프로젝트 4개 · 그 밖의 프로젝트", about: "걸어온 길 · 수상", skill: "직접 써 본 기술", board: "의견 남기기" };

// 휴대폰·태블릿 메뉴: 화면을 덮는 판이 위에서 둥글게 내려오고, 큰 글자 메뉴가 차례로 올라옵니다.
// 지금 보고 있는 섹션 옆에는 파란 마침표가 찍혀 있습니다.
export default function MobileMenu({ open, onClose, links, active }) {
  // 누른 메뉴 항목. 메뉴가 "완전히 닫힌 뒤"에 이동하려고 잠시 기억해 둡니다.
  const pending = useRef(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    // 메뉴가 열려 있는 동안 화면 아래 안내 바를 숨김 (메뉴 맨 아래 "화면 버전" 스위치를 가리지 않게)
    document.documentElement.classList.add("mm-open");
    // 메뉴가 덮고 있는 동안은 뒤 페이지의 GSAP 연출을 멈춰, 메뉴 애니메이션이 끊기지 않게 합니다.
    gsap.globalTimeline.pause();
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { document.documentElement.classList.remove("mm-open"); gsap.globalTimeline.resume(); lockScroll(false); window.removeEventListener("keydown", esc); };
  }, [open, onClose]);

  const go = (id) => { pending.current = id; onClose(); };
  // 화면 버전 바꾸기: 지금과 다른 쪽을 누르면 메뉴를 닫고, 안내 바(ModeBar)와 같은 동작을 실행
  const switchTo = (full) => { if (full === FULL) return; onClose(); setTimeout(() => window.dispatchEvent(new Event("mode-request")), 320); };

  // 닫힘 애니메이션이 끝나고 스크롤 잠금이 풀린 다음에 이동합니다. (닫히는 중에 이동이 겹치면 휴대폰에서 버벅임)
  const afterClose = () => {
    const id = pending.current; pending.current = null;
    if (!id) return;
    requestAnimationFrame(() => {
      if (id === "project") { window.dispatchEvent(new Event("goto-project")); return; }
      const el = document.getElementById(id); if (!el) return;
      const l = lenisRef.current;
      // 휴대폰은 고정 구간 여러 개를 천천히 통과하면 무거우므로 짧게 이동합니다.
      if (l) l.scrollTo(el, { offset: -70, duration: lite ? 0.6 : 1.4 });
      else el.scrollIntoView({ behavior: lite ? "auto" : "smooth" });
    });
  };

  return (
    <AnimatePresence onExitComplete={afterClose}>
      {open && (
        <motion.div key="mm" id="mobile-menu" className="mm" role="dialog" aria-modal="true" aria-label="메뉴" data-lenis-prevent {...PANEL}>
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
            {/* 화면 버전 스위치 (휴대폰·태블릿만): 누르면 메뉴를 닫고 안내 바와 같은 동작(mode-request) */}
            {lite && (
              <motion.div className="mm-mode" role="group" aria-label="화면 버전" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: EASE }}>
                <p className="mm-mode-k">화면 버전<small>{FULL ? "PC와 같은 스크롤 연출로 보고 있어요" : "빠르게 훑어보기 좋은 버전이에요"}</small></p>
                <div className={`mm-mode-sw ${FULL ? "is-full" : ""}`}>
                  <i className="mm-mode-pill" aria-hidden="true" />
                  <button type="button" aria-pressed={!FULL} className={!FULL ? "on" : ""} onClick={() => switchTo(false)}><FaBolt aria-hidden="true" />간편 모드</button>
                  <button type="button" aria-pressed={FULL} className={FULL ? "on" : ""} onClick={() => switchTo(true)}><FaWandMagicSparkles aria-hidden="true" />전체 애니메이션</button>
                </div>
              </motion.div>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
