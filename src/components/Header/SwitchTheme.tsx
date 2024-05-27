'use client';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from 'react';
export function SwitchTheme(){

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
  return(
    <div>
      <WbSunnyIcon onClick={handleThemeSwitch}  className='cursor-pointer text-white' />
      <DarkModeIcon onClick={handleThemeSwitch} className='cursor-pointer dark:hidden' />
      <PersonIcon sx={{ width: 125, height: 95 }} className='dark:text-white'/>
    </div>
  );
}