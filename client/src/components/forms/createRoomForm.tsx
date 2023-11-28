'use client';

import { User } from 'firebase/auth';
import { ChangeEvent } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

import getRooms from '@/utils/functions/getRooms';
import handleCreateRoom from '@/utils/functions/handleCreateRoom';
import { NewRoom, Room, RoomType } from '@/utils/types';

import Button from '../button';

export default function CreateRoomForm({
  user,
  setRooms,
}: {
  user: User | null | undefined;
  setRooms: Dispatch<SetStateAction<Room[]>>;
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
            const rooms = await getRooms(user.uid);
            setRooms(rooms);
            setInput('');
          }
        }
      }}
      className='w-full ring-2 ring-gray-100 bg-gray-50 border p-1 border-gray-100 shadow-gray-100 flex justify-between rounded-md items-center flex-col'
    >
      <h1 className='w-full text-start text-xs text-gray-800 font-medium mb-1 pl-1'>
        New Room
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
          Create
        </Button>
      </div>
    </form>
  );
}
