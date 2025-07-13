import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function SettingsPage() {
  return (
    <div>
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
