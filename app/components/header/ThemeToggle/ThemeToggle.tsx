'use client'
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/20/solid'
import './ThemeToggle.css'
import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('portfolio-theme') as Theme | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.style.setProperty(
      'color-scheme',
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme
    )

    const buttons = document.querySelectorAll('.theme-toggle-btn')
    buttons.forEach((btn) => {
      if (btn.id === `${theme}-theme`) {
        btn.classList.add('active')
      } else {
        btn.classList.remove('active')
      }
    })
  }, [theme])

  return (
    <div
      className="theme-toggle-container"
      tabIndex={0}
      onKeyDown={(e) => {
        const themes: Theme[] = ['light', 'dark', 'system']
        const currentIndex = themes.indexOf(theme)

        if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
          setTheme(themes[(currentIndex + 1) % themes.length])
        }
        if (e.key === 'ArrowLeft') {
          setTheme(themes[(currentIndex - 1 + themes.length) % themes.length])
        }
      }}
    >
      <button
        className="theme-toggle-btn"
        id="light-theme"
        tabIndex={-1}
        onClick={() => setTheme('light')}
      >
        <SunIcon className="icon-md" />
      </button>
      <button
        className="theme-toggle-btn"
        id="dark-theme"
        tabIndex={-1}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon className="icon-md" />
      </button>
      <button
        className="theme-toggle-btn"
        id="system-theme"
        tabIndex={-1}
        onClick={() => setTheme('system')}
      >
        <ComputerDesktopIcon className="icon-md" />
      </button>
    </div>
  )
}
