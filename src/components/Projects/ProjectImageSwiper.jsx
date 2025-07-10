import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const ArrowLeft = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#fff" stroke="#bbb" />
    <path d="M14.5 17l-5-5 5-5" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#fff" stroke="#bbb" />
    <path d="M9.5 7l5 5-5 5" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProjectImageSwiper = ({ images }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, [prevRef, nextRef]);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] lg:h-[480px] max-h-[520px]">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
        }}
        className="w-full h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`slide-${idx + 1}`}
              className="w-full h-full object-contain max-h-full rounded-xl bg-white"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={prevRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-gray-100 transition"
        aria-label="이전"
      >
        <ArrowLeft />
      </button>
      <button
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-gray-100 transition"
        aria-label="다음"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default ProjectImageSwiper;