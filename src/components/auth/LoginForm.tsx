'use client';

import React from 'react';
import CardWrapper from './CardWrapper';
import { useFormContext } from 'react-hook-form';
import { LoginSchemaType } from '@/schemas';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import FormInput from './FormInput';

export default function LoginForm() {
  const form = useFormContext<LoginSchemaType>();

  function onSubmit(data: LoginSchemaType) {
    console.log(data);
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
            placeholder='Enter your email'
          />
          <FormInput
            name='password'
            label='Password'
            autoComplete='password'
            placeholder='Enter your password'
          />

          <FormError message='Something went wrong' />
          <FormSuccess message='Something went wrong' />

          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
