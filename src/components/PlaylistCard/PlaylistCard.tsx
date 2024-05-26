import logo from '@/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export function PlaylistCard() {
  return (
    <div className="flex w-64 flex-col">
      <Link href="/playlist/1">
        <Image
          src={logo}
          alt="example"
          className="h-52 w-64 flex-col rounded-xl bg-gray-500 dark:bg-gradient-to-b dark:from-zinc-700/70 dark:to-zinc-700/20"
        />
      </Link>
      <p className="text-xl font-semibold ">Musicas</p>
      <p className="truncate text-sm">
        <span>Boate Azul</span>
        <span>, Vida Bandidaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
      </p>
    </div>
  );
}
