'use client';

import Link from 'next/link';
import { UserAvatar, useUserSessionStore } from '@/entities/user';
import { LogoutButton } from '@/features/auth';
import { ROUTES } from '@/shared/config';
import styles from './header.module.css';

export function Header() {
  const user = useUserSessionStore((state) => state.user);

  return (
    <header className={styles.header}>
      <Link href={ROUTES.boards} className={styles.logo}>
        Team Task Manager
      </Link>

      <div className={styles.actions}>
        {user && (
          <Link href={ROUTES.profile} className={styles.profile} aria-label="Профиль">
            <UserAvatar name={user.name} avatarUrl={user.avatarUrl} />
            <span className={styles.userName}>{user.name}</span>
          </Link>
        )}

        <LogoutButton />
      </div>
    </header>
  );
}
