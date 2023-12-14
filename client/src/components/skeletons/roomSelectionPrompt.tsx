import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

export function RoomSelectionPrompt({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${
        showSidebar
          ? 'hidden md:flex md:w-3/4 sm:w-3/5 w-full'
          : 'md:w-3/4 sm:w-3/5 min-w-0 w-full'
      } overflow-hidden min-h-full flex justify-center items-center flex-col`}
    >
      <Image
        src={'/boring_sloth.png'}
        width={250}
        height={250}
        alt='boring sloth'
      />
      <h2 className='text-gray-700 text-center mt-2 font-medium capitalize text-2xl lg:text-3xl'>
        Select a{' '}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className='underline font-bold'
        >
          Room
        </button>{' '}
        to start chatting
      </h2>
      <p className='text-xl font-medium text-gray-700 mt-2'>Boring Chat</p>
    </div>
  );
}
