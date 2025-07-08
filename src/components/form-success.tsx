import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null;
  }

  return (
    <div className='bg-emerald-500/15 rounded-md p-3 flex items-center gap-2 text-emerald-500 text-sm'>
      <CheckCircledIcon className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
}
