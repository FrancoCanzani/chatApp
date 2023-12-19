import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { useAuth } from '@/utils/hooks/useAuth';

import { ConnectionState } from './connectionState';
import { OpenSidebarButton } from './openSidebarButton';

export default function UserProfile({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, loading, error: authError } = useAuth();

  return (
    <div className='w-full min-h-[4rem] pl-2 border-b border-gray-200 h-fit flex justify-between items-center'>
      <div className='flex items-center justify-center space-x-2'>
        <Image
          src={user?.photoURL ?? '/default-avatar.png'}
          width={33}
          height={33}
          alt='profile pic'
          className='rounded-md'
        />
        <div className=''>
          <p className='text-sm font-semibold text-gray-800'>
            {user?.displayName}
          </p>
          <ConnectionState />
        </div>
      </div>

      <div className='flex items-center h-full'>
        <OpenSidebarButton
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        >
          <ChevronLeft size={20} />
        </OpenSidebarButton>
      </div>
    </div>
  );
}
