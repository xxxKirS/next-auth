'use client';

import { PAGES } from '@/config/pages.config';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPassword } from '@/actions/new-password';
import { NewPasswordSchema, type NewPasswordSchemaType } from '@/schemas';

import CardWrapper from './CardWrapper';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import FormInput from './FormInput';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const token = searchParams.get('token');

  function onSubmit(data: NewPasswordSchemaType) {
    setError('');
    setSuccess('');

    if (!token) {
      setError('Invalid token 321');
      return;
    }

    startTransition(async () => {
      await newPassword(data, token)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);

          if (data?.success) form.reset();
        })
        .catch(() => setError('Something went wrong'));
    });
  }

  return (
    <CardWrapper
      headerLabel='Reset Password'
      headerDescription='Enter your new password'
      backButtonPath={PAGES.LOGIN}
      backButtonLabel='Go back'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <FormInput
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            disabled={isPending}
          />
          <FormInput
            name='confirmPassword'
            label='Confirm password'
            placeholder='Confirm password'
            type='password'
            disabled={isPending}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type='submit' disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
