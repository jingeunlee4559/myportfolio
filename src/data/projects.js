// 프로젝트 데이터. 내용은 포트폴리오 PDF(이진근_개발자_포트폴리오 / 이진근_포트폴리오)에 적힌 것만 사용합니다.
// ※ 측정하지 않은 성능 개선·비용 절감 수치는 적지 않습니다. 결과는 "무엇을 구현했고 어디서 확인되는지"만 씁니다.
//
// details 필드 설명
//  roleShort   : 목록에 보이는 짧은 역할
//  roleSummary : 모달 '내 역할' 한 줄 설명
//  contribution: 포트폴리오에 적은 기여도 (없으면 null)
//  award       : 수상 기록 (없으면 null)
//  myWork      : [{ heading, points[] }]            내가 직접 담당한 기능
//  problems    : [{ title, situation, cause, solution, result[], lesson }]  구현 중 문제와 해결 (기록이 있는 프로젝트만)
//  techReasons : [{ tech, reason }]                 기술을 선택한 이유 (포트폴리오에 적은 것만)
//  results     : [{ text, basis }]                  구현 결과와 확인 근거
//  **굵게** 표시는 모달에서 강조됩니다.

export const projects = [
  /* 0 ─ 카모마일 */
  {
    title: "카페 좌석 예약 웹 서비스 플랫폼",
    subtitle: "광주 동네카페 좌석 예약과 음료 주문을 웹에서 간편하게!",
    tags: ["디자인", "FE", "웹", "팀"],
    image: "/project-images/camomile_main.png",
    type: "camomile",
    details: {
      modalTitle: "카모마일 (Camomile)",
      subtitle: "동네카페 좌석 예약과 음료 주문을 한 번에 해결하는 통합 예약 서비스",
      period: "2022.10 - 2022.11 (3주)",
      members: "4인 개발",
      roleShort: "Frontend (로그인, 지도)",
      roleSummary: "로그인 화면과 카카오맵 지도 화면을 React로 구현했습니다.",
      contribution: null,
      award: "2022 핵심프로젝트 우수상",
      modalImages: [
        "/project-images/camomile_screenshot1.png",
        "/project-images/camomile_screenshot2.png",
        "/project-images/camomile_screenshot3.png",
      ],
      urls: { githubURL: "https://github.com/2022-SMHRD-SW-BigData-1/Camomile", serviceURL: null, blogURL: null },
      overview:
        "광주 지역 동네 카페의 좌석을 웹에서 예약하고 음료도 미리 주문할 수 있게 만든 서비스입니다. 지도에서 카페 위치까지 확인할 수 있습니다. 저는 팀 프로젝트 중 로그인 화면과 지도 화면을 맡았습니다.",
      myWork: [
        { heading: "로그인 페이지", points: ["아이디·패스워드 입력과 로그인 상태 유지 선택이 가능한 로그인 화면을 구현했습니다."] },
        { heading: "카카오맵 지도 페이지", points: ["KakaoMap API로 광주 지역 카페 위치를 마커로 표시했습니다.", "마커를 누르면 커스텀 오버레이로 각 카페의 상세 정보가 보이도록 만들었습니다."] },
        { heading: "반응형 웹 (React)", points: ["React로 화면을 구성해 화면 크기에 맞게 보이도록 구현했습니다."] },
      ],
      problems: [], // TODO: 이 프로젝트에서 겪은 문제와 해결 과정을 적으면 모달에 자동으로 표시됩니다.
      techReasons: [], // TODO: 기술을 고른 이유를 적으면 자동으로 표시됩니다.
      results: [
        { text: "카페 위치를 지도 마커로 확인하고, 마커를 눌러 상세 정보를 보는 **지도 화면**을 구현했습니다.", basis: "화면 캡처" },
        { text: "로그인 화면을 구현했습니다.", basis: "화면 캡처" },
        { text: "교육과정 프로젝트 평가에서 **2022 핵심프로젝트 우수상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "JavaScript", "Node.js", "MySQL", "KakaoMap API", "Notion", "Slack"],
    },
  },

  /* 1 ─ AI 신호등 */
  {
    title: "머신러닝 기반 AI 신호등 관리자 웹 서비스 플랫폼",
    subtitle: "객체인식 기반 AI 신호등을 한 화면에서 관리하는 관제 웹",
    tags: ["디자인", "FE", "웹", "팀"],
    image: "/project-images/project_ssg1.png",
    type: "generic",
    details: {
      modalTitle: "머신러닝 기반 AI 신호등 관리자 웹 서비스 플랫폼",
      subtitle: "객체인식 기반 지능형 교통제어 시스템과 이를 관리하는 관리자 웹",
      period: "2023.01 - 2023.02 (5주)",
      members: "5인 개발",
      roleShort: "Frontend (로그인, 지도, 차트, 목록)",
      roleSummary: "관리자 웹의 로그인·지도·차트·목록 화면을 React로 구현했습니다. (객체인식 모델은 팀원 담당)",
      contribution: null,
      award: "2022 실전프로젝트 왕중왕전 대상 · 최우수상",
      modalImages: ["/project-images/project_ssg1.png", "/project-images/project_ssg2.png", "/project-images/project_ssg3.png"],
      urls: { githubURL: "https://github.com/2022-SMHRD-SW-BigData-1/SSG", serviceURL: null, blogURL: null },
      overview:
        "도서·벽지처럼 사고 형태가 다양한 지역에서 보행자·차량·농기계 등을 객체인식해, 운전자가 과속하기 쉬운 구간을 제어하는 머신러닝 기반 지능형 교통제어 시스템과 이를 관리하는 관리자 웹입니다. 저는 그중 관리자 웹 화면을 맡았습니다.",
      myWork: [
        { heading: "카카오맵 메인 페이지", points: ["설치된 AI 신호등 위치를 지도 마커로 표시했습니다.", "마커를 누르면 가까운 관할서와 지역, 이상이 생겼을 때는 **이상 내역**이 보이도록 만들었습니다.", "AI 모드 전원을 ON/OFF 하는 기능을 구현했습니다."] },
        { heading: "차트 페이지", points: ["Chart.js로 일반 신호등과 AI 신호등의 **차량 통행량·사고 발생률**을 비교해 볼 수 있는 화면을 구현했습니다."] },
        { heading: "그리드 페이지", points: ["지역의 관할서와 이상 내역을 react-table로 목록화했습니다."] },
        { heading: "로그인 페이지 · 반응형 웹", points: ["로그인 화면을 구현하고, Figma로 설계한 화면을 React로 반응형 구현했습니다."] },
      ],
      problems: [], // TODO
      techReasons: [], // TODO
      results: [
        { text: "AI 신호등 위치·이상 내역·관할서 정보를 **지도 한 화면**에서 확인하는 관리자 웹을 구현했습니다.", basis: "화면 캡처" },
        { text: "신호등과 AI 신호등의 통행량·사고율을 **Chart.js 비교 차트**로 볼 수 있게 했습니다. (화면의 수치는 시연용 데이터이며, 실제 개선 효과를 측정한 것이 아닙니다.)", basis: "화면 캡처" },
        { text: "교육과정 프로젝트 평가에서 **2022 실전프로젝트 최우수상**, **왕중왕전 대상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "JavaScript", "Chart.js", "react-table", "KakaoMap API", "Node.js", "MySQL", "Figma"],
    },
  },

  /* 2 ─ 여행 동행자 */
  {
    title: "사용자 성향 기반 여행 동행자 추천 서비스 플랫폼",
    subtitle: "혼행족을 위한 맞춤 여행 동행자 추천",
    tags: ["FE", "웹", "팀", "디자인"],
    image: "/project-images/project_with1.png",
    type: "generic",
    details: {
      modalTitle: "여행 동행자 추천 서비스",
      subtitle: "사용자 성향 조사 데이터를 활용한 혼행족 동행자 매칭 플랫폼",
      period: "2023.12 - 2024.01 (5주)",
      members: "4인 개발",
      roleShort: "Frontend (로그인, 메인, 지도, 리뷰)",
      roleSummary: "로그인·메인·지도·리뷰 화면을 JSP 기반으로 구현했습니다.",
      contribution: null,
      award: null,
      modalImages: ["/project-images/project_with1.png", "/project-images/project_with2.png", "/project-images/project_with3.png", "/project-images/project_with4.png"],
      urls: { githubURL: "https://github.com/2023-SMHRD-IS-AI1/WithusRepo", serviceURL: null, blogURL: null },
      videoURL: "/video/withus.mp4",
      overview:
        "성향·생활 스타일·교통수단 등 세분화된 질문에 답하면, 나와 비슷한 여행 동행자를 추천하고 매칭해 주는 Spring 기반 서비스입니다. 저는 로그인·메인·지도·리뷰 화면을 맡았습니다.",
      myWork: [
        { heading: "로그인 페이지", points: ["JSP·JavaScript로 로그인 화면을 구현했습니다."] },
        { heading: "메인 페이지", points: ["머신러닝 빈도 분석 결과를 활용한 **베스트 지역 이미지 슬라이더**를 구현했습니다."] },
        { heading: "지도 페이지", points: ["지역별 맛집 위치를 지도에 표시하고, 커스텀 오버레이로 맛집 상세 정보를 보여주도록 구현했습니다. (KakaoMap API)"] },
        { heading: "리뷰 페이지", points: ["사용자가 작성한 리뷰를 보여주는 페이지를 구현했습니다."] },
      ],
      problems: [], // TODO
      techReasons: [], // TODO
      results: [
        { text: "베스트 지역 슬라이더, 지역별 맛집 지도, 리뷰 목록까지 **서비스 핵심 화면 4개**를 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "맛집 위치와 상세 정보를 지도 오버레이로 바로 확인할 수 있게 했습니다.", basis: "화면 캡처" },
      ],
      techStack: ["Spring", "Java", "JSP", "JavaScript", "MySQL", "Python", "Maven", "KakaoMap API", "FullCalendar API", "Figma"],
    },
  },

  /* 3 ─ ReadFit */
  {
    title: "신발 리뷰 분석 서비스",
    subtitle: "리뷰 텍스트 분석으로 인기 신발 랭킹 제공",
    tags: ["FE", "BE", "디자인", "웹", "팀"],
    image: "/project-images/project_read.png",
    type: "generic",
    details: {
      modalTitle: "ReadFit · 신발 리뷰 분석 서비스",
      subtitle: "자연어처리 기반 2030 남성 대상 신발 리뷰 분석 플랫폼",
      period: "2024.03 - 2024.04 (5주)",
      members: "5인 개발",
      roleShort: "Frontend, Backend, UI/UX",
      roleSummary: "분석 결과를 보여주는 React 화면 전반과 UI/UX 디자인, 시각화용 데이터 API를 맡았습니다.",
      contribution: "70%",
      award: null,
      modalImages: [
        "/project-images/project_read.png", "/project-images/project_read1.png", "/project-images/project_read2.png",
        "/project-images/project_read3.png", "/project-images/project_read4.png", "/project-images/project_read5.png",
        "/project-images/project_read6.png", "/project-images/project_read7.png", "/project-images/project_read8.png",
      ],
      urls: { githubURL: "https://github.com/illhanunjung/ReadFit-frontend", githubLinks: [{ label: "Frontend", url: "https://github.com/illhanunjung/ReadFit-frontend" }, { label: "Backend", url: "https://github.com/illhanunjung/ReadFit" }], serviceURL: null, blogURL: null },
      videoURL: "/video/readfit.mp4",
      overview:
        "리뷰를 하나씩 읽지 않아도 감성·키워드·특징을 한눈에 볼 수 있도록, 신발 리뷰를 자연어처리로 분석해 차트와 랭킹으로 보여주는 플랫폼입니다. KcELECTRA와 KoELECTRA NER 모델로 리뷰를 분석합니다.",
      myWork: [
        { heading: "웰컴·메인·카테고리 화면", points: ["웰컴, 메인, 카테고리, 카테고리 상세 페이지를 구현했습니다.", "메인에는 카테고리별 **관심상품 TOP3**와 **TOP10**을 보여줍니다."] },
        { heading: "리뷰 분석 시각화", points: ["카테고리별 키워드 랭킹을 Chart.js 차트로 구현했습니다.", "상품별 전체 키워드와 키워드별 긍정/부정 분석, 키워드별 리뷰 요약, 리뷰 하이라이팅, 상품 상세 정보를 보여주는 화면을 구현했습니다."] },
        { heading: "챗봇·커뮤니티·회원 기능", points: ["입력한 문장으로 운동화를 찾아주는 챗봇 화면을 구현했습니다.", "커뮤니티와 상세, 로그인, 회원가입 페이지를 구현했습니다.", "로그인한 사용자가 관심상품을 추가할 수 있게 했습니다."] },
        { heading: "시각화용 데이터 API (Spring Boot)", points: ["분석 결과를 시각화에 맞게 **백엔드에서 가공해** React로 전달하는 구조를 만들었습니다."] },
        { heading: "UI/UX 디자인", points: ["Figma로 화면을 설계하고 React로 반응형 구현했습니다."] },
      ],
      problems: [
        {
          title: "axios로 보낸 데이터가 시각화에 쓰이지 못한 문제",
          situation: "React에서 axios로 데이터를 전달하는 과정에서 데이터가 제대로 전송되지 않아, 시각화 자료를 만드는 데 어려움을 겪었습니다.",
          cause: "axios 요청/응답 구조가 맞지 않았고, 데이터 형식 변환 문제와 시각화를 위한 데이터 가공이 부족했습니다.",
          solution: "데이터가 올바르게 전송되는 다른 페이지를 거쳐 전달되도록 하고, **백엔드에서 데이터를 가공해 React로 전달**하는 방식으로 구조를 바꿨습니다.",
          result: ["데이터 전송 구조가 안정화되었습니다.", "백엔드에서 가공하면서 프론트엔드 부담이 줄었습니다.", "시각화 컴포넌트가 정상 동작했습니다."],
          lesson: "프론트와 백엔드 사이의 데이터 흐름을 설계할 때 각 레이어의 역할을 나누고, 적절한 가공은 백엔드에서 하는 것이 안정성과 유지보수에 중요하다는 점을 배웠습니다.",
        },
      ],
      techReasons: [
        { tech: "Chart.js", reason: "분석 결과를 명확하게 시각화하기에 적합했습니다." },
        { tech: "React", reason: "데이터 상태에 따라 달라지는 동적 UI를 구성하기에 유리했습니다." },
        { tech: "Python NLP", reason: "리뷰 텍스트 분석 처리에 적합했습니다. (팀 기술 선택)" },
      ],
      results: [
        { text: "리뷰 분석 결과를 **키워드 랭킹 차트, 긍정/부정 분석, 리뷰 하이라이팅**으로 볼 수 있는 화면을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "챗봇, 카테고리 TOP3/TOP10, 관심상품 추가까지 **탐색 기능**을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "axios 데이터 전송 문제를 **백엔드 데이터 가공 구조**로 바꿔 시각화 컴포넌트가 정상 동작하게 했습니다.", basis: "트러블슈팅 기록" },
      ],
      techStack: ["React", "Chart.js", "Spring Boot", "Java", "Python", "KcELECTRA", "KoELECTRA NER", "Figma"],
    },
  },

  /* 4 ─ 웨딩플랜 */
  {
    title: "유사도 분석 기반 개인 맞춤형 웨딩플랜 서비스",
    subtitle: "웨딩홀, 스드메 등 맞춤 웨딩플랜 추천",
    tags: ["FE", "디자인", "BE", "웹", "팀"],
    image: "/project-images/project_wd.png",
    type: "generic",
    details: {
      modalTitle: "웨딩플랜 서비스",
      subtitle: "유사도 분석을 활용한 맞춤 웨딩플랜 추천 플랫폼",
      period: "2024.07 - 2024.08 (4주)",
      members: "5인 개발",
      roleShort: "UI/UX, Frontend, Backend API, FastAPI 연동",
      roleSummary: "UI/UX 디자인과 React 화면, 백엔드 API 구조 설계, FastAPI 추천 로직 연동을 맡았습니다.",
      contribution: "70%",
      award: "2024 핵심프로젝트 최우수상",
      modalImages: [
        "/project-images/project_wd.png", "/project-images/project_wd1.png", "/project-images/project_wd2.png", "/project-images/project_wd3.png",
        "/project-images/project_wd4.png", "/project-images/project_wd5.png", "/project-images/project_wd6.png", "/project-images/project_wd7.png",
      ],
      urls: { githubURL: "https://github.com/2024-AISCHOOL-APP/In_site", serviceURL: null, blogURL: null },
      videoURL: "/video/insight.mp4",
      overview:
        "광주 지역 결혼 예정자가 예산·스타일·일정 등을 입력하면, 유사도 분석으로 웨딩홀·스드메 조합을 추천해 주는 웹 서비스입니다. 웨딩 준비 정보가 흩어져 있어 비교와 선택이 어렵다는 문제에서 출발했습니다.",
      myWork: [
        { heading: "다단계 웨딩플랜 입력·결과 화면", points: ["조건을 한 번에 받지 않고 **Q01~Q03 단계로 나눠** 입력받는 화면과 추천 결과 화면을 구현했습니다.", "단계가 바뀌어도 입력값이 유지되도록 **React Context API**로 상태를 관리했습니다."] },
        { heading: "캘린더·날씨", points: ["FullCalendar로 사용자 일정을 표시하고, OpenWeather 데이터를 캘린더에 함께 보여줬습니다."] },
        { heading: "카테고리 목록·상세 페이지", points: ["카테고리별 목록을 구현했습니다.", "상세에서 가격 표시, 이미지 슬라이드, KakaoMap 위치 마커를 보여줍니다."] },
        { heading: "메인·로그인 · UI/UX 디자인", points: ["Figma로 화면을 설계하고 React로 반응형 구현했습니다.", "메인 페이지와 로그인 페이지를 구현했습니다."] },
        { heading: "백엔드 API 구조 · FastAPI 연동", points: ["Node.js 서버가 요청을 받아 **FastAPI의 추천 로직**에 전달하고, 추천 결과를 화면으로 돌려주는 흐름을 설계했습니다."] },
      ],
      problems: [
        {
          title: "단계 이동 시 입력 데이터가 사라지는 문제",
          situation: "다단계 입력 과정에서 페이지나 컴포넌트가 바뀌면 이전 단계에서 입력한 데이터가 유지되지 않아 추천 흐름이 끊겼습니다.",
          cause: "각 단계가 자기 로컬 상태로만 데이터를 관리했고, 화면이 전환될 때 상태가 초기화되어 입력 정보가 사라졌습니다.",
          solution: "**React Context API**로 단계별 입력 데이터를 전역 상태로 관리하고, 모든 단계가 같은 데이터 흐름을 참조하도록 구조를 고쳤습니다.",
          result: ["단계를 이동해도 입력 데이터가 유지됩니다.", "추천 흐름이 끊기지 않고 이어집니다."],
          lesson: "추천 서비스는 알고리즘뿐 아니라, 사용자가 입력을 이어가 결과까지 도달하도록 상태 유지 구조를 안정적으로 설계하는 것도 중요하다는 점을 배웠습니다.",
        },
      ],
      techReasons: [
        { tech: "React", reason: "단계형 입력과 결과 흐름을 연결하기에 적합했습니다." },
        { tech: "Context API", reason: "입력 데이터를 유지하고 화면 흐름을 연결하기에 유리했습니다." },
        { tech: "KakaoMap API", reason: "웨딩홀 위치 정보를 지도로 보여주기에 적합했습니다." },
      ],
      results: [
        { text: "예산·스타일·일정 입력부터 추천 결과, 상세 정보, 일정 관리까지 **하나의 흐름**으로 이어지는 서비스를 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "다단계 입력의 상태 유실 문제를 Context API로 해결해, 단계 이동 후에도 입력값이 유지됩니다.", basis: "트러블슈팅 기록" },
        { text: "교육과정 프로젝트 평가에서 **2024 핵심프로젝트 최우수상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "Node.js", "MySQL", "Python (FastAPI 연동)", "Figma", "Bootstrap", "KakaoMap API", "FullCalendar", "OpenWeather API"],
    },
  },

  /* 5 ─ 흉기 소지자 알림 */
  {
    title: "YOLOv11 기반 실시간 흉기 소지자 알림 서비스",
    subtitle: "CCTV 영상 분석 기반 실시간 위험 알림",
    tags: ["FE", "BE", "디자인", "웹", "앱", "팀"],
    image: "/project-images/project_as.png",
    type: "generic",
    details: {
      modalTitle: "YOLOv11 기반 실시간 흉기 소지자 알림 서비스",
      subtitle: "CCTV 영상 분석부터 관리자 웹·모바일 푸시 알림까지 이어지는 보안 서비스",
      period: "2024.10 - 2024.11 (6주)",
      members: "6인 개발",
      roleShort: "Web·App Frontend, Backend, UI/UX",
      roleSummary: "관리자 웹·Flutter 앱 화면, 실시간 알림 연동, 지도 UI, 관리자 기능을 맡았습니다. (YOLOv11 탐지 모델은 팀원 담당)",
      contribution: "70%",
      award: null,
      modalImages: [
        "/project-images/project_as.png", "/project-images/project_as1.png", "/project-images/project_as2.png", "/project-images/project_as3.png",
        "/project-images/project_as4.png", "/project-images/project_as5.png", "/project-images/project_as6.png", "/project-images/project_as7.png",
        "/project-images/project_as8.png", "/project-images/project_as9.png", "/project-images/project_as10.png",
      ],
      urls: { githubURL: "https://github.com/Kim-Ji-Man/Ask-Me", serviceURL: null, blogURL: null },
      videoURL: "/video/askme.mp4",
      overview:
        "광주 지역 특정 매장의 CCTV 영상을 YOLOv11로 실시간 분석해 흉기 소지 여부를 감지하고, 감지되면 관리자·경비원·일반 사용자에게 알림을 보내는 서비스입니다. 위험 정보는 위치와 함께 전달되어야 한다는 판단으로 지도 화면도 함께 만들었습니다.",
      myWork: [
        { heading: "실시간 알림 연동", points: ["감지 결과를 **WebSocket**으로 관리자 웹에 즉시 보여주고, **OneSignal**로 모바일 푸시를 보내는 흐름을 구현했습니다."] },
        { heading: "시스템 관리자·보안 관리자 웹", points: ["시스템 관리자: 대시보드, 회원 관리, 커뮤니티 관리, 알림 내역 페이지를 설계·구현했습니다.", "보안 관리자: CCTV·이상 감지 현황, 알림 내역을 구현했습니다.", "알림 내역을 누르면 감지된 이미지와 녹화 영상을 볼 수 있습니다."] },
        { heading: "지도 UI (Kakao Map)", points: ["현재 매장 위치에서 **2km 이내 흉기 경보**와 가까운 경찰서·병원을 지도에 표시했습니다."] },
        { heading: "Flutter 모바일 앱", points: ["위치 기반 지도, 알림 내역, 커뮤니티와 좋아요·신고 기능을 구현했습니다.", "내 위치, 커스텀 오버레이 마커, 경찰서·병원 마커를 표시합니다."] },
        { heading: "UI/UX · 백엔드", points: ["Figma와 React로 반응형 웹을 설계·구현하고, Node.js 백엔드 기능을 구현했습니다."] },
      ],
      problems: [
        {
          title: "HTTP 환경에서 푸시 알림이 동작하지 않은 문제",
          situation: "React 웹과 Android 앱 사이 푸시 알림을 구현할 때, HTTP 프로토콜 환경에서는 알림이 정상 동작하지 않았습니다.",
          cause: "OneSignal 푸시 알림 서비스는 HTTPS 환경을 요구하는데, HTTP에서는 보안 정책상 정상 동작할 수 없었습니다.",
          solution: "HTTPS가 필요하다는 점을 확인하고 **OpenSSL로 HTTPS 인증서를 생성·설정**했습니다.",
          result: ["HTTPS 환경에서 OneSignal 푸시 알림이 정상 동작했습니다.", "웹과 모바일 간 실시간 알림 연동을 완성했습니다."],
          lesson: "외부 서비스를 연동할 때는 기능 구현뿐 아니라 프로토콜·보안 정책·인증서 환경까지 함께 확인해야 한다는 점을 배웠습니다.",
        },
      ],
      techReasons: [
        { tech: "YOLOv11", reason: "실시간 객체 탐지에서 정확도와 속도를 함께 확보하기 위해 선택했습니다. (팀 기술 선택)" },
        { tech: "WebSocket", reason: "탐지 결과를 관리자 화면에 즉시 전달하기에 적합했습니다." },
        { tech: "Kakao Map", reason: "위치 기반 대응 화면을 구성하기에 적합했습니다." },
      ],
      results: [
        { text: "탐지 이벤트가 **WebSocket → 관리자 웹**, **OneSignal → 모바일 푸시**로 전달되는 흐름을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "지도에서 2km 이내 흉기 경보와 근처 경찰서·병원을 확인하고, 알림 내역에서 감지 이미지·녹화 영상을 볼 수 있게 했습니다.", basis: "화면 캡처" },
        { text: "HTTPS 인증서 설정으로 푸시 알림 문제를 해결해 웹·앱 알림 연동을 완성했습니다.", basis: "트러블슈팅 기록" },
      ],
      techStack: ["React", "Flutter", "Node.js", "WebSocket", "OneSignal", "MySQL", "FastAPI", "YOLOv11", "KakaoMap API", "Bootstrap", "Figma"],
    },
  },

  /* 6 ─ P들의 여행 */
  {
    title: "여행데이터 기반 AI 여행지 추천 서비스",
    subtitle: "여행 블로그 데이터 기반 맞춤형 AI 여행지 추천",
    tags: ["FE", "웹", "디자인", "팀"],
    image: "/project-images/project_p1.png",
    type: "generic",
    details: {
      modalTitle: "P들의 블로그 여행데이터 기반 AI 여행지 추천 서비스",
      subtitle: "“만사가 귀찮은 P들을 위한 맞춤형 여행 가이드”",
      period: "2025.08 - 2025.08 (4주)",
      members: "4인 개발 (프론트엔드 1, 백엔드/DB 2, PM & AI 1)",
      roleShort: "Frontend",
      roleSummary: "프론트엔드 1명으로서 입력 폼, 추천 결과, 지도 상세, 로그인 흐름 화면을 React로 구현했습니다.",
      contribution: null,
      award: null,
      modalImages: [
        "/project-images/project_p2.webp", "/project-images/project_p3.webp", "/project-images/project_p4.webp", "/project-images/project_p5.webp",
        "/project-images/project_p6.webp", "/project-images/project_p7.png", "/project-images/project_p8.png",
      ],
      urls: { githubURL: "https://github.com/jingeunlee4559/miniproject2", serviceURL: null, blogURL: null },
      videoURL: "/video/ptravel.mp4",
      overview:
        "실제 여행 블로그 데이터를 크롤링·임베딩(OpenAI text-embedding-3-small)해, 사용자의 여행 성향(목적지·계절·동행·컨셉)에 맞는 여행지와 코스를 추천해 주는 AI 웹 서비스입니다.",
      myWork: [
        { heading: "여행 성향 입력 폼", points: ["목적지·계절·동행·여행 컨셉을 한 화면에서 입력하는 **React 폼**을 설계했습니다.", "입력값을 상태로 관리하고 `user_query`(JSON)로 묶어 AI 추천 API에 전달하는 이벤트 흐름을 구현했습니다."] },
        { heading: "AI 추천 결과 화면", points: ["추천 여행지·코스를 카드 리스트로 보여주고, 로딩·요청 완료·결과 없음 상태에 따라 다른 UI를 보여주도록 구현했습니다.", "스크롤하며 여러 결과를 자연스럽게 탐색하는 레이아웃을 구성했습니다."] },
        { heading: "카카오맵 여행지 상세 페이지", points: ["선택한 여행지를 KakaoMap API로 렌더링하고, 주소·핵심 정보와 함께 보도록 지도와 텍스트를 배치했습니다."] },
        { heading: "세션 기반 화면 흐름", points: ["로그인 여부에 따라 접근 가능한 페이지와 메뉴가 달라지도록 **Protected Routes**를 구성했습니다.", "비로그인 사용자는 로그인·회원가입으로 유도했습니다."] },
        { heading: "지역 필터·캘린더·커뮤니티 화면", points: ["지역별 필터링, FullCalendar 기반 여행 날짜 관리, 여행 후기 게시판과 블로그형 상세 화면, AI 맞춤 여행 코스 리포트 화면을 구현했습니다."] },
      ],
      problems: [], // TODO
      techReasons: [], // TODO
      results: [
        { text: "성향 입력 → AI 추천 결과 → 지도 상세 → 맞춤 여행 코스 리포트까지 **프론트엔드 전체 흐름**을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "로그인 여부에 따라 메뉴·페이지 접근이 달라지는 라우팅 구조를 만들었습니다.", basis: "화면 캡처" },
      ],
      techStack: ["React", "JavaScript", "React-Bootstrap", "KakaoMap API", "FullCalendar", "Spring Boot", "Java 17", "Gradle", "Oracle", "OpenAI Embedding"],
    },
  },

  /* 7 ─ Talaria */
  {
    title: "두 세계를 잇는 실시간 AI 번역 플랫폼",
    subtitle: "Papago STT 기술을 활용한 실시간 번역 및 비즈니스·문화 맞춤형 화상회의 서비스",
    tags: ["FE", "웹", "디자인", "팀"],
    image: "/project-images/project_tal1.png",
    type: "talaria",
    details: {
      modalTitle: "Talaria · 두 세계를 잇는 실시간 AI 번역 플랫폼",
      subtitle: "Papago STT 기반 실시간 번역 자막과 비즈니스·문화 모드를 갖춘 화상회의 서비스",
      period: "2025.10 - 2025.12 (3개월)",
      members: "3인 개발 (프론트엔드 1, 백엔드 1, AI 1)",
      roleShort: "Frontend 전담 · UI/UX 총괄",
      roleSummary: "프론트엔드를 전담하고 UI/UX를 총괄했습니다. 회의·라이브·문서 화면 전반을 React로 구현했습니다.",
      contribution: "70%",
      award: "2025 실전프로젝트 우수상",
      modalImages: [
        "/project-images/project_tal2.png", "/project-images/project_tal3.png", "/project-images/project_tal4.png", "/project-images/project_tal5.png",
        "/project-images/project_tal13.webp", "/project-images/project_tal6.png", "/project-images/project_tal7.png", "/project-images/project_tal8.png",
        "/project-images/project_tal9.png", "/project-images/project_tal10.png", "/project-images/project_tal11.png", "/project-images/project_tal12.png",
      ],
      urls: { githubURL: "https://github.com/jingeunlee4559/talaria-frontend", githubLinks: [{ label: "Frontend", url: "https://github.com/jingeunlee4559/talaria-frontend" }, { label: "Backend", url: "https://github.com/jingeunlee4559/talaria-backend-" }, { label: "AI", url: "https://github.com/jingeunlee4559/talaria-ai" }], serviceURL: null, blogURL: null },
      videoURL: "/video/Talaria.mp4",
      overview:
        "비즈니스 회의와 K-컬처·밈 라이브를 모두 지원하는 실시간 AI 번역 플랫폼입니다. 음성을 STT로 변환하고 번역해 자막으로 보여주며, 매너 체크와 문서·회의록 연동까지 제공합니다. 글로벌 회의에서는 자막 이해와 흐름 파악이, 문화 콘텐츠에서는 직역보다 맥락 전달이 어렵다는 문제에서 출발했습니다.",
      myWork: [
        { heading: "LiveKit 기반 실시간 회의 UI (비즈니스 모드)", points: ["발언자·참가자 영상 타일을 자동 배치하는 **커스텀 그리드**를 구현했습니다.", "원어는 상단, 번역은 하단에 보이는 **STT 번역 자막 오버레이**를 구성했습니다.", "우측 사이드바에 매너 체크·문서·채팅 탭을 두고, 제어 버튼은 중앙 하단에 고정했습니다."] },
        { heading: "문화 라이브 UI · 밈 인터랙션", points: ["K-POP·게임·밈 컨셉의 테마 배경과 이펙트를 영상 타일 위에 적용했습니다.", "채팅에서 신조어·밈 단어를 실시간 하이라이트하고, 이모지·임팩트 버튼으로 화면 이펙트를 띄웁니다.", "모바일에서는 영상·제어 버튼·탭 순서로 배치해 한 손 조작이 가능하게 했습니다."] },
        { heading: "대시보드 · 문서/회의록 · PDF 뷰어", points: ["오늘 회의, 일정, 최근 문서·회의록을 카드로 보는 대시보드와 FullCalendar 일정 화면을 구현했습니다.", "문서·회의록 리스트에서 필터·정렬을 지원하고, PDF 뷰어에서 **원문·번역본을 나란히 또는 탭으로** 볼 수 있게 했습니다."] },
        { heading: "파일 업로드 · 알림 UX", points: ["문서 업로드 모달에서 언어, 회의 연결, RAG 사용 여부를 설정하고, Drag & Drop 업로드와 용량·확장자 검증을 구현했습니다.", "완료·오류·권한 부족 상황은 SweetAlert2 알림으로 안내합니다."] },
        { heading: "랜딩·공통 네비게이션 · 반응형", points: ["비즈니스/문화 모드를 소개하는 랜딩과, 로고·모드 전환·알림·프로필을 재사용하는 공통 헤더를 만들었습니다.", "PC·태블릿·모바일에 맞춰 영상 타일 수, 사이드바, 버튼 배치가 바뀌는 반응형 레이아웃을 구현했습니다."] },
      ],
      problems: [
        {
          title: "카메라를 끄면 배경 설정이 다른 참가자에게 보이지 않는 문제",
          situation: "카메라 OFF 상태에서 내가 정한 배경 테마가 참가자 간에 동기화되지 않아, 다른 참가자 화면에서는 설정한 배경이 유지되지 않는 UX 불일치가 생겼습니다.",
          cause: "배경 설정이 **내 화면의 로컬 상태로만** 바뀌고 다른 참가자에게 전파되지 않았습니다. 실시간 상태 동기화 구조가 없었습니다.",
          solution: "**LiveKit DataChannel**로 배경 설정값을 실시간 공유하고, 참가자별 **상태 맵(State Map)**을 만들어 모든 화면이 같은 값을 참조하도록 구조를 고쳤습니다.",
          result: ["모든 참가자 화면에서 배경 테마가 일관되게 유지됩니다.", "카메라 OFF 상태에서도 설정이 공유됩니다."],
          lesson: "실시간 서비스는 로컬 상태 관리만으로는 일관된 경험을 보장하기 어렵고, 클라이언트 간 상태 동기화 구조를 함께 설계해야 한다는 점을 배웠습니다.",
        },
      ],
      techReasons: [
        { tech: "LiveKit", reason: "실시간 영상·음성 스트림과 참가자 상태 처리에 적합했습니다." },
        { tech: "Context API", reason: "회의 상태와 사용자 설정을 화면 전반에서 일관되게 관리하기 위해 선택했습니다." },
        { tech: "Tailwind CSS", reason: "화면을 빠르게 구현하면서 일관성을 유지하기에 유리했습니다." },
      ],
      results: [
        { text: "음성 입력 → STT → 번역 → 자막 오버레이 → 참가자 상태 동기화까지 이어지는 **회의 화면**을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "비즈니스 모드와 문화 모드를 **하나의 React 프론트엔드**에서 지원하고, PC·태블릿·모바일 레이아웃을 구현했습니다.", basis: "화면 캡처" },
        { text: "배경 테마 동기화 문제를 DataChannel + State Map 구조로 해결했습니다.", basis: "트러블슈팅 기록" },
        { text: "교육과정 프로젝트 평가에서 **2025 실전프로젝트 우수상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "Vite", "JavaScript", "Tailwind CSS", "LiveKit", "Context API", "Axios", "SweetAlert2", "FullCalendar", "react-router-dom", "Figma"],
    },
  },
];
