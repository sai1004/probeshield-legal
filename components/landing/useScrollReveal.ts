import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Every landing-page section wires up the same ref + scroll-triggered `useInView` call
 * by hand (6 identical call sites before this hook existed). Centralizing it means a
 * future change to the reveal behavior (e.g. the `-80px` trigger margin) happens once.
 */
export function useScrollReveal(options: Parameters<typeof useInView>[1] = { once: true, margin: '-80px' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, options)
  return { ref, inView }
}
