import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        {/* Rota para quando já tem um jogador na URL (ex: /#/carlos) */}
        <Route path="/:playerId" element={<App />} />
        {/* Rota raiz (ex: /), que vai abrir a tela de seleção de terminal */}
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)