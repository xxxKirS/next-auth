'use client';

import { LoginSchema, LoginSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
