'use client';

import { cn } from '@/utils/functions/cn';
import useConnectSocket from '@/utils/hooks/useConnectSocket';

export function ConnectionState() {
  const { isConnected } = useConnectSocket();

  return (
    <div
      aria-label={isConnected ? 'Online' : 'Offline'}
      className='flex relative items-center mr-2 justify-center'
    >
      <span
        className={cn('h-2.5 w-2.5 rounded-full', {
          'bg-red-500': !isConnected,
          'bg-green-200 animate-ping': isConnected,
        })}
      />
      <span
        className={cn('h-2.5 w-2.5 z-10 absolute rounded-full', {
          'bg-red-500': !isConnected,
          'bg-green-300': isConnected,
        })}
      />
    </div>
  );
}
