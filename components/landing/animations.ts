export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const stagger = (delay = 0.09) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } },
})
