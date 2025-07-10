'use client';

import React, { memo } from 'react';
import { Button } from '../ui/button';
import { SOCIALS } from '@/config/socials.config';

const Social = memo(function Social() {
  return (
    <div className='flex items-center w-full gap-2 flex-col'>
      {SOCIALS.map((social) => {
        const Icon = social.icon;
        return (
          <Button key={social.name} className='w-full' variant='outline'>
            <span>
              <Icon />
            </span>
            Sign in with {social.name}
          </Button>
        );
      })}
    </div>
  );
});

export default Social;
