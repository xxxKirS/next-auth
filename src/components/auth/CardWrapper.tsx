'use client';

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonPath: string;
  showSocial?: boolean;
};
export default function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonPath,
  showSocial,
}: Props) {
  return (
    <Card className='max-w-md w-full'>
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
