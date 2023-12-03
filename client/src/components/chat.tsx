import { Dispatch, SetStateAction } from 'react';

import { Message, Room } from '../utils/types';
import { MessageForm } from './forms/messageForm';
import { Messages } from './messages';
import RoomChatInfo from './roomChatInfo';

export default function Chat({
  currentRoom,
  messages,
  setMessages,
}: {
  currentRoom: Room | null;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}) {
  return (
    <main className='w-full relative overflow-hidden ring-4 ring-gray-100 border-2 border-gray-300 shadow-gray-100 flex justify-start m-3 rounded-md items-start flex-col'>
      <RoomChatInfo currentRoom={currentRoom} />
      <Messages
        messages={messages}
        setMessages={setMessages}
        currentRoom={currentRoom}
      />
      <MessageForm setMessages={setMessages} currentRoom={currentRoom} />
    </main>
  );
}
