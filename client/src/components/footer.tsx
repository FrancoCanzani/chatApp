'use client';

export default function Footer() {
  const year = new Date();

  return (
    <footer className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
      <p className='text-xs text-zinc-600'>{`© ${year.getFullYear()} Boring Chat Inc.`}</p>
    </footer>
  );
}
