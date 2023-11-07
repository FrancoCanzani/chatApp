import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { socket } from '../socket';
import { message } from '../utils/types';

export function ChatForm({
  user,
  setMessages,
  room,
}: {
  user: string;
  setMessages: Dispatch<SetStateAction<message[]>>;
  room: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (input && user) {
      const message = {
        name: user,
        message: input,
      };
      // Client-side code to join a room
      socket.emit('messageToRoom', { roomName: room, message: message });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
      setIsLoading(false);
    }
  };

  return (
    <form
      id='form'
      onSubmit={handleSubmit}
      className='w-4/5 space-x-4 inset-x-0 mx-auto flex items-center justify-center'
    >
      <input
        id='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete='off'
        placeholder='Message'
        className='rounded-3xl w-3/4 p-5 ring-1 ring-inset ring-gray-200'
      />
      <button
        type='submit'
        disabled={isLoading}
        className='bg-sky-200 hover:bg-sky-100 text-xl font-semibold rounded-3xl p-4 px-8 ring-1 ring-inset ring-gray-200'
      >
        Send
      </button>
    </form>
  );
}
