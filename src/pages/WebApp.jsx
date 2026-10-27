import { useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight, FaBell } from "react-icons/fa6";
import { gsap, narrow } from "../lib/gsap";
import { reduced } from "../lib/env";
import { guideZone } from "../lib/guide";
import { WEBAPP as D, FEATURED } from "../data/story";

// "웹 ▮ 앱" 장면 (YOLO): 가운데 검은 막대가 커지며 화면을 채우고,
// 반으로 갈라져 왼쪽은 노트북(관리자 웹), 오른쪽은 폰(모바일 앱)이 됩니다.
// 노트북·폰이 놓일 자리와 설명 글은 CSS(.wa-row)가 배치하고, JS는 그 자리를 읽어 막대를 그쪽으로 움직이기만 합니다.
// 그래서 화면 크기가 바뀌어도(휴대폰 ↔ 컴퓨터) CSS가 정한 자리로 다시 맞춰집니다.
const openProject = (i) => window.dispatchEvent(new CustomEvent("open-project", { detail: i }));
const E = gsap.parseEase("power3.inOut");
const mix = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t, w: p.w + (q.w - p.w) * t, h: p.h + (q.h - p.h) * t });
const box = (el, r, rad) => { el.style.left = `${r.x}px`; el.style.top = `${r.y}px`; el.style.width = `${r.w}px`; el.style.height = `${r.h}px`; el.style.borderRadius = `${rad}px`; };

export default function WebApp() {
  const wrap = useRef(null), prog = useRef(0);
  const sec = useRef(null), pill = useRef(null), big = useRef(null), dL = useRef(null), dR = useRef(null);
  const [app, setApp] = useState(0);

  useLayoutEffect(() => {
    if (reduced) return;
    // K.g: 막대가 커짐, K.s: 노트북·폰으로 갈라짐 (0~1)
    // K.sig: 노트북 → 폰으로 신호가 날아감 (0~1)
    const K = { g: 0, s: 0, sig: 0 };
    let RC = null;
    const rel = (el) => { const r = el.getBoundingClientRect(), o = sec.current.getBoundingClientRect(); return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height }; };
    const measure = () => {
      const el = sec.current;
      // 글자가 옆으로 비켜난 상태에서도 막대 자리는 그대로이므로 언제 재도 같습니다.
      RC = { P: rel(pill.current), B: rel(el.querySelector(".wa-slot-b")), L: rel(el.querySelector(".wa-slot-l")), A: rel(el.querySelector(".wa-slot-a")) };
    };
    const apply = () => {
      if (!RC) measure();
      const g = E(K.g), s = E(K.s), m = narrow();
      const { P, B, L, A } = RC;
      box(big.current, mix(P, B, g), P.w * 0.52 + (28 - P.w * 0.52) * g);
      big.current.style.opacity = K.g > 0 && K.s === 0 ? 1 : 0;
      const half = (B.w - 12) / 2;
      box(dL.current, mix({ x: B.x, y: B.y, w: half, h: B.h }, L, s), 28 + ((m ? 10 : 16) - 28) * s);
      box(dR.current, mix({ x: B.x + half + 12, y: B.y, w: half, h: B.h }, A, s), 28 + ((m ? 22 : 34) - 28) * s);
      dL.current.style.opacity = dR.current.style.opacity = K.s > 0 ? 1 : 0;
      pill.current.style.opacity = K.g > 0 ? 0 : 1;
      // 신호 선: 노트북 오른쪽 → 폰 왼쪽으로 휘어지는 선과 그 위를 달리는 점
      const x0 = L.x + L.w, y0 = L.y + L.h * 0.35, x3 = A.x, y3 = A.y + A.h * 0.22, mx = (x0 + x3) / 2, lift = Math.max(40, (x3 - x0) * 0.9);
      const d = `M${x0},${y0} C${mx},${y0 - lift} ${mx},${y3 - lift} ${x3},${y3}`;
      const path = sec.current.querySelector(".wa-sig path"), dot = sec.current.querySelector(".wa-sig circle");
      path.setAttribute("d", d);
      const len = path.getTotalLength(), t = K.sig;
      path.style.strokeDasharray = `${len}`; path.style.strokeDashoffset = `${len * (1 - t)}`;
      const pt = path.getPointAtLength(len * t);
      dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y); dot.style.opacity = t > 0 && t < 1 ? 1 : 0;
      path.style.opacity = t > 0 ? 1 : 0;
    };
    const ctx = gsap.context(() => {
      let last = -1;
      measure(); apply();
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current, start: "top top", end: () => `+=${window.innerHeight * (narrow() ? 2.1 : 2.4)}`, pin: sec.current, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          onRefresh: () => { measure(); apply(); },
          onUpdate: (st) => { prog.current = st.progress; const n = st.progress > 0.8 ? 1 : 0; if (n !== last) { last = n; setApp(n); } },
        },
      });
      tl.fromTo(".wa-l", { xPercent: 0, opacity: 1 }, { xPercent: -260, opacity: 0, duration: 0.2, ease: "power2.in", immediateRender: false }, 0.05)
        .fromTo(".wa-r", { xPercent: 0, opacity: 1 }, { xPercent: 260, opacity: 0, duration: 0.2, ease: "power2.in", immediateRender: false }, 0.05)
        .fromTo(K, { g: 0 }, { g: 1, duration: 0.22, onUpdate: apply, immediateRender: false }, 0.05)
        .fromTo(K, { s: 0 }, { s: 1, duration: 0.16, onUpdate: apply, immediateRender: false }, 0.28)
        .fromTo(".wa-head", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.08, immediateRender: false }, 0.3)
        .fromTo(".wa-img-l", { opacity: 0 }, { opacity: 1, duration: 0.06, immediateRender: false }, 0.4)
        .fromTo(".wa-cap-l", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.06, immediateRender: false }, 0.5)
        .fromTo(".wa-pulse", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.05, immediateRender: false }, 0.47)
        .fromTo(K, { sig: 0 }, { sig: 1, duration: 0.08, onUpdate: apply, immediateRender: false }, 0.5)
        .fromTo(".wa-img-r0", { opacity: 0 }, { opacity: 1, duration: 0.06, immediateRender: false }, 0.56)
        .fromTo(".wa-push", { yPercent: -160, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.05, ease: "back.out(2)", immediateRender: false }, 0.58)
        .fromTo(".wa-ph", { rotation: 0 }, { keyframes: [{ rotation: -3, duration: 0.01 }, { rotation: 3, duration: 0.01 }, { rotation: -2, duration: 0.01 }, { rotation: 0, duration: 0.01 }], immediateRender: false }, 0.59)
        .fromTo(".wa-push", { yPercent: 0, opacity: 1 }, { yPercent: -160, opacity: 0, duration: 0.05, immediateRender: false }, 0.76)
        .fromTo(".wa-cap-r", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.06, immediateRender: false }, 0.6)
        .fromTo(".wa-go", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.06, immediateRender: false }, 0.64)
        .fromTo(".wa-img-r1", { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: false }, 0.8)
        .to({}, { duration: 0.08 }, 0.92);
      // 마침표 길잡이: "웹 ▮ 앱." 끝 → 커지는 검은 막대 한가운데 → 제목 끝 → 노트북 경보(빨강) → 신호를 타고 폰으로 → 푸시 알림 배지 → 앱 설명 끝
      guideZone(wrap.current, () => {
        const el = sec.current, p = prog.current;
        if (p < 0.05) return el.querySelector(".wa-r .gd-p");
        if (p < 0.29) return big.current;
        if (p < 0.45) return el.querySelector(".wa-head .gd-p");
        if (p < 0.5) return el.querySelector(".wa-pulse");
        if (p < 0.575) return el.querySelector(".wa-sig circle");
        if (p < 0.76) return el.querySelector(".wa-push .gd-badge");
        return el.querySelector(".wa-cap-r .gd-p");
      });
      const onResize = () => { measure(); apply(); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap}>
    <section ref={sec} className={`wa ${reduced ? "wa-static" : ""}`} aria-label={D.label}>
      <div className="wa-word" aria-hidden="true"><span className="wa-l">웹</span><i ref={pill} className="wa-pill" /><span className="wa-r">앱<i className="gd-p" aria-hidden="true" /></span></div>
      <div className="wa-stack">
      <div className="wa-head">
        <p className="st-kicker">PROJECT 02 / {String(FEATURED).padStart(2, "0")}</p>
        <p className="st-eyebrow justify-center">{D.label}</p>
        <h2 className="st-h2">{D.title}<i className="gd-p" aria-hidden="true" /></h2>
      </div>
      {/* 자리표시: 막대가 커질 자리, 노트북·폰이 놓일 자리 (CSS가 배치) */}
      <i className="wa-slot-b" aria-hidden="true" />
      <div className="wa-row">
        <div className="wa-col wa-col-l"><span className="wa-pulse" aria-hidden="true" data-gd-size="16" data-gd-tone="alert"><i /><i /><i /></span><i className="wa-slot wa-slot-l" aria-hidden="true" /><p className="wa-cap wa-cap-l"><b>{D.web.title}</b><span>{D.web.text}</span></p></div>
        <div className="wa-col wa-col-a"><i className="wa-slot wa-slot-a" aria-hidden="true" /><p className="wa-cap wa-cap-r"><b>{D.app[app].title}<i className="gd-p" aria-hidden="true" /></b><span>{D.app[app].text}</span></p></div>
        <div className="wa-go"><button type="button" className="st-more" onClick={() => openProject(D.idx)}>자세히 보기 <FaArrowRight aria-hidden="true" /></button></div>
      </div>
      </div>
      <svg className="wa-sig" aria-hidden="true"><path fill="none" /><circle r="7" data-gd-size="16" data-gd-tone="alert" /></svg>
      <div ref={big} className="wa-big" aria-hidden="true" data-gd-size="16" />
      <div ref={dL} className="wa-dev" data-cursor="보기" onClick={() => openProject(D.idx)}><img className="wa-img wa-img-l" src={D.web.img} alt={D.web.alt} loading="lazy" /></div>
      <div ref={dR} className="wa-dev wa-ph" data-cursor="보기" onClick={() => openProject(D.idx)}><div className="wa-push" aria-hidden="true"><span className="wa-push-ico"><FaBell /></span><span><b>실시간 알림</b><small>흉기 감지 알림이 도착했습니다</small></span><em>지금</em><i className="gd-badge" data-gd-size="12" data-gd-tone="alert" /></div>{D.app.map((a, k) => <img key={k} className={`wa-img wa-img-r${k}`} src={a.img} alt={a.alt} loading="lazy" />)}</div>
    </section>
    </div>
  );
}
