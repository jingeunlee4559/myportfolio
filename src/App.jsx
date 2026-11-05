import { lazy, Suspense } from "react";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import Navs from "./components/Navs";
import Intro from "./components/Intro";
import MoreProjects from "./pages/MoreProjects";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ModalHost from "./components/ModalHost";
import Guide from "./components/Guide";
import Cursor from "./components/Cursor";

// 방명록은 Firebase를 쓰므로 필요할 때 따로 불러옵니다. (첫 화면 JS 크기 줄이기)
const CommentBoard = lazy(() => import("./components/CommentBoard"));

// 인트로 → 히어로(프로젝트 화면 벽) → 대표 프로젝트 4개(최신순: Talaria → YOLO → 웨딩플랜 → AI 신호등) → 그 밖의 프로젝트
// → 02 소개 → 03 기술(밤하늘) → 04 방명록 → 마무리. 히어로의 파란 마침표(Guide)가 이 모든 장면을 따라 내려갑니다. main이 위로 걷히면서 아래에 깔린 Footer가 드러납니다.
export default function App({ Featured }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Intro />
      <Navs />
      <main className="page-bg relative z-10 rounded-b-[48px]">
        {/* 대표 프로젝트: 휴대폰·태블릿은 MobileFeatured, PC는 PCFeatured (main.jsx에서 기기에 맞는 쪽만 불러와 넘겨 줌) */}
        <Featured />
        <div data-nav="project"><MoreProjects /></div>
        <div data-nav="about"><About /></div>
        <div data-nav="skill"><Skills /></div>
        <Suspense fallback={<div id="board" className="min-h-[60vh]" />}>
          <div data-nav="board"><CommentBoard /></div>
        </Suspense>
      </main>
      <Footer />
      <ModalHost />
      <Guide />
      <Cursor />
      <Analytics />
    </MotionConfig>
  );
}
