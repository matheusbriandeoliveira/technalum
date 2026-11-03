import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import ScrollReveal from './ScrollReveal.jsx'
import './SolutionsPage.css'

const solutionCatalog = [
  {
    id: 'esquadrias-de-aluminio',
    title: 'Esquadrias de Alumínio',
    description:
      'Esquadrias desenvolvidas para integrar ambientes, valorizar a arquitetura e oferecer funcionalidade, durabilidade e acabamentos adequados às necessidades de cada projeto.',
    image: '/carrossel/esquadriasdealuminio.png',
  },
  {
    id: 'guarda-corpos',
    title: 'Guarda-corpos',
    description:
      'Soluções em guarda-corpos de vidro e alumínio que proporcionam proteção, transparência e integração visual em sacadas, escadas, varandas e outros ambientes.',
    image: '/carrossel/guardaCorpos.png',
  },
  {
    id: 'caixilhos',
    title: 'Caixilhos',
    description:
      'Caixilhos de alumínio planejados para diferentes configurações de portas e janelas, combinando resistência, funcionalidade e integração com a arquitetura.',
    image: '/carrossel/caixilios.png',
  },
  {
    id: 'structural-glazing',
    title: 'Structural Glazing',
    description:
      'Sistema de fachadas envidraçadas que valoriza a continuidade visual do vidro, criando superfícies modernas e elegantes para projetos arquitetônicos.',
    image: '/carrossel/glazing.png',
  },
  {
    id: 'pergolados-com-vidro',
    title: 'Pergolados com Vidro',
    description:
      'Estruturas com cobertura de vidro que permitem aproveitar a iluminação natural e criar ambientes protegidos, valorizando áreas externas e espaços de convivência.',
    image: '/carrossel/pergoladocomvidro.png',
  },
  {
    id: 'portas-pivotantes',
    title: 'Portas Pivotantes',
    description:
      'Portas que combinam imponência, design e funcionalidade, oferecendo uma solução arquitetônica marcante para entradas residenciais e comerciais.',
    image: '/carrossel/portaspivotantes.png',
  },
]

function createGalleryImages(solution) {
  return [
    { src: solution.image, alt: solution.title, placeholder: false },
    ...Array.from({ length: 4 }, (_, index) => ({
      src: null,
      alt: '',
      placeholder: true,
      label: `Foto ${index + 2} de ${solution.title} — imagem de projeto em breve`,
    })),
  ]
}

function SolutionGallery({ solution, index, prefersReducedMotion }) {
  const [activeImage, setActiveImage] = useState(0)
  const images = createGalleryImages(solution)
  const selectedImage = images[activeImage]
  const imageMotion = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: 'easeOut' }

  const showImage = (nextIndex) => {
    setActiveImage((nextIndex + images.length) % images.length)
  }

  return (
    <section
      className="catalog-solution"
      id={solution.id}
      aria-labelledby={`${solution.id}-title`}
    >
      <div className="catalog-solution-heading">
        <ScrollReveal as="p" className="catalog-solution-index">
          {String(index + 1).padStart(2, '0')}
        </ScrollReveal>
        <ScrollReveal as="h2" id={`${solution.id}-title`} delay={0.08}>
          {solution.title}
        </ScrollReveal>
        <ScrollReveal
          as="p"
          className="catalog-solution-description"
          delay={0.16}
        >
          {solution.description}
        </ScrollReveal>
      </div>

      <div className="catalog-gallery">
        <div className="catalog-gallery-main" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {selectedImage.placeholder ? (
              <motion.div
                className="catalog-gallery-placeholder"
                key={`${solution.id}-${activeImage}`}
                role="img"
                aria-label={selectedImage.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={imageMotion}
              >
                <span className="catalog-placeholder-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span>{selectedImage.label}</span>
              </motion.div>
            ) : (
              <motion.img
                className="catalog-gallery-image"
                key={`${solution.id}-${activeImage}`}
                src={selectedImage.src}
                alt={`${solution.title} — fotografia ${activeImage + 1}`}
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={imageMotion}
                draggable="false"
              />
            )}
          </AnimatePresence>

          <button
            className="catalog-gallery-arrow is-previous"
            type="button"
            onClick={() => showImage(activeImage - 1)}
            aria-label={`Foto anterior de ${solution.title}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5m7 7-7-7 7-7" />
            </svg>
          </button>
          <button
            className="catalog-gallery-arrow is-next"
            type="button"
            onClick={() => showImage(activeImage + 1)}
            aria-label={`Próxima foto de ${solution.title}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
          <span className="catalog-gallery-count" aria-hidden="true">
            {String(activeImage + 1).padStart(2, '0')} / 05
          </span>
        </div>

        <div
          className="catalog-gallery-thumbnails"
          role="group"
          aria-label={`Selecionar fotografia de ${solution.title}`}
        >
          {images.map((image, imageIndex) => (
            <button
              className={`catalog-gallery-thumbnail${activeImage === imageIndex ? ' is-active' : ''}`}
              key={`${solution.id}-thumbnail-${imageIndex}`}
              type="button"
              onClick={() => showImage(imageIndex)}
              aria-label={
                image.placeholder
                  ? image.label
                  : `Exibir foto ${imageIndex + 1} de ${solution.title}`
              }
              aria-pressed={activeImage === imageIndex}
            >
              {image.placeholder ? (
                <span className="catalog-thumbnail-placeholder" aria-hidden="true">
                  <span />
                  <span />
                </span>
              ) : (
                <img src={image.src} alt="" loading="lazy" />
              )}
              {image.placeholder && (
                <span className="catalog-thumbnail-label">Em breve</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function CatalogFooter() {
  return (
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
          <a href="/politica-de-privacidade.html">Política de Privacidade</a>
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
              href="https://www.instagram.com/"
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
  )
}

export default function SolutionsPage() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    document.title = 'Soluções | TECHNALUM — Esquadrias e Fachadas'
    if (!window.location.hash) {
      return
    }

    const targetId = decodeURIComponent(window.location.hash.slice(1))
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <a
          className="catalog-header-brand"
          href="/#home"
          aria-label="TECHNALUM — página inicial"
        >
          <img src="/logoSemFundo.png" alt="" />
        </a>
        <nav className="catalog-navigation" aria-label="Navegação principal">
          <a href="/#home">Home</a>
          <a href="/solucoes.html" aria-current="page">
            Soluções
          </a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        <section className="catalog-intro" aria-labelledby="catalog-title">
          <ScrollReveal as="p" className="catalog-intro-eyebrow">
            TECHNALUM · ESQUADRIAS E FACHADAS
          </ScrollReveal>
          <ScrollReveal as="h1" id="catalog-title" delay={0.08}>
            Soluções
          </ScrollReveal>
          <ScrollReveal as="p" delay={0.16}>
            Da engenharia à instalação, desenvolvemos soluções em esquadrias e
            fachadas que unem funcionalidade, precisão e estética para diferentes
            projetos arquitetônicos.
          </ScrollReveal>
          <a className="catalog-intro-link" href="#esquadrias-de-aluminio">
            Explorar soluções
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <div className="catalog-solutions">
          {solutionCatalog.map((solution, index) => (
            <SolutionGallery
              key={solution.id}
              solution={solution}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <section
          className="contact-section"
          id="contato"
          aria-labelledby="contact-title"
        >
          <div className="contact-visual" aria-hidden="true">
            <img
              className="contact-background"
              src="/img-1.png"
              alt=""
              loading="lazy"
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
      </main>

      <CatalogFooter />
      <a
        className="whatsapp-float"
        href="https://www.whatsapp.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar pelo WhatsApp"
      >
        <img src="/whatsapp.png" alt="" />
      </a>
    </div>
  )
}
