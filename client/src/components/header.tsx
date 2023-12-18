'use client';

import { getAuth, signOut } from 'firebase/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { useAuth } from '@/utils/hooks/useAuth';

import { app } from '../firebase';

export default function Header() {
  const { user, loading, error } = useAuth();

  const auth = getAuth(app);

  const handleSignOut = () => {
    signOut(auth);
    redirect('/');
  };

  return (
    <header className='flex w-full items-center justify-between px-6 py-4 border-b border-gray-200'>
      <div className='flex items-center justify-center space-x-1'>
        <Image src={'/logo.png'} alt='logo' width={40} height={40} />
        <h1 className='font-semibold text-zinc-900 dark:text-zinc-50'>
          Boring Chat
        </h1>
      </div>
      {user && (
        <div className='text-sm font-semibold space-x-3'>
          <span className='bg-gray-50 px-2 py-1 rounded-md'>
            {user.displayName}
          </span>
          <button
            className='bg-red-100 px-2 py-0.5 hover:bg-red-200 rounded-sm'
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
