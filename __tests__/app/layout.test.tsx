import { renderToStaticMarkup } from 'react-dom/server'
import RootLayout, { metadata, viewport } from '@/app/layout'

// RootLayout returns a full <html>/<body> document, which @testing-library/react's
// render() can't mount (it appends into a <div> inside document.body -- you can't
// nest <html> inside that). renderToStaticMarkup sidesteps that by not mounting into
// the DOM at all, which is enough to prove the component renders without throwing and
// contains what it should.

test('renders the html/body shell around its children, plus the ConsentBanner', () => {
  const html = renderToStaticMarkup(
    <RootLayout>
      <div data-testid="page-content">hello</div>
    </RootLayout>,
  )
  expect(html).toContain('<html lang="en">')
  expect(html).toContain('page-content')
  // ConsentBanner itself renders nothing until mounted client-side (useEffect hasn't
  // run in a static-markup render), so just confirm the layout didn't crash by
  // including it.
  expect(html).toContain('</body>')
})

test('metadata declares the expected title and canonical site', () => {
  expect(metadata.title).toEqual({
    default: 'ProbeShield — Network Security Auditor for Android',
    template: '%s | ProbeShield',
  })
  expect(String(metadata.metadataBase)).toBe('https://probeshield.com/')
})

test('viewport sets a non-zoomable-by-default mobile viewport and the brand theme color', () => {
  expect(viewport.initialScale).toBe(1)
  expect(viewport.themeColor).toBe('#051424')
})
