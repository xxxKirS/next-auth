'use server';

import { LoginSchema, LoginSchemaType } from '@/schemas';

export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  return { success: 'Login successful' };
}
