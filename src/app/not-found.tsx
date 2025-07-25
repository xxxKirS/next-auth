import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className='flex-1 flex flex-col gap-4 items-center justify-center text-center px-4 text-foreground'>
      <h1 className='text-7xl font-bold'>404</h1>
      <p className='text-primary'>
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link href={PAGES.HOME} className='text-sm hover:underline'>
        &larr; Back to home
      </Link>
    </div>
  );
}
