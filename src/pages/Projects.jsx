// Projects.jsx
import React, { useState } from 'react';
import ProjectModal from '../components/Projects/ProjectModal'; // 모달 컴포넌트 임포트
import { FaSearch } from 'react-icons/fa';

// 태그별 스타일 매핑
const tagColors = {
  디자인: 'bg-pink-200 text-pink-800',
  FE: 'bg-blue-200 text-blue-800',
  서버: 'bg-yellow-200 text-yellow-800',
  웹: 'bg-green-200 text-green-800',
  기획: 'bg-indigo-200 text-indigo-800',
  팀: 'bg-purple-200 text-purple-800',
  AI: 'bg-red-200 text-red-800',
  시각화: 'bg-teal-200 text-teal-800',
  BE: 'bg-skyblue-200 text-blue-800',
};



// 프로젝트 데이터 (details 속성 포함)
const projects = [
  {
    title: '카페 좌석 예약 웹 서비스 플랫폼',
    subtitle: '광주 동네카페 좌석 예약과 음료 주문을 웹에서 간편하게!',
    tags: ['디자인', 'FE', '웹','팀'],
    image: '/project-images/camomile_main.png',
    type: 'camomile',
    details: {
      modalTitle: '카모마일 (Camomile)',
      subtitle: '동네카페 좌석 예약과 음료 주문을 한 번에 해결하는 통합 예약 서비스',
      period: '2022.10 - 2022.11 (3주)',
      members: '4인 개발',
      modalImages: [
        '/project-images/camomile_screenshot1.png',
        '/project-images/camomile_screenshot2.png',
        '/project-images/camomile_screenshot3.png',
      ],
            urls: { // <--- 이 부분을 각 프로젝트 details에 추가해야 합니다.
        githubURL: 'https://github.com/2022-SMHRD-SW-BigData-1/Camomile',
        serviceURL: 'null',
        blogURL: 'null', // 또는 'https://your-blog-1.com'
      },
      overview: '광주 지역 동네 카페를 한눈에 확인하고, 원하는 시간에 편리하게 좌석 예약과 음료 주문을 웹에서 간편하게 할 수 있는 스마트 예약 플랫폼입니다. 고객의 편리성과 카페 운영 효율을 모두 높였습니다.',
      features: [
        {
          heading: 'UI/UX 디자인',
          description: '로그인 페이지 및 지도 페이지의 사용자 인터페이스를 디자인하고 구현.'
        },
        {
          heading: '로그인 기능 구현',
          description: '사용자 인증을 위한 로그인 기능 구현.'
        },
        {
          heading: '지도 페이지 구현',
          description: '카카오맵 API를 활용, 광주 지역 카페 위치 마커 및 상세정보 팝업 오버레이 구현.'
        }
      ],
      results: 'React 프론트엔드 최적화로 UI 설계 효율성 및 재사용성 극대화. Node.js와 MySQL DB 최적화로 데이터 처리 성능 및 시스템 안정성 강화. KakaoMap 연동으로 사용자 경험 향상. Notion, Slack 협업으로 프로젝트 완성도 제고.',
      techStack: ['React', 'Node.js', 'MySQL', 'KakaoMapAPI'],
    },
  },
{
  title: '머신러닝 기반 AI 신호등 관리자 웹 서비스 플랫폼',
  subtitle: 'AI 신호등 관제 웹 서비스, 신호등 고장 감지 및 대응',
  tags: ['디자인', 'FE', 'BE','웹','팀'],
  image: '/project-images/project_ssg1.png',// Assuming this is a placeholder or generic image path
  type: 'generic',
  details: {
    modalTitle: '머신러닝 기반 AI 신호등 관리자 웹 서비스 플랫폼',
    subtitle: '머신러닝 기반 신호등 고장 감지 및 관제 솔루션',
    period: '2023.01 - 2023.02 (5주)',
    members: '5인 개발',
    modalImages: [
        '/project-images/project_ssg1.png',
        '/project-images/project_ssg2.png',
        '/project-images/project_ssg3.png',
    ], // No specific images provided, keeping empty
    urls: { // <--- 이 부분을 각 프로젝트 details에 추가해야 합니다.
        githubURL: 'https://github.com/2022-SMHRD-SW-BigData-1/SSG',
        serviceURL: 'null',
        blogURL: 'null', // 또는 'https://your-blog-1.com'
      },
    overview: '머신러닝을 활용해 신호등의 고장 여부를 자동 감지하고, 관리자가 효율적으로 신호등 상태를 관리할 수 있도록 지원하는 플랫폼입니다. 저는 이 프로젝트에서 관리자 웹 서비스의 프론트엔드 및 백엔드 개발, 그리고 전체적인 UI/UX 디자인을 담당했습니다.', // Clarified role
    features: [
      {
        heading: 'AI 고장 감지 시스템 연동',
        description: '머신러닝 모델을 통해 신호등 센서 데이터가 분석되고 이상 발생 시 자동 감지되는 시스템이 있으며, 저는 해당 시스템에서 제공하는 데이터를 받아 웹 플랫폼에 실시간으로 표시하고 관리하는 기능을 구현했습니다.' // Clarified role
      },
      {
        heading: '관리자 대시보드',
        description: '실시간 신호등 상태 모니터링, 고장 알림 확인, 고장 이력 관리 등 신호등 운영 현황을 한눈에 파악하고 관리할 수 있는 대시보드를 구현했습니다.'
      },
      {
        heading: '통계 및 차트 페이지 구현',
        description: '신호등 운영 데이터(교통량, 사고 발생률 등)를 기반으로 통계 자료를 생성하고, Chart.js 라이브러리를 활용하여 이를 시각적인 차트로 구현하여 제공했습니다.'
      },
      {
        heading: '지역별 관할서 및 이상 내역 관리',
        description: '지도에서 신호등 마커 클릭 시 가까운 관할서 정보와 이상 내역을 팝업으로 표시하며, react-table 라이브러리를 활용하여 이상 내역을 효과적으로 관리할 수 있는 페이지를 구현했습니다.'
      }
    ],
    results: '신호등 고장으로 인한 교통 혼란을 최소화하고, 관리자가 신호등 상태를 효율적으로 파악하고 대응함으로써 유지보수 비용 절감에 기여했습니다.', // Adjusted to reflect your contribution
    techStack: ['Python', 'Node.js', 'React', 'MySQL', 'KakaoMapAPI', 'Chart.js', 'react-table'], // Removed Yolov5 as you didn't do AI, added Chart.js and react-table
  },
},
{
  title: '사용자 성향 기반 여행 동행자 추천 서비스 플랫폼',
  subtitle: '혼행족을 위한 맞춤 여행 동행자 추천',
  tags: ['FE', 'BE','웹','팀','디자인'],
  image: '/project-images/project_with1.png',// Assuming this is a placeholder or generic image path
  type: 'generic',
  details: {
    modalTitle: '여행 동행자 추천 서비스',
    subtitle: '사용자 성향 조사 데이터를 활용한 동행자 매칭 플랫폼',
    period: '2023.12 - 2024.01 (5주)',
    members: '4인 개발',
    modalImages: [
        '/project-images/project_with1.png',
        '/project-images/project_with2.png',
        '/project-images/project_with3.png',
        '/project-images/project_with4.png',

    ], // No specific images provided, keeping empty
        urls: { // <--- 이 부분을 각 프로젝트 details에 추가해야 합니다.
        githubURL: 'https://github.com/2023-SMHRD-IS-AI1/WithusRepo',
        serviceURL: 'null',
        blogURL: 'null', // 또는 'https://your-blog-1.com'
      },
    overview: '사용자 성향, 생활 스타일, 교통수단 등 세분화된 데이터를 바탕으로 혼행족을 위한 동행자를 추천하는 웹 서비스입니다. 저는 이 프로젝트에서 프론트엔드 개발, 백엔드 시스템 구축 및 API 연동을 담당하여 서비스의 전반적인 기능을 구현했습니다.', // Clarified role
    features: [
      {
        heading: '동행자 추천 시스템 연동',
        description: '성향 분석을 통해 여행 동행자를 매칭하는 로직이 있으며, 저는 이 추천 로직과 연동하여 사용자에게 결과를 효과적으로 표시하는 기능을 구현했습니다.' // Clarified role
      },
      {
        heading: '위치 기반 맛집 및 관광지 정보',
        description: '카카오맵 API를 활용하여 사용자의 위치 기반으로 주변 맛집 및 관광지 위치와 상세 정보를 지도에 표시하는 기능을 구현했습니다.'
      },
      {
        heading: '리뷰 및 후기 시스템',
        description: '사용자들이 여행 후기를 작성하고 다른 사용자와 공유할 수 있는 커뮤니티 기능을 개발했습니다.'
      }
    ],
    results: '여행 경험의 질을 높이고, 혼행족 커뮤니티 활성화에 기여하여 사용자들에게 더욱 풍부한 여행 경험을 제공할 수 있도록 지원했습니다.', // Adjusted to reflect your contribution
    techStack: ['Spring', 'Java', 'Python', 'MySQL', 'JSP', 'KakaoMapAPI'], // Kept existing tech stack, as Python can be used for backend/API without doing AI directly
        videoURL: "/video/withus.mp4"
  },
},
{
  title: '신발 리뷰 분석 서비스',
  subtitle: '리뷰 텍스트 분석으로 인기 신발 랭킹 제공',
  tags: ['FE', 'BE', '디자인','웹','팀'],
  image: '/project-images/project_read.png', // Assuming this is a placeholder or generic image path
  type: 'generic',
  details: {
    modalTitle: '신발 리뷰 분석 서비스',
    subtitle: '자연어처리 기반 신발 리뷰 분석 및 인기 랭킹 제공',
    period: '2024.03 - 2024.04 (5주)',
    members: '5인 개발',
    modalImages: [

        '/project-images/project_read.png',
        '/project-images/project_read1.png',
        '/project-images/project_read2.png',
        '/project-images/project_read3.png',
        '/project-images/project_read4.png',
        '/project-images/project_read5.png',
        '/project-images/project_read6.png',
        '/project-images/project_read7.png',
        '/project-images/project_read8.png',

    ], // No specific images provided, keeping empty
            urls: { // <--- 이 부분을 각 프로젝트 details에 추가해야 합니다.
        githubURL: 'https://github.com/illhanunjung/ReadFit',
        serviceURL: 'null',
        blogURL: 'null', 
      },
    overview: '온라인 쇼핑몰 신발 리뷰 데이터를 기반으로 인기 신발 랭킹 및 감성 분석 결과를 제공하는 서비스입니다. 저는 이 프로젝트에서 분석된 데이터를 시각화하는 프론트엔드 개발, 백엔드 시스템 구축, 그리고 전체적인 UI/UX 디자인을 담당했습니다.', // Clarified role
    features: [
      {
        heading: '분석 데이터 시각화',
        description: '크롤링 및 자연어 처리를 통해 분석된 신발 리뷰 데이터를 사용자 친화적인 형태로 웹 인터페이스에 시각화하여 제공했습니다.' // Clarified role
      },
      {
        heading: '감성 분석 결과 표시',
        description: '리뷰 텍스트의 긍정/부정 감성 분석 결과를 받아 이를 웹 화면에 효과적으로 표시하는 기능을 구현했습니다.' // Clarified role
      },
      {
        heading: '인기 랭킹 및 특징 제공',
        description: '분석 결과를 바탕으로 신발별 인기 랭킹과 주요 특징을 사용자에게 제공하는 기능을 개발했습니다.'
      },
      {
        heading: '데이터 API 연동',
        description: '자연어 처리 및 크롤링 모듈에서 처리된 데이터를 백엔드 API를 통해 효율적으로 연동하고 관리했습니다.' // Emphasized BE role in data handling
      }
    ],
    results: '소비자들이 신발 구매 시 객관적인 정보를 얻을 수 있도록 돕고, 제조업체에는 시장 트렌드 파악에 필요한 데이터를 시각적으로 제공하여 의사결정을 지원했습니다.', // Adjusted to reflect your contribution
    techStack: ['Python', 'Spring Boot', 'React', 'Koelectra', 'Chart.js'], // Kept existing tech stack, as Python can be used for backend/API without doing NLP directly
        videoURL: "/video/readfit.mp4"
  },
},
{
  title: '유사도 분석 기반 개인 맞춤형 웨딩플랜 서비스',
  subtitle: '웨딩홀, 스드메 등 맞춤 웨딩플랜 추천',
  tags: ['FE', '디자인', 'BE','웹','팀'],
  image:  '/project-images/project_wd.png', 
  type: 'generic',
  details: {
    modalTitle: '웨딩플랜 서비스',
    subtitle: '유사도 분석을 활용한 맞춤 웨딩플랜 추천 플랫폼',
    period: '2024.07 - 2024.08 (4주)',
    members: '5인 개발',
    modalImages: [

        '/project-images/project_wd.png',
        '/project-images/project_wd1.png',
        '/project-images/project_wd2.png',
        '/project-images/project_wd3.png',
        '/project-images/project_wd4.png',
        '/project-images/project_wd5.png',
        '/project-images/project_wd6.png',
        '/project-images/project_wd7.png',


    ], // No specific images provided, keeping empty
         urls: { 
        githubURL: 'https://github.com/2024-AISCHOOL-APP/In_site',
        serviceURL: 'null',
        blogURL: 'null',
      },
    overview: '광주 지역 결혼 예정자를 위한 웨딩홀, 스드메 등 맞춤 웨딩플랜 추천 및 예약 서비스입니다. 저는 이 프로젝트에서 프론트엔드 개발, 백엔드 시스템 구축 및 FastAPI 연동, 그리고 전체적인 UI/UX 디자인을 담당했습니다.', // Clarified role
    features: [
      {
        heading: 'AI 웨딩플랜 연동',
        description: '입력 데이터 기반 맞춤 웨딩홀/스드메 조합을 추천하는 AI 모듈이 있으며, 저는 해당 모듈과의 **FastAPI 연동**을 통해 추천 결과를 서비스에 반영했습니다.' // Clarified role
      },
      {
        heading: '캘린더 및 일정 관리',
        description: 'FullCalendar 및 날씨 API 연동을 통해 예비 부부의 웨딩 일정을 시각적으로 관리하고 중요한 날의 날씨 정보를 표시하는 기능을 구현했습니다.'
      },
      {
        heading: '가게 정보 및 예약',
        description: '웨딩홀, 스드메 등 각 가게별 가격, 이미지, 위치 정보를 제공하고, 사용자가 원하는 상품을 간편하게 예약할 수 있는 기능을 개발했습니다.'
      }
    ],
    results: '복잡한 웨딩 준비 과정을 간소화하고, 예비부부에게 개인 맞춤형 웨딩 서비스를 효율적으로 제공했습니다. 특히 AI 추천 시스템과의 성공적인 연동으로 서비스의 핵심 가치를 높였습니다.', // Emphasized your contribution
    techStack: ['React', 'Node.js', 'MySQL', 'Python (FastAPI 연동)', 'Figma', 'Bootstrap', 'KakaoMapAPI', 'FullCalendarAPI', 'Weather API'], // Added FastAPI 연동 and FullCalendar/Weather API
    videoURL: "/video/insight.mp4"
  },
},
{
  title: 'YOLOv11 기반 실시간 흉기 소지자 알림 서비스',
  subtitle: 'CCTV 영상 분석 기반 실시간 위험 알림',
  tags: ['FE', 'BE', '디자인', '웹', '앱','팀'], 
  image: '/project-images/project_as.png',
  type: 'generic',
  details: {
    modalTitle: 'YOLOv11 기반 실시간 흉기 소지자 알림 서비스',
    subtitle: '실시간 CCTV 영상 분석 및 위험 알림 시스템',
    period: '2024.10 - 2024.11 (6주)',
    members: '6인 개발',
    modalImages: [

       '/project-images/project_as.png',        
       '/project-images/project_as1.png',        
       '/project-images/project_as2.png',        
       '/project-images/project_as3.png',        
       '/project-images/project_as4.png',        
       '/project-images/project_as5.png',        
       '/project-images/project_as6.png',        
       '/project-images/project_as7.png',        
       '/project-images/project_as8.png',        
       '/project-images/project_as9.png',        
       '/project-images/project_as10.png',        

    ], 
      urls: { 
        githubURL: 'https://github.com/Kim-Ji-Man/Ask-Me',
        serviceURL: 'null',
        blogURL: 'null', 
      },
    overview: 'YOLOv11 모델로 CCTV 영상을 실시간 분석, 흉기 소지자 감지 시 관리자/경비원/사용자에게 실시간 알림을 제공하는 서비스입니다. 저는 이 프로젝트에서 웹 및 앱 프론트엔드 개발, 백엔드 시스템 구축, 그리고 전체적인 UI/UX 디자인을 담당했습니다.', // Clarified role
    features: [
      {
        heading: '실시간 흉기 감지',
        description: 'YOLOv11 모델을 활용한 CCTV 영상 내 흉기 소지자 실시간 감지 시스템이 포함되어 있으며, 저는 이 시스템과 연동되는 인터페이스를 개발했습니다.' // Clarified role
      },
      {
        heading: '푸시/웹소켓 알림',
        description: 'WebSocket 및 OneSignal API를 활용하여 감지된 위험 상황을 관리자, 경비원, 사용자에게 실시간으로 푸시 알림 및 웹소켓 알림으로 전달하는 기능을 구현했습니다.'
      },
      {
        heading: '관리자/보안 관리자 기능',
        description: '대시보드, 회원 관리, 알림 내역 조회 등 시스템 운영 및 관리를 위한 웹 기반 관리자 기능을 구현했습니다.'
      },
      {
        heading: '모바일 앱 개발',
        description: 'Flutter를 활용하여 사용자 및 보안 관리자가 실시간 알림을 받고 상황을 확인할 수 있는 모바일 애플리케이션을 개발했습니다.' // Added app development feature
      }
    ],
    results: '실시간 위험 상황 대응력 강화, 보안 관리 효율성 향상. 특히 웹 및 모바일 앱을 통한 사용자 접근성 및 관리 편의성을 크게 높였습니다.', // Emphasized your contribution
    techStack: ['Node.js', 'MySQL', 'FastAPI', 'React', 'Flutter', 'WebSocket', 'OneSignal', 'KakaoMapAPI'], // Reflects your contribution in FE/BE/App
    videoURL: "/video/askme.mp4"
  },
},
{
  title: '여행데이터 기반 AI 여행지 추천 서비스',
  subtitle: '여행 블로그 데이터 기반 맞춤형 AI 여행지 추천',
  tags: ['FE', '웹','디자인', '팀'],
  image: '/project-images/project_p1.png', // TODO: 실제 썸네일 이미지 경로로 수정
  type: 'generic',
  details: {
    modalTitle: 'P들의 블로그 여행데이터 기반 AI 여행지 추천 서비스',
    subtitle: '여행 블로그 크롤링·임베딩 기반 AI 여행지 추천 플랫폼',
    period: '2025.08 - 2025.08 (4주)', // TODO: 예) '2024.07 - 2024.08 (4주)'
    members: '4인 개발 (프론트엔드 1, 백엔드/DB 2, PM & AI 1)',

    modalImages: [
      // TODO: 실제 캡처 이미지 경로들로 채우기
      '/project-images/project_p2.webp',
      '/project-images/project_p3.webp',
      '/project-images/project_p4.webp',
      '/project-images/project_p5.webp',
      '/project-images/project_p6.webp',
      '/project-images/project_p7.png',
       '/project-images/project_p8.png',
    ],

    urls: {
      githubURL: 'https://github.com/jingeunlee4559/miniproject2',   // TODO: 깃허브 레포 있으면 링크 입력
      serviceURL: 'null',
      blogURL: 'null'
    },

    overview:
      '여행 블로그 데이터를 크롤링해 전처리·임베딩한 뒤, 사용자의 여행 성향(목적지, 계절, 동행, 여행 컨셉 등)에 맞춰 여행지를 추천해 주는 웹 서비스입니다. 저는 이 프로젝트에서 React 기반 웹 프론트엔드 개발을 담당했습니다.',

features: [
  {
    heading: '여행 성향 입력 폼 & 검색 UI',
    description:
      '목적지(destination), 계절(season), 동행(companion), 여행 컨셉(TravelConcept) 등을 한 화면에서 직관적으로 입력할 수 있는 React 폼 화면을 설계했습니다. 사용자가 선택·입력한 값을 내부 상태로 관리하고, user_query(JSON) 형태로 묶어 AI 추천 API로 전달되도록 폼 구조와 이벤트 흐름을 구현했습니다.'
  },
  {
    heading: 'AI 추천 결과 카드·리스트 화면',
    description:
      '백엔드/AI에서 내려주는 추천 여행지·코스 데이터를 받아, 여행지별 정보가 한눈에 들어오도록 카드·리스트 형태의 결과 화면을 구현했습니다. 로딩 중/요청 완료/결과 없음 등의 상태에 따라 다른 UI를 보여주고, 사용자가 스크롤하면서 여러 추천 결과를 자연스럽게 탐색할 수 있도록 레이아웃을 구성했습니다.'
  },
  {
    heading: '카카오맵 연동 여행지 상세 페이지',
    description:
      '선택한 여행지의 위치를 KakaoMap API로 렌더링하고, 주소와 핵심 정보를 함께 볼 수 있는 상세 페이지를 구현했습니다. 지도 영역과 텍스트 정보를 상·하 또는 좌·우로 분리 배치해 위치 정보를 직관적으로 파악하면서, 여행지 설명·추가 정보도 동시에 확인할 수 있도록 UI를 설계했습니다.'
  },
  {
    heading: '세션 기반 화면 흐름 및 메뉴 제어',
    description:
      '세션 기반 인증 정보를 프론트엔드 라우터와 연동해, 로그인 여부에 따라 접근 가능한 페이지와 메뉴가 달라지도록 화면 흐름을 구성했습니다. 게시글·댓글 작성, 마이페이지, 관리자 메뉴 등은 로그인 사용자 또는 관리자에게만 노출되도록 하고, 비로그인 사용자는 로그인/회원가입 페이지로 자연스럽게 유도되도록 네비게이션을 구현했습니다.'
  }
],

    results:
      '블로그 기반 실제 후기 데이터를 활용해 사용자의 조건에 맞는 여행지와 코스를 추천함으로써, 여행 계획을 번거로워하는 “만사가 귀찮은 P들”도 몇 번의 선택만으로 여행지를 쉽게 찾을 수 있도록 했습니다. AI 추천 결과를 지도·카테고리·상세 정보와 함께 시각화하여 서비스 활용성을 높였습니다.',

    techStack: [
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'Spring Boot',
      'Java 17',
      'Gradle',
      'Oracle',
      'KakaoMap API',
      'OpenAI text-embedding-3-small'
    ],

    videoURL: "/video/ptravel.mp4"
  }
},
{
  title: 'Talaria - 문맥·문화 기반 실시간 AI 통역 플랫폼',
  subtitle: '비즈니스·문화 모드 이중 인터페이스 실시간 회의 서비스',
  tags: ['FE', '웹', '디자인', '팀'],
  image: '/project-images/project_tal1.png', // TODO: 메인 썸네일 캡처로 교체
  type: 'talaria',
  details: {
    modalTitle: 'Talaria - 문맥·문화 기반 실시간 AI 통역 & 컬쳐·매너 가이드',
    subtitle: '파파고 기반 실시간 통역과 매너 모니터링을 제공하는 화상회의 플랫폼',
    period: '2025.10~2025,12', // 예: '2025.09 - 2025.12 (3개월)'
    members: '3인 개발',

    modalImages: [
      // TODO: 실제 Talaria 화면 캡처 경로들로 교체
      '/project-images/project_tal2.png',
      '/project-images/project_tal3.png',
      '/project-images/project_tal4.png',
      '/project-images/project_tal5.png',
      '/project-images/project_tal13.webp',
      '/project-images/project_tal6.png',
      '/project-images/project_tal7.png',
      '/project-images/project_tal8.png',
      '/project-images/project_tal9.png',
      '/project-images/project_tal10.png',
      '/project-images/project_tal11.png',
      '/project-images/project_tal12.png'
    ],

    urls: {
      githubURL: 'https://github.com/elios404/talaria-frontend',      // 예: 'https://github.com/...'
      serviceURL: 'null',     // 배포 주소 있으면 입력
      blogURL: 'null'
    },

    overview:
      'Talaria는 비즈니스 회의와 K-컬쳐/밈 라이브를 모두 지원하는 실시간 AI 통역 플랫폼으로, 회의 음성을 STT·번역해 자막으로 보여주고 매너 체크, 문서·회의록 연동까지 제공하는 서비스입니다. 저는 이 프로젝트에서 랜딩·대시보드·영상 회의·문화 라이브·문서/회의록 뷰어·파일 업로드 등 핵심 화면의 React 프론트엔드와 반응형 UI/UX 설계를 담당했습니다.',

    features: [
      {
        heading: '비즈니스·컬쳐 모드 랜딩 페이지 & 공통 네비게이션',
        description:
          'Talaria의 핵심 가치와 비즈니스 모드/문화 모드를 소개하는 랜딩 페이지를 설계하고, 두 모드로 자연스럽게 진입할 수 있는 상단/사이드 네비게이션을 구현했습니다. 공통 헤더 컴포넌트로 로고, 모드 전환, 알림 아이콘, 프로필 드롭다운을 재사용 가능하게 구성하여, 화면이 달라져도 일관된 경험을 제공하도록 만들었습니다.'
      },
      {
        heading: 'LiveKit 기반 실시간 회의 UI (비즈니스 모드)',
        description:
          'LiveKit 컴포넌트를 활용해 발언자/참가자 영상 타일을 자동 배치하는 커스텀 그리드를 구현하고, 우측에는 매너 체크 패널·문서 탭·채팅 탭을 사이드바 구조로 배치했습니다. 상단에는 원어, 하단에는 번역 자막을 덮어쓰는 STT 번역 오버레이 영역을 구성하고, 음성·카메라·화면공유·회의 종료 등 제어 버튼은 중앙 하단에 고정하여 회의 집중도가 높아지도록 UI를 설계했습니다.'
      },
      {
        heading: '문화 라이브 전용 UI & 키워드/이모지 인터랙션',
        description:
          'K-POP·게임·밈 컨셉에 맞는 컬쳐 모드 전용 레이아웃을 설계하고, 영상 타일 위에 테마 배경과 이펙트를 적용했습니다. 채팅 패널에서는 신조어·밈 단어를 실시간으로 하이라이트하고, 이모지·임팩트 버튼을 통해 화면 위로 이펙트가 뜨는 구조를 구현했습니다. 모바일에서는 영상 상단, 제어 버튼 중앙, 채팅·임팩트·참가자 탭을 하단에 배치해 한 손 조작이 가능하도록 레이아웃을 조정했습니다.'
      },
      {
        heading: '대시보드·문서/회의록 리스트 & PDF 뷰어 UI',
        description:
          '대시보드 홈에서 오늘 회의, To-Do, 일정, 최근 문서/회의록을 카드 형태로 한 번에 볼 수 있도록 구성하고, 문서·회의록 리스트 화면에서는 회의/언어/작성일 등으로 필터링·정렬이 가능하도록 UI를 설계했습니다. 선택한 문서는 PDF 뷰어 컴포넌트에서 원문·번역본을 나란히 또는 탭 전환으로 볼 수 있게 구현하고, 회의와 문서를 매핑하는 상태를 프론트에서 관리해 회의별 문서 흐름이 자연스럽게 이어지도록 만들었습니다.'
      },
      {
        heading: '파일 업로드 플로우 & 알림/모달 UX',
        description:
          '문서 업로드 모달에서 언어 선택, 회의 연결 여부, RAG 활용 여부 등을 설정할 수 있는 폼을 구성하고, Drag & Drop 업로드, 용량/확장자 검증, 업로드 진행 상태 표시 등을 구현했습니다. 업로드 완료·오류·권한 부족 등의 상황에서는 SweetAlert2 기반 알림 모달로 명확한 피드백을 제공해, 사용자가 현재 상태를 헷갈리지 않도록 UX를 설계했습니다.'
      },
      {
        heading: 'PC·태블릿·모바일 대응 반응형 회의/문화 레이아웃',
        description:
          '화면 크기에 따라 영상 타일 개수와 비율, 사이드바 표시 방식, 버튼 배치를 자동으로 조정하는 반응형 레이아웃을 구현했습니다. PC에서는 영상·문서·채팅이 한 화면에 동시에 보이도록 하고, 태블릿·모바일에서는 우선순위가 높은 영상과 자막을 상단에, 나머지는 탭·슬라이딩 패널로 전환하도록 설계해 다양한 디바이스에서 일관된 경험을 제공하도록 만들었습니다.'
      }
    ],

    results:
      '비즈니스 모드와 컬쳐 모드라는 서로 다른 사용 시나리오를 하나의 React 프론트엔드에서 일관되게 지원하도록 설계함으로써, 회의·라이브·문서·요약·매너 체크 기능을 자연스럽게 오갈 수 있는 사용자 경험을 구현했습니다. 모듈화된 레이아웃과 컴포넌트 구조, 반응형 설계를 통해 PC·태블릿·모바일 어디에서나 안정적인 화상회의·문화 라이브 환경을 제공할 수 있게 했습니다.',

    techStack: [
      'React',
         'JavaScript',
      'Vite',
      'Tailwind CSS',
      'LiveKit (React SDK)',
      'react-router-dom',
      'Axios',
      'SweetAlert2',
      'Figma (UI 설계)',
      'GitHub'
    ],

    // videoURL: '/video/talaria.mp4' // TODO: 실제 Talaria 시연 영상 경로로 교체
    videoURL: '/video/Talaria.mp4' // TODO: 실제 Talaria 시연 영상 경로로 교체

  }
}

];


const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalPosition, setModalPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const openModal = (project, e) => {
    setSelectedProject(project);
    setShowModal(true);
    setModalPosition({ x: e.clientX, y: e.clientY });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <section id="project" className="bg-white py-20 px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
        <span className="inline-block relative pb-6">
          PROJECT
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full" />
        </span>
      </h2>

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {projects.map((project, index) => {
    const aosType = index % 2 === 0 ? 'fade-left' : 'fade-right';

    return (
      <div
        key={index}
        // ✅ width 제한: max-w-[360px] (원하면 320, 340로 조절)
        className="relative group bg-white rounded-2xl overflow-hidden shadow-lg
                   transform transition-transform hover:scale-105 flex flex-col h-full
                   cursor-pointer w-full max-w-[410px] mx-auto"
        onClick={(e) => openModal(project, e)}
        data-aos={aosType}
        data-aos-duration="1000"
        data-aos-delay={`${(index % 3) * 200}`}
      >
        {/* ✅ 이미지 높이 줄이기: h-48 → h-40 (원하는 만큼 조절 가능) */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-45 object-cover"
        />

        {/* ✅ 텍스트 영역 패딩도 조금만 줄여서 전체 카드 높이 축소 */}
        <div className="bg-blue-50 w-full flex-1 flex flex-col justify-between p-4">
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  tagColors[tag] || 'bg-gray-200 text-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div>
            <h3 className="text-md font-bold mb-1">{project.title}</h3>
            <p className="text-sm text-gray-600">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>

      {/* 모달 */}
      <ProjectModal
        show={showModal}
        onClose={closeModal}
        project={
          selectedProject
            ? { ...selectedProject, index: projects.indexOf(selectedProject) }
            : null
        }
        position={modalPosition}
      />
    </section>
  );
};

export default Projects;