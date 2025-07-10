'use client';

import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput<T extends FieldValues>({
  name,
  label,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className='flex w-full justify-between flex-col sm:flex-row'>
            <FormLabel className='text-md font-medium text-gray-700'>
              {label}
            </FormLabel>
            <FormMessage className='text-sm font-light' />
          </div>
          <FormControl>
            <Input
              {...props}
              {...field}
              className='block w-full rounded-md shadow-sm sm:text-sm ring-offset-0 focus:ring-0'
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
