import { useLayoutEffect, useRef, useState } from 'react'

const revealElements = ['div', 'h1', 'h2', 'h3', 'li', 'p', 'span']

export default function ScrollReveal({
  as = 'div',
  children,
  delay = 0.1,
  amount = 0.18,
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

    const isFooter = Boolean(element.closest('footer'))
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: isFooter ? 0 : Math.max(0, Math.min(1, amount)),
        rootMargin: isFooter ? '0px' : '0px 0px -30% 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [amount])

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
