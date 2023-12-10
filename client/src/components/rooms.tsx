import { Dispatch, SetStateAction, useEffect } from 'react';
import useSWR from 'swr';

import { socket } from '@/socket';
import { cn } from '@/utils/helpers/cn';
import { copyToClipboard } from '@/utils/helpers/copyToClipboard';
import fetcher from '@/utils/helpers/fetcher';
import formatTime from '@/utils/helpers/formatTime';
import { shareRoomInvite } from '@/utils/helpers/shareRoomInvite';
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
    user ? `${API_URL}/messages/last/${user.uid}` : null,
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

  async function handleLeaveRoom(roomId: string | undefined) {
    if (roomId && user?.uid) {
      try {
        const res = await fetch(
          `http://localhost:3000/rooms/${roomId}/remove-participant/${user.uid}`,
          {
            method: 'PATCH',
          }
        );

        if (res.ok) {
          setCurrentRoom(null);
        } else {
          console.error('Error leaving room:', await res.json());
        }
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    }
  }

  return (
    <div className='w-full border-gray-200 flex justify-between items-center flex-col'>
      <ul className='flex flex-1 flex-col justify-start w-full items-start'>
        {rooms.map((room: Room) => (
          <li
            key={room._id}
            onClick={() => handleJoinRoom(room)}
            className={cn(
              'flex flex-col relative border-b min-h-[4.5rem] p-2 cursor-pointer border-gray-200 max-w-full w-full',
              {
                'bg-gray-50': room._id == currentRoom?._id,
              }
            )}
          >
            <div
              className={cn(
                'text-xs space-y-3 w-full h-full rounded-md text-start'
              )}
            >
              <div className='flex space-x-1 items-center overflow-auto justify-between'>
                <p className='overflow-hidden font-semibold capitalize truncate'>
                  {room.name}
                </p>
                <div className='space-x-2'>
                  <button
                    className='min-w-max bg-gray-200 px-1 py-0.5 rounded-sm text-[11px]'
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(room._id);
                    }}
                  >
                    Copy ID
                  </button>
                  <button
                    className='min-w-max bg-gray-200 px-1 py-0.5 rounded-sm text-[11px]'
                    onClick={(e) => {
                      e.stopPropagation();
                      shareRoomInvite(room);
                    }}
                  >
                    Invite
                  </button>
                  <button
                    className='bg-red-100 hover:bg-red-200 px-1 py-0.5'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeaveRoom(currentRoom?._id);
                    }}
                  >
                    Leave
                  </button>
                </div>
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
