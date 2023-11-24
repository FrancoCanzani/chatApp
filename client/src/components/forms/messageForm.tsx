'use client';

import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { socket } from '../../socket';
import { Message, Room } from '@/utils/types';
import { User } from '@firebase/auth';
import Button from '../button';

export function MessageForm({
  user,
  setMessages,
  currentRoom,
}: {
  user: User | null | undefined;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  currentRoom: Room | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (input && user && currentRoom) {
      const message = {
        name: user?.displayName ?? 'Anonymous',
        message: input,
        roomId: currentRoom?._id,
      };
      socket.emit('messageToRoom', {
        roomId: currentRoom._id,
        message: message,
      });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full absolute bottom-0 border-t-2 z-10 border-gray-300 bg-gray-200 mt-2 py-2'
    >
      <div className='w-5/6 space-x-2 inset-x-0 mx-auto flex items-center justify-center'>
        <input
          autoFocus
          id='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete='off'
          placeholder='Message'
          className='rounded-md text-sm w-4/5 px-4 outline-none py-2'
        />
        <Button
          type='submit'
          disabled={isLoading}
          variant={'send'}
          size={'medium'}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
