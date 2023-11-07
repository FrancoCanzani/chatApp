import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { socket } from '../socket';

export default function UserSettings({
  room,
  setRoom,
  user,
  setUser,
}: {
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setRoom(e.target.value);
  }

  function handleJoinRoom() {
    if (room) {
      socket.emit('joinRoom', { roomName: room });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleJoinRoom();
      }}
    >
      <div className='mb-3'>
        <input
          id='room'
          value={room}
          onChange={handleChange}
          autoComplete='off'
          placeholder='Room'
          className='rounded-md px-2 py-1 ring-1 ring-inset ring-gray-200'
        />
        <button type='submit' className='ml-2 bg-gray-200 px-2 py-1 rounded-md'>
          Join
        </button>
      </div>
      <input
        id='user'
        value={user}
        onChange={(e) => setUser(e.target.value)}
        autoComplete='off'
        placeholder='Name'
        className='rounded-md px-2 py-1 ring-1 ring-inset ring-gray-200'
      />
    </form>
  );
}
