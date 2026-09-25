import Link from 'next/link';
import { ROUTES } from '@/shared/config';
import { CenteredCard } from '@/shared/ui';

export default function NotFound() {
  return (
    <CenteredCard>
      <h1>Страница не найдена</h1>
      <Link href={ROUTES.boards}>Перейти к доскам</Link>
    </CenteredCard>
  );
}
