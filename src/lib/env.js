// 화면 환경 값을 한 곳에서 관리합니다.
export const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 새로고침할 때마다 인트로가 다시 나옵니다. (모션 줄이기 설정이면 건너뜁니다)
export const INTRO_ON = !reduced;

// 인트로 셔터가 올라가기 시작할 때 히어로 연출이 이어지도록 맞춘 시간(초)
export const D0 = INTRO_ON ? 2.85 : 0;
export const EASE = [0.16, 1, 0.3, 1];
