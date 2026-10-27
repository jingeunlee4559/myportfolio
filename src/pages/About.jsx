import { useLayoutEffect, useRef, useState } from "react";
import { FaFilePdf, FaArrowRight } from "react-icons/fa6";
import portrait from "../assets/portrait.jpg";
import { PROFILE, INTRO, EDUCATION, AWARDS } from "../data/profile";
import { CHAPTERS, MORE } from "../data/story";
import { gsap } from "../lib/gsap";
import { guideTrack } from "../lib/guide";
import { reduced } from "../lib/env";

// 소개 — 프로젝트 이야기에서 이어지는 두 번째 장(CHAPTER 02)
//  ① 장 제목 "저를 소개합니다." + 옆으로 그어지는 가는 선
//  ② 마침표가 사진 가운데로 내려가고, 그 점에서 사진이 동그랗게 열림. 소개 글은 읽는 속도에 맞춰 한 단어씩 진해짐
//  ③ 걸어온 길: 세로 선 위의 마디를 마침표가 한 칸씩 타고 내려가고, 왼쪽 큰 연도가 바뀜
//  ④ 수상: 대상은 큰 금빛 카드, 나머지는 메달 카드로 하나씩 올라옴
const YEAR = (e) => e.period.slice(0, 4);

export default function About() {
  const root = useRef(null), yearRef = useRef(null);
  const [cur, setCur] = useState(0);
  let k = 0;
  const paras = INTRO.body.map((t) => t.split(" ").map((w) => ({ w, k: k++ })));

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const q = (s) => root.current.querySelector(s), qa = (s) => [...root.current.querySelectorAll(s)];
      // 마침표 길잡이: 장 제목 → 사진 가운데 → 이름 → 걸어온 길 제목 → 지금 단계의 마디 → 수상 제목
      guideTrack(root.current, () => [q(".ab-h .gd-p"), q(".ab-eye"), q(".ab-photo figcaption .gd-p"), q(".ab-journey .ab-sec-title .gd-p"), q(".ab-row.on .ab-node"), q(".ab-awards-wrap .ab-sec-title .gd-p")], { line: 0.7, start: "top 75%", end: "bottom 40%" });
      // ① 장 제목
      gsap.fromTo(".ab-h-in > *", { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".ab-head", start: "top 80%" } });
      gsap.fromTo(".ab-head .ab-kick", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".ab-head", start: "top 85%" } });
      gsap.fromTo(".ab-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out", delay: 0.2, scrollTrigger: { trigger: ".ab-head", start: "top 80%" } });
      // ② 점에서 사진이 동그랗게 열림
      gsap.fromTo(".ab-photo", { clipPath: "circle(2.5% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "power2.out", scrollTrigger: { trigger: ".ab-photo", start: "center 70%", end: "center 42%", scrub: 0.6 } });
      gsap.fromTo(".ab-photo img", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ab-photo", start: "center 70%", end: "bottom 30%", scrub: 0.6 } });
      gsap.fromTo(".ab-photo figcaption > *", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".ab-photo", start: "center 50%", end: "center 36%", scrub: 0.6 } });
      gsap.fromTo(".ab-halo", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, ease: "power2.out", scrollTrigger: { trigger: ".ab-photo", start: "center 60%", end: "center 35%", scrub: 0.6 } });
      gsap.fromTo(".ab-copy .ab-label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".ab-copy", start: "top 80%" } });
      gsap.fromTo(".ab-fw", { opacity: 0.16 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".ab-copy", start: "top 75%", end: "bottom 50%", scrub: 0.5 } });
      gsap.fromTo(".ab-copy .st-more", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".ab-copy .st-more", start: "top 92%" } });
      // ③ 걸어온 길
      qa(".ab-row").forEach((el, i) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 66%", end: "bottom 66%", onToggle: (st) => st.isActive && setCur(i) } });
        gsap.fromTo(el.querySelectorAll(".ab-row-in > *"), { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.fromTo(".ab-prog i", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ab-tl2", start: "top 66%", end: "bottom 66%", scrub: 0.4 } });
      // ④ 수상
      // 대상 카드: 카드가 올라오며 월계수 잎이 한 장씩 그려지고, "대상" 글자에 금빛이 스침
      const aw = gsap.timeline({ scrollTrigger: { trigger: ".aw", start: "top 80%" } });
      aw.fromTo(".aw-hero", { opacity: 0, y: 60, rotateX: 12 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "expo.out" })
        .fromTo(".aw-leaf", { strokeDashoffset: 1, fillOpacity: 0 }, { strokeDashoffset: 0, fillOpacity: 0.18, duration: 0.5, stagger: 0.035, ease: "power2.out" }, 0.25)
        .fromTo(".aw-big > *", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" }, 0.35)
        .fromTo(".aw-hero-meta > *", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "expo.out" }, 0.6)
        .fromTo(".aw-row", { opacity: 0, x: 40, clipPath: "inset(0 0 0 100%)" }, { opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)", duration: 0.9, stagger: 0.1, ease: "expo.out" }, 0.3);
      qa(".ab-sec-title").forEach((el) => gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
    }, root);
    return () => ctx.revert();
  }, []);

  // 연도가 바뀔 때 아래에서 올라오는 효과
  useLayoutEffect(() => {
    if (reduced || !yearRef.current) return;
    gsap.fromTo(yearRef.current, { yPercent: 40, opacity: 0, filter: "blur(8px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "expo.out" });
  }, [cur]);

  const steps = EDUCATION; // 오래된 것 → 최근
  const dot = <i className="gd-p" aria-hidden="true" />;
  const [top, ...rest] = AWARDS;
  const open = (i) => window.dispatchEvent(new CustomEvent("open-project", { detail: i }));
  // 상을 받은 프로젝트의 짧은 이름 (story.js의 이름을 그대로 씀)
  const SHORT = Object.fromEntries([...Object.values(CHAPTERS).map((c) => [c.idx, c.name]), ...MORE.map((m) => [m.idx, m.short])]);
  const pname = (i) => SHORT[i] ?? "";
  return (
    <section id="about" ref={root} className={`ab ${reduced ? "ab-static" : ""}`}>
      <div className="ab-wrap">
        {/* ① 장 제목 */}
        <div className="ab-head">
          <p className="ab-kick"><b>02</b> ABOUT</p>
          <h2 className="ab-h" aria-label="저를 소개합니다."><span className="ab-h-in" aria-hidden="true"><span>저를 소개합니다{dot}</span></span></h2>
          <i className="ab-rule" aria-hidden="true" />
        </div>

        {/* ② 사진 + 소개 */}
        <div className="ab-profile">
          <div className="ab-photo-wrap">
            <span className="ab-halo" aria-hidden="true" />
            <figure className="ab-photo">
              <img src={portrait} alt={`${PROFILE.name} 프로필 사진`} width="800" height="1000" loading="lazy" />
              <i className="ab-eye" aria-hidden="true" data-gd-size="22" />
              <figcaption><b>{PROFILE.name}<i className="gd-p" data-gd-tone="light" aria-hidden="true" /></b><span>{PROFILE.nameEn} · {PROFILE.role}</span></figcaption>
            </figure>
          </div>
          <div className="ab-copy">
            <p className="ab-label">ABOUT ME</p>
            {paras.map((ws, i) => (
              <p key={i} className={i === 0 ? "ab-lead" : "ab-body"} aria-label={INTRO.body[i]}>
                {ws.map(({ w, k }) => <span key={k} className="ab-fw" aria-hidden="true">{w} </span>)}
              </p>
            ))}
            {PROFILE.resume && <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="st-more"><FaFilePdf aria-hidden="true" />이력서 보기</a>}
          </div>
        </div>

        {/* ③ 걸어온 길 */}
        <div className="ab-journey">
          <h3 className="ab-sec-title">걸어온 길{dot}</h3>
          <div className="ab-jgrid">
            <div className="ab-side" aria-hidden="true">
              <div className="ab-sticky-year">
                <p className="ab-count"><b>{String(cur + 1).padStart(2, "0")}</b> / {String(steps.length).padStart(2, "0")}<span className="ab-tag">{steps[cur].tag}</span></p>
                <p ref={yearRef} className="ab-year">{YEAR(steps[cur])}</p>
                <div className="ab-dots">{steps.map((s, i) => <i key={s.title} className={i === cur ? "on" : i < cur ? "done" : ""} />)}</div>
              </div>
            </div>
            <ol className="ab-tl2">
              <span className="ab-prog" aria-hidden="true"><i /></span>
              {steps.map((e, i) => (
                <li key={e.title} className={`ab-row ${i === cur || reduced ? "on" : ""} ${i < cur ? "done" : ""}`}>
                  <i className="ab-node" aria-hidden="true" data-gd-size="14" />
                  <div className="ab-row-in">
                    <p className="ab-period">{e.period}<em>{e.tag}</em></p>
                    <h4 className="ab-title">{e.title}</h4>
                    <p className="ab-desc">{e.desc}</p>
                    {e.awards && <p className="ab-chips">{e.awards.map((a) => <span key={a}>{a}</span>)}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ④ 수상 */}
        <div className="ab-awards-wrap">
          <h3 className="ab-sec-title">수상 {AWARDS.length}회{dot}</h3>
          <div className="aw">
            {/* 대상: 남색 카드 위 금빛 월계수 */}
            <button type="button" className="aw-hero" onClick={() => open(top.idx)} data-cursor="보기" aria-label={`${top.year} ${top.title} ${top.rank}, ${pname(top.idx)} 자세히 보기`}>
              <svg className="aw-laurel" viewBox="0 0 240 220" aria-hidden="true">
                {/* 월계수: 아래 가운데에서 양쪽으로 둥글게 올라가는 두 가지 */}
                {[1, -1].map((side) => (
                  <g key={side} transform={side < 0 ? "translate(240 0) scale(-1 1)" : undefined}>
                    <path className="aw-leaf aw-stem" pathLength="1" fill="none" d={`M${120 + 84 * Math.cos((100 * Math.PI) / 180)},${110 + 84 * Math.sin((100 * Math.PI) / 180)} A84 84 0 0 1 ${120 + 84 * Math.cos((228 * Math.PI) / 180)},${110 + 84 * Math.sin((228 * Math.PI) / 180)}`} />
                    {Array.from({ length: 9 }, (_, k) => {
                      const th = 106 + k * 14, r = (th * Math.PI) / 180;
                      const x = 120 + 84 * Math.cos(r), y = 110 + 84 * Math.sin(r);
                      const rot = th + 90 + (k % 2 ? 34 : -34) + 180, sc = 1.15 - k * 0.05;
                      return <path key={k} className="aw-leaf" pathLength="1" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${sc.toFixed(2)})`} d="M0,0 C6,-7 17,-7 26,0 C17,7 6,7 0,0Z" />;
                    })}
                  </g>
                ))}
              </svg>
              <span className="aw-hero-glow" aria-hidden="true" />
              <span className="aw-big" aria-hidden="true"><span>{top.rank}</span></span>
              <span className="aw-hero-meta">
                <span className="aw-y">{top.year} · {top.place}등</span>
                <b>{top.title}</b>
                <small>{top.from}</small>
                <em>{pname(top.idx)} <FaArrowRight aria-hidden="true" /></em>
              </span>
            </button>
            {/* 나머지: 시상식 명단처럼 한 줄씩 */}
            <ol className="aw-list">
              {rest.map((a) => (
                <li key={`${a.year}${a.title}${a.rank}`}>
                  <button type="button" className={`aw-row ${a.place === 1 ? "aw-gold" : "aw-silver"}`} onClick={() => open(a.idx)} data-cursor="보기">
                    <span className="aw-medal" aria-hidden="true"><i /></span>
                    <span className="aw-rank">{a.rank}<span className="aw-place">{a.place}등</span></span>
                    <span className="aw-info"><b><span className="aw-y">{a.year}</span>{a.title}</b><small>{a.from}</small></span>
                    <span className="aw-proj">{pname(a.idx)}<FaArrowRight aria-hidden="true" /></span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
