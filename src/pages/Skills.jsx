import { layers } from "../data/skills";
import SectionHead from "../components/SectionHead";
import Reveal from "../components/Reveal";
import SkillOrbit from "../components/SkillOrbit";
import Tilt from "../components/Tilt";

const SPAN = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-4"];
const TINT = ["tint-0", "tint-1", "tint-2", "tint-3"];
const DOT = ["bg-accent", "bg-violet", "bg-mint", "bg-sun"];

export default function Skills() {
  return (
    <section id="skill" className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-[22%] -z-10 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent/20 via-cyan/20 to-violet/20 blur-[130px]" aria-hidden="true" />
      <SectionHead no="03" label="Tech Stack" title="기술" desc="프로젝트에서 직접 써 보고, 계속 배우는 중인 기술들이에요." />
      <Reveal className="mb-14 md:mb-20"><SkillOrbit /><p className="mt-2 text-center text-sm font-semibold text-mute">마우스를 올리면 멈추고, 아이콘이 커져요</p></Reveal>
      <div className="grid gap-5 md:grid-cols-6">
        {layers.map((l, k) => (
          <Reveal key={l.name} delay={(k % 2) * 0.08} className={SPAN[k]}>
            <Tilt max={6} className={`card spot ${TINT[k]} h-full p-7 md:p-9`}>
              <div className="flex items-center gap-3"><i className={`h-2.5 w-2.5 rounded-full ${DOT[k]}`} aria-hidden="true" /><h3 className="text-xl font-extrabold tracking-[-0.03em]">{l.name}</h3></div>
              <p className="mt-2 text-sm text-mute">{l.note}</p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {l.items.map(([n, icon]) => (
                  <li key={n} className="flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold shadow-[0_6px_16px_-10px_rgba(25,31,40,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_20px_-10px_rgba(47,140,255,.5)]">
                    {icon ? <span className="grid h-7 w-7 place-items-center rounded-full bg-white p-1 ring-1 ring-line"><img src={icon} alt="" className="h-full w-full object-contain" /></span> : <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 text-[10px] font-bold text-mute" aria-hidden="true">{n[0]}</span>}{n}
                  </li>
                ))}
              </ul>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
