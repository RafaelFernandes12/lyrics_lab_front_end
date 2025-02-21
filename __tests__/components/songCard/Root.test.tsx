import { Root } from '@/components/songCard/SongCard'
import { render, screen } from '@testing-library/react'

describe('SongCardRoot Component', () => {
  test('it should render the children', () => {
    render(
      <Root>
        <span>Test</span>
      </Root>,
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
  test('it should render the new styles', () => {
    render(
      <Root className="bg-black">
        <span>Test</span>
      </Root>,
    )
    expect(screen.getByTestId('container')).toHaveClass('bg-black')
  })
})
