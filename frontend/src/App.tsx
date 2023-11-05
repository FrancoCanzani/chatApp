import { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/connectionState';
import { ConnectionManager } from './components/connectionManager';
import { MyForm } from './components/myForm';
import { Messages } from './components/messages';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Listening for chat message event from the server
    socket.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the effect
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat message');
    };
  }, []);

  return (
    <div className='App'>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <MyForm />
      <Messages messages={messages} />
    </div>
  );
}
