import { useLayoutEffect, useRef, useState } from "react";
import { gsap, lockScroll } from "../lib/gsap";
import { reduced } from "../lib/env";
import { PROFILE } from "../data/profile";

// 첫 화면 인트로: 남색 밤하늘 + 반짝이는 별 + 이름 + 0→100% 로딩.
// 새로고침할 때마다 다시 나오고, 끝나면 어두운 막이 위로 걷히며 이름이 왼쪽 위 로고 자리로 날아갑니다.
// 끝나면 "intro-done" 이벤트를 보내 히어로가 등장을 시작합니다.
const HELLO = ["안녕하세요", "Hello", "こんにちは", "Hola", "你好", "Bonjour", "안녕하세요"];
const STAR = "M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z";
const STARS = Array.from({ length: 14 }, (_, i) => {
  const r = (n) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2); // 매번 같은 자리 (새로고침해도 깜빡이지 않게)
  return { x: 4 + r(1) * 92, y: 6 + r(2) * 80, s: 6 + r(3) * 14, d: r(4) * 2.6, t: 2 + r(5) * 2 };
});

export const finishIntro = () => { window.__introDone = true; window.dispatchEvent(new Event("intro-done")); };

export default function Intro() {
  const [show, setShow] = useState(!reduced);
  const root = useRef(null), big = useRef(null);

  useLayoutEffect(() => {
    if (reduced) { document.documentElement.classList.add("intro-gone"); finishIntro(); return; }
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0); lockScroll(true);
    const el = root.current, name = big.current, letters = name.querySelectorAll(".in-l"), shines = name.querySelectorAll(".in-shine");
    let w = 0, skip = false, alive = true;
    const hello = el.querySelector(".in-hello span");
    const iv = setInterval(() => {
      w = Math.min(w + 1, HELLO.length - 1);
      gsap.timeline().to(hello, { yPercent: -110, opacity: 0, duration: 0.14, ease: "power2.in" }).add(() => { hello.textContent = HELLO[w]; }).fromTo(hello, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2, ease: "power2.out" });
    }, 330);
    const ctx = gsap.context(() => {
      gsap.set(name, { xPercent: -50, yPercent: -50 });
      gsap.fromTo(letters, { yPercent: 70, opacity: 0, scale: 0.7, rotationX: -70, filter: "blur(18px)" }, { yPercent: 0, opacity: 1, scale: 1, rotationX: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.12, delay: 0.2, ease: "expo.out" });
      gsap.fromTo(shines, { backgroundPosition: "150% 0" }, { backgroundPosition: "-60% 0", duration: 1.4, stagger: 0.1, delay: 1.1, ease: "power2.inOut", repeat: -1, repeatDelay: 1.2 });
      gsap.fromTo(".in-sub", { opacity: 0, letterSpacing: "1.2em" }, { opacity: 1, letterSpacing: ".45em", duration: 1.4, delay: 0.7, ease: "expo.out" });
      gsap.fromTo(".in-star", { scale: 0 }, { scale: 1, duration: 0.6, stagger: 0.05, delay: 0.3 });
      const L = { v: 0 };
      gsap.to(L, {
        v: 100, duration: 2.6, ease: "power2.inOut",
        onUpdate() { el.querySelector(".in-bar i").style.transform = `scaleX(${L.v / 100})`; el.querySelector(".in-pct b").textContent = Math.round(L.v); if (skip) this.progress(1); },
        onComplete: () => { clearInterval(iv); if (alive) gsap.delayedCall(0.26, leave); },
      });
    }, el);
    el.querySelector(".in-skip").onclick = () => { skip = true; };

    function leave() {
      gsap.killTweensOf(shines); gsap.set(shines, { opacity: 0 });
      gsap.to(el.querySelectorAll(".in-center, .in-prog, .in-skip, .in-star"), { opacity: 0, duration: 0.3 });
      gsap.fromTo(el, { clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)", duration: 1.05, delay: 0.12, ease: "power4.inOut" });
      // 이름이 로고 자리로 날아가며 검은 글씨가 됨
      const to = document.getElementById("logoText"), from = name.getBoundingClientRect();
      const dark = document.documentElement.classList.contains("dark");
      if (to) {
        const t = to.getBoundingClientRect(), sc = (t.height / from.height) * 1.1;
        gsap.fromTo(name.querySelectorAll(".in-l b:not(.in-shine)"), { filter: "brightness(1)" }, { filter: dark ? "brightness(1)" : "brightness(0.1)", duration: 0.55, delay: 0.4 });
        gsap.to(name, { x: t.left + t.width / 2 - (from.left + from.width / 2), y: t.top + t.height / 2 - (from.top + from.height / 2), scale: sc, duration: 1.05, delay: 0.12, ease: "power4.inOut" });
      }
      gsap.delayedCall(0.55, () => { lockScroll(false); finishIntro(); });
      gsap.delayedCall(1.25, () => { document.documentElement.classList.add("intro-gone"); setShow(false); });
    }
    return () => { alive = false; clearInterval(iv); ctx.revert(); lockScroll(false); };
  }, []);

  if (!show) return null;
  return (
    <>
      <div ref={root} className="intro" role="presentation">
        <i className="in-aur in-a1" /><i className="in-aur in-a2" /><i className="in-aur in-a3" />
        {STARS.map((s, i) => (
          <i key={i} className="in-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, margin: `-${s.s / 2}px 0 0 -${s.s / 2}px`, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d={STAR} /></svg>
          </i>
        ))}
        <div className="in-center">
          <p className="in-hello"><span>{HELLO[0]}</span></p>
          <div className="in-gap" />
          <p className="in-sub">WEB DEVELOPER PORTFOLIO</p>
        </div>
        <div className="in-prog">
          <div className="in-row"><span>LOADING</span><span className="in-pct"><b>0</b><small>%</small></span></div>
          <div className="in-bar"><i /></div>
        </div>
        <button className="in-skip" type="button">건너뛰기</button>
      </div>
      <p ref={big} className="in-name" aria-hidden="true">
        {[...PROFILE.name].map((c, i) => <span key={i} className="in-l"><b>{c}</b><b className="in-shine">{c}</b></span>)}
      </p>
    </>
  );
}
