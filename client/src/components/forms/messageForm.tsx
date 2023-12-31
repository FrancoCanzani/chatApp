'use client';

import { FormEvent, useState } from 'react';

import { handleSendMessage } from '@/utils/helpers/handleSendMessage';
import { useAuth } from '@/utils/hooks/useAuth';
import { Room } from '@/utils/types';

export function MessageForm({ currentRoom }: { currentRoom: Room | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const { user, loading, error: authError } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (!input || !user || !currentRoom) {
      return;
    }

    await handleSendMessage({
      roomId: currentRoom._id,
      senderId: user.uid,
      senderDisplayName: user.displayName,
      text: input,
    });

    setInput('');
    setIsLoading(false);
  }

  if (!currentRoom) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full bottom-0 border-t-2 border-gray-200 bg-gray-200 py-2'
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
        <button
          type='submit'
          disabled={isLoading}
          className='rounded-md p-[0.4rem] bg-black hover:opacity-90 text-white text-sm'
        >
          Send
        </button>
      </div>
    </form>
  );
}
