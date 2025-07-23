'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useCurrentUser() {
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user) {
      session.update();
    }
  }, [session]);

  if (!session?.data?.user) return null;

  return session.data?.user;
}
