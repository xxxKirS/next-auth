'use client';

import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { type OTPInputProps, REGEXP_ONLY_DIGITS } from 'input-otp';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
} & React.InputHTMLAttributes<OTPInputProps>;

export default function CodeInput<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1 items-center'>
          <FormLabel className='text-md font-medium text-gray-700 pl-1'>
            {label}
          </FormLabel>

          <FormControl>
            <InputOTP
              maxLength={6}
              minLength={6}
              type='string'
              {...field}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className='gap-2'>
                <InputOTPSlot
                  index={0}
                  className='first:rounded-none last:rounded-none border'
                />
                <InputOTPSlot
                  index={1}
                  className='first:rounded-none last:rounded-none border'
                />
                <InputOTPSlot
                  index={2}
                  className='first:rounded-none last:rounded-none border'
                />
                <InputOTPSlot
                  index={3}
                  className='first:rounded-none last:rounded-none border'
                />
                <InputOTPSlot
                  index={4}
                  className='first:rounded-none last:rounded-none border'
                />
                <InputOTPSlot
                  index={5}
                  className='first:rounded-none last:rounded-none border'
                />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription>Please enter your 6-digit code</FormDescription>
          <FormMessage className='text-sm font-light' />
        </FormItem>
      )}
    />
  );
}
