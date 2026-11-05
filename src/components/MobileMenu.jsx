import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";
import { gsap, lockScroll, scrollToTarget } from "../lib/gsap";
import { lite } from "../lib/env";

const EASE = [0.16, 1, 0.3, 1];
// 메뉴 판이 열리고 닫히는 모습.
// 컴퓨터: 버튼에서 원이 퍼지듯 열림(clip-path).
// 휴대폰: 판이 반투명해지는 순간 뒤 화면이 비쳐 보여서, 판은 바로 불투명하게 나타나고(안의 글자만 차례로 올라옴)
//         닫을 때는 반투명 상태를 거치지 않고 한 번에 사라집니다.
const PANEL = lite
  // 닫을 때: 위로 걷히며 뒤 화면이 드러나 보이던 것을 없애려고, 판은 움직이지 않고 한 번에 사라집니다.
  ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0 } } }
  : { initial: { clipPath: "circle(0% at calc(100% - 46px) 44px)" }, animate: { clipPath: "circle(150% at calc(100% - 46px) 44px)" }, exit: { clipPath: "circle(0% at calc(100% - 46px) 44px)", transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } };

const DESC = { project: "대표 프로젝트 4개 · 그 밖의 프로젝트", about: "걸어온 길 · 수상", skill: "직접 써 본 기술", board: "의견 남기기" };

// 휴대폰·태블릿 메뉴: 화면을 덮는 판 위에 큰 글자 메뉴 4개(번호 · 이름 · 설명 · 화살표)가 위에서부터 차례로 놓입니다.
// 지금 보고 있는 섹션 옆에는 파란 마침표가 찍혀 있습니다.
// 크기는 화면 높이와 상관없이 정해져 있어(토스·카카오 메뉴처럼) 어느 폰에서나 같은 모양으로 보이고,
// 화면이 아주 짧은 폰에서만 메뉴 안에서 스크롤됩니다. (메일·GitHub는 위쪽 바에 있어 메뉴에는 두지 않음)
export default function MobileMenu({ open, onClose, links, active }) {
  const panel = useRef(null);
  // 누른 메뉴 항목. 메뉴가 "완전히 닫힌 뒤"에 이동하려고 잠시 기억해 둡니다.
  const pending = useRef(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    // 메뉴가 덮고 있는 동안은 뒤 페이지의 GSAP 연출을 멈춰, 메뉴 애니메이션이 끊기지 않게 합니다.
    gsap.globalTimeline.pause();
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);

    // 메뉴가 열려 있는 동안 화면 어디를 끌어도(위쪽 바 포함) 끌기를 막습니다.
    // (카톡 등은 끌 때마다 위아래 막대를 접었다 펴며 화면 크기를 바꾸므로)
    // 넘치는 짧은 화면에서는 메뉴 안 스크롤만 허용합니다. 누르기(탭)는 그대로 됩니다.
    const el = panel.current;
    const inner = el?.querySelector(".mm-in");
    const block = (e) => {
      const fits = !inner || inner.scrollHeight <= inner.clientHeight + 1;
      if (fits || !inner.contains(e.target)) e.preventDefault();
    };
    document.addEventListener("touchmove", block, { passive: false });

    // 메뉴 뒤 페이지를 숨깁니다. 카톡 막대가 나타나 화면 크기가 바뀌는 순간, 폰이 메뉴 배경을 한두 프레임 늦게 그려
    // 그 사이 뒤의 히어로 이미지 벽이 비쳐 보였습니다. 뒤 페이지가 숨겨져 있으면 그 순간에도 보일 것이 없습니다.
    // (메뉴가 화면에 그려진 다음 프레임에 숨겨, 여는 순간 빈 화면이 끼지 않게)
    const html = document.documentElement;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add("mm-open")));

    return () => { cancelAnimationFrame(raf); html.classList.remove("mm-open"); document.removeEventListener("touchmove", block); gsap.globalTimeline.resume(); lockScroll(false); window.removeEventListener("keydown", esc); };
  }, [open, onClose]);

  const go = (id) => { pending.current = id; onClose(); };

  // 닫힘 애니메이션이 끝나고 스크롤 잠금이 풀린 다음에 이동합니다. (닫히는 중에 이동이 겹치면 휴대폰에서 버벅임)
  const afterClose = () => {
    const id = pending.current; pending.current = null;
    if (!id) return;
    requestAnimationFrame(() => {
      if (id === "project") { window.dispatchEvent(new Event("goto-project")); return; }
      const el = document.getElementById(id); if (!el) return;
      scrollToTarget(el, { offset: lite ? -96 : -70, duration: lite ? 0.6 : 1.4 });
    });
  };

  return (
    <AnimatePresence onExitComplete={afterClose}>
      {open && (
        <motion.div key="mm" id="mobile-menu" ref={panel} className="mm" role="dialog" aria-modal="true" aria-label="메뉴" data-lenis-prevent {...PANEL}>
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
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
