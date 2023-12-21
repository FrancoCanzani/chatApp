'use client';

import { cn } from '@/utils/helpers/cn';
import useConnectSocket from '@/utils/hooks/useConnectSocket';

export function ConnectionState() {
  const { isConnected } = useConnectSocket();

  return (
    <p
      className={cn('text-[0.7rem] text-gray-800', {
        'text-gray-500': !isConnected,
      })}
    >
      {isConnected ? 'Online' : 'Offline'}
    </p>
  );
}
