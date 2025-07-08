import React from "react";
import profileImg from "../assets/profil.png"; // 프로필 이미지 경로에 맞게 수정

const About = () => {
  return (
    // 'min-h-screen' 클래스를 제거하여 About 섹션이 내용에 따라 높이를 가지도록 수정합니다.
    // 'w-full flex flex-col items-center justify-center'는 내부 콘텐츠를 중앙 정렬합니다.
    <div  id="about" 
    className="w-full flex flex-col items-center justify-center bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* 제목 - ABOUT ME */}
   <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
  <span className="inline-block relative pb-6"> {/* 새로운 span */}
    ABOUT ME
    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
  </span>
</h2>

      {/* 메인 카드 - 이 부분이 전체 내용을 감싸고 중앙에 위치합니다. */}
      <div className="w-full max-w-6xl bg-[#f8f9fa] rounded-3xl shadow-2xl 
      flex flex-col md:flex-row justify-center gap-16 p-8 md:p-18 mx-auto">
        {/* 프로필 사진 및 기본정보 (왼쪽 영역) */}
        <div className="flex flex-col items-center basis-1/3 text-center">
          <img
            src={profileImg}
            alt="프로필"
            className="w-60 h-60 object-cover rounded-2xl shadow-lg mb-6"
          />
          <div className="font-extrabold text-2xl text-gray-800 mt-4">이진근</div>
          <div className="text-gray-600 text-base mt-1">🎂 1994.01.11</div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-medium">#사용자중심</span>
            <span className="bg-green-100 text-green-800 rounded-full px-4 py-1 text-sm font-medium">#책임감</span>
            <span className="bg-purple-100 text-purple-800 rounded-full px-4 py-1 text-sm font-medium">#협업</span>
            <span className="bg-yellow-100 text-yellow-800 rounded-full px-4 py-1 text-sm font-medium">#지속성장</span>
          </div>
        </div>

        {/* 자기소개, 학력, 수상 (오른쪽 영역) */}
        <div className="flex flex-col gap-10 basis-3/3">
          {/* 자기소개 */}
          <div className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
            끊임없이 배우며 성장하는 프론트엔드 개발자 이진근입니다. 웹 기술에 대한 꾸준한 관심과 함께,{" "}
            <span className="font-bold">사용자 중심의 UI 구현</span>에 강점을 가지고 있습니다.
            <br /><br />
            HTML, CSS는 물론 JavaScript와 React 기반 프론트엔드 개발에 익숙하며, 자기주도적 학습과{" "}
            <span className="font-bold">팀원 간의 원활한 협업 경험</span>을 쌓아왔습니다.
            <br /><br />
            인공지능사관학교에서 알고리즘, 컴퓨터 과학, 다양한 프레임워크를 체계적으로 익혔고, 다양한 실무 프로젝트를 통해 기술과{" "}
            <span className="font-bold">소통력</span>을 동시에 길렀습니다.
            <br /><br />
            앞으로도 이해하기 쉬운 코드와 명확한 시스템을 만드는 개발자가 되겠습니다.
          </div>

          {/* 학력 & 수상 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 학력 */}
            <div>
              <div className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="education">🎓</span> EDUCATION
              </div>
              <ul className="text-base text-gray-700 space-y-3">
                <li>
                  <span className="font-semibold">조선대학교 전기공학과</span><br />
                  <span className="text-gray-500 text-sm">2012.02 ~ 2018.02</span>
                </li>
                <li>
                  <span className="font-semibold">빅데이터 융합서비스개발자 과정</span><br />
                  <span className="text-gray-500 text-sm">2022.08 ~ 2023.03</span>
                </li>
                <li>
                  <span className="font-semibold">언어지능기반 분석 서비스모델 개발자 과정</span><br />
                  <span className="text-gray-500 text-sm">2023.09 ~ 2024.04</span>
                </li>
                <li>
                  <span className="font-semibold">앱기반인공지능(풀스택) 과정</span><br />
                  <span className="text-gray-500 text-sm">2024.05 ~ 2024.11</span>
                </li>
              </ul>
            </div>

            {/* 수상 */}
            <div>
              <div className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="awards">🏆</span> AWARDS
              </div>
              <ul className="text-base text-gray-700 space-y-3">
                <li><span className="font-semibold">2022 핵심프로젝트 우수상</span></li>
                <li><span className="font-semibold">2022 실전프로젝트 최우수상</span></li>
                <li><span className="font-semibold">2022 실전프로젝트 왕중왕전 대상</span></li>
                <li><span className="font-semibold">2024 핵심프로젝트 최우수상</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;