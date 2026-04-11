"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LuMoon, LuSun } from 'react-icons/lu'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  return (
    <Button
      type='button'
      size='icon'
      variant='outline'
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <LuSun /> : <LuMoon />}
    </Button>
  )
}

export default ThemeSwitch
