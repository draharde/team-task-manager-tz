import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppProviders } from './_providers';
import '@/shared/styles/variables.css';
import '@/shared/styles/reset.css';
import '@/shared/styles/globals.css';
import '@/shared/styles/utilities.css';
import { THEME_INIT_SCRIPT } from '@/features/theme';

export const metadata: Metadata = {
  title: 'TTM',
};

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
  );
}
