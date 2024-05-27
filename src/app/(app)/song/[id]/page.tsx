import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Board from '../components/Board';

interface IdProps {
  params: {
      id: string
  }
}

export default async function Song({ params }: IdProps) {
  // const response = await api.get(`/songs/${params.id}`);
  // const song: songProps = response.data;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-semibold">Nome da música</h2>
        <button className='bg-black text-white p-2 rounded-md'><span>Baixar PDF</span> <PictureAsPdfIcon className='dark:text-black'/></button> 
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-10">
          <h3 className="text-lg">Tom: Cm7</h3>
          <p>Cifra</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p>Modo</p>
          <button className='dark:bg-transparent'><DeleteIcon className='dark:text-white'/></button>
        </div>
      </div>

      <div className="mt-16">
        <Board />
      </div>
    </section>
  );
}