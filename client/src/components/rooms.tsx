import { Dispatch, SetStateAction, useEffect } from 'react';
import useSWR from 'swr';

import { socket } from '@/socket';
import { cn } from '@/utils/functions/cn';
import fetcher from '@/utils/functions/fetcher';
import formatTime from '@/utils/functions/formatTime';
import { shareRoomInvite } from '@/utils/functions/shareRoomInvite';
import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

export default function Rooms({
  rooms,
  currentRoom,
  setCurrentRoom,
  lastMessages,
  setLastMessages,
}: {
  rooms: Room[];
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  lastMessages: { [key: string]: Message };
  setLastMessages: Dispatch<SetStateAction<{ [key: string]: Message }>>;
}) {
  const { user, loading, error: authError } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error: swrError } = useSWR(
    user ? `${API_URL}/rooms/last-messages/${user.uid}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setLastMessages(data);
    }
  }, [data]);

  function handleJoinRoom(room: Room) {
    if (room._id) {
      socket.emit('joinRoom', {
        roomId: room._id,
        user: {
          id: user?.uid,
          name: user?.displayName,
        },
      });
      setCurrentRoom(room);
    }
  }

  function handleLeaveRoom(roomId: string | undefined) {
    if (roomId) {
      socket.emit('leaveRoom', {
        roomId: roomId,
        user: {
          id: user?.uid,
          name: user?.displayName,
        },
      });
      setCurrentRoom(null);
      // setRooms(rooms.filter((room) => room !== roomId));
    }
  }

  return (
    <div className='w-full border-t border-gray-200 flex justify-between items-center flex-col'>
      <ul className='flex flex-1 flex-col justify-start w-full items-start'>
        {rooms.map((room: Room) => (
          <li
            key={room._id}
            onClick={() => handleJoinRoom(room)}
            className={cn(
              'flex flex-col border-b min-h-[4rem] cursor-pointer border-gray-200 max-w-full w-full py-3 px-2',
              {
                'bg-gray-100': room._id == currentRoom?._id,
              }
            )}
          >
            <div className='text-xs space-y-3 w-full rounded-md text-start font-semibold'>
              <div className='flex space-x-1 items-center overflow-auto justify-between'>
                <p className='overflow-hidden truncate'>{room.name}</p>
                <button
                  className='min-w-fit bg-gray-200 px-1 py-0.5 rounded-md z-10 text-[11px]'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent's onClick
                    shareRoomInvite(room);
                  }}
                >
                  Invite
                </button>
              </div>
              {lastMessages && lastMessages[room._id] && (
                <LastMessage lastMessage={lastMessages[room._id]} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LastMessage({ lastMessage }: { lastMessage: Message }) {
  return (
    <div className='flex items-center justify-between space-x-2'>
      <div className='flex items-center overflow-clip justify-start space-x-1 max-w-fit'>
        <span className='min-w-fit'>{lastMessage.senderDisplayName}: </span>
        <p className='font-normal truncate'>{lastMessage.text}</p>
      </div>
      <span className='text-[0.6rem] font-light text-gray-500'>
        {formatTime(lastMessage.sentAt)}
      </span>
    </div>
  );
}
