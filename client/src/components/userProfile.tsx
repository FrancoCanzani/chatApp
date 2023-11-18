import Image from 'next/image';
import { ConnectionState } from './connectionState';
import { User } from 'firebase/auth';

export default function UserProfile({
  user,
}: {
  user: User | null | undefined;
}) {
  return (
    <div className='w-full ring-2 ring-gray-100 bg-gray-50 border p-2 border-gray-100 shadow-gray-100 flex justify-between rounded-md items-center'>
      <div className='flex items-center justify-center gap-2'>
        <Image
          src={user?.photoURL ?? '/default-avatar.png'}
          width={28}
          height={28}
          alt='profile pic'
          className='rounded-md'
        />
        <span className='text-sm font-medium text-gray-800'>
          {user?.displayName}
        </span>
      </div>
      <ConnectionState />
    </div>
  );
}
