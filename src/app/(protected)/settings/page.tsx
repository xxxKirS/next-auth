import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div className='flex flex-col'>
      <h1>Settings</h1>
      <p>{JSON.stringify(session, null, 2)}</p>
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
