import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NoteLists from './components/NoteLists.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NoteLists />
  </StrictMode>,
)
