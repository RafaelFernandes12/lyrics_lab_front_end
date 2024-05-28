import DeleteIcon from '@mui/icons-material/Delete'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import Board from '../components/Board'

interface IdProps {
  params: {
    id: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Song({ params }: IdProps) {
  // const response = await api.get(`/songs/${params.id}`);
  // const song: songProps = response.data;

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Nome da música</h1>
        <button className="rounded-md bg-black p-2 text-white">
          <span className="max-sm:hidden">Baixar PDF</span>{' '}
          <PictureAsPdfIcon className="dark:text-black" />
        </button>
      </div>
      <div className="flex items-center justify-between max-sm:flex-col">
        <div className="flex items-center justify-between gap-10 max-sm:flex-col max-sm:gap-3">
          <h3 className="text-lg">Tom: Cm7</h3>
          <p>Cifra</p>
        </div>
        <div className="flex items-center justify-between gap-10 max-sm:flex-col max-sm:gap-3">
          <p>Modo</p>
          <button className="dark:bg-transparent">
            <DeleteIcon className="dark:text-white" />
          </button>
        </div>
      </div>

      <div className="mt-16">
        <Board />
      </div>
    </section>
  )
}
