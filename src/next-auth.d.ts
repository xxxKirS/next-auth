import { UserRole } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    noPassword: boolean;
  }

  interface Session {
    user: {
      /** The user's postal address. */
      // id: string;
      // role: UserRole;
      // isTwoFactorEnabled: boolean;
      // isOAuth: boolean;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
    noPassword: boolean;
  }
}
