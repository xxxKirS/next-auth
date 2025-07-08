'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex-1 flex flex-col gap-4 items-center justify-center text-center px-4 text-foreground'>
      <h1 className='text-6xl font-bold'>Error</h1>
      <p className='text-xl text-destructive'>{error.message} </p>
      <Button onClick={() => reset()} variant='default' size='lg'>
        Try again
      </Button>
    </div>
  );
}
