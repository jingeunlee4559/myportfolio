import { useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { gsap, ScrollTrigger, NARROW_MQ, sortTriggers } from "../lib/gsap";
import { STATIC_LAYOUT as reduced } from "../lib/env";
import { guideZone } from "../lib/guide";
import { projects } from "../data/projects";
import { THEMES } from "../data/themes";
import { MORE, shortAward } from "../data/story";

// 그 밖의 프로젝트 4개(최신순): 세로 띠가 나란히 있다가 선택된 띠만 넓게 펼쳐지는 패널.
//  · 큰 화면: 화면이 멈춘 채 스크롤하는 만큼 다음 띠가 차례로 펼쳐짐. 마우스를 올려도 펼쳐지고, 누르면 상세 창이 열림
//  · 휴대폰: 띠가 위아래로 쌓이고, 화면 가운데를 지나는 띠가 펼쳐짐. 눌러서도 펼칠 수 있음
// 띠의 너비·높이는 CSS(flex)가 정하므로 화면 크기가 바뀌어도 그대로 맞춰집니다.
const openProject = (i) => window.dispatchEvent(new CustomEvent("open-project", { detail: i }));

export default function MoreProjects() {
  const root = useRef(null);
  const [on, setOn] = useState(0);
  const hover = useRef(false), onRef = useRef(0), pr = useRef(0);
  onRef.current = on;

  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia(root);
    // narrowQ가 바뀌면(휴대폰 ↔ 컴퓨터) 아래 연출을 지우고 새 조건으로 다시 만듭니다.
    mm.add({ narrowQ: NARROW_MQ, any: "all" }, (c) => {
      requestAnimationFrame(() => { sortTriggers(); ScrollTrigger.refresh(); });
      // 마침표 길잡이: 제목 끝 → 펼쳐진 프로젝트 이름 끝
      guideZone(root.current, () => {
        const el = root.current, t = el.querySelector(".acc-title .gd-p");
        const head = c.conditions.narrowQ ? t.getBoundingClientRect().top > window.innerHeight * 0.3 : pr.current < 0.06;
        return head ? t : el.querySelectorAll(".acc-p h3 .gd-p")[onRef.current];
      });
      gsap.fromTo(".acc-head > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 82%" } });
      if (c.conditions.narrowQ) {
        gsap.fromTo(".acc-p", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".acc-row", start: "top 85%" } });
        gsap.utils.toArray(".acc-p").forEach((el, i) => gsap.timeline({ scrollTrigger: { trigger: el, start: "top 55%", end: "bottom 45%", onToggle: (st) => st.isActive && setOn(i) } }));
        return;
      }
      // 큰 화면: 들어오는 동안 띠가 아래에서부터 열리고, 멈춘 뒤에는 스크롤하는 만큼 차례로 펼쳐짐
      gsap.fromTo(".acc-p", { clipPath: "inset(100% 0% 0% 0% round 26px)" }, { clipPath: "inset(0% 0% 0% 0% round 26px)", ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 15%", scrub: 0.6 } });
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current, start: "top top", end: () => `+=${window.innerHeight * 2}`, pin: ".acc-stage", scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (st) => { pr.current = st.progress; if (!hover.current) setOn(Math.min(MORE.length - 1, Math.floor(st.progress * MORE.length * 0.999))); },
        },
      }).fromTo(".acc-bar i", { scaleX: 0 }, { scaleX: 1, ease: "none" });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="more" className={`acc ${reduced ? "acc-static" : ""}`} aria-label="그 밖의 프로젝트">
      <div className="acc-stage">
        <div className="acc-head">
          <p className="st-kicker">MORE PROJECTS · {MORE.length}</p>
          <h2 className="acc-title">그 밖의 프로젝트도<br />불편을 찾는 데서 시작했습니다<i className="gd-p" aria-hidden="true" /></h2>
        </div>
        <div className="acc-row" onPointerLeave={() => { hover.current = false; }}>
          {MORE.map(({ idx, img, short }, i) => {
            const p = projects[idx], d = p.details, aw = shortAward(d.award), active = on === i;
            return (
              <div key={idx} data-cursor={active ? "보기" : "펼치기"} className={`acc-p ${active ? "on" : ""}`} style={{ "--c": THEMES[idx].c }}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") { hover.current = true; setOn(i); } }}>
                <img className="acc-bg" src={img} alt="" loading="lazy" />
                <span className="acc-shade" aria-hidden="true" />
                <button type="button" className="acc-label" onClick={() => (active ? openProject(idx) : setOn(i))} aria-expanded={active} aria-label={`${d.modalTitle} ${active ? "자세히 보기" : "펼치기"}`}>
                  <b>{String(i + 1).padStart(2, "0")}</b><span>{short}</span>
                </button>
                <div className="acc-body" aria-hidden={!active}>
                  <p className="acc-meta"><span>{d.period.replace(/\s*\(.*\)/, "")}</span>{aw && <em>🏆 {aw}</em>}</p>
                  <h3>{d.modalTitle}<i className="gd-p" aria-hidden="true" /></h3>
                  <p className="acc-focus">{THEMES[idx].focus}</p>
                  <p className="acc-tags">{(d.techStack || []).slice(0, 4).map((t) => <i key={t}>{t}</i>)}</p>
                  <button type="button" className="acc-go" tabIndex={active ? 0 : -1} onClick={() => openProject(idx)}>자세히 보기 <FaArrowRight aria-hidden="true" /></button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="acc-bar" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}
