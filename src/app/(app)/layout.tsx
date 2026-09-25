import type { ReactNode } from 'react';
import { ProtectedRoute } from '@/features/auth';
import { Header } from '@/widgets/header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      {children}
    </ProtectedRoute>
  );
}
