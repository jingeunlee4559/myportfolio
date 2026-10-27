import { useLayoutEffect, useRef, useState } from "react";
import { layers } from "../data/skills";
import { gsap, narrow } from "../lib/gsap";
import { guideZone } from "../lib/guide";
import { reduced } from "../lib/env";

// 기술 — 세 번째 장(CHAPTER 03): 밤하늘 별자리
//  ① 밝은 화면 위로 남색 카드가 올라와 화면을 꽉 채우며 밤하늘이 됨 (인트로의 밤하늘과 이어짐)
//  ② 흩어진 별처럼 떠 있던 기술 타일들이 스크롤하는 만큼 제자리로 모임
//  ③ 묶음(Frontend → Backend → Database → 협업·도구)이 하나씩 켜지며 별자리 선으로 이어지고,
//     마침표 길잡이는 지금 켜진 묶음 이름 끝에 앉음
// 타일 자리는 CSS 격자가 정하고, 선은 그 자리를 읽어 그리므로 화면 크기가 바뀌어도 맞춰집니다.
const ALL = layers.flatMap((l, gi) => l.items.map(([n, icon]) => ({ n, icon, gi })));
const rnd = (i, k) => { const v = Math.sin(i * 91.7 + k * 13.3) * 43758.5453; return v - Math.floor(v); };
// 배경 별 (자리 고정)
const STARS = Array.from({ length: 70 }, (_, i) => ({ x: rnd(i, 1) * 100, y: rnd(i, 2) * 100, s: 1 + rnd(i, 3) * 2.2, d: rnd(i, 4) * 4 }));

function Icon({ icon }) {
  if (typeof icon === "string") return <span className="sk2-ico"><img src={icon} alt="" /></span>;
  const [C, color] = icon;
  return <span className="sk2-ico"><C style={{ color }} /></span>;
}

export default function Skills() {
  const wrap = useRef(null), sec = useRef(null), grid = useRef(null), svg = useRef(null);
  const [g, setG] = useState(reduced ? -2 : -1);
  const gRef = useRef(-1), pr = useRef(0);

  // 지금 켜진 묶음의 타일을 별자리 선으로 잇기 (타일의 CSS 자리를 읽음)
  const draw = (gi) => {
    const s = svg.current, gr = grid.current; if (!s || !gr) return;
    const path = s.querySelector("path");
    if (gi < 0) { path.setAttribute("d", ""); return; }
    const pts = [...gr.querySelectorAll(`.sk2-t[data-g="${gi}"]`)].map((t) => [t.offsetLeft + t.offsetWidth / 2, t.offsetTop + t.offsetHeight / 2]);
    path.setAttribute("d", pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" "));
    const len = path.getTotalLength ? path.getTotalLength() : 0;
    gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", overwrite: true });
  };

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const N = layers.length, A = 0.28; // 0~A: 별이 모임, A~1: 묶음이 차례로 켜짐
      // ① 남색 카드가 올라오며 화면을 채움
      gsap.fromTo(".sk2-night", { clipPath: () => (narrow() ? "inset(6% 3% 0% 3% round 32px)" : "inset(10% 6% 0% 6% round 48px)") },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "top top", scrub: 0.6, invalidateOnRefresh: true } });
      gsap.fromTo(".sk2-head > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: wrap.current, start: "top 60%", end: "top 10%", scrub: 0.6 } });
      let last = -2;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current, start: "top top", end: () => `+=${window.innerHeight * (narrow() ? 2 : 2.3)}`, pin: sec.current, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (st) => {
            const p = (pr.current = st.progress);
            const n = p < A ? -1 : Math.min(N - 1, Math.floor(((p - A) / (1 - A)) * N));
            if (n !== last) { last = n; gRef.current = n; setG(n); draw(n); }
          },
          onRefresh: () => draw(gRef.current),
        },
      });
      // ② 흩어진 별 → 제자리 (자리는 매번 화면 크기에 맞춰 다시 계산)
      tl.fromTo(".sk2-t", {
        x: (i) => (rnd(i, 5) - 0.5) * window.innerWidth * 0.9, y: (i) => (rnd(i, 6) - 0.5) * window.innerHeight * 0.9,
        scale: (i) => 0.25 + rnd(i, 7) * 0.3, opacity: 0.35, rotate: (i) => (rnd(i, 8) - 0.5) * 60,
      }, { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: A, ease: "power3.out", stagger: { each: 0.004, from: "random" }, immediateRender: true }, 0);
      tl.to({}, { duration: 0.05 }, 0.95);
      // 마침표 길잡이: 장 제목 끝 → 켜진 묶음 이름 끝
      guideZone(wrap.current, () => {
        const el = sec.current, n = gRef.current;
        return n < 0 ? el.querySelector(".sk2-title .gd-p") : el.querySelectorAll(".sk2-g .gd-p")[n];
      }, { start: "top 60%", end: "bottom 40%" });
      const onResize = () => draw(gRef.current);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, sec);
    return () => ctx.revert();
  }, []);

  const on = (gi) => g === -2 || g === gi;
  return (
    <div ref={wrap} className="sk2-wrap">
    <section id="skill" ref={sec} className={`sk2 ${reduced ? "sk2-static" : ""} ${g >= 0 ? "sk2-lit" : ""}`} aria-label="기술">
      <div className="sk2-night" aria-hidden="true">{STARS.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}</div>
      <div className="sk2-in">
        <div className="sk2-side">
          <div className="sk2-head">
            <p className="ab-kick"><b>03</b> TECH STACK</p>
            <h2 className="sk2-title">프로젝트에서<br />직접 써 본 기술입니다<i className="gd-p" aria-hidden="true" /></h2>
          </div>
          <ol className="sk2-groups">
            {layers.map((l, gi) => (
              <li key={l.name} className={`sk2-g ${on(gi) ? "on" : ""}`}>
                <span className="sk2-gno">0{gi + 1}</span>
                <div>
                  <h3>{l.name}<i className="gd-p" aria-hidden="true" /><small>{l.items.length}개</small></h3>
                  <p>{l.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="sk2-note" aria-hidden="true">{g >= 0 ? layers[g].note : "\u00a0"}</p>
        </div>
        <div className="sk2-sky">
          <div ref={grid} className="sk2-grid">
            <svg ref={svg} className="sk2-lines" aria-hidden="true"><path fill="none" /></svg>
            {ALL.map(({ n, icon, gi }) => (
              <div key={n} data-g={gi} className={`sk2-t ${on(gi) ? "on" : ""}`}><Icon icon={icon} /><span>{n}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
