import { Room } from '@/utils/types';
import { Users2 } from 'lucide-react';

export default function RoomChatInfo({
  currentRoom,
}: {
  currentRoom: Room | null;
}) {
  if (!currentRoom) {
    return null;
  }

  return (
    <div className='bg-gray-200 rounded-t-md border-b-2 border-gray-300 mb-2 font-normal flex items-center justify-between w-full py-3 px-4 text-center text-xs '>
      <p className='font-semibold'>Room: {currentRoom.name}</p>
      <div className='flex items-center justify-center gap-x-1'>
        <Users2 size={15} aria-label='room participants' />
        <p>{currentRoom.participants.length}</p>
      </div>
    </div>
  );
}
