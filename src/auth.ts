import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';
import { getTwoFactorConfirmationById } from './data/two-factor-confirmation';
import { getAccountById } from './data/account';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', error: '/error' },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser || !existingUser.emailVerified) return false;

      // Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationById(
          existingUser.id
        );

        if (twoFactorConfirmation) {
          // Delete 2fc for next sign in
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });

          return true;
        }

        if (!twoFactorConfirmation) return false;
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth!;
        session.user.noPassword = token.noPassword!;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountById(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.noPassword = !!existingUser.password;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
