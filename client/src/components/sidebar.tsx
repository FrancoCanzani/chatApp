'use client';

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';

import { UserContext } from '@/app/chat/page';
import fetcher from '@/utils/helpers/fetcher';
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
  showSidebar,
  setShowSidebar,
}: {
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  lastMessages: { [key: string]: Message };
  setLastMessages: Dispatch<SetStateAction<{ [key: string]: Message }>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
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
      } relative border-x flex-col border-gray-200 overflow-auto`}
    >
      <UserProfile showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
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
