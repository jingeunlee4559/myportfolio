import { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "../data/projects";
import { ORDER } from "../data/story";
import { lenisRef } from "../lib/gsap";

// 어느 장면에서든 "open-project" 이벤트를 보내면 프로젝트 상세 창이 열립니다.
// 상세 창은 처음 열 때 불러옵니다. (첫 화면 JS 크기 줄이기)
// 받기에 실패하면(일시적 네트워크 끊김, 또는 새로 배포되어 옛 파일 이름이 사라진 경우) 한 번 더 시도하고,
// 그래도 안 되면 페이지를 한 번만 새로고침해 최신 파일을 받습니다. (그냥 두면 화면 전체가 하얗게 멈춤)
const loadModal = () => import("./Projects/ProjectModal")
  .catch(() => new Promise((r) => setTimeout(r, 800)).then(() => import("./Projects/ProjectModal")))
  .then((m) => { try { sessionStorage.removeItem("pm-reload"); } catch { /* 저장 불가 환경 */ } return m; })
  .catch((e) => {
    let reloaded = false;
    try { reloaded = !!sessionStorage.getItem("pm-reload"); if (!reloaded) sessionStorage.setItem("pm-reload", "1"); } catch { /* 저장 불가 환경 */ }
    if (!reloaded) location.reload();
    throw e;
  });
const ProjectModal = lazy(loadModal);

// 휴대폰에서는 스크롤 장면의 영상·이미지가 한꺼번에 내려받아지는 중이라, "자세히 보기"를 처음 눌렀을 때
// 상세 창 코드를 그제서야 받으면 몇 초씩 아무 반응이 없을 수 있습니다.
// 그래서 인트로가 끝나고 브라우저가 한가할 때 상세 창 코드를 미리 받아 둡니다.
function preloadModal() {
  // 미리 받기는 실패해도 조용히 넘어갑니다. (새로고침은 실제로 눌렀을 때만)
  const go = () => import("./Projects/ProjectModal").catch(() => {});
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
  const start = () => idle(go, { timeout: 3000 });
  if (window.__introDone) start(); else window.addEventListener("intro-done", start, { once: true });
}

// 코드를 받는 동안에도 누른 즉시 반응이 보이도록, 어두운 배경과 로딩 표시를 먼저 띄웁니다.
const Loading = () => (
  <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/40 modal-bd" role="status" aria-label="불러오는 중">
    <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/40 border-t-white" />
  </div>
);
const ROLE = projects.map((p) => p.details.roleShort);

export default function ModalHost() {
  const [open, setOpen] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const on = (e) => { setLoaded(true); setOpen(e.detail); };
    window.addEventListener("open-project", on);
    preloadModal();
    return () => window.removeEventListener("open-project", on);
  }, []);
  // 상세 창이 열려 있는 동안 뒤 페이지가 움직이지 않게
  useEffect(() => { if (open == null) lenisRef.current?.start(); else lenisRef.current?.stop(); }, [open]);
  if (!loaded) return null;
  return createPortal(<Suspense fallback={open == null ? null : <Loading />}><ProjectModal index={open} onClose={() => setOpen(null)} onChange={setOpen} order={ORDER} roles={ROLE} /></Suspense>, document.body);
}
