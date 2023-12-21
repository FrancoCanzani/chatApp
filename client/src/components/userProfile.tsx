import { ChevronLeft } from 'lucide-react';
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
    <div className='w-full min-h-[4rem] pl-2 flex justify-between items-center'>
      <div className=''>
        <p className='text-xs font-semibold'>{user?.displayName}</p>
        <ConnectionState />
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
