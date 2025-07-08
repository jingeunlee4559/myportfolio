import React, { useState } from "react";
// 사용자님께서 제공해주신 이미지 파일들을 임포트합니다.
import js from '../assets/skills/js.png';
import html from '../assets/skills/html.png';
import java from '../assets/skills/java.png';
import python from '../assets/skills/python.png';
import react from '../assets/skills/react.png';
import vite from '../assets/skills/vite.jpg';
import Bootstrap from '../assets/skills/Bootstrap.jpg';
import TailwindCSS from '../assets/skills/Tailwind CSS.png';
import Spring from '../assets/skills/Spring.png';
import egove from '../assets/skills/egove.png'; // 전자정부프레임워크
import MySQL from '../assets/skills/MySQL.png';
import OracleDB from '../assets/skills/Oracle DB.jpg';
import Github from '../assets/skills/Github.jpg';
import Slack from '../assets/skills/slack.png';
import Notion from '../assets/skills/Notion.png';
import Figma from '../assets/skills/Figma.png';
import Eclipse from '../assets/skills/Eclipse.jpg';
import nodejs from '../assets/skills/nodejs.png';


const Skills = () => {
  // 현재 선택된 카테고리를 관리하는 상태 (기본값은 '주요 언어')
  const [selectedCategory, setSelectedCategory] = useState("주요 언어");

  // 각 카테고리에 대한 기술 스택 데이터를 정의합니다.
  // 'icon' 속성에 임포트된 이미지 변수를 할당합니다.
  const skillData = {
    "주요 언어": [
      {
        name: "JavaScript",
        description: "React 기반 웹 애플리케이션 개발에 핵심적으로 활용",
        icon: js,
      },
      {
        name: "HTML/CSS",
        description: "웹 표준 기반 UI/UX 구현 및 반응형 웹 디자인",
        icon: html,
      },
      {
        name: "JAVA",
        description: "Spring 기반 백엔드 시스템 개발",
        icon: java,
      },
      {
        name: "Python",
        description: "머신러닝 모델 연동 및 데이터 분석 활용",
        icon: python,
      },
    ],
    "프론트엔드": [
      {
        name: "React",
        description: "다수의 프로젝트에서 컴포넌트 기반 웹 개발 주도",
        icon: react,
      },
      {
        name: "Vite",
        description: "학습 중: 빠르고 효율적인 프론트엔드 개발 환경 구축에 대한 이해를 높이는 중",
        icon: vite,
      },
      {
        name: "Bootstrap",
        description: "반응형 웹 레이아웃 및 컴포넌트 개발",
        icon: Bootstrap,
      },
      {
        name: "Tailwind CSS",
        description: "학습 중: 유틸리티 기반 CSS로 빠르고 유연한 스타일링 목표",
        icon: TailwindCSS,
      },
    ],
    "백엔드": [
      {
        name: "Spring",
        description: "Java 기반 RESTful API 및 웹 서버 구축",
        icon: Spring,
      },
      {
        name: "Node.js",
        description: "다양한 웹 서비스의 백엔드 시스템 구현",
        icon: nodejs,
      },
      {
        name: "전자정부프레임워크",
        description: "공공 프로젝트 개발 표준 이해",
        icon: egove,
      },
    ],
    "데이터베이스": [
      {
        name: "MySQL",
        description: "프로젝트 전반의 데이터 설계 및 관리, 쿼리 최적화",
        icon: MySQL,
      },
      {
        name: "Oracle DB",
        description: "관계형 데이터베이스의 기초 활용 및 SQL 이해",
        icon: OracleDB,
      },
    ],
    "협업 & 개발 도구": [
      {
        name: "Github",
        description: "효율적인 버전 관리 및 팀 협업",
        icon: Github,
      },
      {
        name: "Slack",
        description: "프로젝트 커뮤니케이션 및 문서 공유",
        icon: Slack,
      },
      {
        name: "Notion",
        description: "프로젝트 커뮤니케이션 및 문서 공유",
        icon: Notion,
      },
      {
        name: "Figma",
        description: "UI/UX 프로토타이핑 및 디자인 시스템 협업",
        icon: Figma,
      },
      {
        name: "Eclipse",
        description: "Java 개발 통합 환경 활용",
        icon: Eclipse,
      },
    ],
  };

  return (
<div
  id="skill"
  className="min-h-screen w-full flex flex-col items-center justify-center bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8" // pt-24를 pt-32 또는 pt-48 등으로 변경
>
      {/* 제목 - SKILLS */}
      {/* <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
        <span className="inline-block relative pb-2">
          SKILLS
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
        </span>
      </h2> */}

         <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
  <span className="inline-block relative pb-6"> {/* 새로운 span */}
   SKILLS
    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
  </span>
</h2>

      {/* 메인 스킬 컨테이너 */}
      <div className="w-full max-w-6xl bg-[#f8f9fa] rounded-3xl shadow-2xl flex flex-col md:flex-row items-start gap-8 p-8 md:p-12 mx-auto">
        {/* 왼쪽 카테고리 버튼 영역 */}
        <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-center md:justify-start gap-2 md:gap-4 flex-wrap">
          {Object.keys(skillData).map((category) => (
            <button
              key={category}
              className={`
                relative px-4 py-2 text-lg font-semibold transition-colors duration-200
                text-left w-full md:w-auto
                ${selectedCategory === category
                  ? "text-blue-700 hover:text-blue-700" // 선택된 버튼은 호버해도 색상 유지
                  : "text-gray-700 hover:text-blue-500"} // 선택되지 않은 버튼은 기본 및 호버 색상 적용
              `}
              onClick={() => setSelectedCategory(category)}
            >
              {/* 이미지처럼 왼쪽에 세로선을 추가합니다. */}
              <span className={`
                absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full transition-colors duration-200
                ${selectedCategory === category
                  ? "bg-blue-600" // 선택된 버튼의 선 색상을 더 진하게 변경
                  : "bg-transparent"} // 기본 버튼의 선 색상 (투명)
              `}></span>
              {category}
            </button>
          ))}
        </div>

        {/* 오른쪽 스킬 내용 영역 */}
        <div className="flex-1 w-full md:w-3/4 p-4 md:p-6 bg-white rounded-xl shadow-inner">
          {skillData[selectedCategory] && skillData[selectedCategory].length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {skillData[selectedCategory].map((skill, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  {/* 아이콘을 img 태그로 렌더링하고, 임포트된 이미지 변수를 src로 사용합니다. */}
                  {/* 아이콘 크기 및 스타일을 조정하여 더 예쁘고 정확하게 보이도록 합니다. */}
                  <img
                    src={skill.icon}
                    alt={`${skill.name} 아이콘`}
                    className="w-12 h-12 rounded-lg object-contain" // 크기 확대, object-contain, 둥근 모서리 조정
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{skill.name}</h3>
                    <p className="text-gray-600 text-base mt-1">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">선택된 카테고리에 대한 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;