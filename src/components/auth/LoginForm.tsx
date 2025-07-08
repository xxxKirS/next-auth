import React from 'react';
import CardWrapper from './CardWrapper';

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel='Login'
      headerDescription='Welcome back!'
      backButtonLabel={`Don't have an account?`}
      backButtonPath='/register'
    ></CardWrapper>
  );
}
