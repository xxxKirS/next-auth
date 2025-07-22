import { currentRole } from '@/lib/server-current-role';
import { NextResponse } from 'next/server';

export async function GET() {
  const role = await currentRole();

  if (role === 'ADMIN') return NextResponse.json(null, { status: 200 });

  return new NextResponse(null, { status: 403 });
}
