import { motion, useReducedMotion } from 'motion/react'

const revealElements = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
}

export default function ScrollReveal({
  as = 'div',
  children,
  delay = 0,
  amount = 0.18,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const Element = revealElements[as] || motion.div

  return (
    <Element
      {...props}
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, filter: 'blur(8px)', y: 12 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, filter: 'blur(0px)', y: 0 }
      }
      viewport={{ once: true, amount }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Element>
  )
}
