// 이름·연락처·소개·교육·수상은 모두 이 파일 한 곳에서 관리합니다.
// EMAIL을 채우면 이메일 버튼이 자동으로 나타납니다.
export const PROFILE = {
  name: "이진근",
  nameEn: "Jingeun Lee",
  role: "Web Developer",
  github: "https://github.com/jingeunlee4559",
  githubPortfolio: "https://github.com/jingeunlee4559/portfolio", // 메뉴바·히어로·푸터의 GitHub 버튼
  email: "wlsrms4559@gmail.com",
  resume: "", // 이력서 PDF를 public/ 에 넣고 경로를 적으면 "이력서 보기" 버튼이 생깁니다. 예: "/resume.pdf"
};

// 소개 글
// lead(큰 문장)는 마음에 드는 문장으로 바꾸면 됩니다. \n 을 넣으면 그 자리에서 줄이 바뀝니다.
export const INTRO = {
  lead: "전기공학에서 시작해,\n개발자의 길로 들어섰습니다.", // \n 은 줄바꿈
  body: [
    "조선대학교에서 전기공학을 전공했고, 2022년 빅데이터 융합서비스개발자 과정에서 웹 개발을 처음 배웠습니다.",
    "이 과정을 포함해 네 개의 교육과정에서 팀 프로젝트 8개를 만들며 React로 지도·차트·실시간 화면을, Spring Boot와 Node.js로 로그인·REST API·WebSocket 알림을 구현했습니다.",
    "가장 최근 Talaria에서는 3인 팀의 프론트엔드를 전담해 실시간 번역 화상회의 화면을 완성했습니다.",
  ],
};

// 교육 (시간순: 오래된 것 → 최근)
export const EDUCATION = [
  { period: "2012.02 – 2018.02", title: "조선대학교 전기공학과", tag: "전공", desc: "전기공학 학사 과정을 마쳤습니다." },
  { period: "2022.08 – 2023.03", title: "빅데이터 융합서비스개발자 과정", tag: "교육과정", desc: "카페 예약 서비스와 AI 신호등 관리자 웹을 팀으로 만들어, 왕중왕전 대상을 포함해 상 3개를 받았습니다.", awards: ["2022 실전프로젝트 왕중왕전 대상", "2022 실전프로젝트 최우수상", "2022 핵심프로젝트 우수상"] },
  { period: "2023.09 – 2024.04", title: "언어지능기반 분석 서비스모델 개발자 과정", tag: "교육과정", desc: "여행 동행자 추천 서비스와 신발 리뷰 분석 서비스 ReadFit을 만들었습니다." },
  { period: "2024.05 – 2024.11", title: "앱기반인공지능(풀스택) 과정", tag: "교육과정", desc: "웨딩플랜 서비스에서 화면·API·FastAPI 추천 연동을 맡아 최우수상을 받았고, YOLOv11 흉기 소지자 알림 서비스를 만들었습니다.", awards: ["2024 핵심프로젝트 최우수상"] },
  { period: "2025.06 – 2025.12", title: "AI서비스개발자 과정", tag: "교육과정", desc: "AI 여행지 추천 서비스와 Talaria를 만들었고, Talaria로 우수상을 받았습니다.", awards: ["2025 실전프로젝트 우수상"] },
];

// 소개의 "학력·교육" 목록 순서: "desc" = 최근 것부터(이력서처럼), "asc" = 오래된 것부터
export const EDU_ORDER = "desc";

// 수상 5회 (등수 → 최신 순). place: 실제 등수(1등/2등). idx: 상을 받은 프로젝트 (projects.js 순서 번호, 각 프로젝트의 award 항목 기준)
export const AWARDS = [
  { year: "2022", rank: "대상", place: 1, title: "실전프로젝트 왕중왕전", from: "빅데이터 융합서비스개발자 과정", idx: 1 },
  { year: "2022", rank: "최우수상", place: 1, title: "실전프로젝트", from: "빅데이터 융합서비스개발자 과정", idx: 1 },
  { year: "2024", rank: "최우수상", place: 2, title: "핵심프로젝트", from: "앱기반인공지능(풀스택) 과정", idx: 4 },
  { year: "2025", rank: "우수상", place: 2, title: "실전프로젝트", from: "AI서비스개발자 과정", idx: 7 },
  { year: "2022", rank: "우수상", place: 2, title: "핵심프로젝트", from: "빅데이터 융합서비스개발자 과정", idx: 0 },
];
