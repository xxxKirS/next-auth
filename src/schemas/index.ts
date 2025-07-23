import { UserRole } from '@prisma/client';
import { z, infer as zodInfer } from 'zod';

// Login
export const LoginSchema = z.object({
  email: z.string({ message: 'Email is required' }).email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  code: z.optional(
    z
      .string()
      .min(6, { message: 'Code must be 6 digits' })
      .max(6, { message: 'Code must be 6 digits' })
  ),
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

export const SettingsSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .max(20, { message: 'Maximum 20 characters' })
        .min(3, { message: 'Minimum 3 characters' })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(6, { message: 'Minimum 6 characters' })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: 'Minimum 6 characters' })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      return true;
    },
    {
      message: 'New password is required',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: 'Current password is required',
      path: ['password'],
    }
  );

export type SettingsSchemaType = zodInfer<typeof SettingsSchema>;
