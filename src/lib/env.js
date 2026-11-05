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
// "(hover: none) and (pointer: coarse)"만으로 판단하면, S펜·에어뷰를 지원하는 일부 갤럭시처럼
// 스스로를 "마우스로 가리킬 수 있는 기기"라고 알리는 폰이 PC로 잘못 판단됩니다. (삼성 인터넷에서 PC 연출이 그대로 나오던 원인)
// 그래서 휴대폰·태블릿 운영체제(안드로이드, iOS, iPadOS)인지도 함께 봅니다.
const nav = typeof navigator !== "undefined" ? navigator : {};
const ua = nav.userAgent || "";
const mobileOS = /Android|iPhone|iPad|iPod|Mobile|SamsungBrowser/i.test(ua) || (/Macintosh/.test(ua) && (nav.maxTouchPoints || 0) > 1); // 마지막은 아이패드(데스크톱 모드)
export const touch = typeof window !== "undefined" && (mobileOS || window.matchMedia("(hover: none) and (pointer: coarse)").matches);

// 가벼운 연출(lite)을 쓸 기기: 손가락 조작 기기, 카톡·인스타 같은 앱 안 브라우저, 코어·메모리가 적은 기기.
// 이런 기기에서는 화면 전체를 다시 그리게 만드는 효과(블렌드 레이어, filter 애니메이션, 끝없이 흐르는 벽)를 끕니다.
// 스크롤 고정 연출 같은 핵심 장면은 그대로 둡니다. html에 data-lite가 붙으므로 CSS에서도 같은 조건을 씁니다.
export const inApp = /KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|Line\/|DaumApps|everytimeApp/i.test(ua);
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

// 고정(pin) 구간 길이를 정할 때 쓰는 "흔들리지 않는 화면 높이".
// 휴대폰은 주소창이 접혔다 펴질 때마다 innerHeight가 바뀝니다. 그 값으로 구간 길이를 계산하면,
// 이미지·방명록이 늦게 불러와져 다시 계산할 때 구간 길이가 달라져 보고 있던 장면이 앞뒤로 튑니다.
// 주소창이 접혔을 때 기준 높이(100lvh)는 주소창과 상관없이 일정하므로 이 값을 씁니다.
let probe = null;
export function stableVH() {
  if (typeof document === "undefined") return 800;
  if (!touch) return window.innerHeight;
  if (!probe) {
    probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
  }
  return probe.offsetHeight || window.innerHeight;
}

// 휴대폰·태블릿(lite)에서는 대표 프로젝트 영역을 휴대폰 전용 화면(MobileFeatured)으로 바꾸고,
// 그 밖의 프로젝트는 고정 없이 보여줍니다. 기술 스택만 PC와 같은 고정 연출을 씁니다.
// 카카오톡·앱 안 브라우저, 기기 종류 ("전체 애니메이션 보기" 안내에 사용)
export const isKakao = /KAKAOTALK/i.test(ua);
export const isLine = /Line\//i.test(ua);
export const isAndroid = /Android/i.test(ua);
export const isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && (nav.maxTouchPoints || 0) > 1);

// ── 화면 버전 (휴대폰·태블릿만) ─────────────────────────────
// 휴대폰·태블릿은 어디서 열든 처음에는 무조건 "간편 모드"(대표 프로젝트 = 휴대폰 전용 카드)로 시작합니다.
// 화면 아래 안내 바나 메뉴의 스위치로 "전체 애니메이션"을 고르면 주소에 ?full=1을 붙여 다시 열고,
// 그때만 PC와 같은 스크롤 장면을 씁니다. (선택은 기억하지 않음: 새로 열면 다시 간편 모드)
// 카톡 같은 앱 안 브라우저에서는 성능이 제한돼 전체 버전을 켜지 않고, 일반 브라우저로 옮겨서 보여 줍니다.
// 전체 버전에서도 휴대폰용 안정화 처리(흐림·노이즈 끄기, 높이 계산 등, html[data-lite])는 그대로 둡니다.
const wantFull = typeof location !== "undefined" && new URLSearchParams(location.search).get("full") === "1";
export const FULL = lite && wantFull && !inApp;
export const SIMPLE = lite && !FULL;
export const LITE_STATIC = SIMPLE;
// 연출을 줄이는 처리(점 길잡이 끄기, 흐르는 벽 멈춤, 장면 전환 단순화 등)는 간편 모드에서만 씁니다.
// 전체 애니메이션은 PC 버전을 그대로 반응형으로 보여 주고, 보이는 모습이 같은 안정화 처리(높이 계산·상세 창·메뉴)만 남깁니다.
export const LITE_FX = SIMPLE;
if (typeof document !== "undefined" && lite) document.documentElement.dataset.mode = FULL ? "full" : "simple";
