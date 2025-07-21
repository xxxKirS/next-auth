import { getVerificationTokensByEmail } from '@/data/verification-token';
import { getPasswordResetTokensByEmail } from '@/data/password-reset-token';
import { db } from './db';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { getTwoFactorTokensByEmail } from '@/data/two-factor-token';

const EXPIRES_IN = 60 * 60 * 1000;

export async function createVerificationToken(email: string) {
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + EXPIRES_IN); // existing token expires in 1 hour

    const existingTokens = await getVerificationTokensByEmail(email);

    if (existingTokens) {
      existingTokens.forEach(async (token) => {
        await db.verificationToken.delete({ where: { id: token.id } });
      });
    }

    const verificationToken = await db.verificationToken.create({
      data: { email, token, expires },
    });

    return verificationToken;
  } catch {
    return null;
  }
}

export async function createPasswordResetToken(email: string) {
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + EXPIRES_IN); // existing token expires in 1 hour

    const existingTokens = await getPasswordResetTokensByEmail(email);

    if (existingTokens) {
      existingTokens.forEach(async (token) => {
        await db.verificationToken.delete({ where: { id: token.id } });
      });
    }

    const passwordResetToken = await db.passwordResetToken.create({
      data: { email, token, expires },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
}

export async function createTwoFactorToken(email: string) {
  try {
    const token = crypto.randomInt(0, 999_999).toString().padStart(6, '0');
    const expires = new Date(Date.now() + EXPIRES_IN); // existing token expires in 1 hour

    const existingTokens = await getTwoFactorTokensByEmail(email);

    if (existingTokens) {
      existingTokens.forEach(async (token) => {
        await db.verificationToken.delete({ where: { id: token.id } });
      });
    }

    const twoFactorToken = await db.twoFactorToken.create({
      data: { email, token, expires },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
}
