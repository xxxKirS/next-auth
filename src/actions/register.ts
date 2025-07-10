'use server';

import { RegisterSchema, RegisterSchemaType } from '@/schemas';

export async function register(values: RegisterSchemaType) {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  return { success: 'Email sent!' };
}
