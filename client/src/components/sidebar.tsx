'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import CreateRoomForm from './forms/createRoomForm';
import { User } from '@firebase/auth';
import UserProfile from './userProfile';
import JoinRoomForm from './forms/joinRoomForm';
import Rooms from './rooms';

export function Sidebar({
  currentRoom,
  setCurrentRoom,
  user,
}: {
  currentRoom: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  user: User | null | undefined;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [rooms, setRooms] = useState<string[]>([]);
  console.log(rooms);

  return (
    <aside
      className={`${
        showSidebar ? 'w-80' : 'hidden'
      } border-r flex flex-col gap-2 p-4 border-sky-50 rounded-lg overflow-auto`}
    >
      <UserProfile user={user} />
      <CreateRoomForm setRooms={setRooms} user={user} />
      <JoinRoomForm
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
        setRooms={setRooms}
      />
      <Rooms
        currentRoom={currentRoom}
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
        setRooms={setRooms}
        user={user}
      />
    </aside>
  );
}
