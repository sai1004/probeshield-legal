import { render, screen } from '@testing-library/react'
import { LegalSection } from '@/components/legal/LegalSection'

/**
 * This is the component the refactor plan (.claude/plan/code-quality-refactor-plan.md,
 * Phase 4) built specifically to stop `id="section-N"` and the visible "Section 0N"
 * label from being able to drift apart — both must come from the single `number` prop.
 * That's exactly what these tests assert.
 */
describe('LegalSection', () => {
  test('derives both the id and the zero-padded label from the number prop', () => {
    render(
      <LegalSection number={5} title="Crash Reports">
        <p>body text</p>
      </LegalSection>,
    )

    const section = screen.getByText('body text').closest('section')
    expect(section).toHaveAttribute('id', 'section-5')
    expect(screen.getByText('Section 05')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Crash Reports' })).toBeInTheDocument()
  })

  test('zero-pads single-digit numbers but not double-digit ones', () => {
    const { rerender } = render(
      <LegalSection number={1} title="One">
        <p>x</p>
      </LegalSection>,
    )
    expect(screen.getByText('Section 01')).toBeInTheDocument()

    rerender(
      <LegalSection number={12} title="Twelve">
        <p>x</p>
      </LegalSection>,
    )
    expect(screen.getByText('Section 12')).toBeInTheDocument()
  })

  test('renders arbitrary children content unchanged', () => {
    render(
      <LegalSection number={2} title="Some Section">
        <p>first paragraph</p>
        <ul>
          <li>a list item</li>
        </ul>
      </LegalSection>,
    )
    expect(screen.getByText('first paragraph')).toBeInTheDocument()
    expect(screen.getByText('a list item')).toBeInTheDocument()
  })
})
