import { auth } from '@/auth';

export async function serverCurrentUser() {
  const session = await auth();

  return session?.user;
}
