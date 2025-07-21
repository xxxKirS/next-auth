'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { useCurrentUser } from '@/hooks/use-current-user';
import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';

export default function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-muted'>
            <FaUser className='text-muted-foreground' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuItem>
          <ExitIcon className='h-4 w-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
