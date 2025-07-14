'use server';

import { RegisterSchema, RegisterSchemaType } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';
import { getUserByEmail } from '@/data/user';

export async function register(values: RegisterSchemaType) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password, name } = validatedValues.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'User already exists' };
  }

  await db.user.create({ data: { email, password: hashPassword, name } });

  //TODO: send verification token email

  return { success: 'User created!' };
}
