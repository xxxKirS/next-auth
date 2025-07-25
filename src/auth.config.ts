import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './data/user';
import bcrypt from 'bcryptjs';
import { db } from './lib/db';

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedValues = LoginSchema.safeParse(credentials!);

        if (!validatedValues.success) {
          return null;
        }

        const { email, password } = validatedValues.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        const isOAuth = await db.account.findFirst({
          where: {
            providerAccountId: user.id,
          },
        });

        if (passwordsMatch) {
          return {
            ...user,
            isOAuth: !!isOAuth,
            noPassword: false,
          };
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
