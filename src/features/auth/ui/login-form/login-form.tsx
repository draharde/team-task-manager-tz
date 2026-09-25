'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ROUTES } from '@/shared/config';
import { Button, FormItem, Input } from '@/shared/ui';
import { useAuthLogin } from '../../api/auth-login.hook';
import { DEMO_ACCOUNT } from '../../config/auth.constants';
import { loginSchema, type LoginFormValues } from '../../model/auth.schema';
import styles from './login-form.module.css';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { mutate: login, isPending, error } = useAuthLogin();

  // TODO: удалить!
  // eslint-disable-next-line no-console
  console.log(error);

  return (
    <form className={styles.form} onSubmit={handleSubmit((values) => login(values))} noValidate>
      <h1 className={styles.title}>Вход</h1>

      <FormItem label="Email" error={errors.email?.message}>
        {(control) => (
          <Input type="email" autoComplete="email" {...control} {...register('email')} />
        )}
      </FormItem>

      <FormItem label="Пароль" error={errors.password?.message}>
        {(control) => (
          <Input
            type="password"
            autoComplete="current-password"
            {...control}
            {...register('password')}
          />
        )}
      </FormItem>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Входим…' : 'Войти'}
      </Button>

      <p className={styles.hint}>
        Демо-аккаунт: {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
      </p>
      <p className={styles.hint}>
        Нет аккаунта? <Link href={ROUTES.register}>Зарегистрироваться</Link>
      </p>
    </form>
  );
}
