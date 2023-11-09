'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { socket } from '../socket';
import { ConnectionState } from './connectionState';
// import { Menu } from 'lucide-react';
import UserSettings from './userSettings';
import { User } from '@firebase/auth';
import Image from 'next/image';

export function Sidebar({
  room,
  setRoom,
  user,
}: {
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  user: User | null | undefined;
}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showSidebar, setShowSidebar] = useState(true);
  const [rooms, setRooms] = useState<(typeof room)[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Clean up the effect
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  function handleJoinRoom(roomId: string) {
    if (roomId) {
      socket.emit('joinRoom', { roomName: roomId });
      setRoom(roomId);
    }
  }

  return (
    <aside
      className={`${
        showSidebar ? 'w-80' : 'hidden'
      } border-r flex flex-col gap-2 p-4 border-sky-50 rounded-lg overflow-auto`}
    >
      <div className='flex items-center justify-between p-2 rounded-lg bg-gray-100 w-full'>
        <div className='p-2 rounded-lg flex items-center justify-center gap-2'>
          <Image
            src={user?.photoURL ?? '/client/public/default-avatar.png'}
            width={25}
            height={25}
            alt='profile pic'
            className='rounded-full'
          />
          <span className='text-sm font-semibold'>{user?.displayName}</span>
        </div>
        <ConnectionState
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
      <UserSettings setRoom={setRoom} room={room} setRooms={setRooms} />
      <div className='bg-yellow-100 flex flex-col p-2 rounded-lg h-full'>
        <h2 className='text-lg p-1 font-semibold'>Rooms</h2>
        <nav className='flex flex-1 flex-col gap-y-2 justify-start w-full items-start'>
          {rooms.map((room) => (
            <button
              onClick={() => handleJoinRoom(room)}
              className='bg-blue-200 hover:bg-blue-300 p-2 w-full rounded-lg text-start text-sm font-semibold'
            >
              {room}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
