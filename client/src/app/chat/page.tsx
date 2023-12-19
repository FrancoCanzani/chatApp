'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import Chat from '@/components/chat';
import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { socket } from '@/socket';
import checkIfUserExists from '@/utils/helpers/checkIfUserExists';
import createNewUser from '@/utils/helpers/createNewUser';
import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const { user, loading, error } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessages, setLastMessages] = useState<{ [key: string]: Message }>(
    {}
  );
  const [showSidebar, setShowSidebar] = useState(true);

  if (!user && !loading) {
    redirect('/');
  }

  useEffect(() => {
    const handleMessageToRoom = (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setLastMessages((prevLastMessages) => ({
        ...prevLastMessages,
        [msg.roomId]: msg,
      }));
    };

    socket.on('messageToRoom', handleMessageToRoom);

    return () => {
      socket.off('messageToRoom', handleMessageToRoom);
    };
  }, []);

  useEffect(() => {
    // checks if a user exists in the DB, if not creates one
    async function handleUser() {
      if (user) {
        const { displayName, email, uid } = user;
        if (displayName && email && uid) {
          const userExists = await checkIfUserExists(uid);
          if (!userExists) {
            await createNewUser(displayName, email, uid);
          }
        }
      }
    }

    handleUser();
  }, [user]);

  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <main className='flex flex-1 overflow-hidden'>
        <Sidebar
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          lastMessages={lastMessages}
          setLastMessages={setLastMessages}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <Chat
          currentRoom={currentRoom}
          messages={messages}
          setMessages={setMessages}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </main>
    </div>
  );
}
