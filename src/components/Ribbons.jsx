import VelocityMarquee from "./VelocityMarquee";

const A = ["WEB DEVELOPER", "REACT", "SPRING BOOT", "NODE.JS", "FASTAPI", "MYSQL"];
const B = ["화면", "서버", "끝까지 만드는", "함께 만드는"];

function Set({ items }) {
  return (
    <ul className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-[clamp(1.5rem,3.6vw,2.8rem)] font-extrabold tracking-[-0.04em]">
      {items.map((t) => <li key={t} className="flex items-center gap-8">{t}<span className="text-[.7em] opacity-70">✦</span></li>)}
    </ul>
  );
}

// 서로 엇갈려 지나가는 두 개의 기울어진 띠: 섹션 사이를 화려하게 이어 줍니다
export default function Ribbons() {
  return (
    <div className="relative my-8 h-[210px] overflow-hidden md:my-14 md:h-[270px]" aria-hidden="true">
      <div className="absolute inset-x-[-6%] top-1/2 -mt-8 -rotate-3 bg-accent py-3.5 text-white shadow-[0_24px_50px_-24px_rgba(47,140,255,.8)]"><VelocityMarquee base={-3}><Set items={A} /></VelocityMarquee></div>
      <div className="absolute inset-x-[-6%] top-1/2 -mt-8 rotate-3 bg-ink py-3.5 text-white shadow-[0_24px_50px_-24px_rgba(25,31,40,.7)]"><VelocityMarquee base={3}><Set items={B} /></VelocityMarquee></div>
    </div>
  );
}
