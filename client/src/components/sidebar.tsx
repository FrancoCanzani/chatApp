'use client';

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';

import { UserContext } from '@/app/page';
import fetcher from '@/utils/functions/fetcher';
import { Message, Room } from '@/utils/types';

import CreateRoomForm from './forms/createRoomForm';
import JoinRoomForm from './forms/joinRoomForm';
import Rooms from './rooms';
import UserProfile from './userProfile';

export function Sidebar({
  currentRoom,
  setCurrentRoom,
  lastMessages,
  setLastMessages,
}: {
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  lastMessages: { [key: string]: Message };
  setLastMessages: Dispatch<SetStateAction<{ [key: string]: Message }>>;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const user = useContext(UserContext);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR(
    user ? `${API_URL}/rooms/participants/${user.uid}` : null,
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
      } border-r flex flex-col gap-2 border-gray-200 overflow-auto`}
    >
      <UserProfile />
      <CreateRoomForm setRooms={setRooms} />
      <JoinRoomForm setRooms={setRooms} />
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
