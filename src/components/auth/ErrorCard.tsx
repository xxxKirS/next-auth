'use client';

import React from 'react';
import CardWrapper from './CardWrapper';
import { useSearchParams } from 'next/navigation';
import FormError from '../form-error';

export default function ErrorCard() {
  const searchParams = useSearchParams();
  const error =
    searchParams.get('error') === 'AccessDenied'
      ? 'Email already in use with another provider'
      : 'Something went wrong';

  return (
    <CardWrapper
      headerLabel='Error'
      headerDescription='Something went wrong'
      backButtonLabel='Go back'
      backButtonPath='/login'
    >
      <FormError message={error} />
    </CardWrapper>
  );
}
