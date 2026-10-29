// 프로젝트 데이터. 내용은 포트폴리오 PDF(이진근_개발자_포트폴리오 / 이진근_포트폴리오)에 적힌 것만 사용합니다.
// ※ 측정하지 않은 성능 개선·비용 절감 수치는 적지 않습니다. 결과는 "무엇을 구현했고 어디서 확인되는지"만 씁니다.
//
// details 필드 설명
//  roleShort   : 목록에 보이는 짧은 역할
//  roleSummary : 모달 '내 역할' 한 줄 설명
//  contribution: 포트폴리오에 적은 기여도 (없으면 null)
//  award       : 수상 기록 (없으면 null)
//  myWork      : [{ heading, images?: [], image?, points[] }]  내가 직접 담당한 기능. images(여러 장) 또는 image(한 장)를 보여줍니다
//  problems    : [{ title, situation, cause, solution, result[], lesson }]  구현 중 문제와 해결 (기록이 있는 프로젝트만)
//  techReasons : [{ tech, reason }]                 기술을 선택한 이유 (포트폴리오에 적은 것만)
//  results     : [{ text }]                         결과 요약 (짧은 사실 위주)
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
        "카페에서 공부하는 사람(카공족)이 많아지면서 카페에 가도 자리가 없는 경우가 많았고, 동네 작은 카페들은 프랜차이즈에 비해 잘 알려지지 않았습니다.\n\n그래서 광주 동네 카페의 **좌석을 미리 예약하고 음료도 미리 주문**할 수 있게 하고, 주변 카페 위치를 **지도(카카오맵)**로 보여 주었습니다.\n\n그 결과 **가기 전에 자리를 예약하고, 가까운 동네 카페를 찾는 흐름**을 완성해 2022 핵심프로젝트 우수상을 받았습니다.",
      myWork: [
        {
          "heading": "카페 지도 화면",
          "images": [
            "/project-images/camomile_screenshot1.png"
          ],
          "points": [
            "광주 지역 카페들이 지도 위에 핀으로 표시되도록 했습니다. (KakaoMap API)",
            "핀을 누르면 그 카페의 정보가 말풍선처럼 지도 위에 뜨게 했습니다. (커스텀 오버레이)"
          ]
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "가 봐야 아는 카페 빈자리, 미리 예약하기",
        "summary": "광주 동네 카페의 좌석을 미리 예약하고 음료도 미리 주문하는 웹 서비스입니다. 카페에서 공부하는 ‘카공족’이 늘면서 막상 가도 자리가 없는 일이 잦았고, 동네 작은 카페는 프랜차이즈에 비해 알려질 기회가 적었습니다. 그래서 가기 전에 좌석을 예약하고 음료를 주문할 수 있게 하고, 주변 카페를 카카오맵 지도에 핀으로 보여 주도록 만들었습니다. 4명이 3주 동안 개발했고, 저는 로그인 화면과 카페 지도 화면을 React로 구현했습니다.",
        "pairs": [
          {
            "problem": "카공족이 늘어 카페에 가도 자리가 없다",
            "solution": "**좌석을 미리 예약**하고 **음료도 미리 주문**할 수 있게 했습니다."
          },
          {
            "problem": "동네 작은 카페는 프랜차이즈보다 잘 알려지지 않았다",
            "solution": "주변 **동네 카페를 지도에 핀으로 표시**하고, 누르면 카페 정보 말풍선이 뜹니다.",
            "tech": [
              "Kakao Map"
            ]
          }
        ],
        "outcome": "가기 전에 자리를 예약하고, **가까운 동네 카페를 찾는 흐름**을 완성했습니다."
      },
      problems: [
        {
          title: "카카오맵 커스텀 오버레이에 CSS가 불규칙하게 적용된 문제",
          situation: "카페 핀을 누르면 뜨는 커스텀 오버레이(카페 정보 말풍선)에 작성한 CSS가 불규칙하게 적용되었습니다.",
          cause: "오버레이 안의 내용을 작성하는 구문 구조가 지도 API에서 CSS가 적용되는 방식과 맞지 않았습니다.",
          solution: "검색으로 지도 API 안에서 CSS를 적용하는 방법을 익힌 뒤, **오버레이 구문을 작성하는 구조를 바꿨습니다.**",
          result: ["오버레이에 의도한 스타일이 일정하게 적용되었습니다."],
          lesson: "외부 API가 그리는 영역은 일반 화면과 스타일 적용 방식이 다를 수 있어, 그 API의 방식부터 확인해야 한다는 점을 배웠습니다.",
        },
      ],
      techReasons: [], // TODO: 기술을 고른 이유를 적으면 자동으로 표시됩니다.
      results: [
        { text: "카페 위치를 지도 마커로 확인하고, 마커를 눌러 상세 정보를 보는 **지도 화면**을 구현했습니다.", basis: "화면 캡처" },
        { text: "로그인 화면을 구현했습니다.", basis: "화면 캡처" },
        { text: "교육과정 프로젝트 평가에서 **2022 핵심프로젝트 우수상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "KakaoMap API", "JavaScript", "Node.js", "MySQL"],
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
        "시골 도로는 과속하는 차가 많고, 보행자와 차량 사이로 경운기 같은 농기계도 자주 다녀 사고 위험이 컸습니다.\n\n그래서 **객체인식(AI)으로 보행자·차량·농기계를 알아보고 신호를 제어**하는 AI 신호등과, 신호등 위치·이상 내역을 **지도(카카오맵)**로, 일반 신호등과의 차이를 **그래프(Chart.js)**로 보는 관리자 웹을 만들었습니다.\n\n그 결과 **신호등 상태를 한 화면에서 관리하는 관리자 웹**을 완성해 2022 실전프로젝트 최우수상과 왕중왕전 대상을 받았습니다.",
      myWork: [
        {
          "heading": "신호등 지도 화면",
          "images": [
            "/project-images/project_ssg1.png"
          ],
          "points": [
            "설치된 AI 신호등의 위치를 지도 위 핀으로 보여줍니다. (KakaoMap)",
            "핀을 누르면 가까운 관할서와 지역이 보이고, 문제가 생긴 신호등은 **이상 내역**까지 바로 확인할 수 있습니다.",
            "AI 모드를 켜고 끄는 버튼을 만들었습니다."
          ]
        },
        {
          "heading": "비교 그래프 화면",
          "images": [
            "/project-images/project_ssg2.png"
          ],
          "points": [
            "일반 신호등과 AI 신호등의 **차량 통행량과 사고 발생률**을 그래프로 비교해 볼 수 있습니다. (Chart.js)",
            "그래프의 수치는 시연용 데이터이며, 실제 개선 효과를 측정한 것은 아닙니다."
          ]
        },
        {
          "heading": "목록 화면",
          "images": [
            "/project-images/project_ssg3.png"
          ],
          "points": [
            "지역별 관할서와 이상 내역을 표로 정리해 한눈에 볼 수 있게 했습니다. (react-table)"
          ]
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "시골 도로의 AI 신호등을, 지도 한 화면에서 관리",
        "summary": "시골 도로의 사고를 줄이기 위한 AI 신호등과, 이를 한 화면에서 관리하는 관리자 웹 서비스입니다. 시골 도로는 과속하는 차가 많고 보행자·차량 사이로 경운기 같은 농기계도 다녀 사고 위험이 컸습니다. AI 신호등은 객체인식으로 보행자·차량·농기계를 알아보고 신호를 제어하며, 관리자 웹은 신호등 위치와 이상 내역을 카카오맵으로, 일반 신호등과의 통행량·사고 발생률 차이를 그래프로 보여 줍니다. 5명이 5주 동안 개발했고, 저는 관리자 웹의 로그인·지도·차트·목록 화면을 맡았습니다. (객체인식 모델은 팀원 담당)",
        "pairs": [
          {
            "problem": "시골 도로는 과속이 많고, 경운기 같은 농기계도 다녀 사고 위험이 크다",
            "solution": "**보행자·차량·농기계를 알아보고 신호를 제어**하는 AI 신호등을 만들었습니다."
          },
          {
            "problem": "여러 곳의 신호등 상태를 한눈에 보기 어렵다",
            "solution": "**신호등 위치와 이상 내역을 지도**에 보여 주고, 지역별 관할서와 이상 내역은 표로 정리했습니다.",
            "tech": [
              "Kakao Map",
              "react-table"
            ]
          },
          {
            "problem": "AI 신호등이 일반 신호등과 무엇이 다른지 보여 주기 어렵다",
            "solution": "일반 신호등과 AI 신호등의 **통행량·사고 발생률을 그래프로 비교**합니다.",
            "tech": [
              "Chart.js"
            ]
          }
        ],
        "outcome": "신호등 상태를 **한 화면에서 관리하는 관리자 웹**을 완성했습니다."
      },
      problems: [
        {
          title: "Figma 디자인대로 만든 반응형 화면이 제대로 동작하지 않은 문제",
          situation: "Figma로 설계한 화면을 반응형 웹으로 구현하는 과정에서 반응형 동작에 오류가 생겼습니다.",
          cause: "기존 코드에 걸려 있던 제약 조건을 파악하지 못한 채 반응형 스타일을 적용했습니다.",
          solution: "**기존(레거시) 코드를 살펴 제약 조건을 파악**한 뒤, 그에 맞게 변경해 적용했습니다.",
          result: ["화면 크기에 따라 반응형 화면이 정상적으로 동작했습니다."],
          lesson: "이미 있는 코드 위에 기능을 더할 때는 기존 코드의 제약부터 파악해야 한다는 점을 배웠습니다.",
        },
        {
          title: "커스텀 마커가 실제 위치와 어긋난 문제",
          situation: "카카오맵 API로 신호등 위치에 커스텀 마커를 표시했는데, 마커가 실제 신호등 위치와 어긋나게 찍혔습니다.",
          cause: "",
          solution: "**카카오맵 API 공식 문서와 검색 자료를 참고해 마커의 위치 설정을 다시 맞췄습니다.**",
          result: ["마커가 신호등의 실제 위치에 맞게 표시되었습니다."],
          lesson: "외부 지도 API는 요소를 배치하는 기준이 따로 있어, 공식 문서로 그 기준을 먼저 확인해야 한다는 점을 배웠습니다.",
        },
      ],
      techReasons: [], // TODO
      results: [
        { text: "AI 신호등 위치·이상 내역·관할서 정보를 **지도 한 화면**에서 확인하는 관리자 웹을 구현했습니다.", basis: "화면 캡처" },
        { text: "일반 신호등과 AI 신호등의 통행량·사고율을 **Chart.js 비교 차트**로 볼 수 있게 했습니다. (화면의 수치는 시연용 데이터이며, 실제 개선 효과를 측정한 것이 아닙니다.)", basis: "화면 캡처" },
        { text: "교육과정 프로젝트 평가에서 **2022 실전프로젝트 최우수상**, **왕중왕전 대상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "KakaoMap API", "Chart.js", "react-table", "JavaScript", "Node.js", "MySQL", "Figma"],
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
      roleShort: "Frontend · Backend",
      roleSummary: "로그인·메인·지도·리뷰 화면을 만들고, 리뷰·모집 글 댓글과 신고 기능의 서버(Spring)도 함께 만들었습니다.",
      contribution: null,
      award: null,
      modalImages: ["/project-images/project_with1.png", "/project-images/project_with2.png", "/project-images/project_with3.png", "/project-images/project_with4.png"],
      urls: { githubURL: "https://github.com/2023-SMHRD-IS-AI1/WithusRepo", serviceURL: null, blogURL: null },
      videoURL: "/video/withus.mp4",
      overview:
        "혼자 여행하는 사람(혼행족)은 여행 스타일이 맞는 동행자를 찾기 어려웠습니다.\n\n그래서 성향·생활 스타일·교통수단 질문에 답하면 **비슷한 동행자를 추천·매칭**하고, 데이터 분석으로 뽑은 **인기 지역**과 **맛집 지도(카카오맵)**, 리뷰·모집 글로 여행을 준비하게 했습니다.\n\n그 결과 인기 지역부터 맛집 지도, 리뷰·모집 글과 댓글까지 **여행을 준비하는 주요 화면과 기능**을 완성했습니다.",
      myWork: [
        {
          "heading": "메인 화면",
          "images": [
            "/project-images/project_with2.png"
          ],
          "points": [
            "데이터 분석으로 뽑은 **인기 지역 사진이 차례로 넘어가는 슬라이드**를 만들었습니다. (머신러닝 빈도 분석 결과 활용)"
          ],
          "group": "화면"
        },
        {
          "heading": "맛집 지도 화면",
          "images": [
            "/project-images/project_with3.png"
          ],
          "points": [
            "지역별 맛집을 지도 위에 표시하고, 누르면 가게 정보가 지도 위에 뜨게 했습니다. (KakaoMap API, 커스텀 오버레이)"
          ],
          "group": "화면"
        },
        {
          "heading": "리뷰 화면",
          "images": [
            "/project-images/project_with4.png"
          ],
          "points": [
            "사용자들이 남긴 리뷰를 모아 보는 화면을 만들었습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "리뷰 기능 (Spring)",
          "points": [
            "리뷰 글을 **수정·삭제**하는 기능을 만들었습니다. (Spring, MyBatis)",
            "리뷰에 **댓글을 달고 수정·삭제**하는 기능을 만들었습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "모집 글 · 신고 기능",
          "points": [
            "모집 글 상세 보기와 모집 글 **댓글 작성·수정·삭제** 기능을 만들었습니다.",
            "프로필·게시글 수정과 **유저 신고**를 모달 창으로 처리해, 페이지를 옮기지 않고 바로 할 수 있게 했습니다."
          ],
          "group": "백엔드"
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "혼자 떠나는 여행, 나와 맞는 동행 찾기",
        "summary": "성향 조사 데이터로 혼자 여행하는 사람(혼행족)에게 맞는 여행 동행자를 연결하는 Spring 기반 웹 서비스입니다. 혼자 떠나는 여행은 스타일이 맞는 동행을 구하기 어렵다는 점에서 출발해, 성향·생활 스타일·교통수단 같은 세분화된 질문에 답하면 비슷한 동행자를 추천하고 매칭해 줍니다. 머신러닝 빈도분석 결과로 인기 여행지를 보여 주는 메인 화면, 카카오맵 맛집 지도, 여행 리뷰와 동행 모집 글까지 여행 준비에 필요한 화면을 갖췄습니다. 4명이 5주 동안 개발했고, 저는 로그인·메인·지도·리뷰 화면과 리뷰·모집 글 기능(Spring, MyBatis)을 맡았습니다.",
        "pairs": [
          {
            "problem": "혼자 여행하는 사람은 스타일이 맞는 동행자를 찾기 어렵다",
            "solution": "성향·생활 스타일·교통수단 질문에 답하면 **비슷한 동행자를 추천하고 매칭**합니다."
          }
        ],
        "outcome": "인기 지역부터 맛집 지도, 리뷰·모집 글까지 **여행을 준비하는 화면과 기능**을 완성했습니다."
      },
      problems: [
        {
          title: "이미지가 제대로 업로드되지 않은 문제",
          situation: "이미지를 상대 경로로 저장해, 이미지가 제대로 업로드되지 않았습니다.",
          cause: "상대 경로는 기준 위치에 따라 가리키는 곳이 달라져, 저장된 경로로 이미지를 찾지 못했습니다.",
          solution: "이미지 경로를 **절대 경로로 저장**하고, 상대 경로로 저장하는 경우에는 **이미지 주소값을 사용**하도록 바꿨습니다.",
          result: ["업로드한 이미지가 정상적으로 저장되고 표시되었습니다."],
          lesson: "파일 경로는 어디를 기준으로 해석되는지 먼저 정해야 한다는 점을 배웠습니다.",
        },
      ],
      techReasons: [], // TODO
      results: [
        { text: "베스트 지역 슬라이더, 지역별 맛집 지도, 리뷰 목록까지 **서비스 핵심 화면 4개**를 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "맛집 위치와 상세 정보를 지도 오버레이로 바로 확인할 수 있게 했습니다.", basis: "화면 캡처" },
      ],
      techStack: ["Spring", "JSP", "KakaoMap API", "FullCalendar", "Java", "JavaScript", "MySQL", "Python", "Figma"],
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
        "신발을 살 때 리뷰가 너무 많아 하나씩 읽어 보기 어려웠습니다.\n\n그래서 2030 남성을 대상으로, 리뷰를 **AI(자연어처리)로 분석**해 키워드별 평가와 좋은 평·아쉬운 평, 핵심 문장을 **차트(Chart.js)**로 보여 주고, 원하는 신발을 문장으로 물으면 찾아 주는 **챗봇**을 만들었습니다.\n\n그 결과 **리뷰를 읽지 않아도 상품 평가를 한눈에 보는 서비스**를 완성했습니다.",
      myWork: [
        {
          "heading": "웰컴 화면",
          "images": [
            "/project-images/project_read.png"
          ],
          "points": [
            "서비스를 처음 열면 보이는 웰컴 화면을 만들었습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "메인 화면",
          "images": [
            "/project-images/project_read2.png",
            "/project-images/project_read7.png"
          ],
          "points": [
            "메인에서 카테고리별 **관심상품 TOP3와 TOP10**을 바로 볼 수 있습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "카테고리 화면",
          "images": [
            "/project-images/project_read1.png"
          ],
          "points": [
            "카테고리 목록과 상세 화면을 만들었습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "리뷰 분석 화면",
          "images": [
            "/project-images/project_read3.png"
          ],
          "points": [
            "카테고리마다 리뷰에 자주 나온 키워드 순위를 그래프로 보여줍니다. (Chart.js)",
            "상품마다 키워드별로 좋은 평과 아쉬운 평을 나눠 보여주고, 리뷰 요약, 중요한 문장 강조, 상품 정보까지 한 화면에 담았습니다. (긍정/부정 분석, 리뷰 하이라이팅)"
          ],
          "group": "화면"
        },
        {
          "heading": "챗봇",
          "images": [
            "/project-images/project_read4.png",
            "/project-images/project_read6.png",
            "/project-images/project_read5.png"
          ],
          "points": [
            "원하는 신발을 문장으로 입력하면 맞는 운동화를 찾아주는 챗봇 화면을 만들었습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "메인 · 차트 데이터 API",
          "points": [
            "메인 화면의 **카테고리별 TOP10**과 **키워드 랭킹(파이 차트)** 데이터를 보내는 API를 만들었습니다. (Spring Boot)",
            "Spring Boot와 MySQL, React를 연결했습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "카테고리 · 관심상품 API",
          "points": [
            "1차·2차 카테고리를 누르면 그 카테고리의 상품 정보를 보내는 API를 만들었습니다.",
            "카테고리 **검색**과 **관심상품** 기능을 만들었습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "커뮤니티 · 챗봇 대화 저장",
          "points": [
            "커뮤니티 기능과 **프로필 이미지 저장**을 만들었습니다.",
            "챗봇과 나눈 **대화를 저장하고 다시 불러오는** 기능을 만들었습니다."
          ],
          "group": "백엔드"
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "수많은 신발 리뷰, 읽지 않아도 한눈에",
        "summary": "신발 리뷰를 자연어처리(NLP)로 분석해, 2030 남성이 구매를 판단할 때 바로 쓸 수 있는 정보로 바꿔 주는 웹 서비스입니다. 리뷰는 많지만 하나씩 읽기 어렵다는 점에서 출발해, 한국어 모델(KcELECTRA, KoELECTRA NER)로 리뷰를 분석하고 키워드별 긍정·부정 평가, 리뷰 요약, 핵심 문장 강조를 차트와 함께 보여 줍니다. 메인에서는 카테고리별 TOP3·TOP10과 키워드 랭킹을 바로 볼 수 있고, 원하는 신발을 문장으로 물으면 찾아 주는 챗봇도 제공합니다. 5명이 5주 동안 개발했고, 저는 화면 개발과 Spring Boot API(카테고리·관심상품·차트 데이터·챗봇 대화 저장)를 맡았습니다.",
        "pairs": [
          {
            "problem": "리뷰가 너무 많아 하나씩 읽기 어렵다",
            "solution": "리뷰를 **AI로 분석해 키워드별로 좋은 평과 아쉬운 평**을 나누고, 리뷰 요약과 핵심 문장 강조를 차트와 함께 보여 줍니다.",
            "tech": [
              "Chart.js"
            ]
          },
          {
            "problem": "어떤 신발이 인기인지 한눈에 알기 어렵다",
            "solution": "메인에서 **카테고리별 TOP3·TOP10과 키워드 랭킹**을 바로 봅니다.",
            "tech": [
              "Spring Boot"
            ]
          },
          {
            "problem": "원하는 신발을 어떻게 찾을지 막막하다",
            "solution": "원하는 신발을 **문장으로 물으면 찾아 주는 챗봇**을 만들고, 나눈 대화를 저장해 다시 볼 수 있게 했습니다."
          }
        ],
        "outcome": "리뷰를 읽지 않아도 **상품 평가를 한눈에 보는 서비스**를 완성했습니다."
      },
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
        { tech: "Python NLP", reason: "리뷰 텍스트 분석 처리에 적합했습니다. (팀 기술 선택)" },
      ],
      results: [
        { text: "리뷰 분석 결과를 **키워드 랭킹 차트, 긍정/부정 분석, 리뷰 하이라이팅**으로 볼 수 있는 화면을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "챗봇, 카테고리 TOP3/TOP10, 관심상품 추가까지 **탐색 기능**을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "axios 데이터 전송 문제를 **백엔드 데이터 가공 구조**로 바꿔 시각화 컴포넌트가 정상 동작하게 했습니다.", basis: "트러블슈팅 기록" },
      ],
      techStack: ["React", "Chart.js", "KcELECTRA", "KoELECTRA NER", "Spring Boot", "Java", "Python", "Figma"],
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
        "웨딩홀, 스튜디오, 드레스, 메이크업 정보가 여기저기 흩어져 있어 비교하고 고르기 어려웠습니다.\n\n그래서 광주 지역 결혼 예정자가 예산·스타일·일정을 **단계별로 입력**하면 **유사도 분석**으로 맞는 웨딩홀·스드메 조합을 추천하고, 위치(카카오맵)와 일정(FullCalendar)까지 함께 볼 수 있게 했습니다.\n\n그 결과 조건 입력부터 추천, 상세 정보, 일정 관리까지 **한 흐름으로 이어지는 서비스**를 완성해 2024 핵심프로젝트 최우수상을 받았습니다.",
      myWork: [
        {
          "heading": "단계별 입력 · 추천 결과 화면",
          "images": [
            "/project-images/project_wd7.png"
          ],
          "points": [
            "조건을 한 번에 다 묻지 않고 **세 단계(Q01~Q03)로 나눠** 차근차근 고르게 하고, 추천 결과 화면을 만들었습니다.",
            "다른 단계로 넘어가도 **고른 내용이 지워지지 않게** 했습니다. (React Context API)"
          ],
          "group": "화면"
        },
        {
          "heading": "목록 · 상세 화면",
          "images": [
            "/project-images/project_wd2.png",
            "/project-images/project_wd3.png"
          ],
          "points": [
            "카테고리별 목록 화면을 만들었습니다.",
            "상세 화면에서 가격, 넘겨 보는 사진, 지도 위 위치를 보여줍니다. (KakaoMap)"
          ],
          "group": "화면"
        },
        {
          "heading": "장바구니",
          "images": [
            "/project-images/project_wd5.png"
          ],
          "points": [
            "고른 상품을 장바구니에 담고, 담은 상품과 총 가격을 한눈에 볼 수 있습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "캘린더·날씨",
          "images": [
            "/project-images/project_wd1.png"
          ],
          "points": [
            "달력에 내 일정을 보여주고, 날씨 정보도 함께 표시했습니다. (FullCalendar, OpenWeather)"
          ],
          "group": "화면"
        },
        {
          "heading": "마이페이지",
          "images": [
            "/project-images/project_wd6.png"
          ],
          "points": [
            "내 정보를 고치고, 지금까지 받은 웨딩플랜 결과를 다시 볼 수 있습니다."
          ],
          "group": "화면"
        },
        {
          "heading": "추천 결과 연결 (Node.js · FastAPI)",
          "points": [
            "사용자가 고른 조건을 서버가 받아 **AI 추천 쪽으로 넘기고**, 받은 추천 결과를 다시 화면에 보여주는 흐름을 설계했습니다. (Node.js → FastAPI)"
          ],
          "group": "백엔드"
        },
        {
          "heading": "캘린더 · 회원 API",
          "points": [
            "마이페이지 **캘린더 일정** API를 만들었습니다. (Node.js)",
            "**내 정보 수정과 계정 삭제** API를 만들었습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "가게 · 장바구니 API",
          "points": [
            "카테고리별 목록과 홈 카드에 쓰이는 **가게 정보를 DB에서 불러오는** API를 만들었습니다.",
            "가게 상세 정보와 **장바구니**(담기·삭제·총 가격) API를 만들었습니다.",
            "공지사항 **조회수** 기능을 만들었습니다."
          ],
          "group": "백엔드"
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "흩어진 웨딩 정보, 조건만 고르면 맞춤 조합으로",
        "summary": "광주 지역 결혼 예정자를 위한 웨딩홀·스드메(스튜디오·드레스·메이크업) 추천 서비스입니다. 웨딩홀과 스드메 정보가 여기저기 흩어져 있어 비교하고 고르기 어려웠기 때문에, 예산·스타일·일정을 세 단계로 나눠 입력하면 유사도 분석으로 맞는 조합을 추천하도록 만들었습니다. 추천 결과는 가격·사진·카카오맵 위치가 담긴 상세 화면과 장바구니로 이어지고, 마이페이지에서는 일정 캘린더(날씨 포함)와 받은 추천 결과를 다시 볼 수 있습니다. 5명이 4주 동안 개발했고, 저는 UI/UX 디자인과 화면 개발, Node.js 백엔드 API, FastAPI 추천 연동을 맡았습니다.",
        "pairs": [
          {
            "problem": "웨딩홀·스드메 정보가 흩어져 비교하기 어렵다",
            "solution": "예산·스타일·일정을 고르면 **유사도 분석으로 맞춤 조합을 추천**합니다. 서버가 조건을 받아 AI 추천으로 넘기고, 결과를 다시 화면에 보여 줍니다.",
            "tech": [
              "Node.js",
              "FastAPI 연동"
            ]
          },
          {
            "problem": "조건이 많아 한 번에 입력하기 부담스럽다",
            "solution": "조건을 **세 단계로 나눠 차근차근** 고르고, 앞 단계로 돌아가도 고른 내용이 남아 있습니다.",
            "tech": [
              "Context API"
            ]
          },
          {
            "problem": "고른 곳의 위치와 일정을 따로 챙겨야 한다",
            "solution": "상세 화면에서 **지도 위치**를 보여 주고, 마이페이지에서 **일정 캘린더와 날씨**를 함께 봅니다.",
            "tech": [
              "Kakao Map",
              "FullCalendar"
            ]
          }
        ],
        "outcome": "조건 입력부터 추천, 상세 정보, 일정 관리까지 **한 흐름으로 이어지는 서비스**를 완성했습니다."
      },
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
        { tech: "Context API", reason: "입력 데이터를 유지하고 화면 흐름을 연결하기에 유리했습니다." },
        { tech: "KakaoMap API", reason: "웨딩홀 위치 정보를 지도로 보여주기에 적합했습니다." },
      ],
      results: [
        { text: "예산·스타일·일정 입력부터 추천 결과, 상세 정보, 일정 관리까지 **하나의 흐름**으로 이어지는 서비스를 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "다단계 입력의 상태 유실 문제를 Context API로 해결해, 단계 이동 후에도 입력값이 유지됩니다.", basis: "트러블슈팅 기록" },
        { text: "교육과정 프로젝트 평가에서 **2024 핵심프로젝트 최우수상**을 받았습니다.", basis: "수상 기록" },
      ],
      techStack: ["React", "Node.js", "Python (FastAPI 연동)", "KakaoMap API", "FullCalendar", "OpenWeather API", "MySQL", "Bootstrap", "Figma"],
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
        "/project-images/project_as4.png", "/project-images/project_as5.png", "/project-images/project_as7.png",
        "/project-images/project_as8.png", "/project-images/project_as9.png", "/project-images/project_as11.png", "/project-images/project_as_app_home.png", "/project-images/project_as_app_popup.png", "/project-images/project_as_app_alerts.png", "/project-images/project_as_app_map1.png", "/project-images/project_as_app_map2.png", "/project-images/project_as_app_community.png",
      ],
      urls: { githubURL: "https://github.com/Kim-Ji-Man/Ask-Me", serviceURL: null, blogURL: null },
      videoURL: "/video/askme.mp4",
      overview:
        "묻지마 범죄가 잇따라 사회 문제가 됐지만, CCTV는 사람이 계속 지켜보지 않으면 위험을 바로 알아채기 어렵습니다.\n\n그래서 CCTV 영상을 **AI(YOLOv11)가 실시간으로 분석**해 흉기를 감지하면, **관리자 웹(WebSocket)과 휴대폰 푸시(OneSignal)**로 바로 알리고, 지도에서 **위험 위치와 가까운 경찰서·병원**을 확인하게 했습니다.\n\n그 결과 감지부터 알림, 위치 확인까지 이어지는 **관리자 웹과 모바일 앱**을 완성했습니다.",
      myWork: [
        {
          "heading": "실시간 알림 연동",
          "images": [
            "/project-images/project_as11.png",
            "/project-images/project_as4.png"
          ],
          "points": [
            "흉기가 감지되면 CCTV 화면 위에 **감지 사진과 함께 알림 창이 바로 뜨도록** 연결했습니다. (WebSocket)",
            "알림이 전송되었는지도 화면에서 바로 확인할 수 있습니다."
          ],
          "group": "관리자 웹"
        },
        {
          "heading": "대시보드",
          "images": [
            "/project-images/project_as1.png",
            "/project-images/project_as2.png"
          ],
          "points": [
            "시스템 관리자가 서비스 현황을 한눈에 볼 수 있는 대시보드를 설계하고 만들었습니다."
          ],
          "group": "관리자 웹"
        },
        {
          "heading": "회원 관리",
          "images": [
            "/project-images/project_as3.png"
          ],
          "points": [
            "시스템 관리자가 가입한 회원을 확인하고 관리하는 화면을 만들었습니다."
          ],
          "group": "관리자 웹"
        },
        {
          "heading": "알림 내역",
          "images": [
            "/project-images/project_as8.png",
            "/project-images/project_as5.png"
          ],
          "points": [
            "지금까지 감지된 알림을 목록으로 보여주고, 알림을 누르면 **감지된 순간의 사진과 녹화 영상**을 볼 수 있게 했습니다."
          ],
          "group": "관리자 웹"
        },
        {
          "heading": "경보 지도",
          "images": [
            "/project-images/project_as7.png"
          ],
          "points": [
            "매장 위치를 기준으로 **2km 안의 흉기 경보**와 가까운 경찰서·병원을 지도에 보여줍니다. (Kakao Map)"
          ],
          "group": "관리자 웹"
        },
        {
          "heading": "앱 홈",
          "images": [
            "/project-images/project_as_app_home.png"
          ],
          "points": [
            "로그인한 사용자 이름과 **전체·오늘 알림 수**를 첫 화면에 보여줍니다. (Flutter)",
            "공지사항, 내 정보, 알림 설정, 내가 쓴 글·댓글, 고객지원으로 바로 이동할 수 있게 했습니다."
          ],
          "group": "모바일 앱"
        },
        {
          "heading": "실시간 알림 창",
          "images": [
            "/project-images/project_as_app_popup.png",
            "/project-images/project_as9.png"
          ],
          "points": [
            "흉기가 감지되면 **휴대폰으로 푸시 알림**이 가도록 연결했습니다. (OneSignal 푸시)",
            "앱에는 **감지 사진, 발생 위치, 감지 시각**이 담긴 알림 창이 바로 뜹니다."
          ],
          "group": "모바일 앱"
        },
        {
          "heading": "알림 목록",
          "images": [
            "/project-images/project_as_app_alerts.png"
          ],
          "points": [
            "감지 알림을 사진, 주소, 경고 문구, 시간과 함께 목록으로 보여주고, **아직 읽지 않은 알림**은 따로 표시합니다."
          ],
          "group": "모바일 앱"
        },
        {
          "heading": "내 근처 지도",
          "images": [
            "/project-images/project_as_app_map1.png",
            "/project-images/project_as_app_map2.png"
          ],
          "points": [
            "내 위치·경찰서·병원·흉기 탭으로 나눠 지도에 표시했습니다. (Kakao Map, 커스텀 마커)",
            "흉기 탭에서는 **위험 구역을 원으로** 보여줍니다."
          ],
          "group": "모바일 앱"
        },
        {
          "heading": "커뮤니티",
          "images": [
            "/project-images/project_as_app_community.png"
          ],
          "points": [
            "게시글을 좋아요·댓글·조회수와 함께 보여주고, 글쓰기 버튼과 **행동요령 안내 배너**를 넣었습니다."
          ],
          "group": "모바일 앱"
        },
        {
          "heading": "실시간 알림 서버",
          "points": [
            "흉기가 감지되면 관리자 웹으로 바로 알림이 가는 **실시간 알림 서버(WebSocket)**를 만들었습니다. (Node.js)",
            "시스템 관리자는 회원가입이 있을 때, 보안 관리자는 감지 알림이 저장될 때 알림을 받도록 나눴습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "휴대폰 푸시 알림",
          "points": [
            "**OneSignal**로 휴대폰에 푸시 알림을 보내는 서비스를 만들었습니다.",
            "푸시에 필요한 **HTTPS 환경**을 직접 설정했고, 보낸 알림은 DB에 저장해 알림 내역으로 다시 볼 수 있게 했습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "알림 · 회원 API",
          "points": [
            "역할(시스템 관리자·보안 관리자·사용자)별로 알림 내역을 나눠 보여주고, **읽음 상태**를 관리하는 API를 만들었습니다.",
            "회원가입·정보 수정·삭제, 매장 관리자별 경비원 관리 API를 만들었습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "지도 · 대시보드 API",
          "points": [
            "매장 기준 **2km 안의 흉기 경보**와 가까운 경찰서·병원 정보를 지도에 보내는 API를 만들었습니다.",
            "대시보드의 출입·감지 통계 차트 API를 만들었습니다."
          ],
          "group": "백엔드"
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "흉기가 보이는 순간, 웹과 휴대폰으로 바로 알림",
        "summary": "매장 CCTV 영상을 YOLOv11로 실시간 분석해 흉기 소지자를 감지하고, 관리자와 주변 사용자에게 즉시 알리는 보안 서비스입니다. CCTV는 사람이 계속 지켜봐야 위험을 알 수 있고, 감지해도 관리자에게 바로 전달되지 않는 점을 해결하기 위해, 감지 즉시 관리자 웹에는 감지 사진과 함께 알림 창이, 휴대폰에는 푸시 알림이 가도록 했습니다. 지도에는 위험 위치와 2km 안의 경찰서·병원을 보여 주고, 시스템 관리자·보안 관리자·사용자 역할별로 화면과 알림을 나눴습니다. 6명이 6주 동안 개발했고, 저는 관리자 웹과 모바일 앱(Flutter)의 화면, 실시간 알림(WebSocket)·푸시(OneSignal) 서버, 회원·알림·지도 API를 맡았습니다.",
        "pairs": [
          {
            "problem": "묻지마 범죄가 잇따랐지만, CCTV는 사람이 계속 지켜봐야 위험을 안다",
            "solution": "CCTV 영상을 **AI가 실시간으로 분석**해 흉기를 든 사람을 감지합니다."
          },
          {
            "problem": "위험을 감지해도 관리자에게 바로 전해지지 않는다",
            "solution": "감지되는 즉시 **관리자 웹에는 감지 사진과 함께 알림 창**이, **휴대폰에는 푸시 알림**이 갑니다.",
            "tech": [
              "WebSocket",
              "OneSignal"
            ]
          },
          {
            "problem": "어디서 일어났는지, 어디로 도움을 청할지 알기 어렵다",
            "solution": "지도에 **위험 위치와 가까운 경찰서·병원**을 표시하고, 위험 구역은 원으로 보여 줍니다.",
            "tech": [
              "Kakao Map"
            ]
          }
        ],
        "outcome": "감지부터 알림, 위치 확인까지 이어지는 **관리자 웹과 모바일 앱**을 완성했습니다."
      },
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
      techStack: ["React", "Flutter", "WebSocket", "OneSignal", "YOLOv11", "Node.js", "FastAPI", "KakaoMap API", "MySQL", "Bootstrap", "Figma"],
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
        "여행은 가고 싶지만 계획 세우기는 귀찮은 사람(P 성향)에게, 블로그를 일일이 찾아보며 여행지를 고르는 일은 부담이었습니다.\n\n그래서 목적지·계절·동행·컨셉만 고르면 **실제 여행 블로그 글을 AI로 분석**해 맞는 여행지와 코스를 추천하고, **지도(카카오맵)와 캘린더**로 바로 이어 보게 했습니다.\n\n그 결과 취향 입력부터 추천, 지도, 코스까지 이어지는 **화면 흐름 전체를 프론트엔드 1명으로** 완성했습니다.",
      myWork: [
        {
          "heading": "여행 취향 입력 화면",
          "images": [
            "/project-images/project_p7.png"
          ],
          "points": [
            "가고 싶은 곳, 계절, 함께 갈 사람, 여행 스타일을 **한 화면에서 고르는** 입력 화면을 만들었습니다. (React)",
            "고른 내용을 하나로 묶어 AI 추천 서버에 보내는 과정을 구현했습니다. (`user_query` JSON)"
          ]
        },
        {
          "heading": "AI 추천 결과 화면",
          "images": [
            "/project-images/project_p8.png"
          ],
          "points": [
            "추천 여행지와 코스를 카드로 보여주고, 불러오는 중·결과 도착·결과 없음 상황마다 알맞은 화면이 나오게 했습니다.",
            "스크롤하면서 여러 추천을 자연스럽게 둘러볼 수 있게 배치했습니다."
          ]
        },
        {
          "heading": "여행지 상세 · 지도",
          "images": [
            "/project-images/project_p4.webp"
          ],
          "points": [
            "고른 여행지를 지도에 띄우고, 주소와 핵심 정보를 함께 볼 수 있게 배치했습니다. (KakaoMap API)"
          ]
        },
        {
          "heading": "캘린더",
          "images": [
            "/project-images/project_p6.webp"
          ],
          "points": [
            "달력으로 여행 날짜를 관리할 수 있게 했습니다. (FullCalendar)"
          ]
        },
        {
          "heading": "커뮤니티",
          "images": [
            "/project-images/project_p2.webp"
          ],
          "points": [
            "여행 후기 게시판과 블로그형 상세 화면을 만들었습니다."
          ]
        },
        {
          "heading": "홈 · 카테고리 · 마이페이지",
          "points": [
            "홈 화면에 **실시간 인기 여행지 TOP4**와 **맞춤 여행지 목록**을 보여주는 컴포넌트를 만들었습니다.",
            "지역별 여행지 목록에 **페이지 나누기**와 검색을 넣었고, 마이페이지에는 **전용 메뉴**와 **날씨 정보**를 붙였습니다."
          ]
        },
        {
          "heading": "로그인 · 접근 제어 · 관리자",
          "points": [
            "로그인 여부에 따라 **메뉴가 달라지고**, 로그인하지 않으면 접근할 수 없는 페이지를 구분했습니다. (Protected Routes)",
            "**아이디·비밀번호 찾기** 페이지와 회원가입 화면을 만들었습니다.",
            "관리자 화면에 **연령·성별 통계 차트**와 **회원 관리** 기능을 만들었습니다."
          ]
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "계획은 귀찮은 P를 위해, 취향만 고르면 여행 코스까지",
        "summary": "실제 여행 블로그 데이터를 크롤링·임베딩해, 사용자의 여행 성향에 맞는 여행지와 코스를 추천하는 AI 여행 서비스입니다. ‘만사가 귀찮은 P들을 위한 맞춤형 여행 가이드’를 콘셉트로, 목적지·계절·동행·컨셉만 고르면 추천 여행지와 일정 코스를 만들어 줍니다. 추천 여행지는 카카오맵으로 위치를 확인하고 캘린더로 여행 날짜를 관리할 수 있으며, 커뮤니티에서 여행 후기도 나눌 수 있습니다. 4명(프론트엔드 1, 백엔드/DB 2, PM·AI 1)이 함께했고, 저는 취향 입력부터 추천 결과, 지도, 마이페이지, 관리자 화면까지 프론트엔드 전체를 맡았습니다.",
        "pairs": [
          {
            "problem": "블로그를 일일이 찾아보며 여행지를 고르는 일이 부담이다",
            "solution": "목적지·계절·동행·컨셉만 고르면 **여행 블로그 데이터를 분석해 여행지와 코스를 추천**합니다. 고른 내용은 하나로 묶어 AI 추천 서버로 보냅니다.",
          },
          {
            "problem": "추천을 받아도 위치와 일정은 따로 챙겨야 한다",
            "solution": "추천 여행지를 **지도**로 보고, **캘린더**로 여행 날짜를 관리합니다.",
            "tech": [
              "Kakao Map",
              "FullCalendar"
            ]
          }
        ],
        "outcome": "취향 입력부터 추천, 지도, 코스까지 이어지는 **화면 흐름 전체를 프론트엔드 1명으로** 완성했습니다."
      },
      problems: [], // TODO
      techReasons: [], // TODO
      results: [
        { text: "성향 입력 → AI 추천 결과 → 지도 상세 → 맞춤 여행 코스 리포트까지 **프론트엔드 전체 흐름**을 구현했습니다.", basis: "화면 캡처 · 시연 영상" },
        { text: "로그인 여부에 따라 메뉴·페이지 접근이 달라지는 라우팅 구조를 만들었습니다.", basis: "화면 캡처" },
      ],
      techStack: ["React", "KakaoMap API", "FullCalendar", "OpenAI Embedding", "Spring Boot", "Java", "Oracle", "React-Bootstrap", "JavaScript"],
    },
  },

  /* 7 ─ Talaria */
  {
    title: "두 세계를 잇는 실시간 AI 번역 플랫폼",
    subtitle: "CLOVA 음성 인식과 Papago·AI 번역을 활용한 실시간 번역 및 비즈니스·문화 맞춤형 화상회의 서비스",
    tags: ["FE", "웹", "디자인", "팀"],
    image: "/project-images/project_tal1.png",
    type: "talaria",
    details: {
      modalTitle: "Talaria · 두 세계를 잇는 실시간 AI 번역 플랫폼",
      subtitle: "CLOVA 음성 인식과 Papago·AI 번역 기반 실시간 자막, 비즈니스·문화 모드를 갖춘 화상회의 서비스",
      period: "2025.10 - 2025.12 (3개월)",
      members: "3인 개발 (프론트엔드 1, 백엔드 1, AI 1)",
      roleShort: "Frontend 전담 · UI/UX 총괄 · Backend 참여",
      roleSummary: "3인 팀에서 프론트엔드를 전담하고 UI/UX를 총괄했습니다. 백엔드에서도 로그인, 문서, 캘린더, 회의 입장 API를 함께 만들었습니다.",
      contribution: "70%",
      award: "2025 실전프로젝트 우수상",
      modalImages: [
        "/project-images/project_tal2.png", "/project-images/project_tal3.png", "/project-images/project_tal4.png", "/project-images/project_tal5.png",
        "/project-images/project_tal13.webp", "/project-images/project_tal6.png", "/project-images/project_tal7.png", "/project-images/project_tal8.png",
        "/project-images/project_tal9.png", "/project-images/project_tal10.png", "/project-images/project_tal11.png", "/project-images/project_tal12.png",
        "/project-images/project_tal14.webp", "/project-images/project_tal15.webp", "/project-images/project_tal16.webp", "/project-images/project_tal17.webp", "/project-images/project_tal18.webp", "/project-images/project_tal19.webp", "/project-images/project_tal21.webp", "/project-images/project_tal22.webp", "/project-images/project_tal23.webp", "/project-images/project_tal24.webp", "/project-images/project_tal25.webp",
      ],
      urls: { githubURL: "https://github.com/jingeunlee4559/talaria-frontend", githubLinks: [{ label: "Frontend", url: "https://github.com/jingeunlee4559/talaria-frontend" }, { label: "Backend", url: "https://github.com/jingeunlee4559/talaria-backend-" }, { label: "AI", url: "https://github.com/jingeunlee4559/talaria-ai" }], serviceURL: null, blogURL: null },
      videoURL: "/video/Talaria.mp4",
      overview:
        "외국인과 IT 관련 회의를 하면 번역 자막을 따라 읽느라 흐름을 놓치기 쉽습니다. 게다가 IT 전문 용어는 번역으로 정확히 옮기기 어렵고, 참여자가 모두 IT 직군은 아니라서 용어 자체가 낯설 수도 있었습니다. 밈이나 K-컬처 표현은 단어 그대로 번역되면 그 안의 맥락이 전해지지 않았습니다.\n\n그래서 **원래 말과 번역을 함께 띄우는 실시간 자막(LiveKit)**과, **IT 용어 사전과 회의 자료를 참고해 번역을 더 정확하게 하는 기능(RAG)**을 만들었습니다. 그리고 비즈니스 모드의 IT 용어든 문화 모드의 밈·신조어든, **어려운 표현이 나오면 무슨 의미인지 설명을 함께 보여 주어** 맥락까지 전달되게 했습니다.\n\n그 결과 비즈니스 모드에서는 **자막·자료·요약을 한 화면에서 보는 회의 화면**을, 문화 모드에서는 **밈과 K-컬처를 의미 설명과 함께 즐기는 라이브 화면**을 완성해 2025 실전프로젝트 우수상을 받았습니다.",
      myWork: [
        {
          "heading": "실시간 회의 화면",
          "images": [
            "/project-images/project_tal5.png"
          ],
          "points": [
            "사람이 들어오고 나갈 때마다 **얼굴 화면 칸이 알아서 자리를 맞춰** 정렬되게 했습니다. (LiveKit, 커스텀 그리드)",
            "상대가 말하면 위에는 원래 말이, 아래에는 **번역된 말이 자막으로** 뜨게 했습니다. (음성 인식 STT)"
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "회의 목록",
          "images": [
            "/project-images/project_tal3.png"
          ],
          "points": [
            "회의에 들어가기 전, 문서 아이콘을 눌러 **회의 자료를 미리 올릴 수** 있게 했습니다.",
            "언어, 연결할 회의, AI 참고(RAG) 사용 여부를 고르고, 파일은 끌어다 놓아 올립니다. (Drag & Drop)",
            "파일 형식과 크기를 미리 확인하고, 업로드 결과에 따라 알맞은 안내 메시지가 뜹니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "회의 요약",
          "images": [
            "/project-images/project_tal6.png"
          ],
          "points": [
            "회의가 끝나면 정리된 요약을 한 화면에서 볼 수 있게 했습니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "대시보드",
          "images": [
            "/project-images/project_tal4.png"
          ],
          "points": [
            "오늘 회의, 일정, 최근 문서와 회의록을 카드로 한눈에 보는 화면을 만들었습니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "캘린더",
          "images": [
            "/project-images/project_tal9.png"
          ],
          "points": [
            "달력에서 회의 일정을 보고 관리할 수 있습니다. (FullCalendar)"
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "회의 문서 선택",
          "images": [
            "/project-images/project_tal8.png"
          ],
          "points": [
            "회의에 쓸 문서를 **직접 검색하고 골라** 회의에 추가할 수 있게 했습니다.",
            "내 문서와 회의 문서를 나눠 보여주고, 원문·번역 필터와 **여러 개 한 번에 선택**하는 기능으로 필요한 자료를 쉽게 찾을 수 있습니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "회의 문서 뷰어",
          "images": [
            "/project-images/project_tal13.webp"
          ],
          "points": [
            "문서와 회의록을 걸러 보고 정렬할 수 있게 하고, PDF는 **원문과 번역본을 나란히 또는 탭으로** 비교해 볼 수 있게 했습니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "회의 입장 전 점검",
          "images": [
            "/project-images/project_tal25.webp"
          ],
          "points": [
            "회의실에 들어가기 전에 **카메라·마이크를 고르고 내 화면을 미리 볼 수 있는** 대기 화면을 만들었습니다.",
            "입장 전에 장치 선택, 권한 허용 확인, 네트워크가 불안정할 때의 대처법을 안내합니다.",
            "회의에서 쓸 이름을 입력하고 바로 입장할 수 있게 했습니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "문서 업로드",
          "images": [
            "/project-images/project_tal21.webp"
          ],
          "points": [
            "문서 이름과 원문 언어를 정하고, 파일을 끌어다 놓거나 클릭해 올리는 업로드 창을 만들었습니다.",
            "허용 확장자(pdf, doc, docx, ppt, pptx, hwp)와 최대 용량(100MB)을 안내하고, 올린 파일이 조건에 맞는지 검사합니다.",
            "번역 정확도를 높이는 **문맥 기반 번역(RAG)** 을 켜고 끌 수 있는 설정을 넣었습니다."
          ],
          "group": "비즈니스 모드"
        },
        {
          "heading": "문화 모드 메인 · 퀴즈",
          "images": [
            "/project-images/project_tal10.png",
            "/project-images/project_tal11.png"
          ],
          "points": [
            "문화 모드의 메인 화면과 퀴즈 화면을 만들었습니다."
          ],
          "group": "문화 모드"
        },
        {
          "heading": "문화 라이브 화면 · 밈 효과",
          "images": [
            "/project-images/project_tal12.png"
          ],
          "points": [
            "K-POP·게임·밈 분위기의 배경과 효과를 영상 화면 위에 입혔습니다.",
            "채팅에 신조어나 밈 단어가 나오면 바로 강조되고, 이모지·효과 버튼을 누르면 화면에 효과가 나타납니다.",
            "휴대폰에서는 영상, 버튼, 탭 순서로 배치해 한 손으로도 쓸 수 있게 했습니다."
          ],
          "group": "문화 모드"
        },
        {
          "heading": "라이브 방송 만들기",
          "images": [
            "/project-images/project_tal14.webp",
            "/project-images/project_tal15.webp",
            "/project-images/project_tal16.webp"
          ],
          "points": [
            "방송 제목, 설명, 태그, 언어를 입력해 문화 라이브를 여는 화면을 만들었습니다.",
            "공개 범위를 고를 수 있고, **비공개 라이브는 비밀번호를 입력해야** 입장할 수 있습니다.",
            "썸네일은 끌어다 놓거나 클릭해 올릴 수 있습니다. (PNG·JPG, 최대 5MB)"
          ],
          "group": "문화 모드"
        },
        {
          "heading": "배경 테마 · 카메라 배경",
          "images": [
            "/project-images/project_tal17.webp",
            "/project-images/project_tal18.webp"
          ],
          "points": [
            "클릭 한 번으로 라이브 방 전체 배경 테마를 바꾸고, 바꾼 테마는 **모든 참가자에게 실시간으로 똑같이** 보이게 했습니다.",
            "카메라를 켜면 인물 뒤에, 끄면 대신 보일 배경을 고를 수 있습니다. 경복궁·서울 야경 같은 한국 명소 배경을 넣었습니다."
          ],
          "group": "문화 모드"
        },
        {
          "heading": "번역 채팅",
          "images": [
            "/project-images/project_tal19.webp"
          ],
          "points": [
            "채팅 메시지를 **원문과 번역문을 한 말풍선에** 함께 보여줍니다.",
            "AI가 부적절하다고 판단한 메시지는 원문과 번역 모두 안내 문구로 가려지고, 욕설은 ***로 가려진 채 표시되도록 화면을 만들었습니다."
          ],
          "group": "문화 모드"
        },
        {
          "heading": "첫 화면",
          "images": [
            "/project-images/project_tal2.png"
          ],
          "points": [
            "비즈니스와 문화 모드를 소개하는 첫 화면과, 어느 화면에서나 쓰는 공통 상단 메뉴(로고, 모드 전환, 알림, 프로필)를 만들었습니다."
          ],
          "group": "공통"
        },
        {
          "heading": "연결 중 · 오류 화면",
          "images": [
            "/project-images/project_tal22.webp",
            "/project-images/project_tal23.webp",
            "/project-images/project_tal24.webp"
          ],
          "points": [
            "회의실에 들어가는 동안 진행 표시와 연결 팁(안정적인 인터넷 권장)을 보여줍니다.",
            "문화 라이브는 모드 분위기에 맞춘 전용 연결 화면을 따로 만들었습니다.",
            "회의 정보를 불러오지 못하면 오류 내용과 **'홈으로 돌아가기'** 버튼을 보여줘, 사용자가 다음에 할 일을 알 수 있게 했습니다."
          ],
          "group": "공통"
        },
        {
          "heading": "로그인 · 회원 API",
          "points": [
            "로그인·로그아웃 API를 만들었습니다. (Spring Boot, MyBatis)"
          ],
          "group": "백엔드"
        },
        {
          "heading": "문서 API",
          "points": [
            "문서를 올릴 때 **원문 언어까지 함께 저장**하는 업로드 API를 만들었습니다.",
            "올린 문서를 **미리보기·다운로드**하고, 회의별 문서 목록을 보고 삭제하는 API를 만들었습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "캘린더 API",
          "points": [
            "회의 일정을 **추가·조회·수정·삭제**하는 API를 만들었습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "회의 입장 · 참가자 처리",
          "points": [
            "**진행 중인 회의에만 입장**할 수 있게 하고, 회의실의 전체 참가자 수를 보여주도록 처리했습니다.",
            "대시보드에 프로필과 **호스트 표시**가 나오도록 했습니다.",
            "참가자가 영상·음성을 **보내고 받을 수 있는 권한**(LiveKit 송출·수신)을 설정했습니다."
          ],
          "group": "백엔드"
        },
        {
          "heading": "AI 서버 일부 수정",
          "points": [
            "회의 참가자마다 **설정한 언어로 음성 인식·번역이 연결되도록** LiveKit 에이전트 코드를 일부 수정했습니다. (Python)",
            "Papago 문서 번역 연동 부분을 수정했습니다."
          ],
          "group": "백엔드"
        }
      ],
      // 소개 칸: 개요 → 불편·해결 → 성과
      story: {
        "headline": "번역을 넘어, 맥락까지 전하는 실시간 소통 플랫폼",
        "summary": "외국인과 함께하는 IT 회의와 K-컬처 라이브를 위한 실시간 번역 플랫폼입니다. LiveKit(WebRTC) 화상회의 위에 음성 인식(STT)과 번역을 얹어, 말하는 즉시 원문과 번역 자막이 화면에 뜹니다. 비즈니스 모드에서는 회의 자료 번역과 원문·번역본 대조, 회의 일정 관리, 회의 요약과 매너 코칭을 지원하고, 문화 모드에서는 밈·신조어 설명, 테마 배경과 이펙트, 밈 퀴즈, 커뮤니티로 K-컬처를 함께 즐기는 라이브를 지원합니다. 3명(프론트엔드 1, 백엔드 1, AI 1)이 3개월 동안 개발했고, 저는 프론트엔드 전체와 UI/UX를 맡고 백엔드 일부(로그인·문서·캘린더·회의 입장)에도 참여했습니다.",
        "pairs": [
          {
            "problem": "자막을 따라 읽느라 회의 흐름을 놓친다",
            "solution": "말하는 즉시 **원문과 번역을 위아래로 함께** 띄우는 실시간 자막. 채팅도 원문과 번역을 한 말풍선에 보여 줍니다.",
            "tech": [
              "LiveKit"
            ]
          },
          {
            "problem": "IT 전문 용어는 일반 번역으로 정확히 옮기기 어렵다",
            "solution": "**IT 용어 사전과 회의 자료를 참고해** 문맥에 맞게 번역합니다. 문서는 원문과 번역본을 나란히 비교할 수 있습니다.",
            "tech": [
              "react-pdf"
            ]
          },
          {
            "problem": "참여자가 모두 IT 직군은 아니라 용어 자체가 낯설다",
            "solution": "어려운 용어가 나오면 **무슨 뜻인지 설명을 함께** 보여 줍니다."
          },
          {
            "problem": "대화가 지나가면 놓친 내용을 다시 보기 어렵다",
            "solution": "회의가 끝나면 **정리된 요약과 회의록**을 한 화면에서 봅니다."
          },
          {
            "problem": "밈·K-컬처 표현은 직역하면 맥락과 재미가 사라진다",
            "solution": "문화 모드에서 **밈·신조어의 의미를 설명**하고, 콘셉트 배경과 효과를 모든 참가자에게 똑같이 보여 **분위기까지** 전합니다.",
            "tech": [
              "LiveKit DataChannel"
            ]
          }
        ],
        "outcome": "비즈니스 회의 화면과 문화 라이브 화면을 **하나의 React 화면**으로 완성하고, PC·태블릿·모바일에서 모두 쓸 수 있게 만들었습니다."
      },
      collab: [
        {
          title: "비즈니스 전용 → 문화 모드 추가",
          when: "개발 약 1.5개월 차",
          situation: "처음에는 비즈니스 화상회의만 만드는 기획이었는데, 개발 중에 **\"비즈니스 기능만으로는 무난하고 차별점이 약하다\"는 교육과정 담임 선생님의 피드백**을 받았습니다. 팀 회의에서 \"프로젝트의 독창성을 어떻게 더할까\"를 논의해, K-컬처·밈 라이브를 위한 **문화 모드를 추가**하기로 했습니다.",
          response: [
            "이미 만든 비즈니스 화면에 주는 영향을 줄이도록, **주소(/business, /culture)와 화면 틀(레이아웃)을 모드별로 나눠** 새 모드를 붙였습니다.",
            "백엔드 팀원이 **모드별 회의 API**를 추가하는 일정에 맞춰, **배경 테마 → 라이브·커뮤니티 화면 → 문화 영상 목록·퀴즈 → 문화 체크·채팅** 순서로 화면을 만들었습니다.",
          ],
          result: "비즈니스 기능은 유지하면서, **남은 짧은 기간 안에** 문화 모드 화면을 완성해 **두 모드를 모두 마무리**했습니다.",
        },
      ],
      problems: [
        {
          title: "카메라를 끄면 배경 설정이 다른 참가자에게 보이지 않는 문제",
          situation: "카메라 OFF 상태에서 내가 정한 배경 테마가 참가자 간에 동기화되지 않아, 다른 참가자 화면에서는 설정한 배경이 유지되지 않는 UX 불일치가 생겼습니다.",
          cause: "배경 설정이 **내 화면의 로컬 상태로만** 바뀌고 다른 참가자에게 전파되지 않았습니다. 실시간 상태 동기화 구조가 없었습니다.",
          solution: "**LiveKit DataChannel**로 배경 설정값을 실시간 공유하고, 참가자별 **상태 맵(State Map)**을 만들어 모든 화면이 같은 값을 참조하도록 구조를 고쳤습니다.",
          result: ["카메라를 꺼도 **모든 참가자가 같은 배경**을 보게 됐습니다."],
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
      techStack: ["React", "LiveKit", "JavaScript", "Tailwind CSS", "Context API", "react-pdf", "react-dropzone", "FullCalendar", "SweetAlert2", "Figma"],
    },
  },
];
