'use client';

import UserInfo from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function ClientPage() {
  const user = useCurrentUser();
  const { update } = useSession();

  if (!user) {
    update();
    return null;
  }

  return <UserInfo user={user} label='Client component' />;
}
