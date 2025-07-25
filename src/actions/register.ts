'use server';

import { RegisterSchema, RegisterSchemaType } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';
import { getUserByEmail, getUserByName } from '@/data/user';
import { createVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function register(values: RegisterSchemaType) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password, name } = validatedValues.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const userByEmail = await getUserByEmail(email);
  const userByName = await getUserByName(name);

  const existingUser = userByEmail || userByName;

  if (existingUser) {
    return { error: 'User already exists' };
  }

  await db.user.create({ data: { email, password: hashPassword, name } });

  const verificationToken = await createVerificationToken(email);

  if (!verificationToken) {
    return { error: 'Error creating verification token' };
  }

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
}
