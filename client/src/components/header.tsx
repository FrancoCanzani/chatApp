'use client';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import Image from 'next/image';
import { useContext } from 'react';

import { UserContext } from '@/app/page';

import { app } from '../firebase';

export default function Header() {
  const user = useContext(UserContext);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  return (
    <header className='flex w-full items-center justify-between px-6 py-4 border-b border-gray-200'>
      <div className='flex items-center justify-center space-x-1'>
        <Image src={'/logo.png'} alt='logo' width={40} height={40} />
        <h1 className='font-semibold text-zinc-900 dark:text-zinc-50'>
          Boring Chat
        </h1>
      </div>
      {user ? (
        <div className='text-sm font-semibold space-x-3'>
          <span className='bg-gray-50 px-2 py-1 rounded-md'>
            {user.displayName}
          </span>
          <button
            className='bg-red-100 px-2 py-0.5 hover:bg-red-200 rounded-sm'
            onClick={() => signOut(auth)}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className='text-sm bg-gray-50 px-2 py-1 rounded-sm'
          onClick={() => signInWithRedirect(auth, provider)}
        >
          Sign In
        </button>
      )}
    </header>
  );
}
