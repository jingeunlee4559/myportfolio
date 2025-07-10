// ProjectHeader.jsx
import React from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

// 헬퍼 함수: HEX 컬러 코드의 밝기를 계산하여 텍스트/아이콘 색상이 잘 보이는지 판단
const getLuminance = (hexColor) => {
  const r = parseInt(hexColor.substring(1, 3), 16) / 255;
  const g = parseInt(hexColor.substring(3, 5), 16) / 255;
  const b = parseInt(hexColor.substring(5, 7), 16) / 255;

  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// 두 색상 간의 대비율 계산 (WCAG 기준)
const getContrastRatio = (color1, color2) => {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};


// iconColor는 ProjectModal에서 전달받은 accentColor가 됩니다.
// ProjectModal에서 primaryColor 대신 accentColor를 전달하므로 prop 이름을 accentColor로 변경
const ProjectHeader = ({ URLS, accentColor = '#3B82F6', onClose }) => {
  const iconList = [
    { icon: <FaGithub />, text: 'GitHub', url: URLS?.githubURL },
    { icon: <FaLink />, text: '배포 사이트', url: URLS?.serviceURL },
    { icon: <SiVelog />, text: '블로그', url: URLS?.blogURL },
  ];

  // 헤더 배경색에 따라 아이콘 및 텍스트 색상을 결정 (흰색 또는 검정색)
  // accentColor에 대한 흰색과 검정색의 대비율을 계산하여 더 높은 대비를 제공하는 색상을 선택
  const headerContentColor = getContrastRatio(accentColor, '#FFFFFF') >= getContrastRatio(accentColor, '#000000')
    ? '#FFFFFF' // 흰색과의 대비가 더 좋으면 흰색 텍스트/아이콘
    : '#000000'; // 검정색과의 대비가 더 좋으면 검정색 텍스트/아이콘

  // 아이콘 컨테이너의 배경색과 테두리 색상은 기존 로직 유지 (아이콘 자체의 가독성)
  // 단, 여기서는 iconColor 대신 accentColor를 사용하므로 해당 변수를 사용
   const iconBgColorClass = (() => {
     const contrastWithWhite = getContrastRatio(accentColor, '#FFFFFF');
     const contrastWithGray700 = getContrastRatio(accentColor, '#4A5568');

     if (contrastWithWhite >= 4.5) {
       return 'bg-white';
     } else if (contrastWithGray700 >= 4.5) {
       return 'bg-gray-700';
     } else {
       // 기본적으로 어두운 배경 사용 (가독성 확보)
       return 'bg-gray-700';
     }
   })();

   const iconWrapperBorderClass = iconBgColorClass === 'bg-white' ? 'border-gray-200' : 'border-gray-600';

  return (
    // 헤더의 배경색을 accentColor로 설정
    // 헤더 내 텍스트 색상 (GitHub, 배포 사이트, 블로그, 닫기 텍스트)은 headerContentColor로 설정
    <div
      className="w-full py-4 px-6 flex justify-between items-center"
      style={{ backgroundColor: accentColor, color: headerContentColor }} // 배경색과 텍스트 색상 적용
    >
      {/* 좌측 아이콘 리스트 */}
      <div className="flex items-center gap-4 sm:gap-6">
        {iconList.map(({ icon, text, url }) =>
          url && url !== 'null' ? (
            <a
              key={text}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow ${iconBgColorClass} ${iconWrapperBorderClass}`}>
                {/* 아이콘 자체의 색상은 여전히 전달받은 accentColor로 유지 */}
                {/* 만약 아이콘 자체도 headerContentColor를 따르게 하고 싶다면 여기도 color: headerContentColor 적용 */}
                <span className="text-xl sm:text-2xl" style={{ color: accentColor }}>{icon}</span>
              </div>
              {/* 아이콘 아래 텍스트 색상도 headerContentColor 적용 */}
              <span className="text-xs sm:text-sm mt-1 group-hover:underline" style={{ color: headerContentColor }}>{text}</span>
            </a>
          ) : (
            <div key={text} className="flex flex-col items-center opacity-30 cursor-not-allowed">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow ${iconBgColorClass} ${iconWrapperBorderClass}`}>
                <span className="text-xl sm:text-2xl" style={{ color: accentColor }}>{icon}</span>
              </div>
              <span className="text-xs sm:text-sm mt-1" style={{ color: headerContentColor }}>{text}</span>
            </div>
          )
        )}
      </div>

      {/* 우측 닫기 버튼 */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={onClose}
        style={{ color: headerContentColor }} // 닫기 텍스트 색상 적용
      >
        {/* 닫기 버튼 배경색은 고정된 neutral-600으로 유지하거나, headerContentColor에 따라 변경 가능 */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-600 flex items-center justify-center shadow border">
          {/* 닫기 X 아이콘 색상도 headerContentColor 적용 */}
          <svg width="20" height="20" viewBox="0 0 24 24" stroke={headerContentColor} strokeWidth="2" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </div>
        <span className="text-xs sm:text-sm mt-1">닫기</span>
      </div>
    </div>
  );
};

export default ProjectHeader;