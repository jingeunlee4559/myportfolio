import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { isKakao, isAndroid } from "../lib/env";

// 카카오톡 안 브라우저 안내.
// 카톡 안 브라우저는 앱 안에 끼워 넣은 브라우저라 성능이 제한되고, 스크롤할 때 위아래 막대가 접혔다 펴지며
// 화면 높이가 계속 바뀌어 다른 브라우저보다 버벅이기 쉽습니다.
// 그래서 카톡으로 열었을 때만 화면 아래에 작은 "브라우저로 열기" 안내를 띄웁니다. (강제로 옮기지 않음)
//  · 안드로이드: 누르면 카톡이 제공하는 주소(kakaotalk://web/openExternal)로 기본 브라우저(삼성 인터넷·크롬)에서 바로 열림
//  · 아이폰: 카톡이 이 기능을 막아 두어, 오른쪽 아래 메뉴에서 여는 방법을 글로 안내
// 닫기를 누르면 이 기기에서는 다시 띄우지 않습니다.
const KEY = "oib-closed";

export default function OpenInBrowser() {
  const [show, setShow] = useState(false);
  // 내용을 가리지 않도록, 페이지 맨 위(히어로) 근처에 있을 때만 보입니다.
  const [near, setNear] = useState(true);
  useEffect(() => {
    if (!show) return;
    const on = () => setNear(window.scrollY < window.innerHeight * 0.9);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [show]);

  useEffect(() => {
    if (!isKakao) return;
    let closed = false;
    try { closed = localStorage.getItem(KEY) === "1"; } catch { /* 저장 불가 환경 */ }
    if (closed) return;
    // 인트로가 끝나고 히어로 문장이 다 올라온 뒤에 조용히 등장
    const on = () => setTimeout(() => setShow(true), 2200);
    if (window.__introDone) on(); else window.addEventListener("intro-done", on, { once: true });
    return () => window.removeEventListener("intro-done", on);
  }, []);

  if (!show || !near) return null;
  const close = () => { setShow(false); try { localStorage.setItem(KEY, "1"); } catch { /* 저장 불가 환경 */ } };
  const open = () => { location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(location.href)}`; };

  return (
    <div className="oib" role="region" aria-label="브라우저로 열기 안내">
      {isAndroid ? (
        <button type="button" className="oib-go" onClick={open}>
          <FaArrowUpRightFromSquare aria-hidden="true" />
          <span><b>브라우저로 열면 더 부드러워요</b><small>삼성 인터넷·크롬에서 열기</small></span>
        </button>
      ) : (
        <p className="oib-go oib-ios">
          <FaArrowUpRightFromSquare aria-hidden="true" />
          <span><b>브라우저로 열면 더 부드러워요</b><small>화면의 ⋯ 메뉴 → 다른 브라우저로 열기</small></span>
        </p>
      )}
      <button type="button" className="oib-x" onClick={close} aria-label="안내 닫기"><FaXmark aria-hidden="true" /></button>
    </div>
  );
}
