'use client';

import { User } from '@firebase/auth';
import { Message, Room } from '@/utils/types';
import { cn } from '@/utils/functions/cn';
import { useRef, useEffect } from 'react';

export function Messages({
  messages,
  user,
  currentRoom,
}: {
  messages: Message[];
  user: User | null | undefined;
  currentRoom: Room | null;
}) {
  const roomMessages = messages.filter(
    (message) => message.roomId == currentRoom?._id
  );

  const bottomListRef = useRef(null);

  useEffect(() => {
    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ol className='pb-[3.5rem] w-full px-3 overflow-auto flex flex-col items-start justify-start'>
      {roomMessages.map((message, index) => (
        <li
          key={index}
          ref={index === roomMessages.length - 1 ? bottomListRef : null}
          className={`flex w-full items-center mb-2 ${
            user?.displayName == message.name ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={cn(
              `rounded-md shadow-sm border max-w-full lg:max-w-xl px-2 py-1 flex flex-col bg-gray-50`
            )}
          >
            {message.name != user?.displayName && (
              <span className='text-xs font-semibold my-1'>{message.name}</span>
            )}
            <p className='text-sm'>{message.message}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
