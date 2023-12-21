'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Chat from '@/components/chat';
import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { socket } from '@/socket';
import checkIfUserExists from '@/utils/helpers/checkIfUserExists';
import createNewUser from '@/utils/helpers/createNewUser';
import fetcher from '@/utils/helpers/fetcher';
import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

export default function App() {
  const { user, loading } = useAuth();
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessages, setLastMessages] = useState<{ [key: string]: Message }>(
    {}
  );
  const [showSidebar, setShowSidebar] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR(
    user ? `${API_URL}/rooms/participants/${user.uid}` : null,
    fetcher
  );

  if (!user && !loading) {
    redirect('/');
  }

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [user, data]);

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
          rooms={rooms}
          setRooms={setRooms}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          lastMessages={lastMessages}
          setLastMessages={setLastMessages}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <Chat
          rooms={rooms}
          setRooms={setRooms}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          messages={messages}
          setMessages={setMessages}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </main>
    </div>
  );
}
