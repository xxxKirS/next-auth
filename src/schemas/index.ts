import { z, infer as zodInfer } from 'zod';

export const LoginSchema = z.object({
  email: z.string({ message: 'Email is required' }).email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginSchemaType = zodInfer<typeof LoginSchema>;
