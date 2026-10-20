import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import Navs from "./components/Navs";
import Home from "./pages/Home";
import Marquee from "./components/Marquee";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import CommentBoard from "./components/CommentBoard";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import Intro from "./components/Intro";
import Cursor from "./components/Cursor";
import FX from "./components/FX";
import Ribbons from "./components/Ribbons";

// 인트로(새로고침마다) → 인사 → 01 소개·교육·수상 → 02 프로젝트 → 03 기술 → 04 방명록 → 마무리
// main이 위로 걷히면서 아래에 깔린 Footer가 드러납니다.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <Cursor />
      <FX />
      <SmoothScroll />
      <Navs />
      <main className="relative z-10 rounded-b-[48px] bg-white">
        <Home />
        <Marquee />
        <About />
        <Ribbons />
        <Projects />
        <Skills />
        <CommentBoard />
      </main>
      <Footer />
      <Analytics />
    </MotionConfig>
  );
}
