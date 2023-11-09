'use client';

import { useState, useEffect } from 'react';
import { socket } from '@/socket';
import { ChatForm } from '@/components/chatForm';
import { Messages } from '@/components/messages';
import { message } from '@/utils/types';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/header';
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Footer from '@/components/footer';

export default function App() {
  const auth = getAuth(app);
  const [messages, setMessages] = useState<message[]>([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Listening for chat message event from the server
    socket.on('messageToRoom', (msg: message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the effect
    return () => {
      socket.off('messageToRoom');
    };
  }, []);

  return (
    <div className='flex flex-col h-screen w-screen bg-softBlue dark:bg-zinc-900'>
      <Header user={user} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          user={user}
        />
        <main className='flex-1 bg-blue-50 w-full flex justify-between m-6 rounded-md items-center flex-col overflow-auto py-4 px-6'>
          <Messages messages={messages} user={user} currentRoom={currentRoom} />
          <ChatForm
            setMessages={setMessages}
            user={user}
            currentRoom={currentRoom}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
