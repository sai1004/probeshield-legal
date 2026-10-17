export type BlogFaq = { question: string; answer: string }

export type BlogCta = {
  headline?: string
  description?: string
  buttonText?: string
  badgeText?: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  keywords: string[]
  faqs?: BlogFaq[]
  cta?: BlogCta
  Body: React.ComponentType
}

