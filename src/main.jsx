import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SIMPLE } from './lib/env'

// 예전에는 새로고침마다 #해시를 지우고 맨 위로 보냈는데, 그러면 공유 링크(#project)와 뒤로가기가 깨져서 뺐습니다.

// .spot 요소 위에서 커서 위치를 CSS 변수로 넘겨 빛이 따라다니게 합니다.
window.addEventListener('pointermove', (e) => {
  const el = e.target.closest?.('.spot')
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--x', `${e.clientX - r.left}px`)
  el.style.setProperty('--y', `${e.clientY - r.top}px`)
}, { passive: true })

// 대표 프로젝트 화면은 기기에 맞는 쪽만 내려받습니다.
// 휴대폰·태블릿: 휴대폰 전용 카드(MobileFeatured) / PC: 스크롤 장면(PCFeatured, GSAP 고정 연출 포함)
// 화면을 그리기 전에 먼저 받아 두어, 장면들이 페이지 순서대로 만들어지게 합니다. (스크롤 연출 위치 계산 순서 유지)
// (두 import를 한 줄에 쓰면 빌드 도구가 두 쪽 파일을 모두 미리 받게 만들어서, 함수로 따로 나눠 둡니다)
function loadMobile() { return import('./pages/MobileFeatured.jsx') }
function loadPC() { return import('./pages/PCFeatured.jsx') }
;(SIMPLE ? loadMobile() : loadPC()).then(({ default: Featured }) => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App Featured={Featured} />
    </StrictMode>,
  )
})
