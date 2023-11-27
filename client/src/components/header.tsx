'use client';

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  User,
  signOut,
} from 'firebase/auth';
import { app } from '../firebase';

export default function Header({ user }: { user: User | null | undefined }) {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  return (
    <header className='flex w-full items-center justify-between px-6 py-4 border-b border-sky-50 rounded-xl'>
      <h1 className='font-semibold text-zinc-900 dark:text-zinc-50'>Chat.io</h1>
      {user ? (
        <div className='text-xs font-semibold space-x-3'>
          <span className='bg-gray-50 px-2 py-1 rounded-md'>
            {user.displayName}
          </span>
          <button
            className='bg-red-100 px-2 py-0.5 hover:bg-red-200 rounded-md'
            onClick={() => signOut(auth)}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className='text-xs bg-gray-50 px-2 py-1 rounded-md'
          onClick={() => signInWithRedirect(auth, provider)}
        >
          Sign In
        </button>
      )}
    </header>
  );
}
