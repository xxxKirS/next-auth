import NavBar from './_components/NavBar';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex-1 flex flex-col justify-center items-center gap-y-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-12'>
      <NavBar />

      {children}
    </div>
  );
}
