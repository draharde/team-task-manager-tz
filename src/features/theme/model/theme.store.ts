'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import { THEME_ATTRIBUTE, type Theme } from '../config/theme.constants'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const getInitialTheme = (): Theme =>
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'dark'
    ? 'dark'
    : 'light'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
        set({ theme })
      },
    }),
    {
      name: STORAGE_KEYS.theme,
      partialize: ({ theme }) => ({ theme }),
    },
  ),
)
