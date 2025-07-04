'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    // Update document class and save preference
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <header 
      className="fixed top-0 left-0 right-0 w-full z-[99999] p-6 pointer-events-none"
      style={{
        background: 'transparent',
        border: 'none'
      }}
    >
      <div className="flex justify-center pointer-events-none">
        <button
          onClick={toggleTheme}
          className="group relative p-3 rounded-full bg-transparent border-0 pointer-events-auto transition-all duration-300"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            pointerEvents: 'auto'
          }}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {/* Toggle Icon */}
          <div className="relative w-6 h-6">
            {/* Sun Icon (Light Mode) */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <svg
                className="w-6 h-6 text-mocha-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            
            {/* Moon Icon (Dark Mode) */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
              }`}
            >
              <svg
                className="w-6 h-6 text-mocha-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
          </div>
          

        </button>
      </div>
    </header>
  )
} 