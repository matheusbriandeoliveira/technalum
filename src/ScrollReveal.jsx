import { useLayoutEffect, useRef, useState } from 'react'

const revealElements = ['div', 'h1', 'h2', 'h3', 'li', 'p', 'span']

export default function ScrollReveal({
  as = 'div',
  children,
  delay = 0.1,
  amount = 0.18,
  nearCenter = true,
  className = '',
  style,
  ...props
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(
    () =>
      typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )
  const Element = revealElements.includes(as) ? as : 'div'

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(max-width: 700px)')
    const isFooter = Boolean(element.closest('footer'))
    let observer
    const observe = () => {
      observer?.disconnect()
      const revealOnEntry = mediaQuery.matches || isFooter || !nearCenter
      observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: revealOnEntry ? 0 : Math.max(0, Math.min(1, amount)),
        rootMargin: revealOnEntry ? '0px' : '0px 0px -30% 0px',
      },
    )

      observer.observe(element)
    }
    observe()
    mediaQuery.addEventListener('change', observe)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', observe)
    }
  }, [amount, nearCenter])

  const revealClass = [
    className,
    'scroll-reveal',
    !isVisible ? 'scroll-reveal-pending' : '',
    isVisible ? 'scroll-reveal-visible' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Element
      {...props}
      ref={elementRef}
      className={revealClass}
      style={{
        ...style,
        '--scroll-reveal-delay': `${delay}s`,
      }}
    >
      {children}
    </Element>
  )
}
