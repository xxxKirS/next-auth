'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/actions/login';
import { PAGES } from '@/config/pages.config';

import CardWrapper from './CardWrapper';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import FormInput from './FormInput';

export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
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
      backButtonPath={PAGES.REGISTER}
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
            type='password'
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
