// 화면 환경 값을 한 곳에서 관리합니다.
export const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 인트로 화면은 뺐습니다. (예전 컴포넌트 호환용으로 값만 남김)
export const INTRO_ON = false;
export const D0 = 0;
export const EASE = [0.16, 1, 0.3, 1];
