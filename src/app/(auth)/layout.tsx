import type { ReactNode } from 'react';
import { GuestRoute } from '@/features/auth';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <GuestRoute>{children}</GuestRoute>;
}
