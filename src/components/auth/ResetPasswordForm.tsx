'use client';

import { PAGES } from '@/config/pages.config';
import React, { useCallback, useEffect, useState, useTransition } from 'react';
import CardWrapper from './CardWrapper';
import { CircleLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import FormError from '../form-error';
import { newVerification } from '@/actions/verification';
import FormSuccess from '../form-success';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Invalid token');
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => setError('Something went wrong'));
  }, [token, success, error]);

  useEffect(() => {
    startTransition(() => {
      onSubmit();
    });
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel='Verification'
      headerDescription={
        token && isPending
          ? 'Confirming your email...'
          : token && success
            ? 'Email verified!'
            : 'Something went wrong'
      }
      backButtonPath={PAGES.LOGIN}
      backButtonLabel='Go back'
    >
      {isPending && (
        <div className='flex flex-col gap-4 items-center'>
          <CircleLoader />
        </div>
      )}

      {/* {token && !error && (
        
      )} */}

      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  );
}
