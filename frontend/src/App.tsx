import { useState, useEffect } from 'react';
import { socket } from './socket';
import { ChatForm } from './components/chatForm';
import { Messages } from './components/messages';
import { message } from './utils/types';
import { Sidebar } from './components/sidebar';

export default function App() {
  const [messages, setMessages] = useState<message[]>([]);
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

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
      <nav className='flex items-center justify-between px-6 py-4 border-b border-sky-50 rounded-xl'>
        <h1 className='text-xl font-semibold text-zinc-900 dark:text-zinc-50'>
          Chat.io
        </h1>
        <div className='flex items-center space-x-4'></div>
      </nav>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar room={room} setRoom={setRoom} user={user} setUser={setUser} />
        <main className='flex-1 bg-blue-50 w-full flex justify-between items-center flex-col overflow-auto py-4 px-6'>
          <Messages messages={messages} user={user} />
          <ChatForm setMessages={setMessages} user={user} room={room} />
        </main>
      </div>
      <footer className='flex items-center justify-between px-6 py-4 border-t border-sky-50 rounded-xl'>
        <p className='text-sm text-zinc-500'>© 2023 Chat.io Inc.</p>
        <nav className='flex items-center space-x-4'></nav>
      </footer>
    </div>
  );
}
