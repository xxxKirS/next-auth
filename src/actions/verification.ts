'use server';

import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { db } from '@/lib/db';

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: 'Invalid token' };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
    return { error: 'Token expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: 'User not found' };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date() },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: 'Email verified!' };
}
