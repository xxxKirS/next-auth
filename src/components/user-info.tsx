import { User } from 'next-auth';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

type Props = {
  user: User;
  label: string;
};

export default function UserInfo({ user, label }: Props) {
  return (
    <Card className='max-w-[600px] w-xl min-w-sm'>
      <CardHeader className='w-full'>
        <CardTitle className='text-2xl font-semibold text-center'>
          <p>{label}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-row justify-between items-center rounded-md border p-3 shadow-sm'>
          <p className='text-sm font-medium'>ID</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1'>
            {user.id}
          </p>
        </div>

        <div className='flex flex-row justify-between items-center rounded-md border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Name</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1'>
            {user.name}
          </p>
        </div>

        <div className='flex flex-row justify-between items-center rounded-md border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Email</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1'>
            {user.email}
          </p>
        </div>

        <div className='flex flex-row justify-between items-center rounded-md border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Role</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1'>
            {user.role}
          </p>
        </div>

        <div className='flex flex-row justify-between items-center rounded-md border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Two Factor Authentication</p>
          <Badge variant={user.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
