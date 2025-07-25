'use client';

import React, { memo } from 'react';
import { Button } from '../ui/button';
import { SOCIALS } from '@/config/socials.config';
import { TSOCIALS } from '@/types/types';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useSearchParams } from 'next/navigation';

const Social = memo(function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  async function handleClick(provider: TSOCIALS['name']) {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className='flex items-center w-full gap-2 flex-col'>
      {SOCIALS.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.name}
            className='w-full'
            variant='outline'
            onClick={() => handleClick(social.name)}
          >
            <span>
              <Icon />
            </span>
            Sign in with {social.displayName}
          </Button>
        );
      })}
    </div>
  );
});

export default Social;
