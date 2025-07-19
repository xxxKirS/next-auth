import { db } from '@/lib/db';

export async function getVerificationTokensByEmail(email: string) {
  try {
    const verificationToken = await db.verificationToken.findMany({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
}
