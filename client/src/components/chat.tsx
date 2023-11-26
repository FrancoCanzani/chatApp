import { MessageForm } from './forms/messageForm';
import { Messages } from './messages';
import { useState, useEffect } from 'react';
import { socket } from '@/socket';
import { Message, Room } from '../utils/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';
import RoomChatInfo from './roomChatInfo';

export default function Chat({ currentRoom }: { currentRoom: Room | null }) {
  const auth = getAuth(app);

  const [messages, setMessages] = useState<Message[]>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Listening for chat message event from the server
    socket.on('messageToRoom', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the effect
    return () => {
      socket.off('messageToRoom');
    };
  }, []);

  useEffect(() => {
    async function getMessages(roomId: string) {
      try {
        const res = await fetch(`http://localhost:3000/messages/${roomId}`);
        const response = await res.json();
        if (res.ok) {
          console.log(response);
          return response;
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        return null;
      }
    }

    async function fetchMessages() {
      if (currentRoom?._id) {
        const fetchedMessages = await getMessages(currentRoom._id);
        setMessages(fetchedMessages);
      }
    }

    fetchMessages();
  }, [currentRoom]);

  return (
    <main className='w-full relative ring-4 ring-gray-100 border-2 border-gray-300 shadow-gray-100 flex justify-start m-4 rounded-md items-start flex-col'>
      <RoomChatInfo currentRoom={currentRoom} />
      <Messages messages={messages} user={user} currentRoom={currentRoom} />
      <MessageForm
        setMessages={setMessages}
        user={user}
        currentRoom={currentRoom}
      />
    </main>
  );
}
