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

// New Password
export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Minimum 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type NewPasswordSchemaType = zodInfer<typeof NewPasswordSchema>;
