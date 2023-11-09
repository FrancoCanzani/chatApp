'use client';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Button from './button';
import { useState } from 'react';
export default function UserSettings({
  room,
  setRoom,
  setRooms,
}: {
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  setRooms: Dispatch<SetStateAction<string[]>>;
}) {
  const [input, setInput] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setRooms((prevRooms) => [...prevRooms, input]);
        setInput('');
      }}
      className='mb-3 bg-gray-100 p-3 rounded-lg flex flex-col items-center justify-center'
    >
      <h1 className='w-full text-start text-sm font-semibold mb-3'>
        Create a new room
      </h1>
      <div className='space-x-2'>
        <input
          id='input'
          value={input}
          onChange={handleChange}
          autoComplete='off'
          placeholder='Room id'
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
