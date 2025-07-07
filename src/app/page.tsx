import LoginButton from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='flex flex-1 items-center justify-center flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
      <div className='space-y-4 text-center'>
        <h1 className='text-4xl font-bold text-foreground drop-shadow-md'>
          Next Auth
        </h1>
        <p className='text-lg text-foreground'>
          A simple authentication service
        </p>
        <div className=''>
          <LoginButton>
            <Button variant='secondary' size={'lg'}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
