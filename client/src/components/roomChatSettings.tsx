import { Copy, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import { cn } from '@/utils/helpers/cn';
import { copyToClipboard } from '@/utils/helpers/copyToClipboard';
import getRooms from '@/utils/helpers/getRooms';
import { useAuth } from '@/utils/hooks/useAuth';
import { Participant, Room } from '@/utils/types';

export default function RoomChatSettings({
  currentRoom,
  setCurrentRoom,
  setRooms,
}: {
  currentRoom: Room;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  setRooms: Dispatch<SetStateAction<Room[]>>;
}) {
  const DEPLOYMENT_URL = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuth();

  async function regenerateJoinLink(roomId: string) {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomId}/joinLink`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data.newJoinLink;
      } else {
        toast.error('Failed to regenerate join link');
      }
    } catch (error) {
      toast.error('Failed to regenerate join link');
    }
  }

  async function handleRegenerateJoinLink() {
    if (currentRoom && currentRoom._id) {
      const newJoinLink = await regenerateJoinLink(currentRoom._id);
      if (user && newJoinLink) {
        setCurrentRoom({ ...currentRoom, joinLink: newJoinLink });
        const rooms = await getRooms(user?.uid);
        setRooms(rooms);
      }
    }
  }

  return (
    <div className='p-2'>
      <ul className='flex items-center space-y-2 justify-start text-sm flex-col w-full'>
        {currentRoom.participants.map((participant: Participant) => (
          <li
            key={participant.id}
            className={cn('w-full text-xs flex items-center justify-between')}
          >
            {participant.name}
            {currentRoom.administrators.includes(participant.id) ? (
              <span className='bg-green-100 text-green-600 font-medium text-xs px-1'>
                Admin.
              </span>
            ) : (
              <button
                title='Make admin'
                className='bg-yellow-100 text-yellow-600 font-medium text-xs px-1'
              >
                + Admin.
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className='mt-3'>
        <h4 className='text-sm mb-2 capitalize font-semibold'>
          Share room invite link
        </h4>
        <div className='flex items-center justify-start space-x-2'>
          <Link
            target='_blank'
            href={`${DEPLOYMENT_URL}/join?room=${currentRoom.joinLink}`}
            className='bg-white text-xs overflow-hidden truncate p-2 border rounded-md hover:text-black text-gray-700'
          >{`${DEPLOYMENT_URL}/join?room=${currentRoom.joinLink}`}</Link>
          <button
            title='Copy to clipboard'
            onClick={() =>
              copyToClipboard(
                `${DEPLOYMENT_URL}/join?room=${currentRoom.joinLink}`
              )
            }
          >
            <Copy size={18} />
          </button>
          <button title='Regenerate link' onClick={handleRegenerateJoinLink}>
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
