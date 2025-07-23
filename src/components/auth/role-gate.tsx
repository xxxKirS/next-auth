'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import FormError from '../form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const role = useCurrentRole();

  if (!allowedRoles.includes(role!))
    return <FormError message='Unauthorized' />;

  return <>{children}</>;
}
