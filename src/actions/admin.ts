'use server';

import { currentRole } from '@/lib/server-current-role';
import { UserRole } from '@prisma/client';

export async function isAdmin() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) return { success: 'Allowed' };

  return { error: 'Forbidden' };
}
