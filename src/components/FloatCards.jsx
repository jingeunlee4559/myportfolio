import { projects } from "../data/projects";

// 기기 주변에 떠 있는 작은 정보 카드 (기간·인원 / 내 역할·기여도). 내용은 projects.js 그대로입니다.
// 큰 화면에서만 보입니다.
export default function FloatCards({ idx, className = "" }) {
  const d = projects[idx].details;
  const period = d.period.replace(/\s*\(.*\)/, "").replace(" - ", " – ");
  return (
    <div className={`fc ${className}`} aria-hidden="true">
      <div className="fc-card fc-a">
        <span className="fc-k">기간</span><b className="fc-v">{period}</b>
        <span className="fc-k fc-mt">인원</span><b className="fc-v">{d.members.replace(/\s*\(.*\)/, "")}</b>
      </div>
      <div className="fc-card fc-b">
        <span className="fc-k">내 역할</span><b className="fc-v">{d.roleShort}</b>
        {d.contribution && <span className="fc-pct"><i style={{ width: d.contribution }} /><em>기여도 {d.contribution}</em></span>}
      </div>
    </div>
  );
}
