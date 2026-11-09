import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { createPortal } from 'react-dom'
import ScrollReveal from './ScrollReveal.jsx'
import './App.css'

const spring = { type: 'spring', stiffness: 180, damping: 20, mass: 0.8 }
const solutionCards = [
  {
    id: 'esquadrias-de-aluminio',
    category: 'ESQUADRIAS',
    title: 'Esquadrias de Alumínio',
    image: '/carrossel/esquadriasdealuminio.png',
    description: [
      'As esquadrias de alumínio são utilizadas na fabricação de portas, janelas e sistemas de fechamento para projetos residenciais e comerciais. Oferecem resistência à corrosão, durabilidade e versatilidade, permitindo diferentes dimensões, modelos e acabamentos.',
      'São soluções que favorecem a entrada de luz natural, a ventilação e a integração entre ambientes internos e externos, acompanhando as necessidades de cada projeto arquitetônico.',
    ],
    detail:
      'Soluções desenvolvidas sob medida, considerando dimensões, tipos de abertura, acabamentos e necessidades de cada ambiente.',
  },
  {
    id: 'guarda-corpos',
    category: 'SEGURANÇA',
    title: 'Guarda-corpos',
    image: '/carrossel/guardaCorpos.png',
    description: [
      'Os guarda-corpos são sistemas de proteção instalados em sacadas, varandas, escadas, mezaninos e áreas elevadas. Fabricados com estruturas de alumínio e diferentes configurações de vidro, proporcionam segurança sem comprometer a visibilidade e a estética dos ambientes.',
      'Sua aplicação permite criar espaços mais abertos e integrados, valorizando a arquitetura com linhas discretas e acabamento contemporâneo.',
    ],
    detail:
      'Projetados para proporcionar segurança em áreas elevadas, respeitando as características arquitetônicas e as exigências técnicas de cada instalação.',
  },
  {
    id: 'caixilhos',
    category: 'VÃOS ENVIDRAÇADOS',
    title: 'Caixilhos',
    image: '/carrossel/caixilios.png',
    description: [
      'Os caixilhos são estruturas responsáveis por sustentar e acomodar vidros em portas, janelas e outros sistemas de fechamento. Produzidos em alumínio, podem ser desenvolvidos em diferentes formatos e configurações, conforme as características de cada projeto.',
      'Além de oferecerem resistência e estabilidade, contribuem para a vedação, o funcionamento das aberturas e a qualidade do acabamento, sendo elementos fundamentais na composição das fachadas e dos ambientes.',
    ],
    detail:
      'Cada estrutura é dimensionada conforme o projeto, considerando encaixes, sistemas de abertura, vedação e desempenho.',
  },
  {
    id: 'structural-glazing',
    category: 'SISTEMAS ENVIDRAÇADOS',
    title: 'Structural Glazing',
    image: '/carrossel/glazing.png',
    description: [
      'O Structural Glazing é um sistema de fachada envidraçada que utiliza fixação estrutural para integrar os painéis de vidro à estrutura de suporte. Sua principal característica é a aparência contínua da superfície envidraçada, com perfis pouco aparentes pelo lado externo.',
      'Muito utilizado em fachadas residenciais e comerciais contemporâneas, permite explorar grandes áreas de vidro, proporcionando iluminação natural, amplitude visual e uma estética arquitetônica sofisticada.',
    ],
    detail:
      'Sistemas desenvolvidos conforme as exigências da fachada, integrando estrutura e vidro para alcançar um acabamento contínuo e preciso.',
  },
  {
    id: 'pergolados-com-vidro',
    category: 'ÁREAS DE CONVIVÊNCIA',
    title: 'Pergolados com Vidro',
    image: '/carrossel/pergoladocomvidro.png',
    description: [
      'Os pergolados com vidro são estruturas projetadas para cobrir e valorizar áreas externas, como jardins, corredores, terraços, varandas e espaços de convivência. Combinam perfis estruturais com painéis de vidro, permitindo a entrada de iluminação natural enquanto oferecem proteção contra a chuva.',
      'São soluções que ampliam as possibilidades de utilização dos ambientes externos, criando espaços mais confortáveis e integrados à arquitetura da residência.',
    ],
    detail:
      'Estruturas planejadas de acordo com o espaço disponível, considerando cobertura, escoamento da água e integração com o ambiente.',
  },
  {
    id: 'portas-pivotantes',
    category: 'PORTAS',
    title: 'Portas Pivotantes',
    image: '/carrossel/portaspivotantes.png',
    description: [
      'As portas pivotantes utilizam um sistema de abertura baseado em pivôs instalados nas extremidades superior e inferior da folha, permitindo sua rotação em torno de um eixo vertical. Esse mecanismo possibilita a criação de portas de grandes dimensões, muito utilizadas em entradas principais de residências e projetos arquitetônicos contemporâneos.',
      'Além de sua funcionalidade, destacam-se pela presença visual, variedade de acabamentos e capacidade de transformar a entrada em um elemento marcante da fachada.',
    ],
    detail:
      'Desenvolvidas conforme as dimensões e características da entrada, com atenção ao sistema de abertura, estabilidade e acabamento.',
  },
]
const partnerBrands = [
  { name: 'Roto Fermax', image: '/marcas/roto-logo.png' },
  { name: 'Fise', image: '/marcas/fise-logo.png' },
  { name: 'Decamp Alumínio', image: '/marcas/decamp-logo.png' },
  { name: 'Day Brasil', image: '/marcas/dayBrasil-logo.png' },
  { name: 'Cyberglass', image: '/marcas/cyberglass-logo.png' },
]
const partnerBrandSlots = Array.from({ length: partnerBrands.length * 4 }, (_, index) =>
  partnerBrands[index % partnerBrands.length],
)
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

function PartnerBrandCarousel({ shouldReduceMotion }) {
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const animationRef = useRef({
    offset: 0,
    velocity: 0,
    isPaused: false,
    isDragging: false,
    pointerX: 0,
    dragOffset: 0,
  })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) {
      return undefined
    }

    let frameId
    let previousTime = 0

    const animate = (time) => {
      const state = animationRef.current
      const elapsed = previousTime ? Math.min(time - previousTime, 32) : 0
      previousTime = time

      const stageWidth = stage.clientWidth
      const cardWidth = cardRefs.current[0]?.offsetWidth || 200
      const gap = stageWidth <= 600 ? 18 : 32
      const spacing = cardWidth + gap
      const period = spacing * partnerBrandSlots.length
      const targetVelocity =
        shouldReduceMotion || state.isPaused || state.isDragging ? 0 : 0.018
      const easing = 1 - Math.exp(-elapsed / 220)
      state.velocity += (targetVelocity - state.velocity) * easing
      state.offset =
        ((state.offset + elapsed * state.velocity) % period + period) % period
      const radius = Math.max(stageWidth * 0.5, cardWidth * 2.8)
      const maxAngle = (78 * Math.PI) / 180
      const maxX = radius * Math.sin(maxAngle)

      stage.style.perspective = `${radius * 2.4}px`

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return
        }

        const unwrappedX = index * spacing - state.offset
        const x = ((unwrappedX + period / 2) % period + period) % period - period / 2
        const visible = Math.abs(x) <= maxX
        const angle = Math.asin(Math.max(-1, Math.min(1, x / radius)))
        const depth = radius * (1 - Math.cos(angle))

        card.style.visibility = visible ? 'visible' : 'hidden'
        card.style.zIndex = `${Math.round(Math.cos(angle) * 100)}`
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${depth}px) rotateY(${-angle}rad)`
      })

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [shouldReduceMotion])

  const startDrag = (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') {
      return
    }

    const state = animationRef.current
    state.isDragging = true
    state.pointerX = event.clientX
    state.dragOffset = state.offset
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event) => {
    const state = animationRef.current
    if (state.isDragging) {
      state.offset = state.dragOffset - (event.clientX - state.pointerX)
    }
  }

  const endDrag = () => {
    animationRef.current.isDragging = false
    animationRef.current.velocity = 0
  }

  return (
    <div
      className="partners-stage"
      ref={stageRef}
      aria-hidden="true"
      onMouseEnter={() => {
        animationRef.current.isPaused = true
      }}
      onMouseLeave={() => {
        animationRef.current.isPaused = false
      }}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {partnerBrandSlots.map((brand, index) => (
        <div
          className="partner-brand-card"
          key={`${brand.name}-${index}`}
          ref={(element) => {
            cardRefs.current[index] = element
          }}
        >
          <img src={brand.image} alt="" draggable="false" />
        </div>
      ))}
    </div>
  )
}

function SolutionsSection({ shouldReduceMotion, isReady, contactSectionRef }) {
  const carouselRef = useRef(null)
  const dragStateRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const dialogTriggerRef = useRef(null)
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactSectionRef,
    offset: ['start end', 'end start'],
  })
  const contactImageY = useTransform(
    contactScrollProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-34, 34],
  )
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const closeActiveCard = useCallback(() => setActiveCard(null), [])

  useEffect(() => {
    if (!activeCard) {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const wasAppRootInert = appRoot?.inert ?? false
    document.body.style.overflow = 'hidden'
    if (appRoot) {
      appRoot.inert = true
    }
    closeButtonRef.current?.focus()

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeActiveCard()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href]',
      )
      if (!focusableElements?.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleDialogKeyDown)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      if (appRoot) {
        appRoot.inert = wasAppRootInert
      }
      window.removeEventListener('keydown', handleDialogKeyDown)
      dialogTriggerRef.current?.focus()
    }
  }, [activeCard, closeActiveCard])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) {
      return undefined
    }

    const updateScrollButtons = () => {
      setCanScrollLeft(carousel.scrollLeft > 0)
      setCanScrollRight(
        carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
      )
    }

    updateScrollButtons()
    const resizeObserver = new ResizeObserver(updateScrollButtons)
    resizeObserver.observe(carousel)
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current
    if (!carousel) {
      return
    }

    const firstCard = carousel.querySelector('.solution-card')
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0
    const distance = firstCard ? firstCard.offsetWidth + gap : 320
    if (shouldReduceMotion) {
      carousel.scrollLeft += distance * direction
      return
    }

    carousel.scrollBy({
      left: distance * direction,
      behavior: 'smooth',
    })
  }

  const startCarouselDrag = (event) => {
    if (event.button !== 0) {
      return
    }

    dragStateRef.current = {
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    }
    event.currentTarget.classList.add('is-dragging')
  }

  const moveCarouselDrag = (event) => {
    const dragState = dragStateRef.current
    if (!dragState) {
      return
    }

    const delta = event.clientX - dragState.startX
    if (Math.abs(delta) > 4) {
      dragState.moved = true
    }

    if (dragState.moved && carouselRef.current) {
      carouselRef.current.scrollLeft = dragState.startScrollLeft - delta
    }
  }

  const stopCarouselDrag = () => {
    if (carouselRef.current) {
      carouselRef.current.classList.remove('is-dragging')
    }

    if (!dragStateRef.current) {
      return
    }

    if (dragStateRef.current.moved) {
      window.setTimeout(() => {
        if (dragStateRef.current) {
          dragStateRef.current.moved = false
        }
      }, 0)
    } else {
      dragStateRef.current = null
    }
  }

  return (
    <>
      <section
        className="solutions-section"
        aria-labelledby="solutions-title"
        inert={!isReady || activeCard !== null}
        aria-hidden={!isReady}
      >
        <div className="solutions-section-content">
          <div className="solutions-section-heading">
            <div>
              <ScrollReveal as="h2" id="solutions-title">
                Soluções para cada projeto.
              </ScrollReveal>
            </div>
          </div>

          <div
            className="solutions-carousel"
            ref={carouselRef}
            onMouseDown={startCarouselDrag}
            onMouseMove={moveCarouselDrag}
            onMouseUp={stopCarouselDrag}
            onMouseLeave={stopCarouselDrag}
            onClickCapture={(event) => {
              if (dragStateRef.current?.moved) {
                event.preventDefault()
                event.stopPropagation()
                dragStateRef.current = null
              }
            }}
            onScroll={(event) => {
              const carousel = event.currentTarget
              setCanScrollLeft(carousel.scrollLeft > 0)
              setCanScrollRight(
                carousel.scrollLeft + carousel.clientWidth <
                  carousel.scrollWidth - 1,
              )
            }}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Soluções TECHNALUM"
          >
            {solutionCards.map((card, index) => (
              <motion.button
                className="solution-card"
                key={card.title}
                type="button"
                onClick={(event) => {
                  dialogTriggerRef.current = event.currentTarget
                  setActiveCard(card)
                }}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, filter: 'blur(8px)', y: 18 }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: 1, filter: 'blur(0px)', y: 0 }
                }
                viewport={{ once: true, amount: 0.05 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { ...spring, delay: index * 0.08 }
                }
                aria-label={`Ver detalhes: ${card.title}`}
              >
                <img src={card.image} alt="" loading="lazy" />
                <span className="solution-card-shade" aria-hidden="true" />
                <span className="solution-card-content">
                  <span className="solution-card-category">
                    {card.category}
                  </span>
                  <span className="solution-card-title">{card.title}</span>
                  <span className="solution-card-action">
                    Conheça a solução
                  </span>
                </span>
              </motion.button>
            ))}
          </div>

          <div className="solutions-carousel-controls">
            <button
              className="solutions-carousel-button"
              type="button"
              onClick={() => scrollCarousel(-1)}
              disabled={!canScrollLeft}
              aria-label="Ver soluções anteriores"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m7 7-7-7 7-7" />
              </svg>
            </button>
            <button
              className="solutions-carousel-button"
              type="button"
              onClick={() => scrollCarousel(1)}
              disabled={!canScrollRight}
              aria-label="Ver próximas soluções"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section
        className="partners-section"
        aria-labelledby="partners-title"
        inert={!isReady}
        aria-hidden={!isReady}
      >
        <div className="partners-section-content">
          <div className="partners-section-heading">
            <ScrollReveal as="h2" id="partners-title">
              A qualidade começa nas escolhas.
            </ScrollReveal>
          </div>
          <PartnerBrandCarousel shouldReduceMotion={shouldReduceMotion} />
          <ScrollReveal as="p" className="partners-description" delay={0.12}>
            Trabalhamos com marcas especializadas que fazem parte das soluções
            que entregamos.
          </ScrollReveal>
          <ul className="visually-hidden" aria-label="Marcas parceiras">
            {partnerBrands.map((brand) => (
              <li key={brand.name}>{brand.name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="contact-section"
        id="contato"
        ref={contactSectionRef}
        aria-labelledby="contact-title"
        inert={!isReady}
        aria-hidden={!isReady}
      >
        <div className="contact-visual" aria-hidden="true">
          <motion.img
            className="contact-background"
            src="/img-1.png"
            alt=""
            loading="lazy"
            style={{ y: contactImageY }}
          />
        </div>
        <div className="contact-content">
          <ScrollReveal as="h2" id="contact-title">
            Seu projeto começa por aqui.
          </ScrollReveal>
          <ScrollReveal as="p" delay={0.12}>
            Uma solução específica, uma nova possibilidade ou orientação para
            escolher melhor. Nossa equipe está aqui para ajudar.
          </ScrollReveal>
          <a
            className="contact-cta"
            href="https://wa.me/?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20meu%20projeto."
            target="_blank"
            rel="noreferrer"
          >
            Conversar sobre meu projeto
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {activeCard && (
            <motion.div
              className="solution-dialog-backdrop"
              key={activeCard.id}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : spring}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeActiveCard()
                }
              }}
            >
              <motion.article
                ref={dialogRef}
                className="solution-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="solution-dialog-title"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={shouldReduceMotion ? { duration: 0 } : spring}
              >
                <header className="solution-dialog-header">
                  <img
                    className="solution-dialog-image"
                    src={activeCard.image}
                    alt=""
                  />
                  <span
                    className="solution-dialog-image-shade"
                    aria-hidden="true"
                  />
                  <button
                    ref={closeButtonRef}
                    className="solution-dialog-close"
                    type="button"
                    onClick={closeActiveCard}
                    aria-label="Fechar detalhes da solução"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                  <div className="solution-dialog-heading">
                    <p className="solution-dialog-category">
                      {activeCard.category}
                    </p>
                    <h2 id="solution-dialog-title">{activeCard.title}</h2>
                  </div>
                </header>
                <div className="solution-dialog-content">
                  {activeCard.description.map((paragraph) => (
                    <p className="solution-dialog-description" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  <hr className="solution-dialog-divider" />
                  <h3 className="solution-dialog-subtitle">
                    Sobre a execução
                  </h3>
                  <p className="solution-dialog-detail">{activeCard.detail}</p>
                  <div className="solution-dialog-actions">
                    <a
                      className="solution-dialog-cta"
                      href={`/solucoes.html#${activeCard.id}`}
                    >
                      CONHEÇA A SOLUÇÃO
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

    </>
  )
}

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
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth)
  const [loaderState, setLoaderState] = useState('loading')
  const heroVideoRef = useRef(null)
  const scrollOverlapRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const contactSectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const animationTransition = shouldReduceMotion ? { duration: 0 } : spring
  const { scrollYProgress } = useScroll({
    target: scrollOverlapRef,
    offset: ['start start', 'end start'],
  })
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ['start end', 'start start'],
  })
  const aboutLogoProgress = useTransform(
    aboutScrollProgress,
    [0, 0.65],
    [0, 1],
  )
  const smoothLogoProgress = useSpring(aboutLogoProgress, {
    stiffness: isMobileMenu ? 240 : 280,
    damping: 26,
    mass: 0.65,
  })
  const heroLogoWidth =
    viewportWidth <= 768
      ? Math.min(500, viewportWidth * 0.82)
      : Math.min(500, viewportWidth * 0.8)
  const headerLogoWidth =
    viewportWidth <= 600
      ? Math.min(150, Math.max(120, viewportWidth * 0.26))
      : Math.min(180, Math.max(120, viewportWidth * 0.14))
  const heroLogoWidthProgress = useTransform(
    smoothLogoProgress,
    [0, 1],
    [heroLogoWidth, headerLogoWidth],
  )
  const heroLogoY = useTransform(smoothLogoProgress, (progress) =>
    shouldReduceMotion ? 0 : progress * (30 - window.innerHeight / 2),
  )
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
  const loaderTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 125, damping: 26, mass: 1 }

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) {
      return undefined
    }

    const startPlayback = () => {
      if (document.visibilityState !== 'visible' || !video.paused) {
        return
      }

      video.muted = true
      video.playsInline = true
      video.play().catch((error) => {
        console.error(
          'Não foi possível iniciar automaticamente o vídeo do hero',
          error,
        )
      })
    }

    video.addEventListener('canplay', startPlayback)
    document.addEventListener('visibilitychange', startPlayback)
    startPlayback()

    return () => {
      video.removeEventListener('canplay', startPlayback)
      document.removeEventListener('visibilitychange', startPlayback)
    }
  }, [])

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
    const updateViewportWidth = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', updateViewportWidth)
    return () => window.removeEventListener('resize', updateViewportWidth)
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
        reject(new Error('Não foi possível carregar /vd2background.mp4'))
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
      window.setTimeout(resolve, 1600)
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
          animate={{
            y: loaderState === 'exiting' ? '100%' : '0%',
          }}
          transition={loaderTransition}
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
            transition={loaderTransition}
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
        id="home"
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
        <div className="hero-media" aria-hidden="true">
          <motion.video
            ref={heroVideoRef}
            className="hero-video"
            src="/vd2background.mp4"
            poster="/bgNoite.png"
            style={{ y: heroParallaxY, scale: heroParallaxScale }}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
          />
        </div>
      </main>

      <header
        className="site-header"
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
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
            href="https://www.instagram.com/technalum/"
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
        aria-hidden={
          loaderState !== 'hidden' || (isMobileMenu && !menuOpen)
        }
        inert={loaderState !== 'hidden' || (isMobileMenu && !menuOpen)}
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
          href="/solucoes.html"
          onClick={() => setMenuOpen(false)}
        >
          Soluções
        </a>
        <a
          className="nav-link"
          href="#contato"
          onClick={() => setMenuOpen(false)}
        >
          Contato
        </a>
      </motion.nav>

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
        ref={aboutSectionRef}
        aria-labelledby="about-title"
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
        <div className="about-content">
          <div className="about-intro">
            <ScrollReveal
              as="h1"
              className="about-title"
              id="about-title"
            >
              Da engenharia à instalação, soluções em esquadrias e fachadas
              para projetos que exigem precisão.
            </ScrollReveal>
            <ScrollReveal
              as="p"
              className="about-description"
              delay={0.12}
            >
              Há 26 anos, desenvolvemos soluções em esquadrias e
              fachadas, reunindo engenharia própria, estrutura de fabricação e
              profissionais especializados para atender projetos residenciais
              e construtoras.
            </ScrollReveal>
          </div>

          <ul className="about-highlights" aria-label="Diferenciais TECHNALUM">
            {companyHighlights.map((highlight, index) => (
              <li className="about-highlight" key={highlight.value}>
                {highlight.value === '26+' ? (
                  <ExperienceCounter shouldReduceMotion={shouldReduceMotion} />
                ) : (
                  <ScrollReveal
                    as="h2"
                    className="about-highlight-value"
                    delay={index * 0.1}
                  >
                    {highlight.value}
                  </ScrollReveal>
                )}
                <ScrollReveal
                  as="p"
                  className="about-highlight-description"
                  delay={index * 0.1 + 0.08}
                >
                  {highlight.description}
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>

      <SolutionsSection
        shouldReduceMotion={shouldReduceMotion}
        isReady={loaderState === 'hidden'}
        contactSectionRef={contactSectionRef}
      />

      <footer className="site-footer">
        <div className="site-footer-content">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src="/logoSemFundo.png"
              alt="TECHNALUM"
              loading="lazy"
            />
            <ScrollReveal as="p" className="footer-tagline" delay={0.08}>
              Há 26 anos construindo histórias em alumínio.
            </ScrollReveal>
          </div>
          <nav className="footer-legal-links" aria-label="Informações legais">
            <ScrollReveal as="h2" className="footer-section-title" delay={0.12}>
              Informações legais
            </ScrollReveal>
            <a href="/politica-de-privacidade.html">
              Política de Privacidade
            </a>
            <a href="/termos-de-uso.html">Termos de Uso</a>
            <a href="/politica-de-cookies.html">Política de Cookies</a>
          </nav>
          <div className="footer-contact">
            <ScrollReveal as="h2" className="footer-section-title" delay={0.16}>
              Contato
            </ScrollReveal>
            <a href="tel:+5514997732211">(14) 99773-2211</a>
            <a href="mailto:contato2@technalum.com.br">
              contato2@technalum.com.br
            </a>
          </div>
          <div className="footer-social-group">
            <ScrollReveal as="h2" className="footer-section-title" delay={0.2}>
              Acompanhe nossas
              <br />
              redes sociais!
            </ScrollReveal>
            <div className="footer-socials" aria-label="Redes sociais">
              <a
                className="footer-social-link"
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <img src="/whatsapp.png" alt="" />
              </a>
              <a
                className="footer-social-link"
                href="https://www.instagram.com/technalum/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src="/instagram.png" alt="" />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <ScrollReveal as="p" className="footer-copyright">
              © 2026 Technalum Esquadrias e Fachadas.
            </ScrollReveal>
            <ScrollReveal as="p" className="footer-cnpj">
              CNPJ: 04.023.900/0001-05
            </ScrollReveal>
            <a
              className="footer-credit"
              href="https://wa.me/5514991749010"
              target="_blank"
              rel="noreferrer"
              aria-label="Fale com a Venovra pelo WhatsApp"
            >
              Desenvolvido por <span>Venovra</span>
            </a>
          </div>
        </div>
      </footer>

      <motion.div
        className={`brand-overlay${menuOpen && isMobileMenu ? ' is-menu-open' : ''}`}
        style={{ y: heroLogoY }}
        inert={loaderState !== 'hidden'}
        aria-hidden={loaderState !== 'hidden'}
      >
        <a
          className="brand-logo-link"
          href="/#home"
          aria-label="TECHNALUM — página inicial"
        >
          <motion.img
            className="brand-logo"
            src="/logoSemFundo.png"
            alt=""
            style={{ width: heroLogoWidthProgress }}
          />
        </a>
      </motion.div>

      <a
        className="whatsapp-float"
        href="https://www.whatsapp.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar pelo WhatsApp"
      >
        <img src="/whatsapp.png" alt="" />
      </a>
    </>
  )
}

export default App
