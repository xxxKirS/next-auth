'use client';

import React, { useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
import Link from 'next/link';
import CodeInput from './CodeInput';

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
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with another provider'
      : '';

  function onSubmit(data: LoginSchemaType) {
    router.push(pathname);
    setError('');
    setSuccess('');

    startTransition(() => {
      login(data)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            if (
              data.error !== 'Invalid 2FA code' &&
              data.error !== '2FA token expired'
            ) {
              form.reset();
              setShowTwoFactor(false);
            }
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('Something went wrong'));
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
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          {!showTwoFactor && (
            <>
              <FormInput
                name='email'
                label='Email'
                autoComplete='email'
                disabled={isPending}
                placeholder='Enter your email'
              />
              <div className='space-y-1'>
                <FormInput
                  name='password'
                  label='Password'
                  autoComplete='password'
                  type='password'
                  disabled={isPending}
                  placeholder='Enter your password'
                />
                <Button
                  size='sm'
                  variant='link'
                  className='justify-end'
                  asChild
                >
                  <Link href={PAGES.FORGOT_PASSWORD}>Forgot password?</Link>
                </Button>
              </div>
            </>
          )}

          {showTwoFactor && <CodeInput name='code' label='Two Factor Code' />}

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button type='submit' className='w-full' disabled={isPending}>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
