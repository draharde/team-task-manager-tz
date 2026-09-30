import Image from 'next/image';
import { cn } from '@/shared/lib';
import styles from './user-avatar.module.css';

const AVATAR_SIZE_PX = {
  small: 32,
  large: 96,
};

const INITIALS_LENGTH = 2;

type UserAvatarSize = keyof typeof AVATAR_SIZE_PX;

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: UserAvatarSize;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, INITIALS_LENGTH)
    .map((word) => word[0].toUpperCase())
    .join('');

export function UserAvatar({ name, avatarUrl, size = 'small' }: UserAvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={AVATAR_SIZE_PX[size]}
        height={AVATAR_SIZE_PX[size]}
        className={cn(styles.avatar, styles[size])}
        unoptimized
      />
    );
  }

  return (
    <span className={cn(styles.avatar, styles.initials, styles[size])}>{getInitials(name)}</span>
  );
}
