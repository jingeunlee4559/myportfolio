// 화면 환경 값을 한 곳에서 관리합니다.
export const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 인트로 화면은 뺐습니다. (예전 컴포넌트 호환용으로 값만 남김)
export const INTRO_ON = false;
export const D0 = 0;
export const EASE = [0.16, 1, 0.3, 1];

// 스크롤 장면은 사용자가 직접 스크롤해서 움직이는 것이라, '동작 줄이기' 설정이 켜져 있어도 그대로 씁니다.
// (예전에는 이 설정이면 장면을 끄고 정적 화면으로 바꿨는데, 레이아웃이 겹치는 문제가 있었습니다.)
export const STATIC_LAYOUT = false;

// 손가락으로 조작하는 기기(휴대폰·태블릿)인지. 이런 기기에서는 무거운 효과를 줄입니다.
export const touch = typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// 가벼운 연출(lite)을 쓸 기기: 손가락 조작 기기, 카톡·인스타 같은 앱 안 브라우저, 코어·메모리가 적은 기기.
// 이런 기기에서는 화면 전체를 다시 그리게 만드는 효과(블렌드 레이어, filter 애니메이션, 끝없이 흐르는 벽)를 끕니다.
// 스크롤 고정 연출 같은 핵심 장면은 그대로 둡니다. html에 data-lite가 붙으므로 CSS에서도 같은 조건을 씁니다.
const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
const inApp = /KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|Line\/|DaumApps|everytimeApp/i.test(ua);
const lowEnd = typeof navigator !== "undefined" && ((navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 2);
export const lite = touch || inApp || lowEnd;
if (typeof document !== "undefined" && lite) document.documentElement.dataset.lite = "";

// 휴대폰은 스크롤할 때 주소창이 접혔다 펴지면서 화면 높이만 바뀌고 resize가 일어납니다.
// 그때마다 자리를 다시 계산하면 화면이 튀므로, 휴대폰에서는 "가로 폭이 바뀐 경우"에만 fn을 실행합니다.
export function onWidthResize(fn) {
  let w = window.innerWidth;
  return () => {
    if (touch && window.innerWidth === w) return;
    w = window.innerWidth;
    fn();
  };
}
