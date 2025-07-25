import { db } from '@/lib/db';

export async function getTwoFactorConfirmationById(userId: string) {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
}
