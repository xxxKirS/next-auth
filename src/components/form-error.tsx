import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className='bg-destructive/15 rounded-md p-3 flex items-center gap-2 text-destructive text-sm'>
      <ExclamationTriangleIcon className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
}
