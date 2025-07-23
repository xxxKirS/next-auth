'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Social from './Social';
import BackButton from './BackButton';

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel?: string;
  backButtonDescription?: string;
  backButtonPath?: string;
  showSocial?: boolean;
};
export default function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonDescription,
  backButtonPath,
  showSocial,
}: Props) {
  return (
    <Card className='max-w-lg w-full min-w-sm'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold text-center'>
          {headerLabel}
        </CardTitle>
        <CardDescription className='text-center text-md'>
          {headerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:mx-2'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>
              Or continue with
            </span>
          </div>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      )}
      <CardFooter className='flex items-center justify-center'>
        <CardDescription>{backButtonDescription}</CardDescription>
        <BackButton
          backButtonLabel={backButtonLabel}
          backButtonPath={backButtonPath}
        />
      </CardFooter>
    </Card>
  );
}
