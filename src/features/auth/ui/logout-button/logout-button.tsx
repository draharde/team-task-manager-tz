'use client';

import { Button } from '@/shared/ui';
import { useAuthLogout } from '../../model/auth-logout.hook';

export function LogoutButton() {
  const logout = useAuthLogout();

  return (
    <Button variant="secondary" onClick={logout}>
      Выйти
    </Button>
  );
}
