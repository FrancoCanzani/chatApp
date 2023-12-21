'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useSWR from 'swr';

import fetcher from '@/utils/helpers/fetcher';
import { useAuth } from '@/utils/hooks/useAuth';
import { Participant } from '@/utils/types';

export default function Page() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const joinLink = searchParams.get('room');
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const {
    data,
    error: joinError,
    isLoading,
  } = useSWR(`${API_URL}/join/${joinLink}`, fetcher);

  if (!user && !loading) {
    if (joinLink) {
      sessionStorage.setItem('redirectToAfterAuth', joinLink);
    }
    redirect('/signIn');
    return;
  }

  async function handleJoinRoom(roomId: string, participant: Participant) {
    try {
      const res = await fetch(`${API_URL}/rooms/${roomId}/participants`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participant }),
      });

      if (res.ok) {
        router.push('/chat');
      } else {
        const errorData = await res.json();
        if (res.status === 409) {
          // Check if the status code is 409 (Conflict)
          router.push('/chat');
        } else {
          toast.error(errorData.error || 'Error joining room');
        }
      }
    } catch (error) {
      toast.error('Error joining room');
    }
  }

  return (
    <div className='flex bg-gray-100 items-center justify-center h-screen w-full'>
      <main className='flex items-center bg-white flex-col justify-center space-y-4 border shadow-sm rounded-lg p-4 w-2/3 sm:w-1/2 lg:w-1/4'>
        <div className='flex items-center justify-center space-x-0.5 mb-2'>
          <Image src={'/logo.png'} alt='logo' width={40} height={40} />
          <h1 className='font-semibold text-zinc-900'>Boring Chat</h1>
        </div>
        <div className='flex items-center justify-evenly w-full'>
          <Image
            src={user?.photoURL ?? '/pic-placeholder.jpg'}
            height={45}
            width={45}
            alt='profile pic'
            className='rounded-full shadow-sm z-10 -mr-16'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='45'
            height='45'
            viewBox='0 0 24 24'
            className='rounded-full shadow-sm p-1 bg-white -ml-16'
          >
            <g fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 5a4 4 0 0 0-2.906 6.75a5.998 5.998 0 0 0-2.974 6.449A1 1 0 0 0 7.1 19h9.8a1 1 0 0 0 .98-.801a5.998 5.998 0 0 0-2.974-6.45A4 4 0 0 0 12 5zm4.584 5.779C16.85 10.243 17 9.639 17 9s-.15-1.243-.416-1.779A3 3 0 1 1 21.4 10.8A4 4 0 0 1 23 14v1a1 1 0 0 1-1 1h-3.083a6.006 6.006 0 0 0-3.012-4.25a4.01 4.01 0 0 0 .651-.917a3.56 3.56 0 0 1 .044-.033l-.016-.021zm-8.49.97a4.01 4.01 0 0 1-.65-.916A3.902 3.902 0 0 0 7.4 10.8l.016-.021A3.984 3.984 0 0 1 7 9c0-.639.15-1.243.416-1.779A3 3 0 1 0 2.6 10.8a3.994 3.994 0 0 0-1.372 4.534A1 1 0 0 0 2.17 16h2.912a6.006 6.006 0 0 1 3.011-4.25z'
                fill='currentColor'
              />
            </g>
          </svg>
        </div>
        <div className='p-3 flex flex-col items-center space-y-3'>
          <h3 className='text-xl font-bold'>You&apos;re Invited!</h3>
          <p className='text-sm text-gray-500 text-center'>
            You have been invited to
            <strong className='text-black'> {data?.room.name}</strong>
            <br />
            Would you like to join?
          </p>
          <div className='flex items-center space-x-3 py-3'>
            <button
              onClick={() => {
                router.push('/chat');
              }}
              className='flex items-center justify-center rounded-md text-xs font-medium p-2 bg-red-100 text-red-600 hover:bg-red-200'
            >
              Reject invite
            </button>
            <button
              className='flex items-center justify-center rounded-md text-xs font-medium p-2 bg-green-100 text-green-600 hover:bg-green-200'
              onClick={() => {
                if (user) {
                  const participant: Participant = {
                    name: user.displayName ?? 'Unknown Name',
                    email: user.email ?? 'No Email',
                    photo: user.photoURL ?? 'Default Photo URL',
                    id: user.uid,
                  };
                  handleJoinRoom(data.room._id, participant);
                }
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
