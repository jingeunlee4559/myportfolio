import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, lenisRef } from "../lib/gsap";

// 관성 있는 부드러운 스크롤. GSAP 스크롤 연출과 같은 박자로 움직이도록 GSAP 시계에 연결합니다.
// 모션 줄이기 설정이면 켜지 않습니다.
export default function SmoothScroll() {
  // 방명록이 늦게 불러와지거나 글이 늘어 페이지 길이가 바뀌면, 스크롤 연출 위치를 다시 계산합니다.
  useEffect(() => {
    let last = document.body.scrollHeight, t = 0;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - last) < 2) return;
      clearTimeout(t);
      t = setTimeout(() => { ScrollTrigger.refresh(); last = document.body.scrollHeight; }, 300);
    });
    ro.observe(document.querySelector("main") || document.body);
    return () => { ro.disconnect(); clearTimeout(t); };
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
