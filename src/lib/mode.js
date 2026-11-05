import { inApp, isKakao, isLine, isAndroid, isIOS } from "./env";

// 화면 버전(간편 모드 ↔ 전체 애니메이션) 전환.
// 안내 바(ModeBar)와 메뉴의 스위치(MobileMenu)가 함께 씁니다.

// 전체 애니메이션 버전 주소: 지금 주소에 ?full=1 을 붙임 (#해시는 그대로)
export function fullUrl() {
  const u = new URL(location.href);
  u.searchParams.set("full", "1");
  return u.toString();
}
// 간편 모드 주소: ?full=1 을 뺌
export function simpleUrl() {
  const u = new URL(location.href);
  u.searchParams.delete("full");
  return u.toString();
}

export const goSimple = () => { location.href = simpleUrl(); };

// 전체 애니메이션으로 가기.
//  · 일반 브라우저(삼성 인터넷·크롬·사파리): 그 자리에서 ?full=1 로 다시 열기
//  · 카톡: 카톡이 제공하는 "바깥 브라우저로 열기" 주소로 기본 브라우저(안드로이드)·사파리(아이폰)에서 열기
//  · 라인: 주소에 openExternalBrowser=1 을 붙이면 바깥 브라우저로 열림
//  · 그 밖의 앱(안드로이드): 안드로이드의 "링크 열기"(intent)로 기본 브라우저 열기 시도
//  · 그 밖의 앱(아이폰): 바깥으로 여는 공식 방법이 없어 바로 안내
// 앱 안 브라우저 안에서는 전체 버전으로 바꾸지 않습니다. 1.5초 안에 다른 앱으로 넘어가지 않으면 onFail()을 부릅니다.
export function goFull(onFail) {
  const target = fullUrl();
  if (!inApp) { location.href = target; return; }

  let url = null;
  if (isKakao) url = `kakaotalk://web/openExternal?url=${encodeURIComponent(target)}`;
  else if (isLine) { const u = new URL(target); u.searchParams.set("openExternalBrowser", "1"); url = u.toString(); }
  else if (isAndroid) { const u = new URL(target); url = `intent://${u.host}${u.pathname}${u.search}${u.hash}#Intent;scheme=${u.protocol.replace(":", "")};action=android.intent.action.VIEW;end`; }
  if (!url) { onFail?.(); return; }

  // 다른 앱으로 넘어가면 이 화면이 가려지므로(visibilitychange) 안내를 띄우지 않음
  let left = false;
  const away = () => { if (document.visibilityState === "hidden") left = true; };
  document.addEventListener("visibilitychange", away);
  window.addEventListener("pagehide", away);
  setTimeout(() => {
    document.removeEventListener("visibilitychange", away);
    window.removeEventListener("pagehide", away);
    if (!left) onFail?.();
  }, 1500);
  location.href = url;
}

// 주소 복사 (클립보드를 못 쓰는 환경이면 예전 방식으로)
export async function copyFullUrl() {
  const text = fullUrl();
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    try {
      const t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;top:-100px;opacity:0";
      document.body.appendChild(t); t.select(); t.setSelectionRange(0, text.length);
      const ok = document.execCommand("copy"); t.remove(); return ok;
    } catch { return false; }
  }
}

export const browserName = isIOS ? "Safari" : "브라우저";
