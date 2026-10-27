import { ScrollTrigger } from "./gsap";

// 마침표 길잡이: 페이지 전체를 함께 내려가는 파란 점.
// 각 장면은 "지금 점이 있어야 할 자리(요소)"만 알려 주고, 점은 그 요소의 실제 위치를 매 프레임 읽어 따라갑니다.
// 위치를 숫자로 계산하지 않고 요소를 따라가므로, 화면 크기가 바뀌어도 CSS가 정한 자리로 자연스럽게 옮겨 갑니다.
//   guide.set(요소 | 요소를 돌려주는 함수, { size })
export const guide = {
  target: null,
  opts: {},
  set(target, opts = {}) { this.target = target; this.opts = opts; },
  resolve() { const t = typeof this.target === "function" ? this.target() : this.target; return t || null; },
};

// 보통 섹션용: 이 영역이 화면 가운데를 지나는 동안 점을 target으로 보냄
// first: 페이지 맨 위 장면이면 맨 위로 되돌아왔을 때(구간 위로 벗어남)도 이 자리를 씀
export function guideZone(trigger, target, { start = "top 55%", end = "bottom 55%", first = false, ...opts } = {}) {
  return ScrollTrigger.create({ trigger, start, end, onToggle: (st) => st.isActive && guide.set(target, opts), onLeaveBack: first ? () => guide.set(target, opts) : undefined });
}

// 여러 마침표 자리 중, 화면의 기준선(line)을 마지막으로 지나간 자리로 점을 보냄 (위에서 아래 순서로 넘겨 주세요)
export function guideTrack(trigger, getList, { line = 0.62, ...opts } = {}) {
  const pick = () => {
    const L = getList().filter(Boolean), y = window.innerHeight * line;
    let out = L[0] || null;
    for (const el of L) { const r = el.getBoundingClientRect(); if (r.top + r.height / 2 < y) out = el; }
    return out;
  };
  return guideZone(trigger, pick, opts);
}
