import Image from 'next/image';
import { useContext } from 'react';

import { UserContext } from '@/app/page';

import { ConnectionState } from './connectionState';

export default function UserProfile() {
  const user = useContext(UserContext);

  return (
    <div className='w-full min-h-[4rem] pl-2 border-b border-gray-200 h-fit flex justify-between items-center'>
      <div className='flex items-center justify-center space-x-2'>
        <Image
          src={user?.photoURL ?? '/default-avatar.png'}
          width={33}
          height={33}
          alt='profile pic'
          className='rounded-full'
        />
        <div className=''>
          <p className='text-sm font-semibold text-gray-800'>
            {user?.displayName}
          </p>
          <p className='text-[10px] text-gray-600'>{user?.email}</p>
        </div>
      </div>
      <ConnectionState />
    </div>
  );
}
