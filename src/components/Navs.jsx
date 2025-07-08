import React, { useEffect, useState } from "react";

const Navs = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Check if window has scrolled more than 10 pixels
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", onScroll);
    // Remove scroll event listener when component unmounts to prevent memory leaks
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        flex flex-row items-center justify-center gap-8 h-20
        ${scrolled
          ? "bg-white/70 border-b border-white/40 backdrop-blur-md shadow-md" // Scrolled state: semi-transparent white background
          : "bg-transparent border-b-0"} // Initial state: transparent background
      `}
      style={{ boxSizing: "border-box" }} // Ensure consistent box model
    >
      {/* Navigation links: text color changes based on 'scrolled' state */}
      <a
        href="#about"
        className={`
          text-lg font-medium hover:underline transition-colors duration-300
          ${scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"}
        `}
      >
        <strong>ABOUT</strong>
      </a>
      <a
        href="#skill"
        className={`
          text-lg font-medium hover:underline transition-colors duration-300
          ${scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"}
        `}
      >
        <strong>SKILL</strong>
      </a>
      <a
        href="#project"
        className={`
          text-lg font-medium hover:underline transition-colors duration-300
          ${scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"}
        `}
      >
        <strong>PROJECT</strong>
      </a>
            <a
        href="#board"
        className={`
          text-lg font-medium hover:underline transition-colors duration-300
          ${scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"}
        `}
      >
        <strong>BOARD</strong>
      </a>
    </nav>
  );
};

export default Navs;
