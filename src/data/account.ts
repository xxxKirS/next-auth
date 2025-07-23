import { db } from '@/lib/db';

export async function getAccountById(id: string) {
  try {
    const account = await db.account.findFirst({ where: { userId: id } });

    return account;
  } catch {
    return null;
  }
}
