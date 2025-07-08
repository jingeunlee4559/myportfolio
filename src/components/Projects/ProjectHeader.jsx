// ProjectHeader.jsx
import React from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

// 헬퍼 함수: HEX 컬러 코드의 밝기를 계산하여 텍스트/아이콘 색상이 잘 보이는지 판단
// 참고: https://www.w3.org/TR/WCAG20/#relativeluminancedef
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
const ProjectHeader = ({ URLS, iconColor = '#3B82F6', onClose }) => {
  const iconList = [
    { icon: <FaGithub />, text: 'GitHub', url: URLS?.githubURL },
    { icon: <FaLink />, text: '배포 사이트', url: URLS?.serviceURL },
    { icon: <SiVelog />, text: '블로그', url: URLS?.blogURL },
  ];

  // 아이콘 색상 (accentColor)의 밝기를 기준으로 아이콘 배경색을 결정
  // WCAG 기준 최소 대비율 4.5:1을 목표로 합니다.
  const iconBgColorClass = (() => {
    // 흰색 배경일 때 iconColor(각 프로젝트 강조색)의 대비율
    const contrastWithWhite = getContrastRatio(iconColor, '#FFFFFF');
    // 어두운 배경일 때 iconColor(각 프로젝트 강조색)의 대비율
    const contrastWithGray700 = getContrastRatio(iconColor, '#4A5568'); // Tailwind bg-gray-700의 대략적인 HEX값

    // 아이콘 색상과 흰색 배경의 대비가 충분하다면 흰색 배경 사용 (대부분의 어두운 강조색)
    if (contrastWithWhite >= 4.5) {
      return 'bg-white';
    }
    // 아이콘 색상과 어두운 배경 (gray-700)의 대비가 충분하다면 어두운 배경 사용 (대부분의 밝은 강조색)
    else if (contrastWithGray700 >= 4.5) {
      return 'bg-gray-700';
    }
    // 둘 다 만족하지 못할 경우 (애매한 색상), 기본적으로 어두운 배경을 사용 (가독성 확보)
    else {
      return 'bg-gray-700';
    }
  })();

  // 테두리 색상도 배경색에 맞춰 조정
  const iconWrapperBorderClass = iconBgColorClass === 'bg-white' ? 'border-gray-200' : 'border-gray-600';


  return (
    // 배경색을 검은색으로 고정하고 투명도를 줌
    <div className="w-full bg-black/80 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
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
              {/* 아이콘 컨테이너의 배경색과 테두리 색상 조건부 적용 */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow ${iconBgColorClass} ${iconWrapperBorderClass}`}>
                {/* iconColor를 아이콘 색상으로 적용 */}
                <span className="text-xl sm:text-2xl" style={{ color: iconColor }}>{icon}</span>
              </div>
              <span className="text-xs sm:text-sm text-white mt-1 group-hover:underline">{text}</span>
            </a>
          ) : (
            <div key={text} className="flex flex-col items-center opacity-30 cursor-not-allowed">
              {/* 아이콘 컨테이너의 배경색과 테두리 색상 조건부 적용 */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow ${iconBgColorClass} ${iconWrapperBorderClass}`}>
                {/* iconColor를 아이콘 색상으로 적용 */}
                <span className="text-xl sm:text-2xl" style={{ color: iconColor }}>{icon}</span>
              </div>
              <span className="text-xs sm:text-sm text-white mt-1">{text}</span>
            </div>
          )
        )}
      </div>

      {/* 우측 닫기 버튼 */}
      <div
        className="flex flex-col items-center text-white cursor-pointer"
        onClick={onClose}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-600 flex items-center justify-center shadow border">
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" fill="none">
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