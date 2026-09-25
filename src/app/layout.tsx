import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppProviders } from './_providers';
import '@/shared/styles/variables.css';
import '@/shared/styles/reset.css';
import '@/shared/styles/globals.css';
import '@/shared/styles/utilities.css';

export const metadata: Metadata = {
  title: 'Team Task Manager',
  description: 'tz',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
