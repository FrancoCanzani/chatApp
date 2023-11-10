'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { socket } from '../socket';
import { ConnectionState } from './connectionState';
// import { Menu } from 'lucide-react';
import RoomForm from './roomForm';
import { User } from '@firebase/auth';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import Button from './button';

export function Sidebar({
  currentRoom,
  setCurrentRoom,
  user,
}: {
  currentRoom: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  user: User | null | undefined;
}) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [rooms, setRooms] = useState<(typeof currentRoom)[]>([]);

  function handleJoinRoom(roomId: string) {
    if (roomId) {
      socket.emit('joinRoom', {
        roomName: roomId,
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
        roomName: roomId,
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
    <aside
      className={`${
        showSidebar ? 'w-80' : 'hidden'
      } border-r flex flex-col gap-2 p-4 border-sky-50 rounded-lg overflow-auto`}
    >
      <div className='w-full ring-2 ring-gray-100 bg-gray-50 border p-2 border-gray-100 shadow-gray-100 flex justify-between rounded-md items-center'>
        <div className='flex items-center justify-center gap-2'>
          <Image
            src={user?.photoURL ?? '/default-avatar.png'}
            width={28}
            height={28}
            alt='profile pic'
            className='rounded-md'
          />
          <span className='text-sm font-medium text-gray-800'>
            {user?.displayName}
          </span>
        </div>
        <ConnectionState
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
      <RoomForm
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
        setRooms={setRooms}
      />
      <div className='bg-yellow-100 flex flex-col p-2 rounded-lg h-full'>
        <h2 className='text-lg p-1 font-semibold'>Rooms</h2>
        <ul className='flex flex-1 flex-col gap-y-2 justify-start w-full items-start'>
          {rooms.map((room) => (
            <li className='bg-blue-50 hover:bg-blue-100 flex items-center justify-between p-2 w-full rounded-lg text-start text-sm font-semibold'>
              <span>{room}</span>
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
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
