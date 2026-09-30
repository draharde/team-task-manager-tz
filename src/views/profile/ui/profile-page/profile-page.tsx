'use client';

import { useUserSessionStore } from '@/entities/user';
import { ProfileForm } from '@/features/profile';
import { cn } from '@/shared/lib';
import styles from './profile-page.module.css';

export function ProfilePage() {
  const user = useUserSessionStore((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Профиль</h1>

      {user && (
        <div className={cn('container', styles.card)}>
          <ProfileForm user={user} />
        </div>
      )}
    </div>
  );
}
