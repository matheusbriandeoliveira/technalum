import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="hero">
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
