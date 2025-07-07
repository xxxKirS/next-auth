'use client';

import { useRouter } from 'next/navigation';

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
    router.push('/login');
  }

  if (mode === 'modal') {
    return <span>TODO</span>;
  }

  return (
    <span className='cursor-pointer' onClick={onclick}>
      {children}
    </span>
  );
}
