// Projects.jsx
import React, { useState } from 'react';
import ProjectModal from '../components/Projects/ProjectModal'; // 모달 컴포넌트 임포트

// 태그별 스타일 매핑 (기존과 동일)
const tagColors = {
  디자인: 'bg-pink-200 text-pink-800',
  FE: 'bg-blue-200 text-blue-800',
  서버: 'bg-yellow-200 text-yellow-800',
  웹: 'bg-green-200 text-green-800',
  기획: 'bg-indigo-200 text-indigo-800',
  팀: 'bg-purple-200 text-purple-800',
  AI: 'bg-red-200 text-red-800',
  시각화: 'bg-teal-200 text-teal-800',
  BE : 'bg-skyblue-200 text-blue-800',
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
  },
}
];


const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // 카드 클릭 시 마우스 위치 저장
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
    <section  id="project" className="bg-white py-20 px-6 text-center">
      {/* <h2 className="text-4xl font-bold mb-4">PROJECT</h2>
      <div className="w-16 h-1 mx-auto bg-blue-500 mb-10" /> */}
               <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
  <span className="inline-block relative pb-6"> {/* 새로운 span */}
 PROJECT
    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
  </span>
</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
     {projects.map((project, index) => {
  // 짝수 index는 왼쪽(fade-left), 홀수 index는 오른쪽(fade-right)
  const aosType = index % 2 === 0 ? 'fade-left' : 'fade-right';

  return (
    <div
      key={index}
      className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 flex flex-col h-full cursor-pointer"
      onClick={(e) => openModal(project, e)}
      data-aos={aosType}
      data-aos-duration="1000"
      data-aos-delay={`${(index % 3) * 200}`} // 한 줄씩 약간 딜레이
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="bg-blue-50 w-full flex-1 flex flex-col justify-between p-5">
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColors[tag] || 'bg-gray-200 text-gray-700'}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.subtitle}</p>
        </div>
      </div>
    </div>
  );
})}
      </div>
      {/* 클릭 위치 정보와 함께 모달에 전달 */}
      <ProjectModal
  show={showModal}
  onClose={closeModal}
  project={{ ...selectedProject, index: projects.indexOf(selectedProject) }}
  position={modalPosition}
/>
    </section>
  );
};

export default Projects;