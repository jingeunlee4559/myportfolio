import "./App.css";
import React, { useEffect } from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import ThankYouScreen from "./pages/ThankYouScreen";
import AOS from "aos";
import "aos/dist/aos.css";
import CommentBoard from "./components/CommentBoard";
import { Analytics } from '@vercel/analytics/react';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Home />
      <About />
      <div className="mt-3">
        <Skills />
      </div>
      <Projects />
      <ThankYouScreen />
      <CommentBoard/>
       <Analytics />
    </>
  );
}

export default App;
