import UserInfo from '@/components/user-info';

import { serverCurrentUser } from '@/lib/server-current-user';

export default async function ServerPage() {
  const user = await serverCurrentUser();

  return <UserInfo user={user!} label='Server component' />;
}
