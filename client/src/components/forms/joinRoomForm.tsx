'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useContext } from 'react';

import { UserContext } from '@/app/page';
import getRooms from '@/utils/helpers/getRooms';
import { Room } from '@/utils/types';

import Button from '../button';
export default function JoinRoomForm({
  setRooms,
}: {
  setRooms: Dispatch<SetStateAction<Room[]>>;
}) {
  const [input, setInput] = useState('');
  const user = useContext(UserContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleJoinRoom(userId: string) {
    try {
      const res = await fetch(
        `http://localhost:3000/rooms/${input}/add-participant/${userId}`,
        {
          method: 'PATCH',
        }
      );

      if (res.ok) {
        setInput('');
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  }
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (user) {
          await handleJoinRoom(user?.uid);
          const rooms = await getRooms(user.uid);
          setRooms(rooms);
          setInput('');
        }
      }}
      className='w-full min-h-[4.5rem] h-max border-b border-gray-200 bg-gray-50 flex justify-between items-center flex-col'
    >
      <h1 className='w-full text-start text-xs text-gray-900 font-medium mb-2 pl-2 pt-2'>
        Join Room
      </h1>
      <div className='space-x-2 h-full bg-white w-full flex items-center justify-start'>
        <input
          id='input'
          value={input}
          onChange={handleChange}
          autoComplete='off'
          placeholder='Room id'
          className='h-full w-full px-2 py-1 text-xs outline-none'
        />
        <Button
          variant={'submit'}
          size={'small'}
          className='px-2 py-1 h-full text-xs'
        >
          Join
        </Button>
      </div>
    </form>
  );
}
