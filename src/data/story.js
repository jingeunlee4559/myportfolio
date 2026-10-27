// 스토리텔링(히어로 → 대표 프로젝트) 장면에 쓰는 데이터.
// 문구는 projects.js · themes.js에 적힌 내용을 짧게 옮긴 것입니다. (없는 내용은 새로 쓰지 않습니다)
// idx 는 projects.js 순서 번호입니다.

// 히어로 뒤에 흐르는 프로젝트 화면 벽
export const WALL = [
  "w_project_tal1", "w_project_wd", "w_project_as11", "w_project_p1", "w_project_tal10", "w_camomile_main",
  "w_project_wd2", "w_project_as7", "w_project_tal12", "w_project_p3", "w_project_ssg1", "w_project_read7",
  "w_project_tal13", "w_project_as5", "w_project_wd3", "w_project_with2", "w_project_tal11", "w_project_p4",
  "w_project_as", "w_project_read8", "w_project_tal2", "w_camomile_screenshot1", "w_project_wd1", "w_project_ssg2",
  "w_project_tal9", "w_project_as8", "w_project_with3", "w_project_p2", "w_project_tal4", "w_project_wd4",
].map((f) => `/story/${f}.webp`);

// 노트북 화면이 바뀌는 대표 프로젝트 장면
export const CHAPTERS = {
  talaria: {
    idx: 7,
    name: "Talaria",
    video: "/story/talaria.mp4",
    poster: "/story/talaria_poster.jpg",
    title: ["자막·매너 체크·문서가", "한 화면에 모이는", "화상회의 UI"],
    steps: [
      { img: "/story/project_tal5.webp", title: "실시간 회의 화면", text: "상대가 말하면 번역된 말이 자막으로 뜹니다." },
      { img: "/story/project_tal3.webp", title: "회의 목록", text: "회의에 들어가기 전, 회의 자료를 미리 올릴 수 있습니다." },
      { img: "/story/project_tal6.webp", title: "회의 요약", text: "회의가 끝나면 정리된 요약을 한 화면에서 봅니다." },
    ],
  },
  wedding: {
    idx: 4,
    name: "웨딩플랜",
    video: "/story/wedding.mp4",
    poster: "/story/wedding_poster.jpg",
    title: ["유사도 분석으로", "맞춤 웨딩플랜을", "추천하는 서비스"],
    steps: [
      { img: "/story/project_wd7.webp", title: "단계별 입력 · 추천 결과", text: "조건을 세 단계로 나눠 고르고, 추천 결과를 봅니다." },
      { img: "/story/project_wd2.webp", title: "목록 · 상세 화면", text: "카테고리별 목록과 가격·사진·지도 위치를 보여줍니다." },
      { img: "/story/project_wd1.webp", title: "캘린더 · 날씨", text: "달력에 내 일정을 보여주고, 날씨도 함께 표시합니다." },
    ],
  },
  // 영상이 없는 프로젝트는 첫 화면 사진부터 보여줍니다.
  signal: {
    idx: 1,
    name: "AI 신호등",
    title: ["객체인식 AI 신호등을", "한 화면에서 관리하는", "관제 웹"],
    steps: [
      { img: "/story/project_ssg1.webp", title: "신호등 지도 화면", text: "설치된 신호등 위치를 지도 위 핀으로 보여주고, 문제가 생긴 신호등은 이상 내역까지 확인합니다." },
      { img: "/story/project_ssg2.webp", title: "비교 그래프 화면", text: "일반 신호등과 AI 신호등의 차량 통행량·사고 발생률을 그래프로 비교합니다." },
      { img: "/story/project_ssg3.webp", title: "목록 화면", text: "지역별 관할서와 이상 내역을 표로 정리해 한눈에 봅니다." },
    ],
  },
};

// 대표 프로젝트 순서 (최신순): 장면 위 "PROJECT 0n / 04" 번호에 씁니다.
export const FEATURED = 4;

// 웹 ▮ 앱 장면 (YOLO)
export const WEBAPP = {
  idx: 5,
  label: "YOLOv11 실시간 흉기 소지자 알림",
  title: "감지 즉시, 웹과 앱으로",
  web: { img: "/story/project_as11.webp", alt: "관리자 웹 CCTV 흉기 감지 알림 화면", title: "관리자 웹", text: "흉기가 감지되면 CCTV 화면 위에 감지 사진과 함께 알림 창이 바로 뜹니다." },
  app: [
    { img: "/story/project_as_app_popup.webp", alt: "모바일 앱 실시간 알림 창", title: "모바일 앱", text: "휴대폰으로 푸시 알림이 가고, 감지 사진·위치·시각이 담긴 알림 창이 뜹니다." },
    { img: "/story/project_as_app_alerts.webp", alt: "모바일 앱 알림 목록", title: "모바일 앱", text: "감지 알림을 사진·주소·시간과 함께 목록으로 보고, 읽지 않은 알림은 따로 표시합니다." },
  ],
};

// 그 밖의 프로젝트 (최신순). short: 접힌 띠에 보이는 짧은 이름
export const MORE = [
  { idx: 6, img: "/story/project_p1.webp", short: "P들의 여행" },
  { idx: 3, img: "/story/project_read.webp", short: "ReadFit" },
  { idx: 2, img: "/story/project_with2.webp", short: "여행 동행자" },
  { idx: 0, img: "/story/camomile_main.webp", short: "카모마일" },
];

// 상세 창의 이전/다음 순서 (화면에 나오는 순서)
export const ORDER = [7, 5, 4, 1, 6, 3, 2, 0];

// "2022 실전프로젝트 왕중왕전 대상 · 최우수상" → "대상"처럼 짧게
export const shortAward = (a) => (a ? [...new Set(a.match(/대상|최우수상|우수상/g))][0] ?? a : null);
