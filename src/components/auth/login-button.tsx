'use client';

import { PAGES } from '@/config/pages.config';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import LoginForm from './LoginForm';

type Props = {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export default function LoginButton({
  children,
  mode = 'redirect',
  asChild,
}: Props) {
  const router = useRouter();

  function onclick() {
    router.push(PAGES.LOGIN);
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <DialogTitle className='hidden'>Login</DialogTitle>
          <DialogDescription className='hidden'>Login form</DialogDescription>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className='cursor-pointer' onClick={onclick}>
      {children}
    </span>
  );
}
