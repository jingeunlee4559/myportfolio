// ProjectModal.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import ProjectHeader from './ProjectHeader';

const ProjectModal = ({ show, onClose, project }) => {
  if (!show || !project) return null;

  // 프로젝트별 색상 맵핑
  const backgroundMap = {
    0: '#FFF6CF',
    1: '#ADFEA1',
    2: '#83E9FB',
    3: '#000000', // 4번째 프로젝트는 배경색이 검은색
    4: '#FAB2EF',
    5: '#8272FF',
  };

  const projectIndex = project.index ?? 0;
  const primaryIconColor = projectIndex === 3 ? '#FFFFFF' : '#000000'; // 헤더 아이콘 색상
  const accentColor = backgroundMap[projectIndex] || '#FFF6CF'; // 강조 배경색

  // 강조 배경색 (accentColor)이 검은색일 경우 텍스트 색상을 흰색으로 설정, 아니면 기본값 (없으면 text-black)
  const textColorForAccentBackground = accentColor === '#000000' ? 'text-white' : '';

  // 일반 내용 (흰색 배경 위) 텍스트 색상: 4번째 프로젝트만 흰색, 나머지는 기본 (text-black)


  const { modalTitle, subtitle, period, members, modalImages, overview, features, results, techStack, urls: URLS } = project.details;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60`}>
      <div
        className={`relative w-[860px] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col bg-white`}
      >
        <div className="w-full">
          <ProjectHeader onClose={onClose} URLS={URLS} primaryColor={primaryIconColor} />
        </div>

        {/* 모달 내부 스크롤 가능한 컨텐츠 영역 - 기본 텍스트 색상은 여기서 적용 */}
        <div className={`p-6 overflow-y-auto max-h-[90vh] text-left text-black text-sm leading-relaxed`}>
          {/* 제목 및 기간 섹션 - 배경색이 있는 영역은 조건부 텍스트 색상 적용 */}
          <div className={`mb-4 p-4 text-[15px] w-full ${textColorForAccentBackground}`} style={{ backgroundColor: accentColor }}>
            <h2 className={`text-2xl font-bold ${textColorForAccentBackground}`}>{modalTitle}</h2>
            {subtitle && <p className={`text-sm mt-1 ${textColorForAccentBackground}`}>{subtitle}</p>}
            <p className={`mt-1 ${textColorForAccentBackground}`}><span className="font-bold">{period}</span> | <span>{members}</span></p>
          </div>

          {/* 이미지 슬라이더 */}
          <div className="my-4 rounded-md overflow-hidden shadow-md">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              spaceBetween={10}
              className="w-full h-[300px]"
            >
              {modalImages.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img src={src} alt={`project slide ${idx + 1}`} className="w-full h-[300px] object-contain bg-white" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 소개 섹션 - Pinned Title: 기본 텍스트 색상 (4번째 프로젝트만 흰색, 나머지는 검정) */}
          <section className="mb-6">
            <h3 className={`font-bold mb-2 text-[16px]`}>📌 {modalTitle}</h3>
            {/* Overview Box: 배경색이 흰색/검정색으로 조건부 변경되고, 텍스트 색상도 따라 변경 */}
            <div
              className={`p-4 rounded-lg shadow-lg border border-gray-200 text-[13.5px] leading-[1.7] ${
                projectIndex === 3 ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {overview}
            </div>
          </section>

          {/* 담당 기능 섹션 - 제목은 배경색에 따라 텍스트 색상 변경, 내용은 기본 텍스트 색상 */}
          <section className="mb-6">
            <h3
              className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
              style={{ backgroundColor: accentColor }}
            >
                담당 기능
            </h3>
            <ul className={`list-disc pl-6 space-y-2 text-[13.5px]`}>
              {features.map((feature, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{feature.heading}</span> {feature.description}
                  {feature.subpoints && (
                    <ul className={`list-disc pl-6 mt-1`}>
                      {feature.subpoints.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 결과 섹션 - 제목은 배경색에 따라 텍스트 색상 변경, 내용은 기본 텍스트 색상 */}
          <section className="mb-6">
            <h3
              className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
              style={{ backgroundColor: accentColor }}
            >
                결과
            </h3>
            <div className={`text-[13.5px] whitespace-pre-line`}>{results}</div>
          </section>

          {/* 기술 키워드 섹션 - 제목은 배경색에 따라 텍스트 색상 변경, 태그는 조건부 변경 */}
          <section className="mb-6">
            <h3
              className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
              style={{ backgroundColor: accentColor }}
            >
                기술 키워드
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 text-sm rounded-full ${projectIndex === 3 ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;