'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

const socials = [
  {
    name: 'Google',
    icon: <FcGoogle />,
  },
  {
    name: 'GitHub',
    icon: <FaGithub />,
  },
];

export default function Social() {
  return (
    <div className='flex items-center w-full gap-2 flex-col'>
      {socials.map((social) => (
        <Button key={social.name} className='w-full' variant='outline'>
          <span>{social.icon}</span>
          Sign in with {social.name}
        </Button>
      ))}
    </div>
  );
}
