'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/header';
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Footer from '@/components/footer';
import Chat from '@/components/chat';
import { Room } from '@/utils/types';
import checkIfUserExists from '@/utils/functions/checkIfUserExists';
import createNewUser from '@/utils/functions/createNewUser';

export default function App() {
  const auth = getAuth(app);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const { displayName, email, uid } = user;
      if (displayName && email && uid) {
        (async () => {
          const userExists = await checkIfUserExists(uid);
          if (!userExists) {
            const newUser = await createNewUser(displayName, email, uid);
          }
        })();
      }
    }
  }, [user]);

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
