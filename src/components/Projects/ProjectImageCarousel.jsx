// ProjectImageCarousel.tsx
import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const ArrowButton = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-30 
      hidden sm:flex items-center justify-center w-9 h-9 
      bg-white/80 backdrop-blur border border-gray-300 rounded-full 
      shadow-md hover:bg-white hover:scale-105 transition-transform duration-200
      ${direction === "left" ? "left-3" : "right-3"}`}
    aria-label={direction === "left" ? "이전" : "다음"}
  >
    {direction === "left" ? (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

const ProjectImageCarousel = ({ images }) => {
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current]
  );

  return (
    <div className="relative w-full aspect-[2/1] sm:aspect-[5/2] md:aspect-[8/3] max-h-[520px]">
      {/* embla carousel container */}
      <div ref={emblaRef} className="overflow-hidden rounded-xl">
        <div className="flex">
          {images.map((src, idx) => (
    <div
  key={idx}
  className="flex-[0_0_100%] sm:flex-[0_0_50%] px-1 flex items-center justify-center bg-white rounded-xl"
>
  <img
    src={src}
    alt={`slide-${idx + 1}`}
    className="max-h-[400px] w-auto h-auto object-contain"
  />
</div>
          ))}
        </div>
      </div>

      {/* navigation buttons */}
      <ArrowButton
        direction="left"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
      />
      <ArrowButton
        direction="right"
        onClick={() => emblaApi && emblaApi.scrollNext()}
      />
    </div>
  );
};

export default ProjectImageCarousel;
