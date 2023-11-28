'use client';

import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import useSWR from 'swr';

import { cn } from '@/utils/functions/cn';
import fetcher from '@/utils/functions/fetcher';
import formatTime from '@/utils/functions/formatTime';
import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

export function Messages({
  messages,
  setMessages,
  currentRoom,
}: {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  currentRoom: Room | null;
}) {
  const { user, loading, error: authError } = useAuth();
  const { data, error, isLoading } = useSWR(
    currentRoom ? `http://localhost:3000/messages/${currentRoom._id}` : null,
    fetcher
  );

  const roomMessages = messages.filter(
    (message) => message.roomId == currentRoom?._id
  );

  const bottomListRef = useRef(null);

  useEffect(() => {
    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader2 className='animate-spin m-auto' />;
  }

  return (
    <ol className='pb-[3.5rem] w-full px-3 overflow-auto flex flex-col items-start justify-start'>
      {roomMessages.map((message, index) => (
        <li
          key={index}
          ref={index === roomMessages.length - 1 ? bottomListRef : null}
          className={`flex w-full items-center mb-2 ${
            user?.uid == message.senderId ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={cn(
              `rounded-md shadow-sm border max-w-full lg:max-w-xl px-2 py-1 flex flex-col bg-gray-50`
            )}
          >
            <div>
              <span className='text-xs font-medium my-1'>
                {message.senderId != user?.uid
                  ? `${message.senderDisplayName}, `
                  : 'You, '}
              </span>
              <span className='text-xs'>
                {message.sentAt ? formatTime(message.sentAt) : '⏳'}
              </span>
            </div>
            <p className='text-sm'>{message.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
