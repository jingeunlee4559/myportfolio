import { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "../data/projects";
import { ORDER } from "../data/story";
import { lenisRef } from "../lib/gsap";

// 어느 장면에서든 "open-project" 이벤트를 보내면 프로젝트 상세 창이 열립니다.
// 상세 창은 처음 열 때 불러옵니다. (첫 화면 JS 크기 줄이기)
const ProjectModal = lazy(() => import("./Projects/ProjectModal"));
const ROLE = projects.map((p) => p.details.roleShort);

export default function ModalHost() {
  const [open, setOpen] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const on = (e) => { setLoaded(true); setOpen(e.detail); };
    window.addEventListener("open-project", on);
    return () => window.removeEventListener("open-project", on);
  }, []);
  // 상세 창이 열려 있는 동안 뒤 페이지가 움직이지 않게
  useEffect(() => { if (open == null) lenisRef.current?.start(); else lenisRef.current?.stop(); }, [open]);
  if (!loaded) return null;
  return createPortal(<Suspense fallback={null}><ProjectModal index={open} onClose={() => setOpen(null)} onChange={setOpen} order={ORDER} roles={ROLE} /></Suspense>, document.body);
}
