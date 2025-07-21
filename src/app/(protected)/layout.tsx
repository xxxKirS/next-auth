export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-1 flex items-center justify-center p-12'>
      {children}
    </div>
  );
}
