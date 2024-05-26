import { Album } from '@/components/SongCard/Album';
import CreatedAt from '@/components/SongCard/CreatedAt';
import SongCard from '@/components/SongCard/SongCard';
import { Tom } from '@/components/SongCard/Tom';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function Songs() {
  return (
    <>
      <section className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Músicas</h1>
        <button className="flex items-center gap-2 rounded-xl bg-darkBlue p-3 text-white ">
          <AddIcon className='dark:text-black'/>
          <span>Adicionar música</span>
        </button>
      </section>

      <section className="flex flex-col gap-4">
        <ul className="mx-2 flex items-center justify-between font-semibold">
          <li className="w-1/2"><span>Titulo</span></li>
          <div className="mr-10 flex w-1/2 justify-between">
            <li className="w-full"><span>Álbum</span></li>
            <li className="w-full"><span>Tom</span></li>
            <li className="-mr-5 flex text-center">
              <span>Adicionado</span>
              <ArrowDropDownIcon className='dark:text-white'/>
            </li>
          </div>
        </ul>
        <SongCard>
          <Album />
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Album />
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Album />
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Album />
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Album />
          <Tom />
          <CreatedAt />
        </SongCard>
      </section>
    </>
  );
}
