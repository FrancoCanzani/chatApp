'use client';

import { ArrowDownToLine } from 'lucide-react';
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
  const [showScrollButton, setShowScrollButton] = useState(false);
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

  const bottomRef = useRef<null | HTMLDivElement>(null);

  function handleScrollToBottom() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'end',
      });
    }
    // There has to be a delay because the scroll to bottom triggers the on scroll
    setTimeout(() => {
      setShowScrollButton(false);
    }, 50);
  }

  return (
    <div
      className={
        'w-full h-full px-2 flex flex-col-reverse scroller overflow-auto'
      }
      onScroll={() => setShowScrollButton(true)}
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
        {showScrollButton && (
          <button
            className='sticky bottom-3 left-1/2 bg-gray-100 rounded-full p-2 -translate-x-1/2'
            onClick={handleScrollToBottom}
            aria-label='scroll to bottom'
          >
            <ArrowDownToLine size={20} />
          </button>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
