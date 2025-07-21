import { db } from '@/lib/db';

export async function getTwoFactorTokenByToken(token: string) {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
}

export async function getTwoFactorTokensByEmail(email: string) {
  try {
    const twoFactorTokens = await db.twoFactorToken.findMany({
      where: {
        email,
      },
    });

    return twoFactorTokens;
  } catch {
    return null;
  }
}
