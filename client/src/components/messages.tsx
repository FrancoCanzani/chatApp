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
import { cn } from '@/utils/helpers/cn';
import fetcher from '@/utils/helpers/fetcher';
import formatTime from '@/utils/helpers/formatTime';
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
  const user = useContext(UserContext);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR(
    currentRoom ? `${API_URL}/messages/${currentRoom._id}/${limit}` : null,
    fetcher
  );

  const roomMessages = messages.filter(
    (message) => message.roomId == currentRoom?._id
  );

  useEffect(() => {
    if (data && data.messages.length > 0) {
      setMessages((prevMessages) => {
        const newMessages = data.messages.filter(
          (newMessage: Message) =>
            !prevMessages.some((msg) => msg._id === newMessage._id)
        );
        return [...newMessages, ...prevMessages];
      });
    }
  }, [data]);

  return (
    <div className='w-full h-full px-2 pt-3 flex flex-col-reverse scroller overflow-auto'>
      <div className='scroller-content'>
        {data && !data.isEndOfList && (
          <ChatObserverTarget limit={limit} setLimit={setLimit} />
        )}
        {roomMessages.map((message, index) => (
          <div
            key={index}
            className={cn('flex item items-start justify-start', {
              'justify-end': user?.uid == message.senderId,
            })}
          >
            <div
              className={cn(
                'mb-2 rounded-t-md shadow-sm max-w-full lg:max-w-xl px-2 pb-1 flex flex-col',
                {
                  'rounded-l-md bg-gray-50': message.senderId == user?.uid,
                },
                { 'rounded-r-md bg-sky-50': message.senderId != user?.uid }
              )}
            >
              <div
                className={cn(
                  'text-xs w-full space-x-1 font-medium mb-1 flex items-center',
                  {
                    'justify-end': message.senderId == user?.uid,
                  }
                )}
              >
                <span className='text-xs font-medium my-1'>
                  {message.senderId != user?.uid
                    ? `${message.senderDisplayName}, `
                    : 'You, '}
                </span>
                <span className='text-xs font-light'>
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
