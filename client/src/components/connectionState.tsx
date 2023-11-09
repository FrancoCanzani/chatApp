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
  }

  function disconnect() {
    socket.disconnect();
  }

  useEffect(() => {
    setIsConnected(socket.connected);
  }, []);

  return (
    <Button
      onClick={isConnected == true ? disconnect : connect}
      aria-label={isConnected ? 'disconnect' : 'connect'}
      variant={'primary'}
      size={'small'}
      className={cn(
        'p-1 rounded-lg capitalize font-semibold text-sm',
        {
          'bg-red-200 hover:bg-red-100': !isConnected,
        },
        {
          'bg-green-200 hover:bg-green-100': isConnected,
        }
      )}
    >
      {isConnected ? 'disconnect' : 'connect'}
    </Button>
  );
}
