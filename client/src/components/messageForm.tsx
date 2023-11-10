'use client';

import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { socket } from '../socket';
import { message } from '@/utils/types';
import { User } from '@firebase/auth';
import Button from './button';

export function MessageForm({
  user,
  setMessages,
  currentRoom,
}: {
  user: User | null | undefined;
  setMessages: Dispatch<SetStateAction<message[]>>;
  currentRoom: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (input && user) {
      const message = {
        name: user?.displayName ?? 'Anonymous',
        message: input,
        room: currentRoom,
      };
      // Client-side code to join a room
      socket.emit('messageToRoom', { roomName: currentRoom, message: message });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
      setIsLoading(false);
    }
  };

  return (
    <form
      id='form'
      onSubmit={handleSubmit}
      className='w-full space-x-4 inset-x-0 mx-auto flex items-center justify-center'
    >
      <input
        autoFocus
        id='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete='off'
        placeholder='Message'
        className='rounded-md w-4/5 px-4 outline-none py-2 ring border border-gray-200 ring-gray-50'
      />
      <Button
        type='submit'
        disabled={isLoading}
        variant={'send'}
        size={'medium'}
      >
        Send
      </Button>
    </form>
  );
}
