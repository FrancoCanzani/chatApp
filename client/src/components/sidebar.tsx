'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import { Message, Room } from '@/utils/types';

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
  // Effect for automatically closing the sidebar when the current room changes
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
      } relative flex-col overflow-auto`}
    >
      <UserProfile showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <CreateRoomForm setRooms={setRooms} />
      <Rooms
        currentRoom={currentRoom}
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
        lastMessages={lastMessages}
        setLastMessages={setLastMessages}
      />
    </aside>
  );
}
