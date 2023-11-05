import { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/connectionState';
import { ConnectionManager } from './components/connectionManager';
import { MyForm } from './components/myForm';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className='App'>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
