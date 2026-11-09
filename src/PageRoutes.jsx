import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./App.jsx'))
const LegalPage = lazy(() =>
  import('./LegalPages.jsx').then(({ LegalPage: Page }) => ({
    default: Page,
  })),
)
const SolutionsPage = lazy(() => import('./SolutionsPage.jsx'))

export default function PageRoutes() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  return (
    <Suspense fallback={null}>
      {currentPath === '/' ? (
        <HomePage />
      ) : currentPath === '/solucoes.html' ? (
        <SolutionsPage />
      ) : (
        <LegalPage />
      )}
    </Suspense>
  )
}
