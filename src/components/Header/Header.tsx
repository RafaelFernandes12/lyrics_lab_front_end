'use client';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export function Header() {

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if(theme === 'dark'){
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
    else{
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  },[theme]);


  function handleThemeSwitch(){
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <svg width="125" height="65" viewBox="0 0 125 65" className='fill-black dark:fill-white' xmlns="http://www.w3.org/2000/svg">
          <path d="M38.2276 22.5828L49.6929 0.723609C49.8866 0.354364 50.2691 0.123047 50.6861 0.123047H63.2782H85.764L55.9815 58.7387C55.2833 60.1129 54.308 61.3274 53.1169 62.3058C52.0369 63.1929 50.7997 63.8693 49.4699 64.2995L48.9258 64.4755C47.8517 64.823 46.7248 65 45.5959 65C44.3722 65 43.1521 64.7909 41.9988 64.3816C40.6352 63.8978 39.3835 63.1434 38.3187 62.1638L38.1614 62.0191C37.299 61.2257 36.5597 60.3081 35.9679 59.2966L26.2935 42.76H60.0835L61.1894 41.1626L62.1724 39.0738H47.0574C46.4865 39.0738 45.9169 39.0174 45.357 38.9054C44.2895 38.6919 43.2717 38.2793 42.357 37.6891L41.4267 37.0889C40.4386 36.4514 39.5738 35.6407 38.8739 34.6959C37.9543 33.4545 37.3425 32.0127 37.0885 30.4889L37.0177 30.0643C36.9131 29.4365 36.8605 28.7933 36.8605 28.1569C36.8605 26.2237 37.3296 24.2948 38.2276 22.5828Z" className='fill-black dark:fill-white' />
          <path d="M15.997 27.5051L24.4517 40.5483L42.0179 8.08051C43.8892 4.6216 41.2192 0.455911 37.2948 0.711847L29.3666 1.2289C16.2935 1.93999 8.87566 16.5189 15.997 27.5051Z" className='fill-black dark:fill-white' />
          <path d="M77.7935 22.4597L89.2301 0.655364C89.4385 0.257977 89.8642 0.0235425 90.3115 0.0598071L103.213 1.10586C113.289 1.86305 119.321 12.6631 114.681 21.6395L95.553 58.6405C94.8509 59.9988 93.8794 61.1998 92.6979 62.1703C91.6079 63.0657 90.3593 63.7482 89.0172 64.1825L88.4917 64.3525C87.4176 64.7 86.2907 64.8769 85.1618 64.8769C83.9381 64.8769 82.718 64.6678 81.5647 64.2586C80.2012 63.7747 78.9494 63.0204 77.8846 62.0408L77.7273 61.896C76.8649 61.1026 76.1256 60.185 75.5339 59.1736L65.8594 42.6369H99.6494L100.755 41.0396L101.738 38.9507H86.6233C86.0524 38.9507 85.4828 38.8943 84.9229 38.7824C83.8554 38.5689 82.8377 38.1562 81.9229 37.566L80.9926 36.9659C80.0045 36.3284 79.1397 35.5177 78.4398 34.5728C77.5203 33.3315 76.9084 31.8897 76.6544 30.3659L76.5836 29.9412C76.479 29.3135 76.4264 28.6702 76.4264 28.0338C76.4264 26.1006 76.8956 24.1717 77.7935 22.4597Z" className='fill-black dark:fill-white' />
        </svg>
      </Link>
      <ul className="flex items-center gap-16 text-2xl font-semibold">
        <li>
          <Link href="/songs"><span>Músicas</span></Link>
        </li>
        <li>
          <Link href="/playlists"><span>Playlists</span></Link>
        </li>
      </ul>
      <div>
        <WbSunnyIcon onClick={handleThemeSwitch}  className={`cursor-pointer text-white ${theme === 'light' ? 'hidden' : ''}`} />
        <DarkModeIcon onClick={handleThemeSwitch} className={`cursor-pointer ${theme === 'light' ? '' : 'hidden'}`} />
        <PersonIcon sx={{ width: 125, height: 95 }} className='dark:text-white'/>
      </div>
    </header>
  );
}
