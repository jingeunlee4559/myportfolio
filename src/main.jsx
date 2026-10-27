import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 예전에는 새로고침마다 #해시를 지우고 맨 위로 보냈는데, 그러면 공유 링크(#project)와 뒤로가기가 깨져서 뺐습니다.

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
