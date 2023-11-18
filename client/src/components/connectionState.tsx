'use client';

import useConnectSocket from '@/utils/hooks/useConnectSocket';
import { cn } from '@/utils/functions/cn';

export function ConnectionState() {
  const { isConnected } = useConnectSocket();

  return (
    <div
      aria-label={isConnected ? 'Online' : 'Offline'}
      className='flex items-center mr-2 justify-center'
    >
      <span
        className={cn('h-3 w-3 relative rounded-full', {
          'bg-red-500': !isConnected,
          'bg-green-200 animate-ping': isConnected,
        })}
      />
      <span
        className={cn('h-3 w-3 z-10 absolute rounded-full', {
          'bg-red-500': !isConnected,
          'bg-green-400': isConnected,
        })}
      />
    </div>
  );
}
