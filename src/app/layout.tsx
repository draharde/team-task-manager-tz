import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { THEME_INIT_SCRIPT } from '@/features/theme'
import { AppProviders } from './_providers'
import '@/shared/styles/globals.css'

export const metadata: Metadata = {
  title: 'TTM',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
