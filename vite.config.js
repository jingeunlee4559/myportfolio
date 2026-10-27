import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// SWC(@vitejs/plugin-react-swc) 대신 기본 React 플러그인을 씁니다.
// (Windows에서 @swc/core 설치가 실패하는 문제를 피하기 위해)
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
