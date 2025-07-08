import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  backButtonLabel: string;
  backButtonPath: string;
  className?: string;
};

export default function BackButton({
  backButtonLabel,
  backButtonPath,
  className,
}: Props) {
  return (
    <Button
      variant='link'
      size='sm'
      className={cn(className, 'font-semibold')}
      asChild
    >
      <Link href={backButtonPath}>{backButtonLabel}</Link>
    </Button>
  );
}
