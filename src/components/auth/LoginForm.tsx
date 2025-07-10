'use client';

import React, { useState, useTransition } from 'react';
import CardWrapper from './CardWrapper';
import { useFormContext } from 'react-hook-form';
import { LoginSchemaType } from '@/schemas';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import FormInput from './FormInput';
import { login } from '@/actions/login';

export default function LoginForm() {
  const form = useFormContext<LoginSchemaType>();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  function onSubmit(data: LoginSchemaType) {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(data).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel='Login'
      headerDescription='Welcome back!'
      backButtonLabel='Sign up'
      backButtonDescription={`Don't have an account?`}
      backButtonPath='/register'
      showSocial={true}
    >
      <Form {...form}>
        <form
          action=''
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name='email'
            label='Email'
            autoComplete='email'
            disabled={isPending}
            placeholder='Enter your email'
          />
          <FormInput
            name='password'
            label='Password'
            autoComplete='password'
            disabled={isPending}
            placeholder='Enter your password'
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type='submit' className='w-full' disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
