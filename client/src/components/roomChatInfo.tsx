import { ChevronRight, UserPlus, Users2, UserX2 } from 'lucide-react';
import { Dispatch, SetStateAction, useRef } from 'react';

import { cn } from '@/utils/helpers/cn';
import { useAuth } from '@/utils/hooks/useAuth';
import { Room } from '@/utils/types';
import { Participant } from '@/utils/types';

import { OpenSidebarButton } from './openSidebarButton';

export default function RoomChatInfo({
  currentRoom,
  showSidebar,
  setShowSidebar,
}: {
  currentRoom: Room | null;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, loading, error } = useAuth();
  const roomDialog = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (roomDialog.current) {
      roomDialog.current.showModal();
    }
  };

  const closeDialog = () => {
    if (roomDialog.current) {
      roomDialog.current.close();
    }
  };

  return (
    <div className='flex min-h-[4rem] items-center w-full bg-gray-50 border-b border-b-gray-200'>
      <OpenSidebarButton
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      >
        <ChevronRight size={20} />
      </OpenSidebarButton>
      {currentRoom && (
        <div className='flex-col gap-y-1 min-h-[4rem] flex w-full py-1 px-2 text-center text-xs'>
          <div className='flex items-center justify-between w-full'>
            <button onClick={openDialog} className='text-base hover:underline'>
              {currentRoom.name}
            </button>
            <div className='flex items-center justify-center gap-x-1'>
              <Users2 size={15} aria-label='room participants' />
              <p>{currentRoom.participants.length}</p>
            </div>
          </div>
          <ul className='flex items-center justify-start w-full space-x-1'>
            {currentRoom.participants.map(
              (participant: Participant, index: number) => (
                <li
                  key={participant.id}
                  className={cn({
                    'font-semibold': user?.uid === participant.id,
                  })}
                >
                  {participant.name}
                  {index < currentRoom.participants.length - 1 && ', '}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
