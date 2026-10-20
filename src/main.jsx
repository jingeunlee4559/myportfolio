import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 새로고침하면 항상 맨 위에서 시작합니다: 브라우저가 스크롤 위치를 기억하지 못하게 하고, 주소의 #해시도 지웁니다.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
window.scrollTo(0, 0)
window.addEventListener('pagehide', () => window.scrollTo(0, 0))
window.addEventListener('pageshow', (e) => { if (e.persisted) location.reload() })

// .spot 요소 위에서 커서 위치를 CSS 변수로 넘겨 빛이 따라다니게 합니다.
window.addEventListener('pointermove', (e) => {
  const el = e.target.closest?.('.spot')
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--x', `${e.clientX - r.left}px`)
  el.style.setProperty('--y', `${e.clientY - r.top}px`)
}, { passive: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
