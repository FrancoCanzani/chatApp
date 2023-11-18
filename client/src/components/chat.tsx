import { MessageForm } from './forms/messageForm';
import { Messages } from './messages';
import { useState, useEffect } from 'react';
import { socket } from '@/socket';
import { message } from '../utils/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';

export default function Chat({ currentRoom }: { currentRoom: string }) {
  const auth = getAuth(app);

  const [messages, setMessages] = useState<message[]>([]);
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
    <main className='flex-1 w-full ring-4 ring-gray-100 border-2 border-gray-300 shadow-gray-100 flex justify-between m-4 rounded-md items-center flex-col overflow-auto py-4 px-6'>
      <Messages messages={messages} user={user} currentRoom={currentRoom} />
      <MessageForm
        setMessages={setMessages}
        user={user}
        currentRoom={currentRoom}
      />
    </main>
  );
}
