'use client';

import UserButton from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NAVIGATION = [
  {
    name: 'Settings',
    href: PAGES.SETTINGS,
  },
  {
    name: 'Server',
    href: PAGES.SERVER,
  },
  {
    name: 'Client',
    href: PAGES.CLIENT,
  },
  {
    name: 'Admin',
    href: PAGES.ADMIN,
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-md w-xl shadow-sm'>
      <ul className='flex gap-2'>
        {NAVIGATION.map((item) => {
          return (
            <li key={item.name} className='flex-1'>
              <Button
                asChild
                variant={pathname === item.href ? 'default' : 'outline'}
                disabled={pathname === item.href}
                className='w-full'
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            </li>
          );
        })}
      </ul>

      <UserButton />
    </nav>
  );
}
