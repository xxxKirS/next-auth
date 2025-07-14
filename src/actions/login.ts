'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { LoginSchema, LoginSchemaType } from '@/schemas';
import { AuthError } from 'next-auth';

export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password } = validatedValues.data;

  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    return { error: 'User not found' };
  }

  try {
    await signIn('credentials', { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid login or password' };
        default:
          return { error: 'Confirm your email' };
      }
    }
    throw error;
  }
}
