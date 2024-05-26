import logo from '@/assets/logo.svg';
import Image from 'next/image';
export function PlaylistCard() {
  return (
    <div className="flex max-w-64 flex-col">
      <Image
        src={logo}
        alt="example"
        className="h-52 w-64 flex-col rounded-xl bg-gray-500"
      />
      <p className="text-xl font-semibold ">Musicas</p>
      <p className="truncate text-sm">
        <span>Boate Azul</span>
        <span>, Vida Bandidaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
      </p>
    </div>
  );
}
