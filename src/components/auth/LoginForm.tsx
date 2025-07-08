'use client';

import React from 'react';
import CardWrapper from './CardWrapper';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSuccess from '../form-success';

export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
          className='space-y-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='flex w-full justify-between flex-col sm:flex-row'>
                  <FormLabel className='text-md font-medium text-gray-700'>
                    Email
                  </FormLabel>
                  <FormMessage className='text-sm font-light' />
                </div>
                <FormControl>
                  <Input
                    autoComplete='email'
                    placeholder='Enter your email'
                    {...field}
                    className='block w-full rounded-md shadow-sm sm:text-sm ring-offset-0 focus:ring-0'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex w-full justify-between flex-col sm:flex-row'>
                  <FormLabel className='text-md font-medium text-gray-700'>
                    Password
                  </FormLabel>
                  <FormMessage className='text-sm font-light' />
                </div>
                <FormControl>
                  <Input
                    autoComplete='password'
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                    className='block w-full rounded-md shadow-sm sm:text-sm focus:ring-offset-0'
                  />
                </FormControl>
              </FormItem>
            )}
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
