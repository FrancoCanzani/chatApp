'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import CreateRoomForm from './forms/createRoomForm';
import { User } from '@firebase/auth';
import UserProfile from './userProfile';
import JoinRoomForm from './forms/joinRoomForm';
import Rooms from './rooms';
import { Room } from '@/utils/types';

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
  console.log(rooms);

  async function getRooms(userId: string) {
    try {
      const res = await fetch(
        `http://localhost:3000/rooms/participants/${userId}`
      );
      if (res.ok) {
        const rooms = await res.json();
        return rooms;
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchRooms() {
      if (user) {
        const rooms = await getRooms(user.uid);
        setRooms(rooms);
        console.log(rooms);
      }
    }
    fetchRooms();
  }, [user]);

  return (
    <aside
      className={`${
        showSidebar ? 'w-80' : 'hidden'
      } border-r flex flex-col gap-2 p-4 border-sky-50 rounded-lg overflow-auto`}
    >
      <UserProfile user={user} />
      <CreateRoomForm user={user} />
      <JoinRoomForm user={user} />
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
