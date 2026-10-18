import { render, screen } from '@testing-library/react'
import { ShieldSvg } from '@/components/landing/ShieldSvg'
import { HeroShield } from '@/components/landing/HeroShield'
import { DownloadBtn } from '@/components/landing/DownloadBtn'
import { FloatingScanLines } from '@/components/landing/FloatingScanLines'

describe('ShieldSvg', () => {
  test('defaults to size 36', () => {
    const { container } = render(<ShieldSvg />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '36')
    expect(svg).toHaveAttribute('height', '36')
  })

  test('respects a custom size and color', () => {
    const { container } = render(<ShieldSvg size={64} color="#ff0000" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '64')
    expect(svg).toHaveAttribute('height', '64')
    expect(container.querySelector('path')).toHaveAttribute('stroke', '#ff0000')
  })
})

describe('HeroShield', () => {
  test('renders the pulsing shield (including the inner ShieldSvg) without crashing', () => {
    const { container } = render(<HeroShield />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('DownloadBtn', () => {
  test('always links to the Play Store listing', () => {
    render(<DownloadBtn />)
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.probeshield',
    )
  })

  test('default variant shows the full "Get it on Google Play" text and the subtext', () => {
    render(<DownloadBtn />)
    expect(screen.getByText('Get it on Google Play')).toBeInTheDocument()
    expect(screen.getByText('Free · Android 8+')).toBeInTheDocument()
  })

  test('small variant splits the label and omits the subtext', () => {
    render(<DownloadBtn small />)
    expect(screen.getByText('Google Play')).toBeInTheDocument()
    expect(screen.queryByText('Free · Android 8+')).not.toBeInTheDocument()
  })
})

describe('FloatingScanLines', () => {
  test('renders as a decorative, non-interactive overlay', () => {
    const { container } = render(<FloatingScanLines />)
    const root = container.firstElementChild
    expect(root).toHaveAttribute('aria-hidden')
  })
})
