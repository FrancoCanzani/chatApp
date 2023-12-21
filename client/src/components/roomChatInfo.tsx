import { ChevronRight, SlidersHorizontal, Users2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

import { cn } from '@/utils/helpers/cn';
import { useAuth } from '@/utils/hooks/useAuth';
import { Room } from '@/utils/types';
import { Participant } from '@/utils/types';

import { OpenSidebarButton } from './openSidebarButton';
import RoomChatSettings from './roomChatSettings';

export default function RoomChatInfo({
  rooms,
  setRooms,
  currentRoom,
  setCurrentRoom,
  showSidebar,
  setShowSidebar,
}: {
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  currentRoom: Room | null;
  setCurrentRoom: Dispatch<SetStateAction<Room | null>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, loading, error } = useAuth();
  const [showRoomSettings, setShowRoomSettings] = useState(false);

  return (
    <div className='w-full flex flex-col bg-gray-50'>
      <div className='flex min-h-[4rem] items-center w-full'>
        <OpenSidebarButton
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        >
          <ChevronRight size={20} />
        </OpenSidebarButton>
        {currentRoom && (
          <div className='flex-col gap-y-1 min-h-[4rem] flex w-full p-2 text-center text-xs'>
            <div className='flex items-center justify-between w-full'>
              <p className='text-sm font-semibold'>{currentRoom.name}</p>
              <div className='flex items-center justify-center gap-x-3'>
                <div className='flex items-center justify-center space-x-1'>
                  <Users2 size={15} aria-label='room participants' />
                  <p>{currentRoom.participants.length}</p>
                </div>
                <button onClick={() => setShowRoomSettings(!showRoomSettings)}>
                  <SlidersHorizontal size={18} />
                </button>
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
      {currentRoom && showRoomSettings && (
        <RoomChatSettings
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          setRooms={setRooms}
        />
      )}
    </div>
  );
}
