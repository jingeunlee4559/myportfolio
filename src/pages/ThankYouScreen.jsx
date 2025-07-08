import React from "react";
import backImg from "../assets/back1.png";

const ThankYouScreen = () => {
  return (
    // Home 컴포넌트와 유사하게 min-h-screen, w-screen, flex-col 사용.
    // 기존의 h-screen은 min-h-screen으로 변경해도 무방합니다.
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center text-white p-4"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: 'cover', // Home 컴포넌트와 동일하게 cover 유지
      }}
    >
      {/* "Thank you" 텍스트 - 이 부분은 그대로 두셔도 됩니다. */}
      <h1 className="text-4xl font-bold mb-4 opacity-80" style={{ fontSize: '7rem' }}>
        Thank you
      </h1>

      {/* "봐주셔서 감사합니다!" 텍스트 - 검정색 유지 */}
      <p className="text-3xl font-semibold mb-8 opacity-90 text-black">
        봐주셔서 감사합니다!
      </p>

      {/* 설명 텍스트 - 검정색 유지 */}
      <p className="text-xl leading-relaxed max-w-2xl mb-12 opacity-85 text-black">
        함께 하고 싶은 동료 개발자가 되기 위해,
        <br />
        <strong>신뢰</strong>를 줄 수 있는 개발자가 되기 위해 끊임없이 <strong>도전</strong>하겠습니다
      </p>

      {/* Git Hub 링크 - 검정색 유지 */}
      <a
        href="https://github.com/jingeunlee4559/portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold underline hover:no-underline opacity-90 text-black"
      >
        Git Hub
      </a>
    </div>
  );
};

export default ThankYouScreen;