'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';

import fetcher from '@/utils/functions/fetcher';
import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

import CreateRoomForm from './forms/createRoomForm';
import JoinRoomForm from './forms/joinRoomForm';
import Rooms from './rooms';
import UserProfile from './userProfile';

export function Sidebar({
  currentRoom,
  setCurrentRoom,
  lastMessages,
}: {
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  lastMessages: { [key: string]: Message };
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { user, loading, error: authError } = useAuth();

  const { data, error, isLoading } = useSWR(
    user ? `http://localhost:3000/rooms/participants/${user.uid}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [user, data]);

  return (
    <aside
      className={`${
        showSidebar ? 'w-[34rem]' : 'hidden'
      } border-r flex flex-col gap-2 p-2 border-gray-50 rounded-md overflow-auto`}
    >
      <UserProfile user={user} />
      <CreateRoomForm user={user} setRooms={setRooms} />
      <JoinRoomForm user={user} setRooms={setRooms} />
      <Rooms
        currentRoom={currentRoom}
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
        lastMessages={lastMessages}
      />
    </aside>
  );
}
