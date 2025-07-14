import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '../routes';
import { NextResponse } from 'next/server';

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option

const { auth } = NextAuth(authConfig);

export const middleware = auth(async (req) => {
  console.log(req.nextUrl.pathname);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else {
      return null;
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
