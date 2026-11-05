import Story from "./Story";
import WebApp from "./WebApp";
import Chapter from "./Chapter";
import { CHAPTERS } from "../data/story";

// PC 대표 프로젝트 장면 묶음 (히어로 → Talaria, 웹·앱, 웨딩, 신호등).
// 휴대폰·태블릿은 MobileFeatured만 쓰므로, 이 파일과 장면 코드는 휴대폰에서 아예 내려받지 않습니다. (main.jsx 참고)
export default function PCFeatured() {
  return (
    <>
      <div data-nav="project"><Story /></div>
      <div data-nav="project"><WebApp /></div>
      <div data-nav="project"><Chapter data={CHAPTERS.wedding} flip id="wedding" no={3} /></div>
      <div data-nav="project"><Chapter data={CHAPTERS.signal} id="signal" no={4} /></div>
    </>
  );
}
