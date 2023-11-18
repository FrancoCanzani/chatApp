'use client';

import { ChangeEvent } from 'react';
import Button from '../button';
import { useState } from 'react';
import { User } from 'firebase/auth';
import handleCreateRoom from '@/utils/functions/handleCreateRoom';
import { NewRoom, RoomType } from '@/utils/types';

export default function CreateRoomForm({
  user,
}: {
  user: User | null | undefined;
}) {
  const [input, setInput] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (user) {
          const roomData: NewRoom = {
            roomName: input,
            roomType: 'private' as RoomType,
            participants: [user?.uid],
            administrators: [user?.uid],
            creatorId: user?.uid,
          };
          const newRoom = await handleCreateRoom(roomData);

          if (newRoom) {
            setInput('');
          }
        }
      }}
      className='w-full ring-2 ring-gray-100 bg-gray-50 border p-2 border-gray-100 shadow-gray-100 flex justify-between rounded-md items-center flex-col'
    >
      <h1 className='w-full text-start text-sm text-gray-800 font-medium mb-3'>
        Create a new room
      </h1>
      <div className='space-x-2'>
        <input
          id='input'
          value={input}
          onChange={handleChange}
          autoComplete='off'
          placeholder='Room name'
          className='rounded-lg w-2/3 px-2 py-1 outline-none'
        />
        <Button
          variant={'submit'}
          size={'small'}
          className='px-2 py-1 rounded-lg'
        >
          Create
        </Button>
      </div>
    </form>
  );
}
