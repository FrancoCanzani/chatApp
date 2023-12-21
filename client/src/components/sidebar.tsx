'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Message, Room } from '@/utils/types';

import Dialog from './dialog';
import CreateRoomForm from './forms/createRoomForm';
import Rooms from './rooms';
import UserProfile from './userProfile';

interface SidebarProps {
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  lastMessages: { [key: string]: Message };
  setLastMessages: Dispatch<SetStateAction<{ [key: string]: Message }>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({
  rooms,
  setRooms,
  currentRoom,
  setCurrentRoom,
  lastMessages,
  setLastMessages,
  showSidebar,
  setShowSidebar,
}: SidebarProps) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (currentRoom) {
      setShowSidebar(false);
    }
  }, [currentRoom]);

  return (
    <aside
      className={`${
        showSidebar
          ? 'flex w-full md:w-2/5 lg:w-1/4 '
          : 'hidden w-0 sm:w-2/5 lg:w-1/4 sm:flex'
      } relative flex-col overflow-auto justify-between`}
    >
      <div>
        <div className='flex items-center justify-between p-2'>
          <h2 className='leading-7 text-gray-800 font-semibold text-sm'>
            Chat Rooms
          </h2>
          <button
            className='rounded-md text-xs border hover:bg-gray-50 p-2'
            aria-haspopup='dialog'
            onClick={() => setShowDialog(!showDialog)}
          >
            New Room
          </button>
          <Dialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            className='p-2 rounded-md min-w-[23rem]'
          >
            <CreateRoomForm setRooms={setRooms} setShowDialog={setShowDialog} />
          </Dialog>
        </div>
        <Rooms
          currentRoom={currentRoom}
          rooms={rooms}
          setCurrentRoom={setCurrentRoom}
          lastMessages={lastMessages}
          setLastMessages={setLastMessages}
        />
      </div>
      <UserProfile showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </aside>
  );
}
