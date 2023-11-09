'use client';

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { app } from '../firebase';

export default function Header({ user }: { user: User | null | undefined }) {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  return (
    <header className='flex w-full items-center justify-between px-6 py-4 border-b border-sky-50 rounded-xl'>
      <h1 className='font-semibold text-zinc-900 dark:text-zinc-50'>Chat.io</h1>
      {user ? (
        <span>{user.displayName}</span>
      ) : (
        <button onClick={() => signInWithRedirect(auth, provider)}>
          Sign In
        </button>
      )}
    </header>
  );
}
