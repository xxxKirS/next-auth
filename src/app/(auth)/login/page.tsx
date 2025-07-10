import LoginForm from '@/components/auth/LoginForm';
import LoginProvider from '@/components/auth/LoginProvider';

export default function LoginPage() {
  return (
    <LoginProvider>
      <LoginForm />
    </LoginProvider>
  );
}
