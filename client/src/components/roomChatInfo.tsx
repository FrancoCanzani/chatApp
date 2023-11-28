import { Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/functions/cn';
import { useAuth } from '@/utils/hooks/useAuth';
import { Room } from '@/utils/types';
import { DbUser } from '@/utils/types';

export default function RoomChatInfo({
  currentRoom,
}: {
  currentRoom: Room | null;
}) {
  const { user, loading, error } = useAuth();
  const [participants, setParticipants] = useState<DbUser[]>([]);

  useEffect(() => {
    async function fetchUsersByIds(userIds: string[]) {
      try {
        const response = await fetch('http://localhost:3000/users/by-ids', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIds }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return await response.json();
      } catch (error) {
        console.log('Error fetching users:', error);
        throw error;
      }
    }

    if (currentRoom) {
      fetchUsersByIds(currentRoom.participants).then(setParticipants);
    }
  }, [currentRoom]);

  if (!currentRoom) {
    return null;
  }

  return (
    <div className='bg-gray-200 flex-col gap-y-1 rounded-t-md border-b-2 border-gray-300 mb-2 font-normal flex w-full py-1 px-2 text-center text-xs'>
      <div className='flex items-center justify-between w-full'>
        <p className='font-semibold text-base'>{currentRoom.name}</p>
        <div className='flex items-center justify-center gap-x-1'>
          <Users2 size={15} aria-label='room participants' />
          <p>{participants.length}</p>
        </div>
      </div>
      <ul className='flex items-center justify-start w-full space-x-1'>
        {participants.map((participant: DbUser, index: number) => (
          <li
            key={participant.userId}
            className={cn({
              'font-semibold': user?.uid == participant.userId,
            })}
          >
            {participant.displayName}
            {index < participants.length - 1 && ', '}
          </li>
        ))}
      </ul>
    </div>
  );
}
