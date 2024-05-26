import logo from '@/assets/logo.svg';
import CreatedAt from '@/components/SongCard/CreatedAt';
import SongCard from '@/components/SongCard/SongCard';
import { Tom } from '@/components/SongCard/Tom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Playlist(){
  return(
    <>
      <section>
        <div className="flex w-full items-center gap-7">
          <Image
            src={logo}
            alt="example"
            className="h-72 w-80 rounded-xl bg-gray-500"
          />
          <div className='w-full'>
            <p className='flex items-center gap-4 text-center'>
              <span className="text-4xl font-semibold">Musicas</span>
              <EditIcon className="w-5 h-5"/>
              <DeleteIcon className="w-5 h-5"/>
            </p>
            <span>15 músicas</span>
            <p className='mt-6 w-10/12'>A descrição playlist vai estar aqui</p>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <ul className="mx-2 flex items-center justify-between font-semibold">
          <li className="w-1/2"><span>Titulo</span></li>
          <div className="mr-10 flex w-1/2 justify-between">
            <li className="w-full"><span>Tom</span></li>
            <li className="-mr-5 flex text-center">
              <span>Adicionado</span>
              <ArrowDropDownIcon className='dark:text-white'/>
            </li>
          </div>
        </ul>
        <SongCard>
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Tom />
          <CreatedAt />
        </SongCard>
        <SongCard>
          <Tom />
          <CreatedAt />
        </SongCard>
      </section>
    </>
  );
}