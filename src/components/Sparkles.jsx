const SPOTS = [["8%", "22%", 18, 0], ["90%", "18%", 24, 0.6], ["16%", "64%", 14, 1.2], ["84%", "58%", 20, 0.3], ["50%", "10%", 16, 0.9], ["70%", "78%", 12, 1.5], ["30%", "36%", 12, 1.9]];

// 반짝이는 별 조각들. 부모에 relative/absolute 영역이 있으면 그 안에서 위치합니다.
export default function Sparkles({ color = "#2f8cff", spots = SPOTS }) {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {spots.map(([l, t, s, d], i) => (
        <i key={i} className="twinkle absolute block" style={{ left: l, top: t, width: s, height: s, animationDelay: `${d}s` }}>
          <svg viewBox="0 0 24 24" className="h-full w-full"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill={color} /></svg>
        </i>
      ))}
    </span>
  );
}
