import { SearchBar } from '@/components/header/SearchInput'
import { albums, songs } from '@/mocks/mocks'
import { fireEvent, render, screen } from '@testing-library/react'

describe('SearchBar Header component', () => {
  test('it should render the elements properly', () => {
    render(<SearchBar songs={songs} albums={albums} />)
    expect(screen.getByTestId('searchButton')).toBeInTheDocument()
  })

  test("it should show the songs and albuns after clicking on 'searchButton'", () => {
    render(<SearchBar songs={songs} albums={albums} />)
    fireEvent.click(screen.getByTestId('searchButton'))
    expect(screen.getByText('Músicas')).toBeInTheDocument()
    expect(screen.getByText('Álbuns')).toBeInTheDocument()
    expect(screen.getByText('albumName')).toBeInTheDocument()
    expect(screen.getByText('songName')).toBeInTheDocument()
  })

  test('the songs and albuns should be links to their detailed pages', () => {
    render(<SearchBar songs={songs} albums={albums} />)
    fireEvent.click(screen.getByTestId('searchButton'))
    expect(screen.getByTestId('songLink')).toHaveAttribute('href', '/song/1')
    expect(screen.getAllByTestId('albumLink')[0]).toHaveAttribute(
      'href',
      '/album/1',
    )
    expect(screen.getAllByTestId('albumLink')[1]).toHaveAttribute(
      'href',
      '/album/2',
    )
    expect(screen.getAllByTestId('albumLink')[2]).toHaveAttribute(
      'href',
      '/album/3',
    )
  })

  test('when typing in the searchBar the search state should be updated', () => {
    render(<SearchBar songs={songs} albums={albums} />)
    fireEvent.click(screen.getByTestId('searchButton'))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'songName' },
    })
    expect(screen.getByText('songName')).toBeInTheDocument()
    expect(screen.queryByTestId('albumLink')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('songName')
  })

  test("when there are no songs the text 'Músicas' must not appear", () => {
    render(<SearchBar songs={[]} albums={albums} />)
    fireEvent.click(screen.getByTestId('searchButton'))
    expect(screen.queryByText('Músicas')).not.toBeInTheDocument()
  })

  test("when there are no albums the text 'Álbuns' must not appear", () => {
    render(<SearchBar songs={songs} albums={[]} />)
    fireEvent.click(screen.getByTestId('searchButton'))
    expect(screen.queryByText('Álbuns')).not.toBeInTheDocument()
  })
})
