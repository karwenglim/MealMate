'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthRoute && (
        <div className='flex mb-auto'>
          <Header />
        </div>
      )}

      <div className='flex-1 flex bg-white'>{children}</div>

      {!isAuthRoute && (
        <div className='mt-auto'>
          <Footer />
        </div>
      )}
    </>
  );
}
