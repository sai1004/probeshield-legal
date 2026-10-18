import robots from '@/app/robots'

describe('robots', () => {
  test('points search engines and AI crawlers at the sitemap and allows the whole site', () => {
    const result = robots()
    expect(result.sitemap).toBe('https://probeshield.com/sitemap.xml')
    expect(result.host).toBe('https://probeshield.com')
    expect(result.rules).toEqual(
      expect.arrayContaining([expect.objectContaining({ userAgent: '*', allow: '/' })]),
    )
  })

  test('explicitly allows the known AI crawlers', () => {
    const result = robots()
    const aiRule = Array.isArray(result.rules) ? result.rules.find((r) => Array.isArray(r.userAgent)) : undefined
    expect(aiRule).toBeDefined()
    expect(aiRule!.userAgent).toEqual(
      expect.arrayContaining(['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot']),
    )
    expect(aiRule!.allow).toBe('/')
  })
})
