'use client';

import { getAuth, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from '@/components/chat';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { socket } from '@/socket';
import checkIfUserExists from '@/utils/helpers/checkIfUserExists';
import createNewUser from '@/utils/helpers/createNewUser';
import { Message, Room } from '@/utils/types';

export const UserContext = createContext<User | null | undefined>(null);

import { app } from '../firebase';

export default function App() {
  const auth = getAuth(app);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessages, setLastMessages] = useState<{ [key: string]: Message }>(
    {}
  );
  const [showSidebar, setShowSidebar] = useState(true);

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
    <UserContext.Provider value={user}>
      <div className='flex flex-col h-screen w-screen'>
        <Header />
        <div className='flex flex-1 overflow-hidden'>
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
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}
