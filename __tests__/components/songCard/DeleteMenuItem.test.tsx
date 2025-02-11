// import { DeleteMenuItem } from '@/components/songCard/DeleteMenuItem'
// import { clientDeleteSong } from '@/operations/songs/client-side/delete'
// import { fireEvent, render, screen } from '@testing-library/react'
// import { useRouter } from 'next/navigation'

// jest.mock('@/operations/songs/client-side/delete')
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }))

// describe('DeleteMenuItem Component', () => {
//   const mockRouter = { refresh: jest.fn() }
//   const mockId = 1

//   beforeEach(() => {
//     jest.clearAllMocks()
//     ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
//   })
//   test('it should render the header', () => {
//     render(<DeleteMenuItem id={mockId} />)
//     expect(screen.getByText('Excluir')).toBeInTheDocument()
//   })
//   test('opens the confirmation dialog when delete is clicked', () => {
//     render(<DeleteMenuItem id={mockId} />)

//     const deleteButton = screen.getByText('Excluir')
//     fireEvent.click(deleteButton)
//     expect(screen.getByText('Excluir Música')).toBeInTheDocument()

//     expect(screen.getByText('Confirmar')).toBeInTheDocument()
//     expect(screen.getByText('Cancelar')).toBeInTheDocument()
//     expect(
//       screen.getByText(
//         'Tem certeza que deseja excluir a música? Esta ação não pode ser desfeita',
//       ),
//     ).toBeInTheDocument()
//   })
//   test('calls clientDeleteSong with the correct id and refreshes the router', async () => {
//     ;(clientDeleteSong as jest.Mock).mockResolvedValueOnce(undefined)

//     render(<DeleteMenuItem id={mockId} />)

//     const deleteButton = screen.getByText('Excluir')
//     fireEvent.click(deleteButton)

//     fireEvent.click(screen.getByText('Confirmar'))

//     expect(clientDeleteSong).toHaveBeenCalledWith(mockId)
//     expect(clientDeleteSong).toHaveBeenCalled()

//     // Wait for the promise to resolve
//     await screen.findByText('Excluir Música')

//     expect(mockRouter.refresh).toHaveBeenCalled()
//   })
//   test('does not call clientDeleteSong if dialog action is canceled', () => {
//     render(<DeleteMenuItem id={mockId} />)

//     fireEvent.click(screen.getByText('Excluir'))

//     const cancelButton = screen.getByText('Cancelar')
//     fireEvent.click(cancelButton)

//     expect(clientDeleteSong).not.toHaveBeenCalled()
//     expect(mockRouter.refresh).not.toHaveBeenCalled()
//     expect(cancelButton).not.toBeInTheDocument()
//   })
// })
