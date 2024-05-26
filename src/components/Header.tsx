import logo from '@/assets/logo.svg'
import PersonIcon from '@mui/icons-material/Person'
import Image from 'next/image'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Image src={logo} alt="logo" />
      <ul className="flex items-center gap-16 text-2xl font-semibold">
        <li>
          <a href="/">Músicas</a>
        </li>
        <li>
          <a href="/">Playlists</a>
        </li>
      </ul>
      <PersonIcon sx={{ width: 125, height: 95 }} />
    </header>
  )
}
