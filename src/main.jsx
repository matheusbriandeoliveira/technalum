import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LegalPage } from './LegalPages.jsx'
import SolutionsPage from './SolutionsPage.jsx'

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isHomePage = currentPath === '/'
const isSolutionsPage = currentPath === '/solucoes.html'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isHomePage ? (
      <App />
    ) : isSolutionsPage ? (
      <SolutionsPage />
    ) : (
      <LegalPage />
    )}
  </StrictMode>,
)
