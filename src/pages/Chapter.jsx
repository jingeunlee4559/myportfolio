import { useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { gsap, narrow } from "../lib/gsap";
import { guideZone } from "../lib/guide";
import { reduced } from "../lib/env";
import { projects } from "../data/projects";
import { THEMES } from "../data/themes";
import { FEATURED } from "../data/story";
import FloatCards from "../components/FloatCards";

// 대표 프로젝트 한 장(챕터): 화면이 멈춘 채 스크롤하면 노트북 속 화면이 한 장씩 바뀌고,
// 옆 설명의 해당 줄이 진해집니다. 마침표 길잡이는 지금 보고 있는 줄 끝에 마침표로 앉습니다.
// flip이면 노트북이 왼쪽에 옵니다. 휴대폰에서는 노트북이 위, 설명이 아래입니다.
// 영상이 없는 프로젝트는 첫 화면 사진부터 보여줍니다.
const openProject = (i) => window.dispatchEvent(new CustomEvent("open-project", { detail: i }));

export default function Chapter({ data, flip = false, id, no = 2 }) {
  const wrap = useRef(null), sec = useRef(null), vid = useRef(null), stepRef = useRef(-1);
  const [step, setStep] = useState(reduced ? 0 : -1);
  const p = projects[data.idx];
  const hasVid = !!data.video;
  // 단계가 바뀌는 진행도: 영상이 있으면 영상 → 1 → 2 → 3, 없으면 바로 1단계부터
  const AT = hasVid ? [0.3, 0.55, 0.78] : [0.1, 0.45, 0.74];

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      let last = -2;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current, start: "top top", end: () => `+=${window.innerHeight * (narrow() ? 1.7 : 1.9)}`, pin: sec.current, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (st) => {
            const q = st.progress, s = q < AT[0] ? -1 : q < AT[1] ? 0 : q < AT[2] ? 1 : 2;
            if (s !== last) { last = s; stepRef.current = s; setStep(s); }
            const v = vid.current; if (!v) return;
            if (q > 0.02 && q < AT[0] + 0.02) { if (v.paused) v.play().catch(() => {}); } else if (!v.paused) v.pause();
          },
        },
      });
      // 마침표 길잡이: 제목 끝 → 지금 단계 이름 끝
      guideZone(wrap.current, () => {
        const s = stepRef.current, el = sec.current;
        return s < 0 ? el.querySelector(".chp-text .st-h2 .gd-p") : el.querySelectorAll(".chp-text .st-steps .gd-p")[s];
      });
      // 화면에 들어오는 동안: 노트북이 비스듬히 누운 채 들어와 똑바로 서고, 설명이 올라옴 (고정되기 전)
      gsap.timeline({ scrollTrigger: { trigger: wrap.current, start: "top 85%", end: "top 10%", scrub: 0.8 } })
        .fromTo(".chp-dev", { x: () => (narrow() ? 0 : flip ? -120 : 120), y: () => (narrow() ? 60 : 40), opacity: 0, scale: 0.92 }, { x: 0, y: 0, opacity: 1, scale: 1, ease: "power2.out" }, 0)
        .fromTo(".chp-tilt", { rotationX: 28, rotationY: () => (flip ? 18 : -18), rotationZ: () => (flip ? -4 : 4) }, { rotationX: 0, rotationY: 0, rotationZ: 0, ease: "power2.out" }, 0)
        .fromTo(".chp-text > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" }, 0.15)
        .fromTo(".chp .fc-card", { opacity: 0, scale: 0.8, y: 40 }, { opacity: 1, scale: 1, y: 0, stagger: 0.1, ease: "back.out(2)" }, 0.35);
      // 뒤에 깔린 큰 프로젝트 이름이 스크롤 따라 흐름
      tl.fromTo(".bgw", { xPercent: 8 }, { xPercent: -28, duration: 1 }, 0);
      // 화면이 아래에서 위로 쓸어 올리듯 바뀌고, 앞 화면은 살짝 작아지며 어두워짐
      const scr = gsap.utils.toArray(".chp-scr");
      const at = hasVid ? AT : AT.slice(1);
      at.forEach((t, k) => {
        tl.fromTo(scr[k + 1], { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12, opacity: 1 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 0.07, ease: "power2.out", immediateRender: false }, t)
          .fromTo(scr[k], { scale: 1, filter: "brightness(1)" }, { scale: 0.94, filter: "brightness(0.55)", duration: 0.07, immediateRender: false }, t);
      });
      tl.to({}, { duration: 0.08 }, 0.92);
      // 마우스를 따라 노트북이 살짝 기울어짐 (마우스일 때만)
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const rx = gsap.quickTo(".chp-mouse", "rotationX", { duration: 0.8, ease: "power3" }), ry = gsap.quickTo(".chp-mouse", "rotationY", { duration: 0.8, ease: "power3" });
        const el = sec.current;
        const mv = (e) => { const r = el.getBoundingClientRect(); rx(((e.clientY - r.top) / r.height - 0.5) * -8); ry(((e.clientX - r.left) / r.width - 0.5) * 10); };
        el.addEventListener("pointermove", mv);
        return () => el.removeEventListener("pointermove", mv);
      }
    }, sec);
    return () => ctx.revert();
  }, [flip, hasVid]);

  const layers = hasVid ? [null, ...data.steps] : data.steps;
  return (
    <div ref={wrap}>
    <section ref={sec} id={id} className={`chp ${flip ? "chp-flip" : ""} ${reduced ? "chp-static" : ""}`} aria-label={`${data.name} 프로젝트`}>
      <p className="bgw" aria-hidden="true">{data.name}</p>
      <div className="chp-in">
        <div className="chp-dev">
          <div className="chp-glow" aria-hidden="true" style={{ "--gc": THEMES[data.idx].c }} />
          <div className="chp-tilt"><div className="chp-mouse">
          <div className="chp-lap" data-cursor="보기" onClick={() => openProject(data.idx)}>
            <div className="chp-screen">
              {layers.map((s, k) => s
                ? <img key={k} className={`chp-scr ${k === 0 ? "chp-scr-0" : ""}`} src={s.img} alt={`${data.name} ${s.title}`} loading="lazy" />
                : <video key={k} ref={vid} className="chp-scr chp-scr-0" src={data.video} poster={data.poster} muted loop playsInline preload="metadata" aria-label={`${data.name} 시연 영상`} />)}
            </div>
          </div>
          <div className="chp-base" aria-hidden="true" />
          {step >= 0 && !reduced && <span key={step} className="callout" aria-hidden="true"><i />{String(step + 1).padStart(2, "0")} {data.steps[step].title}</span>}
          </div></div>
          <FloatCards idx={data.idx} className={flip ? "fc-flip" : ""} />
        </div>
        <div className="chp-text">
          <p className="st-kicker">PROJECT {String(no).padStart(2, "0")} / {String(FEATURED).padStart(2, "0")}</p>
          <p className="st-eyebrow">{data.name}{p.details.award && <span className="st-aw">{p.details.award}</span>}</p>
          <h2 className="st-h2">{data.title.map((t, i) => <span key={i} className="block">{t}{i === data.title.length - 1 && <i className="gd-p" aria-hidden="true" />}</span>)}</h2>
          <ol className="st-steps">{data.steps.map((s, k) => <li key={k} className={step === k || reduced ? "on" : ""}><b><em>{String(k + 1).padStart(2, "0")}</em>{s.title}<i className="gd-p" aria-hidden="true" /></b><span>{s.text}</span></li>)}</ol>
          <button type="button" className="st-more" onClick={() => openProject(data.idx)}>자세히 보기 <FaArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
    </div>
  );
}
