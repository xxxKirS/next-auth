import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id!);

      if (!existingUser || !existingUser.emailVerified) return false;

      return true;
    },
    async session({ session, token }) {
      console.log(token);

      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
