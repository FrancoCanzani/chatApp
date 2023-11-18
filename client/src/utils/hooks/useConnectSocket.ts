import { useState, useEffect } from 'react';
import { socket } from '@/socket';

export default function useConnectSocket() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [reconnectTimeout, setReconnectTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        setReconnectTimeout(null);
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      // Attempt to reconnect after 5 seconds
      setReconnectTimeout(
        setTimeout(() => {
          socket.connect();
        }, 5000)
      );
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.connect();

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.disconnect();
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  return { isConnected };
}
