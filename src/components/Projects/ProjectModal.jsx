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
  // primaryIconColor는 이제 ProjectHeader 내부에서 결정되므로 더 이상 필요 없을 수 있음
  // const primaryIconColor = projectIndex === 3 ? '#FFFFFF' : '#000000';
  const accentColor = backgroundMap[projectIndex] || '#FFF6CF'; // 강조 배경색

  // 강조 배경색 (accentColor)이 검은색일 경우 텍스트 색상을 흰색으로 설정, 아니면 기본값 (없으면 text-black)
  const textColorForAccentBackground = accentColor === '#000000' ? 'text-white' : '';

  const { modalTitle, subtitle, period, members, modalImages, overview, features, results, techStack, urls: URLS,videoURL  } = project.details;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40`}>
      <div
        className={`relative w-[860px] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col bg-white`}
      >

        <div className="w-full bg-transparent"> 
          <ProjectHeader onClose={onClose} URLS={URLS} accentColor={accentColor} />
        </div>

        {/* 모달 내부 스크롤 가능한 컨텐츠 영역 - 기본 텍스트 색상은 여기서 적용 */}
        <div className={`overflow-y-auto max-h-[90vh] text-left text-black text-sm leading-relaxed`}>
          <div className={`mb-4 p-4 text-[15px] w-full ${textColorForAccentBackground}`} style={{ backgroundColor: accentColor }}>
            <h2 className={`text-2xl font-bold ${textColorForAccentBackground}`}>{modalTitle}</h2>
            {subtitle && <p className={`text-sm mt-1 ${textColorForAccentBackground}`}>{subtitle}</p>}
            <p className={`mt-1 ${textColorForAccentBackground}`}><span className="font-bold">{period}</span> | <span>{members}</span></p>
          </div>

     
          <div className="my-4 rounded-md overflow-hidden shadow-md">
                <ProjectImageCarousel images={modalImages} />
            </div>

            <section className="mb-6">
                <h3 className={`font-bold mb-2 text-[16px]`}>📌 {modalTitle}</h3>
                <div
                    className={`p-4 rounded-lg shadow-lg border border-gray-200 text-[13.5px] leading-[1.7] `}
                >
                    {overview}
                </div>
            </section>

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
                            <span className="font-semibold">{feature.heading}</span> <br></br>{feature.description}
                            {feature.subpoints && (
                                <ul className={`list-disc pl-6 mt-1`}>
                                    {feature.subpoints.map((pt, i) => <li key={i}>{pt}</li>)}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h3
                    className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
                    style={{ backgroundColor: accentColor }}
                >
                    결과
                </h3>
                 <div
    className={`text-[13.5px] whitespace-pre-line bg-white p-4 rounded-md shadow-sm leading-relaxed text-gray-800 border border-gray-200`}
  >{results}</div>
            </section>

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
            {videoURL && (
  <section className="mb-6">
    <h3
      className={`font-bold mb-2 text-[16px] block px-4 py-2 rounded ${textColorForAccentBackground}`}
      style={{ backgroundColor: accentColor }}
    >
      🎬 시연 영상
    </h3>
    <div className="rounded-md shadow-md overflow-hidden">
      <video
        src={videoURL}
        controls
        className="w-full h-auto rounded-md"
      >
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
    </div>
  </section>
)}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;