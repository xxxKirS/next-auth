import React from 'react';
import CardWrapper from './CardWrapper';

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='Error'
      headerDescription='Something went wrong'
      backButtonLabel='Go back'
      backButtonPath='/login'
    >
      <p className='text-center text-destructive/65'>
        Something went wrong, please try again.
      </p>
    </CardWrapper>
  );
}
