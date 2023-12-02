'use client';

import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { cn } from '@/utils/functions/cn';
import fetcher from '@/utils/functions/fetcher';
import formatTime from '@/utils/functions/formatTime';
import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

import { ChatObserverTarget } from './chatObserverTarget';

export function Messages({
  messages,
  setMessages,
  currentRoom,
}: {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  currentRoom: Room | null;
}) {
  const [limit, setLimit] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const { user, loading, error: authError } = useAuth();
  const { data, error, isLoading } = useSWR(
    currentRoom
      ? `http://localhost:3000/messages/${currentRoom._id}/${limit}`
      : null,
    fetcher
  );

  const roomMessages = messages.filter(
    (message) => message.roomId == currentRoom?._id
  );

  useEffect(() => {
    if (data && data.messages.length > 0) {
      setMessages((prevMessages) => [...data.messages, ...prevMessages]);
    }
  }, [data]);

  return (
    <div
      className={cn('w-full h-full px-2 pb-14 flex', {
        'flex-col-reverse scroller  overflow-auto': !isLoading,
      })}
    >
      <div className='scroller-content'>
        {data && !data.isEndOfList && (
          <ChatObserverTarget limit={limit} setLimit={setLimit} />
        )}

        {roomMessages.map((message, index) => (
          <div
            key={index}
            className={cn('flex item items-center justify-start', {
              'justify-end': user?.uid == message.senderId,
            })}
          >
            <div className='rounded-md mb-2 shadow-sm border max-w-full lg:max-w-xl px-2 py-1 flex flex-col bg-gray-50'>
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
          </div>
        ))}
      </div>
    </div>
  );
}
