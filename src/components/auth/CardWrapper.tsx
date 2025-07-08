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
  backButtonLabel: string;
  backButtonDescription: string;
  backButtonPath: string;
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
    <Card className='max-w-md w-full min-w-sm'>
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
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <CardDescription>{backButtonDescription}</CardDescription>
        <BackButton
          backButtonLabel={backButtonLabel}
          backButtonPath={backButtonPath}
        />
      </CardFooter>
    </Card>
  );
}
