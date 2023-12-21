'use client';

import { ChangeEvent } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

import getRooms from '@/utils/helpers/getRooms';
import handleCreateRoom from '@/utils/helpers/handleCreateRoom';
import { useAuth } from '@/utils/hooks/useAuth';
import { NewRoom, Participant, Room, RoomType } from '@/utils/types';

export default function CreateRoomForm({
  setRooms,
  setShowDialog,
}: {
  setRooms: Dispatch<SetStateAction<Room[]>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState('');
  const { user } = useAuth();

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
            id: user.uid,
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
            setShowDialog(false);
          }
        }
      }}
      className='w-full flex justify-start items-center flex-col p-4'
    >
      <h2 className='text-xl capitalize font-bold mb-4 text-start w-full'>
        Create a new room
      </h2>
      <label htmlFor='input' className='w-full text-start text-sm'>
        Name
      </label>
      <input
        id='input'
        value={input}
        onChange={handleChange}
        placeholder='Friends room'
        className='px-2 py-1 w-full text-start rounded-md border'
      />

      <p className='text-gray-700 text-xs flex items-start gap-x-1 p-1 mt-2 rounded-md'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M5 3h14a2 2 0 0 1 2 2v14c0 .53-.21 1.04-.59 1.41c-.37.38-.88.59-1.41.59H5c-.53 0-1.04-.21-1.41-.59C3.21 20.04 3 19.53 3 19V5c0-1.11.89-2 2-2m7.3 4.29c-.19.21-.3.45-.3.71c0 .27.11.5.3.71c.2.19.44.29.7.29c.27 0 .5-.1.71-.29c.19-.21.29-.44.29-.71c0-.26-.1-.5-.29-.71C13.5 7.11 13.27 7 13 7c-.26 0-.5.11-.7.29m-2.5 4.68c-.1.09-.1.1-.03.2l.05.08l.03.06c.07.13.08.13.19.05c.13-.09.35-.23.72-.45c.92-.59.74.09.33 1.59c-.22.83-.5 1.89-.71 3.12c-.24 1.75 1.33.85 1.74.58c.38-.24 1.32-.9 1.54-1.05l.04-.02c.12-.09.07-.13-.02-.27l-.06-.08c-.08-.11-.16-.03-.16-.03l-.16.11c-.45.3-1.07.73-1.17.39c-.09-.25.28-1.61.66-3c.17-.61.34-1.25.47-1.78l.02-.06c.07-.44.22-1.29-.51-1.23c-.8.07-2.97 1.79-2.97 1.79'
          />
        </svg>
        We just need a name right now. You&apos;ll be able to set up your room
        later.
      </p>
      <div className='w-full mt-6 flex items-center justify-center space-x-2'>
        <button
          type='button'
          onClick={() => {
            setShowDialog(false);
            setInput('');
          }}
          className='p-2 text-sm bg-gray-200 rounded-md w-full hover:bg-gray-300'
        >
          Close
        </button>
        <button
          type='submit'
          className='p-2 text-sm bg-gray-900 rounded-md text-white w-full hover:bg-gray-950'
        >
          Create
        </button>
      </div>
    </form>
  );
}
