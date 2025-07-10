'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '@/actions/register';
import { PAGES } from '@/config/pages.config';

import CardWrapper from './CardWrapper';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import FormInput from './FormInput';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

export default function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  function onSubmit(data: RegisterSchemaType) {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(data).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel='Sign up'
      headerDescription='Create your account!'
      backButtonLabel='Login'
      backButtonDescription={`Have an account?`}
      backButtonPath={PAGES.LOGIN}
      showSocial={true}
    >
      <Form {...form}>
        <form
          action=''
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name='name'
            label='Name'
            autoComplete='name'
            disabled={isPending}
            placeholder='Enter your name'
          />
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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
