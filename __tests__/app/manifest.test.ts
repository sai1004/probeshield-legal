import manifest from '@/app/manifest'

describe('manifest', () => {
  test('declares the expected PWA identity and theme colors', () => {
    const result = manifest()
    expect(result.name).toBe('ProbeShield — Network Security Auditor')
    expect(result.short_name).toBe('ProbeShield')
    expect(result.start_url).toBe('/')
    expect(result.display).toBe('standalone')
    expect(result.theme_color).toBe('#4bdcc1')
  })

  test('has at least one valid icon entry', () => {
    const result = manifest()
    expect(result.icons?.length).toBeGreaterThan(0)
    for (const icon of result.icons ?? []) {
      expect(icon.src).toBeTruthy()
      expect(icon.type).toBe('image/png')
    }
  })
})
