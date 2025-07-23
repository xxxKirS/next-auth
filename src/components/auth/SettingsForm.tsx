'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { SettingsSchema, SettingsSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import FormInput from './FormInput';
import { Button } from '../ui/button';
import { settings } from '@/actions/settings';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useSession } from 'next-auth/react';
import FormError from '../form-error';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { UserRole } from '@prisma/client';
import { Switch } from '../ui/switch';
import { ClipLoader } from 'react-spinners';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function SettingsForm() {
  const { update } = useSession();
  const user = useCurrentUser();

  const form = useForm<SettingsSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');

  if (!user) {
    return (
      <Card className='max-w-[600px] w-xl min-w-sm flex items-center justify-center'>
        <ClipLoader />
      </Card>
    );
  }

  function onSubmit(data: SettingsSchemaType) {
    startTransition(async () => {
      await settings(data).then((data) => {
        if (
          data?.errors?.error ||
          data?.errors?.name ||
          data?.errors?.email ||
          data?.errors?.password
        ) {
          if (data?.errors?.name) {
            form.setError('name', { message: data.errors.name });
          } else if (data?.errors?.email) {
            form.setError('email', { message: data.errors.email });
          } else if (data?.errors?.password) {
            form.setError('password', { message: data.errors.password });
          } else {
            toast.error(data.errors.error);
            setError(data.errors.error);
            form.reset();
          }
        }
        if (data?.success) {
          toast.success(data.success);
          update();
        }
      });
    });
  }

  return (
    <Card className='max-w-[600px] w-xl min-w-sm'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold text-center'>
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormInput
              name='name'
              label='Name'
              placeholder='John Doe'
              disabled={isPending}
            />
            <FormInput
              name='email'
              label='Email'
              placeholder='n4C7o@example.com'
              disabled={isPending || user.isOAuth}
            />
            <FormInput
              name='password'
              label='Password'
              placeholder='**********'
              type='password'
              disabled={isPending || user.noPassword}
            />
            <FormInput
              name='newPassword'
              label='New Password'
              placeholder='**********'
              type='password'
              disabled={isPending}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <FormLabel className='text-md font-medium text-gray-700'>
                      Role
                    </FormLabel>
                    <FormMessage className='text-sm font-light' />
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                    value={field.value}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {!user.isOAuth && (
              <FormField
                control={form.control}
                name='isTwoFactorEnabled'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm gap-1'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-md font-medium text-gray-700'>
                        Two Factor Authentication
                      </FormLabel>
                      <FormDescription>
                        Enable two factor authentication for your account
                      </FormDescription>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />
            )}

            <FormError message={error} />

            <div className='flex justify-end gap-2'>
              <Button
                type='reset'
                disabled={isPending}
                variant='secondary'
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button disabled={isPending}>Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
