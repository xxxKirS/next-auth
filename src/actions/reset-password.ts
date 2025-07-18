'use server';

import { getUserByEmail } from '@/data/user';
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

  const verificationToken = await createPasswordResetToken(email);

  if (!verificationToken) {
    return { error: 'Error creating verification token' };
  }

  await sendResetPasswordEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: 'Reset email sent!' };
}
