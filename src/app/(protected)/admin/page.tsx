'use client';

import { isAdmin } from '@/actions/admin';
import RoleGate from '@/components/auth/role-gate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

export default function AdminPage() {
  function handleAPIClick() {
    fetch('/api/admin').then((res) => {
      if (res.ok) {
        toast.success('Success', {
          description: 'You are an admin',
          action: {
            label: 'Undo',
            onClick: () => {},
          },
        });
      } else {
        toast.error('Forbidden', {
          description: 'You are not an admin',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        });
      }
    });
  }

  function onServerActionClick() {
    isAdmin().then((res) => {
      if (res.success) {
        toast.success(res.success, {
          description: 'You are an admin',
          action: {
            label: 'Undo',
            onClick: () => {},
          },
        });
      } else {
        toast.error(res.error, {
          description: 'You are not an admin',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        });
      }
    });
  }

  return (
    <Card className='max-w-[600px] w-xl min-w-sm py-6'>
      <CardHeader className='w-full'>
        <CardTitle className='text-2xl font-semibold text-center'>
          <p className='text-2xl font-semibold text-center'>Admin Panel</p>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRoles={[UserRole.ADMIN]}>
          <p className='text-sm font-medium'>You are an admin</p>
        </RoleGate>

        <div className='flex flex-row justify-between items-center border rounded-sm p-3 shadow-md'>
          <p className='text-sm font-semibold'>Admin-only API Route</p>

          <Button onClick={handleAPIClick}>Click to test</Button>
        </div>
        <div className='flex flex-row justify-between items-center border rounded-sm p-3 shadow-md'>
          <p className='text-sm font-semibold'>Admin-only Server Action</p>

          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
