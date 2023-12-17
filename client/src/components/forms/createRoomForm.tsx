'use client';

import { ChangeEvent } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useContext } from 'react';

import { UserContext } from '@/app/chat/page';
import getRooms from '@/utils/helpers/getRooms';
import handleCreateRoom from '@/utils/helpers/handleCreateRoom';
import { NewRoom, Participant, Room, RoomType } from '@/utils/types';

import Button from '../button';

export default function CreateRoomForm({
  setRooms,
}: {
  setRooms: Dispatch<SetStateAction<Room[]>>;
}) {
  const [input, setInput] = useState('');
  const user = useContext(UserContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (user) {
          const participant: Participant = {
            name: user.displayName ?? 'Unknown Name',
            email: user.email ?? 'No Email',
            photo: user.photoURL,
            id: user.uid, // uid is always non-null for a logged-in user
          };

          const roomData: NewRoom = {
            name: input,
            type: 'private' as RoomType,
            participants: [participant],
            administrators: [user?.uid],
            creatorUid: user?.uid,
          };

          const newRoom = await handleCreateRoom(roomData);

          if (newRoom) {
            const rooms = await getRooms(user.uid);
            setRooms(rooms);
            setInput('');
          }
        }
      }}
      className='w-full min-h-[4.5rem] h-max border-b border-gray-200 bg-gray-50 flex justify-between items-center flex-col'
    >
      <h1 className='w-full text-start text-xs text-gray-900 font-medium mb-2 pl-2 pt-2'>
        New Room
      </h1>
      <div className='space-x-2 h-full bg-white w-full flex items-center justify-start'>
        <input
          id='input'
          value={input}
          onChange={handleChange}
          autoComplete='off'
          placeholder='Room name'
          className='h-full w-full px-2 py-1 text-xs outline-none'
        />
        <Button
          variant={'submit'}
          size={'small'}
          className='px-2 py-1 h-full text-xs'
        >
          Create
        </Button>
      </div>
    </form>
  );
}
