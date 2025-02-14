import { TAlbum, TSong } from '@/models'
import { get } from '@/services/axios'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { SearchBarComponent } from './SearchBarComponent'
import { SwitchTheme } from './SwitchTheme'

export async function Header() {
  const token = (await getCookie('jwt', { cookies })) || ''
  const albums: TAlbum[] = (await get<TAlbum[]>('album', token)) || []
  const songs: TSong[] = (await get<TSong[]>('song', token)) || []

  return (
    <header
      className={`flex h-[100px] items-center justify-between bg-white px-[4%] dark:bg-headerDark`}
    >
      <Link href="/dashboard" data-testid="logoLink">
        <svg
          data-testid="logo"
          width="96"
          height="50"
          viewBox="0 0 96 50"
          className="fill-black dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.4059 17.3714L38.2254 0.556636C38.3744 0.272602 38.6687 0.0946655 38.9894 0.0946655H48.6756H65.9724L43.0628 45.1837C42.5257 46.2407 41.7754 47.1749 40.8593 47.9275C40.0285 48.61 39.0768 49.1302 38.0538 49.4612L37.6353 49.5966C36.8091 49.8639 35.9423 50 35.0739 50C34.1326 50 33.194 49.8391 32.3069 49.5244C31.258 49.1522 30.2951 48.5719 29.476 47.8183L29.355 47.707C28.6916 47.0967 28.1229 46.3908 27.6677 45.6128L20.2258 32.8923H46.2182L47.0688 31.6636L47.825 30.0568H36.1981C35.7589 30.0568 35.3208 30.0134 34.8901 29.9273C34.0689 29.763 33.2861 29.4456 32.5824 28.9916L31.8668 28.5299C31.1067 28.0396 30.4415 27.416 29.9031 26.6891C29.1957 25.7343 28.7251 24.6252 28.5297 23.453L28.4753 23.1264C28.3948 22.6435 28.3544 22.1487 28.3544 21.6592C28.3544 20.1721 28.7152 18.6883 29.4059 17.3714Z"
            fill="#1F1F20"
            className="fill-black dark:fill-white"
          />
          <path
            d="M12.3054 21.1578L18.809 31.191L31.3279 8.05213C33.1993 4.59322 30.5292 0.42753 26.6049 0.683466L22.5897 0.945325C12.5335 1.49232 6.82744 12.7068 12.3054 21.1578Z"
            fill="#1F1F20"
            className="fill-black dark:fill-white"
          />
          <path
            d="M59.841 17.2767L68.6384 0.504126C68.7987 0.198444 69.1262 0.0181097 69.4702 0.0460056L79.3943 0.850659C87.1454 1.43312 91.7852 9.74084 88.2157 16.6458L73.5022 45.1081C72.9621 46.1529 72.2148 47.0768 71.3059 47.8233C70.4675 48.5121 69.507 49.0371 68.4746 49.3711L68.0704 49.5019C67.2442 49.7692 66.3773 49.9053 65.5089 49.9053C64.5676 49.9053 63.629 49.7445 62.7419 49.4297C61.693 49.0575 60.7301 48.4772 59.9111 47.7237L59.7901 47.6123C59.1267 47.002 58.558 46.2962 58.1028 45.5181L50.6609 32.7976H76.6532L77.5039 31.5689L78.26 29.9621H66.6332C66.194 29.9621 65.7558 29.9187 65.3252 29.8326C64.504 29.6684 63.7211 29.3509 63.0174 28.897L62.3018 28.4353C61.5418 27.9449 60.8765 27.3213 60.3381 26.5945C59.6308 25.6396 59.1601 24.5305 58.9648 23.3584L58.9103 23.0317C58.8299 22.5488 58.7894 22.054 58.7894 21.5645C58.7894 20.0774 59.1503 18.5936 59.841 17.2767Z"
            fill="#1F1F20"
            className="fill-black dark:fill-white"
          />
        </svg>
      </Link>
      <div className="flex w-full justify-end">
        <ul className="flex items-center gap-16 text-xl max-md:hidden">
          <li>
            <Link href="/songs">
              <span>Músicas</span>
            </Link>
          </li>
          <li>
            <Link href="/albums">
              <span>Álbuns</span>
            </Link>
          </li>
          <li>
            <SearchBarComponent albums={albums} songs={songs} />
          </li>
        </ul>
        <div className="flex items-center gap-6">
          <SwitchTheme />
          <Link href="/user">
            <PersonRoundedIcon
              sx={{ width: 60, height: 60 }}
              className="dark:text-white max-md:hidden"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
