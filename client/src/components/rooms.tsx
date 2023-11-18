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
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
}) {
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
    <div className='bg-yellow-100 flex flex-col overflow-auto p-2 rounded-lg h-full'>
      <h2 className='text-lg p-1 font-semibold'>Rooms</h2>
      <ul className='flex overflow-y-scroll flex-1 flex-col gap-y-2 justify-start w-full items-start'>
        {rooms.map((room: Room) => (
          <li
            key={room._id}
            className='bg-blue-50 hover:bg-blue-100 flex flex-col gap-y-2 p-2 w-full rounded-lg text-start text-sm font-semibold'
          >
            <div className='flex items-center justify-between'>
              <div className='space-x-2'>
                <Button
                  onClick={() => handleJoinRoom(room)}
                  disabled={room._id == currentRoom?._id}
                  className={cn({
                    'opacity-75': room._id == currentRoom?._id,
                  })}
                >
                  Enter chat
                </Button>
                <Button
                  variant={'primary'}
                  size={'small'}
                  onClick={() => handleLeaveRoom(currentRoom?._id)}
                >
                  Leave room
                </Button>
              </div>
            </div>
            <span className='text-[11px]'>Id: {room._id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
