'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { useAuth } from '@/utils/hooks/useAuth';
import { Message, Room } from '@/utils/types';

import { socket } from '../../socket';
import Button from '../button';

export function MessageForm({
  setMessages,
  currentRoom,
}: {
  setMessages: Dispatch<SetStateAction<Message[]>>;
  currentRoom: Room | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const { user, loading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (input && user && currentRoom) {
      const messageData = {
        roomId: currentRoom._id,
        senderId: user.uid,
        senderDisplayName: user.displayName,
        text: input,
      };

      try {
        const response = await fetch('http://localhost:3000/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newMessage = await response.json();

        socket.emit('messageToRoom', {
          roomId: currentRoom._id,
          message: newMessage,
        });
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setInput('');
        setIsLoading(false);
      }
    }
  };

  if (!currentRoom) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full bottom-0 border-t-2 z-10 border-gray-300 bg-gray-200 mt-2 py-2'
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
