import Image from 'next/image';

export function RoomSelectionPrompt({ showSidebar }: { showSidebar: boolean }) {
  return (
    <div
      className={`${
        showSidebar ? 'hidden sm:flex sm:w-3/5 md:w-3/4' : 'w-full'
      } overflow-hidden min-h-full flex justify-center items-center flex-col`}
    >
      <Image
        src={'/boring_sloth.png'}
        width={250}
        height={250}
        alt='boring sloth'
      />
      <h2 className='text-gray-700 text-center mt-2 font-medium capitalize text-2xl lg:text-3xl'>
        Select a <span className='underline font-bold'>room</span> to start
        chatting
      </h2>
      <p className='text-xl font-medium text-gray-700 mt-2'>Boring Chat</p>
    </div>
  );
}
