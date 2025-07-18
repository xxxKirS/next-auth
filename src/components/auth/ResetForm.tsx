'use client';

import React, { useState, useTransition } from 'react';
import { PAGES } from '@/config/pages.config';
import { useForm } from 'react-hook-form';
import { ResetSchema, ResetSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/actions/reset-password';

import CardWrapper from './CardWrapper';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import FormInput from './FormInput';
import FormError from '../form-error';
import FormSuccess from '../form-success';

export default function ResetForm() {
  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  function onSubmit(data: ResetSchemaType) {
    setError('');
    setSuccess('');

    startTransition(() => {
      resetPassword(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel='Reset password'
      backButtonLabel='Go back'
      backButtonPath={PAGES.LOGIN}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormInput
            name='email'
            label='Email'
            placeholder='Enter your email'
            type='email'
            disabled={isPending}
          />

          <FormSuccess message={success} />
          <FormError message={error} />

          <Button type='submit' className='w-full' disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
