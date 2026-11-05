import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

// 히어로의 메일 주소 줄: 누르면 주소를 복사하고 "복사됨"으로 잠깐 바뀝니다. (PC 히어로·휴대폰 히어로 공용)
export default function MailLine({ email }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setDone(true); setTimeout(() => setDone(false), 1600); }
    catch { window.location.href = `mailto:${email}`; }
  };
  return (
    <p className="st-mail">
      <button type="button" onClick={copy} data-cursor="복사" aria-label={`메일 주소 복사: ${email}`}><FaEnvelope aria-hidden="true" />{email}<em>{done ? "복사됨" : "복사"}</em></button>
    </p>
  );
}
