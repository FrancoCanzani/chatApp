'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import CreateRoomForm from './forms/createRoomForm';
import { User } from '@firebase/auth';
import UserProfile from './userProfile';
import JoinRoomForm from './forms/joinRoomForm';
import Rooms from './rooms';
import { Room } from '@/utils/types';
import getRooms from '@/utils/functions/getRooms';

export function Sidebar({
  currentRoom,
  setCurrentRoom,
  user,
}: {
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  user: User | null | undefined;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function fetchRooms() {
      if (user) {
        const rooms = await getRooms(user.uid);
        setRooms(rooms);
      }
    }
    fetchRooms();
  }, [user]);

  return (
    <aside
      className={`${
        showSidebar ? 'w-96' : 'hidden'
      } border-r flex flex-col gap-2 p-4 border-sky-50 rounded-md overflow-auto`}
    >
      <UserProfile user={user} />
      <CreateRoomForm user={user} setRooms={setRooms} />
      <JoinRoomForm user={user} setRooms={setRooms} />
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
