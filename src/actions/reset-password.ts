'use server';

import { getPasswordResetTokensByEmail } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendResetPasswordEmail } from '@/lib/mail';
import { createPasswordResetToken } from '@/lib/tokens';
import { ResetSchema, ResetSchemaType } from '@/schemas';

export async function resetPassword(values: ResetSchemaType) {
  const validatedValues = ResetSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }
  const { email } = validatedValues.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'Email not found' };
  }

  const existingTokens = await getPasswordResetTokensByEmail(email);

  if (
    existingTokens &&
    existingTokens.some((token) => token.expires > new Date())
  ) {
    return { error: 'Email already sent' };
  }

  const passwordResetToken = await createPasswordResetToken(email);

  if (!passwordResetToken) {
    return { error: 'Error creating verification token' };
  }

  existingTokens?.forEach(async (token) => {
    await db.passwordResetToken.delete({ where: { id: token.id } });
  });

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
}
