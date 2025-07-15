import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from './db';
import { v4 as uuidv4 } from 'uuid';

export async function createVerificationToken(email: string) {
  try {
    const token = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken.delete({ where: { id: existingToken.id } });
    }

    const verificationToken = await db.verificationToken.create({
      data: { email, token, expires },
    });

    return verificationToken;
  } catch {
    return null;
  }
}
