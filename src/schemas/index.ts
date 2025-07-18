import { z, infer as zodInfer } from 'zod';

// Login
export const LoginSchema = z.object({
  email: z.string({ message: 'Email is required' }).email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginSchemaType = zodInfer<typeof LoginSchema>;

// Register
export const RegisterSchema = LoginSchema.extend({
  name: z
    .string({ message: 'Name is required' })
    .min(3, { message: 'Name is too short' }),
});

export type RegisterSchemaType = zodInfer<typeof RegisterSchema>;

// Reset
export const ResetSchema = z.object({ email: z.string().email() });

export type ResetSchemaType = zodInfer<typeof ResetSchema>;
