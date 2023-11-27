import { Room } from '@/utils/types';
import { useEffect, useState } from 'react';
import { Users2 } from 'lucide-react';
import { DbUser } from '@/utils/types';

export default function RoomChatInfo({
  currentRoom,
}: {
  currentRoom: Room | null;
}) {
  if (!currentRoom) {
    return null;
  }

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
        console.error('Error fetching users:', error);
        throw error;
      }
    }

    fetchUsersByIds(currentRoom.participants).then(setParticipants);
  }, [currentRoom]);

  return (
    <div className='bg-gray-200 flex-col rounded-t-md border-b-2 border-gray-300 mb-2 font-normal flex w-full py-3 px-4 text-center text-xs'>
      <div className='flex items-center justify-between w-full'>
        <p className='font-semibold'>{currentRoom.name}</p>
        <div className='flex items-center justify-center gap-x-1'>
          <Users2 size={15} aria-label='room participants' />
          <p>{currentRoom.participants.length}</p>
        </div>
      </div>
      <ul className='flex items-center justify-start w-full'>
        {participants.map((participant: DbUser) => (
          <li key={participant.userId}>{participant.displayName}</li>
        ))}
      </ul>
    </div>
  );
}
