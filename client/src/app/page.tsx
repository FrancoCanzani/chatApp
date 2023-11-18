'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/header';
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Footer from '@/components/footer';
import Chat from '@/components/chat';
import { Room } from '@/utils/types';

export default function App() {
  const auth = getAuth(app);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className='flex flex-col h-screen w-screen bg-softBlue dark:bg-zinc-900'>
      <Header user={user} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          user={user}
        />
        <Chat currentRoom={currentRoom} />
      </div>
      <Footer />
    </div>
  );
}
