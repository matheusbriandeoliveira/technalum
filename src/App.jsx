import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaderState, setLoaderState] = useState('loading')

  useEffect(() => {
    let isMounted = true
    let exitTimer

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = resolve
        image.onerror = () =>
          reject(new Error(`Não foi possível carregar ${src}`))
        image.src = src
      })

    const minimumDisplayTime = new Promise((resolve) =>
      window.setTimeout(resolve, 1000),
    )

    Promise.all([
      Promise.allSettled([
        loadImage('/bgNoite.png'),
        loadImage('/logoSemFundo.png'),
      ]),
      minimumDisplayTime,
    ]).then(([imageResults]) => {
      imageResults.forEach((result) => {
        if (result.status === 'rejected') {
          console.error(result.reason)
        }
      })

      if (isMounted) {
        setLoaderState('exiting')
        const exitDuration = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
          ? 0
          : 850
        exitTimer = window.setTimeout(
          () => setLoaderState('hidden'),
          exitDuration,
        )
      }
    })

    return () => {
      isMounted = false
      window.clearTimeout(exitTimer)
    }
  }, [])

  return (
    <main className="hero">
      {loaderState !== 'hidden' && (
        <div
          className={`preloader${loaderState === 'exiting' ? ' is-exiting' : ''}`}
          role="status"
          aria-label="Carregando site"
          aria-hidden={loaderState === 'exiting'}
        >
          <div className="preloader-content">
            <img className="preloader-logo" src="/logoSemFundo.png" alt="" />
            <span className="preloader-progress" aria-hidden="true" />
          </div>
          <span className="visually-hidden">Carregando...</span>
        </div>
      )}

      <header className="site-header">
        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Navegação principal"
        >
          <a
            className="nav-link is-active"
            href="#home"
            aria-current="page"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            className="nav-link"
            href="#sobre"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </a>
          <a
            className="nav-link"
            href="#contato"
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </a>
        </nav>

        <div className="social-links" aria-label="Redes sociais">
          <a
            className="social-link"
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <img className="social-icon" src="/whatsapp.png" alt="" />
          </a>
          <a
            className="social-link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img className="social-icon" src="/instagram.png" alt="" />
          </a>
        </div>
      </header>

      <div className="hero-content" id="home">
        <img
          className="brand-logo"
          src="/logoSemFundo.png"
          alt="TECHNALUM — Esquadrias e Fachadas"
        />
      </div>
    </main>
  )
}

export default App
