'use client'

import { MenuOutlined, MoonFilled, SunFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'

export function SwitchTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    setTheme(savedTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.classList.toggle('dark', theme === 'dark')

    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  if (!mounted) return null

  return (
    <div>
      {theme === 'dark' ? (
        <SunFilled
          className="flex cursor-pointer justify-center max-md:hidden"
          style={{ width: 20, height: 20, fontSize: 20, color: 'white' }}
          onClick={handleThemeSwitch}
          data-testid="theme-toggle"
        />
      ) : (
        <MoonFilled
          className="flex cursor-pointer justify-center max-md:hidden"
          style={{ width: 20, height: 20, fontSize: 20, color: 'black' }}
          onClick={handleThemeSwitch}
          data-testid="theme-toggle"
        />
      )}

      <button className="dark:bg-transparent dark:text-white md:hidden">
        <MenuOutlined />
      </button>
    </div>
  )
}
