import { auth } from '@/auth';
import UserInfo from '@/components/user-info';
import React from 'react';

export default async function ServerPage() {
  const session = await auth();

  return <UserInfo user={session!.user} label='Server component' />;
}
