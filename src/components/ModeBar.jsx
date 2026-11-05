import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaCompress, FaCheck, FaXmark } from "react-icons/fa6";
import { lite, FULL, isIOS } from "../lib/env";
import { goFull, goSimple, copyFullUrl, browserName } from "../lib/mode";

// 휴대폰·태블릿 화면 아래 안내 바: 지금 화면 버전을 알려 주고 다른 버전으로 바꿀 수 있게 합니다. (PC에는 없음)
//  · 간편 모드:   "간편 모드로 보고 있어요 / 전체 애니메이션 보기"
//  · 전체 버전:   "간단하게 훑어보고 싶다면 / 간편 모드로 보기"
//  · 앱 안 브라우저에서 바깥 브라우저로 못 넘어갔을 때: 여는 방법 안내 + 주소 복사
// 첫 화면(히어로) 근처에서만 보이고, 내려가면 숨어 내용을 가리지 않습니다.
// 닫기(✕)는 이번에 보는 동안만 숨기고, 새로 열면 다시 보입니다. (휴대폰은 항상 간편 모드로 시작하므로)
// 메뉴의 스위치가 "mode-request" 이벤트를 보내면 같은 동작을 합니다.
export default function ModeBar() {
  const [ready, setReady] = useState(false);
  const [closed, setClosed] = useState(false);
  const [near, setNear] = useState(true);
  const [state, setState] = useState("idle"); // idle | guide | copied

  // 인트로가 끝나고 히어로 문장이 다 올라온 뒤에 등장
  useEffect(() => {
    if (!lite) return;
    const on = () => setTimeout(() => setReady(true), 2000);
    if (window.__introDone) on(); else window.addEventListener("intro-done", on, { once: true });
    return () => window.removeEventListener("intro-done", on);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const on = () => setNear(window.scrollY < window.innerHeight * 0.9);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [ready]);

  const act = () => (FULL ? goSimple() : goFull(() => { setClosed(false); setState("guide"); }));

  useEffect(() => {
    const on = () => act();
    window.addEventListener("mode-request", on);
    return () => window.removeEventListener("mode-request", on);
  }, []);

  if (!lite) return null;
  // 안내(guide·copied) 중에는 스크롤 위치와 상관없이 보임
  const show = state !== "idle" ? !closed : ready && near && !closed;
  if (!show) return null;

  const close = () => { setClosed(true); setState("idle"); };
  const copy = async () => { if (await copyFullUrl()) setState("copied"); };

  let body;
  if (state === "copied") {
    body = (
      <div className="oib-go oib-ios">
        <FaCheck aria-hidden="true" />
        <span><b>주소를 복사했어요</b><small>{browserName}를 열고 주소창에 붙여넣어 주세요</small></span>
      </div>
    );
  } else if (state === "guide") {
    body = (
      <div className="oib-go oib-ios">
        <FaArrowUpRightFromSquare aria-hidden="true" />
        <span>
          <b>{browserName}에서 열면 볼 수 있어요</b>
          <small>{isIOS ? "화면 아래 메뉴 → Safari로 열기" : "화면의 메뉴 → 다른 브라우저로 열기"}</small>
          <button type="button" className="oib-copy" onClick={copy}>주소 복사</button>
        </span>
      </div>
    );
  } else if (FULL) {
    body = (
      <button type="button" className="oib-go" onClick={act}>
        <FaCompress aria-hidden="true" />
        <span><b>간단하게 훑어보고 싶다면</b><small>간편 모드로 보기</small></span>
      </button>
    );
  } else {
    body = (
      <button type="button" className="oib-go" onClick={act}>
        <FaArrowUpRightFromSquare aria-hidden="true" />
        <span><b>간편 모드로 보고 있어요</b><small>전체 애니메이션 보기</small></span>
      </button>
    );
  }

  return (
    <div className="oib" role="region" aria-label="화면 버전 안내" aria-live="polite">
      {body}
      <button type="button" className="oib-x" onClick={close} aria-label="안내 닫기"><FaXmark aria-hidden="true" /></button>
    </div>
  );
}
