import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { gsap, scrollToTarget } from "../lib/gsap";
import { reduced } from "../lib/env";
import { PROFILE } from "../data/profile";
import { projects } from "../data/projects";
import { WALL, CHAPTERS, WEBAPP, FEATURED } from "../data/story";
import MailLine from "../components/MailLine";

// ───────────────────────────────────────────────────────────────
// 휴대폰·태블릿 전용: 히어로 + 대표 프로젝트 4개
// PC의 고정(pin) 스크롤 장면(Story · WebApp · Chapter)은 휴대폰, 특히 카톡 브라우저에서 무거워서
// 같은 디자인(글꼴·색·노트북 프레임·버튼)을 그대로 쓰되, 스크롤에 묶이지 않는 화면으로 따로 만들었습니다.
//  · 히어로: 문장이 한 줄씩 올라오고 마침표가 떨어짐 (이미지 벽은 멈춘 채 배경으로)
//  · 대표 프로젝트: 같은 형식의 카드 4장. 화면에 처음 들어올 때 한 번만 옆·아래에서 미끄러져 들어옴
//    노트북 속 화면은 보이는 동안 3초마다 자동으로 넘어가고, 손가락으로 좌우로 넘길 수도 있음 (브라우저 기본 scroll-snap)
//    설명은 번호 → 수상 → 제목 → 기능 1·2·3 → 버튼 순서로 차례차례 올라옴
//  · 히어로: 내릴 때 문장은 살짝 늦게 올라가며 흐려지고, 뒤 이미지 벽은 천천히 따라옴 (CSS 스크롤 연동, 지원 브라우저에서만)
// 프로젝트 내용은 data/ 폴더의 같은 데이터를 쓰므로, 내용을 고칠 때는 한 곳만 고치면 됩니다.
// ───────────────────────────────────────────────────────────────

const openProject = (i) => window.dispatchEvent(new CustomEvent("open-project", { detail: i }));
const COLS = 5;

// 노트북 속 화면 목록: 메인 화면(있으면) → 기능 화면들
const slidesOf = (c) => [...(c.cover ? [c.cover] : []), ...c.steps.map((s) => ({ img: s.img, title: s.title }))];

// 카드 4장 (PC와 같은 순서·번호). from: 노트북 화면이 들어오는 방향
const CARDS = [
  { key: "talaria", idx: CHAPTERS.talaria.idx, name: CHAPTERS.talaria.name, title: CHAPTERS.talaria.title, slides: slidesOf(CHAPTERS.talaria), steps: CHAPTERS.talaria.steps, from: "l" },
  {
    key: "webapp", idx: WEBAPP.idx, name: WEBAPP.label, title: [WEBAPP.title], slides: [{ img: WEBAPP.web.img, title: WEBAPP.web.title }], phone: WEBAPP.app[0].img,
    steps: [{ title: WEBAPP.web.title, text: WEBAPP.web.text }, { title: WEBAPP.app[0].title, text: WEBAPP.app[0].text }], from: "lr",
  },
  { key: "wedding", idx: CHAPTERS.wedding.idx, name: CHAPTERS.wedding.name, title: CHAPTERS.wedding.title, slides: slidesOf(CHAPTERS.wedding), steps: CHAPTERS.wedding.steps, from: "r" },
  { key: "signal", idx: CHAPTERS.signal.idx, name: CHAPTERS.signal.name, title: CHAPTERS.signal.title, slides: slidesOf(CHAPTERS.signal), steps: CHAPTERS.signal.steps, from: "l" },
];

// 노트북: 화면을 좌우로 넘길 수 있고(scroll-snap), 아래 점으로 몇 번째 화면인지 표시. 화면을 누르면 상세 창이 열림.
function Laptop({ card, cls }) {
  const strip = useRef(null);
  const [cur, setCur] = useState(0);
  const raf = useRef(0);
  const many = card.slides.length > 1;
  const onScroll = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = strip.current; if (!el) return;
      const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
      setCur((c) => (c === i ? c : i));
    });
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const goTo = (i) => { const el = strip.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" }); };

  // 자동 넘김: 카드가 화면에 보이는 동안 3초마다 다음 화면으로 (마지막 다음은 처음으로).
  //  · 손으로 넘기거나 점을 누르면 그 카드는 자동 넘김을 멈춤 (사용자가 직접 보는 중이므로)
  //  · 화면 밖, 다른 탭, 메뉴·상세 창이 열려 있을 때는 멈춤 / "동작 줄이기" 설정이면 처음부터 안 함
  const stopped = useRef(false);
  const stop = () => { stopped.current = true; };
  useEffect(() => {
    const el = strip.current;
    if (!many || !el || reduced || !("IntersectionObserver" in window)) return;
    let visible = false, timer = 0;
    const busy = () => document.hidden || document.documentElement.classList.contains("mm-open") || document.querySelector(".pm-shell");
    const tick = () => {
      if (stopped.current || !visible || busy()) return;
      const n = card.slides.length, i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
      el.scrollTo({ left: ((i + 1) % n) * el.clientWidth, behavior: "smooth" });
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearInterval(timer);
      if (visible && !stopped.current) timer = setInterval(tick, 3000);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [many, card.slides.length]);
  return (
    <div className={`mf-lap ${cls}`}>
      <div className="chp-lap">
        <div ref={strip} className="chp-screen mf-strip" onScroll={many ? onScroll : undefined} onTouchStart={stop} onWheel={stop} aria-label={many ? `${card.name} 화면 ${card.slides.length}장, 옆으로 넘겨 보기` : undefined}>
          {card.slides.map((s, k) => (
            <button key={k} type="button" className="mf-slide" onClick={() => openProject(card.idx)} aria-label={`${card.name} ${s.title} · 자세히 보기`}>
              <img className="mf-img" src={s.img} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
      <div className="chp-base" aria-hidden="true" />
      {many && (
        <div className="mf-dots">
          <span className="mf-dots-k">{card.slides[cur]?.title}</span>
          <span className="mf-dots-i">{card.slides.map((s, k) => <button key={k} type="button" className={k === cur ? "on" : ""} onClick={() => { stop(); goTo(k); }} aria-label={`${k + 1}번째 화면: ${s.title}`} aria-current={k === cur} />)}</span>
        </div>
      )}
    </div>
  );
}

export default function MobileFeatured() {
  const hero = useRef(null), list = useRef(null);
  const cols = Array.from({ length: COLS }, (_, c) => { const l = Array.from({ length: 5 }, (_, k) => WALL[(c * 4 + k * 3) % WALL.length]); return [...l, ...l]; });

  // 히어로 문장 등장 (인트로가 끝난 뒤 한 번)
  useLayoutEffect(() => {
    const el = hero.current;
    if (reduced) { el.classList.add("st-static"); return; }
    gsap.set(el.querySelectorAll(".st-ln > span"), { yPercent: 110 });
    el.classList.add("st-ready");
    const run = () => {
      gsap.timeline()
        .fromTo(el.querySelectorAll(".st-ln > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" })
        .fromTo(el.querySelector(".st-dot"), { scale: 0, y: -80 }, { scale: 1, y: 0, duration: 0.6, ease: "bounce.out" }, 0.95)
        .fromTo(el.querySelectorAll(".st-cta > *"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 1.2)
        .fromTo(el.querySelector(".st-cue"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.6);
    };
    if (window.__introDone) run(); else window.addEventListener("intro-done", run, { once: true });
    return () => window.removeEventListener("intro-done", run);
  }, []);

  // 이미지 벽이 천천히 흐름 (예전 히어로처럼). 휴대폰에서는 가볍게:
  //  · 이미지 수를 줄이고(기둥 5개 × 5장), GSAP 대신 CSS 애니메이션(transform)만 사용 → 브라우저가 따로 처리해 스크롤과 부딪히지 않음
  //  · 히어로가 화면 밖으로 나가면 멈춤 (아래 장면을 볼 때는 아무 일도 하지 않음)
  useEffect(() => {
    if (reduced) return;
    const el = hero.current;
    el.classList.add("mh-flow");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("mh-pause", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 카드가 화면에 처음 들어올 때 한 번만 미끄러져 들어옴 (CSS 전환 + IntersectionObserver: 스크롤 중 계산 없음)
  useEffect(() => {
    const els = list.current.querySelectorAll(".mf-anim");
    if (reduced || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 메뉴의 "프로젝트" · 히어로의 "프로젝트 보기" → 첫 프로젝트 카드로
  useEffect(() => {
    const go = () => {
      const el = document.getElementById("featured"); if (!el) return;
      scrollToTarget(el, { offset: -70, duration: 0.8 });
    };
    window.addEventListener("goto-project", go);
    return () => window.removeEventListener("goto-project", go);
  }, []);

  return (
    <>
      <section ref={hero} id="top" className="st-stage mh" aria-label="소개 문장">
        <div className="st-wall">
          <div className="st-tilt" aria-hidden="true">
            <div className="st-wallin">
              {cols.map((l, c) => <div key={c} className="st-col" style={{ "--dur": `${46 + (c % 3) * 9}s` }}>{l.map((src, k) => <img key={k} src={src} alt="" loading={k < 3 ? "eager" : "lazy"} decoding="async" />)}</div>)}
            </div>
          </div>
          <div className="st-shade" aria-hidden="true" />
        </div>
        <div className="st-hero">
          <h1 aria-label={`시작한 일에 마침표를 찍는 웹 개발자 ${PROFILE.name}입니다.`}>
            <span className="st-ln" aria-hidden="true"><span>시작한 일에</span></span>
            <span className="st-ln" aria-hidden="true"><span><span className="st-hl">마침표</span>를 찍는</span></span>
            <span className="st-ln" aria-hidden="true"><span>웹 개발자 {PROFILE.name}입니다<i className="st-dot" /></span></span>
          </h1>
          <div className="st-cta">
            <button type="button" className="st-btn st-btn-w" onClick={() => window.dispatchEvent(new Event("goto-project"))}>프로젝트 보기 <FaArrowRight aria-hidden="true" /></button>
            <a className="st-btn st-btn-o" href={PROFILE.githubPortfolio} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />GitHub</a>
            {PROFILE.email && <MailLine email={PROFILE.email} />}
          </div>
        </div>
        <div className="st-cue" aria-hidden="true"><i />SCROLL</div>
      </section>

      <section ref={list} className="mf" aria-label="대표 프로젝트">
        <p className="mf-intro mf-anim"><span className="mf-from-b"><small>PROJECTS</small>불편을 찾는 것부터 해결까지,<br />그 과정을 담은 프로젝트입니다<i className="gd-p" aria-hidden="true" /></span></p>
        {CARDS.map((card, n) => {
          const award = projects[card.idx]?.details?.award;
          return (
            <article key={card.key} id={n === 0 ? "featured" : card.key === "wedding" ? "wedding" : card.key === "signal" ? "signal" : undefined} className="mf-card mf-anim" aria-label={`${card.name} 프로젝트`}>
              {card.phone ? (
                <div className="mf-dev mf-dev-wa">
                  <Laptop card={card} cls="mf-from-l" />
                  <button type="button" className="mf-ph mf-from-r" onClick={() => openProject(card.idx)} aria-label={`${card.name} 모바일 앱 화면 보기`}>
                    <img src={card.phone} alt={WEBAPP.app[0].alt} loading="lazy" decoding="async" />
                  </button>
                </div>
              ) : (
                <div className="mf-dev"><Laptop card={card} cls={card.from === "r" ? "mf-from-r" : "mf-from-l"} /></div>
              )}
              <div className="mf-text mf-stg">
                <p className="st-kicker" style={{ "--i": 0 }}>PROJECT {String(n + 1).padStart(2, "0")} / {String(FEATURED).padStart(2, "0")}</p>
                <p className="st-eyebrow" style={{ "--i": 1 }}>{card.key === "webapp" ? "YOLO" : card.name}{award && <span className="st-aw">{award}</span>}</p>
                <h2 className="st-h2" style={{ "--i": 2 }}>{card.title.map((t, i) => <span key={i} className="block">{t}{i === card.title.length - 1 && <i className="gd-p" aria-hidden="true" />}</span>)}</h2>
                <ol className="st-steps">{card.steps.map((s, k) => <li key={k} style={{ "--i": 3 + k }}><b><em>{String(k + 1).padStart(2, "0")}</em>{s.title}</b><span>{s.text}</span></li>)}</ol>
                <button type="button" className="st-more" style={{ "--i": 3 + card.steps.length }} onClick={() => openProject(card.idx)}>자세히 보기 <FaArrowRight aria-hidden="true" /></button>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
