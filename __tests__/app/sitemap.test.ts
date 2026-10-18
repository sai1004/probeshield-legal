import sitemap from '@/app/sitemap'
import { posts } from '@/content/posts'

/**
 * This file's own comment documents a real past incident: every non-root sitemap URL
 * once pointed at the no-trailing-slash path, which 308-redirects (next.config.mjs sets
 * trailingSlash: true) -- Search Console flagged every one of them as "Page with
 * redirect". These tests exist so that regression can't silently happen again.
 */
describe('sitemap', () => {
  const entries = sitemap()

  test('every entry is an absolute https://probeshield.com URL', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/probeshield\.com/)
    }
  })

  test('every URL except the bare root carries a trailing slash', () => {
    for (const entry of entries) {
      if (entry.url === 'https://probeshield.com') continue
      expect(entry.url.endsWith('/')).toBe(true)
    }
  })

  test('includes the root and every top-level static route exactly once', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://probeshield.com')
    expect(urls).toContain('https://probeshield.com/blog/')
    expect(urls).toContain('https://probeshield.com/checklist/')
    expect(urls).toContain('https://probeshield.com/default-passwords/')
    expect(urls).toContain('https://probeshield.com/tools/mac-lookup/')
    expect(urls).toContain('https://probeshield.com/privacy/')
    expect(urls).toContain('https://probeshield.com/terms/')
    expect(new Set(urls).size).toBe(urls.length)
  })

  test('includes every blog post exactly once, using its own date as lastModified', () => {
    for (const post of posts) {
      const entry = entries.find((e) => e.url === `https://probeshield.com/blog/${post.slug}/`)
      expect(entry).toBeDefined()
      expect(entry!.lastModified).toEqual(new Date(post.date))
    }
    const blogPostUrls = entries.filter(
      (e) => e.url.startsWith('https://probeshield.com/blog/') && e.url !== 'https://probeshield.com/blog/',
    )
    expect(blogPostUrls).toHaveLength(posts.length)
  })
})
