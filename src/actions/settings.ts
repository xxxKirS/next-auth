'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { serverCurrentUser } from '@/lib/server-current-user';
import { createVerificationToken } from '@/lib/tokens';
import { SettingsSchema, SettingsSchemaType } from '@/schemas';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function settings(values: SettingsSchemaType) {
  const user = await serverCurrentUser();

  if (!user) {
    return { errors: { error: 'User not found' } };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { errors: { error: 'Unauthorized' } };
  }

  if (user.isOAuth) {
    // values.password = undefined;
    // values.newPassword = undefined;
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  const validatedValues = SettingsSchema.safeParse(values);

  if (!validatedValues.success) {
    return { errors: { error: 'Invalid credentials' } };
  }

  const existingUserByName = await db.user.findUnique({
    where: { name: validatedValues.data.name },
  });

  if (existingUserByName && existingUserByName.id !== user.id) {
    return { errors: { name: 'Name already taken' } };
  }

  // Change Email ---------------
  if (validatedValues.data.email && validatedValues.data.email !== user.email) {
    const existingUser = await getUserByEmail(validatedValues.data.email);

    if (existingUser && existingUser.id !== user.id) {
      return { errors: { email: 'Email already taken' } };
    }

    const verificationToken = await createVerificationToken(
      validatedValues.data.email
    );

    if (!verificationToken) {
      return { errors: { error: 'Error creating verification token' } };
    }

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Conformation email sent' };
  }

  const { newPassword, ...newValues } = values;

  if (values.password && newPassword) {
    if (dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );
      console.log(passwordsMatch);

      if (!passwordsMatch) {
        return { errors: { password: 'Incorrect password' } };
      }
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    newValues.password = hashPassword;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...newValues,
    },
  });

  revalidatePath('/settings');

  return { success: 'Settings updated' };
}
