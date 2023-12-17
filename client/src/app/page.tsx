import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-white'>
      <header className='flex justify-between items-center p-6'>
        <div className='flex items-center space-x-1'>
          <Image src={'/logo.png'} alt='logo' width={40} height={40} />
          <span className='font-semibold text-xl'>Boring Chat</span>
        </div>
        <Link href={'#'} className='text-gray-600 hover:text-gray-800'>
          Sign in
        </Link>
      </header>
      <main className='px-6 py-16 text-center leading-loose'>
        <h1 className='text-6xl font-bold mb-6'>
          Simplified Chatting – Back to Basics{' '}
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
          Rediscover the joy of simple, straightforward{' '}
          <span className='underline'>messaging</span>
        </p>
        <div className='space-x-4'>
          <Link
            href={'#'}
            className='bg-gray-800 hover:bg-gray-950 text-white p-3 rounded-md'
          >
            Start for free
          </Link>
          <button>Contribute →</button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
