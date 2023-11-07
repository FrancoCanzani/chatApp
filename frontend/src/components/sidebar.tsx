import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { socket } from '../socket';
import { ConnectionState } from './connectionState';
import { Menu } from 'lucide-react';
import UserSettings from './userSettings';

export function Sidebar({
  room,
  setRoom,
  user,
  setUser,
}: {
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showSidebar, setShowSidebar] = useState(true);

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

  return (
    <>
      <button
        className={`fixed right-5 top-7`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <aside
        className={`${
          showSidebar ? 'w-80' : 'hidden'
        } border-r border-sky-50 rounded-xl overflow-auto`}
      >
        <nav className='flex flex-col gap-2 p-4'>
          <ConnectionState isConnected={isConnected} />
          <UserSettings
            setRoom={setRoom}
            room={room}
            user={user}
            setUser={setUser}
          />
          <h2 className='text-lg font-semibold text-zinc-500 dark:text-zinc-400'>
            Rooms
          </h2>
        </nav>
      </aside>
    </>
  );
}
