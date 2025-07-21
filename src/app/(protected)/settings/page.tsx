import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

export default async function SettingsPage() {
  return (
    <div className='bg-background rounded-md px-8 py-12'>
      <h1>Settings</h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </div>
  );
}
