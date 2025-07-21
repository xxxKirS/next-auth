'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { LoginSchema, LoginSchemaType } from '@/schemas';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';
import { createTwoFactorToken, createVerificationToken } from '@/lib/tokens';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorTokensByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationById } from '@/data/two-factor-confirmation';

export async function login(values: LoginSchemaType) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password, code } = validatedValues.data;

  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    return { error: 'User not found' };
  }

  if (!user.emailVerified) {
    const verificationToken = await createVerificationToken(email);

    if (!verificationToken) {
      return { error: 'Error creating verification token' };
    }

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Conformation email sent' };
  }

  if (user.isTwoFactorEnabled) {
    if (code) {
      const twoFactorTokens = await getTwoFactorTokensByEmail(email);

      if (!twoFactorTokens) {
        return { error: 'Invalid 2FA code' };
      }

      const existingToken = twoFactorTokens.find(
        (token) => token.token === code
      );

      if (!existingToken) {
        return { error: 'Invalid 2FA code' };
      }

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
        await db.twoFactorToken.delete({ where: { id: existingToken.id } });
        return { error: '2FA token expired' };
      }

      twoFactorTokens.forEach(async (token) => {
        await db.twoFactorToken.delete({ where: { id: token.id } });
      });

      const existingConfirmation = await getTwoFactorConfirmationById(user.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: user.id },
      });
    } else {
      const twoFactorToken = await createTwoFactorToken(email);

      if (!twoFactorToken) {
        return { error: 'Error creating 2FA token' };
      }

      await sendTwoFactorTokenEmail(email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid login or password' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
}
