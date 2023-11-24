import { Dispatch, SetStateAction } from 'react';
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
    <div className='w-full ring-2 ring-gray-100 bg-gray-50 border p-2 border-gray-100 shadow-gray-100 flex justify-between rounded-md items-center flex-col'>
      <h2 className='text-xs mb-1 pl-0.5 w-full text-start font-semibold'>
        Rooms
      </h2>
      <ul className='flex flex-1 flex-col gap-y-2 justify-start w-full items-start'>
        {rooms.map((room: Room) => (
          <li
            key={room._id}
            onClick={() => handleJoinRoom(room)}
            className={cn(
              'bg-gray-200 text-xs cursor-pointer text-gray-800 flex flex-col gap-y-2 p-2 w-full rounded-md text-start font-semibold',
              {
                'ring-1 ring-gray-300': room._id == currentRoom?._id,
              }
            )}
          >
            <div className='flex items-center justify-between'>
              <p>{room.name}</p>
              <span
                className={cn('h-2 w-2 rounded-full', {
                  'bg-green-500': room._id == currentRoom?._id,
                })}
              ></span>
            </div>
            <span className='text-[11px]'>Id: {room._id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
