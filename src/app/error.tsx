'use client';

import { Button, CenteredCard } from '@/shared/ui';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <CenteredCard>
      <h1>Что-то пошло не так</h1>
      <Button onClick={reset}>Попробовать снова</Button>
    </CenteredCard>
  );
}
