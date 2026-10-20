import { motion } from "motion/react";

// 눈동자가 커서를 따라다니고, 깜빡이고, 손을 흔드는 마스코트입니다. (sx, sy: -0.5 ~ 0.5)
export default function Mascot({ sx, sy }) {
  return (
    <svg viewBox="0 0 240 262" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="mh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7cc4ff" /><stop offset="1" stopColor="#2f8cff" /></linearGradient>
        <linearGradient id="mb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d7bff" /><stop offset="1" stopColor="#5b6cff" /></linearGradient>
      </defs>
      <line x1="120" y1="30" x2="120" y2="60" stroke="#191f28" strokeWidth="4" strokeLinecap="round" />
      <path className="spin-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }} transform="translate(106 4) scale(.58)" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="#ffc933" />
      <path d="M44 124C42 52 198 52 196 124" fill="none" stroke="#191f28" strokeWidth="10" strokeLinecap="round" />
      <rect x="82" y="188" width="76" height="52" rx="26" fill="url(#mb)" />
      <circle cx="120" cy="214" r="7" fill="#fff" opacity=".9" />
      <circle cx="60" cy="214" r="16" fill="#fff" stroke="#cfe3ff" strokeWidth="3" />
      <g className="wave-hand"><path d="M158 206L186 176" stroke="#5b6cff" strokeWidth="12" strokeLinecap="round" /><circle cx="192" cy="168" r="17" fill="#fff" stroke="#cfe3ff" strokeWidth="3" /></g>
      <rect x="46" y="58" width="148" height="140" rx="58" fill="url(#mh)" />
      <ellipse cx="88" cy="76" rx="28" ry="9" fill="#fff" opacity=".4" transform="rotate(-18 88 76)" />
      <rect x="28" y="106" width="28" height="48" rx="14" fill="#7c5cff" />
      <rect x="184" y="106" width="28" height="48" rx="14" fill="#7c5cff" />
      <rect x="62" y="84" width="116" height="90" rx="42" fill="#f4faff" />
      <g className="blink"><motion.g style={{ x: useX(sx), y: useY(sy) }}>
        <ellipse cx="98" cy="127" rx="8" ry="11" fill="#191f28" /><circle cx="95" cy="123" r="3" fill="#fff" />
        <ellipse cx="142" cy="127" rx="8" ry="11" fill="#191f28" /><circle cx="139" cy="123" r="3" fill="#fff" />
      </motion.g></g>
      <circle cx="80" cy="150" r="8" fill="#ff8ad0" opacity=".55" /><circle cx="160" cy="150" r="8" fill="#ff8ad0" opacity=".55" />
      <path d="M108 150Q120 163 132 150" fill="none" stroke="#191f28" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
import { useTransform } from "motion/react";
const useX = (v) => useTransform(v, [-0.5, 0.5], [-8, 8]);
const useY = (v) => useTransform(v, [-0.5, 0.5], [-6, 6]);
