import { render, screen } from '@testing-library/react'
import BlogPostPage, { generateStaticParams, generateMetadata } from '@/app/blog/[slug]/page'
import { posts } from '@/content/posts'

const mockNotFound = jest.fn(() => {
  throw new Error('NEXT_NOT_FOUND')
})
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => '/blog/some-post',
  notFound: () => mockNotFound(),
}))

test('generateStaticParams returns every post slug', () => {
  const params = generateStaticParams()
  expect(params.map((p) => p.slug).sort()).toEqual(posts.map((p) => p.slug).sort())
})

test('generateMetadata returns the post title/description for a real slug', () => {
  const post = posts[0]
  const metadata = generateMetadata({ params: { slug: post.slug } })
  expect(metadata.title).toBe(post.title)
  expect(metadata.description).toBe(post.description)
})

test('generateMetadata returns an empty object for an unknown slug', () => {
  expect(generateMetadata({ params: { slug: 'does-not-exist' } })).toEqual({})
})

test('renders a real post: title, body content, and the bottom CTA', () => {
  const post = posts[0]
  render(<BlogPostPage params={{ slug: post.slug }} />)
  expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
  const playLinks = screen
    .getAllByRole('link')
    .filter((link) => link.getAttribute('href')?.includes('play.google.com/store/apps/details?id=com.probeshield'))
  expect(playLinks.length).toBeGreaterThan(0)
})

test('renders FAQs when the post has them', () => {
  const postWithFaqs = posts.find((p) => p.faqs && p.faqs.length > 0)
  if (!postWithFaqs) throw new Error('test fixture assumption broken: expected at least one post with FAQs')
  render(<BlogPostPage params={{ slug: postWithFaqs.slug }} />)
  expect(screen.getByText(postWithFaqs.faqs![0].question)).toBeInTheDocument()
})

test('calls notFound() for an unknown slug rather than rendering', () => {
  expect(() => render(<BlogPostPage params={{ slug: 'does-not-exist' }} />)).toThrow('NEXT_NOT_FOUND')
  expect(mockNotFound).toHaveBeenCalled()
})
