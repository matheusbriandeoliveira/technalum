import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './App.css'

const spring = { type: 'spring', stiffness: 180, damping: 20, mass: 0.8 }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaderState, setLoaderState] = useState('loading')
  const heroVideoRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const animationTransition = shouldReduceMotion ? { duration: 0 } : spring

  useEffect(() => {
    let isMounted = true
    let removeVideoListeners = () => {}

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = resolve
        image.onerror = () =>
          reject(new Error(`Não foi possível carregar ${src}`))
        image.src = src
      })

    const videoLoaded = new Promise((resolve, reject) => {
      const video = heroVideoRef.current
      if (!video) {
        reject(new Error('Não foi possível encontrar o vídeo do hero'))
        return
      }

      const cleanup = () => {
        video.removeEventListener('loadeddata', handleLoaded)
        video.removeEventListener('error', handleError)
      }
      const handleLoaded = () => {
        cleanup()
        resolve()
      }

      const handleError = () => {
        cleanup()
        reject(new Error('Não foi possível carregar /vdHero-h264.mp4'))
      }

      if (video.error) {
        handleError()
        return
      }

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        resolve()
        return
      }

      removeVideoListeners = cleanup
      video.addEventListener('loadeddata', handleLoaded)
      video.addEventListener('error', handleError)
    })

    const minimumDisplayTime = new Promise((resolve) => {
      window.setTimeout(resolve, 1000)
    })

    Promise.all([
      Promise.allSettled([
        videoLoaded,
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
        setLoaderState(shouldReduceMotion ? 'hidden' : 'exiting')
      }
    })

    return () => {
      isMounted = false
      removeVideoListeners()
    }
  }, [shouldReduceMotion])

  return (
    <main className="hero">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={heroVideoRef}
          className="hero-video"
          src="/vdHero-h264.mp4"
          poster="/bgNoite.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {loaderState !== 'hidden' && (
        <motion.div
          className={`preloader${loaderState === 'exiting' ? ' is-exiting' : ''}`}
          role="status"
          aria-label="Carregando site"
          aria-hidden={loaderState === 'exiting'}
          initial={false}
          animate={{ y: loaderState === 'exiting' ? '100%' : '0%' }}
          transition={animationTransition}
          onAnimationComplete={() => {
            if (loaderState === 'exiting') {
              setLoaderState('hidden')
            }
          }}
        >
          <motion.div
            className="preloader-content"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={animationTransition}
          >
            <img className="preloader-logo" src="/logoSemFundo.png" alt="" />
            <span className="preloader-progress" aria-hidden="true">
              <motion.span
                className="preloader-progress-fill"
                animate={
                  shouldReduceMotion
                    ? { x: 0 }
                    : { x: ['-120%', '340%'] }
                }
                transition={
                  shouldReduceMotion
                    ? animationTransition
                    : {
                        ...spring,
                        stiffness: 80,
                        damping: 12,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }
                }
              />
            </span>
          </motion.div>
          <span className="visually-hidden">Carregando...</span>
        </motion.div>
      )}

      <header className="site-header">
        <motion.button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          whileTap={{ scale: 0.9 }}
          transition={animationTransition}
        >
          <motion.span
            animate={{ y: menuOpen ? 6.5 : 0, rotate: menuOpen ? 45 : 0 }}
            transition={animationTransition}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={animationTransition}
          />
          <motion.span
            animate={{ y: menuOpen ? -6.5 : 0, rotate: menuOpen ? -45 : 0 }}
            transition={animationTransition}
          />
        </motion.button>

        <motion.nav
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Navegação principal"
        >
          <motion.a
            className="nav-link is-active"
            href="#home"
            aria-current="page"
            onClick={() => setMenuOpen(false)}
            whileHover={{ color: '#3b82f6' }}
            whileFocus={{ color: '#3b82f6' }}
            transition={animationTransition}
          >
            Home
          </motion.a>
          <motion.a
            className="nav-link"
            href="#sobre"
            onClick={() => setMenuOpen(false)}
            whileHover={{ color: '#3b82f6' }}
            whileFocus={{ color: '#3b82f6' }}
            transition={animationTransition}
          >
            Sobre
          </motion.a>
          <motion.a
            className="nav-link"
            href="#contato"
            onClick={() => setMenuOpen(false)}
            whileHover={{ color: '#3b82f6' }}
            whileFocus={{ color: '#3b82f6' }}
            transition={animationTransition}
          >
            Contato
          </motion.a>
        </motion.nav>

        <div className="social-links" aria-label="Redes sociais">
          <motion.a
            className="social-link"
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            whileHover={{ scale: 1.12, y: -2 }}
            whileFocus={{ scale: 1.12, y: -2 }}
            transition={animationTransition}
          >
            <img className="social-icon" src="/whatsapp.png" alt="" />
          </motion.a>
          <motion.a
            className="social-link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            whileHover={{ scale: 1.12, y: -2 }}
            whileFocus={{ scale: 1.12, y: -2 }}
            transition={animationTransition}
          >
            <img className="social-icon" src="/instagram.png" alt="" />
          </motion.a>
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
