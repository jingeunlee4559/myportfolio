// 화면 환경 값을 한 곳에서 관리합니다.
export const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 인트로 화면은 뺐습니다. (예전 컴포넌트 호환용으로 값만 남김)
export const INTRO_ON = false;
export const D0 = 0;
export const EASE = [0.16, 1, 0.3, 1];

// 스크롤 장면은 사용자가 직접 스크롤해서 움직이는 것이라, '동작 줄이기' 설정이 켜져 있어도 그대로 씁니다.
// (예전에는 이 설정이면 장면을 끄고 정적 화면으로 바꿨는데, 레이아웃이 겹치는 문제가 있었습니다.)
export const STATIC_LAYOUT = false;
