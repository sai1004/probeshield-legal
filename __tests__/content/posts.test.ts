import { posts, getPost } from '@/content/posts'

describe('getPost', () => {
  test('finds a post by its exact slug', () => {
    const first = posts[0]
    expect(getPost(first.slug)).toBe(first)
  })

  test('returns undefined for an unknown slug', () => {
    expect(getPost('this-post-does-not-exist')).toBeUndefined()
  })

  test('is case-sensitive (does not silently match a different-case slug)', () => {
    const first = posts[0]
    expect(getPost(first.slug.toUpperCase())).toBeUndefined()
  })
})

describe('posts registry integrity', () => {
  test('is not empty', () => {
    expect(posts.length).toBeGreaterThan(0)
  })

  test('every slug is unique', () => {
    const slugs = posts.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  test('every post has the required non-empty fields', () => {
    for (const post of posts) {
      expect(post.slug.length).toBeGreaterThan(0)
      expect(post.title.length).toBeGreaterThan(0)
      expect(post.description.length).toBeGreaterThan(0)
      expect(post.date.length).toBeGreaterThan(0)
      expect(post.readTime.length).toBeGreaterThan(0)
      expect(Array.isArray(post.keywords)).toBe(true)
      expect(typeof post.Body).toBe('function')
    }
  })

  test('every slug matches its own filename-derived convention (lowercase, hyphenated, no spaces)', () => {
    for (const post of posts) {
      expect(post.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  test('every post date parses as a valid date', () => {
    for (const post of posts) {
      expect(Number.isNaN(new Date(post.date).getTime())).toBe(false)
    }
  })

  test('FAQ entries, where present, have both a question and an answer', () => {
    for (const post of posts) {
      for (const faq of post.faqs ?? []) {
        expect(faq.question.length).toBeGreaterThan(0)
        expect(faq.answer.length).toBeGreaterThan(0)
      }
    }
  })
})
