import { Dispatch, SetStateAction } from 'react';

import { Message, Room } from '../utils/types';
import { MessageForm } from './forms/messageForm';
import { Messages } from './messages';
import RoomChatInfo from './roomChatInfo';
import { RoomSelectionPrompt } from './skeletons/roomSelectionPrompt';

export default function Chat({
  currentRoom,
  messages,
  setMessages,
  showSidebar,
  setShowSidebar,
}: {
  currentRoom: Room | null;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  if (!currentRoom) {
    return <RoomSelectionPrompt showSidebar={showSidebar} />;
  }

  return (
    <main
      className={`${
        showSidebar
          ? 'hidden sm:flex md:w-3/4 sm:w-3/5'
          : 'md:w-3/4 sm:w-3/5 w-full'
      } overflow-hidden min-h-full flex justify-start items-start flex-col`}
    >
      <RoomChatInfo
        currentRoom={currentRoom}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Messages
        messages={messages}
        setMessages={setMessages}
        currentRoom={currentRoom}
      />
      <MessageForm setMessages={setMessages} currentRoom={currentRoom} />
    </main>
  );
}
