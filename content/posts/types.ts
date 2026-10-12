export type BlogFaq = { question: string; answer: string }

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  keywords: string[]
  faqs?: BlogFaq[]
  Body: React.ComponentType
}
