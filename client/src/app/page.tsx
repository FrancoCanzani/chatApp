'use client';

import { getAuth, User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Balancer from 'react-wrap-balancer';

import { app } from '../firebase';

export default function Home() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    redirect('/chat');
  }

  return (
    <div className='bg-white flex flex-col justify-between h-screen'>
      <header className='flex justify-between items-center py-6 px-3 md:px-10'>
        <div className='flex items-center space-x-1'>
          <Image src={'/logo.png'} alt='logo' width={40} height={40} />
          <span className='font-semibold text-gray-700 text-xl'>
            Boring Chat
          </span>
        </div>
        <Link href={'/signIn'} className='text-gray-600 hover:text-gray-800'>
          Sign in
        </Link>
      </header>
      <main className='px-3 pb-16 text-center leading-loose'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6'>
          Simplified Chatting. Back to Basics{' '}
        </h1>
        <p className='text-base md:text-lg text-gray-600 mb-8'>
          Rediscover the joy of simple, straightforward{' '}
          <span className='underline'>messaging</span>
        </p>
        <div className='space-x-9'>
          <Link
            href={'/signIn'}
            className='bg-gray-800 hover:bg-gray-950 text-white p-3 rounded-md'
          >
            Start for free
          </Link>
          <a
            className='hover:underline'
            href='https://github.com/FrancoCanzani/chatApp'
            target='_blank'
            rel='noreferrer'
          >
            Contribute ↗
          </a>
        </div>
      </main>
      <footer className='flex items-center py-4 bg-gray-700 justify-center w-full'>
        <p className='text-xs text-zinc-200'>{`© ${new Date().getFullYear()} Boring Chat Inc.`}</p>
      </footer>
    </div>
  );
}
