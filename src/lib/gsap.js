import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP와 스크롤 연출 플러그인을 한 곳에서 등록합니다.
gsap.registerPlugin(ScrollTrigger);
// 휴대폰에서 주소창이 접혔다 펴질 때 화면 높이가 바뀌어도 연출을 다시 계산하지 않게 합니다. (덜컹거림 방지)
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };

// 인트로가 끝났는지, 스크롤을 잠글지 등을 여러 컴포넌트가 함께 씁니다.
export const lenisRef = { current: null };
export const lockScroll = (on) => {
  const l = lenisRef.current;
  if (on) { l?.stop(); document.documentElement.style.overflow = "hidden"; }
  else { l?.start(); document.documentElement.style.overflow = ""; }
};

// 휴대폰 또는 세로로 긴 태블릿이면 "좁은 화면" 배치(기기 위, 설명 아래)를 씁니다. CSS의 같은 조건과 맞춰 둡니다.
export const NARROW_MQ = "(max-width: 760px), (max-aspect-ratio: 4/5) and (max-width: 1100px)";
export const narrow = () => window.matchMedia(NARROW_MQ).matches;

// 스크롤 연출들의 계산 순서를 "페이지 위 → 아래, 안쪽 → 바깥쪽" 순서로 맞춥니다.
// 화면 크기가 바뀌어 어떤 고정 구간이 새로 만들어지면 목록 맨 뒤에 붙는데, 그대로 두면 그보다 아래 장면들이
// 새 고정 구간의 길이를 모른 채 계산되어 위치가 어긋납니다. 같은 요소면 고정(pin)하는 쪽을 먼저 계산합니다.
export function sortTriggers() {
  ScrollTrigger.sort((a, b) => {
    const A = a.trigger, B = b.trigger;
    if (!A || !B || !A.compareDocumentPosition) return 0;
    if (A === B) return (b.pin ? 1 : 0) - (a.pin ? 1 : 0);
    const pos = A.compareDocumentPosition(B);
    if (pos & Node.DOCUMENT_POSITION_CONTAINED_BY) return 1; // B가 A 안에 있음 → B 먼저
    if (pos & Node.DOCUMENT_POSITION_CONTAINS) return -1; // A가 B 안에 있음 → A 먼저
    return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
}
