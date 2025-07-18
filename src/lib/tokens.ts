import { getVerificationTokensByEmail } from '@/data/verification-token';
import { getPasswordResetTokensByEmail } from '@/data/password-reset-token';
import { db } from './db';
import { v4 as uuidv4 } from 'uuid';

const EXPIRES_IN = 60 * 60 * 1000;

export async function createVerificationToken(email: string) {
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + EXPIRES_IN); // existing token expires in 1 hour

    const existingTokens = await getVerificationTokensByEmail(email);

    if (existingTokens) {
      existingTokens.forEach(async (existingToken) => {
        await db.verificationToken.delete({ where: { id: existingToken.id } });
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
      existingTokens.forEach(async (existingToken) => {
        await db.verificationToken.delete({ where: { id: existingToken.id } });
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
