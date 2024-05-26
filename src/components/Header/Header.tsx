import logo from '@/assets/logo.svg';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>
      <ul className="flex items-center gap-16 text-2xl font-semibold">
        <li>
          <Link href="/songs">Músicas</Link>
        </li>
        <li>
          <Link href="/playlists">Playlists</Link>
        </li>
      </ul>
      <PersonIcon sx={{ width: 125, height: 95 }} />
    </header>
  );
}
