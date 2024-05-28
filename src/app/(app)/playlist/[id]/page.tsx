import logo from '@/assets/logo.svg'
import CreatedAt from '@/components/SongCard/CreatedAt'
import SongCard from '@/components/SongCard/SongCard'
import { Tom } from '@/components/SongCard/Tom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Image from 'next/image'

export default function Playlist() {
  return (
    <>
      <section className="flex w-full items-center gap-7 max-sm:flex-col max-sm:text-center">
        <Image
          src={logo}
          alt="example"
          className="h-72 w-80 rounded-xl bg-gray-500 max-sm:h-52 max-sm:w-60"
        />
        <div className="w-full max-sm:flex max-sm:flex-col max-sm:items-center">
          <p className="flex items-center gap-4 text-center">
            <h1>Musicas</h1>
            <EditIcon className="h-5 w-5" />
            <DeleteIcon className="h-5 w-5" />
          </p>
          <span>15 músicas</span>
          <p className="mt-6 w-10/12">A descrição playlist vai estar aqui</p>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <ul className="mx-2 flex font-semibold max-sm:justify-between">
          <li className="w-1/2 max-sm:w-fit">
            <span>Titulo</span>
          </li>
          <div className="mr-10 flex w-1/2 justify-between max-sm:w-fit">
            <li className="w-full">
              <span>Tom</span>
            </li>
            <li className="-mr-5 flex text-center max-sm:hidden">
              <span>Adicionado</span>
              <ArrowDropDownIcon className="dark:text-white" />
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
  )
}
