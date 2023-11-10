'use client';

import { socket } from '../socket';
import Button from './button';
import { cn } from '@/utils/cn';
import { Dispatch, SetStateAction, useEffect } from 'react';

export function ConnectionState({
  isConnected,
  setIsConnected,
}: {
  isConnected: boolean | null;
  setIsConnected: Dispatch<SetStateAction<boolean | null>>;
}) {
  function connect() {
    socket.connect();
    setIsConnected(true);
  }

  function disconnect() {
    socket.disconnect();
    setIsConnected(false);
  }

  useEffect(() => {
    setIsConnected(socket.connected);
  }, []);

  return (
    <Button
      onClick={isConnected == true ? disconnect : connect}
      aria-label={isConnected ? 'disconnect' : 'connect'}
      className={cn(
        'capitalize antialiased text-gray-700 font-medium text-xs',
        {
          'bg-red-300 hover:bg-red-200': !isConnected,
        },
        {
          'bg-green-300 hover:bg-green-200': isConnected,
        }
      )}
    >
      {isConnected ? 'Online' : 'Offline'}
    </Button>
  );
}
