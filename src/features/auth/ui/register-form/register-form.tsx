'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ROUTES } from '@/shared/config';
import type { ApiError } from '@/shared/api';
import { Button, FormItem, Input } from '@/shared/ui';
import { useAuthRegister } from '../../api/auth-register.hook';
import { isRegisterField } from '../../lib/auth.lib';
import { registerSchema, type RegisterFormValues } from '../../model/auth.schema';
import styles from './register-form.module.css';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });
  const { mutate: registerUser, isPending, error } = useAuthRegister();

  // TODO: удалить!
  // eslint-disable-next-line no-console
  console.log(error);

  const applyFieldErrors = (apiError: ApiError) => {
    Object.entries(apiError.fieldErrors ?? {}).forEach(([field, message]) => {
      if (isRegisterField(field)) setError(field, { message });
    });
  };

  const onSubmit = (values: RegisterFormValues) =>
    registerUser(values, { onError: applyFieldErrors });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className={styles.title}>Регистрация</h1>

      <FormItem label="Имя" error={errors.name?.message}>
        {(control) => <Input type="text" autoComplete="name" {...control} {...register('name')} />}
      </FormItem>

      <FormItem label="Email" error={errors.email?.message}>
        {(control) => (
          <Input type="email" autoComplete="email" {...control} {...register('email')} />
        )}
      </FormItem>

      <FormItem label="Пароль" error={errors.password?.message}>
        {(control) => (
          <Input
            type="password"
            autoComplete="new-password"
            {...control}
            {...register('password')}
          />
        )}
      </FormItem>

      <FormItem label="Повторите пароль" error={errors.confirmPassword?.message}>
        {(control) => (
          <Input
            type="password"
            autoComplete="new-password"
            {...control}
            {...register('confirmPassword')}
          />
        )}
      </FormItem>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
      </Button>

      <p className={styles.hint}>
        Уже есть аккаунт? <Link href={ROUTES.login}>Войти</Link>
      </p>
    </form>
  );
}
