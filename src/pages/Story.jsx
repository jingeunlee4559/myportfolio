import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { gsap, lenisRef, narrow } from "../lib/gsap";
import { reduced } from "../lib/env";
import { guide, guideZone } from "../lib/guide";
import { PROFILE } from "../data/profile";
import { projects } from "../data/projects";
import { WALL, CHAPTERS, FEATURED } from "../data/story";
import { THEMES } from "../data/themes";
import FloatCards from "../components/FloatCards";

// ───────────────────────────────────────────────────────────────
// 히어로 → 노트북 속 첫 프로젝트(Talaria)까지 한 번에 이어지는 장면.
//  1) 프로젝트 화면 30장이 비스듬한 벽처럼 흐르고, 그 위에 큰 문장
//  2) 스크롤하면 꽉 찬 화면이 둥근 카드로 줄어들며 노트북 화면이 됨
//  3) 노트북이 옆으로 비켜나고, 스크롤할 때마다 노트북 속 화면이 바뀜
// 화면이 멈춘 채(고정) 스크롤 양에 따라 움직이므로, 올리면 거꾸로 되감깁니다.
// 휴대폰에서는 노트북이 위, 설명이 아래로 갑니다. 모션 줄이기 설정이면 고정 없이 차례로 보여줍니다.
// ───────────────────────────────────────────────────────────────

const T = CHAPTERS.talaria;
const P = projects[T.idx];
const COLS = 7;
const openProject = (i) => window.dispatchEvent(new CustomEvent("open-project", { detail: i }));
const isMobile = narrow;

// 진행도(0~1) 구간: 이 값에 따라 단계가 바뀝니다.
const STEP_AT = [0.5, 0.64, 0.8];
// 고정 구간 길이 (화면 높이의 몇 배)
const PIN = () => (isMobile() ? 3.1 : 3.6);

// 카드·노트북 화면이 놓일 자리는 CSS의 보이지 않는 자리표시(.st-slot-c, .st-slot-r)가 정합니다.
// JS는 그 자리를 읽어 오기만 하므로, 화면 크기가 바뀌어도 CSS가 정한 자리로 다시 맞춰집니다.
const E = gsap.parseEase("power2.inOut");
const mix = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t, w: p.w + (q.w - p.w) * t, h: p.h + (q.h - p.h) * t });

export default function Story() {
  const wrap = useRef(null), prog = useRef(0), stepRef = useRef(-1);
  const sec = useRef(null), float = useRef(null), wall = useRef(null), screen = useRef(null), lap = useRef(null), base = useRef(null), vid = useRef(null);
  const [step, setStep] = useState(-1);
  const stRef = useRef(null);

  // 히어로 문장 등장 (인트로가 끝난 뒤)
  useEffect(() => {
    const el = sec.current;
    if (!reduced) { gsap.set(el.querySelectorAll(".st-ln > span"), { yPercent: 110 }); el.classList.add("st-ready"); }
    const run = () => {
      const tl = gsap.timeline();
      tl.fromTo(el.querySelectorAll(".st-ln > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" })
        .fromTo(el.querySelector(".st-dot"), { scale: 0, y: -80 }, { scale: 1, y: 0, duration: 0.6, ease: "bounce.out" }, 0.95)
        .fromTo(el.querySelectorAll(".st-cta > *"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 1.2)
        .fromTo(el.querySelector(".st-cue"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.6);
    };
    if (reduced) return;
    if (window.__introDone) run(); else window.addEventListener("intro-done", run, { once: true });
    return () => window.removeEventListener("intro-done", run);
  }, []);

  // 벽이 천천히 흐름
  useEffect(() => {
    if (reduced) return;
    const tws = [...wall.current.querySelectorAll(".st-col")].map((col, i) => {
      const up = i % 2 === 0;
      return gsap.fromTo(col, { yPercent: up ? 0 : -50 }, { yPercent: up ? -50 : 0, duration: 46 + (i % 3) * 9, ease: "none", repeat: -1 });
    });
    return () => tws.forEach((t) => t.kill());
  }, []);

  // 스크롤 연출
  useLayoutEffect(() => {
    if (reduced) return;
    // K.a: 꽉 찬 화면 → 가운데 카드, K.b: 가운데 카드 → 옆 노트북 (0~1)
    const K = { a: 0, b: 0 };
    let RC = null;
    const rel = (el) => { const r = el.getBoundingClientRect(), o = sec.current.getBoundingClientRect(); return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height }; };
    const measure = () => { const el = sec.current; RC = { F: { x: 0, y: 0, w: el.clientWidth, h: el.clientHeight }, C: rel(el.querySelector(".st-slot-c")), R: rel(el.querySelector(".st-slot-r")) }; };
    const apply = () => {
      if (!RC) measure();
      const W = RC.F.w, H = RC.F.h, a = E(K.a), bb = E(K.b);
      const S = mix(mix(RC.F, RC.C, a), RC.R, bb), r = 18 * a;
      wall.current.style.clipPath = `inset(${S.y}px ${W - S.x - S.w}px ${H - S.y - S.h}px ${S.x}px round ${r}px)`;
      Object.assign(screen.current.style, { left: `${S.x}px`, top: `${S.y}px`, width: `${S.w}px`, height: `${S.h}px` });
      const b = Math.max(8, S.w * 0.018);
      Object.assign(lap.current.style, { left: `${S.x - b}px`, top: `${S.y - b}px`, width: `${S.w + b * 2}px`, height: `${S.h + b * 2}px`, borderRadius: `${r + b}px` });
      const bw = (S.w + b * 2) * 1.16;
      Object.assign(base.current.style, { left: `${S.x + S.w / 2 - bw / 2}px`, top: `${S.y + S.h + b}px`, width: `${bw}px` });
      Object.assign(float.current.style, { left: `${S.x}px`, top: `${S.y}px`, width: `${S.w}px`, height: `${S.h}px` });
    };
    const ctx = gsap.context(() => {
      measure(); apply();
      let last = -2;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current, start: "top top", end: () => `+=${window.innerHeight * PIN()}`, pin: sec.current, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          // 화면 크기가 바뀌면(휴대폰 ↔ 컴퓨터 포함) 시작·끝 자리를 다시 계산하고, 지금 진행도에 맞는 자리로 맞춤
          onRefresh: () => { measure(); apply(); },
          onUpdate: (st) => {
            const p = st.progress, s = p < STEP_AT[0] ? -1 : p < STEP_AT[1] ? 0 : p < STEP_AT[2] ? 1 : 2;
            prog.current = p;
            if (s !== last) { last = s; stepRef.current = s; setStep(s); }
            const v = vid.current; if (!v) return;
            if (p > 0.2 && p < STEP_AT[0] + 0.02) { if (v.paused) v.play().catch(() => {}); } else if (!v.paused) v.pause();
          },
        },
      });
      stRef.current = tl.scrollTrigger;
      // 마침표 길잡이: 히어로 문장 끝 마침표 → "끝까지 만든 프로젝트들입니다." → Talaria 제목 끝 → 지금 단계 이름 끝
      const target = () => {
        const el = sec.current, p = prog.current, s = stepRef.current;
        if (p < 0.05) return el.querySelector(".st-dot");
        if (p < 0.31) return el.querySelector(".st-bridge .gd-p");
        return s < 0 ? el.querySelector(".st-chap .st-h2 .gd-p") : el.querySelectorAll(".st-chap .st-steps .gd-p")[s];
      };
      guide.set(target);
      guideZone(wrap.current, target, { start: "top top", end: "bottom 40%", first: true });
      tl.fromTo(".st-cue", { opacity: 1 }, { opacity: 0, duration: 0.02, immediateRender: false }, 0)
        .fromTo(".st-hero", { y: 0, opacity: 1 }, { y: -60, opacity: 0, duration: 0.08, ease: "power2.in", immediateRender: false }, 0)
        // 꽉 찬 화면 → 둥근 카드
        .fromTo(K, { a: 0 }, { a: 1, duration: 0.2, onUpdate: apply, immediateRender: false }, 0.04)
        .fromTo(".st-wallin", { scale: 1.08 }, { scale: 0.9, duration: 0.2, ease: "power2.inOut", immediateRender: false }, 0.04)
        .fromTo(".st-shade", { opacity: 1 }, { opacity: 0.15, duration: 0.16, immediateRender: false }, 0.06)
        .fromTo(".st-bridge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08, immediateRender: false }, 0.14)
        // 노트북이 생기고 화면이 프로젝트 영상으로 바뀜
        .fromTo([lap.current, base.current], { opacity: 0 }, { opacity: 1, duration: 0.06, immediateRender: false }, 0.2)
        .fromTo(vid.current, { opacity: 0 }, { opacity: 1, duration: 0.06, immediateRender: false }, 0.25)
        .fromTo(".st-bridge", { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: 0.06, immediateRender: false }, 0.3)
        // 노트북이 비켜나고 설명이 나옴
        .fromTo(K, { b: 0 }, { b: 1, duration: 0.12, onUpdate: apply, immediateRender: false }, 0.34)
        .fromTo(".st-chap", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.08, immediateRender: false }, 0.42)
        .fromTo(".st-float .fc-card", { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.06, stagger: 0.03, ease: "back.out(2)", immediateRender: false }, 0.44)
        .fromTo(".st-glow", { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, 0.34);
      // 스크롤할 때마다 노트북 속 화면이 바뀜
      // 노트북 속 화면이 아래에서 위로 쓸어 올리듯 바뀌고, 앞 화면은 살짝 작아지며 어두워짐
      const scr = gsap.utils.toArray(".st-scr");
      STEP_AT.forEach((at, k) => {
        tl.fromTo(scr[k + 1], { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12, opacity: 1 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 0.05, ease: "power2.out", immediateRender: false }, at)
          .fromTo(scr[k], { scale: 1, filter: "brightness(1)" }, { scale: 0.94, filter: "brightness(0.55)", duration: 0.05, immediateRender: false }, at);
      });
      // 뒤에 깔린 큰 프로젝트 이름
      tl.fromTo(".st-bgw", { opacity: 0, xPercent: 10 }, { opacity: 1, xPercent: -10, duration: 0.2, immediateRender: false }, 0.34)
        .fromTo(".st-bgw", { xPercent: -10 }, { xPercent: -30, duration: 0.42, immediateRender: false }, 0.54);
      tl.to({}, { duration: 0.06 }, 0.94);
      // 화면 크기가 바뀌는 즉시 자리 다시 읽기 (스크롤 연출 전체 재계산은 ScrollTrigger가 이어서 함)
      const onResize = () => { measure(); apply(); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, sec);
    // 메뉴의 "프로젝트"·히어로 버튼 → 첫 프로젝트 설명이 다 보이는 지점으로
    const go = () => { const st = stRef.current; if (!st) return; const y = st.start + (st.end - st.start) * (STEP_AT[0] - 0.02); lenisRef.current ? lenisRef.current.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: "smooth" }); };
    window.addEventListener("goto-project", go);
    return () => { window.removeEventListener("goto-project", go); ctx.revert(); };
  }, []);

  const cols = Array.from({ length: COLS }, (_, c) => { const list = Array.from({ length: 6 }, (_, k) => WALL[(c * 4 + k * 3) % WALL.length]); return [...list, ...list]; });

  return (
    <div ref={wrap}>
    <section ref={sec} id="top" className={`st-stage ${reduced ? "st-static" : ""}`} aria-label="소개 문장과 대표 프로젝트">
      <i className="st-slot st-slot-c" aria-hidden="true" /><i className="st-slot st-slot-r" aria-hidden="true" />
      <div ref={lap} className="st-lap" aria-hidden="true" />
      <div className="st-glow" aria-hidden="true" style={{ "--gc": THEMES[T.idx].c }} />
      <div ref={base} className="st-base" aria-hidden="true" />
      <p className="bgw st-bgw" aria-hidden="true">{T.name}</p>
      <div ref={float} className="st-float"><FloatCards idx={T.idx} />{step >= 0 && <span key={step} className="callout" aria-hidden="true"><i />{String(step + 1).padStart(2, "0")} {T.steps[step].title}</span>}</div>
      <div ref={wall} className="st-wall">
        <div className="st-tilt" aria-hidden="true">
          <div className="st-wallin">
            {cols.map((list, c) => <div key={c} className="st-col">{list.map((src, k) => <img key={k} src={src} alt="" loading={c < 4 && k < 4 ? "eager" : "lazy"} decoding="async" />)}</div>)}
          </div>
        </div>
        <div className="st-shade" aria-hidden="true" />
        <div ref={screen} className="st-screen">
          <video ref={vid} className="st-scr" src={T.video} poster={T.poster} muted loop playsInline preload="metadata" aria-label={`${T.name} 시연 영상`} />
          {T.steps.map((s, k) => <img key={k} data-k={k} className="st-scr" src={s.img} alt={`${T.name} ${s.title}`} loading="lazy" />)}
        </div>
      </div>

      <div className="st-hero">
        <h1 aria-label="시작한 일에 마침표를 찍는 웹 개발자 이진근입니다.">
          <span className="st-ln" aria-hidden="true"><span>시작한 일에</span></span>
          <span className="st-ln" aria-hidden="true"><span><span className="st-hl">마침표</span>를 찍는</span></span>
          <span className="st-ln" aria-hidden="true"><span>웹 개발자 {PROFILE.name}입니다<i className="st-dot" /></span></span>
        </h1>
        <div className="st-cta">
          <button type="button" className="st-btn st-btn-w" onClick={() => window.dispatchEvent(new Event("goto-project"))}>프로젝트 보기 <FaArrowRight aria-hidden="true" /></button>
          <a className="st-btn st-btn-o" href={PROFILE.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />GitHub</a>
        </div>
      </div>
      <div className="st-cue" aria-hidden="true"><i />SCROLL</div>

      <p className="st-bridge"><small>PROJECTS</small>끝까지 만든 프로젝트들입니다<i className="gd-p" aria-hidden="true" /></p>

      <div className="st-chap">
        <p className="st-kicker">PROJECT 01 / {String(FEATURED).padStart(2, "0")}</p>
        <p className="st-eyebrow">{T.name}{P.details.award && <span className="st-aw">{P.details.award}</span>}</p>
        <h2 className="st-h2">{T.title.map((t, i) => <span key={i} className="block">{t}{i === T.title.length - 1 && <i className="gd-p" aria-hidden="true" />}</span>)}</h2>
        <ol className="st-steps">
          {T.steps.map((s, k) => <li key={k} className={step === k || reduced ? "on" : ""}><b><em>{String(k + 1).padStart(2, "0")}</em>{s.title}<i className="gd-p" aria-hidden="true" /></b><span>{s.text}</span></li>)}
        </ol>
        <button type="button" className="st-more" onClick={() => openProject(T.idx)}>자세히 보기 <FaArrowRight aria-hidden="true" /></button>
      </div>
    </section>
    </div>
  );
}

