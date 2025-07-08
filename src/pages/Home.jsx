import React from "react";
import backImg from "../assets/back1.png";
import Navs from "../components/Navs";

const Home = () => {
  return (
    <div
      className="min-h-screen w-screen flex flex-col bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <Navs />
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <div className="flex flex-col items-center justify-center"> {/* relative 제거, flex로 대체 */}
          <h1  data-aos="zoom-in" data-aos-delay="700"   data-aos-duration="1000"  className="text-white text-5xl md:text-8xl font-extrabold tracking-tight z-10">
            <span className="block opacity-100">Front-End</span>
          </h1>
          {/* h2의 absolute 포지셔닝 제거, 일반적인 블록 요소로 */}
          <h2 data-aos="fade-down"   data-aos-duration="600" className="text-black text-2xl md:text-4xl font-light mt-4 md:mt-6 z-20"> {/* mt-4/mt-6으로 간격 조절 */}
            프론트 엔드 개발자 <span className="font-bold">이진근</span>입니다.
          </h2>
        </div>
        <p data-aos="fade-up"   data-aos-delay="1500"   data-aos-duration="1200" className="mt-8 text-black text-base md:text-lg">
          사용자의 입장에서 생각하고,<br />
          끊임없이 <span className="font-bold">성장</span>하며 끝까지 <span className="font-bold">책임</span>지는 개발자가 되겠습니다.
        </p>
        <a
          href="https://github.com/jingeunlee4559/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block px-6 py-2 border-b-2 border-black text-black font-semibold text-lg hover:underline" // mt-22 대신 mt-12 사용
            data-aos="fade-up"
              data-aos-delay="2200"
                data-aos-duration="1000"

        >
          Git Hub
        </a>
        <div className="mt-10 animate-bounce"
          data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="3000"

          >
          <span className="text-3xl text-black">▼</span>
        </div>
      </main>
    </div>
  );
};

export default Home;