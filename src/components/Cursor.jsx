import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { reduced } from "../lib/env";

// 마우스 포인터: 작은 파란 점 + 살짝 늦게 따라오는 고리.
//  · 버튼·링크 위: 고리가 커지고 그 버튼 쪽으로 살짝 끌려감
//  · data-cursor="보기" 같은 글이 달린 곳(노트북·카드): 고리가 글자가 든 알약 모양으로 바뀜
//  · 어두운 장면 위(다크 모드의 히어로·기술 포함): 흰색으로 바뀜
//  · 글 입력 칸 위: 숨김 (원래 글자 커서를 씀)
// 터치 화면(휴대폰·태블릿)에서는 쓰지 않습니다.
// 늘 어두운 곳 / 다크 모드에서만 어두운 곳(히어로·기술)
const DARK = "footer, .acc-p, .wa-dev, .intro, .chp-lap";
const DARK_IN_DARK = ".st-wall, .st-hero, .st-cue, .sk2";
const HOT = "a, button, [role='button'], label, select, summary, [data-cursor]";

export default function Cursor() {
  const dot = useRef(null), ring = useRef(null), txt = useRef(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const html = document.documentElement;
    html.classList.add("cur-on");
    const d = dot.current, r = ring.current;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" }), dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: reduced ? 0.01 : 0.45, ease: "power3" }), ry = gsap.quickTo(r, "y", { duration: reduced ? 0.01 : 0.45, ease: "power3" });
    let hot = null, label = "", seen = false;
    const mode = (cls, on) => r.classList.toggle(cls, on);
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (!seen) { seen = true; html.classList.add("cur-seen"); gsap.set([d, r], { x: e.clientX, y: e.clientY }); }
      dx(e.clientX); dy(e.clientY);
      // 버튼 위에서는 고리가 버튼 가운데 쪽으로 30% 끌려감
      if (hot && !label) { const b = hot.getBoundingClientRect(); rx(e.clientX + (b.left + b.width / 2 - e.clientX) * 0.3); ry(e.clientY + (b.top + b.height / 2 - e.clientY) * 0.3); }
      else { rx(e.clientX); ry(e.clientY); }
    };
    const over = (e) => {
      const t = e.target instanceof Element ? e.target : null; if (!t) return;
      const typing = t.closest("input, textarea, [contenteditable='true']");
      html.classList.toggle("cur-hide", !!typing);
      const h = t.closest(HOT);
      const lab = h?.closest("[data-cursor]")?.dataset.cursor || "";
      hot = h && !lab ? h : null;
      label = lab;
      if (lab) txt.current.textContent = lab;
      mode("is-hot", !!hot); mode("is-label", !!lab);
      const dark = !!t.closest(DARK) || (html.classList.contains("dark") && !!t.closest(DARK_IN_DARK));
      d.classList.toggle("is-dark", dark); r.classList.toggle("is-dark", dark);
    };
    const down = () => r.classList.add("is-down"), up = () => r.classList.remove("is-down");
    const leave = () => html.classList.remove("cur-seen");
    const enter = () => seen && html.classList.add("cur-seen");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down); window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave); document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave); document.removeEventListener("pointerenter", enter);
      html.classList.remove("cur-on", "cur-seen", "cur-hide");
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true"><span ref={txt} /></div>
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
