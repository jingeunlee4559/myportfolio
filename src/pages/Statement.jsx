import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { layers } from "../data/skills";

const ICON = Object.fromEntries(layers.flatMap((l) => l.items).filter(([, i]) => i));
const Cursor = () => <svg width="26" height="26" viewBox="0 0 24 24" className="drop-shadow-lg"><path d="M3 2l17 8-7.5 2L9 20z" fill="#2f8cff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>;

// 작은 미니 연출 3개: 화면 조립, 요청과 응답, 이징 곡선
function UiMini() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[320px] rounded-2xl bg-white p-4 shadow-[0_30px_60px_-30px_rgba(47,140,255,.6)] ring-1 ring-line">
        <div className="flex items-center gap-2.5"><i className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-cyan" /><i className="h-3 w-28 rounded-full bg-ink/10" /></div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">{[0, 1, 2].map((n) => <i key={n} className="bob block h-20 rounded-xl bg-gradient-to-br from-skysoft to-white ring-1 ring-line" style={{ "--d": `${n * -0.9}s` }} />)}</div>
        <div className="relative mt-4"><span className="btn btn-accent !h-10 w-full !text-sm">시작하기</span><span className="cursor-move absolute right-8 top-3"><Cursor /></span></div>
      </div>
    </div>
  );
}
function ServerMini() {
  const node = (x, t) => <g key={t}><rect x={x} y="82" width="84" height="56" rx="14" fill="#fff" stroke="#2f8cff" strokeOpacity=".4" /><text x={x + 42} y="115" textAnchor="middle" fontSize="13" fontWeight="800" fill="#191f28">{t}</text></g>;
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full p-4" aria-hidden="true">
      {node(14, "화면")}{node(138, "서버")}{node(262, "DB")}
      <path d="M98 104 L138 104 M222 104 L262 104" stroke="#2f8cff" strokeOpacity=".45" strokeDasharray="4 5" />
      <path d="M138 118 L98 118 M262 118 L222 118" stroke="#3de0ff" strokeOpacity=".55" strokeDasharray="4 5" />
      <text x="118" y="92" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#2f8cff">GET</text>
      <circle r="5" fill="#2f8cff"><animateMotion dur="2s" repeatCount="indefinite" path="M98 104 L138 104" /></circle>
      <circle r="5" fill="#2f8cff"><animateMotion dur="2s" begin="0.7s" repeatCount="indefinite" path="M222 104 L262 104" /></circle>
      <circle r="5" fill="#3de0ff"><animateMotion dur="2s" begin="1.2s" repeatCount="indefinite" path="M262 118 L222 118" /></circle>
      <circle r="5" fill="#3de0ff"><animateMotion dur="2s" begin="1.8s" repeatCount="indefinite" path="M138 118 L98 118" /></circle>
    </svg>
  );
}
function EaseMini() {
  const d = "M30 180 C 120 180, 130 40, 330 40";
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full p-4" aria-hidden="true">
      <path d="M30 20 V180 H340" fill="none" stroke="#191f28" strokeOpacity=".18" />
      <path d={d} fill="none" stroke="#2f8cff" strokeOpacity=".18" strokeWidth="5" strokeLinecap="round" />
      <path className="draw" d={d} fill="none" stroke="#7c5cff" strokeWidth="5" strokeLinecap="round" />
      <circle r="8" fill="#fff" stroke="#2f8cff" strokeWidth="4"><animateMotion dur="3.5s" repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".16 1 .3 1" /></circle>
      <text x="180" y="208" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="#6b7684">cubic-bezier(.16, 1, .3, 1)</text>
    </svg>
  );
}

const CARDS = [
  { no: "01", t: "화면", d: "버튼 하나, 화면 전환 하나까지 직접 다듬어요. 움직임이 있어야 쓰는 사람이 이해하기 쉽다고 생각해요.", k: ["React", "Tailwind CSS", "Vite"], bg: "from-[#eaf4ff] to-white", V: UiMini },
  { no: "02", t: "서버", d: "화면이 부르면 서버가 답해요. 로그인, REST API, 실시간 알림까지 팀 프로젝트에서 직접 연결했어요.", k: ["Spring Boot", "Node.js", "MySQL"], bg: "from-[#f0efff] to-white", V: ServerMini },
  { no: "03", t: "마무리", d: "디자인 파일부터 코드 정리까지. 팀이 함께 쓰는 도구로 끝까지 맞춰요.", k: ["Figma", "GitHub", "Notion"], bg: "from-[#e6f8ef] to-white", V: EaseMini },
];

function Card({ i, c, p }) {
  const scale = useTransform(p, [i / CARDS.length, 1], [1, 1 - (CARDS.length - 1 - i) * 0.05]);
  return (
    <li className="sticky mb-[14vh] last:mb-0" style={{ top: `calc(92px + ${i * 26}px)` }}>
      <motion.div style={{ scale }} className={`origin-top overflow-hidden rounded-[36px] bg-gradient-to-br ${c.bg} shadow-[0_1px_2px_rgba(25,31,40,.05),0_50px_90px_-44px_rgba(47,140,255,.55)] ring-1 ring-white`}>
        <div className="grid md:min-h-[440px] md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="font-mono text-sm font-bold text-accent">{c.no}</span>
            <h3 className="mt-2 text-[clamp(3rem,7vw,5.6rem)] font-extrabold leading-none tracking-[-0.07em]">{c.t}</h3>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-mute">{c.d}</p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {c.k.map((n) => <li key={n} className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-bold shadow-[0_10px_22px_-14px_rgba(47,140,255,.6)]"><span className="grid h-7 w-7 place-items-center rounded-full bg-white p-1 ring-1 ring-line">{ICON[n] && <img src={ICON[n]} alt="" className="h-full w-full object-contain" />}</span>{n}</li>)}
            </ul>
          </div>
          <div className="relative min-h-[260px] border-t border-white/70 bg-white/40 md:border-l md:border-t-0"><c.V /></div>
        </div>
      </motion.div>
    </li>
  );
}

export default function Statement() {
  const list = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: list, offset: ["start start", "end end"] });
  return (
    <section aria-label="만드는 방식" className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <h2 className="mb-14 text-[clamp(2.4rem,6.4vw,5.4rem)] font-extrabold leading-[1.08] tracking-[-0.07em] md:mb-20">화면에서 서버까지,<br /><span className="hl">이렇게 만들어요</span></h2>
      <ul ref={list} className="relative">{CARDS.map((c, i) => <Card key={c.no} i={i} c={c} p={p} />)}</ul>
    </section>
  );
}
