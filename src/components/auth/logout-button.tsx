'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  async function onClick() {
    await signOut();
  }
  return (
    <Button
      onClick={onClick}
      asChild
      className='w-full justify-start'
      variant='ghost'
    >
      {children}
    </Button>
  );
}
