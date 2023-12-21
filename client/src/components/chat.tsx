import { Dispatch, SetStateAction } from 'react';

import { Message, Room } from '../utils/types';
import { MessageForm } from './forms/messageForm';
import { Messages } from './messages';
import RoomChatInfo from './roomChatInfo';
import { RoomSelectionPrompt } from './skeletons/roomSelectionPrompt';

export default function Chat({
  rooms,
  setRooms,
  currentRoom,
  setCurrentRoom,
  messages,
  setMessages,
  showSidebar,
  setShowSidebar,
}: {
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  if (!currentRoom) {
    return (
      <RoomSelectionPrompt
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    );
  }

  return (
    <main
      className={`${
        showSidebar
          ? 'hidden md:flex md:w-3/4 sm:w-3/5 w-full'
          : 'md:w-3/4 sm:w-3/5 min-w-0 w-full'
      } overflow-hidden min-h-full flex bg-gray-100 justify-start items-start flex-col transition-all duration-300`}
    >
      <RoomChatInfo
        rooms={rooms}
        setRooms={setRooms}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Messages
        messages={messages}
        setMessages={setMessages}
        currentRoom={currentRoom}
      />
      <MessageForm currentRoom={currentRoom} />
    </main>
  );
}
