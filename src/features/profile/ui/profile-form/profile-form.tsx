'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState, type ChangeEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { UserAvatar, type User } from '@/entities/user';
import { Button, FormItem, Input } from '@/shared/ui';
import { useProfileUpdate } from '../../api/profile-update.hook';
import { AVATAR_ACCEPTED_TYPES, AVATAR_MAX_SIZE_KB } from '../../config/profile.constants';
import { readFileAsDataUrl, toUpdateUserDto, validateAvatarFile } from '../../lib/profile.lib';
import { profileSchema, type ProfileFormValues } from '../../model/profile.schema';
import styles from './profile-form.module.css';

export function ProfileForm({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, avatarUrl: user.avatarUrl ?? '' },
  });
  const { mutate: updateProfile, isPending, isSuccess, error } = useProfileUpdate();
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputId = useId();

  const avatarUrl = useWatch({ control, name: 'avatarUrl' });
  const name = useWatch({ control, name: 'name' });

  const setAvatar = (value: string) => setValue('avatarUrl', value, { shouldDirty: true });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const validationError = validateAvatarFile(file);
    setAvatarError(validationError);
    if (validationError) return;

    try {
      setAvatar(await readFileAsDataUrl(file));
    } catch {
      setAvatarError('Не удалось прочитать файл');
    }
  };

  const onSubmit = (values: ProfileFormValues) =>
    updateProfile(toUpdateUserDto(values), {
      onSuccess: (updatedUser) =>
        reset({ name: updatedUser.name, avatarUrl: updatedUser.avatarUrl ?? '' }),
    });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.avatarRow}>
        <UserAvatar name={name || user.name} avatarUrl={avatarUrl} size="large" />

        <div className={styles.avatarActions}>
          <label htmlFor={fileInputId} className={styles.upload}>
            Загрузить фото
          </label>
          <input
            id={fileInputId}
            type="file"
            accept={AVATAR_ACCEPTED_TYPES.join(',')}
            className={styles.fileInput}
            onChange={handleFileChange}
          />
          {avatarUrl && (
            <Button variant="secondary" onClick={() => setAvatar('')}>
              Удалить фото
            </Button>
          )}
          <p className={styles.hint}>PNG, JPEG или WebP, до {AVATAR_MAX_SIZE_KB} КБ</p>
        </div>
      </div>

      <p>{avatarError}</p>

      <FormItem label="Email">
        {(field) => <Input value={user.email} disabled {...field} />}
      </FormItem>

      <FormItem label="Имя" error={errors.name?.message}>
        {(field) => <Input autoComplete="name" {...field} {...register('name')} />}
      </FormItem>

      <p>{error?.message}</p>

      <div className={styles.actions}>
        <Button type="submit" disabled={isPending || !isDirty}>
          {isPending ? 'Сохраняем…' : 'Сохранить'}
        </Button>
        {isSuccess && !isDirty && (
          <p className={styles.saved} role="status">
            Сохранено
          </p>
        )}
      </div>
    </form>
  );
}
