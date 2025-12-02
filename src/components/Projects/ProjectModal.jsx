// ProjectModal.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import ProjectHeader from './ProjectHeader';
import ProjectImageCarousel from './ProjectImageCarousel';

const ProjectModal = ({ show, onClose, project }) => {
  if (!show || !project) return null;

  // 프로젝트별 기본 배경색 맵핑
  const backgroundMap = {
    0: '#FFF6CF',
    1: '#ADFEA1',
    2: '#83E9FB',
    3: '#000000', // 4번째 프로젝트는 배경색이 검은색
    4: '#FAB2EF',
    5: '#8272FF',
    6: '#FFF6CF',
    7: '#FFF6CF',
  };

  const projectIndex = project.index ?? 0;

  // ✅ 특정 프로젝트 판별
  const isPTravelProject =
    project?.title?.includes('만사가 귀찮은 P들을 위한');
  const isTalariaProject =
    project?.title?.includes('Talaria');

  // 기본 accentColor
  const baseAccentColor = backgroundMap[projectIndex] || '#FFF6CF';

  // ✅ 프로젝트별 accentColor 오버라이드
  let accentColor = baseAccentColor;
  if (isPTravelProject) {
    // P들의 = 청록
    accentColor = '#00BFA5';
  } else if (isTalariaProject) {
    // Talaria = 소통/온라인 회의 느낌 나는 스카이 블루
    accentColor = '#0EA5E9';
  }

  // ✅ 헤더/섹션 타이틀 글자색
  let textColorForAccentBackground = '';
  if (accentColor === '#000000' || isPTravelProject || isTalariaProject) {
    // 검정, P들의, Talaria 모두 흰 글자
    textColorForAccentBackground = 'text-white';
  }

  // ------- 여기서 먼저 project.details 구조분해 -------
  const {
    modalTitle,
    subtitle,
    period,
    members,
    modalImages,
    overview,
    features,
    results,
    techStack,
    urls: URLS,
    videoURL,
  } = project.details;

  // ✅ 시연 영상 존재 여부
  const hasVideo = !!videoURL && videoURL !== 'null';

  // ✅ 기술 키워드 칩 색상
  let chipColorClass = 'bg-gray-200 text-gray-800';
  if (accentColor === '#000000' || isPTravelProject) {
    chipColorClass = 'bg-gray-700 text-white';
  } else if (isTalariaProject) {
    // Talaria 전용 – 밝은 하늘색 톤 칩
    chipColorClass = 'bg-sky-100 text-sky-900';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[860px] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col bg-white">
        {/* 상단 헤더 (깃허브/닫기 버튼 영역) */}
        <div className="w-full bg-transparent">
          <ProjectHeader onClose={onClose} URLS={URLS} accentColor={accentColor} />
        </div>

        {/* 모달 내부 스크롤 영역 */}
        <div className="overflow-y-auto max-h-[90vh] text-left text-black text-sm leading-relaxed">
          {/* 타이틀 영역 */}
          <div
            className={`mb-4 p-4 text-[15px] w-full ${textColorForAccentBackground}`}
            style={{ backgroundColor: accentColor }}
          >
            <h2 className={`text-2xl font-bold ${textColorForAccentBackground}`}>
              {modalTitle}
            </h2>
            {subtitle && (
              <p className={`text-sm mt-1 ${textColorForAccentBackground}`}>
                {subtitle}
              </p>
            )}
            <p className={`mt-1 ${textColorForAccentBackground}`}>
              <span className="font-bold">{period}</span> | <span>{members}</span>
            </p>
          </div>

          {/* 이미지 캐러셀 */}
          <div className="my-4 rounded-md overflow-hidden shadow-md">
            <ProjectImageCarousel images={modalImages} />
          </div>

          {/* 개요 */}
          <section className="mb-6">
            <h3 className="font-bold mb-2 text-[16px]">📌 {modalTitle}</h3>
            <div className="p-4 rounded-lg shadow-lg border border-gray-200 text-[13.5px] leading-[1.7]">
              {overview}
            </div>
          </section>

          {/* 담당 기능 */}
          <section className="mb-6">
            <h3
              className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
              style={{ backgroundColor: accentColor }}
            >
              담당 기능
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-[13.5px]">
              {features.map((feature, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{feature.heading}</span>
                  <br />
                  {feature.description}
                  {feature.subpoints && (
                    <ul className="list-disc pl-6 mt-1">
                      {feature.subpoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 결과 */}
          <section className="mb-6">
            <h3
              className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
              style={{ backgroundColor: accentColor }}
            >
              결과
            </h3>
            <div className="text-[13.5px] whitespace-pre-line bg-white p-4 rounded-md shadow-sm leading-relaxed text-gray-800 border border-gray-200">
              {results}
            </div>
          </section>

          {/* 기술 키워드 */}
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
                  className={`px-3 py-1 text-sm rounded-full ${chipColorClass}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 시연 영상 – 항상 섹션은 표시, 내부만 분기 */}
          <section className="mb-6">
            <h3
              className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
              style={{ backgroundColor: accentColor }}
            >
              🎬 시연 영상
            </h3>

            {hasVideo ? (
              <div className="rounded-md shadow-md overflow-hidden">
                <video
                  src={videoURL}
                  controls
                  className="w-full h-auto rounded-md"
                >
                  브라우저가 video 태그를 지원하지 않습니다.
                </video>
              </div>
            ) : (
              <div className="w-full p-4 rounded-md border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500 text-center">
                아직 등록된 시연 영상이 없습니다.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
