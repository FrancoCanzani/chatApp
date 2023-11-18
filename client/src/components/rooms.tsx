import { Dispatch, SetStateAction } from 'react';
import Button from './button';
import { User } from 'firebase/auth';
import { socket } from '@/socket';
import { cn } from '@/utils/functions/cn';
import { Room } from '@/utils/types';

export default function Rooms({
  user,
  rooms,
  setRooms,
  currentRoom,
  setCurrentRoom,
}: {
  user: User | null | undefined;
  rooms: string[];
  setRooms: Dispatch<SetStateAction<string[]>>;
  currentRoom: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
}) {
  function handleJoinRoom(roomId: string) {
    if (roomId) {
      socket.emit('joinRoom', {
        roomId: roomId,
        user: {
          id: user?.uid,
          name: user?.displayName,
        },
      });
      setCurrentRoom(roomId);
    }
  }

  function handleLeaveRoom(roomId: string) {
    if (roomId) {
      socket.emit('leaveRoom', {
        roomId: roomId,
        user: {
          id: user?.uid,
          name: user?.displayName,
        },
      });
      setCurrentRoom('');
      setRooms(rooms.filter((room) => room !== roomId));
    }
  }
  return (
    <div className='bg-yellow-100 flex flex-col p-2 rounded-lg h-full'>
      <h2 className='text-lg p-1 font-semibold'>Rooms</h2>
      <ul className='flex flex-1 flex-col gap-y-2 justify-start w-full items-start'>
        {rooms.map((room: string) => (
          <li
            key={room}
            className='bg-blue-50 hover:bg-blue-100 flex flex-col gap-y-2 p-2 w-full rounded-lg text-start text-sm font-semibold'
          >
            <div className='flex items-center justify-between'>
              <div className='space-x-2'>
                <Button
                  onClick={() => handleJoinRoom(room)}
                  disabled={room == currentRoom}
                  className={cn({
                    'opacity-75': room == currentRoom,
                  })}
                >
                  Enter chat
                </Button>
                <Button
                  variant={'primary'}
                  size={'small'}
                  onClick={() => handleLeaveRoom(currentRoom)}
                >
                  Leave room
                </Button>
              </div>
            </div>
            <span className='text-[11px]'>Id: {room}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
