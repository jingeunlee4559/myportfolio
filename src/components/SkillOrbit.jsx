import { useRef } from "react";
import { layers } from "../data/skills";

const icons = (name) => layers.find((l) => l.name === name).items.filter(([, i]) => i);
const RINGS = [
  { r: 120, dur: 28, items: icons("Frontend").slice(0, 6), rev: false },
  { r: 210, dur: 38, items: icons("Backend"), rev: true },
  { r: 300, dur: 52, items: [...icons("Database"), ...icons("협업·도구")], rev: false },
];

// 기술 아이콘들이 세 겹의 궤도를 돕니다. 마우스를 올리면 멈추고, 아이콘은 커집니다.
export default function SkillOrbit() {
  const el = useRef(null);
  // 마우스 위치에 따라 궤도 전체가 3D로 기울어집니다.
  const tilt = (e) => { const r = el.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.current.style.transform = `perspective(1300px) rotateX(${(-y * 22 + 14).toFixed(1)}deg) rotateY(${(x * 26).toFixed(1)}deg)`; };
  const rest = () => { el.current.style.transform = "perspective(1300px) rotateX(14deg) rotateY(0deg)"; };
  return (
    <div ref={el} onPointerMove={tilt} onPointerLeave={rest} style={{ transform: "perspective(1300px) rotateX(14deg)", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }} className="orbit-pause relative mx-auto h-[330px] w-full max-w-[680px] sm:h-[500px] md:h-[680px]" role="img" aria-label="사용 기술이 궤도를 도는 그림">
      <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[.48] sm:scale-[.73] md:scale-100">
        <span className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(86,193,255,.35),transparent)]" aria-hidden="true" />
        <span className="spin-slow absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl [background:conic-gradient(from_0deg,#3de0ff,#2f8cff,#7c5cff,#ff8ad0,#3de0ff)]" aria-hidden="true" />
        {RINGS.map(({ r, dur, items, rev }, ri) => (
          <div key={ri} className={`orbit-spin ${rev ? "rev" : ""} pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed border-accent/30`} style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, "--dur": `${dur}s` }}>
            {items.map(([name, icon], k) => {
              const a = (360 / items.length) * k;
              return (
                <div key={name} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateX(${r}px)` }}>
                  <div style={{ transform: `rotate(${-a}deg)` }}>
                    <div className={`orbit-counter ${rev ? "rev" : ""}`} style={{ "--dur": `${dur}s` }}>
                      <span title={name} className="group pointer-events-auto relative -ml-8 -mt-8 grid h-16 w-16 place-items-center rounded-[20px] bg-white p-2.5 shadow-[0_16px_32px_-14px_rgba(30,80,170,.5)] ring-1 ring-line transition duration-300 hover:z-30 hover:scale-125">
                        <img src={icon} alt={name} className="h-full w-full object-contain" />
                        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white opacity-0 transition group-hover:opacity-100">{name}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#2f8cff] via-[#4aa8ff] to-[#7c5cff] text-center text-white shadow-[0_30px_60px_-20px_rgba(47,140,255,.8)]">
          <span className="pulse-ring absolute inset-0 rounded-full" aria-hidden="true" />
          <span className="relative text-[17px] font-extrabold leading-tight tracking-[-0.03em]">써 본<br />기술</span>
        </div>
      </div>
    </div>
  );
}
