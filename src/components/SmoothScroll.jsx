import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, lenisRef } from "../lib/gsap";

// 관성 있는 부드러운 스크롤. GSAP 스크롤 연출과 같은 박자로 움직이도록 GSAP 시계에 연결합니다.
// 모션 줄이기 설정이면 켜지 않습니다.
export default function SmoothScroll() {
  // 방명록이 늦게 불러와지거나 글이 늘어 페이지 길이가 바뀌면, 스크롤 연출 위치를 다시 계산합니다.
  // 스크롤하는 도중에 다시 계산하면 고정 구간 길이가 바뀌면서 보던 위치가 튀므로, 스크롤이 멈춘 뒤에만 계산합니다.
  useEffect(() => {
    let last = document.body.scrollHeight, t = 0, scrolledAt = 0;
    const onScroll = () => { scrolledAt = performance.now(); };
    const run = () => {
      if (performance.now() - scrolledAt < 350) { t = setTimeout(run, 200); return; }
      ScrollTrigger.refresh(); last = document.body.scrollHeight;
    };
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - last) < 2) return;
      clearTimeout(t);
      t = setTimeout(run, 300);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(document.querySelector("main") || document.body);
    return () => { ro.disconnect(); clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; };
  }, []);
  return null;
}
