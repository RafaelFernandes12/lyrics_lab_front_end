import { PlaylistCard } from '@/components/PlaylistCard/PlaylistCard';
import AddIcon from '@mui/icons-material/Add';

export default function Playlists() {
  return (
    <>
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Playlists</h1>
        <button className="flex items-center gap-2 rounded-xl bg-black p-3 text-white ">
          <AddIcon />
          <span>Adicionar playlist</span>
        </button>
      </section>
      <section>
        <ul className='grid grid-cols-5 items-center gap-8'>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
          <li><PlaylistCard /></li>
        </ul>
      </section>
    </>
  );
}
