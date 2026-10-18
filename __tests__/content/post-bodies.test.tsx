import { render } from '@testing-library/react'
import { posts } from '@/content/posts'

/**
 * content/posts/index.ts's own tests cover the data (slugs, dates, FAQs). This file
 * covers the other half of each post: the `Body` component itself, which is pure JSX/
 * prose plus the occasional <Link>/<BlogCtaCard> -- rendering each one for real is a
 * cheap way to catch a typo'd unclosed tag or a reference to something undefined that
 * static analysis wouldn't necessarily flag inside deeply nested JSX.
 */
describe('every blog post Body renders without throwing', () => {
  test.each(posts.map((post) => [post.slug, post] as const))('%s', (_slug, post) => {
    const { container } = render(<post.Body />)
    expect(container.textContent?.length ?? 0).toBeGreaterThan(0)
  })
})
