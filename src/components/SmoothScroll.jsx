import { useEffect } from "react";
import Lenis from "lenis";

// 관성 있는 부드러운 스크롤. 모션 줄이기 설정이면 켜지 않습니다.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    let raf;
    const tick = (t) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}
