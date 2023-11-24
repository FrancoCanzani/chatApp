'use client';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Button from '../button';
import { useState } from 'react';
import { User } from 'firebase/auth';

export default function JoinRoomForm({
  user,
}: {
  user: User | null | undefined;
}) {
  const [input, setInput] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleJoinRoom(userId: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/rooms/${input}/add-participant/${userId}`,
        {
          method: 'PATCH',
        }
      );
    } catch (error) {
      console.error('Error joining room:', error);
    }

    setInput('');
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (user) {
          handleJoinRoom(user?.uid);
          setInput('');
        }
      }}
      className='w-full ring-2 ring-gray-100 bg-gray-50 border p-1 border-gray-100 shadow-gray-100 flex justify-between rounded-md items-center flex-col'
    >
      <h1 className='w-full text-start text-xs text-gray-800 font-medium mb-1 pl-1'>
        Join a room
      </h1>
      <div className='space-x-2 w-full flex items-center justify-center'>
        <input
          id='input'
          value={input}
          onChange={handleChange}
          autoComplete='off'
          placeholder='Room id'
          className='rounded-md w-3/4 px-2 py-1 text-xs outline-none'
        />
        <Button
          variant={'submit'}
          size={'small'}
          className='px-2 py-1 text-xs rounded-md'
        >
          Join
        </Button>
      </div>
    </form>
  );
}
