'use server';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { NewPasswordSchema, NewPasswordSchemaType } from '@/schemas';
import bcrypt from 'bcryptjs';

export async function newPassword(
  values: NewPasswordSchemaType,
  token: string
) {
  const validatedValues = NewPasswordSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  const { password, confirmPassword } = validatedValues.data;

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  if (!token) {
    return { error: 'Missing token' };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token 222' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
    return { error: 'Token expired' };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
    return { error: 'User not found' };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: 'Password updated!' };
}
