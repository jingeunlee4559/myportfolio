import js from "../assets/skills/js.png";
import html from "../assets/skills/html.png";
import css from "../assets/skills/css.png";
import java from "../assets/skills/java.webp";
import python from "../assets/skills/python.webp";
import react from "../assets/skills/react.png";
import vite from "../assets/skills/vite.jpg";
import TailwindCSS from "../assets/skills/Tailwind CSS.png";
import Spring from "../assets/skills/Spring.png";
import egove from "../assets/skills/egove.png";
import MySQL from "../assets/skills/MySQL.png";
import OracleDB from "../assets/skills/Oracle DB.jpg";
import Github from "../assets/skills/Github.jpg";
import Notion from "../assets/skills/Notion.png";
import Figma from "../assets/skills/Figma.png";
import nodejs from "../assets/skills/nodejs.png";
import { SiFastapi, SiFlutter } from "react-icons/si";

// 아이콘은 이미지 경로(문자열) 또는 react-icons 컴포넌트 [컴포넌트, 색] 둘 다 됩니다.
export const layers = [
  { name: "Frontend", note: "컴포넌트 기반 화면, 반응형 레이아웃, 지도·차트·실시간 UI",
    items: [["React", react], ["JavaScript", js], ["Vite", vite], ["Tailwind CSS", TailwindCSS], ["HTML", html], ["CSS", css], ["Flutter", [SiFlutter, "#02569B"]]] },
  { name: "Backend", note: "REST API, 세션 인증, WebSocket 알림, 외부 API와 AI 모델 연동",
    items: [["Spring Boot", Spring], ["Java", java], ["Node.js", nodejs], ["Python", python], ["FastAPI", [SiFastapi, "#009688"]], ["전자정부프레임워크", egove]] },
  { name: "Database", note: "스키마 설계와 쿼리 작성",
    items: [["MySQL", MySQL], ["Oracle", OracleDB]] },
  { name: "협업·도구", note: "형상 관리, 문서화, 화면 설계",
    items: [["GitHub", Github], ["Notion", Notion], ["Figma", Figma]] },
];

// 히어로 아래 흐르는 띠에 쓰는 대표 기술
export const marquee = [
  ["React", react], ["Spring Boot", Spring], ["Node.js", nodejs], ["Python", python], ["Tailwind CSS", TailwindCSS],
  ["JavaScript", js], ["Java", java], ["MySQL", MySQL], ["Oracle", OracleDB], ["Vite", vite], ["GitHub", Github], ["Figma", Figma],
];
