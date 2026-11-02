import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import './App.css'

const spring = { type: 'spring', stiffness: 180, damping: 20, mass: 0.8 }
const solutions = [
  'ESQUADRIAS DE ALUMÍNIO',
  'PORTAS E JANELAS',
  'PORTAS DE CORRER',
  'PORTAS PIVOTANTES',
  'CAIXILHOS',
  'GUARDA-CORPOS',
  'BRISES',
  'FACHADAS',
  'STRUCTURAL GLAZING',
  'PERGOLADO COM VIDRO',
]
const companyHighlights = [
  {
    value: '26+',
    description: 'Anos de experiência',
  },
  {
    value: 'Engenharia própria',
    description: 'Conhecimento técnico em cada projeto',
  },
  {
    value: 'Fabricação',
    description: 'Estrutura própria de produção',
  },
  {
    value: 'Execução completa',
    description: 'Da fabricação à instalação',
  },
]

function ExperienceCounter({ shouldReduceMotion }) {
  const counterRef = useRef(null)
  const isInView = useInView(counterRef, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const springCount = useSpring(count, {
    stiffness: 55,
    damping: 16,
    mass: 1,
  })
  const roundedCount = useTransform(springCount, Math.round)

  useEffect(() => {
    if (shouldReduceMotion || isInView) {
      count.set(26)
    }
  }, [count, isInView, shouldReduceMotion])

  return (
    <h2 className="about-highlight-value" aria-label="26+">
      {shouldReduceMotion ? (
        <span aria-hidden="true">26</span>
      ) : (
        <motion.span ref={counterRef} aria-hidden="true">
          {roundedCount}
        </motion.span>
      )}
      <span aria-hidden="true">+</span>
    </h2>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobileMenu, setIsMobileMenu] = useState(() =>
    window.matchMedia('(max-width: 600px)').matches,
  )
  const [loaderState, setLoaderState] = useState('loading')
  const heroVideoRef = useRef(null)
  const scrollOverlapRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const animationTransition = shouldReduceMotion ? { duration: 0 } : spring
  const { scrollYProgress } = useScroll({
    target: scrollOverlapRef,
    offset: ['start start', 'end start'],
  })
  const heroParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0vh', '0vh'] : ['0vh', '2vh'],
  )
  const heroParallaxScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.08],
  )
  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    shouldReduceMotion ? [1, 1] : [1, 0.82],
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)')
    const updateMenuMode = () => {
      setIsMobileMenu(mediaQuery.matches)
      if (!mediaQuery.matches) {
        setMenuOpen(false)
      }
    }

    updateMenuMode()
    mediaQuery.addEventListener('change', updateMenuMode)

    return () => mediaQuery.removeEventListener('change', updateMenuMode)
  }, [])

  useEffect(() => {
    if (!isMobileMenu || !menuOpen) {
      return undefined
    }

    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = bodyOverflow
    }
  }, [isMobileMenu, menuOpen])

  useEffect(() => {
    if (!isMobileMenu || !menuOpen) {
      return undefined
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenu, menuOpen])

  useEffect(() => {
    if (loaderState === 'hidden') {
      return undefined
    }

    const rootOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = rootOverflow
      document.body.style.overflow = bodyOverflow
    }
  }, [loaderState])

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
    <>
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

      <div className="scroll-overlap" ref={scrollOverlapRef}>
      <main
        className={`hero${menuOpen && isMobileMenu ? ' is-menu-open' : ''}`}
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
        <div className="hero-media" aria-hidden="true">
          <motion.video
            ref={heroVideoRef}
            className="hero-video"
            src="/vdHero-h264.mp4"
            poster="/bgNoite.png"
            style={{ y: heroParallaxY, scale: heroParallaxScale }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

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

        <motion.nav
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Navegação principal"
          aria-hidden={isMobileMenu ? !menuOpen : undefined}
          inert={isMobileMenu && !menuOpen}
          animate={
            isMobileMenu
              ? {
                  opacity: menuOpen ? 1 : 0,
                  y: menuOpen ? 0 : -20,
                  scale: menuOpen ? 1 : 0.98,
                  pointerEvents: menuOpen ? 'auto' : 'none',
                }
              : { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' }
          }
          transition={animationTransition}
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
        </motion.nav>

        <motion.div
          className="hero-content"
          id="home"
          style={{ opacity: heroContentOpacity }}
        >
          <div className="brand-lockup">
            <img
              className="brand-logo"
              src="/logoSemFundo.png"
              alt="TECHNALUM — Esquadrias e Fachadas"
            />
          </div>
        </motion.div>
      </main>

      <section
        className="solutions-marquee"
        aria-label="Categorias e soluções"
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
        <div className="solutions-viewport">
          <div className="solutions-track">
            {[false, true].map((isDuplicate) => (
              <ul
                className="solutions-group"
                key={isDuplicate ? 'duplicate' : 'primary'}
                aria-hidden={isDuplicate || undefined}
              >
                {solutions.map((solution) => (
                  <li className="solution-item" key={solution}>
                    {solution}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-section"
        id="sobre"
        aria-labelledby="about-title"
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
        <div className="about-content">
          <div className="about-intro">
            <motion.h1
              className="about-title"
              id="about-title"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={shouldReduceMotion ? { duration: 0 } : spring}
            >
              Da engenharia à instalação, soluções em esquadrias e fachadas
              para projetos que exigem precisão.
            </motion.h1>
            <motion.p
              className="about-description"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { ...spring, delay: 0.1 }
              }
            >
              Há 26 anos, desenvolvemos soluções em esquadrias e
              fachadas, reunindo engenharia própria, estrutura de fabricação e
              profissionais especializados para atender projetos residenciais
              e construtoras.
            </motion.p>
          </div>

          <ul className="about-highlights" aria-label="Diferenciais TECHNALUM">
            {companyHighlights.map((highlight, index) => (
              <motion.li
                className="about-highlight"
                key={highlight.value}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { ...spring, delay: index * 0.1 }
                }
              >
                {highlight.value === '26+' ? (
                  <ExperienceCounter shouldReduceMotion={shouldReduceMotion} />
                ) : (
                  <h2 className="about-highlight-value">{highlight.value}</h2>
                )}
                <p className="about-highlight-description">
                  {highlight.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </>
  )
}

export default App
