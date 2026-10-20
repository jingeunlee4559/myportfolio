import { marquee } from "../data/skills";
import VelocityMarquee from "./VelocityMarquee";

export default function Marquee() {
  const set = (
    <ul className="flex shrink-0 gap-4 pr-4">
      {marquee.map(([n, icon]) => (
        <li key={n} className="flex shrink-0 items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-[15px] font-bold shadow-[0_8px_20px_-12px_rgba(25,31,40,.28)]">
          {icon && <span className="grid h-7 w-7 place-items-center rounded-full bg-white p-0.5 ring-1 ring-line"><img src={icon} alt="" className="h-full w-full object-contain" /></span>}{n}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative marquee-bg py-7 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" aria-hidden="true">
      <VelocityMarquee base={-2.2}>{set}</VelocityMarquee>
    </div>
  );
}
